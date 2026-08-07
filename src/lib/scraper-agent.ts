import * as cheerio from 'cheerio';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

/**
 * Scrapes DuckDuckGo HTML version for search results.
 * This runs entirely on the backend, requires no API key, and is less likely
 * to be blocked by captchas compared to direct Google scraping.
 */
export async function scrapeLiveSearchResults(query: string, maxResults = 10): Promise<SearchResult[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);

  try {
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    
    // Use a realistic user-agent to prevent immediate blocking
    const response = await fetch(searchUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      next: { revalidate: 3600 } // optionally cache similar queries for an hour if running on Next.js edge
    });
    clearTimeout(timer);

    if (!response.ok) {
      console.warn(`[ScraperAgent] Failed to fetch search results for "${query}" (Status: ${response.status})`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const results: SearchResult[] = [];
    
    // DuckDuckGo HTML specific selectors
    $('.result').each((i, el) => {
      if (i >= maxResults) return false;
      
      const title = $(el).find('.result__title').text().trim();
      const snippet = $(el).find('.result__snippet').text().trim();
      let url = $(el).find('.result__url').attr('href') || '';
      
      // DuckDuckGo redirects URLs through their own tracker sometimes (e.g. //duckduckgo.com/l/?uddg=https...)
      if (url.includes('uddg=')) {
        try {
          const urlObj = new URL('https:' + url);
          const actualUrl = urlObj.searchParams.get('uddg');
          if (actualUrl) url = actualUrl;
        } catch (e) {
          // ignore parsing error
        }
      } else if (!url.startsWith('http')) {
        url = `https://${url.trim()}`;
      }

      if (title && snippet) {
        results.push({ title, url, snippet });
      }
    });

    return results;
  } catch (error) {
    console.error(`[ScraperAgent] Error scraping "${query}":`, error);
    return [];
  }
}
