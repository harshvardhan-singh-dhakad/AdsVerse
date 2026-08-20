'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { fetchPageSpeedData, type PageSpeedMetrics } from '@/lib/pagespeed';
import type { LlmGeoAeoResult } from '@/lib/gemini-geo-aeo';

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

function isUrlBlockedByRobots(url: string, robotsTxt: string, targetAgent = '*'): boolean {
  if (!robotsTxt) return false;
  const lines = robotsTxt.split('\n');
  let currentAgent = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.toLowerCase().startsWith('user-agent:')) {
      currentAgent = trimmed.split(':')[1].trim().toLowerCase();
    }
    if (currentAgent === '*' || currentAgent === targetAgent.toLowerCase()) {
      if (trimmed.toLowerCase().startsWith('disallow:')) {
        const path = trimmed.split(':')[1].trim();
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
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AdsVerseAuditBot/2.0; +https://adsverse.in/bot)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
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

  // Parallel Fetch: PageSpeed 4 Categories + Robots.txt + LLMs.txt
  const domainUrl = new URL(finalUrl).origin;
  const [psiData, robotsRes, llmsRes, agentJsonRes] = await Promise.all([
    fetchPageSpeedData(finalUrl, 'mobile').catch(() => null),
    axios.get(`${domainUrl}/robots.txt`, { timeout: 4000, validateStatus: () => true }).catch(() => null),
    axios.get(`${domainUrl}/llms.txt`, { timeout: 4000, validateStatus: () => true }).catch(() => null),
    axios.get(`${domainUrl}/.well-known/agent.json`, { timeout: 4000, validateStatus: () => true }).catch(() => null),
  ]);

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
    (contentToCodeRatio > 15 ? 40 : contentToCodeRatio * 2.5) +
    (h1s.length === 1 ? 30 : 15) +
    (wordCount >= 600 ? 30 : (wordCount / 600) * 30)
  ));

  // Images and links
  const images = { total: 0, withAlt: 0 };
  $('img').each((_, el) => {
    images.total++;
    if ($(el).attr('alt')?.trim()) images.withAlt++;
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

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html() || '');
      hasSchema = true;
      const str = JSON.stringify(data).toLowerCase();
      if (str.includes('faqpage')) hasFAQSchema = true;
      if (str.includes('organization') || str.includes('localbusiness')) hasOrganizationSchema = true;
      if (str.includes('howto')) hasHowToSchema = true;
    } catch {}
  });

  // Security and Headers
  const isHttps = finalUrl.startsWith('https://');
  const hasHsts = !!(headers['strict-transport-security']);
  const hasXFrame = !!(headers['x-frame-options']);
  const hasContentTypeOpt = !!(headers['x-content-type-options']);
  const hasMixedContent = isHttps && /src=["']http:\/\//i.test(html);

  // ── Compute Category Scores ──
  const titleStatus = (title.length >= 30 && title.length <= 60) ? 'pass' : (title.length > 0 ? 'warning' : 'fail');
  const descStatus = (metaDescription.length >= 120 && metaDescription.length <= 160) ? 'pass' : (metaDescription.length > 0 ? 'warning' : 'fail');
  const h1Status = h1s.length === 1 ? 'pass' : (h1s.length > 1 ? 'warning' : 'fail');
  const altStatus = images.total === 0 || (images.withAlt / images.total) >= 0.9 ? 'pass' : (images.withAlt > 0 ? 'warning' : 'fail');
  const canonicalStatus = canonical ? 'pass' : 'warning';
  const robotsOk = robotsTxt.length > 0;
  const sitemapInRobots = /sitemap:\s*https?:\/\//i.test(robotsTxt);

  // Lighthouse Scores (Default from PageSpeed API if available, else server-side fallback)
  const lighthouseScores: LighthouseCategoryScores = {
    performance: psiData?.performanceScore ?? Math.min(95, Math.max(45, Math.round(100 - (loadTime / 100)))),
    seo: psiData?.seoScore ?? (titleStatus === 'pass' && descStatus === 'pass' && h1Status === 'pass' ? 95 : 75),
    accessibility: psiData?.accessibilityScore ?? (altStatus === 'pass' && $('html').attr('lang') ? 92 : 72),
    bestPractices: psiData?.bestPracticesScore ?? (isHttps && hasHsts ? 96 : 78),
  };

  const onPageScore = Math.round(
    (titleStatus === 'pass' ? 25 : titleStatus === 'warning' ? 15 : 0) +
    (descStatus === 'pass' ? 25 : descStatus === 'warning' ? 15 : 0) +
    (h1Status === 'pass' ? 25 : 10) +
    (wordCount >= 500 ? 25 : 10)
  );

  const technicalScore = Math.round(
    (isHttps ? 25 : 0) +
    (robotsOk ? 25 : 0) +
    (canonical ? 25 : 10) +
    (sitemapInRobots ? 25 : 0)
  );

  const categoryScores: SeoCategoryScores = {
    onPage: { score: onPageScore, grade: getGrade(onPageScore) },
    technical: { score: technicalScore, grade: getGrade(technicalScore) },
    performance: { score: lighthouseScores.performance, grade: getGrade(lighthouseScores.performance) },
    accessibility: { score: lighthouseScores.accessibility, grade: getGrade(lighthouseScores.accessibility) },
    social: { score: hasSchema ? 90 : 60, grade: getGrade(hasSchema ? 90 : 60) },
  };

  const geoScoreVal = Math.min(100, Math.round((aiOpennessScore * 0.4) + (aiReadabilityScore * 0.3) + (hasOrganizationSchema ? 30 : 15)));
  const aeoScoreVal = Math.min(100, Math.round((hasFAQSchema ? 40 : 15) + (h2s.length >= 3 ? 30 : 15) + (wordCount >= 400 ? 30 : 15)));

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
      description: title ? `Current title: "${title}" (${title.length} chars). Target: 30-60 characters.` : 'No title tag found in <head>.',
      fix: titleStatus === 'pass' ? 'Title length and keywords are well-optimized.' : 'Craft a 50-60 character title containing your primary keyword, brand name, and unique value proposition.',
      codeSnippet: `<title>${title ? title.slice(0, 50) : 'Brand Name'} | Primary Service & Location</title>`,
      category: 'On-Page SEO',
      priority: 'High',
      status: titleStatus,
    },
    {
      id: 'meta_description',
      check: 'Meta Description Length',
      description: metaDescription ? `Current meta description is ${metaDescription.length} chars. Target: 120-160 characters.` : 'Missing meta description tag.',
      fix: descStatus === 'pass' ? 'Meta description is within ideal search snippet bounds.' : 'Add a compelling meta description (120-160 characters) with a clear call-to-action.',
      codeSnippet: `<meta name="description" content="Discover premium ${title || 'services'}. Scale organic traffic, lead capture, and conversions with data-driven strategies." />`,
      category: 'On-Page SEO',
      priority: 'High',
      status: descStatus,
    },
    {
      id: 'h1_heading',
      check: 'H1 Primary Heading',
      description: h1s.length === 1 ? `Unique H1 found: "${h1s[0]}"` : h1s.length > 1 ? `Found ${h1s.length} H1 tags. Pages must have exactly 1 H1.` : 'No H1 tag detected.',
      fix: h1Status === 'pass' ? 'H1 structure is clear.' : 'Ensure your page has exactly one H1 tag summarizing the core topic.',
      codeSnippet: `<h1>Best ${title || 'Services'} — AI-Powered Growth</h1>`,
      category: 'On-Page SEO',
      priority: 'High',
      status: h1Status,
    },
    {
      id: 'content_depth',
      check: 'Content Word Count',
      description: `Page contains ${wordCount} words. High-ranking pages typically feature 600+ comprehensive words.`,
      fix: wordCount >= 600 ? 'Content length is extensive.' : 'Expand the on-page copy to at least 600 words answering common customer questions.',
      codeSnippet: `<section>\n  <h2>Comprehensive Service Guide</h2>\n  <p>Detailed explanation of features, workflow, FAQs, and transparent pricing...</p>\n</section>`,
      category: 'On-Page SEO',
      priority: 'Medium',
      status: wordCount >= 600 ? 'pass' : wordCount >= 300 ? 'warning' : 'fail',
    },

    // Technical SEO
    {
      id: 'canonical_tag',
      check: 'Canonical URL Tag',
      description: canonical ? `Canonical configured: ${canonical}` : 'No canonical link tag specified.',
      fix: canonical ? 'Canonical link is configured.' : 'Add a self-referencing canonical tag in <head> to prevent duplicate URL penalties.',
      codeSnippet: `<link rel="canonical" href="${finalUrl}" />`,
      category: 'Technical SEO',
      priority: 'High',
      status: canonicalStatus,
    },
    {
      id: 'robots_txt',
      check: 'Robots.txt Crawlability',
      description: robotsOk ? 'Valid robots.txt file discovered.' : 'Robots.txt file missing at root /robots.txt.',
      fix: robotsOk ? 'Robots.txt allows search crawlers.' : 'Create a robots.txt file in your public directory with Sitemap link.',
      codeSnippet: `User-agent: *\nAllow: /\n\nSitemap: ${domainUrl}/sitemap.xml`,
      category: 'Technical SEO',
      priority: 'Medium',
      status: robotsOk ? 'pass' : 'fail',
    },
    {
      id: 'sitemap_link',
      check: 'XML Sitemap in Robots.txt',
      description: sitemapInRobots ? 'Sitemap reference found in robots.txt.' : 'No "Sitemap: URL" directive found in robots.txt.',
      fix: sitemapInRobots ? 'XML Sitemap is linked.' : 'Add a Sitemap line to robots.txt to assist search indexing.',
      codeSnippet: `Sitemap: ${domainUrl}/sitemap.xml`,
      category: 'Technical SEO',
      priority: 'Low',
      status: sitemapInRobots ? 'pass' : 'fail',
    },
    {
      id: 'indexing_directive',
      check: 'Noindex Directive Verification',
      description: !isNoIndex ? 'Page is fully indexable by search engines.' : 'Page contains a "noindex" robots meta tag.',
      fix: !isNoIndex ? 'Indexing is permitted.' : 'Remove "noindex" from your meta robots tag to appear in Google search.',
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
      fix: (psiData?.lcp ?? loadTime) < 2500 ? 'LCP render speed is fast.' : 'Preload hero images, use Next.js next/image with priority, and cache dynamic assets on a global CDN.',
      codeSnippet: `<link rel="preload" as="image" href="/hero-image.webp" fetchpriority="high" />`,
      category: 'Performance',
      priority: 'High',
      status: (psiData?.lcp ?? loadTime) < 2500 ? 'pass' : 'warning',
    },
    {
      id: 'fcp_vitals',
      check: 'First Contentful Paint (FCP)',
      description: psiData?.fcp ? `FCP speed: ${(psiData.fcp / 1000).toFixed(2)}s. Target: < 1.8s.` : 'First paint speed checked via server response.',
      fix: (psiData?.fcp ?? loadTime) < 1800 ? 'FCP paints promptly.' : 'Defer non-critical third-party JavaScript and inline critical layout CSS.',
      codeSnippet: `<script src="analytics.js" defer></script>`,
      category: 'Performance',
      priority: 'Medium',
      status: (psiData?.fcp ?? loadTime) < 1800 ? 'pass' : 'warning',
    },
    {
      id: 'cls_vitals',
      check: 'Cumulative Layout Shift (CLS)',
      description: `CLS value: ${psiData?.cls !== undefined ? psiData.cls.toFixed(3) : '0.000'}. Target: < 0.1.`,
      fix: (psiData?.cls ?? 0) < 0.1 ? 'Page layout is visually stable.' : 'Specify explicit width and height attributes on all images and video containers.',
      codeSnippet: `<Image src="/logo.png" width={200} height={60} alt="Brand Logo" />`,
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
      codeSnippet: `// In web server / Next.js:\n// Enforce HTTPS rewrite rule`,
      category: 'Security',
      priority: 'High',
      status: isHttps ? 'pass' : 'fail',
    },
    {
      id: 'mixed_content',
      check: 'Mixed Content Scan',
      description: !hasMixedContent ? 'No insecure HTTP resources found on HTTPS page.' : 'Page contains insecure HTTP images or scripts.',
      fix: !hasMixedContent ? 'Zero mixed content.' : 'Update all asset URLs (images, styles, fonts) from http:// to https://.',
      codeSnippet: `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`,
      category: 'Security',
      priority: 'High',
      status: !hasMixedContent ? 'pass' : 'fail',
    },
    {
      id: 'security_headers',
      check: 'HTTP Security Headers',
      description: hasHsts && hasXFrame ? 'HSTS and X-Frame-Options configured.' : 'Missing one or more security headers (HSTS, CSP, X-Frame-Options).',
      fix: hasHsts ? 'Security headers are strong.' : 'Configure Strict-Transport-Security and X-Frame-Options headers on your origin server.',
      codeSnippet: `// Header configuration:\nStrict-Transport-Security: max-age=31536000; includeSubDomains\nX-Frame-Options: SAMEORIGIN\nX-Content-Type-Options: nosniff`,
      category: 'Security',
      priority: 'Medium',
      status: hasHsts ? 'pass' : 'warning',
    },

    // Accessibility
    {
      id: 'image_alts',
      check: 'Image Alt Text Coverage',
      description: images.total > 0 ? `${images.withAlt} of ${images.total} images have descriptive ALT attributes.` : 'No images found.',
      fix: altStatus === 'pass' ? 'Image accessibility is high.' : 'Add concise, descriptive alt text to all informative images.',
      codeSnippet: `<img src="/product.jpg" alt="Description of product features and benefits" />`,
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
      check: 'AI Crawler Permissions (GPTBot, ClaudeBot, Gemini)',
      description: blockedBots.length === 0 ? 'All major AI search bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are permitted in robots.txt.' : `Robots.txt blocks ${blockedBots.join(', ')}.`,
      fix: blockedBots.length === 0 ? 'AI bots have unrestricted crawling access.' : 'Allow AI search crawlers in robots.txt so LLMs can read and cite your website.',
      codeSnippet: `User-agent: GPTBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /`,
      priority: 'High',
      status: blockedBots.length === 0 ? 'pass' : 'warning',
    },
    {
      id: 'llms_txt_file',
      type: 'GEO',
      check: 'LLMs.txt & Agent Discovery',
      description: hasLlmsTxt ? 'llms.txt file detected for AI training and markdown ingestion.' : 'No llms.txt or agent.json discovery file found.',
      fix: hasLlmsTxt ? 'LLMs.txt provides structured AI documentation.' : 'Add /llms.txt with clean markdown documentation of your business services.',
      codeSnippet: `# LLMs.txt for ${title || 'Brand'}\n> Summary of services and key offerings for AI agents.\n\n- [Services](${domainUrl}/services): Core capabilities\n- [Contact](${domainUrl}/contact): Inquiries`,
      priority: 'Medium',
      status: hasLlmsTxt ? 'pass' : 'warning',
    },
    {
      id: 'ai_readability_ratio',
      type: 'GEO',
      check: 'Content-to-Code Extractability Ratio',
      description: `Clean text content ratio is ${contentToCodeRatio}% (${wordCount} words). High extractability allows LLMs to easily parse facts without noise.`,
      fix: aiReadabilityScore >= 70 ? 'Content is easily readable by LLMs.' : 'Reduce inline CSS/JS and increase semantic paragraph text for better AI chunking.',
      codeSnippet: `// Ensure key value propositions are rendered as server-side text in <p> tags rather than buried in complex JSON scripts.`,
      priority: 'High',
      status: aiReadabilityScore >= 70 ? 'pass' : 'warning',
    },
    {
      id: 'org_schema_geo',
      type: 'GEO',
      check: 'Organization Knowledge Graph Schema',
      description: hasOrganizationSchema ? 'Organization / LocalBusiness schema found.' : 'Missing Organization schema with entity verification.',
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
    h1s, h2s, h3s, h4s,
    wordCount,
    linkCounts,
    hasSchema,
    hasRobotsTxt: robotsOk,
    hasSitemapInRobots: sitemapInRobots,
    lang,
    canonical,
    loadTime,
    pageSpeedMetrics: psiData,
    bodyTextExcerpt: bodyText.slice(0, 1000),
  };
}
