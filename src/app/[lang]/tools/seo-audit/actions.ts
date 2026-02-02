
'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';

// Interfaces for structured results
export interface SeoCategoryScores {
  onPage: { score: number; grade: string };
  technical: { score: number; grade: string };
  performance: { score: number; grade: string };
  accessibility: { score: number; grade: string };
  social: { score: number; grade: string };
}

export interface Recommendation {
  id: string;
  check: string;
  description: string;
  fix: string;
  category: 'On-Page SEO' | 'Performance' | 'Accessibility' | 'Social' | 'Technical SEO' | 'Security';
  priority: 'High' | 'Medium' | 'Low';
  passed: boolean;
}

export interface LinkCounts {
    internal: number;
    external: number;
    nofollow: number;
}

export interface AnalysisResult {
  url: string;
  finalUrl: string;
  redirected: boolean;
  overallScore: { score: number; grade: string };
  categoryScores: SeoCategoryScores;
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
    let userAgentBlock = false;
    let applicableRules: string[] = [];

    let currentUserAgent = '';

    for (const line of rules) {
        const trimmedLine = line.trim();
        if (trimmedLine.toLowerCase().startsWith('user-agent:')) {
            const agent = trimmedLine.split(':')[1].trim();
            currentUserAgent = agent;
        }

        if (currentUserAgent === '*' || currentUserAgent === 'Googlebot') {
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


export async function analyzeUrl(url: string): Promise<AnalysisResult> {
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }

  let finalUrl: string;
  let html: string;
  let loadTime: number;
  let responseHeaders: any;
  let redirected = false;

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

  const $ = cheerio.load(html);
  const siteUrl = new URL(finalUrl);

  const checks: Record<string, any> = {};

  // --- Analysis ---
  const title = $('title').text().trim();
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
  const h1s = $('h1').map((_, el) => $(el).text().trim()).get();
  const h2s = $('h2').map((_, el) => $(el).text().trim()).get();
  const h3s = $('h3').map((_, el) => $(el).text().trim()).get();
  const h4s = $('h4').map((_, el) => $(el).text().trim()).get();
  const lang = $('html').attr('lang');
  const canonical = $('link[rel="canonical"]').attr('href');
  
  const wordCount = $('body').text().replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, "").replace(/<style[^>]*>([\S\s]*?)<\/style>/gmi, "").split(/\s+/).filter(Boolean).length;
  checks.wordCountOk = wordCount > 300;
  
  checks.titleOk = title.length > 10 && title.length < 60;
  checks.metaDescriptionOk = metaDescription.length > 70 && metaDescription.length < 160;
  checks.h1Ok = h1s.length === 1 && !!h1s[0];

  const images = {
    total: $('img').length,
    withAlt: $('img[alt][alt!=""]').length,
  };
  checks.altTagsOk = images.total === 0 || (images.withAlt / images.total >= 0.9);

  checks.isHttps = siteUrl.protocol === 'https:';
  checks.loadTimeOk = loadTime < 2.5;

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

  let hasLocalBusinessSchema = false;
  $('script[type="application/ld+json"]').each((_, el) => {
      try {
          const schema = JSON.parse($(el).html() || '{}');
          const checkType = (s: any) => {
              if (s['@type'] && s['@type'].includes('LocalBusiness')) {
                  hasLocalBusinessSchema = true;
              }
          };
          if (Array.isArray(schema)) {
              schema.forEach(checkType);
          } else {
              checkType(schema);
          }
      } catch (e) {}
  });

  checks.hasSchema = $('script[type="application/ld+json"]').length > 0;
  checks.hasLocalBusinessSchema = hasLocalBusinessSchema;
  checks.langOk = !!lang;
  checks.canonicalOk = !!canonical;

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
  
  const foundSecurityHeaders = ['content-security-policy', 'x-content-type-options', 'x-frame-options'].filter(h => responseHeaders[h]);
  checks.hasSecurityHeaders = foundSecurityHeaders.length > 1;

  const cachingHeader = responseHeaders['cache-control'] || '';
  checks.hasCachingHeaders = /max-age|public|private/.test(cachingHeader);

  checks.isUrlSeoFriendly = finalUrl.length < 100 && !finalUrl.includes('_') && !/[A-Z]/.test(finalUrl.split('?')[0]);


  const linkCounts: LinkCounts = { internal: 0, external: 0, nofollow: 0 };
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    
    if ($(el).attr('rel')?.includes('nofollow')) {
        linkCounts.nofollow++;
    }

    try {
        const linkUrl = new URL(href, siteUrl.href);
        if (linkUrl.hostname === siteUrl.hostname) {
            linkCounts.internal++;
        } else {
            linkCounts.external++;
        }
    } catch (e) {
        if (!href.startsWith('http') && !href.startsWith('//') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            linkCounts.internal++;
        }
    }
  });


  // --- Scoring ---
  let onPagePoints = 0;
  if (checks.titleOk) onPagePoints += 15;
  if (checks.metaDescriptionOk) onPagePoints += 10;
  if (checks.h1Ok) onPagePoints += 15;
  if (checks.wordCountOk) onPagePoints += 10;
  if (linkCounts.internal > 5) onPagePoints += 10;
  if (lang) onPagePoints += 5;
  if ($('h2').length > 0) onPagePoints += 5;
  if (checks.isUrlSeoFriendly) onPagePoints += 5;
  if (checks.hasLocalBusinessSchema) onPagePoints += 5;
  onPagePoints += 20; // Base points
  const onPageScore = Math.min(100, onPagePoints);

  let technicalPoints = 0;
  if (checks.canonicalOk) technicalPoints += 20;
  if (!checks.isNoIndex) technicalPoints += 20;
  if (checks.robotsTxtOk) technicalPoints += 15;
  if (!checks.isBlockedByRobots) technicalPoints += 15;
  if (checks.sitemapInRobotsOk) technicalPoints += 10;
  if (redirected) technicalPoints -= 10; // Penalize for redirects
  technicalPoints += 20;
  const technicalScore = Math.min(100, Math.max(0, technicalPoints));
  
  let performancePoints = 0;
  if (checks.loadTimeOk) performancePoints += 80; 
  else if (loadTime < 4) performancePoints += 40; 
  if (checks.hasCachingHeaders) performancePoints += 20;
  const performanceScore = Math.min(100, performancePoints);
  
  let accessibilityPoints = 0;
  if (checks.mobileFriendly) accessibilityPoints += 50;
  if (checks.altTagsOk) accessibilityPoints += 50;
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

  const recommendations: Recommendation[] = [
    { id: 'https', check: 'HTTPS Encryption', description: 'Your site is served over a secure (HTTPS) connection, which is crucial for user trust and SEO.', fix: 'Ensure all resources (images, scripts) are also loaded over HTTPS to avoid mixed content warnings.', category: 'Security', priority: 'High', passed: checks.isHttps },
    { id: 'noindex', check: 'Indexing Allowed', description: 'Checks if search engines are allowed to index this page.', fix: 'If this page is important, remove the "noindex" directive from the meta robots tag to allow search engines to show it in search results.', category: 'Technical SEO', priority: 'High', passed: !checks.isNoIndex },
    { id: 'mixed_content', check: 'No Mixed Content', description: 'An HTTPS page should not load insecure (HTTP) resources like images or scripts.', fix: 'Find all resources loaded over HTTP on this page and change their URLs to use HTTPS.', category: 'Security', priority: 'High', passed: !checks.hasMixedContent },
    { id: 'speed', check: 'Page Load Speed', description: `Your page loaded in ${loadTime.toFixed(2)} seconds. A fast website improves user experience and rankings.`, fix: 'Optimize images, leverage browser caching, minify CSS/JS, and use a Content Delivery Network (CDN) to get your load time under 2.5 seconds.', category: 'Performance', priority: 'High', passed: checks.loadTimeOk },
    { id: 'title', check: 'Title Tag', description: 'Your title tag is the main headline in search results and should be concise and descriptive.', fix: 'Write a unique and compelling title between 10 and 60 characters long. Include your main target keyword near the beginning.', category: 'On-Page SEO', priority: 'High', passed: checks.titleOk },
    { id: 'meta', check: 'Meta Description', description: 'The meta description summarizes your page content, encouraging users to click from search results.', fix: 'Write a unique and engaging meta description between 70 and 160 characters. Think of it as ad copy for your page.', category: 'On-Page SEO', priority: 'High', passed: checks.metaDescriptionOk },
    { id: 'h1', check: 'Single H1 Tag', description: 'The H1 tag is the main heading on your page, telling users and search engines what the page is about.', fix: 'Your page should have exactly one H1 tag that is descriptive and contains your primary keyword.', category: 'On-Page SEO', priority: 'High', passed: checks.h1Ok },
    { id: 'mobile', check: 'Mobile-Friendliness', description: 'A mobile-friendly site is essential for modern SEO as most users search on mobile devices.', fix: 'Ensure your site has a responsive design and includes the viewport meta tag. Test your site on various mobile devices.', category: 'Accessibility', priority: 'High', passed: checks.mobileFriendly },
    { id: 'content', check: 'Sufficient Content', description: `Your page has ${wordCount} words. In-depth content tends to rank better.`, fix: 'For important pages, aim for at least 300 words of valuable, relevant, and well-structured content that fully answers a user\'s query.', category: 'On-Page SEO', priority: 'Medium', passed: checks.wordCountOk },
    { id: 'alt', check: 'Image Alt Text', description: `You are using alt text on ${images.withAlt} of your ${images.total} images. Alt text is vital for accessibility and image SEO.`, fix: 'Add descriptive alt text to all important images to improve accessibility for visually impaired users and help search engines understand image content.', category: 'Accessibility', priority: 'Medium', passed: checks.altTagsOk },
    { id: 'robots', check: 'Robots.txt File', description: 'A robots.txt file guides search engines on how to crawl your site.', fix: 'Create a valid robots.txt file in your root directory. Ensure you aren\'t accidentally blocking important pages or resources.', category: 'Technical SEO', priority: 'Medium', passed: checks.robotsTxtOk },
    { id: 'sitemap', check: 'Sitemap in Robots.txt', description: 'Including your sitemap in robots.txt helps search engines find all your pages.', fix: 'Add a line to your robots.txt file like: "Sitemap: https://yourdomain.com/sitemap.xml".', category: 'Technical SEO', priority: 'Low', passed: checks.sitemapInRobotsOk },
    { id: 'canonical', check: 'Canonical Tag', description: 'A canonical tag prevents duplicate content issues by specifying the "preferred" version of a page.', fix: 'Ensure all pages have a self-referencing canonical tag, or a tag pointing to the original version if the content is syndicated.', category: 'Technical SEO', priority: 'Medium', passed: checks.canonicalOk },
    { id: 'security_headers', check: 'Security Headers', description: 'HTTP security headers protect your site and users from common attacks.', fix: 'Implement security headers like Content-Security-Policy, X-Frame-Options, and X-Content-Type-Options via your server configuration.', category: 'Security', priority: 'Medium', passed: checks.hasSecurityHeaders },
    { id: 'caching', check: 'Browser Caching', description: 'Caching headers tell browsers to store static files locally, speeding up repeat visits.', fix: 'Configure your server to send Cache-Control or Expires headers for static assets like images, CSS, and JS.', category: 'Performance', priority: 'Medium', passed: checks.hasCachingHeaders },
    { id: 'lang', check: 'Language Declaration', description: 'Declaring the language of the page helps search engines and browsers.', fix: 'Add a "lang" attribute to your <html> tag, for example: <html lang="en">.', category: 'On-Page SEO', priority: 'Low', passed: checks.langOk },
    { id: 'schema', check: 'Schema Markup', description: 'Schema markup helps search engines understand your content better and can enable rich snippets in search results.', fix: 'Implement structured data (e.g., Article, Product, or LocalBusiness schema) using JSON-LD to enhance your search appearance.', category: 'Social', priority: 'Low', passed: checks.hasSchema },
    { id: 'local_schema', check: 'Local Business Schema', description: 'If you are a local business, this schema helps you appear in local search results and map packs.', fix: 'Add LocalBusiness structured data to your homepage or contact page, including your Name, Address, and Phone number (NAP).', category: 'On-Page SEO', priority: 'Low', passed: checks.hasLocalBusinessSchema },
    { id: 'social', check: 'Social Meta Tags', description: 'Open Graph and Twitter Cards control how your content appears when shared on social media.', fix: 'Add Open Graph (og:title, og:description, og:image) and Twitter Card tags to all shareable pages for optimized social sharing.', category: 'Social', priority: 'Low', passed: checks.socialTagsOk },
    { id: 'friendly_url', check: 'SEO-Friendly URL', description: 'Clean, readable URLs are better for users and search engines.', fix: 'Use short, lowercase URLs with hyphens to separate words. Avoid using underscores, special characters, or long strings of numbers.', category: 'On-Page SEO', priority: 'Low', passed: checks.isUrlSeoFriendly },
  ];

  return {
    url: url,
    finalUrl: finalUrl,
    redirected: redirected,
    overallScore: { score: overallScoreVal, grade: getGrade(overallScoreVal) },
    categoryScores,
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
    loadTime
  };
}
