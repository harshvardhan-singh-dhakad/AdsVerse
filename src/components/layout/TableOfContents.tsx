'use client';

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface HeadingItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find entries that are intersecting
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort visible entries by bounding top to pick the one closest to the top of viewport
          const sorted = visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(sorted[0].target.id);
        }
      },
      {
        rootMargin: '-100px 0px -70% 0px', // Tracks active heading near the top of viewport
        threshold: 0,
      }
    );

    headingElements.forEach(el => observer.observe(el));

    // Fallback for top of the page scroll position
    const handleScrollFallback = () => {
      if (window.scrollY < 200 && headings.length > 0) {
        setActiveId(headings[0].id);
      }
    };
    window.addEventListener('scroll', handleScrollFallback, { passive: true });

    // Initial check
    handleScrollFallback();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollFallback);
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // Offset to account for the sticky header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 no-scrollbar">
      <h3 className="font-headline text-xs font-bold uppercase tracking-wider text-primary mb-4 select-none">
        Table of Contents
      </h3>
      <ul className="space-y-2.5 border-l border-primary/10">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={cn(
                "block pl-4 py-1.5 text-xs transition-all duration-300 relative border-l -ml-[1px] font-medium leading-relaxed select-none",
                activeId === heading.id
                  ? "text-primary border-accent font-semibold scale-102 translate-x-0.5"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-primary/20"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
