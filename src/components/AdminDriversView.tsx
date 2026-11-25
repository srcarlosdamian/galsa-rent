import React, { useState, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Users,
  UserCheck,
  Clock,
  AlertTriangle,
  FileWarning,
  Search,
  MapPin,
  SlidersHorizontal,
  Eye,
  Trash2,
  Copy,
  Check,
  X,
  UserPlus,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CustomDropdown, DropdownOption } from './CustomDropdown';

export type DriverStatus = 'Activo' | 'Pendiente';
export type AppAccessState = 'active' | 'sent' | 'no_email';

export interface AdminDriver {
  id: string;
  initials: string;
  name: string;
  phone: string;
  email: string | null;
  city: string;
  assignedCar: string | null;
  weeklyRent: number;
  docsCompleted: number;
  docsTotal: number;
  appAccess: AppAccessState;
  status: DriverStatus;
  irregularSince?: string;
  missingDocs?: string[];
}

interface DriverRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  sentAt: string;
}

const INITIAL_REQUESTS: DriverRequest[] = [
  {
    id: 'req-1',
    name: 'Fer López',
    phone: '6182111214',
    email: 'fernandalopez280804@icloud.com',
    city: 'Ciudad de México',
    sentAt: '22 sep 2026',
  },
];

const INITIAL_DRIVERS: AdminDriver[] = [
  {
    id: 'drv-1',
    initials: 'J',
    name: 'Juan',
    phone: '874336078',
    email: 'juan@gmail.com',
    city: 'Ciudad de México',
    assignedCar: null,
    weeklyRent: 4900,
    docsCompleted: 0,
    docsTotal: 3,
    appAccess: 'sent',
    status: 'Pendiente',
  },
  {
    id: 'drv-2',
    initials: 'HA',
    name: 'Hiram Axayacatl Cortez Santillan',
    phone: '+52 5573422078',
    email: 'edgar07210@hotmail.com',
    city: 'Guadalajara',
    assignedCar: 'Chevrolet Spark 2026',
    weeklyRent: 0,
    docsCompleted: 3,
    docsTotal: 3,
    appAccess: 'active',
    status: 'Activo',
  },
  {
    id: 'drv-3',
    initials: 'ES',
    name: 'Enrique Solís',
    phone: '+52 55 6640 1290',
    email: '31gianlucamartinez@gmail.com',
    city: 'Ciudad de México',
    assignedCar: 'BYD DOLPHIN MINI PLUS DOLPHING MINI 2026',
    weeklyRent: 1200,
    docsCompleted: 1,
    docsTotal: 3,
    appAccess: 'active',
    status: 'Pendiente',
  },
  {
    id: 'drv-4',
    initials: 'MV',
    name: 'Marcos Villa',
    phone: '+52 81 5590 8834',
    email: 'chinillo1983@gmail.com',
    city: 'Monterrey',
    assignedCar: null,
    weeklyRent: 2600,
    docsCompleted: 3,
    docsTotal: 3,
    appAccess: 'active',
    status: 'Activo',
  },
  {
    id: 'drv-5',
    initials: 'JL',
    name: 'José Luis Peña',
    phone: '+52 33 7712 0043',
    email: null,
    city: 'Guadalajara',
    assignedCar: null,
    weeklyRent: 2600,
    docsCompleted: 0,
    docsTotal: 3,
    appAccess: 'no_email',
    status: 'Activo',
    irregularSince: '07 sep 2026',
    missingDocs: ['Identificación oficial', 'Comprobante de domicilio', 'Licencia de conducir'],
  },
  {
    id: 'drv-6',
    initials: 'AR',
    name: 'Alberto Ramírez',
    phone: '+52 55 8123 4590',
    email: null,
    city: 'Guadalajara',
    assignedCar: null,
    weeklyRent: 2800,
    docsCompleted: 0,
    docsTotal: 3,
    appAccess: 'no_email',
    status: 'Activo',
    irregularSince: '07 sep 2026',
    missingDocs: ['Identificación oficial', 'Comprobante de domicilio', 'Licencia de conducir'],
  },
  {
    id: 'drv-7',
    initials: 'LA',
    name: 'Luis Angel Camacho Rodriguez',
    phone: '+526182217456',
    email: null,
    city: 'Ciudad de México',
    assignedCar: null,
    weeklyRent: 0,
    docsCompleted: 0,
    docsTotal: 3,
    appAccess: 'no_email',
    status: 'Pendiente',
  },
  {
    id: 'drv-8',
    initials: 'HG',
    name: 'Hector Gonzales García',
    phone: '+526182224734',
    email: 'chofer.demo@galsa.mx',
    city: 'Ciudad de México',
    assignedCar: null,
    weeklyRent: 0,
    docsCompleted: 0,
    docsTotal: 3,
    appAccess: 'active',
    status: 'Activo',
    irregularSince: '07 sep 2026',
    missingDocs: ['Identificación oficial', 'Comprobante de domicilio', 'Licencia de conducir'],
  },
];

