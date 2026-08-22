import fs from 'fs';
import path from 'path';

function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findPageFiles(filePath, fileList);
    } else if (file === 'page.tsx' || file === 'page.jsx') {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const pages = findPageFiles('src/app');
console.log(`Found ${pages.length} page files to audit.`);

let totalIssues = 0;
for (const p of pages) {
  const content = fs.readFileSync(p, 'utf8');
  const relPath = p.replace(/\\/g, '/');
  
  // Check title
  const titleMatch = content.match(/title:\s*(?:\{[^}]*absolute:\s*["']([^"']+)["']|["']([^"']+)["'])/);
  const title = titleMatch ? (titleMatch[1] || titleMatch[2]) : null;

  // Check description
  const descMatch = content.match(/description:\s*["']([^"']+)["']/);
  const desc = descMatch ? descMatch[1] : null;

  // Check canonical
  const hasCanonical = content.includes('canonical:') || content.includes('alternates:');

  const issues = [];
  if (title) {
    if (title.length > 60) issues.push(`Title too long (${title.length} > 60 chars): "${title}"`);
    if (title.length < 30) issues.push(`Title too short (${title.length} < 30 chars): "${title}"`);
  }
  if (desc) {
    if (desc.length > 160) issues.push(`Description too long (${desc.length} > 160 chars): "${desc}"`);
    if (desc.length < 100) issues.push(`Description too short (${desc.length} < 100 chars): "${desc}"`);
  }

  if (issues.length > 0) {
    console.log(`\n[${relPath}]`);
    issues.forEach(i => console.log(`  ❌ ${i}`));
    totalIssues += issues.length;
  }
}

console.log(`\nTotal Meta Tag Issues Found: ${totalIssues}`);
