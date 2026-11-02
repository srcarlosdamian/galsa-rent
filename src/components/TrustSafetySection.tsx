import React from 'react';

export const TrustSafetySection: React.FC = () => {
  const trustImg = 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793602180349-0-gemini_generated_image_jh5gb1jh5gb1jh5g-2.webp';

  return (
    <section id="seguridad" className="w-full py-10 md:py-14 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Contenedor gris 50 con max-width y bordes redondeados sin bordes */}
        <div className="w-full bg-gray-50 rounded-[28px] sm:rounded-[32px] p-8 sm:p-12 lg:p-16 border-0 shadow-none">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
            
            {/* Lado Izquierdo: Imagen cuadrada con bordes redondeados sin borde */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[440px] aspect-square rounded-[24px] sm:rounded-[28px] overflow-hidden bg-transparent border-0 shadow-none">
                <img
                  src={trustImg}
                  alt="Cada renta respaldada de principio a fin con GALSA"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Lado Derecho: Título, subtítulo y botón */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold text-neutral-900 tracking-tight leading-tight">
                Cada renta, respaldada de principio a fin
              </h2>

              <p className="text-sm sm:text-base font-sans text-neutral-600 leading-relaxed max-w-xl">
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

      </div>
    </section>
  );
};
