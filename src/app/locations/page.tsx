import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

function TablerMapPin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
    </svg>
  );
}

const stateBorderMap: Record<string, string> = {
  "Madhya Pradesh": "border-l-4 border-l-blue-500",
  "Rajasthan": "border-l-4 border-l-amber-500",
  "Chhattisgarh": "border-l-4 border-l-cyan-500",
  "Uttar Pradesh": "border-l-4 border-l-purple-500",
  "Bihar": "border-l-4 border-l-rose-500",
  "Jammu & Kashmir": "border-l-4 border-l-teal-500",
  "Northeast India": "border-l-4 border-l-pink-500",
};

export const metadata: Metadata = {
  title: { absolute: "Locations We Serve | Digital Marketing & AI Agency Across India | AdsVerse" },
  description: "AdsVerse delivers AI-first SEO, WhatsApp automation, and performance ads in Indore, Bhopal, Jaipur, Lucknow, Raipur, Guwahati & 18+ Indian cities. Tier-2 focused, Tier-1 results.",
  alternates: {
    canonical: "https://adsverse.in/locations",
  },
  openGraph: {
    title: { absolute: "Locations We Serve | AdsVerse Digital Marketing Agency" },
    description: "AI-first digital marketing across Madhya Pradesh, Rajasthan, UP, Chhattisgarh & Northeast India. SEO, WhatsApp bots, Google/Meta Ads.",
    url: "https://adsverse.in/locations",
    siteName: "AdsVerse",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: { absolute: "Locations We Serve | AdsVerse" },
    description: "AI-first digital marketing across 24 Indian cities in our core markets. SEO, WhatsApp bots, Google/Meta Ads.",
    creator: "@Adsverse1",
  },
};

