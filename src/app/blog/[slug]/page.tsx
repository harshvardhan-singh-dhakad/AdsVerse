
export const revalidate = 3600; // Cache for 1 hour

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase-server";

import { BlogPost } from "@/lib/definitions";
import { ShareButtons } from "@/components/layout/share-buttons";
import { cn } from "@/lib/utils";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { ReadingProgressBar } from "@/components/layout/ReadingProgressBar";


async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Use public_blogPosts — publicly readable, contains only published posts
  const q = query(
    collection(db, "public_blogPosts"),
    where("slug", "==", slug)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const post = snap.docs[0].data() as BlogPost;
  
  // Security check: Don't show scheduled posts before their time
  const now = new Date().toISOString();
  if (post.publishedDate > now) {
    return null;
  }
  
  return post;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: "Post Not Found" };

  const fullUrl = `https://adsverse.in/blog/${post.slug}`;
  const imageUrl = post.imageUrl || 'https://adsverse.in/images/og-adsverse-2026.png';

  return {
    title: `${post.title} | AdsVerse Blog`,
    description: post.excerpt,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: fullUrl,
      siteName: 'AdsVerse',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author || 'Deepak Dhakad'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

interface HeadingItem {
  id: string;
  text: string;
}

function processBlogContent(html: string): { cleanedHtml: string; headings: HeadingItem[] } {
  const headings: HeadingItem[] = [];
  if (!html) return { cleanedHtml: "", headings };

  // 1. Remove the first H1 tag which is the duplicate title
  let cleaned = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, "");
  // 2. Convert any remaining H1 tags to H2 tags
  cleaned = cleaned.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/gi, "<h2$1>$2</h2>");

  // 3. Extract and inject H2 heading IDs
  let count = 0;
  const cleanedHtml = cleaned.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, innerText) => {
    const cleanText = innerText.replace(/<[^>]*>/g, '').trim();
    if (!cleanText) return match;

    const slugId = cleanText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const uniqueId = slugId ? `${slugId}-${count++}` : `section-${count++}`;
    headings.push({ id: uniqueId, text: cleanText });

    if (/id=/i.test(attrs)) {
      return match;
    }

    return `<h2 id="${uniqueId}"${attrs}>${innerText}</h2>`;
  });

  return { cleanedHtml, headings };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const { cleanedHtml, headings } = processBlogContent(post.content);

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
        "url": "https://adsverse.in/images/logo-white.webp"
      }
    },
    "datePublished": post.publishedDate,
    "dateModified": post.updatedAt?.toDate()?.toISOString() || post.publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://adsverse.in/blog/${post.slug}`
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
        "item": `https://adsverse.in`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `https://adsverse.in/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://adsverse.in/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      <ReadingProgressBar />
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
      <div className={cn(
        "container mx-auto py-16 px-4 sm:px-6 lg:px-10",
        headings.length > 0 ? "max-w-5xl xl:max-w-6xl" : "max-w-4xl xl:max-w-5xl"
      )}>
        <Button asChild variant="ghost" className="mb-8 hover:text-primary transition-colors">
          <Link href="/blog">
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
                <time dateTime={post.publishedDate} className="post-date">
                  Last Updated: {
                    (post.updatedAt 
                      ? (typeof post.updatedAt.toDate === 'function' ? post.updatedAt.toDate() : new Date(post.updatedAt as any)) 
                      : new Date(post.publishedDate)
                    ).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  }
                </time>
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

          <div className={cn(
            "items-start",
            headings.length > 0 ? "grid grid-cols-1 lg:grid-cols-4 gap-12" : "block"
          )}>
            {headings.length > 0 && (
              <aside className="hidden lg:block lg:col-span-1 sticky top-[100px] self-start">
                <TableOfContents headings={headings} />
              </aside>
            )}

            <div className={cn(
              "space-y-8",
              headings.length > 0 ? "lg:col-span-3" : "w-full"
            )}>
              <Card className="border-none bg-card/40 backdrop-blur-md shadow-xl overflow-hidden">
                <CardContent className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
                  <div
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: cleanedHtml }}
                  />
                </CardContent>
              </Card>

              {post.whatsappShare && (
                <ShareButtons />
              )}

              {post.allowComments && (
                <section className="pt-12 border-t border-primary/10 mt-16 animate-in fade-in duration-1000">
                  <div className="bg-card/40 backdrop-blur-xl border border-primary/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Share2 className="w-24 h-24 text-primary" />
                    </div>
                    
                    <h3 className="text-3xl font-black font-headline mb-4 text-foreground">Join the Conversation</h3>
                    <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                      Have insights or questions about this post? We'd love to hear from you. 
                      Connect with our team directly or share your thoughts via WhatsApp.
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                        <Link href="/contact">Contact Our Experts</Link>
                      </Button>
                      <Button variant="outline" asChild className="rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-xs border-primary/20 hover:border-primary/40 transition-all">
                        <a href="https://wa.me/919109090000" target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
                      </Button>
                    </div>
                    
                    <p className="mt-8 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black opacity-40">
                      AdsVerse · Digital Excellence 2026
                    </p>
                  </div>
                </section>
              )}
            </div>
          </div>

        </article>
      </div>
    </>
  );
}

