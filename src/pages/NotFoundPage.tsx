import React from 'react';
import { Car, KeyRound, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-[75vh] flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-white text-center">
      <div className="max-w-lg mx-auto flex flex-col items-center">
        
        {/* Ilustración 3D */}
        <div className="mb-6 flex justify-center">
          <img
            src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793605036943-0-gemini_generated_image_udcky4udcky4udck.webp"
            alt="Página no encontrada - Error 404 GALSA Rent"
            className="w-56 sm:w-72 md:w-80 h-auto object-contain mx-auto"
            loading="eager"
          />
        </div>

        {/* Pill indicador de error */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-heading font-bold mb-3 border border-slate-200/80">
          <span>Error 404</span>
        </div>

        {/* Título sencillo */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
          Parece que esta ruta no existe
        </h1>

        {/* Descripción */}
        <p className="mt-3 text-sm sm:text-base font-sans text-slate-600 leading-relaxed max-w-md mx-auto">
          No encontramos la página que buscas, pero nuestros autos siguen listos para tu próximo viaje en Durango o para generar ingresos.
        </p>

        {/* Botones de acción: Renta un auto | Pon tu auto a trabajar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
          <button
            type="button"
            onClick={() => handleNav('/catalogo')}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-heading font-bold transition-all shadow-xs cursor-pointer"
          >
            <Car className="w-4 h-4" />
            <span>Renta un auto</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleNav('/anfitriones')}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] border border-slate-300 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.99] text-slate-800 text-sm font-heading font-semibold transition-all bg-white cursor-pointer shadow-xs"
          >
            <KeyRound className="w-4 h-4 text-slate-600" />
            <span>Pon tu auto a trabajar</span>
          </button>
        </div>

        {/* Enlace secundario */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => handleNav('/')}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al inicio</span>
          </button>
        </div>

      </div>
    </div>
  );
};
