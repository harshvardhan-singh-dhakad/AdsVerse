import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Video, MessageCircle, BarChart2, CalendarCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remote Digital Marketing Services Across India | AdsVerse",
  description:
    "AdsVerse is headquartered in Indore and works with clients across India remotely — SEO, WhatsApp automation, and paid ads delivered via video calls, WhatsApp, and shared dashboards. No local office required.",
  alternates: {
    canonical: "https://adsverse.in/locations/pan-india-remote",
  },
  openGraph: {
    title: "Remote Digital Marketing Services Across India | AdsVerse",
    description:
      "AI-first digital marketing for clients anywhere in India. Everything — strategy, reporting, WhatsApp bots, ad reviews — happens over video call and shared dashboards.",
    url: "https://adsverse.in/locations/pan-india-remote",
    siteName: "AdsVerse",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote Digital Marketing Services | AdsVerse",
    description:
      "AdsVerse works with clients across India remotely — SEO, WhatsApp automation, and paid ads via video calls and shared dashboards.",
    creator: "@Adsverse1",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Remote Digital Marketing Services — Pan India",
    provider: {
      "@type": "Organization",
      name: "AdsVerse",
      url: "https://adsverse.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Vijay Nagar",
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        postalCode: "452010",
        addressCountry: "IN",
      },
    },
    areaServed: { "@type": "Country", name: "India" },
    serviceType: ["SEO","Google Ads","Meta Ads","WhatsApp Automation","n8n Workflows","Web Development"],
    description: "AdsVerse provides remote digital marketing services to clients across India via video calls, WhatsApp communication, and shared reporting dashboards.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://adsverse.in" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://adsverse.in/locations" },
      { "@type": "ListItem", position: 3, name: "Remote Services — Pan India", item: "https://adsverse.in/locations/pan-india-remote" },
    ],
  },
];

const remoteSteps = [
  { step: "01", title: "Kickoff Call", desc: "We start with a 60-minute video call to understand your business, goals, current digital presence, and what success looks like for you in the first 90 days." },
  { step: "02", title: "Access Setup", desc: "You share access to your Google Ads, Meta Ads Manager, Search Console, and any existing CRM or WhatsApp Business account. We audit and set up tracking within 48 hours." },
  { step: "03", title: "Weekly Async Reporting", desc: "Every week you receive a shared dashboard update via WhatsApp and email — ad spend, ROAS, lead volume, SEO movement, bot interactions. No fluff, no agency jargon." },
  { step: "04", title: "Monthly Review Call", desc: "Once a month we do a full account review on video call — what worked, what we are changing next month, and any new opportunities in your market." },
];

const whatWeDeliver = [
  "SEO — local and national keyword targeting, Google My Business optimization",
  "Paid Ads — Google Search PPC and Meta (Facebook/Instagram) campaigns",
  "WhatsApp AI Bots — automated lead qualification and customer communication",
  "n8n CRM Automation — connect forms, sheets, Vyapar, and active agents",
  "Web Design & Development — Next.js websites built for speed and conversion",
  "Content Marketing — SEO articles and ad copy written for your industry",
];

const syncMethods = [
  { title: "Video Calls", desc: "Kickoff and monthly review calls on Google Meet or Zoom. Recorded and shared for your reference." },
  { title: "WhatsApp Updates", desc: "Weekly performance summaries and fast responses to your questions — on the channel you already use." },
  { title: "Shared Dashboards", desc: "Live access to your performance data — ad spend, leads, SEO rankings — updated in real time, always visible." },
];

export default function PanIndiaRemotePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto py-16 px-4 max-w-5xl">
        <div className="mb-8">
          <Button asChild variant="link" className="p-0 text-slate-700 dark:text-muted-foreground hover:text-orange-500">
            <Link href="/locations"><ArrowLeft className="mr-2 h-4 w-4" />Back to Locations</Link>
          </Button>
        </div>
        <div className="mb-16 space-y-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20">
            Pan-India Remote
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-headline text-foreground leading-tight">
            Remote Digital Marketing &mdash; <span className="text-brand-orange">Serving Clients Across India</span>
          </h1>
          <p className="text-base md:text-lg text-slate-800 dark:text-muted-foreground leading-relaxed max-w-3xl">
            AdsVerse is based in Vijay Nagar, Indore. Our deepest local experience and in-person team is across Madhya Pradesh, Rajasthan, Chhattisgarh, Uttar Pradesh, Bihar, Jammu &amp; Kashmir, and Northeast India. We also work with clients from other parts of the country who want AI-first execution without needing a local agency office.
          </p>
          <p className="text-base md:text-lg text-slate-800 dark:text-muted-foreground leading-relaxed max-w-3xl">
            Everything — strategy calls, reporting, WhatsApp bot builds, campaign reviews — happens over video call and shared dashboards. If you are outside our core regions and want to work with us, this is exactly how it works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:from-orange-500 hover:to-amber-400 font-bold tracking-wide shadow-xl shadow-orange-600/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 transform rounded-xl px-8 h-12 border-none">
              <Link href="/contact">Start a Remote Engagement</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border/60 hover:border-orange-500/30 text-foreground hover:text-orange-500 hover:bg-orange-500/5 font-semibold rounded-xl px-6 h-12">
              <Link href="/locations" className="flex items-center gap-1.5">View Core Locations <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
        <section className="mb-20 space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">How Remote Engagements Work</h2>
            <p className="text-slate-800 dark:text-muted-foreground max-w-xl mx-auto">A structured 4-step process — no mystery, no missed updates, no need for in-person meetings.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {remoteSteps.map((step) => (
              <Card key={step.step} className="bg-card/40 backdrop-blur-sm border border-border/30 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.06)] transition-all duration-500">
                <CardHeader className="pb-2">
                  <span className="text-4xl font-extrabold text-orange-500/20 font-headline leading-none">{step.step}</span>
                  <CardTitle className="text-xl font-headline">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-800 dark:text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="mb-20">
          <div className="border border-border/30 bg-card/25 backdrop-blur-sm rounded-3xl p-8 md:p-12 space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-headline">What We Deliver Remotely</h2>
              <p className="text-slate-800 dark:text-muted-foreground text-sm max-w-xl">The full AdsVerse service stack is available to remote clients — the only difference is that strategy and reviews happen on video calls instead of in-person.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whatWeDeliver.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-slate-800 dark:text-muted-foreground text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mb-20 space-y-8">
          <h2 className="text-3xl font-bold font-headline text-center">How We Stay in Sync</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {syncMethods.map((item, i) => (
              <Card key={i} className="bg-card/40 backdrop-blur-sm border border-border/30 hover:border-orange-500/40 transition-all duration-500 text-center">
                <CardHeader>
                  <CardTitle className="text-lg font-headline">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-800 dark:text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="text-center space-y-6 border border-border/30 bg-card/25 backdrop-blur-sm rounded-3xl p-10 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to work with us remotely?</h2>
          <p className="text-slate-800 dark:text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">Tell us about your business and what you need. We will set up a 30-minute intro call, no commitment required.</p>
          <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:from-orange-500 hover:to-amber-400 font-bold tracking-wide shadow-xl shadow-orange-600/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 transform rounded-xl px-10 h-14 border-none text-base">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </section>
      </div>
    </>
  );
}
