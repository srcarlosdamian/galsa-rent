import React from 'react';
import { Shield, FileCheck, Camera, HelpCircle, Lock, Award } from 'lucide-react';

export const TrustSafetySection: React.FC = () => {
  return (
    <section id="seguridad" className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Tranquilidad absoluta</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Cada viaje, respaldado con certeza jurídica y seguro
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            En GALSA cuidamos tanto a los conductores como a los anfitriones de flota con tecnología de verificación y contratos legales claros.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl border border-neutral-200 bg-white hover:border-black transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-6">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">
              Contrato digital vinculante
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Firmado electrónicamente con sellado de tiempo y validez jurídica mercantil en México. Condiciones claras sin letras chiquitas.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-neutral-500">
              <li>✓ Términos transparentes de uso y depósito</li>
              <li>✓ Copia en PDF enviada al instante a tu correo</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl border border-neutral-200 bg-white hover:border-black transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">
              Validación de identidad
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Verificamos la autenticidad de la licencia de conducir y credenciales oficiales mediante biometría digital y cotejo en tiempo real.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-neutral-500">
              <li>✓ Filtro riguroso anti-fraude</li>
              <li>✓ Protección de datos personales cifrados</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl border border-neutral-200 bg-white hover:border-black transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-6">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">
              Checklist fotográfico 360°
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Antes de encender el motor y al momento de entregar, documentamos el estado de carrocería, llantas y combustible en fotos fechadas.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-neutral-500">
              <li>✓ Cero controversias en devolución</li>
              <li>✓ Reembolso veloz de depósito en garantía</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
