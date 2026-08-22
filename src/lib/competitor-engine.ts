/**
 * competitor-engine.ts — Server-side ONLY
 *
 * Discovers real competitors from Google SERP via Serper.dev API,
 * then runs PSI + DOM analysis on each competitor site.
 *
 * Stack: Serper.dev (real Google results) → PSI + DOM scrape
 * Falls back to DuckDuckGo HTML scraping if SERPER_API_KEY is not set.
 */

import * as cheerio from 'cheerio';
import { fetchPageSpeedData } from './pagespeed';
import { searchSerper, type SerperOrganicResult } from './serper';


// ── Types ──────────────────────────────────────────────────────────────────────

export interface CompetitorBasicInfo {
  domain: string;
  url: string;
  title: string;
  snippet: string;
  serpRank: number; // 1-based rank in SERP
}

export interface CompetitorProfile {
  domain: string;
  url: string;
  title: string;
  serpRank: number;
  snippet: string;
  // PSI Scores
  performanceScore: number | null;
  seoScore: number | null;
  accessibilityScore: number | null;
  bestPracticesScore: number | null;
  // Domain Authority (Open PageRank)
  domainAuthority: number | null; // 0-10 scale
  globalRank: string | null;
  // On-Page Data (from DOM scrape)
  metaDescription: string;
  h1: string;
  wordCount: number;
  hasSchema: boolean;
  hasFAQSchema: boolean;
  hasHttps: boolean;
  hasHsts: boolean;
  // Content Strategy
  detectedSchemas: string[];
  contentTopics: string[]; // extracted from headings
  internalLinks: number;
  externalLinks: number;
  // Logo / Brand
  favicon: string;
  // Core Web Vitals (from PSI)
  lcp: number | null; // ms
  fcp: number | null; // ms
  cls: number | null;
  tbt: number | null; // ms
  // Overall derived score
  overallScore: number;
}

export interface CompetitorAnalysis {
  searchKeyword: string;
  targetDomain: string;
  competitors: CompetitorProfile[];
  analysisTime: number; // ms
  source: 'duckduckgo' | 'gemini_fallback' | 'serper';
}

// ── DuckDuckGo SERP Scraper ───────────────────────────────────────────────────

async function searchDuckDuckGo(query: string, maxResults = 8): Promise<CompetitorBasicInfo[]> {
  const controller = new AbortController();
  // Increase timeout for more reliable results
  const timer = setTimeout(() => controller.abort(), 10000);

  try {
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://duckduckgo.com/',
        'Cache-Control': 'no-cache',
      },
    });
    clearTimeout(timer);

    if (!response.ok) {
      console.warn(`[CompetitorEngine] DuckDuckGo search failed: HTTP ${response.status}`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: CompetitorBasicInfo[] = [];
    let rank = 1;

    $('.result').each((_, el) => {
      if (results.length >= maxResults) return false;

      const titleEl = $(el).find('.result__title a, .result__a');
      const snippetEl = $(el).find('.result__snippet');
      const urlEl = $(el).find('.result__url');

      const title = titleEl.text().trim();
      const snippet = snippetEl.text().trim();
      let rawUrl = titleEl.attr('href') || urlEl.attr('href') || urlEl.text().trim();

      // Decode DuckDuckGo redirect URLs
      if (rawUrl.includes('uddg=')) {
        try {
          const u = new URL('https:' + rawUrl);
          rawUrl = u.searchParams.get('uddg') || rawUrl;
        } catch { /* ignore */ }
      } else if (rawUrl && !rawUrl.startsWith('http')) {
        rawUrl = rawUrl.startsWith('//') ? 'https:' + rawUrl : `https://${rawUrl}`;
      }

      if (!title || !rawUrl || !rawUrl.startsWith('http')) return;

      try {
        const urlObj = new URL(rawUrl);
        const domain = urlObj.hostname.replace(/^www\./, '');
        results.push({
          domain,
          url: rawUrl,
          title,
          snippet,
          serpRank: rank++,
        });
      } catch { /* invalid URL */ }
    });

    console.log(`[CompetitorEngine] DuckDuckGo returned ${results.length} results for: "${query}"`);
    return results;
  } catch (err: any) {
    clearTimeout(timer);
    console.error('[CompetitorEngine] DuckDuckGo search error:', err.message);
    return [];
  }
}

// ── Open PageRank Domain Authority ────────────────────────────────────────────

interface PageRankResult {
  domain: string;
  page_rank_decimal: number | null;
  rank: string | null;
}

