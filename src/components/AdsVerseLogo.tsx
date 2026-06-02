"use client";

import { useState, useEffect } from 'react';

interface AdsVerseLogoProps {
  size?: string;
  className?: string;
}

export default function AdsVerseLogo({ size = 'text-5xl', className = '' }: AdsVerseLogoProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Self-contained keyframes for the premium color shifting gradient */}
      {mounted && (
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes color-gradient {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          .anim-gradient {
            background: linear-gradient(
              135deg, 
              #2b7fff 0%, 
              #8b5cf6 40%, 
              #ec4899 60%, 
              #2b7fff 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: color-gradient 4.0s linear infinite;
            display: inline-block;
          }
        `}} />
      )}

      {/* Complete Responsive Logo Container */}
      <span 
        style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
        className={`inline-flex items-center ${size} font-black tracking-[-0.03em] select-none pl-1 ${className}`}
      >
        {/* Dynamic Animated 'Ads' Part */}
        <span className="anim-gradient font-black">Ads</span>
        
        {/* Responsive Light/Dark Theme 'Verse' Part */}
        <span className="text-slate-900 transition-colors duration-300 dark:text-white font-black">
          Verse
        </span>
      </span>
    </>
  );
}
