import React from 'react';
import { GalsaLogo } from './GalsaLogo';
import { Palette } from 'lucide-react';

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

  const navigationLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo de autos', path: '/catalogo' },
    { label: 'Cómo funciona', path: '/como-funciona' },
    { label: 'Sobre nosotros', path: '/nosotros' },
    { label: 'Anfitriones', path: '/anfitriones' },
  ];

  const helpLinks = [
    { label: 'Preguntas frecuentes', path: '/faq' },
    { label: 'Requisitos de renta', path: '/blog/guia-renta-autos-mexico-requisitos' },
    { label: 'Gana con tu auto', path: '/blog/como-ganar-dinero-rentando-tu-auto-anfitrion' },
    { label: 'Blog de viajes', path: '/blog' },
    { label: 'Contacto', path: '/contacto' },
  ];

  const legalLinks = [
    { label: 'Términos y condiciones', path: '/terminos' },
    { label: 'Aviso de privacidad', path: '/privacidad' },
    { label: 'Contrato y cobertura', path: '/confianza' },
    { label: 'Políticas de cancelación', path: '/terminos' },
  ];

  const FooterLink: React.FC<{ label: string; path: string }> = ({ label, path }) => (
    <a 
      href={path} 
      onClick={(e) => handleLink(e, path)} 
      className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors font-sans"
    >
      {label}
    </a>
  );

  return (
    <footer className="bg-white border-t border-neutral-200">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center">
              <GalsaLogo className="h-6 w-auto text-cta-500" />
            </div>
            
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Renta de autos 100% en línea con contrato digital y kilometraje libre en Durango, México.
            </p>

            <div className="pt-2">
              <a 
                href="mailto:soporte@galsarent.com.mx" 
                className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors font-sans"
              >
                soporte@galsarent.com.mx
              </a>
            </div>
          </div>

          {/* Explorar Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-sans">
              Explorar
            </h4>
            <ul className="space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <FooterLink label={link.label} path={link.path} />
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-sans">
              Ayuda & Guías
            </h4>
            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.path}>
                  <FooterLink label={link.label} path={link.path} />
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-sans">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <FooterLink label={link.label} path={link.path} />
                </li>
              ))}
            </ul>
          </div>

          {/* Empty column for spacing on desktop */}
          <div className="hidden lg:block" />

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-sans">
            <div className="text-center sm:text-left">
              <p>© 2026 GALSA Rent. Todos los derechos reservados.</p>
            </div>
            <div className="flex items-center gap-6">
              <FooterLink label="Privacidad" path="/privacidad" />
              <FooterLink label="Términos" path="/terminos" />
              <FooterLink label="Seguridad" path="/confianza" />
            </div>
          </div>
        </div>
      </div>

      {/* QA Ribbon - Only in development */}
      <div className="bg-black text-white text-[11px] font-mono py-2 px-4 border-t border-neutral-800 text-center tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-400">
          <span className="text-amber-400 font-semibold">[ENTORNO DE PRUEBAS / QA — Este listón no va en el diseño final]</span>
          <div className="flex items-center gap-3 text-white">
            <a
              href="/design-system"
              onClick={(e) => handleLink(e, '/design-system')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-pink-300 hover:text-white transition-all text-[11px] font-medium border border-neutral-700/70 shadow-2xs group"
              title="Abrir Sistema de Diseño (Atomic Design)"
            >
              <Palette className="w-3.5 h-3.5 text-pink-400 group-hover:rotate-12 transition-transform" />
              <span>Sistema de Diseño</span>
            </a>
            <span>Última actualización: <strong>11 Nov 2026</strong></span>
            <span className="bg-neutral-800 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">v2.3.0</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
