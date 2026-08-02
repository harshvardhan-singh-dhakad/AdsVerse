/**
 * pagespeed.ts
 * Helper for Google PageSpeed Insights API.
 */

export interface PageSpeedMetrics {
  fcp: number; // First Contentful Paint in ms
  lcp: number; // Largest Contentful Paint in ms
  cls: number; // Cumulative Layout Shift
  speedIndex: number; // Speed Index in ms
  score: number; // Overall performance score 0-1
}

export async function fetchPageSpeedData(url: string, strategy: 'mobile' | 'desktop' = 'mobile'): Promise<PageSpeedMetrics | null> {
  const apiKey = process.env.PAGESPEED_API_KEY;
  let apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=PERFORMANCE`;
  if (apiKey) {
    apiUrl += `&key=${apiKey}`;
  }

  try {
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
    if (!response.ok) {
      console.warn(`[PageSpeed] API returned ${response.status} for ${url}`);
      return null;
    }
    const data = await response.json();
    const lighthouse = data.lighthouseResult;

    if (!lighthouse || !lighthouse.audits) return null;

    return {
      fcp: lighthouse.audits['first-contentful-paint']?.numericValue || 0,
      lcp: lighthouse.audits['largest-contentful-paint']?.numericValue || 0,
      cls: lighthouse.audits['cumulative-layout-shift']?.numericValue || 0,
      speedIndex: lighthouse.audits['speed-index']?.numericValue || 0,
      score: lighthouse.categories?.performance?.score || 0,
    };
  } catch (error) {
    console.error('[PageSpeed] Error fetching data:', error);
    return null;
  }
}
