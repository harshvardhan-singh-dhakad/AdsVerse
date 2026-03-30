
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import { getDictionary } from "@/lib/get-dictionary";
import { FirebaseClientProvider } from "@/firebase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "AdsVerse | AI-Powered Digital Marketing & Automation Agency in Indore",
    template: "%s | AdsVerse"
  },
  description: "AdsVerse is Indore's leading AI-driven digital marketing and automation agency. Maximize ROI with predictive SEO, automated sales funnels, and data-backed performance marketing.",
  keywords: ["Digital Marketing Indore", "AI Marketing Agency", "Marketing Automation", "SEO Services Indore", "Business Automation ROI", "AdsVerse"],
  alternates: {
    canonical: "https://adsverse.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adsverse.in",
    siteName: "AdsVerse",
    title: "AdsVerse | Future of Digital Marketing & Automation",
    description: "Automate. Elevate. Dominate. Professional AI & Marketing solutions in Indore.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdsVerse | AI-Powered Marketing",
    description: "Indore's top automation and marketing partner.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AdsVerse",
  "url": "https://adsverse.in",
  "logo": "https://github.com/HSDmarketing/Adsverse.image/blob/main/adsverse.png?raw=true",
  "sameAs": [
    "https://facebook.com/adsverse",
    "https://instagram.com/adsverse_in"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9109033301",
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
