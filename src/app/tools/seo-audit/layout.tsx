import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free SEO Audit Tool | AdsVerse",
  description: "Get a free, instant, and comprehensive SEO audit report for your website. Uncover on-page, technical, and performance issues to improve your Google rankings.",
  alternates: {
    canonical: 'https://adsverse.in/tools/seo-audit',
  },
  openGraph: {
    title: "Free SEO Audit Tool | AdsVerse",
    description: "Get a free, instant, and comprehensive SEO audit report for your website.",
    url: "https://adsverse.in/tools/seo-audit",
    siteName: "AdsVerse",
    images: [
      {
        url: "https://adsverse.in/images/og-adsverse-2026.png",
        width: 1200,
        height: 630,
        alt: "AdsVerse SEO Audit Tool",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free SEO Audit Tool | AdsVerse",
    description: "Get a free, instant, and comprehensive SEO audit report for your website.",
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
