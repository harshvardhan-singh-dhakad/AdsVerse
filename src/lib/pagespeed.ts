/**
 * pagespeed.ts
 * Helper for Google PageSpeed Insights API with full 4-pillar Lighthouse Suite:
 * Performance, SEO, Accessibility, and Best Practices.
 */

export interface LighthouseAuditItem {
  id: string;
  title: string;
  description: string;
  score: number | null; // 1 = pass, 0 = fail, null = informational
  displayValue?: string;
  category: 'performance' | 'seo' | 'accessibility' | 'best-practices';
  details?: any;
}

export interface PageSpeedMetrics {
  // 4 Core Lighthouse Scores (0-100)
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;

  // Core Web Vitals
  fcp: number; // First Contentful Paint (ms)
  lcp: number; // Largest Contentful Paint (ms)
  cls: number; // Cumulative Layout Shift
  speedIndex: number; // Speed Index (ms)
  tbt: number; // Total Blocking Time (ms)
  score: number; // Performance 0-1 for backward compatibility

  // Detailed Lighthouse Audits
  audits: LighthouseAuditItem[];
}

export async function fetchPageSpeedData(url: string, strategy: 'mobile' | 'desktop' = 'mobile'): Promise<PageSpeedMetrics | null> {
  const apiKey = process.env.PAGESPEED_API_KEY;
  let apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES`;
  if (apiKey) {
    apiUrl += `&key=${apiKey}`;
  }

  const controller = new AbortController();
  // Allow up to 25s for Google's headless Chrome emulation to finish
  const timer = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(apiUrl, { 
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timer);

    if (!response.ok) {
      console.warn(`[PageSpeed] API returned ${response.status} for ${url}`);
      return null;
    }

    const data = await response.json();
    const lighthouse = data.lighthouseResult;

    if (!lighthouse || !lighthouse.categories) return null;

    const catPerf = Math.round((lighthouse.categories?.performance?.score ?? 0) * 100);
    const catSeo = Math.round((lighthouse.categories?.seo?.score ?? 0) * 100);
    const catAccess = Math.round((lighthouse.categories?.accessibility?.score ?? 0) * 100);
    const catBest = Math.round((lighthouse.categories?.['best-practices']?.score ?? 0) * 100);

    const fcp = lighthouse.audits?.['first-contentful-paint']?.numericValue || 0;
    const lcp = lighthouse.audits?.['largest-contentful-paint']?.numericValue || 0;
    const cls = lighthouse.audits?.['cumulative-layout-shift']?.numericValue || 0;
    const speedIndex = lighthouse.audits?.['speed-index']?.numericValue || 0;
    const tbt = lighthouse.audits?.['total-blocking-time']?.numericValue || 0;

    // Extract detailed categorized audits
    const audits: LighthouseAuditItem[] = [];
    if (lighthouse.audits) {
      for (const [key, audit] of Object.entries(lighthouse.audits as Record<string, any>)) {
        if (!audit || typeof audit.score === 'undefined') continue;

        let category: LighthouseAuditItem['category'] = 'performance';
        if (key.includes('seo') || key.includes('viewport') || key.includes('canonical') || key.includes('robots') || key.includes('crawlable')) {
          category = 'seo';
        } else if (key.includes('aria') || key.includes('contrast') || key.includes('alt') || key.includes('label') || key.includes('heading')) {
          category = 'accessibility';
        } else if (key.includes('https') || key.includes('doctype') || key.includes('console') || key.includes('security') || key.includes('vulnerabilities')) {
          category = 'best-practices';
        }

        audits.push({
          id: key,
          title: audit.title || key,
          description: audit.description || '',
          score: audit.score,
          displayValue: audit.displayValue,
          category,
          details: audit.details,
        });
      }
    }

    return {
      performanceScore: catPerf,
      seoScore: catSeo,
      accessibilityScore: catAccess,
      bestPracticesScore: catBest,
      fcp,
      lcp,
      cls,
      speedIndex,
      tbt,
      score: (catPerf / 100),
      audits,
    };
  } catch (error) {
    console.error('[PageSpeed] Error fetching 4-pillar data:', error);
    return null;
  }
}
