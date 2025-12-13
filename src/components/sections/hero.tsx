import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-patagonia');

  return (
    <section id="inicio" className="relative w-full min-h-screen flex items-center justify-center p-0">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover -z-20"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/70 -z-10" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-primary-foreground space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter">
            Marketing que piensa como vos.
          </h1>
          <h2 className="text-lg md:text-xl font-light text-primary-foreground/80">
            Investigación real que convierte tu historia en clientes.
          </h2>
        </div>

        <div className="p-0">
            <ContactForm />
        </div>
      </div>
    </section>
  );
}
