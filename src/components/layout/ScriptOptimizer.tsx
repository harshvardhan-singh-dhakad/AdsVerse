"use client";

import { useEffect } from "react";

export function ScriptOptimizer() {
  useEffect(() => {
    let initialized = false;

    const initGTM = () => {
      if (initialized) return;
      initialized = true;

      // Remove event listeners
      window.removeEventListener("mousemove", initGTM);
      window.removeEventListener("scroll", initGTM);
      window.removeEventListener("touchstart", initGTM);
      window.removeEventListener("keydown", initGTM);

      // Initialize GTM dataLayer and load GTM script
      const win = window as any;
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js"
      });

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-M6GV59XL";
      document.head.appendChild(script);
    };

    // Add event listeners for user interaction
    window.addEventListener("mousemove", initGTM, { passive: true });
    window.addEventListener("scroll", initGTM, { passive: true });
    window.addEventListener("touchstart", initGTM, { passive: true });
    window.addEventListener("keydown", initGTM, { passive: true });

    // Fallback: load after 4 seconds if no interaction
    const timeout = setTimeout(initGTM, 4000);

    return () => {
      window.removeEventListener("mousemove", initGTM);
      window.removeEventListener("scroll", initGTM);
      window.removeEventListener("touchstart", initGTM);
      window.removeEventListener("keydown", initGTM);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
