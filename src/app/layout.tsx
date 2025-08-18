
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButton } from "@/components/layout/floating-action-button";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: {
    default: "AdsVerse | Digital Marketing That Drives Results",
    template: "%s | AdsVerse",
  },
  description: "AdsVerse is a full-service digital marketing agency specializing in SEO, Paid Ads, Social Media Management, and Web Development. We help businesses grow online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        inter.variable, 
        playfairDisplay.variable
      )}>
          {children}
          <Toaster />
      </body>
    </html>
  );
}
