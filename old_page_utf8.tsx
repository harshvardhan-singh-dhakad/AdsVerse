"use client";

import { useState } from "react";
import { ArrowRight, Zap, TrendingUp, Star, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
   COMPLETE SERVICES DATA
ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const DM_CATEGORIES = [
  {
    id: "smm",
    label: "Social Media",
    icon: "≡ƒô▒",
    color: "#e91e8c",
    desc: "Build brand presence across every major social platform with data-backed strategies.",
    services: [
      { name: "Facebook Marketing", desc: "Targeted campaigns, page management & community building on Facebook.", tags: ["Organic", "Paid", "Community"] },
      { name: "Instagram Marketing", desc: "Reels, stories, grid content & growth strategies for Instagram.", tags: ["Reels", "Stories", "Growth"] },
      { name: "LinkedIn Marketing", desc: "B2B brand building, thought leadership & professional outreach.", tags: ["B2B", "Lead Gen", "Branding"] },
      { name: "Twitter (X) Marketing", desc: "Real-time brand engagement, trending content & audience growth.", tags: ["Trending", "Engagement", "Ads"] },
      { name: "YouTube Marketing", desc: "Channel strategy, SEO & subscriber growth for YouTube.", tags: ["YouTube SEO", "Subscribers", "Strategy"] },
      { name: "Social Media Account Management", desc: "Full-service management of all your social accounts ΓÇö posting, replies & analytics.", tags: ["Management", "Scheduling", "Analytics"] },
      { name: "Social Media Content Creation", desc: "Platform-specific content ΓÇö captions, creatives, carousels & video scripts.", tags: ["Creatives", "Captions", "Carousels"] },
      { name: "Social Media Ads Campaigns", desc: "Paid campaigns across Facebook, Instagram, LinkedIn & Twitter.", tags: ["Paid Ads", "Targeting", "ROAS"] },
      { name: "Influencer Marketing", desc: "Connect with relevant influencers to amplify your brand reach.", tags: ["Influencer", "UGC", "Reach"] },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    icon: "≡ƒöì",
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
    icon: "Γ£ì∩╕Å",
    color: "#a78bfa",
    desc: "Content that ranks, converts & tells your brand story ΓÇö not just fills pages.",
    services: [
      { name: "Blog Writing", desc: "SEO-optimized, research-backed blog posts that drive organic traffic.", tags: ["SEO Blogs", "Long-Form", "Authority"] },
      { name: "Website Content Writing", desc: "Homepage, about, service & landing page copy that converts.", tags: ["Web Copy", "CRO", "Conversion"] },
      { name: "Copywriting (Ads & Landing Pages)", desc: "High-converting ad copy and landing page scripts for paid campaigns.", tags: ["Ad Copy", "CRO", "Hooks"] },
      { name: "Social Media Content", desc: "Daily content calendars with captions, hooks & CTAs per platform.", tags: ["Calendar", "Captions", "Hooks"] },
      { name: "SEO-Optimized Content", desc: "Content written around search intent with keyword integration.", tags: ["SEO Writing", "Intent", "Ranking"] },
      { name: "Video Content Creation", desc: "YouTube scripts, explainer videos & brand storytelling content.", tags: ["Scripts", "YouTube", "Explainer"] },
      { name: "Reels / Shorts Creation", desc: "Script, shoot coordination & editing for Instagram Reels & YouTube Shorts.", tags: ["Reels", "Shorts", "Viral"] },
      { name: "Podcast Editing & Publishing", desc: "Full podcast post-production ΓÇö editing, show notes & distribution.", tags: ["Editing", "Distribution", "Show Notes"] },
      { name: "Infographics Design", desc: "Data visualization & infographic design for social sharing & backlinks.", tags: ["Infographics", "Data Viz", "Backlinks"] },
    ],
  },
  {
    id: "ppc",
    label: "PPC & Paid Ads",
    icon: "≡ƒÄ»",
    color: "#f59e0b",
    desc: "Every rupee spent, every click tracked ΓÇö paid campaigns built for maximum ROAS.",
    services: [
      { name: "Google Search Ads", desc: "Intent-based search campaigns targeting buyers ready to convert.", tags: ["Search", "Intent", "ROAS"] },
      { name: "Google Display Ads", desc: "Visual banner ads across Google's Display Network for brand awareness.", tags: ["Display", "Awareness", "Retargeting"] },
      { name: "Google Shopping Ads", desc: "Product listing ads for e-commerce on Google Shopping.", tags: ["Shopping", "PLAs", "E-commerce"] },
      { name: "YouTube Ads", desc: "In-stream, bumper & discovery ads for video marketing.", tags: ["In-Stream", "Bumper", "Video Ads"] },
      { name: "Facebook & Instagram Ads", desc: "Meta campaigns for lead gen, traffic, awareness & conversions.", tags: ["Meta", "Lead Gen", "Conversions"] },
      { name: "LinkedIn Ads", desc: "Sponsored content, InMail & lead gen forms for B2B targeting.", tags: ["B2B", "InMail", "Lead Forms"] },
      { name: "Remarketing Campaigns", desc: "Re-engage past visitors with custom audiences across platforms.", tags: ["Remarketing", "Custom Audience", "ROAS"] },
      { name: "Conversion Ads", desc: "Bottom-of-funnel ad campaigns optimized for purchases & form fills.", tags: ["CRO", "Purchases", "ROAS"] },
      { name: "Lead Generation Campaigns", desc: "Full-funnel lead gen ΓÇö from ad to CRM entry ΓÇö automated.", tags: ["Lead Gen", "Funnel", "CRM"] },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: "≡ƒ¢Æ",
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
    icon: "≡ƒô⌐",
    color: "#ec4899",
    desc: "Automated email sequences that nurture leads and retain customers on autopilot.",
    services: [
      { name: "Email Automation", desc: "Trigger-based email sequences ΓÇö welcome, nurture & re-engagement.", tags: ["Automation", "Triggers", "Sequences"] },
      { name: "Newsletter Creation", desc: "Weekly/monthly branded newsletters with curated content & CTAs.", tags: ["Newsletter", "Branding", "CTAs"] },
      { name: "Drip Campaigns", desc: "Multi-step email drip campaigns mapped to your sales funnel.", tags: ["Drip", "Funnel", "Nurture"] },
      { name: "Email List Building", desc: "Lead magnets, opt-in forms & list segmentation strategies.", tags: ["List Growth", "Lead Magnet", "Segmentation"] },
      { name: "MailChimp / SendGrid Setup", desc: "Full platform setup, template design & automation configuration.", tags: ["MailChimp", "SendGrid", "Setup"] },
    ],
  },
  {
    id: "design",
    label: "Graphic Design",
    icon: "≡ƒÄ¿",
    color: "#f97316",
    desc: "Scroll-stopping visuals that communicate your brand before a single word is read.",
    services: [
      { name: "Logo Design", desc: "Unique, memorable logo with multiple format deliverables.", tags: ["Logo", "Brand Identity", "Vector"] },
      { name: "Branding Kit", desc: "Complete brand kit ΓÇö logo, colors, fonts, icons & usage guide.", tags: ["Brand Kit", "Style Guide", "Identity"] },
      { name: "Social Media Posters", desc: "Branded creatives for Instagram, Facebook & LinkedIn posts.", tags: ["Posters", "Creatives", "Social"] },
      { name: "Banner & Flyer Design", desc: "Print-ready and digital banners, flyers & hoarding designs.", tags: ["Banner", "Flyer", "Print"] },
      { name: "Thumbnail Design", desc: "High-CTR YouTube thumbnail designs to improve click-through rates.", tags: ["Thumbnails", "YouTube", "CTR"] },
    ],
  },
  {
    id: "web",
    label: "Web Development",
    icon: "≡ƒîÉ",
    color: "#3b82f6",
    desc: "Fast, SEO-ready websites that turn visitors into leads ΓÇö not just digital brochures.",
    services: [
      { name: "Business Website", desc: "Professional 5ΓÇô10 page website for your business with CMS.", tags: ["Business", "CMS", "Responsive"] },
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
    icon: "≡ƒ¢í∩╕Å",
    color: "#10b981",
    desc: "Protect and build your online reputation ΓÇö because one bad review shouldn't define you.",
    services: [
      { name: "Google Reviews Management", desc: "Strategy to get more 5-star reviews & suppress negative ones.", tags: ["Reviews", "5-Star", "Google"] },
      { name: "Negative Review Handling", desc: "Professionally respond to & resolve negative feedback online.", tags: ["Crisis", "Response", "Resolution"] },
      { name: "Brand Reputation Building", desc: "Long-term reputation strategy ΓÇö press, social proof & authority.", tags: ["Brand", "Authority", "Press"] },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "≡ƒôè",
    color: "#8b5cf6",
    desc: "Know exactly what's working ΓÇö real-time data, clear reports, zero guesswork.",
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
    icon: "≡ƒÄ¼",
    color: "#ef4444",
    desc: "Professional video content that builds trust ΓÇö from brand films to social reels.",
    services: [
      { name: "Corporate Videos", desc: "Brand story, about-us & team culture videos for your business.", tags: ["Corporate", "Brand Story", "Culture"] },
      { name: "Product Promo Videos", desc: "Feature-highlight videos for products ΓÇö for ads & website use.", tags: ["Product", "Promo", "Ads"] },
      { name: "Reels & Shorts", desc: "15ΓÇô60 second scroll-stopping short-form content for social media.", tags: ["Reels", "Shorts", "Social"] },
      { name: "Business Ad Films", desc: "Full production ad films for TV, YouTube & digital campaigns.", tags: ["Ad Film", "TV", "Production"] },
    ],
  },
  {
    id: "branding",
    label: "Branding & Strategy",
    icon: "≡ƒº¡",
    color: "#f97316",
    desc: "Build a brand worth remembering ΓÇö strategy, identity & market positioning.",
    services: [
      { name: "Brand Identity Creation", desc: "Complete brand identity system ΓÇö visual & verbal brand guidelines.", tags: ["Identity", "Guidelines", "Visual"] },
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
    icon: "≡ƒÆ¼",
    color: "#22c55e",
    desc: "AI-powered WhatsApp automation that works 24/7 ΓÇö reply, qualify & convert leads automatically.",
    services: [
      { name: "WhatsApp AI Bot (Persona-Based)", desc: "Custom AI persona on WhatsApp ΓÇö Hinglish support, lead capture & memory.", tags: ["AI Bot", "Persona", "Hinglish"] },
      { name: "WhatsApp Marketing Campaigns", desc: "Bulk broadcast messages with personalization & opt-in compliance.", tags: ["Broadcast", "Marketing", "DPDP"] },
      { name: "WhatsApp Broadcast Setup", desc: "Setup and manage broadcast lists for promotions & announcements.", tags: ["Broadcast", "Lists", "Promotions"] },
      { name: "AI Auto-Reply (Instagram/WhatsApp/Facebook)", desc: "Instant AI replies across all chat platforms ΓÇö unified inbox automation.", tags: ["Auto-Reply", "Multi-Platform", "Inbox"] },
      { name: "WhatsApp Lead Funnel", desc: "Full WhatsApp funnel ΓÇö ad ΓåÆ DM ΓåÆ qualification ΓåÆ CRM entry.", tags: ["Funnel", "Lead Gen", "CRM"] },
    ],
  },
  {
    id: "n8n",
    label: "n8n & Workflows",
    icon: "ΓÜÖ∩╕Å",
    color: "#f97316",
    desc: "Visual no-code automation that connects your tools ΓÇö CRM, email, sheets, WhatsApp & more.",
    services: [
      { name: "n8n Workflow Setup", desc: "End-to-end n8n workflow design, deployment & cloud hosting.", tags: ["n8n", "Self-Hosted", "Cloud"] },
      { name: "Zapier Automation", desc: "Multi-step Zap creation connecting 5,000+ apps in your stack.", tags: ["Zapier", "Zaps", "Integration"] },
      { name: "Multi-Step Workflow Design", desc: "Complex branching workflows with conditions, loops & error handling.", tags: ["Branching", "Logic", "Error Handling"] },
      { name: "API Integration & Automation", desc: "Custom REST API connections to automate data between platforms.", tags: ["REST API", "Webhooks", "Integration"] },
      { name: "Scheduled Data Automation", desc: "Cron-based automation ΓÇö daily reports, data sync & batch jobs.", tags: ["Cron", "Scheduling", "Data Sync"] },
      { name: "Form to CRM Automation", desc: "Auto-capture form submissions into CRM with tagging & notifications.", tags: ["Form", "CRM", "Notifications"] },
    ],
  },
  {
    id: "aiagents",
    label: "AI Agents & Bots",
    icon: "≡ƒñû",
    color: "#a78bfa",
    desc: "Custom AI agents powered by Gemini, GPT & Claude ΓÇö built for real Indian business use cases.",
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
    icon: "≡ƒöù",
    color: "#06b6d4",
    desc: "Never lose a lead again ΓÇö automate your entire sales pipeline from capture to close.",
    services: [
      { name: "CRM Setup & Automation", desc: "Full CRM setup (HubSpot, Zoho, Salesforce) with pipeline configuration.", tags: ["HubSpot", "Zoho", "Pipeline"] },
      { name: "Lead Capture Automation", desc: "Multi-source lead capture ΓÇö web forms, ads, WhatsApp ΓåÆ CRM.", tags: ["Lead Capture", "Multi-Source", "CRM"] },
      { name: "Sales Funnel Automation", desc: "Automated funnel stages ΓÇö MQL to SQL to closed deal.", tags: ["Funnel", "MQL", "SQL"] },
      { name: "Auto Follow-up System", desc: "Timed email + WhatsApp + SMS follow-up sequences after lead capture.", tags: ["Follow-Up", "Sequences", "Multi-Channel"] },
      { name: "Pipeline Management", desc: "Deal tracking, stage automation & sales reporting dashboards.", tags: ["Pipeline", "Deals", "Dashboard"] },
      { name: "Lead Scoring System", desc: "Behavioral scoring model to prioritize high-intent leads for sales team.", tags: ["Scoring", "Intent", "Prioritization"] },
    ],
  },
  {
    id: "chatautomation",
    label: "Chat Automation",
    icon: "≡ƒÆí",
    color: "#ec4899",
    desc: "One unified AI brain across Instagram, Facebook & WhatsApp ΓÇö never miss a message.",
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
    icon: "≡ƒôê",
    color: "#8b5cf6",
    desc: "Accurate data infrastructure so every marketing decision is backed by real numbers.",
    services: [
      { name: "GA4 Setup & Full Audit", desc: "Complete GA4 migration, event setup & conversion goal configuration.", tags: ["GA4", "Events", "Conversions"] },
      { name: "Facebook Pixel & CAPI Setup", desc: "Meta Pixel + Conversions API for server-side tracking accuracy.", tags: ["Pixel", "CAPI", "Server-Side"] },
      { name: "Conversion Tracking (Cross-Platform)", desc: "Unified conversion tracking across Google, Meta & organic channels.", tags: ["Attribution", "Cross-Platform", "Funnels"] },
      { name: "Custom Dashboard Setup", desc: "Looker Studio / Google Sheets dashboards with live data visualization.", tags: ["Looker Studio", "Dashboard", "Live Data"] },
      { name: "Performance Reporting", desc: "Monthly automated reports ΓÇö traffic, leads, ROAS & growth metrics.", tags: ["Reports", "ROAS", "Growth"] },
    ],
  },
  {
    id: "custom-dev",
    label: "Custom Dev & Tools",
    icon: "≡ƒ¢á∩╕Å",
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

/* ΓöÇΓöÇΓöÇ Helpers ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

const CSS = `
:root{
  --bg:#ffffff;--bg2:#f8fafc;--bg3:#f1f5f9;--bg4:#e2e8f0;
  --tx1:#0f172a;--tx2:#334155;--tx3:#64748b;--tx4:#94a3b8;
  --bd:#e2e8f0;--bd2:#cbd5e1;
  --or:#f97316;--or-dim:rgba(249,115,22,.08);--or-glow:rgba(249,115,22,.15);
  --r:12px;--rsm:8px;--rxl:20px;
  --sh:0 4px 12px rgba(0,0,0,.05);
}
.dark{
  --bg:#0d1117;--bg2:#161b22;--bg3:#1c2128;--bg4:#21262d;
  --tx1:#e6edf3;--tx2:#c9d1d9;--tx3:#8b949e;--tx4:#6e7681;
  --bd:#30363d;--bd2:#21262d;
  --or:#f97316;--or-dim:rgba(249,115,22,.1);--or-glow:rgba(249,115,22,.22);
  --sh:0 4px 24px rgba(0,0,0,.5);
}
.services-page{background:transparent;color:var(--tx1);font-family:var(--font-inter), sans-serif;font-size:15px;line-height:1.7;min-height:100vh;width:100%;max-width:100vw;overflow-x:hidden;display:block}
.syne-font{font-family:var(--font-playfair-display), serif}

/* Layout */
.wrap{max-width:1180px;margin:0 auto;padding:0 20px}
.section{padding:64px 0}

/* ΓöÇΓöÇ HERO ΓöÇΓöÇ */
.hero{
  position:relative;overflow:hidden;
  padding:80px 20px 64px;text-align:center;
  background:radial-gradient(ellipse 90% 60% at 50% -10%,rgba(249,115,22,.13) 0%,transparent 65%);
  border-bottom:1px solid var(--bd);
}
.hero-dots{
  position:absolute;inset:0;opacity:.35;
  background-image:radial-gradient(circle,#f97316 1px,transparent 1px);
  background-size:36px 36px;
  mask-image:radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 80%);
}
.hero-pill{
  display:inline-flex;align-items:center;gap:8px;
  padding:5px 16px;border-radius:var(--rxl);
  background:var(--or-dim);border:1px solid rgba(249,115,22,.28);
  font-size:12px;font-weight:600;color:var(--or);letter-spacing:.6px;
  text-transform:uppercase;margin-bottom:22px;
}
.hero-pill::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--or);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
.hero h1{
  font-size:clamp(2.2rem,5.5vw,3.6rem);font-weight:800;line-height:1.08;
  margin-bottom:18px;letter-spacing:-.5px;font-family:'Syne',sans-serif;
}
.hero h1 em{color:var(--or);font-style:normal}
.hero-sub{font-size:17px;color:var(--tx2);max-width:580px;margin:0 auto 36px;line-height:1.65}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

/* Stats */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-bottom:1px solid var(--bd)}
.stat{background:var(--bg);padding:22px 20px;text-align:center;border-right:1px solid var(--bd)}
.stat:last-child{border-right:none}
.stat-n{font-family:var(--font-playfair-display), serif;font-size:26px;font-weight:800;color:var(--or);line-height:1}
.stat-l{font-size:12px;color:var(--tx3);margin-top:4px;font-weight:500}
@media(max-width:560px){
  .stats{grid-template-columns:repeat(2,1fr);width:100%}
  .stat{padding:16px 10px;border-right:1px solid var(--bd)}
  .stat:nth-child(2n){border-right:none}
  .stat:nth-child(3), .stat:nth-child(4){border-top:1px solid var(--bd)}
  .stat-n{font-size:20px}
  .stat-l{font-size:10px;line-height:1.2}
}

/* ΓöÇΓöÇ MAIN TABS (DM vs AI) ΓöÇΓöÇ */
.main-tabs{
  display:flex;background:var(--bg2);border-bottom:2px solid var(--bd);
  position:sticky;top:0;z-index:100;
  width:100%;max-width:100vw;
}
.main-tab{
  flex:1;padding:18px 24px;font-family:var(--font-playfair-display), serif;font-size:15px;font-weight:700;
  border:none;background:transparent;color:var(--tx3);cursor:pointer;
  border-bottom:3px solid transparent;margin-bottom:-2px;transition:all .2s;
  display:flex;align-items:center;justify-content:center;gap:8px;
}
.main-tab:hover{color:var(--tx1)}
.main-tab.on{color:var(--or);border-bottom-color:var(--or);background:rgba(249,115,22,.04)}
.tab-count{
  background:var(--bg3);border:1px solid var(--bd);color:var(--tx4);
  font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;
}
.main-tab.on .tab-count{background:var(--or-dim);border-color:rgba(249,115,22,.3);color:var(--or)}

/* ΓöÇΓöÇ CAT FILTER STRIP ΓöÇΓöÇ */
.cat-strip-wrap{
  background:var(--bg2);border-bottom:1px solid var(--bd);
  position:sticky;top:56px;z-index:99;
  overflow:hidden;
  width:100%;max-width:100vw;
}
.cat-strip-wrap::after {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 40px;
  background: linear-gradient(to left, var(--bg2), transparent);
  pointer-events: none;
  z-index: 2;
}
.cat-strip{
  display:flex;gap:8px;padding:12px 40px 12px 20px;
  overflow-x:auto;-webkit-overflow-scrolling:touch;
  scrollbar-width:none;
  position:relative;
}
.cat-strip::-webkit-scrollbar{display:none}
.cat-btn{
  flex-shrink:0;padding:8px 16px;border-radius:var(--rsm);
  border:1.5px solid var(--bd);background:transparent;
  color:var(--tx3);font-size:13px;font-weight:600;cursor:pointer;
  transition:all .2s;font-family:var(--font-inter), sans-serif;
  display:flex;align-items:center;gap:6px;white-space:nowrap;
}
.cat-btn:hover{border-color:var(--or);color:var(--or)}
.cat-btn.on{background:var(--or);border-color:var(--or);color:#fff}
.cat-icon{font-size:14px}

/* ΓöÇΓöÇ CATEGORY SECTION ΓöÇΓöÇ */
.cat-section{margin-bottom:56px}
.cat-header{
  display:flex;align-items:center;gap:16px;
  padding:20px 0 20px;margin-bottom:24px;
  border-bottom:2px solid var(--bd);
  position:relative;
}
.cat-header::after{
  content:'';position:absolute;bottom:-2px;left:0;width:60px;height:2px;
  background:var(--cat-color, var(--or));
}
.cat-icon-big{
  width:44px;height:44px;border-radius:10px;
  background:var(--cat-dim, var(--or-dim));
  border:1.5px solid var(--cat-bd, rgba(249,115,22,.25));
  display:flex;align-items:center;justify-content:center;
  font-size:20px;flex-shrink:0;
}
.cat-info{flex:1}
.cat-title{font-family:var(--font-playfair-display), serif;font-size:18px;font-weight:800;color:var(--tx1);line-height:1}
.cat-desc{font-size:13px;color:var(--tx3);margin-top:4px}
.cat-service-count{
  font-size:12px;font-weight:700;color:var(--cat-color,var(--or));
  background:var(--cat-dim,var(--or-dim));
  border:1px solid var(--cat-bd,rgba(249,115,22,.2));
  padding:3px 12px;border-radius:20px;
}

/* ΓöÇΓöÇ SERVICE CARD ΓöÇΓöÇ */
.svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(272px,1fr));gap:16px}
.svc{
  background:var(--bg2);border:1.5px solid var(--bd2);border-radius:var(--r);
  padding:22px;position:relative;overflow:hidden;
  transition:border-color .2s,transform .2s,box-shadow .2s;
}
.svc::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--cat-color,var(--or));
  transform:scaleX(0);transform-origin:left;transition:transform .3s;
}
.svc:hover{
  border-color:var(--cat-bd2,rgba(249,115,22,.35));
  transform:translateY(-3px);
  box-shadow:0 12px 32px rgba(0,0,0,.45);
}
.svc:hover::before{transform:scaleX(1)}
.svc-name{
  font-family:var(--font-playfair-display), serif;font-size:14.5px;font-weight:700;
  color:var(--tx1);margin-bottom:8px;line-height:1.3;
}
.svc-desc{font-size:13px;color:var(--tx2);line-height:1.6;margin-bottom:14px}
.svc-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px}
.svc-tag{
  padding:2px 9px;background:var(--bg3);
  border:1px solid var(--bd);border-radius:20px;
  font-size:11px;color:var(--tx4);font-weight:500;
}
.svc-link{
  display:inline-flex;align-items:center;gap:5px;
  font-size:12.5px;font-weight:700;color:var(--cat-color,var(--or));
  transition:gap .15s;
}
.svc-link:hover{gap:9px}

/* ΓöÇΓöÇ CTA BANNER ΓöÇΓöÇ */
.cta{
  border-radius:var(--r);
  background:linear-gradient(135deg,rgba(249,115,22,.12) 0%,rgba(249,115,22,.04) 100%);
  border:1.5px solid rgba(249,115,22,.22);
  padding:52px 40px;text-align:center;margin:40px 0 64px;
  position:relative;overflow:hidden;
}
.cta::before{
  content:'';position:absolute;inset:0;opacity:.03;
  background:repeating-linear-gradient(45deg,#f97316 0,#f97316 1px,transparent 0,transparent 50%);
  background-size:12px 12px;
}
.cta h2{font-size:1.7rem;font-weight:800;margin-bottom:10px;position:relative;z-index:1;font-family:var(--font-playfair-display), serif}
.cta p{color:var(--tx2);margin-bottom:28px;max-width:460px;margin-left:auto;margin-right:auto;position:relative;z-index:1}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}

@media(max-width:768px){
  .hero{padding:56px 16px 44px}
  .main-tabs{top:56px}
  .cat-strip-wrap{top:110px}
  .main-tab{padding:14px 10px;font-size:13px}
  .main-tab span.label{display:none}
  .section{padding:44px 0}
  .cta{padding:32px 16px}
  .svc-grid{grid-template-columns:1fr}
}
`;

function CatSection({ cat }: { cat: typeof DM_CATEGORIES[0] }) {
  const styleVars = {
    "--cat-color": cat.color,
    "--cat-dim": hexToRgba(cat.color, 0.1),
    "--cat-bd": hexToRgba(cat.color, 0.25),
    "--cat-bd2": hexToRgba(cat.color, 0.4),
  } as React.CSSProperties;

  return (
    <div className="cat-section" style={styleVars}>
      <div className="cat-header">
        <div className="cat-icon-big">{cat.icon}</div>
        <div className="cat-info">
          <div className="cat-title">{cat.label}</div>
          <div className="cat-desc">{cat.desc}</div>
        </div>
        <span className="cat-service-count">{cat.services.length} services</span>
      </div>
      <div className="svc-grid">
        {cat.services.map((s) => (
          <div className="svc" key={s.name}>
            <div className="svc-name">{s.name}</div>
            <p className="svc-desc">{s.desc}</p>
            <div className="svc-tags">
              {s.tags.map((t) => <span className="svc-tag" key={t}>{t}</span>)}
            </div>
            <Link href="/contact" className="svc-link">Get Free Quote ΓåÆ</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ΓöÇΓöÇΓöÇ Main Component ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
export default function OurServicesPage({ params: { lang } }: { params: { lang: string } }) {
  const isHi = lang === 'hi';
  const [mainTab, setMainTab] = useState("dm");
  const [dmCat, setDmCat] = useState("all");
  const [aiCat, setAiCat] = useState("all");

  const dmTotal = DM_CATEGORIES.reduce((s, c) => s + c.services.length, 0);
  const aiTotal = AI_CATEGORIES.reduce((s, c) => s + c.services.length, 0);

  const dmFiltered = dmCat === "all" ? DM_CATEGORIES : DM_CATEGORIES.filter((c) => c.id === dmCat);
  const aiFiltered = aiCat === "all" ? AI_CATEGORIES : AI_CATEGORIES.filter((c) => c.id === aiCat);

  return (
    <div className="services-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ΓöÇΓöÇ HERO ΓöÇΓöÇ */}
      <div className="hero">
        <div className="hero-dots" />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-pill">AI-First Agency ┬╖ Vijay Nagar, Indore</div>
          <h1>One Agency.<br /><em>Every Service</em> You Need.</h1>
          <p className="hero-sub">
            {isHi 
              ? "αñíαñ┐αñ£αñ┐αñƒαñ▓ αñ«αñ╛αñ░αÑìαñòαÑçαñƒαñ┐αñéαñù αñ╕αÑç αñ▓αÑçαñòαÑç αñ╡αÑìαñ╣αñ╛αñƒαÑìαñ╕αñÅαñ¬ αñÅαñåαñê αñ¼αÑëαñƒαÑìαñ╕ αññαñò ΓÇö αñçαñéαñªαÑîαñ░ αñòαÑç SMBs αñòαÑç αñ▓αñ┐αñÅ αñòαñéαñ¬αÑìαñ▓αÑÇαñƒ αñíαñ┐αñ£αñ┐αñƒαñ▓ αñçαñòαÑïαñ╕αñ┐αñ╕αÑìαñƒαñ« αñÅαñò αñ╣αÑÇ αñ£αñùαñ╣αÑñ"
              : "From digital marketing to WhatsApp AI bots ΓÇö a complete digital ecosystem for Indore's SMBs in one place."}
          </p>
          <div className="hero-btns">
            <Link href="/contact" className="px-7 py-3.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
              Get Free Strategy Call ΓåÆ
            </Link>
            <Link href="/pricing" className="px-7 py-3.5 border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-bold hover:border-orange-500 hover:text-orange-500 transition-all">
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* ΓöÇΓöÇ STATS ΓöÇΓöÇ */}
      <div className="stats">
        {[
          ["50+", isHi ? "αñòαÑìαñ▓αñ╛αñçαñéαñƒαÑìαñ╕" : "Clients Served"], 
          ["70+", isHi ? "αñ╕αÑçαñ╡αñ╛αñÅαñé" : "Services Offered"], 
          ["3x", isHi ? "ROAS" : "Avg. ROAS Delivered"], 
          ["4.9Γÿà", isHi ? "αñ░αÑçαñƒαñ┐αñéαñù" : "Google Rating"]
        ].map(([n, l]) => (
          <div className="stat" key={l}>
            <div className="stat-n">{n}</div>
            <div className="stat-l">{l}</div>
          </div>
        ))}
      </div>

      {/* ΓöÇΓöÇ MAIN TABS ΓöÇΓöÇ */}
      <div className="main-tabs">
        <button className={`main-tab ${mainTab === "dm" ? "on" : ""}`} onClick={() => setMainTab("dm")}>
          <span>≡ƒôê</span>
          <span className="label">{isHi ? "αñíαñ┐αñ£αñ┐αñƒαñ▓ αñ«αñ╛αñ░αÑìαñòαÑçαñƒαñ┐αñéαñù" : "Digital Marketing"}</span>
          <span className="tab-count">{dmTotal}</span>
        </button>
        <button className={`main-tab ${mainTab === "ai" ? "on" : ""}`} onClick={() => setMainTab("ai")}>
          <span>≡ƒñû</span>
          <span className="label">{isHi ? "AI αñöαñ░ αñæαñƒαÑïαñ«αÑçαñ╢αñ¿" : "AI & Automation"}</span>
          <span className="tab-count">{aiTotal}</span>
        </button>
      </div>

      {/* ΓöÇΓöÇ CONTENT ΓöÇΓöÇ */}
      {mainTab === "dm" && (
        <>
          <div className="cat-strip-wrap">
            <div className="cat-strip">
              <button className={`cat-btn ${dmCat === "all" ? "on" : ""}`} onClick={() => setDmCat("all")}>
                ≡ƒùé∩╕Å {isHi ? "αñ╕αñ¡αÑÇ αñòαÑêαñƒαÑçαñùαñ░αÑÇαñ£" : "All Categories"}
              </button>
              {DM_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  className={`cat-btn ${dmCat === c.id ? "on" : ""}`}
                  onClick={() => setDmCat(c.id)}
                  style={dmCat === c.id ? { background: c.color, borderColor: c.color } : {}}
                >
                  <span className="cat-icon">{c.icon}</span> {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="wrap section">
            <div className="mb-12">
              <h2 className="text-3xl font-black syne-font mb-2">
                {dmCat === "all" ? (isHi ? "αñíαñ┐αñ£αñ┐αñƒαñ▓ αñ«αñ╛αñ░αÑìαñòαÑçαñƒαñ┐αñéαñù αñ╕αÑçαñ╡αñ╛αñÅαñé" : "Complete Digital Marketing Services") : DM_CATEGORIES.find(c => c.id === dmCat)?.label}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                {dmCat === "all" 
                  ? (isHi ? "αñ╕αñ¼ αñòαÑüαñ¢ αñçαñ¿-αñ╣αñ╛αñëαñ╕ ΓÇö αñòαÑïαñê αñåαñëαñƒαñ╕αÑïαñ░αÑìαñ╕αñ┐αñéαñù αñ¿αñ╣αÑÇαñéαÑñ " : "Everything in-house ΓÇö no outsourcing, no excuses. ") + dmTotal + " services."
                  : DM_CATEGORIES.find(c => c.id === dmCat)?.desc}
              </p>
            </div>

            {dmFiltered.map((cat) => (
              <CatSection key={cat.id} cat={cat} />
            ))}
          </div>
        </>
      )}

      {mainTab === "ai" && (
        <>
          <div className="cat-strip-wrap">
            <div className="cat-strip">
              <button className={`cat-btn ${aiCat === "all" ? "on" : ""}`} onClick={() => setAiCat("all")}>
                ≡ƒùé∩╕Å {isHi ? "αñ╕αñ¡αÑÇ αñòαÑêαñƒαÑçαñùαñ░αÑÇαñ£" : "All Categories"}
              </button>
              {AI_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  className={`cat-btn ${aiCat === c.id ? "on" : ""}`}
                  onClick={() => setAiCat(c.id)}
                  style={aiCat === c.id ? { background: c.color, borderColor: c.color } : {}}
                >
                  <span className="cat-icon">{c.icon}</span> {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="wrap section">
            <div className="mb-12">
              <h2 className="text-3xl font-black syne-font mb-2">
                {aiCat === "all" ? (isHi ? "AI αñöαñ░ αñæαñƒαÑïαñ«αÑçαñ╢αñ¿ αñ╕αÑçαñ╡αñ╛αñÅαñé" : "AI & Automation Hub") : AI_CATEGORIES.find(c => c.id === aiCat)?.label}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                {aiCat === "all" 
                  ? (isHi ? "αñ¡αñ╛αñ░αññαÑÇαñ» SMBs αñòαÑç αñ▓αñ┐αñÅ αñ¼αñ¿αñ╛αñ»αñ╛ αñùαñ»αñ╛ αñ¼αñ┐αñ£αñ¿αÑçαñ╕ αñæαñƒαÑïαñ«αÑçαñ╢αñ¿αÑñ " : "Business automation built for Indian SMBs. ") + aiTotal + " services."
                  : AI_CATEGORIES.find(c => c.id === aiCat)?.desc}
              </p>
            </div>

            {aiFiltered.map((cat) => (
              <CatSection key={cat.id} cat={cat} />
            ))}
          </div>
        </>
      )}

      {/* ΓöÇΓöÇ CTA ΓöÇΓöÇ */}
      <div className="wrap">
        <div className="cta">
          <h2>Can't decide which service to start with?</h2>
          <p>Free 30-min strategy call mein hum aapke business ko analyze karke exact roadmap banate hain ΓÇö no sales pitch, just clarity.</p>
          <div className="cta-btns">
            <Link href="/contact" className="px-8 py-3.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all">
              Book Free Consultation ΓåÆ
            </Link>
            <Link href="/pricing" className="px-8 py-3.5 border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-bold hover:border-orange-500 hover:text-orange-500 transition-all">
              See All Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
