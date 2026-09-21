import { Metadata } from "next";
import SEOAuditClientLayout from "./client-layout";
import { ReactNode } from "react";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { absolute: "Free SEO Audit Tool: Website SEO Checker | AdsVerse" },
  description: "Run a free SEO audit and website SEO check in seconds. Find technical SEO, Core Web Vitals, on-page, schema, crawlability and AI search issues.",
  keywords: [
    "free seo audit tool",
    "seo audit tool",
    "website seo checker",
    "seo checker",
    "free website audit tool",
    "seo analyzer",
    "technical seo audit",
    "seo audit tool india",
    "ai seo audit",
    "core web vitals checker",
  ],
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

const seoAuditStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SoftwareApplication", "WebApplication"],
      "@id": "https://adsverse.in/tools/seo-audit#app",
      name: "AdsVerse Free SEO Audit Tool",
      url: "https://adsverse.in/tools/seo-audit",
      description: "Free website SEO checker and audit tool for technical SEO, on-page SEO, Core Web Vitals, crawlability, structured data, GEO and AEO signals.",
      applicationCategory: "SEO",
      operatingSystem: "Web",
      browserRequirements: "Requires a modern web browser with JavaScript enabled.",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: "https://adsverse.in/tools/seo-audit"
      },
      featureList: [
        "Technical SEO audit",
        "On-page SEO checks",
        "Core Web Vitals and PageSpeed analysis",
        "Robots.txt and sitemap checks",
        "Structured data and Open Graph checks",
        "GEO and AEO visibility analysis",
        "Actionable SEO recommendations"
      ],
      provider: {
        "@type": "Organization",
        name: "AdsVerse",
        url: "https://adsverse.in"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://adsverse.in/tools/seo-audit#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://adsverse.in/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "SEO Audit Tool",
          item: "https://adsverse.in/tools/seo-audit"
        }
      ]
    }
  ]
};

export default function SEOAuditLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        id="seo-audit-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoAuditStructuredData) }}
      />
      <SEOAuditClientLayout>{children}</SEOAuditClientLayout>
    </>
  );
}
