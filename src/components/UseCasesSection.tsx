import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface UseCasesSectionProps {
  onFilterCategory: (category: string) => void;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({ onFilterCategory }) => {
  const lines = [
    {
      id: 'turismo',
      title: 'Explora México con total autonomía',
      filter: 'Todos',
      description: 'Descubre destinos coloniales, parajes cinematográficos, playas y rutas emblemáticas de México a tu propio ritmo.',
      video: 'https://videos.pexels.com/video-files/35078421/14859894_1440_2560_30fps.mp4',
      alt: 'Explora México con total autonomía',
    },
    {
      id: 'negocios',
      title: 'Sedanes ejecutivos con factura inmediata',
      filter: 'Sedán',
      description: 'Sedanes ejecutivos confortables, con aire acondicionado y factura fiscal inmediata para tus reuniones de negocios en México.',
      video: 'https://videos.pexels.com/video-files/40496294/17306086_2560_1440_25fps.mp4',
      alt: 'Sedanes ejecutivos con factura inmediata',
    },
    {
      id: 'camioneta',
      title: 'Camionetas para sierras y carreteras',
      filter: 'SUV',
      description: 'Camionetas y SUVs equipadas para rutas montañosas, terracería y cabañas ecoturísticas en cualquier rincón del país.',
      video: 'https://videos.pexels.com/video-files/16017194/16017194-hd_1920_1080_60fps.mp4',
      alt: 'Camionetas para sierras y carreteras de México',
    },
    {
      id: 'deportivo',
      title: 'Autos deportivos de alto rendimiento',
      filter: 'Deportivo',
      description: 'Potencia, aerodinámica y diseño imponente para disfrutar la carretera con una experiencia de manejo inigualable.',
      video: 'https://videos.pexels.com/video-files/39140749/16655563_1440_2560_60fps.mp4',
      alt: 'Autos deportivos en México',
    },
    {
      id: 'movilidad',
      title: 'Unidades para conductores de apps de movilidad',
      filter: 'Económicos',
      description: 'Unidades verificadas con esquemas semanales flexibles para trabajar en las principales plataformas de movilidad de México.',
      video: 'https://videos.pexels.com/video-files/11760018/11760018-uhd_1440_2732_30fps.mp4',
      alt: 'Unidades para conductores de apps de movilidad en México',
    },
  ];

  // Triplicamos para asegurar cobertura fluida sin saltos
  const repeatedLines = [...lines, ...lines, ...lines];

  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Medir la mitad exacta del contenido para el bucle
    const totalWidth = track.scrollWidth;
    const loopDistance = totalWidth / 3;

    // Animación continua infinita con GSAP
    tweenRef.current = gsap.to(track, {
      x: `-=${loopDistance}`,
      duration: 35,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string) => {
          const val = parseFloat(x);
          return val % loopDistance;
        }),
      },
    });

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, []);

  // Frenado suave con ease al pasar el mouse (hover) y aceleración suave al salir
  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      {/* Contenedor principal con max-w-7xl respetado para que no sea full width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header alineado a la izquierda */}
        <div className="mb-8 sm:mb-10 text-left">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 tracking-tight">
            Un auto para cada necesidad
          </h2>
          <p className="mt-2 text-sm sm:text-base font-sans text-slate-600 max-w-2xl leading-relaxed">
            Tenemos la opción adecuada tanto si visitas cualquier parte de México, tienes citas corporativas o buscas una unidad de trabajo.
          </p>
        </div>

        {/* Carrusel contenido dentro del max-width con fade suave y detención con ease */}
        <div 
          className="relative w-full overflow-hidden py-3 rounded-[32px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={trackRef} 
            className="flex gap-6 will-change-transform cursor-pointer"
          >
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
                className="group relative w-[280px] sm:w-[320px] md:w-[330px] h-[480px] sm:h-[500px] shrink-0 rounded-[28px] overflow-hidden cursor-pointer select-none border border-neutral-200/80 bg-neutral-900"
              >
                {/* Video de fondo en bucle silencioso */}
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                />

                {/* Degradado oscuro progresivo hacia abajo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

                {/* Contenido textual en la parte inferior */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex flex-col justify-end text-left z-10 space-y-2">
                  <h3 className="text-white text-xl sm:text-2xl font-bold font-heading leading-tight tracking-tight line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-300 text-xs sm:text-[13px] font-normal font-sans leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
