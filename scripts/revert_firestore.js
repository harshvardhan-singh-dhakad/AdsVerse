const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

const firebaseConfig = {
  projectId: 'synergyflow-digital-p7c0g',
  appId: '1:867205490601:web:a4b9a8f0cd5c93f79346b8',
  apiKey: 'AIzaSyAO1xYAhh9ONCZjZI2zliUn_dEPdfaZr2Y',
  authDomain: 'synergyflow-digital-p7c0g.firebaseapp.com',
  messagingSenderId: '867205490601'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function revertFirestore() {
    console.log("Reverting Firestore branding to AdsVerse...");
    
    const collections = ['blogPosts', 'public_blogPosts'];
    
    for (const colName of collections) {
        const snap = await getDocs(collection(db, colName));
        console.log(`Processing ${snap.size} docs in ${colName}...`);
        
        for (const d of snap.docs) {
            const data = d.data();
            let needsUpdate = false;
            const updates = {};
            
            if (data.author && data.author.includes('SynergyFlow')) {
                updates.author = data.author.replace(/SynergyFlow/g, 'AdsVerse');
                needsUpdate = true;
            }
            
            if (data.title && data.title.includes('SynergyFlow')) {
                updates.title = data.title.replace(/SynergyFlow/g, 'AdsVerse');
                needsUpdate = true;
            }
            
            if (data.content && data.content.includes('SynergyFlow')) {
                updates.content = data.content.replace(/SynergyFlow/g, 'AdsVerse');
                needsUpdate = true;
            }

            if (data.excerpt && data.excerpt.includes('SynergyFlow')) {
                updates.excerpt = data.excerpt.replace(/SynergyFlow/g, 'AdsVerse');
                needsUpdate = true;
            }
            
            if (needsUpdate) {
                await updateDoc(doc(db, colName, d.id), updates);
                console.log(`Updated doc ${d.id} in ${colName}`);
            }
        }
    }
    
    console.log("Firestore revert complete!");
}

revertFirestore().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
