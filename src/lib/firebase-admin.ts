/**
 * Firebase Admin SDK — Server-side only.
 * Used by API routes for token verification and Firestore writes.
 * Never import this in client components.
 */
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0];

  // On Firebase App Hosting, ADC is auto-configured — no env vars needed.
  // For local dev, set FIREBASE_SERVICE_ACCOUNT_KEY env var with JSON string.
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      return initializeApp({
        credential: cert(serviceAccount),
      });
    } catch (e) {
      console.error('[firebase-admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', e);
    }
  }

  // App Hosting default (applicationDefault via ADC)
  return initializeApp();
}

export const adminDb = getFirestore(getAdminApp());
export const adminAuth = getAuth(getAdminApp());
