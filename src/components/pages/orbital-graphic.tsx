"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
      <div className="orbit-outer" aria-hidden="true">
        {/* 1: Google Ads */}
        <div className="node node-outer" style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Image
            src="/images/icons/icons8-google-ads-100.svg"
            alt="Google Ads Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* 2: Meta */}
        <div className="node node-outer" style={{ top: '15%', right: '15%', transform: 'translate(50%, -50%)' }}>
          <Image
            src="/images/icons/icons8-facebook-100.svg"
            alt="Facebook Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* 3: WhatsApp */}
        <div className="node node-outer" style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }}>
          <Image
            src="/images/icons/icons8-whatsapp-100.svg"
            alt="WhatsApp Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* 4: LinkedIn */}
        <div className="node node-outer" style={{ bottom: '15%', right: '15%', transform: 'translate(50%, 50%)' }}>
          <Image
            src="/images/icons/icons8-linkedin-100.svg"
            alt="LinkedIn Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* 5: Firebase Console */}
        <div className="node node-outer" style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}>
          <Image
            src="/images/icons/icons8-google-firebase-console-100.svg"
            alt="Firebase Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* 6: GitHub */}
        <div className="node node-outer" style={{ bottom: '15%', left: '15%', transform: 'translate(-50%, 50%)' }}>
          <Image
            src="/images/icons/icons8-github-100.svg"
            alt="GitHub Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* 7: Instagram */}
        <div className="node node-outer" style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}>
          <Image
            src="/images/icons/icons8-instagram-100.svg"
            alt="Instagram Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* 8: X / Twitter */}
        <div className="node node-outer" style={{ top: '15%', left: '15%', transform: 'translate(-50%, -50%)' }}>
          <Image
            src="/images/icons/icons8-x-100.svg"
            alt="X/Twitter Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
      </div>

      {/* Inner Orbit (4 nodes) */}
      <div className="orbit-inner" aria-hidden="true">
        {/* 1: Chrome */}
        <div className="node node-inner" style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Image
            src="/images/icons/icons8-chrome-100.svg"
            alt="Chrome Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* 2: Telegram */}
        <div className="node node-inner" style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }}>
          <Image
            src="/images/icons/icons8-telegram-app-100.svg"
            alt="Telegram Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* 3: YouTube */}
        <div className="node node-inner" style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}>
          <Image
            src="/images/icons/icons8-youtube-100.svg"
            alt="YouTube Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* 4: Pinterest */}
        <div className="node node-inner" style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}>
          <Image
            src="/images/icons/icons8-pinterest-100.svg"
            alt="Pinterest Icon"
            width={36}
            height={36}
            className="orbit-icon"
            priority={false}
            loading="lazy"
          />
        </div>
      </div>

      {/* Center Core */}
      <Link href="/our-services" aria-label="Multiverse of Marketing: View our services" className="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-56 md:h-56 rounded-full glass-card flex flex-col items-center justify-center border-primary/50 z-10 text-center px-3 sm:px-4 md:px-6 shadow-[0_0_50px_rgba(139,92,246,0.3)] bg-[#0c0f18]/90 backdrop-blur-2xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer">
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2.5 md:h-2.5 bg-brand-orange rounded-full mb-1 sm:mb-2 md:mb-4 shadow-[0_0_15px_#f97316]"></div>
        <span className="font-sans text-[10px] sm:text-sm md:text-2xl leading-tight text-white mb-1 md:mb-2 font-extrabold">Multiverse of Marketing</span>
        <div className="w-6 sm:w-8 md:w-12 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mt-1 md:mt-3"></div>
      </Link>
    </div>
  );
}
