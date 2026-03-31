const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

const exactMap = {
  "Google Ads.jpeg": "Image/Blog/The Art of Paid Ads Maximizing Your ROI.jpg", // update to better one
  "Future of Automation in Indore (CRM, WhatsApp Chatbots, Funnels).jpg": "Image/Blog/Future of Automation in Indore (CRM, WhatsApp Chatbots, Funnels).jpg",
  "How Local SEO Works for Indore Businesses.png": "Image/Blog/How Local SEO Works for Indore Businesses.png",
  "content in 2024.jpeg": "Image/Blog/Why Content is Still King in 2024.jpg",
  "Demystifying SEO A Beginner's Guide to Ranking Higher.jpg": "Image/Blog/Demystifying SEO A Beginner's Guide to Ranking Higher.jpg",
  "Case Study How an Indore Real Estate Project Sold 40% Units via Digital Marketing Case Study.jpg": "Image/Blog/Case Study How an Indore Real Estate Project Sold 40% Units via Digital Marketing Case Study.jpg",
  "Lead Generation Guide for Your business in Indore.jpg": "Image/Blog/Digital Marketing Indore.jpeg", // fallback
  "Best Social Media Strategies for Indore Local Businesses.jpg": "Image/Blog/Best Social Media Strategies for Indore Local Businesses.jpg",
  "automation tool 2.jpeg": "Image/Blog/Best Automation.jpeg",
  "automation Tool 1.jpeg": "Image/Blog/Best Automation.jpeg",
  "Digital Marketing Indore.jpeg": "Image/Blog/Digital Marketing Indore.jpeg",
  "The Legend Returns Why the Tata Sierra 2025 went Viral Overnight.jpg": "Image/Blog/The Legend Returns Why the Tata Sierra 2025 went Viral Overnight.jpg",
  "Facebook & Instagram Ads for Indore Builders.jpg": "Image/Blog/Facebook & Instagram Ads for Indore Builders.jpg",
  "DEEPAK.ABOUT.png": "Image/Team/DEEPAK.ABOUT.png",
  "chic.png": "Image/Our Work/chic.png",
  "eve.png": "Image/Our Work/eve.png",
  "fun.png": "Image/Our Work/fun.png",
  "sf.png": "Image/Our Work/sf.png",
  "sm.png": "Image/Our Work/sm.png"
};

const dbJsonString = fs.readFileSync('C:/Users/Deepak/.gemini/antigravity/brain/0390b480-39f6-4b2a-bc32-aae70336d11f/.system_generated/steps/725/output.txt', 'utf8');
const dbJson = JSON.parse(dbJsonString);

const getFirebaseUrl = (storagePath) => {
  return 'https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o/' + encodeURIComponent(storagePath) + '?alt=media';
}

const files = walk('./src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const githubRx = /https:\/\/github\.com\/harshvardhan-singh-dhakad\/image\/blob\/main\/([^\?]+)\?raw=true/g;
  
  content = content.replace(githubRx, (match, filename) => {
    const decoded = decodeURIComponent(filename);
    
    // Check if it's already a firebase URL in some accidental replace
    if (match.includes('firebasestorage')) return match;

    const storagePath = exactMap[decoded];
    if (storagePath) {
      changed = true;
      return getFirebaseUrl(storagePath);
    }
    
    // If we didn't match via exactMap, we can just guess
    changed = true;
    let folder = 'Blog';
    return getFirebaseUrl('Image/'+folder+'/'+decoded);
  });

  // Also catch anyone using my previous script's broken output
  const badFirebaseRx = /https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/synergyflow-digital-p7c0g\.firebasestorage\.app\/o\/(Image%2FBlog%2F(.*?\.(?:jpeg|jpg|png)))\?alt=media/g;
  content = content.replace(badFirebaseRx, (match, fullPathEncoded, filenameEncoded) => {
    const decodedFile = decodeURIComponent(filenameEncoded);
    if (exactMap[decodedFile]) {
        if (exactMap[decodedFile] !== decodeURIComponent(fullPathEncoded)) {
            changed = true;
            return getFirebaseUrl(exactMap[decodedFile]);
        }
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(file, content);
    updatedCount++;
    console.log('Fixed', file);
  }
});

console.log('Total codebase files updated:', updatedCount);

// Generate MCP tool calls for blogPosts!
console.log('Generating MCP calls for blogPosts...');
dbJson.documents.forEach(doc => {
  const oldUrl = doc.fields.imageUrl?.stringValue || '';
  if (oldUrl.includes('github.com')) {
    const match = oldUrl.match(/main\/([^\?]+)\?raw=true/);
    if (match) {
        const decoded = decodeURIComponent(match[1]);
        const storagePath = exactMap[decoded] || ('Image/Blog/' + decoded);
        doc.fields.imageUrl.stringValue = getFirebaseUrl(storagePath);
    }
  } else if (oldUrl.includes('firebasestorage')) {
      // Fix potential previous bad replaces
      const match = oldUrl.match(/Image%2FBlog%2F(.*?\.(?:jpeg|jpg|png))/);
      if (match) {
          const decoded = decodeURIComponent(match[1]);
          if (exactMap[decoded]) {
              doc.fields.imageUrl.stringValue = getFirebaseUrl(exactMap[decoded]);
          }
      }
  }
});
fs.writeFileSync('mcp_updates.json', JSON.stringify(dbJson.documents, null, 2));
console.log('Saved mcp_updates.json');
