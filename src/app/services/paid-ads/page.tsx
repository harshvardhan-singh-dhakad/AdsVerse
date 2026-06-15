import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Megaphone, CheckCircle, ArrowLeft, Bot, TrendingUp, Route } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Google Ads & Meta Ads Agency in Indore | Performance Marketing | AdsVerse",
  description: "AdsVerse manages high-ROI Google Ads and Meta Ads campaigns for Indore businesses. Transparent reporting, no minimum ad spend lock-in. Average 3.8x ROAS.",
  alternates: {
    canonical: 'https://adsverse.in/services/paid-ads',
  },
};

const service = {
  id: 'paid-ads',
  icon: <Megaphone className="w-12 h-12 text-accent" />,
  title: 'Meta & Google Ads',
  description: [
    {
      heading: "Harnessing the Power of Paid Advertising",
      text: "In today's crowded digital marketplace, paid advertising on platforms like Meta (Facebook & Instagram) and Google is the fastest way to connect with your target audience. While organic growth is essential, paid ads provide immediate visibility, laser-targeted reach, and measurable results. Google Ads captures customers at their moment of intent—when they are actively searching for your products or services. Meta Ads allows you to build awareness and generate demand by reaching people based on their interests, demographics, and online behavior. A successful digital strategy leverages the unique strengths of both. At AdsVerse, we specialize in creating data-driven ad campaigns that are not just about clicks and impressions; they're about driving meaningful business outcomes. We transform your advertising spend from an expense into a strategic investment that delivers a significant return (ROI)."
    },
    {
      heading: "Our Strategic Approach to Ad Management",
      text: "Our process is built on a foundation of strategy, precision, and continuous optimization. We start by developing a deep understanding of your business objectives and target audience. For Google Ads, this involves extensive keyword research to identify high-intent search terms. For Meta Ads, we create detailed audience personas to build highly targeted custom and lookalike audiences. The next phase is creating compelling ad creative and copy that stops the scroll and inspires action. We A/B test different headlines, images, videos, and calls-to-action to identify what resonates most with your audience. A crucial, often-overlooked element is the landing page. We ensure your landing pages are fully optimized for conversions, providing a seamless experience from ad click to conversion. Campaign launch is just the beginning. We continuously monitor performance, analyzing key metrics like click-through rate (CTR), cost per acquisition (CPA), and return on ad spend (ROAS). This data allows us to make real-time adjustments, reallocating budget to top-performing ads and refining our targeting for maximum efficiency."
    },
    {
      heading: "Maximizing Your Return on Investment",
      text: "Our Meta & Google Ads management service is a comprehensive solution designed to maximize your ROI. We handle every aspect of your campaigns, from initial strategy and setup to ongoing management and detailed reporting. Our package includes audience research, keyword strategy, ad copywriting and design, landing page recommendations, and conversion tracking setup (like the Meta Pixel and Google conversion tags). You receive regular, transparent performance reports that clearly explain what we're doing, why we're doing it, and the results we're achieving. We demystify the complexity of paid advertising, providing you with clear insights and a direct line of sight to your campaign's performance. By partnering with AdsVerse, you're not just buying ads; you're investing in a strategic growth engine. We focus relentlessly on the metrics that matter most to your bottom line, ensuring every rupee of your ad budget works as hard as possible to grow your business."
    },
  ],
  pricing: {
    title: "Ads Management",
    price: "From ₹9,000",
    frequency: "/mo + ad spend",
    features: [
      "Google & Meta Campaign Setup",
      "Audience & Keyword Targeting",
      "Ongoing Optimization & A/B Testing",
      "Monthly Performance Reports",
    ],
  }
};

