import React, { useState, useMemo } from 'react';
import {
  AlertCircle,
  Search,
  AlertTriangle,
  DollarSign,
  Eye,
  Trash2,
  X,
  Plus,
  Siren,
  SlidersHorizontal,
  Layers,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CustomDropdown, DropdownOption } from './CustomDropdown';

export type IncidentSeverity = 'Crítica' | 'Alta' | 'Media' | 'Baja';
export type IncidentStatus = 'Crítico' | 'Abierto' | 'Revisión' | 'Documentación' | 'Resuelto';
export type IncidentLine = 'Renta tradicional' | 'Marketplace' | 'Plataforma';

export interface AdminIncident {
  id: string;
  code: string;
  date: string;
  type: string;
  vehicle: string;
  clientOrDriver: string;
  line: IncidentLine;
  severity: IncidentSeverity;
  status: IncidentStatus;
  cost: number;
  notes: string;
}

const INITIAL_INCIDENTS: AdminIncident[] = [
  {
    id: 'inc-1',
    code: 'INC-0158',
    date: '14 ago 2026',
    type: 'Accidente vial',
    vehicle: '—',
    clientOrDriver: 'Fer López',
    line: 'Renta tradicional',
    severity: 'Crítica',
    status: 'Crítico',
    cost: 0,
    notes: 'Reporte inicial recibido desde línea de emergencias. Pendiente asignar ajustador.',
  },
  {
    id: 'inc-2',
    code: 'INC-0157',
    date: '05 ago 2026',
    type: 'Retraso en devolución',
    vehicle: '—',
    clientOrDriver: 'José Ramón Lamadrid',
    line: 'Renta tradicional',
    severity: 'Baja',
    status: 'Abierto',
    cost: 0,
    notes: 'Entrega reprogramada 3 horas posteriores al cierre de contrato.',
  },
  {
    id: 'inc-3',
    code: 'INC-0156',
    date: '31 jul 2026',
    type: 'Mantenimiento correctivo',
    vehicle: '—',
    clientOrDriver: 'José Ramón Lamadrid',
    line: 'Renta tradicional',
    severity: 'Alta',
    status: 'Abierto',
    cost: 0,
    notes: 'Testigo de presión de llantas encendido tras entrega.',
  },
  {
    id: 'inc-4',
    code: 'INC-0155',
    date: '23 jul 2026',
    type: 'Retraso en devolución',
    vehicle: '—',
    clientOrDriver: 'Cliente de la App',
    line: 'Marketplace',
    severity: 'Baja',
    status: 'Revisión',
    cost: 900,
    notes: 'Cargo por hora extra en validación con el anfitrión.',
  },
  {
    id: 'inc-5',
    code: 'INC-0146',
    date: '17 jul 2026',
    type: 'Daño menor en carrocería',
    vehicle: '—',
    clientOrDriver: 'Fernando Reyess',
    line: 'Renta tradicional',
    severity: 'Media',
    status: 'Documentación',
    cost: 55500,
    notes: 'Cotización de taller recibida. En espera de evidencia fotográfica firmada.',
  },
  {
    id: 'inc-6',
    code: 'INC-0147',
    date: '17 jul 2026',
    type: 'Colisión lateral',
    vehicle: '—',
    clientOrDriver: 'Fernando Reyess',
    line: 'Renta tradicional',
    severity: 'Crítica',
    status: 'Resuelto',
    cost: 0,
    notes: 'Cobertura aplicada sin deducible pendiente.',
  },
  {
    id: 'inc-7',
    code: 'INC-0150',
    date: '17 jul 2026',
    type: 'Colisión frontal',
    vehicle: '—',
    clientOrDriver: 'Fernando Reyess',
    line: 'Renta tradicional',
    severity: 'Crítica',
    status: 'Crítico',
    cost: 0,
    notes: 'Unidad en corralón; seguimiento legal activo.',
  },
  {
    id: 'inc-8',
    code: 'INC-0145',
    date: '17 jul 2026',
    type: 'Daño menor en fascia',
    vehicle: '—',
    clientOrDriver: 'Fernando Reyess',
    line: 'Renta tradicional',
    severity: 'Media',
    status: 'Abierto',
    cost: 0,
    notes: 'Inspección de retorno pendiente de valuación.',
  },
  {
    id: 'inc-9',
    code: 'INC-0148',
    date: '17 jul 2026',
    type: 'Colisión en estacionamiento',
    vehicle: '—',
    clientOrDriver: 'Fernando Reyess',
    line: 'Renta tradicional',
    severity: 'Crítica',
    status: 'Abierto',
    cost: 0,
    notes: 'Acta de hechos levantada en sucursal.',
  },
  {
    id: 'inc-10',
    code: 'INC-0143',
    date: '17 jul 2026',
    type: 'Daño menor en cristal',
    vehicle: '—',
    clientOrDriver: 'Fernando Reyess',
    line: 'Renta tradicional',
    severity: 'Alta',
    status: 'Revisión',
    cost: 5000,
    notes: 'Reemplazo de parabrisas cotizado con proveedor autorizado.',
  },
  {
    id: 'inc-11',
    code: 'INC-0154',
    date: '17 jul 2026',
    type: 'Colisión trasera',
    vehicle: '—',
    clientOrDriver: 'Ana Sofía Cárdenas',
    line: 'Marketplace',
    severity: 'Crítica',
    status: 'Resuelto',
    cost: 0,
    notes: 'Resuelto con aseguradora del tercero.',
  },
];