async function fetchDomainAuthority(domains: string[]): Promise<Map<string, PageRankResult>> {
  const results = new Map<string, PageRankResult>();
  const apiKey = process.env.OPEN_PAGERANK_API_KEY;

  if (!apiKey || domains.length === 0) {
    // No API key — use a simple heuristic based on domain characteristics
    for (const d of domains) {
      results.set(d, { domain: d, page_rank_decimal: null, rank: null });
    }
    return results;
  }

  try {
    // Open PageRank allows up to 100 domains per request
    const batch = domains.slice(0, 100);
    const resp = await fetch('https://openpagerank.com/api/v1.0/getPageRank?' + batch.map(d => `domains[]=${encodeURIComponent(d)}`).join('&'), {
      headers: {
        'API-OPR': apiKey,
      },
      signal: AbortSignal.timeout(8000),
    });

    if (resp.ok) {
      const data = await resp.json();
      for (const item of (data.response || [])) {
        results.set(item.domain, {
          domain: item.domain,
          page_rank_decimal: item.page_rank_decimal ?? null,
          rank: item.rank ?? null,
        });
      }
    }
  } catch (err) {
    console.warn('[CompetitorEngine] Open PageRank API error:', err);
  }

  // Fill missing domains with nulls
  for (const d of domains) {
    if (!results.has(d)) {
      results.set(d, { domain: d, page_rank_decimal: null, rank: null });
    }
  }

  return results;
}

// ── Competitor DOM Scraper ────────────────────────────────────────────────────

async function scrapeCompetitorBasics(url: string): Promise<{
  title: string; metaDescription: string; h1: string; wordCount: number;
  hasSchema: boolean; hasFAQSchema: boolean; hasHttps: boolean; hasHsts: boolean;
  detectedSchemas: string[]; contentTopics: string[]; favicon: string;
  internalLinks: number; externalLinks: number;
}> {
  const defaults = {
    title: '', metaDescription: '', h1: '', wordCount: 0,
    hasSchema: false, hasFAQSchema: false, hasHttps: url.startsWith('https://'), hasHsts: false,
    detectedSchemas: [], contentTopics: [], favicon: '', internalLinks: 0, externalLinks: 0,
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);

    const resp = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });
    clearTimeout(timer);

    if (!resp.ok || resp.status >= 400) return defaults;

    const hasHsts = !!(resp.headers.get('strict-transport-security'));
    const html = await resp.text();
    const $ = cheerio.load(html);
    const domainOrigin = new URL(url).origin;

    const title = $('title').first().text().trim();
    const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
    const h1 = $('h1').first().text().trim();
    const favicon = $('link[rel*="icon"]').attr('href') || '';

    // Word count from body text
    const bodyText = $('body').clone()
      .find('script,style,noscript,nav,footer,header').remove().end()
      .text().replace(/\s+/g, ' ').trim();
    const wordCount = bodyText.split(/\s+/).filter(w => w.length > 2).length;

    // Schema detection
    const detectedSchemas: string[] = [];
    let hasSchema = false;
    let hasFAQSchema = false;
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const str = JSON.stringify(JSON.parse($(el).html() || '')).toLowerCase();
        hasSchema = true;
        if (str.includes('faqpage')) { hasFAQSchema = true; detectedSchemas.push('FAQPage'); }
        if (str.includes('organization') || str.includes('localbusiness')) detectedSchemas.push('Organization');
        if (str.includes('product')) detectedSchemas.push('Product');
        if (str.includes('article') || str.includes('blogposting')) detectedSchemas.push('Article');
        if (str.includes('breadcrumb')) detectedSchemas.push('BreadcrumbList');
        if (str.includes('howto')) detectedSchemas.push('HowTo');
        if (str.includes('review')) detectedSchemas.push('Review');
      } catch { /* skip */ }
    });

    // Content topics from H2/H3 headings
    const contentTopics: string[] = [];
    $('h2, h3').each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 5 && text.length < 80) contentTopics.push(text);
    });

    // Link analysis
    let internalLinks = 0, externalLinks = 0;
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href') || '';
      if (href.startsWith('http')) {
        if (href.includes(domainOrigin)) internalLinks++;
        else externalLinks++;
      } else if (href.startsWith('/')) {
        internalLinks++;
      }
    });

    return {
      title, metaDescription, h1, wordCount,
      hasSchema, hasFAQSchema, hasHttps: url.startsWith('https://'), hasHsts,
      detectedSchemas, contentTopics: contentTopics.slice(0, 8),
      favicon, internalLinks, externalLinks,
    };
  } catch (err) {
    console.warn(`[CompetitorEngine] Scrape failed for ${url}:`, (err as any).message);
    return defaults;
  }
}



