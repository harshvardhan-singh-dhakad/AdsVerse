"use client";

import { useEffect } from "react";

export function ScriptOptimizer() {
  useEffect(() => {
    let initialized = false;

    const initScripts = () => {
      if (initialized) return;
      initialized = true;

      // Remove event listeners
      window.removeEventListener("mousemove", initScripts);
      window.removeEventListener("scroll", initScripts);
      window.removeEventListener("touchstart", initScripts);
      window.removeEventListener("keydown", initScripts);

      // Initialize GTM dataLayer and load GTM script
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js"
      });

      const gtmScript = document.createElement("script");
      gtmScript.async = true;
      gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-M6GV59XL";
      document.head.appendChild(gtmScript);

      // Initialize Microsoft Clarity
      const clarityScript = document.createElement("script");
      clarityScript.async = true;
      clarityScript.src = "https://www.clarity.ms/tag/y4qtz4v0br?ref=bwt";
      document.head.appendChild(clarityScript);
    };

    // Add event listeners for user interaction
    window.addEventListener("mousemove", initScripts, { passive: true });
    window.addEventListener("scroll", initScripts, { passive: true });
    window.addEventListener("touchstart", initScripts, { passive: true });
    window.addEventListener("keydown", initScripts, { passive: true });

    // Fallback: load after 8 seconds if no interaction
    const timeout = setTimeout(initScripts, 8000);

    return () => {
      window.removeEventListener("mousemove", initScripts);
      window.removeEventListener("scroll", initScripts);
      window.removeEventListener("touchstart", initScripts);
      window.removeEventListener("keydown", initScripts);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
