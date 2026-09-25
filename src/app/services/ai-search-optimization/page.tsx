import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Bot, Search, Sparkles, BarChart3, Quote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: { absolute: "AI Search Optimization in India | SEO, AEO & GEO | AdsVerse" },
  description:
    "Build search visibility across Google, Bing, AI Overviews, Copilot and answer engines with AdsVerse's SEO, AEO and GEO framework for Indian businesses.",
  keywords: [
    "AI search optimization India",
    "SEO AEO GEO agency India",
    "AEO agency India",
    "GEO services India",
    "AI search visibility agency",
    "Google AI Overviews SEO",
    "Bing Copilot SEO",
    "ChatGPT search visibility",
  ],
  alternates: {
    canonical: "https://adsverse.in/services/ai-search-optimization",
  },
  openGraph: {
    title: { absolute: "AI Search Optimization in India | AdsVerse" },
    description:
      "A practical SEO + AEO + GEO framework for search rankings, answer visibility and AI citations.",
    url: "https://adsverse.in/services/ai-search-optimization",
    siteName: "AdsVerse",
    locale: "en_IN",
    type: "website",
  },
};

const faqs = [
  {
    question: "What is AI Search Optimization?",
    answer:
      "AI Search Optimization is a combined approach that improves traditional search visibility while making the same business information clearer for answer engines and generative search systems. It includes technical SEO, structured content, entity consistency, useful FAQs, first-party evidence and authoritative references.",
  },
  {
    question: "Is AEO different from SEO?",
    answer:
      "AEO focuses on making information easy to extract and answer directly, while SEO covers the broader process of crawling, indexing, relevance, authority and user experience. A strong strategy uses both instead of treating them as separate websites or content silos.",
  },
  {
    question: "What does GEO mean for a local Indian business?",
    answer:
      "For a local business, GEO means making the business entity, services, locations, expertise and evidence easy for generative systems to understand and verify. Consistent first-party information and independent references matter more than simply repeating a target phrase.",
  },
  {
    question: "Can SEO, AEO and GEO be worked on together?",
    answer:
      "Yes. The same core content can support all three when it is technically accessible, clearly structured, useful to people, explicit about the business entity and supported by trustworthy evidence. The goal is one strong information architecture, not three copies of the same page.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://adsverse.in/services/ai-search-optimization#service",
      name: "AI Search Optimization",
      serviceType: "SEO, Answer Engine Optimization and Generative Engine Optimization",
      description:
        "Search visibility framework combining SEO, AEO and GEO for Indian businesses.",
      provider: {
        "@type": "LocalBusiness",
        "@id": "https://adsverse.in/#organization",
        name: "AdsVerse",
        url: "https://adsverse.in",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      url: "https://adsverse.in/services/ai-search-optimization",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://adsverse.in" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://adsverse.in/services" },
        {
          "@type": "ListItem",
          position: 3,
          name: "AI Search Optimization",
          item: "https://adsverse.in/services/ai-search-optimization",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function AISearchOptimizationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen">
        <section className="relative overflow-hidden border-b border-border/40 py-20 md:py-28">
          <div className="absolute inset-0 bg-primary/[0.04] pointer-events-none" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                SEO · AEO · GEO
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white md:text-6xl">
                AI Search Optimization for Indian Businesses
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300 md:text-xl">
                Build one authoritative search presence that works across Google results, answer experiences,
                AI Overviews, Bing/Copilot and generative search. We connect technical SEO, direct-answer
                content, entity clarity and first-party evidence instead of creating disconnected SEO, AEO and GEO pages.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/tools/seo-audit"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground shadow-sm hover:opacity-90"
                >
                  Run a Technical SEO Audit
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact?service=AI%20Search%20Optimization&plan=Search%20Strategy%20Call"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-bold text-foreground hover:border-primary/40 hover:text-primary"
                >
                  Book a Search Strategy Call
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "SEO",
                text: "Crawlability, indexing, canonical architecture, internal linking, Core Web Vitals, metadata, structured data and search-intent coverage.",
              },
              {
                icon: Quote,
                title: "AEO",
                text: "Question-led structure, concise answers, definitions, comparison blocks and useful FAQs that make important information easy to extract.",
              },
              {
                icon: Bot,
                title: "GEO",
                text: "Entity consistency, first-party expertise, citation-worthy evidence and clear relationships between your brand, services, people and locations.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="border-border/60 bg-card/70">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="border-y border-border/40 bg-muted/20 py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-primary">What we fix</span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white md:text-4xl">
                One information architecture for every search surface
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                "Technical crawl and indexability foundations",
                "Canonical and redirect consistency",
                "Search-intent and topic-cluster architecture",
                "Service, organization, person and local entity clarity",
                "Direct answers, definitions and decision-support content",
                "First-party case studies and measurable proof",
                "Internal links between services, locations, evidence and resources",
                "AI-friendly sitemap, robots and discovery infrastructure",
                "Bing/Copilot citation readiness",
                "Google AI feature visibility measurement",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-border/50 bg-background/70 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm leading-6 text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-primary">Implementation model</span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white md:text-4xl">
                Build the evidence layer before chasing more keywords
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
                A strong AI-search presence is not created by adding more copies of “best agency” to a page.
                It comes from making the business understandable, useful and verifiable. That means consistent
                organization data, clear service definitions, original work, real outcomes, author identity,
                strong local signals and supporting references from the wider web.
              </p>
              <div className="mt-7 grid gap-3">
                {[
                  "Define the canonical AdsVerse entity and source-of-truth facts.",
                  "Map services to search intent, entities and supporting proof.",
                  "Turn existing case studies into citation-worthy evidence.",
                  "Connect service, location and authority pages with deliberate internal linking.",
                  "Measure Google and Bing AI visibility instead of relying on assumptions.",
                ].map((item, index) => (
                  <div key={item} className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-primary/20 bg-primary/[0.04]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
                  Recommended measurement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                  <div className="text-xs font-black uppercase tracking-wider text-primary">Google</div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Organic impressions, clicks, indexed pages, AI-feature visibility and query-level intent.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                  <div className="text-xs font-black uppercase tracking-wider text-primary">Bing / Copilot</div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Cited URLs, AI visibility, topics, intents and citation share through Bing Webmaster Tools.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                  <div className="text-xs font-black uppercase tracking-wider text-primary">Business</div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Qualified leads, calls, booked consultations and revenue attributed back to search.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto max-w-4xl px-4 pb-20">
          <div className="mb-10 text-center">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-primary">FAQ</span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
              AI Search Optimization FAQs
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="rounded-2xl border border-border/50 px-5"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="container mx-auto max-w-6xl px-4 pb-24">
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/[0.08] to-transparent">
            <CardContent className="p-8 text-center md:p-12">
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white md:text-4xl">
                Make AdsVerse easier to find, understand and cite
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Start with the technical foundation, then connect your service pages, local entity signals,
                original evidence and search measurement into one system.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/tools/seo-audit"
                  className="rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground hover:opacity-90"
                >
                  Run Free SEO Audit
                </Link>
                <Link
                  href="/services/seo-optimization"
                  className="rounded-xl border border-border px-5 py-3 font-bold text-foreground hover:border-primary/40 hover:text-primary"
                >
                  SEO Services
                </Link>
                <Link
                  href="/services/geo-optimization"
                  className="rounded-xl border border-border px-5 py-3 font-bold text-foreground hover:border-primary/40 hover:text-primary"
                >
                  GEO Services
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
