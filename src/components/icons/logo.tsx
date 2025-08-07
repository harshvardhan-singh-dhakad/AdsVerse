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
      <title>DigitalFlow Logo</title>
      <defs>
        <linearGradient id="flowGradient" x1="4" y1="28" x2="28" y2="4">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      {/* Abstract 'D' shape */}
      <path 
        d="M8 28C4 28 4 28 4 24V8C4 4 4 4 8 4H12V28H8Z"
        fill="url(#flowGradient)" 
      />
      {/* Abstract 'F' shape / Flow element */}
      <path 
        d="M16 12H28V16H16V12Z" 
        fill="hsl(var(--primary))"
      />
      <path 
        d="M16 4H24V8H16V4Z"
        fill="hsl(var(--primary))"
      />
    </svg>
  );
}
