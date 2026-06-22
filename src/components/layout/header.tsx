
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
import Image from "next/image";

const ChevronDown = () => (
  <svg
    className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:rotate-180 text-muted-foreground/80 group-hover:text-primary shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
  </svg>
);

type NavLink = {
  href: string;
  label: string;
};

type LatestPost = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  category: string;
};

type HeaderProps = {
  navLinks: NavLink[];
  latestPosts?: LatestPost[];
};

export function Header({ navLinks, latestPosts = [] }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSection(null);
  };

  const isAdminPath = pathname?.includes('/admin');

  if (isAdminPath) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto relative flex h-16 items-center justify-between px-4 sm:px-8">
        
        {/* Left: Brand/Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-1" aria-label="AdsVerse Home">
            <AdsVerseLogo size="text-xl sm:text-2xl" />
            <span className="text-brand-orange font-bold text-2xl leading-none animate-pulse">•</span>
          </Link>
        </div>

        {/* Center: Desktop navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-6 items-center">
          {navLinks.map(({ href, label }) => {
            if (label === "Services") {
              return (
                <div key={href} className="group relative py-3">
                  <Link
                    href={href}
                    prefetch={false}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary flex items-center text-slate-700 dark:text-slate-300",
                      pathname === href || pathname?.startsWith("/services")
                        ? "text-primary font-bold"
                        : ""
                    )}
                  >
                    {label}
                    <ChevronDown />
                  </Link>
                  
                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[760px] lg:w-[860px] bg-background/95 dark:bg-slate-900/95 backdrop-blur-md border border-border/40 shadow-2xl rounded-2xl p-6 transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto z-50">
                    <div className="grid grid-cols-12 gap-6">
                      {/* Left: General Info */}
                      <div className="col-span-4 bg-muted/40 dark:bg-muted/10 rounded-xl p-5 border border-border/20 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-extrabold font-headline text-primary mb-2">AdsVerse Growth Solutions</h4>
                          <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
                            We build premium high-speed Next.js platforms and design automated lead funnels using WhatsApp AI bots and n8n workflows.
                          </p>
                        </div>
                        <Button asChild size="sm" className="bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold rounded-lg border-none shadow-md shadow-orange-600/10 hover:shadow-orange-500/20 text-xs px-3 py-1.5 h-8">
                          <Link href="/contact">Schedule Consultation &rarr;</Link>
                        </Button>
                      </div>

                      {/* Right: 3 Columns Grid */}
                      <div className="col-span-8 grid grid-cols-3 gap-6 pl-4 text-left">
                        {/* Traffic & SEO */}
                        <div className="space-y-4">
                          <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500">Traffic & SEO</h5>
                          <ul className="space-y-3">
                            <li>
                              <Link href="/services/seo-optimization" className="group/item block">
                                <span className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors block">SEO Optimization</span>
                                <span className="text-[10px] text-muted-foreground leading-tight block">Rank #1 on Google search engine.</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/services/geo-optimization" className="group/item block">
                                <span className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors block">GEO & AI Search</span>
                                <span className="text-[10px] text-muted-foreground leading-tight block">Appear in ChatGPT and Gemini replies.</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/services/content-marketing" className="group/item block">
                                <span className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors block">Content Strategy</span>
                                <span className="text-[10px] text-muted-foreground leading-tight block">High-authority copy and blogs.</span>
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Paid Ads & Campaigns */}
                        <div className="space-y-4">
                          <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500">Paid Campaigns</h5>
                          <ul className="space-y-3">
                            <li>
                              <Link href="/services/paid-ads" className="group/item block">
                                <span className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors block">Meta & Google Ads</span>
                                <span className="text-[10px] text-muted-foreground leading-tight block">High-ROAS lead generation ads.</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/services/social-media-management" className="group/item block">
                                <span className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors block">Social Media Growth</span>
                                <span className="text-[10px] text-muted-foreground leading-tight block">Consistent account updates.</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/services/lead-generation" className="group/item block">
                                <span className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors block">Lead Funnels</span>
                                <span className="text-[10px] text-muted-foreground leading-tight block">High-intent client acquisition.</span>
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Tech & Automation */}
                        <div className="space-y-4">
                          <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500">Tech & Automation</h5>
                          <ul className="space-y-3">
                            <li>
                              <Link href="/services/whatsapp-bot" className="group/item block">
                                <span className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors block">WhatsApp AI Bots</span>
                                <span className="text-[10px] text-muted-foreground leading-tight block">Gemini-powered chat assistants.</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/services/automation-tools" className="group/item block">
                                <span className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors block">n8n CRM Sync</span>
                                <span className="text-[10px] text-muted-foreground leading-tight block">Eliminate B2B manual data entry.</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/services/web-design-development" className="group/item block">
                                <span className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors block">Web Design & Dev</span>
                                <span className="text-[10px] text-muted-foreground leading-tight block">Sub-second load Next.js sites.</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (label === "Blog") {
              const blogCategories = [
                { id: 'paid-ads', label: 'Paid Ads' },
                { id: 'seo', label: 'SEO Optimization' },
                { id: 'web-development', label: 'Web Development' },
                { id: 'automation-ai', label: 'Automation & AI' },
                { id: 'content-marketing', label: 'Content Marketing' },
                { id: 'social-media', label: 'Social Media' },
                { id: 'whatsapp-marketing', label: 'WhatsApp Marketing' },
                { id: 'local-seo', label: 'Local SEO' },
                { id: 'case-studies', label: 'Case Studies' },
                { id: 'tutorials', label: 'Tutorials' },
                { id: 'industry-news', label: 'Industry News' },
              ];

              const fallbackPosts = [
                {
                  id: "fallback-1",
                  title: "Demystifying SEO: A Beginner's Guide to Google Rankings",
                  slug: "demystifying-seo",
                  imageUrl: "/images/blog/seo-guide.png",
                  category: "seo"
                },
                {
                  id: "fallback-2",
                  title: "Best Automation Tools for Business Growth in 2026",
                  slug: "best-automation-tools-for-business",
                  imageUrl: "/images/blog/automation-tools.png",
                  category: "automation-ai"
                }
              ];

              const displayPosts = latestPosts && latestPosts.length >= 2 ? latestPosts.slice(0, 2) : fallbackPosts;

              return (
                <div key={href} className="group relative py-3">
                  <Link
                    href={href}
                    prefetch={false}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary flex items-center text-slate-700 dark:text-slate-300",
                      pathname === href || pathname?.startsWith("/blog")
                        ? "text-primary font-bold"
                        : ""
                    )}
                  >
                    {label}
                    <ChevronDown />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[720px] lg:w-[820px] bg-background/95 dark:bg-slate-900/95 backdrop-blur-md border border-border/40 shadow-2xl rounded-2xl p-6 transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto z-50">
                    <div className="grid grid-cols-12 gap-6">
                      {/* Left: Blog Categories */}
                      <div className="col-span-5 border-r border-border/20 pr-6 space-y-3 text-left">
                        <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500">Categories</h5>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                          {blogCategories.map((cat) => (
                            <li key={cat.id}>
                              <Link href={`/blog?category=${cat.id}`} className="text-xs text-foreground hover:text-primary font-semibold flex items-center transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 opacity-50" />
                                {cat.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Featured Articles */}
                      <div className="col-span-7 pl-4 space-y-4 text-left">
                        <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500">Featured Insights</h5>
                        <div className="grid grid-cols-2 gap-4">
                          {displayPosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group/card block bg-muted/20 dark:bg-muted/10 rounded-xl border border-border/25 overflow-hidden hover:border-orange-500/30 transition-all">
                              <div className="relative h-24 w-full bg-muted">
                                <Image
                                  src={post.imageUrl}
                                  alt={post.title}
                                  fill
                                  sizes="(max-width: 768px) 100px, 200px"
                                  className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                                />
                              </div>
                              <div className="p-3 space-y-1">
                                <span className="text-[9px] uppercase tracking-wider font-bold text-orange-500 block">
                                  {blogCategories.find(c => c.id === post.category)?.label || "Insight"}
                                </span>
                                <span className="text-xs font-bold text-foreground leading-snug block line-clamp-2 group-hover/card:text-primary transition-colors capitalize">
                                  {post.title}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (label === "Locations") {
              return (
                <div key={href} className="group relative py-3">
                  <Link
                    href={href}
                    prefetch={false}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary flex items-center text-slate-700 dark:text-slate-300",
                      pathname === href || pathname?.startsWith("/locations")
                        ? "text-primary font-bold"
                        : ""
                    )}
                  >
                    {label}
                    <ChevronDown />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[720px] lg:w-[820px] bg-background/95 dark:bg-slate-900/95 backdrop-blur-md border border-border/40 shadow-2xl rounded-2xl p-6 transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto z-50">
                    <div className="grid grid-cols-12 gap-6">
                      {/* Left Side */}
                      <div className="col-span-4 bg-muted/40 dark:bg-muted/10 rounded-xl p-5 border border-border/20 flex flex-col justify-between text-left">
                        <div>
                          <h4 className="text-sm font-extrabold font-headline text-primary mb-2">Scale Locally</h4>
                          <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
                            We help businesses rank #1 for local searches across major regional growth hubs in India.
                          </p>
                        </div>
                        <Button asChild size="sm" variant="outline" className="border-border/60 hover:border-orange-500/30 text-foreground hover:text-orange-500 hover:bg-orange-500/5 font-bold rounded-lg text-xs px-3 h-8">
                          <Link href="/locations">View All 37+ Cities &rarr;</Link>
                        </Button>
                      </div>

                      {/* Right Side: regional columns */}
                      <div className="col-span-8 grid grid-cols-3 gap-6 pl-4 text-left">
                        {/* Madhya Pradesh */}
                        <div className="space-y-3">
                          <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500">Madhya Pradesh</h5>
                          <ul className="space-y-2 text-xs font-semibold">
                            <li><Link href="/locations/indore" className="text-muted-foreground hover:text-primary transition-colors">Indore</Link></li>
                            <li><Link href="/locations/bhopal" className="text-muted-foreground hover:text-primary transition-colors">Bhopal</Link></li>
                            <li><Link href="/locations/jabalpur" className="text-muted-foreground hover:text-primary transition-colors">Jabalpur</Link></li>
                            <li><Link href="/locations/gwalior" className="text-muted-foreground hover:text-primary transition-colors">Gwalior</Link></li>
                            <li><Link href="/locations/ujjain" className="text-muted-foreground hover:text-primary transition-colors">Ujjain</Link></li>
                          </ul>
                        </div>

                        {/* Rajasthan */}
                        <div className="space-y-3">
                          <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500">Rajasthan</h5>
                          <ul className="space-y-2 text-xs font-semibold">
                            <li><Link href="/locations/jaipur" className="text-muted-foreground hover:text-primary transition-colors">Jaipur</Link></li>
                            <li><Link href="/locations/jodhpur" className="text-muted-foreground hover:text-primary transition-colors">Jodhpur</Link></li>
                            <li><Link href="/locations/udaipur" className="text-muted-foreground hover:text-primary transition-colors">Udaipur</Link></li>
                            <li><Link href="/locations/kota" className="text-muted-foreground hover:text-primary transition-colors">Kota</Link></li>
                          </ul>
                        </div>

                        {/* Metros & Hubs */}
                        <div className="space-y-3">
                          <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500">Major Cities</h5>
                          <ul className="space-y-2 text-xs font-semibold">
                            <li><Link href="/locations/noida" className="text-muted-foreground hover:text-primary transition-colors">Noida (NCR)</Link></li>
                            <li><Link href="/locations/lucknow" className="text-muted-foreground hover:text-primary transition-colors">Lucknow</Link></li>
                            <li><Link href="/locations/patna" className="text-muted-foreground hover:text-primary transition-colors">Patna</Link></li>
                            <li><Link href="/locations/kochi" className="text-muted-foreground hover:text-primary transition-colors">Kochi</Link></li>
                            <li><Link href="/locations/coimbatore" className="text-muted-foreground hover:text-primary transition-colors">Coimbatore</Link></li>
                            <li><Link href="/locations/visakhapatnam" className="text-muted-foreground hover:text-primary transition-colors">Vizag</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
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
            );
          })}
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
            <Sheet open={isMobileMenuOpen} onOpenChange={(open) => {
              setIsMobileMenuOpen(open);
              if (!open) setOpenMobileSection(null);
            }}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Menu className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] border-r border-border bg-background/95 backdrop-blur-md">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <div className="flex flex-col h-full justify-between pb-6">
                  <div className="flex flex-col h-[calc(100vh-140px)]">
                    <div className="border-b border-border/40 pb-4 shrink-0">
                      <Link href="/" className="flex items-center space-x-1" onClick={closeMobileMenu} aria-label="AdsVerse Home">
                        <AdsVerseLogo size="text-2xl" />
                        <span className="text-brand-orange font-bold text-2xl leading-none">•</span>
                      </Link>
                    </div>
                    <nav aria-label="Mobile Navigation" className="flex flex-col gap-4 mt-6 overflow-y-auto pr-2 pb-6">
                      {navLinks.map(({ href, label }) => {
                        const hasDropdown = ["Services", "Blog", "Locations"].includes(label);
                        const isExpanded = openMobileSection === label;

                        if (hasDropdown) {
                          return (
                            <div key={href} className="flex flex-col shrink-0">
                              <button
                                onClick={() => setOpenMobileSection(isExpanded ? null : label)}
                                className={cn(
                                  "text-lg font-semibold transition-colors hover:text-primary flex items-center justify-between py-1 text-left w-full",
                                  pathname?.startsWith(href) ? "text-primary" : "text-foreground"
                                )}
                              >
                                <span>{label}</span>
                                <svg
                                  className={cn(
                                    "w-4 h-4 transition-transform duration-200 text-muted-foreground",
                                    isExpanded ? "rotate-180 text-primary" : ""
                                  )}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              
                              <div
                                className={cn(
                                  "grid transition-all duration-300 ease-in-out pl-4 border-l border-border/60 mt-1 space-y-3",
                                  isExpanded ? "grid-rows-[1fr] opacity-100 py-2" : "grid-rows-[0fr] opacity-0 pointer-events-none h-0 overflow-hidden"
                                )}
                              >
                                <div className="overflow-hidden space-y-3.5">
                                  {label === "Services" && (
                                    <>
                                      <Link
                                        href="/our-services"
                                        onClick={closeMobileMenu}
                                        className="text-xs font-bold text-orange-500 hover:text-primary transition-colors block"
                                      >
                                        All Services &rarr;
                                      </Link>
                                      
                                      {/* Traffic & SEO */}
                                      <div className="space-y-1.5">
                                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500/70">Traffic & SEO</div>
                                        <div className="flex flex-col gap-1.5 pl-1">
                                          <Link href="/services/seo-optimization" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">SEO Optimization</Link>
                                          <Link href="/services/geo-optimization" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">GEO & AI Search</Link>
                                          <Link href="/services/content-marketing" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Content Strategy</Link>
                                        </div>
                                      </div>

                                      {/* Paid Campaigns */}
                                      <div className="space-y-1.5">
                                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500/70">Paid Campaigns</div>
                                        <div className="flex flex-col gap-1.5 pl-1">
                                          <Link href="/services/paid-ads" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Meta & Google Ads</Link>
                                          <Link href="/services/social-media-management" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Social Media Growth</Link>
                                          <Link href="/services/lead-generation" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Lead Funnels</Link>
                                        </div>
                                      </div>

                                      {/* Tech & Automation */}
                                      <div className="space-y-1.5">
                                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500/70">Tech & Automation</div>
                                        <div className="flex flex-col gap-1.5 pl-1">
                                          <Link href="/services/whatsapp-bot" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">WhatsApp AI Bots</Link>
                                          <Link href="/services/automation-tools" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">n8n CRM Sync</Link>
                                          <Link href="/services/web-design-development" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Web Design & Dev</Link>
                                        </div>
                                      </div>
                                    </>
                                  )}

                                  {label === "Blog" && (
                                    <>
                                      <Link
                                        href="/blog"
                                        onClick={closeMobileMenu}
                                        className="text-xs font-bold text-orange-500 hover:text-primary transition-colors block"
                                      >
                                        All Blog Posts &rarr;
                                      </Link>
                                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500/70 mb-1">Categories</div>
                                      <div className="grid grid-cols-2 gap-x-2 gap-y-2 pl-1">
                                        {[
                                          { id: 'paid-ads', label: 'Paid Ads' },
                                          { id: 'seo', label: 'SEO' },
                                          { id: 'web-development', label: 'Web Dev' },
                                          { id: 'automation-ai', label: 'Automation & AI' },
                                          { id: 'content-marketing', label: 'Content' },
                                          { id: 'social-media', label: 'Social Media' },
                                          { id: 'whatsapp-marketing', label: 'WhatsApp' },
                                          { id: 'local-seo', label: 'Local SEO' },
                                          { id: 'case-studies', label: 'Case Studies' },
                                          { id: 'tutorials', label: 'Tutorials' },
                                          { id: 'industry-news', label: 'News' },
                                        ].map((cat) => (
                                          <Link
                                            key={cat.id}
                                            href={`/blog?category=${cat.id}`}
                                            onClick={closeMobileMenu}
                                            className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors truncate"
                                          >
                                            • {cat.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </>
                                  )}

                                  {label === "Locations" && (
                                    <>
                                      <Link
                                        href="/locations"
                                        onClick={closeMobileMenu}
                                        className="text-xs font-bold text-orange-500 hover:text-primary transition-colors block"
                                      >
                                        View All 37+ Cities &rarr;
                                      </Link>
                                      
                                      {/* Madhya Pradesh */}
                                      <div className="space-y-1.5">
                                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500/70">Madhya Pradesh</div>
                                        <div className="grid grid-cols-2 gap-1.5 pl-1">
                                          <Link href="/locations/indore" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Indore</Link>
                                          <Link href="/locations/bhopal" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Bhopal</Link>
                                          <Link href="/locations/jabalpur" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Jabalpur</Link>
                                          <Link href="/locations/gwalior" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Gwalior</Link>
                                          <Link href="/locations/ujjain" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Ujjain</Link>
                                        </div>
                                      </div>

                                      {/* Rajasthan */}
                                      <div className="space-y-1.5">
                                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500/70">Rajasthan</div>
                                        <div className="grid grid-cols-2 gap-1.5 pl-1">
                                          <Link href="/locations/jaipur" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Jaipur</Link>
                                          <Link href="/locations/jodhpur" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Jodhpur</Link>
                                          <Link href="/locations/udaipur" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Udaipur</Link>
                                          <Link href="/locations/kota" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Kota</Link>
                                        </div>
                                      </div>

                                      {/* Major Cities */}
                                      <div className="space-y-1.5">
                                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500/70">Major Cities</div>
                                        <div className="grid grid-cols-2 gap-1.5 pl-1">
                                          <Link href="/locations/noida" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Noida</Link>
                                          <Link href="/locations/lucknow" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Lucknow</Link>
                                          <Link href="/locations/patna" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Patna</Link>
                                          <Link href="/locations/kochi" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Kochi</Link>
                                          <Link href="/locations/coimbatore" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Coimbatore</Link>
                                          <Link href="/locations/visakhapatnam" onClick={closeMobileMenu} className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Vizag</Link>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={href}
                            href={href}
                            prefetch={false}
                            onClick={closeMobileMenu}
                            className={cn(
                              "text-lg font-semibold transition-colors hover:text-primary py-1 shrink-0",
                              pathname === href ? "text-primary" : "text-foreground"
                            )}
                          >
                            {label}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                  <div className="mt-auto border-t border-border/40 pt-6 shrink-0">
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
