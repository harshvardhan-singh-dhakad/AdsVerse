import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

async function listBlogs() {
  const blogsCol = collection(db, "blogPosts");
  const snap = await getDocs(blogsCol);
  const blogs = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  console.log(JSON.stringify(blogs, null, 2));
}

listBlogs();
