/* ─────────────────────────────────────────────
   COMPLETE SERVICES DATA (Shared Resource)
   ───────────────────────────────────────────── */

export interface ServiceItem {
  name: string;
  desc: string;
  fullDesc: string;
  tags: string[];
  href?: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  desc: string;
  services: ServiceItem[];
}

export const DM_CATEGORIES: ServiceCategory[] = [
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
        tags: ["Management", "Scheduling", "Analytics"],
        href: "/services/social-media-management"
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
        name: "SEO Optimization Services",
        desc: "Comprehensive search engine optimization services for long-term organic growth.",
        fullDesc: "Scale your organic traffic, rank #1 on Google for high-intent keywords, and build long-term brand equity with our custom-tailored on-page, technical, off-page, and local SEO services.",
        tags: ["Google Rank", "Organic Traffic", "SEO"],
        href: "/services/seo-optimization"
      },
      {
        name: "GEO & AEO Optimization",
        desc: "Optimize content for citations in AI Search engines like Gemini, ChatGPT & Perplexity.",
        fullDesc: "Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) to make your brand visible in AI search answers by Gemini, ChatGPT, Claude, and Perplexity. We structure your website content to match AI citation criteria.",
        tags: ["AI Search", "AEO", "GEO"],
        href: "/services/geo-optimization"
      },
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
        tags: ["Audit", "Report", "Action Plan"],
        href: "/tools/seo-audit"
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
        tags: ["SEO Writing", "Intent", "Ranking"],
        href: "/services/content-marketing"
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
        tags: ["Meta", "Lead Gen", "Conversions"],
        href: "/services/paid-ads"
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
        tags: ["Lead Gen", "Funnel", "CRM"],
        href: "/services/lead-generation"
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
        tags: ["Business", "CMS", "Responsive"],
        href: "/services/web-design-development"
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
        tags: ["Positioning", "USP", "Messaging"],
        href: "/services/brand-strategy"
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

export const AI_CATEGORIES: ServiceCategory[] = [
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
        tags: ["AI Bot", "Persona", "Hinglish"],
        href: "/services/whatsapp-bot"
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
        tags: ["n8n", "Self-Hosted", "Cloud"],
        href: "/services/automation-tools"
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

export const getServicePrice = (name: string): number => {
  const n = name.toLowerCase();
  if (n.includes("local seo")) return 9600;
  if (n.includes("e-commerce seo")) return 23000;
  if (n.includes("on-page")) return 14400;
  if (n.includes("technical seo")) return 12000;
  if (n.includes("keyword")) return 6000;
  if (n.includes("google ads")) return 12000;
  if (n.includes("meta ads") || n.includes("facebook ads")) return 10800;
  if (n.includes("linkedin ads")) return 14400;
  if (n.includes("social media")) return 18000;
  if (n.includes("instagram")) return 6000;
  if (n.includes("influencer")) return 15000;
  if (n.includes("blog")) return 12000;
  if (n.includes("reel") || n.includes("video")) return 12000;
  if (n.includes("brand") || n.includes("logo")) return 30000;
  if (n.includes("graphics")) return 10800;
  if (n.includes("website") || n.includes("web")) return 36000;
  if (n.includes("e-commerce store")) return 96000;
  if (n.includes("maintenance")) return 6000;
  if (n.includes("chatbot") || n.includes("bot")) return 14400;
  if (n.includes("crm")) return 24000;
  return 12000; // default estimated price
};

export const getServiceSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') // remove special chars
    .replace(/\s+/g, '-')                      // replace spaces with -
    .replace(/-+/g, '-');                      // collapse multiple -
};

export const getServiceBySlug = (slug: string): { service: ServiceItem; category: ServiceCategory } | null => {
  const allCategories = [...DM_CATEGORIES, ...AI_CATEGORIES];
  for (const category of allCategories) {
    for (const s of category.services) {
      const currentSlug = getServiceSlug(s.name);
      if (currentSlug === slug) {
        return { service: s, category };
      }
    }
  }
  return null;
};
