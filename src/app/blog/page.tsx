export const dynamic = 'force-dynamic';
import { Metadata } from "next";
import { adminDb } from "@/firebase/admin";
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

import { FALLBACK_POSTS, sanitizeBlogPost } from "@/lib/fallback-blogs";

async function getBlogPosts() {
  try {
    const now = new Date().toISOString();
    const snap = await adminDb.collection("public_blogPosts")
      .where("publishedDate", "<=", now)
      .orderBy("publishedDate", "desc")
      .limit(200)
      .get();
    if (snap && snap.docs && snap.docs.length > 0) {
      const posts = snap.docs.map((doc: any) => sanitizeBlogPost(doc.id, doc.data()));
      return posts.sort((a: any, b: any) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
    }
    return FALLBACK_POSTS;
  } catch (error) {
    console.warn("[getBlogPosts] Falling back to default posts:", error);
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


