"use client";

import Script from "next/script";

export function ScriptOptimizer() {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        src="https://www.googletagmanager.com/gtm.js?id=GTM-M6GV59XL"
        strategy="lazyOnload"
      />
    </>
  );
}
