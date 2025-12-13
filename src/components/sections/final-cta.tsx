import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

export function FinalCta() {
  const ctaImage = PlaceHolderImages.find(p => p.id === 'cta-sky');

  return (
    <section className="relative w-full bg-[#0a192f] text-primary-foreground">
       {ctaImage && (
        <div className="absolute inset-0">
          <Image
            src={ctaImage.imageUrl}
            alt={ctaImage.description}
            fill
            className="object-cover opacity-20"
            data-ai-hint={ctaImage.imageHint}
          />
        </div>
      )}
      <div className="container mx-auto px-4 text-center relative py-20 md:py-28">
        <h2 className="text-4xl md:text-5xl font-black mb-6">Tu próxima gran historia empieza con una decisión.</h2>
        <Button asChild size="lg" className="h-16 w-full md:w-auto px-8 md:px-12 text-lg md:text-xl font-bold bg-gradient-to-br from-primary to-[hsl(215,80%,45%)] hover:from-primary/90 hover:to-[hsl(215,80%,40%)] transform hover:scale-105 transition-all duration-300">
          <Link href="#contacto">QUIERO MI DIAGNÓSTICO AHORA</Link>
        </Button>
        <p className="mt-6 text-sm text-primary-foreground/70">Cupos limitados para mantener la calidad de la consultoría.</p>
      </div>
    </section>
  );
}
