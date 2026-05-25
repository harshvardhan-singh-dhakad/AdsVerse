import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adsverse.in';

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/our-services`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/pricing`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/portfolio`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/blog`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/faq`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services/automation-tools`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services/brand-strategy`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services/content-marketing`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services/lead-generation`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services/paid-ads`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services/seo-optimization`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services/social-media-management`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services/web-design-development`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services/whatsapp-bot`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/seo-audit`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${baseUrl}/terms-of-service`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3, changeFrequency: 'yearly' },
  ];

  return staticPages.map(page => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency as any,
    priority: page.priority,
  }));
}
