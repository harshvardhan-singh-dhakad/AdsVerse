'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { fetchPageSpeedData, type PageSpeedMetrics } from '@/lib/pagespeed';
import type { LlmGeoAeoResult } from '@/lib/gemini-geo-aeo';

// Interfaces for structured results
export interface SeoCategoryScores {
  onPage: { score: number; grade: string };
  technical: { score: number; grade: string };
  performance: { score: number; grade: string };
  accessibility: { score: number; grade: string };
  social: { score: number; grade: string };
}

export interface GeoAeoScores {
  geo: { score: number; grade: string };
  aeo: { score: number; grade: string };
}

export interface GeoAeoCheck {
  id: string;
  check: string;
  description: string;
  fix: string;
  status: 'pass' | 'fail' | 'warning';
  priority: 'High' | 'Medium' | 'Low';
  type: 'GEO' | 'AEO';
}

export interface Recommendation {
  id: string;
  check: string;
  description: string;
  fix: string;
  category: 'On-Page SEO' | 'Performance' | 'Accessibility' | 'Social' | 'Technical SEO' | 'Security';
  priority: 'High' | 'Medium' | 'Low';
  status: 'pass' | 'fail' | 'warning';
}

export interface LinkCounts {
  internal: number;
  external: number;
  nofollow: number;
  broken: number;
}

export interface AnalysisResult {
  url: string;
  finalUrl: string;
  redirected: boolean;
  overallScore: { score: number; grade: string };
  categoryScores: SeoCategoryScores;
  geoAeoScores: GeoAeoScores;
  geoAeoChecks: GeoAeoCheck[];
  recommendations: Recommendation[];
  title: string;
  metaDescription: string;
  h1s: string[];
  h2s: string[];
  h3s: string[];
  h4s: string[];
  wordCount: number;
  linkCounts: LinkCounts;
  hasSchema: boolean;
  hasRobotsTxt: boolean;
  hasSitemapInRobots: boolean;
  lang: string | undefined;
  canonical: string | undefined;
  loadTime: number;
  pageSpeedMetrics?: PageSpeedMetrics | null;
  bodyTextExcerpt: string;
  llmGeoAeo?: LlmGeoAeoResult;
}

