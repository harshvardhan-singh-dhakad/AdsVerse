'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { collection, query, where, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { useFirestore } from '@/firebase';
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'paid-ads', label: 'Paid Ads' },
  { id: 'seo', label: 'SEO Optimization' },
  { id: 'web-development', label: 'Web Development' },
  { id: 'automation-ai', label: 'Automation & AI' },
  { id: 'content-marketing', label: 'Content Marketing' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'whatsapp-marketing', label: 'WhatsApp Marketing' },
  { id: 'local-seo', label: 'Local SEO' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'tutorials', label: 'Tutorials' },
  { id: 'industry-news', label: 'Industry News' },
];

function formatPostDate(date: any) {
  if (!date) return "N/A";
  try {
    let d: Date;
    if (date && typeof date === 'object' && 'toDate' in date) {
      d = date.toDate();
    } else {
      d = new Date(date);
    }
    
    if (isNaN(d.getTime())) return "N/A";
    
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return "N/A";
  }
}

interface BlogClientProps {
  initialPosts: any[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const firestore = useFirestore();
  const [posts, setPosts] = useState<any[]>(initialPosts);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(initialPosts.length === 15);

  // When switching categories, load new posts
  const handleCategoryChange = async (categoryId: string) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
    setIsLoading(true);

    try {
      const now = new Date().toISOString();
      let q;

      if (categoryId === 'all') {
        q = query(
          collection(firestore, "public_blogPosts"),
          where("publishedDate", "<=", now),
          orderBy("publishedDate", "desc"),
          limit(15)
        );
      } else if (categoryId === 'seo') {
        q = query(
          collection(firestore, "public_blogPosts"),
          where("category", "in", ["seo", "seo-strategy"]),
          where("publishedDate", "<=", now),
          orderBy("publishedDate", "desc"),
          limit(15)
        );
      } else {
        q = query(
          collection(firestore, "public_blogPosts"),
          where("category", "==", categoryId),
          where("publishedDate", "<=", now),
          orderBy("publishedDate", "desc"),
          limit(15)
        );
      }

      const snap = await getDocs(q);
      const fetchedPosts = snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any)
      })) as any[];

      // Sort featured posts first (match server behavior)
      fetchedPosts.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });

      setPosts(fetchedPosts);
      setHasMore(fetchedPosts.length === 15);
    } catch (error) {
      console.error("Error filtering blog posts by category:", error);
      setPosts([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more posts (pagination)
  const loadMorePosts = async () => {
    if (isLoadingMore || posts.length === 0) return;
    setIsLoadingMore(true);

    try {
      const now = new Date().toISOString();
      const lastPost = posts[posts.length - 1];
      const lastPostPublishedDate = lastPost.publishedDate;

      let q;

      if (activeCategory === 'all') {
        q = query(
          collection(firestore, "public_blogPosts"),
          where("publishedDate", "<=", now),
          orderBy("publishedDate", "desc"),
          startAfter(lastPostPublishedDate),
          limit(15)
        );
      } else if (activeCategory === 'seo') {
        q = query(
          collection(firestore, "public_blogPosts"),
          where("category", "in", ["seo", "seo-strategy"]),
          where("publishedDate", "<=", now),
          orderBy("publishedDate", "desc"),
          startAfter(lastPostPublishedDate),
          limit(15)
        );
      } else {
        q = query(
          collection(firestore, "public_blogPosts"),
          where("category", "==", activeCategory),
          where("publishedDate", "<=", now),
          orderBy("publishedDate", "desc"),
          startAfter(lastPostPublishedDate),
          limit(15)
        );
      }

      const snap = await getDocs(q);
      const fetchedPosts = snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any)
      })) as any[];

      if (fetchedPosts.length > 0) {
        setPosts(prev => [...prev, ...fetchedPosts]);
        setHasMore(fetchedPosts.length === 15);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more blog posts:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Categories Tab Bar */}
      <div className="w-full flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar justify-start lg:justify-center flex-nowrap lg:flex-wrap px-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 whitespace-nowrap",
              activeCategory === cat.id
                ? "bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-lg shadow-primary/20 scale-105"
                : "bg-card/40 backdrop-blur-md border-primary/10 hover:border-accent/40 text-muted-foreground hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <section className="mb-24 min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-accent" />
            <p className="text-muted-foreground text-sm font-medium">Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, index) => (
                <Card key={post.id} className="flex flex-col overflow-hidden group bg-card/40 backdrop-blur-md border-primary/10 hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-accent/90 backdrop-blur-sm text-white border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                        {CATEGORIES.find(c => c.id === post.category)?.label || post.category}
                      </Badge>
                      {post.isFeatured && (
                        <Badge className="bg-primary/90 backdrop-blur-sm text-white border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-accent" /> {formatPostDate(post.publishedDate)}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3 text-accent" /> {post.author || "Deepak Dhakad"}</span>
                    </div>
                    <CardTitle className="font-headline text-2xl leading-tight group-hover:text-primary transition-colors cursor-pointer capitalize">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-6 border-t border-primary/5">
                    <Button asChild variant="link" className="p-0 text-accent group-hover:gap-3 transition-all">
                      <Link href={`/blog/${post.slug}`} className="flex items-center font-bold uppercase tracking-wider text-xs">
                        Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-16 animate-in fade-in zoom-in-95 duration-500">
                <Button
                  onClick={loadMorePosts}
                  disabled={isLoadingMore}
                  className="px-8 py-6 rounded-full font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 hover:border-accent/40 text-foreground hover:text-primary transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:scale-105"
                >
                  {isLoadingMore ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-accent" /> Loading...
                    </span>
                  ) : (
                    "More Blogs"
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-card/20 backdrop-blur-sm rounded-2xl border border-primary/5">
            <h3 className="text-2xl font-headline text-primary mb-4">No insights found.</h3>
            <p className="text-muted-foreground">Try selecting a different category or check back later.</p>
          </div>
        )}
      </section>
    </>
  );
}
