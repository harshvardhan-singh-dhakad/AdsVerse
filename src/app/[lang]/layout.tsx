
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import { getDictionary } from "@/lib/get-dictionary";
import { FirebaseClientProvider } from "@/firebase";
import { Metadata } from "next";
import Script from "next/script";



const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AdsVerse",
  "url": "https://adsverse.in",
  "logo": "https://adsverse.in/images/logo-white.webp",
  "sameAs": [
    "https://www.instagram.com/adsverse.ai",
    "https://www.facebook.com/adsverse.in",
    "https://x.com/Adsverse",
    "https://www.linkedin.com/company/adsverse"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9685123339",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vijay Nagar",
    "addressLocality": "Indore",
    "addressRegion": "MP",
    "postalCode": "452010",
    "addressCountry": "IN"
  }
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AdsVerse",
  "image": "https://adsverse.in/images/logo-white.webp",
  "@id": "https://adsverse.in",
  "url": "https://adsverse.in",
  "telephone": "+91-9685123339",
  "email": "hello@adsverse.in",
  "priceRange": "₹3000",
  "description": "AI-first digital marketing and automation agency serving Indore SMBs with SEO, Google Ads, Meta Ads, and WhatsApp automation.",
  "hasMap": "https://maps.app.goo.gl/7edcg9nx6Kofxv8M8",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vijay Nagar",
    "addressLocality": "Indore",
    "addressRegion": "Madhya Pradesh",
    "postalCode": "452010",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.7533,
    "longitude": 75.8937
  },
  "areaServed": {
    "@type": "City",
    "name": "Indore"
  },
  "openingHours": "Mo-Sa 9:00-19:30",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.instagram.com/adsverse.ai",
    "https://www.facebook.com/adsverse.in",
    "https://x.com/Adsverse",
    "https://www.linkedin.com/company/adsverse"
  ]
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionary = await getDictionary(params.lang);
  
  const navLinks = [
    { href: "/", label: dictionary.navigation.home },
    { href: "/about", label: dictionary.navigation.about },
    { href: "/our-services", label: dictionary.navigation.services },
    { href: "/portfolio", label: dictionary.navigation.portfolio },
    { href: "/pricing", label: dictionary.navigation.pricing },
    { href: "/tools/seo-audit", label: dictionary.navigation.tools },
    { href: "/blog", label: dictionary.navigation.blog },
    { href: "/contact", label: dictionary.navigation.contact },
  ];

  return (
    <FirebaseClientProvider>
      <script
        id="localized-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        id="localized-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Header navLinks={navLinks} lang={params.lang} />
      <main>{children}</main>
      <Footer />
      <FloatingActionButton />
    </FirebaseClientProvider>
  );
}
