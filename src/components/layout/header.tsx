
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import AdsVerseLogo from "@/components/AdsVerseLogo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

type NavLink = {
  href: string;
  label: string;
};

type HeaderProps = {
  navLinks: NavLink[];
};

export function Header({ navLinks }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isAdminPath = pathname?.includes('/admin');

  if (isAdminPath) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 items-center justify-between px-4 sm:px-8">
        
        {/* Left: Brand/Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-1">
            <AdsVerseLogo size="text-xl sm:text-2xl" />
            <span className="text-brand-orange font-bold text-2xl leading-none animate-pulse">•</span>
          </Link>
        </div>

        {/* Center: Desktop navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-8 items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              prefetch={false}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1 text-slate-700 dark:text-slate-300",
                pathname === href 
                  ? "text-primary font-bold after:absolute after:-bottom-[6px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full" 
                  : "hover:text-primary dark:hover:text-primary"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: Desktop CTA + Toggle + Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button asChild size="sm" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold rounded-xl px-5 py-2.5 h-10 shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all flex items-center gap-1.5 border-none">
              <Link href="/tools/seo-audit" prefetch={false}>
                Free Audit <span className="text-sm font-semibold">&rarr;</span>
              </Link>
            </Button>
          </div>
          
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Menu className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] border-r border-border bg-background/95 backdrop-blur-md">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <div className="flex flex-col h-full justify-between pb-6">
                  <div>
                    <div className="border-b border-border/40 pb-4">
                      <Link href="/" className="flex items-center space-x-1" onClick={closeMobileMenu}>
                        <AdsVerseLogo size="text-2xl" />
                        <span className="text-brand-orange font-bold text-2xl leading-none">•</span>
                      </Link>
                    </div>
                    <nav aria-label="Mobile Navigation" className="flex flex-col gap-4 mt-6">
                      {navLinks.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          prefetch={false}
                          onClick={closeMobileMenu}
                          className={cn(
                            "text-lg font-semibold transition-colors hover:text-primary",
                            pathname === href ? "text-primary" : "text-foreground"
                          )}
                        >
                          {label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="mt-auto border-t border-border/40 pt-6">
                    <Button asChild className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold rounded-xl py-3 shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all justify-center border-none">
                      <Link href="/tools/seo-audit" prefetch={false} onClick={closeMobileMenu}>
                        Free Audit &rarr;
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  );
}
