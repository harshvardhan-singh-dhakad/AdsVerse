'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';

// Interfaces for structured results
export interface SeoCategoryScores {
  onPage: { score: number, grade: string };
  performance: { score: number, grade: string };
  usability: { score: number, grade: string };
  social: { score: number, grade: string };
}

export interface Recommendation {
  id: string;
  check: string;
  description: string;
  category: 'On-Page SEO' | 'Performance' | 'Usability' | 'Social';
  priority: 'High' | 'Medium' | 'Low';
  passed: boolean;
}

export interface AnalysisResult {
  url: string;
  overallScore: { score: number, grade: string };
  categoryScores: SeoCategoryScores;
  recommendations: Recommendation[];
  title: string;
  metaDescription: string;
  h1s: string[];
}

function getGrade(score: number): string {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
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
      headers: { 'User-Agent': 'AdsVerse SEO Audit Tool/1.0' },
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

  const checks: Record<string, boolean> = {};

  // --- Analysis ---
  const title = $('title').text().trim();
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
  const h1s = $('h1').map((_, el) => $(el).text().trim()).get();
  
  const wordCount = $('body').text().split(/\s+/).filter(Boolean).length;
  checks.wordCountOk = wordCount > 300;
  
  checks.titleOk = title.length > 10 && title.length < 70;
  checks.metaDescriptionOk = metaDescription.length > 70 && metaDescription.length < 160;
  checks.h1Ok = h1s.length === 1;

  const images = {
    total: $('img').length,
    withAlt: $('img[alt][alt!=""]').length,
  };
  checks.altTagsOk = images.total === 0 || images.withAlt / images.total > 0.8;

  checks.isHttps = siteUrl.protocol === 'https:';
  checks.loadTimeOk = loadTime < 2.5;

  let hasRobotsTxt = false;
  try {
    const robotsRes = await axios.get(`${siteUrl.protocol}//${siteUrl.hostname}/robots.txt`, { timeout: 5000 });
    hasRobotsTxt = robotsRes.status === 200;
  } catch (e) { /* ignore */ }
  checks.robotsTxtOk = hasRobotsTxt;

  checks.hasSchema = $('script[type="application/ld+json"]').length > 0;

  const viewport = $('meta[name="viewport"]').attr('content');
  checks.mobileFriendly = !!viewport && viewport.includes('width=device-width');
  
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const twitterTitle = $('meta[name="twitter:title"]').attr('content');
  checks.socialTagsOk = !!(ogTitle && twitterTitle);


  // --- Scoring ---
  const onPageScore = (
    (checks.titleOk ? 25 : 0) +
    (checks.metaDescriptionOk ? 20 : 0) +
    (checks.h1Ok ? 20 : 0) +
    (checks.altTagsOk ? 15 : 5) +
    (checks.wordCountOk ? 20 : 5)
  );

  const performanceScore = (checks.loadTimeOk ? 100 : 40);
  
  const usabilityScore = (
      (checks.isHttps ? 50 : 0) +
      (checks.mobileFriendly ? 50 : 0)
  );

  const socialScore = (
    (checks.socialTagsOk ? 70 : 10) +
    (checks.hasSchema ? 30 : 0) // Schema helps with rich snippets on social too
  );

  const totalPossible = onPageScore + performanceScore + usabilityScore + socialScore;
  const overallScoreVal = Math.round((totalPossible / 400) * 100);

  const categoryScores: SeoCategoryScores = {
    onPage: { score: onPageScore, grade: getGrade(onPageScore) },
    performance: { score: performanceScore, grade: getGrade(performanceScore) },
    usability: { score: usabilityScore, grade: getGrade(usabilityScore) },
    social: { score: socialScore, grade: getGrade(socialScore) },
  };

  const recommendations: Recommendation[] = [
    { id: 'title', check: 'Improve Title Tag', description: 'Ensure title is between 10 and 70 characters.', category: 'On-Page SEO', priority: 'High', passed: checks.titleOk },
    { id: 'meta', check: 'Improve Meta Description', description: 'Meta description should be between 70 and 160 characters.', category: 'On-Page SEO', priority: 'High', passed: checks.metaDescriptionOk },
    { id: 'h1', check: 'Use a Single H1 Tag', description: 'Your page should have exactly one H1 tag.', category: 'On-Page SEO', priority: 'High', passed: checks.h1Ok },
    { id: 'speed', check: 'Improve Site Load Speed', description: 'Aim for a page load time under 2.5 seconds.', category: 'Performance', priority: 'High', passed: checks.loadTimeOk },
    { id: 'https', check: 'Enable HTTPS', description: 'Secure your site with an SSL certificate.', category: 'Usability', priority: 'High', passed: checks.isHttps },
    { id: 'content', check: 'Increase Page Text Content', description: 'Aim for at least 300 words of valuable content.', category: 'On-Page SEO', priority: 'Medium', passed: checks.wordCountOk },
    { id: 'alt', check: 'Add Alt Text to Images', description: 'Ensure all important images have descriptive alt text.', category: 'On-Page SEO', priority: 'Medium', passed: checks.altTagsOk },
    { id: 'mobile', check: 'Ensure Mobile-Friendliness', description: 'Add a viewport meta tag for responsive design.', category: 'Usability', priority: 'Medium', passed: checks.mobileFriendly },
    { id: 'schema', check: 'Add Local Business Schema', description: 'Implement Schema.org markup to enable rich snippets.', category: 'On-Page SEO', priority: 'Low', passed: checks.hasSchema },
    { id: 'robots', check: 'Implement a robots.txt file', description: 'Guide search engines on how to crawl your site.', category: 'Usability', priority: 'Low', passed: checks.robotsTxtOk },
    { id: 'social', check: 'Add Social Media Meta Tags', description: 'Add Open Graph (for Facebook) and Twitter Card tags.', category: 'Social', priority: 'Low', passed: checks.socialTagsOk },
  ];

  return {
    url: finalUrl,
    overallScore: { score: overallScoreVal, grade: getGrade(overallScoreVal) },
    categoryScores,
    recommendations,
    title,
    metaDescription,
    h1s
  };
}
