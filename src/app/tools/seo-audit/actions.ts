
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

export interface GeoAeoScores {
  geo: { score: number; grade: string };
  aeo: { score: number; grade: string };
}

export interface GeoAeoCheck {
  id: string;
  check: string;
  description: string;
  fix: string;
  passed: boolean;
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

  // --- SEO Analysis ---
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

  // Parse all schema scripts once
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

  // Author / Date signals
  const authorSelectors = ['[rel="author"]', '[itemprop="author"]', '.author', '#author', '[class*="author"]', '[class*="byline"]', 'article [class*="by"]'];
  checks.hasAuthorInfo = authorSelectors.some(sel => $(sel).length > 0) || allSchemas.some(s => s.author);

  const dateSelectors = ['time[datetime]', '[itemprop="datePublished"]', '[itemprop="dateModified"]', '.published', '.post-date', '[class*="date"]'];
  checks.hasDatePublished = dateSelectors.some(sel => $(sel).length > 0) || allSchemas.some(s => s.datePublished || s.dateModified);

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

  // --- GEO / AEO specific checks ---
  // Content depth check
  checks.contentDepth = wordCount >= 800;

  // Topic focus: check if H1 and title share any significant words
  const h1Text = h1s[0] || '';
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'it']);
  const titleWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !commonWords.has(w));
  const h1Words = h1Text.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !commonWords.has(w));
  checks.hasClearTopicFocus = titleWords.some(w => h1Words.includes(w)) || h1Words.some(w => titleWords.includes(w));

  // Expertise signals
  const expertiseKeywords = /expert|certified|award|years experience|founder|specialist|consultant|professional|accredited|qualified|license/i;
  checks.hasExpertiseSignals = expertiseKeywords.test(bodyText.slice(0, 5000));

  // Table of contents (anchor links on same page)
  const anchorLinks = $('a[href^="#"]').length;
  checks.hasTableOfContents = anchorLinks >= 3;

  // AEO: FAQ-style headings (question headings)
  const questionHeadings = [...h2s, ...h3s].filter(h => /\?|^what|^how|^why|^when|^where|^who|^which|^can|^does|^is|^are|^do/i.test(h.trim()));
  checks.hasFAQContent = questionHeadings.length >= 2;

  // AEO: Structured list content
  checks.hasListContent = $('ul li, ol li').length >= 3;

  // AEO: Voice search optimization (natural language, short answers)
  const paragraphs = $('p').map((_, el) => $(el).text().trim()).get();
  const shortAnswerParagraphs = paragraphs.filter(p => p.length > 20 && p.length < 200);
  checks.hasVoiceSearchOptimization = shortAnswerParagraphs.length >= 3 && checks.hasFAQContent;

  // AEO: Direct answers after questions (check if a <p> follows an H2/H3)
  let directAnswerCount = 0;
  $('h2, h3').each((_, el) => {
    const next = $(el).next('p');
    if (next.length && next.text().length > 30 && next.text().length < 300) {
      directAnswerCount++;
    }
  });
  checks.hasDirectAnswers = directAnswerCount >= 2;


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


  // --- SEO Scoring ---
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
  if (redirected) technicalPoints -= 10;
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

  // --- GEO + AEO Checklist ---
  const geoAeoChecks: GeoAeoCheck[] = [
    // GEO Checks
    { id: 'author_info', type: 'GEO', check: 'Author / E-E-A-T Signals', description: 'AI search engines prioritize content from identifiable, credible authors. Author info is a key E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signal.', fix: 'Add a visible author byline, author bio section, or author schema markup to your page. Link to author profiles on LinkedIn or your about page.', passed: checks.hasAuthorInfo, priority: 'High' },
    { id: 'date_published', type: 'GEO', check: 'Published / Updated Date', description: 'AI engines like ChatGPT and Gemini prefer recently updated content. A visible publication or update date signals freshness.', fix: 'Add a <time datetime="YYYY-MM-DD"> element or datePublished/dateModified in your JSON-LD schema to indicate content freshness.', passed: checks.hasDatePublished, priority: 'High' },
    { id: 'content_depth', type: 'GEO', check: 'Content Depth (800+ words)', description: 'AI models are trained to surface comprehensive, in-depth content. Pages with 800+ words tend to perform better in AI-generated answers.', fix: `Your page has ${wordCount} words. Expand your content to cover the topic comprehensively with examples, data, and expert insights.`, passed: checks.contentDepth, priority: 'High' },
    { id: 'topic_focus', type: 'GEO', check: 'Clear Topic Focus', description: 'AI engines extract the central topic from your H1 and title. When they align, the AI can confidently cite your page as a source.', fix: 'Make sure your H1 and title tag share key topic words. Avoid clickbait titles that differ greatly from your page heading.', passed: checks.hasClearTopicFocus, priority: 'Medium' },
    { id: 'faq_schema', type: 'GEO', check: 'FAQ Schema Markup', description: 'FAQ schema helps AI engines directly extract your Q&A content for featured snippets and conversational AI responses.', fix: 'Add FAQPage JSON-LD schema to pages with question-and-answer content. This significantly increases your chances of being cited by AI.', passed: checks.hasFAQSchema, priority: 'High' },
    { id: 'howto_schema', type: 'GEO', check: 'HowTo Schema Markup', description: 'HowTo schema helps AI assistants provide step-by-step instructions from your content in response to "how to" queries.', fix: 'For instructional content, add HowTo JSON-LD schema with defined steps, tools, and time estimates.', passed: checks.hasHowToSchema, priority: 'Medium' },
    { id: 'breadcrumb_schema', type: 'GEO', check: 'Breadcrumb Schema', description: 'Breadcrumb schema helps AI engines understand the hierarchy and context of your page within your site structure.', fix: 'Add BreadcrumbList JSON-LD schema to all pages. Example: Home > Blog > Article Title.', passed: checks.hasBreadcrumbSchema, priority: 'Low' },
    { id: 'expertise_signals', type: 'GEO', check: 'Expertise & Credibility Signals', description: 'Words like "certified", "years of experience", "expert" signal to AI engines that your content comes from a credible source.', fix: 'Include mentions of qualifications, certifications, awards, or years of experience in your page copy to build AI-readable authority.', passed: checks.hasExpertiseSignals, priority: 'Medium' },
    // AEO Checks
    { id: 'faq_headings', type: 'AEO', check: 'FAQ-Style Question Headings', description: 'Answer engines match user questions to pages with question-formatted headings (H2/H3). These are directly used for featured snippets and voice answers.', fix: 'Rewrite some of your H2/H3 headings as questions that your target audience would ask (e.g., "What is digital marketing?", "How does SEO work?").', passed: checks.hasFAQContent, priority: 'High' },
    { id: 'direct_answers', type: 'AEO', check: 'Direct Answer Paragraphs', description: 'Google and voice assistants look for concise paragraphs immediately following question headings to use as featured snippet answers.', fix: 'After each question-style heading, immediately write a clear, concise answer (40-60 words) before going into detail. This is the ideal featured snippet format.', passed: checks.hasDirectAnswers, priority: 'High' },
    { id: 'list_content', type: 'AEO', check: 'Structured List Content (UL/OL)', description: 'Bulleted and numbered lists are highly preferred by answer engines for listing steps, features, or options in search results.', fix: 'Where appropriate, convert paragraph content into bulleted lists or numbered step-by-step instructions for better AEO and featured snippet eligibility.', passed: checks.hasListContent, priority: 'Medium' },
    { id: 'org_schema', type: 'AEO', check: 'Organization Schema', description: 'Organization schema provides AI and voice assistants with structured information about your business — name, address, phone, social links — used for "knowledge panel" and local voice queries.', fix: 'Add Organization JSON-LD schema to your homepage with your company name, URL, logo, contact info, and social media profiles.', passed: checks.hasOrganizationSchema, priority: 'High' },
    { id: 'review_schema', type: 'AEO', check: 'Review / Rating Schema', description: 'Review and rating schema enables star ratings in search results and increases trust signals for AI-generated recommendations.', fix: 'Add Review or AggregateRating JSON-LD schema to product, service, or business pages to display star ratings in search results.', passed: checks.hasReviewSchema, priority: 'Medium' },
    { id: 'speakable_schema', type: 'AEO', check: 'Speakable Schema', description: 'Speakable schema tells Google Assistant and other voice AI exactly which parts of your content should be read aloud in response to voice queries.', fix: 'Add Speakable JSON-LD schema pointing to the CSS selectors of your most important, concise content sections to enable voice assistant optimization.', passed: checks.hasSpeakableSchema, priority: 'Low' },
    { id: 'voice_search', type: 'AEO', check: 'Voice Search Optimization', description: 'Voice queries are conversational and often question-based. Pages with question headings and short answer paragraphs are better suited for voice responses.', fix: 'Combine question-formatted headings with short (under 30 words) answer paragraphs written in conversational language to optimize for voice search and AEO.', passed: checks.hasVoiceSearchOptimization, priority: 'Medium' },
  ];

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
    loadTime
  };
}
