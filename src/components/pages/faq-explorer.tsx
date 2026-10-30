"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqCategoryId } from "@/lib/faq-data";

export function FaqExplorer() {
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return FAQ_ITEMS.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const searchableText = (faq.question + " " + faq.answer + " " + faq.categoryLabel).toLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#080b18] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[34rem] w-[48rem] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="absolute right-[-12rem] top-[35rem] h-[28rem] w-[28rem] rounded-full bg-blue-700/10 blur-[110px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-20">
        <section className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-200">
            <Sparkles className="h-4 w-4 text-orange-400" aria-hidden="true" />
            AdsVerse · Help Centre
          </div>
          <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Frequently Asked Questions — AI Marketing, Automation &amp; Growth
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Clear, transparent answers about SEO, GEO/AEO, Google &amp; Meta Ads, WhatsApp AI Chatbots, n8n CRM Automation, and working with AdsVerse.
          </p>
        </section>

        <section aria-label="Find an answer" className="mx-auto max-w-5xl">
          <div className="relative mx-auto mb-7 max-w-3xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search your question or topic..."
              aria-label="Search frequently asked questions"
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-12 pr-12 text-base text-white shadow-xl shadow-black/10 outline-none transition placeholder:text-slate-500 focus:border-violet-400/70 focus:ring-2 focus:ring-violet-500/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div aria-label="Filter FAQs by category" className="mb-5 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              aria-pressed={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all"
                ? "rounded-full border border-orange-400 bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-950/30"
                : "rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-400/50 hover:bg-white/[0.08] hover:text-white"}
            >
              All ({FAQ_ITEMS.length})
            </button>
            {FAQ_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                className={activeCategory === category.id
                  ? "rounded-full border border-orange-400 bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-950/30"
                  : "rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-400/50 hover:bg-white/[0.08] hover:text-white"}
              >
                {category.label}
              </button>
            ))}
          </div>

          <p className="mb-5 text-center text-sm text-slate-400" aria-live="polite">
            Showing <span className="font-semibold text-slate-200">{filteredFaqs.length}</span> of {FAQ_ITEMS.length} answers
            {searchQuery.trim() ? <> for <span className="text-violet-200">“{searchQuery.trim()}”</span></> : null}
          </p>

          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-3">
              {filteredFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#10162a]/90 px-5 shadow-lg shadow-black/10 transition-colors data-[state=open]:border-violet-400/35 data-[state=open]:bg-[#121a32] sm:px-6"
                >
                  <AccordionTrigger className="gap-4 py-5 text-left text-[15px] font-semibold leading-6 text-slate-100 hover:no-underline sm:text-base">
                    <span className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 shrink-0 font-mono text-xs font-bold tracking-wide text-orange-400">{faq.id.slice(-2)}</span>
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-8 pr-2 text-sm leading-7 text-slate-300 sm:pl-9 sm:text-[15px]">
                    <span className="mb-3 inline-flex rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-200">
                      {faq.categoryLabel}
                    </span>
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-14 text-center">
              <Search className="mx-auto mb-4 h-8 w-8 text-slate-500" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-white">No matching questions</h2>
              <p className="mt-2 text-sm text-slate-400">Try a different keyword or choose another category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-5 rounded-full border border-violet-300/30 bg-violet-400/10 px-4 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-400/20"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-violet-300/20 bg-gradient-to-br from-[#171b38] via-[#11172e] to-[#101a2b] px-6 py-10 text-center shadow-2xl shadow-violet-950/20 sm:px-10 md:mt-20 md:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">Ready to plan your next step?</p>
          <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">Get a clear growth roadmap for your business.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Talk to AdsVerse about search visibility, paid campaigns, WhatsApp automation, or a website built around your sales process.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#11172e]"
          >
            Talk to AdsVerse <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <footer className="mt-12 border-t border-white/10 pt-7 text-center text-sm text-slate-400">
          <p>AdsVerse · Vijay Nagar / Meghdoot Nagar, Indore · <Link href="/" className="text-slate-300 underline decoration-white/30 underline-offset-4 hover:text-white">adsverse.in</Link></p>
        </footer>
      </div>
    </main>
  );
}
