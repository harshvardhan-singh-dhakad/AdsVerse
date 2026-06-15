import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Bot, CheckCircle, ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "GEO Services — Generative Engine Optimization in Indore | AdsVerse",
  description: "AdsVerse offers Generative Engine Optimization (GEO) services in Indore. Get your business cited by ChatGPT, Gemini, Perplexity, and Claude. AI search visibility for Indian businesses.",
  alternates: {
    canonical: 'https://adsverse.in/services/geo-optimization',
  },
};

const faqs = [
  {
    question: "What is Generative Engine Optimization (GEO)?",
    answer: "Generative Engine Optimization (GEO) is the practice of structuring your brand's digital content, authority signals, and web presence so that AI-powered search engines — including ChatGPT, Google Gemini, Claude, and Perplexity — cite your business as a reliable source in their generated answers. Unlike traditional SEO which targets blue-link rankings, GEO targets the AI answer layer that now appears above those links."
  },
  {
    question: "How is GEO different from SEO?",
    answer: "Traditional SEO helps you rank in Google's organic link results. GEO helps you get cited inside AI-generated answers. A business can rank #1 on Google and still be invisible in AI search if its content is not structured for machine reading, entity recognition, or citation-worthiness. Both matter — but GEO is the emerging differentiator for 2025 and beyond."
  },
  {
    question: "Which AI platforms does GEO target?",
    answer: "Our GEO work targets Google AI Overviews (the most critical), ChatGPT Browse, Perplexity AI, Claude (Anthropic), Microsoft Copilot, and Google Gemini. Each platform has different crawling behavior and citation criteria — we optimize for all of them through a combination of structured content, entity building, and authority signals."
  },
  {
    question: "How long does GEO take to show results?",
    answer: "GEO results can appear faster than traditional SEO. Well-structured, authoritative content can begin appearing in AI Overviews within 4–8 weeks. Full brand authority establishment across AI platforms typically takes 3–6 months of consistent GEO content work and citation building."
  },
  {
    question: "Does GEO work for local businesses in Indore?",
    answer: "Absolutely. Local GEO is highly effective. When someone asks ChatGPT or Google Gemini 'which is the best digital marketing agency in Indore?' — businesses with strong GEO signals are the ones cited. This is a growing opportunity because most local businesses have not yet invested in GEO, making early movers highly advantaged."
  },
  {
    question: "Can I do GEO without changing my website?",
    answer: "Partially. Some GEO work is off-site — citation building, entity mentions, PR. But the most impactful GEO signals come from on-site content structure: direct-answer paragraphs, structured data markup, entity-rich writing, and FAQ architecture. A combination of both is required for strong results."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "Generative Engine Optimization",
      "name": "GEO Services — Generative Engine Optimization",
      "description": "AdsVerse helps businesses in Indore and across India get cited by AI search engines including ChatGPT, Google Gemini, Claude, and Perplexity through Generative Engine Optimization (GEO).",
      "provider": {
        "@type": "Organization",
        "name": "AdsVerse",
        "url": "https://adsverse.in"
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "offers": {
        "@type": "Offer",
        "name": "GEO Strategy Package",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "18000",
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
        { "@type": "ListItem", "position": 3, "name": "GEO Optimization", "item": "https://adsverse.in/services/geo-optimization" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
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

export default function GeoOptimizationPage() {
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
          <div className="flex justify-center mb-6">
            <Bot className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">GEO Optimization</h1>
          <p className="text-muted-foreground text-lg mt-2">Generative Engine Optimization — Be Cited by AI</p>
        </CardHeader>
        <CardContent className="px-6 md:px-12 py-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-primary font-headline">What is Generative Engine Optimization?</h2>
                <p className="text-muted-foreground">Generative Engine Optimization (GEO) is the practice of structuring your brand's digital presence so that AI-powered search platforms — including ChatGPT, Google Gemini, Claude, Perplexity, and Microsoft Copilot — cite your business as an authoritative source in their generated answers. When a user asks an AI assistant "which is the best SEO agency in Indore?" or "what is the top digital marketing company in Madhya Pradesh?", GEO is what determines whether your business appears in that answer. Traditional SEO gets you into the blue links below the AI answer. GEO gets you into the answer itself.</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-primary font-headline">Why GEO Matters in 2025–2026</h2>
                <p className="text-muted-foreground">Google AI Overviews now appear on over 70% of search queries in India. ChatGPT has over 200 million weekly active users. Perplexity is growing at 10x year-over-year. When users get an AI-generated answer, most never scroll to the organic results below. If your business is not in the AI answer, you are invisible to a massive and rapidly growing share of your target audience — even if you rank #1 on Google organically. GEO is not a replacement for SEO. It is the next layer of search visibility that every business must build in addition to traditional SEO.</p>
              </div>
            </div>
            <Card className="bg-background/50 sticky top-24">
              <CardHeader>
                <CardTitle className="text-accent text-2xl font-headline">GEO Strategy Package</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-extrabold mb-4">₹18,000 <span className="text-lg font-normal text-muted-foreground">/mo</span></p>
                <ul className="space-y-3">
                  {[
                    "AI Citation Audit & Baseline Report",
                    "Entity Building & Brand Mention Strategy",
                    "GEO-Optimized Content Creation (4 pieces/mo)",
                    "Structured Data & Schema Markup",
                    "AI Crawler Accessibility Optimization",
                    "Monthly GEO Visibility Report"
                  ].map((feature, i) => (
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
            <div>
              <h2 className="text-2xl font-semibold text-primary font-headline">How AdsVerse Implements GEO</h2>
              <p className="text-muted-foreground">Our GEO methodology is built on the four pillars that AI systems use to select citations: content authority, entity clarity, structural accessibility, and brand validation. We begin with a complete AI citation audit — querying ChatGPT, Gemini, Perplexity, and Claude with your target queries to establish your current GEO baseline. From there, we identify the content gaps and structural deficiencies preventing your brand from appearing. We then implement a systematic GEO content program: direct-answer paragraphs written for machine parsing, FAQ architecture optimized for Featured Snippets and AI Overviews, entity-rich brand descriptions, and structured data markup that helps AI systems understand exactly what your business does, where you operate, and why you are trustworthy.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── EXPANDED CONTENT AREA ── */}
      <div className="mt-16 space-y-16">

        {/* Block 1: The GEO Framework */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">The AdsVerse GEO Framework</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Entity Building", text: "AI systems work on entity graphs. We establish your brand, founder, services, and location as clearly defined entities in your content and across the web — so AI systems can confidently reference you." },
              { title: "Citation-Worthy Content", text: "We write content that AI systems want to cite: direct definitions, data-backed claims, first-person expertise signals, and structured Q&A blocks that answer the exact questions your customers are asking." },
              { title: "Structured Data Markup", text: "Organization, LocalBusiness, Person, Service, FAQ, and HowTo schema markup — implemented correctly so search engines and AI systems can parse your content programmatically." },
              { title: "AI Crawler Access", text: "We configure your robots.txt to explicitly allow GPTBot, Anthropic-ai, PerplexityBot, and Google-Extended. Blocked crawlers cannot cite you — a surprisingly common gap." },
              { title: "Brand Mention Building", text: "Off-site brand mentions on high-authority domains — industry directories, local business listings, media mentions — strengthen the AI systems' confidence in your brand's existence and legitimacy." },
              { title: "Ongoing GEO Monitoring", text: "We query AI platforms monthly with your target searches to track whether your GEO citations are improving, which AI platforms are citing you, and what content is driving those citations." }
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

        {/* Block 2: GEO vs SEO */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">GEO vs SEO — Understanding the Difference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Factor</th>
                  <th className="text-left py-3 px-4 text-primary font-semibold">Traditional SEO</th>
                  <th className="text-left py-3 px-4 text-accent font-semibold">GEO (Generative Engine Optimization)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Target Platform", "Google / Bing blue-link results", "ChatGPT, Gemini, Perplexity, Claude, AI Overviews"],
                  ["Visibility Format", "Ranked links (position 1–10)", "Cited inside AI-generated answer text"],
                  ["Key Success Factor", "Backlinks, keyword density, page speed", "Content authority, entity clarity, structured data"],
                  ["Timeline to Results", "3–12 months", "4–12 weeks for initial citations"],
                  ["User Behavior", "User clicks through to website", "User reads AI answer (may not click through)"],
                  ["Replaces the other?", "No — SEO still critical", "No — GEO is additive, not a replacement"],
                ].map(([factor, seo, geo], i) => (
                  <tr key={i} className="border-b border-border/20">
                    <td className="py-3 px-4 text-muted-foreground font-medium">{factor}</td>
                    <td className="py-3 px-4 text-muted-foreground">{seo}</td>
                    <td className="py-3 px-4 text-muted-foreground">{geo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Block 3: Who needs GEO */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Who Needs GEO Services?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { type: "Service Businesses", desc: "Agencies, consultants, law firms, clinics, and professional services — where reputation and authority determine who gets cited as the best option." },
              { type: "E-Commerce Brands", desc: "Product brands that want to appear in 'best [product category] in India' type AI answers — where purchase decisions increasingly begin." },
              { type: "Local Businesses in Indore & MP", desc: "Any business that wants to be the AI-recommended option when someone asks 'best [service] in Indore' on ChatGPT or Gemini." },
              { type: "Startups Building Brand Authority", desc: "Early-stage companies that want to establish brand entity recognition in AI knowledge graphs before competitors do." }
            ].map((w, i) => (
              <div key={i} className="p-5 rounded-xl border border-border/30 bg-card/20">
                <h4 className="font-bold text-accent mb-2">{w.type}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Block 4: Related Services */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-primary font-headline">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/services/seo-optimization" className="p-5 rounded-xl border border-border/30 bg-card/20 hover:border-primary/40 transition-colors group">
              <TrendingUp className="w-6 h-6 text-accent mb-2" />
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">SEO Optimization</h4>
              <p className="text-muted-foreground text-sm">Traditional search rankings — the foundation that GEO builds on.</p>
            </Link>
            <Link href="/services/content-marketing" className="p-5 rounded-xl border border-border/30 bg-card/20 hover:border-primary/40 transition-colors group">
              <CheckCircle className="w-6 h-6 text-accent mb-2" />
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">Content Marketing</h4>
              <p className="text-muted-foreground text-sm">Authority content that AI systems want to cite as expert sources.</p>
            </Link>
            <Link href="/services/brand-strategy" className="p-5 rounded-xl border border-border/30 bg-card/20 hover:border-primary/40 transition-colors group">
              <Bot className="w-6 h-6 text-accent mb-2" />
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">Brand Strategy</h4>
              <p className="text-muted-foreground text-sm">Entity-first brand positioning that AI knowledge graphs recognise.</p>
            </Link>
          </div>
        </section>

        {/* Block 5: FAQ Accordion */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Frequently Asked Questions about GEO</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, i) => (
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

      </div>
    </div>
    </>
  );
}
