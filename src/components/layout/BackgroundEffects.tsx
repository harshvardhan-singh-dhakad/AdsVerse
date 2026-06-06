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
  
  // Disable background effects on admin and utility routes
  const isAdminRoute = pathname?.includes("/admin") || pathname?.includes("/get-id");

  if (isAdminRoute) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-full -z-20 overflow-hidden pointer-events-none hidden dark:block",
        isLoaded && "ready-to-animate"
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
