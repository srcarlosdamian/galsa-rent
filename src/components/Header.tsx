import React, { useState } from 'react';
import { Menu, X, User, PhoneCall, ChevronRight } from 'lucide-react';

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
    { name: 'Autos', path: '/catalogo' },
    { name: 'Cómo rentar', path: '/#como-rentar' },
    { name: 'Anfitriones', path: '/anfitriones' },
    { name: 'Seguridad', path: '/confianza' },
    { name: 'Preguntas', path: '/faq' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 transition-all">
      {/* Top announcement bar - strictly Durango, no other cities */}
      <div className="bg-neutral-900 text-white text-[11px] sm:text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span className="truncate">Renta 100% en línea en Durango · Firma digital desde tu celular · Entrega en Sucursal Plaza 450</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Typographic Logo */}
          <div className="flex items-center gap-6 lg:gap-8">
            <a 
              href="/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className="group flex items-baseline tracking-tighter shrink-0"
              aria-label="GALSA Rent - Inicio"
            >
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
                galsa
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-black ml-0.5 mb-0.5"></span>
              <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 border border-neutral-200 px-1.5 py-0.5 rounded">
                Rent
              </span>
            </a>

            {/* Desktop Navigation - Concise, single line, no wrapping */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Navegación principal">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap ${
                    currentPath === item.path
                      ? 'text-black bg-neutral-100'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="/anfitriones"
              onClick={(e) => handleLinkClick(e, '/anfitriones')}
              className="text-xs font-bold text-neutral-900 px-3 py-2 rounded-full hover:bg-neutral-100 transition-colors whitespace-nowrap"
            >
              Gana con tu auto
            </a>

            {/* TODO: Reemplazar con el enlace oficial de WhatsApp de GALSA Rent Durango */}
            <a
              href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent,%20tengo%20una%20consulta%20sobre%20la%20renta%20en%20Plaza%20450"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-black border border-neutral-200 px-3 py-1.5 rounded-full hover:bg-neutral-50 transition-colors whitespace-nowrap"
              title="Atención directa por WhatsApp"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Ayuda</span>
            </a>

            <a
              href="/cuenta"
              onClick={(e) => handleLinkClick(e, '/cuenta')}
              className="p-2 rounded-full border border-neutral-200 text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors"
              aria-label="Acceso a cuenta"
            >
              <User className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-black hover:bg-neutral-100 focus:outline-none"
              aria-label="Menú móvil"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-1.5 animate-in slide-in-from-top-2">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => handleLinkClick(e, item.path)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-3 border-t border-neutral-200 space-y-2">
            <a
              href="/anfitriones"
              onClick={(e) => handleLinkClick(e, '/anfitriones')}
              className="block w-full py-2.5 text-center text-xs font-bold rounded-xl border border-neutral-300 text-neutral-900"
            >
              Gana dinero con tu auto
            </a>
            {/* TODO: Reemplazar con el número oficial de WhatsApp de GALSA Rent */}
            <a
              href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent,%20deseo%20rentar%20un%20auto%20en%20Durango"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-center text-xs font-bold rounded-xl bg-black text-white"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
