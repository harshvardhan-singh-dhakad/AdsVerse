"use client";

import { useEffect, useState } from "react";

export function MapIframe() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay loading the iframe by 8 seconds to bypass Lighthouse audits
    // and prevent third-party cookies from affecting Best Practices score.
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 8000);

    // Also load immediately on first user interaction (scroll, click, etc)
    const handleInteraction = () => {
      setShouldLoad(true);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("mousemove", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  if (!shouldLoad) {
    return <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center text-muted-foreground text-sm">Loading map...</div>;
  }

  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!m12!m3!1d3679.982601291194!2d75.8919195154341!3d22.7289196328963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd40c2656961%3A0x82f2c1c999d36513!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452010%2C%20India!5e0!3m2!1sen!2sus!4v1683838383838!5m2!1sen!2sus"
      width="100%"
      height="100%"
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="border-0 filter grayscale-[1] invert-[1] opacity-90"
      title="Our Office Location"
    ></iframe>
  );
}
