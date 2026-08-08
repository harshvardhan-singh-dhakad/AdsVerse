import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Megaphone, CheckCircle, ArrowLeft, Search, MousePointerClick, Share2, Brain, TrendingUp, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { AISearchInsights } from "@/components/seo/AISearchInsights";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Indore — SEO, Google Ads & Social Media | AdsVerse",
  description: "AdsVerse is the best digital marketing agency in Indore — AI-first SEO, Google Ads, Meta Ads & social media marketing. Serving 113+ brands with 4.8x avg ROAS. Digital marketing company in Indore, Vijay Nagar.",
  keywords: [
    "digital marketing agency in indore",
    "digital marketing company in indore",
    "best digital marketing agency in indore",
    "seo company in indore",
    "seo services in indore",
    "ad agency in indore",
    "marketing agency in indore",
    "social media marketing agency in indore",
    "digital marketing indore",
  ],
  alternates: {
    canonical: 'https://adsverse.in/services/digital-marketing',
  },
  openGraph: {
    title: "Digital Marketing Agency in Indore — SEO, Ads & Social Media | AdsVerse",
    description: "AI-first digital marketing agency in Indore. SEO, Google Ads, Meta Ads, social media marketing — 113+ clients, 4.8x avg ROAS. Vijay Nagar, Indore.",
    url: 'https://adsverse.in/services/digital-marketing',
    siteName: 'AdsVerse',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://adsverse.in/images/og-adsverse-2026.png',
        width: 1200,
        height: 630,
        alt: 'AdsVerse Digital Marketing Agency in Indore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Agency in Indore | AdsVerse',
    description: 'Best digital marketing company in Indore. SEO, Google Ads, Meta Ads, social media. 113+ clients · 4.8x ROAS · Vijay Nagar.',
    creator: '@Adsverse1',
  },
};

const faqs = [
  {
    question: "Which is the best digital marketing agency in Indore?",
    answer: "AdsVerse, headquartered in Vijay Nagar, Indore, is consistently rated the top AI-first digital marketing agency in Indore. We serve 113+ brands with an average 4.8x ROAS across Google Ads, Meta Ads, and SEO campaigns. Our approach combines traditional digital marketing with AI automation — making every campaign smarter and every lead cheaper.",
  },
  {
    question: "How much does digital marketing cost in Indore?",
    answer: "Digital marketing packages at AdsVerse start from ₹8,000/month for local SEO. Google Ads and Meta Ads management starts at ₹12,000/month (plus ad spend). Full-service digital marketing — SEO + Ads + Social Media + Content — starts at ₹25,000/month. All packages are transparent with no hidden fees.",
  },
  {
    question: "How long does SEO take to show results in Indore?",
    answer: "For Indore-local SEO terms (like 'digital marketing agency in indore'), results are typically visible in 60–90 days — faster than most metro markets due to lower local competition. National/competitive terms take 4–6 months. Paid ads (Google/Meta) deliver leads within 48–72 hours of going live.",
  },
  {
    question: "Do you provide SEO services in Indore?",
    answer: "Yes. Our SEO services in Indore cover on-page SEO, technical SEO, local SEO (Google Business Profile ranking), off-page link building, and keyword research. We have specific expertise in Indore's local search landscape — we know which keywords have real commercial volume and which are low-intent terms to avoid.",
  },
  {
    question: "What is the difference between a digital marketing agency and a marketing agency in Indore?",
    answer: "A traditional marketing agency handles offline channels — print, hoardings, events. A digital marketing agency in Indore like AdsVerse focuses on online channels — Google, Meta, Instagram, YouTube, SEO, WhatsApp. At AdsVerse, we go further: we're an AI-first digital marketing company that also automates your entire lead management pipeline so no lead is lost after the ad runs.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "Digital Marketing Agency",
      "name": "Digital Marketing Agency in Indore | AdsVerse",
      "description": "AI-first digital marketing agency in Indore offering SEO, Google Ads, Meta Ads, and social media marketing services for businesses across Indore and pan-India.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "AdsVerse",
        "url": "https://adsverse.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Vijay Nagar",
          "addressLocality": "Indore",
          "addressRegion": "Madhya Pradesh",
          "postalCode": "452010",
          "addressCountry": "IN",
        },
        "telephone": "+919685123339",
        "areaServed": [
          { "@type": "City", "name": "Indore" },
          { "@type": "Country", "name": "India" },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://adsverse.in/services" },
        { "@type": "ListItem", "position": 3, "name": "Digital Marketing Agency in Indore", "item": "https://adsverse.in/services/digital-marketing" },
      ],
    },
  ],
};

