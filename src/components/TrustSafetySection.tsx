import React from 'react';
import { ShieldCheck, FileCheck, Camera, Lock } from 'lucide-react';

export const TrustSafetySection: React.FC = () => {
  return (
    <section id="seguridad" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Certeza y transparencia
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Cada renta, respaldada de principio a fin
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            En GALSA cuidamos la tranquilidad del cliente y del anfitrión mediante verificación digital, contratos formales y seguro durante todo el trayecto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-7 rounded-3xl border border-neutral-200 bg-white hover:border-black transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-5">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Contratos digitales con validez legal
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Firmados electrónicamente con sellado de tiempo y validez jurídica mercantil en México. Términos claros, sin costos ocultos ni letras pequeñas.
            </p>
          </div>

          <div className="p-7 rounded-3xl border border-neutral-200 bg-white hover:border-black transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-5">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Validación documental rigurosa
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Verificamos la autenticidad de la licencia de conducir, INE y comprobante de domicilio para garantizar la seguridad de toda la comunidad.
            </p>
          </div>

          <div className="p-7 rounded-3xl border border-neutral-200 bg-white hover:border-black transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-5">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Checklist fotográfico en Plaza 450
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Documentamos el estado exterior, interior y nivel de combustible al entregar y devolver. Sin controversias y con liberación ágil del depósito.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
