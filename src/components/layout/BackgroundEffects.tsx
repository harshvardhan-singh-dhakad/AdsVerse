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
  // Services pages already render this exact gradient in their hero CSS.
  // Avoid rendering a second copy on those routes.
  const isServicesPage = pathname === "/services" || pathname === "/our-services";

  if (isAdminRoute) return null;

  return (
    <>
      {!isServicesPage && (
        <>
          <style>{`
            /* Match the Services hero's existing ambient orange/purple gradient
               on other public pages without changing the moving glow or stars. */
            .services-ambient-glow {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 800px;
              max-height: 100vh;
              pointer-events: none;
              z-index: -21;
              background:
                radial-gradient(ellipse 80% 55% at 50% -5%, rgba(249,115,22,.18) 0%, transparent 60%),
                radial-gradient(ellipse 50% 40% at 80% 80%, rgba(139,92,246,.1) 0%, transparent 55%);
              transform: translate3d(0, 0, 0);
            }
          `}</style>
          <div className="services-ambient-glow" aria-hidden="true" role="presentation" />
        </>
      )}
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
    </>
  );
}
