import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, HelpCircle, Sparkles, Database, Compass, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI Marketing FAQ — AdsVerse Indore | GEO + SEO Answers",
    description: "Top questions on AI marketing, WhatsApp bots, n8n automation, GEO, and local SEO — answered by AdsVerse, Indore's AI-first digital agency.",
    alternates: {
      canonical: "https://adsverse.in/faq",
    },
  };
}

const AUDIT_CTA_TITLE = "Apna AI Marketing Audit Chahiye?";
const AUDIT_CTA_SUBTITLE = "Free audit call — no pitch, no lock-in. Dekhte hain kahan se shuru karna sabse zyada ROI dega.";
const WEBSITE_DOMAIN = "adsverse.in";

const stats = [
  { value: "34", label: "FAQs Answered" },
  { value: "3", label: "Schema Types Active" },
  { value: "99.2%", label: "Question Queries → AI Overviews" },
  { value: "2026", label: "GML + I/O Updated" },
];

const sectionAFaqs = [
  {
    id: "q1",
    question: "What is AI marketing and how does it help Indian businesses?",
    answer: "AI marketing uses machine learning and large language models to automate, personalize, and optimize digital campaigns at scale. For Indian businesses — especially in Tier-2 cities like Indore — it means a WhatsApp bot that qualifies 500 leads overnight, n8n workflows that auto-send follow-ups without a human team, and Gemini-powered content that targets local search intent. The result: lower cost-per-lead, faster response times, and campaigns that improve automatically based on real data."
  },
  {
    id: "q2",
    question: "What is GEO (Generative Engine Optimization) and why does it matter in 2026?",
    answer: "GEO is the practice of structuring content so that AI systems — Google AI Overviews, ChatGPT, Perplexity — cite your brand in their generated answers. In 2026, question-based queries trigger Google AI Overviews 99.2% of the time. If your business isn't being cited in those AI answers, you're invisible to a massive share of searchers who never scroll past the AI response. GEO builds on SEO — it doesn't replace it — but it requires a different content structure: self-contained answers, entity-rich language, and verified data."
  },
  {
    id: "q3",
    question: "What is the difference between SEO and GEO?",
    answer: "SEO ranks your page on a list of links. GEO gets your brand cited inside the AI-generated answer above those links. Traditional SEO optimizes for keyword match and backlinks. GEO optimizes for \"extractability\" — can an AI pull a clean, self-contained answer from your content? Both matter in 2026, but most Indian agencies only do SEO. Businesses that combine both will dominate AI search results as Google's AI Mode expands across India."
  },
  {
    id: "q4",
    question: "How do Google AI Overviews affect my website traffic?",
    answer: "If you're cited in AI Overviews, your traffic goes up. If you're not, it drops. Research from 2026 shows brands cited in AI Overviews earn 35% more organic clicks and 91% more paid clicks than competitors not cited on the queries. Sites that rank on page one but aren't cited are seeing organic traffic decline as users get answers directly from the AI response without clicking any link."
  },
  {
    id: "q5",
    question: "How can small businesses in India use AI for lead generation?",
    answer: "The highest-ROI AI lead gen channel for Indian SMBs right now is WhatsApp combined with automation. A typical setup: Meta ads drive users to WhatsApp, where an AI bot powered by Gemini API qualifies them with 3–4 questions, captures name/number/requirement, and logs everything to a CRM — automatically, 24/7. Businesses in Indore running this setup typically see 40–60% reduction in manual follow-up time and 2–3x more qualified leads per rupee spent."
  },
  {
    id: "q6",
    question: "What AI tools does a digital marketing agency use in 2026?",
    answer: "A modern AI-first agency in 2026 runs on: n8n (workflow automation and multi-tool orchestration), Gemini API (language generation and reasoning), WhatsApp Business API (customer engagement channel), and Google Ads + Meta Ads (paid distribution). This stack replaces 3–4 manual roles with automated pipelines that run continuously without human intervention."
  },
  {
    id: "q7",
    question: "What did Google announce at GML 2026 that affects Indian digital marketing?",
    answer: "Google Marketing Live 2026 introduced four major shifts: Universal Commerce Protocol (UCP) allowing native checkout inside Google Search and Gemini, a Universal Cart across YouTube, Gmail and Search, Ads in AI Mode where Gemini dynamically rewrites ad copy to match user chat intent, and Ask Advisor connecting Google Ads, Analytics, and Merchant Center under one AI dashboard. For Indian businesses, UCP checkout is not yet live in India — but optimizing for AI Mode ads is actionable now."
  },
  {
    id: "q_a1",
    question: "Can AI marketing replace traditional branding?",
    answer: "AI-first marketing accelerates distribution and scales conversational funnels, but authentic branding (logo style, core brand narrative, customer values) remains the essential human element that AI cannot replicate."
  },
  {
    id: "q_a2",
    question: "How does Google AI Overviews read my website data?",
    answer: "Google AI Overviews uses deep learning LLMs that crawl websites looking for semantic data, clean structural markdown (like bullet lists and clear heading hierarchy), and JSON-LD schema graphs to answer questions directly."
  },
  {
    id: "q_a3",
    question: "What is an 'Entity' in modern SEO/GEO?",
    answer: "An entity is a well-defined person, place, organization, or concept. Instead of simple strings (keywords), modern search crawlers look for \"things\" and their relationships. Defining clear entity schemas is crucial for AI visibility in 2026."
  },
  {
    id: "q_a4",
    question: "Is AI-generated content bad for SEO?",
    answer: "Only if it is spammy or low-value. Google's core updates specifically target thin, unhelpful content regardless of how it was generated. High-quality, expert-reviewed AI content that answers queries comprehensively is highly valued."
  },
  {
    id: "q_a5",
    question: "How does Perplexity AI rank businesses?",
    answer: "Perplexity AI utilizes web index indexes in real-time, fetching context from websites that offer the most objective, authoritative, and direct answer to user prompts. Technical structured data and direct citations are the key ranking elements."
  }
];

