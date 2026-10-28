import React, { useState } from 'react';
import { 
  Menu, X, User, Phone, MapPin, ChevronDown, 
  HelpCircle, ShieldCheck, FileText, Sparkles 
} from 'lucide-react';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nosotrosOpen, setNosotrosOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      setMobileMenuOpen(false);
      setNosotrosOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all">
      {/* Top micro-announcement bar */}
      <div className="bg-neutral-900 text-white text-[11px] font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span className="truncate">Renta 100% en línea en Durango · Firma digital desde tu celular · Entrega en Sucursal Plaza 450</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          
          {/* Left: Logo & Core Action Navigation */}
          <div className="flex items-center gap-8 lg:gap-10">
            {/* Typographic Logo */}
            <a 
              href="/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className="group flex items-baseline tracking-tight shrink-0 focus:outline-none"
              aria-label="GALSA Rent - Inicio"
            >
              <span className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                galsa
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-black ml-0.5 mb-0.5"></span>
              <span className="ml-2 text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 border border-neutral-200 px-1.5 py-0.5 rounded">
                Rent
              </span>
            </a>

            {/* Direct Action Links (Inspiración en la claridad de acción) */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-semibold text-neutral-800" aria-label="Navegación principal">
              <a
                href="/catalogo"
                onClick={(e) => handleLinkClick(e, '/catalogo')}
                className={`transition-colors py-1 ${
                  currentPath === '/catalogo' ? 'text-black font-bold' : 'hover:text-black'
                }`}
              >
                Renta un auto
              </a>

              <a
                href="/anfitriones"
                onClick={(e) => handleLinkClick(e, '/anfitriones')}
                className={`transition-colors py-1 ${
                  currentPath === '/anfitriones' ? 'text-black font-bold' : 'hover:text-black'
                }`}
              >
                Pon tu auto a trabajar
              </a>

              <a
                href="/#como-rentar"
                onClick={(e) => handleLinkClick(e, '/#como-rentar')}
                className="transition-colors hover:text-black py-1"
              >
                Cómo funciona
              </a>

              {/* Dropdown "Nosotros" */}
              <div 
                className="relative"
                onMouseEnter={() => setNosotrosOpen(true)}
                onMouseLeave={() => setNosotrosOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setNosotrosOpen(!nosotrosOpen)}
                  className={`inline-flex items-center gap-1 transition-colors py-1 focus:outline-none ${
                    nosotrosOpen || currentPath === '/confianza' || currentPath === '/faq' ? 'text-black font-bold' : 'hover:text-black'
                  }`}
                >
                  <span>Nosotros</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${nosotrosOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {nosotrosOpen && (
                  <div className="absolute top-full left-0 pt-2 w-56 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="bg-white rounded-2xl border border-neutral-200 shadow-dropdown p-2 text-xs space-y-1">
                      <a
                        href="/confianza"
                        onClick={(e) => handleLinkClick(e, '/confianza')}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-800 font-semibold transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-neutral-600 shrink-0" />
                        <div>
                          <p className="font-bold text-neutral-900">Seguridad & Seguro</p>
                          <p className="text-[10px] text-neutral-500 font-normal">Contratos y cobertura amplia</p>
                        </div>
                      </a>

                      <a
                        href="/faq"
                        onClick={(e) => handleLinkClick(e, '/faq')}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-800 font-semibold transition-colors"
                      >
                        <HelpCircle className="w-4 h-4 text-neutral-600 shrink-0" />
                        <div>
                          <p className="font-bold text-neutral-900">Preguntas frecuentes</p>
                          <p className="text-[10px] text-neutral-500 font-normal">Tarifas, requisitos y depósitos</p>
                        </div>
                      </a>

                      <a
                        href="/terminos"
                        onClick={(e) => handleLinkClick(e, '/terminos')}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-800 font-semibold transition-colors"
                      >
                        <FileText className="w-4 h-4 text-neutral-600 shrink-0" />
                        <div>
                          <p className="font-bold text-neutral-900">Términos legales</p>
                          <p className="text-[10px] text-neutral-500 font-normal">Contrato mercantil digital</p>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right: Phone, Ubicación & Ingresar (Estilo limpio) */}
          <div className="hidden lg:flex items-center space-x-5 text-sm font-semibold">
            {/* Phone direct link */}
            {/* TODO: Reemplazar con el número oficial de atención de GALSA Rent */}
            <a
              href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent,%20tengo%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-black transition-colors"
              title="Atención al cliente en Durango"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              <span>618 000 0000</span>
            </a>

            {/* Ubicación pill button */}
            <a
              href="/contacto"
              onClick={(e) => handleLinkClick(e, '/contacto')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all ${
                currentPath === '/contacto'
                  ? 'border-black bg-neutral-100 text-black'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 hover:text-black'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>Sucursal Plaza 450</span>
            </a>

            {/* Ingresar / Mi cuenta */}
            <a
              href="/cuenta"
              onClick={(e) => handleLinkClick(e, '/cuenta')}
              className="inline-flex items-center gap-1.5 text-neutral-800 hover:text-black transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800">
                <User className="w-4 h-4" />
              </div>
              <span>Ingresar</span>
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-black hover:bg-neutral-100 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-5 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="space-y-1">
            <a
              href="/catalogo"
              onClick={(e) => handleLinkClick(e, '/catalogo')}
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-neutral-900 hover:bg-neutral-50"
            >
              Renta un auto
            </a>
            <a
              href="/anfitriones"
              onClick={(e) => handleLinkClick(e, '/anfitriones')}
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-neutral-900 hover:bg-neutral-50"
            >
              Pon tu auto a trabajar
            </a>
            <a
              href="/#como-rentar"
              onClick={(e) => handleLinkClick(e, '/#como-rentar')}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Cómo funciona
            </a>
            <a
              href="/confianza"
              onClick={(e) => handleLinkClick(e, '/confianza')}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Seguridad y seguro
            </a>
            <a
              href="/faq"
              onClick={(e) => handleLinkClick(e, '/faq')}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Preguntas frecuentes
            </a>
            <a
              href="/contacto"
              onClick={(e) => handleLinkClick(e, '/contacto')}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Sucursal Plaza 450
            </a>
          </div>

          <div className="pt-3 border-t border-neutral-200 space-y-2">
            <a
              href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-900"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp: 618 000 0000</span>
            </a>
            <a
              href="/cuenta"
              onClick={(e) => handleLinkClick(e, '/cuenta')}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-black text-white text-xs font-bold"
            >
              <User className="w-3.5 h-3.5" />
              <span>Ingresar a mi cuenta</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
