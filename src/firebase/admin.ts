/**
 * Firebase Admin SDK — Server-side only.
 * Used by API routes for token verification and Firestore writes.
 * Never import this in client components.
 */
import 'server-only';
import { initializeApp, getApp, getApps, cert, App, AppOptions } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { firebaseConfig } from '@/firebase/config';

function getAdminOptions(): AppOptions {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GCP_PROJECT || firebaseConfig.projectId;

  // For local dev, set FIREBASE_SERVICE_ACCOUNT_KEY env var with JSON string if available
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      return {
        credential: cert(serviceAccount),
        projectId,
      };
    } catch (e) {
      console.error('[firebase-admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', e);
    }
  }

  // App Hosting default with explicit projectId
  return { projectId };
}

// Reuse the process-wide Admin app during Next.js module reloads.
const app: App = getApps().length ? getApp() : initializeApp(getAdminOptions());

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
