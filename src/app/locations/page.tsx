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
  title: "Locations We Serve | Digital Marketing & AI Agency Across India | AdsVerse",
  description: "AdsVerse delivers AI-first SEO, WhatsApp automation, and performance ads in Indore, Bhopal, Jaipur, Lucknow, Raipur, Guwahati & 18+ Indian cities. Tier-2 focused, Tier-1 results.",
  alternates: {
    canonical: "https://adsverse.in/locations",
  },
  openGraph: {
    title: "Locations We Serve | AdsVerse Digital Marketing Agency",
    description: "AI-first digital marketing across Madhya Pradesh, Rajasthan, UP, Chhattisgarh & Northeast India. SEO, WhatsApp bots, Google/Meta Ads.",
    url: "https://adsverse.in/locations",
    siteName: "AdsVerse",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locations We Serve | AdsVerse",
    description: "AI-first digital marketing across 24 Indian cities in our core markets. SEO, WhatsApp bots, Google/Meta Ads.",
    creator: "@Adsverse1",
  },
};

const locationsGrouped = [
  {
    state: "Madhya Pradesh",
    cities: [
      { slug: "indore", name: "Indore", desc: "Best digital marketing agency in Indore. AI-first SEO, WhatsApp bots & Google Ads — headquartered in Vijay Nagar. Our home base and most tested execution environment." },
      { slug: "bhopal", name: "Bhopal", desc: "Coaching institutes and education businesses are our primary Bhopal segment. Local SEO, Meta Ads & WhatsApp AI automation built around admission-cycle lead volumes." },
      { slug: "jabalpur", name: "Jabalpur", desc: "Local search ranking is the primary offer for Jabalpur — not broad brand campaigns. Low competition means faster wins for early movers." },
      { slug: "gwalior", name: "Gwalior", desc: "Performance marketing structured separately for Gwalior heritage tourism versus local retail and services — two different audiences, two different campaign setups." },
      { slug: "ujjain", name: "Ujjain", desc: "Seasonal campaign scheduling built around Ujjain's pilgrimage and religious tourism calendar. Temple economy footfall captured digitally." },
    ],
  },
  {
    state: "Rajasthan",
    cities: [
      { slug: "jaipur", name: "Jaipur", desc: "Fast creative testing and tight ROAS targets for Jaipur D2C, retail & service brands. Jaipur's ad-literate market demands iteration, not set-and-forget campaigns." },
      { slug: "jodhpur", name: "Jodhpur", desc: "Web design & SEO foundation first, then paid ads — the right order for Jodhpur handicraft and export-facing businesses." },
      { slug: "udaipur", name: "Udaipur", desc: "Booking-funnel-first campaign structure for Udaipur hotels, resorts & wedding venues. Direct reservations, not just traffic." },
      { slug: "kota", name: "Kota", desc: "WhatsApp bots & n8n automation designed around Kota's admission-cycle timing. Lead gen, batch notifications & enrollment funnels for coaching institutes." },
    ],
  },
  {
    state: "Chhattisgarh",
    cities: [
      { slug: "raipur", name: "Raipur", desc: "CRM automation leads every Raipur engagement. n8n + CRM sync, B2B lead generation & SEO for Chhattisgarh's industrial and retail businesses." },
      { slug: "bilaspur", name: "Bilaspur", desc: "Transactional keyword-focused local SEO for Bilaspur. Low competition means faster ranking timelines than bigger cities." },
    ],
  },
  {
    state: "Uttar Pradesh",
    cities: [
      { slug: "lucknow", name: "Lucknow", desc: "Combined B2B outreach + SEO scoping from day one for Lucknow businesses. Both channels working together from the start." },
      { slug: "kanpur", name: "Kanpur", desc: "WhatsApp automation built around Kanpur's existing textile and distribution order workflows — plugging into habits, not replacing them." },
      { slug: "noida", name: "Noida", desc: "Next.js development and performance marketing scoped for startup speed. 2-week sprint cycles for Noida tech startups in NCR." },
    ],
  },
  {
    state: "Bihar",
    cities: [
      { slug: "patna", name: "Patna", desc: "Lead-qualification-first setup for high-volume Patna campaigns. SEO & performance ads for Bihar consumer and service businesses." },
    ],
  },
  {
    state: "Jammu & Kashmir",
    cities: [
      { slug: "srinagar", name: "Srinagar", desc: "Seasonal SEO and ads calendar aligned to Kashmir's tourism cycles. Digital presence built for Srinagar hospitality and handicraft businesses." },
      { slug: "jammu", name: "Jammu", desc: "Mobile-first web builds and local SEO for Jammu retail and services. Most searches here happen on mobile — we build for that." },
    ],
  },
  {
    state: "Northeast India",
    cities: [
      { slug: "guwahati", name: "Guwahati", desc: "Pan-Northeast geo-targeting for Guwahati brands. Performance marketing, WhatsApp automation & SEO reaching all 8 Northeast states." },
      { slug: "shillong", name: "Shillong", desc: "Niche keyword targeting for Shillong's hospitality, eco-tourism resorts, and schools. Broad keywords waste budget here." },
      { slug: "gangtok", name: "Gangtok", desc: "Nationwide-buyer SEO for Sikkim's premium organic brands and heritage hotels. Their customers are in metros, not just Gangtok." },
      { slug: "agartala", name: "Agartala", desc: "Lower-competition local SEO environment in Agartala means faster ranking timelines. Early movers own rankings for years." },
      { slug: "aizawl", name: "Aizawl", desc: "E-commerce builds scoped for nationwide handloom and D2C shipping from Aizawl. Next.js stores reaching buyers across India." },
      { slug: "dimapur", name: "Dimapur", desc: "Wholesale order automation via custom WhatsApp AI bots and n8n CRM sync. The lead service for Dimapur's commercial trading hub." },
      { slug: "kohima", name: "Kohima", desc: "Festival and tourism-calendar-aligned campaign scheduling for Kohima heritage stays and arts businesses." },
      { slug: "imphal", name: "Imphal", desc: "Local SEO fundamentals prioritized before ad spend for Imphal businesses. Clean foundation, then campaigns." },
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

