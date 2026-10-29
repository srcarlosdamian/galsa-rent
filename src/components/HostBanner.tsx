import React from 'react';
import { ArrowRight, ShieldCheck, Car, Sparkles } from 'lucide-react';

interface HostBannerProps {
  onNavigate?: (path: string) => void;
}

export const HostBanner: React.FC<HostBannerProps> = ({ onNavigate }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/anfitriones');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50/70 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:border-neutral-300">
          
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              ¿Tienes un auto que no usas todos los días?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Ponlo a trabajar en el marketplace de GALSA Rent. Tú fijas tu tarifa por día y recibes el 100% de tus ganancias con clientes verificados y contrato digital respaldado.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="/anfitriones"
              onClick={handleClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98]"
            >
              <span>Conocer programa de anfitriones</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
