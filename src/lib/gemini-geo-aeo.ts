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
import { scrapeLiveSearchResults } from './scraper-agent';

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

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

async function callGemini(
  prompt: string,
  jsonMode = false,
  timeoutMs = 8000,
  targetModel = 'gemini-3.7-flash',
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const modelsToTry = [targetModel, 'gemini-3.7-flash', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'].filter(
    (m, i, arr) => arr.indexOf(m) === i
  );

  for (const model of modelsToTry) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(
        `${GEMINI_BASE}/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: jsonMode ? 1024 : 1500,
              ...(jsonMode ? { responseMimeType: 'application/json' } : {}),
            },
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            ],
          }),
        },
      );

      clearTimeout(timer);

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        if (text) return text;
      } else {
        const errText = await res.text();
        console.error(`[callGemini] Error ${res.status} for model ${model}:`, errText);
      }
    } catch (err) {
      clearTimeout(timer);
      console.error(`[callGemini] Fetch exception for model ${model}:`, err);
    }
  }

  return '';
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
2. The industry or niche (be specific, e.g. "digital marketing agency", "real estate portal")
3. The primary city/region served (if it's a local business, otherwise null)

Domain: ${domain}
Title: ${title}
H1: ${h1}
Content excerpt: ${bodyExcerpt.slice(0, 500)}

Reply ONLY as valid JSON with this exact structure:
{"brand": "...", "industry": "...", "city": "..." or null}
`.trim();

  try {
    const raw = await callGemini(prompt, true, 8000);
    if (raw) {
      let cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return {
        brand: String(parsed.brand || domain).trim(),
        industry: String(parsed.industry || 'business').trim(),
        city: parsed.city ? String(parsed.city).trim() : null,
      };
    }
  } catch (err) {
    console.error('[detectBrandAndIndustry] Failed to parse or call LLM:', err);
  }

  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  return {
    brand: cleanDomain.split('.')[0] || 'Brand',
    industry: 'Business',
    city: null,
  };
}

// ── Step 2: Generate buyer-intent prompts ─────────────────────────────────────

async function generateBuyerPrompts(
  brand: string,
  industry: string,
  city: string | null,
): Promise<string[]> {
  const locationContext = city ? ` in ${city}` : ' in India';
  const prompt = `
Generate 3 realistic buyer questions for ${industry} services${locationContext}.
Do NOT mention "${brand}".

Reply ONLY as valid JSON array of 3 strings: ["q1", "q2", "q3"]
`.trim();

  try {
    const raw = await callGemini(prompt, true, 8000);
    if (raw) {
      let cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, 3).map(String);
      }
    }
  } catch (err) {
    console.error('[generateBuyerPrompts] Failed:', err);
  }

  return [
    `best ${industry} services${locationContext}`,
    `top ${industry} companies 2025`,
    `how to choose a good ${industry} provider`,
  ];
}

// ── Step 3: Test each prompt for citation (Parallel) ──────────────────────────

function extractCitationContext(text: string, domain: string, brand: string): {
  cited: boolean;
  position: number;
  context: string | null;
} {
  const lowerText = text.toLowerCase();
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase();
  const lowerBrand = brand.toLowerCase();

  let idx = lowerText.indexOf(cleanDomain);
  if (idx === -1) idx = lowerText.indexOf(lowerBrand);

  if (idx === -1) return { cited: false, position: -1, context: null };

  const start = Math.max(0, idx - 100);
  const end = Math.min(text.length, idx + 150);
  const context = text.slice(start, end).replace(/\s+/g, ' ').trim();

  return { cited: true, position: idx, context };
}

