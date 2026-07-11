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
  jammu: "/images/locations/jammu.webp",
  guwahati: "/images/locations/guwahati.webp",
  shillong: "/images/locations/shillong.webp",
  gangtok: "/images/locations/gangtok.webp",
  agartala: "/images/locations/agartala.webp",
  aizawl: "/images/locations/aizawl.webp",
  dimapur: "/images/locations/dimapur.webp",
  kohima: "/images/locations/kohima.webp",
  imphal: "/images/locations/imphal.webp",
};

// Region label shown in AISearchInsights â€” per city, matches real geography
const cityRegionLabel: Record<string, string> = {
  indore: "Madhya Pradesh, Central India",
  bhopal: "Madhya Pradesh, Central India",
  jabalpur: "Madhya Pradesh, Central India",
  gwalior: "Madhya Pradesh, Central India",
  ujjain: "Madhya Pradesh, Central India",
  jaipur: "Rajasthan, North India",
  jodhpur: "Rajasthan, North India",
  udaipur: "Rajasthan, North India",
  kota: "Rajasthan, North India",
  raipur: "Chhattisgarh, Central India",
  bilaspur: "Chhattisgarh, Central India",
  lucknow: "Uttar Pradesh, North India",
  kanpur: "Uttar Pradesh, North India",
  noida: "Uttar Pradesh (NCR), North India",
  patna: "Bihar, East India",
  srinagar: "Jammu & Kashmir, North India",
  jammu: "Jammu & Kashmir, North India",
  guwahati: "Assam, Northeast India",
  shillong: "Meghalaya, Northeast India",
  gangtok: "Sikkim, Northeast India",
  agartala: "Tripura, Northeast India",
  aizawl: "Mizoram, Northeast India",
  dimapur: "Nagaland, Northeast India",
  kohima: "Nagaland, Northeast India",
  imphal: "Manipur, Northeast India",
};

const citiesDb: Record<string, { name: string, state: string, desc: string }> = {
  indore: { name: "Indore", state: "Madhya Pradesh", desc: "Our main headquarters in Vijay Nagar. Dominate central India's fastest-growing tech and startup corridor." },
  bhopal: { name: "Bhopal", state: "Madhya Pradesh", desc: "Drive growth for your Bhopal retail brand, coaching institute, or service firm with localized AI outreach." },
  jabalpur: { name: "Jabalpur", state: "Madhya Pradesh", desc: "Capture transactional leads and rank #1 locally for high-intent search terms across Jabalpur." },
  gwalior: { name: "Gwalior", state: "Madhya Pradesh", desc: "Build premium digital setups and automate sales pipelines for Gwalior's expanding business base." },
  ujjain: { name: "Ujjain", state: "Madhya Pradesh", desc: "Connect pilgrimage, retail, and regional hospitality services with targeted geographic digital setups." },
  jaipur: { name: "Jaipur", state: "Rajasthan", desc: "Scale Jaipur's D2C, retail, or professional services with high-ROI Meta & Google ads and sharp creative testing." },
  jodhpur: { name: "Jodhpur", state: "Rajasthan", desc: "Attract luxury travel inquiries and scale service setups with advanced local search and Next.js web designs." },
  udaipur: { name: "Udaipur", state: "Rajasthan", desc: "Position your Udaipur tourist destination, heritage resort, or retail brand in front of high-value seekers." },
  kota: { name: "Kota", state: "Rajasthan", desc: "Empower your Kota coaching institute, test prep center, or educational startup with smart WhatsApp bot systems." },
  raipur: { name: "Raipur", state: "Chhattisgarh", desc: "Optimize industrial service B2B funnels and retail brand campaigns in Chhattisgarh's capital." },
  bilaspur: { name: "Bilaspur", state: "Chhattisgarh", desc: "Eliminate repetitive customer work and capture local buyers searching for billing, shipping, or retail terms." },
  lucknow: { name: "Lucknow", state: "Uttar Pradesh", desc: "Wow Lucknow buyers with premium web designs, content strategies, and targeted lead generation funnels." },
  kanpur: { name: "Kanpur", state: "Uttar Pradesh", desc: "Upgrade industrial supply chains, regional trade, and retail grids with robust CRM & n8n automations." },
  noida: { name: "Noida", state: "Uttar Pradesh", desc: "Deploy AI-backed search setups and serverless Next.js pages for Noida's fast-moving software startups." },
  patna: { name: "Patna", state: "Bihar", desc: "Drive high-volume leads and construct authoritative, fast-loading digital profiles for Patna companies." },
  srinagar: { name: "Srinagar", state: "Jammu & Kashmir", desc: "Showcase Srinagar's exquisite hospitality, local arts, and retail globally with seasonal-aware advertising." },
  jammu: { name: "Jammu", state: "Jammu & Kashmir", desc: "Attract local buyers and build modern, mobile-friendly landing pages for Jammu service brands." },
  guwahati: { name: "Guwahati", state: "Assam", desc: "Connect Northeast's premium tea brands, travel agencies, and service firms with nationwide buyers." },
  shillong: { name: "Shillong", state: "Meghalaya", desc: "Accelerate Shillong's hospitality, eco-tourism resorts, and educational institutions with targeted niche SEO." },
  gangtok: { name: "Gangtok", state: "Sikkim", desc: "Position Gangtok's premium organic brands and heritage hotels in front of high-value nationwide buyers." },
  agartala: { name: "Agartala", state: "Tripura", desc: "Empower Tripura's growing retail SMBs and healthcare diagnostics with lower-competition local SEO." },
  aizawl: { name: "Aizawl", state: "Mizoram", desc: "Help Aizawl's stylish local handlooms and boutique D2C brands scale nationwide with Next.js e-commerce sites." },
  dimapur: { name: "Dimapur", state: "Nagaland", desc: "Automate Nagaland's commercial trading hub wholesale orders via custom WhatsApp AI bots and n8n sync." },
  kohima: { name: "Kohima", state: "Nagaland", desc: "Drive tourist bookings and arts outreach for Kohima heritage resorts aligned to festival tourism calendar." },
  imphal: { name: "Imphal", state: "Manipur", desc: "Construct authoritative local search profiles, responsive web designs, and ad setups for Imphal businesses." },
};

