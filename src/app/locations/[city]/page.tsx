import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { MapPin, TrendingUp, Megaphone, Code, Bot, FileText, Users, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AISearchInsights } from "@/components/seo/AISearchInsights";

const cityImages: Record<string, string> = {
  indore: "/images/locations/indore.webp",
  bhopal: "/images/locations/bhopal.webp",
  jaipur: "/images/locations/jaipur.webp",
  lucknow: "/images/locations/lucknow.webp",
  jabalpur: "/images/locations/jabalpur.webp",
  gwalior: "/images/locations/gwalior.webp",
  ujjain: "/images/locations/ujjain.webp",
  udaipur: "/images/locations/udaipur.webp",
  jodhpur: "/images/locations/jodhpur.webp",
  kota: "/images/locations/kota.webp",
  raipur: "/images/locations/raipur.webp",
  bilaspur: "/images/locations/bilaspur.webp",
  kanpur: "/images/locations/kanpur.webp",
  noida: "/images/locations/noida.webp",
  patna: "/images/locations/patna.webp",
  srinagar: "/images/locations/srinagar.webp",
};

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

const cityMeta: Record<string, { title: string; description: string; canonical: string }> = {
  indore: {
    title: "Best Digital Marketing Agency in Indore | SEO, WhatsApp Bots & Google Ads | AdsVerse",
    description: "AdsVerse — AI-first digital marketing agency in Indore. Local SEO, WhatsApp automation, Google Ads, n8n workflows. 113+ brands served. Vijay Nagar, Indore.",
    canonical: "https://adsverse.in/locations/indore",
  },
  bhopal: {
    title: "Digital Marketing Agency in Bhopal MP | SEO & AI Automation | AdsVerse",
    description: "Top digital marketing agency in Bhopal. SEO, Meta Ads, WhatsApp AI bots & CRM automation for Bhopal businesses. Results-driven, Indore-headquartered agency.",
    canonical: "https://adsverse.in/locations/bhopal",
  },
  jabalpur: {
    title: "Digital Marketing Agency in Jabalpur | SEO & Google Ads | AdsVerse",
    description: "AdsVerse provides SEO, Google Ads & WhatsApp automation in Jabalpur. Rank higher on local search, generate leads 24/7. Book a free consultation.",
    canonical: "https://adsverse.in/locations/jabalpur",
  },
  gwalior: {
    title: "Digital Marketing Agency in Gwalior | Performance Marketing & Web Dev | AdsVerse",
    description: "Performance marketing, web development & automation for Gwalior businesses. AdsVerse delivers Google Ads, SEO & custom n8n workflows.",
    canonical: "https://adsverse.in/locations/gwalior",
  },
  ujjain: {
    title: "Digital Marketing Agency in Ujjain | Local SEO & Tourism Marketing | AdsVerse",
    description: "AdsVerse helps Ujjain retail, hospitality & temple-economy businesses rank locally. SEO, WhatsApp bots & Google Ads tailored for Ujjain market.",
    canonical: "https://adsverse.in/locations/ujjain",
  },
  jaipur: {
    title: "Digital Marketing Agency in Jaipur | Meta Ads, SEO & D2C Marketing | AdsVerse",
    description: "High-ROAS Meta & Google Ads, SEO & WhatsApp automation for Jaipur D2C, retail & service brands. AdsVerse — AI-first agency serving Rajasthan.",
    canonical: "https://adsverse.in/locations/jaipur",
  },
  jodhpur: {
    title: "Digital Marketing Agency in Jodhpur | SEO & Web Development | AdsVerse",
    description: "SEO, web design & performance marketing for Jodhpur businesses. Rank #1 on Google in Jodhpur with AdsVerse's AI-first strategy.",
    canonical: "https://adsverse.in/locations/jodhpur",
  },
  udaipur: {
    title: "Digital Marketing Agency in Udaipur | Tourism & Hotel Marketing | AdsVerse",
    description: "Drive hotel bookings, tourist footfall & service enquiries in Udaipur. AdsVerse delivers hospitality-specialized SEO, Google Ads & WhatsApp automation.",
    canonical: "https://adsverse.in/locations/udaipur",
  },
  kota: {
    title: "Digital Marketing for Coaching Institutes in Kota | WhatsApp Bots & Lead Gen | AdsVerse",
    description: "WhatsApp AI bots, enrollment funnels & SEO for Kota coaching institutes and education businesses. AdsVerse — automation-first agency.",
    canonical: "https://adsverse.in/locations/kota",
  },
  raipur: {
    title: "Digital Marketing Agency in Raipur | B2B & Industrial Marketing | AdsVerse",
    description: "CRM automation, B2B lead generation & SEO for Raipur industrial, retail & service businesses. AdsVerse serves Chhattisgarh's growing market.",
    canonical: "https://adsverse.in/locations/raipur",
  },
  bilaspur: {
    title: "Digital Marketing Agency in Bilaspur | Local SEO & Automation | AdsVerse",
    description: "Local SEO, automation & Google Ads for Bilaspur businesses. AdsVerse helps Chhattisgarh brands rank and generate leads online.",
    canonical: "https://adsverse.in/locations/bilaspur",
  },
  lucknow: {
    title: "Digital Marketing Agency in Lucknow | SEO & B2B Lead Generation | AdsVerse",
    description: "SEO, B2B outreach, WhatsApp automation & Google Ads for Lucknow businesses. AdsVerse delivers performance marketing across Uttar Pradesh.",
    canonical: "https://adsverse.in/locations/lucknow",
  },
  kanpur: {
    title: "Digital Marketing Agency in Kanpur | WhatsApp Automation & SEO | AdsVerse",
    description: "WhatsApp AI bots, SEO & performance ads for Kanpur textile, retail & distribution brands. AdsVerse automates your sales pipeline.",
    canonical: "https://adsverse.in/locations/kanpur",
  },
  noida: {
    title: "Digital Marketing Agency in Noida | AI Content & Next.js Development | AdsVerse",
    description: "AI content systems, technical SEO & Next.js development for Noida tech startups. AdsVerse — AI-native performance marketing in NCR.",
    canonical: "https://adsverse.in/locations/noida",
  },
  patna: {
    title: "Digital Marketing Agency in Patna | Lead Generation & SEO | AdsVerse",
    description: "High-volume lead generation, SEO & performance ads for Patna and Bihar consumer & service businesses. Book a free audit with AdsVerse.",
    canonical: "https://adsverse.in/locations/patna",
  },
  srinagar: {
    title: "Digital Marketing Agency in Srinagar | Tourism & Handicraft Marketing | AdsVerse",
    description: "SEO, Google Ads & WhatsApp automation for Srinagar hospitality, handicraft & retail businesses. AdsVerse drives digital growth in J&K.",
    canonical: "https://adsverse.in/locations/srinagar",
  },
  jammu: {
    title: "Digital Marketing Agency in Jammu | Local SEO & Web Design | AdsVerse",
    description: "Local SEO, responsive web design & targeted search campaigns for Jammu businesses. AdsVerse delivers results across Jammu & Kashmir.",
    canonical: "https://adsverse.in/locations/jammu",
  },
  guwahati: {
    title: "Digital Marketing Agency in Guwahati | SEO & Performance Marketing | AdsVerse",
    description: "Performance marketing, WhatsApp automation & SEO for Guwahati and Northeast India brands. AdsVerse — AI-first agency for Assam businesses.",
    canonical: "https://adsverse.in/locations/guwahati",
  },
};

