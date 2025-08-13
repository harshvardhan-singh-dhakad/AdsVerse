
import type {Metadata} from 'next';
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FloatingActionButton } from '@/components/layout/floating-action-button';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair-display' });

export const metadata: Metadata = {
  title: 'AdsVerse',
  description: 'Elevating Brands with Innovative Digital Marketing Solutions.',
  icons: {
    icon: 'https://github.com/HSDmarketing/Adsverse.image/blob/main/adsverse.png?raw=true',
    apple: 'https://github.com/HSDmarketing/Adsverse.image/blob/main/adsverse.png?raw=true',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfairDisplay.variable} antialiased font-body`}>
        <div className="relative flex flex-col min-h-screen">
          <div className="absolute top-0 left-0 w-full h-full -z-50 overflow-hidden">
            <div className="stars stars-sm"></div>
            <div className="stars stars-md"></div>
            <div className="stars stars-lg"></div>
          </div>
          <Header />
          <main className="flex-grow">{children}</main>
          <FloatingActionButton />
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
