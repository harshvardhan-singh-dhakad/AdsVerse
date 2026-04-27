
import { Check, ArrowRight, Zap, TrendingUp, Star, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { AISearchInsights } from "@/components/seo/AISearchInsights";


/* ─────────────────────────────────────────────
   COMPLETE SERVICES DATA
───────────────────────────────────────────── */
const DM_CATEGORIES = [
  {
    id: "smm",
    label: "Social Media",
    icon: "📱",
    color: "#e91e8c",
    desc: "Build brand presence across every major social platform with data-backed strategies.",
    services: [
      { name: "Facebook Marketing", desc: "Targeted campaigns, page management & community building on Facebook.", tags: ["Organic", "Paid", "Community"] },
      { name: "Instagram Marketing", desc: "Reels, stories, grid content & growth strategies for Instagram.", tags: ["Reels", "Stories", "Growth"] },
      { name: "LinkedIn Marketing", desc: "B2B brand building, thought leadership & professional outreach.", tags: ["B2B", "Lead Gen", "Branding"] },
      { name: "Twitter (X) Marketing", desc: "Real-time brand engagement, trending content & audience growth.", tags: ["Trending", "Engagement", "Ads"] },
      { name: "YouTube Marketing", desc: "Channel strategy, SEO & subscriber growth for YouTube.", tags: ["YouTube SEO", "Subscribers", "Strategy"] },
      { name: "Social Media Account Management", desc: "Full-service management of all your social accounts — posting, replies & analytics.", tags: ["Management", "Scheduling", "Analytics"] },
      { name: "Social Media Content Creation", desc: "Platform-specific content — captions, creatives, carousels & video scripts.", tags: ["Creatives", "Captions", "Carousels"] },
      { name: "Social Media Ads Campaigns", desc: "Paid campaigns across Facebook, Instagram, LinkedIn & Twitter.", tags: ["Paid Ads", "Targeting", "ROAS"] },
      { name: "Influencer Marketing", desc: "Connect with relevant influencers to amplify your brand reach.", tags: ["Influencer", "UGC", "Reach"] },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    icon: "🔍",
    color: "#22c55e",
    desc: "Rank higher on Google with white-hat SEO strategies built for Indian search behavior.",
    services: [
      { name: "On-Page SEO", desc: "Title tags, meta descriptions, header optimization & internal linking.", tags: ["Meta Tags", "Keywords", "Structure"] },
      { name: "Off-Page SEO", desc: "High-authority backlink building, guest posts & digital PR.", tags: ["Backlinks", "DA Building", "PR"] },
      { name: "Technical SEO", desc: "Site speed, crawlability, schema markup & Core Web Vitals fixes.", tags: ["Core Web Vitals", "Schema", "Speed"] },
      { name: "Local SEO", desc: "Google Business Profile, local citations & 'near me' rankings.", tags: ["GBP", "Citations", "Maps"] },
      { name: "Mobile SEO", desc: "Mobile-first indexing optimization for Google's mobile-first crawl.", tags: ["Mobile-First", "AMP", "UX"] },
      { name: "E-Commerce SEO", desc: "Product page optimization, category SEO & shopping feed setup.", tags: ["Product SEO", "Shopping", "Category"] },
      { name: "YouTube SEO", desc: "Video titles, descriptions, tags & thumbnail optimization for YouTube search.", tags: ["Video SEO", "Thumbnails", "Tags"] },
      { name: "Website Speed Optimization", desc: "Core Web Vitals, image compression, caching & CDN setup.", tags: ["PageSpeed", "CWV", "CDN"] },
      { name: "Keyword Research & Strategy", desc: "In-depth keyword analysis mapped to your buyer's journey.", tags: ["KW Research", "Intent", "Clusters"] },
      { name: "SEO Audit", desc: "Complete technical + on-page SEO audit with prioritized fix recommendations.", tags: ["Audit", "Report", "Action Plan"] },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: "✍️",
    color: "#a78bfa",
    desc: "Content that ranks, converts & tells your brand story — not just fills pages.",
    services: [
      { name: "Blog Writing", desc: "SEO-optimized, research-backed blog posts that drive organic traffic.", tags: ["SEO Blogs", "Long-Form", "Authority"] },
      { name: "Website Content Writing", desc: "Homepage, about, service & landing page copy that converts.", tags: ["Web Copy", "CRO", "Conversion"] },
      { name: "Copywriting (Ads & Landing Pages)", desc: "High-converting ad copy and landing page scripts for paid campaigns.", tags: ["Ad Copy", "CRO", "Hooks"] },
      { name: "Social Media Content", desc: "Daily content calendars with captions, hooks & CTAs per platform.", tags: ["Calendar", "Captions", "Hooks"] },
      { name: "SEO-Optimized Content", desc: "Content written around search intent with keyword integration.", tags: ["SEO Writing", "Intent", "Ranking"] },
      { name: "Video Content Creation", desc: "YouTube scripts, explainer videos & brand storytelling content.", tags: ["Scripts", "YouTube", "Explainer"] },
      { name: "Reels / Shorts Creation", desc: "Script, shoot coordination & editing for Instagram Reels & YouTube Shorts.", tags: ["Reels", "Shorts", "Viral"] },
      { name: "Podcast Editing & Publishing", desc: "Full podcast post-production — editing, show notes & distribution.", tags: ["Editing", "Distribution", "Show Notes"] },
      { name: "Infographics Design", desc: "Data visualization & infographic design for social sharing & backlinks.", tags: ["Infographics", "Data Viz", "Backlinks"] },
    ],
  },
  {
    id: "ppc",
    label: "PPC & Paid Ads",
    icon: "🎯",
    color: "#f59e0b",
    desc: "Every rupee spent, every click tracked — paid campaigns built for maximum ROAS.",
    services: [
      { name: "Google Search Ads", desc: "Intent-based search campaigns targeting buyers ready to convert.", tags: ["Search", "Intent", "ROAS"] },
      { name: "Google Display Ads", desc: "Visual banner ads across Google's Display Network for brand awareness.", tags: ["Display", "Awareness", "Retargeting"] },
      { name: "Google Shopping Ads", desc: "Product listing ads for e-commerce on Google Shopping.", tags: ["Shopping", "PLAs", "E-commerce"] },
      { name: "YouTube Ads", desc: "In-stream, bumper & discovery ads for video marketing.", tags: ["In-Stream", "Bumper", "Video Ads"] },
      { name: "Facebook & Instagram Ads", desc: "Meta campaigns for lead gen, traffic, awareness & conversions.", tags: ["Meta", "Lead Gen", "Conversions"] },
      { name: "LinkedIn Ads", desc: "Sponsored content, InMail & lead gen forms for B2B targeting.", tags: ["B2B", "InMail", "Lead Forms"] },
      { name: "Remarketing Campaigns", desc: "Re-engage past visitors with custom audiences across platforms.", tags: ["Remarketing", "Custom Audience", "ROAS"] },
      { name: "Conversion Ads", desc: "Bottom-of-funnel ad campaigns optimized for purchases & form fills.", tags: ["CRO", "Purchases", "ROAS"] },
      { name: "Lead Generation Campaigns", desc: "Full-funnel lead gen — from ad to CRM entry — automated.", tags: ["Lead Gen", "Funnel", "CRM"] },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: "🛒",
    color: "#06b6d4",
    desc: "Sell more on Amazon, Flipkart, Shopify & WooCommerce with our e-commerce expertise.",
    services: [
      { name: "Amazon / Flipkart Product SEO", desc: "Optimize product listings for marketplace search algorithms.", tags: ["Amazon SEO", "Flipkart", "Listings"] },
      { name: "Marketplace Ads", desc: "Sponsored product ads on Amazon & Flipkart for immediate visibility.", tags: ["Sponsored", "Amazon Ads", "Marketplace"] },
      { name: "Product Listing Optimization", desc: "Titles, bullets, A+ content & images optimized for conversions.", tags: ["A+ Content", "Conversion", "Listings"] },
      { name: "Ecommerce Store Setup", desc: "Full store setup on Shopify or WooCommerce from scratch.", tags: ["Setup", "Shopify", "WooCommerce"] },
      { name: "Shopify / WooCommerce Setup", desc: "Theme customization, payment gateway & product upload.", tags: ["Shopify", "WooCommerce", "Payment"] },
      { name: "Catalog Management", desc: "Ongoing product catalog updates, pricing & inventory management.", tags: ["Catalog", "Inventory", "Management"] },
    ],
  },
  {
    id: "email",
    label: "Email Marketing",
    icon: "📩",
    color: "#ec4899",
    desc: "Automated email sequences that nurture leads and retain customers on autopilot.",
    services: [
      { name: "Email Automation", desc: "Trigger-based email sequences — welcome, nurture & re-engagement.", tags: ["Automation", "Triggers", "Sequences"] },
      { name: "Newsletter Creation", desc: "Weekly/monthly branded newsletters with curated content & CTAs.", tags: ["Newsletter", "Branding", "CTAs"] },
      { name: "Drip Campaigns", desc: "Multi-step email drip campaigns mapped to your sales funnel.", tags: ["Drip", "Funnel", "Nurture"] },
      { name: "Email List Building", desc: "Lead magnets, opt-in forms & list segmentation strategies.", tags: ["List Growth", "Lead Magnet", "Segmentation"] },
      { name: "MailChimp / SendGrid Setup", desc: "Full platform setup, template design & automation configuration.", tags: ["MailChimp", "SendGrid", "Setup"] },
    ],
  },
  {
    id: "design",
    label: "Graphic Design",
    icon: "🎨",
    color: "#f97316",
    desc: "Scroll-stopping visuals that communicate your brand before a single word is read.",
    services: [
      { name: "Logo Design", desc: "Unique, memorable logo with multiple format deliverables.", tags: ["Logo", "Brand Identity", "Vector"] },
      { name: "Branding Kit", desc: "Complete brand kit — logo, colors, fonts, icons & usage guide.", tags: ["Brand Kit", "Style Guide", "Identity"] },
      { name: "Social Media Posters", desc: "Branded creatives for Instagram, Facebook & LinkedIn posts.", tags: ["Posters", "Creatives", "Social"] },
      { name: "Banner & Flyer Design", desc: "Print-ready and digital banners, flyers & hoarding designs.", tags: ["Banner", "Flyer", "Print"] },
      { name: "Thumbnail Design", desc: "High-CTR YouTube thumbnail designs to improve click-through rates.", tags: ["Thumbnails", "YouTube", "CTR"] },
    ],
  },
  {
    id: "web",
    label: "Web Development",
    icon: "🌐",
    color: "#3b82f6",
    desc: "Fast, SEO-ready websites that turn visitors into leads — not just digital brochures.",
    services: [
      { name: "Business Website", desc: "Professional 5–10 page website for your business with CMS.", tags: ["Business", "CMS", "Responsive"] },
      { name: "Portfolio Website", desc: "Personal brand or agency portfolio with case studies & work samples.", tags: ["Portfolio", "Case Studies", "Personal Brand"] },
      { name: "E-Commerce Website", desc: "Full-stack e-commerce with product pages, cart & payment gateway.", tags: ["E-Commerce", "Payment", "Cart"] },
      { name: "Landing Pages", desc: "High-converting single-page funnels for ads & campaigns.", tags: ["Landing Page", "CRO", "Funnel"] },
      { name: "UI/UX Designing", desc: "Wireframes, prototypes & user experience design for apps & sites.", tags: ["UI/UX", "Figma", "Prototype"] },
      { name: "Website Maintenance", desc: "Monthly backups, security updates, content edits & uptime monitoring.", tags: ["Maintenance", "Security", "Updates"] },
      { name: "Website Redesigning", desc: "Complete overhaul of outdated websites with modern design & performance.", tags: ["Redesign", "Performance", "Modern"] },
    ],
  },
  {
    id: "orm",
    label: "ORM",
    icon: "🛡️",
    color: "#10b981",
    desc: "Protect and build your online reputation — because one bad review shouldn't define you.",
    services: [
      { name: "Google Reviews Management", desc: "Strategy to get more 5-star reviews & suppress negative ones.", tags: ["Reviews", "5-Star", "Google"] },
      { name: "Negative Review Handling", desc: "Professionally respond to & resolve negative feedback online.", tags: ["Crisis", "Response", "Resolution"] },
      { name: "Brand Reputation Building", desc: "Long-term reputation strategy — press, social proof & authority.", tags: ["Brand", "Authority", "Press"] },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "📊",
    color: "#8b5cf6",
    desc: "Know exactly what's working — real-time data, clear reports, zero guesswork.",
    services: [
      { name: "Google Analytics Setup", desc: "GA4 installation, goals, events & conversion tracking setup.", tags: ["GA4", "Goals", "Events"] },
      { name: "Facebook Pixel Setup", desc: "Meta Pixel installation, custom events & audience building.", tags: ["Meta Pixel", "Events", "Audiences"] },
      { name: "Conversion Tracking", desc: "End-to-end conversion tracking across Google, Meta & web.", tags: ["Conversions", "Attribution", "Tracking"] },
      { name: "Performance Reporting", desc: "Monthly data-driven reports with KPIs, insights & action points.", tags: ["Reports", "KPIs", "Insights"] },
    ],
  },
  {
    id: "video",
    label: "Video Production",
    icon: "🎬",
    color: "#ef4444",
    desc: "Professional video content that builds trust — from brand films to social reels.",
    services: [
      { name: "Corporate Videos", desc: "Brand story, about-us & team culture videos for your business.", tags: ["Corporate", "Brand Story", "Culture"] },
      { name: "Product Promo Videos", desc: "Feature-highlight videos for products — for ads & website use.", tags: ["Product", "Promo", "Ads"] },
      { name: "Reels & Shorts", desc: "15–60 second scroll-stopping short-form content for social media.", tags: ["Reels", "Shorts", "Social"] },
      { name: "Business Ad Films", desc: "Full production ad films for TV, YouTube & digital campaigns.", tags: ["Ad Film", "TV", "Production"] },
    ],
  },
  {
    id: "branding",
    label: "Branding & Strategy",
    icon: "🧭",
    color: "#f97316",
    desc: "Build a brand worth remembering — strategy, identity & market positioning.",
    services: [
      { name: "Brand Identity Creation", desc: "Complete brand identity system — visual & verbal brand guidelines.", tags: ["Identity", "Guidelines", "Visual"] },
      { name: "Brand Strategy", desc: "Positioning, messaging, USP definition & competitive differentiation.", tags: ["Positioning", "USP", "Messaging"] },
      { name: "Market Research", desc: "Competitor analysis, audience research & market opportunity mapping.", tags: ["Research", "Competitors", "Audience"] },
      { name: "Marketing Strategy", desc: "Full-funnel digital marketing strategy tailored to your goals.", tags: ["Strategy", "Full-Funnel", "Goals"] },
    ],
  },
];

const AI_CATEGORIES = [
  {
    id: "whatsapp",
    label: "WhatsApp AI",
    icon: "💬",
    color: "#22c55e",
    desc: "AI-powered WhatsApp automation that works 24/7 — reply, qualify & convert leads automatically.",
    services: [
      { name: "WhatsApp AI Bot (Persona-Based)", desc: "Custom AI persona on WhatsApp — Hinglish support, lead capture & memory.", tags: ["AI Bot", "Persona", "Hinglish"] },
      { name: "WhatsApp Marketing Campaigns", desc: "Bulk broadcast messages with personalization & opt-in compliance.", tags: ["Broadcast", "Marketing", "DPDP"] },
      { name: "WhatsApp Broadcast Setup", desc: "Setup and manage broadcast lists for promotions & announcements.", tags: ["Broadcast", "Lists", "Promotions"] },
      { name: "AI Auto-Reply (Instagram/WhatsApp/Facebook)", desc: "Instant AI replies across all chat platforms — unified inbox automation.", tags: ["Auto-Reply", "Multi-Platform", "Inbox"] },
      { name: "WhatsApp Lead Funnel", desc: "Full WhatsApp funnel — ad → DM → qualification → CRM entry.", tags: ["Funnel", "Lead Gen", "CRM"] },
    ],
  },
  {
    id: "n8n",
    label: "n8n & Workflows",
    icon: "⚙️",
    color: "#f97316",
    desc: "Visual no-code automation that connects your tools — CRM, email, sheets, WhatsApp & more.",
    services: [
      { name: "n8n Workflow Setup", desc: "End-to-end n8n workflow design, deployment & cloud hosting.", tags: ["n8n", "Self-Hosted", "Cloud"] },
      { name: "Zapier Automation", desc: "Multi-step Zap creation connecting 5,000+ apps in your stack.", tags: ["Zapier", "Zaps", "Integration"] },
      { name: "Multi-Step Workflow Design", desc: "Complex branching workflows with conditions, loops & error handling.", tags: ["Branching", "Logic", "Error Handling"] },
      { name: "API Integration & Automation", desc: "Custom REST API connections to automate data between platforms.", tags: ["REST API", "Webhooks", "Integration"] },
      { name: "Scheduled Data Automation", desc: "Cron-based automation — daily reports, data sync & batch jobs.", tags: ["Cron", "Scheduling", "Data Sync"] },
      { name: "Form to CRM Automation", desc: "Auto-capture form submissions into CRM with tagging & notifications.", tags: ["Form", "CRM", "Notifications"] },
    ],
  },
  {
    id: "aiagents",
    label: "AI Agents & Bots",
    icon: "🤖",
    color: "#a78bfa",
    desc: "Custom AI agents powered by Gemini, GPT & Claude — built for real Indian business use cases.",
    services: [
      { name: "AI Telecaller System", desc: "Automated voice AI that calls, qualifies & schedules follow-ups.", tags: ["Telecaller", "Voice AI", "Lead Qual"] },
      { name: "Lead Qualification Bot", desc: "Conversational AI that scores & qualifies leads before human handoff.", tags: ["Lead Scoring", "Qualification", "AI"] },
      { name: "Customer Support Bot", desc: "24/7 AI support agent trained on your FAQs, products & policies.", tags: ["Support", "24/7", "FAQ Bot"] },
      { name: "Gemini API Integration", desc: "Google Gemini-powered agents for content, analysis & business tasks.", tags: ["Gemini", "Google AI", "LLM"] },
      { name: "AI Content Agent", desc: "Automated content research, drafting & publishing pipeline using AI.", tags: ["Content AI", "Automation", "Publishing"] },
      { name: "Custom LLM-Powered Bot", desc: "Bespoke chatbot with custom personality, knowledge base & integrations.", tags: ["Custom Bot", "LLM", "Knowledge Base"] },
    ],
  },
  {
    id: "crm",
    label: "CRM & Lead Automation",
    icon: "🔗",
    color: "#06b6d4",
    desc: "Never lose a lead again — automate your entire sales pipeline from capture to close.",
    services: [
      { name: "CRM Setup & Automation", desc: "Full CRM setup (HubSpot, Zoho, Salesforce) with pipeline configuration.", tags: ["HubSpot", "Zoho", "Pipeline"] },
      { name: "Lead Capture Automation", desc: "Multi-source lead capture — web forms, ads, WhatsApp → CRM.", tags: ["Lead Capture", "Multi-Source", "CRM"] },
      { name: "Sales Funnel Automation", desc: "Automated funnel stages — MQL to SQL to closed deal.", tags: ["Funnel", "MQL", "SQL"] },
      { name: "Auto Follow-up System", desc: "Timed email + WhatsApp + SMS follow-up sequences after lead capture.", tags: ["Follow-Up", "Sequences", "Multi-Channel"] },
      { name: "Pipeline Management", desc: "Deal tracking, stage automation & sales reporting dashboards.", tags: ["Pipeline", "Deals", "Dashboard"] },
      { name: "Lead Scoring System", desc: "Behavioral scoring model to prioritize high-intent leads for sales team.", tags: ["Scoring", "Intent", "Prioritization"] },
    ],
  },
  {
    id: "chatautomation",
    label: "Chat Automation",
    icon: "💡",
    color: "#ec4899",
    desc: "One unified AI brain across Instagram, Facebook & WhatsApp — never miss a message.",
    services: [
      { name: "Instagram DM Automation", desc: "Auto-replies to story mentions, DMs & comment triggers on Instagram.", tags: ["Instagram", "DM", "Story Triggers"] },
      { name: "Facebook Messenger Bot", desc: "AI Messenger bot for page DMs, lead gen & customer support.", tags: ["Messenger", "Facebook", "Lead Gen"] },
      { name: "Multi-Platform Chat Automation", desc: "Single AI agent managing WhatsApp + Instagram + Messenger in one flow.", tags: ["Multi-Platform", "Unified", "Omnichannel"] },
      { name: "Chatbot Integration", desc: "Integrate third-party chatbots (Landbot, Tidio, ManyChat) into your stack.", tags: ["ManyChat", "Tidio", "Landbot"] },
      { name: "AI Chat Agent with Memory", desc: "Context-aware AI that remembers past conversations for personalized replies.", tags: ["Memory", "Context", "Personalization"] },
    ],
  },
  {
    id: "analytics-ai",
    label: "Analytics & Tracking",
    icon: "📈",
    color: "#8b5cf6",
    desc: "Accurate data infrastructure so every marketing decision is backed by real numbers.",
    services: [
      { name: "GA4 Setup & Full Audit", desc: "Complete GA4 migration, event setup & conversion goal configuration.", tags: ["GA4", "Events", "Conversions"] },
      { name: "Facebook Pixel & CAPI Setup", desc: "Meta Pixel + Conversions API for server-side tracking accuracy.", tags: ["Pixel", "CAPI", "Server-Side"] },
      { name: "Conversion Tracking (Cross-Platform)", desc: "Unified conversion tracking across Google, Meta & organic channels.", tags: ["Attribution", "Cross-Platform", "Funnels"] },
      { name: "Custom Dashboard Setup", desc: "Looker Studio / Google Sheets dashboards with live data visualization.", tags: ["Looker Studio", "Dashboard", "Live Data"] },
      { name: "Performance Reporting", desc: "Monthly automated reports — traffic, leads, ROAS & growth metrics.", tags: ["Reports", "ROAS", "Growth"] },
    ],
  },
  {
    id: "custom-dev",
    label: "Custom Dev & Tools",
    icon: "🛠️",
    color: "#f59e0b",
    desc: "Bespoke tools, bots & automation systems built exactly for your business processes.",
    services: [
      { name: "Starter Automation Bot", desc: "Automate one core business task with basic workflow & 1 app integration.", tags: ["Starter", "1 Integration", "Quick Setup"] },
      { name: "Business Pro Automation Suite", desc: "Complex multi-step automation with AI telecaller & 3 app integrations.", tags: ["Pro", "AI Telecaller", "Multi-App"] },
      { name: "Enterprise Automation Suite", desc: "End-to-end process automation, custom UI/dashboard & dedicated support.", tags: ["Enterprise", "Custom UI", "Dedicated"] },
      { name: "Custom API Development", desc: "REST APIs built to connect your business tools with custom logic.", tags: ["REST API", "Custom Logic", "Integration"] },
      { name: "React / Next.js Website", desc: "High-performance web apps built with modern React & Next.js stack.", tags: ["React", "Next.js", "Performance"] },
      { name: "Database Automation", desc: "Google Sheets, Airtable & Firebase-based automated database workflows.", tags: ["Firebase", "Airtable", "Google Sheets"] },
    ],
  },
];

/* ─── Helpers ─────────────────────────────────────────────────────────── */
function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isHi = lang === 'hi';
  return {
    title: isHi ? "इंदौर में डिजिटल मार्केटिंग और ऑटोमेशन सेवाएं" : "Digital Marketing & Automation in Indore",
    description: isHi
      ? "इंदौर की सर्वश्रेष्ठ डिजिटल मार्केटिंग और ऑटोमेशन सेवाएं। SEO, मेटा विज्ञापन, AI चैटबॉट्स और CRM ऑटोमेशन के साथ अपने व्यवसाय को बढ़ाएं।"
      : "Indore's best digital marketing and automation services. Grow your business with SEO, Meta Ads, AI chatbots, and CRM automation.",
    alternates: {
      canonical: `https://adsverse.in/${lang}/our-services`,
      languages: {
        'en': 'https://adsverse.in/en/our-services',
        'hi': 'https://adsverse.in/hi/our-services',
      },
    },
  };
}

/* ─── Main Component ──────────────────────────────────────────────────── */
export default function OurServicesPage({ params: { lang } }: { params: { lang: string } }) {
  const isHi = lang === 'hi';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Marketing & Business Automation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "AdsVerse",
      "image": "https://adsverse.in/images/logo-white.webp",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Vijay Nagar",
        "addressLocality": "Indore",
        "addressRegion": "MP",
        "postalCode": "452010",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Indore"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* ── HERO ── */}
      <div className="relative overflow-hidden bg-background py-20 lg:py-32 border-b border-primary/10">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, var(--primary) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-6 py-1 px-4 border-primary/20 text-primary font-bold tracking-wider uppercase bg-primary/5">
            AI-First Agency · Vijay Nagar, Indore
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-headline text-foreground mb-6 leading-tight">
            One Agency.<br />
            <span className="text-primary italic">Every Service</span> You Need.
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed mb-10">
            {isHi 
              ? "डिजिटल मार्केटिंग से लेके व्हाट्सएप एआई बॉट्स तक — इंदौर के SMBs के लिए कंप्लीट डिजिटल इकोसिस्टम एक ही जगह।"
              : "From digital marketing to WhatsApp AI bots — a complete digital ecosystem for Indore's SMBs in one place."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-xl px-8 py-6 text-lg font-bold">
              <Link href="/contact">Get Free Strategy Call <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8 py-6 text-lg font-bold border-primary/20 hover:bg-primary/5">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="border-b border-primary/10 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary/10">
            {[
              { value: "50+", label: "Clients Served", icon: <Users className="w-5 h-5 text-primary" /> },
              { value: "70+", label: "Services Offered", icon: <Zap className="w-5 h-5 text-primary" /> },
              { value: "3x", label: "Avg. ROAS Delivered", icon: <TrendingUp className="w-5 h-5 text-primary" /> },
              { value: "4.9★", label: "Google Rating", icon: <Star className="w-5 h-5 text-primary" /> }
            ].map((stat, i) => (
              <div key={i} className="py-8 text-center flex flex-col items-center justify-center">
                <div className="mb-2">{stat.icon}</div>
                <div className="text-3xl font-black font-headline text-primary leading-none">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT SECTION ── */}
      <div className="container mx-auto py-16 px-4">
        <Tabs defaultValue="dm" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 mb-16 p-1 bg-muted/30 rounded-2xl border border-primary/5">
            <TabsTrigger value="dm" className="text-lg py-4 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all font-headline">
              <TrendingUp className="mr-2 h-5 w-5" /> Digital Marketing
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-lg py-4 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all font-headline">
              <Zap className="mr-2 h-5 w-5" /> AI & Automation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dm" className="mt-0 animate-in fade-in duration-700">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold font-headline text-foreground mb-4">Complete Digital Marketing Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {isHi 
                  ? "सब कुछ इन-हाउस — कोई आउटसोर्सिंग नहीं, कोई बहाना नहीं। 12 विशिष्ट श्रेणियों में 70+ सेवाएँ।"
                  : "Everything in-house — no outsourcing, no excuses. 70+ services across 12 specializations."}
              </p>
            </div>

            <ServicesGrid categories={DM_CATEGORIES} />
          </TabsContent>

          <TabsContent value="ai" className="mt-0 animate-in fade-in duration-700">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold font-headline text-foreground mb-4">AI & Automation Hub</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {isHi 
                  ? "n8n, Gemini API, व्हाट्सएप बॉट्स, AI टेलीकॉलर्स — भारतीय SMBs के लिए बनाया गया बिजनेस ऑटोमेशन।"
                  : "n8n, Gemini API, WhatsApp bots, AI Telecallers — business automation built for Indian SMBs."}
              </p>
            </div>

            <ServicesGrid categories={AI_CATEGORIES} />
          </TabsContent>
        </Tabs>

        {/* ── CTA BANNER ── */}
        <section className="mt-32">
          <div className="relative rounded-[2rem] overflow-hidden bg-primary p-12 lg:p-20 text-white text-center shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold font-headline mb-6">Can't decide which service to start with?</h2>
              <p className="text-xl opacity-90 mb-10 leading-relaxed">
                {isHi 
                  ? "फ्री 30-मिनट की स्ट्रेटजी कॉल में हम आपके बिजनेस का विश्लेषण करके सटीक रोडमैप बनाते हैं — कोई सेल्स पिच नहीं, बस स्पष्टता।"
                  : "In a free 30-min strategy call, we analyze your business and build an exact roadmap — no sales pitch, just clarity."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="rounded-xl px-10 py-7 text-lg font-bold text-primary">
                  <Link href="/contact">Book Free Consultation <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl px-10 py-7 text-lg font-bold border-white/30 hover:bg-white/10">
                  <Link href="/pricing">See All Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── AI INSIGHTS ── */}
        <section className="mt-32 max-w-4xl mx-auto">
          <AISearchInsights 
            title="Digital Marketing & Automation ROI"
            insights={[
              { title: "Cost Efficiency", description: "AI-driven lead qualification reduces cost-per-lead by up to 40% in the current 2026 market landscape." },
              { title: "Local Impact", description: "Hyper-local SEO in Indore is the primary driver for high-intent queries in real estate and specialized retail." },
              { title: "Scalability", description: "Multi-channel automation (WhatsApp + Meta) ensures 24/7 engagement without scaling operational headcount." }
            ]}
            takeaways={[
              "40% Lower CPL",
              "Indore SEO Focus",
              "24/7 AI Engagement"
            ]}
          />
        </section>
      </div>
    </>
  );
}

function ServicesGrid({ categories }: { categories: typeof DM_CATEGORIES }) {
  return (
    <div className="space-y-24">
      {categories.map((cat) => (
        <div key={cat.id} id={cat.id} className="scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-primary/10 pb-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-primary/5" 
                     style={{ backgroundColor: hexToRgba(cat.color, 0.1), color: cat.color }}>
                  {cat.icon}
                </div>
                <h3 className="text-3xl font-extrabold font-headline text-foreground">{cat.label}</h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {cat.desc}
              </p>
            </div>
            <Badge variant="secondary" className="h-fit py-1.5 px-4 rounded-full bg-primary/5 text-primary border-primary/10 font-bold">
              {cat.services.length} Services
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.services.map((service, idx) => (
              <Card key={idx} className="group bg-card/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 rounded-2xl hover:shadow-xl hover:shadow-primary/5 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" 
                     style={{ backgroundColor: cat.color }} />
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold font-headline group-hover:text-primary transition-colors leading-tight">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow space-y-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-primary/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 pb-6">
                  <Button variant="link" className="p-0 h-auto font-bold text-primary hover:no-underline group-hover:translate-x-1 transition-transform" asChild>
                    <Link href="/contact">
                      Get Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
