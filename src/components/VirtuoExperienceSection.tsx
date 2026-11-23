import React from 'react';
import { CalendarRange, ClipboardCheck, FileCheck, ShieldCheck } from 'lucide-react';
import { MinimalMobileSlider } from './MinimalMobileSlider';

export const VirtuoExperienceSection: React.FC = () => {
  const STEPS = [
    {
      id: 1,
      title: 'Elige por día, semana o mes',
      description: 'Planes flexibles adaptados a tus fechas de viaje, trabajo o compromisos familiares en México.',
      icon: CalendarRange,
      imageIcon: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793600346395-4-background-border-shadow.webp',
    },
    {
      id: 2,
      title: 'Autos revisados uno por uno',
      description: 'Inspección física, documental y fotográfica rigurosa antes de publicar cada unidad en la plataforma.',
      icon: ClipboardCheck,
      imageIcon: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793600346030-3-background-border-shadow-1.webp',
    },
    {
      id: 3,
      title: 'Contrato digital con validez legal',
      description: 'Firma electrónica segura con sellado de tiempo, certeza jurídica mercantil y sin letras chiquitas.',
      icon: FileCheck,
      imageIcon: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793600345607-2-background-border-shadow-2.webp',
    },
    {
      id: 4,
      title: 'Ayuda cuando la necesitas',
      description: 'Atención directa vía WhatsApp y en sucursal oficial para asistirte antes, durante y al devolver tu auto en México.',
      icon: ShieldCheck,
      imageIcon: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793600345205-1-background-border-shadow-3.webp',
    },
  ];

  const rightMockupImg = 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793600344534-0-rightmockupcolumn.webp';

  return (
    <section className="w-full py-10 md:py-14 bg-white overflow-hidden">
      {/* Contenedor alineado a 1200px */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col justify-start items-start">
        <div className="w-full p-6 sm:p-10 md:p-12 bg-cta rounded-[28px] sm:rounded-[36px] flex flex-col justify-start items-start overflow-hidden shadow-sm">
          <div className="w-full flex flex-col lg:flex-row justify-start items-stretch gap-10 lg:gap-14">
            
            {/* Columna Izquierda: Textos y Pasos */}
            <div className="flex-1 flex flex-col justify-between items-start">
              {/* Header Textos */}
              <div className="w-full flex flex-col justify-start items-start gap-3 sm:gap-4">
                <span className="text-cta-100 text-xs font-bold uppercase tracking-wider font-heading">
                  CERTEZA Y TRANSPARENCIA
                </span>
                <h2 className="w-full text-white text-3xl sm:text-4xl lg:text-[42px] font-bold font-heading leading-tight tracking-tight">
                  Rentar con GALSA es así de simple
                </h2>
                <p className="w-full text-cta-100/90 text-sm sm:text-base font-normal font-sans leading-relaxed pt-1">
                  Sin filas interminables ni papeleo en mostrador. Selecciona tu vehículo, valida tu identificación oficial mexicana y firma tu contrato digital directamente desde tu celular.
                </p>
              </div>

              {/* Slider en mobile (1 elemento) / Lista vertical de 4 pasos en tablet+desktop */}
              <div className="w-full pt-6 sm:pt-10">
                <MinimalMobileSlider
                  itemCount={STEPS.length}
                  desktopGridClassName="md:flex md:flex-col md:justify-start md:items-start md:gap-6"
                  mobileItemClassName="w-full shrink-0 snap-start md:w-auto"
                  trackClassName="mx-0 px-0 scroll-pl-0 gap-4"
                  dotsVariant="light"
                  ariaLabel="Beneficios de rentar con GALSA"
                >
                  {STEPS.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.id}
                        className="w-full flex items-center gap-4 bg-white/10 rounded-2xl p-4 md:bg-transparent md:p-0 md:rounded-none"
                      >
                        {/* Icon container */}
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                          {step.imageIcon ? (
                            <img
                              src={step.imageIcon}
                              alt={step.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center border border-white/80">
                              <Icon className="w-7 h-7 text-cta" strokeWidth={1.4} />
                            </div>
                          )}
                        </div>

                        {/* Info texto */}
                        <div className="flex-1 flex flex-col justify-start items-start gap-1 min-w-0">
                          <h3 className="text-white text-base sm:text-[17px] font-bold font-heading leading-snug">
                            {step.title}
                          </h3>
                          <p className="text-cta-100/90 text-xs sm:text-sm font-normal font-sans leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </MinimalMobileSlider>
              </div>
            </div>

            {/* Columna Derecha: Ilustración / Imagen 3D */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full h-full min-h-[260px] sm:min-h-[380px] md:min-h-[480px] rounded-[24px] overflow-hidden bg-cta-600/30">
                <img
                  src={rightMockupImg}
                  alt="Experiencia de renta digital GALSA Rent"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
