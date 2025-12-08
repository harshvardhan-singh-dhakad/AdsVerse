'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';

export interface AnalysisResult {
  url: string;
  score: number;
  title: string;
  metaDescription: string;
  h1s: string[];
  headings: { h1: number; h2: number; h3: number; h4: number };
  isHttps: boolean;
  loadTime: number;
  images: {
    total: number;
    withAlt: number;
  };
  links: {
    internal: number;
    external: number;
  };
  hasRobotsTxt: boolean;
  hasSchema: boolean;
  wordCount: number;
}

export async function analyzeUrl(url: string): Promise<AnalysisResult> {
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }

  let finalUrl: string;
  let html: string;
  let loadTime: number;

  try {
    const startTime = Date.now();
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'AdsVerse SEO Audit Tool/1.0',
      },
      timeout: 15000,
    });
    const endTime = Date.now();
    
    html = response.data;
    finalUrl = response.request.res.responseUrl || url;
    loadTime = (endTime - startTime) / 1000;

  } catch (error) {
    console.error('Error fetching URL:', error);
    throw new Error('Failed to fetch the website. Please check the URL and try again.');
  }

  const $ = cheerio.load(html);
  const siteUrl = new URL(finalUrl);

  // --- Start Analysis ---
  const title = $('title').text().trim();
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
  const h1s = $('h1').map((_, el) => $(el).text().trim()).get();
  const headings = {
    h1: $('h1').length,
    h2: $('h2').length,
    h3: $('h3').length,
    h4: $('h4').length,
  };
  
  const isHttps = siteUrl.protocol === 'https:';

  const images = {
    total: $('img').length,
    withAlt: $('img[alt][alt!=""]').length,
  };

  const internalLinks = new Set<string>();
  const externalLinks = new Set<string>();
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      try {
        const linkUrl = new URL(href, finalUrl);
        if (linkUrl.hostname === siteUrl.hostname) {
          internalLinks.add(linkUrl.href);
        } else {
          externalLinks.add(linkUrl.href);
        }
      } catch (e) {
        // Ignore invalid URLs
      }
    }
  });
  const links = {
    internal: internalLinks.size,
    external: externalLinks.size,
  };

  // --- New Advanced Checks ---
  let hasRobotsTxt = false;
  try {
      const robotsUrl = `${siteUrl.protocol}//${siteUrl.hostname}/robots.txt`;
      const robotsRes = await axios.get(robotsUrl, { timeout: 5000 });
      if (robotsRes.status === 200) {
        hasRobotsTxt = true;
      }
  } catch (e) {
    //
  }

  const hasSchema = $('script[type="application/ld+json"]').length > 0;
  const wordCount = $('body').text().split(/\s+/).filter(Boolean).length;

  // --- Scoring Logic ---
  let score = 0;
  // On-page
  if (title.length > 10 && title.length < 70) score += 10;
  if (metaDescription.length > 70 && metaDescription.length < 160) score += 10;
  if (headings.h1 === 1) score += 10;
  if (headings.h2 > 0) score += 5;
  if (wordCount > 300) score += 10;
  
  // Technical
  if (isHttps) score += 10;
  if (loadTime < 1) score += 10; else if (loadTime < 2.5) score += 5;
  if (hasRobotsTxt) score += 5;
  if (hasSchema) score += 5;

  // Content
  if (images.total > 0 && (images.withAlt / images.total) > 0.9) score += 10; else if (images.total > 0) score += 5;
  if (links.internal > 5) score += 5;
  if (links.external > 0) score += 5;
  
  score = Math.min(100, Math.max(0, Math.round(score)));

  return {
    url: finalUrl,
    score,
    title,
    metaDescription,
    h1s,
    headings,
    isHttps,
    loadTime,
    images,
    links,
    hasRobotsTxt,
    hasSchema,
    wordCount
  };
}