const STATUS_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todos los estados', subtitle: 'Historial completo', icon: SlidersHorizontal },
  { value: 'Crítico', label: 'Crítico', subtitle: 'Protocolo activo', icon: ShieldAlert },
  { value: 'Abierto', label: 'Abierto', subtitle: 'Sin resolver', icon: AlertCircle },
  { value: 'Revisión', label: 'Revisión', subtitle: 'En análisis', icon: Search },
  { value: 'Documentación', label: 'Documentación', subtitle: 'Esperando soportes', icon: AlertTriangle },
  { value: 'Resuelto', label: 'Resuelto', subtitle: 'Cerrados', icon: SlidersHorizontal },
];

const SEVERITY_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Toda gravedad', subtitle: 'Todos los niveles', icon: AlertTriangle },
  { value: 'Crítica', label: 'Crítica', subtitle: 'Atención inmediata', icon: AlertTriangle },
  { value: 'Alta', label: 'Alta', subtitle: 'Prioridad alta', icon: AlertTriangle },
  { value: 'Media', label: 'Media', subtitle: 'Seguimiento estándar', icon: AlertTriangle },
  { value: 'Baja', label: 'Baja', subtitle: 'Menor impacto', icon: AlertTriangle },
];

const LINE_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todas las líneas', subtitle: 'Consolidado', icon: Layers },
  { value: 'Renta tradicional', label: 'Renta tradicional', subtitle: 'Flota propia', icon: Layers },
  { value: 'Marketplace', label: 'Marketplace', subtitle: 'Anfitriones', icon: Layers },
  { value: 'Plataforma', label: 'Plataforma', subtitle: 'Choferes', icon: Layers },
];

const STATUS_CHIP: Record<IncidentStatus, { pill: string; dot: string }> = {
  Crítico: { pill: 'border border-slate-200 bg-transparent text-red-950', dot: 'bg-red-500' },
  Abierto: { pill: 'border border-slate-200 bg-transparent text-amber-950', dot: 'bg-amber-500' },
  Revisión: { pill: 'border border-slate-200 bg-transparent text-blue-950', dot: 'bg-cta' },
  Documentación: { pill: 'border border-slate-200 bg-transparent text-slate-950', dot: 'bg-slate-400' },
  Resuelto: { pill: 'border border-slate-200 bg-transparent text-emerald-950', dot: 'bg-emerald-500' },
};

const SEVERITY_TEXT: Record<IncidentSeverity, string> = {
  Crítica: 'text-red-700 font-semibold',
  Alta: 'text-amber-800 font-semibold',
  Media: 'text-slate-700 font-medium',
  Baja: 'text-slate-500 font-normal',
};

