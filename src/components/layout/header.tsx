
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "next-themes";

type NavLink = {
  href: string;
  label: string;
};

type HeaderProps = {
  navLinks: NavLink[];
  lang: string;
};

export function Header({ navLinks, lang }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const getLangPath = (href: string) => `/${lang}${href === '/' ? '' : href}`;

  const darkLogo = "https://github.com/HSDmarketing/Adsverse.image/blob/main/adsverse.png?raw=true";
  const lightLogo = "https://github.com/harshvardhan-singh-dhakad/image/blob/main/white%20logo%20of%20adsverse.png?raw=true";
  
  const currentLogo = mounted && (theme === 'light' || resolvedTheme === 'light') ? lightLogo : darkLogo;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href={getLangPath('/')} className="mr-6 flex items-center space-x-2">
           <Image 
              src={currentLogo}
              alt="AdsVerse Logo"
              width={120}
              height={30}
              className="h-8 w-auto"
              key={currentLogo}
            />
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={getLangPath(href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === getLangPath(href) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            ))}
             <ThemeToggle />
          </nav>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="border-b pb-4">
                    <Link href={getLangPath('/')} className="flex items-center space-x-2">
                       <Image 
                          src={currentLogo}
                          alt="AdsVerse Logo"
                          width={120}
                          height={30}
                          className="h-8 w-auto"
                          key={currentLogo + 'mobile'}
                        />
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-4 mt-6">
                    {navLinks.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={getLangPath(href)}
                        onClick={closeMobileMenu}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === getLangPath(href) ? "text-primary" : "text-foreground"
                        )}
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
