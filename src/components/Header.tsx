import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, X, Globe, Check, ShieldCheck, HelpCircle, Phone, Mail, 
  MapPin, Clock, MessageSquare, ChevronDown, ExternalLink, User, Settings, LogOut 
} from 'lucide-react';
import { GalsaLogo } from './GalsaLogo';

// Preguntas frecuentes del Centro de Ayuda de reserva
const HELP_FAQS = [
  {
    question: '¿Qué documentos necesito para recoger el auto?',
    answer: 'Solo requieres: licencia de conducir vigente, identificación oficial (INE o pasaporte), comprobante de domicilio reciente (no mayor a 3 meses) y método de pago para el depósito reembolsable.',
  },
  {
    question: '¿Cómo y cuándo se devuelve el depósito en garantía?',
    answer: 'El depósito en garantía se libera íntegramente al momento de devolver la unidad en Sucursal Plaza 450, tras cotejar el checklist digital de entrega y devolución sin incidencias.',
  },
  {
    question: '¿Qué incluye la tarifa total mostrada?',
    answer: 'Incluye los días de renta seleccionados, kilometraje libre en territorio nacional, seguro de cobertura amplia y tarifa de servicio con IVA incluido. Cero costos sorpresa.',
  },
  {
    question: '¿Puedo cancelar o modificar las fechas de mi reserva?',
    answer: 'Sí. Las cancelaciones con más de 48 horas de anticipación reciben reembolso del 100%. Para modificaciones de fecha y horario puedes contactarnos por teléfono o correo.',
  },
  {
    question: '¿Dónde se entrega y devuelve físicamente el vehículo?',
    answer: 'En nuestra sucursal oficial de Plaza 450, en Blvd. Guadiana, Durango, Dgo. La entrega toma menos de 5 minutos gracias a tu contrato y validación previa.',
  },
];

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
  // Determinar si estamos en la vista de Checkout / Carrito ("Completa tu reserva") o Registro de anfitriones
  const isCheckout = currentPath.startsWith('/reservar/') || currentPath.endsWith('/checkout');
  const isHostRegistration = currentPath === '/anfitriones/registro';
  const isAccountRoute = currentPath.startsWith('/cuenta') || currentPath === '/completar-perfil';
  const [isLoggedIn, setIsLoggedIn] = useState(isAccountRoute);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'es' | 'en'>('es');
  const [helpDrawerOpen, setHelpDrawerOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('galsa_logged_in') === 'true';
      setIsLoggedIn(isAccountRoute || stored);
    }
  }, [currentPath, isAccountRoute]);

  // Escuchar tecla Escape y evento externo para abrir centro de ayuda
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHelpDrawerOpen(false);
        setUserMenuOpen(false);
      }
    };
    const handleClickOutsideUser = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideUser);
    const handleOpenHelp = () => setHelpDrawerOpen(true);

    if (helpDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('open-galsa-help', handleOpenHelp);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-galsa-help', handleOpenHelp);
      document.removeEventListener('mousedown', handleClickOutsideUser);
    };
  }, [helpDrawerOpen]);

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

  // Render del Drawer / Modal derecho de Centro de Ayuda
  const renderHelpDrawer = () => {
    if (!helpDrawerOpen) return null;

    return (
      <div className="fixed inset-0 z-50 text-left">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
          onClick={() => setHelpDrawerOpen(false)}
        />

        {/* Drawer derecho */}
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
            <div>
              <h3 className="text-base font-heading font-bold text-slate-900 leading-tight">
                Centro de Ayuda GALSA
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Atención y soporte para tu reservación
              </p>
            </div>
            <button
              type="button"
              onClick={() => setHelpDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar ayuda"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Contenido scrolleable */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Canales y Teléfonos Reales de GALSA */}
            <div className="space-y-3">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                Números y atención oficial
              </span>

              {/* Teléfono fijo / móvil */}
              <a
                href="tel:+526180000000"
                className="p-3.5 rounded-2xl border border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-between gap-3 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cta-50 text-cta flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-900 group-hover:text-cta-700 transition-colors">
                      Llamada directa sucursal
                    </div>
                    <div className="text-xs font-sans text-slate-500">
                      +52 618 000 0000 · Atención telefónica
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
              </a>

              {/* Correo oficial */}
              <a
                href="mailto:soporte@galsarent.com.mx?subject=Ayuda%20con%20reserva%20GALSA"
                className="p-3.5 rounded-2xl border border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-between gap-3 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cta-50 text-cta flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-heading font-bold text-slate-900 group-hover:text-cta-700 transition-colors">
                      Correo de soporte
                    </div>
                    <div className="text-xs font-sans text-slate-500">
                      soporte@galsarent.com.mx
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
              </a>

              {/* Sucursal y Horarios */}
              <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-transparent space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-heading font-bold text-slate-900 block">
                      Sucursal Plaza 450
                    </span>
                    <span className="text-xs font-sans text-slate-500 block">
                      Blvd. Guadiana, Plaza 450, Durango, Dgo., C.P. 34138
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 pt-1.5 border-t border-slate-200/60 text-xs font-sans text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Lunes a Domingo · 08:00 a 20:00 hrs (Horario corrido)</span>
                </div>
              </div>
            </div>

            {/* Preguntas frecuentes sobre la reserva */}
            <div className="space-y-3 pt-1">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                Preguntas frecuentes de la renta
              </span>

              <div className="space-y-2">
                {HELP_FAQS.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={idx} className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <span className="text-xs font-heading font-bold text-slate-800 pr-2">
                          {faq.question}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 pt-1 text-xs font-sans text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer del Drawer */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <a
              href="tel:+526180000000"
              className="w-full py-3 rounded-xl bg-cta hover:bg-cta-600 text-white font-heading font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Llamar a un asesor</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  // HEADER ESPECIAL PARA "COMPLETA TU RESERVA" Y "REGISTRO DE ANFITRIONES"
  if (isCheckout || isHostRegistration) {
    return (
      <header className="sticky top-0 z-40 bg-white transition-all">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[70px]">
            {/* Lado izquierdo: Logo de GALSA + Línea divisoria gris + Etiqueta protegida */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a 
                href="/" 
                onClick={(e) => handleLinkClick(e, '/')}
                className="flex items-center shrink-0 focus:outline-none transition-opacity hover:opacity-90"
                aria-label="GALSA - Inicio"
              >
                <GalsaLogo className="h-6 w-auto text-cta" />
              </a>

              {/* Línea divisoria gris */}
              <div className="h-5 w-px bg-slate-200" aria-hidden="true" />

              {/* Etiqueta en gris 500 con icono shield */}
              <div className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm font-heading font-medium">
                <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={1.8} />
                <span>{isHostRegistration ? 'Registro de anfitriones' : 'Reserva protegida'}</span>
              </div>
            </div>

            {/* Lado derecho: Botón ¿Necesitas ayuda? que abre el Help Center modal derecho */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setHelpDrawerOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-semibold text-slate-600 hover:text-slate-900 transition-colors py-2 px-3 sm:px-3.5 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="hidden sm:inline">¿Necesitas ayuda?</span>
                <span className="sm:hidden">Ayuda</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal / Drawer derecho del Help Center */}
        {renderHelpDrawer()}
      </header>
    );
  }

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
            <GalsaLogo className="h-6 w-auto text-cta" />
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
                        className={`w-full text-left p-2.5 rounded-[10px] transition-colors flex items-center justify-between group ${
                          selectedLang === 'es' ? 'bg-cta-50' : 'hover:bg-slate-100/80'
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
                        {selectedLang === 'es' && <Check className="w-4 h-4 text-cta shrink-0 ml-2" strokeWidth={1.4} />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLang('en');
                          setLangOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-[10px] transition-colors flex items-center justify-between group ${
                          selectedLang === 'en' ? 'bg-cta-50' : 'hover:bg-slate-100/80'
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
                        {selectedLang === 'en' && <Check className="w-4 h-4 text-cta shrink-0 ml-2" strokeWidth={1.4} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Account & Register Actions (or Minimalist Avatar Menu when logged in) */}
            <div className="flex items-center space-x-3 shrink-0">
              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    aria-expanded={userMenuOpen}
                    aria-label="Menú de cuenta"
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border bg-transparent text-slate-800 text-xs sm:text-sm font-heading font-semibold transition-colors cursor-pointer ${
                      userMenuOpen
                        ? 'border-slate-400 bg-slate-50/70'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <User className="w-4 h-4 text-slate-600 shrink-0" strokeWidth={1.7} />
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                        userMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2.5 w-52 bg-white rounded-[16px] border border-slate-200/80 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          if (onNavigate) onNavigate('/cuenta');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-left text-xs sm:text-sm font-heading font-medium text-slate-800 hover:bg-slate-100/80 transition-colors cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-slate-600 shrink-0" strokeWidth={1.7} />
                        <span>Configuración</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          if (typeof window !== 'undefined') {
                            sessionStorage.removeItem('galsa_user_email');
                            sessionStorage.removeItem('galsa_first_login');
                            sessionStorage.removeItem('galsa_logged_in');
                          }
                          setIsLoggedIn(false);
                          if (onNavigate) onNavigate('/login');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-left text-xs sm:text-sm font-heading font-medium text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-slate-600 shrink-0" strokeWidth={1.7} />
                        <span>Cerrar sesión</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
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
                    className="inline-flex items-center justify-center px-4 py-2 rounded-[8px] bg-cta hover:bg-cta-600 text-white text-[14px] font-medium transition-colors"
                  >
                    Crear cuenta
                  </a>
                </>
              )}
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
                    ? 'border-cta bg-cta-50 text-slate-900 font-medium'
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
                    ? 'border-cta bg-cta-50 text-slate-900 font-medium'
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
            {isLoggedIn ? (
              <>
                <a
                  href="/cuenta"
                  onClick={(e) => handleLinkClick(e, '/cuenta')}
                  className="flex items-center justify-center gap-2 text-center py-2.5 rounded-[8px] border border-slate-200 bg-transparent text-slate-900 font-medium text-sm hover:bg-slate-50"
                >
                  <Settings className="w-4 h-4 text-slate-600" strokeWidth={1.7} />
                  <span>Configuración</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (typeof window !== 'undefined') {
                      sessionStorage.removeItem('galsa_user_email');
                      sessionStorage.removeItem('galsa_first_login');
                      sessionStorage.removeItem('galsa_logged_in');
                    }
                    setIsLoggedIn(false);
                    if (onNavigate) onNavigate('/login');
                  }}
                  className="flex items-center justify-center gap-2 text-center py-2.5 rounded-[8px] border border-slate-200 bg-transparent text-slate-700 font-medium text-sm hover:bg-slate-50 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-slate-600" strokeWidth={1.7} />
                  <span>Cerrar sesión</span>
                </button>
              </>
            ) : (
              <>
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
                  className="flex items-center justify-center text-center py-2.5 rounded-[8px] bg-cta hover:bg-cta-600 text-white font-medium text-sm transition-colors"
                >
                  Crear cuenta
                </a>
              </>
            )}
          </div>
        </div>
      )}
      {renderHelpDrawer()}
    </header>
  );
};
