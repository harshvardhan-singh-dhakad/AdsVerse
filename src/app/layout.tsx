
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import Script from "next/script";

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
const description = "AdsVerse is a full-service digital marketing agency specializing in SEO, Paid Ads, Social Media Management, and Web Development. We help businesses grow online.";
const twitterHandle = "@Adsverse1";
const defaultImage = "https://github.com/HSDmarketing/Adsverse.image/blob/main/adsverse.png?raw=true";

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
        alt: "AdsVerse Logo",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M6GV59XL');`}
        </Script>
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
            <Header />
            {children}
            <Footer />
            <FloatingActionButton />
            <Toaster />
          </div>
      </body>
    </html>
  );
}
