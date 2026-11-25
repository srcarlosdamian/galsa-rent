import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Star,
  Car,
  Calendar,
  Store,
  QrCode,
  ArrowLeftRight,
  Wrench,
  Sparkles,
  AlertTriangle,
  Users,
  UserCheck,
  IdCard,
  ShieldCheck,
  Gauge,
  FileCheck,
  DollarSign,
  Percent,
  MapPin,
  Building2,
  ClipboardList,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
} from 'lucide-react';
import { GalsaLogo } from '../components/GalsaLogo';
import { CustomDropdown, DropdownOption } from '../components/CustomDropdown';
import { AdminReportsView } from '../components/AdminReportsView';
import { AdminReviewsView } from '../components/AdminReviewsView';

interface AdminPageProps {
  onNavigate?: (path: string) => void;
}

const ADMIN_CITY_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todas las ciudades', subtitle: 'Cobertura nacional (5 ciudades)', icon: MapPin },
  { value: 'Ciudad de México', label: 'Ciudad de México', subtitle: 'CDMX · Zona Metropolitana', icon: MapPin },
  { value: 'Durango', label: 'Durango', subtitle: 'Durango · Sucursal Plaza 450', icon: MapPin },
  { value: 'Guadalajara', label: 'Guadalajara', subtitle: 'Jalisco · Área Metropolitana', icon: MapPin },
  { value: 'Monterrey', label: 'Monterrey', subtitle: 'Nuevo León · Área Metropolitana', icon: MapPin },
  { value: 'Querétaro', label: 'Querétaro', subtitle: 'Querétaro · Centro', icon: MapPin },
];

// Secciones ya diseñadas; el resto permanece en SIDEBAR_GROUPS oculto hasta diseñarse
const DESIGNED_ADMIN_SECTIONS = new Set(['dashboard', 'reportes', 'resenas']);

const SIDEBAR_GROUPS = [
  {
    title: 'General',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'mensajes', label: 'Mensajes', icon: MessageSquare },
      { id: 'reportes', label: 'Reportes', icon: BarChart3 },
      { id: 'resenas', label: 'Reseñas', icon: Star },
    ],
  },
  {
    title: 'Operación',
    items: [
      { id: 'vehiculos', label: 'Vehículos', icon: Car },
      { id: 'reservas', label: 'Reservas', icon: Calendar },
      { id: 'renta-presencial', label: 'Renta presencial', icon: Store },
      { id: 'qr', label: 'QR de autoservicio', icon: QrCode },
      { id: 'entregas', label: 'Entregas / devoluciones', icon: ArrowLeftRight },
      { id: 'mantenimientos', label: 'Mantenimientos', icon: Wrench },
      { id: 'acondicionamiento', label: 'Acondicionamiento', icon: Sparkles },
      { id: 'incidencias', label: 'Incidencias', icon: AlertTriangle },
    ],
  },
  {
    title: 'Personas',
    items: [
      { id: 'clientes', label: 'Clientes', icon: Users },
      { id: 'anfitriones', label: 'Anfitriones', icon: UserCheck },
      { id: 'choferes', label: 'Choferes', icon: IdCard },
      { id: 'verificaciones', label: 'Verificaciones', icon: ShieldCheck },
    ],
  },
  {
    title: 'GALSA Plataforma',
    items: [
      { id: 'panel-plataforma', label: 'Panel plataforma', icon: Gauge },
      { id: 'plat-vehiculos', label: 'Vehículos', icon: Car },
      { id: 'rentas-choferes', label: 'Rentas a choferes', icon: Calendar },
      { id: 'plat-entregas', label: 'Entregas / devoluciones', icon: ArrowLeftRight },
      { id: 'inspeccion', label: 'Inspección semanal', icon: FileCheck },
      { id: 'ingresos-renta', label: 'Ingresos por renta', icon: DollarSign },
    ],
  },
];

