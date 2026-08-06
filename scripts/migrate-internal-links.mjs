import fs from 'fs';
import * as cheerio from 'cheerio';

const blogsFile = 'blogs-backup.json';
const updatedBlogsFile = 'blogs-updated.json';

const blogs = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));

// 1. Service Keyword Mappings
const servicesMap = [
  { keywords: ['whatsapp automation', 'whatsapp bot', 'whatsapp chatbot'], url: '/services/whatsapp-bot' },
  { keywords: ['seo optimization', 'local seo', 'search engine optimization', 'seo'], url: '/services/seo-optimization' },
  { keywords: ['paid ads', 'google ads', 'meta ads', 'facebook ads', 'instagram ads', 'performance marketing'], url: '/services/paid-ads' },
  { keywords: ['lead generation', 'lead gen', 'leads'], url: '/services/lead-generation' },
  { keywords: ['geo optimization', 'generative engine optimization', 'geo', 'aeo'], url: '/services/geo-optimization' },
  { keywords: ['social media management', 'social media marketing', 'social media'], url: '/services/social-media-management' },
  { keywords: ['web design', 'web development', 'next.js', 'website'], url: '/services/web-design-development' },
  { keywords: ['brand strategy', 'branding'], url: '/services/brand-strategy' },
  { keywords: ['content marketing'], url: '/services/content-marketing' },
  { keywords: ['automation tools', 'automation tool', 'automation'], url: '/services/automation-tools' }
];

// 2. Build Blog Keyword Mappings from the fetched blogs
// We will use the blog title as the keyword.
const blogsMap = blogs.map(b => ({
  keywords: [b.title.toLowerCase()],
  url: `/blog/${b.slug}`
}));

// Combine them. We sort by keyword length descending so we match longer phrases first 
// (e.g. "whatsapp automation" before "automation")
const allLinks = [];

[...servicesMap, ...blogsMap].forEach(item => {
  item.keywords.forEach(kw => {
    allLinks.push({ keyword: kw.toLowerCase(), url: item.url });
  });
});

allLinks.sort((a, b) => b.keyword.length - a.keyword.length);

let totalLinksAdded = 0;

function processContent(html, currentSlug) {
  if (!html) return html;
  
  const $ = cheerio.load(html, null, false);
  let linksAddedInPost = 0;
  
  // Track which URLs we've already linked in this post to prevent duplicate links to the same page
  const linkedUrls = new Set();
  
  // Find all text nodes that are not inside an <a> tag
  // We have to recursively walk the DOM.
  function walk(node) {
    if (node.type === 'text') {
      const text = node.data;
      if (!text.trim()) return;
      
      let newText = text;
      let replaced = false;
      
      for (const linkObj of allLinks) {
        // Skip linking to the post itself
        if (linkObj.url === `/blog/${currentSlug}`) continue;
        
        // Skip if we already linked this URL in this post (limit 1 internal link per target page)
        if (linkedUrls.has(linkObj.url)) continue;
        
        // Use word boundary to avoid partial matches (e.g. 'seo' inside 'museum' -> not possible but good practice)
        // Note: For keywords with special characters, word boundary might be tricky, but our keywords are alphanumeric mostly.
        const regex = new RegExp(`\\b(${escapeRegExp(linkObj.keyword)})\\b`, 'i');
        
        if (regex.test(newText)) {
          // Replace only the first occurrence in the entire post for this URL
          newText = newText.replace(regex, `<a href="${linkObj.url}" class="internal-link font-medium text-primary hover:underline">\$1</a>`);
          linkedUrls.add(linkObj.url);
          replaced = true;
          linksAddedInPost++;
          console.log(`Matched: ${linkObj.keyword} -> ${linkObj.url}`);
        }
      }
      
      if (replaced) {
        $(node).replaceWith(newText);
      }
    } else if (node.type === 'tag') {
      // Don't traverse inside existing anchor tags or headers (we don't want links in H2/H3 typically, but let's just skip A tags)
      if (node.name.toLowerCase() !== 'a' && !['h1', 'h2', 'h3'].includes(node.name.toLowerCase())) {
        node.children.forEach(child => walk(child));
      }
    }
  }
  
  $.root().contents().toArray().forEach(node => walk(node));
  
  totalLinksAdded += linksAddedInPost;
  return { newHtml: $.html(), linksAddedInPost };
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

console.log("Processing 96 blogs...");
const updatedBlogs = [];

for (const post of blogs) {
  const { newHtml, linksAddedInPost } = processContent(post.content, post.slug);
  if (linksAddedInPost > 0) {
    console.log(`- "${post.title}" -> Added ${linksAddedInPost} links.`);
  }
  updatedBlogs.push({
    ...post,
    content: newHtml
  });
}

console.log(`\nFinished! Total internal links added across all blogs: ${totalLinksAdded}`);
fs.writeFileSync(updatedBlogsFile, JSON.stringify(updatedBlogs, null, 2));
console.log(`Saved updated content to ${updatedBlogsFile}`);
