
import type {Metadata} from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FloatingActionButton } from '@/components/layout/floating-action-button';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'DigitalFlow',
  description: 'Elevating Brands with Innovative Digital Marketing Solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
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
