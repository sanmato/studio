import { Hero } from '@/components/sections/hero';
import { Problem } from '@/components/sections/problem';
import { Solution } from '@/components/sections/solution';
import { Services } from '@/components/sections/services';
import { Portfolio } from '@/components/sections/portfolio';
import { Testimonials } from '@/components/sections/testimonials';
import { FinalCta } from '@/components/sections/final-cta';

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <Portfolio />
      <Testimonials />
      <FinalCta />
    </>
  );
}
