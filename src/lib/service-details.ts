export interface CategoryDetail {
  workflows: { step: string; title: string; description: string }[];
  deliverables: string[];
  tools: string[];
  faqs: { question: string; answer: string }[];
  deepDive: {
    strategyHeading: string;
    strategyBody: string;
    techHeading: string;
    techBody: string;
    roiHeading: string;
    roiBody: string;
  };
}

export function getCategoryDetails(categoryId: string, serviceName: string, tags: string[] = []): CategoryDetail {
  const primaryTag = tags[0] || "Performance";
  const secondaryTag = tags[1] || "Growth";

  switch (categoryId) {
    case "paid-ads":
      return {
        workflows: [
          {
            step: "01",
            title: "Audience & Competitor Intelligence Audit",
            description: `We analyze competitor ad creative libraries, historic keyword CPCs, and purchase intent signals for ${serviceName} to identify high-converting market segments.`,
          },
          {
            step: "02",
            title: "Conversion Tracking & Server-Side CAPI Setup",
            description: "We deploy Meta Conversions API (CAPI), Google Enhanced Conversions, and GA4 custom events to guarantee 100% data fidelity and eliminate iOS/ad-blocker tracking loss.",
          },
          {
            step: "03",
            title: "High-Velocity Creative & Ad Set Testing",
            description: `We launch multi-variant testing across UGC hooks, direct response copies, and responsive search ads tailored to ${primaryTag} and ${secondaryTag}.`,
          },
          {
            step: "04",
            title: "ROAS Scaling & Automated Bid Management",
            description: "We shift budget into winning ad sets, optimize Target CPA / Target ROAS bidding algorithms, and upload offline CRM conversions to train advertising algorithms.",
          },
        ],
        deliverables: [
          `Customized Campaign Architecture for ${serviceName}`,
          "Pixel, CAPI & Enhanced Conversion Tracking Integration",
          "Weekly Creative Iterations & A/B Copy Variations",
          "Real-Time Looker Studio ROAS & CPL Dashboard",
        ],
        tools: ["Meta Ads Manager", "Google Ads Editor", "Looker Studio", "Google Tag Manager", "Semrush"],
        faqs: [
          {
            question: `What budget is recommended to start ${serviceName}?`,
            answer: `We recommend a minimum testing ad spend of ₹15,000 to ₹30,000 per month for ${serviceName}. This provides sufficient conversion data for machine learning bidding models to optimize effectively within the first 14 days.`,
          },
          {
            question: `How quickly will we see measurable results from ${serviceName}?`,
            answer: `Paid campaigns typically start generating traffic and initial leads within 48 to 72 hours of campaign launch. Full algorithmic maturity and consistent ROAS stabilization occur within 2 to 3 weeks of ongoing creative testing.`,
          },
          {
            question: "How do you prevent ad fatigue and rising customer acquisition costs?",
            answer: "We employ a weekly creative refresh cycle—testing new hooks, headline formats, and user-generated video angles while maintaining audience segment exclusions to avoid audience saturation.",
          },
          {
            question: `Do we own the ad accounts and creative assets?`,
            answer: `Yes, 100%. All advertising campaigns for ${serviceName} run directly inside your company's official business managers and ad accounts. You maintain complete ownership of all data, pixels, and creatives.`,
          },
        ],
        deepDive: {
          strategyHeading: `Data-Driven Performance Strategy for ${serviceName}`,
          strategyBody: `In modern performance marketing, relying on generic targeting wastes capital. Our execution for ${serviceName} focuses on full-funnel customer acquisition. We construct segmented buyer personas, isolate high-intent transactional search queries, and craft persuasive ad copies that directly address buyer objections before they click.`,
          techHeading: "Server-Side Tracking & Full Attribution Infrastructure",
          techBody: "Browser privacy changes and ad blockers cause standard client-side tracking to lose up to 30% of conversion signals. We implement robust server-side webhook pipelines and Meta Conversions API (CAPI) alongside Google Enhanced Conversions, ensuring every purchase, call, and lead is attributed accurately back to the originating campaign.",
          roiHeading: "Maximizing ROAS & Scalable Cost-Per-Acquisition",
          roiBody: `Our objective with ${serviceName} is sustainable profitability. We continuously monitor Cost Per Lead (CPL), Customer Acquisition Cost (CAC), and Return on Ad Spend (ROAS). By cutting underperforming ad variants early and compounding budget on top-performing assets, we help brands scale spend confidently without sacrificing margins.`,
        },
      };

    case "seo":
      return {
        workflows: [
          {
            step: "01",
            title: "Comprehensive Technical & Crawlability Audit",
            description: `We inspect site architecture, Core Web Vitals, crawl errors, canonical tags, and schema markup to ensure search engines can index ${serviceName} pages seamlessly.`,
          },
          {
            step: "02",
            title: "Search Intent & Topical Semantic Mapping",
            description: `We map transactional, informational, and local search queries relevant to ${primaryTag} into structured topical clusters with clear keyword prioritization.`,
          },
          {
            step: "03",
            title: "On-Page Optimization & Generative Search Structuring",
            description: "We optimize title tags, heading hierarchies, internal linking, and structured JSON-LD data to capture Google 3-Pack, traditional organic rankings, and AI citations.",
          },
          {
            step: "04",
            title: "Authority Building & Continuous Rank Monitoring",
            description: "We build authoritative, niche-relevant citations and high-DA backlinks while tracking weekly keyword position movement in Google Search Console and Bing Webmaster Tools.",
          },
        ],
        deliverables: [
          `Complete Technical & On-Page SEO Roadmap for ${serviceName}`,
          "Keyword Clustering & Content Opportunity Blueprint",
          "JSON-LD Structured Schema Implementation",
          "Monthly Organic Traffic, Keyword Movement & Backlink Report",
        ],
        tools: ["Ahrefs", "Semrush", "Google Search Console", "Bing Webmaster Tools", "Screaming Frog"],
        faqs: [
          {
            question: `How long does it take to rank on Google for ${serviceName}?`,
            answer: `Technical fixes and low-competition local keywords often show movement within 4 to 8 weeks. Highly competitive national transactional terms typically require 3 to 6 months of compounding on-page optimization, content publishing, and backlink authority building.`,
          },
          {
            question: `Does your ${serviceName} include GEO (Generative Engine Optimization)?`,
            answer: `Yes. We format data structures, schema markups, and factual answer blocks so that your brand is recognized and cited by AI engines like ChatGPT Search, Perplexity, and Google AI Overviews.`,
          },
          {
            question: "What white-hat techniques do you use for link building?",
            answer: "We focus entirely on white-hat outreach: digital PR, niche directory citations (e.g. Justdial, IndiaMart), guest editorial contributions on DA 40+ industry websites, and unlinked brand mention reclamation.",
          },
          {
            question: "How do you track ranking progress and organic conversions?",
            answer: "We provide access to real-time rank tracking dashboards integrated with Google Search Console and Google Analytics 4, tracking keyword positions, click-through rates, and organic lead submissions.",
          },
        ],
        deepDive: {
          strategyHeading: `Search Authority & Intent Architecture for ${serviceName}`,
          strategyBody: `Search engines prioritize websites that demonstrate genuine subject-matter expertise (E-E-A-T). Our approach to ${serviceName} builds topical authority through comprehensive content clustering, answering exact customer search queries, and organizing content with clear hierarchy.`,
          techHeading: "Technical SEO Foundation & Core Web Vitals Optimization",
          techBody: "A slow or poorly structured website will struggle to rank regardless of content quality. We audit and optimize Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), mobile-first responsive rendering, and clean XML sitemaps to ensure search engine spiders encounter zero friction.",
          roiHeading: "Compounding Organic Growth & Lower CAC",
          roiBody: `Unlike paid advertising which stops generating traffic when spend ceases, organic rankings from ${serviceName} build a permanent digital asset. Ranking on page 1 for high-intent transactional search terms delivers steady, high-margin customer inquiries month after month at near-zero incremental cost.`,
        },
      };

    case "whatsapp-ai":
    case "ai-agents-&-bots":
    case "chat-automation":
      return {
        workflows: [
          {
            step: "01",
            title: "Business Logic & Conversation Mapping",
            description: `We map your complete sales and qualification funnel for ${serviceName}, defining qualifying criteria, customer FAQs, and CRM routing rules.`,
          },
          {
            step: "02",
            title: "API Connection & LLM Prompt Engineering",
            description: "We configure the official Meta WhatsApp Business API and integrate Gemini AI models trained specifically on your company's pricing, services, and inventory.",
          },
          {
            step: "03",
            title: "CRM Sync & Database Webhook Pipelines",
            description: "We build n8n and REST API webhook pipelines to instantly log lead contact details, conversation summaries, and appointment bookings into your database.",
          },
          {
            step: "04",
            title: "Stress Testing & Live Agent Fallback Routing",
            description: "We test conversational edge cases in Hinglish and English, setting up seamless warm transfers to human team members when high-value inquiries require personal attention.",
          },
        ],
        deliverables: [
          `Custom Gemini-Powered AI Bot Architecture for ${serviceName}`,
          "Official Meta Cloud API Verification & Number Setup",
          "Automated CRM & Google Sheets Lead Logging Webhooks",
          "Conversation Flow Templates & Human Fallback System",
        ],
        tools: ["Meta WhatsApp Cloud API", "Google Gemini Pro/Flash", "n8n Automation", "Make.com", "Postman"],
        faqs: [
          {
            question: `Does the AI bot for ${serviceName} support Hinglish and regional phrasing?`,
            answer: "Yes. Our Gemini-backed models understand natural mixed Hinglish (e.g., 'mujhe pricing aur demo chahiye') as well as formal English, responding in an accurate, conversational brand tone.",
          },
          {
            question: "Is there any risk of WhatsApp number blocking or ban?",
            answer: "No. We build exclusively on the official Meta WhatsApp Business Cloud API with pre-approved message templates, opt-in consent protocols, and full DPDP compliance, eliminating ban risks associated with unauthorized automation tools.",
          },
          {
            question: `Can the bot sync leads directly to our CRM or Google Sheets?`,
            answer: "Yes, instantly. As soon as a user provides their name, requirement, or contact information, our automated n8n pipeline parses the data and writes it to your CRM (Zoho, HubSpot, Salesforce) or Google Sheet in under 2 seconds.",
          },
          {
            question: "What happens when a customer asks a complex question the bot cannot answer?",
            answer: "The bot automatically triggers a human-handoff notification to your sales team via WhatsApp group alert, email, or CRM task with the full conversation transcript.",
          },
        ],
        deepDive: {
          strategyHeading: `24/7 Instant Lead Qualification for ${serviceName}`,
          strategyBody: `Studies show that replying to inbound inquiries within 5 minutes increases conversion rates by over 300%. Our AI automation for ${serviceName} ensures that no customer wait time exists, qualifying customer budgets, location, and service requirements around the clock.`,
          techHeading: "Enterprise Meta Cloud API & Contextual LLM Memory",
          techBody: "We integrate enterprise-tier AI logic with persistent session memory. The assistant recalls previous customer messages, handles multi-turn conversations gracefully, and enforces strict boundary guardrails so it never hallucinates pricing or policies outside your verified knowledge base.",
          roiHeading: "Operational Cost Reduction & Higher Close Rates",
          roiBody: `Deploying ${serviceName} reduces repetitive manual customer screening by up to 70%, freeing your sales representatives to focus exclusively on closing pre-qualified, high-intent opportunities.`,
        },
      };

    case "n8n-&-workflows":
    case "crm-&-lead-automation":
    case "custom-dev-&-tools":
      return {
        workflows: [
          {
            step: "01",
            title: "Process Discovery & Data Flow Architecture",
            description: `We audit your existing manual operations, software stack, and data silos to design a streamlined automation architecture for ${serviceName}.`,
          },
          {
            step: "02",
            title: "Workflow Engineering & Custom API Development",
            description: "We build modular n8n workflows with conditional branching, data normalization, error handling filters, and secure authentication layers.",
          },
          {
            step: "03",
            title: "End-to-End System Integration & Stress Testing",
            description: "We connect lead capture sources, CRMs, billing systems, and communication channels, testing data integrity under simulated high-volume conditions.",
          },
          {
            step: "04",
            title: "Production Deployment & Automated Health Monitoring",
            description: "We deploy on secure cloud infrastructure with real-time error alerts, automated retry queues, and weekly execution logs.",
          },
        ],
        deliverables: [
          `End-to-End n8n Automation Architecture for ${serviceName}`,
          "Bi-Directional CRM & Database Sync Connectors",
          "Automated Error Catching & Telegram/Email Alert System",
          "Comprehensive Workflow Documentation & Video Walkthrough",
        ],
        tools: ["n8n (Self-Hosted/Cloud)", "Make.com", "REST APIs & Webhooks", "PostgreSQL", "Google Cloud"],
        faqs: [
          {
            question: `Why choose n8n over Zapier for ${serviceName}?`,
            answer: "n8n offers self-hosted deployment, zero per-task billing spikes, advanced data privacy (essential for customer data), complex loops and multi-step conditional branching, and full custom code execution (JavaScript/Python) at a fraction of Zapier's monthly cost.",
          },
          {
            question: `What CRMs and software can connect with ${serviceName}?`,
            answer: "We connect virtually any platform with an API or webhook: Zoho, HubSpot, Salesforce, Google Sheets, Tally ERP, Razorpay, WhatsApp Business API, Slack, Notion, and custom SQL databases.",
          },
          {
            question: "What happens if an API endpoint goes down or experiences an error?",
            answer: "Our workflows include automated retry mechanisms, error logging nodes, and instant alerts sent to your technical team via Telegram or WhatsApp, ensuring zero data loss.",
          },
          {
            question: "Is our customer and business data secure during automated transfers?",
            answer: "Yes. All data transfers use encrypted TLS 1.3 endpoints, secure API key vaults, and strict access controls. We adhere to international data security best practices and DPDP compliance.",
          },
        ],
        deepDive: {
          strategyHeading: `Eliminating Operational Friction with ${serviceName}`,
          strategyBody: `Manual data entry, delayed lead routing, and disconnected business tools drain productive hours and introduce costly human errors. Our automation frameworks for ${serviceName} eliminate manual friction by creating unified, automated pipelines across your software ecosystem.`,
          techHeading: "Resilient Multi-Step Workflows with Native Error Handling",
          techBody: "Unlike fragile single-trigger connections, our n8n architectures feature robust branching logic, automated JSON data parsing, payload validation, and fallback triggers. If a third-party CRM is temporarily unreachable, the pipeline queues the transaction and retries automatically.",
          roiHeading: "Tangible Time Savings & Scalable Efficiency",
          roiBody: `Implementing ${serviceName} saves businesses an average of 15 to 40 manual operational hours per week while ensuring leads are contacted immediately, drastically reducing lead leakage and accelerating revenue velocity.`,
        },
      };

    case "web-dev":
      return {
        workflows: [
          {
            step: "01",
            title: "Information Architecture & Wireframe Prototyping",
            description: `We define user conversion journeys, page hierarchies, and interactive wireframes tailored specifically for ${serviceName}.`,
          },
          {
            step: "02",
            title: "High-Performance Next.js Engineering",
            description: "We build with Next.js App Router, Tailwind CSS, and TypeScript, engineering sub-second page load times and mobile-responsive layouts.",
          },
          {
            step: "03",
            title: "SEO, Schema & Analytics Integration",
            description: "We inject clean JSON-LD structured schemas, OpenGraph meta tags, Google Analytics 4, and conversion tracking triggers.",
          },
          {
            step: "04",
            title: "Quality Assurance, Security & Production Launch",
            description: "We test cross-browser compatibility, 4G mobile responsiveness, Lighthouse performance scores (90+ target), and deploy to edge CDNs.",
          },
        ],
        deliverables: [
          `Sub-Second Fast Next.js Web Build for ${serviceName}`,
          "Fully Responsive Mobile, Tablet & Desktop UI Layouts",
          "Technical SEO, OpenGraph & JSON-LD Structured Data",
          "Integrated Contact Forms, WhatsApp Triggers & Analytics",
        ],
        tools: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Vercel / Firebase Hosting", "Figma"],
        faqs: [
          {
            question: `Why build ${serviceName} on Next.js instead of WordPress?`,
            answer: "Next.js offers sub-second page loads (crucial for Google Core Web Vitals and ad conversion rates), zero plugin security vulnerabilities, automatic server-side rendering for SEO, and complete design freedom without bloated template code.",
          },
          {
            question: `How long does a full ${serviceName} project take to launch?`,
            answer: "Standard landing pages and business sites typically launch in 10 to 14 working days. Custom web applications or extensive multi-page platforms take 3 to 5 weeks with weekly milestone reviews.",
          },
          {
            question: "Will the website be optimized for mobile users on Indian 4G/5G networks?",
            answer: "Yes, mobile-first design is our core standard. We optimize image compression, asset loading, and bundle sizes to ensure lightning-fast performance even on variable mobile connections.",
          },
          {
            question: "Do you provide ongoing hosting, maintenance, and updates?",
            answer: "Yes, we provide ongoing monthly maintenance retainers covering uptime monitoring, dependency upgrades, monthly content edits, and performance optimization.",
          },
        ],
        deepDive: {
          strategyHeading: `Conversion-Centric Web Architecture for ${serviceName}`,
          strategyBody: `A website should be an active revenue generator, not a static digital brochure. Our approach to ${serviceName} prioritizes clear visual hierarchy, frictionless lead capture forms, prominent click-to-call/WhatsApp CTAs, and persuasive trust signals.`,
          techHeading: "Sub-Second TTFB & 90+ Lighthouse Performance Scores",
          techBody: "Page speed directly affects Google rankings and paid ad Quality Scores. By leveraging Next.js static site generation (SSG), automatic image optimization (WebP/AVIF), and edge CDN caching, our web builds load in under 1 second.",
          roiHeading: "Higher Conversion Rates from Paid & Organic Traffic",
          roiBody: `Upgrading to a high-speed, modern website for ${serviceName} typically delivers a 25% to 50% uplift in form submissions and call inquiries from the exact same amount of existing traffic.`,
        },
      };

    case "content":
    case "branding":
    case "design":
      return {
        workflows: [
          {
            step: "01",
            title: "Brand Voice & Target Audience Discovery",
            description: `We define your brand's unique positioning, tone of voice, visual aesthetic, and customer value propositions for ${serviceName}.`,
          },
          {
            step: "02",
            title: "Strategic Content Planning & Topic Clustering",
            description: `We research buyer intent stages, pain points, and high-converting content angles aligned with ${primaryTag}.`,
          },
          {
            step: "03",
            title: "Expert Production & Multi-Format Creative Design",
            description: "Our in-house writers and designers produce high-authority content, brand guidelines, or marketing assets crafted for engagement and conversion.",
          },
          {
            step: "04",
            title: "Distribution & Performance Measurement",
            description: "We align assets across your website, social media channels, and sales decks, monitoring audience engagement and organic reach.",
          },
        ],
        deliverables: [
          `Complete Strategic Blueprint for ${serviceName}`,
          "High-Resolution Print & Digital Asset Deliverables",
          "SEO-Optimized Content Files with Meta Tag Specifications",
          "Comprehensive Brand & Usage Guidelines",
        ],
        tools: ["Figma", "Adobe Illustrator", "SurferSEO", "Canva Pro", "Grammarly Business"],
        faqs: [
          {
            question: `Is the content for ${serviceName} written by humans or generated by AI?`,
            answer: "All our content is written, researched, and structured by experienced human copywriters with subject-matter expertise. We use AI only for preliminary research and data aggregation, ensuring all published copy is 100% original, engaging, and compliant with Google's E-E-A-T guidelines.",
          },
          {
            question: "How many revision rounds are included in the deliverables?",
            answer: "We include 2 comprehensive rounds of feedback and revisions to guarantee the output perfectly matches your brand voice and strategic expectations.",
          },
          {
            question: `Do you provide source files and commercial usage rights for ${serviceName}?`,
            answer: "Yes, 100%. Upon project completion and final handover, all editable source files (vector AI, Figma, SVG, Markdown) and full intellectual property rights belong exclusively to your business.",
          },
          {
            question: "How does high-quality content contribute to SEO and AI citations?",
            answer: "Authoritative, fact-rich content with structured headings is the primary data source that both Google search algorithms and LLMs (ChatGPT, Gemini) crawl to generate search answers and brand citations.",
          },
        ],
        deepDive: {
          strategyHeading: `Building Market Authority Through ${serviceName}`,
          strategyBody: `In saturated markets, strong branding and authoritative content are the primary drivers of customer trust. Our approach to ${serviceName} transforms your business into a recognizable industry authority that commands premium pricing.`,
          techHeading: "Semantic Structuring & AI Citation Optimization",
          techBody: "We structure all content with semantic HTML headers, concise key-takeaway summaries, and factual data points that make it effortless for search engines and generative AI agents to index and cite your brand.",
          roiHeading: "Long-Term Brand Equity & Compound Inbound Inquiries",
          roiBody: `High-quality brand assets and strategic content compound over time, reducing customer skepticism, accelerating sales cycles, and attracting organic inbound leads without ongoing ad spend.`,
        },
      };

    default:
      return {
        workflows: [
          {
            step: "01",
            title: "Requirements Analysis & Strategic Scope",
            description: `We evaluate your business goals, target demographic, and digital presence to construct a tailored roadmap for ${serviceName}.`,
          },
          {
            step: "02",
            title: "Specialized Implementation & Configuration",
            description: `Our in-house specialists configure the technical architecture, creative assets, and integration layers required for ${serviceName}.`,
          },
          {
            step: "03",
            title: "Quality Verification & End-to-End Testing",
            description: "We conduct rigorous testing across device environments, tracking pipelines, and communication workflows to ensure flawless execution.",
          },
          {
            step: "04",
            title: "Performance Monitoring & Iterative Optimization",
            description: "We track live performance metrics, deliver weekly reporting insights, and continuously refine strategies to maximize business ROI.",
          },
        ],
        deliverables: [
          `Complete Strategy Blueprint for ${serviceName}`,
          "End-to-End Technical Setup & Integration",
          "Real-Time Performance Dashboard & KPI Tracking",
          "Dedicated Account Management & Weekly Strategy Calls",
        ],
        tools: ["Google Analytics 4", "Looker Studio", "Meta Business Suite", "Google Tag Manager", "n8n"],
        faqs: [
          {
            question: `What is the estimated delivery timeline for ${serviceName}?`,
            answer: `Initial strategy and standard configuration for ${serviceName} typically take 7 to 14 working days, followed by live deployment and continuous performance tracking.`,
          },
          {
            question: "How does AdsVerse ensure high ROI for our investment?",
            answer: "We focus on bottom-line business metrics—verified leads, customer acquisition cost (CAC), and sales conversion rates—rather than vanity numbers like generic impressions.",
          },
          {
            question: "Do you offer post-launch technical support and management?",
            answer: "Yes, all our service packages include post-launch support and monthly optimization retainers to ensure your system continues performing at peak efficiency.",
          },
          {
            question: "Why should we work with AdsVerse in Indore?",
            answer: "AdsVerse is an AI-first performance agency headquartered in Vijay Nagar, Indore. We combine Tier-1 technology capabilities with direct, transparent communication and local market expertise.",
          },
        ],
        deepDive: {
          strategyHeading: `Tailored Execution Framework for ${serviceName}`,
          strategyBody: `At AdsVerse, our execution for ${serviceName} is built around measurable business growth. We align every technical and creative effort with your company's core commercial objectives.`,
          techHeading: "Robust Technical Architecture & Data Accuracy",
          techBody: "We build on enterprise-grade tools, modern web frameworks, and automated data pipelines to ensure your digital marketing operations run smoothly with full attribution transparency.",
          roiHeading: "Predictable, Scalable Growth",
          roiBody: `By eliminating wasted spend and optimizing conversion funnels at every stage, ${serviceName} delivers predictable customer acquisition that scales with your business.`,
        },
      };
  }
}
