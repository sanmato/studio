import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="relative flex items-center justify-center w-[160px] h-[160px]" {...props}>
      <Image
        src="/napkin-bg.png"
        alt="Napkin drawing background"
        width={160}
        height={160}
        className="absolute inset-0 object-contain"
      />
      <span className="relative font-logo font-bold text-5xl tracking-tight" style={{ color: '#1C3F5E' }}>.merlo</span>
    </div>
  );
}
