"use client";

import Script from "next/script";

export function ScriptOptimizer() {
  const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1462002154504108";

  return (
    <>
      {/* Google Tag Manager — full initialization snippet */}
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M6GV59XL');
          `
        }}
      />

    </>
  );
}
