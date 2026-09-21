'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock3,
  Search,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CATEGORY_LABELS: Record<string, string> = {
  'paid-ads': 'Paid Ads',
  seo: 'SEO',
  'seo-strategy': 'SEO',
  'web-development': 'Web Development',
  'automation-ai': 'Automation & AI',
  'content-marketing': 'Content Marketing',
  'social-media': 'Social Media',
  'whatsapp-marketing': 'WhatsApp Marketing',
  'local-seo': 'Local SEO',
  'case-studies': 'Case Studies',
  tutorials: 'Tutorials',
  'industry-news': 'Industry News',
};

function formatPostDate(date: any) {
  if (!date) return 'N/A';
  try {
    const d = date && typeof date === 'object' && 'toDate' in date
      ? date.toDate()
      : new Date(date);

    if (Number.isNaN(d.getTime())) return 'N/A';

    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'N/A';
  }
}

function estimateReadTime(content: string) {
  const text = (content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text ? text.split(' ').length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

function categoryLabel(category?: string) {
  if (!category) return 'General';
  return CATEGORY_LABELS[category] || category.replace(/[-_]+/g, ' ');
}

interface BlogClientProps {
  initialPosts: any[];
  initialCategory?: string;
}

export default function BlogClient({ initialPosts = [], initialCategory }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'all');
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      const search = params.get('q');
      if (cat) setActiveCategory(cat);
      if (search) setSearchQuery(search);
    } catch {}
  }, []);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    initialPosts.forEach((post) => {
      if (post.category) seen.add(post.category);
    });
    return Array.from(seen).sort((a, b) => categoryLabel(a).localeCompare(categoryLabel(b)));
  }, [initialPosts]);

  const featuredPost = useMemo(() => {
    return initialPosts.find((post) => post.isFeatured) || initialPosts[0] || null;
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return initialPosts.filter((post) => {
      const categoryMatch =
        activeCategory === 'all' ||
        post.category === activeCategory ||
        (activeCategory === 'seo' && post.category === 'seo-strategy');

      if (!categoryMatch) return false;
      if (!query) return true;

      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        ...(post.tags || []),
        post.author,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [initialPosts, activeCategory, searchQuery]);

  const displayedPosts = useMemo(
    () => filteredPosts.slice(0, visibleCount),
    [filteredPosts, visibleCount]
  );

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setVisibleCount(12);
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setVisibleCount(12);
  };

  return (
    <>
      {/* Featured insight */}
      {featuredPost && activeCategory === 'all' && !searchQuery && (
        <section className="mb-14">
          <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-4 w-4" />
            {featuredPost.isFeatured ? "Featured insight" : "Start here"}
          </div>

          <Link
            href={`/blog/${featuredPost.slug || featuredPost.id || ''}`}
            className="group block overflow-hidden rounded-[2rem] border border-primary/10 bg-card/60 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-2xl"
          >
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative aspect-[16/10] min-h-[280px] overflow-hidden bg-muted lg:aspect-auto">
                <Image
                  src={featuredPost.imageUrl || '/images/og-adsverse-2026.png'}
                  alt={featuredPost.title || 'Featured AdsVerse insight'}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <Badge className="border-none bg-accent/95 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                    {categoryLabel(featuredPost.category)}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 md:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-accent" />
                    {formatPostDate(featuredPost.publishedDate)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5 text-accent" />
                    {estimateReadTime(featuredPost.content)} min read
                  </span>
                </div>

                <h2 className="font-headline text-3xl font-black leading-tight tracking-tight md:text-4xl">
                  {featuredPost.title}
                </h2>

                <p className="mt-4 line-clamp-4 text-sm leading-7 text-muted-foreground md:text-base">
                  {featuredPost.excerpt || 'A practical AdsVerse insight for modern digital growth.'}
                </p>

                <div className="mt-7 flex items-center gap-2 text-sm font-black text-primary">
                  Read featured insight
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Discovery controls */}
      <section className="mb-12 rounded-[1.75rem] border border-primary/10 bg-card/35 p-4 shadow-sm backdrop-blur-xl md:p-5">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setVisibleCount(12);
              }}
              placeholder="Search insights, topics, tools or keywords…"
              aria-label="Search AdsVerse blog"
              className="h-12 w-full rounded-xl border border-border/60 bg-background/70 pl-11 pr-12 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear blog search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-bold text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'insight' : 'insights'}
              {activeCategory !== 'all' ? ` in ${categoryLabel(activeCategory)}` : ''}
            </p>
            {(activeCategory !== 'all' || searchQuery) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs font-bold"
              >
                Clear filters
              </Button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:flex-wrap">
            {['all', ...categories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  'whitespace-nowrap rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300',
                  activeCategory === category
                    ? 'border-transparent bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20'
                    : 'border-primary/10 bg-background/50 text-muted-foreground hover:border-accent/40 hover:text-foreground'
                )}
              >
                {category === 'all' ? 'All insights' : categoryLabel(category)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main grid */}
      <section className="mb-24 min-h-[400px]">
        {displayedPosts.length > 0 ? (
          <>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Latest knowledge</p>
                <h2 className="mt-1 font-headline text-2xl font-black tracking-tight md:text-3xl">
                  Explore the library
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {displayedPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="group flex h-full flex-col overflow-hidden border-primary/10 bg-card/45 shadow-sm backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-2xl"
                >
                  <Link
                    href={`/blog/${post.slug || post.id || ''}`}
                    className="block"
                    aria-label={`Read ${post.title || 'blog post'}`}
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                      <Image
                        src={post.imageUrl || '/images/og-adsverse-2026.png'}
                        alt={post.title || 'Blog post'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        <Badge className="border-none bg-black/65 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                          {categoryLabel(post.category)}
                        </Badge>
                        {post.isFeatured && (
                          <Badge className="border-none bg-accent/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>

                  <CardHeader className="space-y-4 p-6">
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-accent" />
                        {formatPostDate(post.publishedDate)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5 text-accent" />
                        {estimateReadTime(post.content)} min read
                      </span>
                      {post.author && (
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-accent" />
                          {post.author}
                        </span>
                      )}
                    </div>

                    <CardTitle className="line-clamp-2 font-headline text-xl font-black leading-tight tracking-tight transition-colors group-hover:text-primary">
                      {post.title || 'Untitled Insight'}
                    </CardTitle>

                    <CardDescription className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {post.excerpt || 'Read the full AdsVerse insight.'}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="mt-auto border-t border-primary/5 px-6 py-5">
                    <Link
                      href={`/blog/${post.slug || post.id || ''}`}
                      className="flex items-center text-xs font-black uppercase tracking-wider text-primary transition-all group-hover:gap-3"
                    >
                      Read article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredPosts.length > visibleCount && (
              <div className="mt-14 flex justify-center">
                <Button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 12)}
                  variant="outline"
                  className="rounded-full border-primary/20 px-8 py-6 text-xs font-black uppercase tracking-wider transition-all hover:border-accent/50 hover:shadow-xl"
                >
                  Load more insights
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-[1.75rem] border border-primary/10 bg-card/30 py-20 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Search className="h-5 w-5" />
            </div>
            <h2 className="font-headline text-2xl font-black">No matching insights</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Try a broader topic, category, or keyword.
            </p>
            <Button type="button" onClick={clearFilters} className="mt-6 rounded-xl">
              Show all insights
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
