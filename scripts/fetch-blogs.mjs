import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

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

async function fetchBlogs() {
  console.log("Fetching blogs...");
  const snapshot = await getDocs(collection(db, 'public_blogPosts'));
  const blogs = [];
  snapshot.forEach(doc => {
    blogs.push({ id: doc.id, ...doc.data() });
  });
  console.log(`Found ${blogs.length} blogs.`);
  fs.writeFileSync('blogs-backup.json', JSON.stringify(blogs, null, 2));
  console.log("Saved to blogs-backup.json");
  process.exit(0);
}

fetchBlogs().catch(e => {
  console.error("Error fetching blogs:", e);
  process.exit(1);
});
