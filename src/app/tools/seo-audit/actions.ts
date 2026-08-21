'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { fetchPageSpeedData, type PageSpeedMetrics } from '@/lib/pagespeed';
import type { LlmGeoAeoResult } from '@/lib/gemini-geo-aeo';
import type { CompetitorAnalysis } from '@/lib/competitor-engine';
import type { CompetitorStrategyReport } from '@/lib/strategy-advisor';

// ── Interfaces for Structured Results ─────────────────────────────────────────

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
  codeSnippet?: string;
  status: 'pass' | 'fail' | 'warning';
  priority: 'High' | 'Medium' | 'Low';
  type: 'GEO' | 'AEO';
}

export interface Recommendation {
  id: string;
  check: string;
  description: string;
  fix: string;
  codeSnippet?: string;
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

export interface AiOpennessResult {
  score: number; // 0-100%
  allowedBots: string[];
  blockedBots: string[];
  hasLlmsTxt: boolean;
  hasAgentJson: boolean;
  hasAiPluginJson: boolean;
}

export interface AiReadabilityResult {
  score: number; // 0-100%
  contentToCodeRatio: number; // percentage
  headingStructureGrade: string;
  cleanTextWords: number;
}

export interface IssueStats {
  total: number;
  passed: number;
  warnings: number;
  errors: number;
  passPercent: number;
  warningPercent: number;
  errorPercent: number;
}

export interface LighthouseCategoryScores {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
}

export interface AnalysisResult {
  url: string;
  finalUrl: string;
  redirected: boolean;
  overallScore: { score: number; grade: string };
  categoryScores: SeoCategoryScores;
  lighthouseScores: LighthouseCategoryScores;
  geoAeoScores: GeoAeoScores;
  aiOpenness: AiOpennessResult;
  aiReadability: AiReadabilityResult;
  issueStats: IssueStats;
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
  psiDataSource?: 'mobile' | 'desktop' | 'estimated';
  bodyTextExcerpt: string;
  llmGeoAeo?: LlmGeoAeoResult;
  // Competitor Intelligence
  competitorAnalysis?: CompetitorAnalysis | null;
  strategyReport?: CompetitorStrategyReport | null;
}

function getGrade(score: number): string {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

function isUrlBlockedByRobots(url: string, robotsTxt: string, targetAgent: string): boolean {
  if (!robotsTxt || robotsTxt.trim().length === 0) return false;
  const lines = robotsTxt.split('\n');
  let currentAgent = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.toLowerCase().startsWith('user-agent:')) {
      currentAgent = trimmed.split(':')[1]?.trim().toLowerCase() || '';
    }
    if (currentAgent === '*' || currentAgent === targetAgent.toLowerCase()) {
      if (trimmed.toLowerCase().startsWith('disallow:')) {
        const path = trimmed.split(':')[1]?.trim();
        if (path === '/' || (path && new URL(url).pathname.startsWith(path))) {
          return true;
        }
      }
    }
  }
  return false;
}

