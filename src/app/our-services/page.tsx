import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase-server";
import { type Service as ServiceDef } from "@/lib/definitions";
import ServicesClient from "@/components/services/ServicesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing and AI Automation Services | SEO, Ads, WhatsApp Bots | AdsVerse",
  description: "AdsVerse offers 75+ digital marketing services in India — SEO, Google Ads, Meta Ads, WhatsApp AI bots, n8n workflows and web development. AI-first agency, Indore. Get free strategy call.",
  alternates: {
    canonical: "https://adsverse.in/our-services",
  },
  openGraph: {
    title: "Digital Marketing and AI Automation Services | AdsVerse",
    description: "75+ services: SEO, Google Ads, Meta Ads, WhatsApp AI bots, n8n automation and web development. AI-first digital marketing agency in Indore serving pan-India.",
    url: "https://adsverse.in/our-services",
    siteName: "AdsVerse",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://adsverse.in/images/og-adsverse-2026.png",
        width: 1200,
        height: 630,
        alt: "AdsVerse Digital Marketing and AI Automation Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing and AI Automation Services | AdsVerse",
    description: "75+ services: SEO, Google Ads, Meta Ads, WhatsApp AI bots, n8n automation. AI-first agency, Indore.",
    creator: "@Adsverse1",
  },
};

