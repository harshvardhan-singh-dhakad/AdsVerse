/**
 * gemini-geo-aeo.ts — Server-side ONLY
 *
 * LLM-powered GEO (Generative Engine Optimization) and AEO (Answer Engine
 * Optimization) scoring using the Gemini API.
 *
 * SECURITY: This file reads GEMINI_API_KEY from process.env.
 * NEVER import this file in any client component or page.tsx.
 * It is only used by src/app/api/audit/route.ts (server-side API route).
 */

import crypto from 'crypto';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface GeoLlmCitation {
  prompt: string;
  cited: boolean;
  prominence: 'first' | 'early' | 'buried' | 'none';
  context: string | null;   // excerpt of the sentence where brand appears
  weight: number;           // 0 | 1.0 | 1.2 | 1.5
}

export interface AeoLlmCheck {
  question: string;
  plausibleAnswer: boolean;
  reason: string;
}

export interface LlmGeoAeoResult {
  brand: string;
  industry: string;
  city: string | null;
  geoLlmScore: number;       // 0-100 weighted citation score
  aeoLlmScore: number;       // 0-100 % of questions answered yes
  geoDetails: GeoLlmCitation[];
  aeoDetails: AeoLlmCheck[];
  promptsGenerated: number;
  citationsFound: number;
  callsUsed: number;
  cacheHit: boolean;
  llmSkipped: boolean;
  skipReason?: string;
}

// ── Gemini call helper ────────────────────────────────────────────────────────

const GEMINI_MODEL = 'gemini-3.6-flash';
const GEMINI_BASE  = 'https://generativelanguage.googleapis.com/v1beta/models';

