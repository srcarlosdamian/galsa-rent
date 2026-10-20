import React from 'react';
import { Compass, Briefcase, Mountain, CarFront, UsersRound } from 'lucide-react';

interface UseCasesSectionProps {
  onFilterCategory: (cat: string) => void;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({ onFilterCategory }) => {
  const cases = [
    {
      title: 'Turismo en Durango',
      tag: 'Explora',
      category: 'Todos los vehículos',
      description: 'Descubre el Centro Histórico, Pueblos Mágicos como Nombre de Dios y los paisajes de la cinematografía nacional.',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Viajes de Negocios',
      tag: 'Corporativo',
      category: 'Sedán / Negocios',
      description: 'Sedanes ejecutivos elegantes, seguros y con factura fiscal inmediata para tus reuniones de trabajo en la entidad.',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Aventura en la Sierra',
      tag: 'Off-Road 4x4',
      category: 'SUV / Aventura',
      description: 'Camionetas Jeep 4x4 equipadas para subir a Mexiquillo, cabañas en la sierra y rutas ecoturísticas sin límites.',
      icon: Mountain,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Conductores de Plataforma',
      tag: 'Flota B2B',
      category: 'Sedán / Negocios',
      description: 'Esquemas de renta semanal y mensual con mantenimiento incluido para trabajar en Uber, DiDi y plataformas.',
      icon: UsersRound,
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
            Movilidad adaptada a ti
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Un vehículo ideal para cada tipo de viaje
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            Tanto si visitas Durango por turismo, tienes compromisos corporativos o buscas emprender en movilidad, tenemos la unidad perfecta.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                onClick={() => onFilterCategory(c.category)}
                className="group cursor-pointer rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:border-black transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-bold bg-white/90 backdrop-blur-sm text-neutral-900 px-2.5 py-1 rounded-full shadow-sm">
                    {c.tag}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-neutral-900" />
                      <h3 className="text-base font-bold text-neutral-900">
                        {c.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:underline">
                    <span>Ver autos sugeridos</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
