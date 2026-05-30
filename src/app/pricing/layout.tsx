import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance Marketing Plans & Pricing",
  description: "Transparent pricing for SEO, Google Ads, and AI Automation in Indore. Choose the best plan to scale your business with AdsVerse.",
  alternates: {
    canonical: 'https://adsverse.in/pricing',
  },
  openGraph: {
    title: "Performance Marketing Plans & Pricing | AdsVerse",
    description: "Transparent pricing for SEO, Google Ads, and AI Automation in Indore.",
    url: "https://adsverse.in/pricing",
    siteName: "AdsVerse",
    images: [
      {
        url: "https://adsverse.in/images/og-adsverse-2026.png",
        width: 1200,
        height: 630,
        alt: "AdsVerse Pricing Plans",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Performance Marketing Plans & Pricing | AdsVerse",
    description: "Transparent pricing for SEO, Google Ads, and AI Automation in Indore.",
    images: ["https://adsverse.in/images/og-adsverse-2026.png"],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
