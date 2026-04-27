
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'synergyflow-digital-p7c0g',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fixIds = [
  '3avrttXlp9UNdSsM3ziJ',
  'QyemF3pRo3rYcnW8jkle',
  'dSO0VtRo9wTkVN4YghOV',
  'yj2UtshCQtU40a5hDtlO'
];

async function fixSlugs() {
  for (const id of fixIds) {
    const docRef = doc(db, 'blogPosts', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      const oldSlug = data.slug;
      if (oldSlug && oldSlug.includes('/')) {
        const newSlug = oldSlug.split('/').filter(Boolean).pop();
        console.log(`Fixing ${id}: ${oldSlug} -> ${newSlug}`);
        
        // Update blogPosts
        await updateDoc(docRef, { slug: newSlug });
        
        // Update or Create in public_blogPosts if isPublished is true
        if (data.isPublished) {
          const publicRef = doc(db, 'public_blogPosts', id);
          await setDoc(publicRef, { ...data, slug: newSlug });
          console.log(`Updated public_blogPosts for ${id}`);
        }
      }
    }
  }
}

fixSlugs().then(() => console.log('Done')).catch(console.error);