const locationsGrouped = [
  {
    state: "Madhya Pradesh",
    cities: [
      { slug: "indore", name: "Indore", desc: "Best digital marketing agency in Indore & top advertising company. Headquartered in Vijay Nagar / Meghdoot Nagar — delivering high-ROAS Google Ads, Meta Ads, local 3-pack SEO, and WhatsApp AI automation." },
      { slug: "bhopal", name: "Bhopal", desc: "Top digital marketing company in Bhopal. High-converting Google Ads, Meta Lead Ads & automated WhatsApp student screening funnels for MP Nagar coaching institutes and retail brands." },
      { slug: "jabalpur", name: "Jabalpur", desc: "Leading digital marketing agency in Jabalpur. Local 3-pack Google SEO, high-intent search ads, and click-to-call direct lead capture for healthcare diagnostics, retail, and manufacturing." },
      { slug: "gwalior", name: "Gwalior", desc: "Top advertising agency in Gwalior. Dual-intent Google Ads separating heritage tourism inquiries from City Centre local resident commerce, paired with Next.js web systems." },
      { slug: "ujjain", name: "Ujjain", desc: "Premier digital marketing company in Ujjain. Seasonal pilgrimage campaign scheduling around Mahakaleshwar, direct-booking WhatsApp funnels, and 0% OTA commission setups." },
    ],
  },
  {
    state: "Rajasthan",
    cities: [
      { slug: "jaipur", name: "Jaipur", desc: "Top advertising agency in Jaipur for D2C jewelry, fashion & retail. High-frequency Meta creative testing, Google Shopping Ads, and 4.8x average ROAS." },
      { slug: "jodhpur", name: "Jodhpur", desc: "Leading digital marketing agency in Jodhpur. International B2B export search ads, handicraft manufacturing SEO, Next.js web design, and luxury tourism funnels." },
      { slug: "udaipur", name: "Udaipur", desc: "Top hospitality advertising agency in Udaipur. Booking-funnel-first Google Search PPC, destination wedding lead funnels, and automated WhatsApp room reservations." },
      { slug: "kota", name: "Kota", desc: "Best digital marketing company in Kota for coaching institutes. Admission-cycle Google Search Ads, counselor qualification WhatsApp bots, and automated CRM lead sync." },
    ],
  },
  {
    state: "Chhattisgarh",
    cities: [
      { slug: "raipur", name: "Raipur", desc: "Premier B2B digital marketing agency in Raipur. n8n CRM pipeline automation, industrial Google Search PPC, and zero-leakage lead management for steel & manufacturing firms." },
      { slug: "bilaspur", name: "Bilaspur", desc: "Leading digital marketing company in Bilaspur. Hyperlocal transactional SEO, Google Ads PPC, and automated customer follow-ups for retail merchants and commercial trade." },
    ],
  },
  {
    state: "Uttar Pradesh",
    cities: [
      { slug: "lucknow", name: "Lucknow", desc: "Best digital marketing agency in Lucknow. Synchronized B2B outbound sequences, high-authority technical SEO, real estate lead funnels, and Google Search Ads." },
      { slug: "kanpur", name: "Kanpur", desc: "Leading advertising agency in Kanpur. Custom WhatsApp wholesale order-taking bots, B2B Google Search Ads, and automated dealer management for textile & leather distributors." },
      { slug: "noida", name: "Noida", desc: "Premier performance marketing agency in Noida NCR. 2-week Next.js web sprints, programmatic SEO frameworks, and full-funnel SaaS user acquisition ads." },
    ],
  },
  {
    state: "Bihar",
    cities: [
      { slug: "patna", name: "Patna", desc: "Top digital marketing company in Patna. OTP-verified lead qualification funnels, high-volume consumer Meta/Google Ads, and local search dominance across Bihar." },
    ],
  },
  {
    state: "Jammu & Kashmir",
    cities: [
      { slug: "srinagar", name: "Srinagar", desc: "Premier advertising agency in Srinagar. Seasonally aligned Kashmir tourism Google Ads, luxury artisanal handicraft e-commerce funnels, and metro buyer targeting." },
      { slug: "jammu", name: "Jammu", desc: "Top digital marketing agency in Jammu. Sub-2-second mobile-first 4G web builds, hyperlocal Google Business Profile SEO, and click-to-call search ads." },
    ],
  },
  {
    state: "Northeast India",
    cities: [
      { slug: "guwahati", name: "Guwahati", desc: "Top digital marketing company in Guwahati. Pan-Northeast multi-state geo-targeting across 7 states, B2B logistics Google Ads, and automated CRM pipelines." },
      { slug: "shillong", name: "Shillong", desc: "Leading advertising agency in Shillong. Niche long-tail SEO for eco-tourism resorts and schools, direct booking WhatsApp engines, and high-converting Meta Ads." },
      { slug: "gangtok", name: "Gangtok", desc: "Top digital marketing agency in Gangtok. Nationwide buyer SEO for Sikkim organic D2C brands, luxury heritage hotel ads, and high-AOV cart bundling funnels." },
      { slug: "agartala", name: "Agartala", desc: "Leading digital marketing company in Agartala. Fast-ranking low-competition local SEO, Google Ads, and walk-in footfall funnels for Tripura healthcare and retail." },
      { slug: "aizawl", name: "Aizawl", desc: "Premier digital marketing agency in Aizawl. Nationwide Next.js e-commerce storefronts, courier API sync, and high-ROAS social ads for Mizo fashion & handlooms." },
      { slug: "dimapur", name: "Dimapur", desc: "Top advertising & automation agency in Dimapur. WhatsApp wholesale order bots, n8n inventory CRM sync, and B2B Google Search Ads for Nagaland traders." },
      { slug: "kohima", name: "Kohima", desc: "Leading digital marketing company in Kohima. Hornbill Festival & seasonal tourism campaign scheduling, heritage homestay SEO, and cultural D2C brand ads." },
      { slug: "imphal", name: "Imphal", desc: "Top digital marketing agency in Imphal. Local SEO foundation audits, lightning-fast mobile web builds, and Google Local Service Ads for Manipur SMBs." },
    ],
  },
];

