export const revalidate = 120;
import { Metadata } from "next";
import { collection, query, orderBy, getDocs, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase-server";
import BlogClient from "./BlogClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { absolute: "Insights & Digital Trends | AdsVerse Blog" },
    description: "Latest digital marketing trends and strategies from AdsVerse. Expert tips on AI SEO, Paid Ads, and WhatsApp automation for Indian businesses.",
    alternates: {
      canonical: `https://adsverse.in/blog`,
    },
  };
}

const FALLBACK_POSTS = [
  {
    id: "seo-trends-2026",
    slug: "seo-trends-2026",
    title: "Top SEO & GEO Search Trends for 2026",
    excerpt: "Discover how AI search engines, answer engine optimization, and semantic search are reshaping Google rankings in 2026.",
    imageUrl: "/images/og-adsverse-2026.png",
    category: "seo",
    publishedDate: "2026-01-10",
    author: "Deepak Dhakad",
    isFeatured: true,
  },
  {
    id: "meta-ads-scaling-guide",
    slug: "meta-ads-scaling-guide",
    title: "How to Scale Meta Ads to ₹50L+ Revenue",
    excerpt: "Learn the exact ad creative structure, Advantage+ campaign setups, and custom audience strategies we use to scale D2C brands.",
    imageUrl: "/images/og-adsverse-2026.png",
    category: "paid-ads",
    publishedDate: "2026-01-05",
    author: "Deepak Dhakad",
    isFeatured: false,
  },
];

async function getBlogPosts() {
  try {
    const now = new Date().toISOString();
    const q = query(
      collection(db, "public_blogPosts"),
      where("publishedDate", "<=", now),
      orderBy("publishedDate", "desc"),
      limit(200)
    );
    const snap = await getDocs(q);
    if (snap && snap.docs && snap.docs.length > 0) {
      const posts = snap.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
      return posts.sort((a: any, b: any) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
    }
    return FALLBACK_POSTS;
  } catch (error) {
    return FALLBACK_POSTS;
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Digital Marketing Insights & Trends | AdsVerse Blog",
    "description": "Stay ahead of the curve with the latest news, trends, and strategies in digital marketing from the AdsVerse team.",
    "url": `https://adsverse.in/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "AdsVerse",
      "logo": {
        "@type": "ImageObject",
        "url": "https://adsverse.in/images/logo-white.webp"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title || "AdsVerse Insight",
      "description": post.excerpt || "Digital marketing and AI automation strategies.",
      "image": post.imageUrl || "https://adsverse.in/images/og-adsverse-2026.png",
      "datePublished": typeof post.publishedDate === 'string' ? post.publishedDate : "2026-01-01",
      "author": {
        "@type": "Person",
        "name": post.author || "Deepak Dhakad",
        "jobTitle": "Digital Marketing & AI Automation Expert",
        "url": "https://adsverse.in/author/deepak-dhakad",
        "image": "https://adsverse.in/images/deepak-dhakad-founder.webp"
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto py-16 px-4">
        <section className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-headline text-primary mb-6">Our Insights</h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-800 dark:text-muted-foreground leading-relaxed">
            Expert strategies, industry trends, and actionable insights to scale your digital presence in 2026 and beyond.
          </p>
        </section>

        <BlogClient initialPosts={posts} />
      </div>
    </>
  );
}


