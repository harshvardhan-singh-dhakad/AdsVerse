import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, HelpCircle, Sparkles, Database, Compass, Award } from "lucide-react";
import { getFaqSections } from "@/lib/reputation-catalog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { absolute: "AI Marketing FAQ — AdsVerse Indore | GEO + SEO Answers" },
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

export default async function FAQPage() {
  const { a: sectionAFaqs, b: sectionBFaqs, c: sectionCFaqs } = await getFaqSections();
  const allFaqs = [...sectionAFaqs, ...sectionBFaqs, ...sectionCFaqs];

  const allFaqsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "name": "AI Marketing FAQ — AdsVerse Indore",
        "description": "Frequently asked questions on AI marketing, GEO, WhatsApp automation, n8n workflows, and digital marketing for Indian businesses.",
        "url": "https://adsverse.in/faq",
        "dateModified": new Date().toISOString().slice(0, 10),
        "mainEntity": allFaqs.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer,
          },
        })),
      },
      {
        "@type": "Organization",
        "name": "AdsVerse",
        "url": "https://adsverse.in",
        "description": "AI-first digital marketing agency in Vijay Nagar, Indore, specializing in n8n automation, WhatsApp AI bots, Gemini API, and CRM automation.",
      },
    ],
  };

  return (
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