const stateHeaderMap: Record<string, string> = {
  "Madhya Pradesh": "Digital Marketing Agency in Madhya Pradesh",
  "Rajasthan": "SEO & Performance Ads Agency in Rajasthan",
  "Chhattisgarh": "Digital Marketing Services in Chhattisgarh",
  "Uttar Pradesh": "AI Automation & SEO Agency in Uttar Pradesh",
  "Bihar": "Performance Marketing Agency in Bihar",
  "Jammu & Kashmir": "Digital Marketing Agency in Jammu & Kashmir",
  "Northeast India": "Digital Marketing & WhatsApp Automation — Northeast India",
};

const allCitiesList = locationsGrouped.flatMap(group => group.cities);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Cities Served by AdsVerse Digital Marketing Agency",
  "description": "AdsVerse provides AI-first digital marketing, SEO, and WhatsApp automation across 24 Indian cities in its core service regions.",
  "url": "https://adsverse.in/locations",
  "numberOfItems": allCitiesList.length + 1,
  "itemListElement": [
    ...allCitiesList.map((city, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://adsverse.in/locations/${city.slug}`,
      "name": `Digital Marketing Agency in ${city.name}`
    })),
    {
      "@type": "ListItem",
      "position": allCitiesList.length + 1,
      "url": "https://adsverse.in/locations/pan-india-remote",
      "name": "Remote Digital Marketing Services — Pan India"
    }
  ]
};



export default function LocationsIndexPage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4 max-w-5xl">
      <div className="text-center mb-16 space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline text-slate-950 dark:text-white">
          Digital Marketing &amp; AI Automation — <span className="text-brand-orange">Locations We Serve</span>
        </h1>
        <p className="text-xl text-slate-800 dark:text-slate-300 max-w-2xl mx-auto">
          AdsVerse brings results-driven SEO, High-Performance Ads, and Custom AI/WhatsApp Automation to India's fastest-growing business hubs.
        </p>
        <p className="text-slate-700 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
          AdsVerse is an AI-first digital marketing agency headquartered in Vijay Nagar, Indore,
          serving 113+ brands across Madhya Pradesh, Rajasthan, Chhattisgarh, Uttar Pradesh, Bihar,
          Jammu &amp; Kashmir, and Northeast India. From local SEO and Google Ads to WhatsApp AI bots
          and n8n CRM automation &mdash; we deliver Tier-1 results in Tier-2 markets. Select your city
          below to learn how we work in your market.
        </p>
      </div>

      <div className="space-y-16">
        {locationsGrouped.map((group) => (
          <div key={group.state} className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary">
                {stateHeaderMap[group.state] || group.state}
              </h2>
              <div className="h-[2px] w-full bg-gradient-to-r from-orange-500/60 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.cities.map((city) => (
                <Card 
                  key={city.slug} 
                  className={cn(
                    "bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-500 flex flex-col justify-between group",
                    "hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_12px_24px_rgba(249,115,22,0.12)]",
                    stateBorderMap[group.state] || "border-l-4 border-l-primary"
                  )}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-headline flex items-center gap-2 group-hover:text-orange-500 transition-colors">
                      <TablerMapPin className="w-4 h-4 text-orange-500 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      {city.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 flex-grow">
                    <p className="text-slate-800 dark:text-muted-foreground text-sm leading-relaxed">{city.desc}</p>
                  </CardContent>
                  <div className="p-6 pt-4 border-t border-border/10">
                    <Button 
                      asChild 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold uppercase tracking-wider text-xs h-10 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-300"
                    >
                      <Link href={`/locations/${city.slug}`} className="flex items-center justify-center gap-1.5">
                        Explore services <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pan-India Remote Link */}
      <div className="mt-16 border border-border/30 bg-card/25 backdrop-blur-sm rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold font-headline">Outside Our Core Regions?</h2>
        <p className="text-slate-700 dark:text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
          AdsVerse works with clients from across India remotely &mdash; everything via video calls, WhatsApp, and shared dashboards.
          No local office required.
        </p>
        <Button
          asChild
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold uppercase tracking-wider text-xs h-10 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-300"
        >
          <Link href="/locations/pan-india-remote" className="flex items-center justify-center gap-1.5">
            Remote Services &mdash; How It Works <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>
    </div>
    </>
  );
}

