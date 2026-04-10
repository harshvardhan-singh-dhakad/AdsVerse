
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
    "https://facebook.com/adsverse",
    "https://instagram.com/adsverse",
    "https://x.com/Adsverse1",
    "https://www.linkedin.com/company/dmafia/"
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
  "email": "contact@adsverse.in",
  "priceRange": "₹₹",
  "description": "AdsVerse is Indore's leading AI-powered digital marketing agency offering SEO, Google Ads, Meta Ads, Social Media Marketing, Web Development, and Business Automation.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Scheme No. 54, Vijay Nagar",
    "addressLocality": "Indore",
    "addressRegion": "Madhya Pradesh",
    "postalCode": "452010",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.7289,
    "longitude": 75.8919
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "10:00",
    "closes": "19:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://facebook.com/adsverse",
    "https://instagram.com/adsverse",
    "https://x.com/Adsverse1",
    "https://www.linkedin.com/company/dmafia/"
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
