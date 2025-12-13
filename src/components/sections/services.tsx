import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const services = [
  {
    title: "Diagnóstico de Marca",
    description: "Auditoría profunda de tu situación actual para encontrar oportunidades de crecimiento reales."
  },
  {
    title: "Sistema de Contenidos",
    description: "Desarrollamos guiones y pilares de contenido que conectan con tu audiencia y trabajan por vos."
  },
  {
    title: "Performance & Ads",
    description: "Gestionamos tu inversión publicitaria de forma inteligente para un retorno medible y escalable."
  }
];

export function Services() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'services-bg');

  return (
    <section id="servicios" className="relative bg-card">
       {bgImage && (
        <div className="absolute inset-0">
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover opacity-40"
            data-ai-hint={bgImage.imageHint}
          />
           <div className="absolute inset-0 bg-background/60" />
        </div>
      )}
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Un servicio para cada etapa de tu libertad</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Nuestros servicios están diseñados para construir un ecosistema de marketing que te libere, no que te ate.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col text-center hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" asChild>
                  <Link href="#contacto">Saber más</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
