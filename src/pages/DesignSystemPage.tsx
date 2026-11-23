import React, { useState, useRef, useEffect } from 'react';
import {
  Palette,
  Layers,
  Box,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ShieldCheck,
  Loader2,
  ExternalLink,
  Heart,
  Grid,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Fuel,
  Users,
  Gauge,
  Clock,
  SlidersHorizontal,
  X,
  CarFront,
  ArrowUpDown,
  Landmark,
  Globe,
  ClipboardCheck,
  UserPlus,
  Car,
  Plus,
  Minus,
  Mail,
} from 'lucide-react';
import { GalsaLogo } from '../components/GalsaLogo';
import { DocumentUploadCard } from '../components/DocumentUploadCard';
import { CustomDropdown, TIME_DROPDOWN_OPTIONS } from '../components/CustomDropdown';
import { DateRangePicker } from '../components/DateRangePicker';
import { SingleDatePicker } from '../components/SingleDatePicker';
import { SearchContainer } from '../components/SearchContainer';
import { VehicleCard } from '../components/VehicleCard';
import { StepFeatureCard } from '../components/StepFeatureCard';
import { AuthCardLayout } from '../components/AuthCardLayout';
import { VEHICLES } from '../data/vehicles';
import {
  LOCATION_DROPDOWN_OPTIONS,
  VEHICLE_TYPE_DROPDOWN_OPTIONS,
  HOST_CITY_OPTIONS,
  CATALOG_SORT_OPTIONS,
} from '../data/dropdownOptions';
import { SearchState } from '../types/vehicle';
import { DOCUMENTED_LUCIDE_ICONS, DOCUMENTED_3D_ICONS } from '../data/designSystemIcons';

interface DesignSystemPageProps {
  onNavigate?: (path: string) => void;
}

type TabType = 'all' | 'tokens' | 'atoms' | 'molecules' | 'organisms' | 'audit';

interface AuditComponentEntry {
  file: string;
  level: 'Átomo' | 'Molécula' | 'Organismo' | 'Layout / Vista';
  purpose: string;
  consumers: string;
}

const COMPONENT_INVENTORY: AuditComponentEntry[] = [
  { file: 'GalsaLogo.tsx', level: 'Átomo', purpose: 'Isotipo / logotipo vectorial de marca', consumers: 'Header, Footer' },
  { file: 'CustomDropdown.tsx', level: 'Molécula', purpose: 'Selector flotante estilo Home (z-[70])', consumers: 'VehicleDetailView, CatalogPage, Checkout, HostRegistrationPage, DS' },
  { file: 'DateRangePicker.tsx', level: 'Molécula', purpose: 'Calendario doble mes de rango de fechas', consumers: 'SearchContainer, CatalogPage, VehicleDetailView, Checkout, DS' },
  { file: 'DocumentUploadCard.tsx', level: 'Molécula', purpose: 'Carga de documentos con progreso e idle', consumers: 'ReservationCheckoutView, AccountPage, DesignSystemPage' },
  { file: 'StepFeatureCard.tsx', level: 'Molécula', purpose: 'Tarjeta 16:10/4:3 con badge flotante azul', consumers: 'FourStepProcess, HostSection, DesignSystemPage' },
  { file: 'AuthCardLayout.tsx', level: 'Layout / Vista', purpose: 'Cascarón dividido 2 columnas para auth', consumers: 'LoginPage, RegisterPage, ForgotPasswordPage' },
  { file: 'SearchContainer.tsx', level: 'Organismo', purpose: 'Buscador principal Hero (ubicación, fechas, tipo)', consumers: 'Home (App.tsx), DesignSystemPage' },
  { file: 'VehicleCard.tsx', level: 'Organismo', purpose: 'Tarjeta de auto (grid, horizontal y skeleton)', consumers: 'Home (App.tsx), CatalogPage, DesignSystemPage' },
  { file: 'CatalogMap.tsx', level: 'Organismo', purpose: 'Mapa interactivo Leaflet con pines de precio', consumers: 'CatalogPage' },
  { file: 'VehicleDetailView.tsx', level: 'Organismo', purpose: 'Vista de producto: galería, modal 1+2 y cotizador', consumers: 'App.tsx (/vehiculos/:slug)' },
  { file: 'ReservationCheckoutView.tsx', level: 'Organismo', purpose: 'Checkout en 5 pasos lineales + confirmación', consumers: 'App.tsx (/reservar/:slug)' },
  { file: 'Header.tsx', level: 'Organismo', purpose: 'Cabecera principal y header mínimo checkout/registro', consumers: 'App.tsx (global)' },
  { file: 'Footer.tsx', level: 'Organismo', purpose: 'Pie de página + listón QA (SEO & DS)', consumers: 'App.tsx (global)' },
  { file: 'VirtuoExperienceSection.tsx', level: 'Organismo', purpose: 'Bloque de propuesta de valor en Home', consumers: 'App.tsx (Home)' },
  { file: 'FourStepProcess.tsx', level: 'Organismo', purpose: 'Flujo de renta en 4 pasos (móvil + desktop)', consumers: 'App.tsx (Home)' },
  { file: 'UseCasesSection.tsx', level: 'Organismo', purpose: 'Tarjetas de casos de uso por categoría', consumers: 'App.tsx (Home)' },
  { file: 'TrustSafetySection.tsx', level: 'Organismo', purpose: 'Garantías de cobertura y verificación', consumers: 'App.tsx (Home), TrustPage' },
  { file: 'HostBanner.tsx', level: 'Organismo', purpose: 'Banner promocional hacia /anfitriones', consumers: 'App.tsx (Home)' },
  { file: 'HostSection.tsx', level: 'Organismo', purpose: 'Landing de anfitriones con calculadora e ingresos', consumers: 'App.tsx (/anfitriones)' },
  { file: 'FaqSection.tsx', level: 'Organismo', purpose: 'Preguntas frecuentes en acordeón de 2 cols', consumers: 'App.tsx (Home), FaqPage' },
  { file: 'FinalCtaSection.tsx', level: 'Organismo', purpose: 'Sección de cierre y llamado a catálogo', consumers: 'App.tsx (Home)' },
];

