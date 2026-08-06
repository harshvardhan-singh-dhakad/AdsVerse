import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const NEXT_SERVER_DIR = path.join(process.cwd(), '.next', 'server', 'app');

function scanDir(dir: string, fileList: string[] = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDir(filePath, fileList);
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function runCheck() {
  const htmlFiles = scanDir(NEXT_SERVER_DIR);
  let hasErrors = false;

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const $ = cheerio.load(content);
    
    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content') || '';
    
    // Check for soft 404s (pages that don't have a 404 HTTP status but contain "Not Found" in title)
    // Wait, .next/server/app generated pages that are NOT 404 shouldn't have "Not Found" in title
    if (!file.includes('not-found.html') && title.toLowerCase().includes('not found')) {
      console.error(`[SEO Check] Soft 404 detected: ${file}`);
      hasErrors = true;
    }

    // Check meta string lengths / artifacts
    if (title.match(/\(\d+\s*chars?\)/i) || description.match(/\(\d+\s*chars?\)/i)) {
      console.error(`[SEO Check] Artifact detected in meta tags: ${file}`);
      hasErrors = true;
    }
    
    if (title.toLowerCase().includes('lorem ipsum') || description.toLowerCase().includes('lorem ipsum')) {
      console.error(`[SEO Check] Placeholder detected in meta tags: ${file}`);
      hasErrors = true;
    }
    
    // Title duplicate AdsVerse
    const brandCount = (title.match(/AdsVerse/gi) || []).length;
    if (brandCount > 1) {
      console.warn(`[SEO Check] Warning: Multiple "AdsVerse" found in title of ${file} (${title})`);
    }
  }

  if (hasErrors) {
    console.error('SEO Check Failed!');
    process.exit(1);
  } else {
    console.log('SEO Check Passed!');
  }
}

runCheck().catch(console.error);
