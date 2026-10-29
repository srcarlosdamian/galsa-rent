import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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

  const navLinks = [
    { label: 'RENTA UN AUTO', path: '/catalogo' },
    { label: 'PON TU AUTO A TRABAJAR', path: '/anfitriones' },
    { label: 'NOSOTROS', path: '/nosotros' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white transition-all">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[74px]">
          
          {/* Left: Brand Logo only */}
          <a 
            href="/" 
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center shrink-0 focus:outline-none transition-opacity hover:opacity-90"
            aria-label="GALSA - Inicio"
          >
            <GalsaLogo className="h-7 w-auto text-black" />
          </a>

          {/* Right Group: Navigation links aligned next to Account buttons */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Desktop Navigation Links (Figma: text-[14px], font-heading, font-semibold) */}
            <nav className="flex items-center space-x-6 text-[14px] leading-none font-heading font-semibold tracking-normal" aria-label="Navegación principal">
              {navLinks.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`text-[14px] transition-colors py-1 whitespace-nowrap ${
                      isActive 
                        ? 'text-black font-semibold' 
                        : 'text-slate-500 hover:text-black'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Account & Register Actions */}
            <div className="flex items-center space-x-4 shrink-0">
              <a
                href="/cuenta"
                onClick={(e) => handleLinkClick(e, '/cuenta')}
                className="inline-flex items-center justify-center px-4 py-2 rounded-[6px] border border-slate-200 bg-white text-slate-900 text-[14px] font-medium hover:bg-slate-50 transition-colors"
              >
                Inicia sesión
              </a>

              <a
                href="/cuenta"
                onClick={(e) => handleLinkClick(e, '/cuenta')}
                className="inline-flex items-center justify-center px-4 py-2 rounded-[6px] bg-slate-900 text-white text-[14px] font-medium hover:bg-slate-800 transition-colors"
              >
                Regístrate
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-black focus:outline-none rounded-lg"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 pt-4 pb-6 space-y-4">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-heading font-semibold ${
                    isActive ? 'bg-slate-100 text-black' : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
            <a
              href="/cuenta"
              onClick={(e) => handleLinkClick(e, '/cuenta')}
              className="flex items-center justify-center text-center py-2.5 rounded-[6px] border border-slate-200 bg-white text-slate-900 font-medium text-sm hover:bg-slate-50"
            >
              Inicia sesión
            </a>
            <a
              href="/cuenta"
              onClick={(e) => handleLinkClick(e, '/cuenta')}
              className="flex items-center justify-center text-center py-2.5 rounded-[6px] bg-slate-900 text-white font-medium text-sm hover:bg-slate-800"
            >
              Regístrate
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