const cityMeta: Record<string, { title: string; description: string; canonical: string }> = {
  indore: {
    title: "Best Digital Marketing Agency in Indore | AdsVerse",
    description: "Looking for the best digital marketing company in Indore? AdsVerse offers AI SEO, WhatsApp bots, and performance marketing in Vijay Nagar, Indore.",
    canonical: "https://adsverse.in/locations/indore",
  },
  bhopal: {
    title: "Digital Marketing Agency in Bhopal MP | SEO & AI Automation | AdsVerse",
    description: "Top digital marketing agency in Bhopal. SEO, Meta Ads, WhatsApp AI bots & CRM automation for coaching institutes and Bhopal businesses. Indore-headquartered agency.",
    canonical: "https://adsverse.in/locations/bhopal",
  },
  jabalpur: {
    title: "Digital Marketing Agency in Jabalpur | Local SEO & Google Ads | AdsVerse",
    description: "AdsVerse provides local SEO, Google Ads & WhatsApp automation in Jabalpur. Rank higher on local search, generate leads 24/7. Book a free consultation.",
    canonical: "https://adsverse.in/locations/jabalpur",
  },
  gwalior: {
    title: "Digital Marketing Agency in Gwalior | Performance Marketing & Web Dev | AdsVerse",
    description: "Performance marketing, web development & automation for Gwalior tourism and retail businesses. AdsVerse delivers Google Ads, SEO & custom n8n workflows.",
    canonical: "https://adsverse.in/locations/gwalior",
  },
  ujjain: {
    title: "Digital Marketing Agency in Ujjain | Local SEO & Tourism Marketing | AdsVerse",
    description: "AdsVerse helps Ujjain retail, hospitality & temple-economy businesses rank locally. Seasonal campaign scheduling built around Ujjain's pilgrimage calendar.",
    canonical: "https://adsverse.in/locations/ujjain",
  },
  jaipur: {
    title: "Digital Marketing Agency in Jaipur | Meta Ads, SEO & D2C Marketing | AdsVerse",
    description: "Fast creative testing, tight ROAS targets, and sharp campaign iteration for Jaipur D2C, retail & service brands. AdsVerse â€” AI-first agency serving Rajasthan.",
    canonical: "https://adsverse.in/locations/jaipur",
  },
  jodhpur: {
    title: "Digital Marketing Agency in Jodhpur | SEO & Web Development | AdsVerse",
    description: "SEO & web design foundation first, then paid ads â€” the right order for Jodhpur handicraft and export businesses. AdsVerse serves Rajasthan.",
    canonical: "https://adsverse.in/locations/jodhpur",
  },
  udaipur: {
    title: "Digital Marketing Agency in Udaipur | Hotel & Tourism Marketing | AdsVerse",
    description: "Booking-funnel-first campaign structure for Udaipur hotels, resorts & wedding venues. AdsVerse delivers hospitality-specialized SEO, Google Ads & WhatsApp automation.",
    canonical: "https://adsverse.in/locations/udaipur",
  },
  kota: {
    title: "Digital Marketing for Coaching Institutes in Kota | WhatsApp Bots & Lead Gen | AdsVerse",
    description: "WhatsApp AI bots, enrollment funnels & SEO built around Kota's admission-cycle timing. AdsVerse â€” automation-first agency for coaching institutes.",
    canonical: "https://adsverse.in/locations/kota",
  },
  raipur: {
    title: "Digital Marketing Agency in Raipur | B2B & Industrial Marketing | AdsVerse",
    description: "CRM automation leads every Raipur engagement. n8n + CRM sync, B2B lead generation & SEO for Raipur industrial and retail businesses.",
    canonical: "https://adsverse.in/locations/raipur",
  },
  bilaspur: {
    title: "Digital Marketing Agency in Bilaspur | Local SEO & Automation | AdsVerse",
    description: "Local SEO scoped around transactional keywords â€” the fastest win for Bilaspur businesses. AdsVerse helps Chhattisgarh brands rank and generate leads online.",
    canonical: "https://adsverse.in/locations/bilaspur",
  },
  lucknow: {
    title: "Digital Marketing Agency in Lucknow | SEO & B2B Lead Generation | AdsVerse",
    description: "Combined B2B outreach + SEO scoping from the start for Lucknow businesses. AdsVerse delivers performance marketing across Uttar Pradesh.",
    canonical: "https://adsverse.in/locations/lucknow",
  },
  kanpur: {
    title: "Digital Marketing Agency in Kanpur | WhatsApp Automation & SEO | AdsVerse",
    description: "WhatsApp automation designed around textile and distribution order workflows in Kanpur. AdsVerse automates your sales pipeline in UP.",
    canonical: "https://adsverse.in/locations/kanpur",
  },
  noida: {
    title: "Digital Marketing Agency in Noida | AI Content & Next.js Development | AdsVerse",
    description: "Next.js development and performance marketing scoped for startup speed. AI content systems and technical SEO for Noida tech startups in NCR.",
    canonical: "https://adsverse.in/locations/noida",
  },
  patna: {
    title: "Digital Marketing Agency in Patna | Lead Generation & SEO | AdsVerse",
    description: "Lead-qualification-first setup for high-volume Patna campaigns. SEO & performance ads for Bihar consumer & service businesses. Book a free audit with AdsVerse.",
    canonical: "https://adsverse.in/locations/patna",
  },
  srinagar: {
    title: "Digital Marketing Agency in Srinagar | Tourism & Handicraft Marketing | AdsVerse",
    description: "SEO calendar built around Kashmir's tourism seasons. Google Ads & WhatsApp automation for Srinagar hospitality and handicraft businesses.",
    canonical: "https://adsverse.in/locations/srinagar",
  },
  jammu: {
    title: "Digital Marketing Agency in Jammu | Local SEO & Web Design | AdsVerse",
    description: "Mobile-first web builds and local SEO for Jammu businesses. AdsVerse delivers results across Jammu & Kashmir.",
    canonical: "https://adsverse.in/locations/jammu",
  },
  guwahati: {
    title: "Digital Marketing Agency in Guwahati | SEO & Performance Marketing | AdsVerse",
    description: "Pan-Northeast geo-targeting for Guwahati brands. Performance marketing, WhatsApp automation & SEO for Assam and Northeast India businesses.",
    canonical: "https://adsverse.in/locations/guwahati",
  },
  shillong: {
    title: "Digital Marketing Agency in Shillong | SEO & Tourism Ads | AdsVerse",
    description: "Niche keyword targeting for Shillong hospitality and education clients. AdsVerse helps scale Meghalaya brands nationwide with focused SEO and Meta Ads.",
    canonical: "https://adsverse.in/locations/shillong",
  },
  gangtok: {
    title: "Digital Marketing Agency in Gangtok Sikkim | Ads & Local SEO | AdsVerse",
    description: "Nationwide-buyer SEO targeting for Sikkim-based premium organic brands and heritage hotels. AdsVerse â€” AI-first digital marketing from Indore.",
    canonical: "https://adsverse.in/locations/gangtok",
  },
  agartala: {
    title: "Digital Marketing Agency in Agartala | Local SEO & Paid Ads | AdsVerse",
    description: "Lower-competition local SEO environment means faster ranking timelines in Agartala. AdsVerse provides Google My Business SEO, Meta/Google Ads for Tripura brands.",
    canonical: "https://adsverse.in/locations/agartala",
  },
  aizawl: {
    title: "Digital Marketing Agency in Aizawl Mizoram | Web Design & SEO | AdsVerse",
    description: "E-commerce builds scoped for nationwide handloom and D2C shipping from Aizawl. AdsVerse â€” Next.js e-commerce and local search for Mizoram brands.",
    canonical: "https://adsverse.in/locations/aizawl",
  },
  dimapur: {
    title: "Digital Marketing Agency in Dimapur Nagaland | WhatsApp AI Bots | AdsVerse",
    description: "Wholesale order automation is the lead service for Dimapur clients. WhatsApp AI order bots and n8n CRM sync for Nagaland wholesale and trading businesses.",
    canonical: "https://adsverse.in/locations/dimapur",
  },
  kohima: {
    title: "Digital Marketing Agency in Kohima | Travel & Heritage Branding | AdsVerse",
    description: "Festival and tourism-calendar-aligned campaign scheduling for Kohima heritage stays and arts businesses. Local SEO and Google Ads for Nagaland tourism.",
    canonical: "https://adsverse.in/locations/kohima",
  },
  imphal: {
    title: "Digital Marketing Agency in Imphal Manipur | Web Dev & Lead Gen | AdsVerse",
    description: "Local SEO foundation work prioritized before ad spend for Imphal clients. AdsVerse provides web development, local search rankings, and lead gen in Manipur.",
    canonical: "https://adsverse.in/locations/imphal",
  },
};

