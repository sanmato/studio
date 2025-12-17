import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="relative flex items-center justify-center w-[80px] h-[80px]" {...props}>
      <Image
        src="/napkin-bg.png"
        alt="Napkin drawing background"
        width={80}
        height={80}
        className="absolute inset-0 object-contain opacity-70"
      />
      <span className="relative font-logo font-bold text-2xl tracking-tight" style={{ color: '#1C3F5E' }}>.merlo</span>
    </div>
  );
}
