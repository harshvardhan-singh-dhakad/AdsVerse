import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import dynamic from 'next/dynamic';
import { cn } from "@/lib/utils";

import { AnimatedCounter } from "@/components/pages/animated-counter";
const FAQAccordion = dynamic(() => import('@/components/pages/faq-accordion').then(mod => mod.FAQAccordion));
const OrbitalGraphic = dynamic(() => import('@/components/pages/orbital-graphic').then(mod => mod.OrbitalGraphic));

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Best AI & Digital Marketing Agency in Indore",
    description: "AdsVerse is Indore's top AI marketing agency. We specialize in SEO, Paid Ads, and Automation to drive 10x ROI for your business.",
    alternates: {
      canonical: `https://adsverse.in`,
    },
  };
}

const testimonials = [
  {
    name: "Rajesh Agrawal",
    role: "RK Traders, Indore",
    text: "AdsVerse reduced our Google Ads cost by 40% and doubled our leads within three months. Deepak's approach is completely practical — focused on real outcomes, not theory.",
    initials: "RA"
  },
  {
    name: "Prerna Joshi",
    role: "Bloom Beauty Studio, Vijay Nagar",
    text: "The WhatsApp bot now handles 70% of our booking queries automatically. Our staff saves hours every week and our customers get instant responses. Highly recommended for any service business.",
    initials: "PJ"
  },
  {
    name: "Sandeep Malviya",
    role: "TechBridge Solutions, Indore",
    text: "After AdsVerse's SEO work, our 'CA firm Indore' keyword reached Page 1. Their content strategy is genuinely different — the AI-first approach actually delivers results.",
    initials: "SM"
  },
];

const faqs = [
  {
    question: "What is GEO (Generative Engine Optimization) and why does it matter in 2026?",
    answer: "GEO is the practice of structuring content so that AI systems — Google AI Overviews, ChatGPT, Perplexity — cite your brand in their generated answers. In 2026, question-based queries trigger Google AI Overviews 99.2% of the time. If your business isn't being cited in those AI answers, you're invisible to a massive share of searchers who never scroll past the AI response. GEO builds on SEO — it doesn't replace it — but it requires a different content structure: self-contained answers, entity-rich language, and verified data."
  },
  {
    question: "What is a WhatsApp AI chatbot and how does it work?",
    answer: "A WhatsApp AI chatbot connects the WhatsApp Business API to a large language model, enabling real-time conversational responses without a human agent. When a user sends a message, the system reads the conversation history, passes it to Gemini or GPT with a business-specific system prompt, generates a contextual reply, and sends it back — typically within 2 seconds. The bot can qualify leads, answer product questions, capture contact details, schedule callbacks, and escalate complex queries to a human agent."
  },
  {
    question: "What is n8n workflow automation and how does it help a business?",
    answer: "n8n is an open-source workflow automation platform that connects apps, APIs, and AI models without custom coding for every integration. In a marketing context, n8n can automatically pull a new lead from a Google Form, send a WhatsApp message, add them to a CRM like HubSpot or Notion, assign a sales rep, and send a follow-up after 24 hours — all triggered by a single event, running 24/7. Compared to Zapier, n8n is self-hostable and significantly cheaper at scale for Indian businesses."
  },
  {
    question: "Which digital marketing agency in Indore specializes in AI automation?",
    answer: "AdsVerse, based in Vijay Nagar, Indore, is an AI-first digital marketing agency focused exclusively on automation-led marketing. Unlike traditional Indore agencies that offer generic SEO and social media packages, AdsVerse specializes in n8n workflow automation, WhatsApp AI bots, Gemini API integrations, CRM automation, and GEO (Generative Engine Optimization). The agency works with Indian SMBs who want marketing systems that run without constant manual management."
  },
  {
    question: "How much does AI marketing automation cost for an Indian business?",
    answer: "A basic WhatsApp AI bot starts around ₹8,000–15,000 for setup plus ₹2,000–4,000/month for maintenance. Full n8n workflow automation with CRM integration typically ranges from ₹20,000–50,000 one-time setup. For a complete AI marketing system — WhatsApp bot + CRM automation + GEO content + Meta Ads management — expect ₹15,000–35,000/month as a retainer. All pricing is transparent and scoped before any contract."
  }
];