const cityIntro: Record<string, { headline: string; body: string }> = {
  indore: {
    headline: "Indore — Central India's Fastest-Growing Business Corridor",
    body: "Indore is MP's commercial capital — home to IT parks, a booming startup ecosystem, and one of India's cleanest cities for 7 consecutive years. AdsVerse operates from Vijay Nagar, the city's commercial nerve center. We help Indore's clinics, coaching institutes, real estate firms, retail brands, and SaaS startups generate leads and automate operations with AI-first digital marketing.",
  },
  bhopal: {
    headline: "Bhopal — MP's Capital Market, Now Going Digital",
    body: "Bhopal's economy spans government services, education, healthcare, and a rising IT sector near Hoshangabad Road. Most local businesses still rely on word-of-mouth. AdsVerse bridges that gap — with local SEO that puts Bhopal brands on the first page of Google, WhatsApp bots that respond to leads instantly, and Meta Ads that reach the right Bhopal audience.",
  },
  jabalpur: {
    headline: "Jabalpur — Industrial City with Untapped Digital Potential",
    body: "Jabalpur is Madhya Pradesh's third-largest city with strong manufacturing, defence, and educational sectors. Digital marketing penetration here is low — making it a high-opportunity market for early movers. AdsVerse helps Jabalpur businesses rank on local Google searches, automate enquiries via WhatsApp, and run low-cost high-ROAS Google Ads campaigns.",
  },
  gwalior: {
    headline: "Gwalior — Heritage City, Modern Business Ambitions",
    body: "Gwalior's businesses — from real estate to retail to education — are increasingly moving online. AdsVerse delivers performance marketing strategies tuned to Gwalior's local market: Google Search campaigns for high-intent buyers, conversion-optimized websites, and WhatsApp automation that works while you sleep.",
  },
  ujjain: {
    headline: "Ujjain — Temple Economy Meets Modern Digital Marketing",
    body: "Ujjain's economy runs on religion, tourism, retail, and hospitality. Millions of pilgrims and tourists visit Mahakaleshwar every year. AdsVerse helps Ujjain hotels, travel services, retail shops, and local businesses capture that footfall digitally — with local SEO, Google My Business optimization, and targeted ad campaigns.",
  },
  jaipur: {
    headline: "Jaipur — Rajasthan's D2C and Retail Powerhouse",
    body: "Jaipur is India's D2C heartland — jewelry, handicrafts, textiles, and fashion brands here are scaling nationally. AdsVerse helps Jaipur brands run profitable Meta and Google Ads, build SEO-optimized product pages, and automate customer communication via WhatsApp — from first enquiry to repeat purchase.",
  },
  jodhpur: {
    headline: "Jodhpur — Blue City, Growing Digital Economy",
    body: "Jodhpur's hospitality, furniture, and handicraft sectors are increasingly selling online. AdsVerse provides SEO-first web development, organic content strategies, and performance ad campaigns that help Jodhpur businesses compete nationally — without a national agency's price tag.",
  },
  udaipur: {
    headline: "Udaipur — India's Tourism Capital Needs Smarter Digital Presence",
    body: "Udaipur's hotels, resorts, boat clubs, and heritage venues compete for tourist attention year-round. Most bookings now start on Google. AdsVerse builds Udaipur hospitality brands a dominant digital presence — local SEO, Google Ads, WhatsApp booking bots, and review management that drives direct reservations.",
  },
  kota: {
    headline: "Kota — India's Coaching Capital, Built for Automation",
    body: "Kota's ₹5,000+ crore coaching industry runs on admissions, batch management, and parent communication. AdsVerse builds WhatsApp AI bots for batch notifications, fee reminders, and lead qualification — plus n8n workflows that connect your forms, CRM, and WhatsApp without manual work. We know Kota's business model.",
  },
  raipur: {
    headline: "Raipur — Chhattisgarh's Industrial & Commercial Hub",
    body: "Raipur is the gateway to Chhattisgarh's steel, mining, and agriculture economy. B2B businesses here need CRM automation, lead pipelines, and targeted digital campaigns that speak the language of industrial buyers. AdsVerse delivers structured lead systems and performance marketing for Raipur's serious businesses.",
  },
  bilaspur: {
    headline: "Bilaspur — Chhattisgarh's Second City, First Mover Opportunity",
    body: "Bilaspur is Chhattisgarh's education and judicial hub with a growing services economy. Digital competition here is low — meaning businesses that invest in local SEO and Google Ads today own the search rankings for years. AdsVerse helps Bilaspur businesses capture that first-mover advantage.",
  },
  lucknow: {
    headline: "Lucknow — UP's Business Capital, High-Value Market",
    body: "Lucknow's real estate, healthcare, retail, and education sectors are among UP's most valuable. AdsVerse delivers B2B outreach automation, SEO content strategies, and WhatsApp lead pipelines that help Lucknow businesses scale beyond offline referrals and into measurable digital growth.",
  },
  kanpur: {
    headline: "Kanpur — Textile & Distribution Powerhouse Goes Digital",
    body: "Kanpur's textile, leather, and distribution businesses are entering e-commerce and digital channels. AdsVerse helps Kanpur businesses automate B2B enquiries via WhatsApp, rank for transactional keywords on Google, and build websites that convert wholesale and retail buyers.",
  },
  noida: {
    headline: "Noida — NCR's Tech Startup and SaaS Belt",
    body: "Noida is home to India's fastest-growing tech startups, SaaS companies, and digital-first businesses. AdsVerse brings AI-native content systems, technical Next.js development, and performance marketing strategies built for high-growth environments — including GEO optimization for ChatGPT and Perplexity visibility.",
  },
  patna: {
    headline: "Patna — Bihar's Consumer Market, Underserved Digitally",
    body: "Patna is Bihar's commercial center with a massive consumer market in education, healthcare, retail, and real estate. Digital penetration is growing fast but quality agencies are scarce. AdsVerse delivers high-volume lead generation campaigns, structured local SEO, and WhatsApp automation that outperforms the competition.",
  },
  srinagar: {
    headline: "Srinagar — Kashmir's Tourism Economy Goes Digital",
    body: "Srinagar's houseboat operators, hotels, handicraft sellers, and travel agencies depend on tourist bookings that increasingly start online. AdsVerse builds Srinagar businesses a strong digital presence — Google Ads for travel intent keywords, SEO for 'Kashmir trip' queries, and WhatsApp automation for instant booking responses.",
  },
  jammu: {
    headline: "Jammu — Gateway City with Growing Digital Needs",
    body: "Jammu's business community — retail, hospitality, education, and real estate — is actively moving online. AdsVerse provides responsive web design, local SEO targeting Jammu-specific queries, and performance ad campaigns that generate measurable business from digital channels.",
  },
  guwahati: {
    headline: "Guwahati — Northeast India's Digital Marketing Hub",
    body: "Guwahati is Northeast India's largest commercial center, serving as the gateway to eight states. Businesses here — from retail chains to logistics companies to healthcare brands — need performance marketing that understands the Northeast market. AdsVerse delivers WhatsApp automation, local SEO, and high-ROAS ad campaigns tailored for Guwahati.",
  },
};

