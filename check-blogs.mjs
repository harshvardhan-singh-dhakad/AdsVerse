import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

async function check() {
  console.log("--- blogPosts collection ---");
  const blogPostsSnap = await getDocs(collection(db, "blogPosts"));
  for (const docSnap of blogPostsSnap.docs) {
    const data = docSnap.data();
    console.log(`ID: ${docSnap.id} | Title: "${data.title}" | Status: ${data.status} | isPublished: ${data.isPublished} | publishedDate: ${data.publishedDate}`);
  }

  console.log("\n--- public_blogPosts collection ---");
  const publicBlogPostsSnap = await getDocs(collection(db, "public_blogPosts"));
  for (const docSnap of publicBlogPostsSnap.docs) {
    const data = docSnap.data();
    console.log(`ID: ${docSnap.id} | Title: "${data.title}" | Status: ${data.status} | isPublished: ${data.isPublished} | publishedDate: ${data.publishedDate}`);
  }
}

check().catch(console.error);
