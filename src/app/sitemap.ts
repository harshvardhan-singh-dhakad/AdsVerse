import { MetadataRoute } from 'next';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase-server";
import { DM_CATEGORIES, AI_CATEGORIES, getServiceSlug } from "@/lib/services-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://adsverse.in';

  const basePages = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/our-services`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/pricing`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/portfolio`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/blog`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/faq`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/locations`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/locations/pan-india-remote`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/tools/seo-audit`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/terms-of-service`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/refund-policy`, priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const cities = [
    "indore", "bhopal", "jabalpur", "gwalior", "ujjain",
    "jaipur", "jodhpur", "udaipur", "kota",
    "raipur", "bilaspur",
    "lucknow", "kanpur", "noida",
    "patna",
    "srinagar", "jammu",
    "guwahati", "shillong", "gangtok", "agartala", "aizawl", "dimapur", "kohima", "imphal",
  ];

  const cityPages = cities.map(city => ({
    url: `${baseUrl}/locations/${city}`,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
    lastModified: new Date()
  }));

  // Fetch dynamic blog posts from Firestore to include in the sitemap
  let blogPages: Array<{ url: string; priority: number; changeFrequency: any; lastModified: Date }> = [];
  try {
    const now = new Date().toISOString();
    const q = query(
      collection(db, "public_blogPosts"),
      where("publishedDate", "<=", now)
    );
    const snap = await getDocs(q);
    blogPages = snap.docs.map(doc => {
      const data = doc.data();
      let lastMod = new Date();
      if (data.updatedAt) {
        lastMod = typeof data.updatedAt.toDate === 'function' ? data.updatedAt.toDate() : new Date(data.updatedAt);
      } else if (data.publishedDate) {
        lastMod = new Date(data.publishedDate);
      }
      return {
        url: `${baseUrl}/blog/${data.slug}`,
        priority: 0.8,
        changeFrequency: 'weekly' as const,
        lastModified: lastMod
      };
    });
  } catch (error) {
    console.error("Error generating dynamic blog sitemap:", error);
  }

  const allStaticPages = basePages.map(page => ({
    url: page.url,
    priority: page.priority,
    changeFrequency: page.changeFrequency,
    lastModified: new Date()
  }));

  const baseUrls = new Set(allStaticPages.map(page => page.url));

  const allServicePages = [
    ...DM_CATEGORIES.flatMap(cat => cat.services),
    ...AI_CATEGORIES.flatMap(cat => cat.services)
  ].map(s => {
    const slug = s.href || `/services/${getServiceSlug(s.name)}`;
    const url = slug.startsWith('http') ? slug : `${baseUrl}${slug}`;
    return {
      url,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: new Date()
    };
  }).filter(page => !baseUrls.has(page.url));

  const allPages = [...allStaticPages, ...allServicePages, ...cityPages, ...blogPages];

  return allPages;
}

