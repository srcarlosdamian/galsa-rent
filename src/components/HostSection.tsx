import React, { useState } from 'react';
import { TrendingUp, ArrowRight, Check, ShieldCheck, CalendarCheck, UserCheck } from 'lucide-react';

interface HostSectionProps {
  isFullPage?: boolean;
}

export const HostSection: React.FC<HostSectionProps> = ({ isFullPage = false }) => {
  const [dailyRate, setDailyRate] = useState(1100);
  const [daysPerMonth, setDaysPerMonth] = useState(15);

  // Anfitrión receives 100% of the daily rate they set!
  // The client pays the 33% service fee.
  const hostEarnings = dailyRate * daysPerMonth;
  const clientPricePerDay = Math.round(dailyRate * 1.33);

  return (
    <section id="anfitriones" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {isFullPage && (
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Marketplace de anfitriones en Durango
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
              Gana dinero rentando tu auto en Durango
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Tú fijas precio y disponibilidad, y apruebas cada reserva. GALSA se encarga de verificar clientes, firmar contratos y cobrar. Recibes el 100% de tu tarifa.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            {!isFullPage && (
              <>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                  Marketplace de anfitriones
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                  Gana dinero con tu auto en Durango
                </h2>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Tú fijas precio y disponibilidad, y apruebas cada reserva. GALSA se encarga de verificar clientes, firmar contratos y cobrar. Recibes el 100% de tu tarifa.
                </p>
              </>
            )}

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-neutral-900 text-white mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Recibes el 100% de tu tarifa fijada</h3>
                  <p className="text-xs text-neutral-600">No te descontamos comisiones. La tarifa de servicio del 33% la cubre el cliente.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-neutral-900 text-white mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Tú apruebas cada solicitud de reserva</h3>
                  <p className="text-xs text-neutral-600">Tienes el control absoluto de tus fechas, tu calendario y quién conduce tu vehículo.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-neutral-900 text-white mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Clientes verificados y seguro incluido</h3>
                  <p className="text-xs text-neutral-600">Validamos identidad, licencia y comprobantes de domicilio antes de entregar el auto en Plaza 450.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              {/* TODO: Reemplazar con el enlace directo al formulario o WhatsApp de anfitriones */}
              {/* CTA 3 en el Home (y en Anfitriones): Primary 500 (#316AB5) */}
              <a
                href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent,%20quiero%20publicar%20mi%20auto%20como%20anfitri%C3%B3n%20en%20Durango"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#316AB5' }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white text-xs font-bold px-7 py-4 rounded-2xl transition-all shadow-sm hover:brightness-105 active:scale-[0.98]"
              >
                <span>Publicar mi auto en GALSA</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {!isFullPage && (
                <a
                  href="/anfitriones"
                  className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-bold text-neutral-800 hover:text-black py-4 px-4"
                >
                  Conocer más sobre anfitriones →
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Earnings Simulator */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-dropdown">
              <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Simulador de ingresos
                  </span>
                  <h3 className="text-xl font-extrabold text-neutral-900 mt-0.5">
                    Calcula cuánto recibirás al mes
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-bold text-neutral-700">Tu tarifa fijada por día</span>
                    <span className="font-black text-neutral-900">${dailyRate.toLocaleString('es-MX')} MXN</span>
                  </div>
                  <input
                    type="range"
                    min={700}
                    max={3000}
                    step={50}
                    value={dailyRate}
                    onChange={(e) => setDailyRate(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                    <span>$700 (Sedán)</span>
                    <span>$1,400 (SUV/4x4)</span>
                    <span>$3,000 (Premium)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-bold text-neutral-700">Días que decides rentarlo al mes</span>
                    <span className="font-black text-neutral-900">{daysPerMonth} días</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={28}
                    step={1}
                    value={daysPerMonth}
                    onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                    <span>3 días (Fines de semana)</span>
                    <span>15 días (Medio mes)</span>
                    <span>28 días (Flota activa)</span>
                  </div>
                </div>

                {/* Calculation breakdown card */}
                <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-3">
                  <div className="flex justify-between text-xs text-neutral-600">
                    <span>Tarifa que paga el cliente (+33% servicio):</span>
                    <span className="font-semibold text-neutral-900">${clientPricePerDay.toLocaleString('es-MX')} MXN/día</span>
                  </div>

                  <div className="pt-2 border-t border-neutral-200">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                      Pago neto directo a tu cuenta bancaria (100% de tu tarifa):
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                        ${hostEarnings.toLocaleString('es-MX')}
                      </span>
                      <span className="text-xs font-bold text-neutral-600">MXN / mes</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-500 leading-normal">
                    *El anfitrión recibe el 100% de la tarifa que fija. Los pagos se transfieren al término de cada contrato tras la revisión en Sucursal Plaza 450.
                  </p>
                </div>

                {/* TODO: Reemplazar con enlace a WhatsApp de evaluación de vehículos */}
                <a
                  href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent,%20quiero%20evaluar%20mi%20auto%20para%20rentarlo%20en%20Durango"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3.5 rounded-xl border border-black text-neutral-900 font-bold text-xs hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  Consultar evaluación de mi vehículo
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