const STATIC_SERVICES = [
  // Social Media
  { name: "Facebook Marketing", description: "Targeted campaigns, page management & community building on Facebook." },
  { name: "Instagram Marketing", description: "Reels, stories, grid content & growth strategies for Instagram." },
  { name: "LinkedIn Marketing", description: "B2B brand building, thought leadership & professional outreach." },
  { name: "Twitter (X) Marketing", description: "Real-time brand engagement, trending content & audience growth." },
  { name: "YouTube Marketing", description: "Channel strategy, SEO & subscriber growth for YouTube." },
  { name: "Social Media Account Management", description: "Full-service management of all your social accounts — posting, replies & analytics." },
  { name: "Social Media Content Creation", description: "Platform-specific content — captions, creatives, carousels & video scripts." },
  { name: "Social Media Ads Campaigns", description: "Paid campaigns across Facebook, Instagram, LinkedIn & Twitter." },
  { name: "Influencer Marketing", description: "Connect with relevant influencers to amplify your brand reach." },
  // SEO
  { name: "On-Page SEO", description: "Title tags, meta descriptions, header optimization & internal linking." },
  { name: "Off-Page SEO", description: "High-authority backlink building, guest posts & digital PR." },
  { name: "Technical SEO", description: "Site speed, crawlability, schema markup & Core Web Vitals fixes." },
  { name: "Local SEO", description: "Google Business Profile, local citations & 'near me' rankings." },
  { name: "Mobile SEO", description: "Mobile-first indexing optimization for Google's mobile-first crawl." },
  { name: "E-Commerce SEO", description: "Product page optimization, category SEO & shopping feed setup." },
  { name: "YouTube SEO", description: "Video titles, descriptions, tags & thumbnail optimization for YouTube search." },
  { name: "Website Speed Optimization", description: "Core Web Vitals, image compression, caching & CDN setup." },
  { name: "Keyword Research & Strategy", description: "In-depth keyword analysis mapped to your buyer's journey." },
  { name: "SEO Audit", description: "Complete technical + on-page SEO audit with prioritized fix recommendations." },
  // Content
  { name: "Blog Writing", description: "SEO-optimized, research-backed blog posts that drive organic traffic." },
  { name: "Website Content Writing", description: "Homepage, about, service & landing page copy that converts." },
  { name: "Copywriting (Ads & Landing Pages)", description: "High-converting ad copy and landing page scripts for paid campaigns." },
  { name: "Social Media Content", description: "Daily content calendars with captions, hooks & CTAs per platform." },
  { name: "SEO-Optimized Content", description: "Content written around search intent with keyword integration." },
  { name: "Video Content Creation", description: "YouTube scripts, explainer videos & brand storytelling content." },
  { name: "Reels / Shorts Creation", description: "Script, shoot coordination & editing for Instagram Reels & YouTube Shorts." },
  { name: "Podcast Editing & Publishing", description: "Full podcast post-production — editing, show notes & distribution." },
  { name: "Infographics Design", description: "Data visualization & infographic design for social sharing & backlinks." },
  // PPC
  { name: "Google Search Ads", description: "Intent-based search campaigns targeting buyers ready to convert." },
  { name: "Google Display Ads", description: "Visual banner ads across Google's Display Network for brand awareness." },
  { name: "Google Shopping Ads", description: "Product listing ads for e-commerce on Google Shopping." },
  { name: "YouTube Ads", description: "In-stream, bumper & discovery ads for video marketing." },
  { name: "Facebook & Instagram Ads", description: "Meta campaigns for lead gen, traffic, awareness & conversions." },
  { name: "LinkedIn Ads", description: "Sponsored content, InMail & lead gen forms for B2B targeting." },
  { name: "Remarketing Campaigns", description: "Re-engage past visitors with custom audiences across platforms." },
  { name: "Conversion Ads", description: "Bottom-of-funnel ad campaigns optimized for purchases & form fills." },
  { name: "Lead Generation Campaigns", description: "Full-funnel lead gen — from ad to CRM entry — automated." },
  // E-Commerce
  { name: "Amazon / Flipkart Product SEO", description: "Optimize product listings for marketplace search algorithms." },
  { name: "Marketplace Ads", description: "Sponsored product ads on Amazon & Flipkart for immediate visibility." },
  { name: "Product Listing Optimization", description: "Titles, bullets, A+ content & images optimized for conversions." },
  { name: "Ecommerce Store Setup", description: "Full store setup on Shopify or WooCommerce from scratch." },
  { name: "Shopify / WooCommerce Setup", description: "Theme customization, payment gateway & product upload." },
  { name: "Catalog Management", description: "Ongoing product catalog updates, pricing & inventory management." },
  // Email Marketing
  { name: "Email Automation", description: "Trigger-based email sequences — welcome, nurture & re-engagement." },
  { name: "Newsletter Creation", description: "Weekly/monthly branded newsletters with curated content & CTAs." },
  { name: "Drip Campaigns", description: "Multi-step email drip campaigns mapped to your sales funnel." },
  { name: "Email List Building", description: "Lead magnets, opt-in forms & list segmentation strategies." },
  { name: "MailChimp / SendGrid Setup", description: "Full platform setup, template design & automation configuration." },
  // Graphic Design
  { name: "Logo Design", description: "Unique, memorable logo with multiple format deliverables." },
  { name: "Branding Kit", description: "Complete brand kit — logo, colors, fonts, icons & usage guide." },
  { name: "Social Media Posters", description: "Branded creatives for Instagram, Facebook & LinkedIn posts." },
  { name: "Banner & Flyer Design", description: "Print-ready and digital banners, flyers & hoarding designs." },
  { name: "Thumbnail Design", description: "High-CTR YouTube thumbnail designs to improve click-through rates." },
  // Web Dev
  { name: "Business Website", description: "Professional 5–10 page website for your business with CMS." },
  { name: "Portfolio Website", description: "Personal brand or agency portfolio with case studies & work samples." },
  { name: "E-Commerce Website", description: "Full-stack e-commerce with product pages, cart & payment gateway." },
  { name: "Landing Pages", description: "High-converting single-page funnels for ads & campaigns." },
  { name: "UI/UX Designing", description: "Wireframes, prototypes & user experience design for apps & sites." },
  { name: "Website Maintenance", description: "Monthly backups, security updates, content edits & uptime monitoring." },
  { name: "Website Redesigning", description: "Complete overhaul of outdated websites with modern design & performance." },
  // ORM
  { name: "Google Reviews Management", description: "Strategy to get more 5-star reviews & suppress negative ones." },
  { name: "Negative Review Handling", description: "Professionally respond to & resolve negative feedback online." },
  { name: "Brand Reputation Building", description: "Long-term reputation strategy — press, social proof & authority." },
  // Analytics
  { name: "Google Analytics Setup", description: "GA4 installation, goals, events & conversion tracking setup." },
  { name: "Facebook Pixel Setup", description: "Meta Pixel installation, custom events & audience building." },
  { name: "Conversion Tracking", description: "End-to-end conversion tracking across Google, Meta & web." },
  { name: "Performance Reporting", description: "Monthly data-driven reports with KPIs, insights & action points." },
  // Video
  { name: "Corporate Videos", description: "Brand story, about-us & team culture videos for your business." },
  { name: "Product Promo Videos", description: "Feature-highlight videos for products — for ads & website use." },
  { name: "Reels & Shorts", description: "15–60 second scroll-stopping short-form content for social media." },
  { name: "Business Ad Films", description: "Full production ad films for TV, YouTube & digital campaigns." },
  // Branding
  { name: "Brand Identity Creation", description: "Complete brand identity system — visual & verbal brand guidelines." },
  { name: "Brand Strategy", description: "Positioning, messaging, USP definition & competitive differentiation." },
  { name: "Market Research", description: "Competitor analysis, audience research & market opportunity mapping." },
  { name: "Marketing Strategy", description: "Full-funnel digital marketing strategy tailored to your goals." },
  // WhatsApp AI
  { name: "WhatsApp AI Bot (Persona-Based)", description: "Custom AI persona on WhatsApp — Hinglish support, lead capture & memory." },
  { name: "WhatsApp Marketing Campaigns", description: "Bulk broadcast messages with personalization & opt-in compliance." },
  { name: "WhatsApp Broadcast Setup", description: "Setup and manage broadcast lists for promotions & announcements." },
  { name: "AI Auto-Reply (Instagram/WhatsApp/Facebook)", description: "Instant AI replies across all chat platforms — unified inbox automation." },
  { name: "WhatsApp Lead Funnel", description: "Full WhatsApp funnel — ad → DM → qualification → CRM entry." },
  // n8n
  { name: "n8n Workflow Setup", description: "End-to-end n8n workflow design, deployment & cloud hosting." },
  { name: "Zapier Automation", description: "Multi-step Zap creation connecting 5,000+ apps in your stack." },
  { name: "Multi-Step Workflow Design", description: "Complex branching workflows with conditions, loops & error handling." },
  { name: "API Integration & Automation", description: "Custom REST API connections to automate data between platforms." },
  { name: "Scheduled Data Automation", description: "Cron-based automation — daily reports, data sync & batch jobs." },
  { name: "Form to CRM Automation", description: "Auto-capture form submissions into CRM with tagging & notifications." },
  // AI Agents
  { name: "AI Telecaller System", description: "Automated voice AI that calls, qualifies & schedules follow-ups." },
  { name: "Lead Qualification Bot", description: "Conversational AI that scores & qualifies leads before human handoff." },
  { name: "Customer Support Bot", description: "24/7 AI support agent trained on your FAQs, products & policies." },
  { name: "Gemini API Integration", description: "Google Gemini-powered agents for content, analysis & business tasks." },
  { name: "AI Content Agent", description: "Automated content research, drafting & publishing pipeline using AI." },
  { name: "Custom LLM-Powered Bot", description: "Bespoke chatbot with custom personality, knowledge base & integrations." },
  // CRM Automation
  { name: "CRM Setup & Automation", description: "Full CRM setup (HubSpot, Zoho, Salesforce) with pipeline configuration." },
  { name: "Lead Capture Automation", description: "Multi-source lead capture — web forms, ads, WhatsApp → CRM." },
  { name: "Sales Funnel Automation", description: "Automated funnel stages — MQL to SQL to closed deal." },
  { name: "Auto Follow-up System", description: "Timed email + WhatsApp + SMS follow-up sequences after lead capture." },
  { name: "Pipeline Management", description: "Deal tracking, stage automation & sales reporting dashboards." },
  { name: "Lead Scoring System", description: "Behavioral scoring model to prioritize high-intent leads for sales team." },
  // Chat Automation
  { name: "Instagram DM Automation", description: "Auto-replies to story mentions, DMs & comment triggers on Instagram." },
  { name: "Facebook Messenger Bot", description: "AI messenger bot for page DMs, lead gen & customer support." },
  { name: "Multi-Platform Chat Automation", description: "Single AI agent managing WhatsApp + Instagram + Messenger in one flow." },
  { name: "Chatbot Integration", description: "Integrate third-party chatbots (Landbot, Tidio, ManyChat) into your stack." },
  { name: "AI Chat Agent with Memory", description: "Context-aware AI that remembers past conversations for personalized replies." },
  // AI Tracking
  { name: "GA4 Setup & Full Audit", description: "Complete GA4 migration, event setup & conversion goal configuration." },
  { name: "Facebook Pixel & CAPI Setup", description: "Meta Pixel + Conversions API for server-side tracking accuracy." },
  { name: "Conversion Tracking (Cross-Platform)", description: "Unified conversion tracking across Google, Meta & organic channels." },
  { name: "Custom Dashboard Setup", description: "Looker Studio / Google Sheets dashboards with live data visualization." },
  { name: "Performance Reporting", description: "Monthly automated reports — traffic, leads, ROAS & growth metrics." },
  // Custom AI Dev
  { name: "Starter Automation Bot", description: "Automate one core business task with basic workflow & 1 app integration." },
  { name: "Business Pro Automation Suite", description: "Complex multi-step automation with AI telecaller & 3 app integrations." },
  { name: "Enterprise Automation Suite", description: "End-to-end process automation, custom UI/dashboard & dedicated support." },
  { name: "Custom API Development", description: "REST APIs built to connect your business tools with custom logic." },
  { name: "React / Next.js Website", description: "High-performance web apps built with modern React & Next.js stack." },
  { name: "Database Automation", description: "Google Sheets, Airtable & Firebase-based automated database workflows." }
];

