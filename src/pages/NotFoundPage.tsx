import React from 'react';
import { ArrowRight, Search, CarFront } from 'lucide-react';

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
    <div className="py-20 md:py-32 bg-white text-center">
      <div className="max-w-md mx-auto px-4 space-y-6">
        <span className="text-6xl font-black text-neutral-900 tracking-tighter block">404</span>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900">
          Página no encontrada
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          La ruta que intentas consultar no existe o ha sido reubicada. Puedes explorar nuestra flota de vehículos disponibles en Durango.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleNav('/catalogo')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold px-6 py-3.5 rounded-full transition-all"
          >
            <CarFront className="w-4 h-4" />
            <span>Ver catálogo de autos</span>
          </button>
          <button
            type="button"
            onClick={() => handleNav('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-300 hover:border-black text-neutral-900 text-xs font-bold px-6 py-3.5 rounded-full transition-all"
          >
            <span>Ir al inicio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
