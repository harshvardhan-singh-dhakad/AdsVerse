"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export function BackgroundEffects() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  
  // Disable background effects on admin and utility routes or in light mode
  const isAdminRoute = pathname?.includes("/admin") || pathname?.includes("/get-id");

  if (isAdminRoute || resolvedTheme === "light") return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
      <div className="glow-effect"></div>
      <div className="stars stars-sm"></div>
      <div className="stars stars-md"></div>
      <div className="stars stars-lg"></div>
    </div>
  );
}
