import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { INDUSTRIES, countIndustryWords, getIndustryFaqs, getIndustrySections } from "@/lib/industries";
import { getIndustryPageData } from "@/lib/industry-page-data";

type Props = { params: { slug: string } };

export const dynamicParams = false;
export const revalidate = 300;

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = await getIndustryPageData(params.slug);
  if (!industry) notFound();

  const titleName = industry.name.includes(" & ") ? industry.name.split(" & ")[0].trim() : industry.name;
  const title = titleName + " Marketing | AdsVerse";
  const description = ("Industry-specific SEO, Google and Meta Ads, AI search visibility, lead generation and automation for " + industry.name + ". Explore a practical growth strategy from AdsVerse.").slice(0, 158);
  const url = "https://adsverse.in/industries/" + industry.slug;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "AdsVerse",
      locale: "en_IN",
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description, creator: "@Adsverse1" },
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const industry = await getIndustryPageData(params.slug);
  if (!industry) notFound();

  const sections = getIndustrySections(industry).filter((section) => section.heading !== "Frequently asked questions" && section.heading !== "AI readability, GEO and AEO");
  const faqs = getIndustryFaqs(industry);
  const wordCount = countIndustryWords(industry);
  if (wordCount < 1500) throw new Error("Industry page content must contain at least 1,500 words: " + industry.slug);
  const related = INDUSTRIES.filter((item) => item.category === industry.category && item.slug !== industry.slug).slice(0, 4);

  const pageUrl = "https://adsverse.in/industries/" + industry.slug;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Digital Marketing for " + industry.name,
      description: industry.summary,
      url: pageUrl,
      isPartOf: { "@type": "WebSite", name: "AdsVerse", url: "https://adsverse.in" },
      about: { "@type": "Thing", name: industry.name },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://adsverse.in" },
          { "@type": "ListItem", position: 2, name: "Industries", item: "https://adsverse.in/industries" },
          { "@type": "ListItem", position: 3, name: industry.name, item: pageUrl },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <article className="relative isolate overflow-hidden" data-content-word-count={wordCount}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[650px] bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(249,115,22,.18)_0%,transparent_60%),radial-gradient(ellipse_50%_40%_at_80%_45%,rgba(139,92,246,.10)_0%,transparent_55%)]" />

      <header className="container mx-auto px-4 pb-12 pt-16 md:pb-16 md:pt-24">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="transition hover:text-orange-500">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/industries" className="transition hover:text-orange-500">Industries</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">{industry.name}</li>
          </ol>
        </nav>
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-300">
            <span aria-hidden="true">{industry.icon}</span> {industry.category}
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white md:text-6xl">
            Digital Marketing for <span className="text-orange-500">{industry.name}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">{industry.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600">Discuss Your Growth Plan</Link>
            <Link href="/services" className="rounded-xl border border-border bg-background/65 px-6 py-3 font-bold text-foreground backdrop-blur transition hover:border-orange-500/50">Explore AdsVerse Services</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
            <span className="rounded-full border border-border/70 bg-background/50 px-3 py-2">Industry-specific strategy</span>
            <span className="rounded-full border border-border/70 bg-background/50 px-3 py-2">AI readability / GEO / AEO</span>
            <span className="rounded-full border border-border/70 bg-background/50 px-3 py-2">Lead generation & measurement</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 pb-20 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
        <div className="min-w-0">
          <div className="mb-10 rounded-2xl border border-orange-500/20 bg-orange-500/[0.06] p-5 md:p-6">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">What this guide covers</h2>
            <p className="mt-2 leading-7 text-muted-foreground">A practical framework for matching search intent, advertising, trustworthy information, conversion design and follow-up to the real needs of {industry.name.toLowerCase()}.</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                "Audience intent and industry-specific challenges",
                "SEO and search visibility priorities",
                "AI readability, GEO and AEO content",
                "Google Ads and Meta Ads planning",
                "Conversion, CRM and WhatsApp workflows",
                "Trust, metrics and a 90-day roadmap",
              ].map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-6 text-foreground/85"><span aria-hidden="true" className="mt-1 text-orange-500">✓</span>{item}</li>)}
            </ul>
          </div>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <section key={section.heading} aria-labelledby={"section-" + index}>
                <h2 id={"section-" + index} className="text-2xl font-black leading-tight tracking-tight text-slate-950 dark:text-white md:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="text-base leading-8 text-slate-700 dark:text-slate-300">{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section id="ai-readability" className="mt-12 rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/[0.08] via-card/60 to-orange-500/[0.06] p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-500">AI Search Visibility</p>
            <h2 className="mt-3 text-2xl font-black text-slate-950 dark:text-white md:text-3xl">AI-readable content for {industry.name}</h2>
            <p className="mt-4 leading-8 text-slate-700 dark:text-slate-300">{industry.aiQuestions}</p>
            <p className="mt-4 leading-8 text-slate-700 dark:text-slate-300">Use descriptive headings, direct answers, consistent business facts, visible author or reviewer context, and structured data that mirrors the page. Include relevant service boundaries and source links for claims. This makes information easier to interpret, but does not guarantee inclusion in an AI-generated response.</p>
          </section>

          <section id="faq" className="mt-12">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white md:text-3xl">FAQs about marketing for {industry.name}</h2>
            <div className="mt-5 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-border/70 bg-card/40 p-5 open:border-orange-500/35">
                  <summary className="cursor-pointer list-none pr-5 font-bold leading-7 text-slate-950 marker:hidden dark:text-white">
                    {faq.question}
                    <span aria-hidden="true" className="float-right ml-3 text-xl text-orange-500 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-3xl border border-border/70 bg-card/40 p-6 md:p-8">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Build a practical growth plan</h2>
            <p className="mt-3 leading-8 text-muted-foreground">The right next step is to review your current customer journey, strongest services, geography, capacity and tracking. AdsVerse can help prioritize changes for {industry.name.toLowerCase()} without promising a fixed ranking, lead volume or return.</p>
            <Link href="/contact" className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600">Contact AdsVerse <span aria-hidden="true" className="ml-2">→</span></Link>
          </section>
        </div>

        <aside className="min-w-0 space-y-6">
          <div className="rounded-2xl border border-border/70 bg-card/45 p-5 lg:sticky lg:top-24">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">On this page</p>
            <nav aria-label="Article contents" className="mt-4">
              <ul className="space-y-3 text-sm">
                {sections.map((section, index) => (
                  <li key={section.heading}><a href={"#section-" + index} className="leading-6 text-muted-foreground transition hover:text-orange-500">{section.heading}</a></li>
                ))}
                <li><a href="#ai-readability" className="font-semibold text-violet-500 transition hover:text-orange-500">AI readability</a></li>
                <li><a href="#faq" className="font-semibold text-muted-foreground transition hover:text-orange-500">FAQs</a></li>
              </ul>
            </nav>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/45 p-5">
            <h2 className="font-black text-slate-950 dark:text-white">Relevant services</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { label: "SEO Optimization", href: "/services/seo-optimization" },
                { label: "Paid Ads", href: "/services/paid-ads" },
                { label: "AI Automation", href: "/services/ai-automation" },
                { label: "WhatsApp AI Bot", href: "/services/whatsapp-bot" },
                { label: "Web Design & Development", href: "/services/web-design-development" },
              ].map((service) => <li key={service.href}><Link href={service.href} className="text-muted-foreground transition hover:text-orange-500">{service.label} →</Link></li>)}
            </ul>
          </div>
          {related.length > 0 && (
            <div className="rounded-2xl border border-border/70 bg-card/45 p-5">
              <h2 className="font-black text-slate-950 dark:text-white">Related industries</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {related.map((item) => <li key={item.slug}><Link href={"/industries/" + item.slug} className="text-muted-foreground transition hover:text-orange-500">{item.name} →</Link></li>)}
              </ul>
              <Link href="/industries" className="mt-4 inline-flex text-sm font-bold text-orange-500">View all industries →</Link>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
