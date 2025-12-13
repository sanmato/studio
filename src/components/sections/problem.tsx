import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareWarning, Compass, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const problems = [
  {
    icon: <MessageSquareWarning className="h-10 w-10 text-primary" />,
    title: "Contenido Vacío",
    description: "Posteás para cumplir, no para vender."
  },
  {
    icon: <Compass className="h-10 w-10 text-primary" />,
    title: "Sin Norte",
    description: "Tenés métricas, pero no sabés qué decisión tomar."
  },
  {
    icon: <EyeOff className="h-10 w-10 text-primary" />,
    title: "Invisibilidad",
    description: "Tu historia es increíble, pero nadie la está escuchando."
  }
];

export function Problem() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'problem-bg');

  return (
    <section id="nosotros" className="relative bg-card">
       {bgImage && (
        <div className="absolute inset-0">
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover opacity-30"
            data-ai-hint={bgImage.imageHint}
          />
          <div className="absolute inset-0 bg-background/50" />
        </div>
      )}
      <div className="container mx-auto px-4 text-center relative">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Sentís que tu negocio te quita libertad en lugar de dártela?
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Tener una marca no debería sentirse como una cárcel operativa. Si publicás sin parar pero no ves retorno, el problema no es tu esfuerzo. Es la falta de un mapa.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div key={problem.title} className="flex flex-col items-center text-center p-6 rounded-lg bg-card/70 backdrop-blur-sm">
              <div className="mb-4">{problem.icon}</div>
              <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
