import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe, Check } from 'lucide-react';
import { GalsaLogo } from './GalsaLogo';

// Banderas en SVG de alta fidelidad
const MexicoFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 object-cover" viewBox="0 0 640 480" aria-hidden="true">
    <path fill="#006847" d="M0 0h213.3v480H0z"/>
    <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
    <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
    <circle cx="320" cy="240" r="28" fill="#8c6239" opacity="0.85"/>
  </svg>
);

const UsaFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0 object-cover" viewBox="0 0 640 480" aria-hidden="true">
    <g fill="#b22234">
      <path d="M0 0h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 73h640v37H0zm0 74h640v37H0zm0 74h640v37H0z"/>
    </g>
    <path fill="#fff" d="M0 37h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 73h640v37H0zm0 74h640v37H0z"/>
    <path fill="#3c3b6e" d="M0 0h256v259H0z"/>
  </svg>
);

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'es' | 'en'>('es');
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    if (langOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langOpen]);

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
          
          {/* Left: Brand Logo */}
          <a 
            href="/" 
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center shrink-0 focus:outline-none transition-opacity hover:opacity-90"
            aria-label="GALSA - Inicio"
          >
            <GalsaLogo className="h-6 w-auto text-blue-500" />
          </a>

          {/* Right Group: Navigation links aligned next to Account buttons (visible only on desktop lg+) */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8">
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

              {/* Selector de Idioma y Moneda (después de NOSOTROS) */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => setLangOpen(!langOpen)}
                  className="group flex items-center gap-1.5 py-1 text-[14px] leading-none font-heading font-semibold text-slate-500 hover:text-black transition-colors focus:outline-none"
                  aria-label="Seleccionar idioma y moneda"
                  title="Idioma y moneda"
                >
                  <Globe className="w-[18px] h-[18px] text-slate-500 group-hover:text-black transition-colors" strokeWidth={1.4} />
                  <span className="text-slate-500 group-hover:text-black transition-colors">
                    {selectedLang === 'es' ? 'MXN' : 'USD'}
                  </span>
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-[16px] border border-slate-200/80 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLang('es');
                          setLangOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-[10px] hover:bg-slate-50 transition-colors flex items-center justify-between group ${
                          selectedLang === 'es' ? 'bg-slate-50/80' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 rounded-[8px] bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-200 transition-colors">
                            <MexicoFlag />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[14px] font-heading font-medium text-slate-900 truncate">Español</p>
                            <p className="text-[12px] font-heading font-normal text-slate-500 truncate mt-0.5">MXN · Pesos mexicanos ($)</p>
                          </div>
                        </div>
                        {selectedLang === 'es' && <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" strokeWidth={1.4} />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLang('en');
                          setLangOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-[10px] hover:bg-slate-50 transition-colors flex items-center justify-between group ${
                          selectedLang === 'en' ? 'bg-slate-50/80' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 rounded-[8px] bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-200 transition-colors">
                            <UsaFlag />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[14px] font-heading font-medium text-slate-900 truncate">English</p>
                            <p className="text-[12px] font-heading font-normal text-slate-500 truncate mt-0.5">USD · US Dollars ($)</p>
                          </div>
                        </div>
                        {selectedLang === 'en' && <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" strokeWidth={1.4} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Account & Register Actions */}
            <div className="flex items-center space-x-3 shrink-0">
              <a
                href="/login"
                onClick={(e) => handleLinkClick(e, '/login')}
                className="inline-flex items-center justify-center px-4 py-2 rounded-[8px] border border-slate-200 bg-white text-slate-900 text-[14px] font-medium hover:bg-slate-50 transition-colors"
              >
                Inicia sesión
              </a>

              <a
                href="/registro"
                onClick={(e) => handleLinkClick(e, '/registro')}
                className="inline-flex items-center justify-center px-4 py-2 rounded-[8px] bg-slate-900 text-white text-[14px] font-medium hover:bg-slate-800 transition-colors"
              >
                Crear cuenta
              </a>
            </div>
          </div>

          {/* Mobile & Tablet Menu Toggle Button (visible up to lg) con borde redondeado gris claro */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-[8px] border border-slate-200 bg-white text-slate-700 hover:text-black hover:bg-slate-50 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-800" strokeWidth={1.5} /> : <Menu className="w-5 h-5 text-slate-800" strokeWidth={1.5} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 pt-4 pb-6 space-y-4">
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

          {/* Selector de idioma mobile */}
          <div className="pt-2 pb-1 border-t border-slate-100">
            <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Idioma y moneda
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedLang('es')}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-colors ${
                  selectedLang === 'es'
                    ? 'border-blue-500 bg-blue-50/50 text-slate-900 font-medium'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <MexicoFlag />
                <div className="flex flex-col leading-tight">
                  <span className="text-[12px] font-semibold">Español</span>
                  <span className="text-[10px] text-slate-500">MXN ($)</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedLang('en')}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-colors ${
                  selectedLang === 'en'
                    ? 'border-blue-500 bg-blue-50/50 text-slate-900 font-medium'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <UsaFlag />
                <div className="flex flex-col leading-tight">
                  <span className="text-[12px] font-semibold">English</span>
                  <span className="text-[10px] text-slate-500">USD ($)</span>
                </div>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
            <a
              href="/login"
              onClick={(e) => handleLinkClick(e, '/login')}
              className="flex items-center justify-center text-center py-2.5 rounded-[8px] border border-slate-200 bg-white text-slate-900 font-medium text-sm hover:bg-slate-50"
            >
              Inicia sesión
            </a>
            <a
              href="/registro"
              onClick={(e) => handleLinkClick(e, '/registro')}
              className="flex items-center justify-center text-center py-2.5 rounded-[8px] bg-slate-900 text-white font-medium text-sm hover:bg-slate-800"
            >
              Crear cuenta
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
