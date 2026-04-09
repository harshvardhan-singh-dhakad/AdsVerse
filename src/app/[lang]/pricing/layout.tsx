import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance Marketing Plans & Pricing",
  description: "Transparent pricing for SEO, Google Ads, and AI Automation in Indore. Choose the best plan to scale your business with AdsVerse.",
  alternates: {
    canonical: 'https://adsverse.in/en/pricing',
    languages: {
      'en': 'https://adsverse.in/en/pricing',
      'hi': 'https://adsverse.in/hi/pricing',
    },
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
