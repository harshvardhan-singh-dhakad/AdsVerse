
'use server';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
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
  fix: string;
  category: 'On-Page SEO' | 'Performance' | 'Usability' | 'Social' | 'Technical SEO';
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
  h2s: string[];
  h3s: string[];
  h4s: string[];
  wordCount: number;
  hasSchema: boolean;
  hasRobotsTxt: boolean;
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
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 15000,
    });
    const endTime = Date.now();
    
    html = response.data;
    finalUrl = response.request.res.responseUrl || url;
    loadTime = (endTime - startTime) / 1000;

  } catch (error) {
    console.error('Error fetching URL:', error);
    throw new Error('Failed to fetch the website. Please check the URL and try again. The site may be blocking analysis tools.');
  }

  const $ = cheerio.load(html);
  const siteUrl = new URL(finalUrl);

  const checks: Record<string, boolean> = {};

  // --- Analysis ---
  const title = $('title').text().trim();
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
  const h1s = $('h1').map((_, el) => $(el).text().trim()).get();
  const h2s = $('h2').map((_, el) => $(el).text().trim()).get();
  const h3s = $('h3').map((_, el) => $(el).text().trim()).get();
  const h4s = $('h4').map((_, el) => $(el).text().trim()).get();
  
  const wordCount = $('body').text().split(/\s+/).filter(Boolean).length;
  checks.wordCountOk = wordCount > 300;
  
  checks.titleOk = title.length > 10 && title.length < 60;
  checks.metaDescriptionOk = metaDescription.length > 70 && metaDescription.length < 160;
  checks.h1Ok = h1s.length === 1;

  const images = {
    total: $('img').length,
    withAlt: $('img[alt][alt!=""]').length,
  };
  checks.altTagsOk = images.total === 0 || (images.withAlt / images.total > 0.8 && images.withAlt > 0);

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
  let onPagePoints = 0;
  if (checks.titleOk) onPagePoints += 25;
  if (checks.metaDescriptionOk) onPagePoints += 20;
  if (checks.h1Ok) onPagePoints += 20;
  if (checks.altTagsOk) onPagePoints += 15; else if (images.withAlt > 0) onPagePoints += 5;
  if (checks.wordCountOk) onPagePoints += 20; else if (wordCount > 100) onPagePoints += 5;
  const onPageScore = onPagePoints;

  let performancePoints = 0;
  if (checks.loadTimeOk) performancePoints += 100; else if (loadTime < 4) performancePoints += 60; else performancePoints += 20;
  const performanceScore = performancePoints;
  
  let usabilityPoints = 0;
  if (checks.isHttps) usabilityPoints += 50;
  if (checks.mobileFriendly) usabilityPoints += 50;
  const usabilityScore = usabilityPoints;

  let socialPoints = 0;
  if (checks.socialTagsOk) socialPoints += 70; else if(ogTitle || twitterTitle) socialPoints += 20;
  if (checks.hasSchema) socialPoints += 30;
  const socialScore = socialPoints;

  const overallScoreVal = Math.round((onPageScore + performanceScore + usabilityScore + socialScore) / 4);

  const categoryScores: SeoCategoryScores = {
    onPage: { score: onPageScore, grade: getGrade(onPageScore) },
    performance: { score: performanceScore, grade: getGrade(performanceScore) },
    usability: { score: usabilityScore, grade: getGrade(usabilityScore) },
    social: { score: socialScore, grade: getGrade(socialScore) },
  };

  const recommendations: Recommendation[] = [
    { id: 'https', check: 'HTTPS Enabled', description: 'Your site is served over a secure (HTTPS) connection.', fix: 'Ensure your entire site uses HTTPS to protect user data and build trust.', category: 'Usability', priority: 'High', passed: checks.isHttps },
    { id: 'speed', check: 'Page Load Speed', description: `Your page loaded in ${loadTime.toFixed(2)} seconds.`, fix: 'Optimize images, leverage browser caching, and minify CSS/JS to get your load time under 2.5 seconds.', category: 'Performance', priority: 'High', passed: checks.loadTimeOk },
    { id: 'title', check: 'Title Tag Length', description: 'Your title tag is the main headline in search results.', fix: 'Ensure your title is between 10 and 60 characters long to avoid being cut off in search results.', category: 'On-Page SEO', priority: 'High', passed: checks.titleOk },
    { id: 'meta', check: 'Meta Description', description: 'The meta description summarizes your page content in search results.', fix: 'Write a compelling meta description between 70 and 160 characters to encourage clicks.', category: 'On-Page SEO', priority: 'High', passed: checks.metaDescriptionOk },
    { id: 'h1', check: 'Single H1 Tag', description: 'The H1 tag is the main heading on your page.', fix: 'Your page should have exactly one H1 tag to clearly define its main topic for search engines.', category: 'On-Page SEO', priority: 'High', passed: checks.h1Ok },
    { id: 'mobile', check: 'Mobile-Friendliness', description: 'A mobile-friendly site is essential for modern SEO.', fix: 'Ensure your site has a responsive design and a viewport meta tag.', category: 'Usability', priority: 'High', passed: checks.mobileFriendly },
    { id: 'content', check: 'Content Word Count', description: 'Sufficient content helps search engines understand your page.', fix: 'Aim for at least 300 words of valuable, relevant content on your most important pages.', category: 'On-Page SEO', priority: 'Medium', passed: checks.wordCountOk },
    { id: 'alt', check: 'Image Alt Text', description: 'Alt text describes your images to search engines and visually impaired users.', fix: 'Add descriptive alt text to all important images to improve accessibility and image SEO.', category: 'On-Page SEO', priority: 'Medium', passed: checks.altTagsOk },
    { id: 'robots', check: 'Robots.txt File', description: 'A robots.txt file guides search engines on how to crawl your site.', fix: 'Create a robots.txt file to control which parts of your site search engines can and cannot access.', category: 'Technical SEO', priority: 'Low', passed: checks.robotsTxtOk },
    { id: 'schema', check: 'Schema Markup', description: 'Schema markup helps search engines understand your content better.', fix: 'Implement structured data (like LocalBusiness or Article schema) to enable rich snippets in search results.', category: 'On-Page SEO', priority: 'Low', passed: checks.hasSchema },
    { id: 'social', check: 'Social Meta Tags', description: 'Open Graph and Twitter Cards control how your content appears when shared.', fix: 'Add Open Graph (for Facebook/LinkedIn) and Twitter Card tags to all pages to optimize for social sharing.', category: 'Social', priority: 'Low', passed: checks.socialTagsOk },
  ];

  return {
    url: finalUrl,
    overallScore: { score: overallScoreVal, grade: getGrade(overallScoreVal) },
    categoryScores,
    recommendations,
    title,
    metaDescription,
    h1s, h2s, h3s, h4s,
    wordCount,
    hasSchema: checks.hasSchema,
    hasRobotsTxt: checks.robotsTxtOk,
  };
}

    
