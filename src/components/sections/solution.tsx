import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Scaling, Mountain, Bird } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    icon: <Scaling className="h-8 w-8 text-primary" />,
    title: "Investigación (Raíces)",
    description: "Analizamos tu mercado real, no supuestos."
  },
  {
    icon: <Mountain className="h-8 w-8 text-primary" />,
    title: "Estrategia (La Montaña)",
    description: "Definimos el camino más eficiente hacia la cima."
  },
  {
    icon: <Bird className="h-8 w-8 text-primary" />,
    title: "Expansión (El Vuelo)",
    description: "Campañas de Ads y contenidos que escalan solos."
  }
];

export function Solution() {
  const solutionImage = PlaceHolderImages.find(p => p.id === 'solution-pampa');

  return (
    <section className="relative w-full">
      {solutionImage && (
        <div className="absolute inset-0">
          <Image
            src={solutionImage.imageUrl}
            alt={solutionImage.description}
            fill
            className="object-cover"
            data-ai-hint={solutionImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}
      <div className="container mx-auto px-4 relative text-primary-foreground">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recuperá tu territorio.</h2>
          <p className="max-w-3xl mx-auto text-lg">
            No vendemos humo. Vendemos procesos claros inspirados en la naturaleza: raíces fuertes (datos) para frutos reales (ventas).
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.title} className="bg-black/30 backdrop-blur-sm p-6 rounded-lg text-center border border-white/20">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-white/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
