import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>AdsVerse Logo</title>
      <defs>
        <linearGradient id="flowGradient" x1="4" y1="28" x2="28" y2="4">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      {/* Abstract 'A' shape */}
      <path 
        d="M8 28L4 16L12 4H20L28 16L24 28H8ZM10 24H22L19 16L16 8L13 16L10 24Z"
        fill="url(#flowGradient)" 
      />
      {/* Abstract 'V' shape */}
      <path 
        d="M12 12L16 20L20 12"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