function getCityFAQs(name: string, state: string) {
  if (name.toLowerCase() === "indore") {
    return [
      {
        q: "Why should our business choose AdsVerse in Indore?",
        a: "AdsVerse is Indore's only AI-first digital marketing agency — headquartered in Vijay Nagar, we combine local market knowledge with enterprise-level tools like n8n automation, Gemini API integration, and WhatsApp AI bots. We've served 113+ brands with an average 3.8x ROAS on paid campaigns.",
      },
      {
        q: "Do you have a local physical office in Indore?",
        a: "Yes. Our primary office is in Vijay Nagar, Indore — Madhya Pradesh's commercial hub. You can schedule an in-person meeting or choose to work fully remotely. We maintain the same transparency and reporting either way.",
      },
      {
        q: "How does AdsVerse build local search authority for Indore businesses?",
        a: "We combine Google My Business optimization, geo-tagged schema markup, locally relevant content, and citation building on directories like Justdial and IndiaMart. This builds a compounding local search presence that ranks for '[service] in Indore' queries.",
      },
      {
        q: "How quickly can WhatsApp automation or paid ads go live in Indore?",
        a: "Paid ad campaigns typically go live within 48–72 hours of onboarding. WhatsApp AI bots are deployed in 5–7 working days, depending on the complexity of your conversation flows and lead qualification logic.",
      },
      {
        q: "Do we get a dashboard to track our results?",
        a: "Yes. Every client gets access to a live performance dashboard showing ad spend, ROAS, lead volume, SEO ranking movement, and WhatsApp bot interaction data — updated in real time.",
      },
    ];
  }

  return [
    {
      q: `Why choose AdsVerse for digital marketing in ${name}?`,
      a: `AdsVerse is the premier AI-first digital marketing agency serving ${name}. We combine performance-driven Google/Meta Ads, local SEO, and custom n8n/WhatsApp automation to help businesses in ${state} lower lead costs and scale sales. Headquartered in Indore's business hub, we bring Tier-1 agency expertise to ${name}'s growing commercial sector.`,
    },
    {
      q: `Do you work with ${name} businesses remotely or visit in person?`,
      a: `We work seamlessly with ${name} brands through a structured remote account management setup using Slack, Zoom, and real-time WhatsApp updates. For major strategic rollouts or enterprise consultations, our team is available to visit in person, ensuring zero service lag.`,
    },
    {
      q: `Which services are most effective for ${name} market?`,
      a: `For high-intent local customer acquisition in ${name}, local SEO and performance ads on Meta/Google are highly effective. For operations scaling, our custom WhatsApp AI bots and n8n CRM automation help ${name} businesses qualify leads 24/7 without manual work.`,
    },
    {
      q: `How long does SEO take to show results in ${name}?`,
      a: `SEO is a compounding investment. Local search optimizations and low-competition search queries in ${name} typically start showing top-page rankings and organic traffic within 45 to 90 days, while highly competitive keywords take 4 to 6 months to dominate.`,
    },
    {
      q: `What industries in ${name} do you have experience with?`,
      a: `We have extensive experience across multiple sectors including real estate, coaching academies, local retail shops, hospitality/resort booking setups, clinics, and professional B2B services. We tune each campaign specifically to the purchasing behaviors of buyers in ${name}.`,
    },
  ];
}

