import React from 'react';
import { Search, UploadCloud, FileSignature, KeyRound } from 'lucide-react';

export const FourStepProcess: React.FC = () => {
  const baseUrl = ((import.meta as any).env?.BASE_URL || '/');
  const heroCarImg = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}images/figma-hero.webp`;

  const steps = [
    {
      number: '01',
      title: 'Elige tu auto',
      description: 'Explora nuestra flota de sedanes, SUVs y camionetas en México y selecciona tus fechas de viaje.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Sube tus documentos',
      description: 'Carga tu licencia de conducir vigente, INE y comprobante de domicilio directamente desde tu teléfono celular.',
      icon: UploadCloud,
    },
    {
      number: '03',
      title: 'Firma tu contrato digital',
      description: 'Firma electrónicamente el contrato con validez legal mercantil. Sin letras chiquitas ni cláusulas ocultas.',
      icon: FileSignature,
    },
    {
      number: '04',
      title: 'Recibe tu unidad',
      description: 'Acude a tu punto de entrega oficial o terminal, realiza la revisión fotográfica en minutos y ponte al volante.',
      icon: KeyRound,
    },
  ];

  return (
    <section id="como-rentar" className="py-10 md:py-14 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header alineado a la izquierda con el mismo diseño del sitio */}
        <div className="mb-10 sm:mb-12 text-left">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 tracking-tight">
            Cómo rentar un auto en 4 pasos
          </h2>
          <p className="mt-2 text-sm sm:text-base font-sans text-slate-600 max-w-2xl leading-relaxed">
            Diseñamos un flujo simple y transparente para que no pierdas tiempo en filas ni papeleo tradicional.
          </p>
        </div>

        {/* Grid de 4 pasos estilo Uber en Modo Claro */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.number} className="flex flex-col items-start group">
                
                {/* Contenedor de Imagen */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-visible bg-slate-100 mb-6">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img
                      src={heroCarImg}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Badge cuadrado flotante en esquina inferior izquierda: un solo fondo gris claro, sin doble fondo */}
                  <div className="absolute -bottom-3 left-3 w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center z-10 transition-transform group-hover:translate-y-[-2px]">
                    <Icon className="w-5 h-5 text-slate-800" strokeWidth={1.4} />
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