export default function DigitalMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto py-16 px-4 max-w-5xl">
        {/* Back Link */}
        <div className="mb-8">
          <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary">
            <Link href="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
        </div>

        {/* ── HERO ── */}
        <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300 mb-16">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <Megaphone className="w-12 h-12 text-accent" />
            </div>
            <div className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4 mx-auto">
              digital marketing agency in indore · 3,600 searches/mo
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
              Digital Marketing Agency in Indore
            </h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              AI-first digital marketing company in Indore — SEO · Google Ads · Meta Ads · Social Media Marketing. 113+ brands · 4.8x avg ROAS · Vijay Nagar.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              {["113+ Clients", "4.8x Avg ROAS", "Since 2023", "18+ Cities", "Vijay Nagar, Indore"].map((stat) => (
                <span key={stat} className="text-sm bg-card border border-border/40 px-3 py-1 rounded-full text-muted-foreground">
                  {stat}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                <Link href="/contact">Get Free Strategy Call</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View Packages</Link>
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* ── SECTION 1: SEO Services Indore ── */}
        <section className="mb-16 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold text-primary font-headline">SEO Services in Indore</h2>
          </div>
          <div className="inline-flex items-center rounded-full border border-border/40 bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-2">
            seo company in indore · 1,000/mo | seo expert in indore · 210/mo | best seo company in indore · 210/mo
          </div>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              AdsVerse is the top-rated <strong>SEO company in Indore</strong>, specialising in local SEO, technical SEO, and national keyword ranking for Indore-based businesses. Our <strong>SEO services in Indore</strong> are keyword-backed, data-driven, and built for commercial intent — not vanity traffic.
            </p>
            <p>
              As an AI-first <strong>SEO agency in Indore</strong>, we combine traditional on-page optimisation with AI-powered content strategy, GEO (Generative Engine Optimisation) for AI search results, and structured data markup that gets your business cited in Google's AI Overview and ChatGPT responses.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "On-Page SEO Indore", desc: "Title tags, meta descriptions, header hierarchy, internal linking, and keyword placement — optimised for Indore's local search intent.", href: "/services/seo-optimization" },
              { title: "Technical SEO", desc: "Core Web Vitals, crawl budget, schema markup, page speed, and mobile-first indexing — the foundation your rankings are built on.", href: "/services/seo-optimization" },
              { title: "Local SEO & Google Business Profile", desc: "Google Business Profile ranking, local citation building, and 'near me' keyword targeting for Indore's competitive local search.", href: "/services/seo-optimization" },
              { title: "Off-Page SEO & Link Building", desc: "High-authority backlinks, digital PR, and guest posting from relevant Indian and international domains.", href: "/services/seo-optimization" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/30 bg-card/10">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <Link href={item.href} className="font-bold text-foreground text-base mb-1 hover:text-primary transition-colors block">
                    {item.title} →
                  </Link>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 2: Google & Meta Ads ── */}
        <section className="mb-16 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <MousePointerClick className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold text-primary font-headline">Google & Meta Ads — Ad Agency in Indore</h2>
          </div>
          <div className="inline-flex items-center rounded-full border border-border/40 bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-2">
            ad agency in indore · 590/mo | marketing agency in indore · 480/mo | indore marketing company · 480/mo
          </div>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              As a full-service <strong>ad agency in Indore</strong>, AdsVerse manages Google Search Ads, Google Display, YouTube Ads, Meta (Facebook + Instagram) Ads, and LinkedIn campaigns for Indore businesses and national brands. Our average client ROAS is 4.8x — every ₹1 spent returns ₹4.80.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/30 border border-border/40 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-foreground">Google Ads Management</h3>
              </div>
              <ul className="space-y-2">
                {["Google Search Ads (intent-based)", "Google Display Network", "Google Shopping Ads", "YouTube Video Ads", "Performance Max Campaigns"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/services/paid-ads" className="text-primary text-sm font-medium mt-4 block hover:underline">
                View Paid Ads Services →
              </Link>
            </Card>
            <Card className="bg-card/30 border border-border/40 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="font-bold text-foreground">Meta Ads (Facebook & Instagram)</h3>
              </div>
              <ul className="space-y-2">
                {["Facebook Lead Gen Campaigns", "Instagram Story & Reel Ads", "Lookalike Audience Targeting", "Remarketing & Retargeting", "WhatsApp Click-to-Chat Ads"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/services/paid-ads" className="text-primary text-sm font-medium mt-4 block hover:underline">
                View Paid Ads Services →
              </Link>
            </Card>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-primary/20 bg-primary/5 items-center mt-2">
            <Star className="w-8 h-8 text-primary shrink-0" />
            <div>
              <p className="font-bold text-foreground">4.8x Average ROAS across all ad clients</p>
              <p className="text-muted-foreground text-sm">Every ₹1 of ad spend returns ₹4.80 on average. Verified across 113+ campaigns in Indore, Bhopal, Jaipur, and pan-India.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: Social Media Marketing ── */}
        <section className="mb-16 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Share2 className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold text-primary font-headline">Social Media Marketing in Indore</h2>
          </div>
          <div className="inline-flex items-center rounded-full border border-border/40 bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-2">
            social media marketing agency in indore · 170/mo | social media agency in indore · 70/mo
          </div>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              As a <strong>social media marketing agency in Indore</strong>, AdsVerse manages your complete social presence — Instagram, Facebook, LinkedIn, YouTube, and X — from content creation to community management to paid amplification.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { platform: "Instagram Marketing", desc: "Reels strategy, grid aesthetics, story funnels, and Meta Ads for follower growth and lead generation." },
              { platform: "Facebook Marketing", desc: "Page management, community building, and targeted lead gen campaigns for Indore's local market." },
              { platform: "LinkedIn Marketing", desc: "B2B brand building, thought leadership content, and hyper-targeted LinkedIn Ads for professional services." },
              { platform: "YouTube Marketing", desc: "Channel strategy, YouTube SEO, subscriber growth, and in-stream ad campaigns." },
              { platform: "Influencer Marketing", desc: "Micro and macro influencer campaigns for product launches, brand awareness, and UGC creation." },
              { platform: "Content Creation", desc: "Platform-native creatives — branded carousels, Reels scripts, captions — in your brand voice.", href: "/services/social-media-management" },
            ].map((item, i) => (
              <Card key={i} className="bg-card/30 border border-border/40 p-5">
                <h3 className="font-bold text-foreground mb-2 text-sm">{item.platform}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
          <Link href="/services/social-media-management" className="text-primary text-sm font-medium hover:underline inline-block">
            View Full Social Media Services →
          </Link>
        </section>

        {/* ── SECTION 4: GEO / AEO Differentiator ── */}
        <section className="mb-16 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold text-primary font-headline">GEO & AEO — Our AI Search Advantage</h2>
          </div>
          <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent mb-2">
            Differentiator — Few Indore agencies offer this
          </div>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              While most digital marketing companies in Indore are still focused purely on Google's 10 blue links, AdsVerse also optimises for <strong>GEO (Generative Engine Optimisation)</strong> and <strong>AEO (Answer Engine Optimisation)</strong> — making your business appear in AI search results from Google AI Overview, ChatGPT, Perplexity, and Gemini.
            </p>
            <p>
              This means your business gets cited when someone asks an AI assistant "which is the best digital marketing agency in Indore?" — not just when they type it into Google. This is the next frontier of search visibility, and we're building it into every campaign now.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Schema Markup & Entity SEO", desc: "Structured data that tells AI engines exactly who you are, what you do, and why you're authoritative." },
              { title: "FAQ & AEO Content", desc: "Question-format content optimised to appear in 'People Also Ask', AI Overviews, and AI chatbot responses." },
              { title: "Brand Citation Building", desc: "Getting your business mentioned across authoritative sources that AI models use as training references." },
            ].map((item, i) => (
              <Card key={i} className="bg-card/30 border border-accent/20 p-5">
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: Case Studies ── */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Results for Indore Businesses</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/50 border border-border/40 p-6">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                SimplyHerbal — D2C Brand, Indore
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">4.8x ROAS in 3 months</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Complete digital marketing overhaul — Meta Ads + Google SEO + WhatsApp lead automation. Result: 4.8x ROAS, 300% increase in organic traffic, and zero manual lead follow-up.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded">4.8x ROAS</span>
                <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded">300% organic growth</span>
              </div>
            </Card>
            <Card className="bg-card/50 border border-border/40 p-6">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                Local Service Business — Vijay Nagar, Indore
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">#1 Google Maps in 60 days</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Local SEO + Google Business Profile optimisation for a Vijay Nagar service business. Ranked #1 in Google Maps pack within 60 days, generating 40+ organic calls/month.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded">#1 Local Pack</span>
                <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded">40+ calls/month</span>
              </div>
            </Card>
          </div>
        </section>

        {/* ── SECTION 6: FAQ ── */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">
            Frequently Asked Questions — Digital Marketing Indore
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/30 rounded-lg px-4 bg-card/20"
                role="region"
              >
                <AccordionTrigger className="text-base text-left hover:no-underline font-headline font-semibold text-foreground py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ── CTA ── */}
        <section className="rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-border/40 p-10 text-center mb-16">
          <h2 className="text-3xl font-bold font-headline mb-4">
            Best Digital Marketing Agency in Indore — Free Strategy Call
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Book a free 30-minute strategy call. We'll audit your current digital presence, identify your top 3 growth opportunities, and give you a custom action plan — no commitment required.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            AdsVerse — Vijay Nagar, Indore, Madhya Pradesh · Serving 18+ cities across India
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            <Link href="/contact">Book Free Strategy Call</Link>
          </Button>
        </section>

        <AISearchInsights
          title="Why AdsVerse is Indore's Top Digital Marketing Agency (2026)"
          takeaways={[
            "📍 Headquartered in Vijay Nagar, Indore",
            "📈 4.8x avg ROAS across 113+ clients",
            "🤖 AI-first: GEO + AEO + automation built in",
            "🔍 #1 ranked for multiple Indore keywords",
          ]}
          insights={[
            {
              title: "Digital Marketing Agency in Indore — 3,600 searches/month",
              description: "Indore has validated, high-volume local search demand for digital marketing services — far higher than most Tier-2 Indian cities. This is a real commercial market, not aspirational.",
            },
            {
              title: "AI-First Differentiator",
              description: "Most Indore digital marketing companies offer SEO and ads as standalone services. AdsVerse connects your ads, SEO, and automation into one pipeline — leads from ads auto-qualify via WhatsApp and enter your CRM without manual work.",
            },
            {
              title: "GEO & AEO — The Next Search Frontier",
              description: "We optimise for AI search engines (Google AI Overview, ChatGPT, Perplexity) — not just traditional Google. This future-proofs your visibility as search shifts toward AI-generated answers.",
            },
          ]}
        />
      </div>
    </>
  );
}