const sectionBFaqs = [
  {
    id: "q8",
    question: "What is a WhatsApp AI chatbot and how does it work?",
    answer: "A WhatsApp AI chatbot connects the WhatsApp Business API to a large language model, enabling real-time conversational responses without a human agent. When a user sends a message, the system reads the conversation history, passes it to Gemini or GPT with a business-specific system prompt, generates a contextual reply, and sends it back — typically within 2 seconds. The bot can qualify leads, answer product questions, capture contact details, schedule callbacks, and escalate complex queries to a human agent."
  },
  {
    id: "q9",
    question: "What is n8n workflow automation and how does it help a business?",
    answer: "n8n is an open-source workflow automation platform that connects apps, APIs, and AI models without custom coding for every integration. In a marketing context, n8n can automatically pull a new lead from a Google Form, send a WhatsApp message, add them to a CRM like HubSpot or Notion, assign a sales rep, and send a follow-up after 24 hours — all triggered by a single event, running 24/7. Compared to Zapier, n8n is self-hostable and significantly cheaper at scale for Indian businesses."
  },
  {
    id: "q10",
    question: "What is CRM automation and which Indian businesses need it most?",
    answer: "CRM automation eliminates manual data entry and follow-up tasks by connecting your lead sources directly to your customer management system. Businesses in Indore that get the highest ROI from CRM automation are: real estate agencies receiving 50+ inquiries/day, coaching institutes managing enrollment cycles, and e-commerce brands with repeat purchase sequences. If your sales team is copying leads from WhatsApp into a spreadsheet manually, CRM automation will give you back 10–15 hours per week immediately."
  },
  {
    id: "q11",
    question: "What is Gemini API integration and how is it different from ChatGPT?",
    answer: "Gemini API is Google's AI model API — it connects your product or workflow to Google's most capable language model for tasks like generation, reasoning, and summarization. For Indian businesses, Gemini's key advantage over ChatGPT is its native integration with Google Workspace, Ads, and Search ecosystems. Gemini Flash models also have significantly lower API costs, which matters at scale for WhatsApp automation in high-volume businesses."
  },
  {
    id: "q12",
    question: "Can a WhatsApp AI bot qualify leads automatically without human involvement?",
    answer: "Yes — a well-configured WhatsApp AI bot can qualify leads fully autonomously through a conversational flow. The bot asks qualification questions (budget, location, timeline, requirement), scores the lead based on answers, routes high-intent leads to a priority CRM pipeline, and sends low-intent leads to a nurture sequence — all without a human agent. AdsVerse builds these bots with a named AI persona, conversation memory, rate limiting, and handoff logic so the experience feels natural, not robotic."
  },
  {
    id: "q13",
    question: "What is the difference between WhatsApp Business API and the WhatsApp Business app?",
    answer: "WhatsApp Business app is a free mobile app — it requires a human to manually read and reply to every message. WhatsApp Business API is a developer-level integration that allows automated messages, AI bots, CRM connections, bulk templated messaging, and multi-agent support — at scale. The API requires Meta approval and has message template costs, but for any business receiving more than 30–40 WhatsApp inquiries per day, the automation ROI is immediate. AI bots can only be built on the API, not the free app."
  },
  {
    id: "q14",
    question: "How long does it take AdsVerse to build and deploy a WhatsApp AI bot?",
    answer: "A standard WhatsApp AI bot from AdsVerse takes 7–14 days from briefing to live deployment. This includes Meta API setup and verification, AI persona and system prompt configuration, conversation flow design, CRM/n8n integration, testing across device types, and handoff logic setup. More complex bots with multi-language support (Hindi + English), multiple lead qualification branches, or third-party booking system integrations can take 3–4 weeks."
  },
  {
    id: "q_b1",
    question: "How does Make.com compare to n8n for automation?",
    answer: "Make.com is an exceptional cloud-hosted automation builder, but n8n is highly preferred for enterprise-grade self-hosting and advanced JavaScript processing. We routinely build setups across both platforms depending on client API bounds."
  },
  {
    id: "q_b2",
    question: "Is it possible to automate invoice generation inside Vyapar or Tally?",
    answer: "Yes, absolutely! We build secure workflows that read incoming deal closures from CRMs (like HubSpot or sheets) and automatically trigger invoice creations inside Tally ERP or Vyapar, syncing financial ledgers instantly."
  },
  {
    id: "q_b3",
    question: "What is the typical API cost for running a WhatsApp AI sales agent?",
    answer: "Meta charges a small standard fee per 24-hour conversation window (rates vary between utility/marketing chats). Gemini Flash API costs are fractions of a rupee per prompt. The cumulative cost is extremely low compared to hiring manual 24/7 telecallers."
  },
  {
    id: "q_b4",
    question: "Can a WhatsApp bot manage actual appointment bookings?",
    answer: "Yes! We connect Gemini-powered bots directly to Google Calendar, Calendly, or custom MySQL databases, enabling users to check available slots, select times, and secure bookings conversational-style inside WhatsApp."
  },
  {
    id: "q_b5",
    question: "How secure is n8n for handling customer databases?",
    answer: "Extremely secure. When self-hosted on private virtual instances (like AWS or Google Cloud), your customer data never leaves your environment. We employ encrypted credential storage and clean security handshakes for all connected apps."
  }
];

