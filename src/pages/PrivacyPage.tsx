import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-neutral-800">
        <div>
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Protección de datos personales
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-slate-900">
            Aviso de Privacidad Integral
          </h1>
          <p className="mt-2 text-xs text-slate-500">En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) · México</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed border-t border-slate-200 pt-6">
          <section className="space-y-2">
            <h2 className="text-base font-heading font-bold text-slate-900">1. Responsable del Tratamiento</h2>
            <p>
              GALSA Rent, con domicilio de atención en Sucursal Plaza 450, Blvd. Guadiana, Durango, Dgo., México, es responsable del tratamiento legítimo, controlado e informado de sus datos personales.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-heading font-bold text-slate-900">2. Finalidades Primarias</h2>
            <p>
              Los datos recabados (nombre, teléfono, correo electrónico, identificación oficial INE, licencia de conducir, comprobante domiciliario, documentos vehiculares y datos bancarios de anfitriones) son utilizados estrictamente para: validar la identidad de conductores y anfitriones, verificar la propiedad de cada vehículo antes de su publicación en el marketplace, elaborar el contrato mercantil digital de renta de autos y procesar pagos, reembolsos de depósitos y liquidaciones bancarias mediante la app de GALSA.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-ink-900">3. Derechos ARCO</h2>
            <p>
              Usted podrá ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación y Oposición enviando una solicitud formal a <strong>soporte@galsarent.com.mx</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
