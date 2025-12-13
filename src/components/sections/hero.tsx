import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-patagonia');

  return (
    <section id="inicio" className="w-full min-h-screen flex items-center bg-background p-0">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center">
        <div className="relative h-full min-h-[50vh] lg:min-h-screen flex flex-col justify-center text-foreground p-8 lg:p-12">
           {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover -z-10"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-white/70 -z-10" />
          <div className="max-w-md space-y-4">
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tighter">
              Marketing que piensa como vos.
            </h1>
            <h2 className="text-lg md:text-xl font-light">
              Investigación real que convierte tu historia en clientes.
            </h2>
          </div>
        </div>

        <div className="p-8 lg:p-12">
            <ContactForm />
        </div>
      </div>
    </section>
  );
}
