import React from 'react';

interface FinalCtaSectionProps {
  onNavigate?: (path: string) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onNavigate }) => {
  const baseUrl = ((import.meta as any).env?.BASE_URL || '/');
  const heroCarImg = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}images/figma-hero.webp`;

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
        
        {/* Card Contenedor con fondo gris claro, bordes redondeados y padding idéntico a la referencia */}
        <div className="w-full bg-[#F9FAFB] border border-slate-200/60 rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 lg:p-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Lado Izquierdo: Título, Descripción, CTA principal y Segundo CTA */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-4 sm:space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                Renta un auto en México con entrega rápida y sin filas
              </h2>

              <p className="text-sm sm:text-[15px] font-sans text-slate-600 leading-relaxed max-w-lg">
                Elige tu unidad en minutos, firma tu contrato digital desde tu celular y recoge en nuestras sucursales oficiales o terminales. Depósito en garantía 100% reembolsable.
              </p>

              {/* Botón Principal (Morado/Azul) + Segundo Botón (Texto / Más información) */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
                <a
                  href="/catalogo"
                  onClick={handleCatalog}
                  style={{ backgroundColor: '#4F46E5' }}
                  className="inline-flex items-center justify-center text-white hover:brightness-110 active:scale-95 font-heading font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-xs"
                >
                  <span>Ver rentas</span>
                </a>

                <a
                  href="/como-funciona"
                  onClick={handleInfo}
                  className="text-sm font-heading font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors"
                >
                  Más información
                </a>
              </div>
            </div>

            {/* Lado Derecho: Imagen del hero con esquinas redondeadas igual al mockup */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-[16/10] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-200 shadow-sm border border-slate-200/80">
                <img
                  src={heroCarImg}
                  alt="Renta de autos en México con GALSA Rent"
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
