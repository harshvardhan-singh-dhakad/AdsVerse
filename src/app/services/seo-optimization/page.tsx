import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TrendingUp, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { AISearchInsights } from "@/components/seo/AISearchInsights";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "SEO Services in Indore | Rank #1 on Google | AdsVerse",
  description: "AdsVerse offers results-driven SEO services in Indore — from technical audits to GEO (Generative Engine Optimization). Rank higher, get found by AI. Free audit available.",
  alternates: {
    canonical: 'https://adsverse.in/services/seo-optimization',
  },
};

const service = {
  id: 'seo-optimization',
  icon: <TrendingUp className="w-12 h-12 text-accent" />,
  title: 'SEO Optimization',
  description: [
     {
      heading: "The Foundation of Digital Visibility",
      text: "Search Engine Optimization (SEO) is the art and science of making your website more visible in organic (non-paid) search engine results. In a world where most online experiences begin with a search engine, SEO is not a luxury—it's a fundamental necessity for sustainable business growth. It's about earning your place at the top of the results page, connecting you with customers who are actively looking for the solutions you provide. Unlike paid ads, which offer immediate but temporary visibility, a strong SEO strategy builds a long-term asset for your business. It enhances your credibility, drives high-quality traffic, and delivers a consistent stream of leads and sales over time. At AdsVerse, we view SEO as a holistic discipline that encompasses technical excellence, high-quality content, and authoritative backlinks. Our goal is to build a powerful online presence for your brand that stands the test of time and ever-changing algorithms."
    },
    {
      heading: "Our Comprehensive SEO Methodology",
      text: "Our SEO services are built on the three pillars of modern optimization: Technical SEO, On-Page SEO, and Off-Page SEO. We begin with a thorough technical audit of your website to ensure it's built on a solid foundation. This includes optimizing site speed, ensuring mobile-friendliness, fixing crawl errors, and implementing structured data. A technically sound website is one that search engines can easily crawl and understand. Next, we focus on On-Page SEO. This involves in-depth keyword research to understand the language of your customers and strategically integrating those keywords into your website's content, title tags, headers, and meta descriptions. We ensure your content is not just keyword-rich, but also valuable, relevant, and structured in a way that provides an excellent user experience. Finally, we build your site's authority through Off-Page SEO. This is primarily focused on earning high-quality backlinks from reputable and relevant websites, a crucial signal that tells search engines your site is a trusted resource. We do this through ethical, white-hat strategies like content marketing, digital PR, and relationship-building."
    },
    {
      heading: "What Our SEO Service Delivers",
      text: "Our SEO Optimization service is a continuous process of improvement designed to achieve and maintain top search rankings. Our monthly package provides a complete solution. It starts with a comprehensive website audit and keyword research strategy. From there, we perform ongoing on-page optimizations, including content creation and updates, as well as technical monitoring to catch and fix any issues that arise. A significant portion of our efforts is dedicated to a strategic link-building campaign to grow your website's domain authority. You'll receive a detailed monthly report that tracks your keyword rankings, organic traffic growth, and key conversion metrics. We believe in complete transparency, so our reports are easy to understand and clearly outline the work performed and its impact on your business goals. Investing in SEO with AdsVerse is investing in the long-term health and visibility of your brand online. We build strategies that deliver not just rankings, but real, measurable business growth."
    },
  ],
   pricing: {
    title: "E-commerce SEO",
    price: "₹15,000",
    frequency: "/mo",
    features: [
      "Comprehensive SEO Audit",
      "Keyword Research & Strategy",
      "On-Page & Technical Optimization",
      "Monthly Link Building & Reporting",
    ],
  }
};

