import React, { useState } from 'react';
import { Menu, X, User, Car, ShieldCheck, HelpCircle, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onSelectCategory?: (category: string) => void;
  onOpenHostModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectCategory, onOpenHostModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      {/* Top micro-announcement banner */}
      <div className="bg-neutral-900 text-white text-xs font-medium py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Renta 100% digital en Durango y México · Sin filas de mostrador · Contratos digitales con validez legal</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Typographic Logo */}
          <div className="flex items-center gap-8">
            <a 
              href="#" 
              className="group flex items-baseline tracking-tighter"
              aria-label="GALSA - Renta de autos y movilidad"
            >
              <span className="text-3xl font-bold tracking-tight text-black transition-transform group-hover:opacity-90">
                galsa
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-black ml-0.5 mb-0.5"></span>
              <span className="ml-2.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 border border-neutral-200 px-1.5 py-0.5 rounded">
                Rent
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1" aria-label="Navegación principal">
              <a
                href="#catalogo"
                className="px-3.5 py-2 text-sm font-medium text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
              >
                Catálogo de autos
              </a>
              <a
                href="#como-funciona"
                className="px-3.5 py-2 text-sm font-medium text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
              >
                Cómo funciona
              </a>
              <a
                href="#anfitriones"
                className="px-3.5 py-2 text-sm font-medium text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
              >
                Anfitriones
              </a>
              <a
                href="#seguridad"
                className="px-3.5 py-2 text-sm font-medium text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
              >
                Confianza & Seguro
              </a>
              <a
                href="#faq"
                className="px-3.5 py-2 text-sm font-medium text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
              >
                Preguntas frecuentes
              </a>
            </nav>
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#anfitriones"
              onClick={(e) => {
                if (onOpenHostModal) {
                  e.preventDefault();
                  onOpenHostModal();
                }
              }}
              className="text-xs font-semibold text-neutral-900 px-3.5 py-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              Pon tu auto a trabajar
            </a>

            <a
              href="https://wa.me/526181234567?text=Hola%20GALSA,%20deseo%20rentar%20un%20auto%20en%20Durango"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-black px-3 py-2 rounded-full hover:bg-neutral-100 transition-colors"
              title="Atención directa por WhatsApp"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Soporte</span>
            </a>

            {/* User profile dropdown pill */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 border border-neutral-300 rounded-full py-1.5 px-3 hover:shadow-md transition-shadow focus:outline-none"
                aria-label="Menú de usuario"
              >
                <Menu className="w-4 h-4 text-neutral-700" />
                <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-semibold">
                  <User className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-black hover:bg-neutral-100 focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <a
            href="#catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-100"
          >
            Catálogo de autos
          </a>
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-100"
          >
            Cómo funciona
          </a>
          <a
            href="#anfitriones"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-100"
          >
            Pon tu auto a trabajar (Anfitriones)
          </a>
          <a
            href="#seguridad"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-100"
          >
            Confianza y Seguridad
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-100"
          >
            Preguntas frecuentes
          </a>
          <div className="pt-3 border-t border-neutral-200">
            <a
              href="https://wa.me/526181234567?text=Hola%20GALSA,%20deseo%20rentar%20un%20auto%20en%20Durango"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-semibold rounded-xl bg-black text-white"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
