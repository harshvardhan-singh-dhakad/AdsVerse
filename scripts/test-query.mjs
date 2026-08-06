import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';

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

async function testQuery() {
  try {
    const now = new Date().toISOString();
    const q = query(
      collection(db, "public_blogPosts"),
      where("publishedDate", "<=", now),
      orderBy("publishedDate", "desc"),
      limit(200)
    );
    const snap = await getDocs(q);
    console.log("Success! Found:", snap.size);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

testQuery();
