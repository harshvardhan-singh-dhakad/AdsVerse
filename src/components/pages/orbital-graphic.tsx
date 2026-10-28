"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ORBITAL_LOGOS } from "@/components/pages/orbital-logo-data";

export function OrbitalGraphic() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay heavy orbital animations by 800ms to allow LCP first paint to finish instantly
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "w-full md:w-1/2 flex justify-center items-center orbital-container relative h-[450px] md:h-[700px]",
        isLoaded && "ready-to-animate"
      )}
    >
      <div className="absolute inset-0 bg-nebula pointer-events-none" aria-hidden="true"></div>
      
      {/* Outer Orbit (8 nodes) */}
      <div className="orbit-outer">
        {/* 1: Google Ads */}
        <Link 
          href="/services/paid-ads" 
          aria-label="AdsVerse Google Ads Services" 
          className="node node-outer" 
          style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <img
            src={ORBITAL_LOGOS.googleAds}
            alt="Google Ads Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </Link>
        {/* 2: Meta */}
        <Link 
          href="https://www.facebook.com/adsverse.in" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="AdsVerse Facebook Profile" 
          className="node node-outer" 
          style={{ top: '15%', right: '15%', transform: 'translate(50%, -50%)' }}
        >
          <img
            src={ORBITAL_LOGOS.facebook}
            alt="Facebook Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </Link>
        {/* 3: WhatsApp */}
        <Link 
          href="https://wa.me/919685123339" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Chat with AdsVerse on WhatsApp" 
          className="node node-outer" 
          style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }}
        >
          <img
            src={ORBITAL_LOGOS.whatsapp}
            alt="WhatsApp Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </Link>
        {/* 4: LinkedIn */}
        <Link 
          href="https://www.linkedin.com/company/adsverse" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="AdsVerse LinkedIn Profile" 
          className="node node-outer" 
          style={{ bottom: '15%', right: '15%', transform: 'translate(50%, 50%)' }}
        >
          <img
            src={ORBITAL_LOGOS.linkedin}
            alt="LinkedIn Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </Link>
        {/* 5: Firebase Console */}
        <Link 
          href="/services/automation-tools" 
          aria-label="AdsVerse n8n & Firebase Automation Services" 
          className="node node-outer" 
          style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
        >
          <img
            src={ORBITAL_LOGOS.firebase}
            alt="Firebase Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </Link>
        {/* 6: GitHub */}
        <Link 
          href="https://github.com/harshvardhan-singh-dhakad" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="AdsVerse Developer GitHub Profile" 
          className="node node-outer" 
          style={{ bottom: '15%', left: '15%', transform: 'translate(-50%, 50%)' }}
        >
          <img
            src={ORBITAL_LOGOS.github}
            alt="GitHub Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </Link>
        {/* 7: Instagram */}
        <Link 
          href="https://www.instagram.com/adsverse.ai" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="AdsVerse Instagram Profile" 
          className="node node-outer" 
          style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}
        >
          <img
            src={ORBITAL_LOGOS.instagram}
            alt="Instagram Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </Link>
        {/* 8: X / Twitter */}
        <Link 
          href="https://x.com/Adsverse" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="AdsVerse X Profile" 
          className="node node-outer" 
          style={{ top: '15%', left: '15%', transform: 'translate(-50%, -50%)' }}
        >
          <img
            src={ORBITAL_LOGOS.x}
            alt="X/Twitter Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </Link>
      </div>

      {/* Inner Orbit (4 nodes) */}
      <div className="orbit-inner">
        {/* 1: Chrome */}
        <Link 
          href="/services/web-design-development" 
          aria-label="AdsVerse Web Design & Development Services" 
          className="node node-inner" 
          style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <img
            src={ORBITAL_LOGOS.chrome}
            alt="Chrome Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </Link>
        {/* 2: Telegram */}
        <div className="node node-inner" style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }}>
          <img
            src={ORBITAL_LOGOS.telegram}
            alt="Telegram Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* 3: YouTube */}
        <div className="node node-inner" style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}>
          <img
            src={ORBITAL_LOGOS.youtube}
            alt="YouTube Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* 4: Pinterest */}
        <Link 
          href="https://in.pinterest.com/adsverse_in/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="AdsVerse Pinterest Portfolio" 
          className="node node-inner" 
          style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}
        >
          <img
            src={ORBITAL_LOGOS.pinterest}
            alt="Pinterest Icon"
            width={36}
            height={36}
            className="orbit-icon"
            loading="lazy"
            decoding="async"
          />
        </Link>
      </div>

      {/* Center Core */}
      <Link href="/services" aria-label="Multiverse of Marketing: View our services" className="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-56 md:h-56 rounded-full glass-card flex flex-col items-center justify-center border-primary/50 z-10 text-center px-3 sm:px-4 md:px-6 shadow-[0_0_50px_rgba(139,92,246,0.3)] bg-[#0c0f18]/90 backdrop-blur-2xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer">
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2.5 md:h-2.5 bg-brand-orange rounded-full mb-1 sm:mb-2 md:mb-4 shadow-[0_0_15px_#f97316]"></div>
        <span className="font-sans text-[10px] sm:text-sm md:text-2xl leading-tight text-white mb-1 md:mb-2 font-extrabold">Multiverse of Marketing</span>
        <div className="w-6 sm:w-8 md:w-12 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mt-1 md:mt-3"></div>
      </Link>
    </div>
  );
}
