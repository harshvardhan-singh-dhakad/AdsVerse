"use client";

import { useState, useMemo, useRef } from "react";
import { ArrowRight, Zap, TrendingUp, Star, Users, Loader2, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

/* ─────────────────────────────────────────────
   COMPLETE SERVICES DATA (With 2-3 Sentence Paragraphs)
 ───────────────────────────────────────────── */
const DM_CATEGORIES = [
  {
    id: "social-media",
    label: "Social Media",
    icon: "📱",
    color: "#e91e8c",
    desc: "Build audience, drive engagement, generate leads",
    services: [
      {
        name: "Facebook Marketing",
        desc: "Targeted campaigns, page management & community building on Facebook.",
        fullDesc: "We manage Facebook Pages, run targeted ad campaigns, and build engaged communities for Indian businesses. Our Facebook strategies combine organic reach with paid amplification — delivering consistent brand visibility and measurable lead generation. Ideal for retail, education, healthcare, and local service businesses.",
        tags: ["Organic", "Paid", "Community"]
      },
      {
        name: "Instagram Marketing",
        desc: "Reels, stories, grid content & growth strategies for Instagram.",
        fullDesc: "From Reels strategy to grid aesthetics to Story funnels — we handle Instagram end-to-end. Our team creates platform-native content that grows followers organically while running Meta Ads that convert. We've helped Indore and pan-India brands build 10K+ followings from scratch.",
        tags: ["Reels", "Stories", "Growth"]
      },
      {
        name: "LinkedIn Marketing",
        desc: "B2B brand building, thought leadership & professional outreach.",
        fullDesc: "B2B brand building and professional outreach on LinkedIn for agencies, SaaS companies, consultants, and enterprise service businesses. We write thought leadership content, manage company pages, and run LinkedIn Ads with hyper-precise firmographic targeting. Average CPL 40% lower than Meta for B2B clients.",
        tags: ["B2B", "Lead Gen", "Branding"]
      },
      {
        name: "Twitter (X) Marketing",
        desc: "Real-time brand engagement, trending content & audience growth.",
        fullDesc: "Real-time brand presence on X (Twitter) through trending content, consistent engagement, and targeted ad campaigns. We handle content calendars, reply management, and growth strategies for brands that want visibility in fast-moving conversations.",
        tags: ["Trending", "Engagement", "Ads"]
      },
      {
        name: "YouTube Marketing",
        desc: "Channel strategy, SEO & subscriber growth for YouTube.",
        fullDesc: "End-to-end YouTube channel management — strategy, SEO, content planning, and subscriber growth. We optimize video titles, descriptions, thumbnails, and tags for YouTube search algorithms. Clients see 3-5x improvement in watch time and subscriber growth within 90 days.",
        tags: ["YouTube SEO", "Subscribers", "Strategy"]
      },
      {
        name: "Social Media Account Management",
        desc: "Full-service management of all your social accounts — posting, replies & analytics.",
        fullDesc: "Full-service management of your Facebook, Instagram, LinkedIn, and X accounts — posting schedules, community replies, analytics reporting, and monthly performance reviews. We act as your in-house social media team at a fraction of the cost.",
        tags: ["Management", "Scheduling", "Analytics"]
      },
      {
        name: "Social Media Content Creation",
        desc: "Platform-specific content — captions, creatives, carousels & video scripts.",
        fullDesc: "Platform-specific content production — branded creatives, carousel posts, Reels scripts, caption writing, and content calendars. Every piece is created to match your brand voice and optimized for each platform's algorithm.",
        tags: ["Creatives", "Captions", "Carousels"]
      },
      {
        name: "Social Media Ads Campaigns",
        desc: "Paid campaigns across Facebook, Instagram, LinkedIn & Twitter.",
        fullDesc: "Paid campaigns across Meta (Facebook + Instagram), LinkedIn, and X — from audience research and creative testing to campaign optimization and ROAS reporting. We manage ₹50K to ₹50L+ monthly ad budgets with full attribution tracking.",
        tags: ["Paid Ads", "Targeting", "ROAS"]
      },
      {
        name: "Influencer Marketing",
        desc: "Connect with relevant influencers to amplify your brand reach.",
        fullDesc: "Identify and collaborate with niche-relevant influencers — micro (10K-100K) and macro — for product launches, brand awareness, and UGC creation. We handle sourcing, briefing, content approval, and performance measurement.",
        tags: ["Influencer", "UGC", "Reach"]
      },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    icon: "🔍",
    color: "#22c55e",
    desc: "Rank higher, get found, dominate local search",
    services: [
      {
        name: "On-Page SEO",
        desc: "Title tags, meta descriptions, header optimization & internal linking.",
        fullDesc: "Optimize every page for search intent — title tags, meta descriptions, H1-H6 structure, internal linking, image alt tags, and keyword placement. We audit your existing content and implement changes that improve crawlability, relevance signals, and click-through rates from Google search results.",
        tags: ["Meta Tags", "Keywords", "Structure"]
      },
      {
        name: "Off-Page SEO",
        desc: "High-authority backlink building, guest posts & digital PR.",
        fullDesc: "Build domain authority through white-hat link acquisition — guest posts on DA 40+ sites, digital PR, business directory listings, and strategic citation building. Our link building is fully manual, context-relevant, and aligned with Google's quality guidelines.",
        tags: ["Backlinks", "DA Building", "PR"]
      },
      {
        name: "Technical SEO",
        desc: "Site speed, crawlability, schema markup & Core Web Vitals fixes.",
        fullDesc: "Fix the foundation: Core Web Vitals, page speed, mobile-first indexing, structured data implementation, XML sitemaps, robots.txt, canonical tags, and crawl error resolution. We run full technical audits and deliver a prioritized fix plan with implementation support.",
        tags: ["Core Web Vitals", "Schema", "Speed"]
      },
      {
        name: "Local SEO",
        desc: "Google Business Profile, local citations & 'near me' rankings.",
        fullDesc: "Rank in Google's local 3-pack for '[your service] near me' and '[your service] in [city]' queries. We optimize your Google Business Profile, build local citations on Justdial, IndiaMart, and Sulekha, and create geo-targeted content that dominates local search. We optimize maps search so Indore local queries lead directly to your door.",
        tags: ["GBP", "Citations", "Maps"]
      },
      {
        name: "Mobile SEO",
        desc: "Mobile-first indexing optimization for Google's mobile-first crawl.",
        fullDesc: "Optimize for Google's mobile-first index — responsive design validation, tap target sizing, font readability, page speed on 4G networks, and AMP implementation where applicable. Critical for Indian markets where 80%+ of searches happen on mobile.",
        tags: ["Mobile-First", "AMP", "UX"]
      },
      {
        name: "E-Commerce SEO",
        desc: "Product page optimization, category SEO & shopping feed setup.",
        fullDesc: "Drive organic sales through product page optimization, category page SEO, shopping feed setup, and schema markup for products. We specialize in Shopify, WooCommerce, and marketplace SEO for Amazon and Flipkart.",
        tags: ["Product SEO", "Shopping", "Category"]
      },
      {
        name: "YouTube SEO",
        desc: "Video titles, descriptions, tags & thumbnail optimization for YouTube search.",
        fullDesc: "Rank videos in YouTube search and Google video results — keyword research for video topics, title and description optimization, tag strategy, chapter markers, and thumbnail A/B testing. Video content that ranks drives organic traffic for months without paid spend.",
        tags: ["Video SEO", "Thumbnails", "Tags"]
      },
      {
        name: "Website Speed Optimization",
        desc: "Core Web Vitals, image compression, caching & CDN setup.",
        fullDesc: "Achieve Core Web Vitals scores that satisfy Google's page experience signals — image compression, lazy loading, caching, CDN setup, JavaScript optimization, and hosting upgrades. Average 40-60% improvement in LCP scores within one sprint.",
        tags: ["PageSpeed", "CWV", "CDN"]
      },
      {
        name: "Keyword Research & Strategy",
        desc: "In-depth keyword analysis mapped to your buyer's journey.",
        fullDesc: "In-depth keyword research mapped to buyer intent stages — informational, navigational, transactional, and local. We deliver keyword clusters, search volume data, competition analysis, and a 12-month content roadmap you can execute in-house or with us.",
        tags: ["KW Research", "Intent", "Clusters"]
      },
      {
        name: "SEO Audit",
        desc: "Complete technical + on-page SEO audit with prioritized fix recommendations.",
        fullDesc: "Comprehensive SEO audit covering 150+ technical, on-page, off-page, and content factors. We deliver a prioritized action plan — not a 50-page PDF that gathers dust. Every recommendation is scoped with estimated effort and expected impact. Link keywords to our free audit tools for instant tests.",
        tags: ["Audit", "Report", "Action Plan"]
      },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: "✍️",
    color: "#a78bfa",
    desc: "Content that ranks, converts, and compounds",
    services: [
      {
        name: "Blog Writing",
        desc: "SEO-optimized, research-backed blog posts that drive organic traffic.",
        fullDesc: "SEO-optimized, research-backed blog posts written by human writers — not AI spin. We write long-form articles (1500-3000 words) targeting high-intent keywords with proper structure, internal linking, and schema markup. Our blogs rank because they're genuinely useful, not keyword-stuffed.",
        tags: ["SEO Blogs", "Long-Form", "Authority"]
      },
      {
        name: "Website Content Writing",
        desc: "Homepage, about, service & landing page copy that converts.",
        fullDesc: "Homepage, about page, service pages, and landing page copy written to convert visitors into enquiries. We research your competitors, identify your USPs, and write copy that speaks directly to your target buyer — with clear CTAs at every conversion point.",
        tags: ["Web Copy", "CRO", "Conversion"]
      },
      {
        name: "Copywriting (Ads & Landing Pages)",
        desc: "High-converting ad copy and landing page scripts for paid campaigns.",
        fullDesc: "High-converting ad copy and landing page scripts built on direct response principles. We write Facebook Ad hooks, Google Ad headlines, and landing page copy that improves Quality Scores and increases conversion rates — typically 20-40% uplift within 30 days of testing.",
        tags: ["Ad Copy", "CRO", "Hooks"]
      },
      {
        name: "Social Media Content",
        desc: "Daily content calendars with captions, hooks & CTAs per platform.",
        fullDesc: "Monthly content calendars with captions, hooks, CTAs, and creative briefs — tailored per platform. We write for Instagram, LinkedIn, Facebook, and X with platform-native tone and format. Delivered 7 days in advance so your team has time to review.",
        tags: ["Calendar", "Captions", "Hooks"]
      },
      {
        name: "SEO-Optimized Content",
        desc: "Content written around search intent with keyword integration.",
        fullDesc: "Content written around search intent with strategic keyword integration, LSI terms, proper header structure, and internal links. Every piece is optimized before publishing using SurferSEO or equivalent tool validation.",
        tags: ["SEO Writing", "Intent", "Ranking"]
      },
      {
        name: "Video Content Creation",
        desc: "YouTube scripts, explainer videos & brand storytelling content.",
        fullDesc: "YouTube scripts, explainer video scripts, and brand storytelling content — written for watch time, not just views. We structure scripts with strong hooks in the first 30 seconds, clear value delivery, and end-screen CTAs that grow your channel.",
        tags: ["Scripts", "YouTube", "Explainer"]
      },
      {
        name: "Reels / Shorts Creation",
        desc: "Script, shoot coordination & editing for Instagram Reels & YouTube Shorts.",
        fullDesc: "Script, coordinate, and edit 15-60 second Reels and YouTube Shorts for maximum algorithmic reach. We handle creative direction, on-screen text, transitions, audio selection, and final export in platform-specific formats.",
        tags: ["Reels", "Shorts", "Viral"]
      },
      {
        name: "Podcast Editing & Publishing",
        desc: "Full podcast post-production — editing, show notes & distribution.",
        fullDesc: "Full podcast post-production — noise removal, level balancing, intro/outro music, show notes writing, and distribution to Spotify, Apple Podcasts, and Google Podcasts. Turn raw recordings into professional content your audience will return to.",
        tags: ["Editing", "Distribution", "Show Notes"]
      },
      {
        name: "Infographics Design",
        desc: "Data visualization & infographic design for social sharing & backlinks.",
        fullDesc: "Data visualization and infographic design for blog posts, social sharing, and backlink acquisition. Well-designed infographics earn natural links from industry publications — we've generated 15+ backlinks from a single infographic for clients.",
        tags: ["Infographics", "Data Viz", "Backlinks"]
      },
    ],
  },
  {
    id: "paid-ads",
    label: "PPC & Paid Ads",
    icon: "🎯",
    color: "#f59e0b",
    desc: "Every rupee tracked, every click attributed",
    services: [
      {
        name: "Google Search Ads",
        desc: "Intent-based search campaigns targeting buyers ready to convert.",
        fullDesc: "Intent-based Google Search campaigns targeting buyers with high purchase intent. We handle keyword research, match type strategy, ad copy writing, Quality Score optimization, and bid management — delivering consistent ROAS with full attribution reporting. Average 3.8x ROAS across our active accounts.",
        tags: ["Search", "Intent", "ROAS"]
      },
      {
        name: "Google Display Ads",
        desc: "Visual banner ads across Google's Display Network for brand awareness.",
        fullDesc: "Visual banner campaigns across Google's Display Network for brand awareness and retargeting. We design creatives in all required sizes, set up audience targeting, and run frequency-capped campaigns that build brand recall without budget waste.",
        tags: ["Display", "Awareness", "Retargeting"]
      },
      {
        name: "Google Shopping Ads",
        desc: "Product listing ads for e-commerce on Google Shopping.",
        fullDesc: "Product Listing Ads (PLAs) for e-commerce businesses on Google Shopping — feed optimization, bid strategy, and product segmentation. Ideal for Shopify and WooCommerce stores targeting ready-to-buy shoppers.",
        tags: ["Shopping", "PLAs", "E-commerce"]
      },
      {
        name: "YouTube Ads",
        desc: "In-stream, bumper & discovery ads for video marketing.",
        fullDesc: "In-stream, bumper, and discovery ad campaigns on YouTube — from script to targeting to optimization. We produce the creatives and manage the campaigns, targeting users by interest, keyword, and placement for maximum view-through conversions.",
        tags: ["In-Stream", "Bumper", "Video Ads"]
      },
      {
        name: "Facebook & Instagram Ads",
        desc: "Meta campaigns for lead gen, traffic, awareness & conversions.",
        fullDesc: "Full-funnel Meta campaigns across Facebook and Instagram — awareness to conversion. We manage creative testing, audience segmentation, retargeting sequences, and campaign scaling. Managed ₹2.4Cr+ in Meta ad spend with documented ROAS across campaigns.",
        tags: ["Meta", "Lead Gen", "Conversions"]
      },
      {
        name: "LinkedIn Ads",
        desc: "Sponsored content, InMail & lead gen forms for B2B targeting.",
        fullDesc: "Sponsored content, InMail, and Lead Gen Form campaigns for B2B businesses. We target by job title, company size, industry, and seniority — reaching decision-makers who don't respond to cold outreach.",
        tags: ["B2B", "InMail", "Lead Forms"]
      },
      {
        name: "Remarketing Campaigns",
        desc: "Re-engage past visitors with custom audiences across platforms.",
        fullDesc: "Re-engage website visitors, video viewers, and past customers with custom audience campaigns across Google, Meta, and YouTube. Remarketing consistently delivers 2-4x better ROAS than cold audience campaigns.",
        tags: ["Remarketing", "Custom Audience", "ROAS"]
      },
      {
        name: "Conversion Ads",
        desc: "Bottom-of-funnel ad campaigns optimized for purchases & form fills.",
        fullDesc: "Bottom-of-funnel campaigns optimized for purchases, form fills, and phone calls. We build and test conversion-focused creatives, landing pages, and audience sequences that move warm leads to paying customers.",
        tags: ["CRO", "Purchases", "ROAS"]
      },
      {
        name: "Lead Generation Campaigns",
        desc: "Full-funnel lead gen — from ad to CRM entry — automated.",
        fullDesc: "Full-funnel lead gen — from ad creative to CRM entry — completely automated. Leads from Meta Lead Forms and Google Ads go directly into your WhatsApp, Google Sheets, or CRM via n8n workflows. Zero manual data entry.",
        tags: ["Lead Gen", "Funnel", "CRM"]
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: "🛒",
    color: "#0ea5e9",
    desc: "Sell more on Amazon, Flipkart, Shopify & WooCommerce",
    services: [
      {
        name: "Amazon / Flipkart Product SEO",
        desc: "Optimize product listings for marketplace search algorithms.",
        fullDesc: "Optimize product listings for Amazon A9 and Flipkart search algorithms — titles, bullet points, backend keywords, and A+ content. Ranking higher in marketplace search directly increases organic sales without ad spend.",
        tags: ["Amazon SEO", "Flipkart", "Listings"]
      },
      {
        name: "Marketplace Ads",
        desc: "Sponsored product ads on Amazon & Flipkart for immediate visibility.",
        fullDesc: "Sponsored Product, Sponsored Brand, and Sponsored Display ads on Amazon and Flipkart — campaign setup, bid optimization, and ACOS management. We manage marketplace ad budgets from ₹30K to ₹5L/month.",
        tags: ["Sponsored", "Amazon Ads", "Marketplace"]
      },
      {
        name: "Product Listing Optimization",
        desc: "Titles, bullets, A+ content & images optimized for conversions.",
        fullDesc: "Titles, bullet points, A+ content, and main image optimization for higher conversion rates on marketplace listings. Our optimized listings average 25-40% higher add-to-cart rates versus unoptimized competitors.",
        tags: ["A+ Content", "Conversion", "Listings"]
      },
      {
        name: "Ecommerce Store Setup",
        desc: "Full store setup on Shopify or WooCommerce from scratch.",
        fullDesc: "Full store setup on Shopify or WooCommerce — theme selection, customization, payment gateway integration (Razorpay, PayU, CCAvenue), shipping setup, and GST-compliant invoicing. Launch-ready in 7-10 working days.",
        tags: ["Setup", "Shopify", "WooCommerce"]
      },
      {
        name: "Shopify / WooCommerce Setup",
        desc: "Theme customization, payment gateway & product upload.",
        fullDesc: "Theme customization, custom page templates, product upload, payment gateway configuration, and speed optimization for Indian e-commerce stores. Includes mobile UX review and basic SEO setup.",
        tags: ["Shopify", "WooCommerce", "Payment"]
      },
      {
        name: "Catalog Management",
        desc: "Ongoing product catalog updates, pricing & inventory management.",
        fullDesc: "Ongoing product catalog maintenance — new product uploads, pricing updates, inventory sync, and image management. Handles high-SKU catalogs for wholesalers, distributors, and multi-category retailers.",
        tags: ["Catalog", "Inventory", "Management"]
      }
    ]
  },
  {
    id: "email",
    label: "Email Marketing",
    icon: "📩",
    color: "#6366f1",
    desc: "Automated sequences that nurture on autopilot",
    services: [
      {
        name: "Email Automation",
        desc: "Trigger-based email sequences — welcome, nurture & re-engagement.",
        fullDesc: "Trigger-based email sequences — welcome series, lead nurture, post-purchase, re-engagement, and cart abandonment. We build automation flows on Mailchimp, Klaviyo, or SendGrid that work 24/7 without manual sending.",
        tags: ["Automation", "Triggers", "Sequences"]
      },
      {
        name: "Newsletter Creation",
        desc: "Weekly/monthly branded newsletters with curated content & CTAs.",
        fullDesc: "Weekly or monthly branded newsletters — content curation, copywriting, design, and delivery. We manage the full newsletter operation including list hygiene, subject line A/B testing, and open rate optimization.",
        tags: ["Newsletter", "Branding", "CTAs"]
      },
      {
        name: "Drip Campaigns",
        desc: "Multi-step email drip campaigns mapped to your sales funnel.",
        fullDesc: "Multi-step email sequences mapped to your sales funnel stages. We write the copy, design the templates, set up the automation logic, and monitor delivery and engagement metrics weekly.",
        tags: ["Drip", "Funnel", "Nurture"]
      },
      {
        name: "Email List Building",
        desc: "Lead magnets, opt-in forms & list segmentation strategies.",
        fullDesc: "Lead magnet creation, opt-in form design, and list segmentation strategy to grow a quality email audience. We integrate forms with your website and CRM for automated list management.",
        tags: ["List Growth", "Lead Magnet", "Segmentation"]
      },
      {
        name: "MailChimp / SendGrid Setup",
        desc: "Full platform setup, template design & automation configuration.",
        fullDesc: "Complete platform setup — account configuration, domain authentication (SPF, DKIM, DMARC), template design, automation workflows, and team training. Ensures your emails land in inbox, not spam.",
        tags: ["MailChimp", "SendGrid", "Setup"]
      }
    ]
  },
  {
    id: "design",
    label: "Graphic Design",
    icon: "🎨",
    color: "#ec4899",
    desc: "Visuals that communicate before a word is read",
    services: [
      {
        name: "Logo Design",
        desc: "Unique, memorable logo with multiple format deliverables.",
        fullDesc: "Unique, memorable logo design with 3 concept directions, revision rounds, and final delivery in all formats — SVG, PNG, PDF, and favicon. Includes a basic brand usage guide covering color codes, fonts, and minimum size rules.",
        tags: ["Logo", "Brand Identity", "Vector"]
      },
      {
        name: "Branding Kit",
        desc: "Complete brand kit — logo, colors, fonts, icons & usage guide.",
        fullDesc: "Complete brand identity system — primary and secondary logos, color palette with hex codes, typography guidelines, icon set, brand pattern, and a comprehensive style guide. Everything a business needs to look consistent across all touchpoints.",
        tags: ["Brand Kit", "Style Guide", "Identity"]
      },
      {
        name: "Social Media Posters",
        desc: "Branded creatives for Instagram, Facebook & LinkedIn posts.",
        fullDesc: "Branded creatives for Instagram, Facebook, and LinkedIn — festival posts, promotional banners, product highlights, and announcement graphics. Delivered as editable Canva templates or static files per your preference.",
        tags: ["Posters", "Creatives", "Social"]
      },
      {
        name: "Banner & Flyer Design",
        desc: "Print-ready and digital banners, flyers & hoarding designs.",
        fullDesc: "Print-ready and digital banners, flyers, brochures, and hoarding designs — for local advertising, events, and campaigns. Files delivered in CMYK for print and RGB for digital with bleed marks.",
        tags: ["Banner", "Flyer", "Print"]
      },
      {
        name: "Thumbnail Design",
        desc: "High-CTR YouTube thumbnail designs to improve click-through rates.",
        fullDesc: "High-CTR YouTube thumbnail designs that increase click-through rates by 2-4x. We A/B test thumbnail concepts and use emotional triggers, bold typography, and face-forward imagery to maximize clicks.",
        tags: ["Thumbnails", "YouTube", "CTR"]
      }
    ]
  },
  {
    id: "web-dev",
    label: "Web Development",
    icon: "🌐",
    color: "#3b82f6",
    desc: "Fast, SEO-ready sites that convert visitors to leads",
    services: [
      {
        name: "Business Website",
        desc: "Professional 5–10 page website for your business with CMS.",
        fullDesc: "Professional 5-10 page business website built on Next.js or WordPress — fast, SEO-ready, mobile-optimized, and CMS-enabled. Includes homepage, about, services, contact, and blog setup. Average delivery: 10-15 working days.",
        tags: ["Business", "CMS", "Responsive"]
      },
      {
        name: "Portfolio Website",
        desc: "Personal brand or agency portfolio with case studies & work samples.",
        fullDesc: "Personal brand or agency portfolio with case studies & work samples, testimonials, and contact integration. Built to impress clients and rank for your name + service on Google. Link these portfolios with our verified Next.js layouts.",
        tags: ["Portfolio", "Case Studies", "Personal Brand"]
      },
      {
        name: "E-Commerce Website",
        desc: "Full-stack e-commerce with product pages, cart & payment gateway.",
        fullDesc: "Full-stack e-commerce with product catalog, cart, checkout, payment gateway (Razorpay/PayU), GST invoicing, and order management. Built on Shopify, WooCommerce, or custom Next.js — based on your scale and budget.",
        tags: ["E-Commerce", "Payment", "Cart"]
      },
      {
        name: "Landing Pages",
        desc: "High-converting single-page funnels for ads & campaigns.",
        fullDesc: "High-converting single-page funnels for ad campaigns, product launches, and lead generation. We design, write, and build landing pages optimized for Quality Score, conversion rate, and mobile speed.",
        tags: ["Landing Page", "CRO", "Funnel"]
      },
      {
        name: "UI/UX Designing",
        desc: "Wireframes, prototypes & user experience design for apps & sites.",
        fullDesc: "Wireframes, prototypes, and user experience design for web and mobile apps — on Figma. We follow UX research principles, user flow mapping, and usability testing before handoff to development.",
        tags: ["UI/UX", "Figma", "Prototype"]
      },
      {
        name: "Website Maintenance",
        desc: "Monthly backups, security updates, content edits & uptime monitoring.",
        fullDesc: "Monthly retainer covering security updates, plugin/dependency upgrades, content edits (up to 2 hours/month), uptime monitoring, automated backups, and performance checks.",
        tags: ["Maintenance", "Security", "Updates"]
      },
      {
        name: "Website Redesigning",
        desc: "Complete overhaul of outdated websites with modern design & performance.",
        fullDesc: "Complete overhaul of outdated websites — new design, improved navigation, mobile responsiveness, speed optimization, and SEO restructuring. We audit your current site first and present a redesign proposal before starting.",
        tags: ["Redesign", "Performance", "Modern"]
      }
    ]
  },
  {
    id: "orm",
    label: "ORM",
    icon: "🛡️",
    color: "#f43f5e",
    desc: "Protect and build your online reputation",
    services: [
      {
        name: "Google Reviews Management",
        desc: "Strategy to get more 5-star reviews & suppress negative ones.",
        fullDesc: "Strategy and execution to increase your 5-star Google reviews — including automated follow-up sequences via WhatsApp and SMS, review request templates, and guidance on responding to existing reviews to maximize trust signals.",
        tags: ["Reviews", "5-Star", "Google"]
      },
      {
        name: "Negative Review Handling",
        desc: "Professionally respond to & resolve negative feedback online.",
        fullDesc: "Professional response and resolution strategy for negative reviews on Google, Justdial, and social platforms. We draft responses, escalate genuine issues, and work to get policy-violating reviews removed through proper channels.",
        tags: ["Crisis", "Response", "Resolution"]
      },
      {
        name: "Brand Reputation Building",
        desc: "Long-term reputation strategy — press, social proof & authority.",
        fullDesc: "Long-term online reputation strategy — press release distribution, positive content publishing, social proof amplification, and authority building through industry directories and media mentions.",
        tags: ["Brand", "Authority", "Press"]
      }
    ]
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "📊",
    color: "#8b5cf6",
    desc: "Know what's working — real data, zero guesswork",
    services: [
      {
        name: "Google Analytics Setup",
        desc: "GA4 installation, goals, events & conversion tracking setup.",
        fullDesc: "GA4 installation, custom event tracking, goal configuration, and conversion measurement setup. We connect GA4 to Google Search Console and Google Ads for complete attribution across your marketing channels.",
        tags: ["GA4", "Goals", "Events"]
      },
      {
        name: "Facebook Pixel Setup",
        desc: "Meta Pixel installation, custom events & audience building.",
        fullDesc: "Meta Pixel installation with custom events — page views, leads, purchases, add-to-cart, and custom conversions. We also set up Conversions API (CAPI) for improved iOS 14+ attribution and audience building.",
        tags: ["Meta Pixel", "Events", "Audiences"]
      },
      {
        name: "Conversion Tracking",
        desc: "End-to-end conversion tracking across Google, Meta & web.",
        fullDesc: "End-to-end conversion tracking across Google, Meta Ads, and organic — mapping every lead, call, and sale back to its traffic source. Full attribution means you know exactly which campaigns are making money.",
        tags: ["Conversions", "Attribution", "Tracking"]
      },
      {
        name: "Performance Reporting",
        desc: "Monthly data-driven reports with KPIs, insights & action points.",
        fullDesc: "Monthly data-driven performance reports covering KPIs, trend analysis, channel attribution, and recommended actions. Delivered as a live dashboard link or a PDF — your choice. No vanity metrics, only numbers that affect decisions.",
        tags: ["Reports", "KPIs", "Insights"]
      }
    ]
  },
  {
    id: "video",
    label: "Video Production",
    icon: "🎬",
    color: "#f97316",
    desc: "Video content that builds trust at scale",
    services: [
      {
        name: "Corporate Videos",
        desc: "Brand story, about-us & team culture videos for your business.",
        fullDesc: "Brand story, team culture, and about-us videos for websites and investor decks — scripted, shot, and edited professionally. Corporate videos build trust faster than any other content format and reduce bounce rate on key pages.",
        tags: ["Corporate", "Brand Story", "Culture"]
      },
      {
        name: "Product Promo Videos",
        desc: "Feature-highlight videos for products — for ads & website use.",
        fullDesc: "Feature-highlight product videos for websites, ads, and marketplace listings. We handle scripting, shooting (or stock + motion graphics), voiceover, and final edit in multiple aspect ratios for web and social.",
        tags: ["Product", "Promo", "Ads"]
      },
      {
        name: "Reels & Shorts",
        desc: "15–60 second scroll-stopping short-form content for social media.",
        fullDesc: "15-60 second scroll-stopping short-form content for Instagram Reels, YouTube Shorts, and Facebook — scripted and edited for maximum hook, retention, and CTA performance.",
        tags: ["Reels", "Shorts", "Social"]
      },
      {
        name: "Business Ad Films",
        desc: "Full production ad films for TV, YouTube & digital campaigns.",
        fullDesc: "Full production ad films for YouTube campaigns, TV commercials, and digital launch campaigns — concept, script, production, and post-production. For businesses that want cinematic-quality brand communication.",
        tags: ["Ad Film", "TV", "Production"]
      }
    ]
  },
  {
    id: "branding",
    label: "Branding & Strategy",
    icon: "🧭",
    color: "#10b981",
    desc: "Build a brand worth remembering",
    services: [
      {
        name: "Brand Identity Creation",
        desc: "Complete brand identity system — visual & verbal brand guidelines.",
        fullDesc: "Complete visual and verbal brand identity — logo system, color palette, typography, brand voice guidelines, messaging framework, and a comprehensive brand bible your entire team can follow.",
        tags: ["Identity", "Guidelines", "Visual"]
      },
      {
        name: "Brand Strategy",
        desc: "Positioning, messaging, USP definition & competitive differentiation.",
        fullDesc: "Positioning strategy, USP definition, target audience profiling, competitive differentiation, and messaging architecture. The strategic foundation that makes every other marketing activity more effective.",
        tags: ["Positioning", "USP", "Messaging"]
      },
      {
        name: "Market Research",
        desc: "Competitor analysis, audience research & market opportunity mapping.",
        fullDesc: "Competitor analysis, audience research, keyword landscape mapping, and market opportunity identification — delivered as a structured report with actionable recommendations. Data-backed decisions from day one.",
        tags: ["Research", "Competitors", "Audience"]
      },
      {
        name: "Marketing Strategy",
        desc: "Full-funnel digital marketing strategy tailored to your goals.",
        fullDesc: "Full-funnel digital marketing strategy tailored to your goals, budget, and timeline. Covers channel selection, content strategy, paid media roadmap, and KPI framework — a 90-day playbook you can execute with or without us.",
        tags: ["Strategy", "Full-Funnel", "Goals"]
      }
    ]
  }
];

const AI_CATEGORIES = [
  {
    id: "whatsapp-ai",
    label: "WhatsApp AI",
    icon: "💬",
    color: "#22c55e",
    desc: "AI-powered WhatsApp automation that works 24/7",
    services: [
      {
        name: "WhatsApp AI Bot (Persona-Based)",
        desc: "Custom AI persona on WhatsApp — Hinglish support, lead capture & memory.",
        fullDesc: "We build custom persona-driven AI agents on the official Meta WhatsApp Business API. These bots speak Hinglish, learn your business details, and qualify leads, schedule appointments, and sync data instantly to your CRM.",
        tags: ["AI Bot", "Persona", "Hinglish"]
      },
      {
        name: "WhatsApp Marketing Campaigns",
        desc: "Bulk broadcast messages with personalization & opt-in compliance.",
        fullDesc: "Run targeted, high-delivery broadcasts to your opt-in lists with personalization. We configure compliance, message templates, CTA buttons, and interactive lists, maximizing response rates while ensuring full DPDP compliance.",
        tags: ["Broadcast", "Marketing", "DPDP"]
      },
      {
        name: "WhatsApp Broadcast Setup",
        desc: "Setup and manage broadcast lists for promotions & announcements.",
        fullDesc: "Establish official templates, manage opt-in consents, and set up your broadcast pipeline. We handle Meta verification, number warm-up, and catalog features, allowing you to broadcast to thousands of contacts with one click.",
        tags: ["Broadcast Lists", "Promotions"]
      },
      {
        name: "AI Auto-Reply (Instagram/WhatsApp/Facebook)",
        desc: "Instant AI replies across all chat platforms — unified inbox automation.",
        fullDesc: "Deploy a unified AI inbox that automatically handles direct messages, comments, and story mentions. Our system responds instantly with a consistent brand voice across all social chats, generating leads in real time.",
        tags: ["Auto-Reply", "Multi-Platform", "Inbox"]
      },
      {
        name: "WhatsApp Lead Funnel",
        desc: "Full WhatsApp funnel — ad → DM → qualification → CRM entry.",
        fullDesc: "Create an end-to-end automated conversion pipeline from click-to-WhatsApp ads down to CRM logging. Our system captures incoming conversations, qualifies prospect intent, and logs their details in your database within seconds.",
        tags: ["Funnel", "Lead Gen", "CRM"]
      }
    ]
  },
  {
    id: "n8n-&-workflows",
    label: "n8n & Workflows",
    icon: "⚙️",
    color: "#f97316",
    desc: "Visual no-code automation that connects your tools",
    services: [
      {
        name: "n8n Workflow Setup",
        desc: "End-to-end n8n workflow design, deployment & cloud hosting.",
        fullDesc: "End-to-end n8n visual flow design, deployment, and secure cloud hosting. We link your websites, advertising platforms, email tools, and local software databases to automate all manual tasks with robust error monitoring.",
        tags: ["n8n", "Self-Hosted", "Cloud"]
      },
      {
        name: "Zapier Automation",
        desc: "Multi-step Zap creation connecting 5,000+ apps in your stack.",
        fullDesc: "Establish multi-step Zap integrations connecting over 5,000 SaaS apps. We design conditional logic, data formatting, paths, and filters, ensuring clean automated actions across your complete technology stack.",
        tags: ["Zapier", "Zaps", "Integration"]
      },
      {
        name: "Multi-Step Workflow Design",
        desc: "Complex branching workflows with conditions, loops & error handling.",
        fullDesc: "Architect advanced, resilient business workflows with branching logic, looping filters, custom formatting, and database queries. Ideal for complex order processing, billing sync, or multi-department approvals.",
        tags: ["Branching", "Logic", "Error Handling"]
      },
      {
        name: "API Integration & Automation",
        desc: "Custom REST API connections to automate data between platforms.",
        fullDesc: "Develop custom REST API connections, webhooks, and data sync layers between proprietary legacy software and modern cloud tools. Secure, fast, and fully structured data transfers.",
        tags: ["REST API", "Webhooks", "Integration"]
      },
      {
        name: "Scheduled Data Automation",
        desc: "Cron-based automation — daily reports, data sync & batch jobs.",
        fullDesc: "Deploy automated cron jobs and scheduling triggers to handle repetitive data tasks. Automate daily PDF reports, inventory sync between platforms, and batch data backups without human effort.",
        tags: ["Cron", "Scheduling", "Data Sync"]
      },
      {
        name: "Form to CRM Automation",
        desc: "Auto-capture form submissions into CRM with tagging & notifications.",
        fullDesc: "Connect website forms, ad platforms, and popups to log details instantly into HubSpot, Zoho, or local sheets. Includes auto-tagging, source attribution, and real-time team notifications.",
        tags: ["Form", "CRM", "Notifications"]
      }
    ]
  },
  {
    id: "ai-agents-&-bots",
    label: "AI Agents & Bots",
    icon: "🤖",
    color: "#a78bfa",
    desc: "Custom AI agents powered by Gemini, GPT & Claude",
    services: [
      {
        name: "AI Telecaller System",
        desc: "Automated voice AI that calls, qualifies & schedules follow-ups.",
        fullDesc: "Automate outbound and inbound phone operations with advanced voice AI. Our voice agents speak natural Hindi/English, qualify incoming leads, capture details, and book calendar appointments directly.",
        tags: ["Telecaller", "Voice AI", "Lead Qual"]
      },
      {
        name: "Lead Qualification Bot",
        desc: "Conversational AI that scores & qualifies leads before human handoff.",
        fullDesc: "Qualify and score leads automatically through conversation. Our AI agents assess budget, timeline, authority, and need (BANT) before seamlessly handing off high-intent prospects to your human sales reps.",
        tags: ["Lead Scoring", "Qualification", "AI"]
      },
      {
        name: "Customer Support Bot",
        desc: "24/7 AI support agent trained on your FAQs, products & policies.",
        fullDesc: "Provide 24/7 client assistance with a custom GPT/Claude agent trained on your business documents, FAQs, policies, and products. Handles support tickets instantly, reducing load on human agents by 70%.",
        tags: ["Support", "24/7", "FAQ Bot"]
      },
      {
        name: "Gemini API Integration",
        desc: "Google Gemini-powered agents for content, analysis & business tasks.",
        fullDesc: "Integrate Google Gemini models directly into your business tools to automate content analysis, translation, bulk classification, database insights, and advanced logical reasoning workflows.",
        tags: ["Gemini", "Google AI", "LLM"]
      },
      {
        name: "AI Content Agent",
        desc: "Automated content research, drafting & publishing pipeline using AI.",
        fullDesc: "Establish automated research, drafting, formatting, and scheduling pipelines. Our AI agents produce brand-consistent copy, check details, draft visual cues, and schedule posts across channels with zero human delay.",
        tags: ["Content", "AI Automation", "Publishing"]
      },
      {
        name: "Custom LLM-Powered Bot",
        desc: "Bespoke chatbot with custom personality, knowledge base & integrations.",
        fullDesc: "Create specialized LLM chatbots equipped with persistent memory, custom knowledge bases, and custom API tools. Designed specifically to handle proprietary internal tasks or client interactions.",
        tags: ["Custom Bot", "LLM", "Knowledge Base"]
      }
    ]
  },
  {
    id: "crm-&-lead-automation",
    label: "CRM & Lead Automation",
    icon: "🔗",
    color: "#06b6d4",
    desc: "Never lose a lead again — automate your entire sales pipeline",
    services: [
      {
        name: "CRM Setup & Automation",
        desc: "Full CRM setup (HubSpot, Zoho, Salesforce) with pipeline configuration.",
        fullDesc: "Full CRM setup (HubSpot, Zoho, Salesforce) mapped to your actual sales pipelines. We automate deal stage transitions, task assignments, customer tags, and live analytics tracking.",
        tags: ["HubSpot", "Zoho", "Pipeline"]
      },
      {
        name: "Lead Capture Automation",
        desc: "Multi-source lead capture — web forms, ads, WhatsApp → CRM.",
        fullDesc: "Aggregate incoming inquiries from all sources—forms, social, chat, ads—into one central CRM repository. Automatic source tagging, duplicate prevention, and routing rules.",
        tags: ["Lead Capture", "Multi-Source", "CRM"]
      },
      {
        name: "Sales Funnel Automation",
        desc: "Automated funnel stages — MQL to SQL to closed deal.",
        fullDesc: "Transition leads from marketing-qualified to sales-qualified based on automatic actions. Automate pipeline movements, deal creation, and sales team assignments.",
        tags: ["Funnel", "MQL", "SQL"]
      },
      {
        name: "Auto Follow-up System",
        desc: "Timed email + WhatsApp + SMS follow-up sequences after lead capture.",
        fullDesc: "Set up timed follow-up sequences across email, WhatsApp, and SMS triggered by lead actions. Maintains consistent client engagement on autopilot, increasing conversion rates by up to 45%.",
        tags: ["Follow-Up", "Sequences", "Multi-Channel"]
      },
      {
        name: "Pipeline Management",
        desc: "Deal tracking, stage automation & sales reporting dashboards.",
        fullDesc: "Streamline deal movements, transaction tracking, contract approvals, and closing updates. We build custom sales dashboards with automated notification triggers for your sales reps.",
        tags: ["Pipeline", "Deals", "Dashboard"]
      },
      {
        name: "Lead Scoring System",
        desc: "Behavioral scoring model to prioritize high-intent leads for sales team.",
        fullDesc: "Implement behavioral scoring systems based on prospect engagement—email clicks, page visits, message replies. Directs your sales team's focus only to high-value, ready-to-buy prospects.",
        tags: ["Scoring", "Intent", "Prioritization"]
      }
    ]
  },
  {
    id: "chat-automation",
    label: "Chat Automation",
    icon: "💡",
    color: "#ec4899",
    desc: "One unified AI brain across Instagram, Facebook & WhatsApp",
    services: [
      {
        name: "Instagram DM Automation",
        desc: "Auto-replies to story mentions, DMs & comment triggers on Instagram.",
        fullDesc: "Configure instant triggers for Instagram story mentions, comments on posts, or direct messages. Drive immediate user interactions, deliver links, and capture leads while engagement is highest.",
        tags: ["Instagram DM", "Story Triggers"]
      },
      {
        name: "Facebook Messenger Bot",
        desc: "AI messenger bot for page DMs, lead gen & customer support.",
        fullDesc: "Build automated Messenger sequences for page support, lead qualification, and immediate product suggestions. Highly optimized for Meta conversion campaigns.",
        tags: ["Messenger", "Facebook", "Lead Gen"]
      },
      {
        name: "Multi-Platform Chat Automation",
        desc: "Single AI agent managing WhatsApp + Instagram + Messenger in one flow.",
        fullDesc: "Deploy a single conversational AI logic that manages chats across WhatsApp, Instagram, and Messenger. Ensures your brand voice and data collections remain consistent everywhere.",
        tags: ["Multi-Platform", "Unified", "Omnichannel"]
      },
      {
        name: "Chatbot Integration",
        desc: "Integrate third-party chatbots (Landbot, Tidio, ManyChat) into your stack.",
        fullDesc: "Integrate third-party chatbot setups (ManyChat, Tidio, Landbot) with your backend database, CRM, and communication tools for seamless lead routing.",
        tags: ["ManyChat", "Tidio", "Landbot"]
      },
      {
        name: "AI Chat Agent with Memory",
        desc: "Context-aware AI that remembers past conversations for personalized replies.",
        fullDesc: "Empower your conversational AI with persistent memory layers. The bot remembers past customer interactions, product preferences, and timelines, offering highly personalized conversations.",
        tags: ["Memory", "Context", "Personalization"]
      }
    ]
  },
  {
    id: "analytics-&-tracking",
    label: "Analytics & Tracking",
    icon: "📈",
    color: "#8b5cf6",
    desc: "Accurate data infrastructure so every marketing decision is backed by real numbers",
    services: [
      {
        name: "GA4 Setup & Full Audit",
        desc: "Complete GA4 migration, event setup & conversion goal configuration.",
        fullDesc: "Complete Google Analytics 4 audit, migration, and custom conversion event mapping. We align web metrics with real business performance, tracking complete user journeys.",
        tags: ["GA4", "Events", "Conversions"]
      },
      {
        name: "Facebook Pixel & CAPI Setup",
        desc: "Meta Pixel + Conversions API for server-side tracking accuracy.",
        fullDesc: "Surgically install Meta Pixel and Conversions API (CAPI) for server-side tracking. Fixes tracking loss caused by browser ad-blockers or iOS 14+ updates, improving ad delivery.",
        tags: ["Pixel", "CAPI", "Server-Side"]
      },
      {
        name: "Conversion Tracking (Cross-Platform)",
        desc: "Unified conversion tracking across Google, Meta & organic channels.",
        fullDesc: "Track conversions across all platforms and traffic sources in one unified analytics model. Attributes conversions accurately to Google Ads, Meta Ads, or organic SEO.",
        tags: ["Attribution", "Cross-Platform", "Funnels"]
      },
      {
        name: "Custom Dashboard Setup",
        desc: "Looker Studio / Google Sheets dashboards with live data visualization.",
        fullDesc: "Create real-time, interactive Looker Studio or Google Sheets dashboards. Aggregates all marketing metrics, spend, and ROAS into easy-to-read charts for business decisions.",
        tags: ["Looker Studio", "Dashboard", "Live Data"]
      },
      {
        name: "Performance Reporting",
        desc: "Monthly automated reports — traffic, leads, ROAS & growth metrics.",
        fullDesc: "Generate automated monthly reports detailing traffic sources, lead generation cost, conversion rates, and exact ROAS. No vanity numbers, only insights that matter.",
        tags: ["Reports", "ROAS", "Growth"]
      }
    ]
  },
  {
    id: "custom-dev-&-tools",
    label: "Custom Dev & Tools",
    icon: "🛠️",
    color: "#f59e0b",
    desc: "Bespoke tools, bots & automation systems built exactly for your business processes",
    services: [
      {
        name: "Starter Automation Bot",
        desc: "Automate one core business task with basic workflow & 1 app integration.",
        fullDesc: "Automate one core operational workflow connecting up to two business apps. Perfect for basic form-to-sheet sync or simple automated notifications.",
        tags: ["Starter", "1 Integration", "Quick Setup"]
      },
      {
        name: "Business Pro Automation Suite",
        desc: "Complex multi-step automation with AI telecaller & 3 app integrations.",
        fullDesc: "Deploy advanced, multi-step workflows linking up to five core business tools. Includes AI lead qualification, conditional branching, and custom database integrations.",
        tags: ["Pro", "AI Telecaller", "Multi-App"]
      },
      {
        name: "Enterprise Automation Suite",
        desc: "End-to-end process automation, custom UI/dashboard & dedicated support.",
        fullDesc: "Full organizational workflow audit and end-to-end custom automation suite. Custom administrative portals, dedicated n8n setups, and persistent maintenance support.",
        tags: ["Enterprise", "Custom UI", "Dedicated"]
      },
      {
        name: "Custom API Development",
        desc: "REST APIs built to connect your business tools with custom logic.",
        fullDesc: "Build lightweight, high-performance REST APIs to bridge proprietary software databases with cloud automation tools. Secure, fast data sync under customized rules.",
        tags: ["REST API", "Custom Logic", "Integration"]
      },
      {
        name: "React / Next.js Website",
        desc: "High-performance web apps built with modern React & Next.js stack.",
        fullDesc: "Develop customized React/Next.js dynamic web applications optimized for sub-second load times, absolute security, and fluid user interactions.",
        tags: ["React", "Next.js", "Performance"]
      },
      {
        name: "Database Automation",
        desc: "Google Sheets, Airtable & Firebase-based automated database workflows.",
        fullDesc: "Establish automated databases using Firebase, Airtable, or custom sheets. Auto-sync, backup, clean, and format records dynamically.",
        tags: ["Firebase", "Airtable", "Google Sheets"]
      }
    ]
  }
];

/* ─── Helpers ─────────────────────────────────────────────────────────── */
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
.services-page{background:transparent;color:var(--tx1);font-family:var(--font-plus-jakarta), sans-serif;font-size:16px;line-height:1.7;min-height:100vh;width:100%;max-width:100vw;overflow-x:hidden;display:block}
.title-font{font-family:var(--font-instrument), sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px}
.section{padding:64px 0}
.hero{position:relative;overflow:hidden;padding:80px 20px 64px;text-align:center;background:radial-gradient(ellipse 90% 60% at 50% -10%,rgba(249,115,22,.13) 0%,transparent 65%);border-bottom:1px solid var(--bd)}
.hero-pill{display:inline-flex;align-items:center;gap:8px;padding:5px 16px;border-radius:var(--rxl);background:var(--or-dim);border:1px solid rgba(249,115,22,.28);font-size:12px;font-weight:600;color:var(--or);letter-spacing:.6px;text-transform:uppercase;margin-bottom:22px}
.hero h1{font-size:clamp(2.2rem,5.5vw,3.8rem);font-weight:800;line-height:1.1;margin-bottom:18px;letter-spacing:-.8px;font-family:var(--font-instrument),sans-serif}
.hero h1 em{color:var(--or);font-style:normal}
.hero-sub{font-size:18px;color:var(--tx2);max-width:620px;margin:0 auto 24px;line-height:1.65}
.hero-intro-box{max-width:760px;margin:0 auto 36px;font-size:14.5px;color:var(--tx3);line-height:1.7;text-align:center;background:var(--bg2);border:1px solid var(--bd);padding:20px;border-radius:var(--r)}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-bottom:1px solid var(--bd)}
.stat{background:var(--bg);padding:22px 20px;text-align:center;border-right:1px solid var(--bd)}
.stat-n{font-family:var(--font-instrument), sans-serif;font-size:28px;font-weight:800;color:var(--or);line-height:1}
.stat-l{font-size:12px;color:var(--tx3);margin-top:4px;font-weight:700}
.stat-s{font-size:10px;color:var(--tx4);margin-top:2px;text-transform:uppercase;font-weight:500;letter-spacing:0.4px}
.main-tabs{display:flex;background:var(--bg2);border-bottom:2px solid var(--bd);position:sticky;top:0;z-index:100;width:100%;max-width:100vw}
.main-tab{flex:1;padding:18px 24px;font-family:var(--font-instrument), sans-serif;font-size:15px;font-weight:700;border:none;background:transparent;color:var(--tx3);cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px}
.main-tab.on{color:var(--or);border-bottom-color:var(--or);background:rgba(249,115,22,.04)}
.tab-count{background:var(--bg3);border:1px solid var(--bd);color:var(--tx4);font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px}
.cat-strip-wrap{background:var(--bg2);border-bottom:1px solid var(--bd);position:sticky;top:56px;z-index:99;width:100%;max-width:100vw}
.cat-strip{display:flex;gap:8px;padding:12px 40px;overflow-x:auto;scrollbar-width:none}
.cat-strip::-webkit-scrollbar{display:none}
.scroll-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;width:32px;height:32px;border-radius:50%;background:var(--bg2);border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;color:var(--tx1);cursor:pointer;transition:all .2s;box-shadow:0 4px 12px rgba(0,0,0,0.1)}
.scroll-arrow.left{left:8px}.scroll-arrow.right{right:8px}
.cat-btn{flex-shrink:0;padding:8px 16px;border-radius:var(--rsm);border:1.5px solid var(--bd);background:transparent;color:var(--tx3);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:6px;white-space:nowrap}
.cat-btn.on{background:var(--or);border-color:var(--or);color:#fff}
.cat-section{margin-bottom:56px;scroll-margin-top:120px}
.cat-header{display:flex;align-items:center;gap:16px;padding:20px 0;margin-bottom:24px;border-bottom:2px solid var(--bd);position:relative}
.cat-icon-big{width:44px;height:44px;border-radius:10px;background:var(--cat-dim);border:1.5px solid var(--cat-bd);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.cat-title{font-family:var(--font-instrument), sans-serif;font-size:22px;font-weight:800;color:var(--tx1);line-height:1.2}
.cat-desc{font-size:13.5px;color:var(--tx3);margin-top:4px;max-width:600px;line-height:1.6;font-weight:500}
.cat-service-count{font-size:11px;font-weight:700;color:var(--cat-color);background:var(--cat-dim);border:1px solid var(--cat-bd);padding:3px 12px;border-radius:20px;text-transform:uppercase}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(288px,1fr));gap:16px}
.svc{background:var(--bg2);border:1.5px solid var(--bd2);border-radius:var(--r);padding:24px;position:relative;overflow:hidden;transition:all .3s flex flex-col justify-between}
.svc:hover{border-color:var(--cat-bd2);transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.15)}
.svc-name{font-family:var(--font-instrument), sans-serif;font-size:17.5px;font-weight:700;color:var(--tx1);margin-bottom:8px;line-height:1.35;letter-spacing:-0.2px}
.svc-desc{font-size:13px;color:var(--tx3);line-height:1.6;margin-bottom:12px}
.svc-full-desc{font-size:13.5px;color:var(--tx2);line-height:1.65;margin-bottom:16px;border-top:1px dashed var(--bd);padding-top:12px}
.svc-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;margin-top:auto}
.svc-tag{padding:3px 10px;background:var(--bg3);border:1px solid var(--bd);border-radius:20px;font-size:11px;color:var(--tx3);font-weight:600;letter-spacing:0.2px}
.svc-link{display:inline-flex;align-items:center;gap:5px;font-size:13px;font-weight:700;color:var(--cat-color);transition:gap .15s;letter-spacing:0.4px;text-transform:uppercase}
.svc-link:hover{gap:8px}

.process-section{background:var(--bg2);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:72px 0}
.process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px}
.process-card{background:var(--bg);border:1.5px solid var(--bd);border-radius:var(--r);padding:28px 24px;position:relative;transition:all .2s}
.process-card:hover{border-color:var(--or)}
.process-num{font-family:var(--font-instrument), sans-serif;font-size:44px;font-weight:800;color:var(--or);line-height:1;margin-bottom:12px;opacity:0.95}
.process-title{font-size:16px;font-weight:700;color:var(--tx1);margin-bottom:8px}
.process-desc{font-size:13px;color:var(--tx3);line-height:1.6}

