export interface PlainBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  publishedDate: string;
  author: string;
  isFeatured?: boolean;
  allowComments?: boolean;
  whatsappShare?: boolean;
  updatedAt?: string | null;
  tags?: string[];
}

export const FALLBACK_POSTS: PlainBlogPost[] = [
  {
    id: "seo-trends-2026",
    slug: "seo-trends-2026",
    title: "Top SEO & GEO Search Trends for 2026",
    excerpt: "Discover how AI search engines, answer engine optimization, and semantic search are reshaping Google rankings in 2026.",
    imageUrl: "/images/og-adsverse-2026.png",
    category: "seo",
    publishedDate: "2026-01-10",
    updatedAt: "2026-01-10T00:00:00.000Z",
    author: "Deepak Dhakad",
    isFeatured: true,
    allowComments: true,
    whatsappShare: true,
    content: `
      <h2>The Shift From Traditional Keywords to Generative Engine Optimization (GEO)</h2>
      <p>Search engines are no longer just indexing links; they are generating synthesized answers with LLMs like Google Gemini, ChatGPT Search, and Perplexity. In 2026, winning organic traffic requires Generative Engine Optimization (GEO).</p>
      <h2>Answer Engine Optimization (AEO) Best Practices</h2>
      <p>AEO focuses on crafting structured, factual answers that AI algorithms cite as primary sources. Structure your headers with clear questions and follow immediately with a 40-60 word authoritative answer.</p>
      <h2>Entity-Based SEO and Knowledge Graphs</h2>
      <p>Search engines understand brands as interconnected entities. Implement Organization and FAQPage schemas, maintain consistent NAP citations, and build verified social brand signals across the web.</p>
    `,
  },
  {
    id: "meta-ads-scaling-guide",
    slug: "meta-ads-scaling-guide",
    title: "How to Scale Meta Ads to ₹50L+ Revenue",
    excerpt: "Learn the exact ad creative structure, Advantage+ campaign setups, and custom audience strategies we use to scale D2C brands.",
    imageUrl: "/images/og-adsverse-2026.png",
    category: "paid-ads",
    publishedDate: "2026-01-05",
    updatedAt: "2026-01-05T00:00:00.000Z",
    author: "Deepak Dhakad",
    isFeatured: false,
    allowComments: true,
    whatsappShare: true,
    content: `
      <h2>The Advantage+ Blueprint for High-Growth Brands</h2>
      <p>Advantage+ Shopping campaigns continue to dominate Meta advertising. To unlock consistent 3.5x+ ROAS, you must provide Meta's AI algorithm with broad targeting and diverse creative angles.</p>
      <h2>Creative Diversity: The Real Targeting in 2026</h2>
      <p>Gone are the days of hyper-granular interest targeting. Your ad creatives do the targeting. Test UGC reels, problem-solution statics, founders' stories, and comparison carousels systematically.</p>
      <h2>First-Party Data and Conversions API (CAPI)</h2>
      <p>Ensure server-side tracking with Meta Conversions API is configured with maximum event match quality (EMQ > 8.0) to pass high-signal purchase data back to Meta.</p>
    `,
  },
];

/**
 * Ensures any Firestore blog post document is converted into a 100% plain object
 * with zero class instances, Timestamp objects, or non-serializable prototypes.
 */
export function sanitizeBlogPost(docId: string, raw: any): PlainBlogPost {
  let pubDate = '2026-01-01';
  if (raw?.publishedDate) {
    if (typeof raw.publishedDate.toDate === 'function') {
      pubDate = raw.publishedDate.toDate().toISOString();
    } else if (raw.publishedDate instanceof Date) {
      pubDate = raw.publishedDate.toISOString();
    } else {
      pubDate = String(raw.publishedDate);
    }
  }

  let updDate: string | null = null;
  if (raw?.updatedAt) {
    if (typeof raw.updatedAt.toDate === 'function') {
      updDate = raw.updatedAt.toDate().toISOString();
    } else if (raw.updatedAt instanceof Date) {
      updDate = raw.updatedAt.toISOString();
    } else {
      updDate = String(raw.updatedAt);
    }
  }

  const plain: PlainBlogPost = {
    id: docId,
    slug: String(raw?.slug || docId),
    title: String(raw?.title || 'AdsVerse Insight'),
    excerpt: String(raw?.excerpt || ''),
    content: String(raw?.content || ''),
    imageUrl: String(raw?.imageUrl || '/images/og-adsverse-2026.png'),
    category: String(raw?.category || 'general'),
    publishedDate: pubDate,
    updatedAt: updDate || pubDate,
    author: String(raw?.author || 'Deepak Dhakad'),
    isFeatured: Boolean(raw?.isFeatured),
    allowComments: Boolean(raw?.allowComments ?? true),
    whatsappShare: Boolean(raw?.whatsappShare ?? true),
    tags: Array.isArray(raw?.tags) ? raw.tags.map(String) : [],
  };

  // Safe deep copy to remove any possible non-enumerable properties or prototype classes
  return JSON.parse(JSON.stringify(plain));
}