async function testCitationPrompts(
  domain: string,
  brand: string,
  prompts: string[],
): Promise<GeoLlmCitation[]> {
  const promptList = prompts.slice(0, 3); // Strictly top 3

  const results = await Promise.all(
    promptList.map(async (prompt) => {
      try {
        const liveResults = await scrapeLiveSearchResults(prompt, 5);
        let contextText = liveResults.length > 0
          ? liveResults.map((r, idx) => `[Rank ${idx + 1}] Title: ${r.title} | Snippet: ${r.snippet} | URL: ${r.url}`).join('\n')
          : "No live search results available.";

        const aiPrompt = `
Search Query: "${prompt}"
Search Results:
${contextText}

Factual answer mentioning specific companies. Does "${brand}" or "${domain}" appear?
`.trim();

        const response = await callGemini(aiPrompt, false, 6000);
        const { cited, position, context } = extractCitationContext(response, domain, brand);

        let prominence: GeoLlmCitation['prominence'] = 'none';
        let weight = 0;
        if (cited) {
          if (position < 100) { prominence = 'first'; weight = 1.5; }
          else if (position < 300) { prominence = 'early'; weight = 1.2; }
          else { prominence = 'buried'; weight = 1.0; }
        }

        return { prompt, cited, prominence, context, weight };
      } catch (err) {
        console.error(`[testCitationPrompts] Failed for prompt: ${prompt}`, err);
        return { prompt, cited: false, prominence: 'none' as const, context: null, weight: 0 };
      }
    })
  );

  return results;
}

// ── Step 4: AEO question testing (Parallel) ───────────────────────────────────

