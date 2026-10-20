import React from 'react';
import { Compass, Briefcase, Mountain, CarFront, Smartphone, ArrowRight } from 'lucide-react';

interface UseCasesSectionProps {
  onFilterCategory: (category: string) => void;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({ onFilterCategory }) => {
  const lines = [
    {
      title: 'Turismo',
      filter: 'Todos los vehículos',
      description: 'Explora el Centro Histórico de Durango, parajes cinematográficos y la riqueza colonial con total autonomía.',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Turismo en Durango en auto en renta',
    },
    {
      title: 'Negocios',
      filter: 'Sedán / Negocios',
      description: 'Sedanes ejecutivos confortables, con aire acondicionado y factura fiscal inmediata para tus reuniones de trabajo.',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Autos ejecutivos para viajes de negocios en Durango',
    },
    {
      title: 'Aventura',
      filter: 'SUV / Aventura',
      description: 'Camionetas Jeep 4x4 equipadas para la Sierra de Durango, terracería y cabañas ecoturísticas.',
      icon: Mountain,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Camionetas 4x4 para aventura en la Sierra de Durango',
    },
    {
      title: 'Movilidad general',
      filter: 'Sedán / Negocios',
      description: 'Autos eficientes de bajo consumo para resolver trámites, traslados personales y visitas familiares en la ciudad.',
      icon: CarFront,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Autos de movilidad general en Durango',
    },
    {
      title: 'Conductores de apps de movilidad',
      filter: 'Sedán / Negocios',
      description: 'Unidades verificadas con esquemas semanales para trabajar en plataformas de movilidad en Durango.',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Unidades para conductores de apps de movilidad en Durango',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Líneas de movilidad
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Un auto para cada necesidad
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            Tenemos la opción adecuada tanto si visitas Durango, tienes citas corporativas o buscas una unidad de trabajo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {lines.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => onFilterCategory(item.filter)}
                className="group cursor-pointer rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:border-black transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={600}
                    height={375}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-900 shadow-sm">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 mb-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-neutral-900 group-hover:underline">
                    <span>Ver catálogo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
