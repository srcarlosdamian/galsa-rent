import React, { useState, useRef, useEffect } from 'react';
import { GalsaLogo } from './GalsaLogo';
import { Palette, Globe, ChevronUp, Mail, LayoutDashboard } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
  qaOnly?: boolean;
}

const QA_ALL_ROUTES: { group: string; items: { label: string; path: string }[] }[] = [
  {
    group: 'Principales',
    items: [
      { label: 'Inicio', path: '/' },
      { label: 'Catálogo de autos', path: '/catalogo' },
      { label: 'Detalle de vehículo (ejemplo)', path: '/vehiculos/jeep-wrangler-rubicon-2018-durango' },
      { label: 'Reservar / Checkout (ejemplo)', path: '/reservar/jeep-wrangler-rubicon-2018-durango' },
      { label: 'Cómo funciona', path: '/como-funciona' },
      { label: 'Sobre nosotros', path: '/nosotros' },
      { label: 'Confianza y seguridad', path: '/confianza' },
      { label: 'Preguntas frecuentes', path: '/faq' },
      { label: 'Contacto', path: '/contacto' },
    ],
  },
  {
    group: 'Anfitriones',
    items: [
      { label: 'Programa de anfitriones', path: '/anfitriones' },
      { label: 'Registro de anfitrión', path: '/anfitriones/registro' },
    ],
  },
  {
    group: 'Blog & Legal',
    items: [
      { label: 'Blog de viajes', path: '/blog' },
      { label: 'Artículo: Preguntas frecuentes', path: '/blog/preguntas-frecuentes-renta-autos-galsa' },
      { label: 'Artículo: Requisitos de renta', path: '/blog/guia-renta-autos-mexico-requisitos' },
      { label: 'Artículo: Gana con tu auto', path: '/blog/como-ganar-dinero-rentando-tu-auto-anfitrion' },
      { label: 'Artículo: Contrato mercantil digital', path: '/blog/contrato-mercantil-digital-como-protege-tu-renta' },
      { label: 'Artículo: Entrega express Plaza 450', path: '/blog/entrega-express-plaza-450-durango-sin-filas' },
      { label: 'Artículo: Cómo elegir auto ideal', path: '/blog/que-auto-elegir-para-viaje-familiar-o-negocios' },
      { label: 'Términos y condiciones', path: '/terminos' },
      { label: 'Aviso de privacidad', path: '/privacidad' },
    ],
  },
  {
    group: 'Cuenta & Acceso',
    items: [
      { label: 'Iniciar sesión', path: '/login' },
      { label: 'Crear cuenta', path: '/registro' },
      { label: 'Recuperar contraseña', path: '/recuperar-password' },
      { label: 'Correo enviado', path: '/recuperar-password/enviado' },
      { label: 'Restablecer contraseña', path: '/restablecer-password' },
      { label: 'Mi cuenta', path: '/cuenta' },
      { label: 'Completar perfil (modal)', path: '/cuenta/completar' },
      { label: 'Completar perfil (directo)', path: '/completar-perfil' },
    ],
  },
  {
    group: 'Sistema',
    items: [
      { label: 'Panel Administrativo', path: '/admin' },
      { label: 'Emails transaccionales', path: '/emails' },
      { label: 'Página 404', path: '/404' },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate, qaOnly = false }) => {
  const [qaMenuOpen, setQaMenuOpen] = useState(false);
  const qaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (qaMenuRef.current && !qaMenuRef.current.contains(e.target as Node)) {
        setQaMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQaMenuOpen(false);
    };
    if (qaMenuOpen) {
      document.addEventListener('mousedown', handleOutside);
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [qaMenuOpen]);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setQaMenuOpen(false);
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white text-slate-900 border-t border-slate-100">
      {/* Main Footer Content (oculto en /admin donde solo se muestra la barra QA) */}
      {!qaOnly && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 lg:pr-4">
            <div className="flex items-center">
              <GalsaLogo className="h-6 w-auto text-cta" />
            </div>
            
            <p className="text-[13px] font-heading font-normal text-slate-500 leading-relaxed">
              Renta de autos 100% en línea con contrato digital y kilometraje libre en México.
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
              <li><a href="/blog/preguntas-frecuentes-renta-autos-galsa" onClick={(e) => handleLink(e, '/blog/preguntas-frecuentes-renta-autos-galsa')} className="hover:text-black transition-colors">Preguntas frecuentes</a></li>
              <li><a href="/blog/guia-renta-autos-mexico-requisitos" onClick={(e) => handleLink(e, '/blog/guia-renta-autos-mexico-requisitos')} className="hover:text-black transition-colors">Requisitos de renta</a></li>
              <li><a href="/blog/como-ganar-dinero-rentando-tu-auto-anfitrion" onClick={(e) => handleLink(e, '/blog/como-ganar-dinero-rentando-tu-auto-anfitrion')} className="hover:text-black transition-colors">Gana con tu auto</a></li>
              <li><a href="/blog/entrega-express-plaza-450-durango-sin-filas" onClick={(e) => handleLink(e, '/blog/entrega-express-plaza-450-durango-sin-filas')} className="hover:text-black transition-colors">Entrega express Plaza 450</a></li>
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
              <li><a href="/confianza" onClick={(e) => handleLink(e, '/confianza')} className="hover:text-black transition-colors">Seguridad y cobertura</a></li>
              <li><a href="/terminos#cancelaciones" onClick={(e) => handleLink(e, '/terminos')} className="hover:text-black transition-colors">Políticas de cancelación</a></li>
            </ul>
          </div>

        </div>
        </div>
      )}

      {/* Listón de control interno de despliegue / QA (No forma parte del diseño final) */}
      <div className="bg-black text-white text-[11px] font-mono py-2 px-4 border-t border-neutral-800 text-center tracking-wide">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-400">
          <span className="text-amber-400 font-semibold">[ENTORNO DE PRUEBAS / QA — Este listón no va en el diseño final]</span>
          <div className="flex flex-wrap items-center justify-center gap-3 text-white">
            {/* Dropdown QA: Auditoría SEO, Sistema de Diseño y Mapa Completo de Rutas */}
            <div ref={qaMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setQaMenuOpen((prev) => !prev)}
                aria-expanded={qaMenuOpen}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-all text-[11px] font-medium border border-neutral-700/80 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-cta-400" />
                <span>Auditoría SEO y Sistema de Diseño</span>
                <ChevronUp className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-150 ${qaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {qaMenuOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mb-2 w-[310px] sm:w-[360px] bg-neutral-900 border border-neutral-700/80 rounded-xl shadow-2xl p-2 text-left z-[80]">
                  {/* Herramientas principales arriba */}
                  <div className="space-y-1">
                    <a
                      href="/seo"
                      onClick={(e) => handleLink(e, '/seo')}
                      className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-neutral-800 text-cta-300 hover:text-white transition-colors"
                    >
                      <span className="inline-flex items-center gap-2 font-semibold text-xs">
                        <Globe className="w-3.5 h-3.5 text-cta-400 shrink-0" />
                        Auditoría SEO
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">/seo</span>
                    </a>
                    <a
                      href="/design-system"
                      onClick={(e) => handleLink(e, '/design-system')}
                      className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-neutral-800 text-pink-300 hover:text-white transition-colors"
                    >
                      <span className="inline-flex items-center gap-2 font-semibold text-xs">
                        <Palette className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                        Sistema de Diseño
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">/design-system</span>
                    </a>
                    <a
                      href="/emails"
                      onClick={(e) => handleLink(e, '/emails')}
                      className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-neutral-800 text-emerald-300 hover:text-white transition-colors"
                    >
                      <span className="inline-flex items-center gap-2 font-semibold text-xs">
                        <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        Diseño de Emails
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">/emails</span>
                    </a>
                    <a
                      href="/admin"
                      onClick={(e) => handleLink(e, '/admin')}
                      className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-neutral-800 text-amber-300 hover:text-white transition-colors"
                    >
                      <span className="inline-flex items-center gap-2 font-semibold text-xs">
                        <LayoutDashboard className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        Panel Admin
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">/admin</span>
                    </a>
                  </div>

                  <div className="border-t border-neutral-800 my-2" />

                  {/* Todos los enlaces existentes */}
                  <div className="max-h-[320px] overflow-y-auto space-y-2.5 pr-1">
                    {QA_ALL_ROUTES.map((section) => (
                      <div key={section.group} className="space-y-0.5">
                        <div className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                          {section.group}
                        </div>
                        {section.items.map((item) => (
                          <a
                            key={item.path}
                            href={item.path}
                            onClick={(e) => handleLink(e, item.path)}
                            className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg hover:bg-neutral-800 text-neutral-200 hover:text-white transition-colors text-[11px]"
                          >
                            <span className="truncate">{item.label}</span>
                            <span className="text-[10px] text-neutral-500 font-mono shrink-0">{item.path}</span>
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span>Última actualización: <strong>25 Nov 2026, 00:32 hrs</strong></span>
            <span className="bg-neutral-800 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">v2.8.65</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
