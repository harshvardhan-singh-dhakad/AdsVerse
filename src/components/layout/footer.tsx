
"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";

export function Footer() {
  const params = useParams();
  const lang = params?.lang || 'en';
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setMounted(true);
  }, []);

  const darkLogo = "/images/logo-white.png";
  const lightLogo = "/images/logo-black.png";
  
  const currentLogo = mounted && (theme === 'light' || resolvedTheme === 'light') ? lightLogo : darkLogo;

  return (
    <footer className="bg-card/50 border-t border-border/40">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-6">
            <Link href={`/${lang}`} className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000" />
                <span className="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  AdsVerse
                </span>
              </div>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              AdsVerse is a forward-thinking digital marketing agency specializing in AI-powered growth strategies.
            </p>
            <div className="flex space-x-4">
              <Link href="https://x.com/Adsverse1?t=vG0NYqyjhKobVoztl4xIPw&s=09" aria-label="Twitter" target="_blank" rel="noopener noreferrer nofollow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-muted-foreground hover:text-primary">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/company/dmafia/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer nofollow">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://github.com/harshvardhan-singh-dhakad" aria-label="GitHub" target="_blank" rel="noopener noreferrer nofollow">
                <Github className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
          <div className="md:pl-4">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href={`/${lang}/about`} className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href={`/${lang}/our-services`} className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href={`/${lang}/portfolio`} className="text-sm text-muted-foreground hover:text-primary">Portfolio</Link></li>
              <li><Link href={`/${lang}/blog`} className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href={`/${lang}/pricing`} className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
              <li><Link href={`/${lang}/contact`} className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div className="md:pl-4">
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href={`/${lang}/privacy-policy`} className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href={`/${lang}/terms-of-service`} className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-2">Stay updated with our latest insights.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p className="text-xs text-muted-foreground opacity-70">
            &copy; {new Date().getFullYear()} AdsVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
