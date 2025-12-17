import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-accent"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2,38 L2,10 L46,10 L46,38 L2,38 Z" stroke="hsl(var(--primary))" fill="none" />
        <path d="M10 24 L24 24 L22 22 M24 24 L22 26" fill="none" />
        <path d="M14,21 L14,27 L10,24 Z" fill="hsl(var(--primary))" stroke="none" />
        <circle cx="32" cy="24" r="5" fill="none" />
        <path d="M32,19 L32,29 M27,24 L37,24 M28.5 28.5 L35.5 20.5 M28.5 20.5 L35.5 28.5" fill="none" />
      </svg>
      <span className="font-logo font-bold text-xl tracking-tight" style={{ color: '#1C3F5E' }}>.merlo</span>
    </div>
  );
}
