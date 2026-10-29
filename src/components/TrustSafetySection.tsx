import React from 'react';

export const TrustSafetySection: React.FC = () => {
  const baseUrl = ((import.meta as any).env?.BASE_URL || '/');
  const trustImg = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}images/renta-galsa.webp`;

  return (
    <section id="seguridad" className="w-full py-12 md:py-20 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          
          {/* Lado Izquierdo: Imagen cuadrada con bordes redondeados */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[480px] aspect-square rounded-[32px] overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
              <img
                src={trustImg}
                alt="Cada renta respaldada de principio a fin con GALSA"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Lado Derecho: Título, subtítulo y botón nada más */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold text-white tracking-tight leading-tight">
              Cada renta, respaldada de principio a fin
            </h2>

            <p className="text-sm sm:text-base font-sans text-neutral-300 leading-relaxed max-w-xl">
              En GALSA cuidamos la tranquilidad del cliente y del anfitrión mediante verificación digital, contratos formales y seguro durante todo el trayecto en México.
            </p>

            <div className="pt-2">
              <a
                href="/catalogo"
                style={{ backgroundColor: '#3D63FF' }}
                className="inline-flex items-center justify-center text-white hover:brightness-105 active:scale-95 font-heading font-semibold text-sm px-7 py-3.5 rounded-xl transition-all"
              >
                <span>Renta tu primer auto</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
