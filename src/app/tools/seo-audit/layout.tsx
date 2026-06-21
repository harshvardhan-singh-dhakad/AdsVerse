import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free SEO, GEO & AEO Website Audit Tool | AdsVerse",
  description: "Get a FREE instant SEO, GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) audit for your website. Check your AI search readiness score, technical SEO, performance, and more.",
  alternates: {
    canonical: 'https://adsverse.in/tools/seo-audit',
  },
  openGraph: {
    title: "Free SEO, GEO & AEO Website Audit Tool | AdsVerse",
    description: "Get a FREE instant SEO, GEO & AEO audit for your website. Check your AI search readiness score, on-page SEO, technical health, and more — in seconds.",
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
    title: "Free SEO, GEO & AEO Website Audit Tool | AdsVerse",
    description: "Get a FREE instant SEO, GEO & AEO audit for your website. Check your AI search readiness score in seconds.",
    images: ["https://adsverse.in/images/og-adsverse-2026.png"],
  },
};

export default function SEOAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