// ── Gemini keyword extraction ─────────────────────────────────────────────────



async function extractSearchKeyword(
  domain: string,
  title: string,
  h1: string,
  bodyExcerpt: string,
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return title.slice(0, 50);

  const prompt = `Given this website:
Domain: ${domain}
Title: "${title}"
H1: "${h1}"
Body excerpt: "${bodyExcerpt.slice(0, 300)}"

Generate ONE short, specific Google search query (3-5 words) that would find the top competitors for this business. 
Focus on the business niche and city/region if mentioned.
Return ONLY the search query, nothing else. No quotes.`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        signal: AbortSignal.timeout(8000),
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
      if (text && text.length > 3 && text.length < 60) {
        console.log(`[CompetitorEngine] Gemini keyword: "${text}"`);
        return text;
      }
    }
  } catch (err) {
    console.warn('[CompetitorEngine] Gemini keyword extraction failed:', err);
  }

  // Fallback: use title keywords
  const words = title.split(/\s+/).slice(0, 4).join(' ');
  return words || domain;
}

// ── Main Competitor Analysis Engine ──────────────────────────────────────────

export async function runCompetitorAnalysis(params: {
  targetUrl: string;
  targetDomain: string;
  title: string;
  h1: string;
  bodyExcerpt: string;
  maxCompetitors?: number;
  onCompetitorFound?: (profile: CompetitorProfile) => void;
}): Promise<CompetitorAnalysis> {
  const startTime = Date.now();
  const { targetUrl, targetDomain, title, h1, bodyExcerpt, maxCompetitors = 3, onCompetitorFound } = params;

  console.log(`[CompetitorEngine] Starting analysis for: ${targetDomain}`);

  // Step 1: Extract search keyword using Gemini AI
  const searchKeyword = await extractSearchKeyword(targetDomain, title, h1, bodyExcerpt);
  console.log(`[CompetitorEngine] Search keyword: "${searchKeyword}"`);

  // Step 2: Find competitors — Serper.dev (primary) → DuckDuckGo (fallback) → Gemini (last resort)
  let serpResults: CompetitorBasicInfo[] = [];
  let source: 'duckduckgo' | 'gemini_fallback' | 'serper' = 'serper';

  // Try Serper.dev first (real Google results)
  const serperResults = await searchSerper(searchKeyword, 10);
  if (serperResults.length > 0) {
    serpResults = serperResults.map(r => ({
      domain: r.domain,
      url: r.link,
      title: r.title,
      snippet: r.snippet,
      serpRank: r.position,
    }));
    console.log(`[CompetitorEngine] Serper returned ${serpResults.length} results for: "${searchKeyword}"`);
  } else {
    // Fallback to DuckDuckGo if Serper key is missing or failed
    console.warn('[CompetitorEngine] Serper returned 0 results, falling back to DuckDuckGo...');
    serpResults = await searchDuckDuckGo(searchKeyword, 10);
    source = 'duckduckgo';
  }

  // Fallback: If DuckDuckGo HTML returns no results, use Gemini AI to discover top competitors for this niche
  if (serpResults.length === 0) {
    console.warn('[CompetitorEngine] DuckDuckGo empty. Asking Gemini AI for real competitors...');
    serpResults = await askGeminiForCompetitors(targetDomain, searchKeyword, title);
    source = 'gemini_fallback';
  }

  // Filter out the target site itself and duplicate domains
  const seenDomains = new Set([targetDomain, `www.${targetDomain}`]);
  const competitorCandidates = serpResults.filter(r => {
    const clean = r.domain.replace(/^www\./, '');
    const target = targetDomain.replace(/^www\./, '');
    if (seenDomains.has(r.domain) || seenDomains.has(`www.${r.domain}`) || clean === target) return false;
    // Filter out generic/irrelevant sites
    const irrelevant = ['wikipedia.org', 'youtube.com', 'facebook.com', 'instagram.com', 
                        'twitter.com', 'linkedin.com', 'amazon.com', 'google.com', 'reddit.com',
                        'quora.com', 'justdial.com', 'indiamart.com', 'sulekha.com'];
    if (irrelevant.some(s => clean.includes(s))) return false;
    seenDomains.add(r.domain);
    return true;
  }).slice(0, maxCompetitors);

  console.log(`[CompetitorEngine] Found ${competitorCandidates.length} competitors:`, competitorCandidates.map(c => c.domain));

  if (competitorCandidates.length === 0) {
    return {
      searchKeyword,
      targetDomain,
      competitors: [],
      analysisTime: Date.now() - startTime,
      source: 'duckduckgo',
    };
  }

  // Step 3: Fetch domain authority for all competitors at once
  const allDomains = competitorCandidates.map(c => c.domain);
  const authorityMap = await fetchDomainAuthority(allDomains);

  // Step 4: Run parallel analysis for each competitor (PSI + DOM scrape)
  const profilePromises = competitorCandidates.map(async (candidate, idx) => {
    // Stagger PSI calls to avoid rate limits
    await new Promise(r => setTimeout(r, idx * 500));

    const [psiResult, domData] = await Promise.all([
      fetchPageSpeedData(candidate.url, 'mobile').catch(() => null),
      scrapeCompetitorBasics(candidate.url),
    ]);

    const authority = authorityMap.get(candidate.domain);

    // Calculate overall score (weighted)
    const perf = psiResult?.performanceScore ?? 50;
    const seo = psiResult?.seoScore ?? 60;
    const a11y = psiResult?.accessibilityScore ?? 60;
    const bp = psiResult?.bestPracticesScore ?? 60;
    const overallScore = Math.round(perf * 0.3 + seo * 0.3 + a11y * 0.2 + bp * 0.2);

    const profile: CompetitorProfile = {
      domain: candidate.domain,
      url: candidate.url,
      title: domData.title || candidate.title,
      serpRank: candidate.serpRank,
      snippet: candidate.snippet,
      performanceScore: psiResult?.performanceScore ?? null,
      seoScore: psiResult?.seoScore ?? null,
      accessibilityScore: psiResult?.accessibilityScore ?? null,
      bestPracticesScore: psiResult?.bestPracticesScore ?? null,
      domainAuthority: authority?.page_rank_decimal ?? null,
      globalRank: authority?.rank ?? null,
      metaDescription: domData.metaDescription,
      h1: domData.h1,
      wordCount: domData.wordCount,
      hasSchema: domData.hasSchema,
      hasFAQSchema: domData.hasFAQSchema,
      hasHttps: domData.hasHttps,
      hasHsts: domData.hasHsts,
      detectedSchemas: domData.detectedSchemas,
      contentTopics: domData.contentTopics,
      favicon: domData.favicon,
      internalLinks: domData.internalLinks,
      externalLinks: domData.externalLinks,
      lcp: psiResult?.lcp ?? null,
      fcp: psiResult?.fcp ?? null,
      cls: psiResult?.cls ?? null,
      tbt: psiResult?.tbt ?? null,
      overallScore,
    };

    console.log(`[CompetitorEngine] Profiled ${candidate.domain}: Perf=${profile.performanceScore}, SEO=${profile.seoScore}`);
    if (onCompetitorFound) onCompetitorFound(profile);
    return profile;
  });

  const competitors = await Promise.all(profilePromises);

  // Sort by SERP rank (closest to position 1 = highest priority)
  competitors.sort((a, b) => a.serpRank - b.serpRank);

  return {
    searchKeyword,
    targetDomain,
    competitors,
    analysisTime: Date.now() - startTime,
    source,
  };
}

