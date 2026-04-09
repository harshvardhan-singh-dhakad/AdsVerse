
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/firebase/config";

// Initialize Firebase (Server Side & Client Side shared)
// No "use client" so it can be used in server components
export function getFirebaseApp() {
  if (getApps().length > 0) return getApp();
  
  try {
    // Attempt no-args init for App Hosting
    return initializeApp();
  } catch (e) {
    return initializeApp(firebaseConfig);
  }
}

export const db = getFirestore(getFirebaseApp());
