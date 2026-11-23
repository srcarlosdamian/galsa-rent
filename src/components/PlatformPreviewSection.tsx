import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { MinimalMobileSlider } from './MinimalMobileSlider';

const PREVIEW_SLOTS = [
  {
    id: 1,
    slotLabel: 'Captura 01 · Búsqueda y catálogo',
    title: 'Catálogo y reserva rápida',
    description: 'Elige tu modelo, fechas y sucursal en segundos con disponibilidad en vivo.',
  },
  {
    id: 2,
    slotLabel: 'Captura 02 · Contrato digital',
    title: 'Contrato mercantil digital',
    description: 'Revisa coberturas, depósito reembolsable y firma electrónicamente desde tu celular.',
  },
  {
    id: 3,
    slotLabel: 'Captura 03 · Entrega express',
    title: 'Seguimiento y entrega en Plaza 450',
    description: 'Checklist fotográfico, horarios confirmados y llaves listas sin hacer filas.',
  },
];

export const PlatformPreviewSection: React.FC = () => {
  return (
    <section className="py-10 md:py-14 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10 text-left space-y-2">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-cta block">
            Explora la plataforma
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 tracking-tight">
            Todo tu viaje desde un solo lugar
          </h2>
          <p className="text-sm sm:text-base font-sans text-slate-600 max-w-2xl leading-relaxed">
            Visualiza cómo funciona la experiencia completa de reserva, validación y entrega digital en GALSA Rent.
          </p>
        </div>

        <MinimalMobileSlider
          itemCount={PREVIEW_SLOTS.length}
          desktopGridClassName="md:grid md:grid-cols-3 md:gap-6"
          ariaLabel="Capturas de la plataforma GALSA Rent"
        >
          {PREVIEW_SLOTS.map((slot) => (
            <div key={slot.id} className="flex flex-col items-start text-left">
              <div className="w-full aspect-[4/3] rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 p-6 mb-4">
                <ImageIcon className="w-6 h-6 text-slate-300" strokeWidth={1.5} />
                <span className="text-[11px] font-mono text-slate-400 text-center">
                  {slot.slotLabel}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 leading-snug mb-1">
                {slot.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                {slot.description}
              </p>
            </div>
          ))}
        </MinimalMobileSlider>
      </div>
    </section>
  );
};