const expandedFaqs = [
  {
    question: "How long does SEO take to show results?",
    answer: "For a new website, expect 3-6 months for meaningful movement. For established sites with existing traffic, 6-8 weeks is realistic for on-page improvements. GEO results (appearing in AI answers) can show faster — 4-8 weeks for well-structured content."
  },
  {
    question: "Do you guarantee Page 1 rankings?",
    answer: "No agency can ethically guarantee specific rankings — Google's algorithm has 200+ factors and changes frequently. What we guarantee is a measurable increase in organic sessions, qualified leads, and keyword visibility within 6 months, backed by monthly reporting."
  },
  {
    question: "What is GEO and is it different from SEO?",
    answer: "GEO stands for Generative Engine Optimization. Traditional SEO gets you ranked in Google's link results. GEO gets your content cited as the answer in Google AI Overviews, ChatGPT, Perplexity, and Gemini. In 2026, roughly 40% of searches in India now show an AI-generated answer before any links — GEO is how you capture that real estate."
  },
  {
    question: "How much do SEO services cost at AdsVerse?",
    answer: "Our SEO plans start at ₹9,600/month for Local SEO and go up to ₹23,000/month for E-commerce SEO. GEO Optimization is ₹18,000/month. Custom packages are available for businesses with specific needs. Visit our pricing page or book a free consultation for an exact quote."
  },
  {
    question: "Do you work with businesses outside Indore?",
    answer: "Yes. While we are headquartered in Vijay Nagar, Indore, we actively work with clients in Bhopal, Jabalpur, Ujjain, Raipur, and pan-India. All work is remote-first."
  },
  {
    question: "Will you change my website or just do SEO on it?",
    answer: "We make on-page changes with your approval — title tags, meta descriptions, schema, internal links. We do not redesign or rebuild pages without a separate web development engagement."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "SEO Optimization",
      "name": "SEO Services in Indore",
      "description": "Improve your search engine rankings and attract organic traffic with AdsVerse's expert SEO services, including technical audits, keyword research, and link building.",
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
        { "@type": "ListItem", "position": 3, "name": "SEO Optimization", "item": "https://adsverse.in/services/seo-optimization" }
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

export default function SeoOptimizationPage() {
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
        
        {/* Block 1: What is SEO... */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-primary font-headline">What is SEO and Why Does It Still Matter in 2026?</h2>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              Search Engine Optimization in 2026 is no longer just about ranking on Google's blue links. With AI Overviews now appearing at the top of 70%+ searches in India, your business needs to be optimized not just for traditional search — but for AI-generated answers as well. This dual approach is what separates businesses that grow organically from those that remain invisible.
            </p>
            <p>
              For Indore businesses — whether you run a CA firm in Vijay Nagar, a clinic in Palasia, or an e-commerce store shipping pan-India — SEO is the highest-ROI digital channel available. Unlike paid ads that stop the moment you stop spending, SEO compounds over time. Every page that ranks is an asset that generates leads 24/7.
            </p>
          </div>
        </section>

        {/* Block 2: Why AdsVerse SEO Is Different */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Why AdsVerse SEO Is Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "AI-first optimization", text: "We optimize for Google AI Overviews, Perplexity, and ChatGPT answers — not just Page 1 rankings. This is called GEO (Generative Engine Optimization) and it is AdsVerse's core differentiator." },
              { title: "Intent mapping", text: "Every keyword is mapped to a buyer stage — awareness, consideration, or decision. We do not waste your budget on keywords that never convert." },
              { title: "India-focused content strategy", text: "We write in clear, natural Indian English that resonates with Tier-2 India audiences — not overly formal British English or Americanized copy." },
              { title: "Technical depth", text: "Core Web Vitals, structured data, crawl budget optimization, internal linking architecture — we handle the full technical layer, not just on-page tags." },
              { title: "n8n-powered reporting", text: "Automated weekly rank tracking reports delivered directly to WhatsApp or email via our automation workflows." },
              { title: "No keyword stuffing", text: "We use semantic clustering, entity-based optimization, and topical authority building — white-hat only, zero risk of penalties." }
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

        {/* Block 3: Our SEO Process */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Our SEO Process</h2>
          <div className="space-y-4">
            {[
              { step: "Step 1", title: "Free Technical Audit (Week 1)", desc: "We crawl your entire site, identify indexing issues, broken links, missing schema, slow pages, and cannibalization problems. You get a prioritized report, not a 100-page PDF nobody reads." },
              { step: "Step 2", title: "Keyword & Intent Research (Week 1-2)", desc: "We map 300-500 keywords to buyer intent stages. Focus on commercial and transactional intent first — these drive leads, not just traffic." },
              { step: "Step 3", title: "On-Page Optimization (Week 2-4)", desc: "Titles, meta descriptions, H-tag hierarchy, internal linking, schema markup, image ALT tags, FAQ markup — everything aligned to your target keywords." },
              { step: "Step 4", title: "Content Development (Month 2+)", desc: "Topical authority blogs, service page expansion, location pages, and FAQ content that targets both traditional search and AI answer engines." },
              { step: "Step 5", title: "Off-Page & Link Building (Month 2+)", desc: "High-authority Indian business directories, guest posts on relevant blogs, digital PR for brand mentions. No spam links, no PBNs." },
              { step: "Step 6", title: "Monthly Reporting", desc: "Rank movement, organic traffic growth, lead attribution, and next-month action plan — delivered via automated dashboard." }
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
              { type: "Local Businesses", desc: "Local businesses in Indore, Bhopal, and Madhya Pradesh wanting to rank for 'near me' and city-level searches." },
              { type: "E-Commerce Brands", desc: "E-commerce brands wanting organic product traffic without depending entirely on paid ads." },
              { type: "B2B Professional Firms", desc: "B2B service firms (CAs, lawyers, consultants, hospitals) wanting to rank for high-intent professional searches." },
              { type: "High-Growth Startups", desc: "Startups with limited ad budgets who need sustainable, compounding organic traffic growth." }
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

      </div>

      <AISearchInsights 
        title="Predictive SEO & AEO Strategy for 2026"
        takeaways={[
          "🔍 AI Answer Optimization",
          "📊 Intent-Based Search",
          "🛡️ EEAT-Focused Authority",
          "📈 Conversion-Driven SEO"
        ]}
        insights={[
          {
            title: "Generative Engine Optimization (GEO)",
            description: "We optimize your content to be cited by AI search engines like Perplexity, ChatGPT, and Gemini."
          },
          {
            title: "Semantic Content Clusters",
            description: "Moving beyond keywords to topic authority, ensuring you dominate entire search categories."
          },
          {
            title: "Core Web Vitals Max",
            description: "LCP and CLS optimization for the best user experience and highest ranking signals."
          }
        ]}
      />
    </div>
    </>
  );
}
