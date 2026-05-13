import { MetadataRoute } from 'next';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase-server";

async function getBlogSlugs(): Promise<string[]> {
  try {
    const snap = await getDocs(collection(db, "public_blogPosts"));
    return snap.docs.map(doc => doc.data().slug).filter(Boolean);
  } catch (error) {
    console.error("Error fetching blog slugs for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://adsverse.in';
  
  // Static pages (19 pages)
  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/our-services`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/pricing`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/portfolio`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/blog`, priority: 0.9, changeFrequency: 'weekly' },
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
  ].map(page => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency as any,
  }));

  const blogSlugs = await getBlogSlugs();
  const blogPages = blogSlugs.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
