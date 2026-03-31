
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import { getDictionary } from "@/lib/get-dictionary";
import { FirebaseClientProvider } from "@/firebase";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://adsverse.in",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AdsVerse",
  "url": "https://adsverse.in",
  "logo": "https://adsverse.in/images/logo-white.png",
  "sameAs": [
    "https://facebook.com/adsverse",
    "https://instagram.com/adsverse_in"
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
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header navLinks={navLinks} lang={params.lang} />
      <main>{children}</main>
      <Footer />
      <FloatingActionButton />
    </FirebaseClientProvider>
  );
}
