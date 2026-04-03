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

    // Homepage
    const homepageRoutes = [''];
    // High-value service pages
    const serviceBaseRoutes = [
        '/services/automation-tools',
        '/services/brand-strategy',
        '/services/paid-ads',
        '/services/seo-optimization',
        '/services/content-marketing',
        '/services/social-media-management',
        '/services/web-design-development',
        '/services/whatsapp-bot',
        '/services/lead-generation',
    ];
    // Standard pages
    const standardRoutes = [
        '/about',
        '/our-services',
        '/portfolio',
        '/pricing',
        '/blog',
        '/contact',
        '/tools/seo-audit',
    ];
    // Legal pages (low priority)
    const legalRoutes = [
        '/privacy-policy',
        '/terms-of-service',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    locales.forEach(lang => {
        // Homepage — highest priority
        homepageRoutes.forEach(route => {
            sitemapEntries.push({
                url: `${BASE_URL}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 1.0,
            });
        });

        // Service pages — very high priority
        serviceBaseRoutes.forEach(route => {
            sitemapEntries.push({
                url: `${BASE_URL}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            });
        });

        // Standard pages
        standardRoutes.forEach(route => {
            sitemapEntries.push({
                url: `${BASE_URL}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            });
        });

        // Legal pages — minimal crawl budget
        legalRoutes.forEach(route => {
            sitemapEntries.push({
                url: `${BASE_URL}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'yearly' as const,
                priority: 0.3,
            });
        });

        // Blog posts — high priority, crawled weekly for freshness
        blogSlugs.forEach(slug => {
            sitemapEntries.push({
                url: `${BASE_URL}/${lang}/blog/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            });
        });
    });

    return sitemapEntries;
}