const coreServices = [
  {
    title: "Google & Meta Ads",
    description: "Maximize your ROI with targeted ad campaigns. Our PPC and Meta Ads strategies are built on data, not guesswork.",
    color: "brand-orange",
    icon: "ads_click",
    bullets: ["Search & Display", "Retargeting Funnels"],
    href: "/services/paid-ads"
  },
  {
    title: "WhatsApp Automation",
    description: "Streamline your business processes with custom bots and AI-powered solutions that handle customer queries 24/7.",
    color: "primary",
    icon: "forum",
    bullets: ["AI Chatbots", "Broadcast Engine"],
    href: "/services/whatsapp-bot"
  },
  {
    title: "Custom AI Agents",
    description: "Streamline your business processes with custom bots and fine-tuned Gemini and GPT models built for your specific data.",
    color: "brand-orange",
    icon: "memory",
    bullets: ["Knowledge Base", "LLM Workflows"],
    href: "/services/automation-tools"
  },
  {
    title: "Sales Funnels",
    description: "High-converting landing pages and automated sales funnels integrated with your CRM to reduce Cost Per Acquisition.",
    color: "primary",
    icon: "conversion_path",
    bullets: ["CRO Focused", "CRM Integration"],
    href: "/services/lead-generation"
  },
  {
    title: "SEO Optimization",
    description: "Rank higher on search engines and attract organic traffic. We focus on Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO).",
    color: "brand-orange",
    icon: "search_insights",
    bullets: ["AEO Strategy", "GEO Ranking"],
    href: "/services/seo-optimization"
  },
  {
    title: "Web Development",
    description: "Get a beautiful, high-performing website that converts visitors into customers. Built with modern stacks for maximum speed and SEO.",
    color: "primary",
    icon: "code",
    bullets: ["Modern Stacks", "Speed Optimized"],
    href: "/services/web-design-development"
  },
  {
    title: "Content Marketing",
    description: "Engage your audience and build authority with valuable, SEO-optimized content that drives organic growth.",
    color: "brand-orange",
    icon: "edit_note",
    bullets: ["Authority Building", "Audience Engagement"],
    href: "/services/content-marketing"
  },
  {
    title: "Social Media Management",
    description: "Build and nurture your online community through strategic social media management and data-backed engagement.",
    color: "primary",
    icon: "share_reviews",
    bullets: ["Community Growth", "Data-Backed Strategy"],
    href: "/services/social-media-management"
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

// Orbit styles have been moved to globals.css for browser caching

export default function HomePage() {

  return (
    <>
      {/* FAQ Schema — plain script for immediate crawler access */}
      <script
        id="home-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Orbit styles moved to globals.css — no inline style injection */}

      <div className="pt-16 md:pt-24 relative overflow-hidden">
      {/* Hero Background Effect — decorative */}
      <div className="hero-vibrant-bg" aria-hidden="true"></div>

      {/* Hero Section */}
      <section aria-label="Hero: AI-Powered Digital Marketing Agency in Indore" className="relative max-w-[1280px] mx-auto px-5 md:px-8 mb-20 md:mb-[160px] pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
            <div className="w-full md:w-1/2 space-y-6 md:space-y-10 relative z-10 text-left">
              <div className="flex items-center gap-3">
                <span className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.2em] text-brand-orange uppercase">
                  AI-First Digital Marketing • Indore
                </span>
              </div>
              <h1 className="font-sans text-[30px] sm:text-5xl md:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.1] md:leading-none text-slate-900 dark:text-white">
                Grow Your Business <br /> Faster with <br />
                <span className="gradient-text">AI-Powered</span> <span className="text-brand-orange">Marketing</span>
              </h1>
              <p className="font-sans text-base sm:text-lg md:text-xl font-medium text-slate-800 dark:text-slate-100 max-w-lg leading-relaxed">
                n8n automation, WhatsApp bots, Google &amp; Meta campaigns, and Gemini AI workflows — built for <span className="text-brand-orange font-bold">Indore SMBs</span>.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 md:pt-6">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/95 text-white px-6 md:px-8 py-3 md:py-4 h-auto rounded-xl font-bold shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all flex items-center gap-3 text-base md:text-lg border-none">
                  <Link href="/contact" prefetch={false}>
                    Get Free Audit <span className="material-symbols-outlined select-none text-base md:text-lg">arrow_forward</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="glass-card text-slate-900 dark:text-white px-6 md:px-8 py-3 md:py-4 h-auto rounded-xl font-bold hover:bg-white/5 transition-all text-base md:text-lg border border-border-glass">
                  <Link href="/blog" prefetch={false}>Our Insights</Link>
                </Button>
              </div>
              
              {/* Preserved Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-8 pt-8 md:pt-10 border-t border-border-glass mt-8 md:mt-10">
                <div>
                  <div className="font-sans text-xl sm:text-3xl md:text-4xl font-extrabold leading-none text-brand-orange mb-1">
                    <AnimatedCounter target={113} suffix="+" />
                  </div>
                  <div className="font-sans text-[10px] sm:text-[15px] font-semibold text-slate-700 dark:text-slate-300">Clients Served</div>
                </div>
                <div className="border-l border-border-glass pl-2 sm:pl-6 md:pl-8">
                  <div className="font-sans text-xl sm:text-3xl md:text-4xl font-extrabold leading-none text-primary mb-1">
                    <AnimatedCounter target={4.8} suffix="x" />
                  </div>
                  <div className="font-sans text-[10px] sm:text-[15px] font-semibold text-slate-700 dark:text-slate-300">Avg. ROAS</div>
                </div>
                <div className="border-l border-border-glass pl-2 sm:pl-6 md:pl-8">
                  <div className="font-sans text-xl sm:text-3xl md:text-4xl font-extrabold leading-none text-brand-orange mb-1">
                    <AnimatedCounter target={3} suffix=" yrs" />
                  </div>
                  <div className="font-sans text-[10px] sm:text-[15px] font-semibold text-slate-700 dark:text-slate-300">Building in AI</div>
                </div>
              </div>
            </div>

            {/* Orbital graphic — decorative animation */}
            <OrbitalGraphic />
          </div>
      </section>

      {/* Trusted By */}
      <section aria-label="Trusted By: Our Clients" className="max-w-[1280px] mx-auto px-5 md:px-8 mb-20 md:mb-[160px]">
          <div className="border-y border-border-glass py-8 md:py-12 flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity duration-500">
            <span className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.2em] text-slate-700 dark:text-slate-300">TRUSTED BY</span>
            <span className="font-sans text-lg md:text-2xl font-bold text-slate-900 dark:text-white tracking-wide">SimplyHerbal</span>
            <span className="font-sans text-lg md:text-2xl font-bold text-slate-900 dark:text-white tracking-wide">AssistHour</span>
            <span className="font-sans text-lg md:text-2xl font-bold text-slate-900 dark:text-white tracking-wide">Gold Pure Enterprises</span>
            <span className="font-sans text-lg md:text-2xl font-bold text-slate-900 dark:text-white tracking-wide">SMB Infratech</span>
            <span className="font-sans text-lg md:text-2xl font-bold text-slate-900 dark:text-white tracking-wide">Soulvedic</span>
          </div>
      </section>

      {/* Why AdsVerse - Bento Grid */}
      <section aria-label="Why Choose AdsVerse" className="max-w-[1280px] mx-auto px-5 md:px-8 mb-20 md:mb-[160px]">
        <div className="text-center mb-10">
            <span className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.2em] text-brand-orange">THE DIFFERENCE</span>
            <h2 className="font-sans text-[32px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white mt-4">Why Businesses Choose <span className="text-brand-orange">AdsVerse</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 glass-card rounded-3xl p-5 sm:p-6 md:p-10 relative overflow-hidden group">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-brand-orange text-4xl md:text-5xl mb-4 md:mb-6 orange-glow select-none" aria-hidden="true">smart_toy</span>
                <h3 className="font-sans text-2xl md:text-[28px] font-bold leading-[1.3] text-slate-900 dark:text-white mb-3 md:mb-4">AI-Native <span className="text-brand-orange">Strategy</span></h3>
                <p className="font-sans text-base md:text-[18px] leading-[1.6] text-slate-800 dark:text-slate-200 max-w-lg leading-relaxed">
                  We don't just "use" AI; we build custom GPT agents and Gemini workflows that automate your entire sales funnel, from lead capture to conversion.
                </p>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-orange/15 rounded-full blur-[80px] group-hover:bg-brand-orange/25 transition-all duration-700"></div>
            </div>
            <div className="glass-card rounded-3xl p-5 sm:p-6 md:p-10 hover:-translate-y-2 group">
              <span className="material-symbols-outlined text-primary text-4xl md:text-5xl mb-4 md:mb-6 purple-glow select-none" aria-hidden="true">data_thresholding</span>
              <h3 className="font-sans text-2xl md:text-[28px] font-bold leading-[1.3] text-slate-900 dark:text-white mb-3 md:mb-4 group-hover:text-primary transition-colors">Real-Time Data</h3>
              <p className="font-sans text-base md:text-[18px] leading-[1.6] text-slate-800 dark:text-slate-200 leading-relaxed">
                Proprietary dashboards that sync with your CRM to give you a 360-degree view of your ROAS in real-time.
              </p>
            </div>
            <div className="glass-card rounded-3xl p-5 sm:p-6 md:p-10 hover:-translate-y-2 group">
              <span className="material-symbols-outlined text-primary text-4xl md:text-5xl mb-4 md:mb-6 purple-glow select-none" aria-hidden="true">location_on</span>
              <h3 className="font-sans text-2xl md:text-[28px] font-bold leading-[1.3] text-slate-900 dark:text-white mb-3 md:mb-4 group-hover:text-primary transition-colors">Indore Market Focus</h3>
              <p className="font-sans text-base md:text-[18px] leading-[1.6] text-slate-800 dark:text-slate-200 leading-relaxed">
                We understand local consumer behavior and optimize campaigns specifically for regional resonance.
              </p>
            </div>
            <div className="md:col-span-2 glass-card rounded-3xl p-5 sm:p-6 md:p-10 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                <div className="flex-1">
                  <span className="material-symbols-outlined text-brand-orange text-4xl md:text-5xl mb-4 md:mb-6 orange-glow select-none" aria-hidden="true">bolt</span>
                  <h3 className="font-sans text-2xl md:text-[28px] font-bold leading-[1.3] text-slate-900 dark:text-white mb-3 md:mb-4">Zero Friction <span className="text-brand-orange">Automation</span></h3>
                  <p className="font-sans text-base md:text-[18px] leading-[1.6] text-slate-800 dark:text-slate-200 leading-relaxed">
                    Integrating n8n and Zapier to ensure your sales team never misses a lead again, with instant WhatsApp follow-ups.
                  </p>
                </div>
                <Image 
                  alt="Automation Dashboard" 
                  className="w-full md:w-5/12 rounded-2xl border border-border-glass shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-primary/50 transition-colors" 
                  src="https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o/Image%2FOur%20Work%2Fautomation-dashboard.webp?alt=media"
                  width={500}
                  height={350}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/15 rounded-full blur-[80px] group-hover:bg-primary/25 transition-all duration-700"></div>
            </div>
          </div>
      </section>

      {/* Core Services */}
      <section aria-label="Our Core Digital Marketing Services" className="max-w-[1280px] mx-auto px-5 md:px-8 mb-20 md:mb-[160px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
            <div>
              <span className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.2em] text-brand-orange uppercase">
                OUR SERVICES
              </span>
              <h2 className="font-sans text-[32px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white mt-4">
                Our Core <span className="text-brand-orange">Services</span>
              </h2>
            </div>
            <p className="font-sans text-base sm:text-lg md:text-xl font-normal text-slate-800 dark:text-slate-200 max-w-md">
              From performance marketing to deep-tech automation, we provide the full stack.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {coreServices.map((service, index) => {
              const borderClass = service.color === "brand-orange" ? "border-t-brand-orange" : "border-t-primary";
              const bgClass = service.color === "brand-orange" ? "bg-brand-orange/10 group-hover:bg-brand-orange/20" : "bg-primary/10 group-hover:bg-primary/20";
              const textClass = service.color === "brand-orange" ? "text-brand-orange" : "text-primary";
              return (
                <Link key={index} href={service.href} prefetch={false} className="block group">
                  <div className={`glass-card p-5 sm:p-8 md:p-10 h-full rounded-3xl border-t-4 ${borderClass} flex flex-col justify-between`}>
                    <div>
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${bgClass} flex items-center justify-center mb-6 md:mb-8 transition-colors`}>
                      <span className={`material-symbols-outlined ${textClass} text-2xl md:text-3xl select-none`} aria-hidden="true">{service.icon}</span>
                      </div>
                      <h3 className="font-sans text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">{service.title}</h3>
                      <p className="font-sans text-sm md:text-base leading-relaxed text-slate-800 dark:text-slate-200 mb-6 md:mb-8">{service.description}</p>
                    </div>
                    <ul className="space-y-3 md:space-y-4 text-slate-900 dark:text-slate-100 font-medium">
                      {service.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm md:text-base">
                          <span className={`material-symbols-outlined ${textClass} text-lg md:text-xl select-none`} aria-hidden="true">check_circle</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>
          {/* More Services CTA */}
          <div className="flex justify-center mt-12 md:mt-16">
            <Button asChild variant="outline" size="lg" className="glass-card text-slate-900 dark:text-white px-8 md:px-12 py-3 md:py-4 h-auto rounded-xl font-bold hover:bg-primary/10 hover:border-primary/50 transition-all text-base md:text-lg border border-border-glass group">
              <Link href="/our-services" prefetch={false} aria-label="View all our digital marketing services">
                More Services
                <span className="material-symbols-outlined select-none text-base md:text-lg ml-2 group-hover:translate-x-1 transition-transform inline-block" aria-hidden="true">arrow_forward</span>
              </Link>
            </Button>
          </div>
      </section>

      {/* Testimonials */}
      <section aria-label="Client Testimonials" className="max-w-[1280px] mx-auto px-5 md:px-8 mb-20 md:mb-[160px]">
          <div className="text-center mb-10">
            <span className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.2em] text-brand-orange">TESTIMONIALS</span>
            <h2 className="font-sans text-[32px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white mt-4">What Our <span className="text-brand-orange">Clients Say</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => {
              const textIconColor = index % 2 === 0 ? "text-brand-orange" : "text-primary";
              return (
                <div key={index} className="glass-card p-5 sm:p-8 md:p-10 rounded-3xl relative flex flex-col justify-between">
                  <div>
                    <span className={`material-symbols-outlined ${textIconColor} text-3xl md:text-4xl mb-4 md:mb-6 opacity-50 select-none`} aria-hidden="true">format_quote</span>
                    <p className="font-sans text-sm md:text-[18px] leading-[1.6] text-slate-800 dark:text-slate-200 mb-6 md:mb-8 italic">"{t.text}"</p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-border-glass pt-5 md:pt-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-900 dark:text-white text-lg md:text-xl select-none">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-sans text-base md:text-lg font-bold text-slate-900 dark:text-white">{t.name}</div>
                      <div className="font-sans text-xs md:text-[15px] font-medium text-slate-700 dark:text-slate-300">{t.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
      </section>

      {/* FAQ */}
      <section aria-label="Frequently Asked Questions" className="max-w-[1280px] mx-auto px-5 md:px-8 mb-20 md:mb-[160px]" id="faq">
          <div className="text-center mb-10">
            <span className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.2em] text-brand-orange">FAQ</span>
            <h2 className="font-sans text-[32px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white mt-4">Frequently Asked <span className="text-brand-orange">Questions</span></h2>
            <p className="font-sans text-base sm:text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200 mt-4">
              AI marketing, GEO, WhatsApp automation, aur AdsVerse ke baare mein — common questions, direct answers.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            <FAQAccordion faqs={faqs} />
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" prefetch={false} className="text-primary hover:text-white transition-colors font-bold inline-flex items-center gap-2" aria-label="See all 19 frequently asked questions">
              See All 19 FAQs <span className="material-symbols-outlined select-none text-base" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
      </section>

      {/* CTA Section */}
      <section aria-label="Call to Action: Get a Free Digital Audit" className="max-w-[1280px] mx-auto px-5 md:px-8 mb-20 md:mb-[160px]">
        <div className="glass-card rounded-[32px] md:rounded-[48px] p-6 sm:p-10 md:p-28 text-center relative overflow-hidden border-primary/30 shadow-[0_0_80px_rgba(139,92,246,0.15)] bg-gradient-to-br from-white/[0.02] to-transparent">
          <div className="absolute inset-0 bg-nebula opacity-50 pointer-events-none" aria-hidden="true"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px]" aria-hidden="true"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" aria-hidden="true"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-6 md:space-y-10">
            <h2 className="font-sans text-[28px] sm:text-4xl md:text-[48px] font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white">Ready to Scale Your Business to the <span className="text-brand-orange">Next Level?</span></h2>
            <p className="font-sans text-base md:text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              Get a free digital audit worth ₹15,000. Our experts will analyze your current funnel and provide a custom AI growth roadmap.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 pt-6 md:pt-8">
              <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/95 text-black px-10 md:px-12 py-4 md:py-5 h-auto rounded-2xl font-bold text-lg md:text-xl shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transition-all transform hover:-translate-y-1 border-none">
                <Link href="/contact" prefetch={false}>Claim Free Audit Now</Link>
              </Button>
              <Button asChild variant="link" size="lg" className="text-slate-900 dark:text-white hover:text-brand-orange transition-colors font-bold flex items-center gap-3 text-base md:text-lg px-6 py-4 md:py-5 h-auto">
                <Link href="/contact" prefetch={false}>
                  Contact our team <span className="material-symbols-outlined select-none" aria-hidden="true">chat_bubble</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
