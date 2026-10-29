import React from 'react';
import { ShieldCheck, DollarSign, CalendarCheck } from 'lucide-react';

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

  const VENTAJAS = [
    {
      id: 1,
      title: 'Tú fijas tu tarifa diaria',
      description: 'Control total de tus precios y disponibilidad de calendario sin intermediarios forzosos.',
      icon: DollarSign,
    },
    {
      id: 2,
      title: 'Conductores 100% verificados',
      description: 'Validación estricta de INE, licencia vigente y comprobante de domicilio antes de entregar la unidad.',
      icon: ShieldCheck,
    },
    {
      id: 3,
      title: 'Contrato digital respaldado',
      description: 'Firma electrónica legal mercantil con seguro y depósito en garantía para tu tranquilidad.',
      icon: CalendarCheck,
    },
  ];

  return (
    <section className="py-10 md:py-14 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Contenedor principal con 2 bloques lado a lado como el ejemplo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Bloque Izquierdo: Cuadrado azul clarito con Título, Texto y CTA (sin línea de borde) */}
          <div className="lg:col-span-7 bg-[#94BDC9]/35 sm:bg-[#97C0CB]/40 rounded-[28px] p-8 sm:p-12 flex flex-col justify-between items-start min-h-[360px]">
            <div className="space-y-4 max-w-xl text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-slate-900 leading-tight tracking-tight">
                ¿Tienes un auto que no usas todos los días?
              </h3>
              <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed">
                Ponlo a trabajar en el marketplace de GALSA Rent en México. Tú fijas tu tarifa por día y recibes el 100% de tus ganancias con clientes verificados y contrato digital respaldado.
              </p>
            </div>

            <div className="pt-8">
              <a
                href="/anfitriones"
                onClick={handleClick}
                style={{ backgroundColor: '#3D63FF' }}
                className="inline-flex items-center justify-center hover:opacity-95 text-white font-heading font-semibold text-sm px-7 py-3.5 rounded-xl transition-all active:scale-95 border-0 outline-none shadow-none"
              >
                <span>Conocer programa de anfitriones</span>
              </a>
            </div>
          </div>

          {/* Bloque Derecho: Cuadrado blanco con bordes redondeados y Ventajas */}
          <div className="lg:col-span-5 bg-white rounded-[28px] p-6 sm:p-8 border border-neutral-200/90 flex flex-col justify-between shadow-sm">
            <div>
              <h4 className="text-lg font-heading font-semibold text-slate-900 mb-6 text-left">
                Ventajas
              </h4>

              <div className="divide-y divide-neutral-100">
                {VENTAJAS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4 text-left">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-700 mt-0.5">
                        <Icon className="w-4 h-4 text-slate-700" strokeWidth={1.4} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-heading font-semibold text-slate-900 leading-snug">
                          {item.title}
                        </p>
                        <p className="text-xs font-sans text-slate-500 leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-neutral-100 text-left">
              <a
                href="/terminos"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/terminos');
                  }
                }}
                className="text-xs font-heading font-medium text-slate-500 hover:text-slate-900 underline underline-offset-4 transition-colors"
              >
                Consulta los Términos y Condiciones
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
