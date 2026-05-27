import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations We Serve | AdsVerse Digital Marketing & AI Agency",
  description: "Find AdsVerse services in your city. Offering premium SEO, Performance Google/Meta Ads, and WhatsApp AI Automation across India's growing hubs.",
  alternates: {
    canonical: "https://adsverse.in/locations",
  },
};

const locationsGrouped = [
  {
    state: "Madhya Pradesh",
    cities: [
      { slug: "indore", name: "Indore", desc: "Our primary agency headquarters in Vijay Nagar, driving local SEO & high-yield ads." },
      { slug: "bhopal", name: "Bhopal", desc: "Premium digital marketing, AI automation & web development for Bhopal companies." },
      { slug: "jabalpur", name: "Jabalpur", desc: "Scale your business with tailored local search ranking and custom automation bots." },
      { slug: "gwalior", name: "Gwalior", desc: "Vibrant performance marketing & conversion-driven website development in Gwalior." },
      { slug: "ujjain", name: "Ujjain", desc: "Connecting local retail, tourism, and services with premium localized search campaigns." },
    ],
  },
  {
    state: "Rajasthan",
    cities: [
      { slug: "jaipur", name: "Jaipur", desc: "Accelerate your D2C, retail, or service business with high-ROAS Meta & Google ads." },
      { slug: "jodhpur", name: "Jodhpur", desc: "Top-tier custom website development and organic search marketing strategies." },
      { slug: "udaipur", name: "Udaipur", desc: "Drive tourist footfalls and service bookings with specialized geographic campaigns." },
      { slug: "kota", name: "Kota", desc: "WhatsApp bots and n8n workflows specifically designed for educational academies." },
    ],
  },
  {
    state: "Chhattisgarh",
    cities: [
      { slug: "raipur", name: "Raipur", desc: "Scale industrial, retail, and B2B services with expert CRM & lead systems." },
      { slug: "bilaspur", name: "Bilaspur", desc: "Automate repetitive data work and rank for transactional keywords in Bilaspur." },
    ],
  },
  {
    state: "Uttar Pradesh",
    cities: [
      { slug: "lucknow", name: "Lucknow", desc: "Maximize conversion funnels and B2B outreach with premium digital strategy." },
      { slug: "kanpur", name: "Kanpur", desc: "Bridging traditional distribution with custom smart ERP & WhatsApp automation." },
      { slug: "noida", name: "Noida", desc: "AI-native content systems and technical Next.js development for tech startups." },
    ],
  },
  {
    state: "Bihar",
    cities: [
      { slug: "patna", name: "Patna", desc: "High-volume consumer lead generation campaigns and structured search layouts." },
    ],
  },
  {
    state: "Jammu & Kashmir",
    cities: [
      { slug: "srinagar", name: "Srinagar", desc: "Boost local hospitality, crafts, and retail presence with high-impact digital ads." },
      { slug: "jammu", name: "Jammu", desc: "Targeted localized search campaigns and responsive web design implementations." },
    ],
  },
  {
    state: "Northeast India",
    cities: [
      { slug: "guwahati", name: "Guwahati", desc: "Guwahati's top choice for performance marketing, WhatsApp automation, and custom sites." },
    ],
  },
];

const allCitiesList = locationsGrouped.flatMap(group => group.cities);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "AdsVerse Locations Directory",
  "numberOfItems": allCitiesList.length,
  "itemListElement": allCitiesList.map((city, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "url": `https://adsverse.in/locations/${city.slug}`
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
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline">Locations We Serve</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AdsVerse brings results-driven SEO, High-Performance Ads, and Custom AI/WhatsApp Automation to India's fastest-growing business hubs.
        </p>
      </div>

      <div className="space-y-16">
        {locationsGrouped.map((group) => (
          <div key={group.state} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary border-b border-border/40 pb-2">
              {group.state}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.cities.map((city) => (
                <Card key={city.slug} className="bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-headline flex items-center gap-2 group-hover:text-primary transition-colors">
                      <MapPin className="w-5 h-5 text-accent shrink-0" />
                      {city.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 flex-grow">
                    <p className="text-muted-foreground text-sm leading-relaxed">{city.desc}</p>
                  </CardContent>
                  <div className="p-6 pt-0 border-t border-border/10">
                    <Button asChild variant="link" className="p-0 text-accent group-hover:gap-2 transition-all">
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
