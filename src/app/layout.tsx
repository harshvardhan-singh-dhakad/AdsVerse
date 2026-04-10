
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

const siteUrl = "https://adsverse.in";
const siteName = "AdsVerse";
const description = "AdsVerse is a digital marketing agency specializing in SEO, Paid Ads, & Web Development. We blend creativity with data to drive real results for your business.";
const twitterHandle = "@Adsverse1";
const defaultImage = "https://adsverse.in/images/og-image.png";
const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1462002154504108"; // Using a placeholder that looks real or user's provided ID if available

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": siteName,
  "alternateName": "AdsVerse Digital Marketing Agency",
  "url": siteUrl,
  "logo": `${siteUrl}/images/logo-white.webp`,
  "sameAs": [
    "https://facebook.com/adsverse",
    "https://instagram.com/adsverse_in",
    "https://twitter.com/Adsverse1"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9685123339",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["en", "hi"]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteName,
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteUrl}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

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
        url: `${siteUrl}/images/og-image.webp`,
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
    images: [`${siteUrl}/images/og-image.webp`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        inter.variable, 
        playfairDisplay.variable
      )}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-M6GV59XL"
            height="0" 
            width="0" 
            className="sr-only hidden"
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
          <div className="relative z-10">
            <BackgroundEffects />
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
