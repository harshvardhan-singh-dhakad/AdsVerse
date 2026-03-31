import { MetadataRoute } from 'next'
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from "@/firebase/config";

const BASE_URL = 'https://adsverse.in';
const locales = ['en', 'hi'];

// Initialize Firebase (Server Side)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

async function getBlogSlugs() {
    try {
        const snap = await getDocs(collection(db, "blogPosts"));
        return snap.docs.map(doc => doc.data().slug).filter(Boolean);
    } catch (e) {
        console.error("Sitemap: Error fetching blog slugs:", e);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogSlugs = await getBlogSlugs();
    // Static base routes (without locale prefix)
    const staticBaseRoutes = [
        '',
        '/about',
        '/our-services',
        '/portfolio',
        '/pricing',
        '/blog',
        '/contact',
        '/privacy-policy',
        '/terms-of-service',
        '/tools/seo-audit',
    ];

    // Service base routes
    const serviceBaseRoutes = [
        '/services/automation-tools',
        '/services/brand-strategy',
        '/services/paid-ads',
        '/services/seo-optimization',
        '/services/content-marketing',
        '/services/social-media-management',
        '/services/web-design-development',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Combine and generate localized routes
    const allBaseRoutes = [...staticBaseRoutes, ...serviceBaseRoutes];

    locales.forEach(lang => {
        allBaseRoutes.forEach(route => {
            sitemapEntries.push({
                url: `${BASE_URL}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: route === '' ? 1 : 0.8,
            });
        });

        blogSlugs.forEach(slug => {
            sitemapEntries.push({
                url: `${BASE_URL}/${lang}/blog/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            });
        });
    });

    return sitemapEntries;
}

