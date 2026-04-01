
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, query, where } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "synergyflow-digital-p7c0g",
  "appId": "1:867205490601:web:a4b9a8f0cd5c93f79346b8",
  "apiKey": "AIzaSyAO1xYAhh9ONCZjZI2zliUn_dEPdfaZr2Y",
  "authDomain": "synergyflow-digital-p7c0g.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "867205490601"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function syncBlogs() {
  console.log("Starting sync...");
  const blogPostsCol = collection(db, "blogPosts");
  const q = query(blogPostsCol, where("isPublished", "==", true));
  const snap = await getDocs(q);
  
  console.log(`Found ${snap.size} published blogs.`);
  
  for (const blogDoc of snap.docs) {
    const data = blogDoc.data();
    const publicBlogRef = doc(db, "public_blogPosts", blogDoc.id);
    await setDoc(publicBlogRef, data);
    console.log(`Synced: ${data.title}`);
  }
  
  console.log("Sync complete!");
}

syncBlogs();
