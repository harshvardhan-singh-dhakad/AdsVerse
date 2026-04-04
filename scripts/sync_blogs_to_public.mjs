// Script: Sync published blogPosts → public_blogPosts
// Run: node scripts/sync_blogs_to_public.mjs

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Try to use GOOGLE_APPLICATION_CREDENTIALS or firebase-admin with default credentials
let app;
try {
  app = initializeApp({
    projectId: 'synergyflow-digital-p7c0g',
  });
} catch (e) {
  app = require('firebase-admin/app').getApp();
}

const db = getFirestore(app);

async function syncBlogs() {
  console.log('🔄 Fetching all blogs from blogPosts...');
  const snapshot = await db.collection('blogPosts').get();
  
  if (snapshot.empty) {
    console.log('❌ No documents found in blogPosts!');
    return;
  }

  console.log(`📋 Found ${snapshot.size} total blog posts`);
  
  let published = 0;
  let drafted = 0;
  const batch = db.batch();

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.isPublished === true) {
      const publicRef = db.collection('public_blogPosts').doc(docSnap.id);
      batch.set(publicRef, {
        ...data,
        syncedAt: new Date(),
      });
      published++;
      console.log(`  ✅ Publishing: ${data.title}`);
    } else {
      drafted++;
      console.log(`  📝 Draft (skipping): ${data.title}`);
    }
  });

  if (published > 0) {
    await batch.commit();
    console.log(`\n✅ SUCCESS! Synced ${published} published blogs to public_blogPosts`);
    console.log(`📝 ${drafted} posts remain as drafts`);
  } else {
    console.log('⚠️  No published blogs found to sync. Make sure isPublished: true is set.');
  }
}

syncBlogs().catch(console.error);
