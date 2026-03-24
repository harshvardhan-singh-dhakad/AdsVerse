
// This file is deprecated and will be removed in a future refactoring.
// Please use the new Firebase Provider pattern located in /src/firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "@/firebase/config";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth, app };