const expandedFaqs = [
  {
    question: "What is the minimum ad budget required?",
    answer: "For Google Search Ads, we recommend a minimum of ₹15,000/month ad spend for Indore-local targeting to get statistically meaningful data. For Meta Ads, ₹10,000/month is workable for local campaigns. AdsVerse's management fee is separate from ad spend."
  },
  {
    question: "Do I pay Google/Meta directly or through AdsVerse?",
    answer: "You always pay Google and Meta directly from your own ad account. AdsVerse never handles your ad spend money — we only charge a management fee for running and optimizing the campaigns."
  },
  {
    question: "How long does it take to see results from paid ads?",
    answer: "Google Search Ads can show lead results within the first week for high-intent keywords. Meta Ads typically take 2-4 weeks for the algorithm to optimize. We consider the first month a learning phase and do not judge campaign performance on week-one numbers alone."
  },
  {
    question: "Can you run ads for a business with a small budget?",
    answer: "Yes, but with realistic expectations. ₹8,000-10,000/month ad spend is workable for very localized or niche campaigns. We will tell you upfront if your budget is too small to compete in your specific market — we do not take budgets we cannot make profitable."
  },
  {
    question: "Do you manage LinkedIn Ads too?",
    answer: "Yes. LinkedIn Ads are part of our paid ads services, particularly for B2B businesses targeting professionals. LinkedIn CPC is higher than Google/Meta but the lead quality for B2B is significantly better. Ask about our LinkedIn Ads packages during your free consultation."
  },
  {
    question: "What reporting do we get?",
    answer: "Weekly automated performance reports showing impressions, clicks, CTR, CPC, conversions, cost-per-lead, and ROAS — delivered to email or WhatsApp. Monthly strategy review calls included."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "Paid Advertising",
      "name": "Meta & Google Ads Management Services",
      "description": "Drive targeted traffic and maximize ROI with strategic ad campaigns on Meta (Facebook & Instagram) and Google, managed by AdsVerse.",
      "provider": {
        "@type": "Organization",
        "name": "AdsVerse",
        "url": "https://adsverse.in"
      },
      "areaServed": {
        "@type": "City",
        "name": "Indore"
      },
      "offers": {
        "@type": "Offer",
        "name": service.pricing.title,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": service.pricing.price.replace(/[^0-9.]/g, ''),
          "priceCurrency": "INR",
          "valueAddedTaxIncluded": false
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://adsverse.in/our-services" },
        { "@type": "ListItem", "position": 3, "name": "Meta & Google Ads", "item": "https://adsverse.in/services/paid-ads" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": expandedFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ]
};

export default function PaidAdsPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4 max-w-5xl">
      <div className="mb-8">
        <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary">
          <Link href="/our-services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">{service.title}</h1>
        </CardHeader>
        <CardContent className="px-6 md:px-12 py-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6">
              {service.description.slice(0, 2).map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-semibold text-primary font-headline">{section.heading}</h2>
                  <p className="text-muted-foreground">{section.text}</p>
                </div>
              ))}
            </div>
            <Card className="bg-background/50 sticky top-24">
              <CardHeader>
                <CardTitle className="text-accent text-2xl font-headline">{service.pricing.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-extrabold mb-4">{service.pricing.price} <span className="text-lg font-normal text-muted-foreground">{service.pricing.frequency}</span></p>
                <ul className="space-y-3">
                  {service.pricing.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-accent hover:bg-accent/90">
                  <Link href="/contact">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6 pt-8 border-t border-border">
            {service.description.slice(2).map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-semibold text-primary font-headline">{section.heading}</h2>
                <p className="text-muted-foreground">{section.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── EXPANDED CONTENT AREA ── */}
      <div className="mt-16 space-y-16">
        
        {/* Block 1: What is Performance Marketing... */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-primary font-headline">What is Performance Marketing in 2026?</h2>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              Performance marketing is digital advertising where you pay only for measurable outcomes — clicks, leads, or conversions. In 2026, the Indian digital ad market has crossed ₹50,000 crore, and platforms like Google Ads and Meta Ads have become the primary customer acquisition channel for SMBs across Indore, Bhopal, and Tier-2 India.
            </p>
            <p>
              The problem is not whether paid ads work — they do. The problem is most businesses are burning 30-60% of their ad budget on poorly structured campaigns: wrong bidding strategies, untested creatives, zero audience segmentation, and no attribution tracking. AdsVerse fixes all of this.
            </p>
          </div>
        </section>

        {/* Block 2: What AdsVerse Does Differently */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">What AdsVerse Does Differently</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Full-funnel campaign architecture", text: "Awareness → Consideration → Conversion campaigns running simultaneously, not just bottom-funnel lead gen ads." },
              { title: "Creative testing at scale", text: "We A/B test headlines, hooks, visuals, and CTAs systematically — not randomly. Every rupee teaches us something." },
              { title: "AI bidding strategies", text: "Smart Bidding, Target ROAS, Performance Max — we use Google's machine learning correctly, which most agencies misuse." },
              { title: "WhatsApp lead integration", text: "Meta Ads connected directly to WhatsApp business flows via automation. Leads get an instant reply the moment they click — no 24-hour delay." },
              { title: "Transparent spend reporting", text: "You see every rupee spent, every click, every lead source — weekly automated report via dashboard or WhatsApp." },
              { title: "No long-term lock-in", text: "Month-to-month contracts. If results are not coming, you should have the freedom to leave — we earn your business every month." }
            ].map((item, i) => (
              <Card key={i} className="bg-card/30 border border-border/40 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Block 3: Our Paid Ads Process */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Our Paid Ads Process</h2>
          <div className="space-y-4">
            {[
              { step: "Step 1", title: "Account Audit (Week 1)", desc: "If you have existing campaigns, we audit them for wasted spend, quality score issues, audience overlap, and conversion tracking gaps." },
              { step: "Step 2", title: "Strategy & Structure (Week 1-2)", desc: "Campaign hierarchy design — Search, Display, Performance Max, Retargeting. Keyword negative lists, match type strategy, audience building." },
              { step: "Step 3", title: "Creative Development (Week 2)", desc: "Ad copy, creative briefs for static/video ads, landing page recommendations, and WhatsApp integration setup." },
              { step: "Step 4", title: "Launch & Optimization (Week 2-4)", desc: "Campaigns live. Daily monitoring for first 2 weeks. Bid adjustments, search term pruning, audience refinement." },
              { step: "Step 5", title: "Scale (Month 2+)", desc: "Once ROAS is stable, we scale the winning campaigns. Introduce new ad formats, new audiences, seasonal pushes." }
            ].map((p, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/30 bg-card/10">
                <div className="h-8 w-16 bg-accent/10 border border-accent/20 rounded flex items-center justify-center text-xs font-bold text-accent shrink-0">
                  {p.step}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base mb-1">{p.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Block 4: Who Is This For? */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Who Is This For?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { type: "Local Retailers & Service Brands", desc: "Local Indore businesses wanting immediate foot traffic, walk-ins, or phone call leads from Google/Meta." },
              { type: "E-Commerce Stores", desc: "E-commerce brands running Shopify or WooCommerce stores wanting purchase sales at profitable CPA." },
              { type: "Coaches & Education Providers", desc: "Coaches, consultants, and education businesses wanting webinar registrations, class leads, or course sales." },
              { type: "High-Value Services (Real Estate, Healthcare, Law)", desc: "Real estate developers, clinics, and legal firms wanting high-intent phone call leads and qualified forms." }
            ].map((w, i) => (
              <div key={i} className="p-5 rounded-xl border border-border/30 bg-card/20">
                <h4 className="font-bold text-accent mb-2">{w.type}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Block 5: FAQ Accordion */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {expandedFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/30 rounded-lg px-4 bg-card/20" role="region">
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

        {/* Related Services Cross-Links */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-primary font-headline">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/services/geo-optimization" className="p-5 rounded-xl border border-border/30 bg-card/20 hover:border-primary/40 transition-colors group">
              <Bot className="w-6 h-6 text-accent mb-2" />
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">GEO Optimization</h4>
              <p className="text-muted-foreground text-sm">Get your business cited by ChatGPT and Gemini — the AI search layer your paid ads can’t reach.</p>
            </Link>
            <Link href="/services/seo-optimization" className="p-5 rounded-xl border border-border/30 bg-card/20 hover:border-primary/40 transition-colors group">
              <TrendingUp className="w-6 h-6 text-accent mb-2" />
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">SEO Optimization</h4>
              <p className="text-muted-foreground text-sm">Organic rankings that compound over time — the long-term complement to paid ads.</p>
            </Link>
            <Link href="/services/lead-generation" className="p-5 rounded-xl border border-border/30 bg-card/20 hover:border-primary/40 transition-colors group">
              <Route className="w-6 h-6 text-accent mb-2" />
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">Sales Funnels & Lead Gen</h4>
              <p className="text-muted-foreground text-sm">Convert your ad traffic into qualified leads with high-converting landing pages and CRM automation.</p>
            </Link>
          </div>
        </section>

      </div>
    </div>
    </>
  );
}