const FLEET_STATUS = [
  { name: 'Audi Q5 2019', km: '0 km · sin plan de servicio', city: 'Durango', interval: 'Sin datos de servicio', hasPlan: false },
  { name: 'BYD Dolphin Mini Plus 2026', km: '2,000 km / 12,000 km', city: 'Ciudad de México', interval: '0% del intervalo', hasPlan: true },
  { name: 'BYD Dolphin Mini Plus 2026', km: '0 km · sin plan de servicio', city: 'Durango', interval: 'Sin datos de servicio', hasPlan: false },
  { name: 'Chevrolet Spark 2026', km: '0 km · sin plan de servicio', city: 'Durango', interval: 'Sin datos de servicio', hasPlan: false },
  { name: 'Geely EX2 2026', km: '80 km / 12,000 km', city: 'Ciudad de México', interval: '0% del intervalo', hasPlan: true },
  { name: 'Honda Civic Coupé 2019', km: '0 km · sin plan de servicio', city: 'Durango', interval: 'Sin datos de servicio', hasPlan: false },
  { name: 'Jeep Wrangler 2011', km: '0 km · sin plan de servicio', city: 'Durango', interval: 'Sin datos de servicio', hasPlan: false },
  { name: 'Jeep Wrangler Rubicon 2018', km: '4,200 km / 10,000 km', city: 'Durango', interval: '42% del intervalo', hasPlan: true },
  { name: 'Nissan March Active 2022', km: '0 km · sin plan de servicio', city: 'Durango', interval: 'Sin datos de servicio', hasPlan: false },
  { name: 'Nissan Sentra Sense 2026', km: '1,100 km / 10,000 km', city: 'Durango', interval: '11% del intervalo', hasPlan: true },
  { name: 'Toyota RAV4 XLE 2024', km: '0 km · sin plan de servicio', city: 'Durango', interval: 'Sin datos de servicio', hasPlan: false },
  { name: 'Volkswagen Virtus Trendline 2026', km: '0 km · sin plan de servicio', city: 'Durango', interval: 'Sin datos de servicio', hasPlan: false },
];

