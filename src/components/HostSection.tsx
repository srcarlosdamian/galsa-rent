import React, { useState } from 'react';
import { DollarSign, Shield, CalendarCheck, TrendingUp, ArrowRight, Check } from 'lucide-react';

export const HostSection: React.FC = () => {
  const [estimatedDaily, setEstimatedDaily] = useState(1100);
  const [daysRented, setDaysRented] = useState(16);

  const monthlyGross = estimatedDaily * daysRented;
  const platformFee = Math.round(monthlyGross * 0.15);
  const netEarnings = monthlyGross - platformFee;

  return (
    <section id="anfitriones" className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Host Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
              Marketplace de Anfitriones GALSA
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              Pon tu vehículo a trabajar y genera ingresos recurrentes
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              ¿Tu auto pasa días estacionado? Conviértelo en un activo de alto rendimiento. En GALSA gestionamos la validación de conductores, contratos digitales, cobros automatizados y entrega segura.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-neutral-900 text-white mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Conductores calificados y verificados</h3>
                  <p className="text-xs text-neutral-500">Filtrado estricto con validación de antecedentes, identificación oficial y score crediticio.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-neutral-900 text-white mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Control absoluto de tu calendario</h3>
                  <p className="text-xs text-neutral-500">Tú decides qué días prestar tu auto, el precio por día y tus reglas específicas de uso.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-neutral-900 text-white mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Dispersión de pagos garantizada</h3>
                  <p className="text-xs text-neutral-500">Transferencias automáticas directo a tu cuenta bancaria al término de cada contrato.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://wa.me/526181234567?text=Hola%20GALSA,%20quiero%20publicar%20mi%20auto%20en%20el%20marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-black text-white text-sm font-bold px-7 py-4 rounded-2xl transition-all shadow-md active:scale-[0.98]"
              >
                <span>Registrar mi auto como anfitrión</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Earnings Calculator */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-dropdown">
              <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Calculadora de rentabilidad
                  </span>
                  <h4 className="text-xl font-extrabold text-neutral-900 mt-1">
                    Estima tus ingresos mensuales
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-neutral-700">Tarifa por día del auto</span>
                    <span className="font-black text-neutral-900">${estimatedDaily.toLocaleString('es-MX')} MXN</span>
                  </div>
                  <input
                    type="range"
                    min={700}
                    max={3000}
                    step={50}
                    value={estimatedDaily}
                    onChange={(e) => setEstimatedDaily(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                    <span>$700 (Sedán)</span>
                    <span>$1,800 (SUV)</span>
                    <span>$3,000 (Premium/4x4)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-neutral-700">Días rentado al mes</span>
                    <span className="font-black text-neutral-900">{daysRented} días</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={28}
                    step={1}
                    value={daysRented}
                    onChange={(e) => setDaysRented(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                    <span>4 días (Fines de semana)</span>
                    <span>16 días (Ocupación media)</span>
                    <span>28 días (Flota fija)</span>
                  </div>
                </div>

                {/* Estimate Result Box */}
                <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-2">
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                    Ingreso neto estimado para ti
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-neutral-900 tracking-tight">
                      ${netEarnings.toLocaleString('es-MX')}
                    </span>
                    <span className="text-sm font-bold text-neutral-600">MXN / mes</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-normal">
                    *Cálculo aproximado deducida la tarifa de servicio y operación de plataforma. Pagos directos vía SPEI.
                  </p>
                </div>

                <a
                  href="https://wa.me/526181234567?text=Hola%20GALSA,%20quiero%20evaluar%20mi%20auto%20para%20anfitri%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3.5 rounded-xl border border-black text-black font-bold text-xs hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  Consultar evaluación gratuita de mi auto
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
