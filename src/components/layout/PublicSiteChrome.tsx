"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { BrandSettings } from "@/lib/brand-defaults";

type NavItem = { href: string; label: string };

const Header = dynamic(() => import("./header").then((module) => module.Header));
const Footer = dynamic(() => import("./footer").then((module) => module.Footer));
const BackgroundEffects = dynamic(() => import("./BackgroundEffects").then((module) => module.BackgroundEffects));
const FloatingActionButton = dynamic(() => import("./floating-action-button").then((module) => module.FloatingActionButton));
const ScriptOptimizer = dynamic(() => import("./ScriptOptimizer").then((module) => module.ScriptOptimizer));
const WebMCPProvider = dynamic(() => import("@/components/webmcp/WebMCPProvider"), { ssr: false });

type PublicSiteChromeProps = {
  navLinks: NavItem[];
  brand: BrandSettings;
  children: ReactNode;
};

/**
 * Keep public-facing chrome out of the admin route's client bundle.
 * On public routes the header/footer and enhancements keep their existing layout.
 */
export function PublicSiteChrome({ navLinks, brand, children }: PublicSiteChromeProps) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");

  if (isAdminPath) {
    return <>{children}</>;
  }

  return (
    <>
      <BackgroundEffects />
      <ScriptOptimizer />
      <Header navLinks={navLinks} latestPosts={[]} brand={brand} />
      {children}
      <Footer brand={brand} />
      <FloatingActionButton />
      <WebMCPProvider />
    </>
  );
}
