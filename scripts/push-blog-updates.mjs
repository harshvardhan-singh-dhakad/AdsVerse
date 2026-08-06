import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import fs from 'fs';

// Firebase client config
const firebaseConfig = {
  "projectId": "synergyflow-digital-p7c0g",
  "appId": "1:867205490601:web:a4b9a8f0cd5c93f79346b8",
  "storageBucket": "synergyflow-digital-p7c0g.firebasestorage.app",
  "apiKey": "AIzaSyAO1xYAhh9ONCZjZI2zliUn_dEPdfaZr2Y",
  "authDomain": "synergyflow-digital-p7c0g.firebaseapp.com",
  "messagingSenderId": "867205490601"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const updatedBlogsFile = 'blogs-updated.json';
const updatedBlogs = JSON.parse(fs.readFileSync(updatedBlogsFile, 'utf8'));

async function pushUpdates() {
  console.log(`Pushing updates for ${updatedBlogs.length} blogs to Firestore...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  // We'll update them in sequence to avoid overwhelming the connection
  for (const post of updatedBlogs) {
    try {
      const docRef = doc(db, 'public_blogPosts', post.id);
      await updateDoc(docRef, {
        content: post.content
      });
      successCount++;
      if (successCount % 10 === 0) {
        console.log(`Updated ${successCount}/${updatedBlogs.length} blogs...`);
      }
    } catch (e) {
      console.error(`Failed to update blog ${post.id}:`, e);
      errorCount++;
    }
  }
  
  console.log(`\nPush complete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  process.exit(0);
}

pushUpdates();
