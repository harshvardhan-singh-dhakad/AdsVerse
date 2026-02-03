
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import Script from "next/script";
import { ThemeProvider } from "@/components/layout/theme-provider";

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
const defaultImage = "https://github.com/harshvardhan-singh-dhakad/image/blob/main/insta%26facbook%20card.jpeg?raw=true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AdsVerse | Digital Marketing That Drives Results",
    template: "%s | AdsVerse",
  },
  description: description,
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
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: "AdsVerse - Digital Marketing Agency",
      },
    ],
    locale: 'en_US',
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
    images: [defaultImage],
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'hi': '/hi',
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
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        inter.variable, 
        playfairDisplay.variable
      )}>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M6GV59XL');`}
        </Script>
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
              style={{display: 'none', visibility: 'hidden'}}
            ></iframe>
          </noscript>
          <div className="fixed top-0 left-0 w-full h-full -z-20 overflow-hidden">
            <div className="glow-effect"></div>
            <div className="stars stars-sm"></div>
            <div className="stars stars-md"></div>
            <div className="stars stars-lg"></div>
          </div>
          <div className="relative z-10">
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
