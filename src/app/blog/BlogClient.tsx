'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(15);

  // Filter posts in-memory
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') {
      return initialPosts;
    }
    if (activeCategory === 'seo') {
      return initialPosts.filter(
        post => post.category === 'seo' || post.category === 'seo-strategy'
      );
    }
    return initialPosts.filter(post => post.category === activeCategory);
  }, [initialPosts, activeCategory]);

  // Paginated posts to display
  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMore = filteredPosts.length > visibleCount;

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setVisibleCount(15); // Reset pagination on category change
  };

  const loadMorePosts = () => {
    setVisibleCount(prev => prev + 15);
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
        {displayedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {displayedPosts.map((post, index) => (
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
                  className="px-8 py-6 rounded-full font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 hover:border-accent/40 text-foreground hover:text-primary transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:scale-105"
                >
                  More Blogs
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