// ── Gemini AI Competitor Discovery Fallback ───────────────────────────────────

async function askGeminiForCompetitors(
  targetDomain: string,
  searchKeyword: string,
  title: string
): Promise<CompetitorBasicInfo[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return [];

  const prompt = `Identify top 3 real, actual market competitors for website "${targetDomain}" (Title: "${title}", Industry: "${searchKeyword}").
Return ONLY a valid JSON array of objects with fields:
[
  { "domain": "competitor1.com", "url": "https://competitor1.com", "title": "Competitor Title", "snippet": "Description" }
]
Rules:
- Give real, existing business URLs in the same niche/country.
- Do NOT include generic platforms like wikipedia, youtube, facebook, amazon.
- Output ONLY JSON array.`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' },
        }),
        signal: AbortSignal.timeout(8000),
      }
    );

    if (resp.ok) {
      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (text) {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          return parsed.map((item, idx) => ({
            domain: item.domain || new URL(item.url || `https://${item.domain}`).hostname,
            url: item.url || `https://${item.domain}`,
            title: item.title || item.domain,
            snippet: item.snippet || '',
            serpRank: idx + 1,
          }));
        }
      }
    }
  } catch (err) {
    console.warn('[CompetitorEngine] askGeminiForCompetitors error:', err);
  }

  return [];
}

