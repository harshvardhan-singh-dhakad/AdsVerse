
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { getFirestore, collection, query, orderBy, getDocs, where } from "firebase/firestore";

import { db } from "@/lib/firebase-server";

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isHi = lang === 'hi';
  return {
    title: isHi ? "इनसाइट्स और डिजिटल ट्रेंड्स — AdsVerse ब्लॉग" : "Insights & Digital Trends — AdsVerse Blog",
    description: isHi
      ? "AdsVerse के नवीनतम डिजिटल मार्केटिंग ट्रेंड और रणनीतियाँ। SEO, सशुल्क विज्ञापन और AI ऑटोमेशन पर विशेषज्ञ सुझाव।"
      : "Latest digital marketing trends and strategies from AdsVerse. Expert tips on SEO, Paid Ads, and AI Automation.",
    alternates: {
      canonical: `https://adsverse.in/${lang}/blog`,
      languages: {
        'en': 'https://adsverse.in/en/blog',
        'hi': 'https://adsverse.in/hi/blog',
      },
    },
  };
}

function formatPostDate(date: any) {
  if (!date) return "N/A";
  try {
    let d: Date;
    // If it's a Firestore Timestamp
    if (date && typeof date === 'object' && 'toDate' in date) {
      d = date.toDate();
    } else {
      d = new Date(date);
    }
    
    if (isNaN(d.getTime())) return "N/A";
    
    // Use a stable, non-locale-dependent format for server/client consistency
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return "N/A";
  }
}

async function getBlogPosts() {
  try {
    // Use public_blogPosts — publicly readable, contains only published posts
    const q = query(
      collection(db, "public_blogPosts"),
      orderBy("publishedDate", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage({ params: { lang } }: { params: { lang: string } }) {
  const posts = await getBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Digital Marketing Insights & Trends | AdsVerse Blog",
    "description": "Stay ahead of the curve with the latest news, trends, and strategies in digital marketing from the AdsVerse team.",
    "url": `https://adsverse.in/${lang}/blog`,
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

        <section className="mb-24">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, index) => (
                <Card key={post.slug} className="flex flex-col overflow-hidden group bg-card/40 backdrop-blur-md border-primary/10 hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent/90 backdrop-blur-sm text-white border-none px-3 py-1">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-accent" /> {formatPostDate(post.publishedDate)}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3 text-accent" /> {post.author || "Deepak Dhakad"}</span>
                    </div>
                    <CardTitle className="font-headline text-2xl leading-tight group-hover:text-primary transition-colors cursor-pointer capitalize">
                      <Link href={`/${lang}/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-6 border-t border-primary/5">
                    <Button asChild variant="link" className="p-0 text-accent group-hover:gap-3 transition-all">
                      <Link href={`/${lang}/blog/${post.slug}`} className="flex items-center font-bold uppercase tracking-wider text-xs">
                        Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card/20 backdrop-blur-sm rounded-2xl border border-primary/5">
              <h3 className="text-2xl font-headline text-primary mb-4">No insights found yet.</h3>
              <p className="text-muted-foreground">Stay tuned for our latest digital marketing trends and strategies.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
