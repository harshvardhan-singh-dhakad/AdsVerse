
export const revalidate = 600; // Cache for 10 minutes

import { Metadata } from "next";
import { collection, query, orderBy, getDocs, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase-server";
import BlogClient from "./BlogClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Insights & Digital Trends — AdsVerse Blog",
    description: "Latest digital marketing trends and strategies from AdsVerse. Expert tips on SEO, Paid Ads, and AI Automation.",
    alternates: {
      canonical: `https://adsverse.in/blog`,
    },
  };
}

async function getBlogPosts() {
  try {
    // Use public_blogPosts — publicly readable, contains only published posts
    const now = new Date().toISOString();
    const q = query(
      collection(db, "public_blogPosts"),
      where("publishedDate", "<=", now),
      orderBy("publishedDate", "desc"),
      limit(200)
    );
    const snap = await getDocs(q);
    const posts = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];

    // Sort in-memory: Featured posts first, then by publishedDate (already done by query)
    return posts.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const posts = await getBlogPosts();
  const initialCategory = searchParams?.category || 'all';

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
      "headline": post.title,
      "description": post.excerpt,
      "image": post.imageUrl,
      "datePublished": post.publishedDate,
      "author": {
        "@type": "Person",
        "name": post.author || "Deepak Dhakad",
        "jobTitle": "Digital Marketing & AI Automation Expert",
        "url": "https://adsverse.in/about",
        "image": "https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o/Image%2FTeam%2FDEEPAK.ABOUT.png?alt=media"
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
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
            Expert strategies, industry trends, and actionable insights to scale your digital presence in 2026 and beyond.
          </p>
        </section>

        <BlogClient initialPosts={posts} initialCategory={initialCategory} />
      </div>
    </>
  );
}