async function getServices(): Promise<ServiceDef[]> {
  try {
    const q = query(collection(db, "services"), orderBy("displayOrder", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      };
    }) as any[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function OurServicesPage() {
  const isHi = false;
  const dbServices = await getServices();

  // Combine ALL static and dynamic services for the schema
  const allServices = [
    ...STATIC_SERVICES,
    ...dbServices.map(s => ({ name: s.name, description: s.description }))
  ];

  // Schema 1: WebPage
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Digital Marketing & AI Automation Services | AdsVerse",
    "description": "75+ digital marketing and AI automation services — SEO, Google Ads, Meta Ads, WhatsApp bots, n8n workflows, web development. AI-first agency in Indore.",
    "url": "https://adsverse.in/our-services",
    "provider": {
      "@type": "Organization",
      "name": "AdsVerse",
      "url": "https://adsverse.in"
    }
  };

  // Schema 2: ItemList of Services
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AdsVerse Digital Marketing Services",
    "url": "https://adsverse.in/our-services",
    "numberOfItems": 12,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Social Media Marketing", "url": "https://adsverse.in/our-services#social-media" },
      { "@type": "ListItem", "position": 2, "name": "SEO Services", "url": "https://adsverse.in/our-services#seo" },
      { "@type": "ListItem", "position": 3, "name": "Content Marketing", "url": "https://adsverse.in/our-services#content" },
      { "@type": "ListItem", "position": 4, "name": "PPC & Paid Ads", "url": "https://adsverse.in/our-services#paid-ads" },
      { "@type": "ListItem", "position": 5, "name": "E-Commerce Marketing", "url": "https://adsverse.in/our-services#ecommerce" },
      { "@type": "ListItem", "position": 6, "name": "Email Marketing", "url": "https://adsverse.in/our-services#email" },
      { "@type": "ListItem", "position": 7, "name": "Graphic Design", "url": "https://adsverse.in/our-services#design" },
      { "@type": "ListItem", "position": 8, "name": "Web Development", "url": "https://adsverse.in/our-services#web-dev" },
      { "@type": "ListItem", "position": 9, "name": "Online Reputation Management", "url": "https://adsverse.in/our-services#orm" },
      { "@type": "ListItem", "position": 10, "name": "Analytics & Tracking", "url": "https://adsverse.in/our-services#analytics" },
      { "@type": "ListItem", "position": 11, "name": "Video Production", "url": "https://adsverse.in/our-services#video" },
      { "@type": "ListItem", "position": 12, "name": "Branding & Strategy", "url": "https://adsverse.in/our-services#branding" }
    ]
  };

  // Schema 3: FAQPage
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is AdsVerse different from other digital marketing agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We are an AI-first agency — meaning AI automation is built into every service we offer, not offered as an add-on. We use n8n workflows, Gemini API integrations, and WhatsApp AI bots to automate lead handling, reporting, and client communication. Every service is delivered in-house — no outsourcing. We serve 113+ brands with full transparency, live dashboards, and performance guarantees."
        }
      },
      {
        "@type": "Question",
        "name": "How much does digital marketing cost with AdsVerse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our packages start from ₹8,000/month for local SEO and go up based on scope, channels, and ad spend. We offer transparent, tiered pricing with no hidden fees and no mandatory long-term contracts for most services."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to see results from SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Local SEO results are typically visible within 60-90 days. Competitive national keywords take 4-6 months. Paid ads can deliver leads within 48 hours of going live."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with businesses outside of Indore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We serve clients across 18+ cities including Bhopal, Jaipur, Lucknow, Raipur, Noida, Patna, Guwahati, and more — all delivered remotely with weekly video calls and live dashboards."
        }
      },
      {
        "@type": "Question",
        "name": "Can AdsVerse handle both digital marketing and automation together?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We connect your ad campaigns, website forms, WhatsApp, and CRM into a single automated pipeline. Leads from Meta Ads can trigger WhatsApp bot conversations, qualify automatically, and enter your CRM without any manual work."
        }
      }
    ]
  };

  // Schema 4: Service Catalog (Original)
  const serviceCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AdsVerse Digital & AI Services",
    "serviceType": "Digital Marketing and AI Automation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "AdsVerse",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indore",
        "addressRegion": "MP",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services Catalog",
      "itemListElement": allServices.map((s) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.name,
          "description": s.description
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        id="webpage-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        id="itemlist-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        id="faqpage-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <script
        type="application/ld+json"
        id="service-catalog-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogSchema) }}
      />
      <ServicesClient isHi={isHi} initialServices={dbServices} />
    </>
  );
}
