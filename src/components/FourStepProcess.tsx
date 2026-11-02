import React, { useState } from 'react';
import { Search, UploadCloud, FileSignature, KeyRound } from 'lucide-react';

export const FourStepProcess: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const baseUrl = ((import.meta as any).env?.BASE_URL || '/');
  const heroCarImg = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}images/figma-hero.webp`;

  const steps = [
    {
      number: '01',
      title: 'Elige tu auto',
      description: 'Explora nuestra flota de sedanes, SUVs y camionetas en México y selecciona tus fechas de viaje.',
      icon: Search,
      image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793601314858-3-348387.webp',
    },
    {
      number: '02',
      title: 'Sube tus documentos',
      description: 'Carga tu licencia de conducir vigente, INE y comprobante de domicilio directamente desde tu teléfono celular.',
      icon: UploadCloud,
      image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793601314439-2-348385.webp',
    },
    {
      number: '03',
      title: 'Firma tu contrato digital',
      description: 'Firma electrónicamente el contrato con validez legal mercantil. Sin letras chiquitas ni cláusulas ocultas.',
      icon: FileSignature,
      image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793601313796-1-348386.webp',
    },
    {
      number: '04',
      title: 'Recibe tu unidad',
      description: 'Acude a tu punto de entrega oficial o terminal, realiza la revisión fotográfica en minutos y ponte al volante.',
      icon: KeyRound,
      image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793601312824-0-348388.webp',
    },
  ];

  return (
    <section id="como-rentar" className="py-10 md:py-14 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header sin botones en mobile para que no quede ajustado el texto */}
        <div className="mb-6 sm:mb-12 text-left">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 tracking-tight">
            Cómo rentar un auto en 4 pasos
          </h2>
          <p className="mt-2 text-sm sm:text-base font-sans text-slate-600 max-w-2xl leading-relaxed">
            Diseñamos un flujo simple y transparente para que no pierdas tiempo en filas ni papeleo tradicional.
          </p>
        </div>

        {/* Mobile: Slider animado con controles debajo del texto */}
        <div className="block sm:hidden">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.number} className="w-full shrink-0 flex flex-col items-start px-0.5">
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-visible bg-slate-100 mb-6">
                      <div className="w-full h-full rounded-2xl overflow-hidden">
                        <img
                          src={s.image}
                          alt={s.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="absolute -bottom-3 left-3 w-12 h-12 bg-blue-300 rounded-xl flex items-center justify-center z-10 shadow-xs">
                        <Icon className="w-5 h-5 text-blue-900" strokeWidth={1.4} />
                      </div>
                    </div>
                    <div className="pt-2 flex flex-col items-start text-left">
                      <h3 className="text-lg font-heading font-semibold text-slate-900 mb-1.5 leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-xs font-sans text-slate-600 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botones de navegación Anterior / Siguiente en mobile (abajo después del texto) */}
          <div className="mt-5 flex items-center gap-2">
            <button
              type="button"
              disabled={activeSlide === 0}
              onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1.5 rounded-[6px] border border-slate-200 text-slate-700 text-xs font-heading hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Paso anterior"
            >
              Anterior
            </button>
            <span className="font-semibold text-slate-900 text-xs font-heading px-1">
              {activeSlide + 1} de {steps.length}
            </span>
            <button
              type="button"
              disabled={activeSlide === steps.length - 1}
              onClick={() => setActiveSlide((prev) => Math.min(steps.length - 1, prev + 1))}
              className="px-3 py-1.5 rounded-[6px] border border-slate-200 text-slate-700 text-xs font-heading hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Siguiente paso"
            >
              Siguiente
            </button>
          </div>
        </div>

        {/* Desktop / Tablet: Grid completo estándar de 4 columnas */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.number} className="flex flex-col items-start">
                
                {/* Contenedor de Imagen estático sin efectos de zoom ni traslación */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-visible bg-slate-100 mb-6">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Badge cuadrado flotante en esquina inferior izquierda con fondo azul 300 e icono azul 900 */}
                  <div className="absolute -bottom-3 left-3 w-12 h-12 bg-blue-300 rounded-xl flex items-center justify-center z-10">
                    <Icon className="w-5 h-5 text-blue-900" strokeWidth={1.4} />
                  </div>
                </div>

                {/* Textos del paso */}
                <div className="pt-2 flex flex-col items-start text-left">
                  <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 mb-1.5 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
