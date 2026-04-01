const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, setDoc, doc, deleteDoc } = require('firebase/firestore');
const fs = require('fs');

const firebaseConfig = {
  projectId: 'synergyflow-digital-p7c0g',
  appId: '1:867205490601:web:a4b9a8f0cd5c93f79346b8',
  apiKey: 'AIzaSyAO1xYAhh9ONCZjZI2zliUn_dEPdfaZr2Y',
  authDomain: 'synergyflow-digital-p7c0g.firebaseapp.com',
  messagingSenderId: '867205490601'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uniqueBlogs = JSON.parse(fs.readFileSync('scripts/unique_blogs.json'));

const imageMap = {
    'lead-generation-guide-indore': '/images/blog/lead-gen-indore.png',
    'why-automation-is-essential': '/images/blog/automation-essential.png',
    'what-are-automation-tools': '/images/blog/automation-tools.png',
    'best-automation-tools-for-business': '/images/blog/automation-tools.png',
    'best-digital-marketing-services-in-indore': '/images/blog/digital-marketing-indore.png'
};

async function processBlogs() {
    console.log("Cleaning up and Syncing...");
    
    // 1. Get all current blogPosts to find duplicates (slug-based IDs)
    const allSnap = await getDocs(collection(db, 'blogPosts'));
    const slugBasedIds = allSnap.docs.filter(d => d.id.includes('-')).map(d => d.id);
    console.log(`Found ${slugBasedIds.length} slug-based IDs to clean up.`);

    // 2. Clear public_blogPosts first to ensure a fresh sync
    const pubSnap = await getDocs(collection(db, 'public_blogPosts'));
    for (const d of pubSnap.docs) {
        await deleteDoc(doc(db, 'public_blogPosts', d.id));
    }
    console.log("Cleared public_blogPosts.");

    for (const blog of uniqueBlogs) {
        const targetId = blog.slug;
        const updatedBlog = {
            ...blog,
            id: targetId,
            author: "SynergyFlow Team",
            isPublished: true,
            updatedAt: new Date()
        };

        // Apply new images if mapped
        if (imageMap[targetId]) {
            updatedBlog.imageUrl = imageMap[targetId];
        }

        // 3. Update/Create in blogPosts (using slug as ID for consistency)
        await setDoc(doc(db, 'blogPosts', targetId), updatedBlog);
        
        // 4. Sync to public_blogPosts
        await setDoc(doc(db, 'public_blogPosts', targetId), updatedBlog);
        
        // 5. Delete the old random ID document if it exists and is different
        if (blog.id !== targetId) {
            await deleteDoc(doc(db, 'blogPosts', blog.id));
            console.log(`Migrated: ${blog.title} (${blog.id} -> ${targetId})`);
        } else {
            console.log(`Updated: ${blog.title} (${targetId})`);
        }
    }

    console.log("Cleanup and Sync complete!");
}

processBlogs().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
