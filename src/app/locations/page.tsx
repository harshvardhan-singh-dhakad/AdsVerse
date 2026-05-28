import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Metadata } from "next";

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
    description: "AI-first digital marketing across 18+ Indian cities. SEO, WhatsApp bots, Google/Meta Ads.",
    creator: "@Adsverse1",
  },
};

const locationsGrouped = [
  {
    state: "Madhya Pradesh",
    cities: [
      { slug: "indore", name: "Indore", desc: "Best digital marketing agency in Indore. AI-first SEO, WhatsApp bots & Google Ads — headquartered in Vijay Nagar." },
      { slug: "bhopal", name: "Bhopal", desc: "Top digital marketing agency in Bhopal MP. Local SEO, Meta Ads & WhatsApp AI automation for Bhopal businesses." },
      { slug: "jabalpur", name: "Jabalpur", desc: "Grow with SEO, Google Ads & WhatsApp automation in Jabalpur. Local search ranking specialists." },
      { slug: "gwalior", name: "Gwalior", desc: "Performance marketing, web development & CRM automation for Gwalior businesses." },
      { slug: "ujjain", name: "Ujjain", desc: "Local SEO & tourism marketing for Ujjain retail, temple-economy services & hospitality brands." },
    ],
  },
  {
    state: "Rajasthan",
    cities: [
      { slug: "jaipur", name: "Jaipur", desc: "Digital marketing agency in Jaipur — high-ROAS Meta & Google Ads for D2C, retail & service businesses." },
      { slug: "jodhpur", name: "Jodhpur", desc: "SEO & web development agency in Jodhpur. Rank higher, convert better with performance marketing." },
      { slug: "udaipur", name: "Udaipur", desc: "Tourism & hospitality digital marketing in Udaipur. Drive hotel bookings and service enquiries." },
      { slug: "kota", name: "Kota", desc: "WhatsApp bots & n8n automation for Kota coaching institutes. Lead gen, batch notifications & enrollment funnels." },
    ],
  },
  {
    state: "Chhattisgarh",
    cities: [
      { slug: "raipur", name: "Raipur", desc: "B2B digital marketing & CRM automation for industrial, retail & service businesses in Raipur." },
      { slug: "bilaspur", name: "Bilaspur", desc: "Local SEO & automation for Bilaspur businesses. Rank for transactional keywords in Chhattisgarh." },
    ],
  },
  {
    state: "Uttar Pradesh",
    cities: [
      { slug: "lucknow", name: "Lucknow", desc: "Digital marketing agency in Lucknow. B2B outreach, SEO & WhatsApp automation for UP businesses." },
      { slug: "kanpur", name: "Kanpur", desc: "WhatsApp automation & SEO for Kanpur textile, retail & distribution businesses." },
      { slug: "noida", name: "Noida", desc: "AI content systems, Next.js development & performance marketing for Noida tech startups." },
    ],
  },
  {
    state: "Bihar",
    cities: [
      { slug: "patna", name: "Patna", desc: "High-volume lead generation & SEO for Bihar consumer and service businesses in Patna." },
    ],
  },
  {
    state: "Jammu & Kashmir",
    cities: [
      { slug: "srinagar", name: "Srinagar", desc: "Digital marketing for Srinagar hospitality, handicrafts & retail — local ads & SEO." },
      { slug: "jammu", name: "Jammu", desc: "Targeted local SEO & responsive web design for Jammu businesses." },
    ],
  },
  {
    state: "Northeast India",
    cities: [
      { slug: "guwahati", name: "Guwahati", desc: "Performance marketing, WhatsApp automation & SEO for Guwahati and Northeast India brands." },
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
  "description": "AdsVerse provides AI-first digital marketing, SEO, and WhatsApp automation across 18+ Indian cities.",
  "url": "https://adsverse.in/locations",
  "numberOfItems": allCitiesList.length,
  "itemListElement": allCitiesList.map((city, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "url": `https://adsverse.in/locations/${city.slug}`,
    "name": `Digital Marketing Agency in ${city.name}`
  }))
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
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline">
          Digital Marketing & AI Automation — Locations We Serve
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AdsVerse brings results-driven SEO, High-Performance Ads, and Custom AI/WhatsApp Automation to India's fastest-growing business hubs.
        </p>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
          AdsVerse is an AI-first digital marketing agency headquartered in Vijay Nagar, Indore,
          serving 113+ brands across Madhya Pradesh, Rajasthan, Chhattisgarh, Uttar Pradesh, Bihar,
          Jammu & Kashmir, and Northeast India. From local SEO and Google Ads to WhatsApp AI bots
          and n8n CRM automation — we deliver Tier-1 results in Tier-2 markets. Select your city
          below to see services, pricing, and local case studies.
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
                <Card key={city.slug} className="bg-card/50 backdrop-blur-sm border border-border/30 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)] transition-all duration-500 flex flex-col justify-between group">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-headline flex items-center gap-2 group-hover:text-orange-500 transition-colors">
                      <MapPin className="w-5 h-5 text-orange-500 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      {city.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 flex-grow">
                    <p className="text-muted-foreground text-sm leading-relaxed">{city.desc}</p>
                  </CardContent>
                  <div className="p-6 pt-0 border-t border-border/10">
                    <Button asChild variant="link" className="p-0 text-orange-500 group-hover:text-orange-400 group-hover:gap-2 transition-all">
                      <Link href={`/locations/${city.slug}`} className="flex items-center text-xs font-bold uppercase tracking-wider">
                        Explore services <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

