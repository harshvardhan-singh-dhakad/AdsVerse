
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase-server";

interface BlogPost {
  title: string;
  slug: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  publishedDate: string;
  excerpt: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Use public_blogPosts — publicly readable, contains only published posts
  const q = query(
    collection(db, "public_blogPosts"),
    where("slug", "==", slug)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as BlogPost;
}

export async function generateMetadata({ params }: { params: { slug: string, lang: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | AdsVerse Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://adsverse.in/${params.lang}/blog/${post.slug}`,
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string, lang: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.imageUrl,
    "author": {
      "@type": "Person",
      "name": post.author || "Deepak Dhakad",
      "jobTitle": "Digital Marketing & AI Automation Expert",
      "url": "https://adsverse.in/about",
      "image": "https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o/Image%2FTeam%2FDEEPAK.ABOUT.png?alt=media"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AdsVerse",
      "logo": {
        "@type": "ImageObject",
        "url": "https://adsverse.in/images/logo-white.png"
      }
    },
    "datePublished": post.publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://adsverse.in/${params.lang}/blog/${post.slug}`
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://adsverse.in/${params.lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `https://adsverse.in/${params.lang}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://adsverse.in/${params.lang}/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        id="blog-posting-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        id="breadcrumb-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto py-16 px-4 max-w-4xl">
        <Button asChild variant="ghost" className="mb-8 hover:text-primary transition-colors">
          <Link href={`/${params.lang}/blog`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="space-y-6">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary border-none">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline text-balance">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-accent" />
                <span>{post.author || "Deepak Dhakad"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-2xl border border-primary/10">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              priority
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <Card className="border-none bg-card/40 backdrop-blur-md shadow-xl overflow-hidden">
            <CardContent className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
          </Card>
        </article>
      </div>
    </>
  );
}
