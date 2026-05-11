"use client";

import Script from "next/script";

export function ScriptOptimizer() {
  const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1462002154504108";

  return (
    <>
      {/* Facebook Pixel Base Script */}
      <Script
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="lazyOnload"
      />
      
      {/* Facebook Pixel Initialization */}
      <Script id="fb-pixel" strategy="lazyOnload">
        {`
          window.fbq = window.fbq || function() {
            (window.fbq.q = window.fbq.q || []).push(arguments);
          };
          fbq('init', '${fbPixelId}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script
        src="https://www.googletagmanager.com/gtm.js?id=GTM-M6GV59XL"
        strategy="lazyOnload"
      />
    </>
  );
}