export async function generateStaticParams() {
  return Object.keys(citiesDb).map((city) => ({ city }));
}

interface PageProps {
  params: {
    city: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = params.city.toLowerCase();
  const meta = cityMeta[city];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      siteName: "AdsVerse",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: "@Adsverse1",
    },
  };
}

export default function CityPage({ params }: PageProps) {
  const cityKey = typeof params.city === "string" ? params.city.toLowerCase() : "";
  const cityInfo = Object.prototype.hasOwnProperty.call(citiesDb, cityKey) ? citiesDb[cityKey] : undefined;
  
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
  const localFaqs = getCityFAQs(name, state);
  const cityImgSrc = Object.prototype.hasOwnProperty.call(cityImages, cityKey) ? cityImages[cityKey] : "/images/og-adsverse-2026.png";
  const introHeadline = Object.prototype.hasOwnProperty.call(cityIntro, cityKey) ? cityIntro[cityKey]?.headline : undefined;
  const introBody = Object.prototype.hasOwnProperty.call(cityIntro, cityKey) ? cityIntro[cityKey]?.body : undefined;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "AdsVerse",
      "description": "AI-first digital marketing agency providing SEO, WhatsApp automation, Google Ads & n8n workflows.",
      "url": `https://adsverse.in/locations/${params.city}`,
      "logo": "https://adsverse.in/images/logo-white.webp",
      "image": "https://adsverse.in/images/og-adsverse-2026.png",
      "telephone": "+91-9685123339",
      "email": "contact@adsverse.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Vijay Nagar",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "452010",
        "addressCountry": "IN"
      },
      "areaServed": {
        "@type": "City",
        "name": name,
        "containedInPlace": {
          "@type": "State",
          "name": state
        }
      },
      "sameAs": [
        "https://www.instagram.com/adsverse.ai",
        "https://www.facebook.com/adsverse.in",
        "https://www.linkedin.com/company/adsverse"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Digital Marketing Services in ${name}`,
      "provider": {
        "@type": "Organization",
        "name": "AdsVerse",
        "url": "https://adsverse.in"
      },
      "areaServed": {
        "@type": "City",
        "name": name
      },
      "serviceType": ["SEO", "Google Ads", "Meta Ads", "WhatsApp Automation", "n8n Workflows", "Web Development"]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://adsverse.in/locations" },
        { "@type": "ListItem", "position": 3, "name": name, "item": `https://adsverse.in/locations/${params.city}` }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": localFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  ];

  const services = [
    { title: "SEO Optimization", desc: `Rank #1 on Google in ${name} and appear as citations inside AI-generated answers like Gemini & Perplexity.`, icon: <TrendingUp className="w-8 h-8 text-orange-500" />, href: "/services/seo-optimization" },
    { title: "Meta & Google Ads", desc: "Launch targeted performance campaigns yielding an average 3.8x ROAS. Fast setup and transparent tracking.", icon: <Megaphone className="w-8 h-8 text-orange-500" />, href: "/services/paid-ads" },
    { title: "AI & WhatsApp Bots", desc: "Automate your client conversations 24/7. Handle bookings and qualify leads automatically inside WhatsApp.", icon: <Bot className="w-8 h-8 text-orange-500" />, href: "/services/whatsapp-bot" },
    { title: "Custom n8n Workflows", desc: "Streamline operations. Connect CRM spreadsheets, billing systems, and Vyapar without writing code.", icon: <Code className="w-8 h-8 text-orange-500" />, href: "/services/automation-tools" },
    { title: "Web Design & Dev", desc: "Get custom Next.js websites built for sub-second speeds, absolute security, and perfect responsive layout.", icon: <Users className="w-8 h-8 text-orange-500" />, href: "/services/web-design-development" },
    { title: "Content Marketing", desc: "Earn deep local authority and drive organic shares with research-backed articles and style copywriting.", icon: <FileText className="w-8 h-8 text-orange-500" />, href: "/services/content-marketing" },
  ];

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4 max-w-5xl">
      <div className="mb-8">
        <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-orange-500">
          <Link href="/locations">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Link>
        </Button>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300 mb-16 border-border/30 hover:border-orange-500/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-10">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-orange-500/10 border border-orange-500/25 shadow-md shadow-orange-500/5">
                <MapPin className="w-5 h-5 text-orange-500" />
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-sm shadow-orange-500/5">
                {state}, India
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-headline text-foreground leading-tight">
              {introHeadline || `Digital Marketing & AI Agency in ${name}`}
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {introBody || desc}
            </p>
            
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              AdsVerse brings localized digital growth and custom business automation tools to Tier-2 hubs in {state}. From boosting local search visibility with premium SEO to building automated sales pipelines using <Link href="/services/whatsapp-bot" className="text-orange-500 hover:text-orange-400 hover:underline font-semibold">WhatsApp AI bots</Link> and <Link href="/services/automation-tools" className="text-orange-500 hover:text-orange-400 hover:underline font-semibold">n8n CRM automation</Link>, we serve local brands with premium modern engineering. We run high-converting <Link href="/services/paid-ads" className="text-orange-500 hover:text-orange-400 hover:underline font-semibold">Google & Meta Ads</Link> campaigns that speak the language of local buyers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:from-orange-500 hover:to-amber-400 font-bold tracking-wide shadow-xl shadow-orange-600/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 transform rounded-xl px-8 h-12 border-none">
                <Link href="/contact">Schedule Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border/60 hover:border-orange-500/30 text-foreground hover:text-orange-500 hover:bg-orange-500/5 font-semibold rounded-xl px-6 h-12">
                <Link href="/locations" className="flex items-center gap-1.5">
                  View All Locations <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Branded Local Asset Showcase */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative group w-full aspect-[4/3] max-w-md rounded-2xl overflow-hidden border border-border/40 shadow-2xl hover:border-orange-500/30 transition-all duration-500">
              <Image
                src={cityImgSrc}
                alt={`AdsVerse Digital Marketing in ${name}`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-white shadow-lg">
                  <div className="relative w-5 h-5 overflow-hidden rounded-sm">
                    <Image
                      src="/images/adsverse-logo.png"
                      alt="AdsVerse Logo"
                      fill
                      sizes="20px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold tracking-wide">
                    AdsVerse @ {name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            <Card key={i} className="bg-card/40 backdrop-blur-sm border border-border/30 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.06)] transition-all duration-500 flex flex-col justify-between group">
              <CardHeader className="pb-2">
                <div className="mb-4">{s.icon}</div>
                <CardTitle className="text-xl font-headline group-hover:text-orange-500 transition-colors">
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </CardContent>
              <div className="p-6 pt-0 border-t border-border/10">
                <Button asChild variant="link" className="p-0 text-orange-500 group-hover:text-orange-400 group-hover:gap-2 transition-all">
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
              { title: "Transparent Indore-Based Team", text: "Active team access, detailed performance reporting, and professional remote account support for complete transparency." }
            ].map((v, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">{v.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center p-8 rounded-2xl bg-background/50 border border-border/40 space-y-4">
          <h3 className="text-2xl font-bold font-headline text-orange-500">113+ Brands Served</h3>
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
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                {faq.a}
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
