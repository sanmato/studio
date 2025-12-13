import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

const portfolioItems = [
  {
    id: "portfolio-1",
    title: "Lanzamiento de Marca Tech",
    description: "Estrategia de branding y contenidos que resultó en un 200% de aumento en leads calificados en el primer trimestre.",
    tags: ["Branding", "Contenido"]
  },
  {
    id: "portfolio-2",
    title: "E-commerce de Moda",
    description: "Optimización de campañas de Ads que duplicó el ROAS y redujo el costo por adquisición en un 30%.",
    tags: ["Performance", "Ads"]
  },
  {
    id: "portfolio-3",
    title: "Consultora B2B",
    description: "Creación de un sistema de contenidos que posicionó a la marca como líder de opinión en su nicho.",
    tags: ["Estrategia", "SEO"]
  }
];

export function Portfolio() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'portfolio-bg');
  return (
    <section id="casos-de-exito" className="relative bg-background">
       {bgImage && (
        <div className="absolute inset-0">
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover opacity-20"
            data-ai-hint={bgImage.imageHint}
          />
           <div className="absolute inset-0 bg-background/70" />
        </div>
      )}
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Casos de Éxito</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            No solo lo decimos, lo demostramos. Estos son algunos de los resultados que hemos generado.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {portfolioItems.map((item) => {
            const image = PlaceHolderImages.find(p => p.id === item.id);
            return (
              <Card key={item.title} className="overflow-hidden group bg-card/80 backdrop-blur-sm">
                {image && (
                  <div className="relative h-48">
                    <Image
                      src={image.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
