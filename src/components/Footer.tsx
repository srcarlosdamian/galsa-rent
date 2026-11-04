import React from 'react';
import { GalsaLogo } from './GalsaLogo';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white text-slate-900 border-t border-slate-100">
      
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 lg:pr-4">
            <div className="flex items-center">
              <GalsaLogo className="h-6 w-auto text-blue-500" />
            </div>
            
            <p className="text-[13px] font-heading font-normal text-slate-500 leading-relaxed">
              Renta de autos 100% en línea con contrato digital y kilometraje libre en Durango, México.
            </p>

            <p className="text-[12px] font-heading text-slate-400">
              soporte@galsarent.com.mx
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div className="space-y-3">
            <p className="text-[13px] font-heading font-semibold text-slate-900 tracking-tight">
              Explorar
            </p>
            <ul className="space-y-2 text-[13px] font-heading text-slate-500">
              <li><a href="/" onClick={(e) => handleLink(e, '/')} className="hover:text-black transition-colors">Inicio</a></li>
              <li><a href="/catalogo" onClick={(e) => handleLink(e, '/catalogo')} className="hover:text-black transition-colors">Catálogo de autos</a></li>
              <li><a href="/como-funciona" onClick={(e) => handleLink(e, '/como-funciona')} className="hover:text-black transition-colors">Cómo funciona</a></li>
              <li><a href="/nosotros" onClick={(e) => handleLink(e, '/nosotros')} className="hover:text-black transition-colors">Sobre nosotros</a></li>
              <li><a href="/anfitriones" onClick={(e) => handleLink(e, '/anfitriones')} className="hover:text-black transition-colors">Anfitriones</a></li>
            </ul>
          </div>

          {/* Columna 3: Blog y Ayuda */}
          <div className="space-y-3">
            <p className="text-[13px] font-heading font-semibold text-slate-900 tracking-tight">
              Ayuda & Guías
            </p>
            <ul className="space-y-2 text-[13px] font-heading text-slate-500">
              <li><a href="/faq" onClick={(e) => handleLink(e, '/faq')} className="hover:text-black transition-colors">Preguntas frecuentes</a></li>
              <li><a href="/blog/guia-renta-autos-mexico-requisitos" onClick={(e) => handleLink(e, '/blog/guia-renta-autos-mexico-requisitos')} className="hover:text-black transition-colors">Requisitos de renta</a></li>
              <li><a href="/blog/como-ganar-dinero-rentando-tu-auto-anfitrion" onClick={(e) => handleLink(e, '/blog/como-ganar-dinero-rentando-tu-auto-anfitrion')} className="hover:text-black transition-colors">Gana con tu auto</a></li>
              <li><a href="/blog" onClick={(e) => handleLink(e, '/blog')} className="hover:text-black transition-colors">Blog de viajes</a></li>
              <li><a href="/contacto" onClick={(e) => handleLink(e, '/contacto')} className="hover:text-black transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div className="space-y-3">
            <p className="text-[13px] font-heading font-semibold text-slate-900 tracking-tight">
              Legal
            </p>
            <ul className="space-y-2 text-[13px] font-heading text-slate-500">
              <li><a href="/terminos" onClick={(e) => handleLink(e, '/terminos')} className="hover:text-black transition-colors">Términos y condiciones</a></li>
              <li><a href="/privacidad" onClick={(e) => handleLink(e, '/privacidad')} className="hover:text-black transition-colors">Aviso de privacidad</a></li>
              <li><a href="/confianza" onClick={(e) => handleLink(e, '/confianza')} className="hover:text-black transition-colors">Contrato y cobertura</a></li>
              <li><a href="/terminos#cancelaciones" onClick={(e) => handleLink(e, '/terminos')} className="hover:text-black transition-colors">Políticas de cancelación</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar minimalista */}
      <div className="border-t border-slate-100 py-6">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center sm:justify-end gap-4 text-[12px] font-heading text-slate-400">
          <div className="flex items-center space-x-6">
            <a href="/privacidad" onClick={(e) => handleLink(e, '/privacidad')} className="hover:text-slate-700 transition-colors">Privacidad</a>
            <a href="/terminos" onClick={(e) => handleLink(e, '/terminos')} className="hover:text-slate-700 transition-colors">Términos</a>
            <a href="/confianza" onClick={(e) => handleLink(e, '/confianza')} className="hover:text-slate-700 transition-colors">Seguridad</a>
            <a href="/contacto" onClick={(e) => handleLink(e, '/contacto')} className="hover:text-slate-700 transition-colors">Contacto</a>
          </div>
        </div>
      </div>

      {/* Listón de control interno de despliegue / QA (No forma parte del diseño final) */}
      <div className="bg-black text-white text-[11px] font-mono py-2 px-4 border-t border-neutral-800 text-center tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-neutral-400">
          <span className="text-amber-400 font-semibold">[ENTORNO DE PRUEBAS / QA — Este listón no va en el diseño final]</span>
          <div className="flex items-center gap-3 text-white">
            <span>Última actualización: <strong>04 Nov 2026, 03:25 hrs</strong></span>
            <span className="bg-neutral-800 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">v2.2.67</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
