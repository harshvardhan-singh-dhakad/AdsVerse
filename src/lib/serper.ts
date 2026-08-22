/**
 * serper.ts — Serper.dev Google Search API Wrapper
 *
 * Replaces DuckDuckGo scraping with real Google Search results.
 * Used for:
 *  1. Competitor discovery (find top SERP results for a keyword)
 *  2. SERP rank check (find where a domain ranks for a keyword)
 *  3. Brand mention search (news / general mentions)
 *
 * Docs: https://serper.dev/api-reference
 */

const SERPER_BASE = 'https://google.serper.dev';

function getSerperKey(): string | null {
  return process.env.SERPER_API_KEY ?? null;
}

// ── Types ──────────────────────────────────────────────────────────────────────

export interface SerperOrganicResult {
  title: string;
  link: string;
  snippet: string;
  position: number;
  domain: string;
}

export interface SerperSearchResponse {
  organic: SerperOrganicResult[];
  searchParameters: {
    q: string;
    gl?: string;
    hl?: string;
  };
  answerBox?: {
    answer?: string;
    snippet?: string;
    title?: string;
    link?: string;
  };
  knowledgeGraph?: {
    title?: string;
    description?: string;
  };
}

export interface SerpRankResult {
  found: boolean;
  position: number | null;   // 1-based, null if not in top 100
  page: number | null;       // Google page (1=first page)
  keyword: string;
  url: string | null;        // actual URL found in SERP
}

// ── Core fetch helper ──────────────────────────────────────────────────────────

async function serperFetch(
  endpoint: '/search' | '/news',
  payload: Record<string, unknown>,
): Promise<any> {
  const apiKey = getSerperKey();
  if (!apiKey) {
    console.warn('[Serper] SERPER_API_KEY is not set — skipping Serper call');
    return null;
  }

  try {
    const res = await fetch(`${SERPER_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gl: 'in', hl: 'en', num: 10, ...payload }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.warn(`[Serper] ${endpoint} returned ${res.status} for query:`, payload);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error(`[Serper] Fetch error for ${endpoint}:`, err);
    return null;
  }
}

// ── 1. Competitor Search ───────────────────────────────────────────────────────
// Returns top organic Google results for a keyword (used for competitor discovery)

export async function searchSerper(
  query: string,
  maxResults = 10,
  countryCode = 'in',
): Promise<SerperOrganicResult[]> {
  console.log(`[Serper] Searching: "${query}"`);

  const data: SerperSearchResponse | null = await serperFetch('/search', {
    q: query,
    gl: countryCode,
    num: maxResults,
  });

  if (!data?.organic) return [];

  return data.organic.slice(0, maxResults).map(r => ({
    title: r.title || '',
    link: r.link || '',
    snippet: r.snippet || '',
    position: r.position ?? 0,
    domain: (() => {
      try { return new URL(r.link).hostname.replace(/^www\./, ''); }
      catch { return r.link; }
    })(),
  }));
}

// ── 2. SERP Rank Check ────────────────────────────────────────────────────────
// Finds what position a given domain holds for a keyword in Google top 100

export async function checkSerpRank(
  domain: string,
  keyword: string,
  countryCode = 'in',
): Promise<SerpRankResult> {
  const cleanDomain = domain.replace(/^www\./, '').toLowerCase();

  // Search 3 pages of results (30 results) to find rank in top 30
  const data: SerperSearchResponse | null = await serperFetch('/search', {
    q: keyword,
    gl: countryCode,
    num: 30,
  });

  if (!data?.organic) {
    return { found: false, position: null, page: null, keyword, url: null };
  }

  for (const result of data.organic) {
    try {
      const resultDomain = new URL(result.link).hostname.replace(/^www\./, '').toLowerCase();
      if (resultDomain === cleanDomain || resultDomain.endsWith(`.${cleanDomain}`)) {
        const page = Math.ceil(result.position / 10);
        console.log(`[Serper] Rank check: ${domain} is at position #${result.position} for "${keyword}"`);
        return {
          found: true,
          position: result.position,
          page,
          keyword,
          url: result.link,
        };
      }
    } catch { /* skip invalid URL */ }
  }

  console.log(`[Serper] Rank check: ${domain} NOT found in top 30 for "${keyword}"`);
  return { found: false, position: null, page: null, keyword, url: null };
}

// ── 3. Brand Mention / News Search ───────────────────────────────────────────
// Checks if brand appears in Google News results

export interface BrandMention {
  title: string;
  link: string;
  snippet: string;
  source: string;
  date?: string;
}

export async function searchBrandMentions(
  brand: string,
  maxResults = 5,
): Promise<BrandMention[]> {
  const data = await serperFetch('/news', {
    q: `"${brand}"`,
    num: maxResults,
  });

  if (!data?.news) return [];

  return (data.news as any[]).slice(0, maxResults).map(n => ({
    title: n.title || '',
    link: n.link || '',
    snippet: n.snippet || '',
    source: n.source || '',
    date: n.date || undefined,
  }));
}
