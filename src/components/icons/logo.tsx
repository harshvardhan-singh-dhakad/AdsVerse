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
      <title>PixelCraft Digital New Logo</title>
      {/* Comet Head */}
      <path 
        d="M15 4L9 10L15 16L21 10L15 4Z" 
        fill="hsl(var(--primary))" 
      />
      {/* Comet Tail */}
      <path 
        d="M21 10L15 16L21 22" 
        stroke="hsl(var(--accent))" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M15 16L9 22L15 28" 
        stroke="hsl(var(--primary))" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
