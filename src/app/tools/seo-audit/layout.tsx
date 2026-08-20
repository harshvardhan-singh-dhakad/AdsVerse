import { Metadata } from "next";
import SEOAuditClientLayout from "./client-layout";
import { ReactNode } from "react";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { absolute: "Free SEO, AEO & GEO Audit Tool — AI Search Visibility Checker | AdsVerse" },
  description: "Run a free audit to see your Google SEO score plus AI visibility on ChatGPT, Perplexity & Google AI Overviews. Instant 21+ check report.",
  alternates: {
    canonical: 'https://adsverse.in/tools/seo-audit',
  },
  openGraph: {
    title: { absolute: "Free SEO, AEO & GEO Audit Tool — AI Search Visibility Checker | AdsVerse" },
    description: "Run a free audit to see your Google SEO score plus AI visibility on ChatGPT, Perplexity & Google AI Overviews. Instant 21+ check report.",
    url: "https://adsverse.in/tools/seo-audit",
    siteName: "AdsVerse",
    images: [
      {
        url: "https://adsverse.in/images/og-adsverse-2026.png",
        width: 1200,
        height: 630,
        alt: "AdsVerse SEO, AEO & GEO Audit Tool",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: { absolute: "Free SEO, AEO & GEO Audit Tool — AI Search Visibility Checker | AdsVerse" },
    description: "Run a free audit to see your Google SEO score plus AI visibility on ChatGPT, Perplexity & Google AI Overviews. Instant 21+ check report.",
    images: ["https://adsverse.in/images/og-adsverse-2026.png"],
  },
};

export default function SEOAuditLayout({ children }: { children: ReactNode }) {
  return <SEOAuditClientLayout>{children}</SEOAuditClientLayout>;
}