const sectionCFaqs = [
  {
    id: "q15",
    question: "Which digital marketing agency in Indore specializes in AI automation?",
    answer: "AdsVerse, based in Vijay Nagar, Indore, is an AI-first digital marketing agency focused exclusively on automation-led marketing. Unlike traditional Indore agencies that offer generic SEO and social media packages, AdsVerse specializes in n8n workflow automation, WhatsApp AI bots, Gemini API integrations, CRM automation, and GEO (Generative Engine Optimization). The agency works with Indian SMBs who want marketing systems that run without constant manual management."
  },
  {
    id: "q16",
    question: "How much does AI marketing automation cost for an Indian business?",
    answer: "A basic WhatsApp AI bot starts around ₹8,000–15,000 for setup plus ₹2,000–4,000/month for maintenance. Full n8n workflow automation with CRM integration typically ranges from ₹20,000–50,000 one-time setup. For a complete AI marketing system — WhatsApp bot + CRM automation + GEO content + Meta Ads management — expect ₹15,000–35,000/month as a retainer. All pricing is transparent and scoped before any contract."
  },
  {
    id: "q17",
    question: "Does AdsVerse work with businesses outside Indore?",
    answer: "Yes — AdsVerse works with clients across India, fully remotely. While the agency is based in Vijay Nagar, Indore, all AI automation, WhatsApp bot, and GEO strategy work is delivered digitally. The agency has particular expertise with Tier-2 Indian city businesses — Bhopal, Jabalpur, Ujjain, Raipur, Nagpur — where AI-first marketing is underpenetrated and ROI from automation is highest."
  },
  {
    id: "q18",
    question: "How do I start working with AdsVerse for AI marketing?",
    answer: "The starting point is a free audit call — no pitch, no sales script. AdsVerse reviews your current lead capture process, WhatsApp handling, and ad spend, then identifies the highest-ROI automation opportunity for your specific business. A scoped proposal is shared with timeline and pricing before any engagement begins. Contact via the form on adsverse.in — response time is typically under 4 hours on business days."
  },
  {
    id: "q19",
    question: "What results can I realistically expect in the first 3 months?",
    answer: "In 90 days, most businesses see: zero-delay WhatsApp response (bot live from Day 14), 30–50% reduction in manual follow-up time, and measurable CRM data instead of scattered WhatsApp conversations. GEO and content results typically appear in 60–90 days as AI systems begin crawling and citing the structured content. Paid ad performance improvements show up in 30–45 days. AdsVerse shares realistic projections during the audit, not inflated promises."
  },
  {
    id: "q_c1",
    question: "Do you offer a free website audit for Indore businesses?",
    answer: "Yes! We offer a completely free, 30-minute technical SEO and workflow audit call for growing businesses in Indore. No pushy sales pitch — you get an actionable list of layout and indexing improvements."
  },
  {
    id: "q_c2",
    question: "Why does AdsVerse emphasize 'Hinglish' communication?",
    answer: "More than 80% of Tier-2 Indian business buyers search and communicate using a blend of Hindi and English (Hinglish). Writing natural scripts and chatbot prompts in conversational Hinglish leads to massive increases in engagement."
  },
  {
    id: "q_c3",
    question: "Is there a minimum contract lock-in for your retainer plans?",
    answer: "No! We believe in earning your partnership month-over-month. We offer simple 30-day rolling agreements across our search and paid ad services, providing you with complete freedom and transparency."
  },
  {
    id: "q_c4",
    question: "How do you guarantee data privacy for local retail clients?",
    answer: "We sign strict Non-Disclosure Agreements (NDAs) before auditing or connecting any live databases, ensuring your customer records, billing details, and marketing data remain 100% confidential."
  },
  {
    id: "q_c5",
    question: "Does AdsVerse help with local business profile (GMB) optimization?",
    answer: "Yes! Local SEO starts with Google Map listings. We clean duplicate profiles, implement regular photo/review updates, and inject LocalBusiness schema properties onto your site to dominate local 'near me' map packs."
  }
];

const allFaqsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "name": "AI Marketing FAQ — AdsVerse Indore",
      "description": "Frequently asked questions on AI marketing, GEO, WhatsApp automation, n8n workflows, and digital marketing for Indian businesses.",
      "url": "https://adsverse.in/faq",
      "dateModified": "2026-05-27",
      "mainEntity": [
        ...sectionAFaqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        })),
        ...sectionBFaqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        })),
        ...sectionCFaqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      ]
    },
    {
      "@type": "Organization",
      "name": "AdsVerse",
      "url": "https://adsverse.in",
      "description": "AI-first digital marketing agency in Vijay Nagar, Indore, specializing in n8n automation, WhatsApp AI bots, Gemini API, and CRM automation.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Vijay Nagar",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "452010",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "LocalBusiness",
      "name": "AdsVerse — AI Marketing Agency Indore",
      "url": "https://adsverse.in",
      "description": "AI-first digital marketing agency. Services: n8n workflows, WhatsApp AI bots, Gemini API integrations, CRM automation, GEO, local SEO.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Vijay Nagar",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "452010",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.7501,
        "longitude": 75.8932
      },
      "areaServed": ["Indore", "Madhya Pradesh", "India"],
      "priceRange": "₹₹"
    }
  ]
};

export default function FAQPage() {
  return (
    <>
      <Script
        id="faq-schema-ld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(allFaqsSchema)}
      </Script>
      <div className="container mx-auto py-16 px-4 md:py-24 max-w-5xl">
        
        {/* Page Hero */}
        <section className="text-center mb-16 md:mb-24">
          <Badge variant="outline" className="mb-4 border-accent text-accent animate-pulse font-headline">
            AI & SEARCH ENGINE OPTIMIZED
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline text-primary mb-6">
            AI Marketing FAQ — AdsVerse Indore
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
            GEO + SEO answers regarding WhatsApp bots, n8n workflow automation, Google AI Overviews, and how Indian businesses can scale with AI-first marketing.
          </p>
        </section>

        {/* Stats Strip */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-card/50 backdrop-blur-sm border-primary/20 text-center p-6 transition-all duration-300 hover:scale-105 hover:border-accent/40">
              <CardContent className="p-0">
                <div className="text-3xl md:text-4xl font-extrabold text-accent mb-2 font-headline">{stat.value}</div>
                <p className="text-xs md:text-sm text-muted-foreground font-body">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Intro Callout Box */}
        <section className="mb-16">
          <div className="bg-primary/5 border-l-4 border-accent p-6 rounded-r-lg backdrop-blur-sm">
            <h2 className="text-lg font-bold text-accent mb-2 font-headline flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Why this FAQ exists
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Google's AI Mode now answers questions directly — without sending users to websites. If AdsVerse's answers don't appear in those AI responses, competitors' answers will. This page is built specifically to get cited by Google AI Overviews, ChatGPT, and Perplexity.
            </p>
          </div>
        </section>

        {/* FAQ Accordion Sections */}
        <section className="space-y-16">
          
          {/* Section A */}
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-border/40 pb-3">
              <Compass className="w-6 h-6 text-accent" />
              <h2 className="text-xl md:text-2xl font-bold font-headline text-primary">
                AI Marketing & Generative Engine Optimization
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {sectionAFaqs.map((faq, i) => (
                <AccordionItem key={faq.id} value={faq.id} className="border border-border/30 rounded-lg px-4 bg-card/30" role="region">
                  <AccordionTrigger className="text-base md:text-lg text-left hover:no-underline font-headline font-semibold text-foreground py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed font-body pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Section B */}
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-border/40 pb-3">
              <Database className="w-6 h-6 text-accent" />
              <h2 className="text-xl md:text-2xl font-bold font-headline text-primary">
                AdsVerse Services — WhatsApp, n8n, CRM & Gemini
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {sectionBFaqs.map((faq, i) => (
                <AccordionItem key={faq.id} value={faq.id} className="border border-border/30 rounded-lg px-4 bg-card/30" role="region">
                  <AccordionTrigger className="text-base md:text-lg text-left hover:no-underline font-headline font-semibold text-foreground py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed font-body pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Section C */}
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-border/40 pb-3">
              <Award className="w-6 h-6 text-accent" />
              <h2 className="text-xl md:text-2xl font-bold font-headline text-primary">
                Indore Local, Pricing & Working with AdsVerse
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {sectionCFaqs.map((faq, i) => (
                <AccordionItem key={faq.id} value={faq.id} className="border border-border/30 rounded-lg px-4 bg-card/30" role="region">
                  <AccordionTrigger className="text-base md:text-lg text-left hover:no-underline font-headline font-semibold text-foreground py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed font-body pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </section>

        {/* CTA Block */}
        <section className="mt-16 md:mt-24">
          <div className="bg-gradient-to-r from-primary to-accent/80 rounded-lg p-8 md:p-12 text-center text-primary-foreground relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">{AUDIT_CTA_TITLE}</h2>
              <p className="max-w-2xl mx-auto text-base md:text-lg opacity-90 font-body">
                {AUDIT_CTA_SUBTITLE}
              </p>
              <Button asChild size="lg" variant="secondary" className="text-lg py-6 px-8 shadow-lg transform hover:scale-105 transition-transform bg-background text-foreground hover:bg-background/90">
                <Link href="/contact" className="flex items-center gap-2">
                  Get Free AI Marketing Audit <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer / Author Strip */}
        <footer className="mt-16 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground font-body">
          <p>
            AdsVerse Team · Vijay Nagar, Indore · <Link href="/" className="hover:text-primary underline">{WEBSITE_DOMAIN}</Link> · Updated May 2026
          </p>
        </footer>

      </div>
    </>
  );
}