const cityIntro: Record<string, { headline: string; body: string }> = {
  indore: {
    headline: "Indore â€” Central India's Fastest-Growing Business Corridor",
    body: "Vijay Nagar is where AdsVerse is headquartered â€” and where we have run our longest client relationships. Indore's fast-growing startup and retail scene needs AI-first execution, not agency overhead. From IT parks to coaching corridors to retail showrooms, this is our home market â€” and our most tested execution environment.",
  },
  bhopal: {
    headline: "Bhopal â€” MP's Capital, Where Coaching Institutes Need Fast Lead Systems",
    body: "Bhopal's coaching and education sector has some of the highest lead volumes we handle â€” and some of the tightest response-time expectations from parents and students. Getting a parent's enquiry answered within 5 minutes versus 5 hours changes enrollment outcomes entirely. We have built lead systems specifically for this market.",
  },
  jabalpur: {
    headline: "Jabalpur â€” Industrial City Where Local Search Wins Fast",
    body: "Jabalpur's mix of established manufacturing and a growing retail and services base means most local businesses need local-search visibility more than broad brand awareness. Digital marketing penetration here is still low â€” meaning businesses that invest in local SEO now own rankings before the competition catches up. Local search ranking is our primary offer here, not broad brand campaigns.",
  },
  gwalior: {
    headline: "Gwalior â€” Heritage City, Two Very Different Ad Markets",
    body: "Gwalior businesses split between heritage tourism footfall and a steady local retail and services base â€” and the two need very different ad targeting. A tourist searching for 'fort entry Gwalior' and a resident searching for 'washing machine repair Gwalior' need completely different campaigns. We set these up as separate work, not one-size-fits-all.",
  },
  ujjain: {
    headline: "Ujjain â€” Temple Economy Needs Seasonal Campaign Architecture",
    body: "Ujjain's temple-economy footfall creates seasonal demand spikes most agencies are not set up to plan around. When Simhastha Kumbh or Navratri brings lakhs of pilgrims, your hotel, travel service, or retail shop needs campaigns already live and scaled â€” not planned the week of. We build campaigns that scale up and down with Ujjain's pilgrimage and religious tourism calendar.",
  },
  jaipur: {
    headline: "Jaipur â€” Rajasthan's D2C and Retail Powerhouse",
    body: "Jaipur's D2C and retail scene is competitive and ad-literate â€” generic campaigns do not move the needle here. Businesses in jewelry, handicrafts, textiles, and fashion have seen years of Meta and Google ads. What works now is sharper creative testing, faster iteration, and tighter ROAS targets. We structure accounts around creative testing cycles, not set-and-forget campaigns.",
  },
  jodhpur: {
    headline: "Jodhpur â€” Blue City, Where Web Presence Comes Before Paid Ads",
    body: "Jodhpur's handicraft and export-facing businesses often need a credible web presence before paid ads make sense. Running ads to a poorly structured website wastes every rupee. We usually start Jodhpur clients with a web design and SEO foundation â€” then layer performance ads on top once the conversion infrastructure is in place.",
  },
  udaipur: {
    headline: "Udaipur â€” India's Tourism Capital Needs Booking Funnels, Not Traffic",
    body: "Udaipur's hotel and wedding-industry clients live and die by booking conversion, not just traffic. Getting 10,000 visitors who bounce is worthless. Getting 500 visitors who book is the business. Our campaigns for Udaipur hospitality are built around direct booking funnels â€” Google Search for high-intent travel queries, WhatsApp for instant booking response, and review management for trust.",
  },
  kota: {
    headline: "Kota â€” India's Coaching Capital, Built for Admission-Cycle Automation",
    body: "Kota's coaching institute market runs on enrollment cycles and batch timing â€” our WhatsApp automation is built specifically around admission-season lead volume. When January hits and enquiries spike for JEE and NEET batches, your WhatsApp should be qualifying leads, sending batch details, and routing hot leads to counsellors automatically â€” not through manual typing.",
  },
  raipur: {
    headline: "Raipur â€” Chhattisgarh's Industrial Hub Needs CRM First",
    body: "Raipur's industrial and B2B businesses need CRM automation more than they need flashy ad creative â€” that is usually our starting point here. A steel supplier or B2B distributor needs their enquiries tracked, followed up, and synced to their team before spending on ads that generate more unmanaged leads. We lead with n8n and CRM sync work for most Raipur engagements.",
  },
  bilaspur: {
    headline: "Bilaspur â€” Chhattisgarh's Second City, First-Mover Opportunity",
    body: "Bilaspur businesses see the fastest wins from ranking for transactional, buy-now search terms rather than broad brand-awareness keywords. Digital competition here is genuinely low â€” ranking for 'AC repair Bilaspur' or 'CA firm Bilaspur' takes a fraction of the effort it takes in Raipur or Indore. We scope local SEO specifically around transactional keyword sets for Bilaspur clients.",
  },
  lucknow: {
    headline: "Lucknow â€” UP's Business Capital Needs Outreach and SEO Together",
    body: "Lucknow's B2B and services businesses often need outreach and SEO working together â€” we scope both from the start rather than treating them as separate services. A B2B firm in Lucknow needs to rank organically for industry terms AND have an outbound pipeline reaching decision-makers. Running one without the other leaves half the opportunity untapped.",
  },
  kanpur: {
    headline: "Kanpur â€” Textile and Distribution Runs on WhatsApp Already",
    body: "Kanpur's textile and distribution businesses run on WhatsApp for order communication already â€” our automation work here plugs into that existing habit rather than replacing it. Instead of asking businesses to adopt a new CRM tool they will not use, we build n8n workflows and WhatsApp bots that work within the order communication patterns already established.",
  },
  noida: {
    headline: "Noida â€” NCR's Tech Startup Belt Expects Startup Timelines",
    body: "Noida's startup and tech clients expect fast, modern web builds and performance marketing that can iterate weekly â€” we scope Next.js builds and campaign testing on startup timelines, not agency timelines. A 6-week website delivery and a 3-month campaign ramp-up are not acceptable here. We operate on 2-week build sprints and weekly campaign review cycles.",
  },
  patna: {
    headline: "Patna â€” Bihar's Consumer Market, Where Lead Quality Matters More Than Volume",
    body: "Patna's consumer and services businesses see high lead volume from digital campaigns â€” the challenge is filtering for quality, not generating quantity. A coaching institute drowning in unqualified leads is worse off than one with fewer, better-qualified ones. We build lead-qualification-first setups for Patna clients: forms that screen, bots that qualify, and dashboards that show conversion by lead source.",
  },
  srinagar: {
    headline: "Srinagar â€” Kashmir's Tourism Economy Is Seasonal by Design",
    body: "Srinagar's hospitality and handicraft businesses depend heavily on seasonal tourist search intent â€” our SEO and ads calendar is built around Kashmir's tourism seasons, not a flat monthly schedule. Summer brings peak hotel bookings. Pre-Eid brings handicraft searches. Off-season needs different messaging entirely. We plan the full calendar upfront, not month by month.",
  },
  jammu: {
    headline: "Jammu â€” Gateway City Where Mobile-First Is Non-Negotiable",
    body: "Jammu's local retail and services businesses get the most value from responsive, mobile-first web design paired with local SEO â€” the majority of searches here are on mobile. A site that does not load cleanly on a 4G connection in Jammu is not a functional business asset. Mobile-first web builds are our standard starting point for Jammu clients, before any paid spend begins.",
  },
  guwahati: {
    headline: "Guwahati â€” Northeast India's Commercial Hub Needs Pan-Northeast Reach",
    body: "Guwahati is the commercial hub for Northeast India â€” brands here often need to reach a multi-state Northeast audience, not just the city itself. A logistics company, regional retail chain, or healthcare brand based in Guwahati is typically serving Assam, Meghalaya, Nagaland, Manipur, and beyond. We scope campaign geo-targeting for pan-Northeast reach, not just Guwahati city limits.",
  },
  shillong: {
    headline: "Shillong â€” Scotland of the East, Where Niche Beats Broad",
    body: "Shillong's eco-tourism resorts and schools compete for a niche, high-intent search audience â€” broad keywords waste budget here. 'Book hotel Meghalaya' gets you irrelevant clicks. 'Eco-resort Shillong with waterfall view' gets you bookings. We do the keyword research to find the precise terms that Shillong's actual paying customers type, and build content and ads around those.",
  },
  gangtok: {
    headline: "Gangtok â€” Sikkim's Premium Brands Sell Nationwide, Not Just Locally",
    body: "Gangtok's organic product brands and heritage hotels sell to a nationwide audience, not just local search â€” our SEO here targets buyers outside Sikkim as much as within it. A Sikkim organic ginger brand's customer is in Mumbai or Bengaluru. A Gangtok heritage hotel's booker is in Delhi. We build SEO strategies that reach those buyers, not just local Gangtok queries.",
  },
  agartala: {
    headline: "Agartala â€” Tripura's Market Where Local SEO Wins Faster",
    body: "Agartala's retail and diagnostic healthcare businesses are still underserved by digital marketing generally â€” local SEO here has less competition and faster wins than in bigger cities. What takes 4-6 months to rank for in Indore takes 6-8 weeks in Agartala. We treat this as an opportunity: early movers who invest in local SEO now will own rankings for years before the market gets competitive.",
  },
  aizawl: {
    headline: "Aizawl â€” Mizoram's Creative Economy Needs Nationwide E-Commerce",
    body: "Aizawl's handloom and boutique D2C brands are built for a nationwide customer base â€” we build Next.js e-commerce and shipping-aware campaigns for that, not local-only setups. A Mizo handloom brand selling to a Pune customer needs a site that loads fast, a checkout that handles pan-India shipping, and social ads that reach the right national buyers. Local-only SEO misses the entire opportunity.",
  },
  dimapur: {
    headline: "Dimapur â€” Nagaland's Trading Hub Needs Order Automation First",
    body: "Dimapur's wholesale and trading businesses need order automation more than consumer-facing marketing â€” WhatsApp AI bots and n8n CRM sync are usually the first thing we build here. A wholesale merchant managing hundreds of orders a month via manual WhatsApp messages is spending hours on clerical work that automation handles in seconds. We start here before any ad spend.",
  },
  kohima: {
    headline: "Kohima â€” Nagaland's Heritage Tourism Runs on a Festival Calendar",
    body: "Kohima's heritage stays and local arts businesses need tourist-season visibility more than year-round ad spend â€” we scope campaigns around Nagaland's festival and tourism calendar. The Hornbill Festival in December, summer tourism in June-August, and the quiet months in between each need different campaign intensity and messaging. We plan the full year upfront.",
  },
  imphal: {
    headline: "Imphal â€” Manipur's Rising Capital Needs Local Fundamentals First",
    body: "Imphal businesses benefit most from getting local search fundamentals right first â€” accurate listings, responsive sites, and clean local SEO â€” before any paid spend. Running ads before your Google Business Profile is optimized, your site loads in 3 seconds on mobile, and your basic local citations are in place is spending money on a leaky bucket. We fix the bucket first.",
  },
};

