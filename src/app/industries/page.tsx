import Link from "next/link";
import type { Metadata } from "next";
import { INDUSTRIES } from "@/lib/industries";

export const metadata: Metadata = {
  title: { absolute: "Industries We Help Grow | AdsVerse" },
  description: "Explore industry-specific digital marketing, SEO, paid ads, AI search visibility and automation strategies for 55+ business sectors across India.",
  alternates: { canonical: "https://adsverse.in/industries" },
  openGraph: {
    title: "Industry-Specific Digital Marketing | AdsVerse",
    description: "Digital growth strategies tailored to the challenges, customers and buying journeys of different industries.",
    url: "https://adsverse.in/industries",
    siteName: "AdsVerse",
    locale: "en_IN",
    type: "website",
  },
};

export default function IndustriesPage() {
  const categories = Array.from(new Set(INDUSTRIES.map((item) => item.category)));
  const coaching = INDUSTRIES.find((item) => item.slug === "coaching-classes");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industries We Help Grow",
    description: "Industry-specific marketing strategy pages by AdsVerse.",
    url: "https://adsverse.in/industries",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: INDUSTRIES.map((industry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: industry.name,
        url: "https://adsverse.in/industries/" + industry.slug,
      })),
    },
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(249,115,22,.18)_0%,transparent_60%),radial-gradient(ellipse_50%_40%_at_80%_40%,rgba(139,92,246,.10)_0%,transparent_55%)]" />
      <section className="container mx-auto px-4 pb-12 pt-20 md:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 inline-flex items-center rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-300">
            Industry-specific growth strategies
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl md:text-6xl">
            Digital Marketing Built for <span className="text-orange-500">Your Industry</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            Every industry has different customers, buying cycles, trust requirements and conversion goals.
            Explore tailored SEO, paid acquisition, AI search visibility, website conversion and automation guidance
            designed around those differences—not a generic package with a different industry name.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600">
              Discuss Your Industry
            </Link>
            <Link href="#industry-directory" className="rounded-xl border border-border bg-background/70 px-6 py-3 font-bold text-foreground backdrop-blur transition hover:border-orange-500/50">
              Explore Industries
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { value: INDUSTRIES.length + "+", label: "Industry-specific guides" },
              { value: "SEO + AI", label: "Search readability included" },
              { value: "End-to-end", label: "From discovery to conversion" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border/60 bg-card/45 p-4 text-left backdrop-blur-sm">
                <p className="text-xl font-black text-orange-500">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {coaching && (
        <section className="container mx-auto px-4 pb-14">
          <div className="grid gap-6 overflow-hidden rounded-3xl border border-orange-500/25 bg-gradient-to-br from-orange-500/10 via-card/70 to-violet-500/10 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-9">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500">Featured industry</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white md:text-3xl">
                Marketing for Coaching Classes & Institutes
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-700 dark:text-slate-300">
                JEE, NEET, UPSC, MPPSC, SSC, banking, school tuition, online coaching and professional courses.
                Explore admission funnels, demo-class campaigns, local SEO, AI-readable course information and WhatsApp follow-up.
              </p>
            </div>
            <Link href={"/industries/" + coaching.slug} className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600">
              Coaching Growth Plan <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </section>
      )}

      <section id="industry-directory" className="container mx-auto scroll-mt-24 px-4 pb-20">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-4xl">Explore by industry</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Each guide includes industry-specific audience insights, channel priorities, conversion workflows,
            an AI readability and GEO/AEO section, measurement guidance and practical FAQs.
          </p>
        </div>
        <div className="space-y-12">
          {categories.map((category) => {
            const items = INDUSTRIES.filter((industry) => industry.category === category);
            return (
              <section key={category} aria-labelledby={"industry-" + category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                <div className="mb-5 flex items-end justify-between gap-4 border-b border-border/60 pb-3">
                  <h3 id={"industry-" + category.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="text-xl font-extrabold text-slate-900 dark:text-white md:text-2xl">{category}</h3>
                  <span className="text-sm text-muted-foreground">{items.length} guides</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((industry) => (
                    <Link key={industry.slug} href={"/industries/" + industry.slug} className="group rounded-2xl border border-border/60 bg-card/45 p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-card/75 hover:shadow-xl hover:shadow-orange-500/5">
                      <div className="flex items-start gap-3">
                        <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-500/15 bg-orange-500/10 text-2xl">{industry.icon}</span>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 transition group-hover:text-orange-500 dark:text-white">{industry.name}</h4>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{industry.summary}</p>
                          <span className="mt-4 inline-flex text-sm font-bold text-orange-500">View industry strategy <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">→</span></span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl border border-border/60 bg-card/45 p-7 text-center md:p-10">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white md:text-3xl">Need a strategy for a different industry?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-muted-foreground">Tell us about your audience, offer, geography and business goals. We can map the first priorities before proposing channels or budget.</p>
          <Link href="/contact" className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600">Talk to AdsVerse</Link>
        </div>
      </section>
    </div>
  );
}
