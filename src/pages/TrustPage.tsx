import React from 'react';

export const TrustPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8 text-neutral-800">
        <div>
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Seguridad jurídica y vehicular
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-slate-900">
            Seguridad, Contrato y Cobertura
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            Última actualización: Noviembre 2026 · Sucursal Plaza 450, Durango, México
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed border-t border-slate-200 pt-6">
          <section className="space-y-2">
            <h2 className="text-base font-heading font-bold text-slate-900">
              1. Validez Legal del Contrato Mercantil Digital
            </h2>
            <p>
              En cumplimiento del Código de Comercio y la legislación mercantil mexicana aplicable, los contratos de adhesión de GALSA Rent son firmados mediante medios electrónicos con sellado de tiempo, garantizando la identidad de los contratantes y la integridad de los acuerdos pactados.
            </p>
            <p>
              Tanto el arrendatario como el anfitrión cuentan con una copia digital certificada enviada a sus correos al momento de la firma.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-heading font-bold text-slate-900">
              2. Verificación de Conductores y Unidades
            </h2>
            <p>
              Todo conductor valida su identidad con identificación oficial vigente (INE o pasaporte), licencia de conducir con antigüedad mínima de 2 años, comprobante de domicilio reciente y método de pago a su nombre antes de recibir las llaves.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-heading font-bold text-slate-900">
              3. Seguro con Cobertura Amplia e Inspección en Sucursal
            </h2>
            <p>
              Cada unidad publicada cuenta con seguro vigente durante todo el trayecto en México y pasa por una inspección física, documental y fotográfica antes de cada entrega y devolución en Sucursal Plaza 450, Blvd. Guadiana, Durango.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-heading font-bold text-slate-900">
              4. Depósito en Garantía y Soporte Continuo
            </h2>
            <p>
              El depósito en garantía es 100% reembolsable al devolver la unidad conforme al checklist fotográfico de entrega. Para asistencia en ruta o aclaraciones legales, nuestro equipo atiende en <strong>soporte@galsarent.com.mx</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
