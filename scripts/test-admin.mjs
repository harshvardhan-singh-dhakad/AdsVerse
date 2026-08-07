import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      return initializeApp({ credential: require('firebase-admin/app').cert(serviceAccount) });
    } catch (e) {
      console.error(e);
    }
  }
  return initializeApp();
}

const db = getFirestore(getAdminApp());

async function testAdmin() {
  try {
    const snap = await db.collection('public_blogPosts').limit(1).get();
    console.log("Admin fetch success:", snap.size, "documents.");
    process.exit(0);
  } catch (error) {
    console.error("Admin fetch failed:", error.message);
    process.exit(1);
  }
}

testAdmin();
