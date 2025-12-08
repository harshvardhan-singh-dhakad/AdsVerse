
import { MetadataRoute } from 'next'

const BASE_URL = 'https://adsverse.in';

export default function sitemap(): MetadataRoute.Sitemap {
    // Static routes
    const staticRoutes = [
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

    // Service pages
    const serviceRoutes = [
        '/services/automation-tools',
        '/services/brand-strategy',
        '/services/paid-ads',
        '/services/seo-optimization',
        '/services/content-marketing',
        '/services/social-media-management',
        '/services/web-design-development',
    ];

    // Blog pages
    const blogRoutes = [
        '/blog/tata-sierra-2025-viral-marketing-case-study',
        '/blog/indore-real-estate-case-study',
        '/blog/lead-generation-guide-indore',
        '/blog/what-are-automation-tools',
        '/blog/why-automation-is-essential',
        '/blog/best-automation-tools-for-business',
        '/blog/demystifying-seo',
        '/blog/content-is-king',
        '/blog/paid-ads-roi',
        '/blog/best-digital-marketing-services-in-indore',
        '/blog/how-local-seo-works-for-indore-businesses',
        '/blog/future-of-automation-in-indore',
        '/blog/best-social-media-strategies-for-indore-businesses',
        '/blog/facebook-instagram-ads-for-indore-builders',
    ];

    const allRoutes = [...staticRoutes, ...serviceRoutes, ...blogRoutes];

    return allRoutes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}
