
import type { Metadata } from "next";
import { Inter, Playfair_Display, Plus_Jakarta_Sans, Instrument_Sans } from "next/font/google";
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

const siteUrl = "https://adsverse.in";
const siteName = "AdsVerse";
const description = "AdsVerse is a digital marketing agency specializing in SEO, Paid Ads, & Web Development. We blend creativity with data to drive real results for your business.";
const twitterHandle = "@Adsverse1";

// WebSite schema — global, fires on every page (no LocalBusiness duplication)
// LocalBusiness schema lives only in page.tsx (homepage) and our-services/page.tsx
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://adsverse.in/#website",
  "name": "AdsVerse",
  "url": "https://adsverse.in",
  "description": "AI-first digital marketing agency in Indore specializing in SEO, automation, and performance advertising.",
  "publisher": {
    "@type": "Organization",
    "@id": "https://adsverse.in/#organization",
    "name": "AdsVerse",
    "logo": {
      "@type": "ImageObject",
      "url": "https://adsverse.in/images/logo-white.webp"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://adsverse.in/blog?q={search_term_string}",
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
  { href: "/about", label: "About" },
  { href: "/our-services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/tools/seo-audit", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="adsverse-website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
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
            style={{ display: 'none', visibility: 'hidden' }}
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
            <Header navLinks={navLinks} />
            <div id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
              {children}
            </div>
            <Footer />
            <FloatingActionButton />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

