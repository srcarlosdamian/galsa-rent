import React from 'react';
import { Smartphone, Zap, ShieldCheck, KeyRound, Sparkles, Clock } from 'lucide-react';

export const VirtuoExperienceSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Govirtuo Inspiration */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>La nueva experiencia de movilidad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            Olvídate de las filas de mostrador. Renta tu auto desde tu teléfono.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Diseñamos GALSA para transformar la renta de autos en México: sin contratos impresos interminables, sin cargos sorpresa al entregar y con autos impecables listos a tu llegada.
          </p>
        </div>

        {/* Feature Grid: 4 Pillars with Clean Flat Styling */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl border border-neutral-200 hover:border-black transition-colors bg-white">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-5">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Check-in 100% digital
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Sube tu licencia y firma tu contrato digital en 2 minutos desde tu móvil. Cero papeles y cero tiempos muertos en sucursal o aeropuerto.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 hover:border-black transition-colors bg-white">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Vehículos certificados
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Cada unidad pasa por una rigurosa inspección mecánica de 40 puntos, limpieza profunda y verificación de kilometraje antes de cada viaje.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 hover:border-black transition-colors bg-white">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Tarifas transparentes
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Lo que ves es lo que pagas. Kilometraje transparente, IVA incluido y depósito de garantía reembolsable liberado en minutos.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 hover:border-black transition-colors bg-white">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-5">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Soporte humano 24/7
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Un equipo real disponible vía WhatsApp y teléfono para asistirte en ruta, extensiones de viaje o cualquier eventualidad en carretera.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
