"use client";

import { useEffect, useRef } from "react";

export function ReadingProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const scrollHeight = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const progress =
          scrollHeight > 0
            ? Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100))
            : 0;

        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress / 100})`;
        }
      });
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-16 left-0 h-[3px] w-full bg-primary z-50 pointer-events-none origin-left transform-gpu"
      aria-hidden="true"
    />
  );
}
