/**
 * /api/pagespeed — Dedicated endpoint to fetch Google PageSpeed Insights
 * for a single URL and device (mobile or desktop).
 *
 * Used by the device toggle in the Performance tab of the SEO Audit Tool.
 * Has a high maxDuration to allow Google's Lighthouse to finish.
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchPageSpeedData } from '@/lib/pagespeed';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds — enough for Google PSI

function normalizeUrl(url: string): string {
  if (!url.startsWith('http')) url = `https://${url}`;
  try {
    const u = new URL(url);
    return u.origin + u.pathname.replace(/\/$/, '');
  } catch {
    return url;
  }
}

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { url, device } = body as { url?: string; device?: 'mobile' | 'desktop' };

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'url is required.' }, { status: 400 });
  }

  const normalizedUrl = normalizeUrl(url);
  const selectedDevice = device === 'desktop' ? 'desktop' : 'mobile';

  try {
    console.log(`[/api/pagespeed] Fetching ${selectedDevice} PSI for: ${normalizedUrl}`);
    const data = await fetchPageSpeedData(normalizedUrl, selectedDevice);

    if (!data) {
      return NextResponse.json(
        { error: 'Google PageSpeed API returned no data. The site may be unreachable or API quota exceeded.' },
        { status: 502 }
      );
    }

    console.log(`[/api/pagespeed] Success — Perf: ${data.performanceScore}, SEO: ${data.seoScore}`);
    return NextResponse.json({ data, device: selectedDevice });
  } catch (err: any) {
    console.error('[/api/pagespeed] Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch PageSpeed data.' },
      { status: 500 }
    );
  }
}
