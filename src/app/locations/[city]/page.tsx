import React from "react";
import { notFound } from "next/navigation";
import { cleanTitle, validateMeta } from "@/lib/seo-guard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  TrendingUp,
  Megaphone,
  Code,
  Bot,
  FileText,
  Users,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Map,
  ShieldAlert,
  Award,
  Calendar,
  Sparkles,
  Target,
  Search,
  BookOpen,
  Check,
} from "lucide-react";
import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AISearchInsights } from "@/components/seo/AISearchInsights";

import {
  cityImages,
  cityRegionLabel,
  citiesDb,
  cityMeta,
  cityIntro,
  cityProofPoint,
  cityServiceSubtitle,
  cityCoordinates,
  cityWikiLinks,
  cityLandmarks,
  cityCaseStudies,
  cityArticles,
  cityAISummaries,
  getCityFAQs,
} from "./data";

type Props = {
  params: { city: string };
};

export async function generateStaticParams() {
  return Object.keys(citiesDb).map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityKey = params.city.toLowerCase();
  const meta = cityMeta[cityKey];

  if (!meta) {
    notFound();
  }

  const cleanT = cleanTitle(meta.title);

  try {
    validateMeta(meta.canonical, cleanT, meta.description);
  } catch (e) {
    console.warn(e);
  }

  return {
    title: cleanT,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      siteName: "AdsVerse",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: "@Adsverse1",
    },
  };
}

