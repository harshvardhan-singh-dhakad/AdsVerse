import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { MapPin, TrendingUp, Megaphone, Code, Bot, FileText, Users, CheckCircle, ArrowLeft, ArrowRight, Lightbulb, Map, ShieldAlert, Award, Calendar } from "lucide-react";
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
  getCityFAQs
} from "./data";

type Props = {
  params: { city: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityKey = params.city.toLowerCase();
  const meta = cityMeta[cityKey];

  if (!meta) {
    return {
      title: "Digital Marketing Agency | AdsVerse",
      description: "AdsVerse offers AI-first SEO, WhatsApp bots, and performance marketing.",
    };
  }

  return {
    title: meta.title,
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
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold font-headline mb-4">Location Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">We couldn't find the page for this location.</p>
        <Button asChild>
          <Link href="/locations">View All Locations</Link>
        </Button>
      </div>
    );
  }

  const { name, state } = cityData;
  const imagePath = cityImages[cityKey] || "/images/locations/indore.webp";
  const faqs = getCityFAQs(name, state, cityKey);
  const coords = cityCoordinates[cityKey];
  const wikiLink = cityWikiLinks[cityKey];
  const landmarks = cityLandmarks[cityKey] || [];
  const caseStudy = cityCaseStudies[cityKey];

  // Schema mappings for AEO / GEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `AdsVerse - Digital Marketing Agency in ${name}`,
    "image": `https://adsverse.in${imagePath}`,
    "url": `https://adsverse.in/locations/${cityKey}`,
    "telephone": "+919685123339",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": name,
      "addressRegion": state,
      "addressCountry": "IN"
    },
    "geo": coords ? {
      "@type": "GeoCoordinates",
      "latitude": coords.lat,
      "longitude": coords.lng
    } : undefined,
    "sameAs": wikiLink ? [wikiLink] : [],
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": name,
      "sameAs": wikiLink
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // Determine regional channel recommendation
  const getChannelRecommendation = () => {
    const isTourism = ["udaipur", "jodhpur", "ujjain", "srinagar", "kohima"].includes(cityKey);
    const isTechHub = ["noida", "jaipur"].includes(cityKey);
    const isHighVolume = ["indore", "bhopal", "kota"].includes(cityKey);

    if (isHighVolume) {
      return {
        primary: "WhatsApp Qualification Bots + Meta Lead Ads",
        duration: "5-7 Days Setup",
        kpi: "Qualified Lead Volume & Response Time"
      };
    } else if (isTechHub) {
      return {
        primary: "Next.js Custom Development + Programmatic SEO",
        duration: "14-21 Days Sprint",
        kpi: "Page Load Speed & Non-Brand Organic Traffic"
      };
    } else if (isTourism) {
      return {
        primary: "Direct Booking Ads + Automatic Review Funnel",
        duration: "7-10 Days Setup",
        kpi: "Direct Booking Conversion Rate"
      };
    } else {
      return {
        primary: "Hyperlocal SEO & Google My Business Ranking",
        duration: "30-45 Days Compound",
        kpi: "Local Search Pack Dominance & Direct Phone Inquiries"
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
              <div className="space-y-8">
                <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-600 dark:text-orange-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  {name}, {state}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  Digital Marketing Agency in <span className="text-orange-600 dark:text-orange-500">{name}</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
                  {introData?.headline || `AI-first digital marketing agency helping ${name} businesses scale.`}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-14 px-8 text-base font-bold shadow-lg shadow-orange-500/20 transition-all duration-300">
                    <Link href="/contact">Book a Free Consultation</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl h-14 px-8 text-base border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Link href="#services">View Services</Link>
                  </Button>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                <Image
                  src={imagePath}
                  alt={`Business in ${name}, ${state}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                  <p className="font-semibold text-lg drop-shadow-md">Serving {name}</p>
                  <p className="text-white/80 text-sm">{state}, India</p>
                </div>
              </div>
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
                    <h3 className="text-3xl font-bold font-headline mb-2">113+ Brands Across India</h3>
                    <p className="text-xs text-slate-505 dark:text-slate-400">Company-wide averages — not city-specific data</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-slate-50 dark:bg-slate-900/50 shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
                    <Bot className="w-8 h-8 text-orange-500 mb-4" />
                    <h3 className="text-3xl font-bold font-headline mb-2">24/7</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Automated Lead Qualification</p>
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
                    We deploy geo-targeted marketing setups optimized for {name}'s core business districts, industrial hubs, and commercial zones.
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
                    Strategic channel allocation blueprint built for the competition dynamics in {name}.
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

        {/* SERVICES SECTION */}
        <div id="services" className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-border/40">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Services We Deliver in {name}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                {serviceSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Local Search & SEO",
                  desc: "Dominate Google search results for transactional keywords in your city.",
                  icon: <MapPin className="w-6 h-6 text-orange-500" />
                },
                {
                  title: "Meta & Google Ads",
                  desc: "Fast setup, transparent tracking, and ROI-focused campaign management.",
                  icon: <Megaphone className="w-6 h-6 text-orange-500" />
                },
                {
                  title: "WhatsApp AI Bots",
                  desc: "Automate lead qualification and customer support on WhatsApp 24/7.",
                  icon: <Bot className="w-6 h-6 text-orange-500" />
                },
                {
                  title: "Next.js Web Development",
                  desc: "Blazing fast, SEO-optimized websites built for high conversion rates.",
                  icon: <Code className="w-6 h-6 text-orange-500" />
                },
                {
                  title: "n8n CRM Automation",
                  desc: "Connect your ads, forms, and WhatsApp directly into your sales team's sheets or CRM.",
                  icon: <FileText className="w-6 h-6 text-orange-500" />
                },
                {
                  title: "B2B Lead Generation",
                  desc: "Targeted outbound campaigns to reach decision-makers in your specific industry.",
                  icon: <Users className="w-6 h-6 text-orange-500" />
                }
              ].map((service, idx) => (
                <Card key={idx} className="border-border/50 hover:border-orange-500/50 transition-colors bg-white dark:bg-slate-950">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center mb-4 border border-orange-100 dark:border-orange-900/50">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CAMPAIGN BLUEPRINT PROCESS TIMELINE (AEO) */}
        <div className="py-20 bg-white dark:bg-slate-950 border-b border-border/40">
          <div className="container px-4 max-w-4xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                How We Launch Local Campaigns
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Our structured onboarding blueprint designed to scale {name} client accounts efficiently.
              </p>
            </div>

            <div className="relative border-l border-orange-500/30 ml-4 md:ml-6 space-y-12">
              {[
                {
                  step: "01",
                  title: "Competitor & Keyword Audits",
                  desc: "We analyze local competitors, search volumes, and coordinate list indexing. We identify transactional keyword low-hanging fruits unique to your city geography."
                },
                {
                  step: "02",
                  title: "Conversion & Automation Setup",
                  desc: "We configure n8n pipelines, connect landing page lead catchers, and build WhatsApp bots. No ad spend happens until qualification processes are stress-tested."
                },
                {
                  step: "03",
                  title: "Targeted Ad Deployment",
                  desc: "We launch Google and Meta ad sets targeting your designated geographic zones and neighborhoods. Creatives are tested weekly, prioritizing mobile-friendly conversions."
                },
                {
                  step: "04",
                  title: "Continuous Scaling & CRM Sync",
                  desc: "We monitor performance, optimize bidding models, and verify offline conversion uploads back into Google and Meta to scale your absolute highest-value channels."
                }
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

        {/* FAQs */}
        <div className="py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
                Frequently Asked Questions
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

        {/* SEO Data Component (Invisible) */}
        <AISearchInsights 
          title={`Market Dynamics in ${name}, ${state}`}
          insights={[
            { title: "📍 Region Served", description: regionLabel },
            { title: "🎯 Target Audience", description: `B2B companies, retail businesses, coaching institutes, real estate developers, healthcare providers, and local service businesses located in or targeting ${name}.` },
            { title: "⚡ Core Advantage", description: "Tier-1 digital execution capabilities (Next.js, n8n, AI agents) applied to Tier-2 market dynamics." }
          ]}
          takeaways={[
            "AI-first SEO",
            "Performance Marketing",
            "WhatsApp Automation",
            "Next.js Web Development",
            "n8n CRM Integration"
          ]}
        />
      </div>
    </>
  );
}