const STATUS_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todos los estados', subtitle: 'Activos y pendientes', icon: SlidersHorizontal },
  { value: 'Activo', label: 'Activo', subtitle: 'En operación', icon: UserCheck },
  { value: 'Pendiente', label: 'Pendiente', subtitle: 'Esperando alta/revisión', icon: Clock },
];

const CITY_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todas las ciudades', subtitle: 'Cobertura nacional', icon: MapPin },
  { value: 'Ciudad de México', label: 'Ciudad de México', subtitle: 'CDMX', icon: MapPin },
  { value: 'Guadalajara', label: 'Guadalajara', subtitle: 'Jalisco', icon: MapPin },
  { value: 'Monterrey', label: 'Monterrey', subtitle: 'Nuevo León', icon: MapPin },
];

const STATUS_CHIP: Record<DriverStatus, { pill: string; dot: string }> = {
  Activo: { pill: 'border border-slate-200 bg-transparent text-emerald-950', dot: 'bg-emerald-500' },
  Pendiente: { pill: 'border border-slate-200 bg-transparent text-amber-950', dot: 'bg-amber-500' },
};

const APP_ACCESS_META: Record<
  AppAccessState,
  { title: string; subtitle: string; bar: string }
> = {
  active: {
    title: 'App activa',
    subtitle: 'Ya ingresó a la app',
    bar: 'border-emerald-500',
  },
  sent: {
    title: 'Acceso enviado',
    subtitle: 'Todavía sin usar',
    bar: 'border-cta',
  },
  no_email: {
    title: 'Sin acceso',
    subtitle: 'Falta correo electrónico',
    bar: 'border-amber-500',
  },
};

interface HoverTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const HoverTooltip: React.FC<HoverTooltipProps> = ({ content, children }) => {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  const show = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top - 8,
      left: Math.min(Math.max(rect.left + rect.width / 2, 130), window.innerWidth - 130),
    });
  };

  const hide = () => setCoords(null);

  return (
    <span
      ref={triggerRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      className="inline-flex items-center"
    >
      {children}
      {coords &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            style={{ top: coords.top, left: coords.left }}
            className="fixed -translate-x-1/2 -translate-y-full z-[90] w-60 rounded-xl bg-slate-900 text-white p-2.5 text-[11px] leading-relaxed shadow-lg pointer-events-none whitespace-normal text-left"
          >
            {content}
          </div>,
          document.body
        )}
    </span>
  );
};

