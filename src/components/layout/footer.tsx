
"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  
  const isAdminPath = pathname?.includes('/admin');
  if (isAdminPath) return null;

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setMounted(true);
  }, []);

  const darkLogo = "/images/logo-white.webp";
  const lightLogo = "/images/logo-black.webp";
  
  const currentLogo = mounted && (theme === 'light' || resolvedTheme === 'light') ? lightLogo : darkLogo;

  return (
    <footer className="bg-card/50 border-t border-border/40">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000" />
                <h2 className="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  AdsVerse
                </h2>
              </div>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              We are a forward-thinking digital marketing agency specializing in AI-powered growth strategies.
              <br />
              <span className="text-primary font-semibold">hello@adsverse.in</span>
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.instagram.com/adsverse.ai" aria-label="Instagram" target="_blank" rel="noopener noreferrer nofollow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-muted-foreground hover:text-primary" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="https://www.facebook.com/adsverse.in" aria-label="Facebook" target="_blank" rel="noopener noreferrer nofollow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-muted-foreground hover:text-primary" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.878A10.003 10.003 0 0 0 22 12z"></path>
                </svg>
              </Link>
              <Link href="https://x.com/Adsverse" aria-label="X" target="_blank" rel="noopener noreferrer nofollow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-muted-foreground hover:text-primary" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/company/adsverse" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer nofollow">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="md:pl-4">
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/our-services" className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/portfolio" className="text-sm text-muted-foreground hover:text-primary">Portfolio</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div className="md:pl-4">
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-2">Stay updated with our latest insights.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" aria-label="Email for newsletter subscription" />
              <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90" aria-label="Subscribe to newsletter">
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 pb-28 md:pb-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p className="text-xs text-muted-foreground">
            &copy; {mounted ? currentYear : ''} AdsVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