export default function LocationPage({ params }: Props) {
  const cityKey = params.city.toLowerCase();
  const cityData = citiesDb[cityKey];
  const introData = cityIntro[cityKey];
  const regionLabel = cityRegionLabel[cityKey] || "Central India";
  const proofPoint = cityProofPoint[cityKey];
  const serviceSubtitle = cityServiceSubtitle[cityKey] || "Tailored digital marketing for your local business needs.";

  if (!cityData) {
    notFound();
  }

  const { name, state } = cityData;
  const imagePath = cityImages[cityKey] || "/images/locations/indore.webp";
  const faqs = getCityFAQs(name, state, cityKey);
  const coords = cityCoordinates[cityKey];
  const wikiLink = cityWikiLinks[cityKey];
  const landmarks = cityLandmarks[cityKey] || [];
  const caseStudy = cityCaseStudies[cityKey];
  const article = cityArticles[cityKey];
  const aiSummary = cityAISummaries[cityKey];

  // Schema mappings for AEO / GEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `AdsVerse - Digital Marketing Agency in ${name}`,
    "image": `https://adsverse.in${imagePath}`,
    "url": `https://adsverse.in/locations/${cityKey}`,
    "telephone": "+919685123339",
    "priceRange": "$$",
    "serviceType": [
      "Digital Marketing",
      "Google Ads Management",
      "Meta Ads Management",
      "Local SEO Optimization",
      "WhatsApp AI Automation",
      "Next.js Web Development",
      "PPC Advertising"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": name,
      "addressRegion": state,
      "addressCountry": "IN",
    },
    ...(coords
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: coords.lat,
            longitude: coords.lng,
          },
        }
      : {}),
    ...(wikiLink ? { sameAs: [wikiLink] } : {}),
    areaServed: {
      "@type": "AdministrativeArea",
      name: name,
      ...(wikiLink ? { sameAs: wikiLink } : {}),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://adsverse.in",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://adsverse.in/locations",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Digital Marketing Agency in ${name}`,
        "item": `https://adsverse.in/locations/${cityKey}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  // Determine regional channel recommendation
  const getChannelRecommendation = () => {
    const isTourism = ["udaipur", "jodhpur", "ujjain", "srinagar", "kohima", "gwalior"].includes(cityKey);
    const isTechHub = ["noida", "jaipur", "indore"].includes(cityKey);
    const isHighVolume = ["bhopal", "kota", "patna"].includes(cityKey);

    if (isHighVolume) {
      return {
        primary: "WhatsApp Qualification Bots + Meta & Google Lead Ads",
        duration: "5-7 Days Setup",
        kpi: "Lead-to-Enrollment Conversion Rate & 30-Sec Response Time",
      };
    } else if (isTechHub) {
      return {
        primary: "Next.js Custom Development + High-Intent Search PPC & Programmatic SEO",
        duration: "10-14 Days Sprint",
        kpi: "Page Load Speed (<1.5s) & High-Intent Conversion Rate",
      };
    } else if (isTourism) {
      return {
        primary: "Direct Booking Search Ads + WhatsApp Concierge (0% OTA Cut)",
        duration: "7-10 Days Setup",
        kpi: "Direct Booking Volume & Commission Cost Reduction",
      };
    } else {
      return {
        primary: "Hyperlocal 3-Pack SEO & Targeted Google Search Ads",
        duration: "30-45 Days Compound",
        kpi: "Local Search Pack Dominance & Direct Phone Call Inquiries",
      };
    }
  };

  const recommendation = getChannelRecommendation();

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="w-full bg-slate-50 dark:bg-slate-900 overflow-hidden">
        {/* HERO SECTION */}
        <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[size:32px_32px]" />
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-500/20 opacity-20 blur-[100px]" />

          <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
            <Link
              href="/locations"
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Locations
            </Link>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-600 dark:text-orange-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {name}, {state}
                  </div>
                  <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5 text-orange-500" />
                    Verified for 2026
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  Best Digital Marketing Agency in <span className="text-orange-600 dark:text-orange-500">{name}</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
                  {introData?.headline || `AI-first digital marketing agency and top advertising company helping ${name} businesses scale.`}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="inline-flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700/60">
                    🎯 Google Ads Agency
                  </span>
                  <span className="inline-flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700/60">
                    🚀 Top Digital Marketing Company
                  </span>
                  <span className="inline-flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700/60">
                    🤖 WhatsApp AI Lead Bots
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-14 px-8 text-base font-bold shadow-lg shadow-orange-500/20 transition-all duration-300">
                    <Link href="/contact">Book a Free Strategy Consultation</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl h-14 px-8 text-base border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Link href="#services">Explore Services</Link>
                  </Button>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent z-10" />
                <Image
                  src={imagePath}
                  alt={`Digital Marketing and Advertising Agency in ${name}, ${state}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-orange-500 text-white hover:bg-orange-600 text-xs">Primary Hub</Badge>
                    <span className="text-xs text-white/80">Active Campaigns</span>
                  </div>
                  <p className="font-semibold text-lg drop-shadow-md">Serving {name}</p>
                  <p className="text-white/80 text-sm">{state}, India · Central Operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI SEARCH & KNOWLEDGE SUMMARY BOX (AEO & GEO VERIFIED) */}
        {aiSummary && (
          <div className="py-12 bg-white dark:bg-slate-950 border-b border-border/40">
            <div className="container px-4 max-w-6xl mx-auto">
              <Card className="border-orange-500/30 bg-gradient-to-br from-orange-50/40 via-white to-slate-50 dark:from-orange-950/10 dark:via-slate-950 dark:to-slate-900 shadow-md">
                <CardHeader className="pb-3 border-b border-border/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">AI Search Engine & Entity Summary</span>
                        <CardTitle className="text-xl md:text-2xl font-headline text-slate-900 dark:text-white">
                          {aiSummary.entityName}
                        </CardTitle>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-border/50 text-slate-700 dark:text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      <span>Last Verified: {aiSummary.verifiedDate || "August 2026"}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                    {aiSummary.summary}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3 bg-white/70 dark:bg-slate-900/60 p-5 rounded-xl border border-border/40">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        Core Performance Capabilities in {name}:
                      </h4>
                      <ul className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                        {aiSummary.keyStrengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 bg-white/70 dark:bg-slate-900/60 p-5 rounded-xl border border-border/40 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-orange-500" />
                          Target Market Fit in {name}:
                        </h4>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {aiSummary.marketSuitability}
                        </p>
                      </div>

                      <div className="border-t border-border/40 pt-3">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                          High-Intent Search Queries Served:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {aiSummary.targetKeywords.map((kw, idx) => (
                            <span key={idx} className="text-[11px] font-mono bg-orange-500/10 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded border border-orange-500/20">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* WHY CHOOSE ADSVERSE IN CITY: 4 VALUE PILLARS */}
        <div className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-border/40">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Why {name} Businesses Choose AdsVerse as Their <span className="text-orange-600">Digital Marketing & Advertising Agency</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                We bridge the gap between traditional advertising and cutting-edge AI execution — delivering higher ROAS, faster lead response times, and lower customer acquisition costs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <Card className="border-border/50 bg-white dark:bg-slate-950 hover:border-orange-500/40 transition-all shadow-sm">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center border border-orange-100 dark:border-orange-900/50 mb-3">
                    <Target className="w-6 h-6 text-orange-500" />
                  </div>
                  <CardTitle className="text-lg font-headline">Google Ads Agency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    High-intent Google Search PPC, Performance Max, and Display campaigns engineered with strict negative keyword filtering and 4.8x average ROAS.
                  </p>
                  <span className="inline-block text-xs font-semibold text-orange-600 dark:text-orange-400 pt-1">
                    google ads agency in {name.toLowerCase()}
                  </span>
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card className="border-border/50 bg-white dark:bg-slate-950 hover:border-orange-500/40 transition-all shadow-sm">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center border border-blue-100 dark:border-blue-900/50 mb-3">
                    <Search className="w-6 h-6 text-blue-500" />
                  </div>
                  <CardTitle className="text-lg font-headline">Top Digital Marketing Company</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Hyperlocal 3-pack Google Maps SEO, entity schema optimization, and organic content strategies that rank your business #1 for service queries in {name}.
                  </p>
                  <span className="inline-block text-xs font-semibold text-blue-600 dark:text-blue-400 pt-1">
                    best digital marketing company in {name.toLowerCase()}
                  </span>
                </CardContent>
              </Card>

              {/* Card 3 */}
              <Card className="border-border/50 bg-white dark:bg-slate-950 hover:border-orange-500/40 transition-all shadow-sm">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center border border-purple-100 dark:border-purple-900/50 mb-3">
                    <Megaphone className="w-6 h-6 text-purple-500" />
                  </div>
                  <CardTitle className="text-lg font-headline">Creative Advertising Agency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    High-converting Meta Ads (Instagram & Facebook), video storytelling, and LinkedIn B2B funnels with continuous weekly creative iteration.
                  </p>
                  <span className="inline-block text-xs font-semibold text-purple-600 dark:text-purple-400 pt-1">
                    advertising agency in {name.toLowerCase()}
                  </span>
                </CardContent>
              </Card>

              {/* Card 4 */}
              <Card className="border-border/50 bg-white dark:bg-slate-950 hover:border-orange-500/40 transition-all shadow-sm">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50 mb-3">
                    <Bot className="w-6 h-6 text-emerald-500" />
                  </div>
                  <CardTitle className="text-lg font-headline">WhatsApp AI & CRM Automation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Automated WhatsApp chatbots that qualify leads in Hinglish, answer inquiries 24/7, and sync data directly to your sales team CRM in under 30 seconds.
                  </p>
                  <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                    instant lead qualification & 0% leakage
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* APPROACH SECTION WITH DISCLAIMER */}
        <div className="py-16 md:py-24 bg-white dark:bg-slate-950 border-b border-border/40">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">
                  Our Approach to <span className="text-orange-600">{name}</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {introData?.body || `We bring Tier-1 agency execution to ${name}. From fast-loading websites to automated lead systems and high-ROI ad campaigns, we build digital infrastructure that actually generates revenue.`}
                </p>
                {proofPoint && (
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 dark:bg-orange-900/50 p-2 rounded-lg shrink-0">
                        <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                        {proofPoint}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="border-border/50 bg-slate-50 dark:bg-slate-900/50 shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
                    <TrendingUp className="w-8 h-8 text-orange-500 mb-4" />
                    <h3 className="text-3xl font-bold font-headline mb-2">113+ Brands</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Scaled Across India · 4.8x Average ROAS</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-slate-50 dark:bg-slate-900/50 shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
                    <Bot className="w-8 h-8 text-orange-500 mb-4" />
                    <h3 className="text-3xl font-bold font-headline mb-2">&lt;30 Sec</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Automated Lead Response Time</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* REGIONAL BLUEPRINT & LANDMARKS (GEO / AEO) */}
        <div className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-border/40">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-stretch">
              {/* Landmark Targeting List */}
              <Card className="border-border/50 bg-white dark:bg-slate-950 flex flex-col justify-between shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Map className="w-6 h-6 text-orange-500" />
                    <CardTitle className="text-2xl font-headline">Hyperlocal Context & Coverage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We deploy geo-targeted marketing setups optimized for {name}&apos;s core business districts, industrial corridors, and commercial hubs.
                  </p>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Key Targeting Zones in {name}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {landmarks.map((landmark, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800"
                        >
                          {landmark}
                        </span>
                      ))}
                    </div>
                  </div>
                  {coords && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 border-t border-border/40 pt-4 flex justify-between">
                      <span><strong>Coordinates:</strong> {coords.lat}° N, {coords.lng}° E</span>
                      {wikiLink && (
                        <a href={wikiLink} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                          View Entity Registry
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recommended Channel Table */}
              <Card className="border-border/50 bg-white dark:bg-slate-950 flex flex-col justify-between shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-orange-500" />
                    <CardTitle className="text-2xl font-headline">Local Channel Recommendations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Strategic channel allocation blueprint engineered for the competition dynamics in {name}.
                  </p>

                  <div className="border border-border/50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-border/50 text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Parameter</th>
                          <th className="px-4 py-3 font-semibold">Recommendation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
                        <tr>
                          <td className="px-4 py-3 font-semibold bg-slate-50/30 dark:bg-slate-900/10">Recommended Engine</td>
                          <td className="px-4 py-3 text-orange-600 dark:text-orange-400 font-medium">{recommendation.primary}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-semibold bg-slate-50/30 dark:bg-slate-900/10">Setup Window</td>
                          <td className="px-4 py-3">{recommendation.duration}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-semibold bg-slate-50/30 dark:bg-slate-900/10">Primary Objective</td>
                          <td className="px-4 py-3">{recommendation.kpi}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CASE STUDY SECTION (AEO/GEO) */}
        {caseStudy && (
          <div className="py-20 bg-white dark:bg-slate-950 border-b border-border/40">
            <div className="container px-4 max-w-6xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">
                  Recent Success Story in <span className="text-orange-600">{name}</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  See how we implemented our performance marketing and automation blueprints for local businesses.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <Card className="lg:col-span-1 border-border/50 bg-slate-50/50 dark:bg-slate-900/20 p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <Award className="w-4 h-4 text-orange-500" />
                      <span>{caseStudy.industry} Case Study</span>
                    </div>
                    <h3 className="text-xl font-bold font-headline mb-4 text-slate-900 dark:text-white">
                      Partner: {caseStudy.client}
                    </h3>
                  </div>
                  <div className="mt-6 border-t border-border/40 pt-4 text-xs text-slate-500 dark:text-slate-400">
                    Verified AdsVerse Client — {name} Region
                  </div>
                </Card>

                <div className="lg:col-span-2 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-border/50 bg-white dark:bg-slate-950 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-red-500 font-semibold text-sm">
                          <ShieldAlert className="w-4 h-4" />
                          <span>The Challenge</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {caseStudy.challenge}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-white dark:bg-slate-950 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                          <Bot className="w-4 h-4" />
                          <span>Our Strategy</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {caseStudy.strategy}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-orange-500/20 bg-orange-500/[0.02] dark:bg-orange-950/[0.05] shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>Campaign Outcomes</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        {caseStudy.results}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DEDICATED CITY STRATEGY ARTICLE / BLOG (THICK CONTENT SYSTEM) */}
        {article && (
          <div className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-border/40">
            <div className="container px-4 max-w-5xl mx-auto">
              <Card className="border-border/60 bg-white dark:bg-slate-950 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-100/50 dark:bg-slate-900/50 pb-6 border-b border-border/40">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                      <BookOpen className="w-4 h-4" />
                      <span>{name} Strategy Guide &amp; Market Insights</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-headline text-slate-900 dark:text-white leading-snug">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                    {article.strategySummary}
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-border/40 space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Actionable Recommendations for {name} Businesses in 2026:
                    </h4>
                    <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                      {article.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border/40">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Want to dive deeper into performance marketing and SEO frameworks?
                    </span>
                    <Link
                      href={`/blog/${article.relatedBlogSlug}`}
                      className="inline-flex items-center text-sm font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
                    >
                      Read Related Guide: {article.relatedBlogTitle}
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* SERVICES SECTION — All 3 Pillars */}
        <div id="services" className="py-24 bg-white dark:bg-slate-950 border-b border-border/40">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Services We Deliver in <span className="text-orange-600">{name}</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                {serviceSubtitle}
              </p>
            </div>

            {/* Pillar 1: Digital Marketing */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center border border-orange-100 dark:border-orange-900/50">
                  <Megaphone className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-white">
                    Digital Marketing &amp; Advertising Services in {name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    digital marketing agency in {name.toLowerCase()} · google ads agency · advertising company
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    title: `SEO & Local Search in ${name}`,
                    desc: `Rank #1 on Google Maps and organic search for high-intent local keywords in ${name}. On-page, technical, and local schema optimized for your exact geography.`,
                    href: "/services/seo-optimization",
                    badge: `seo in ${name.toLowerCase()}`,
                  },
                  {
                    title: `Google Ads & PPC Management — ${name}`,
                    desc: `Performance-driven Google Search, Display, and Performance Max campaigns with strict negative keyword pruning and 4.8x average ROAS.`,
                    href: "/services/paid-ads",
                    badge: `google ads agency in ${name.toLowerCase()}`,
                  },
                  {
                    title: `Meta & Social Media Marketing — ${name}`,
                    desc: `Instagram, Facebook, and LinkedIn ad funnels with weekly creative iteration, dynamic product catalog ads, and targeted audience retargeting.`,
                    href: "/services/social-media-management",
                    badge: `ad agency in ${name.toLowerCase()}`,
                  },
                ].map((item, idx) => (
                  <Card key={idx} className="border-border/50 hover:border-orange-500/50 transition-colors bg-slate-50 dark:bg-slate-900">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      {item.badge && (
                        <span className="text-xs text-slate-400 font-mono">{item.badge}</span>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      <Link href={item.href} className="text-orange-500 hover:text-orange-600 text-xs font-semibold">
                        View service →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link href="/services/digital-marketing" className="text-orange-500 hover:text-orange-600 text-sm font-bold">
                  All Digital Marketing Services →
                </Link>
              </div>
            </div>

            {/* Pillar 2: AI Automation */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center border border-purple-100 dark:border-purple-900/50">
                  <Bot className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-white">
                    AI Lead Automation &amp; CRM Systems
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    WhatsApp AI Chatbots · n8n workflow pipelines · CRM lead synchronization
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    title: `WhatsApp AI Bot for ${name}`,
                    desc: `Persona-based AI on WhatsApp that qualifies leads in Hinglish, answers questions 24/7, and syncs inquiries directly to your team within 30 seconds.`,
                    href: "/services/whatsapp-bot",
                  },
                  {
                    title: "n8n Workflow Automation",
                    desc: `Connect your Google Ads, Meta forms, website inquiries, and CRM into one automated pipeline with zero lead leakage.`,
                    href: "/services/automation-tools",
                  },
                  {
                    title: "CRM & Sales Pipeline Sync",
                    desc: `Automatic lead capture, pipeline stage updates, and automated follow-up sequences via WhatsApp and email — set once, runs forever.`,
                    href: "/services/ai-automation",
                  },
                ].map((item, idx) => (
                  <Card key={idx} className="border-border/50 hover:border-purple-500/50 transition-colors bg-slate-50 dark:bg-slate-900">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      <Link href={item.href} className="text-purple-500 hover:text-purple-600 text-xs font-semibold">
                        View service →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link href="/services/ai-automation" className="text-purple-500 hover:text-purple-600 text-sm font-bold">
                  All AI Automation Services →
                </Link>
              </div>
            </div>

            {/* Pillar 3: Web Design */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center border border-blue-100 dark:border-blue-900/50">
                  <Code className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-white">
                    Website Design &amp; Development in {name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Custom Next.js websites · High-converting funnels · E-commerce storefronts
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    title: `Business Website Design — ${name}`,
                    desc: `Custom business websites engineered in Next.js. Sub-second load times, mobile-first responsive layouts, and SEO-ready architecture.`,
                    badge: `website developer in ${name.toLowerCase()}`,
                  },
                  {
                    title: "E-Commerce Storefronts",
                    desc: `High-performance Next.js or Shopify stores with seamless payment gateway and automated courier shipping API integrations.`,
                    badge: null,
                  },
                  {
                    title: "High-Converting Landing Pages",
                    desc: `Single-page conversion funnels built specifically for Google Ads and Meta campaigns. Tracked, optimized, and built to convert.`,
                    badge: null,
                  },
                ].map((item, idx) => (
                  <Card key={idx} className="border-border/50 hover:border-blue-500/50 transition-colors bg-slate-50 dark:bg-slate-900">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      {item.badge && (
                        <span className="text-xs text-slate-400 font-mono">{item.badge}</span>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      <Link href="/services/web-design-development" className="text-blue-500 hover:text-blue-600 text-xs font-semibold">
                        View service →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link href="/services/web-design-development" className="text-blue-500 hover:text-blue-600 text-sm font-bold">
                  All Web Design Services →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CAMPAIGN BLUEPRINT PROCESS TIMELINE (AEO) */}
        <div className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-border/40">
          <div className="container px-4 max-w-4xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                How We Launch Campaigns in <span className="text-orange-600">{name}</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Our structured 4-step onboarding blueprint designed to scale {name} client accounts efficiently.
              </p>
            </div>

            <div className="relative border-l border-orange-500/30 ml-4 md:ml-6 space-y-12">
              {[
                {
                  step: "01",
                  title: "Local Competitor & Search Keyword Audit",
                  desc: `We analyze local competitors in ${name}, evaluate search volume for high-intent queries, and identify low-hanging transactional keywords.`,
                },
                {
                  step: "02",
                  title: "Conversion Tracking & WhatsApp Bot Setup",
                  desc: "We configure n8n pipelines, connect landing page lead catchers, and build WhatsApp bots. No ad spend happens until lead capture is stress-tested.",
                },
                {
                  step: "03",
                  title: "Targeted Google & Meta Ad Deployment",
                  desc: `We launch ad sets targeting ${name}'s designated geographic zones and business districts. Creatives are tested weekly, prioritizing mobile-friendly conversions.`,
                },
                {
                  step: "04",
                  title: "Continuous Scaling & CRM Sync",
                  desc: "We monitor performance, optimize bidding models, and verify offline conversion uploads back into Google and Meta to scale your highest-value channels.",
                },
              ].map((item, idx) => (
                <div key={idx} className="relative pl-8 md:pl-10">
                  <div className="absolute -left-3 top-0 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-4 border-white dark:border-slate-950">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold font-headline text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="text-xs text-orange-500 font-mono">STEP {item.step}</span>
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs WITH DATE STAMP */}
        <div className="py-24 bg-white dark:bg-slate-950">
          <div className="container px-4 max-w-3xl mx-auto">
            <div className="text-center mb-12 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                <Calendar className="w-3.5 h-3.5" />
                <span>Verified FAQs — Updated August 2026</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Frequently Asked Questions for {name}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Common questions about working with AdsVerse in {name}.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-border/50">
                  <AccordionTrigger className="text-left font-semibold text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* SEO Data Component */}
        <AISearchInsights
          title={`Market Dynamics & Entity Footprint in ${name}, ${state}`}
          insights={[
            { title: "📍 Region Served", description: regionLabel },
            {
              title: "🎯 Target Audience",
              description: `B2B enterprises, retail showrooms, coaching institutes, real estate developers, healthcare providers, and D2C brands located in or targeting ${name}.`,
            },
            {
              title: "⚡ Core Advantage",
              description: "AI-first execution capabilities (Next.js web builds, n8n CRM pipelines, WhatsApp AI bots, Google Ads PPC) optimized for regional market dynamics.",
            },
          ]}
          takeaways={[
            "Google Ads & Meta Performance PPC",
            "Hyperlocal 3-Pack SEO",
            "WhatsApp Instant Lead Qualification",
            "Next.js Web Development",
            "n8n CRM Integration",
          ]}
        />
      </div>
    </>
  );
}