const RESERVAS_POR_MES = [
  { month: 'Jun 2026', value: 4 },
  { month: 'Jul 2026', value: 33 },
  { month: 'Ago 2026', value: 22 },
  { month: 'Sep 2026', value: 71 },
  { month: 'Oct 2026', value: 4 },
  { month: 'Nov 2026', value: 2 },
];

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const filteredFleet = useMemo(() => {
    return FLEET_STATUS.filter((unit) => {
      const matchesCity = cityFilter === 'all' || unit.city === cityFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCity && matchesSearch;
    });
  }, [cityFilter, searchQuery]);

  const cityText = cityFilter === 'all' ? 'todas las ciudades' : cityFilter;

  const primaryKpis = [
    {
      label: 'Ingresos del mes',
      value: '$0.0',
      sub: `Cobrado en Nov 2026 · ${cityText}`,
      icon: DollarSign,
      iconClass: 'bg-cta-50 text-cta',
    },
    {
      label: 'Reservas activas',
      value: '13',
      sub: 'En curso hoy (renta a chofer: la semana en curso)',
      icon: Calendar,
      iconClass: 'bg-cta-50 text-cta',
    },
    {
      label: 'Ocupación de flota',
      value: '17%',
      sub: '1 vehículos en operación',
      icon: Gauge,
      iconClass: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Utilidad del mes',
      value: '$0.0',
      sub: 'Ingresos netos, igual que en Finanzas',
      icon: TrendingUp,
      iconClass: 'bg-emerald-50 text-emerald-700',
    },
  ];

  const secondaryCompactKpis = [
    { label: 'Vehículos disponibles', value: '5', sub: 'Listos para rentar', icon: Car, tone: 'text-cta bg-cta-50' },
    { label: 'Comisión de GALSA', value: '$0.0', sub: 'Rentas de anfitrión · Nov 2026', icon: Percent, tone: 'text-cta bg-cta-50' },
    { label: 'Incidentes abiertos', value: '17', sub: 'Todas las no resueltas', icon: AlertTriangle, tone: 'text-red-700 bg-red-50' },
    { label: 'Unidades por validar', value: '6', sub: 'Altas sin aprobar', icon: Car, tone: 'text-amber-800 bg-amber-50' },
    { label: 'Documentos por verificar', value: '10', sub: 'Clientes y anfitriones', icon: ClipboardList, tone: 'text-amber-800 bg-amber-50' },
    { label: 'En mantenimiento', value: '0', sub: 'Ver esas unidades', icon: Wrench, tone: 'text-amber-700 bg-amber-50' },
    { label: 'Reservas totales', value: '178', sub: 'Historial completo', icon: Calendar, tone: 'text-slate-700 bg-white' },
    { label: 'Sucursales activas', value: '10', sub: 'Puntos de entrega', icon: Building2, tone: 'text-cta bg-cta-50' },
    { label: 'Ciudades', value: '5', sub: 'Cobertura', icon: MapPin, tone: 'text-cta bg-cta-50' },
  ];

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between gap-3">
      {/* Brand fijo arriba */}
      <div className="px-3 pt-1 pb-2 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('/')}
          className="flex items-center cursor-pointer"
          title="Volver al sitio público"
        >
          <GalsaLogo className="h-5 w-auto text-cta" />
        </button>
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
          aria-label="Cerrar menú"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Groups (scroll interno solo si la pantalla es muy baja) */}
      <nav className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-0.5" aria-label="Menú administrativo">
        {SIDEBAR_GROUPS.map((group) => {
          const visibleItems = group.items.filter((item) => DESIGNED_ADMIN_SECTIONS.has(item.id));
          if (visibleItems.length === 0) return null;
          return (
            <div key={group.title} className="space-y-0.5">
              <p className="px-3 pb-1 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400">
                {group.title}
              </p>
              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveNav(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-cta-50 text-cta font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${isActive ? 'text-cta' : 'text-slate-400'}`}
                      strokeWidth={1.7}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Centro de ayuda fijo abajo en gris claro sin borde */}
      <div className="shrink-0 pt-2">
        <div className="rounded-2xl bg-slate-50 p-3.5 text-left space-y-1">
          <p className="text-xs font-heading font-semibold text-slate-900">Centro de ayuda</p>
          <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
            ¿Dudas con la operación? Escríbenos a{' '}
            <a href="mailto:soporte@galsarent.com.mx" className="text-cta font-medium hover:underline">
              soporte@galsarent.com.mx
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-start">
      {/* Sidebar Desktop fijo (sticky h-screen) */}
      <aside className="hidden lg:flex lg:flex-col w-60 shrink-0 border-r border-slate-100 bg-white sticky top-0 h-screen p-4">
        {renderSidebarContent()}
      </aside>

      {/* Sidebar Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative w-64 max-w-[80vw] bg-white h-full p-4 z-10">
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col bg-white">
        {/* Admin Top Header (no sticky): Búsqueda a la izquierda, Notificaciones + Super Admin a la derecha */}
        <header className="bg-white border-b border-slate-100 px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.6} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar vehículos, clientes, choferes..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-transparent border border-slate-200 hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta text-xs sm:text-sm font-sans text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              aria-label="Notificaciones"
              className="relative w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" strokeWidth={1.7} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
            </button>

            <div className="inline-flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-slate-50">
              <div className="w-7 h-7 rounded-full bg-cta text-white text-[11px] font-heading font-bold flex items-center justify-center">
                SA
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-xs font-heading font-semibold text-slate-900">Super Admin GALSA</p>
                <p className="text-[10px] text-slate-500">Super Admin</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Main Body: Dashboard, Reportes o Reseñas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1240px] w-full mx-auto space-y-6">
          {activeNav === 'reportes' ? (
            <AdminReportsView />
          ) : activeNav === 'resenas' ? (
            <AdminReviewsView />
          ) : (
            <>
              {/* Page Header + Controls usando CustomDropdown del Sistema de Diseño */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                Dashboard
              </h1>
              <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                Indicadores de flota, reservas, ingresos y ocupación
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="w-52">
                <CustomDropdown
                  options={ADMIN_CITY_OPTIONS}
                  value={cityFilter}
                  onChange={setCityFilter}
                  triggerIcon={MapPin}
                  align="right"
                  menuWidthClass="w-64"
                />
              </div>
              <button
                type="button"
                onClick={() => setActiveNav('reportes')}
                className="px-4 py-2.5 rounded-xl bg-cta-50 hover:bg-cta-100 text-cta text-xs sm:text-sm font-heading font-semibold transition-colors cursor-pointer"
              >
                Ver reportes
              </button>
            </div>
          </div>

          {/* Fila 1: 4 KPIs Principales (Prioridad alta: más grandes y protagonistas) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {primaryKpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.label}
                  className="rounded-2xl bg-slate-50 p-4 sm:p-5 text-left space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-[13px] font-heading font-semibold text-slate-600 truncate">
                      {kpi.label}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${kpi.iconClass}`}>
                      <Icon className="w-4 h-4" strokeWidth={1.8} />
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tabular-nums leading-none">
                      {kpi.value}
                    </p>
                    <p className="text-[11px] font-sans text-slate-500 mt-2 truncate">{kpi.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fila 2: 9 Indicadores Secundarios (pequeños y compactos en bloque denso) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {secondaryCompactKpis.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="rounded-xl bg-slate-50 px-3 py-2.5 text-left flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-heading font-medium text-slate-500 truncate">{m.label}</p>
                    <p className="text-base font-heading font-bold text-slate-900 tabular-nums mt-0.5 leading-none">
                      {m.value}
                    </p>
                    <p className="text-[10px] font-sans text-slate-400 truncate mt-1">{m.sub}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${m.tone}`}>
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gráficas Minimalistas Lineales (sin fondo, solo borde sutil) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Ingresos por línea de negocio */}
            <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-transparent p-5 text-left space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-heading font-bold text-slate-900">
                    Ingresos por línea de negocio
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Últimos 6 meses, por fecha del movimiento · {cityText}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cta" />
                    Flota
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    Anfitriones
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Choferes
                  </span>
                </div>
              </div>

              <div className="h-44 w-full">
                <svg viewBox="0 0 600 160" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="galsaAreaBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3D63FF" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#3D63FF" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="galsaAreaSky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.14" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[30, 70, 110, 145].map((y) => (
                    <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" />
                  ))}
                  {/* Serie Sky */}
                  <path
                    d="M 10 38 C 110 26, 175 18, 225 22 C 280 28, 310 132, 390 140 L 590 142 L 590 145 L 10 145 Z"
                    fill="url(#galsaAreaSky)"
                  />
                  <path
                    d="M 10 38 C 110 26, 175 18, 225 22 C 280 28, 310 132, 390 140 L 590 142"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2"
                  />
                  {/* Serie CTA */}
                  <path
                    d="M 10 72 C 110 64, 175 56, 225 60 C 280 66, 310 136, 390 142 L 590 143 L 590 145 L 10 145 Z"
                    fill="url(#galsaAreaBlue)"
                  />
                  <path
                    d="M 10 72 C 110 64, 175 56, 225 60 C 280 66, 310 136, 390 142 L 590 143"
                    fill="none"
                    stroke="#3D63FF"
                    strokeWidth="2"
                  />
                  {/* Serie Emerald */}
                  <path
                    d="M 10 105 C 120 102, 180 104, 225 108 C 285 112, 320 141, 390 144 L 590 144"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Jun 2026</span>
                <span>Jul 2026</span>
                <span>Ago 2026</span>
                <span>Sep 2026</span>
              </div>
            </div>

            {/* Ingresos por línea */}
            <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-transparent p-5 text-left flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-heading font-bold text-slate-900">Ingresos por línea</h2>
                <p className="text-[11px] text-slate-500">Distribución de Nov 2026</p>
              </div>
              <div className="py-10 flex flex-col items-center justify-center gap-2 text-center">
                <div className="w-9 h-9 rounded-xl border border-slate-200 text-slate-400 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" strokeWidth={1.6} />
                </div>
                <span className="text-xs font-heading font-medium text-slate-500">
                  Sin ingresos cobrados
                </span>
              </div>
              <div className="text-[11px] text-slate-400 text-center">
                Se actualiza al registrar pagos confirmados
              </div>
            </div>
          </div>

          {/* Fila inferior de gráficas: Ocupación por ciudad + Reservas por mes (lineales sin fondo) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Ocupación por ciudad */}
            <div className="rounded-2xl border border-slate-200 bg-transparent p-5 text-left space-y-4">
              <div>
                <h2 className="text-sm font-heading font-bold text-slate-900">Ocupación por ciudad</h2>
                <p className="text-[11px] text-slate-500">% de flota en operación</p>
              </div>
              <div className="h-36 flex items-end justify-around gap-8 px-6 pt-4 border-b border-slate-200/70">
                <div className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono font-semibold text-slate-700">100%</span>
                  <div className="w-8 bg-sky-400 rounded-t-lg h-[82%]" />
                </div>
                <div className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono text-slate-400">0%</span>
                  <div className="w-8 bg-slate-200 rounded-t-lg h-1" />
                </div>
              </div>
              <div className="flex justify-around text-[11px] font-sans text-slate-500">
                <span>Ciudad de México</span>
                <span>Durango</span>
              </div>
            </div>

            {/* Reservas por mes */}
            <div className="rounded-2xl border border-slate-200 bg-transparent p-5 text-left space-y-4">
              <div>
                <h2 className="text-sm font-heading font-bold text-slate-900">Reservas por mes</h2>
                <p className="text-[11px] text-slate-500">
                  Últimos 6 meses, por fecha de alta · una renta a chofer cuenta una vez
                </p>
              </div>
              <div className="h-36 flex items-end justify-between gap-3 px-2 pt-4 border-b border-slate-200/70">
                {RESERVAS_POR_MES.map((bar) => (
                  <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-mono text-slate-500">{bar.value}</span>
                    <div
                      className="w-full max-w-[26px] bg-cta-400 rounded-t-lg transition-all"
                      style={{ height: `${Math.max(6, Math.round((bar.value / 75) * 100))}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 px-1">
                {RESERVAS_POR_MES.map((bar) => (
                  <span key={bar.month} className="truncate">
                    {bar.month.replace(' 2026', '')}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tabla minimalista lineal (sin fondo): Estado de la flota */}
          <div className="rounded-2xl border border-slate-200 bg-transparent p-5 text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-heading font-bold text-slate-900">Estado de la flota</h2>
                <p className="text-[11px] text-slate-500">
                  Kilometraje y próximo servicio de las {filteredFleet.length} unidades · {cityText}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveNav('mantenimientos')}
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-cta hover:bg-cta-600 text-white text-xs font-heading font-semibold transition-colors cursor-pointer"
              >
                Ver mantenimientos
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-heading font-semibold">
              Ninguna unidad llegó al umbral de kilometraje ni al vencimiento por tiempo.
            </div>

            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {filteredFleet.length > 0 ? (
                filteredFleet.map((unit, idx) => (
                  <div
                    key={`${unit.name}-${unit.city}-${idx}`}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-heading font-semibold text-slate-900 truncate">
                        {unit.name}
                      </p>
                      <p className="text-[11px] font-sans text-slate-500 mt-0.5">
                        {unit.km} · {unit.city}
                      </p>
                    </div>
                    <span
                      className={`self-start sm:self-center inline-flex items-center px-3 py-1 rounded-full text-xs font-heading font-semibold shrink-0 ${
                        unit.hasPlan
                          ? 'bg-cta-50 text-cta'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {unit.interval}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-xs text-slate-500">
                  No hay unidades registradas para ese filtro.
                </div>
              )}
            </div>
          </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};
