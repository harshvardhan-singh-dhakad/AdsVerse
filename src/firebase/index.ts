'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    let firebaseApp;
    try {
      firebaseApp = initializeApp();
    } catch (e) {
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
      }
      firebaseApp = initializeApp(firebaseConfig);
    }
    return getSdks(firebaseApp);
  }
  return getSdks(getApp());
}

// Lazy-load singleton instances
let _sdks: any | undefined;
let _authInstance: any | undefined;

function getLazySdks() {
  if (!_sdks) {
    _sdks = initializeFirebase();
  }
  return _sdks;
}

// Proxy-based exports to initialize on first access
export const auth = new Proxy({} as any, {
  get(_, prop) {
    // Firebase Auth is client-side only
    if (typeof window === 'undefined') return undefined;
    
    if (!_authInstance) {
      // Lazy initialize Firebase
      getLazySdks();
      
      // Dynamic require to avoid top-level bundle weight
      const { getAuth } = require('firebase/auth');
      _authInstance = getAuth(getApp());
    }
    
    const value = _authInstance[prop];
    return typeof value === 'function' ? value.bind(_authInstance) : value;
  }
});

export const db = new Proxy({} as any, {
  get(_, prop) {
    const instance = getLazySdks().firestore;
    const value = (instance as any)[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  }
});

export const storage = new Proxy({} as any, {
  get(_, prop) {
    const instance = getLazySdks().storage;
    const value = (instance as any)[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  }
});

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    firestore: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
