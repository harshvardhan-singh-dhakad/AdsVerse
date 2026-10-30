import type { Metadata } from "next";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { FaqExplorer } from "@/components/pages/faq-explorer";

export const metadata: Metadata = {
  title: {
    absolute: "Frequently Asked Questions — AI Marketing, Automation & Growth | AdsVerse",
  },
  description:
    "Clear answers about SEO, AEO, GEO, Google and Meta Ads, WhatsApp AI chatbots, n8n automation, Next.js development, pricing, and working with AdsVerse in Indore.",
  alternates: {
    canonical: "https://adsverse.in/faq",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": "https://adsverse.in/faq#faq",
      "name": "Frequently Asked Questions — AI Marketing, Automation & Growth",
      "url": "https://adsverse.in/faq",
      "mainEntity": FAQ_ITEMS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
      "about": {
        "@id": "https://adsverse.in/#organization",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://adsverse.in/#organization",
      "name": "AdsVerse",
      "url": "https://adsverse.in/faq",
      "telephone": "+91 96851 23339",
      "email": "contact@adsverse.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Street No 11, House No. 329/11, Meghdoot Nagar, Vijay Nagar",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "452011",
        "addressCountry": "IN",
      },
    },
  ],
};

export default function FAQPage() {
  const safeFaqStructuredData = JSON.stringify(faqStructuredData).replace(/</g, "\\u003c");

  return (
    <>
      <script
        id="adsverse-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeFaqStructuredData }}
      />
      <FaqExplorer />
    </>
  );
}
