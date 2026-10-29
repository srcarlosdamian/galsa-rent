import React, { useState } from 'react';
import { 
  Menu, X, User, Phone, MapPin 
} from 'lucide-react';
import { GalsaLogo } from './GalsaLogo';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all">
      {/* Top micro-announcement bar */}
      <div className="bg-neutral-900 text-white text-[11px] font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span className="truncate">Renta 100% en línea en México · Contrato digital desde tu celular · Entrega en Sucursal Plaza 450, Durango</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          
          {/* Left: Logo & Direct Action Navigation (Kavak/Direct Style) */}
          <div className="flex items-center gap-8 lg:gap-10">
            {/* SVG Logo exacto de Figma */}
            <a 
              href="/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center gap-2 shrink-0 focus:outline-none transition-opacity hover:opacity-90 py-1"
              aria-label="GALSA Rent - Inicio"
            >
              <GalsaLogo className="h-6 sm:h-7 w-auto text-neutral-900" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500 border border-neutral-200 px-1.5 py-0.5 rounded">
                Rent
              </span>
            </a>

            {/* Direct Action Links (Sin saturación de menús ni dropdowns innecesarios) */}
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
                href="/como-funciona"
                onClick={(e) => handleLinkClick(e, '/como-funciona')}
                className={`transition-colors py-1 ${
                  currentPath === '/como-funciona' ? 'text-black font-bold' : 'hover:text-black'
                }`}
              >
                Cómo funciona
              </a>

              <a
                href="/nosotros"
                onClick={(e) => handleLinkClick(e, '/nosotros')}
                className={`transition-colors py-1 ${
                  currentPath === '/nosotros' ? 'text-black font-bold' : 'hover:text-black'
                }`}
              >
                Nosotros
              </a>
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
              title="Atención al cliente vía WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              <span>618 000 0000</span>
            </a>

            {/* Location Pill */}
            <a
              href="/contacto"
              onClick={(e) => handleLinkClick(e, '/contacto')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs hover:bg-neutral-200 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>Sucursal Plaza 450</span>
            </a>

            {/* Account / Login - Minimalist border */}
            <a
              href="/cuenta"
              onClick={(e) => handleLinkClick(e, '/cuenta')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 text-xs font-bold text-neutral-900 hover:border-black transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Ingresar</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="/cuenta"
              onClick={(e) => handleLinkClick(e, '/cuenta')}
              className="p-2 text-neutral-700 hover:text-black"
              aria-label="Mi Cuenta"
            >
              <User className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-black focus:outline-none"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-4 pb-6 space-y-3">
          <div className="space-y-1">
            <a
              href="/catalogo"
              onClick={(e) => handleLinkClick(e, '/catalogo')}
              className={`block px-3 py-2.5 rounded-xl font-bold text-sm ${
                currentPath === '/catalogo' ? 'bg-neutral-100 text-black' : 'text-neutral-700'
              }`}
            >
              Renta un auto
            </a>

            <a
              href="/anfitriones"
              onClick={(e) => handleLinkClick(e, '/anfitriones')}
              className={`block px-3 py-2.5 rounded-xl font-bold text-sm ${
                currentPath === '/anfitriones' ? 'bg-neutral-100 text-black' : 'text-neutral-700'
              }`}
            >
              Pon tu auto a trabajar
            </a>

            <a
              href="/como-funciona"
              onClick={(e) => handleLinkClick(e, '/como-funciona')}
              className={`block px-3 py-2.5 rounded-xl font-bold text-sm ${
                currentPath === '/como-funciona' ? 'bg-neutral-100 text-black' : 'text-neutral-700'
              }`}
            >
              Cómo funciona
            </a>

            <a
              href="/nosotros"
              onClick={(e) => handleLinkClick(e, '/nosotros')}
              className={`block px-3 py-2.5 rounded-xl font-bold text-sm ${
                currentPath === '/nosotros' ? 'bg-neutral-100 text-black' : 'text-neutral-700'
              }`}
            >
              Nosotros
            </a>

            <a
              href="/contacto"
              onClick={(e) => handleLinkClick(e, '/contacto')}
              className={`block px-3 py-2.5 rounded-xl font-bold text-sm ${
                currentPath === '/contacto' ? 'bg-neutral-100 text-black' : 'text-neutral-700'
              }`}
            >
              Sucursal y Ubicación
            </a>
          </div>

          <div className="pt-3 border-t border-neutral-200 space-y-2">
            <a
              href="https://wa.me/526180000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-700"
            >
              <Phone className="w-4 h-4 text-neutral-500" />
              <span>Atención: 618 000 0000</span>
            </a>

            <a
              href="/cuenta"
              onClick={(e) => handleLinkClick(e, '/cuenta')}
              className="block w-full text-center py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs"
            >
              Ingresar a mi cuenta
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
