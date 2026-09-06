import 'client-only';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAuth, Auth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';

// Ensure singleton-safe initialization
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);
const auth: Auth = getAuth(app);

// Export instances securely
export { app, db, storage, auth };

/** Creates the provider and starts the popup from the same client-only SDK module. */
export function signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return signInWithPopup(auth, provider);
}

// Export Firestore functions to ensure single module resolution across the client
export {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
  addDoc,
  deleteDoc,
  getFirestore
} from 'firebase/firestore';
