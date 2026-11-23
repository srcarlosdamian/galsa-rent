import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8 text-neutral-800">
        <div>
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Marco normativo
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-slate-900">
            Términos y Condiciones del Contrato Digital
          </h1>
          <p className="mt-2 text-xs text-slate-500">Última actualización: Noviembre 2026 · México</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed border-t border-slate-200 pt-6">
          <section className="space-y-2">
            <h2 className="text-base font-heading font-bold text-slate-900">1. Objeto y Operación</h2>
            <p>
              GALSA Rent opera una plataforma tecnológica en México que facilita la renta de vehículos propios y el marketplace de autos de anfitriones verificados, contando con nuestra Sucursal Plaza 450 en Durango, Dgo., como punto físico oficial de entrega y recepción.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-heading font-bold text-slate-900">2. Tarifas, Anfitriones y Estructura de Cobro</h2>
            <p>
              El cliente cubre el importe de los días de renta según la tarifa diaria del vehículo más una tarifa de servicio del 33% (IVA incluido) destinada a validación tecnológica, cobertura y operación. En el programa de anfitriones, GALSA revisa cada solicitud en un plazo de 24 a 48 horas; el anfitrión recibe el 100% de la tarifa diaria que establece, depositada en la cuenta bancaria registrada en la app, mientras la tarifa de servicio del 33% la paga el cliente.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-heading font-bold text-slate-900">3. Requisitos del Conductor</h2>
            <p>
              Para conducir las unidades se requiere: licencia de conducir vigente con antigüedad mínima de 2 años, identificación oficial (INE o pasaporte), comprobante de domicilio no mayor a 3 meses y edad mínima de 21 años cumplidos.
            </p>
          </section>

          <section id="cancelaciones" className="space-y-2">
            <h2 className="text-base font-heading font-bold text-slate-900">4. Depósito en Garantía y Cancelaciones</h2>
            <p>
              El depósito en garantía se retiene de forma temporal y se devuelve al 100% al momento de la entrega en Sucursal Plaza 450 tras cotejo del checklist fotográfico. Las cancelaciones con más de 48 horas de anticipación son 100% reembolsables.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
