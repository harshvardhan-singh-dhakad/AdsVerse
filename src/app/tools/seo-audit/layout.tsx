// Server component — exports metadata for /tools/seo-audit
// The actual Firebase wrapping happens inside the client layout nested below.
import { Metadata } from "next";
import SEOAuditClientLayout from "./client-layout";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Free SEO, GEO & AEO Audit Tool | AI Search Visibility Checker",
  description: "Run a free instant SEO, GEO, and AEO audit. Check your AI search visibility score on ChatGPT, Gemini & Perplexity. Fix tech SEO & optimize for AI Tools",
  alternates: {
    canonical: 'https://adsverse.in/tools/seo-audit',
  },
  openGraph: {
    title: "Free SEO, GEO & AEO Audit Tool | AI Search Visibility Checker",
    description: "Run a free instant SEO, GEO, and AEO audit. Check your AI search visibility score on ChatGPT, Gemini & Perplexity. Fix tech SEO & optimize for AI Tools",
    url: "https://adsverse.in/tools/seo-audit",
    siteName: "AdsVerse",
    images: [
      {
        url: "https://adsverse.in/images/og-adsverse-2026.png",
        width: 1200,
        height: 630,
        alt: "AdsVerse SEO, GEO & AEO Audit Tool",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free SEO, GEO & AEO Audit Tool | AI Search Visibility Checker",
    description: "Run a free instant SEO, GEO, and AEO audit. Check your AI search visibility score on ChatGPT, Gemini & Perplexity. Fix tech SEO & optimize for AI Tools",
    images: ["https://adsverse.in/images/og-adsverse-2026.png"],
  },
};

export default function SEOAuditLayout({ children }: { children: ReactNode }) {
  return <SEOAuditClientLayout>{children}</SEOAuditClientLayout>;
}
