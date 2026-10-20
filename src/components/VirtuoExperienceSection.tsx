import React from 'react';
import { CalendarRange, ClipboardCheck, FileCheck, Headset, Smartphone, Check } from 'lucide-react';

export const VirtuoExperienceSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Virtuo-inspired Dark Container Card (Screenshot 2) */}
        <div className="bg-neutral-900 rounded-[32px] text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-dropdown">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-3">
                  Experiencia 100% en línea en Durango
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  Rentar con GALSA es así de simple
                </h2>
                <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
                  Sin traslados innecesarios ni papeleo en mostrador. Selecciona tu vehículo, valida tu identidad y firma tu contrato digital directamente desde tu celular.
                </p>
              </div>

              {/* 4 Client Cards specified in Tarea 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                
                {/* Tarjeta 1 */}
                <div className="p-5 rounded-2xl bg-neutral-800/80 border border-neutral-700/80">
                  <div className="w-10 h-10 rounded-xl bg-white text-neutral-900 flex items-center justify-center mb-3.5">
                    <CalendarRange className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">
                    Elige por día, semana o mes
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Planes flexibles adaptados a tus fechas de viaje, trabajo o compromisos familiares en Durango.
                  </p>
                </div>

                {/* Tarjeta 2 */}
                <div className="p-5 rounded-2xl bg-neutral-800/80 border border-neutral-700/80">
                  <div className="w-10 h-10 rounded-xl bg-white text-neutral-900 flex items-center justify-center mb-3.5">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">
                    Autos revisados uno por uno
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Inspección física, documental y fotográfica rigurosa antes de publicar cada unidad en la plataforma.
                  </p>
                </div>

                {/* Tarjeta 3 */}
                <div className="p-5 rounded-2xl bg-neutral-800/80 border border-neutral-700/80">
                  <div className="w-10 h-10 rounded-xl bg-white text-neutral-900 flex items-center justify-center mb-3.5">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">
                    Contrato digital con validez legal
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Firma electrónica segura con sellado de tiempo, certeza jurídica mercantil y sin letras chiquitas.
                  </p>
                </div>

                {/* Tarjeta 4 */}
                <div className="p-5 rounded-2xl bg-neutral-800/80 border border-neutral-700/80">
                  <div className="w-10 h-10 rounded-xl bg-white text-neutral-900 flex items-center justify-center mb-3.5">
                    <Headset className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">
                    Ayuda cuando la necesitas
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Atención local directa en Durango vía WhatsApp para asistirte antes, durante y al devolver tu auto.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Visual Column (Phone Mockup inspired by Screenshot 2) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-[28px] bg-neutral-950 border border-neutral-700 p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    Reserva digital activa
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Plaza 450
                  </span>
                </div>

                <div className="rounded-xl bg-neutral-900 p-3.5 border border-neutral-800 space-y-2">
                  <p className="text-[11px] text-neutral-400 font-medium">Auto asignado para hoy</p>
                  <p className="text-sm font-bold text-white">Nissan Sentra Sense 2024</p>
                  <div className="flex justify-between text-xs text-neutral-400 pt-1">
                    <span>Tarifa día: $1,100 MXN</span>
                    <span className="text-emerald-400 font-semibold">100% verificado</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-300 pt-1">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Identificación e INE validadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Contrato digital firmado electrónicamente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Entrega programada en Sucursal Plaza 450</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#catalogo"
                    className="block w-full py-3 rounded-xl bg-white text-neutral-900 text-center text-xs font-bold hover:bg-neutral-100 transition-colors"
                  >
                    Ver autos listos en catálogo
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
