import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="relative flex items-center justify-center" {...props}>
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full text-primary/30"
      >
        {/* Borders */}
        <path d="M15 15V145" stroke="currentColor" strokeWidth="2"/>
        <path d="M15 145H145" stroke="currentColor" strokeWidth="2"/>
        
        {/* Decorative elements from napkin */}
        <path d="M15 30 L10 35 L15 40 Z" fill="currentColor" stroke="none" />
        <path d="M15 50 L10 55 L15 60 Z" fill="currentColor" stroke="none" />
        <path d="M15 70 L10 75 L15 80 Z" fill="currentColor" stroke="none" />
        <path d="M15 90 L10 95 L15 100 Z" fill="currentColor" stroke="none" />
        <path d="M15 110 L10 115 L15 120 Z" fill="currentColor" stroke="none" />

        <path d="M30 145 L35 150 L40 145 Z" fill="currentColor" stroke="none" />
        <path d="M50 145 L55 150 L60 145 Z" fill="currentColor" stroke="none" />
        <path d="M70 145 L75 150 L80 145 Z" fill="currentColor" stroke="none" />
        <path d="M90 145 L95 150 L100 145 Z" fill="currentColor" stroke="none" />
        <path d="M110 145 L115 150 L120 145 Z" fill="currentColor" stroke="none" />

        {/* World Map Sketch */}
        <g stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 2" strokeLinecap="round">
          {/* North & South America */}
          <path d="M60 40 L55 50 L65 60 L70 70 L65 80 L60 90 L75 110 L70 120" />
          {/* Europe, Asia, Africa */}
          <path d="M85 45 L100 40 L115 50 L125 60 L110 70 L100 85 L115 100 L105 115" />
          {/* Australia */}
          <path d="M130 105 L140 110 L135 120 L125 118" />
        </g>
        
        {/* "REC 4K" box */}
        <rect x="95" y="100" width="30" height="15" stroke="currentColor" strokeWidth="1" fill="hsl(var(--background))"/>
        <text x="100" y="111" fill="currentColor" fontSize="8">REC 4K</text>

      </svg>
      <span className="relative font-logo font-bold text-5xl tracking-tight" style={{ color: '#1C3F5E' }}>.merlo</span>
    </div>
  );
}
