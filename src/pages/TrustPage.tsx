import React from 'react';
import { TrustSafetySection } from '../components/TrustSafetySection';
import { ShieldCheck, FileCheck, CheckCircle2, Lock } from 'lucide-react';

export const TrustPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
          Seguridad jurídica y vehicular
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900">
          Seguridad y Confianza en Renta de Autos en Durango
        </h1>
        <p className="mt-4 text-base text-neutral-600 max-w-2xl mx-auto">
          Contrato digital con validez legal, seguro con cobertura amplia e inspección de cada vehículo antes de entregarse en Sucursal Plaza 450, Durango.
        </p>
      </div>

      <TrustSafetySection />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-6 text-xs text-neutral-700 leading-relaxed">
        <div className="p-6 rounded-3xl border border-neutral-200 bg-neutral-50/50 space-y-3">
          <h2 className="text-base font-bold text-neutral-900">
            Validez legal del contrato mercantil digital
          </h2>
          <p>
            En cumplimiento del Código de Comercio y la legislación mercantil mexicana aplicable, los contratos de adhesión de GALSA Rent son firmados mediante medios electrónicos con sellado de tiempo, garantizando la identidad de los contratantes y la integridad de los acuerdos pactados.
          </p>
          <p>
            Tanto el arrendatario como el anfitrión cuentan con una copia digital certificada enviada a sus correos al momento de la firma.
          </p>
        </div>
      </div>
    </div>
  );
};
