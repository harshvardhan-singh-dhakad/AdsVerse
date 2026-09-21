"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BackgroundEffects() {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Defer animations to keep main thread free during critical page rendering
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Keep global background visuals, but disable their continuous animation on
  // blog pages because long HTML articles are much more sensitive to paint/layout
  // work during browser zoom and resize.
  const isAdminRoute = pathname?.includes("/admin") || pathname?.includes("/get-id");
  const isBlogRoute = pathname === "/blog" || pathname?.startsWith("/blog/");

  if (isAdminRoute) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-full -z-20 overflow-hidden pointer-events-none hidden dark:block",
        isBlogRoute && "blog-static-effects",
        isLoaded && !isBlogRoute && "ready-to-animate"
      )}
      aria-hidden="true"
      role="presentation"
    >
      <div className="glow-effect"></div>
      <div className="stars stars-sm"></div>
      <div className="stars stars-md"></div>
      <div className="stars stars-lg"></div>
    </div>
  );
}