async function callGemini(
  prompt: string,
  jsonMode = false,
  timeoutMs = 20000,
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(
      `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: jsonMode ? 1024 : 2048,
            ...(jsonMode ? { responseMimeType: 'application/json' } : {}),
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT',       threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH',      threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT',threshold: 'BLOCK_NONE' },
          ],
        }),
      },
    );

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      throw new Error(`Gemini API error ${res.status}: ${errBody.slice(0, 200)}`);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  } finally {
    clearTimeout(timer);
  }
}

// ── Step 1: Detect brand + industry ──────────────────────────────────────────

async function detectBrandAndIndustry(
  title: string,
  h1: string,
  bodyExcerpt: string,
  domain: string,
): Promise<{ brand: string; industry: string; city: string | null }> {
  const prompt = `
Analyze this website content and extract:
1. The brand/company name
2. The industry or niche (be specific, e.g. "digital marketing agency", "real estate portal", "e-commerce clothing", "SaaS project management tool")
3. The primary city/region served (if it's a local business, otherwise null)

Domain: ${domain}
Title: ${title}
H1: ${h1}
Content excerpt: ${bodyExcerpt.slice(0, 600)}

Reply ONLY as valid JSON with this exact structure:
{"brand": "...", "industry": "...", "city": "..." or null}
`.trim();

  try {
    const raw = await callGemini(prompt, true);
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    return {
      brand:    String(parsed.brand    || domain).trim(),
      industry: String(parsed.industry || 'business').trim(),
      city:     parsed.city ? String(parsed.city).trim() : null,
    };
  } catch {
    // Fallback: derive brand from domain
    return {
      brand:    domain.replace(/^www\./, '').split('.')[0],
      industry: 'business',
      city:     null,
    };
  }
}

// ── Step 2: Generate buyer-intent prompts ─────────────────────────────────────

async function generateBuyerPrompts(
  brand: string,
  industry: string,
  city: string | null,
): Promise<string[]> {
  const locationContext = city ? ` in ${city}` : ' in India';
  const prompt = `
You are a potential customer looking for ${industry} services${locationContext}.
Generate exactly 10 realistic questions you might ask an AI assistant like ChatGPT or Gemini
when researching or buying ${industry} products/services.

Mix these types:
- "best [industry] [in location]" style queries (3-4 questions)
- specific feature/capability questions (3-4 questions)
- comparison or recommendation questions (2-3 questions)

Make questions conversational and realistic. Do NOT mention the brand "${brand}" in the questions.

Reply ONLY as a valid JSON array of 10 strings. Example format:
["question 1", "question 2", ...]
`.trim();

  try {
    const raw = await callGemini(prompt, true);
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.slice(0, 12).map(String);
    }
  } catch { /* fall through */ }

  // Fallback generic prompts
  return [
    `best ${industry} companies${locationContext}`,
    `top ${industry} services to use in 2025`,
    `which ${industry} platform is most reliable`,
    `how to choose a good ${industry} provider`,
    `affordable ${industry} services for small businesses`,
  ];
}

// ── Step 3: Test each prompt for citation ─────────────────────────────────────

function extractCitationContext(text: string, domain: string, brand: string): {
  cited: boolean;
  position: number;
  context: string | null;
} {
  const lowerText  = text.toLowerCase();
  const lowerDomain = domain.toLowerCase().replace(/^www\./, '');
  const lowerBrand  = brand.toLowerCase();

  // Try domain match first, then brand name
  let idx = lowerText.indexOf(lowerDomain);
  if (idx === -1) idx = lowerText.indexOf(lowerBrand);
  if (idx === -1) {
    // Partial brand match (e.g. "ads verse" for "adsverse")
    const parts = lowerBrand.split(/(?=[A-Z])/).join(' ').toLowerCase();
    if (parts !== lowerBrand) idx = lowerText.indexOf(parts);
  }

  if (idx === -1) return { cited: false, position: -1, context: null };

  // Extract the sentence containing the citation
  const start   = Math.max(0, idx - 120);
  const end     = Math.min(text.length, idx + 180);
  const context = text.slice(start, end).replace(/\s+/g, ' ').trim();

  return { cited: true, position: idx, context };
}

async function testCitationPrompts(
  domain: string,
  brand: string,
  prompts: string[],
): Promise<GeoLlmCitation[]> {
  const results: GeoLlmCitation[] = [];

  // Run in batches of 5 to avoid rate limits
  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i];
    try {
      const response = await callGemini(
        `${prompt}\n\nProvide a helpful, factual answer mentioning specific companies, tools, or platforms if relevant.`,
        false,
        15000,
      );

      const { cited, position, context } = extractCitationContext(response, domain, brand);

      let prominence: GeoLlmCitation['prominence'] = 'none';
      let weight = 0;
      if (cited) {
        if (position < 100)      { prominence = 'first';  weight = 1.5; }
        else if (position < 300) { prominence = 'early';  weight = 1.2; }
        else                     { prominence = 'buried'; weight = 1.0; }
      }

      results.push({ prompt, cited, prominence, context, weight });
    } catch {
      // Treat API errors as non-citations (don't fail entire audit)
      results.push({ prompt, cited: false, prominence: 'none', context: null, weight: 0 });
    }

    // Small delay between calls to be rate-limit friendly
    if (i < prompts.length - 1) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  return results;
}

// ── Step 4: AEO question testing ──────────────────────────────────────────────

async function testAeoQuestions(
  questions: string[],
  pageTitle: string,
  pageExcerpt: string,
): Promise<AeoLlmCheck[]> {
  const results: AeoLlmCheck[] = [];

  for (const question of questions.slice(0, 5)) {
    try {
      const prompt = `
You are evaluating whether a web page would be a good source for a featured snippet or direct answer.

Question: "${question}"
Page title: "${pageTitle}"
Page content excerpt: "${pageExcerpt.slice(0, 400)}"

Would this page content plausibly be pulled as a direct answer to this question by Google or an AI assistant?
Consider: Does the content directly address the question? Is it concise enough for a featured snippet?

Reply ONLY as valid JSON: {"answer": "yes" or "no", "reason": "one sentence explanation"}
`.trim();

      const raw = await callGemini(prompt, true, 12000);
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
      results.push({
        question,
        plausibleAnswer: String(parsed.answer).toLowerCase().startsWith('y'),
        reason: String(parsed.reason || '').slice(0, 200),
      });
    } catch {
      results.push({
        question,
        plausibleAnswer: false,
        reason: 'Could not evaluate (API error)',
      });
    }

    if (questions.indexOf(question) < questions.length - 1) {
      await new Promise(r => setTimeout(r, 150));
    }
  }

  return results;
}

// ── Score calculators ─────────────────────────────────────────────────────────

function computeGeoLlmScore(citations: GeoLlmCitation[]): number {
  if (citations.length === 0) return 0;
  const maxPossible = citations.length * 1.5; // if all cited at "first" prominence
  const actualWeight = citations.reduce((sum, c) => sum + c.weight, 0);
  return Math.min(100, Math.round((actualWeight / maxPossible) * 100));
}

function computeAeoLlmScore(aeoChecks: AeoLlmCheck[]): number {
  if (aeoChecks.length === 0) return 0;
  const yesCount = aeoChecks.filter(c => c.plausibleAnswer).length;
  return Math.round((yesCount / aeoChecks.length) * 100);
}

// ── Cache helpers ─────────────────────────────────────────────────────────────

const CACHE_COLLECTION = 'geo_aeo_cache';
const CACHE_TTL_DAYS   = 7;

function domainCacheId(domain: string): string {
  const normalized = domain.replace(/^www\./, '').toLowerCase();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

async function getCached(domain: string): Promise<LlmGeoAeoResult | null> {
  try {
    const docRef = adminDb.collection(CACHE_COLLECTION).doc(domainCacheId(domain));
    const snap   = await docRef.get();
    if (!snap.exists) return null;

    const data      = snap.data()!;
    const expiresAt = data.expiresAt as Timestamp;
    if (expiresAt.toMillis() < Date.now()) return null; // expired

    return {
      brand:            data.brand,
      industry:         data.industry,
      city:             data.city ?? null,
      geoLlmScore:      data.geoLlmScore,
      aeoLlmScore:      data.aeoLlmScore,
      geoDetails:       data.geoDetails,
      aeoDetails:       data.aeoDetails,
      promptsGenerated: data.promptsGenerated,
      citationsFound:   data.citationsFound,
      callsUsed:        data.callsUsed,
      cacheHit:         true,
      llmSkipped:       false,
    };
  } catch {
    return null;
  }
}

async function writeCache(domain: string, result: LlmGeoAeoResult): Promise<void> {
  try {
    const now        = new Date();
    const expiresAt  = new Date(now.getTime() + CACHE_TTL_DAYS * 24 * 60 * 60 * 1000);
    const docRef     = adminDb.collection(CACHE_COLLECTION).doc(domainCacheId(domain));

    await docRef.set({
      domain,
      cachedAt:         FieldValue.serverTimestamp(),
      expiresAt:        Timestamp.fromDate(expiresAt),
      brand:            result.brand,
      industry:         result.industry,
      city:             result.city,
      geoLlmScore:      result.geoLlmScore,
      aeoLlmScore:      result.aeoLlmScore,
      geoDetails:       result.geoDetails,
      aeoDetails:       result.aeoDetails,
      promptsGenerated: result.promptsGenerated,
      citationsFound:   result.citationsFound,
      callsUsed:        result.callsUsed,
    });
  } catch (err) {
    console.error('[geo-aeo-cache] Write failed (non-critical):', err);
  }
}

// ── Daily cap helpers ─────────────────────────────────────────────────────────

const CAP_COLLECTION = 'system_audit_limits';

async function checkAndIncrementDailyCap(): Promise<{ allowed: boolean; current: number; cap: number }> {
  const cap = parseInt(process.env.DAILY_LLM_AUDIT_CAP ?? '50', 10);
  const dateKey = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    const docRef = adminDb.collection(CAP_COLLECTION).doc(dateKey);
    const snap   = await docRef.get();
    const current = snap.exists ? (snap.data()?.llmAuditsRun ?? 0) : 0;

    if (current >= cap) return { allowed: false, current, cap };

    // Atomically increment
    await docRef.set(
      { date: dateKey, llmAuditsRun: FieldValue.increment(1) },
      { merge: true },
    );
    return { allowed: true, current: current + 1, cap };
  } catch {
    // If cap check fails, allow the audit (don't block users)
    return { allowed: true, current: 0, cap };
  }
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function runLlmGeoAeo(params: {
  domain:       string;
  title:        string;
  h1:           string;
  h2s:          string[];
  h3s:          string[];
  bodyExcerpt:  string;  // first ~1000 chars of body text
  staticAeoScore: number;
}): Promise<LlmGeoAeoResult> {
  const { domain, title, h1, h2s, h3s, bodyExcerpt, staticAeoScore } = params;

  // ── 1. Cache hit? ──────────────────────────────────────────────────────────
  const cached = await getCached(domain);
  if (cached) {
    console.log(`[geo-aeo] Cache hit for ${domain}`);
    return cached;
  }

  // ── 2. Daily cap check ─────────────────────────────────────────────────────
  const capCheck = await checkAndIncrementDailyCap();
  if (!capCheck.allowed) {
    console.warn(`[geo-aeo] Daily cap reached (${capCheck.current}/${capCheck.cap})`);
    return {
      brand:            domain.replace(/^www\./, '').split('.')[0],
      industry:         'unknown',
      city:             null,
      geoLlmScore:      -1,  // -1 = skipped, use static
      aeoLlmScore:      -1,
      geoDetails:       [],
      aeoDetails:       [],
      promptsGenerated: 0,
      citationsFound:   0,
      callsUsed:        0,
      cacheHit:         false,
      llmSkipped:       true,
      skipReason:       `Daily LLM audit cap reached (${capCheck.cap}/day)`,
    };
  }

  // ── 3. Check API key ───────────────────────────────────────────────────────
  if (!process.env.GEMINI_API_KEY) {
    return {
      brand: domain.replace(/^www\./, '').split('.')[0],
      industry: 'unknown',
      city: null,
      geoLlmScore: -1,
      aeoLlmScore: -1,
      geoDetails: [],
      aeoDetails: [],
      promptsGenerated: 0,
      citationsFound: 0,
      callsUsed: 0,
      cacheHit: false,
      llmSkipped: true,
      skipReason: 'GEMINI_API_KEY not configured',
    };
  }

  let callsUsed = 0;

  // ── 4. Detect brand + industry ─────────────────────────────────────────────
  console.log(`[geo-aeo] Running LLM audit for ${domain}`);
  const { brand, industry, city } = await detectBrandAndIndustry(title, h1, bodyExcerpt, domain);
  callsUsed++;

  // ── 5. Generate buyer-intent prompts ──────────────────────────────────────
  const prompts = await generateBuyerPrompts(brand, industry, city);
  callsUsed++;

  // ── 6. Test citation prompts ───────────────────────────────────────────────
  const geoDetails = await testCitationPrompts(domain, brand, prompts);
  callsUsed += geoDetails.length;

  // ── 7. AEO question testing ────────────────────────────────────────────────
  // Extract question-style headings or fallback to generated questions
  const questionHeadings = [...h2s, ...h3s]
    .filter(h => /\?|^what|^how|^why|^when|^where|^who|^which|^can|^does|^is|^are|^do/i.test(h.trim()))
    .slice(0, 5);

  // If not enough question headings, use generic ones based on brand/industry
  const aeoQuestions = questionHeadings.length >= 2
    ? questionHeadings
    : [
        `What is ${brand} and what does it offer?`,
        `How does ${brand} help with ${industry}?`,
        `What are the benefits of using ${brand}?`,
      ];

  const aeoDetails  = await testAeoQuestions(aeoQuestions, title, bodyExcerpt);
  callsUsed += aeoDetails.length;

  // ── 8. Compute scores ──────────────────────────────────────────────────────
  const geoLlmScore = computeGeoLlmScore(geoDetails);
  const aeoLlmScore = computeAeoLlmScore(aeoDetails);
  const citationsFound = geoDetails.filter(c => c.cited).length;

  const result: LlmGeoAeoResult = {
    brand,
    industry,
    city,
    geoLlmScore,
    aeoLlmScore,
    geoDetails,
    aeoDetails,
    promptsGenerated: prompts.length,
    citationsFound,
    callsUsed,
    cacheHit: false,
    llmSkipped: false,
  };

  // ── 9. Write cache ─────────────────────────────────────────────────────────
  await writeCache(domain, result);

  return result;
}

// ── Merge LLM scores into final scores ────────────────────────────────────────

/**
 * Blend static heuristic score with LLM score.
 * If LLM was skipped, return static score unchanged.
 */
export function blendGeoScore(staticScore: number, llmResult: LlmGeoAeoResult): number {
  if (llmResult.llmSkipped || llmResult.geoLlmScore === -1) return staticScore;
  // 30% static signals + 70% LLM citation score
  return Math.round(0.3 * staticScore + 0.7 * llmResult.geoLlmScore);
}

export function blendAeoScore(staticScore: number, llmResult: LlmGeoAeoResult): number {
  if (llmResult.llmSkipped || llmResult.aeoLlmScore === -1) return staticScore;
  // 60% static structural + 40% LLM question test
  return Math.round(0.6 * staticScore + 0.4 * llmResult.aeoLlmScore);
}
