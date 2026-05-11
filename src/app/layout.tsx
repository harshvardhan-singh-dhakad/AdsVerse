
import type { Metadata } from "next";
import { Inter, Playfair_Display, Plus_Jakarta_Sans, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ScriptOptimizer } from "@/components/layout/ScriptOptimizer";
import { BackgroundEffects } from "@/components/layout/BackgroundEffects";
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

const siteUrl = "https://adsverse.in";
const siteName = "AdsVerse";
const description = "AdsVerse is a digital marketing agency specializing in SEO, Paid Ads, & Web Development. We blend creativity with data to drive real results for your business.";
const twitterHandle = "@Adsverse1";
const defaultImage = "https://adsverse.in/images/og-adsverse-2026.png";
const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1462002154504108"; // Using a placeholder that looks real or user's provided ID if available

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
    "priceRange": "₹₹",
    "openingHours": "Mo-Sa 10:00-19:00",
    "sameAs": [
      "https://www.instagram.com/adsverse.in",
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
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does AdsVerse offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AdsVerse offers n8n workflow automation, WhatsApp AI chatbots, Gemini API integrations, CRM automation, SEO, GEO optimization, Meta Ads, Google PPC, and Next.js web development."
        }
      },
      {
        "@type": "Question",
        "name": "Where is AdsVerse located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AdsVerse is located in Vijay Nagar, Indore, Madhya Pradesh, India."
        }
      },
      {
        "@type": "Question",
        "name": "Does AdsVerse work with small businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, AdsVerse specializes in AI-first marketing automation for Indian SMBs and Tier-2 city businesses."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact AdsVerse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact AdsVerse at +91-9685123339 or visit https://adsverse.in/contact."
        }
      },
      {
        "@type": "Question",
        "name": "What makes AdsVerse different from other digital marketing agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AdsVerse is AI-first — using n8n, Gemini API, and WhatsApp automation instead of manual processes. Most Indore agencies do not offer this level of AI integration."
        }
      }
    ]
  }
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AdsVerse | AI-Powered Digital Marketing & Automation Agency",
    template: "%s | AdsVerse",
  },
  description: "AdsVerse is Indore's top AI marketing agency. We specialize in SEO, Google & Meta Ads, and Automation to drive measurable growth for your business.",
  keywords: [
    "digital marketing agency in Indore",
    "best digital marketing agency Indore",
    "SEO services Indore",
    "performance marketing agency India",
    "Google Ads management India",
    "Meta ads agency India",
    "AI marketing automation India",
    "WhatsApp bot for business India",
    "marketing automation agency Indore",
    "social media marketing Indore",
    "web design company Indore",
    "lead generation agency Indore",
    "ROI focused digital marketing",
    "AdsVerse Indore",
    "digital marketing agency Madhya Pradesh",
    "n8n automation agency India",
    "paid ads agency Indore",
    "content marketing agency India",
    "local SEO services Indore",
    "affordable digital marketing India"
  ],
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
    alternateLocale: ['hi_IN'],
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

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang ?? 'en'} suppressHydrationWarning>
      <head>
        <script
          id="adsverse-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArray) }}
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
      </head>
      <body className={cn(
        "bg-background font-body antialiased selection:bg-primary selection:text-primary-foreground",
        inter.variable, 
        playfairDisplay.variable,
        plusJakartaSans.variable,
        instrumentSans.variable
      )}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-M6GV59XL"
            height="0" 
            width="0" 
            className="sr-only hidden"
            title="Google Tag Manager"
          ></iframe>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }} 
            src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`} 
            alt=""
          />
        </noscript>
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
            <div id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
              {children}
            </div>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
