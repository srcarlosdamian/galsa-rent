import React from 'react';
import { CalendarRange, ClipboardCheck, FileCheck, ShieldCheck } from 'lucide-react';

export const VirtuoExperienceSection: React.FC = () => {
  const baseUrl = ((import.meta as any).env?.BASE_URL || '/');
  const rentalStepsImg = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}images/figma-rental-steps.webp`;

  const STEPS = [
    {
      id: 1,
      title: 'Elige por día, semana o mes',
      description: 'Planes flexibles adaptados a tus fechas de viaje, trabajo o compromisos familiares en México.',
      icon: CalendarRange,
    },
    {
      id: 2,
      title: 'Autos revisados uno por uno',
      description: 'Inspección física, documental y fotográfica rigurosa antes de publicar cada unidad en la plataforma.',
      icon: ClipboardCheck,
    },
    {
      id: 3,
      title: 'Contrato digital con validez legal',
      description: 'Firma electrónica segura con sellado de tiempo, certeza jurídica mercantil y sin letras chiquitas.',
      icon: FileCheck,
    },
    {
      id: 4,
      title: 'Ayuda cuando la necesitas',
      description: 'Atención directa vía WhatsApp y en sucursal oficial para asistirte antes, durante y al devolver tu auto en México.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="w-full py-10 px-4 sm:px-8 lg:px-12 flex justify-center items-center overflow-hidden bg-white">
      {/* Contenedor exacto Figma Rental Steps: w-[1200px] max-w-[1280px] */}
      <div className="w-full max-w-[1200px] flex flex-col justify-start items-start">
        <div className="w-full p-6 sm:p-10 bg-radial-[at_85%_50%] from-blue-500/10 to-blue-500/0 to-60% bg-[#111418] rounded-3xl outline outline-1 outline-offset-[-1px] outline-neutral-800 flex flex-col justify-start items-start overflow-hidden">
          <div className="w-full flex flex-col lg:flex-row justify-start items-stretch gap-10 lg:gap-16">
            
            {/* Columna Izquierda: Textos y Pasos */}
            <div className="flex-1 py-4 sm:py-6 flex flex-col justify-between items-start">
              {/* Header Textos */}
              <div className="w-full flex flex-col justify-start items-start gap-3 sm:gap-4">
                <span className="text-white text-xs font-semibold uppercase tracking-wider font-heading">
                  CERTEZA Y TRANSPARENCIA
                </span>
                <h2 className="w-full text-white text-3xl sm:text-4xl font-semibold font-heading leading-tight">
                  Rentar con GALSA es así de simple
                </h2>
                <p className="w-full text-neutral-300 text-sm sm:text-base font-normal font-sans leading-relaxed">
                  Sin filas interminables ni papeleo en mostrador. Selecciona tu vehículo, valida tu identificación oficial mexicana y firma tu contrato digital directamente desde tu celular.
                </p>
              </div>

              {/* Lista vertical de 4 pasos */}
              <div className="w-full pt-8 sm:pt-10 flex flex-col justify-start items-start gap-5 sm:gap-6">
                {STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="w-full flex items-start gap-4">
                      {/* Icon container: size-11 (44px) bg-[#1e232d] / gray-800 rounded-2xl */}
                      <div className="w-11 h-11 bg-gray-800/90 rounded-2xl flex items-center justify-center shrink-0 text-neutral-200 border border-neutral-700/40">
                        <Icon className="w-5 h-5 text-neutral-200" strokeWidth={1.4} />
                      </div>

                      {/* Info texto */}
                      <div className="flex-1 flex flex-col justify-start items-start gap-1 min-w-0">
                        <h3 className="text-neutral-100 text-base font-medium font-heading leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-neutral-400 text-sm font-normal font-sans leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Columna Derecha: Imagen interactiva del auto interior */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full h-full min-h-[360px] sm:min-h-[460px] max-h-[640px] rounded-2xl overflow-hidden border border-neutral-800/60 bg-neutral-900 shadow-2xl">
                <img
                  src={rentalStepsImg}
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
