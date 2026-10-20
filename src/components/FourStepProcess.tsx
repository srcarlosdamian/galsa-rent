import React from 'react';
import { Search, UploadCloud, FileSignature, KeyRound, ArrowRight } from 'lucide-react';

export const FourStepProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Elige tu auto',
      description: 'Explora nuestra flota de sedanes, SUVs y camionetas Jeep en Durango y selecciona tus fechas de viaje.',
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
      title: 'Recibe en Plaza 450',
      description: 'Acude a Sucursal Plaza 450 en Durango, realiza la revisión fotográfica de entrega en minutos y ponte al volante.',
      icon: KeyRound,
    },
  ];

  return (
    <section id="como-rentar" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Proceso 100% en línea
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Cómo rentar un auto en 4 pasos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            Diseñamos un flujo simple y transparente para que no pierdas tiempo en filas ni papeleo tradicional en Durango.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.number} className="relative flex flex-col justify-between p-6 rounded-2xl border border-neutral-200 bg-white hover:border-black transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-neutral-900 tracking-tighter">
                      {s.number}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-800">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-neutral-300 pointer-events-none">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold px-6 py-3.5 rounded-full transition-all"
          >
            <span>Ver autos disponibles hoy</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
