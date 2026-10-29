import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
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
    <footer className="bg-[#F9FAFB] text-neutral-900 text-xs">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <GalsaLogo className="h-6 w-auto text-neutral-900" />
            </div>
            
            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
              GALSA Rent: renta de autos en México, marketplace de anfitriones y unidades verificadas para traslados personales y corporativos.
            </p>

            {/* NAP Local Data */}
            <div className="space-y-2 pt-1 text-neutral-700 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                <span>Sucursal Plaza 450, Blvd. Guadiana, Durango, Dgo., C.P. 34138, México</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Lunes a Domingo: 08:00 - 20:00 hrs</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>+52 618 000 0000 · WhatsApp & Atención</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>contacto@galsarent.com.mx</span>
              </div>
            </div>
          </div>

          {/* Columna 1: Páginas de Navegación */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Navegación
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="/" onClick={(e) => handleLink(e, '/')} className="hover:text-black transition-colors">Inicio</a></li>
              <li><a href="/catalogo" onClick={(e) => handleLink(e, '/catalogo')} className="hover:text-black transition-colors">Catálogo de autos</a></li>
              <li><a href="/como-funciona" onClick={(e) => handleLink(e, '/como-funciona')} className="hover:text-black transition-colors">Cómo funciona</a></li>
              <li><a href="/nosotros" onClick={(e) => handleLink(e, '/nosotros')} className="hover:text-black transition-colors">Sobre nosotros</a></li>
              <li><a href="/anfitriones" onClick={(e) => handleLink(e, '/anfitriones')} className="hover:text-black transition-colors">Anfitriones</a></li>
              <li><a href="/contacto" onClick={(e) => handleLink(e, '/contacto')} className="hover:text-black transition-colors">Contacto y Sucursal</a></li>
            </ul>
          </div>

          {/* Columna 2: Blog y Artículos */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Blog y Guías
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="/blog" onClick={(e) => handleLink(e, '/blog')} className="hover:text-black transition-colors font-medium text-neutral-900">Todos los artículos</a></li>
              <li><a href="/blog/guia-renta-autos-mexico-requisitos" onClick={(e) => handleLink(e, '/blog/guia-renta-autos-mexico-requisitos')} className="hover:text-black transition-colors">Requisitos de renta</a></li>
              <li><a href="/blog/como-ganar-dinero-rentando-tu-auto-anfitrion" onClick={(e) => handleLink(e, '/blog/como-ganar-dinero-rentando-tu-auto-anfitrion')} className="hover:text-black transition-colors">Gana dinero como anfitrión</a></li>
              <li><a href="/blog/rutas-imperdibles-por-carretera-en-durango-y-mexico" onClick={(e) => handleLink(e, '/blog/rutas-imperdibles-por-carretera-en-durango-y-mexico')} className="hover:text-black transition-colors">Rutas por carretera</a></li>
              <li><a href="/faq" onClick={(e) => handleLink(e, '/faq')} className="hover:text-black transition-colors">Preguntas frecuentes</a></li>
            </ul>
          </div>

          {/* Columna 3: Todo lo Legal */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Marco Legal
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li><a href="/terminos" onClick={(e) => handleLink(e, '/terminos')} className="hover:text-black transition-colors">Términos y condiciones</a></li>
              <li><a href="/privacidad" onClick={(e) => handleLink(e, '/privacidad')} className="hover:text-black transition-colors">Aviso de privacidad</a></li>
              <li><a href="/confianza" onClick={(e) => handleLink(e, '/confianza')} className="hover:text-black transition-colors">Contrato digital y seguro</a></li>
              <li><a href="/terminos#cancelaciones" onClick={(e) => handleLink(e, '/terminos')} className="hover:text-black transition-colors">Políticas de cancelación</a></li>
              <li><a href="/terminos#coberturas" onClick={(e) => handleLink(e, '/terminos')} className="hover:text-black transition-colors">Coberturas y depósitos</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar sin línea divisoria en gris claro continuo */}
      <div className="bg-[#F9FAFB] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500">
          <p>© 2026 GALSA Rent. Operando en Durango, México.</p>

          <div className="flex items-center space-x-5">
            <a href="/privacidad" onClick={(e) => handleLink(e, '/privacidad')} className="hover:text-black transition-colors">Aviso de privacidad</a>
            <a href="/terminos" onClick={(e) => handleLink(e, '/terminos')} className="hover:text-black transition-colors">Términos del contrato</a>
            <a href="/blog" onClick={(e) => handleLink(e, '/blog')} className="hover:text-black transition-colors">Blog</a>
            <a href="/contacto" onClick={(e) => handleLink(e, '/contacto')} className="hover:text-black transition-colors">Contacto</a>
          </div>
        </div>
      </div>

      {/* Listón de control interno de despliegue / QA (No forma parte del diseño final) */}
      <div className="bg-black text-white text-[11px] font-mono py-2 px-4 border-t border-neutral-800 text-center tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-neutral-400">
          <span className="text-amber-400 font-semibold">[ENTORNO DE PRUEBAS / QA — Este listón no va en el diseño final]</span>
          <div className="flex items-center gap-3 text-white">
            <span>Última actualización: <strong>28 Oct 2026, 22:50 hrs</strong></span>
            <span className="bg-neutral-800 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">v1.6.7</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
