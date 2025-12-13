import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    quote: "Strategia Libre transformó nuestra forma de ver el marketing. Ahora cada acción tiene un porqué y los resultados son tangibles.",
    name: "Ana Pérez",
    company: "CEO, Tech Inova"
  },
  {
    quote: "El diagnóstico de marca fue un antes y un después. Nos dieron un mapa claro que seguimos al pie de la letra con éxito.",
    name: "Juan García",
    company: "Fundador, Café del Sur"
  },
  {
    quote: "Finalmente siento que tengo el control de mi negocio y no al revés. Su enfoque en la 'libertad' es real.",
    name: "Sofía Martinez",
    company: "Directora, Moda Activa"
  }
];

export function Testimonials() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'testimonials-bg');
  return (
    <section className="relative bg-background py-12 md:py-24 lg:py-32">
       {bgImage && (
        <div className="absolute inset-0 opacity-20">
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover"
            data-ai-hint={bgImage.imageHint}
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">La libertad tiene sus testigos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Nuestros clientes no solo crecen, recuperan su tiempo y su pasión.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col justify-between bg-card">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-accent fill-accent" />)}
                </div>
                <blockquote className="text-muted-foreground italic mb-4">"{testimonial.quote}"</blockquote>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
