
import type { Metadata } from "next";
import { Inter, Playfair_Display, Plus_Jakarta_Sans, Instrument_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ScriptOptimizer } from "@/components/layout/ScriptOptimizer";
import { BackgroundEffects } from "@/components/layout/BackgroundEffects";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['900'],
  display: 'swap',
});

const siteUrl = "https://adsverse.in";
const siteName = "AdsVerse";
const description = "AdsVerse is a digital marketing agency specializing in SEO, Paid Ads, & Web Development. We blend creativity with data to drive real results for your business.";
const twitterHandle = "@Adsverse1";
const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1462002154504108";

const schemaArray = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://adsverse.in/#organization",
    "name": "AdsVerse",
    "alternateName": "AdsVerse Digital Marketing Agency",
    "url": "https://adsverse.in",
    "logo": "https://adsverse.in/logo.png",
    "image": "https://adsverse.in/og-image.jpg",
    "hasMap": "https://maps.app.goo.gl/7edcg9nx6Kofxv8M8",
    "description": "AI-first digital marketing agency in Indore specializing in n8n automation, WhatsApp AI chatbots, Gemini API integrations, CRM automation, SEO, and performance advertising for Indian SMBs.",
    "telephone": "+91-9685123339",
    "email": "contact@adsverse.in",
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
    "areaServed": [
      "Indore", "Madhya Pradesh", "India"
    ],
    "priceRange": "₹3000",
    "openingHours": "Mo-Sa 10:00-19:00",
    "sameAs": [
      "https://www.instagram.com/adsverse.ai",
      "https://www.facebook.com/adsverse.in",
      "https://x.com/Adsverse",
      "https://www.linkedin.com/company/adsverse"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "n8n Workflow Automation",
            "description": "Custom n8n automation workflows for lead management, CRM sync, and business process automation."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "WhatsApp AI Chatbot",
            "description": "Gemini-powered WhatsApp bots for lead generation, customer support, and sales automation."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO & GEO Optimization",
            "description": "Search engine and generative engine optimization for Indian SMBs targeting Tier-2 cities."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Meta & Google Ads Management",
            "description": "Performance advertising on Meta and Google for lead generation and brand awareness."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM Automation & Integration",
            "description": "End-to-end CRM setup, automation, and third-party API integrations."
          }
        }
      ]
    }
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AdsVerse | AI-Powered Digital Marketing & Automation Agency",
    template: "%s | AdsVerse",
  },
  description: "AdsVerse is Indore's top AI marketing agency. We specialize in SEO, Google & Meta Ads, and Automation to drive measurable growth for your business.",
  openGraph: {
    title: {
      default: "AdsVerse | Digital Marketing That Drives Results",
      template: "%s | AdsVerse",
    },
    description: description,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/images/og-adsverse-2026.png`,
        width: 1200,
        height: 630,
        alt: "AdsVerse - Digital Marketing Agency",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: "AdsVerse | Digital Marketing That Drives Results",
      template: "%s | AdsVerse",
    },
    description: description,
    creator: twitterHandle,
    images: [`${siteUrl}/images/og-adsverse-2026.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=1", sizes: "any" },
      { url: "/favicon-96x96.png?v=1", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg?v=1", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=1", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#0a0d14" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        {/* DNS prefetch for third-party image CDNs */}
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Material Symbols */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        {/* Organization & LocalBusiness Schema */}
        <script
          id="adsverse-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArray) }}
        />
      </head>
      <body className={cn(
        "bg-background font-body antialiased selection:bg-primary selection:text-primary-foreground",
        inter.variable, 
        playfairDisplay.variable,
        plusJakartaSans.variable,
        instrumentSans.variable,
        outfit.variable
      )}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M6GV59XL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* GTM dataLayer initialization — must run before GTM script */}
        <script
          id="gtm-datalayer-init"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];`
          }}
        />
        <ScriptOptimizer />
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <div className="relative z-10 min-h-screen flex flex-col">
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
            >
              Skip to main content
            </a>
            <BackgroundEffects />
            <Header navLinks={navLinks} />
            <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <FloatingActionButton />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

