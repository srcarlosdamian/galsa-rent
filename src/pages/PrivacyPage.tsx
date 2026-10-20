import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-neutral-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Protección de datos personales
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">
            Aviso de Privacidad Integral
          </h1>
          <p className="mt-2 text-xs text-neutral-500">En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) · Durango, México</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed border-t border-neutral-200 pt-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">1. Responsable del Tratamiento</h2>
            <p>
              GALSA Rent, con domicilio de atención en Sucursal Plaza 450, Blvd. Guadiana, Durango, Dgo., México, es responsable del tratamiento legítimo, controlado e informado de sus datos personales.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">2. Finalidades Primarias</h2>
            <p>
              Los datos recabados (nombre, teléfono, identificación oficial INE, licencia de conducir, comprobante domiciliario) son utilizados estrictamente para: validar su identidad, elaborar el contrato mercantil digital de renta de autos, dar seguimiento al uso de la unidad y procesar pagos y reembolsos de depósitos en garantía.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900">3. Derechos ARCO</h2>
            <p>
              Usted podrá ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación y Oposición enviando una solicitud formal a <strong>contacto@galsarent.com.mx</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
