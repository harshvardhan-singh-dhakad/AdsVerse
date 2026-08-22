import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { BackgroundEffects } from "@/components/layout/BackgroundEffects";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import dynamic from "next/dynamic";
const WebMCPProvider = dynamic(() => import("@/components/webmcp/WebMCPProvider"), { ssr: false });
import Script from "next/script";
import { collection, query, orderBy, getDocs, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase-server";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  preload: true,
  weight: ['400', '600', '700', '800'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
  preload: true,
  weight: ['400', '600', '700'],
});

const siteUrl = "https://adsverse.in";
const siteName = "AdsVerse";
const description = "AdsVerse is a digital marketing agency specializing in SEO, Paid Ads, & Web Development. We blend creativity with data to drive real results for your business.";
const twitterHandle = "@Adsverse1";

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
    "foundingDate": "2023",
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": "10" },
    "slogan": "Automate. Elevate. Dominate.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "329/11, Meghdoot Nagar",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "452011",
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
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+91-9685123339",
      "email": "contact@adsverse.in",
      "url": "https://adsverse.in/contact",
      "availableLanguage": ["English", "Hindi"]
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".hero-description", ".service-card-title"]
    },
    "knowsAbout": ["Search Engine Optimization", "Generative Engine Optimization", "Google Ads", "Meta Ads", "n8n Workflow Automation", "WhatsApp Business API", "CRM Automation"],
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
    },
    "potentialAction": [
      {
        "@type": "CommunicateAction",
        "name": "Contact AdsVerse",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://adsverse.in/contact",
          "inLanguage": "en-IN",
          "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
        }
      },
      {
        "@type": "ReserveAction",
        "name": "Book Free AI Strategy Call",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://adsverse.in/contact",
          "inLanguage": "en-IN"
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Deepak Dhakad",
    "url": "https://adsverse.in/about",
    "jobTitle": "Founder & Digital Marketing Expert",
    "image": "https://adsverse.in/images/deepak-dhakad-founder.webp",
    "knowsAbout": ["SEO", "Generative Engine Optimization", "Answer Engine Optimization", "Google Ads", "Meta Ads", "Marketing Automation", "n8n Workflows", "WhatsApp AI Bots"],
    "worksFor": {
      "@type": "Organization",
      "name": "AdsVerse",
      "url": "https://adsverse.in"
    },
    "sameAs": [
      "https://www.linkedin.com/company/adsverse"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://adsverse.in/#website",
    "name": "AdsVerse",
    "url": "https://adsverse.in",
    "description": "AI-first digital marketing agency in Indore — SEO, GEO, n8n automation, WhatsApp AI bots, Google & Meta Ads.",
    "publisher": {
      "@id": "https://adsverse.in/#organization"
    },
    "inLanguage": "en-IN",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://adsverse.in/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AdsVerse | AI Marketing & Automation Agency",
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
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

async function getLatestPosts() {
  try {
    const now = new Date().toISOString();
    const q = query(
      collection(db, "public_blogPosts"),
      where("publishedDate", "<=", now),
      orderBy("publishedDate", "desc"),
      limit(2)
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title || "",
      slug: doc.data().slug || "",
      imageUrl: doc.data().imageUrl || "/images/og-adsverse-2026.png",
      category: doc.data().category || "",
    }));
  } catch (error) {
    console.error("Error fetching latest posts for header:", error);
    return [];
  }
}

const webMcpManifest = {
  name: "AdsVerse WebMCP Agent Protocol",
  version: "1.0.0",
  description: "WebMCP Tool & Agent specification for AdsVerse",
  url: "https://adsverse.in",
  tools: [
    {
      name: "submitContactForm",
      description: "Submit business inquiry or project request to AdsVerse",
      endpoint: "/contact",
      method: "POST"
    },
    {
      name: "seoAuditTool",
      description: "Perform SEO Audit analysis on target website URL",
      endpoint: "/tools/seo-audit",
      method: "POST"
    },
    {
      name: "getServiceCatalog",
      description: "Get listing of all agency services (SEO, Meta Ads, Google Ads, n8n automation, WhatsApp AI bots)",
      endpoint: "/our-services",
      method: "GET"
    }
  ]
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#0a0d14" />
        {/* LLMs & AI Documentation References for AI Maturity & Crawlers */}
        <link rel="alternate" type="text/markdown" title="LLMs.txt Documentation" href="https://adsverse.in/llms.txt" />
        <link rel="alternate" type="text/markdown" title="Full LLMs Documentation" href="https://adsverse.in/llms-full.txt" />
        {/* AI Agent Discovery — enables Agent Readiness signals */}
        <link rel="agent" type="application/json" href="https://adsverse.in/.well-known/agent.json" />
        <link rel="api" type="application/json" title="AdsVerse OpenAPI Spec" href="https://adsverse.in/openapi.json" />
        <link rel="ai-plugin" type="application/json" href="https://adsverse.in/.well-known/ai-plugin.json" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        {/* DNS prefetch for third-party image CDNs */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Organization & LocalBusiness Schema */}
        <script
          id="adsverse-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArray) }}
        />
        {/* WebMCP Tool Manifest Declaration */}
        <script
          id="webmcp-manifest"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webMcpManifest) }}
        />
        {/* Agentic Browsing / AI Search Support */}
        <link rel="llms-txt" href="/llms.txt" />
        <link rel="llms-full-txt" href="/llms-full.txt" />
      </head>
      <body className={cn(
        "bg-background font-body antialiased selection:bg-primary selection:text-primary-foreground",
        plusJakartaSans.variable,
        instrumentSans.variable
      )}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
          Skip to main content
        </a>
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
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M6GV59XL');`
          }}
        />
        {/* Microsoft Clarity Analytics for Bing Webmaster Tools */}
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y4qtz4v0br");`
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10 min-h-screen flex flex-col">
            <BackgroundEffects />
            <Header navLinks={navLinks} latestPosts={[]} />
            <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <FloatingActionButton />
            <Toaster />
            <WebMCPProvider />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
