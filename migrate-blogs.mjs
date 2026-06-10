import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

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

async function migrate() {
  console.log("Starting Firestore blog posts migration...");
  
  const collections = ["blogPosts", "public_blogPosts"];
  
  for (const collName of collections) {
    console.log(`\nMigrating collection: ${collName}`);
    const collRef = collection(db, collName);
    const snapshot = await getDocs(collRef);
    
    console.log(`Found ${snapshot.size} documents in ${collName}.`);
    
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const docId = docSnap.id;
      
      let needsUpdate = false;
      const updates = {};
      
      // Check publishedDate
      if (!data.publishedDate) {
        console.log(`Document ${docId} has missing publishedDate.`);
        let pubDate = new Date();
        if (data.createdAt) {
          pubDate = typeof data.createdAt.toDate === "function" ? data.createdAt.toDate() : new Date(data.createdAt.seconds * 1000);
        } else if (data.updatedAt) {
          pubDate = typeof data.updatedAt.toDate === "function" ? data.updatedAt.toDate() : new Date(data.updatedAt.seconds * 1000);
        }
        updates.publishedDate = pubDate.toISOString();
        needsUpdate = true;
      }
      
      // Check updatedAt
      if (!data.updatedAt) {
        console.log(`Document ${docId} has missing updatedAt.`);
        updates.updatedAt = data.createdAt || new Date();
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        console.log(`Updating document ${docId} with:`, JSON.stringify(updates));
        const docRef = doc(db, collName, docId);
        await updateDoc(docRef, updates);
      } else {
        console.log(`Document ${docId} is already fully up-to-date.`);
      }
    }
  }
  
  console.log("\nMigration completed successfully!");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed with error:", err);
  process.exit(1);
});