function getGrade(score: number): string {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

function isUrlBlockedByRobots(url: string, robotsTxt: string): boolean {
  if (!robotsTxt) return false;
  const rules = robotsTxt.split('\n');
  let currentUserAgent = '';

  for (const line of rules) {
    const trimmedLine = line.trim();
    if (trimmedLine.toLowerCase().startsWith('user-agent:')) {
      currentUserAgent = trimmedLine.split(':')[1].trim();
    }
    if (currentUserAgent === '*' || currentUserAgent.toLowerCase() === 'googlebot') {
      if (trimmedLine.toLowerCase().startsWith('disallow:')) {
        const path = trimmedLine.split(':')[1].trim();
        if (path && new URL(url).pathname.startsWith(path)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Broken link checker helper (limits to 20 to avoid timeouts)
async function checkBrokenLinks(links: string[], baseUrl: string): Promise<number> {
  const toCheck = links.slice(0, 20); // Limit to top 20 links
  let brokenCount = 0;
  
  await Promise.allSettled(
    toCheck.map(async (link) => {
      try {
        const fullUrl = new URL(link, baseUrl).href;
        if (!fullUrl.startsWith('http')) return;
        const res = await axios.head(fullUrl, { timeout: 3000 });
        if (res.status >= 400) brokenCount++;
      } catch (e) {
        brokenCount++;
      }
    })
  );
  return brokenCount;
}

export async function analyzeUrl(url: string): Promise<AnalysisResult> {
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }

  let finalUrl: string;
  let html: string;
  let loadTime: number;
  let responseHeaders: any;
  let redirected = false;

  // Run PageSpeed Insights in parallel with the main fetch
  const psiPromise = fetchPageSpeedData(url).catch(() => null);

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
    responseHeaders = response.headers;
    loadTime = (endTime - startTime) / 1000;
    redirected = new URL(url).href !== new URL(finalUrl).href;
  } catch (error) {
    console.error('Error fetching URL:', error);
    throw new Error('Failed to fetch the website. Please check the URL and try again. The site may be blocking analysis tools.');
  }

  const psiData = await psiPromise;
  const $ = cheerio.load(html);
  const siteUrl = new URL(finalUrl);

  const checks: Record<string, any> = {};

  // --- Comprehensive SEO Data Extraction ---
  const title = $('title').text().trim();
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
  const h1s = $('h1').map((_, el) => $(el).text().trim()).get();
  const h2s = $('h2').map((_, el) => $(el).text().trim()).get();
  const h3s = $('h3').map((_, el) => $(el).text().trim()).get();
  const h4s = $('h4').map((_, el) => $(el).text().trim()).get();
  const lang = $('html').attr('lang');
  const canonical = $('link[rel="canonical"]').attr('href');
  
  const bodyText = $('body').text().replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, "").replace(/<style[^>]*>([\S\s]*?)<\/style>/gmi, "");
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
  checks.wordCountOk = wordCount > 300;

  // Title checks
  checks.titleLengthStatus = title.length === 0 ? 'fail' : (title.length >= 50 && title.length <= 60 ? 'pass' : 'warning');
  
  // Meta description checks
  checks.metaDescStatus = metaDescription.length === 0 ? 'fail' : (metaDescription.length >= 120 && metaDescription.length <= 160 ? 'pass' : 'warning');
  
  // Duplicate content signal
  const titleWordsStr = title.toLowerCase().replace(/[^a-z0-9\s]/g, '');
  const h1WordsStr = h1s[0]?.toLowerCase().replace(/[^a-z0-9\s]/g, '') || '';
  checks.duplicateTitleH1 = titleWordsStr && titleWordsStr === h1WordsStr;

  // H1 checks
  if (h1s.length === 1 && !!h1s[0]) {
    checks.h1Status = 'pass';
  } else if (h1s.length > 1) {
    checks.h1Status = 'warning'; // Multiple H1s are okay in HTML5, but single is best practice
  } else {
    checks.h1Status = 'fail';
  }

  // Header hierarchy
  checks.headerHierarchyStatus = 'pass';
  if (h3s.length > 0 && h2s.length === 0) checks.headerHierarchyStatus = 'fail'; // Skipped H2

  // Image alt texts
  const images = {
    total: $('img').length,
    withAlt: $('img[alt][alt!=""]').length,
  };
  if (images.total === 0) checks.altTagsStatus = 'pass';
  else if (images.withAlt / images.total >= 0.95) checks.altTagsStatus = 'pass';
  else if (images.withAlt / images.total >= 0.5) checks.altTagsStatus = 'warning';
  else checks.altTagsStatus = 'fail';

  checks.isHttps = siteUrl.protocol === 'https:';

  // Robots.txt + Sitemap
  let robotsTxtContent = '';
  let hasRobotsTxt = false;
  try {
    const robotsRes = await axios.get(`${siteUrl.protocol}//${siteUrl.hostname}/robots.txt`, { timeout: 5000 });
    if (robotsRes.status === 200 && robotsRes.data) {
      hasRobotsTxt = true;
      robotsTxtContent = robotsRes.data;
    }
  } catch (e) { /* ignore */ }
  checks.robotsTxtOk = hasRobotsTxt;
  checks.sitemapInRobotsOk = hasRobotsTxt && /sitemap/i.test(robotsTxtContent);
  checks.isBlockedByRobots = isUrlBlockedByRobots(finalUrl, robotsTxtContent);

  const robotsMeta = $('meta[name="robots"]').attr('content') || '';
  checks.isNoIndex = robotsMeta.toLowerCase().includes('noindex');

  // Parse all schema scripts
  const allSchemas: any[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed = JSON.parse($(el).html() || '{}');
      if (Array.isArray(parsed)) allSchemas.push(...parsed);
      else allSchemas.push(parsed);
    } catch (e) {}
  });

  const hasSchemaType = (type: string) => allSchemas.some(s => s['@type'] && (Array.isArray(s['@type']) ? s['@type'].includes(type) : s['@type'] === type || s['@type'].includes(type)));

  checks.hasSchema = allSchemas.length > 0;
  checks.hasLocalBusinessSchema = hasSchemaType('LocalBusiness');
  checks.hasFAQSchema = hasSchemaType('FAQPage');
  checks.hasHowToSchema = hasSchemaType('HowTo');
  checks.hasBreadcrumbSchema = hasSchemaType('BreadcrumbList');
  checks.hasOrganizationSchema = hasSchemaType('Organization');
  checks.hasSpeakableSchema = hasSchemaType('SpeakableSpecification') || allSchemas.some(s => s.speakable);
  checks.hasReviewSchema = hasSchemaType('Review') || hasSchemaType('AggregateRating');
  checks.hasArticleSchema = hasSchemaType('Article') || hasSchemaType('BlogPosting') || hasSchemaType('NewsArticle');

  // E-E-A-T Signals
  const authorSelectors = ['[rel="author"]', '[itemprop="author"]', '.author', '#author', '[class*="author"]', '[class*="byline"]', 'article [class*="by"]'];
  checks.hasAuthorInfo = authorSelectors.some(sel => $(sel).length > 0) || allSchemas.some(s => s.author);

  const dateSelectors = ['time[datetime]', '[itemprop="datePublished"]', '[itemprop="dateModified"]', '.published', '.post-date', '[class*="date"]'];
  checks.hasDatePublished = dateSelectors.some(sel => $(sel).length > 0) || allSchemas.some(s => s.datePublished || s.dateModified);

  checks.langOk = !!lang;
  
  // Canonical check
  if (!canonical) {
    checks.canonicalStatus = 'fail';
  } else if (new URL(canonical, finalUrl).href !== finalUrl) {
    checks.canonicalStatus = 'warning'; // Canonicalized elsewhere, which could be fine, but worth noting
  } else {
    checks.canonicalStatus = 'pass';
  }

  const viewport = $('meta[name="viewport"]').attr('content');
  checks.mobileFriendly = !!viewport && viewport.includes('width=device-width');
  
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const twitterTitle = $('meta[name="twitter:title"]').attr('content');
  checks.socialTagsOk = !!(ogTitle && twitterTitle);

  let hasMixedContent = false;
  if (checks.isHttps) {
    $('img[src^="http://"], script[src^="http://"], link[href^="http://"]').each(() => {
      hasMixedContent = true;
      return false; 
    });
  }
  checks.hasMixedContent = hasMixedContent;
  
  const foundSecurityHeaders = ['content-security-policy', 'x-content-type-options', 'x-frame-options', 'strict-transport-security'].filter(h => responseHeaders[h]);
  if (foundSecurityHeaders.length >= 3) checks.securityHeadersStatus = 'pass';
  else if (foundSecurityHeaders.length > 0) checks.securityHeadersStatus = 'warning';
  else checks.securityHeadersStatus = 'fail';

  const cachingHeader = responseHeaders['cache-control'] || '';
  checks.hasCachingHeaders = /max-age|public|private/.test(cachingHeader);

  checks.isUrlSeoFriendly = finalUrl.length < 100 && !finalUrl.includes('_') && !/[A-Z]/.test(finalUrl.split('?')[0]);

  // Broken Links & Internal linking density
  const linkCounts: LinkCounts = { internal: 0, external: 0, nofollow: 0, broken: 0 };
  const linksToCheck: string[] = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    
    if ($(el).attr('rel')?.includes('nofollow')) linkCounts.nofollow++;

    try {
      const linkUrl = new URL(href, siteUrl.href);
      if (linkUrl.hostname === siteUrl.hostname) {
        linkCounts.internal++;
      } else {
        linkCounts.external++;
      }
      linksToCheck.push(linkUrl.href);
    } catch (e) {
      if (!href.startsWith('http') && !href.startsWith('//')) {
        linkCounts.internal++;
      }
    }
  });

  // Test top 20 links for broken status
  linkCounts.broken = await checkBrokenLinks(linksToCheck, finalUrl);
  checks.brokenLinksStatus = linkCounts.broken === 0 ? 'pass' : 'fail';
  checks.internalLinkingStatus = linkCounts.internal >= 5 ? 'pass' : (linkCounts.internal > 0 ? 'warning' : 'fail');

  // --- GEO / AEO specific checks ---
  checks.contentDepth = wordCount >= 800;
  const h1Text = h1s[0] || '';
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'it']);
  const titleWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !commonWords.has(w));
  const h1Words = h1Text.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !commonWords.has(w));
  checks.hasClearTopicFocus = titleWords.some(w => h1Words.includes(w)) || h1Words.some(w => titleWords.includes(w));
  const expertiseKeywords = /expert|certified|award|years experience|founder|specialist|consultant|professional|accredited|qualified|license/i;
  checks.hasExpertiseSignals = expertiseKeywords.test(bodyText.slice(0, 5000));
  const anchorLinks = $('a[href^="#"]').length;
  checks.hasTableOfContents = anchorLinks >= 3;
  
  const questionHeadings = [...h2s, ...h3s].filter(h => /\?|^what|^how|^why|^when|^where|^who|^which|^can|^does|^is|^are|^do/i.test(h.trim()));
  checks.hasFAQContent = questionHeadings.length >= 2;
  checks.hasListContent = $('ul li, ol li').length >= 3;
  
  const paragraphs = $('p').map((_, el) => $(el).text().trim()).get();
  const shortAnswerParagraphs = paragraphs.filter(p => p.length > 20 && p.length < 200);
  checks.hasVoiceSearchOptimization = shortAnswerParagraphs.length >= 3 && checks.hasFAQContent;

  let directAnswerCount = 0;
  $('h2, h3').each((_, el) => {
    const next = $(el).next('p');
    if (next.length && next.text().length > 30 && next.text().length < 300) {
      directAnswerCount++;
    }
  });
  checks.hasDirectAnswers = directAnswerCount >= 2;

  // --- PageSpeed Insights Mapping ---
  let lcpStatus: 'pass' | 'fail' | 'warning' = 'warning';
  let clsStatus: 'pass' | 'fail' | 'warning' = 'warning';
  let fcpStatus: 'pass' | 'fail' | 'warning' = 'warning';
  
  if (psiData) {
    if (psiData.lcp <= 2500) lcpStatus = 'pass';
    else if (psiData.lcp > 4000) lcpStatus = 'fail';
    
    if (psiData.cls <= 0.1) clsStatus = 'pass';
    else if (psiData.cls > 0.25) clsStatus = 'fail';
    
    if (psiData.fcp <= 1800) fcpStatus = 'pass';
    else if (psiData.fcp > 3000) fcpStatus = 'fail';
  } else {
    // Fallback if API fails
    if (loadTime < 2.5) { lcpStatus = 'pass'; fcpStatus = 'pass'; clsStatus = 'pass'; }
    else if (loadTime < 4.0) { lcpStatus = 'warning'; fcpStatus = 'warning'; clsStatus = 'pass'; }
    else { lcpStatus = 'fail'; fcpStatus = 'fail'; clsStatus = 'warning'; }
  }


  // --- SEO Scoring ---
  let onPagePoints = 0;
  if (checks.titleLengthStatus === 'pass') onPagePoints += 15;
  else if (checks.titleLengthStatus === 'warning') onPagePoints += 7;
  
  if (checks.metaDescStatus === 'pass') onPagePoints += 10;
  else if (checks.metaDescStatus === 'warning') onPagePoints += 5;
  
  if (checks.h1Status === 'pass') onPagePoints += 15;
  else if (checks.h1Status === 'warning') onPagePoints += 7;
  
  if (checks.wordCountOk) onPagePoints += 10;
  if (checks.internalLinkingStatus === 'pass') onPagePoints += 10;
  else if (checks.internalLinkingStatus === 'warning') onPagePoints += 5;
  
  if (lang) onPagePoints += 5;
  if (checks.headerHierarchyStatus === 'pass') onPagePoints += 5;
  if (checks.isUrlSeoFriendly) onPagePoints += 5;
  if (checks.hasLocalBusinessSchema) onPagePoints += 5;
  onPagePoints += 20; // Base points
  const onPageScore = Math.min(100, onPagePoints);

  let technicalPoints = 0;
  if (checks.canonicalStatus === 'pass') technicalPoints += 20;
  else if (checks.canonicalStatus === 'warning') technicalPoints += 10;
  
  if (!checks.isNoIndex) technicalPoints += 20;
  if (checks.robotsTxtOk) technicalPoints += 15;
  if (!checks.isBlockedByRobots) technicalPoints += 15;
  if (checks.sitemapInRobotsOk) technicalPoints += 10;
  if (checks.brokenLinksStatus === 'pass') technicalPoints += 10;
  if (redirected) technicalPoints -= 10;
  technicalPoints += 10; // Base
  const technicalScore = Math.min(100, Math.max(0, technicalPoints));
  
  let performancePoints = 0;
  if (psiData) {
    performancePoints = Math.round(psiData.score * 100);
  } else {
    if (lcpStatus === 'pass') performancePoints += 80; 
    else if (lcpStatus === 'warning') performancePoints += 40; 
    if (checks.hasCachingHeaders) performancePoints += 20;
  }
  const performanceScore = Math.min(100, performancePoints);
  
  let accessibilityPoints = 0;
  if (checks.mobileFriendly) accessibilityPoints += 50;
  if (checks.altTagsStatus === 'pass') accessibilityPoints += 50;
  else if (checks.altTagsStatus === 'warning') accessibilityPoints += 25;
  const accessibilityScore = accessibilityPoints;

  let socialPoints = 0;
  if (checks.socialTagsOk) socialPoints += 70; 
  else if(ogTitle || twitterTitle) socialPoints += 30;
  if (checks.hasSchema) socialPoints += 30;
  const socialScore = socialPoints;

  const overallScoreVal = Math.round((onPageScore + technicalScore + performanceScore + accessibilityScore + socialScore) / 5);

  const categoryScores: SeoCategoryScores = {
    onPage: { score: onPageScore, grade: getGrade(onPageScore) },
    technical: { score: technicalScore, grade: getGrade(technicalScore) },
    performance: { score: performanceScore, grade: getGrade(performanceScore) },
    accessibility: { score: accessibilityScore, grade: getGrade(accessibilityScore) },
    social: { score: socialScore, grade: getGrade(socialScore) },
  };

  // --- GEO Scoring (AI Search Readiness) ---
  let geoPoints = 0;
  if (checks.hasAuthorInfo) geoPoints += 15;
  if (checks.hasDatePublished) geoPoints += 10;
  if (checks.hasFAQSchema) geoPoints += 15;
  if (checks.hasBreadcrumbSchema) geoPoints += 10;
  if (checks.hasClearTopicFocus) geoPoints += 15;
  if (checks.contentDepth) geoPoints += 15;
  if (checks.hasHowToSchema) geoPoints += 10;
  if (checks.hasExpertiseSignals) geoPoints += 10;
  const geoScore = Math.min(100, geoPoints);

  // --- AEO Scoring (Answer Engine Readiness) ---
  let aeoPoints = 0;
  if (checks.hasFAQContent) aeoPoints += 20;
  if (checks.hasListContent) aeoPoints += 15;
  if (checks.hasOrganizationSchema) aeoPoints += 20;
  if (checks.hasReviewSchema) aeoPoints += 15;
  if (checks.hasSpeakableSchema) aeoPoints += 10;
  if (checks.hasVoiceSearchOptimization) aeoPoints += 10;
  if (checks.hasDirectAnswers) aeoPoints += 10;
  const aeoScore = Math.min(100, aeoPoints);

  const geoAeoScores: GeoAeoScores = {
    geo: { score: geoScore, grade: getGrade(geoScore) },
    aeo: { score: aeoScore, grade: getGrade(aeoScore) },
  };

  // --- Recommendations Generation ---
  const recommendations: Recommendation[] = [
    // On-Page SEO
    { 
      id: 'title', check: 'Title Tag Length', description: 'Your title tag is the main headline in search results. It should be 50-60 characters.', 
      fix: checks.titleLengthStatus === 'pass' ? 'Title length is optimal.' : 'Adjust title length to be between 50 and 60 characters.', 
      category: 'On-Page SEO', priority: 'High', status: checks.titleLengthStatus 
    },
    { 
      id: 'title_dup', check: 'Duplicate Title & H1', description: 'Search engines prefer distinct Titles and H1s to capture more keyword variations.', 
      fix: checks.duplicateTitleH1 ? 'Rewrite your H1 to be a natural variation of your Title tag.' : 'Title and H1 are distinct.', 
      category: 'On-Page SEO', priority: 'Medium', status: checks.duplicateTitleH1 ? 'warning' : 'pass' 
    },
    { 
      id: 'meta', check: 'Meta Description Length', description: 'Meta descriptions act as ad copy in search results. Optimal length is 120-160 characters.', 
      fix: checks.metaDescStatus === 'pass' ? 'Meta description is optimal.' : 'Rewrite meta description to be between 120 and 160 characters.', 
      category: 'On-Page SEO', priority: 'High', status: checks.metaDescStatus 
    },
    { 
      id: 'h1', check: 'H1 Tag Presence', description: 'The H1 tag is the main heading. You should have exactly one per page.', 
      fix: checks.h1Status === 'pass' ? 'Single H1 detected.' : (checks.h1Status === 'warning' ? 'Remove extra H1 tags so there is only one.' : 'Add a descriptive H1 tag to the page.'), 
      category: 'On-Page SEO', priority: 'High', status: checks.h1Status 
    },
    { 
      id: 'header_hierarchy', check: 'Header Hierarchy', description: 'Headers (H1, H2, H3) should follow a logical top-down structure without skipping levels.', 
      fix: checks.headerHierarchyStatus === 'pass' ? 'Hierarchy is logical.' : 'Ensure you don\'t skip header levels (e.g., don\'t jump from H1 directly to H3).', 
      category: 'On-Page SEO', priority: 'Medium', status: checks.headerHierarchyStatus 
    },
    { 
      id: 'internal_links', check: 'Internal Linking Density', description: 'Internal links distribute PageRank and help search engines crawl your site.', 
      fix: checks.internalLinkingStatus === 'pass' ? 'Good amount of internal links.' : 'Add more contextually relevant internal links to other pages on your site.', 
      category: 'On-Page SEO', priority: 'Medium', status: checks.internalLinkingStatus 
    },
    { 
      id: 'content', check: 'Sufficient Content', description: `In-depth content tends to rank better. Your page has ${wordCount} words.`, 
      fix: checks.wordCountOk ? 'Content length is sufficient.' : 'Aim for at least 300 words of valuable content.', 
      category: 'On-Page SEO', priority: 'Medium', status: checks.wordCountOk ? 'pass' : 'fail' 
    },
    
    // Technical SEO
    { 
      id: 'canonical', check: 'Canonical Correctness', description: 'A canonical tag prevents duplicate content issues by specifying the "preferred" version of a page.', 
      fix: checks.canonicalStatus === 'pass' ? 'Canonical tag is correct.' : (checks.canonicalStatus === 'warning' ? 'Ensure the canonical points to the right intended version.' : 'Add a self-referencing canonical tag.'), 
      category: 'Technical SEO', priority: 'High', status: checks.canonicalStatus 
    },
    { 
      id: 'noindex', check: 'Indexing Allowed', description: 'Checks if search engines are allowed to index this page.', 
      fix: !checks.isNoIndex ? 'Page is indexable.' : 'Remove the "noindex" directive from the meta robots tag.', 
      category: 'Technical SEO', priority: 'High', status: !checks.isNoIndex ? 'pass' : 'fail' 
    },
    { 
      id: 'robots', check: 'Robots.txt Valid', description: 'A robots.txt file guides search engines on how to crawl your site.', 
      fix: checks.robotsTxtOk ? 'Robots.txt found.' : 'Create a valid robots.txt file in your root directory.', 
      category: 'Technical SEO', priority: 'Medium', status: checks.robotsTxtOk ? 'pass' : 'fail' 
    },
    { 
      id: 'sitemap', check: 'Sitemap in Robots.txt', description: 'Including your sitemap in robots.txt helps search engines find all your pages.', 
      fix: checks.sitemapInRobotsOk ? 'Sitemap found in robots.txt.' : 'Add a "Sitemap: URL" line to your robots.txt.', 
      category: 'Technical SEO', priority: 'Low', status: checks.sitemapInRobotsOk ? 'pass' : 'fail' 
    },
    { 
      id: 'broken_links', check: 'Broken Links', description: `We checked up to 20 links on your page. ${linkCounts.broken} were broken.`, 
      fix: checks.brokenLinksStatus === 'pass' ? 'No broken links detected in the sample.' : 'Fix or remove the 4xx/5xx broken links on this page.', 
      category: 'Technical SEO', priority: 'High', status: checks.brokenLinksStatus 
    },

    // Security
    { 
      id: 'https', check: 'HTTPS Encryption', description: 'Your site must be served over a secure (HTTPS) connection.', 
      fix: checks.isHttps ? 'Connection is secure.' : 'Migrate your page to HTTPS.', 
      category: 'Security', priority: 'High', status: checks.isHttps ? 'pass' : 'fail' 
    },
    { 
      id: 'mixed_content', check: 'Mixed Content', description: 'An HTTPS page should not load insecure (HTTP) resources.', 
      fix: !checks.hasMixedContent ? 'No mixed content.' : 'Change HTTP resource URLs to HTTPS.', 
      category: 'Security', priority: 'High', status: !checks.hasMixedContent ? 'pass' : 'fail' 
    },
    { 
      id: 'security_headers', check: 'Security Headers', description: 'HTTP security headers protect your site from common attacks (HSTS, CSP, X-Frame-Options).', 
      fix: checks.securityHeadersStatus === 'pass' ? 'Security headers are well configured.' : 'Implement missing security headers via your server configuration.', 
      category: 'Security', priority: 'Medium', status: checks.securityHeadersStatus 
    },

    // Performance (Core Web Vitals from PSI)
    { 
      id: 'lcp', check: 'Largest Contentful Paint (LCP)', description: `LCP measures loading performance. Value: ${psiData ? (psiData.lcp/1000).toFixed(2)+'s' : loadTime.toFixed(2)+'s'}. Target: < 2.5s.`, 
      fix: lcpStatus === 'pass' ? 'LCP is fast.' : 'Optimize the largest image or text block. Use a CDN and optimize server response times.', 
      category: 'Performance', priority: 'High', status: lcpStatus 
    },
    { 
      id: 'cls', check: 'Cumulative Layout Shift (CLS)', description: `CLS measures visual stability. Value: ${psiData ? psiData.cls.toFixed(3) : 'N/A'}. Target: < 0.1.`, 
      fix: clsStatus === 'pass' ? 'Layout is stable.' : 'Set explicit width/height on images and ads to prevent layout shifts.', 
      category: 'Performance', priority: 'High', status: clsStatus 
    },
    { 
      id: 'fcp', check: 'First Contentful Paint (FCP)', description: `FCP marks when the first text/image is painted. Value: ${psiData ? (psiData.fcp/1000).toFixed(2)+'s' : loadTime.toFixed(2)+'s'}. Target: < 1.8s.`, 
      fix: fcpStatus === 'pass' ? 'FCP is fast.' : 'Eliminate render-blocking resources and reduce server response time (TTFB).', 
      category: 'Performance', priority: 'Medium', status: fcpStatus 
    },

    // Accessibility & Social
    { 
      id: 'mobile', check: 'Mobile-Friendliness', description: 'A mobile-friendly site is essential as most users search on mobile devices.', 
      fix: checks.mobileFriendly ? 'Viewport meta tag is present.' : 'Add the viewport meta tag for responsive design.', 
      category: 'Accessibility', priority: 'High', status: checks.mobileFriendly ? 'pass' : 'fail' 
    },
    { 
      id: 'alt', check: 'Image Alt Text Coverage', description: `You have alt text on ${images.withAlt} of ${images.total} images. Target: >95%.`, 
      fix: checks.altTagsStatus === 'pass' ? 'Alt text coverage is good.' : 'Add descriptive alt text to all informative images.', 
      category: 'Accessibility', priority: 'Medium', status: checks.altTagsStatus 
    },
    { 
      id: 'schema', check: 'Structured Data Presence', description: 'Schema markup helps search engines understand your content better.', 
      fix: checks.hasSchema ? 'Schema found.' : 'Implement JSON-LD structured data on your page.', 
      category: 'Social', priority: 'Medium', status: checks.hasSchema ? 'pass' : 'warning' 
    },
  ];

  // --- GEO + AEO Checklist ---
  const geoAeoChecks: GeoAeoCheck[] = [
    { id: 'author_info', type: 'GEO', check: 'Author / E-E-A-T Signals', description: 'AI search engines prioritize content from identifiable, credible authors.', fix: 'Add a visible author byline or author schema markup.', status: checks.hasAuthorInfo ? 'pass' : 'fail', priority: 'High' },
    { id: 'date_published', type: 'GEO', check: 'Published / Updated Date', description: 'AI engines prefer recently updated content.', fix: 'Add a <time> element or datePublished schema.', status: checks.hasDatePublished ? 'pass' : 'fail', priority: 'High' },
    { id: 'content_depth', type: 'GEO', check: 'Content Depth (800+ words)', description: 'AI models surface comprehensive content.', fix: `Expand your content to cover the topic comprehensively (currently ${wordCount} words).`, status: checks.contentDepth ? 'pass' : 'warning', priority: 'High' },
    { id: 'topic_focus', type: 'GEO', check: 'Clear Topic Focus', description: 'AI engines extract the central topic from your H1 and title.', fix: 'Make sure your H1 and title tag share key topic words.', status: checks.hasClearTopicFocus ? 'pass' : 'warning', priority: 'Medium' },
    { id: 'faq_schema', type: 'GEO', check: 'FAQ Schema Markup', description: 'FAQ schema helps AI engines directly extract Q&A content.', fix: 'Add FAQPage JSON-LD schema.', status: checks.hasFAQSchema ? 'pass' : 'fail', priority: 'High' },
    { id: 'howto_schema', type: 'GEO', check: 'HowTo Schema Markup', description: 'Helps AI assistants provide step-by-step instructions.', fix: 'Add HowTo JSON-LD schema with defined steps.', status: checks.hasHowToSchema ? 'pass' : 'fail', priority: 'Medium' },
    { id: 'expertise_signals', type: 'GEO', check: 'Expertise Signals', description: 'Words like "certified", "expert" signal credibility.', fix: 'Include mentions of qualifications or years of experience.', status: checks.hasExpertiseSignals ? 'pass' : 'warning', priority: 'Medium' },
    
    { id: 'faq_headings', type: 'AEO', check: 'FAQ-Style Headings', description: 'Answer engines match user questions to question-formatted headings.', fix: 'Rewrite some headings as questions.', status: checks.hasFAQContent ? 'pass' : 'fail', priority: 'High' },
    { id: 'direct_answers', type: 'AEO', check: 'Direct Answer Paragraphs', description: 'Google looks for concise paragraphs immediately following question headings.', fix: 'Write a clear, concise answer (40-60 words) right after headings.', status: checks.hasDirectAnswers ? 'pass' : 'fail', priority: 'High' },
    { id: 'list_content', type: 'AEO', check: 'Structured List Content', description: 'Lists are preferred for steps or features in featured snippets.', fix: 'Convert some paragraph content into bulleted lists.', status: checks.hasListContent ? 'pass' : 'warning', priority: 'Medium' },
    { id: 'org_schema', type: 'AEO', check: 'Organization Schema', description: 'Provides AI structured information about your business.', fix: 'Add Organization JSON-LD schema.', status: checks.hasOrganizationSchema ? 'pass' : 'fail', priority: 'High' },
    { id: 'review_schema', type: 'AEO', check: 'Review Schema', description: 'Increases trust signals for AI-generated recommendations.', fix: 'Add Review or AggregateRating schema.', status: checks.hasReviewSchema ? 'pass' : 'fail', priority: 'Medium' },
  ];

  return {
    url,
    finalUrl,
    redirected,
    overallScore: { score: overallScoreVal, grade: getGrade(overallScoreVal) },
    categoryScores,
    geoAeoScores,
    geoAeoChecks,
    recommendations,
    title,
    metaDescription,
    h1s, h2s, h3s, h4s,
    wordCount,
    linkCounts,
    hasSchema: checks.hasSchema,
    hasRobotsTxt: checks.robotsTxtOk,
    hasSitemapInRobots: checks.sitemapInRobotsOk,
    lang,
    canonical,
    loadTime,
    pageSpeedMetrics: psiData,
    bodyTextExcerpt: bodyText.slice(0, 1000)
  };
}
