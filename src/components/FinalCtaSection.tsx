import React from 'react';

interface FinalCtaSectionProps {
  onNavigate?: (path: string) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onNavigate }) => {
  const dudasImg = 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793605036943-0-gemini_generated_image_udcky4udcky4udck.webp';

  const handleCatalog = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/catalogo');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInfo = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/como-funciona');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 md:py-14 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Card Contenedor con fondo gris 50 sin borde, bordes redondeados y padding idéntico a la referencia */}
        <div className="w-full bg-gray-50 rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 lg:p-14 border-0 shadow-none">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Lado Izquierdo: Título, Descripción y CTA Hablar por WhatsApp sin icono */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-4 sm:space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                ¿Tienes dudas sobre tu renta?
              </h2>

              <p className="text-sm sm:text-[15px] font-sans text-slate-600 leading-relaxed max-w-lg">
                Atención local directa y personalizada en México. Resolvemos tus preguntas sobre modelos, requisitos, depósitos en garantía y entregas oficiales.
              </p>

              {/* Botón CTA único: Hablar por WhatsApp sin icono */}
              <div className="pt-2">
                <a
                  href="https://wa.me/526181234567?text=Hola%20GALSA%20Rent%2C%20tengo%20dudas%20sobre%20la%20renta%20de%20un%20auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: '#3D63FF' }}
                  className="inline-flex items-center justify-center text-white hover:brightness-110 active:scale-95 font-heading font-semibold text-sm px-7 py-3.5 rounded-xl transition-all shadow-none"
                >
                  <span>Hablar por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Lado Derecho: Imagen de dudas con esquinas redondeadas igual al mockup */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-[16/10] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-transparent border-0 shadow-none">
                <img
                  src={dudasImg}
                  alt="Atención y renta de autos en México con GALSA Rent"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