// Per-city proof point â€” unique honest claim per city
const cityProofPoint: Record<string, string> = {
  indore: "Our only city with an in-person team â€” same-day meetings available at our Vijay Nagar office. Every new automation and AI workflow is piloted here first before rolling out to other locations.",
  bhopal: "We have published detailed local cost and lead-generation guides specifically for Bhopal coaching institutes â€” check our blog for the digital marketing cost and coaching-institute-specific content we have built for this market.",
  jabalpur: "Local search ranking is our primary offer for Jabalpur clients â€” not broad brand campaigns. Most Jabalpur businesses see the fastest ROI from ranking for city-specific transactional terms, not national keywords.",
  gwalior: "Performance marketing setups in Gwalior are structured separately for tourism footfall versus local resident search â€” two different audiences, two different campaign structures, both tracked independently.",
  ujjain: "Seasonal campaign scheduling built around Ujjain's religious tourism calendar â€” we plan campaign budgets, creatives, and go-live dates around Simhastha, Navratri, Kartik Mela, and Mahashivratri cycles.",
  jaipur: "Meta and Google Ads accounts for Jaipur clients are structured around fast creative iteration â€” we test 3-5 ad variants per week and kill underperformers within 48 hours, not after a full month.",
  jodhpur: "Web design and SEO foundation work precedes ad spend for most Jodhpur clients â€” we will not run paid ads to a site that is not ready to convert the traffic.",
  udaipur: "Booking-funnel-first campaign structure for hospitality clients â€” we track direct bookings and enquiry conversions, not just clicks and impressions that look good in a report.",
  kota: "WhatsApp bot flows are designed around Kota's admission-cycle timing â€” pre-season outreach in November-December, batch-specific qualification in January-February, and fee-reminder automations through March.",
  raipur: "n8n and CRM sync work leads most Raipur engagements â€” we connect enquiry forms, WhatsApp leads, and sales team sheets before a single rupee goes into ads.",
  bilaspur: "Local SEO scoped specifically around transactional keyword sets for Bilaspur â€” we research what Bilaspur buyers actually search before building content, not after.",
  lucknow: "Combined B2B outreach and SEO scoping for Lucknow clients from day one â€” outbound email sequences and organic search working together, not treated as separate budget line items.",
  kanpur: "WhatsApp automation designed around existing textile and distribution order workflows â€” we audit how your team currently communicates orders before building any automation.",
  noida: "Next.js development turnarounds scoped for startup speed â€” 2-week sprint cycles, weekly demos, and campaign iterations that match how Noida tech companies actually operate.",
  patna: "Lead-qualification-first setup for high-volume Patna campaigns â€” forms that ask the right screening questions, bots that follow up immediately, and dashboards that show lead quality not just lead count.",
  srinagar: "Seasonal SEO and ads calendar aligned to Kashmir tourism cycles â€” summer peak, Eid season, and off-season messaging all planned in advance, not reacted to after the season starts.",
  jammu: "Mobile-first web builds are the standard starting point for Jammu clients â€” we test every page on a 4G connection before launch, not just on a desktop browser.",
  guwahati: "Campaign geo-targeting scoped for pan-Northeast reach â€” Assam, Meghalaya, Nagaland, Manipur, Tripura, and Arunachal Pradesh included where the business serves them, not just Guwahati city.",
  shillong: "Niche keyword targeting for Shillong hospitality and education clients â€” we build the keyword list from actual search data before writing a single page or ad, not from guesswork.",
  gangtok: "Nationwide-buyer SEO targeting for Sikkim-based premium brands â€” we optimize for the metro-city buyers who purchase Sikkim organics and book Gangtok heritage stays, not just local Sikkim searches.",
  agartala: "Lower-competition local SEO environment means faster ranking timelines in Agartala â€” we set honest expectations: 4-8 weeks for most local terms versus 4-6 months in larger cities.",
  aizawl: "E-commerce builds for Aizawl clients are scoped for nationwide handloom and D2C shipping â€” pan-India pincode coverage, courier integrations, and social ads targeting buyers in metros.",
  dimapur: "Wholesale order automation is the lead service for Dimapur clients â€” WhatsApp bots that handle order confirmations, n8n workflows that sync to Google Sheets, and status updates that go out automatically.",
  kohima: "Festival and tourism-calendar-aligned campaign scheduling for Kohima â€” full-year plan mapped to Hornbill Festival, summer tourism, and off-season before we touch any ad account.",
  imphal: "Local SEO foundation work is prioritized before ad spend for Imphal clients â€” Google Business Profile, site speed audit, local citations, and basic schema all in place before campaigns go live.",
};

// Per-city service section subtitle â€” references local industries
const cityServiceSubtitle: Record<string, string> = {
  indore: "Tailored for Indore's startup ecosystem, IT corridor, retail, and education sectors.",
  bhopal: "Built around Bhopal's coaching institutes, education sector, and government-adjacent services.",
  jabalpur: "Focused on local search and transactional visibility for Jabalpur's manufacturing and services base.",
  gwalior: "Structured separately for Gwalior heritage tourism versus local retail and services.",
  ujjain: "Designed around Ujjain's temple economy, hospitality, and seasonal pilgrimage footfall.",
  jaipur: "Optimized for Jaipur D2C brands, retail, and fast-moving creative iteration.",
  jodhpur: "Web and SEO foundation first for Jodhpur handicrafts and export-facing businesses.",
  udaipur: "Booking-funnel-first for Udaipur's hospitality, hotels, and wedding industry.",
  kota: "Admission-cycle aware automation for Kota's coaching institutes and test-prep centers.",
  raipur: "CRM and automation-led for Raipur's industrial B2B and distribution businesses.",
  bilaspur: "Transactional keyword-focused SEO for Bilaspur's retail and services market.",
  lucknow: "B2B outreach and SEO combined for Lucknow's services and government-adjacent businesses.",
  kanpur: "WhatsApp-native automation for Kanpur's textile, leather, and distribution trade.",
  noida: "Startup-speed delivery for Noida's tech startups, SaaS companies, and D2C brands.",
  patna: "Lead-qualification-first for Patna's high-volume consumer and services market.",
  srinagar: "Seasonally aligned SEO and ads for Srinagar's hospitality and handicraft businesses.",
  jammu: "Mobile-first web and local SEO for Jammu's retail and services businesses.",
  guwahati: "Pan-Northeast geo-targeting for Guwahati brands serving multiple states.",
  shillong: "Niche-keyword SEO for Shillong's eco-tourism resorts and educational institutions.",
  gangtok: "Nationwide-buyer targeting for Gangtok's premium organic brands and heritage hotels.",
  agartala: "Low-competition local SEO for Agartala's retail and healthcare businesses.",
  aizawl: "Nationwide e-commerce builds for Aizawl's handloom and boutique D2C brands.",
  dimapur: "Wholesale order automation and B2B marketing for Dimapur's trading hub.",
  kohima: "Festival-calendar-aligned visibility for Kohima's heritage stays and arts businesses.",
  imphal: "Local SEO fundamentals first for Imphal's retail and commercial businesses.",
};