export async function analyzeUrl(urlInput: string): Promise<AnalysisResult> {
  const startTime = Date.now();
  let url = urlInput.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  let finalUrl = url;
  let redirected = false;
  let html = '';
  let statusCode = 200;
  let headers: Record<string, string> = {};

  try {
    const response = await axios.get(url, {
      timeout: 12000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      maxRedirects: 5,
      validateStatus: () => true,
    });

    statusCode = response.status;
    html = typeof response.data === 'string' ? response.data : '';
    headers = response.headers as Record<string, string>;

    if (response.request && response.request.res && response.request.res.responseUrl) {
      finalUrl = response.request.res.responseUrl;
      redirected = finalUrl !== url;
    }
  } catch (err: any) {
    statusCode = 500;
    html = '';
  }

  const loadTime = Date.now() - startTime;
  const $ = cheerio.load(html);

  // Parallel Fetch: PageSpeed 4 Categories (mobile+desktop for best coverage) + Robots.txt + LLMs.txt
  const domainUrl = new URL(finalUrl).origin;

  // Try mobile first; if it fails/times-out, fall back to desktop result
  const [psiMobile, psiDesktop, robotsRes, llmsRes, agentJsonRes] = await Promise.all([
    fetchPageSpeedData(finalUrl, 'mobile').catch(() => null),
    fetchPageSpeedData(finalUrl, 'desktop').catch(() => null),
    axios.get(`${domainUrl}/robots.txt`, { 
      timeout: 5000, 
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AdsVerseAudit/2.0)' }, 
      validateStatus: () => true 
    }).catch(() => null),
    axios.get(`${domainUrl}/llms.txt`, { 
      timeout: 5000, 
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AdsVerseAudit/2.0)' }, 
      validateStatus: () => true 
    }).catch(() => null),
    axios.get(`${domainUrl}/.well-known/agent.json`, { 
      timeout: 5000, 
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AdsVerseAudit/2.0)' }, 
      validateStatus: () => true 
    }).catch(() => null),
  ]);

  // Use mobile PSI preferentially; fall back to desktop if mobile timed out
  const psiData = psiMobile ?? psiDesktop;
  const psiSource: 'mobile' | 'desktop' | 'estimated' = psiMobile ? 'mobile' : psiDesktop ? 'desktop' : 'estimated';
  if (psiSource !== 'estimated') {
    console.log(`[analyzeUrl] PSI data source: ${psiSource} — Performance=${psiData?.performanceScore}, SEO=${psiData?.seoScore}, A11y=${psiData?.accessibilityScore}, BP=${psiData?.bestPracticesScore}`);
  } else {
    console.warn(`[analyzeUrl] PSI API unavailable for ${finalUrl} — using estimated scores`);
  }

  const robotsTxt = robotsRes && robotsRes.status === 200 && typeof robotsRes.data === 'string' ? robotsRes.data : '';
  const hasLlmsTxt = llmsRes ? llmsRes.status === 200 : false;
  const hasAgentJson = agentJsonRes ? agentJsonRes.status === 200 : false;
  const hasAiPluginJson = $('link[rel="ai-plugin"]').length > 0;

  // ── AI Bot Permissions (AI Openness) ──
  const aiBotsToCheck = ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'ClaudeBot', 'Applebot-Extended', 'CCBot'];
  const allowedBots: string[] = [];
  const blockedBots: string[] = [];

  for (const bot of aiBotsToCheck) {
    if (isUrlBlockedByRobots(finalUrl, robotsTxt, bot)) {
      blockedBots.push(bot);
    } else {
      allowedBots.push(bot);
    }
  }

  const botRatio = allowedBots.length / aiBotsToCheck.length;
  const discoveryBonus = (hasLlmsTxt ? 15 : 0) + (hasAgentJson ? 10 : 0);
  const aiOpennessScore = Math.min(100, Math.round(botRatio * 75 + discoveryBonus));

  // ── DOM Parsing & Content Extraction ──
  const title = $('title').first().text().trim();
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
  const canonical = $('link[rel="canonical"]').attr('href')?.trim();
  const lang = $('html').attr('lang')?.trim();
  const isNoIndex = $('meta[name="robots"]').attr('content')?.toLowerCase().includes('noindex') || false;
  const viewport = $('meta[name="viewport"]').attr('content')?.trim();
  const charset = $('meta[charset]').attr('charset') || $('meta[http-equiv="Content-Type"]').attr('content') || '';
  const favicon = $('link[rel*="icon"]').attr('href');

  // Open Graph & Social
  const ogTitle = $('meta[property="og:title"]').attr('content')?.trim();
  const ogDesc = $('meta[property="og:description"]').attr('content')?.trim();
  const ogImage = $('meta[property="og:image"]').attr('content')?.trim();
  const ogUrl = $('meta[property="og:url"]').attr('content')?.trim();
  const hasCompleteOg = !!(ogTitle && ogDesc && ogImage);

  // Twitter Cards
  const twitterCard = $('meta[name="twitter:card"]').attr('content')?.trim();
  const twitterTitle = $('meta[name="twitter:title"]').attr('content')?.trim();
  const twitterImage = $('meta[name="twitter:image"]').attr('content')?.trim();
  const hasCompleteTwitter = !!(twitterCard && (twitterTitle || ogTitle));

  const h1s: string[] = [];
  $('h1').each((_, el) => { const t = $(el).text().trim(); if (t) h1s.push(t); });
  const h2s: string[] = [];
  $('h2').each((_, el) => { const t = $(el).text().trim(); if (t) h2s.push(t); });
  const h3s: string[] = [];
  $('h3').each((_, el) => { const t = $(el).text().trim(); if (t) h3s.push(t); });
  const h4s: string[] = [];
  $('h4').each((_, el) => { const t = $(el).text().trim(); if (t) h4s.push(t); });

  // Clean body text for readability
  $('script, style, noscript, svg, iframe').remove();
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const words = bodyText ? bodyText.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  // Content-to-Code Ratio
  const htmlSize = html.length || 1;
  const textSize = bodyText.length;
  const contentToCodeRatio = Math.min(100, Math.round((textSize / htmlSize) * 100));
  const headingGrade = h1s.length === 1 && h2s.length >= 2 ? 'Optimal' : h1s.length > 0 ? 'Good' : 'Needs Structure';
  const aiReadabilityScore = Math.min(100, Math.round(
    (contentToCodeRatio > 15 ? 35 : contentToCodeRatio * 2.3) +
    (h1s.length === 1 ? 25 : h1s.length > 0 ? 15 : 0) +
    (h2s.length >= 3 ? 20 : h2s.length * 6) +
    (wordCount >= 600 ? 20 : (wordCount / 600) * 20)
  ));

  // Images and links
  const images = { total: 0, withAlt: 0, missingAlt: 0 };
  $('img').each((_, el) => {
    images.total++;
    if ($(el).attr('alt')?.trim()) {
      images.withAlt++;
    } else {
      images.missingAlt++;
    }
  });

  const linkCounts: LinkCounts = { internal: 0, external: 0, nofollow: 0, broken: 0 };
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href')?.trim();
    const rel = $(el).attr('rel') || '';
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

    if (rel.includes('nofollow')) linkCounts.nofollow++;
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (href.includes(domainUrl)) linkCounts.internal++;
      else linkCounts.external++;
    } else if (href.startsWith('/') || !href.includes(':')) {
      linkCounts.internal++;
    }
  });

  // Schema Detection
  let hasSchema = false;
  let hasFAQSchema = false;
  let hasOrganizationSchema = false;
  let hasHowToSchema = false;
  let detectedSchemas: string[] = [];

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html() || '');
      hasSchema = true;
      const str = JSON.stringify(data).toLowerCase();
      if (str.includes('faqpage')) { hasFAQSchema = true; detectedSchemas.push('FAQPage'); }
      if (str.includes('organization') || str.includes('localbusiness')) { hasOrganizationSchema = true; detectedSchemas.push('Organization/LocalBusiness'); }
      if (str.includes('howto')) { hasHowToSchema = true; detectedSchemas.push('HowTo'); }
      if (str.includes('product')) detectedSchemas.push('Product');
      if (str.includes('article') || str.includes('blogposting')) detectedSchemas.push('Article');
      if (str.includes('breadcrumblist')) detectedSchemas.push('BreadcrumbList');
    } catch {}
  });

  // Security and Headers
  const isHttps = finalUrl.startsWith('https://');
  const hasHsts = !!(headers['strict-transport-security']);
  const hasXFrame = !!(headers['x-frame-options']);
  const hasContentTypeOpt = !!(headers['x-content-type-options']);
  const hasMixedContent = isHttps && /src=["']http:\/\//i.test(html);

  // ── Compute Real Category Scores ──
  const titleStatus = (title.length >= 30 && title.length <= 65) ? 'pass' : (title.length > 0 ? 'warning' : 'fail');
  const descStatus = (metaDescription.length >= 110 && metaDescription.length <= 165) ? 'pass' : (metaDescription.length > 0 ? 'warning' : 'fail');
  const h1Status = h1s.length === 1 ? 'pass' : (h1s.length > 1 ? 'warning' : 'fail');
  const altStatus = images.total === 0 || images.missingAlt === 0 ? 'pass' : (images.withAlt / (images.total || 1) >= 0.7 ? 'warning' : 'fail');
  const canonicalStatus = canonical ? 'pass' : 'warning';
  const robotsOk = robotsTxt.length > 0;
  const sitemapInRobots = /sitemap:\s*https?:\/\//i.test(robotsTxt);

  // ── Lighthouse 4 Pillars ──
  // If Google PageSpeed Insights succeeded, use real Google lab scores.
  // Otherwise, compute REALISTIC benchmarks that vary per site (avoid always-100 fallbacks).

  // Performance: Based on actual load time, HTML size, and server response
  const estimatedPerf = Math.min(88, Math.max(25, Math.round(
    100
    - (loadTime > 8000 ? 35 : loadTime > 5000 ? 20 : loadTime > 3000 ? 10 : loadTime > 1500 ? 5 : 0)
    - (htmlSize > 500000 ? 20 : htmlSize > 200000 ? 10 : htmlSize > 100000 ? 5 : 0)
    - (statusCode >= 400 ? 30 : 0)
    - (hasMixedContent ? 5 : 0)
  )));

  // SEO: Weighted scoring — but capped at 85 when estimated (real Google catches many more issues)
  const seoPoints =
    (titleStatus === 'pass' ? 22 : titleStatus === 'warning' ? 12 : 0) +
    (descStatus === 'pass' ? 22 : descStatus === 'warning' ? 12 : 0) +
    (h1Status === 'pass' ? 18 : h1Status === 'warning' ? 8 : 0) +
    (canonical ? 12 : 0) +
    (robotsOk ? 12 : 0) +
    (!isNoIndex ? 7 : -25) +
    (viewport ? 7 : 0);
  const estimatedSeo = Math.min(85, Math.max(15, seoPoints));

  // Accessibility: Real Lighthouse checks 50+ rules; our DOM scan is limited, so cap at 72
  const a11yPoints =
    (lang ? 20 : 0) +
    (altStatus === 'pass' ? 25 : altStatus === 'warning' ? 12 : 0) +
    (viewport ? 15 : 0) +
    (images.total === 0 ? 10 : 0) + // bonus if no images to alt-check
    (h1Status === 'pass' ? 10 : 0);
  const estimatedAccess = Math.min(72, Math.max(20, a11yPoints));

  // Best Practices: HTTPS + headers + mixed content
  const bpPoints =
    (isHttps ? 35 : 0) +
    (hasHsts ? 25 : 8) +
    (hasXFrame ? 15 : 5) +
    (hasContentTypeOpt ? 15 : 5) +
    (!hasMixedContent ? 10 : 0);
  const estimatedBest = Math.min(78, Math.max(20, bpPoints));

  const lighthouseScores: LighthouseCategoryScores = {
    performance: psiData?.performanceScore ?? estimatedPerf,
    seo: psiData?.seoScore ?? estimatedSeo,
    accessibility: psiData?.accessibilityScore ?? estimatedAccess,
    bestPractices: psiData?.bestPracticesScore ?? estimatedBest,
  };

  // Log whether we used real or estimated scores
  console.log(`[analyzeUrl] Final lighthouseScores (source=${psiSource}):`, JSON.stringify(lighthouseScores));

  const onPageScore = Math.round(
    (titleStatus === 'pass' ? 25 : titleStatus === 'warning' ? 15 : 0) +
    (descStatus === 'pass' ? 25 : descStatus === 'warning' ? 15 : 0) +
    (h1Status === 'pass' ? 25 : h1Status === 'warning' ? 12 : 0) +
    (wordCount >= 500 ? 25 : Math.round((wordCount / 500) * 25))
  );

  const technicalScore = Math.round(
    (isHttps ? 25 : 0) +
    (robotsOk ? 25 : 0) +
    (canonical ? 25 : 10) +
    (sitemapInRobots ? 25 : 0)
  );

  const socialScore = Math.round(
    (hasCompleteOg ? 50 : (ogTitle || ogImage) ? 25 : 0) +
    (hasCompleteTwitter ? 30 : twitterCard ? 15 : 0) +
    (hasSchema ? 20 : 0)
  );

  const categoryScores: SeoCategoryScores = {
    onPage: { score: onPageScore, grade: getGrade(onPageScore) },
    technical: { score: technicalScore, grade: getGrade(technicalScore) },
    performance: { score: lighthouseScores.performance, grade: getGrade(lighthouseScores.performance) },
    accessibility: { score: lighthouseScores.accessibility, grade: getGrade(lighthouseScores.accessibility) },
    social: { score: socialScore, grade: getGrade(socialScore) },
  };

  const geoScoreVal = Math.min(100, Math.round((aiOpennessScore * 0.45) + (aiReadabilityScore * 0.35) + (hasOrganizationSchema ? 20 : 5)));
  const aeoScoreVal = Math.min(100, Math.round((hasFAQSchema ? 35 : 10) + (h2s.length >= 3 ? 30 : h2s.length * 10) + (wordCount >= 400 ? 35 : (wordCount / 400) * 35)));

  const geoAeoScores: GeoAeoScores = {
    geo: { score: geoScoreVal, grade: getGrade(geoScoreVal) },
    aeo: { score: aeoScoreVal, grade: getGrade(aeoScoreVal) },
  };

  const overallScoreVal = Math.round(
    (lighthouseScores.performance * 0.25) +
    (onPageScore * 0.25) +
    (technicalScore * 0.20) +
    (geoScoreVal * 0.15) +
    (aeoScoreVal * 0.15)
  );

  // ── Construct 25+ Comprehensive Recommendations with Code Solutions ──
  const recommendations: Recommendation[] = [
    // On-Page SEO
    {
      id: 'title_tag',
      check: 'Title Tag Optimization',
      description: title ? `Current title: "${title}" (${title.length} characters). Target: 30-65 characters.` : 'No title tag found in <head>.',
      fix: titleStatus === 'pass' ? 'Title length and keyword formatting are ideal.' : 'Craft a 50-60 character title containing your primary keyword, brand name, and unique selling point.',
      codeSnippet: `<title>${title ? title.slice(0, 50) : 'Brand Name'} | Primary Service & Location</title>`,
      category: 'On-Page SEO',
      priority: 'High',
      status: titleStatus,
    },
    {
      id: 'meta_description',
      check: 'Meta Description Tag',
      description: metaDescription ? `Current meta description is ${metaDescription.length} characters. Target: 120-160 characters.` : 'Missing meta description tag in <head>.',
      fix: descStatus === 'pass' ? 'Meta description is within ideal search snippet bounds.' : 'Add a compelling meta description (120-160 characters) with target keywords and a clear call-to-action.',
      codeSnippet: `<meta name="description" content="${metaDescription ? metaDescription.slice(0, 140) : 'Explore industry-leading solutions designed to increase customer engagement and search visibility.'}" />`,
      category: 'On-Page SEO',
      priority: 'High',
      status: descStatus,
    },
    {
      id: 'h1_heading',
      check: 'H1 Primary Heading Structure',
      description: h1s.length === 1 ? `Unique H1 tag found: "${h1s[0]}"` : h1s.length > 1 ? `Found ${h1s.length} H1 tags (${h1s.slice(0, 2).map(h => `"${h}"`).join(', ')}...). Search engines expect exactly 1 main H1.` : 'No H1 tag detected on this page.',
      fix: h1Status === 'pass' ? 'H1 structure is clear and unique.' : 'Ensure your page has exactly one main H1 tag summarizing the core offering.',
      codeSnippet: `<h1>${h1s[0] || (title ? title.slice(0, 45) : 'Core Business Offering')}</h1>`,
      category: 'On-Page SEO',
      priority: 'High',
      status: h1Status,
    },
    {
      id: 'content_depth',
      check: 'Content Word Count & Depth',
      description: `Page contains ${wordCount} words (${Math.round(htmlSize / 1024)} KB HTML). High-ranking pages typically feature 600+ comprehensive words.`,
      fix: wordCount >= 600 ? 'Content depth is extensive and informative.' : 'Expand the on-page copy to at least 600 words covering core features, case studies, and customer FAQs.',
      codeSnippet: `<section>\n  <h2>Comprehensive Service Guide</h2>\n  <p>Detailed explanation of features, workflow, FAQs, and transparent pricing...</p>\n</section>`,
      category: 'On-Page SEO',
      priority: 'Medium',
      status: wordCount >= 600 ? 'pass' : wordCount >= 300 ? 'warning' : 'fail',
    },
    {
      id: 'open_graph',
      check: 'Open Graph (Social Sharing) Tags',
      description: hasCompleteOg ? `Open Graph configured (og:title: "${ogTitle}").` : 'Missing one or more essential Open Graph tags (og:title, og:description, or og:image).',
      fix: hasCompleteOg ? 'Social sharing snippets are well-structured.' : 'Add Open Graph meta tags so links display rich cards on WhatsApp, LinkedIn, and Facebook.',
      codeSnippet: `<meta property="og:title" content="${title || 'Brand Name'}" />\n<meta property="og:description" content="${metaDescription || 'Service Description'}" />\n<meta property="og:image" content="${domainUrl}/og-image.jpg" />\n<meta property="og:url" content="${finalUrl}" />`,
      category: 'Social',
      priority: 'Medium',
      status: hasCompleteOg ? 'pass' : 'warning',
    },

    // Technical SEO
    {
      id: 'canonical_tag',
      check: 'Canonical URL Tag',
      description: canonical ? `Canonical link configured: "${canonical}"` : 'No canonical link tag specified in <head>.',
      fix: canonical ? 'Canonical link is properly defined.' : 'Add a self-referencing canonical tag in <head> to prevent duplicate URL indexing penalties.',
      codeSnippet: `<link rel="canonical" href="${finalUrl}" />`,
      category: 'Technical SEO',
      priority: 'High',
      status: canonicalStatus,
    },
    {
      id: 'robots_txt',
      check: 'Robots.txt Crawlability',
      description: robotsOk ? `Valid robots.txt discovered (${robotsTxt.split('\n').length} lines).` : 'Robots.txt file missing at root domain /robots.txt.',
      fix: robotsOk ? 'Robots.txt is active and readable.' : 'Create a robots.txt file in your public directory specifying allowed crawlers and XML sitemap link.',
      codeSnippet: `User-agent: *\nAllow: /\n\nSitemap: ${domainUrl}/sitemap.xml`,
      category: 'Technical SEO',
      priority: 'Medium',
      status: robotsOk ? 'pass' : 'fail',
    },
    {
      id: 'sitemap_link',
      check: 'XML Sitemap Link in Robots.txt',
      description: sitemapInRobots ? 'Sitemap reference found in robots.txt.' : 'No "Sitemap: URL" directive found in robots.txt.',
      fix: sitemapInRobots ? 'XML Sitemap is linked.' : 'Add a Sitemap line to robots.txt to assist search bot indexing.',
      codeSnippet: `Sitemap: ${domainUrl}/sitemap.xml`,
      category: 'Technical SEO',
      priority: 'Low',
      status: sitemapInRobots ? 'pass' : 'fail',
    },
    {
      id: 'indexing_directive',
      check: 'Noindex Directive Verification',
      description: !isNoIndex ? 'Page is fully indexable by search engines.' : 'Page contains a "noindex" robots meta tag blocking Google.',
      fix: !isNoIndex ? 'Indexing is permitted.' : 'Remove "noindex" from your meta robots tag to allow Google to rank this page.',
      codeSnippet: `<meta name="robots" content="index, follow, max-image-preview:large" />`,
      category: 'Technical SEO',
      priority: 'High',
      status: !isNoIndex ? 'pass' : 'fail',
    },

    // Performance & Core Web Vitals
    {
      id: 'lcp_vitals',
      check: 'Largest Contentful Paint (LCP)',
      description: psiData?.lcp ? `LCP speed: ${(psiData.lcp / 1000).toFixed(2)}s. Target: < 2.5s.` : `Server load time: ${(loadTime / 1000).toFixed(2)}s.`,
      fix: (psiData?.lcp ?? loadTime) < 2500 ? 'LCP render speed is fast.' : 'Preload hero images, use next/image with priority, and cache static assets on a global CDN.',
      codeSnippet: `<link rel="preload" as="image" href="/hero-banner.webp" fetchpriority="high" />`,
      category: 'Performance',
      priority: 'High',
      status: (psiData?.lcp ?? loadTime) < 2500 ? 'pass' : (psiData?.lcp ?? loadTime) < 4000 ? 'warning' : 'fail',
    },
    {
      id: 'fcp_vitals',
      check: 'First Contentful Paint (FCP)',
      description: psiData?.fcp ? `FCP speed: ${(psiData.fcp / 1000).toFixed(2)}s. Target: < 1.8s.` : `First paint response time: ${(loadTime / 1000).toFixed(2)}s.`,
      fix: (psiData?.fcp ?? loadTime) < 1800 ? 'FCP paints promptly.' : 'Defer non-critical third-party JavaScript and inline critical layout CSS.',
      codeSnippet: `<script src="third-party.js" defer></script>`,
      category: 'Performance',
      priority: 'Medium',
      status: (psiData?.fcp ?? loadTime) < 1800 ? 'pass' : 'warning',
    },
    {
      id: 'cls_vitals',
      check: 'Cumulative Layout Shift (CLS)',
      description: `CLS layout stability value: ${psiData?.cls !== undefined ? psiData.cls.toFixed(3) : '0.000'}. Target: < 0.1.`,
      fix: (psiData?.cls ?? 0) < 0.1 ? 'Page layout is visually stable.' : 'Specify explicit width and height attributes on all images and ad containers.',
      codeSnippet: `<Image src="/logo.png" width={180} height={48} alt="Brand Logo" />`,
      category: 'Performance',
      priority: 'High',
      status: (psiData?.cls ?? 0) < 0.1 ? 'pass' : 'fail',
    },

    // Security
    {
      id: 'https_ssl',
      check: 'HTTPS / SSL Encryption',
      description: isHttps ? 'Page is securely served over HTTPS.' : 'Insecure HTTP connection detected.',
      fix: isHttps ? 'SSL encryption is active.' : 'Install a valid SSL certificate and enforce 301 redirects from HTTP to HTTPS.',
      codeSnippet: `// Enforce 301 Redirect HTTP -> HTTPS in server configuration`,
      category: 'Security',
      priority: 'High',
      status: isHttps ? 'pass' : 'fail',
    },
    {
      id: 'mixed_content',
      check: 'Mixed Content Scan',
      description: !hasMixedContent ? 'No insecure HTTP resources found on HTTPS page.' : 'Page contains insecure HTTP images, scripts, or stylesheets.',
      fix: !hasMixedContent ? 'Zero mixed content.' : 'Update all asset URLs from http:// to https://.',
      codeSnippet: `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />`,
      category: 'Security',
      priority: 'High',
      status: !hasMixedContent ? 'pass' : 'fail',
    },
    {
      id: 'security_headers',
      check: 'HTTP Security Headers (HSTS & X-Frame)',
      description: hasHsts && hasXFrame ? 'HSTS and X-Frame-Options configured.' : 'Missing one or more security headers (HSTS, CSP, X-Frame-Options).',
      fix: hasHsts ? 'Security headers are strong.' : 'Configure Strict-Transport-Security and X-Frame-Options headers on your origin server.',
      codeSnippet: `Strict-Transport-Security: max-age=31536000; includeSubDomains\nX-Frame-Options: SAMEORIGIN\nX-Content-Type-Options: nosniff`,
      category: 'Security',
      priority: 'Medium',
      status: hasHsts ? 'pass' : 'warning',
    },

    // Accessibility
    {
      id: 'image_alts',
      check: 'Image Alt Text Coverage',
      description: images.total > 0 ? `${images.withAlt} of ${images.total} images have descriptive ALT attributes (${images.missingAlt} missing).` : 'No images found on page.',
      fix: altStatus === 'pass' ? 'Image accessibility is high.' : 'Add concise, descriptive alt text to all informative images.',
      codeSnippet: `<img src="/service-icon.png" alt="Descriptive label for screen readers" />`,
      category: 'Accessibility',
      priority: 'High',
      status: altStatus,
    },
    {
      id: 'html_lang',
      check: 'HTML Language Declaration',
      description: lang ? `HTML lang attribute is declared: "${lang}".` : 'Missing lang attribute on <html> element.',
      fix: lang ? 'Language is defined.' : 'Add lang="en" (or your target language) to the root <html> tag for screen readers.',
      codeSnippet: `<html lang="en">`,
      category: 'Accessibility',
      priority: 'Medium',
      status: lang ? 'pass' : 'fail',
    },
  ];

  // ── GEO & AEO Checks ──
  const geoAeoChecks: GeoAeoCheck[] = [
    {
      id: 'ai_openness_bots',
      type: 'GEO',
      check: 'AI Search Crawler Permissions (GPTBot, ClaudeBot, Perplexity)',
      description: blockedBots.length === 0 ? 'All major AI search bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are permitted in robots.txt.' : `Robots.txt blocks ${blockedBots.join(', ')}.`,
      fix: blockedBots.length === 0 ? 'AI bots have unrestricted crawling access.' : 'Allow AI search crawlers in robots.txt so LLMs can read and cite your website.',
      codeSnippet: `User-agent: GPTBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /`,
      priority: 'High',
      status: blockedBots.length === 0 ? 'pass' : 'warning',
    },
    {
      id: 'llms_txt_file',
      type: 'GEO',
      check: 'LLMs.txt & Agent Discovery File',
      description: hasLlmsTxt ? 'llms.txt file detected for AI markdown ingestion.' : 'No llms.txt or agent.json discovery file found at domain root.',
      fix: hasLlmsTxt ? 'LLMs.txt provides structured AI documentation.' : 'Add /llms.txt with clean markdown documentation of your business services.',
      codeSnippet: `# LLMs.txt for ${title || 'Brand'}\n> Summary of services and key offerings for AI agents.\n\n- [Services](${domainUrl}/services): Core capabilities\n- [Contact](${domainUrl}/contact): Inquiries`,
      priority: 'Medium',
      status: hasLlmsTxt ? 'pass' : 'warning',
    },
    {
      id: 'ai_readability_ratio',
      type: 'GEO',
      check: 'Content-to-Code Extractability Ratio',
      description: `Clean text content ratio is ${contentToCodeRatio}% (${wordCount} words). High extractability allows LLMs to easily parse facts without code noise.`,
      fix: aiReadabilityScore >= 70 ? 'Content is easily readable by LLMs.' : 'Reduce inline CSS/JS and increase semantic paragraph text for better AI chunking.',
      codeSnippet: `// Ensure key value propositions are rendered as server-side text in <p> tags rather than buried in complex JSON scripts.`,
      priority: 'High',
      status: aiReadabilityScore >= 70 ? 'pass' : 'warning',
    },
    {
      id: 'org_schema_geo',
      type: 'GEO',
      check: 'Organization Knowledge Graph Schema',
      description: hasOrganizationSchema ? `Organization / LocalBusiness schema found (${detectedSchemas.join(', ')}).` : 'Missing Organization schema with entity verification.',
      fix: hasOrganizationSchema ? 'Knowledge graph entity is defined.' : 'Add Organization schema with sameAs social profiles and founder info.',
      codeSnippet: `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "${title || 'Brand'}",\n  "url": "${domainUrl}",\n  "sameAs": ["https://linkedin.com/company/...", "https://x.com/..."]\n}\n</script>`,
      priority: 'High',
      status: hasOrganizationSchema ? 'pass' : 'fail',
    },
    {
      id: 'faq_schema_aeo',
      type: 'AEO',
      check: 'FAQ Structured Data (Voice & Snippet Matching)',
      description: hasFAQSchema ? 'FAQPage JSON-LD schema detected.' : 'No FAQ structured data found.',
      fix: hasFAQSchema ? 'FAQ Schema enables direct question-answer matching.' : 'Implement FAQPage schema to trigger voice search answers and featured snippets.',
      codeSnippet: `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [{\n    "@type": "Question",\n    "name": "What services do you provide?",\n    "acceptedAnswer": {\n      "@type": "Answer",\n      "text": "We provide AI-powered marketing, SEO, and automation..."\n    }\n  }]\n}\n</script>`,
      priority: 'High',
      status: hasFAQSchema ? 'pass' : 'fail',
    },
    {
      id: 'direct_answer_blocks',
      type: 'AEO',
      check: 'Direct Answer Paragraph Structure (40-55 Words)',
      description: h2s.some(h => /\?|^what|^how|^why/i.test(h)) ? 'Found question-formatted H2 subheadings.' : 'Headings do not use conversational question format.',
      fix: h2s.some(h => /\?|^what|^how|^why/i.test(h)) ? 'Questions match voice search queries.' : 'Format H2 subheadings as exact questions with a concise 2-sentence direct answer immediately below.',
      codeSnippet: `<h2>How does [Service] increase business ROI?</h2>\n<p>[Service] automates customer acquisition by connecting high-intent search ads with conversational WhatsApp bots, reducing acquisition cost by up to 40%.</p>`,
      priority: 'High',
      status: h2s.some(h => /\?|^what|^how|^why/i.test(h)) ? 'pass' : 'warning',
    },
  ];

  // ── Calculate Problem Severity Statistics ──
  const allChecks = [...recommendations, ...geoAeoChecks];
  const passedCount = allChecks.filter(c => c.status === 'pass').length;
  const warningCount = allChecks.filter(c => c.status === 'warning').length;
  const errorCount = allChecks.filter(c => c.status === 'fail').length;
  const totalCount = allChecks.length;

  const issueStats: IssueStats = {
    total: totalCount,
    passed: passedCount,
    warnings: warningCount,
    errors: errorCount,
    passPercent: Math.round((passedCount / totalCount) * 100),
    warningPercent: Math.round((warningCount / totalCount) * 100),
    errorPercent: Math.round((errorCount / totalCount) * 100),
  };

  return {
    url,
    finalUrl,
    redirected,
    overallScore: { score: overallScoreVal, grade: getGrade(overallScoreVal) },
    categoryScores,
    lighthouseScores,
    geoAeoScores,
    aiOpenness: {
      score: aiOpennessScore,
      allowedBots,
      blockedBots,
      hasLlmsTxt,
      hasAgentJson,
      hasAiPluginJson,
    },
    aiReadability: {
      score: aiReadabilityScore,
      contentToCodeRatio,
      headingStructureGrade: headingGrade,
      cleanTextWords: wordCount,
    },
    issueStats,
    geoAeoChecks,
    recommendations,
    title,
    metaDescription,
    h1s,
    h2s,
    h3s,
    h4s,
    wordCount,
    linkCounts,
    hasSchema,
    hasRobotsTxt: robotsOk,
    hasSitemapInRobots: sitemapInRobots,
    lang,
    canonical,
    loadTime,
    pageSpeedMetrics: psiData,
    psiDataSource: psiSource,
    bodyTextExcerpt: bodyText.slice(0, 1000),
  };
}
