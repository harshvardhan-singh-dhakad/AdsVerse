"use client";

import { type TransitionEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { MobilePoster } from "@/lib/mobile-posters-types";

type MobilePosterCarouselProps = {
  posters: MobilePoster[];
};

export function MobilePosterCarousel({ posters }: MobilePosterCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(posters.length > 1 ? 1 : 0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const slides = useMemo(
    () => (posters.length > 1 ? [posters[posters.length - 1], ...posters, posters[0]] : posters),
    [posters]
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (posters.length < 2 || paused || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActiveIndex((current) => current + 1);
      }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [posters.length, paused, hovered, focused, reducedMotion]);

  if (posters.length === 0) return null;

  const realIndex = posters.length > 1
    ? (activeIndex === 0 ? posters.length - 1 : activeIndex > posters.length ? 0 : activeIndex - 1)
    : 0;

  const finishLoop = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || reducedMotion) return;

    let resetIndex: number | null = null;
    if (activeIndex === posters.length + 1) resetIndex = 1;
    if (activeIndex === 0 && posters.length > 1) resetIndex = posters.length;
    if (resetIndex === null) return;

    setTransitionEnabled(false);
    setActiveIndex(resetIndex);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setTransitionEnabled(true));
    });
  };

  const goNext = () => {
    setActiveIndex((current) => {
      if (posters.length < 2) return 0;
      if (reducedMotion) return current >= posters.length ? 1 : current + 1;
      if (current > posters.length) return 1;
      return current + 1;
    });
  };

  const goPrevious = () => {
    setActiveIndex((current) => {
      if (posters.length < 2) return 0;
      if (reducedMotion) return current <= 1 ? posters.length : current - 1;
      if (current <= 0) return posters.length;
      return current - 1;
    });
  };

  const currentPoster = posters[realIndex];

  return (
    <section
      aria-label="Featured AdsVerse posters"
      className="w-full px-4 pb-8 md:hidden"
    >
      <div className="mx-auto w-full max-w-md">
        <div
          className="relative overflow-hidden rounded-[1.75rem] border border-border/50 bg-slate-950 shadow-[0_14px_45px_rgba(15,23,42,0.18)]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          <div
            className="flex w-full"
            style={{
              width: (slides.length * 100) + "%",
              transform: "translate3d(-" + (activeIndex * 100 / slides.length) + "%, 0, 0)",
              transition: transitionEnabled && !reducedMotion ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
              willChange: "transform",
            }}
            onTransitionEnd={finishLoop}
            aria-live="off"
          >
            {slides.map((poster, slideIndex) => {
              const isExternal = poster.targetUrl.startsWith("https://");
              const cta = (
                <>
                  <span>{poster.buttonText}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </>
              );

              return (
                <article
                  key={poster.id + "-" + slideIndex}
                  className="relative shrink-0 overflow-hidden"
                  style={{ width: (100 / slides.length) + "%" }}
                  aria-hidden={slideIndex === activeIndex ? undefined : true}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={poster.imageUrl}
                      alt={poster.imageAlt}
                      fill
                      sizes="(max-width: 767px) 100vw, 1px"
                      priority={slideIndex === (posters.length > 1 ? 1 : 0)}
                      draggable={false}
                      className="absolute inset-0 h-full w-full select-none object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
                      {poster.title ? (
                        <p className="mb-3 line-clamp-2 text-lg font-extrabold leading-tight text-white drop-shadow sm:text-xl">
                          {poster.title}
                        </p>
                      ) : null}
                      {isExternal ? (
                        <a
                          href={poster.targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={slideIndex === activeIndex ? 0 : -1}
                          className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition-colors hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                        >
                          {cta}
                        </a>
                      ) : (
                        <Link
                          href={poster.targetUrl}
                          tabIndex={slideIndex === activeIndex ? 0 : -1}
                          className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition-colors hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                        >
                          {cta}
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {posters.length > 1 ? (
            <>
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
                <span className="rounded-full border border-white/20 bg-slate-950/55 px-3 py-1 text-[11px] font-semibold tabular-nums text-white backdrop-blur">
                  {String(realIndex + 1).padStart(2, "0")} / {String(posters.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => setPaused((current) => !current)}
                  className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/55 text-white backdrop-blur transition hover:bg-slate-950/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                  aria-label={paused ? "Resume automatic poster rotation" : "Pause automatic poster rotation"}
                  title={paused ? "Resume rotation" : "Pause rotation"}
                >
                  {paused ? <Play className="h-4 w-4" fill="currentColor" /> : <Pause className="h-4 w-4" />}
                </button>
              </div>
              <div className="absolute inset-y-0 left-2 flex items-center">
                <button
                  type="button"
                  onClick={goPrevious}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white backdrop-blur transition hover:bg-slate-950/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                  aria-label="Previous poster"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-2 flex items-center">
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white backdrop-blur transition hover:bg-slate-950/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                  aria-label="Next poster"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : null}
        </div>
        {posters.length > 1 ? (
          <p className="mt-2 text-center text-[11px] font-medium text-muted-foreground">
            {paused ? "Auto-scroll paused" : reducedMotion ? "Use arrows to browse posters" : "Swipe to explore"}
          </p>
        ) : null}
        <span className="sr-only" aria-live="polite">
          Poster {realIndex + 1} of {posters.length}: {currentPoster?.title}
        </span>
      </div>
    </section>
  );
}
