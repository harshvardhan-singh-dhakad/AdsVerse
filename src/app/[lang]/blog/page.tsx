
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { firebaseConfig } from "@/firebase/config";

// Initialize Firebase (Server Side)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export const metadata: Metadata = {
  title: "Digital Marketing Insights & Trends | AdsVerse Blog",
  description: "Stay ahead of the curve with the latest news, trends, and strategies in digital marketing from the SynergyFlow team. Explore articles on SEO, paid ads, and content.",
  alternates: {
    canonical: '/blog',
    languages: {
      'en': '/en/blog',
      'hi': '/hi/blog',
    },
  },
};

async function getBlogPosts() {
  try {
    const q = query(collection(db, "public_blogPosts"), orderBy("publishedDate", "desc"));
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
    "description": "Stay ahead of the curve with the latest news, trends, and strategies in digital marketing from the SynergyFlow team.",
    "url": `https://adsverse.in/${lang}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "AdsVerse",
      "logo": {
        "@type": "ImageObject",
        "url": "https://adsverse.in/images/logo-white.png"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.imageUrl,
      "datePublished": post.publishedDate,
      "author": {
        "@type": "Organization",
        "name": post.author || "SynergyFlow Editorial Team"
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
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-accent" /> {new Date(post.publishedDate).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3 text-accent" /> {post.author || "AdsVerse Team"}</span>
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
