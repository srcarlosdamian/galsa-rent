import React from 'react';
import { ArrowRight } from 'lucide-react';

interface UseCasesSectionProps {
  onFilterCategory: (category: string) => void;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({ onFilterCategory }) => {
  const lines = [
    {
      id: 'turismo',
      title: 'Explora México con total autonomía',
      filter: 'Todos los vehículos',
      description: 'Descubre destinos coloniales, parajes cinematográficos, playas y rutas emblemáticas de México a tu propio ritmo.',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&h=1100&q=85',
      alt: 'Explora México con total autonomía',
    },
    {
      id: 'negocios',
      title: 'Sedanes ejecutivos con factura inmediata',
      filter: 'Sedán / Negocios',
      description: 'Sedanes ejecutivos confortables, con aire acondicionado y factura fiscal inmediata para tus reuniones de negocios en México.',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&h=1100&q=85',
      alt: 'Sedanes ejecutivos con factura inmediata',
    },
    {
      id: 'aventura',
      title: 'Camionetas 4×4 para sierras y carreteras',
      filter: 'SUV / Aventura',
      description: 'Camionetas Jeep y SUV 4×4 equipadas para rutas montañosas, terracería y cabañas ecoturísticas en cualquier rincón del país.',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&h=1100&q=85',
      alt: 'Camionetas 4×4 para sierras y carreteras de México',
    },
    {
      id: 'movilidad',
      title: 'Autos eficientes de bajo consumo',
      filter: 'Sedán / Negocios',
      description: 'Autos eficientes y compactos para resolver trámites, traslados personales y visitas familiares en la ciudad con ahorro de gasolina.',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&h=1100&q=85',
      alt: 'Autos eficientes de bajo consumo en México',
    },
    {
      id: 'apps',
      title: 'Unidades para conductores de apps de movilidad',
      filter: 'Sedán / Negocios',
      description: 'Unidades verificadas con esquemas semanales flexibles para trabajar en las principales plataformas de movilidad de México.',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&h=1100&q=85',
      alt: 'Unidades para conductores de apps de movilidad en México',
    },
  ];

  // Duplicamos la lista para crear el bucle infinito sin saltos
  const repeatedLines = [...lines, ...lines];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      {/* Header alineado a la izquierda con el mismo ancho de contenedor del resto del sitio (max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-left">
        <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 tracking-tight">
          Un auto para cada necesidad
        </h2>
        <p className="mt-2 text-sm sm:text-base font-sans text-slate-600 max-w-2xl leading-relaxed">
          Tenemos la opción adecuada tanto si visitas cualquier parte de México, tienes citas corporativas o buscas una unidad de trabajo.
        </p>
      </div>

      {/* Carrusel infinito con pausa al pasar el cursor (hover) */}
      <div className="w-full overflow-hidden pause-on-hover py-2">
        <div className="animate-infinite-scroll flex gap-6 px-4">
          {repeatedLines.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              onClick={() => onFilterCategory(item.filter)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onFilterCategory(item.filter);
                }
              }}
              className="group relative w-[280px] sm:w-[320px] md:w-[340px] h-[480px] sm:h-[500px] shrink-0 rounded-[28px] overflow-hidden cursor-pointer select-none border border-neutral-200/80 transition-all duration-300 hover:shadow-2xl hover:scale-[1.015]"
            >
              {/* Imagen de fondo a pantalla completa dentro de la tarjeta */}
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Degradado oscuro progresivo hacia abajo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

              {/* Contenido textual en la parte inferior */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex flex-col justify-end text-left z-10 space-y-2.5">
                <h3 className="text-white text-xl sm:text-2xl font-bold font-heading leading-tight tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-neutral-300 text-xs sm:text-[13px] font-normal font-sans leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                  <span>Ver catálogo</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.4} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