function getCityFAQs(name: string, state: string, cityKey: string) {
  const faqMap: Record<string, Array<{ q: string; a: string }>> = {
    indore: [
      { q: "Do you have a local physical office in Indore?", a: "Yes. Our primary office is in Vijay Nagar, Indore â€” Madhya Pradesh's commercial hub. You can schedule an in-person meeting or choose to work fully remotely. We maintain the same transparency and reporting either way." },
      { q: "How is Indore different from your other locations?", a: "It is our home base â€” every new automation workflow and AI integration we develop is piloted with Indore clients first before rolling out to other cities. Same-day meetings are available, which is not the case for any other location." },
      { q: "How does AdsVerse build local search authority for Indore businesses?", a: "We combine Google My Business optimization, geo-tagged schema markup, locally relevant content, and citation building on directories like Justdial and IndiaMart. This builds a compounding local search presence that ranks for service-in-Indore queries." },
      { q: "How quickly can WhatsApp automation or paid ads go live in Indore?", a: "Paid ad campaigns typically go live within 48-72 hours of onboarding. WhatsApp AI bots are deployed in 5-7 working days, depending on the complexity of your conversation flows and lead qualification logic." },
      { q: "Do we get a dashboard to track our results?", a: "Yes. Every client gets access to a live performance dashboard showing ad spend, ROAS, lead volume, SEO ranking movement, and WhatsApp bot interaction data â€” updated in real time." },
    ],
    bhopal: [
      { q: "What types of Bhopal businesses does AdsVerse work with most?", a: "Coaching institutes and education businesses are our most common Bhopal client type â€” we have built lead systems specifically around their admission cycles and parent-response expectations. We also work with retail, healthcare, and real estate businesses in Bhopal." },
      { q: "How does AdsVerse handle the high lead volumes that coaching institutes generate?", a: "We build lead-qualification funnels â€” WhatsApp bots that ask screening questions, forms that capture course and batch interest, and CRM setups that route hot leads to counsellors within minutes. Volume without qualification is noise." },
      { q: "What does digital marketing cost for a Bhopal business?", a: "It depends on the service and scale. We have published a detailed cost guide for Bhopal businesses on our blog â€” check our Bhopal digital marketing cost post for specific numbers and what to expect at each budget level." },
      { q: "Do you serve Bhopal businesses remotely or is there a local team?", a: "We are headquartered in Indore, 180km from Bhopal, and serve Bhopal clients primarily remotely via video calls, WhatsApp updates, and shared dashboards. For key engagements we can visit in person." },
      { q: "How long does SEO take to show results in Bhopal?", a: "For coaching and education terms in Bhopal, early ranking movement typically appears in 45-60 days. Competitive terms like best coaching institute Bhopal take 4-6 months of consistent work." },
    ],
    jabalpur: [
      { q: "Why is local search the priority for Jabalpur businesses specifically?", a: "Digital marketing in Jabalpur is less saturated than in Indore or Bhopal, meaning local SEO investments produce faster, longer-lasting results. A business that ranks for transactional Jabalpur terms today can hold those rankings for years with light maintenance." },
      { q: "What industries in Jabalpur does AdsVerse have experience with?", a: "Manufacturing-adjacent services, professional services like CAs and lawyers, retail, and education are our primary Jabalpur client segments. Each has different keyword intent and we structure campaigns accordingly." },
      { q: "Does AdsVerse run paid ads or just SEO for Jabalpur businesses?", a: "We run both, but we typically recommend starting with local SEO for Jabalpur clients because the cost-per-lead is lower and results compound over time. Paid ads are layered in once organic visibility is established." },
      { q: "How do you work with Jabalpur clients â€” remotely or in person?", a: "Entirely remotely via video calls, WhatsApp communication, and shared reporting dashboards. No local office in Jabalpur, but zero service difference versus in-person management." },
      { q: "What is the typical timeline for ranking improvements in Jabalpur?", a: "Most Jabalpur clients see measurable local ranking improvements within 30-45 days for low-competition terms, and 3-4 months for more established keyword categories." },
    ],
    gwalior: [
      { q: "How does AdsVerse target both tourists and local residents in Gwalior?", a: "We run separate campaign structures â€” tourism campaigns use intent-based keywords and target national search queries about Gwalior fort, hotels, and heritage sites. Local resident campaigns use geo-restricted targeting for service searches within Gwalior city." },
      { q: "Which Gwalior industries do you primarily serve?", a: "Heritage tourism operators, retail businesses, education institutes, and real estate firms are our primary Gwalior client segments. Each gets a different service mix based on their customer acquisition model." },
      { q: "Do you offer web development alongside marketing in Gwalior?", a: "Yes. For many Gwalior clients, a fast, conversion-optimized website is the first deliverable before any paid ad spend. We build Next.js sites that load quickly and convert both tourist and local visitor traffic." },
      { q: "How is reporting handled for Gwalior clients?", a: "Weekly performance updates via WhatsApp and shared dashboard access, plus a monthly video call review. All campaign data is yours â€” we never lock reporting inside an agency-only platform." },
      { q: "Can you handle WhatsApp automation for Gwalior hospitality businesses?", a: "Yes. WhatsApp booking bots for heritage hotels and homestays are a specific capability â€” we build flows that handle availability queries, room details, and booking confirmations automatically." },
    ],
    ujjain: [
      { q: "How do you plan campaigns around Ujjain's pilgrimage seasons?", a: "We build a 12-month calendar at the start of each engagement â€” mapping campaign budgets, creative variations, and go-live dates to Simhastha, Navratri, Kartik Mela, Mahashivratri, and other pilgrimage periods. Budgets scale up 2-3 weeks before peak and taper after." },
      { q: "What industries in Ujjain benefit most from digital marketing?", a: "Hospitality and hotel bookings, travel and tour operators, retail shops near Mahakaleshwar, and local food and gift businesses see the highest returns from digital marketing in Ujjain's temple economy." },
      { q: "Does AdsVerse optimize Google My Business for Ujjain businesses?", a: "Yes. Google My Business optimization is a priority for Ujjain businesses because tourists actively search for services near the temple. A complete, photo-rich, regularly updated GMB profile drives significant walk-in and call traffic." },
      { q: "Can you help Ujjain businesses rank for tourism-related search terms?", a: "Yes â€” ranking for terms like 'hotel near Mahakaleshwar' or 'Ujjain tour package' is a core part of what we build for hospitality clients here. It takes 60-90 days for early movement on these terms." },
      { q: "How does AdsVerse handle off-season periods in Ujjain?", a: "During lower-traffic periods we shift to content creation, local SEO work, and review management â€” activities that build compounding authority without requiring high ad spend." },
    ],
    jaipur: [
      { q: "How does AdsVerse run creative testing for Jaipur D2C brands?", a: "We test 3-5 ad creative variants per week on Meta, kill underperformers within 48-72 hours based on CPMS and early CTR data, and scale winners. For Jaipur's ad-literate market, creative freshness matters more than campaign structure." },
      { q: "Which Jaipur industries does AdsVerse serve most?", a: "Jewelry, handicrafts, textiles, fashion D2C brands, and tourism operators are our primary Jaipur segments. Each has a distinct buyer persona and ad strategy." },
      { q: "Does AdsVerse run both Meta and Google Ads in Jaipur?", a: "Yes, and we typically run them together for Jaipur brands â€” Meta for discovery and retargeting, Google Search for high-intent buyers. The channel split depends on your product and average order value." },
      { q: "What does a typical Jaipur engagement look like in the first 30 days?", a: "Account audit in week 1, campaign restructure and creative production in week 2, launch in week 3, first performance review in week 4. By day 30 we have real data to optimize against." },
      { q: "How is AdsVerse different from Jaipur-based local agencies?", a: "We specialize in AI-first execution â€” automation, WhatsApp integration, and n8n workflows alongside ads and SEO. Most local agencies focus only on one channel. We build the full performance system." },
    ],
    jodhpur: [
      { q: "Why do you recommend web design before ads for Jodhpur businesses?", a: "Jodhpur's handicraft and export businesses often have outdated or missing websites. Running paid traffic to a poor website produces zero returns. We fix the conversion infrastructure first so ad spend actually generates leads." },
      { q: "What types of Jodhpur businesses does AdsVerse work with?", a: "Handicraft exporters, furniture businesses, hospitality operators, and professional services firms are our primary Jodhpur segments. Handicraft businesses in particular benefit from SEO that targets international and metro-city buyers." },
      { q: "Can AdsVerse build an e-commerce site for a Jodhpur handicraft business?", a: "Yes. We build Next.js e-commerce sites with clean product organization, fast load times, and WhatsApp-based order inquiry integration for businesses that sell nationally and internationally." },
      { q: "How does AdsVerse handle international buyer targeting for Jodhpur exporters?", a: "We use Google Search campaigns targeting international search terms, SEO content targeting export and wholesale buyer queries, and social ads reaching design buyers in the US, UK, and EU." },
      { q: "What is the SEO timeline for a Jodhpur handicraft or hospitality business?", a: "Local Jodhpur search terms can show movement in 45-60 days. National or international export keywords take 4-6 months of consistent content and technical SEO work to rank on page one." },
    ],
    udaipur: [
      { q: "What does 'booking-funnel-first' mean for Udaipur hospitality clients?", a: "It means we measure success by confirmed bookings, not just website visitors. We optimize the entire path: high-intent Google search click -> fast-loading landing page -> instant WhatsApp query response -> CRM tracking to close." },
      { q: "Do you run Meta Ads for Udaipur hotels and resorts?", a: "Yes, but typically for retargeting past visitors or promoting specific packages (weddings, long weekends) rather than broad awareness. Google Search captures the high-intent 'book now' traffic better." },
      { q: "Can AdsVerse integrate booking systems with our website?", a: "Yes. We can integrate third-party booking engines, or build custom lead-capture forms that sync directly to your CRM and notify your front desk via WhatsApp instantly." },
      { q: "How do you handle wedding planning and event leads in Udaipur?", a: "Wedding queries have a long sales cycle. We build automated follow-up sequences in n8n and WhatsApp to nurture these leads over weeks, ensuring your venue stays top-of-mind while they decide." },
      { q: "Does AdsVerse work with non-hospitality businesses in Udaipur?", a: "Yes, we also work with Udaipur's retail, real estate, and professional services sectors, using local SEO and targeted lead generation strategies." },
    ],
    kota: [
      { q: "How do WhatsApp bots help Kota coaching institutes?", a: "They automate the repetitive work: answering fee queries, sending syllabus PDFs, qualifying student intent (JEE vs NEET, dropper vs regular), and scheduling counselling calls 24/7 without human intervention." },
      { q: "Can AdsVerse campaigns sync with our existing admission CRM?", a: "Yes. We use n8n to connect Meta/Google lead forms and WhatsApp interactions directly into your CRM (LeadSquared, Zoho, etc.) so your counsellors never have to manually download CSV files." },
      { q: "How do you handle the January-April admission rush?", a: "We plan campaign budgets to peak during this window. More importantly, we ensure your automation infrastructure is stress-tested to handle 5x the normal daily lead volume without dropping follow-ups." },
      { q: "Do you offer SEO for Kota institutes?", a: "Yes. Ranking for terms like 'best JEE coaching in Kota' is highly competitive but incredibly valuable. We build authoritative content and technical SEO foundations to compete for these terms long-term." },
      { q: "What is the typical ROI for a coaching institute campaign?", a: "While it varies, institutes with strong sales teams and clear differentiators often see ROI exceeding 5x on their ad spend, primarily driven by the high lifetime value of an enrolled student." },
    ],
    raipur: [
      { q: "Why start with CRM automation for Raipur industrial businesses?", a: "Many B2B businesses lose leads simply because of slow follow-up or messy spreadsheet tracking. Fixing the lead management pipeline with n8n and a CRM ensures that when we do run ads, the ROI is maximized." },
      { q: "What B2B channels work best in Raipur?", a: "Google Search (for active buyers searching for suppliers) and LinkedIn (for targeted outreach to specific job titles in manufacturing/construction) are the most effective B2B channels here." },
      { q: "Can AdsVerse help with B2B lead generation?", a: "Yes. We build targeted outbound email sequences and LinkedIn outreach campaigns to connect you with decision-makers in your target industries." },
      { q: "Do you offer web design for Raipur industrial companies?", a: "Yes. We build professional, fast-loading Next.js websites that act as digital brochures, clearly communicating your capabilities, certifications, and product catalogs to potential buyers." },
      { q: "How do you track success for B2B campaigns with long sales cycles?", a: "We track leading indicators: qualified leads generated, meetings booked, and cost-per-acquisition for those stages, rather than just waiting months for the final closed-won revenue." },
    ],
    bilaspur: [
      { q: "Why is local SEO the focus for Bilaspur businesses?", a: "Because the digital landscape in Bilaspur is still developing. Establishing a strong local SEO presence now is cheaper and faster than it will be in two years, and it captures the most ready-to-buy local customers." },
      { q: "What does a local SEO campaign in Bilaspur involve?", a: "Claiming and optimizing your Google Business Profile, ensuring your NAP (Name, Address, Phone) is consistent across directories, gathering reviews, and building locally relevant content on your website." },
      { q: "Can AdsVerse run paid ads in Bilaspur?", a: "Yes, Google Ads can be highly effective in Bilaspur for immediately capturing search intent while your organic SEO rankings are building." },
      { q: "How do you determine which keywords to target?", a: "We use SEO tools to analyze actual search volume in the Bilaspur area, focusing on transactional keywords (e.g., 'plumber near me', 'buy laptops Bilaspur') rather than informational ones." },
      { q: "What kind of reporting do you provide?", a: "You'll receive a monthly report detailing your keyword ranking improvements, Google Business Profile views/clicks, website traffic, and the number of leads generated." },
    ],
    lucknow: [
      { q: "How do B2B outreach and SEO work together for Lucknow clients?", a: "SEO builds your inbound pipeline (people searching for you), while outreach builds your outbound pipeline (you contacting them). Having a strong SEO presence makes your outbound emails more credible, increasing reply rates." },
      { q: "What industries in Lucknow do you specialize in?", a: "We work extensively with Lucknow's IT services, real estate, healthcare, and educational institutions, tailoring our strategies to each sector's specific buyer journey." },
      { q: "Can you automate our lead follow-up process?", a: "Yes. We use n8n and WhatsApp to create automated workflows that instantly acknowledge inquiries, provide initial information, and notify your sales team, dramatically improving response times." },
      { q: "Do you manage Meta Ads (Facebook/Instagram) for Lucknow brands?", a: "Yes, especially for B2C businesses like real estate, retail, and education, where visual appeal and audience targeting are crucial for generating demand." },
      { q: "What is the onboarding process for a new Lucknow client?", a: "It starts with a deep-dive discovery call to understand your goals and current metrics. We then perform an audit, present a strategy, agree on KPIs, and begin executionâ€”usually within 2 weeks." },
    ],
    kanpur: [
      { q: "How does WhatsApp automation work for Kanpur distributors?", a: "We build bots that allow retailers to check stock, place repeat orders, and get invoice copies directly via WhatsApp, syncing that data to your existing ERP or sheets without manual data entry." },
      { q: "Do we need to change our existing software to work with AdsVerse?", a: "Usually, no. Our n8n automation expertise allows us to connect with most existing CRMs, ERPs, and spreadsheet systems your team is already comfortable using." },
      { q: "What B2B marketing strategies work in Kanpur?", a: "Alongside automation, we focus on targeted Google Search ads to capture new distributor inquiries and SEO to build long-term authority in your specific manufacturing or trading niche." },
      { q: "Can you help Kanpur businesses expand to other states?", a: "Yes. We can structure Google Ads and SEO campaigns targeting buyers in specific regions across India where you want to expand your distribution network." },
      { q: "How do you price your automation services?", a: "Automation is typically priced as a project fee for the initial build and setup, followed by a smaller monthly retainer for maintenance, optimization, and API costs." },
    ],
    noida: [
      { q: "Why use Next.js for Noida tech startup websites?", a: "Next.js offers unparalleled speed, SEO capabilities, and scalability. It aligns with the technical expectations of the NCR market and provides a foundation that won't need rebuilding in a year." },
      { q: "How fast can you launch a campaign for a Noida startup?", a: "We operate on startup timelines. For a straightforward performance marketing campaign, we can go from onboarding to live ads in 7-10 days." },
      { q: "Do you offer AI content services?", a: "Yes. We build programmatic SEO structures and AI-assisted content pipelines that allow you to scale your content marketing rapidly without sacrificing quality or relevance." },
      { q: "What is your approach to SaaS marketing in Noida?", a: "We focus on the full funnel: driving targeted traffic via Google Ads/SEO, optimizing the landing page for signups, and using automated email/WhatsApp sequences to drive activation and reduce churn." },
      { q: "How do you collaborate with our internal team?", a: "We act as an extension of your team. We communicate via shared Slack/Discord channels, participate in sprint planning, and provide transparent dashboards for real-time performance tracking." },
    ],
    patna: [
      { q: "How do you improve lead quality for Patna campaigns?", a: "We use longer forms, specific qualification questions, and immediate automated follow-ups. If a lead doesn't answer the initial automated WhatsApp message, they aren't passed to your sales team." },
      { q: "What industries in Patna generate the most leads?", a: "Education (coaching/colleges), real estate, and healthcare typically see very high lead volumes in Patna, making qualification systems essential." },
      { q: "Do you run localized language ads in Patna?", a: "Yes. Depending on the target audience, we often test Hindi or regional language ad creatives and landing pages, which frequently outperform English-only campaigns in engagement." },
      { q: "How do you track conversions from offline sales?", a: "We integrate your CRM with ad platforms using offline conversion tracking (OCT). When a lead closes offline, the data is fed back to Google/Meta to optimize the algorithms for actual revenue, not just form fills." },
      { q: "What is the minimum budget for a Patna performance campaign?", a: "While we can work with various budgets, we recommend a minimum ad spend that allows for statistical significance in testingâ€”usually around â‚¹30,000 to â‚¹50,000 per month for local campaigns." },
    ],
    srinagar: [
      { q: "How early should Srinagar hotels start their seasonal campaigns?", a: "Ideally, 6-8 weeks before the season starts. This allows time to build SEO traction, test ad creatives, and capture the early-booker market before competitors increase their bids." },
      { q: "Do you run campaigns targeting international tourists?", a: "Yes. For premium properties and handicraft exporters, we run targeted Google Ads and SEO campaigns in the US, UK, Europe, and the Middle East." },
      { q: "Can you help sell Kashmiri handicrafts online?", a: "Yes. We build e-commerce platforms and run performance marketing campaigns designed to reach buyers across India and internationally who are searching for authentic Kashmiri products." },
      { q: "How do you manage marketing during off-seasons?", a: "We focus on building SEO authority, gathering reviews, and nurturing past guests with automated email/WhatsApp campaigns offering off-season discounts or early-bird specials for the next year." },
      { q: "Do you provide content creation for Srinagar tourism?", a: "We provide content strategy and SEO-optimized writing. We can collaborate with your local photographers or videographers to ensure the visual content authentically represents your offerings." },
    ],
    jammu: [
      { q: "Why is mobile-first design so important for Jammu?", a: "Analytics show that the vast majority of web traffic in Jammu comes from mobile devices, often on varied network speeds. A site that isn't optimized for mobile will lose potential customers instantly." },
      { q: "What local SEO strategies work best in Jammu?", a: "Optimizing Google Business Profiles, ensuring accurate local citations, and gathering positive reviews are critical. We also focus on hyper-local keywords specific to Jammu neighborhoods." },
      { q: "Do you run ads for local retail stores in Jammu?", a: "Yes. We use local inventory ads and geo-targeted Meta ads to drive foot traffic to physical stores, tracking 'store visits' as a key metric." },
      { q: "How do you measure the success of a local campaign?", a: "We track phone calls generated, requests for directions on Google Maps, form fills on the website, and overall improvements in local search rankings." },
      { q: "Can AdsVerse manage our social media presence?", a: "While our core focus is performance (Ads/SEO/Automation), we do provide strategic guidance on organic social media to ensure it aligns with and supports your paid campaigns." },
    ],
    guwahati: [
      { q: "How do you structure campaigns for pan-Northeast reach?", a: "We use location targeting to reach specific states or cities across the Northeast, tailoring ad copy to resonate with regional nuances while managing budgets across different geographies efficiently." },
      { q: "What industries in Guwahati do you work with?", a: "Logistics, healthcare networks, regional retail chains, and educational institutions are our primary focus in Guwahati." },
      { q: "Can AdsVerse help with B2B lead generation across the Northeast?", a: "Yes. We use LinkedIn Ads and highly targeted Google Search campaigns to reach business owners and decision-makers across Assam, Meghalaya, and neighboring states." },
      { q: "Do you offer multi-language support for ad campaigns?", a: "We can run and optimize campaigns in English, Hindi, and Assamese, depending on the target audience and the specific goals of the campaign." },
      { q: "How is AdsVerse different from local Guwahati agencies?", a: "We bring a strong focus on data-driven performance and advanced automation (n8n, AI bots) that many local agencies don't offer, ensuring a higher ROI on your marketing spend." },
    ],
    shillong: [
      { q: "How do you find the right niche keywords for Shillong resorts?", a: "We use advanced SEO tools to analyze search volume and intent, looking for long-tail keywords (e.g., 'luxury eco resort in Shillong for couples') rather than broad, competitive terms." },
      { q: "Do you run ads on platforms other than Google and Meta?", a: "For hospitality, we focus heavily on Google Search and Meta, but we can also optimize your presence on OTAs (Online Travel Agencies) and TripAdvisor to maximize visibility." },
      { q: "Can you automate our booking confirmation process?", a: "Yes. We can set up systems that automatically send WhatsApp confirmations, pre-arrival information, and post-stay review requests, improving the guest experience and saving you time." },
      { q: "How do you market Shillong educational institutions?", a: "We focus on SEO to attract students researching courses, combined with targeted lead generation campaigns during admission seasons, using WhatsApp bots to handle inquiries efficiently." },
      { q: "What is the expected ROI for a niche SEO campaign?", a: "Niche SEO takes time to build, but once established, it provides a steady stream of highly qualified, low-cost traffic, resulting in a very high long-term ROI compared to paid ads alone." },
    ],
    gangtok: [
      { q: "How do you target nationwide buyers for Sikkim organic brands?", a: "We use detailed audience targeting on Meta Ads (focusing on health-conscious consumers in metros) and Google Shopping/Search Ads targeting relevant product keywords across India." },
      { q: "Can you help optimize our e-commerce checkout process?", a: "Yes. We analyze user behavior to identify drop-off points and implement best practices for e-commerce conversion rate optimization (CRO) to ensure more visitors complete their purchases." },
      { q: "How do you market Gangtok heritage hotels?", a: "We focus on visual storytelling through Meta Ads and highly targeted Google Search campaigns aimed at premium travelers searching for unique experiences in Sikkim." },
      { q: "Do you manage influencer marketing for D2C brands?", a: "We don't directly manage influencer outreach, but we can provide the strategy, tracking links, and landing pages to ensure your influencer campaigns are measurable and profitable." },
      { q: "How do you handle shipping logistics integration?", a: "We can use n8n to connect your e-commerce platform with your shipping provider, automating waybill generation and sending tracking updates to customers via WhatsApp." },
    ],
    agartala: [
      { q: "Why is local SEO faster in Agartala?", a: "The digital market is less saturated. Fewer businesses are actively optimizing their web presence, meaning those who do can achieve top rankings much faster than in highly competitive cities." },
      { q: "What services do you recommend for Agartala healthcare clinics?", a: "Google Business Profile optimization to capture 'near me' searches, a fast-loading website outlining services, and an automated appointment booking system via WhatsApp." },
      { q: "Can AdsVerse help retail stores in Agartala?", a: "Yes. We can run local awareness campaigns on Meta and optimize your local search presence to drive foot traffic and increase store visits." },
      { q: "How much should an Agartala business spend on ads?", a: "Due to lower competition, CPCs (Cost Per Click) are often lower. A modest budget of â‚¹15,000 to â‚¹25,000 per month can yield significant results in a local Agartala campaign." },
      { q: "Do you provide transparent reporting?", a: "Absolutely. You will have access to a dashboard showing exactly where your money was spent, how many leads/calls were generated, and what your cost per acquisition is." },
    ],
    aizawl: [
      { q: "What is required for a nationwide e-commerce build?", a: "A fast, secure platform (like Next.js or Shopify), high-quality product imagery, clear shipping policies, integration with a reliable payment gateway, and a streamlined checkout process." },
      { q: "How do you target buyers for Mizoram handlooms?", a: "We use Meta Ads targeting users with interests in ethnic wear, sustainable fashion, and handlooms in major metropolitan areas, combined with Google Shopping ads." },
      { q: "Can you automate abandoned cart recovery?", a: "Yes. We set up automated email and WhatsApp sequences that remind customers of the items in their cart, often including a small incentive to complete the purchase." },
      { q: "How do you build trust for a new D2C brand?", a: "Through high-quality website design, clear policies, prominently displayed customer reviews, and transparent communication via automated post-purchase updates." },
      { q: "What is the typical timeframe to launch a new e-commerce site?", a: "Depending on the complexity and the number of products, a custom Next.js e-commerce build typically takes 4 to 8 weeks from design to launch." },
    ],
    dimapur: [
      { q: "How does a WhatsApp AI bot help wholesale businesses?", a: "It acts as a 24/7 digital assistant, allowing buyers to view catalogs, check prices, place orders, and track shipments entirely through WhatsApp, reducing manual effort for your team." },
      { q: "Can the bot sync orders to our Google Sheets?", a: "Yes. We use n8n to connect the WhatsApp bot directly to your Google Sheets or CRM, instantly logging new orders, updating inventory, and notifying your fulfillment team." },
      { q: "Do you run B2B lead generation campaigns in Dimapur?", a: "Yes. We can use targeted Google Search and LinkedIn campaigns to connect your wholesale business with retailers and distributors across the Northeast." },
      { q: "How secure is the data handled by the automation?", a: "We use enterprise-grade automation tools (n8n) and secure APIs. Your data remains yours and is transferred securely between platforms." },
      { q: "Can we test the WhatsApp bot before it goes live?", a: "Absolutely. We build a prototype and test it thoroughly with your team to ensure the conversational flows and data syncing work perfectly before rolling it out to your clients." },
    ],
    kohima: [
      { q: "How do you align campaigns with the Hornbill Festival?", a: "We start building SEO content months in advance. As the festival approaches, we scale up targeted Google Search and Meta ads to capture travelers actively planning their trip to Kohima." },
      { q: "Can AdsVerse help market local arts and crafts?", a: "Yes. We can build an e-commerce presence and run targeted campaigns to sell Kohima's unique arts and crafts to a national or international audience." },
      { q: "What is the best platform for Kohima heritage stays?", a: "A combination of a strong organic presence on Google, optimized OTA listings, and visually engaging Meta ads targeting travelers interested in culture and heritage." },
      { q: "How do you manage leads during the off-season?", a: "We focus on building a database of interested travelers and nurturing them with content about Nagaland's culture, ensuring your brand is top-of-mind when they are ready to book." },
      { q: "Do you provide video marketing services?", a: "We do not shoot video directly, but we can guide your local team on what content performs best and use that footage to create highly effective ad campaigns." },
    ],
    imphal: [
      { q: "Why prioritize local SEO fundamentals in Imphal?", a: "Without a solid foundation (accurate GMB, fast website, basic citations), any money spent on paid ads will underperform. Fixing the fundamentals ensures maximum ROI when you do run ads." },
      { q: "What does a site speed audit involve?", a: "We analyze your website's code, images, and server response times to identify bottlenecks, then implement technical fixes to ensure it loads in under 3 seconds, especially on mobile." },
      { q: "How do you generate leads for Imphal commercial businesses?", a: "Once the foundation is solid, we use targeted Google Local Service Ads and localized Meta campaigns to drive phone calls and foot traffic directly to your business." },
      { q: "Can you help fix an existing underperforming website?", a: "Yes. We can audit your current site, recommend improvements, or rebuild it using modern, fast technologies like Next.js if necessary." },
      { q: "What is the first step to working with AdsVerse?", a: "Contact us for a free initial audit. We'll review your current digital presence, identify the biggest opportunities in Imphal, and propose a tailored strategy." },
    ],
  };

  const defaultFaqs = [
    {
      q: `What digital marketing services does AdsVerse offer in ${name}?`,
      a: `AdsVerse provides a comprehensive suite of services for ${name} businesses, including AI-first SEO, Performance Marketing (Google & Meta Ads), WhatsApp Automation, Custom Web Development, and CRM Integrations.`,
    },
    {
      q: `How long does it take to see results for my ${name} business?`,
      a: "Paid ad campaigns can generate leads within days of launch. Local SEO typically takes 6-12 weeks to show significant ranking improvements, while broader organic strategies may take 3-6 months to mature.",
    },
    {
      q: "Do you provide custom reporting?",
      a: "Yes. Every client receives access to a live, transparent dashboard tracking KPIs such as ad spend, ROAS, lead volume, and SEO rankings in real-time.",
    },
    {
      q: "Can you integrate your marketing efforts with our existing sales team?",
      a: "Absolutely. Our CRM and n8n automation services are designed to route qualified leads directly to your sales team's preferred tools instantly.",
    },
    {
      q: "Why should we choose AdsVerse over a traditional agency?",
      a: "We are an AI-first performance agency. We focus on automation, speed, and measurable ROI rather than just vanity metrics, delivering Tier-1 results for our clients.",
    }
  ];

  return faqMap[cityKey] || defaultFaqs;
}

