import { adminDb } from '../src/lib/firebase-admin';

async function clearCache() {
  const snapshot = await adminDb.collection('geo_aeo_cache').get();
  const batch = adminDb.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  console.log('Cleared geo_aeo_cache collection.');
}

clearCache().catch(console.error);
