'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';

export interface AnalysisResult {
  url: string;
  score: number;
  title: string;
  metaDescription: string;
  h1s: string[];
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

  const title = $('title').text().trim();
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
  const h1s = $('h1').map((_, el) => $(el).text().trim()).get();
  
  const isHttps = new URL(finalUrl).protocol === 'https:';

  const images = {
    total: $('img').length,
    withAlt: $('img[alt][alt!=""]').length,
  };

  const internalLinks = new Set<string>();
  const externalLinks = new Set<string>();
  const siteUrl = new URL(finalUrl);

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

  // Scoring Logic
  let score = 0;
  if (title.length > 10 && title.length < 70) score += 15;
  if (metaDescription.length > 70 && metaDescription.length < 160) score += 15;
  if (h1s.length === 1) score += 15;
  if (isHttps) score += 10;
  if (loadTime < 1) score += 15; else if (loadTime < 2.5) score += 10;
  if (images.total > 0 && images.withAlt / images.total > 0.8) score += 10; else if (images.total > 0) score += 5;
  if (links.internal > 5) score += 10;
  if (links.external > 0) score += 10;
  
  score = Math.min(100, Math.max(0, score));

  return {
    url: finalUrl,
    score,
    title,
    metaDescription,
    h1s,
    isHttps,
    loadTime,
    images,
    links,
  };
}