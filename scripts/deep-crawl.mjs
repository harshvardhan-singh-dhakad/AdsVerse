import * as cheerio from 'cheerio';

const urls = [
  'https://adsverse.in',
  'https://adsverse.in/services',
  'https://adsverse.in/blog',
  'https://adsverse.in/about',
  'https://adsverse.in/contact',
  'https://adsverse.in/portfolio',
  'https://adsverse.in/faq',
  'https://adsverse.in/locations',
  'https://adsverse.in/locations/indore',
  'https://adsverse.in/services/seo-optimization',
  'https://adsverse.in/services/whatsapp-bot'
];

async function run() {
  console.log('--- STARTING DEEP CRAWL AUDIT ---');
  let issuesFound = [];

  for (const u of urls) {
    const t0 = Date.now();
    try {
      const res = await fetch(u, { headers: { 'User-Agent': 'AdsVerseDeepCrawler/1.0 (Mozilla/5.0)' } });
      const html = await res.text();
      const ms = Date.now() - t0;
      const $ = cheerio.load(html);

      const title = $('title').text() || '';
      const desc = $('meta[name="description"]').attr('content') || '';
      const canonical = $('link[rel="canonical"]').attr('href') || '';
      const h1s = $('h1').map((_, el) => $(el).text().trim().replace(/\s+/g, ' ')).get();
      const viewport = $('meta[name="viewport"]').attr('content');
      const robots = $('meta[name="robots"]').attr('content');
      const totalImgs = $('img').length;
      const imgsWithoutAlt = $('img:not([alt]), img[alt=""]').length;
      
      const pageIssues = [];
      if (!title) pageIssues.push('Missing <title>');
      else if (title.length < 30 || title.length > 70) pageIssues.push(`Title length sub-optimal (${title.length} chars)`);

      if (!desc) pageIssues.push('Missing meta description');
      else if (desc.length < 100 || desc.length > 170) pageIssues.push(`Meta description length sub-optimal (${desc.length} chars)`);

      if (!canonical) pageIssues.push('Missing canonical link');
      if (h1s.length === 0) pageIssues.push('Missing H1 heading');
      if (h1s.length > 1) pageIssues.push(`Multiple H1 headings found (${h1s.length})`);
      if (imgsWithoutAlt > 0) pageIssues.push(`${imgsWithoutAlt} images missing alt text`);
      if (ms > 2000) pageIssues.push(`Slow SSR response time: ${ms}ms`);

      console.log(`\n[${res.status}] ${u} (${ms}ms)`);
      console.log(`  Title: "${title}" (${title.length} chars)`);
      console.log(`  Desc: "${desc}" (${desc.length} chars)`);
      console.log(`  Canonical: ${canonical}`);
      console.log(`  H1 (${h1s.length}): ${h1s.join(' | ')}`);
      console.log(`  Images: ${totalImgs} total, ${imgsWithoutAlt} without alt`);
      if (pageIssues.length > 0) {
        console.log(`  ⚠️ Issues: ${pageIssues.join('; ')}`);
        issuesFound.push({ url: u, issues: pageIssues });
      } else {
        console.log(`  ✅ Perfect Head & HTML`);
      }
    } catch (err) {
      console.error(`  ❌ Error fetching ${u}: ${err.message}`);
      issuesFound.push({ url: u, issues: [err.message] });
    }
  }

  console.log('\n=======================================');
  console.log(`Total Pages Audited: ${urls.length}`);
  console.log(`Pages with Issues: ${issuesFound.length}`);
  console.log('=======================================');
}

run();
