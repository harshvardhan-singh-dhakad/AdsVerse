
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ScriptOptimizer } from "@/components/layout/ScriptOptimizer";
import { BackgroundEffects } from "@/components/layout/BackgroundEffects";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const siteUrl = "https://adsverse.in";
const siteName = "AdsVerse";
const description = "AdsVerse is a digital marketing agency specializing in SEO, Paid Ads, & Web Development. We blend creativity with data to drive real results for your business.";
const twitterHandle = "@Adsverse1";
const defaultImage = "https://adsverse.in/images/og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AdsVerse | AI-Powered Digital Marketing & Automation Agency",
    template: "%s | AdsVerse",
  },
  description: "AdsVerse is Indore's #1 AI-powered digital marketing agency specializing in SEO, Performance Marketing, Meta & Google Ads, and Business Automation to drive measurable growth for Indian businesses.",
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
        url: "/images/og-image.png",
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
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en': `${siteUrl}/en`,
      'hi': `${siteUrl}/hi`,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: '/site.webmanifest',
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        inter.variable, 
        playfairDisplay.variable
      )}>
        <ScriptOptimizer />
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <noscript>
            <iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-M6GV59XL"
              height="0" 
              width="0" 
              className="sr-only hidden"
            ></iframe>
            <img 
              height="1" 
              width="1" 
              style={{display: 'none'}} 
              src="https://www.facebook.com/tr?id=1234567890&ev=PageView&noscript=1" 
              alt=""
            />
          </noscript>
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
