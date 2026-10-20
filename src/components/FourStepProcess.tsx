import React from 'react';
import { Search, FileSignature, Key, CheckCircle, ArrowRight } from 'lucide-react';

export const FourStepProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Elige tu vehículo',
      description: 'Explora nuestra flota de camionetas SUV, sedanes ejecutivos y deportivos en Durango. Filtra por fechas y punto de entrega.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Reserva 100% digital',
      description: 'Valida tu identificación y firma tu contrato digital encriptado directamente desde tu teléfono. Sin letra pequeña.',
      icon: FileSignature,
    },
    {
      number: '03',
      title: 'Entrega ágil y verificada',
      description: 'Recibe en Plaza 450, Aeropuerto de Durango o en tu hotel con checklist fotográfico de salida en minutos.',
      icon: Key,
    },
    {
      number: '04',
      title: 'Disfruta y devuelve',
      description: 'Viaja con cobertura amplia y asistencia 24/7. Al devolver, tu depósito en garantía se libera de manera inmediata.',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
            Proceso sin complicaciones
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            De la búsqueda al volante en 4 sencillos pasos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            Simplificamos todo el proceso para que tu experiencia de renta en Durango sea rápida, segura y transparente.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
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
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-neutral-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action button */}
        <div className="mt-12 text-center">
          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-black text-white text-sm font-bold px-6 py-3.5 rounded-full transition-all"
          >
            <span>Ver autos disponibles para hoy</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
