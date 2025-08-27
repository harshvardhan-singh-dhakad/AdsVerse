
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Note: These values are public and safe to expose.
// Security is handled by Firebase Security Rules.
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || "synergyflow-digital-p7c0g",
  appId: process.env.FIREBASE_APP_ID || "1:867205490601:web:a4b9a8f0cd5c93f79346b8",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "synergyflow-digital-p7c0g.firebasestorage.app",
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAKBFrXeU5o0o5tMaqeN-wAlF-KwVKtFJQ",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "synergyflow-digital-p7c0g.firebaseapp.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "867205490601"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
