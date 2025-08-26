import { MetadataRoute } from 'next'

const BASE_URL = 'https://adsverse.in';

export default function sitemap(): MetadataRoute.Sitemap {
    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/services',
        '/portfolio',
        '/pricing',
        '/blog',
        '/contact',
        '/privacy-policy',
        '/terms-of-service',
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
        '/blog/best-automation-tools-for-business',
        '/blog/demystifying-seo',
        '/blog/content-is-king',
        '/blog/paid-ads-roi',
        '/blog/best-digital-marketing-services-in-indore',
    ];

    const allRoutes = [...staticRoutes, ...serviceRoutes, ...blogRoutes];

    return allRoutes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}
