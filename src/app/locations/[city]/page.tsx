import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, TrendingUp, Megaphone, Code, Bot, FileText, Users, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AISearchInsights } from "@/components/seo/AISearchInsights";

const citiesDb: Record<string, { name: string, state: string, desc: string }> = {
  indore: { name: "Indore", state: "Madhya Pradesh", desc: "Our main headquarters in Vijay Nagar. Dominate central India's fastest-growing tech and startup corridor." },
  bhopal: { name: "Bhopal", state: "Madhya Pradesh", desc: "Drive growth for your Bhopal retail brand, industrial center, or service firm with localized AI outreach." },
  jabalpur: { name: "Jabalpur", state: "Madhya Pradesh", desc: "Capture transactional leads and rank #1 locally for high-intent search terms across Jabalpur." },
  gwalior: { name: "Gwalior", state: "Madhya Pradesh", desc: "Build premium digital setups and automate sales pipelines for Gwalior's expanding business base." },
  ujjain: { name: "Ujjain", state: "Madhya Pradesh", desc: "Connect pilgrimage, retail, and regional hospitality services with targeted geographic digital setups." },
  jaipur: { name: "Jaipur", state: "Rajasthan", desc: "Scale Jaipur's premium handicraft, hospitality, D2C, or professional services with high-ROI Meta & Google ads." },
  jodhpur: { name: "Jodhpur", state: "Rajasthan", desc: "Attract luxury travel inquiries and scale service setups with advanced local search and Next.js web designs." },
  udaipur: { name: "Udaipur", state: "Rajasthan", desc: "Position your Udaipur tourist destination, heritage resort, or retail brand in front of high-value seekers." },
  kota: { name: "Kota", desc: "Empower your Kota coaching institute, test prep center, or educational startup with smart WhatsApp bot systems.", state: "Rajasthan" },
  raipur: { name: "Raipur", state: "Chhattisgarh", desc: "Optimize industrial service B2B funnels and retail brand campaigns in Chhattisgarh's capital." },
  bilaspur: { name: "Bilaspur", state: "Chhattisgarh", desc: "Eliminate repetitive customer work and capture local buyers searching for billing, shipping, or retail terms." },
  lucknow: { name: "Lucknow", state: "Uttar Pradesh", desc: "Wow Lucknow buyers with premium web designs, content strategies, and targeted lead generation funnels." },
  kanpur: { name: "Kanpur", state: "Uttar Pradesh", desc: "Upgrade industrial supply chains, regional trade, and retail grids with robust CRM & n8n automations." },
  noida: { name: "Noida", state: "Uttar Pradesh", desc: "Deploy AI-backed search setups and serverless Next.js pages for Noida's fast-moving software startups." },
  patna: { name: "Patna", state: "Bihar", desc: "Drive high-volume leads and construct authoritative, fast-loading digital profiles for Patna companies." },
  srinagar: { name: "Srinagar", state: "Jammu & Kashmir", desc: "Showcase Srinagar's exquisite hospitality, local arts, and retail globally with premium advertising." },
  jammu: { name: "Jammu", state: "Jammu & Kashmir", desc: "Attract local buyers and build modern, mobile-friendly landing pages for Jammu service brands." },
  guwahati: { name: "Guwahati", state: "Northeast India", desc: "Connect Northeast's premium tea brands, travel agencies, and service firms with nationwide buyers." },
};

export async function generateStaticParams() {
  return Object.keys(citiesDb).map((city) => ({ city }));
}

