"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = (scrollY / scrollHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed top-16 left-0 h-[3px] bg-primary z-50 pointer-events-none"
      style={{ 
        width: `${scrollProgress}%`,
        transition: "width 0.1s linear"
      }}
    />
  );
}