type Props = {
  params: { city: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityKey = params.city.toLowerCase();
  const meta = cityMeta[cityKey];

  if (!meta) {
    return {
      title: "Digital Marketing Agency | AdsVerse",
      description: "AdsVerse offers AI-first SEO, WhatsApp bots, and performance marketing.",
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
    },
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

export default function LocationPage({ params }: Props) {
  const cityKey = params.city.toLowerCase();
  const cityData = citiesDb[cityKey];
  const introData = cityIntro[cityKey];
  const regionLabel = cityRegionLabel[cityKey] || "Central India";
  const proofPoint = cityProofPoint[cityKey];
  const serviceSubtitle = cityServiceSubtitle[cityKey] || "Tailored digital marketing for your local business needs.";

  if (!cityData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold font-headline mb-4">Location Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">We couldn't find the page for this location.</p>
        <Button asChild>
          <Link href="/locations">View All Locations</Link>
        </Button>
      </div>
    );
  }

  const { name, state } = cityData;
  const imagePath = cityImages[cityKey] || "/images/locations/indore.webp";
  const faqs = getCityFAQs(name, state, cityKey);

  return (
    <>
      <div className="w-full bg-slate-50 dark:bg-slate-900 overflow-hidden">
        {/* HERO SECTION */}
        <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[size:32px_32px]" />
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-500/20 opacity-20 blur-[100px]" />
          
          <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
            <Link 
              href="/locations" 
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Locations
            </Link>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-600 dark:text-orange-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  {name}, {state}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  Digital Marketing Agency in <span className="text-orange-600 dark:text-orange-500">{name}</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
                  {introData?.headline || `AI-first digital marketing agency helping ${name} businesses scale.`}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-14 px-8 text-base font-bold shadow-lg shadow-orange-500/20 transition-all duration-300">
                    <Link href="/contact">Book a Free Consultation</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl h-14 px-8 text-base border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Link href="#services">View Services</Link>
                  </Button>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                <Image
                  src={imagePath}
                  alt={`Business in ${name}, ${state}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                  <p className="font-semibold text-lg drop-shadow-md">Serving {name}</p>
                  <p className="text-white/80 text-sm">{state}, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROOF POINT & STATS */}
        <div className="py-16 md:py-24 bg-white dark:bg-slate-950 border-b border-border/40">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">
                  Our Approach to <span className="text-orange-600">{name}</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {introData?.body || `We bring Tier-1 agency execution to ${name}. From fast-loading websites to automated lead systems and high-ROI ad campaigns, we build digital infrastructure that actually generates revenue.`}
                </p>
                {proofPoint && (
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 dark:bg-orange-900/50 p-2 rounded-lg shrink-0">
                        <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                        {proofPoint}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-border/50 bg-slate-50 dark:bg-slate-900/50 shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
                    <TrendingUp className="w-8 h-8 text-orange-500 mb-4" />
                    <h3 className="text-3xl font-bold font-headline mb-2">113+ Brands Across India</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Company-wide averages â€” not city-specific data</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-slate-50 dark:bg-slate-900/50 shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
                    <Bot className="w-8 h-8 text-orange-500 mb-4" />
                    <h3 className="text-3xl font-bold font-headline mb-2">24/7</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Automated Lead Qualification</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES SECTION */}
        <div id="services" className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-border/40">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Services We Deliver in {name}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                {serviceSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Local Search & SEO",
                  desc: "Dominate Google search results for transactional keywords in your city.",
                  icon: <MapPin className="w-6 h-6 text-orange-500" />
                },
                {
                  title: "Meta & Google Ads",
                  desc: "Fast setup, transparent tracking, and ROI-focused campaign management.",
                  icon: <Megaphone className="w-6 h-6 text-orange-500" />
                },
                {
                  title: "WhatsApp AI Bots",
                  desc: "Automate lead qualification and customer support on WhatsApp 24/7.",
                  icon: <Bot className="w-6 h-6 text-orange-500" />
                },
                {
                  title: "Next.js Web Development",
                  desc: "Blazing fast, SEO-optimized websites built for high conversion rates.",
                  icon: <Code className="w-6 h-6 text-orange-500" />
                },
                {
                  title: "n8n CRM Automation",
                  desc: "Connect your ads, forms, and WhatsApp directly into your sales team's sheets or CRM.",
                  icon: <FileText className="w-6 h-6 text-orange-500" />
                },
                {
                  title: "B2B Lead Generation",
                  desc: "Targeted outbound campaigns to reach decision-makers in your specific industry.",
                  icon: <Users className="w-6 h-6 text-orange-500" />
                }
              ].map((service, idx) => (
                <Card key={idx} className="border-border/50 hover:border-orange-500/50 transition-colors bg-white dark:bg-slate-950">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center mb-4 border border-orange-100 dark:border-orange-900/50">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="py-24 bg-white dark:bg-slate-950">
          <div className="container px-4 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Common questions about working with AdsVerse in {name}.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-border/50">
                  <AccordionTrigger className="text-left font-semibold text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* SEO Data Component (Invisible) */}
        <AISearchInsights 
          title={`Market Dynamics in ${name}, ${state}`}
          insights={[
            { title: "📍 Region Served", description: regionLabel },
            { title: "🎯 Target Audience", description: `B2B companies, retail businesses, coaching institutes, real estate developers, healthcare providers, and local service businesses located in or targeting ${name}.` },
            { title: "⚡ Core Advantage", description: "Tier-1 digital execution capabilities (Next.js, n8n, AI agents) applied to Tier-2 market dynamics." }
          ]}
          takeaways={[
            "AI-first SEO",
            "Performance Marketing",
            "WhatsApp Automation",
            "Next.js Web Development",
            "n8n CRM Integration"
          ]}
        />
      </div>
    </>
  );
}

