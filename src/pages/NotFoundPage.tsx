import React from 'react';

interface NotFoundPageProps {
  onNavigate?: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-100 py-10 sm:py-16 px-4 sm:px-6 flex items-center justify-center">
      {/* Contenedor blanco principal sin línea (border-0) */}
      <div className="w-full max-w-[540px] bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 text-center shadow-xs">
        
        {/* Ilustración 3D con bordes redondeados abarcando el ancho máximo del contenedor */}
        <div className="w-full rounded-[16px] sm:rounded-[20px] overflow-hidden mb-6 bg-slate-50">
          <img
            src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793605036943-0-gemini_generated_image_udcky4udcky4udck.webp"
            alt="Página no encontrada - ERROR 404 GALSA Rent"
            className="w-full h-auto object-cover rounded-[16px] sm:rounded-[20px] block"
            loading="eager"
          />
        </div>

        {/* ERROR 404 en mayúsculas sin badge */}
        <div className="mb-2">
          <span className="text-xs sm:text-sm font-heading font-extrabold tracking-widest text-slate-400 uppercase">
            ERROR 404
          </span>
        </div>

        {/* Título sencillo */}
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
          Parece que esta ruta no existe
        </h1>

        {/* Descripción */}
        <p className="mt-3 text-sm sm:text-base font-sans font-normal text-slate-600 leading-relaxed max-w-md mx-auto">
          No encontramos la página que buscas, pero nuestros autos siguen listos para tu próximo viaje en Durango o para generar ingresos.
        </p>

        {/* Botones de acción sin icono: Renta un auto | Pon tu auto a trabajar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={() => handleNav('/catalogo')}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-[10px] bg-cta-600 hover:bg-cta-700 active:scale-[0.99] text-white text-sm font-heading font-bold transition-all shadow-xs cursor-pointer"
          >
            Renta un auto
          </button>
          
          <button
            type="button"
            onClick={() => handleNav('/anfitriones')}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-[10px] border border-slate-300 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.99] text-slate-800 text-sm font-heading font-semibold transition-all bg-white cursor-pointer shadow-xs"
          >
            Pon tu auto a trabajar
          </button>
        </div>

      </div>
    </div>
  );
};