interface PageProps {
  params: {
    city: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityInfo = citiesDb[params.city];
  if (!cityInfo) {
    return {
      title: "Location Services | AdsVerse",
    };
  }
  return {
    title: `Best Digital Marketing Agency in ${cityInfo.name} | SEO & AI Automation | AdsVerse`,
    description: `AdsVerse offers high-ROI SEO, Meta/Google Ads, and WhatsApp Automation in ${cityInfo.name}, ${cityInfo.state}. Average 3.8x ROAS. Grow your local business today.`,
    alternates: {
      canonical: `https://adsverse.in/locations/${params.city}`,
    },
  };
}

export default function CityPage({ params }: PageProps) {
  const cityInfo = citiesDb[params.city];
  
  if (!cityInfo) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold font-headline">Location Not Found</h1>
        <Button asChild className="mt-4 bg-accent">
          <Link href="/locations">Back to Locations</Link>
        </Button>
      </div>
    );
  }

  const { name, state, desc } = cityInfo;

  const localFaqs = [
    {
      question: `Why should our business choose AdsVerse in ${name}?`,
      answer: `AdsVerse is an AI-first agency that combines high-performance Meta/Google Ads, deep Technical SEO, and n8n/WhatsApp workflow automation under one roof. Unlike standard agencies in ${state}, we focus on lowering lead costs (avg. 68% reduction) and delivering measurable, compound ROI.`
    },
    {
      question: `Do you have a local physical office in ${name}, or do you work remotely?`,
      answer: `While our primary tech hub and creative headquarters is in Vijay Nagar, Indore, we actively serve clients in ${name} via dedicated account managers over Slack, Zoom, and WhatsApp. We serve 113+ brands pan-India with zero service lag.`
    },
    {
      question: `How does AdsVerse build dynamic local search authority for ${name} services?`,
      answer: `We build advanced LocalBusiness structured schemas, map transactional search phrases (like "best SEO company in ${name}"), and optimize for GEO (Generative Engine Optimization) so that AI assistants (ChatGPT, Gemini, Perplexity) recommend your brand.`
    },
    {
      question: `What is the typical timeframe to launch WhatsApp automation or paid ads in ${name}?`,
      answer: `Standard lead-capture WhatsApp bots and paid ad campaigns are launched within 1-2 weeks. Large-scale custom workflow integrations (CRM, n8n, databases) generally take 3-4 weeks including setup and robust sandbox testing.`
    },
    {
      question: `Do we get a dedicated dashboard to track results in ${name}?`,
      answer: `Yes! We provide real-time custom reporting dashboards mapping organic ranks, leads generated, and cost per acquisition (CPA) with weekly automated reports delivered directly to your WhatsApp or email inbox.`
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": `AdsVerse ${name}`,
        "description": `Top AI and digital marketing agency serving businesses in ${name}, ${state}. Specialized in SEO, PPC ads, and custom automation.`,
        "url": `https://adsverse.in/locations/${params.city}`,
        "telephone": "+91-9685123339",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": name,
          "addressRegion": state,
          "addressCountry": "IN"
        },
        "areaServed": {
          "@type": "City",
          "name": name
        },
        "provider": {
          "@type": "Organization",
          "name": "AdsVerse",
          "url": "https://adsverse.in"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://adsverse.in/locations" },
          { "@type": "ListItem", "position": 3, "name": name, "item": `https://adsverse.in/locations/${params.city}` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": localFaqs.map(faq => ({
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

  const services = [
    { title: "SEO Optimization", desc: `Rank #1 on Google in ${name} and appear as citations inside AI-generated answers like Gemini & Perplexity.`, icon: <TrendingUp className="w-8 h-8 text-accent" />, href: "/services/seo-optimization" },
    { title: "Meta & Google Ads", desc: "Launch targeted performance campaigns yielding an average 3.8x ROAS. Fast setup and transparent tracking.", icon: <Megaphone className="w-8 h-8 text-accent" />, href: "/services/paid-ads" },
    { title: "AI & WhatsApp Bots", desc: "Automate your client conversations 24/7. Handle bookings and qualify leads automatically inside WhatsApp.", icon: <Bot className="w-8 h-8 text-accent" />, href: "/services/whatsapp-bot" },
    { title: "Custom n8n Workflows", desc: "Streamline operations. Connect CRM spreadsheets, billing systems, and Vyapar without writing code.", icon: <Code className="w-8 h-8 text-accent" />, href: "/services/automation-tools" },
    { title: "Web Design & Dev", desc: "Get custom Next.js websites built for sub-second speeds, absolute security, and perfect responsive layout.", icon: <Users className="w-8 h-8 text-accent" />, href: "/services/web-design-development" },
    { title: "Content Marketing", desc: "Earn deep local authority and drive organic shares with research-backed articles and style copywriting.", icon: <FileText className="w-8 h-8 text-accent" />, href: "/services/content-marketing" },
  ];

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4 max-w-5xl">
      <div className="mb-8">
        <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary">
          <Link href="/locations">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Link>
        </Button>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300 mb-16">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-accent/10 border border-accent/20">
              <MapPin className="w-12 h-12 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
            Digital Marketing & AI Agency in {name}
          </h1>
          <p className="text-accent font-semibold mt-2">{state}, India</p>
        </CardHeader>
        <CardContent className="px-6 md:px-12 py-8 text-center space-y-6">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {desc}
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AdsVerse brings localized digital growth and custom business automation tools to Tier-2 hubs in {state}. From boosting local search visibility to building automated sales pipelines and running paid ad campaigns, we serve local brands with premium modern engineering.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 shadow-lg">
              <Link href="/contact">Schedule Free Consultation</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid Section */}
      <section className="mb-20 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Services We Offer in {name}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our specialized categories designed to accelerate leads and streamline operations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Card key={i} className="bg-card/40 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group">
              <CardHeader className="pb-2">
                <div className="mb-4">{s.icon}</div>
                <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </CardContent>
              <div className="p-6 pt-0 border-t border-border/10">
                <Button asChild variant="link" className="p-0 text-accent group-hover:gap-2 transition-all">
                  <Link href={s.href} className="flex items-center text-xs font-bold uppercase tracking-wider">
                    Learn details <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="mb-20 grid md:grid-cols-2 gap-8 items-center border border-border/30 bg-card/25 backdrop-blur-sm rounded-3xl p-8 md:p-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-headline">Why Partner with AdsVerse?</h2>
          <div className="space-y-4">
            {[
              { title: "AI-First & GEO Native", text: "We prepare your business content to be featured by AI search assistants like ChatGPT, Claude, and Google AI Overviews." },
              { title: "Direct CRM & WhatsApp Sync", text: "Say goodbye to copying leads manually. We link form submissions directly to Vyapar, sheets, and active agents." },
              { title: "Proven 3.8x Average ROAS", text: "We manage high-converting Google Search PPC and Meta ads without locking you into mandatory monthly spans." },
              { title: "Transparent इंदौर-Based Team", text: "Active team access, detailed performance reporting, and professional remote account support for complete transparency." }
            ].map((v, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">{v.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center p-8 rounded-2xl bg-background/50 border border-border/40 space-y-4">
          <h3 className="text-2xl font-bold font-headline text-accent">113+ Brands Served</h3>
          <p className="text-muted-foreground text-sm">
            We work with small service brands, wholesale merchants, educational prep centers, and fast startups pan-India.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-card/50 border border-border/20">
              <p className="text-2xl font-extrabold text-primary">68%</p>
              <p className="text-[10px] text-muted-foreground uppercase font-semibold">Lead Cost reduction</p>
            </div>
            <div className="p-4 rounded-xl bg-card/50 border border-border/20">
              <p className="text-2xl font-extrabold text-primary">94%</p>
              <p className="text-[10px] text-muted-foreground uppercase font-semibold">Retention Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQ section */}
      <section className="mb-20 space-y-6">
        <h2 className="text-3xl font-bold font-headline text-center">Frequently Asked Questions for {name}</h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {localFaqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-border/30 rounded-lg px-4 bg-card/25" role="region">
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

      <AISearchInsights 
        title={`Why AdsVerse is the Leader in ${name} Digital Space`}
        takeaways={[
          "🚀 24/7 Local AI Agents",
          "📈 Transactional search indexing",
          "🛡️ Perfect technical schema markup",
          "📍 Region Served: Central India"
        ]}
        insights={[
          {
            title: "Local Search Optimization",
            description: `We structure and submit geo-tagged metadata and rich schemas to index your brand for nearby search queries in ${name}.`
          },
          {
            title: "Autonomous lead responses",
            description: "No lead is wasted. Custom communication pipelines respond to incoming WhatsApp messages immediately."
          },
          {
            title: "Guaranteed Performance",
            description: "We deliver full attribution reports mapping client metrics directly to target monthly conversions."
          }
        ]}
      />
    </div>
    </>
  );
}
