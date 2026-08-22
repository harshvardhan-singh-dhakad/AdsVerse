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

      const gtmScript = document.createElement("script");
      gtmScript.async = true;
      gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-M6GV59XL";
      document.head.appendChild(gtmScript);

      // Initialize Microsoft Clarity
      (function(c:any,l:any,a:any,r:any,i:any,t:any,y:any){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(win, document, "clarity", "script", "y4qtz4v0br");
    };

    // Add event listeners for user interaction
    window.addEventListener("mousemove", initGTM, { passive: true });
    window.addEventListener("scroll", initGTM, { passive: true });
    window.addEventListener("touchstart", initGTM, { passive: true });
    window.addEventListener("keydown", initGTM, { passive: true });

    // Fallback: load after 8 seconds if no interaction
    const timeout = setTimeout(initGTM, 8000);

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