export const AdminDriversView: React.FC = () => {
  const [drivers, setDrivers] = useState<AdminDriver[]>(INITIAL_DRIVERS);
  const [requests, setRequests] = useState<DriverRequest[]>(INITIAL_REQUESTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const filteredDrivers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return drivers.filter((d) => {
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (cityFilter !== 'all' && d.city !== cityFilter) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        (d.email && d.email.toLowerCase().includes(q)) ||
        d.phone.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q)
      );
    });
  }, [drivers, search, statusFilter, cityFilter]);

  const activeCount = useMemo(() => drivers.filter((d) => d.status === 'Activo').length, [drivers]);
  const reviewCount = useMemo(() => drivers.filter((d) => d.status === 'Pendiente').length, [drivers]);
  const irregularCount = useMemo(() => drivers.filter((d) => Boolean(d.irregularSince)).length, [drivers]);
  const pendingDocsCount = useMemo(
    () => drivers.filter((d) => d.docsCompleted < d.docsTotal).length,
    [drivers]
  );

  const handleCopyEmail = (id: string, email: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 1500);
  };

  const approveRequest = (req: DriverRequest) => {
    const initials = req.name
      .split(' ')
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
    setDrivers((prev) => [
      {
        id: `drv-${Date.now()}`,
        initials,
        name: req.name,
        phone: req.phone,
        email: req.email,
        city: req.city,
        assignedCar: null,
        weeklyRent: 0,
        docsCompleted: 0,
        docsTotal: 3,
        appAccess: 'sent',
        status: 'Pendiente',
      },
      ...prev,
    ]);
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
  };

  const rejectRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const deleteDriver = (id: string) => {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
    if (selectedDriverId === id) setSelectedDriverId(null);
  };

  const selectedIndex = useMemo(
    () => filteredDrivers.findIndex((d) => d.id === selectedDriverId),
    [filteredDrivers, selectedDriverId]
  );
  const selectedDriver = selectedIndex >= 0 ? filteredDrivers[selectedIndex] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Choferes de plataforma
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
            Conductores de la línea GALSA Plataforma · control de expedientes, ingresos y renta
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cta-50 hover:bg-cta-100 text-cta text-xs sm:text-sm font-heading font-semibold transition-colors cursor-pointer"
          >
            <CalendarClock className="w-4 h-4" strokeWidth={1.7} />
            <span>Revisar vencimientos</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cta hover:bg-cta-600 text-white text-xs sm:text-sm font-heading font-semibold transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" strokeWidth={1.7} />
            <span>Nuevo chofer</span>
          </button>
        </div>
      </div>

      {/* 5 KPIs compactos (mismo formato que Reportes) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-stretch">
        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Choferes registrados</span>
            <span className="w-7 h-7 rounded-lg bg-white text-slate-500 flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {drivers.length}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">Base total</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Choferes activos</span>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <UserCheck className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {activeCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">En operación</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">En revisión</span>
            <span
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                reviewCount > 0 ? 'bg-amber-50 text-amber-800' : 'bg-white text-slate-500'
              }`}
            >
              <Clock className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {reviewCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">esperan aprobación</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Irregulares</span>
            <span
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                irregularCount > 0 ? 'bg-red-50 text-red-700' : 'bg-white text-slate-500'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {irregularCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">activos, sin papeles al día</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Expedientes pendientes</span>
            <span
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                pendingDocsCount > 0 ? 'bg-amber-50 text-amber-800' : 'bg-white text-slate-500'
              }`}
            >
              <FileWarning className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {pendingDocsCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">por completar</p>
          </div>
        </div>
      </div>

      {/* Solicitudes para ser chofer (versión minimalista) */}
      {requests.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3.5 text-left space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-heading font-bold text-slate-900">
                Solicitudes para ser chofer
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cta-50 text-cta text-[10px] font-heading font-bold tabular-nums">
                {requests.length}
              </span>
            </div>
            <span className="hidden sm:inline text-[11px] font-sans text-slate-400">
              Desde la app · Alta con datos precargados
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {requests.map((req) => (
              <div
                key={req.id}
                className="pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs">
                  <span className="font-heading font-semibold text-slate-900">{req.name}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500 tabular-nums">{req.phone}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500 truncate max-w-[220px]">{req.email}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">{req.city}</span>
                  <span className="text-[11px] text-slate-400">({req.sentAt})</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => approveRequest(req)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cta hover:bg-cta-600 text-white text-xs font-heading font-semibold transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Dar de alta</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => rejectRequest(req.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-xs font-heading font-semibold transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Rechazar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtros a la izquierda + Buscador por nombre a la derecha (fuera de la tabla) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <CustomDropdown
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
            triggerIcon={SlidersHorizontal}
            buttonClassName="!w-auto"
            menuWidthClass="w-56"
          />
          <CustomDropdown
            options={CITY_OPTIONS}
            value={cityFilter}
            onChange={setCityFilter}
            triggerIcon={MapPin}
            buttonClassName="!w-auto"
            menuWidthClass="w-56"
          />
        </div>

        <div className="relative w-full md:w-64">
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
            strokeWidth={1.6}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-transparent border border-slate-200 hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta text-xs sm:text-sm font-sans text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Tabla libre sin borde ni scroll interno */}
      <div className="text-left space-y-4">
        <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400">
                <th className="py-2.5 pr-4">Chofer</th>
                <th className="py-2.5 px-3">Ciudad</th>
                <th className="py-2.5 px-3">Auto asignado</th>
                <th className="py-2.5 px-3 text-right">Renta/sem</th>
                <th className="py-2.5 px-3">Expediente</th>
                <th className="py-2.5 px-3">Acceso a la app</th>
                <th className="py-2.5 px-3">Estado</th>
                <th className="py-2.5 pl-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-xs text-slate-400">
                    No se encontraron choferes con ese criterio.
                  </td>
                </tr>
              ) : (
                filteredDrivers.map((driver) => {
                  const access = APP_ACCESS_META[driver.appAccess];
                  const chip = STATUS_CHIP[driver.status];
                  const isCopied = copiedId === driver.id;

                  return (
                    <tr key={driver.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Chofer: Nombre completo en 1 línea truncada + teléfono + correo truncado copiable */}
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-full bg-cta-50 text-cta text-[11px] font-heading font-bold flex items-center justify-center shrink-0">
                            {driver.initials}
                          </span>
                          <div className="min-w-0 max-w-[190px] leading-tight">
                            <p
                              className="font-heading font-semibold text-slate-900 text-xs sm:text-sm truncate"
                              title={driver.name}
                            >
                              {driver.name}
                            </p>
                            <p className="text-[11px] text-slate-500 tabular-nums truncate mt-0.5">
                              {driver.phone}
                            </p>
                            {driver.email ? (
                              <div className="group/mail inline-flex items-center gap-1 max-w-full mt-0.5">
                                <span
                                  className="text-[11px] text-slate-400 truncate"
                                  title={driver.email}
                                >
                                  {driver.email}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyEmail(driver.id, driver.email!)}
                                  aria-label="Copiar correo"
                                  title={isCopied ? 'Copiado' : 'Copiar correo'}
                                  className="opacity-0 group-hover/mail:opacity-100 focus:opacity-100 text-slate-400 hover:text-cta transition-opacity shrink-0 cursor-pointer"
                                >
                                  {isCopied ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            ) : (
                              <span className="text-[11px] text-amber-700 block mt-0.5">
                                Sin correo
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Ciudad */}
                      <td className="py-3 px-3 text-xs text-slate-600 whitespace-nowrap">
                        {driver.city}
                      </td>

                      {/* Auto asignado (1 línea truncada con tooltip) */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {driver.assignedCar ? (
                          <span
                            className="block max-w-[150px] truncate text-xs font-medium text-slate-800"
                            title={driver.assignedCar}
                          >
                            {driver.assignedCar}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">Por asignar</span>
                        )}
                      </td>

                      {/* Renta/sem */}
                      <td className="py-3 px-3 text-right font-heading font-semibold text-slate-800 tabular-nums whitespace-nowrap">
                        ${driver.weeklyRent.toLocaleString('es-MX')}
                      </td>

                      {/* Expediente compacto con tooltip de documentos obligatorios */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <HoverTooltip
                          content={
                            <div>
                              <p className="font-heading font-semibold text-white">
                                {driver.docsCompleted}/{driver.docsTotal} documentos obligatorios
                              </p>
                              <p className="text-slate-300 mt-0.5">
                                {driver.docsCompleted === driver.docsTotal
                                  ? 'Expediente completo: identificación, comprobante y licencia vigentes.'
                                  : `Faltan ${driver.docsTotal - driver.docsCompleted} documentos por cargar o validar.`}
                              </p>
                            </div>
                          }
                        >
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 bg-transparent text-[11px] font-heading font-semibold cursor-help ${
                              driver.docsCompleted === driver.docsTotal
                                ? 'text-emerald-950'
                                : 'text-amber-950'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                driver.docsCompleted === driver.docsTotal
                                  ? 'bg-emerald-500'
                                  : 'bg-amber-500'
                              }`}
                            />
                            <span>
                              {driver.docsCompleted}/{driver.docsTotal}
                            </span>
                          </span>
                        </HoverTooltip>
                      </td>

                      {/* Acceso a la app: 2 líneas limpias con barra vertical de estatus a la izquierda (sin chips) */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className={`border-l-2 pl-2.5 leading-tight ${access.bar}`}>
                          <p className="text-xs font-heading font-semibold text-slate-800">
                            {access.title}
                          </p>
                          <p className="text-[11px] font-sans text-slate-500 mt-0.5">
                            {access.subtitle}
                          </p>
                        </div>
                      </td>

                      {/* Estado: chip lineal + icono de warning a un lado con tooltip sin recortarse */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold ${chip.pill}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${chip.dot}`} />
                            {driver.status}
                          </span>

                          {driver.irregularSince && (
                            <HoverTooltip
                              content={
                                <div>
                                  <p className="font-heading font-semibold text-amber-300">
                                    Irregular desde {driver.irregularSince}
                                  </p>
                                  {driver.missingDocs && (
                                    <p className="text-slate-200 mt-0.5">
                                      Falta: {driver.missingDocs.join(', ')}
                                    </p>
                                  )}
                                </div>
                              }
                            >
                              <span
                                tabIndex={0}
                                aria-label={`Irregular desde ${driver.irregularSince}`}
                                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-amber-600 hover:bg-amber-50 transition-colors cursor-help"
                              >
                                <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} />
                              </span>
                            </HoverTooltip>
                          )}
                        </div>
                      </td>

                      {/* Acciones neutrales a la derecha */}
                      <td className="py-3 pl-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedDriverId(driver.id)}
                            aria-label="Ver chofer"
                            title="Ver detalle"
                            className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" strokeWidth={1.7} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteDriver(driver.id)}
                            aria-label="Eliminar chofer"
                            title="Eliminar chofer"
                            className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.7} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

        <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
          Mostrando {filteredDrivers.length} de {drivers.length} registros
        </div>
      </div>

      {/* Modal de detalle del chofer (Patrón estándar del Sistema de Diseño) */}
      {selectedDriver && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedDriverId(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="driver-modal-title"
        >
          <div
            className="w-full max-w-[520px] bg-white rounded-[24px] p-6 sm:p-7 border border-slate-200 relative text-left space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedDriverId(null)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>

            <div className="flex items-start justify-between gap-3 pr-8">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-cta-50 text-cta text-xs font-heading font-bold flex items-center justify-center shrink-0">
                  {selectedDriver.initials}
                </span>
                <div>
                  <h2
                    id="driver-modal-title"
                    className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-tight"
                  >
                    {selectedDriver.name}
                  </h2>
                  <p className="text-xs font-sans text-slate-500 mt-0.5">
                    {selectedDriver.city} · {selectedDriver.phone}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold ${STATUS_CHIP[selectedDriver.status].pill}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CHIP[selectedDriver.status].dot}`} />
                {selectedDriver.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 text-xs">
              <div>
                <p className="text-slate-400">Correo</p>
                <p className="font-medium text-slate-800 mt-0.5 break-all">
                  {selectedDriver.email || 'Sin correo'}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Renta semanal</p>
                <p className="font-heading font-bold text-slate-900 mt-0.5 tabular-nums">
                  ${selectedDriver.weeklyRent.toLocaleString('es-MX')} MXN
                </p>
              </div>
              <div>
                <p className="text-slate-400">Auto asignado</p>
                <p className="font-medium text-slate-800 mt-0.5">
                  {selectedDriver.assignedCar || 'Por asignar'}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Expediente</p>
                <p className="font-medium text-slate-800 mt-0.5">
                  {selectedDriver.docsCompleted}/{selectedDriver.docsTotal} obligatorios
                </p>
              </div>
            </div>

            {selectedDriver.irregularSince && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-3.5 text-xs text-amber-950 space-y-1">
                <p className="font-heading font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Irregular desde {selectedDriver.irregularSince}
                </p>
                {selectedDriver.missingDocs && (
                  <p className="text-amber-900">
                    Documentos faltantes: {selectedDriver.missingDocs.join(', ')}.
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={selectedIndex <= 0}
                  onClick={() =>
                    selectedIndex > 0 && setSelectedDriverId(filteredDrivers[selectedIndex - 1].id)
                  }
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-heading font-semibold disabled:opacity-40 disabled:cursor-default transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  disabled={selectedIndex < 0 || selectedIndex >= filteredDrivers.length - 1}
                  onClick={() =>
                    selectedIndex < filteredDrivers.length - 1 &&
                    setSelectedDriverId(filteredDrivers[selectedIndex + 1].id)
                  }
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-heading font-semibold disabled:opacity-40 disabled:cursor-default transition-colors cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDriverId(null)}
                className="px-4 py-2 rounded-xl bg-cta hover:bg-cta-600 text-white text-xs font-heading font-semibold transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