async function testAeoQuestions(
  questions: string[],
  pageTitle: string,
  pageExcerpt: string,
): Promise<AeoLlmCheck[]> {
  const qList = questions.slice(0, 3); // Strictly top 3

  const results = await Promise.all(
    qList.map(async (question) => {
      try {
        const prompt = `
Question: "${question}"
Page title: "${pageTitle}"
Page content: "${pageExcerpt.slice(0, 300)}"

Would this page be a good direct answer for Google/AI assistant?
Reply ONLY as JSON: {"answer": "yes" or "no", "reason": "short explanation"}
`.trim();

        const raw = await callGemini(prompt, true, 8000);
        if (raw) {
          let cleaned = raw.replace(/```json|```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          return {
            question,
            plausibleAnswer: String(parsed.answer).toLowerCase().startsWith('y'),
            reason: String(parsed.reason || '').slice(0, 150),
          };
        }
      } catch (err) {
        console.error(`[testAeoQuestions] Failed for question: ${question}`, err);
      }

      return {
        question,
        plausibleAnswer: false,
        reason: 'Page structure needs improvement for direct answer matching.',
      };
    })
  );

  return results;
}

// ── Score calculators ─────────────────────────────────────────────────────────

function computeGeoLlmScore(citations: GeoLlmCitation[]): number {
  if (citations.length === 0) return 50;
  const maxPossible = citations.length * 1.5;
  const actualWeight = citations.reduce((sum, c) => sum + c.weight, 0);
  return Math.min(100, Math.max(30, Math.round((actualWeight / maxPossible) * 100)));
}

function computeAeoLlmScore(aeoChecks: AeoLlmCheck[]): number {
  if (aeoChecks.length === 0) return 50;
  const yesCount = aeoChecks.filter(c => c.plausibleAnswer).length;
  return Math.min(100, Math.max(30, Math.round((yesCount / aeoChecks.length) * 100)));
}

// ── Cache helpers ─────────────────────────────────────────────────────────────

const CACHE_COLLECTION = 'geo_aeo_cache';
const CACHE_TTL_DAYS = 7;

function domainCacheId(domain: string): string {
  const normalized = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').toLowerCase();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

async function getCached(domain: string): Promise<LlmGeoAeoResult | null> {
  try {
    const docRef = adminDb.collection(CACHE_COLLECTION).doc(domainCacheId(domain));
    const snap = await docRef.get();
    if (!snap.exists) return null;

    const data = snap.data()!;
    const expiresAt = data.expiresAt as Timestamp;
    if (expiresAt.toMillis() < Date.now()) return null;

    return {
      brand: data.brand,
      industry: data.industry,
      city: data.city ?? null,
      geoLlmScore: data.geoLlmScore,
      aeoLlmScore: data.aeoLlmScore,
      geoDetails: data.geoDetails,
      aeoDetails: data.aeoDetails,
      promptsGenerated: data.promptsGenerated,
      citationsFound: data.citationsFound,
      callsUsed: data.callsUsed,
      cacheHit: true,
      llmSkipped: false,
    };
  } catch {
    return null;
  }
}

async function writeCache(domain: string, result: LlmGeoAeoResult): Promise<void> {
  try {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + CACHE_TTL_DAYS * 24 * 60 * 60 * 1000);
    const docRef = adminDb.collection(CACHE_COLLECTION).doc(domainCacheId(domain));

    await docRef.set({
      domain,
      cachedAt: FieldValue.serverTimestamp(),
      expiresAt: Timestamp.fromDate(expiresAt),
      brand: result.brand,
      industry: result.industry,
      city: result.city,
      geoLlmScore: result.geoLlmScore,
      aeoLlmScore: result.aeoLlmScore,
      geoDetails: result.geoDetails,
      aeoDetails: result.aeoDetails,
      promptsGenerated: result.promptsGenerated,
      citationsFound: result.citationsFound,
      callsUsed: result.callsUsed,
    });
  } catch (err) {
    console.error('[geo-aeo-cache] Write failed (non-critical):', err);
  }
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function runLlmGeoAeo(params: {
  domain: string;
  title: string;
  h1: string;
  h2s: string[];
  h3s: string[];
  bodyExcerpt: string;
  staticAeoScore: number;
}): Promise<LlmGeoAeoResult> {
  const { domain, title, h1, h2s, h3s, bodyExcerpt } = params;

  const cached = await getCached(domain);
  if (cached) {
    return cached;
  }

  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

  try {
    const { brand, industry, city } = await detectBrandAndIndustry(title, h1, bodyExcerpt, domain);
    const prompts = await generateBuyerPrompts(brand, industry, city);
    
    const [geoDetails, aeoDetails] = await Promise.all([
      testCitationPrompts(domain, brand, prompts),
      testAeoQuestions(
        [...h2s, ...h3s].filter(h => /\?|^what|^how|^why|^when/i.test(h.trim())).slice(0, 3).length >= 2
          ? [...h2s, ...h3s].filter(h => /\?|^what|^how|^why|^when/i.test(h.trim())).slice(0, 3)
          : [`What is ${brand}?`, `How does ${brand} help with ${industry}?`, `Why choose ${brand}?`],
        title,
        bodyExcerpt
      ),
    ]);

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
      callsUsed: 1 + 1 + geoDetails.length + aeoDetails.length,
      cacheHit: false,
      llmSkipped: false,
    };

    await writeCache(domain, result);
    return result;
  } catch (err) {
    console.error('[runLlmGeoAeo] Main execution failed:', err);
    return {
      brand: cleanDomain.split('.')[0] || 'Brand',
      industry: 'Business',
      city: null,
      geoLlmScore: 65,
      aeoLlmScore: 70,
      geoDetails: [],
      aeoDetails: [],
      promptsGenerated: 0,
      citationsFound: 0,
      callsUsed: 0,
      cacheHit: false,
      llmSkipped: true,
      skipReason: 'Fallback scoring used',
    };
  }
}

export function blendGeoScore(staticScore: number, llmResult: LlmGeoAeoResult): number {
  if (llmResult.llmSkipped || llmResult.geoLlmScore === -1) return staticScore;
  return Math.round(0.4 * staticScore + 0.6 * llmResult.geoLlmScore);
}

export function blendAeoScore(staticScore: number, llmResult: LlmGeoAeoResult): number {
  if (llmResult.llmSkipped || llmResult.aeoLlmScore === -1) return staticScore;
  return Math.round(0.5 * staticScore + 0.5 * llmResult.aeoLlmScore);
}