export const AdminIncidentsView: React.FC = () => {
  const [incidents, setIncidents] = useState<AdminIncident[]>(INITIAL_INCIDENTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [lineFilter, setLineFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredIncidents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return incidents.filter((inc) => {
      if (statusFilter !== 'all' && inc.status !== statusFilter) return false;
      if (severityFilter !== 'all' && inc.severity !== severityFilter) return false;
      if (lineFilter !== 'all' && inc.line !== lineFilter) return false;
      if (!q) return true;
      return (
        inc.code.toLowerCase().includes(q) ||
        inc.clientOrDriver.toLowerCase().includes(q) ||
        inc.type.toLowerCase().includes(q) ||
        inc.vehicle.toLowerCase().includes(q)
      );
    });
  }, [incidents, search, statusFilter, severityFilter, lineFilter]);

  const openCount = useMemo(
    () => incidents.filter((i) => i.status === 'Abierto' || i.status === 'Crítico').length,
    [incidents]
  );
  const reviewCount = useMemo(
    () => incidents.filter((i) => i.status === 'Revisión').length,
    [incidents]
  );
  const criticalCount = useMemo(
    () => incidents.filter((i) => i.severity === 'Crítica' && i.status !== 'Resuelto').length,
    [incidents]
  );
  const totalCost = useMemo(
    () => incidents.reduce((sum, i) => sum + i.cost, 0),
    [incidents]
  );

  const deleteIncident = (id: string) => {
    setIncidents((prev) => prev.filter((i) => i.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const selectedIndex = useMemo(
    () => filteredIncidents.findIndex((i) => i.id === selectedId),
    [filteredIncidents, selectedId]
  );
  const selectedIncident = selectedIndex >= 0 ? filteredIncidents[selectedIndex] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Incidencias
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
            Módulo único de siniestros e incidentes para todas las líneas de negocio.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSeverityFilter((prev) => (prev === 'Crítica' ? 'all' : 'Crítica'))}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs sm:text-sm font-heading font-semibold transition-colors cursor-pointer"
          >
            <Siren className="w-4 h-4" strokeWidth={1.7} />
            <span>Emergencia</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cta hover:bg-cta-600 text-white text-xs sm:text-sm font-heading font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={1.8} />
            <span>Nueva incidencia</span>
          </button>
        </div>
      </div>

      {/* 4 KPIs compactos (mismo formato que Reportes) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Abiertas</span>
            <span
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                openCount > 0 ? 'bg-amber-50 text-amber-800' : 'bg-white text-slate-500'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {openCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">sin resolver</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">En revisión</span>
            <span className="w-7 h-7 rounded-lg bg-white text-slate-500 flex items-center justify-center shrink-0">
              <Search className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {reviewCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">en análisis</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Críticas</span>
            <span
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                criticalCount > 0 ? 'bg-red-50 text-red-700' : 'bg-white text-slate-500'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {criticalCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">atención inmediata</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">
              Costo estimado total
            </span>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <DollarSign className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              ${(totalCost / 1000).toFixed(1)} k
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">impacto acumulado</p>
          </div>
        </div>
      </div>

      {/* Aviso minimalista de incidencias críticas (sin caja roja saturada) */}
      {criticalCount > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <div className="text-xs leading-snug">
              <span className="font-heading font-semibold text-slate-900">
                {criticalCount} incidencias críticas requieren atención inmediata
              </span>
              <span className="text-slate-500 hidden sm:inline">
                {' '}· Activa el protocolo de siniestros y notifica a Dirección de Operaciones.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSeverityFilter((prev) => (prev === 'Crítica' ? 'all' : 'Crítica'))}
            className={`self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-heading font-semibold transition-colors cursor-pointer shrink-0 ${
              severityFilter === 'Crítica'
                ? 'bg-cta text-white'
                : 'bg-cta-50 hover:bg-cta-100 text-cta'
            }`}
          >
            {severityFilter === 'Crítica' ? 'Ver todas' : 'Ver críticas'}
          </button>
        </div>
      )}

      {/* Filtros a la izquierda + Buscador por nombre a la derecha (fuera de la tabla) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
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
            options={SEVERITY_OPTIONS}
            value={severityFilter}
            onChange={setSeverityFilter}
            triggerIcon={AlertTriangle}
            buttonClassName="!w-auto"
            menuWidthClass="w-56"
          />
          <CustomDropdown
            options={LINE_OPTIONS}
            value={lineFilter}
            onChange={setLineFilter}
            triggerIcon={Layers}
            buttonClassName="!w-auto"
            menuWidthClass="w-56"
          />
        </div>

        <div className="relative w-full lg:w-64">
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
            strokeWidth={1.6}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o código..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-transparent border border-slate-200 hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta text-xs sm:text-sm font-sans text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Tabla libre sin borde ni scroll interno */}
      <div className="text-left space-y-4">
        <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400">
                <th className="py-2.5 pr-4">Código</th>
                <th className="py-2.5 px-3">Tipo</th>
                <th className="py-2.5 px-3">Vehículo</th>
                <th className="py-2.5 px-3">Cliente / Conductor</th>
                <th className="py-2.5 px-3">Línea</th>
                <th className="py-2.5 px-3">Gravedad</th>
                <th className="py-2.5 px-3">Estado</th>
                <th className="py-2.5 px-3 text-right">Costo</th>
                <th className="py-2.5 pl-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-xs text-slate-400">
                    No hay incidencias que coincidan con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((inc) => {
                  const chip = STATUS_CHIP[inc.status];
                  return (
                    <tr key={inc.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Código + fecha */}
                      <td className="py-3 pr-4 whitespace-nowrap leading-tight">
                        <p className="font-heading font-semibold text-slate-900 text-xs sm:text-sm tabular-nums">
                          {inc.code}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{inc.date}</p>
                      </td>

                      {/* Tipo */}
                      <td className="py-3 px-3">
                        <span
                          className="block max-w-[140px] truncate text-xs text-slate-700"
                          title={inc.type}
                        >
                          {inc.type}
                        </span>
                      </td>

                      {/* Vehículo */}
                      <td className="py-3 px-3 text-xs text-slate-500 whitespace-nowrap">
                        {inc.vehicle}
                      </td>

                      {/* Cliente / Conductor */}
                      <td className="py-3 px-3">
                        <span
                          className="block max-w-[170px] truncate text-xs font-medium text-slate-800"
                          title={inc.clientOrDriver}
                        >
                          {inc.clientOrDriver}
                        </span>
                      </td>

                      {/* Línea (neutral, sin chip decorativo) */}
                      <td className="py-3 px-3 text-xs text-slate-600 whitespace-nowrap">
                        {inc.line}
                      </td>

                      {/* Gravedad (texto semántico limpio, sin doble chip) */}
                      <td className="py-3 px-3 text-xs whitespace-nowrap">
                        <span className={SEVERITY_TEXT[inc.severity]}>{inc.severity}</span>
                      </td>

                      {/* Estado (chip lineal gris + puntito color + texto 950) */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold ${chip.pill}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${chip.dot}`} />
                          {inc.status}
                        </span>
                      </td>

                      {/* Costo */}
                      <td className="py-3 px-3 text-right font-heading font-semibold tabular-nums whitespace-nowrap">
                        <span className={inc.cost > 0 ? 'text-slate-900' : 'text-slate-400'}>
                          ${inc.cost.toLocaleString('es-MX')}
                        </span>
                      </td>

                      {/* Acciones neutrales */}
                      <td className="py-3 pl-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedId(inc.id)}
                            aria-label="Ver incidencia"
                            title="Ver detalle"
                            className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" strokeWidth={1.7} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteIncident(inc.id)}
                            aria-label="Eliminar incidencia"
                            title="Eliminar incidencia"
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
          Mostrando {filteredIncidents.length} de {incidents.length} incidencias
        </div>
      </div>

      {/* Modal de detalle de incidencia (Patrón estándar del Sistema de Diseño) */}
      {selectedIncident && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedId(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="incident-modal-title"
        >
          <div
            className="w-full max-w-[520px] bg-white rounded-[24px] p-6 sm:p-7 border border-slate-200 relative text-left space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>

            <div className="flex items-start justify-between gap-3 pr-8">
              <div>
                <h2
                  id="incident-modal-title"
                  className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-tight"
                >
                  {selectedIncident.code} · {selectedIncident.type}
                </h2>
                <p className="text-xs font-sans text-slate-500 mt-0.5">
                  {selectedIncident.date} · {selectedIncident.line}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold ${STATUS_CHIP[selectedIncident.status].pill}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CHIP[selectedIncident.status].dot}`} />
                {selectedIncident.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 text-xs">
              <div>
                <p className="text-slate-400">Cliente / Conductor</p>
                <p className="font-medium text-slate-800 mt-0.5">{selectedIncident.clientOrDriver}</p>
              </div>
              <div>
                <p className="text-slate-400">Gravedad</p>
                <p className={`mt-0.5 ${SEVERITY_TEXT[selectedIncident.severity]}`}>
                  {selectedIncident.severity}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Vehículo</p>
                <p className="font-medium text-slate-800 mt-0.5">{selectedIncident.vehicle}</p>
              </div>
              <div>
                <p className="text-slate-400">Costo estimado</p>
                <p className="font-heading font-bold text-slate-900 mt-0.5 tabular-nums">
                  ${selectedIncident.cost.toLocaleString('es-MX')} MXN
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">
              {selectedIncident.notes}
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={selectedIndex <= 0}
                  onClick={() =>
                    selectedIndex > 0 && setSelectedId(filteredIncidents[selectedIndex - 1].id)
                  }
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-heading font-semibold disabled:opacity-40 disabled:cursor-default transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  disabled={selectedIndex < 0 || selectedIndex >= filteredIncidents.length - 1}
                  onClick={() =>
                    selectedIndex < filteredIncidents.length - 1 &&
                    setSelectedId(filteredIncidents[selectedIndex + 1].id)
                  }
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-heading font-semibold disabled:opacity-40 disabled:cursor-default transition-colors cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedId(null)}
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