export const DesignSystemPage: React.FC<DesignSystemPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [termsChecked, setTermsChecked] = useState(true);
  const [likeState, setLikeState] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [demoCarVal, setDemoCarVal] = useState(450000);
  const [demoDaysVal, setDemoDaysVal] = useState(15);
  const [demoPriceVal, setDemoPriceVal] = useState(1200);
  const [demoEmailConfirmed, setDemoEmailConfirmed] = useState(false);

  // Estados interactivos reales para moléculas y organismos
  const [demoChevronOpen, setDemoChevronOpen] = useState(false);
  const [demoCheckoutStepOpen, setDemoCheckoutStepOpen] = useState(true);
  const [demoLocation, setDemoLocation] = useState('Sucursal Plaza 450, Durango');
  const [demoVehicleType, setDemoVehicleType] = useState('');
  const [demoTime, setDemoTime] = useState('10:00');
  const [demoSort, setDemoSort] = useState('recommended');
  const [demoHostCity, setDemoHostCity] = useState('Durango, Dgo.');
  const [demoStartDate, setDemoStartDate] = useState('2026-11-04');
  const [demoEndDate, setDemoEndDate] = useState('2026-11-07');
  const [demoCalendarOpen, setDemoCalendarOpen] = useState(false);
  const demoCalendarRef = useRef<HTMLDivElement>(null);
  const [demoSingleDate, setDemoSingleDate] = useState('2026-11-04');
  const [demoSingleCalOpen, setDemoSingleCalOpen] = useState(false);

  const [demoSearchState, setDemoSearchState] = useState<SearchState>({
    location: 'Sucursal Plaza 450, Durango',
    startDate: '2026-11-04',
    startTime: '10:00',
    endDate: '2026-11-07',
    endTime: '18:00',
    category: '',
  });
  const [demoGalleryOpen, setDemoGalleryOpen] = useState(false);
  const [demoGalleryFav, setDemoGalleryFav] = useState(false);

  const demoVehicle = VEHICLES[0];
  const demoGalleryImages = demoVehicle.images.slice(0, 3);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (demoCalendarRef.current && !demoCalendarRef.current.contains(e.target as Node)) {
        setDemoCalendarOpen(false);
      }
    };
    if (demoCalendarOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [demoCalendarOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDemoGalleryOpen(false);
      }
    };
    if (demoGalleryOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [demoGalleryOpen]);

  const formatDsDate = (dateStr: string) => {
    if (!dateStr) return 'Seleccionar fecha';
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const d = new Date(dateStr + 'T00:00:00');
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const matchesSearch = (title: string, desc: string) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  };

  const shouldShowSection = (section: TabType) => {
    return activeTab === 'all' || activeTab === section;
  };

  // Visibilidad individual para garantizar búsqueda precisa y estado vacío real
  const showTokensColors =
    shouldShowSection('tokens') &&
    matchesSearch(
      'Escala Oficial Brand Azul cta-50 cta-100 cta-200 cta-300 cta-400 cta-500 cta-600 cta-700 cta-800 cta-900 cta-950 Superficies surface subtle edge ink-900 ink-400 Semánticos emerald amber rose',
      'color hex tailwind css variables root e9f2ff d8e8ff b8d3ff 8eb5ff 618bff 3d63ff 1b36ff 1f34f2 1125c2 182a97 0e1658 111827 ebebeb'
    );
  const showTokensRadii =
    shouldShowSection('tokens') &&
    matchesSearch(
      'Tokens de Radios Espaciado Sombras shadow-search shadow-dropdown shadow-float rounded-xl rounded-2xl',
      'border radius tailwind config spacing'
    );
  const showTokensSurfaces =
    shouldShowSection('tokens') &&
    matchesSearch('Reglas de Superficies Bordes Elevación Cero Sombras', 'botones cta rounded-2xl border bg-transparent popover shadow-2xl');
  const showTokensTypo =
    shouldShowSection('tokens') &&
    matchesSearch('Escala Tipográfica Google Sans Inter tabular-nums', 'fuente texto heading body scale');

  const showAtomsButtons =
    shouldShowSection('atoms') &&
    matchesSearch('Botones Buttons Volver Brand Negro Outline Ghost Loading Disabled Prototipo Icono Chips Toggle Chevron Circular', 'cta btn-1 btn-12');
  const showAtomsInputs =
    shouldShowSection('atoms') &&
    matchesSearch('Inputs Controles Formulario Nombre Search Datepicker Checkbox Switch', 'campo texto placeholder accent-');
  const showAtomsBadges =
    shouldShowSection('atoms') &&
    matchesSearch('Badges Tags Indicadores Estado index follow pendiente folio v2.3.2', 'pills etiquetas estatus');
  const showAtomsIcons =
    shouldShowSection('atoms') &&
    matchesSearch(
      'Iconos Iconografía Lucide 3D Ilustraciones SVG ArrowLeft Car ShieldCheck MapPin Calendar',
      DOCUMENTED_LUCIDE_ICONS.map((i) => i.name).join(' ')
    );

  const showMolSearch =
    shouldShowSection('molecules') &&
    matchesSearch('SearchContainer Barra de Búsqueda Flotante Hero', 'ubicacion fechas tipo vehiculo');
  const showMolDropdowns =
    shouldShowSection('molecules') &&
    matchesSearch('Dropdowns Selectores CustomDropdown DateRangePicker Ubicación Horarios Ordenamiento Ciudad Anfitrión Fechas', 'rounded-[20px] shadow-2xl');
  const showMolAccordionStep =
    shouldShowSection('molecules') &&
    matchesSearch('Contenedor Lineal Acordeón Chevron Circular Checkout Step Card', 'paso fechas sucursal');
  const showMolLinearCards =
    shouldShowSection('molecules') &&
    matchesSearch('Desglose Precio sin Fondo bg-transparent Bloque Informativo Lineal Dividido divide-y', 'tarifa galsa deposito verificacion bancaria');
  const showMolUpload =
    shouldShowSection('molecules') &&
    matchesSearch('DocumentUploadCard Subida Archivos Progreso Idle', 'licencia ine comprobante');
  const showMolStepCards =
    shouldShowSection('molecules') &&
    matchesSearch('StepFeatureCard Tarjetas de Paso Badge Flotante Azul', '4 pasos 6 pasos anfitriones bg-cta-300');
  const showMolSpecsFaq =
    shouldShowSection('molecules') &&
    matchesSearch('Especificaciones Técnicas Acordeón FAQ Collapsible', 'pasajeros transmision kilometraje requisitos');

  const showOrgVehicleCard =
    shouldShowSection('organisms') &&
    matchesSearch('VehicleCard Oficial Grid Horizontal Mapa Skeleton', 'tarjeta auto flota real');
  const showOrgGallery =
    shouldShowSection('organisms') &&
    matchesSearch('Galería de Producto 3 Fotos Modal Blanco', 'ver 3 fotos favorito jeep rubicon');
  const showOrgConfirmation =
    shouldShowSection('organisms') &&
    matchesSearch('Confirmación Minimalista 1 Columna Reserva creada Solicitud enviada', 'folio anf gal estado');
  const showOrgBanner =
    shouldShowSection('organisms') &&
    matchesSearch('Banner CTA Variables Oficiales bg-cta-50 text-ink-900 bg-cta Anfitriones', 'empieza a ganar quiero publicar mi auto');
  const showOrgQaRibbon =
    shouldShowSection('organisms') &&
    matchesSearch('Listón Control QA Footer Auditor SEO Sistema de Diseño', 'v2.3.1 barra inferior');

  const showAuditKpis =
    shouldShowSection('audit') &&
    matchesSearch('Auditoría Componentes KPI Resumen Inventario', '21 componentes duplicados codigo muerto');
  const showAuditDedupe =
    shouldShowSection('audit') &&
    matchesSearch('Duplicados Detectados Consolidados Código Muerto Eliminado', 'dropdownOptions StepFeatureCard AuthCardLayout LoginPage showForgot TIME_OPTIONS');
  const showAuditIntentional =
    shouldShowSection('audit') &&
    matchesSearch('Patrones Compartidos Vigentes Variantes Intencionales', 'CustomDropdown SearchContainer ReservationCheckoutView HostRegistrationPage');
  const showAuditInventory =
    shouldShowSection('audit') &&
    matchesSearch('Inventario Completo src/components Atómico Consumidores', COMPONENT_INVENTORY.map((c) => `${c.file} ${c.purpose} ${c.consumers}`).join(' '));

  const hasAnyVisibleBlock =
    showTokensColors ||
    showTokensRadii ||
    showTokensSurfaces ||
    showTokensTypo ||
    showAtomsButtons ||
    showAtomsInputs ||
    showAtomsBadges ||
    showMolSearch ||
    showMolDropdowns ||
    showMolAccordionStep ||
    showMolLinearCards ||
    showMolUpload ||
    showMolStepCards ||
    showMolSpecsFaq ||
    showOrgVehicleCard ||
    showOrgGallery ||
    showOrgConfirmation ||
    showOrgBanner ||
    showOrgQaRibbon ||
    showAuditKpis ||
    showAuditDedupe ||
    showAuditIntentional ||
    showAuditInventory;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-28">
      {/* Top Header Sticky */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  title="Volver a la app"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-pink-50 text-pink-700 border border-pink-200/60">
                      Atomic Design System
                    </span>
                    <span className="text-xs text-slate-400 font-mono">GALSA Rent v2.8.37</span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 leading-tight">
                    Sistema de Diseño, UI Kit &amp; Auditoría
                  </h1>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {[
                { id: 'all', label: 'Todos', icon: Layers },
                { id: 'tokens', label: 'Tokens', icon: Sparkles },
                { id: 'atoms', label: 'Átomos', icon: Box },
                { id: 'molecules', label: 'Moléculas', icon: Box },
                { id: 'organisms', label: 'Organismos', icon: Layers },
                { id: 'audit', label: 'Auditoría', icon: ClipboardCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-cta text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar token, componente, botón o duplicado..."
                className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta transition-all"
              />
            </div>
            <div className="text-xs text-slate-500 hidden sm:block">
              Presiona <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-semibold text-slate-700">Copiar</span> para obtener tokens o clases de Tailwind
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-12">
        {!hasAnyVisibleBlock && (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" strokeWidth={1.6} />
            <h2 className="text-base font-heading font-bold text-slate-900">
              No se encontraron bloques con «{searchQuery}»
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Ajusta el término de búsqueda o cambia la pestaña activa para explorar todo el sistema de diseño.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-cta hover:bg-cta-600 text-white font-heading font-semibold text-xs transition-colors cursor-pointer"
              >
                Restablecer búsqueda
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 1. TOKENS & FUNDAMENTOS */}
        {/* ============================================================ */}
        {(showTokensColors || showTokensRadii || showTokensSurfaces || showTokensTypo) && (
          <section id="tokens" className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-pink-600 font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Nivel 0 · Fundamentos &amp; Variables
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Variables Oficiales, Radios y Tipografía
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Sincronización 1:1 entre <code className="font-mono text-slate-700">tailwind.config.js</code> y <code className="font-mono text-slate-700">:root</code> en <code className="font-mono text-slate-700">src/index.css</code>.
              </p>
            </div>

            {/* Variables Oficiales de Color */}
            {showTokensColors && (
              <div className="space-y-5">
                {/* 1. Escala Oficial Brand Azul (cta-50 a cta-950) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-heading font-bold text-slate-900">
                        1. Escala Completa Brand Azul de GALSA (<code className="font-mono text-cta">cta-50</code> a <code className="font-mono text-cta">cta-950</code>)
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Los 11 tonos oficiales de <code className="font-mono text-slate-700">cta</code> en <code className="font-mono text-slate-700">tailwind.config.js</code> y variables CSS <code className="font-mono text-slate-700">--color-cta-50..950</code>. Haz clic en cualquier tarjeta para copiar su clase y código hexadecimal.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-cta bg-cta-50 border border-cta-200 px-2.5 py-0.5 rounded-full">11 tonos (50 – 950)</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {[
                      { token: 'cta-50', tw: 'bg-cta-50', cssVar: '--color-cta-50', hex: '#E9F2FF', usage: 'Banner Anfitriones & Badges suaves', light: true },
                      { token: 'cta-100', tw: 'bg-cta-100', cssVar: '--color-cta-100', hex: '#D8E8FF', usage: 'Selección suave / HostBanner', light: true },
                      { token: 'cta-200', tw: 'bg-cta-200', cssVar: '--color-cta-200', hex: '#B8D3FF', usage: 'Bordes azules / Subrayado', light: true },
                      { token: 'cta-300', tw: 'bg-cta-300', cssVar: '--color-cta-300', hex: '#8EB5FF', usage: 'Subrayados Hero & Badges', light: true },
                      { token: 'cta-400', tw: 'bg-cta-400', cssVar: '--color-cta-400', hex: '#618BFF', usage: 'Acentos e iconos intermedios', light: false },
                      { token: 'cta-500 (DEFAULT)', tw: 'bg-cta-500', cssVar: '--color-cta-500', hex: '#3D63FF', usage: 'CTA Principal (bg-cta / text-cta)', light: false },
                      { token: 'cta-600', tw: 'bg-cta-600', cssVar: '--color-cta-600', hex: '#1B36FF', usage: 'Hover botón primario (hover:bg-cta-600)', light: false },
                      { token: 'cta-700', tw: 'bg-cta-700', cssVar: '--color-cta-700', hex: '#1F34F2', usage: 'Estado activo / Texto en badge', light: false },
                      { token: 'cta-800', tw: 'bg-cta-800', cssVar: '--color-cta-800', hex: '#1125C2', usage: 'Texto alto contraste azul', light: false },
                      { token: 'cta-900', tw: 'bg-cta-900', cssVar: '--color-cta-900', hex: '#182A97', usage: 'Azul profundo para iconos sobre cta-300', light: false },
                      { token: 'cta-950', tw: 'bg-cta-950', cssVar: '--color-cta-950', hex: '#0E1658', usage: 'Azul noche máximo contraste', light: false },
                    ].map((c) => (
                      <div
                        key={c.token}
                        onClick={() => copySnippet(`${c.tw} | var(${c.cssVar}) | ${c.hex}`, `cta-${c.token}`)}
                        className="group cursor-pointer rounded-xl border border-slate-200/80 p-3 hover:border-cta-500 transition-colors text-left"
                      >
                        <div className={`h-11 rounded-lg ${c.tw} ${c.light ? 'border border-slate-200/80' : ''} mb-2 flex items-center justify-center`}>
                          {copiedCode === `cta-${c.token}` && (
                            <Check className={`w-4 h-4 ${c.light ? 'text-ink-900' : 'text-white'}`} />
                          )}
                        </div>
                        <div className="text-xs font-heading font-bold text-ink-900 truncate">{c.token}</div>
                        <div className="text-[10px] font-mono text-ink-500 truncate mt-0.5">{c.cssVar}</div>
                        <div className="text-[10px] font-mono text-ink-400 flex items-center justify-between mt-0.5">
                          <span>{c.hex}</span>
                          <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-ink-500" />
                        </div>
                        <div className="text-[10px] text-ink-500 mt-1 truncate">{c.usage}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Superficies, Bordes y Escala Ink */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-heading font-bold text-slate-900">
                        2. Superficies, Bordes (<code className="font-mono">surface / subtle / edge</code>) &amp; Escala Ink (<code className="font-mono">ink-900..400</code>)
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Variables neutras oficiales para fondos, líneas divisorias y jerarquía de textos (<code className="font-mono text-slate-700">--color-surface</code>, <code className="font-mono text-slate-700">--color-ink-*</code>).
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">10 variables</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {[
                      { token: 'surface', tw: 'bg-surface', cssVar: '--color-surface', hex: '#FFFFFF', usage: 'Fondo base de página', light: true },
                      { token: 'subtle', tw: 'bg-subtle', cssVar: '--color-subtle', hex: '#FAFAFA', usage: 'Superficie sutil', light: true },
                      { token: 'edge', tw: 'bg-edge', cssVar: '--color-edge', hex: '#EBEBEB', usage: 'Borde estructural', light: true },
                      { token: 'edge-light', tw: 'bg-edge-light', cssVar: '--color-edge-light', hex: '#F0F0F0', usage: 'Divisor interno suave', light: true },
                      { token: 'ink-900', tw: 'bg-ink-900', cssVar: '--color-ink-900', hex: '#111827', usage: 'Títulos y texto negro CTA', light: false },
                      { token: 'ink-800', tw: 'bg-ink-800', cssVar: '--color-ink-800', hex: '#1F2937', usage: 'Subtítulos y labels', light: false },
                      { token: 'ink-700', tw: 'bg-ink-700', cssVar: '--color-ink-700', hex: '#374151', usage: 'Párrafos sobre cta-50', light: false },
                      { token: 'ink-600', tw: 'bg-ink-600', cssVar: '--color-ink-600', hex: '#4B5563', usage: 'Texto secundario', light: false },
                      { token: 'ink-500', tw: 'bg-ink-500', cssVar: '--color-ink-500', hex: '#6B7280', usage: 'Metadatos y ayudas', light: false },
                      { token: 'ink-400', tw: 'bg-ink-400', cssVar: '--color-ink-400', hex: '#9CA3AF', usage: 'Placeholders / Deshabilitado', light: false },
                    ].map((c) => (
                      <div
                        key={c.token}
                        onClick={() => copySnippet(`${c.tw} | var(${c.cssVar}) | ${c.hex}`, `ink-${c.token}`)}
                        className="group cursor-pointer rounded-xl border border-slate-200/80 p-3 hover:border-cta-500 transition-colors text-left"
                      >
                        <div className={`h-11 rounded-lg ${c.tw} ${c.light ? 'border border-slate-200' : ''} mb-2 flex items-center justify-center`}>
                          {copiedCode === `ink-${c.token}` && (
                            <Check className={`w-4 h-4 ${c.light ? 'text-ink-900' : 'text-white'}`} />
                          )}
                        </div>
                        <div className="text-xs font-heading font-bold text-ink-900 truncate">{c.token}</div>
                        <div className="text-[10px] font-mono text-ink-500 truncate mt-0.5">{c.cssVar}</div>
                        <div className="text-[10px] font-mono text-ink-400 flex items-center justify-between mt-0.5">
                          <span>{c.hex}</span>
                          <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-ink-500" />
                        </div>
                        <div className="text-[10px] text-ink-500 mt-1 truncate">{c.usage}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Colores Semánticos */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-heading font-bold text-slate-900">
                        3. Colores Semánticos (Éxito, Revisión / Alerta, Error)
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Estados de contrato firmado, validación de documentos, badges SEO (<code className="font-mono text-slate-700">index, follow</code>) y acciones destructivas.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        group: 'Éxito / Verificado',
                        cssVar: '--color-success / --color-success-soft',
                        swatches: [
                          { label: 'emerald-500', hex: '#10B981', tw: 'bg-emerald-500', light: false },
                          { label: 'emerald-50', hex: '#ECFDF5', tw: 'bg-emerald-50', light: true },
                          { label: 'emerald-700', hex: '#047857', tw: 'bg-emerald-700', light: false },
                        ],
                      },
                      {
                        group: 'Alerta / En revisión',
                        cssVar: '--color-warning / --color-warning-soft',
                        swatches: [
                          { label: 'amber-500', hex: '#F59E0B', tw: 'bg-amber-500', light: false },
                          { label: 'amber-50', hex: '#FFFBEB', tw: 'bg-amber-50', light: true },
                          { label: 'amber-800', hex: '#92400E', tw: 'bg-amber-800', light: false },
                        ],
                      },
                      {
                        group: 'Error / Cancelación',
                        cssVar: '--color-error / --color-error-soft',
                        swatches: [
                          { label: 'rose-600', hex: '#E11D48', tw: 'bg-rose-600', light: false },
                          { label: 'rose-50', hex: '#FFF1F2', tw: 'bg-rose-50', light: true },
                          { label: 'rose-700', hex: '#BE123C', tw: 'bg-rose-700', light: false },
                        ],
                      },
                    ].map((sem) => (
                      <div key={sem.group} className="rounded-xl border border-slate-200/90 p-4 space-y-3 text-left">
                        <div>
                          <div className="text-xs font-heading font-bold text-slate-900">{sem.group}</div>
                          <div className="text-[10px] font-mono text-slate-400">{sem.cssVar}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {sem.swatches.map((sw) => (
                            <div
                              key={sw.label}
                              onClick={() => copySnippet(`${sw.tw} (${sw.hex})`, `sem-${sw.label}`)}
                              className="cursor-pointer group"
                            >
                              <div className={`h-9 rounded-lg ${sw.tw} ${sw.light ? 'border border-slate-200' : ''} mb-1 flex items-center justify-center`}>
                                {copiedCode === `sem-${sw.label}` && (
                                  <Check className={`w-3.5 h-3.5 ${sw.light ? 'text-slate-900' : 'text-white'}`} />
                                )}
                              </div>
                              <div className="text-[10px] font-mono font-semibold text-slate-700 truncate">{sw.label}</div>
                              <div className="text-[10px] font-mono text-slate-400">{sw.hex}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tokens de Radios, Espaciado y Sombras */}
            {showTokensRadii && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-heading font-bold text-slate-900">
                      Tokens de Radios, Variables de Espaciado y Sombras (<code className="font-mono">tailwind.config.js</code>)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Todos los radios de curvatura vigentes y las 3 sombras de elevación flotante declaradas en el proyecto.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-left">
                  {[
                    { name: 'Mini Pill', cls: 'rounded-[6px]', px: '6px' },
                    { name: 'Input / Search', cls: 'rounded-[8px]', px: '8px' },
                    { name: 'Botón / CTA', cls: 'rounded-xl', px: '12px' },
                    { name: 'Card Lineal', cls: 'rounded-2xl', px: '16px' },
                    { name: 'Popover / Foto', cls: 'rounded-[20px]', px: '20px' },
                    { name: 'Resumen Card', cls: 'rounded-[24px]', px: '24px' },
                    { name: 'Banner Hero', cls: 'rounded-[36px]', px: '28–36px' },
                    { name: 'Pill / Avatar', cls: 'rounded-full', px: '9999px' },
                  ].map((r) => (
                    <div
                      key={r.name}
                      onClick={() => copySnippet(r.cls, `rad-${r.name}`)}
                      className="cursor-pointer p-3 rounded-xl border border-slate-200 hover:border-cta-500 transition-colors space-y-2"
                    >
                      <div className={`h-10 w-full bg-cta-50 border border-cta-200 ${r.cls} flex items-center justify-center`}>
                        {copiedCode === `rad-${r.name}` && <Check className="w-3.5 h-3.5 text-cta" />}
                      </div>
                      <div className="text-[11px] font-heading font-bold text-slate-900 truncate">{r.name}</div>
                      <div className="text-[10px] font-mono text-slate-500 truncate">{r.cls}</div>
                      <div className="text-[10px] font-mono text-slate-400">{r.px}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-left">
                  {[
                    { name: 'shadow-search', cls: 'shadow-search', desc: 'Buscador flotante Hero (uso opcional sobre hero)' },
                    { name: 'shadow-dropdown', cls: 'shadow-dropdown', desc: 'Menús desplegables y selectores flotantes' },
                    { name: 'shadow-float', cls: 'shadow-float', desc: 'Modales y paneles superpuestos principales' },
                  ].map((sh) => (
                    <div key={sh.name} className={`p-4 rounded-2xl border border-slate-200 bg-white ${sh.cls} space-y-1`}>
                      <div className="text-xs font-mono font-bold text-slate-900">{sh.name}</div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{sh.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reglas de Superficies, Bordes y Elevación */}
            {showTokensSurfaces && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-heading font-bold text-slate-900">
                      Reglas de Superficies, Bordes y Elevación (v2.3.2)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Estandarización lineal: cero sombras en botones y enlaces CTA; elevación reservada exclusivamente para popovers y modales.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 text-left">
                    <span className="inline-flex px-2 py-0.5 rounded bg-cta-50 text-cta font-mono text-[10px] font-bold">
                      Cero sombras CTA
                    </span>
                    <div className="text-xs font-heading font-bold text-slate-900">Botones y enlaces planos</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Ningún <code className="font-mono text-slate-700">&lt;button&gt;</code> o <code className="font-mono text-slate-700">&lt;a&gt;</code> usa <code className="font-mono text-slate-700">shadow-*</code>. Transición por color/borde.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 text-left">
                    <span className="inline-flex px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                      rounded-2xl border
                    </span>
                    <div className="text-xs font-heading font-bold text-slate-900">Contenedores lineales</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Pasos de checkout, tarjetas informativas y registro usan <code className="font-mono text-slate-700">border-slate-200</code> sobre fondo blanco.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-transparent space-y-1.5 text-left">
                    <span className="inline-flex px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                      bg-transparent
                    </span>
                    <div className="text-xs font-heading font-bold text-slate-900">Precios sin fondo gris</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      En Producto, desglose y depósito usan solo línea exterior y divisor horizontal sutil sin relleno.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 text-left">
                    <span className="inline-flex px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">
                      rounded-[20px] shadow-2xl
                    </span>
                    <div className="text-xs font-heading font-bold text-slate-900">Popovers y calendarios</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Menús flotantes (`CustomDropdown`, `DateRangePicker`) dentro de padres con <code className="font-mono text-slate-700">overflow-visible</code>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tipografías & Escalas */}
            {showTokensTypo && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-sm font-heading font-bold text-slate-900 mb-4">
                  Escala Tipográfica (Google Sans + Inter)
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Display / Hero · font-heading font-extrabold text-3xl sm:text-4xl</div>
                      <div className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-1">
                        Renta de autos sin complicaciones
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copySnippet('font-heading font-extrabold text-3xl sm:text-4xl', 'typo-hero')}
                      className="px-2.5 py-1 text-xs rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 self-start shrink-0 cursor-pointer"
                    >
                      {copiedCode === 'typo-hero' ? 'Copiado ✓' : 'Copiar'}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Section Heading · font-heading font-bold text-xl sm:text-2xl</div>
                      <div className="text-xl sm:text-2xl font-heading font-bold text-slate-900 mt-1">
                        Autos verificados listos para entrega
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copySnippet('font-heading font-bold text-xl sm:text-2xl', 'typo-h2')}
                      className="px-2.5 py-1 text-xs rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 self-start shrink-0 cursor-pointer"
                    >
                      {copiedCode === 'typo-h2' ? 'Copiado ✓' : 'Copiar'}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Body + Tabular Nums · font-sans text-sm text-slate-600 | tabular-nums</div>
                      <div className="text-sm font-sans text-slate-600 mt-1 max-w-2xl leading-relaxed">
                        Explora autos verificados en México. Tarifa diaria: <span className="font-heading font-bold text-slate-900 tabular-nums">$2,300 MXN</span> · Servicio <span className="font-heading font-bold text-slate-900 tabular-nums">33%</span>.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copySnippet('font-sans text-sm text-slate-600 leading-relaxed tabular-nums', 'typo-body')}
                      className="px-2.5 py-1 text-xs rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 self-start shrink-0 cursor-pointer"
                    >
                      {copiedCode === 'typo-body' ? 'Copiado ✓' : 'Copiar'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ============================================================ */}
        {/* 2. ÁTOMOS (ATOMS) */}
        {/* ============================================================ */}
        {(showAtomsButtons || showAtomsInputs || showAtomsBadges || showAtomsIcons) && (
          <section id="atoms" className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-cta font-mono text-xs font-bold uppercase tracking-wider">
                <Box className="w-4 h-4" /> Nivel 1 · Átomos
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Colección Completa de Botones y Elementos Base
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Todos los botones planos (cero sombras), inputs con etiquetas uppercase, checkboxes y badges oficiales.
              </p>
            </div>

            {/* BOTONES */}
            {showAtomsButtons && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    Botones (Sistema Oficial sin Botones Negros · Reposo / Hover / Presionado / Bloqueado)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Los botones negros fueron reemplazados por Azul CTA</span>
                </div>

                {/* Matriz Oficial de Estados de Botones */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 sm:p-5 space-y-4 text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-heading font-bold text-slate-900">
                      Matriz Oficial de Botones y Estados
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      CTA Azul · Fondo Claro Texto Azul 500 · Lineal Gris · Bloqueado
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Columna 1: CTA Azul (Fondo azul, texto blanco) */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-3">
                      <div className="text-xs font-heading font-bold text-slate-900">CTA Azul (Fondo `bg-cta`, Texto Blanco)</div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Reposo</span>
                          <button type="button" className="w-full px-3.5 py-2 rounded-xl bg-cta text-white font-heading font-semibold text-xs cursor-pointer">Continuar</button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Hover (`cta-600`)</span>
                          <button type="button" className="w-full px-3.5 py-2 rounded-xl bg-cta-600 text-white font-heading font-semibold text-xs cursor-pointer">Continuar</button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Presionado (`active`)</span>
                          <button type="button" className="w-full px-3.5 py-2 rounded-xl bg-cta-700 scale-[0.98] text-white font-heading font-semibold text-xs cursor-pointer">Continuar</button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Bloqueado</span>
                          <button type="button" disabled className="w-full px-3.5 py-2 rounded-xl bg-slate-200 text-slate-400 font-heading font-semibold text-xs cursor-not-allowed">Continuar</button>
                        </div>
                      </div>
                    </div>

                    {/* Columna 2: Soft Azul (Fondo claro, texto azul 500) */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-3">
                      <div className="text-xs font-heading font-bold text-slate-900">Soft Azul (Fondo `bg-cta-50`, Texto `cta-500`)</div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Reposo</span>
                          <button type="button" className="w-full px-3.5 py-2 rounded-xl bg-cta-50 text-cta font-heading font-semibold text-xs cursor-pointer">Ver detalles</button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Hover (`cta-100`)</span>
                          <button type="button" className="w-full px-3.5 py-2 rounded-xl bg-cta-100 text-cta font-heading font-semibold text-xs cursor-pointer">Ver detalles</button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Presionado (`active`)</span>
                          <button type="button" className="w-full px-3.5 py-2 rounded-xl bg-cta-200 scale-[0.98] text-cta-600 font-heading font-semibold text-xs cursor-pointer">Ver detalles</button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Bloqueado</span>
                          <button type="button" disabled className="w-full px-3.5 py-2 rounded-xl bg-slate-100 text-slate-400 font-heading font-semibold text-xs cursor-not-allowed">Ver detalles</button>
                        </div>
                      </div>
                    </div>

                    {/* Columna 3: Lineal Gris (Sin fondo, texto negro) */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-3">
                      <div className="text-xs font-heading font-bold text-slate-900">Lineal Gris (Sin fondo, Texto Negro)</div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Reposo</span>
                          <button type="button" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-transparent text-slate-900 font-heading font-semibold text-xs cursor-pointer">Cancelar</button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Hover (`slate-50`)</span>
                          <button type="button" className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-heading font-semibold text-xs cursor-pointer">Cancelar</button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Presionado (`active`)</span>
                          <button type="button" className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-100 scale-[0.98] text-slate-900 font-heading font-semibold text-xs cursor-pointer">Cancelar</button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 block">Bloqueado</span>
                          <button type="button" disabled className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-transparent text-slate-300 font-heading font-semibold text-xs cursor-not-allowed">Cancelar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* 1. Primario Brand */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">1. Botón Brand Azul (Hero &amp; CTAs)</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Acción primaria en Checkout y Anfitriones</div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="w-full px-5 py-2.5 rounded-xl bg-cta hover:bg-cta-600 active:bg-cta-700 text-white font-heading font-semibold text-xs sm:text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Continuar</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copySnippet(
                          'px-7 py-3.5 rounded-xl bg-cta hover:bg-cta-600 active:bg-cta-700 text-white font-heading font-semibold text-sm transition-all active:scale-[0.98]',
                          'btn-1'
                        )
                      }
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-1' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 2. Soft Azul (Fondo claro, texto azul 500) */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">2. Botón Soft Azul (Fondo claro + Texto Azul 500)</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Acción secundaria destacada sin saturar</div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="w-full px-5 py-2.5 rounded-xl bg-cta-50 hover:bg-cta-100 active:bg-cta-200 text-cta font-heading font-semibold text-xs sm:text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Reservar vehículo</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copySnippet(
                          'px-5 py-2.5 rounded-xl bg-cta-50 hover:bg-cta-100 active:bg-cta-200 text-cta font-heading font-semibold text-sm transition-all active:scale-[0.98]',
                          'btn-2'
                        )
                      }
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-2' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 3. Secundario Outline */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">3. Botón Secundario Outline</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Acciones secundarias (Leer y firmar contrato, Ver resumen, Especificaciones)</div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="w-full px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-transparent hover:bg-slate-50 active:bg-slate-100 active:scale-[0.98] text-slate-900 font-heading font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Leer y firmar contrato</span>
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copySnippet(
                          'px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-transparent hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-heading font-semibold text-sm transition-all',
                          'btn-3'
                        )
                      }
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-3' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 4. Botón Volver Superior */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">4. Botón Volver Superior (← Volver)</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Cabecera de Checkout y Registro de Anfitriones</div>
                      <div className="mt-4 flex items-center justify-start bg-white rounded-xl border border-slate-200 px-4 py-3">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Volver</span>
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copySnippet(
                          'inline-flex items-center gap-2 text-sm font-heading font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer',
                          'btn-4'
                        )
                      }
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-4' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 5. Ghost / Minimal */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">5. Botón Ghost / Minimal</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Acciones terciarias o limpiar filtros</div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="w-full px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-heading font-medium text-xs sm:text-sm hover:bg-slate-200/60 transition-colors flex items-center justify-center cursor-pointer"
                        >
                          <span>Limpiar filtros</span>
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copySnippet(
                          'px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-heading font-medium text-sm hover:bg-slate-200/60 transition-colors',
                          'btn-5'
                        )
                      }
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-5' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 6. Botón de Búsqueda Hero (<SearchContainer /> real: bg-slate-100 sin borde -> bg-cta activo) */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">6. Botón Buscar Hero (Inactivo / Activo)</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">SearchContainer · Fondo gris sin borde y estado activo CTA</div>
                      <div className="mt-4 flex items-center justify-center gap-4">
                        <button
                          type="button"
                          className="h-[52px] w-[52px] rounded-[8px] bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer"
                          title="Estado en reposo (sin borde)"
                        >
                          <Search className="w-5 h-5" strokeWidth={1.6} />
                        </button>
                        <button
                          type="button"
                          className="h-[52px] w-[52px] rounded-[8px] bg-cta hover:bg-cta-600 text-white flex items-center justify-center transition-all cursor-pointer"
                          title="Estado activo con filtros"
                        >
                          <Search className="w-5 h-5" strokeWidth={1.6} />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copySnippet(
                          'h-[52px] w-[52px] rounded-[8px] (Reposo: bg-slate-100 hover:bg-slate-200 text-slate-600 | Activo: bg-cta hover:bg-cta-600 text-white)',
                          'btn-6'
                        )
                      }
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-6' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 7. Isotipo Oficial (<GalsaLogo /> Real) + Estados Deshabilitados */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">7. Isotipo Oficial (&lt;GalsaLogo /&gt;) &amp; Disabled</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Header, Footer y botones deshabilitados reales</div>
                      <div className="mt-4 space-y-2.5">
                        <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                          <GalsaLogo className="h-5 w-auto text-cta" />
                          <span className="text-[10px] font-mono text-slate-400">text-cta</span>
                        </div>
                        <button
                          type="button"
                          disabled
                          className="w-full px-4 py-2 rounded-xl bg-slate-200 text-slate-400 font-heading font-semibold text-xs cursor-not-allowed flex items-center justify-center"
                        >
                          <span>Estado deshabilitado (disabled)</span>
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copySnippet(
                          '<GalsaLogo className="h-6 w-auto text-cta" /> | Disabled CTA: bg-slate-200 text-slate-400 cursor-not-allowed | Disabled Lineal: border border-slate-200 bg-transparent text-slate-300 cursor-not-allowed',
                          'btn-7'
                        )
                      }
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-7' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 8. Botón Inactivo Prototipo (Mismo token visual que Bloqueado) */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">8. Botón Inactivo Prototipo</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Token oficial Bloqueado (bg-slate-200 text-slate-400), clicable en prototipo</div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="w-full px-5 py-2.5 rounded-xl bg-slate-200 text-slate-400 font-heading font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center cursor-pointer"
                        >
                          <span>Continuar (Prototipo)</span>
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copySnippet(
                          'px-5 py-2.5 rounded-xl bg-slate-200 text-slate-400 font-heading font-semibold text-sm transition-colors cursor-pointer',
                          'btn-8'
                        )
                      }
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-8' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 9. Botones de Icono / Microacciones */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">9. Botones de Icono / Acción Rápida</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Favorito en galería, copiar enlace y abrir</div>
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => setLikeState(!likeState)}
                          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                          title="Favorito"
                        >
                          <Heart className={`w-4 h-4 ${likeState ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}`} />
                        </button>
                        <button
                          type="button"
                          onClick={() => copySnippet('Ejemplo de texto', 'icon-copy')}
                          className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                          title="Copiar"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="w-9 h-9 rounded-xl bg-cta-50 text-cta hover:bg-cta-100 flex items-center justify-center transition-colors cursor-pointer"
                          title="Abrir"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copySnippet(
                          'w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors',
                          'btn-9'
                        )
                      }
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-9' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 10. Filter Chips / Category Tabs */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">10. Chips / Píldoras de Filtro</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Filtros en Home, Catálogo y SEO</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-lg bg-cta text-white text-xs font-heading font-medium cursor-pointer"
                        >
                          Todos (Activo)
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-lg bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 text-xs font-heading font-medium transition-colors cursor-pointer"
                        >
                          SUVs &amp; 4x4
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-lg bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 text-xs font-heading font-medium transition-colors cursor-pointer"
                        >
                          Económicos
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copySnippet(
                          'px-3 py-1.5 rounded-lg text-xs font-heading font-medium (Active: bg-cta text-white | Default: bg-white text-slate-600 border border-slate-200)',
                          'btn-10'
                        )
                      }
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-10' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 11. View Toggle Pill */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">11. Toggle de Vista (Cuadrícula / Mapa)</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Control segmentado plano en Catálogo</div>
                      <div className="mt-4 flex justify-center">
                        <div className="bg-slate-200/70 p-1 rounded-xl inline-flex items-center">
                          <button
                            type="button"
                            onClick={() => setViewMode('grid')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading transition-colors cursor-pointer ${
                              viewMode === 'grid'
                                ? 'bg-white text-slate-900 font-bold'
                                : 'text-slate-600 hover:text-slate-900 font-medium'
                            }`}
                          >
                            <Grid className="w-3.5 h-3.5" />
                            <span>Cuadrícula</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setViewMode('map')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading transition-colors cursor-pointer ${
                              viewMode === 'map'
                                ? 'bg-white text-slate-900 font-bold'
                                : 'text-slate-600 hover:text-slate-900 font-medium'
                            }`}
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Mapa</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copySnippet('bg-slate-200/70 p-1 rounded-xl inline-flex items-center', 'btn-11')}
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-11' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 12. Indicador Chevron con Fondo Circular */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">12. Indicador Chevron con Fondo Circular</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Toggle circular de acordeones en Checkout</div>
                      <div className="mt-4 flex items-center justify-center gap-5">
                        <button
                          type="button"
                          onClick={() => setDemoChevronOpen((prev) => !prev)}
                          className="group inline-flex items-center gap-2 cursor-pointer"
                          title="Haz clic para probar rotación"
                        >
                          <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors">
                            <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${demoChevronOpen ? 'rotate-180' : ''}`} />
                          </div>
                          <span className="text-[11px] font-heading font-medium text-slate-600">
                            {demoChevronOpen ? 'Abierto' : 'Reposo'}
                          </span>
                        </button>

                        <div className="inline-flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200/90 text-slate-700 flex items-center justify-center">
                            <ChevronDown className="w-4 h-4 text-slate-700 rotate-180" />
                          </div>
                          <span className="text-[11px] font-heading font-medium text-slate-500">Activo</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copySnippet(
                          'w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 transition-colors',
                          'btn-12'
                        )
                      }
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> {copiedCode === 'btn-12' ? 'Copiado ✓' : 'Copiar clases'}
                    </button>
                  </div>

                  {/* 13. Catálogo Completo de Chevrones */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4 md:col-span-2 lg:col-span-3">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">13. Catálogo de Chevrones en la App</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Todos los usos oficiales de ChevronUp, ChevronDown y ChevronRight</div>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                              <ChevronUp className="w-4 h-4" />
                            </span>
                            <span className="text-xs font-heading font-bold text-slate-800">Barras Flotantes Móviles</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                            A la <strong>izquierda</strong> del precio en la barra inferior fija (<code className="text-[10px]">fixed bottom-0</code>) de Detalle de Auto y Resumen en Checkout.
                          </p>
                          <span className="text-[10px] font-mono text-slate-400 block">VehicleDetailView, ReservationCheckoutView</span>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                              <ChevronDown className="w-4 h-4" />
                            </span>
                            <span className="text-xs font-heading font-bold text-slate-800">Acordeones Checkout</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                            5 pasos plegables (fechas, datos, docs, extras, contrato) con <code className="text-[10px]">rotate-180</code>.
                          </p>
                          <span className="text-[10px] font-mono text-slate-400 block">ReservationCheckoutView.tsx</span>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                            <span className="text-xs font-heading font-bold text-slate-800">Selects y Menús</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                            Dropdowns de horarios, filtros de catálogo, barra de búsqueda y menús del Header.
                          </p>
                          <span className="text-[10px] font-mono text-slate-400 block">CustomDropdown, CatalogPage, Header, SearchContainer</span>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                            <span className="text-xs font-heading font-bold text-slate-800">Links y Breadcrumbs</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                            Enlace &quot;Ver catálogo&quot; y migas de pan en páginas informativas.
                          </p>
                          <span className="text-[10px] font-mono text-slate-400 block">VehicleDetailView, AboutPage, HowItWorksPage</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 14. Mapa Completo de Uso de Botones en la App */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-4 md:col-span-2 lg:col-span-3">
                    <div>
                      <div className="text-xs font-heading font-bold text-slate-800">14. Mapa de Todos los Botones en la App</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Donde vive cada variante de botón</div>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left text-[11px]">
                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                          <span className="font-heading font-bold text-cta block">CTA Primario Azul</span>
                          <span className="text-slate-500 block">Continuar, Publicar auto, Hablar por WhatsApp, Entrar/Registrarse</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                          <span className="font-heading font-bold text-slate-800 block">Lineal Neutral (Outline)</span>
                          <span className="text-slate-500 block">Leer y firmar contrato, Ver resumen móvil, Compartir, Favorito</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                          <span className="font-heading font-bold text-slate-900 block">Sólido Oscuro (Dark)</span>
                          <span className="text-slate-500 block">Aplicar fechas en DateRangePicker y acciones de confirmación modal</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                          <span className="font-heading font-bold text-slate-600 block">Ghost / Volver / Iconos</span>
                          <span className="text-slate-500 block">Volver al catálogo, Borrar filtros, Toggles y Chevrons circulares</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CATÁLOGO UNIFICADO DE BOTONES DE RETORNO («BACK / VOLVER») */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm sm:text-base font-heading font-bold text-slate-900">
                        Botones de Retorno Unificados («Back / Volver» y Breadcrumbs)
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Mismo estilo, icono (<code className="font-mono">ArrowLeft w-4 h-4</code>) y tamaño en toda la app. Los breadcrumbs no llevan icono y los botones estándar («Volver a iniciar sesión», «Volver al inicio», paginación y calendario) pertenecen a la sección de Botones.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-cta bg-cta-50 border border-cta-200 px-2.5 py-0.5 rounded-full self-start shrink-0">
                      3 patrones unificados
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                    {/* Back 1: Circular Solo Icono */}
                    <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-3">
                      <div className="space-y-2">
                        <div className="text-xs font-heading font-bold text-slate-900">
                          B1. Circular Solo Icono (36×36 · Auth / Toolbars)
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          ForgotPasswordPage · SeoPage · DesignSystemPage
                        </div>
                        <div className="pt-2 flex items-center gap-3">
                          <button
                            type="button"
                            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                            title="Volver (36x36 unificado)"
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          copySnippet(
                            'w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer',
                            'back-1'
                          )
                        }
                        className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                      >
                        <Copy className="w-3 h-3" /> {copiedCode === 'back-1' ? 'Copiado ✓' : 'Copiar clases'}
                      </button>
                    </div>

                    {/* Back 2: Inline Unificado */}
                    <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-3">
                      <div className="space-y-2">
                        <div className="text-xs font-heading font-bold text-slate-900">
                          B2. Botón Back Inline Unificado (Checkout, Registro, Blog)
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          ReservationCheckoutView · HostRegistrationPage · BlogPage
                        </div>
                        <div className="pt-2 flex flex-col items-start gap-2 bg-white rounded-lg border border-slate-200 p-2.5">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Volver al vehículo</span>
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Volver a todos los artículos</span>
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          copySnippet(
                            'inline-flex items-center gap-2 text-sm font-heading font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer',
                            'back-2'
                          )
                        }
                        className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                      >
                        <Copy className="w-3 h-3" /> {copiedCode === 'back-2' ? 'Copiado ✓' : 'Copiar clases'}
                      </button>
                    </div>

                    {/* Back 3: Breadcrumb sin icono */}
                    <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-3">
                      <div className="space-y-2">
                        <div className="text-xs font-heading font-bold text-slate-900">
                          B3. Breadcrumb Retorno (Sin icono)
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          VehicleDetailView · AboutPage · HowItWorksPage
                        </div>
                        <div className="pt-2 flex items-center gap-1.5 bg-white rounded-lg border border-slate-200 p-2.5 text-xs">
                          <button
                            type="button"
                            className="text-slate-700 hover:text-black font-semibold transition-colors cursor-pointer"
                          >
                            Volver al catálogo
                          </button>
                          <span className="text-slate-300">/</span>
                          <span className="text-slate-500">SUV</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          copySnippet(
                            'text-slate-700 hover:text-black font-semibold transition-colors',
                            'back-3'
                          )
                        }
                        className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 self-start cursor-pointer"
                      >
                        <Copy className="w-3 h-3" /> {copiedCode === 'back-3' ? 'Copiado ✓' : 'Copiar clases'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INPUTS Y FORMULARIOS */}
            {showAtomsInputs && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    Inputs, Textareas, Selectores &amp; Controles (Comparativa Completa)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Todos los campos reales usados en la app</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* 1. Campo Oficial Formulario (Text / Email / Tel) */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-3 text-left">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600">
                        1. Input Estándar (Text / Email)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Carlos"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Checkout, Registro Anfitrión, Cuenta</span>
                  </div>

                  {/* 2. Textarea (Información adicional) */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-3 text-left md:col-span-2">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600">
                        2. Textarea — Información adicional (opcional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Notas para tu renta: horario de llegada de vuelo, requerimientos de entrega..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta bg-white text-slate-900 font-sans text-sm outline-none transition-colors resize-y placeholder:text-slate-400"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">ReservationCheckoutView (Docs), AccountPage (Notas)</span>
                  </div>

                  {/* 3. Search Input */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-3 text-left">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600">
                        3. Input Búsqueda
                      </label>
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Marca o modelo..."
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">CatalogPage, DesignSystemPage</span>
                  </div>

                  {/* 4. Input Auth / Password */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-3 text-left">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600">
                        4. Input Auth / Contraseña
                      </label>
                      <input
                        type="password"
                        defaultValue="••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta bg-white text-slate-900 font-sans text-sm outline-none transition-colors placeholder:text-slate-400"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">LoginPage, RegisterPage, ResetPassword</span>
                  </div>

                  {/* 5. Input Numérico / Tarifa */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-3 text-left">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600">
                        5. Input Numérico / Tarifa
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-sans text-slate-400">$</span>
                        <input
                          type="number"
                          defaultValue={1500}
                          className="w-full pl-7 pr-12 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta bg-white text-slate-900 font-sans text-sm outline-none transition-colors tabular-nums"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-sans text-slate-400">MXN</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">HostSection, HostRegistrationPage</span>
                  </div>

                  {/* 6. Input Solo Lectura (Fijo) */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-3 text-left">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600">
                        6. Input Solo Lectura (Fijo)
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="Durango, Dgo."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-sans text-sm outline-none cursor-default"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">ReservationCheckoutView (Ciudad/Sucursal)</span>
                  </div>

                  {/* 7. Datepicker Trigger Input */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between gap-3 text-left">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600">
                        7. Selector de Fecha (Trigger)
                      </label>
                      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-sm font-sans text-slate-900 cursor-pointer transition-colors">
                        <span>4 nov 2026</span>
                        <Calendar className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">VehicleDetailView (SingleDatePicker)</span>
                  </div>

                  {/* 8. Range Slider Oficial & Checkbox Real */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3 text-left">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">8. Range Slider &amp; Checkbox</span>
                        <span className="font-bold text-slate-900 tabular-nums">${demoPriceVal.toLocaleString('es-MX')}</span>
                      </div>
                      <input
                        type="range"
                        min={600}
                        max={3000}
                        step={50}
                        value={demoPriceVal}
                        onChange={(e) => setDemoPriceVal(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cta"
                      />
                    </div>
                    <label className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer pt-1 border-t border-slate-200/70">
                      <input
                        type="checkbox"
                        checked={termsChecked}
                        onChange={(e) => setTermsChecked(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-cta focus:ring-cta accent-cta cursor-pointer"
                      />
                      <span>Acepto términos y privacidad</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* BADGES & CHIPS */}
            {showAtomsBadges && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    Badges, Chips &amp; Indicadores de Estado (Misma Regla sin Chips Negros)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Reposo · Hover · Presionado · Bloqueado</span>
                </div>

                {/* Matriz Oficial de Estados de Chips */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 space-y-3 text-left">
                  <div className="text-xs font-heading font-bold text-slate-900">
                    Matriz Oficial de Chips (CTA Azul · Soft Azul · Lineal Gris · Bloqueado)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-2">
                      <span className="text-[11px] font-heading font-bold text-slate-800 block">Chip CTA Azul (`bg-cta text-white`)</span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-cta text-white text-xs font-heading font-semibold">Reposo</span>
                        <span className="px-2.5 py-1 rounded-full bg-cta-600 text-white text-xs font-heading font-semibold">Hover</span>
                        <span className="px-2.5 py-1 rounded-full bg-cta-700 scale-95 text-white text-xs font-heading font-semibold">Presionado</span>
                        <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-400 text-xs font-heading font-semibold cursor-not-allowed">Bloqueado</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-2">
                      <span className="text-[11px] font-heading font-bold text-slate-800 block">Chip Soft Azul (`bg-cta-50 text-cta`)</span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-cta-50 text-cta text-xs font-heading font-semibold">Reposo</span>
                        <span className="px-2.5 py-1 rounded-full bg-cta-100 text-cta text-xs font-heading font-semibold">Hover</span>
                        <span className="px-2.5 py-1 rounded-full bg-cta-200 scale-95 text-cta-600 text-xs font-heading font-semibold">Presionado</span>
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-400 text-xs font-heading font-semibold cursor-not-allowed">Bloqueado</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-2">
                      <span className="text-[11px] font-heading font-bold text-slate-800 block">Chip Lineal Gris (Sin fondo, Texto Negro)</span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full border border-slate-200 bg-transparent text-slate-900 text-xs font-heading font-medium">Reposo</span>
                        <span className="px-2.5 py-1 rounded-full border border-slate-300 bg-slate-50 text-slate-900 text-xs font-heading font-medium">Hover</span>
                        <span className="px-2.5 py-1 rounded-full border border-slate-300 bg-slate-100 scale-95 text-slate-900 text-xs font-heading font-medium">Presionado</span>
                        <span className="px-2.5 py-1 rounded-full border border-slate-200 bg-transparent text-slate-300 text-xs font-heading font-medium cursor-not-allowed">Bloqueado</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-heading font-semibold">
                      5 extras · +$1,650
                    </span>
                    <div className="text-[11px] font-heading font-bold text-slate-800">1. Chip Gris Neutral (Sin línea)</div>
                    <span className="text-[10px] font-mono text-slate-400 block">ReservationCheckoutView, SeoPage</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-[11px] font-sans">
                        5 plazas
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-[11px] font-sans">
                        Automática
                      </span>
                    </div>
                    <div className="text-[11px] font-heading font-bold text-slate-800">2. Chip de Especificación</div>
                    <span className="text-[10px] font-mono text-slate-400 block">VehicleCard (Catálogo y Similares)</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cta-50 text-cta text-xs font-heading font-semibold">
                        Verificado GALSA
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cta-50 text-cta text-xs font-heading font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Folio: ANF-842910
                      </span>
                    </div>
                    <div className="text-[11px] font-heading font-bold text-slate-800">3. Chip Azul (Marca / Folio · Sin línea)</div>
                    <span className="text-[10px] font-mono text-slate-400 block">ReservationCheckoutView, HostRegistration</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-heading font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      index, follow
                    </span>
                    <div className="text-[11px] font-heading font-bold text-slate-800">4. Chip Verde Positivo (Sin línea)</div>
                    <span className="text-[10px] font-mono text-slate-400 block">SeoPage, AccountPage, Checkout</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-heading font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      Pendiente de confirmación
                    </span>
                    <div className="text-[11px] font-heading font-bold text-slate-800">5. Chip Amarillo Pendiente (Sin línea)</div>
                    <span className="text-[10px] font-mono text-slate-400 block">AccountPage, HostRegistration, Checkout</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-heading font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Cancelada / Alerta
                    </span>
                    <div className="text-[11px] font-heading font-bold text-slate-800">6. Chip Rojo Alerta (Sin línea)</div>
                    <span className="text-[10px] font-mono text-slate-400 block">AccountPage, Estados de error</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-emerald-400 font-mono">
                      v2.8.37
                    </span>
                    <div className="text-[11px] font-heading font-bold text-slate-800">7. Chip de Versión QA</div>
                    <span className="text-[10px] font-mono text-slate-400 block">Footer, DesignSystemPage</span>
                  </div>
                </div>
              </div>
            )}

            {/* CATÁLOGO COMPLETO DE ICONOS (81 LUCIDE + 17 ILUSTRACIONES 3D) */}
            {showAtomsIcons && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Catálogo Completo de Iconografía (81 Lucide + 17 Ilustraciones 3D)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Todos los iconos oficiales importados desde <code className="font-mono text-slate-700">lucide-react</code> e ilustraciones 3D en <code className="font-mono text-slate-700">public/images/</code>, nombrados y listos para copiar.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-center shrink-0">
                    {DOCUMENTED_LUCIDE_ICONS.length + DOCUMENTED_3D_ICONS.length} iconos
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                  <strong className="font-heading text-slate-900">Regla de color en Menú Lateral (<code className="font-mono text-slate-700">AccountPage.tsx</code> — Configuración de la cuenta):</strong> Los iconos del menú lateral nunca cambian a azul (<code className="font-mono text-slate-700">text-cta</code>) en estado reposo, hover ni activo/presionado; mantienen escala neutral (<code className="font-mono text-slate-700">text-ink-600</code> en reposo, <code className="font-mono text-slate-700">text-ink-900</code> en hover y activo).
                </div>

                {/* Parte A: 81 Iconos Lucide nombrados */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-heading font-bold text-slate-800">
                      A. Iconos Lineales (<code className="font-mono text-slate-700">lucide-react</code> · {DOCUMENTED_LUCIDE_ICONS.length} iconos)
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Haz clic para copiar JSX</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                    {DOCUMENTED_LUCIDE_ICONS.map((item) => {
                      const Icon = item.icon;
                      const snippet = `<${item.name} className="w-4 h-4" />`;
                      const isCopied = copiedCode === `icon-${item.name}`;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => copySnippet(snippet, `icon-${item.name}`)}
                          title={`${item.name} (${item.category})`}
                          className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-100/80 hover:border-slate-300 flex items-center gap-2.5 text-left transition-colors cursor-pointer group min-w-0"
                        >
                          <span className="w-7 h-7 rounded-lg bg-white border border-slate-200/70 text-slate-700 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" strokeWidth={1.7} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-mono font-semibold text-slate-800 truncate">
                              {isCopied ? 'Copiado ✓' : item.name}
                            </div>
                            <div className="text-[9px] font-sans text-slate-400 truncate">
                              {item.category}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Parte B: 17 Iconos / Ilustraciones 3D nombrados */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-heading font-bold text-slate-800">
                      B. Iconos &amp; Ilustraciones 3D ({DOCUMENTED_3D_ICONS.length} assets)
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Sin borde · bg-slate-50 / bg-slate-100</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {DOCUMENTED_3D_ICONS.map((asset) => (
                      <div
                        key={asset.name}
                        className="p-3 rounded-xl border border-slate-200/80 bg-white flex items-center gap-3 min-w-0"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            src={asset.src}
                            alt={asset.name}
                            loading="lazy"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-mono font-semibold text-slate-800 truncate">
                            {asset.name}
                          </div>
                          <div className="text-[10px] font-sans text-slate-500 truncate mt-0.5">
                            {asset.usage}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ============================================================ */}
        {/* 3. MOLÉCULAS (MOLECULES) */}
        {/* ============================================================ */}
        {(showMolSearch ||
          showMolDropdowns ||
          showMolAccordionStep ||
          showMolLinearCards ||
          showMolUpload ||
          showMolStepCards ||
          showMolSpecsFaq) && (
          <section id="molecules" className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-indigo-600 font-mono text-xs font-bold uppercase tracking-wider">
                <Box className="w-4 h-4" /> Nivel 2 · Moléculas
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Componentes Moleculares Reales
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Componentes vivos importados directamente de <code className="font-mono text-slate-700">src/components/</code> — cero mockups estáticos duplicados.
              </p>
            </div>

            {/* 1. Barra de Búsqueda Rápida Hero REAL (<SearchContainer />) */}
            {showMolSearch && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 overflow-visible">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Barra de Búsqueda Principal (&lt;SearchContainer /&gt; Real)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Conectado a <code className="font-mono text-slate-700">SEARCH_LOCATION_OPTIONS</code> y <code className="font-mono text-slate-700">SEARCH_VEHICLE_TYPES</code>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copySnippet('<SearchContainer searchState={state} onSearchChange={setState} onExecuteSearch={fn} totalResultsCount={VEHICLES.length} />', 'mol-search')}
                    className="text-xs font-mono text-cta hover:text-cta-700 cursor-pointer"
                  >
                    {copiedCode === 'mol-search' ? 'Copiado ✓' : 'Copiar'}
                  </button>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 overflow-visible">
                  <SearchContainer
                    searchState={demoSearchState}
                    onSearchChange={setDemoSearchState}
                    onExecuteSearch={() => onNavigate && onNavigate('/catalogo')}
                    totalResultsCount={VEHICLES.length}
                    className="border border-slate-200/80 shadow-none"
                  />
                </div>
              </div>
            )}

            {/* 2. Catálogo Completo de Dropdowns & Selectores (6 controles) */}
            {showMolDropdowns && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 overflow-visible">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Catálogo Completo de Dropdowns &amp; Selectores (7 variantes unificadas)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Incluye ubicación, vehículo, horario, ordenamiento, ciudad de anfitrión (<code className="font-mono text-slate-700">HOST_CITY_OPTIONS</code>) y rango de fechas. Cero <code className="font-mono text-slate-700">&lt;select&gt;</code> nativos.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copySnippet(
                        'bg-white rounded-[20px] border border-slate-200/80 shadow-2xl p-2 | Contenedor padre: overflow-visible',
                        'mol-dropdowns'
                      )
                    }
                    className="text-xs font-mono text-cta hover:text-cta-700 self-start sm:self-center shrink-0 cursor-pointer"
                  >
                    {copiedCode === 'mol-dropdowns' ? 'Copiado ✓' : 'Copiar tokens'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-visible">
                  {/* 1. Ubicación / Sucursal */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-heading font-bold text-slate-800">
                        1. Ubicación / Sucursal
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">Home · Catálogo</span>
                    </div>
                    <CustomDropdown
                      options={LOCATION_DROPDOWN_OPTIONS}
                      value={demoLocation}
                      onChange={setDemoLocation}
                      placeholder="Dirección, ciudad o aeropuerto"
                      triggerIcon={MapPin}
                      footer={<span>powered by <strong className="text-slate-600">Google</strong></span>}
                    />
                  </div>

                  {/* 2. Tipo de Vehículo */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-heading font-bold text-slate-800">
                        2. Tipo de Vehículo
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">Home · Catálogo</span>
                    </div>
                    <CustomDropdown
                      options={VEHICLE_TYPE_DROPDOWN_OPTIONS}
                      value={demoVehicleType}
                      onChange={setDemoVehicleType}
                      placeholder="Todos los vehículos"
                      triggerIcon={CarFront}
                    />
                  </div>

                  {/* 3. Horarios */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-heading font-bold text-slate-800">
                        3. Horarios
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">Producto · Checkout</span>
                    </div>
                    <CustomDropdown
                      options={TIME_DROPDOWN_OPTIONS}
                      value={demoTime}
                      onChange={setDemoTime}
                      triggerIcon={Clock}
                      footer="Horario de sucursal: 08:00 a 20:00 hrs"
                    />
                  </div>

                  {/* 4. Ordenamiento */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-heading font-bold text-slate-800">
                        4. Ordenamiento (Sort)
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">Catálogo</span>
                    </div>
                    <CustomDropdown
                      options={CATALOG_SORT_OPTIONS}
                      value={demoSort}
                      onChange={setDemoSort}
                      triggerIcon={ArrowUpDown}
                    />
                  </div>

                  {/* 5. Ciudad de Anfitrión */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-heading font-bold text-slate-800">
                        5. Ciudad de Anfitrión
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">/anfitriones/registro</span>
                    </div>
                    <CustomDropdown
                      options={HOST_CITY_OPTIONS}
                      value={demoHostCity}
                      onChange={setDemoHostCity}
                      placeholder="Selecciona tu ciudad"
                      triggerIcon={MapPin}
                    />
                  </div>

                  {/* 6. Rango de Fechas */}
                  <div ref={demoCalendarRef} className="relative space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-heading font-bold text-slate-800">
                        6. Rango de Fechas
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">Home · Producto · Checkout</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDemoCalendarOpen((prev) => !prev)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white flex items-center justify-between gap-2 text-sm font-sans text-left transition-colors cursor-pointer ${
                        demoCalendarOpen
                          ? 'border-cta ring-1 ring-cta text-slate-900'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-900'
                      }`}
                    >
                      <span className="truncate">
                        {formatDsDate(demoStartDate)} — {formatDsDate(demoEndDate)}
                      </span>
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.5} />
                    </button>

                    {demoCalendarOpen && (
                      <div className="absolute top-full right-0 mt-2 z-[70]">
                        <DateRangePicker
                          startDate={demoStartDate}
                          endDate={demoEndDate}
                          onChange={(s, e) => {
                            setDemoStartDate(s);
                            setDemoEndDate(e);
                          }}
                          onClose={() => setDemoCalendarOpen(false)}
                        />
                      </div>
                    )}
                  </div>

                  {/* 7. Fecha Individual (SingleDatePicker) */}
                  <div className="relative space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-heading font-bold text-slate-800">
                        7. Fecha Individual (SingleDatePicker)
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">Detalle Auto</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDemoSingleCalOpen((prev) => !prev)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white flex items-center justify-between gap-2 text-sm font-sans text-left transition-colors cursor-pointer ${
                        demoSingleCalOpen
                          ? 'border-cta ring-1 ring-cta text-slate-900'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-900'
                      }`}
                    >
                      <span className="truncate">{formatDsDate(demoSingleDate)}</span>
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.5} />
                    </button>

                    {demoSingleCalOpen && (
                      <div className="absolute top-full left-0 mt-2 z-[70]">
                        <SingleDatePicker
                          value={demoSingleDate}
                          onChange={setDemoSingleDate}
                          onClose={() => setDemoSingleCalOpen(false)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Contenedor Lineal de Acordeón con Chevron Circular */}
            {showMolAccordionStep && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Contenedor Lineal de Acordeón con Chevron Circular (Checkout Step Card)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Estructura oficial de pasos en <code className="font-mono text-slate-700">ReservationCheckoutView</code> y <code className="font-mono text-slate-700">HostRegistrationPage</code>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copySnippet(
                        'rounded-2xl border border-slate-200 bg-white overflow-visible | Chevron: w-8 h-8 rounded-full bg-slate-100',
                        'mol-checkout-card'
                      )
                    }
                    className="text-xs font-mono text-cta hover:text-cta-700 shrink-0 cursor-pointer"
                  >
                    {copiedCode === 'mol-checkout-card' ? 'Copiado ✓' : 'Copiar'}
                  </button>
                </div>

                <div className="rounded-2xl border border-slate-200 hover:border-slate-300 bg-white overflow-visible transition-colors">
                  <button
                    type="button"
                    onClick={() => setDemoCheckoutStepOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 text-left group cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-cta-50 text-cta font-heading font-bold text-xs flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-heading font-bold text-slate-900 group-hover:text-cta transition-colors">
                            Fechas y sucursal
                          </h4>
                          <span className="text-xs font-heading font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                            4 nov — 7 nov (3 días)
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                          Durango · Sucursal Plaza 450
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
                      <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform duration-300 ${demoCheckoutStepOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {demoCheckoutStepOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-4 border-t border-slate-100 text-xs sm:text-sm font-sans text-slate-600">
                      Contenido desplegable del paso con botón primario izquierdo y separación superior <code className="font-mono text-slate-700">border-t border-slate-100</code>.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. Contenedores de Precio sin Fondo + Bloque Informativo Lineal */}
            {showMolLinearCards && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
                <div>
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    Contenedores de Desglose sin Fondo &amp; Bloque Informativo Dividido
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Patrones lineales puros sin fondo gris en Producto (<code className="font-mono text-slate-700">VehicleDetailView</code>) y Registro de Anfitriones (<code className="font-mono text-slate-700">HostRegistrationPage</code>).
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  {/* Izquierda: Desglose de Precio Transparente (Producto) */}
                  <div className="space-y-3 text-left">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      VehicleDetailView · Desglose + Depósito (bg-transparent)
                    </span>
                    <div className="p-4 sm:p-5 rounded-2xl bg-transparent border border-slate-200 space-y-2.5 text-sm">
                      <div className="flex justify-between items-center text-slate-600">
                        <span>$1,400 × 3 días</span>
                        <span className="font-heading font-semibold text-slate-900 tabular-nums">$4,200</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-600">
                        <span>Tarifa de servicio GALSA</span>
                        <span className="font-heading font-semibold text-slate-900 tabular-nums">$1,386</span>
                      </div>
                      <div className="pt-2.5 border-t border-slate-200 flex justify-between items-center">
                        <span className="font-heading font-bold text-slate-900">Total de la renta</span>
                        <span className="font-heading font-bold text-slate-900 text-base tabular-nums">$5,586</span>
                      </div>
                    </div>

                    <div className="px-4 py-3 sm:px-5 rounded-2xl bg-transparent border border-slate-200 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-600">Depósito en garantía (reembolsable)</span>
                      <span className="font-heading font-semibold text-slate-900 tabular-nums">$15,000</span>
                    </div>
                  </div>

                  {/* Derecha: Bloque Informativo Lineal Dividido (HostRegistrationPage) */}
                  <div className="space-y-3 text-left">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      HostRegistrationPage · Callout Lineal (divide-y divide-slate-100)
                    </span>
                    <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100">
                      <div className="p-4 flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4" strokeWidth={1.8} />
                        </div>
                        <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                          GALSA verifica la identidad y propiedad de cada vehículo antes de publicarlo. La carga de documentos se realiza desde la app.
                        </p>
                      </div>
                      <div className="p-4 flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                          <Landmark className="w-4 h-4" strokeWidth={1.8} />
                        </div>
                        <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                          Tu parte de cada renta se deposita en la cuenta bancaria que registres desde la app cuando aprobemos tu registro.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Carga y Subida de Archivos (<DocumentUploadCard />) */}
            {showMolUpload && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Subida de Archivos &amp; Progreso (&lt;DocumentUploadCard /&gt; Real)
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      Estilo gris neutral oscuro (<code className="font-mono text-slate-700">bg-slate-600</code> / <code className="font-mono text-slate-700">text-slate-700</code>) sin azul ni sombras; al llegar al 100% oculta la barra de progreso.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                    Molecule
                  </span>
                </div>

                <div className="space-y-2">
                  <DocumentUploadCard
                    title="Licencia de conducir"
                    badge="Vigente, ambos lados"
                    fileState={{
                      name: 'Scann_158.pdf',
                      sizeStr: '30 MB / 74 MB',
                      progress: 79,
                      status: 'uploading',
                    }}
                    onRemove={() => {}}
                  />
                  <DocumentUploadCard
                    title="Identificación oficial"
                    badge="INE, frente y reverso"
                    fileState={{
                      name: 'INE_frente_y_reverso.pdf',
                      sizeStr: '2.4 MB / 2.4 MB',
                      progress: 100,
                      status: 'completed',
                    }}
                    onRemove={() => {}}
                  />
                  <DocumentUploadCard
                    title="Comprobante de domicilio"
                    badge="No mayor a 3 meses"
                    fileState={{
                      name: '',
                      sizeStr: '',
                      progress: 0,
                      status: 'idle',
                    }}
                    onRemove={() => {}}
                  />
                </div>
              </div>
            )}

            {/* 6. Tarjetas de Paso con Badge Flotante (<StepFeatureCard />) */}
            {showMolStepCards && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Tarjetas de Paso con Badge Flotante (&lt;StepFeatureCard /&gt; Real)
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      Componente consolidado de <code className="font-mono text-slate-700">FourStepProcess</code> (4 pasos) y <code className="font-mono text-slate-700">HostSection</code> (6 pasos)
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md">
                    Consolidado
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
                  <StepFeatureCard
                    title="Regístrate"
                    description="Crea tu cuenta de anfitrión con tus datos en menos de 2 minutos."
                    image="/images/step-img-1.webp"
                    icon={UserPlus}
                  />
                  <StepFeatureCard
                    title="Carga tu vehículo"
                    description="Sube fotos, documentos oficiales y define tu tarifa diaria."
                    image="/images/step-img-3.webp"
                    icon={Car}
                  />
                </div>
              </div>
            )}

            {/* 7. Specs Grid Real (VehicleDetailView) + Acordeón FAQ Real (FaqSection con Plus/Minus) + Tarjeta Confirma tu correo */}
            {showMolSpecsFaq && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 7A. Parrilla Real de Especificaciones de VehicleDetailView.tsx */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-left">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Especificaciones Reales (<code className="font-mono text-xs">VehicleDetailView</code>)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Bloque «Lo que ofrece este vehículo» en la ficha de producto.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <Users className="w-4 h-4 text-slate-700 shrink-0" />
                      <span className="text-xs font-heading font-medium text-slate-800">5 asientos</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <Fuel className="w-4 h-4 text-slate-700 shrink-0" />
                      <span className="text-xs font-heading font-medium text-slate-800">Gasolina</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <Gauge className="w-4 h-4 text-slate-700 shrink-0" />
                      <span className="text-xs font-heading font-medium text-slate-800">Automática</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <Calendar className="w-4 h-4 text-slate-700 shrink-0" />
                      <span className="text-xs font-heading font-medium text-slate-800">Modelo 2026</span>
                    </div>
                  </div>
                </div>

                {/* 7B. Item de Acordeón FAQ Real (FaqSection.tsx con botón circular Plus / Minus) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-left">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Acordeón FAQ Real (<code className="font-mono text-xs">FaqSection.tsx</code>)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Usa contenedor <code className="font-mono text-slate-700">border-edge</code> y botón circular <code className="font-mono text-slate-700">Plus / Minus</code>.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-edge bg-white overflow-hidden transition-all duration-200">
                    <button
                      type="button"
                      onClick={() => setIsFaqOpen(!isFaqOpen)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-subtle/50 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-heading font-semibold text-slate-900 tracking-tight leading-snug">
                        ¿Qué requisitos necesito para rentar un auto?
                      </span>
                      <div className="w-8 h-8 rounded-full border border-edge flex items-center justify-center shrink-0 text-ink-700">
                        {isFaqOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    {isFaqOpen && (
                      <div className="px-4 sm:px-5 pb-4 pt-2 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed border-t border-edge-light">
                        Identificación oficial vigente (INE o pasaporte), licencia de conducir vigente, comprobante de domicilio y método de pago.
                      </div>
                    )}
                  </div>
                </div>

                {/* 7C. Tarjeta Confirma tu correo electrónico (AccountPage.tsx) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-left">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Tarjeta «Confirma tu correo» (<code className="font-mono text-xs">AccountPage</code>)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Molécula lateral en Configuración de la cuenta.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-subtle border border-edge p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <Mail className="w-4 h-4 text-ink-900 shrink-0 mt-0.5" strokeWidth={1.8} />
                        <div>
                          <h4 className="text-xs sm:text-sm font-heading font-bold text-ink-900 leading-snug">
                            Confirma tu correo electrónico
                          </h4>
                          <p className="text-xs font-sans text-ink-600 mt-0.5 leading-relaxed">
                            {demoEmailConfirmed
                              ? 'Código verificado para contact@carlosdamian.com.'
                              : 'Te enviaremos un código a tu bandeja de mensajes.'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDemoEmailConfirmed((prev) => !prev)}
                      className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-heading font-semibold transition-colors cursor-pointer ${
                        demoEmailConfirmed
                          ? 'bg-cta-50 text-cta border border-cta-200'
                          : 'bg-surface hover:bg-cta-50 text-ink-900 border border-edge'
                      }`}
                    >
                      {demoEmailConfirmed ? 'Correo electrónico confirmado ✓' : 'Confirma tu correo electrónico'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ============================================================ */}
        {/* 4. ORGANISMOS (ORGANISMS) */}
        {/* ============================================================ */}
        {(showOrgVehicleCard || showOrgGallery || showOrgConfirmation || showOrgBanner || showOrgQaRibbon) && (
          <section id="organisms" className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" /> Nivel 3 · Organismos
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Estructuras UI Completas en Producción
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Organismos reales de catálogo, galería de producto, confirmación de 1 columna y listón QA.
              </p>
            </div>

            {/* Organismo 1: <VehicleCard /> Oficial REAL (3 modos) */}
            {showOrgVehicleCard && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      &lt;VehicleCard /&gt; Oficial Real (3 modos: Grid, Horizontal Mapa y Skeleton)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Importado directamente de <code className="font-mono text-slate-700">src/components/VehicleCard.tsx</code> con datos reales de <code className="font-mono text-slate-700">VEHICLES[0]</code>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-4 space-y-2 text-left">
                    <span className="text-[11px] font-mono text-slate-400 block">layout=&quot;grid&quot;</span>
                    <VehicleCard
                      vehicle={demoVehicle}
                      onSelect={(v) => onNavigate && onNavigate(`/vehiculos/${v.slug}`)}
                    />
                  </div>
                  <div className="lg:col-span-4 space-y-2 text-left">
                    <span className="text-[11px] font-mono text-slate-400 block">isLoading=&#123;true&#125; (Skeleton)</span>
                    <VehicleCard isLoading={true} />
                  </div>
                  <div className="lg:col-span-12 space-y-2 text-left">
                    <span className="text-[11px] font-mono text-slate-400 block">layout=&quot;horizontal&quot; (Vista Mapa)</span>
                    <div className="max-w-2xl">
                      <VehicleCard
                        vehicle={demoVehicle}
                        layout="horizontal"
                        onSelect={(v) => onNavigate && onNavigate(`/vehiculos/${v.slug}`)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Organismo 2: Galería de Producto (3 fotos + Modal blanco 1+2) */}
            {showOrgGallery && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-left">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Galería de Producto (3 Tarjetas Redondeadas + Modal Blanco 1+2)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Haz clic en cualquier imagen o en el pill <strong className="text-slate-700">Ver 3 fotos</strong> para abrir el modal blanco interactivo.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div
                    onClick={() => setDemoGalleryOpen(true)}
                    className="md:col-span-8 relative rounded-[20px] overflow-hidden bg-slate-100 h-[240px] sm:h-[320px] cursor-pointer group"
                  >
                    <img
                      src={demoGalleryImages[0].url}
                      alt={demoGalleryImages[0].alt}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDemoGalleryFav((prev) => !prev);
                      }}
                      aria-label="Favorito galería"
                      className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        demoGalleryFav ? 'bg-white text-rose-500' : 'bg-white/90 hover:bg-white text-slate-700'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${demoGalleryFav ? 'fill-rose-500 text-rose-500' : ''}`} strokeWidth={1.8} />
                    </button>
                  </div>

                  <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-3 h-[320px]">
                    <div
                      onClick={() => setDemoGalleryOpen(true)}
                      className="relative rounded-[20px] overflow-hidden bg-slate-100 cursor-pointer group"
                    >
                      <img
                        src={demoGalleryImages[1].url}
                        alt={demoGalleryImages[1].alt}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                    <div
                      onClick={() => setDemoGalleryOpen(true)}
                      className="relative rounded-[20px] overflow-hidden bg-slate-100 cursor-pointer group"
                    >
                      <img
                        src={demoGalleryImages[2].url}
                        alt={demoGalleryImages[2].alt}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDemoGalleryOpen(true);
                        }}
                        className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-slate-900 rounded-full px-3.5 py-1.5 text-xs font-heading font-semibold transition-colors cursor-pointer"
                      >
                        Ver {demoGalleryImages.length} fotos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Organismo 3: Confirmación Minimalista de 1 Columna */}
            {showOrgConfirmation && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-left">
                <div>
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    Patrón de Confirmación Minimalista de 1 Columna
                  </h3>
                  <p className="text-xs text-slate-500">
                    Utilizado tras finalizar en <code className="font-mono text-slate-700">¡Reserva creada!</code> y <code className="font-mono text-slate-700">¡Solicitud enviada!</code>
                  </p>
                </div>

                <div className="max-w-xl space-y-4 pt-1">
                  <div className="space-y-2">
                    <div className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
                      ¡Solicitud / Reserva registrada!
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cta-50 text-cta text-xs font-heading font-semibold">
                        Folio: ANF-842910
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-heading font-semibold">
                        En revisión · 24-48 hrs
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100">
                    <div className="p-4 space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Titular</span>
                        <span className="font-heading font-semibold text-slate-900">Carlos Medina Robles</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Ciudad / Sucursal</span>
                        <span className="font-heading font-semibold text-slate-900">Durango · Plaza 450</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-slate-50/60 rounded-b-2xl flex items-center gap-2 text-xs text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Un solo contenedor lineal con siguientes pasos y acciones planas al pie.</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-xl bg-cta hover:bg-cta-600 text-white font-heading font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      Acción principal
                    </button>
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 font-heading font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      Volver al inicio
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Organismo 4: Banner CTA Oficial (Variables cta-50 + ink-900 + cta) */}
            {showOrgBanner && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-left">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Banner CTA Final con Variables Oficiales (<code className="font-mono">bg-cta-50</code> + <code className="font-mono">text-ink-900</code>)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Implementado en <code className="font-mono text-slate-700">HostSection.tsx</code> y <code className="font-mono text-slate-700">VehicleDetailView.tsx</code> usando card <code className="font-mono text-slate-700">bg-gray-50</code> en 2 columnas sin borde
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copySnippet(
                        'w-full bg-gray-50 rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 lg:p-14 border-0 shadow-none',
                        'org-banner'
                      )
                    }
                    className="text-xs font-mono text-cta hover:text-cta-700 cursor-pointer"
                  >
                    {copiedCode === 'org-banner' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                <div className="w-full bg-gray-50 rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 border-0 shadow-none">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-3 sm:space-y-4">
                      <h4 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                        Empieza a ganar con tu auto hoy
                      </h4>
                      <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed max-w-lg">
                        Registrarte toma menos de 10 minutos y revisamos tu solicitud en 24-48 horas.
                      </p>
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => onNavigate && onNavigate('/anfitriones/registro')}
                          className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-cta hover:bg-cta-600 text-white font-heading font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                        >
                          Quiero publicar mi auto
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                      <div className="w-full max-w-[360px] aspect-[16/10] rounded-[20px] overflow-hidden flex items-center justify-center">
                        <img
                          src="/galsa-rent/images/anfitriones/cta-familia-anfitrion.png"
                          alt="Empieza a ganar con tu auto hoy"
                          className="w-full h-full object-contain object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Organismo: Bloques de Beneficio con Ilustración 3D Sin Borde */}
            {showOrgBanner && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Bloque de Beneficio / Ilustración 3D Sin Borde
                    </h3>
                    <p className="text-xs text-slate-500">
                      Usado en <code className="font-mono text-slate-700">HostSection.tsx</code> («Beneficios de ser anfitrión GALSA»): contenedor cuadrado <code className="font-mono text-slate-700">rounded-2xl bg-slate-100</code> sin línea de borde (<code className="font-mono text-slate-700">border-0</code>).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copySnippet(
                        'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 aspect-square rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-none',
                        'org-benefit-icon'
                      )
                    }
                    className="text-xs font-mono text-cta hover:text-cta-700 cursor-pointer shrink-0"
                  >
                    {copiedCode === 'org-benefit-icon' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-none">
                      <img
                        src="/galsa-rent/images/anfitriones/benefit-1-control-total.png"
                        alt="Control total"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-heading font-bold text-slate-900">Control total</h4>
                      <p className="text-xs sm:text-sm font-sans text-slate-500 leading-relaxed">
                        Tú defines precios, disponibilidad y qué reservas aceptas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-none">
                      <img
                        src="/galsa-rent/images/anfitriones/benefit-2-pagos.png"
                        alt="Pagos a tu cuenta"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-heading font-bold text-slate-900">Pagos a tu cuenta</h4>
                      <p className="text-xs sm:text-sm font-sans text-slate-500 leading-relaxed">
                        Cobramos al cliente y te depositamos tu parte en la cuenta que registres.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Organismo: Modales & Drawers del Sistema (6 Variantes) */}
            {showOrgBanner && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Modales, Drawers &amp; Sheets del Sistema (6 Variantes)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Contenedores flotantes estandarizados con backdrop <code className="font-mono text-slate-700">bg-black/50 backdrop-blur-xs</code>, radios <code className="font-mono text-slate-700">rounded-[24px]</code> y botón circular de cierre <code className="font-mono text-slate-700">w-8 h-8 rounded-full bg-subtle</code>.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copySnippet(
                        'fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6',
                        'org-modals'
                      )
                    }
                    className="text-xs font-mono text-cta hover:text-cta-700 cursor-pointer shrink-0"
                  >
                    {copiedCode === 'org-modals' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* 1. Modal Confirmación (Cerrar sesión) */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-cta font-semibold">1. Confirmación · AccountPage.tsx</span>
                      <div className="rounded-2xl bg-white border border-edge p-4 space-y-3 mt-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-heading font-extrabold text-ink-900">¿Cerrar sesión?</h4>
                          <span className="w-6 h-6 rounded-full bg-subtle text-ink-600 flex items-center justify-center text-xs">×</span>
                        </div>
                        <p className="text-[11px] font-sans text-ink-600 leading-relaxed">
                          Tendrás que volver a iniciar sesión para ver tus reservaciones y contratos digitales.
                        </p>
                        <div className="flex justify-end gap-2 pt-1">
                          <span className="px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-heading font-semibold text-ink-900">Cancelar</span>
                          <span className="px-3 py-1.5 rounded-lg bg-cta text-white text-[11px] font-heading font-semibold">Cerrar sesión</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">max-w-[420px] · rounded-[24px]</span>
                  </div>

                  {/* 2. Modal Formulario (Completar perfil) */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-cta font-semibold">2. Formulario · AccountPage.tsx</span>
                      <div className="rounded-2xl bg-white border border-edge p-4 space-y-2.5 mt-1.5">
                        <h4 className="text-sm font-heading font-extrabold text-ink-900">Activa tu cuenta al 100%</h4>
                        <div className="h-7 rounded-lg border border-edge bg-white px-2.5 flex items-center text-[11px] text-slate-400">Nombre completo</div>
                        <div className="h-7 rounded-lg border border-edge bg-white px-2.5 flex items-center text-[11px] text-slate-400">Teléfono · Licencia</div>
                        <span className="inline-block w-full text-center py-1.5 rounded-lg bg-cta text-white text-[11px] font-heading font-semibold">Guardar información</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">max-w-[500px] · rounded-[24px]</span>
                  </div>

                  {/* 3. Modal Contrato Digital */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-cta font-semibold">3. Contrato · ReservationCheckoutView</span>
                      <div className="rounded-2xl bg-white border border-edge p-4 space-y-2.5 mt-1.5">
                        <h4 className="text-sm font-heading font-extrabold text-ink-900">Contrato Digital PROFECO</h4>
                        <div className="h-14 rounded-lg bg-slate-50 border border-slate-200 p-2 text-[10px] text-slate-500 overflow-hidden">
                          Cláusulas de arrendamiento, cobertura amplia y entrega en sucursal...
                        </div>
                        <span className="inline-block px-3 py-1.5 rounded-lg bg-cta text-white text-[11px] font-heading font-semibold">Firmar contrato</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">max-w-2xl · max-h-[90vh]</span>
                  </div>

                  {/* 4. Modal Galería & Compartir */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-cta font-semibold">4. Galería / Compartir · VehicleDetail</span>
                      <div className="rounded-2xl bg-white border border-edge p-4 space-y-2 mt-1.5">
                        <h4 className="text-sm font-heading font-extrabold text-ink-900">Compartir vehículo</h4>
                        <p className="text-[11px] font-sans text-ink-600">Enlace directo, WhatsApp y galería fotográfica en pantalla completa.</p>
                        <div className="h-7 rounded-lg bg-slate-100 px-2.5 flex items-center text-[10px] font-mono text-slate-500">galsarent.com.mx/vehiculos/...</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">max-w-md · max-w-5xl (Galería)</span>
                  </div>

                  {/* 5. Drawer Lateral (Centro de Ayuda) */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-cta font-semibold">5. Drawer Derecho · Header.tsx</span>
                      <div className="rounded-2xl bg-white border border-edge p-4 space-y-2 mt-1.5">
                        <h4 className="text-sm font-heading font-extrabold text-ink-900">Centro de Ayuda GALSA</h4>
                        <p className="text-[11px] font-sans text-ink-600">Llamada directa y correo en azul CTA, sucursal sin fondo y FAQs desplegables.</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">inset-y-0 right-0 max-w-md</span>
                  </div>

                  {/* 6. Bottom Sheet Filtros Mobile */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-cta font-semibold">6. Bottom Sheet · CatalogPage.tsx</span>
                      <div className="rounded-2xl bg-white border border-edge p-4 space-y-2 mt-1.5">
                        <h4 className="text-sm font-heading font-extrabold text-ink-900">Filtros de catálogo (Mobile)</h4>
                        <p className="text-[11px] font-sans text-ink-600">Anclado inferior en móvil (<code className="font-mono">justify-end md:hidden</code>) con footer fijo de acciones.</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">rounded-t-[24px] · justify-end</span>
                  </div>
                </div>
              </div>
            )}

            {/* Organismo: Catálogo Completo de FAQs & Acordeones (4 Variantes Reales) */}
            {showOrgBanner && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Catálogo Completo de FAQs &amp; Acordeones (4 Variantes Reales)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Todos los acordeones desplegables del sistema: FAQ principal (<code className="font-mono text-slate-700">Plus/Minus</code>), FAQ compacto de ayuda (<code className="font-mono text-slate-700">ChevronDown</code>), pasos de checkout (<code className="font-mono text-slate-700">ReservationCheckoutView</code>) y sheet móvil de resumen.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copySnippet(
                        'rounded-2xl border border-edge bg-white overflow-hidden transition-all duration-200',
                        'org-accordions'
                      )
                    }
                    className="text-xs font-mono text-cta hover:text-cta-700 cursor-pointer shrink-0"
                  >
                    {copiedCode === 'org-accordions' ? 'Copiado ✓' : 'Copiar clases'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 1. FAQ Principal (FaqSection.tsx) */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-cta font-semibold">1. FAQ Principal · FaqSection.tsx</span>
                      <span className="text-[10px] font-mono text-slate-400">Home · /faq</span>
                    </div>
                    <div className="rounded-2xl border border-edge bg-white overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setIsFaqOpen(!isFaqOpen)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-subtle/50 transition-colors cursor-pointer"
                      >
                        <span className="text-xs sm:text-sm font-heading font-semibold text-slate-900">
                          ¿Qué requisitos necesito para rentar un auto?
                        </span>
                        <span className="w-7 h-7 rounded-full border border-edge flex items-center justify-center shrink-0 text-ink-700">
                          {isFaqOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                      {isFaqOpen && (
                        <div className="px-4 pb-3.5 pt-2 text-xs font-sans text-slate-600 border-t border-edge-light">
                          INE o pasaporte, licencia vigente, comprobante de domicilio y método de pago.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. FAQ Compacto Centro de Ayuda (Header.tsx) */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-cta font-semibold">2. FAQ Compacto · Header.tsx (Ayuda)</span>
                      <span className="text-[10px] font-mono text-slate-400">Drawer Ayuda</span>
                    </div>
                    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                      <div className="p-3.5 flex items-center justify-between text-left">
                        <span className="text-xs font-heading font-bold text-slate-900">
                          ¿Cómo funciona el depósito en garantía?
                        </span>
                        <ChevronDown className="w-4 h-4 text-slate-400 rotate-180 shrink-0" />
                      </div>
                      <div className="px-3.5 pb-3 pt-2 text-xs font-sans text-slate-600 border-t border-slate-100">
                        Es 100% reembolsable al entregar el vehículo sin daños ni adeudos.
                      </div>
                    </div>
                  </div>

                  {/* 3. Acordeón de Pasos Checkout (ReservationCheckoutView.tsx) */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-cta font-semibold">3. Acordeón Paso · ReservationCheckoutView</span>
                      <span className="text-[10px] font-mono text-slate-400">Pasos 1–5</span>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-heading font-bold text-xs flex items-center justify-center shrink-0">
                          1
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-heading font-bold text-slate-900 truncate">
                            Fechas y sucursal de entrega
                          </div>
                          <div className="text-[11px] font-sans text-slate-500 truncate">
                            Plaza 450, Durango · 4 nov — 7 nov
                          </div>
                        </div>
                      </div>
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* 4. Acordeón Inferior Mobile Resumen (VehicleDetailView / Checkout) */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-cta font-semibold">4. Sheet Resumen Mobile · VehicleDetail / Checkout</span>
                      <span className="text-[10px] font-mono text-slate-400">lg:hidden</span>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-heading font-extrabold text-slate-900 tabular-nums">$5,786 MXN</div>
                        <div className="text-[11px] font-sans text-slate-500">3 días · Plaza 450</div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-heading font-semibold text-slate-800">
                        <ChevronUp className="w-3.5 h-3.5" />
                        <span>Ver resumen</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Organismo 5: Cinta QA & Footer */}
            {showOrgQaRibbon && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h3 className="text-base font-heading font-bold text-slate-900">
                  Listón de Control QA (Auditor SEO + Sistema de Diseño)
                </h3>
                <p className="text-xs text-slate-500">
                  Ubicado en la parte inferior del <code className="font-mono text-slate-700">Footer</code> con enlaces directos para auditoría interna
                </p>

                <div className="bg-black text-white text-[11px] font-mono py-2.5 px-4 rounded-xl border border-neutral-800">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-400">
                    <span className="text-amber-400 font-semibold">[ENTORNO DE PRUEBAS / QA]</span>
                    <div className="flex flex-wrap items-center gap-3 text-white">
                      <button
                        type="button"
                        onClick={() => onNavigate && onNavigate('/seo')}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-cta-300 text-[11px] font-medium border border-neutral-700/60 cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5 text-cta-400" />
                        <span>Auditor SEO</span>
                      </button>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 text-pink-300 text-[11px] font-medium border border-neutral-700/60">
                        <Palette className="w-3.5 h-3.5 text-pink-400" />
                        <span>Sistema de Diseño</span>
                      </span>
                      <span>Última actualización: <strong>18 Nov 2026</strong></span>
                      <span className="bg-neutral-800 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">v2.8.37</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Organismo 6: Calculadora de Ingresos Estimados Unificada (HostSection.tsx) */}
            {showOrgBanner && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-left">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900">
                      Calculadora de Ingresos Estimados en 2 Bloques (<code className="font-mono text-xs">HostSection.tsx</code>)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Contenedor gris claro unificado (<code className="font-mono text-slate-700">rounded-2xl bg-slate-50 divide-y divide-slate-200/80</code>) con sliders arriba e ingreso neto abajo.
                    </p>
                  </div>
                </div>

                <div className="max-w-xl rounded-2xl bg-slate-50 divide-y divide-slate-200/80">
                  <div className="p-5 sm:p-6 space-y-4">
                    <h4 className="text-base sm:text-lg font-heading font-bold text-slate-900">
                      Calcula tus ingresos estimados
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <span className="w-28 text-xs sm:text-sm font-semibold text-slate-800 shrink-0">Valor del auto</span>
                        <input
                          type="range"
                          min={150000}
                          max={1200000}
                          step={25000}
                          value={demoCarVal}
                          onChange={(e) => setDemoCarVal(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                        />
                        <span className="w-24 text-right text-xs sm:text-sm font-bold text-slate-900 shrink-0 tabular-nums">
                          ${demoCarVal.toLocaleString('es-MX')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="w-28 text-xs sm:text-sm font-semibold text-slate-800 shrink-0">Días rentados</span>
                        <input
                          type="range"
                          min={3}
                          max={30}
                          step={1}
                          value={demoDaysVal}
                          onChange={(e) => setDemoDaysVal(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                        />
                        <span className="w-24 text-right text-xs sm:text-sm font-bold text-slate-900 shrink-0 tabular-nums">
                          {demoDaysVal} d
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="w-28 text-xs sm:text-sm font-semibold text-slate-800 shrink-0">Precio/día</span>
                        <input
                          type="range"
                          min={600}
                          max={3000}
                          step={50}
                          value={demoPriceVal}
                          onChange={(e) => setDemoPriceVal(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                        />
                        <span className="w-24 text-right text-xs sm:text-sm font-bold text-slate-900 shrink-0 tabular-nums">
                          ${demoPriceVal.toLocaleString('es-MX')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <span className="text-[11px] font-heading font-bold tracking-wider text-slate-500 uppercase block">
                      TU INGRESO NETO MENSUAL ESTIMADO
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight tabular-nums">
                        ${(demoDaysVal * demoPriceVal).toLocaleString('es-MX')}
                      </span>
                      <span className="text-xs font-heading font-bold text-slate-500 uppercase">MXN</span>
                    </div>
                    <div className="border-t border-slate-200/80 pt-2.5 space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Tus rentas del mes</span>
                        <span className="font-heading font-bold text-slate-900 tabular-nums">
                          ${(demoDaysVal * demoPriceVal).toLocaleString('es-MX')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tarifa GALSA (33%)</span>
                        <span className="font-heading font-bold text-slate-900 tabular-nums">
                          ${Math.round(demoDaysVal * demoPriceVal * 0.33).toLocaleString('es-MX')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Organismo 7: Configuración de la Cuenta (2 Columnas + Filas Divididas de AccountPage.tsx) */}
            {showOrgBanner && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-left">
                <div>
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    Estructura de «Mi Cuenta» en 2 Columnas y Filas con Divisores (<code className="font-mono text-xs">AccountPage.tsx</code>)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Menú lateral con tarjeta de confirmación de correo + panel derecho con filas divididas (<code className="font-mono text-slate-700">divide-y divide-edge border-t border-b border-edge</code>).
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-1">
                  <div className="lg:col-span-4 space-y-3 lg:border-r lg:border-edge lg:pr-6">
                    <div className="text-base font-heading font-extrabold text-ink-900">Configuración de la cuenta</div>
                    <div className="space-y-1">
                      <div className="px-3 py-2.5 rounded-xl bg-subtle text-ink-900 font-heading font-bold text-xs flex items-center justify-between">
                        <span>Datos personales</span>
                        <span className="text-[10px] font-mono text-cta">Activo</span>
                      </div>
                      <div className="px-3 py-2.5 rounded-xl text-ink-600 font-heading font-medium text-xs flex items-center justify-between">
                        <span>Mis reservaciones</span>
                        <span className="px-2 py-0.5 rounded-full bg-subtle text-ink-600 text-[10px] font-bold">2</span>
                      </div>
                      <div className="px-3 py-2.5 rounded-xl text-ink-600 font-heading font-medium text-xs">
                        Documentos &amp; Licencia
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 divide-y divide-edge border-t border-b border-edge">
                    <div className="py-3.5 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs sm:text-sm font-heading font-bold text-ink-900">Nombre completo</div>
                        <div className="text-xs text-ink-600 mt-0.5">Carlos Damián</div>
                      </div>
                      <span className="text-xs font-heading font-semibold text-ink-900 underline underline-offset-4">Editar</span>
                    </div>
                    <div className="py-3.5 flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs sm:text-sm font-heading font-bold text-ink-900">Correo electrónico</div>
                          <div className="text-xs text-ink-600 mt-0.5">contact@carlosdamian.com</div>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-lg border border-edge bg-surface text-xs font-heading font-semibold text-ink-900">
                          Confirmar
                        </span>
                      </div>
                      <span className="text-xs font-heading font-semibold text-ink-900 underline underline-offset-4">Editar</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Organismo 8: Cascarón Dividido de Autenticación (<AuthCardLayout />) & Header Mínimo */}
            {showOrgBanner && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 text-left">
                <div>
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    Header Mínimo de Checkout / Registro &amp; Cascarón de Autenticación (<code className="font-mono text-xs">&lt;AuthCardLayout /&gt;</code>)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Variante limpia de <code className="font-mono text-slate-700">Header.tsx</code> para flujos de 2 pasos y componente <code className="font-mono text-slate-700">AuthCardLayout.tsx</code> usado en Login, Registro y Recuperar contraseña.
                  </p>
                </div>

                {/* Preview de Header Mínimo */}
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GalsaLogo className="h-5 w-auto text-cta" />
                    <div className="h-4 w-px bg-slate-200" />
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-heading font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                      <span>Reserva protegida / Registro de anfitriones</span>
                    </div>
                  </div>
                  <span className="text-xs font-heading font-semibold text-slate-600">¿Necesitas ayuda?</span>
                </div>

                {/* Preview compacta del AuthCardLayout */}
                <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4">
                  <AuthCardLayout imageAlt="Vista previa AuthCardLayout" imageMinHeightClass="min-h-[220px]">
                    <div className="space-y-2 text-left">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full bg-cta-50 text-cta text-[11px] font-heading font-bold">
                        &lt;AuthCardLayout /&gt; Real
                      </span>
                      <h4 className="text-lg font-heading font-bold text-slate-900">
                        Cascarón compartido de Autenticación
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Renderiza la columna de ilustración 3D a la izquierda y el formulario a la derecha en LoginPage, RegisterPage y ForgotPasswordPage.
                      </p>
                    </div>
                  </AuthCardLayout>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ============================================================ */}
        {/* 5. AUDITORÍA DE COMPONENTES & DUPLICADOS */}
        {/* ============================================================ */}
        {(showAuditKpis || showAuditDedupe || showAuditIntentional || showAuditInventory) && (
          <section id="audit" className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider">
                <ClipboardCheck className="w-4 h-4 text-cta" /> Nivel 4 · Auditoría de Código &amp; UI
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                Auditoría de Componentes Repetidos e Inventario
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Resultado de la revisión de <code className="font-mono text-slate-700">src/components/</code> y <code className="font-mono text-slate-700">src/pages/</code>: duplicados consolidados, código muerto eliminado y separación intencional.
              </p>
            </div>

            {/* KPI Summary Cards */}
            {showAuditKpis && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 text-left">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Componentes UI
                  </span>
                  <p className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-1">
                    {COMPONENT_INVENTORY.length}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Archivos en src/components/</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 text-left">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Duplicados consolidados
                  </span>
                  <p className="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-700 mt-1">
                    5
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Opciones, tarjetas, auth y DS</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 text-left">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    Código muerto depurado
                  </span>
                  <p className="text-2xl sm:text-3xl font-heading font-extrabold text-cta mt-1">
                    3 bloques
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">showForgot, TIME_OPTIONS, heroCarImg</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 text-left">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block">
                    &lt;select&gt; / Sombras CTA
                  </span>
                  <p className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-1">
                    0
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">100% CustomDropdown + botones planos</p>
                </div>
              </div>
            )}

            {/* Duplicados detectados y consolidados */}
            {showAuditDedupe && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-left">
                <div>
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    Duplicados Detectados y Consolidados en esta Revisión
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Bloques repetidos entre archivos que fueron unificados en una sola fuente de verdad.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100">
                  {[
                    {
                      title: '1. Catálogos de opciones de ubicación, vehículos y ciudades',
                      status: 'Consolidado',
                      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
                      detail: 'LOCATION_OPTIONS, VEHICLE_TYPES y HOST_CITY_OPTIONS repetidos en SearchContainer, CatalogPage, HostRegistrationPage y DesignSystemPage → centralizados en src/data/dropdownOptions.ts.',
                    },
                    {
                      title: '2. Tarjetas de paso con imagen 16:10/4:3 y badge flotante azul',
                      status: 'Consolidado',
                      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
                      detail: 'Markup duplicado 3 veces entre FourStepProcess (móvil + desktop) y HostSection (6 pasos) → extraído a src/components/StepFeatureCard.tsx.',
                    },
                    {
                      title: '3. Cascarón dividido de autenticación (imagen 3D + formulario)',
                      status: 'Consolidado',
                      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
                      detail: 'Layout repetido en LoginPage, RegisterPage y ForgotPasswordPage → unificado en src/components/AuthCardLayout.tsx.',
                    },
                    {
                      title: '4. Mockups duplicados y botón #9 repetido en DesignSystemPage',
                      status: 'Consolidado',
                      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
                      detail: 'Tarjetas estáticas falsas de buscador y vehículo reemplazadas por <SearchContainer /> y <VehicleCard /> reales + numeración limpia btn-1..btn-12.',
                    },
                    {
                      title: '5. Código muerto y constantes sin uso',
                      status: 'Depurado',
                      statusClass: 'bg-cta-50 text-cta border-cta-200',
                      detail: 'Eliminado flujo inline inalcanzable showForgot en LoginPage (duplicaba ForgotPasswordPage), TIME_OPTIONS en CatalogPage y baseUrl/heroCarImg en FourStepProcess.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-sm font-heading font-bold text-slate-900">{item.title}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-heading font-semibold shrink-0 self-start ${item.statusClass}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Variantes intencionales */}
            {showAuditIntentional && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 text-left">
                <h3 className="text-base font-heading font-bold text-slate-900">
                  Variantes Intencionales (No Duplicadas por Diseño)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                    <div className="font-heading font-bold text-slate-900">
                      CustomDropdown vs. Popovers con Geolocalización
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      <code className="font-mono text-slate-700">CustomDropdown</code> cubre selectores estándar, mientras los popovers de ubicación en <code className="font-mono text-slate-700">SearchContainer</code> y <code className="font-mono text-slate-700">CatalogPage</code> conservan detección GPS en vivo e estado &quot;Detectando...&quot;, compartiendo datos desde <code className="font-mono text-slate-700">dropdownOptions.ts</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                    <div className="font-heading font-bold text-slate-900">
                      ReservationCheckoutView vs. HostRegistrationPage
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Comparten el patrón de 12 columnas (<code className="font-mono text-slate-700">lg:col-span-7</code> + <code className="font-mono text-slate-700">lg:col-span-5</code> sticky), botones izquierdos planos y confirmación de 1 columna, pero se mantienen desacopladas para evolucionar renta vs. onboarding de anfitriones sin riesgo de regresión.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Inventario completo de src/components/ */}
            {showAuditInventory && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-left">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-base font-heading font-bold text-slate-900">
                    Inventario Completo de Componentes (<code className="font-mono text-sm">src/components/</code>)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{COMPONENT_INVENTORY.length} módulos activos</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {COMPONENT_INVENTORY.map((comp) => (
                    <div
                      key={comp.file}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900 truncate">
                          {comp.file}
                        </span>
                        <span className="text-[10px] font-heading font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                          {comp.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{comp.purpose}</p>
                      <p className="text-[11px] font-mono text-slate-400 truncate">Uso: {comp.consumers}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* MODAL BLANCO INTERACTIVO DE GALERÍA DE PRODUCTO */}
      {demoGalleryOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setDemoGalleryOpen(false)}
        >
          <div
            className="bg-white rounded-[24px] sm:rounded-[28px] max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-center shrink-0">
              <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg text-center">
                {demoVehicle.make} {demoVehicle.model} {demoVehicle.year}
              </h3>
              <button
                type="button"
                onClick={() => setDemoGalleryOpen(false)}
                aria-label="Cerrar galería"
                className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 sm:px-6 pb-6 pt-1 overflow-y-auto space-y-3.5">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={demoGalleryImages[0].url}
                  alt={demoGalleryImages[0].alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {demoGalleryImages.slice(1).map((img, i) => (
                  <div key={i} className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