.verticals-section{padding:72px 0}
.verticals-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:36px;max-width:880px;margin-left:auto;margin-right:auto}
.vertical-pill{padding:8px 18px;background:var(--bg2);border:1.5px solid var(--bd);border-radius:999px;font-size:13px;font-weight:600;color:var(--tx2);cursor:default;transition:all .2s}
.vertical-pill:hover{background:var(--or);border-color:var(--or);color:#fff;transform:scale(1.03)}

.faq-section{background:var(--bg2);border-top:1px solid var(--bd);padding:72px 0}
.faq-wrap{max-width:760px;margin:40px auto 0;display:flex;flex-direction:column;gap:12px}
.faq-details{background:var(--bg);border:1.5px solid var(--bd);border-radius:var(--r);overflow:hidden;transition:all .2s}
.faq-details[open]{border-color:var(--or)}
.faq-summary{padding:18px 24px;font-weight:700;font-size:15px;color:var(--tx1);cursor:pointer;list-style:none;position:relative;display:flex;justify-content:between;align-items:center;outline:none}
.faq-summary::-webkit-details-marker{display:none}
.faq-summary::after{content:'+';font-family:var(--font-instrument),sans-serif;font-size:20px;font-weight:600;color:var(--tx3);transition:transform .2s}
.faq-details[open] .faq-summary::after{content:'-';color:var(--or)}
.faq-content{padding:0 24px 20px;font-size:13.5px;color:var(--tx3);line-height:1.7}

@media(max-width:1024px){
  .process-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:768px){
  .stats{grid-template-columns:repeat(2,1fr)}
  .stat{border-bottom:1px solid var(--bd)}
  .stat:nth-child(2n){border-right:none}
  .process-grid{grid-template-columns:1fr}
}
.hidden{display:none !important}
`;

function CatSection({ cat }: { cat: any }) {
  const styleVars = {
    "--cat-color": cat.color,
    "--cat-dim": hexToRgba(cat.color, 0.1),
    "--cat-bd": hexToRgba(cat.color, 0.25),
    "--cat-bd2": hexToRgba(cat.color, 0.4),
  } as React.CSSProperties;

  return (
    <div className="cat-section" id={cat.id} style={styleVars}>
      <div className="cat-header">
        <div className="cat-icon-big">{cat.icon}</div>
        <div className="cat-info">
          <div className="cat-title">{cat.label}</div>
          <div className="cat-desc">{cat.desc}</div>
        </div>
        <span className="cat-service-count">{cat.services.length} services</span>
      </div>
      <div className="svc-grid">
        {cat.services.map((s: any) => (
          <div className="svc flex flex-col justify-between" key={s.name}>
            <div>
              <div className="svc-name">{s.name}</div>
              <p className="svc-desc">{s.desc}</p>
              <p className="svc-full-desc">{s.fullDesc || s.desc}</p>
            </div>
            <div className="mt-auto">
              <div className="svc-tags">
                {s.tags?.map((t: string) => <span className="svc-tag" key={t}>{t}</span>)}
              </div>
              <Link href="/contact" className="svc-link">Get Free Quote →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesClient({ isHi, initialServices }: { isHi: boolean, initialServices: any[] }) {
  const [mainTab, setMainTab] = useState("dm");
  const [dmCat, setDmCat] = useState("all");
  const [aiCat, setAiCat] = useState("all");
  
  const dmStripRef = useRef<HTMLDivElement>(null);
  const aiStripRef = useRef<HTMLDivElement>(null);

  const scrollStrip = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 400;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const dmCategories = useMemo(() => {
    const groups = [...DM_CATEGORIES.map(c => ({ ...c, services: c.services.map(s => ({ ...s })) }))];
    initialServices?.forEach((s: any) => {
      const isDM = s.planType === 'dm' || (!s.planType && ["smm", "seo", "content", "ppc", "ecommerce", "email", "design", "web", "orm", "analytics", "video", "branding"].includes(s.category || ''));
      if (isDM && s.category) {
        let group = groups.find(g => g.id === s.category);
        if (!group) {
          group = {
            id: s.category,
            label: s.categoryLabel || s.category.toUpperCase(),
            icon: s.categoryIcon || "✨",
            color: s.categoryColor || "#f97316",
            desc: s.categoryDesc || "",
            services: []
          };
          groups.push(group);
        }
        // Duplicate check
        if (!group.services.some(srv => srv.name === s.name)) {
          group.services.push({ name: s.name, desc: s.description || "", fullDesc: s.description || "", tags: s.features || [] });
        }
      }
    });
    return groups;
  }, [initialServices]);

  const aiCategories = useMemo(() => {
    const groups = [...AI_CATEGORIES.map(c => ({ ...c, services: c.services.map(s => ({ ...s })) }))];
    initialServices?.forEach((s: any) => {
      const isAI = s.planType === 'ai' || (!s.planType && ["whatsapp", "n8n", "aiagents", "crm", "chatautomation", "analytics-ai", "custom-dev"].includes(s.category || ''));
      if (isAI && s.category) {
        let group = groups.find(g => g.id === s.category);
        if (!group) {
          group = {
            id: s.category,
            label: s.categoryLabel || s.category.toUpperCase(),
            icon: s.categoryIcon || "🤖",
            color: s.categoryColor || "#f97316",
            desc: s.categoryDesc || "",
            services: []
          };
          groups.push(group);
        }
        if (!group.services.some(srv => srv.name === s.name)) {
          group.services.push({ name: s.name, desc: s.description || "", fullDesc: s.description || "", tags: s.features || [] });
        }
      }
    });
    return groups;
  }, [initialServices]);

  const dmTotal = dmCategories.reduce((s, c) => s + c.services.length, 0);
  const aiTotal = aiCategories.reduce((s, c) => s + c.services.length, 0);

  const dmFiltered = dmCat === "all" ? dmCategories : dmCategories.filter((c) => c.id === dmCat);
  const aiFiltered = aiCat === "all" ? aiCategories : aiCategories.filter((c) => c.id === aiCat);

  return (
    <div className="services-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── HERO ── */}
      <div className="hero">
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-pill">AI-First Agency · Vijay Nagar, Indore</div>
          <h1>One Agency.<br /><em>Every Service</em> You Need.</h1>
          <p className="hero-sub">
            {isHi 
              ? "डिजिटल मार्केटिंग से लेके व्हाट्सएप एआई बॉट्स तक — इंदौर के SMBs के लिए कंप्लीट डिजिटल इकोसिस्टम एक ही जगह।"
              : "From digital marketing to WhatsApp AI bots — a complete digital ecosystem for Indore's SMBs in one place."}
          </p>
          <div className="hero-intro-box">
            AdsVerse is an AI-first digital marketing agency headquartered in Vijay Nagar, Indore. 
            We offer 75+ in-house digital marketing and automation services — from <Link href="/locations/indore" className="text-orange-500 hover:underline font-semibold">local SEO</Link> and 
            Google Ads to <Link href="/services/whatsapp-bot" className="text-orange-500 hover:underline font-semibold">WhatsApp AI bots</Link>, <Link href="/services/automation-tools" className="text-orange-500 hover:underline font-semibold">n8n CRM workflows</Link>, and custom <Link href="/portfolio" className="text-orange-500 hover:underline font-semibold">Next.js websites</Link> web development. 
            No outsourcing. No white-labelling. Every service is delivered by our core team with 
            full transparency, live dashboards, and a performance guarantee.
          </div>
          <div className="hero-btns">
            <Link href="/contact" className="px-7 py-3.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
              Get Free Strategy Call →
            </Link>
            <Link href="/pricing" className="px-7 py-3.5 border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-bold hover:border-orange-500 hover:text-orange-500 transition-all">
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats">
        {[
          ["113+", "Brands Served", "Pan-India since 2022"], 
          ["75+", "Services In-House", "Zero outsourcing"], 
          ["3.8x", "Avg. ROAS", "Across active ad accounts"], 
          ["4.9★", "Google Rating", "Verified client reviews"]
        ].map(([n, l, s]) => (
          <div className="stat" key={l}>
            <div className="stat-n">{n}</div>
            <div className="stat-l">{l}</div>
            <div className="stat-s">{s}</div>
          </div>
        ))}
      </div>

      {/* ── MAIN TABS ── */}
      <div className="main-tabs">
        <button className={`main-tab ${mainTab === "dm" ? "on" : ""}`} onClick={() => setMainTab("dm")}>
          <span>📈</span>
          <span className="label">{isHi ? "डिजिटल मार्केटिंग" : "Digital Marketing"}</span>
          <span className="tab-count">{dmTotal}</span>
        </button>
        <button className={`main-tab ${mainTab === "ai" ? "on" : ""}`} onClick={() => setMainTab("ai")}>
          <span>🤖</span>
          <span className="label">{isHi ? "AI और ऑटोमेशन" : "AI & Automation"}</span>
          <span className="tab-count">{aiTotal}</span>
        </button>
      </div>

      {/* ── CONTENT ── */}
      {/* Dynamic Tabs Server Rendered / Indexable by Crawlers */}
      <div className={mainTab === "dm" ? "" : "hidden"}>
        <div className="cat-strip-wrap">
          <button className="scroll-arrow left" onClick={() => scrollStrip(dmStripRef, 'left')}>
            <ChevronLeft size={18} />
          </button>
          <div className="cat-strip" ref={dmStripRef}>
            <button className={`cat-btn ${dmCat === "all" ? "on" : ""}`} onClick={() => setDmCat("all")}>
              🗂️ {isHi ? "सभी कैटेगरीज" : "All Categories"}
            </button>
            {dmCategories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={`cat-btn ${dmCat === c.id ? "on" : ""}`}
                onClick={(e) => {
                  setDmCat(c.id);
                }}
                style={dmCat === c.id ? { background: c.color, borderColor: c.color } : {}}
              >
                <span className="cat-icon">{c.icon}</span> {c.label}
              </a>
            ))}
          </div>
          <button className="scroll-arrow right" onClick={() => scrollStrip(dmStripRef, 'right')}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="wrap section">
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-2">
              {dmCat === "all" ? (isHi ? "डिजिटल मार्केटिंग सेवाएं" : "Complete Digital Marketing Services") : dmCategories.find(c => c.id === dmCat)?.label}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              {dmCat === "all" 
                ? (isHi ? "सब कुछ इन-हाउस — कोई आउटसोर्सिंग नहीं। " : "Everything in-house — no outsourcing, no excuses. ") + dmTotal + " services."
                : dmCategories.find(c => c.id === dmCat)?.desc}
            </p>
          </div>

          {dmFiltered.map((cat) => (
            <CatSection key={cat.id} cat={cat} />
          ))}
        </div>
      </div>

      <div className={mainTab === "ai" ? "" : "hidden"}>
        <div className="cat-strip-wrap">
          <button className="scroll-arrow left" onClick={() => scrollStrip(aiStripRef, 'left')}>
            <ChevronLeft size={18} />
          </button>
          <div className="cat-strip" ref={aiStripRef}>
            <button className={`cat-btn ${aiCat === "all" ? "on" : ""}`} onClick={() => setAiCat("all")}>
              🗂️ {isHi ? "सभी कैटेगरीज" : "All Categories"}
            </button>
            {aiCategories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={`cat-btn ${aiCat === c.id ? "on" : ""}`}
                onClick={(e) => {
                  setAiCat(c.id);
                }}
                style={aiCat === c.id ? { background: c.color, borderColor: c.color } : {}}
              >
                <span className="cat-icon">{c.icon}</span> {c.label}
              </a>
            ))}
          </div>
          <button className="scroll-arrow right" onClick={() => scrollStrip(aiStripRef, 'right')}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="wrap section">
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-2">
              {aiCat === "all" ? (isHi ? "एआई और ऑटोमेशन" : "AI & Automation Solutions") : aiCategories.find(c => c.id === aiCat)?.label}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              {aiCat === "all" 
                ? (isHi ? "स्मार्ट वर्कफ्لو और एआई एजेंट्स। " : "Intelligent workflows and AI agents. ") + aiTotal + " solutions."
                : aiCategories.find(c => c.id === aiCat)?.desc}
            </p>
          </div>

          {aiFiltered.map((cat) => (
            <CatSection key={cat.id} cat={cat} />
          ))}
        </div>
      </div>

      {/* ── PROCESS SECTION ── */}
      <div className="process-section">
        <div className="wrap">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl font-black">How We Work — From Onboarding to Results</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm">Every client engagement follows a proven 4-step process — no surprises, no scope creep.</p>
          </div>
          <div className="process-grid">
            {[
              {
                step: "01",
                title: "Discovery & Audit",
                desc: "We audit your current digital presence — SEO health, ad account history, website performance, and competitor landscape. This takes 2-3 days and is completely free. We even map key metrics using our custom audit tools."
              },
              {
                step: "02",
                title: "Strategy & Roadmap",
                desc: "Based on the audit, we build a 90-day strategy document — channels, budgets, timelines, and KPIs. You see exactly what will be done and when before a single rupee is spent."
              },
              {
                step: "03",
                title: "Execution & Automation",
                desc: "Our team executes the strategy — campaigns go live, automations are deployed, content is published. You get a live dashboard from day one. Average onboarding: 48-72 hours."
              },
              {
                step: "04",
                title: "Optimize & Scale",
                desc: "Weekly performance reviews. Monthly strategy calls. We optimize based on data — cutting what doesn't work, doubling down on what does. Most clients scale budgets by month 3."
              }
            ].map((p) => (
              <div className="process-card" key={p.step}>
                <div className="process-num">{p.step}</div>
                <div className="process-title">{p.title}</div>
                <p className="process-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INDUSTRY VERTICALS ── */}
      <div className="verticals-section">
        <div className="wrap">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black">Industries We Serve</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm">
              AdsVerse works with Indian businesses across 12+ industry verticals — with strategies tuned to each market's buyer behavior, seasonality, and competition.
            </p>
          </div>
          <div className="verticals-grid">
            {[
              "Real Estate & Construction",
              "Healthcare & Clinics",
              "Education & Coaching Institutes",
              "E-Commerce & D2C Brands",
              "Retail & Local Businesses",
              "Hospitality & Tourism",
              "Legal & Professional Services",
              "Manufacturing & Industrial B2B",
              "Finance & Insurance",
              "SaaS & Tech Startups",
              "Food & Restaurants",
              "NGOs & Social Enterprises"
            ].map((v) => (
              <div className="vertical-pill" key={v}>
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ACCORDION ── */}
      <div className="faq-section">
        <div className="wrap">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm">Get clear, upfront answers about our delivery timeline, processes, and service guarantees.</p>
          </div>
          <div className="faq-wrap">
            {[
              {
                q: "How is AdsVerse different from other digital marketing agencies?",
                a: "We are an AI-first agency — meaning AI automation is built into every service we offer, not offered as an add-on. We use n8n workflows, Gemini API integrations, and WhatsApp AI bots to automate lead handling, reporting, and client communication. Every service is delivered in-house — no outsourcing. We serve 113+ brands with full transparency, live dashboards, and performance guarantees."
              },
              {
                q: "How much does digital marketing cost with AdsVerse?",
                a: "Our packages start from ₹8,000/month for local SEO and go up based on scope, channels, and ad spend. We offer transparent, tiered pricing — visit our Pricing page for full details. No hidden fees, no mandatory long-term contracts for most services."
              },
              {
                q: "How long does it take to see results from SEO?",
                a: "Local SEO results are typically visible within 60-90 days. Competitive national keywords take 4-6 months. Paid ads (Google/Meta) can deliver leads within 48 hours of going live. We set clear timelines in your strategy document before starting."
              },
              {
                q: "Can AdsVerse handle both digital marketing and automation together?",
                a: "Yes — this is our core strength. We connect your ad campaigns, website forms, WhatsApp, and CRM into a single automated pipeline. Leads from Meta Ads can trigger WhatsApp bot conversations, qualify automatically, and enter your CRM — without any manual work."
              },
              {
                q: "Do you work with businesses outside of Indore?",
                a: "Yes. While we are headquartered in Vijay Nagar, Indore, we serve clients across 18+ cities including Bhopal, Jaipur, Lucknow, Raipur, Noida, Patna, Guwahati, and more. All work is delivered remotely with weekly video calls, live dashboards, and full transparency."
              },
              {
                q: "What makes your WhatsApp AI bots different from regular chatbots?",
                a: "Our bots are built on the official Meta WhatsApp Business API — not third-party tools. They are trained on your business context, handle multi-turn conversations, qualify leads, book appointments, and push data to your CRM or Google Sheets — all without human intervention. Built and deployed in 5-7 working days."
              },
              {
                q: "Do I need to sign a long-term contract?",
                a: "Most services are month-to-month after an initial 3-month commitment (needed to show SEO results). Paid ad management, WhatsApp bots, and web development have no long-term contracts. We prefer to retain clients through results, not paperwork."
              }
            ].map((faq, index) => (
              <details className="faq-details" key={index}>
                <summary className="faq-summary">
                  <span>{faq.q}</span>
                </summary>
                <div className="faq-content">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="wrap section text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-black title-font">Ready to Automate & Scale?</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Partner with India's premium AI-first digital marketing agency. Book a free consultation and get your customized 90-day growth roadmap today.
        </p>
        <div className="pt-2">
          <Link href="/contact" className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all">
            Get Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
