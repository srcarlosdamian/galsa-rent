import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-neutral-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Marco normativo
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">
            Términos y Condiciones del Contrato Digital
          </h1>
          <p className="mt-2 text-xs text-neutral-500">Última actualización: Octubre 2026 · Durango, Dgo., México</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed border-t border-neutral-200 pt-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">1. Objeto y Operación</h2>
            <p>
              GALSA Rent opera una plataforma tecnológica que facilita la renta de autos propios y el marketplace de vehículos de anfitriones particulares exclusivamente en el municipio de Durango, Dgo., con entrega y recepción física en Sucursal Plaza 450.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">2. Tarifas y Estructura de Cobro</h2>
            <p>
              El cliente paga el importe correspondiente a los días de renta según la tarifa diaria fijada para el vehículo + una tarifa de servicio de 33% (IVA incluido) que ampara la validación tecnológica, cobertura y operación. El anfitrión recibe el 100% de la tarifa por día que fija, sin comisiones deducidas.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">3. Requisitos del Conductor</h2>
            <p>
              Para conducir las unidades se requiere: licencia de conducir vigente con antigüedad mínima de 2 años, identificación oficial (INE o pasaporte), comprobante de domicilio no mayor a 3 meses y edad mínima de 21 años cumplidos.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">4. Depósito en Garantía y Cancelaciones</h2>
            <p>
              El depósito en garantía se retiene de forma temporal y se devuelve al 100% al momento de la entrega en Sucursal Plaza 450 tras cotejo del checklist fotográfico. Las cancelaciones con más de 48 horas de anticipación son 100% reembolsables.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
