import React, { useState, useRef, useEffect } from 'react';
import {
  DollarSign,
  TrendingDown,
  Scale,
  Gauge,
  Calendar,
  FileText,
  Download,
  MapPin,
  Layers,
  Car,
  Search,
} from 'lucide-react';
import { CustomDropdown, DropdownOption } from './CustomDropdown';
import { SingleDatePicker } from './SingleDatePicker';

const REPORT_CITY_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todas las ciudades', subtitle: 'Cobertura nacional', icon: MapPin },
  { value: 'Ciudad de México', label: 'Ciudad de México', subtitle: 'CDMX', icon: MapPin },
  { value: 'Durango', label: 'Durango', subtitle: 'Sucursal Plaza 450', icon: MapPin },
  { value: 'Guadalajara', label: 'Guadalajara', subtitle: 'Jalisco', icon: MapPin },
  { value: 'Monterrey', label: 'Monterrey', subtitle: 'Nuevo León', icon: MapPin },
];

const REPORT_LINE_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todas las líneas', subtitle: 'Consolidado GALSA', icon: Layers },
  { value: 'Renta tradicional', label: 'Renta tradicional', subtitle: 'Flota propia', icon: Car },
  { value: 'Marketplace', label: 'Marketplace', subtitle: 'Autos de anfitriones', icon: Car },
  { value: 'Plataforma', label: 'Plataforma', subtitle: 'Rentas a choferes', icon: Car },
];

const COST_VS_INCOME_MONTHLY = [
  { month: 'Jun 2026', incomePct: 80, costPct: 22 },
  { month: 'Jul 2026', incomePct: 92, costPct: 28 },
  { month: 'Ago 2026', incomePct: 5, costPct: 2 },
  { month: 'Sep 2026', incomePct: 4, costPct: 1 },
  { month: 'Oct 2026', incomePct: 1, costPct: 0 },
  { month: 'Nov 2026', incomePct: 1, costPct: 0 },
];

const BUSINESS_LINES = [
  { name: 'Renta tradicional', income: '$3.5 M', cost: '$60.5 k', net: '$3.4 M', margin: '98%', marginPositive: true, bookings: 22 },
  { name: 'Marketplace', income: '$2.1 M', cost: '$1.6 M', net: '$490.5 k', margin: '24%', marginPositive: false, bookings: 31 },
  { name: 'Plataforma', income: '$1.2 M', cost: '$0', net: '$1.2 M', margin: '100%', marginPositive: true, bookings: 102 },
];

const COST_CATEGORIES = [
  { label: 'Seguro', pct: 72 },
  { label: 'Mantenimiento', pct: 16 },
  { label: 'Administrativo', pct: 15 },
  { label: 'Combustible', pct: 3 },
];

const UNIT_PROFITABILITY = [
  { name: 'Honda Civic Coupé', income: '$7.6 k', net: '$7.6 k' },
  { name: 'Volkswagen Virtus Trendline', income: '$6.6 k', net: '$6.6 k' },
];

const formatShortDate = (iso: string) => {
  if (!iso) return 'dd/mm/aaaa';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

export const AdminReportsView: React.FC = () => {
  const [city, setCity] = useState('all');
  const [line, setLine] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [openDate, setOpenDate] = useState<'from' | 'to' | null>(null);
  const [unitSearch, setUnitSearch] = useState('');
  const dateWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dateWrapRef.current && !dateWrapRef.current.contains(e.target as Node)) {
        setOpenDate(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const reportKpis = [
    { label: 'Ingresos', value: '$6.7 M', sub: 'rentas $6.7 M + Contabilidad $27.6 k', icon: DollarSign, tone: 'bg-white text-slate-500' },
    { label: 'Costos', value: '$1.7 M', sub: 'operativo + gastos', icon: TrendingDown, tone: 'bg-white text-slate-500' },
    { label: 'Resultado neto', value: '$5 M', sub: 'ingresos - costos', icon: Scale, tone: 'bg-white text-slate-500' },
    { label: 'Margen', value: '74.9%', sub: 'neto / ingresos', icon: Gauge, tone: 'bg-white text-slate-500' },
    { label: 'Ocupación', value: '17%', sub: '1/6 de la flota', icon: Gauge, tone: 'bg-white text-slate-500' },
    { label: 'Reservas', value: '155', sub: 'en el rango', icon: Calendar, tone: 'bg-white text-slate-500' },
  ];

  const visibleLines =
    line === 'all' ? BUSINESS_LINES : BUSINESS_LINES.filter((b) => b.name === line);

  return (
    <div className="space-y-6">
      {/* Header + Botones secundarios de exportar (sin borde, Soft Azul del Sistema de Diseño) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Reportes
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
            Reportes analíticos de ingresos, ocupación, costos y desempeño por línea
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cta-50 hover:bg-cta-100 text-cta text-xs sm:text-sm font-heading font-semibold transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4" strokeWidth={1.7} />
            <span>Exportar PDF</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const csv = 'Linea,Ingreso,Costo,Neto,Margen,Reservas\n' + BUSINESS_LINES.map((b) => `${b.name},${b.income},${b.cost},${b.net},${b.margin},${b.bookings}`).join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'reporte-galsa.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cta-50 hover:bg-cta-100 text-cta text-xs sm:text-sm font-heading font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" strokeWidth={1.7} />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Filtros directos agrupados a la izquierda con ancho automático */}
      <div ref={dateWrapRef} className="flex flex-wrap items-center gap-2.5 overflow-visible">
        <CustomDropdown
          options={REPORT_CITY_OPTIONS}
          value={city}
          onChange={setCity}
          triggerIcon={MapPin}
          buttonClassName="!w-auto"
          menuWidthClass="w-64"
        />

        <CustomDropdown
          options={REPORT_LINE_OPTIONS}
          value={line}
          onChange={setLine}
          triggerIcon={Layers}
          buttonClassName="!w-auto"
          menuWidthClass="w-60"
        />

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDate((prev) => (prev === 'from' ? null : 'from'))}
            className={`w-auto px-3.5 py-2.5 rounded-xl border bg-white inline-flex items-center gap-2.5 text-sm font-sans text-left transition-colors cursor-pointer ${
              openDate === 'from'
                ? 'border-cta ring-1 ring-cta text-slate-900'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-700'
            }`}
          >
            <span className="whitespace-nowrap">
              <span className="text-slate-400 mr-1.5">Desde:</span>
              <span className={fromDate ? 'text-slate-900' : 'text-slate-400'}>
                {formatShortDate(fromDate)}
              </span>
            </span>
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.5} />
          </button>
          {openDate === 'from' && (
            <div className="absolute top-full left-0 mt-2 z-[70]">
              <SingleDatePicker
                value={fromDate || '2026-11-01'}
                onChange={(d) => {
                  setFromDate(d);
                  setOpenDate(null);
                }}
                onClose={() => setOpenDate(null)}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDate((prev) => (prev === 'to' ? null : 'to'))}
            className={`w-auto px-3.5 py-2.5 rounded-xl border bg-white inline-flex items-center gap-2.5 text-sm font-sans text-left transition-colors cursor-pointer ${
              openDate === 'to'
                ? 'border-cta ring-1 ring-cta text-slate-900'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-700'
            }`}
          >
            <span className="whitespace-nowrap">
              <span className="text-slate-400 mr-1.5">Hasta:</span>
              <span className={toDate ? 'text-slate-900' : 'text-slate-400'}>
                {formatShortDate(toDate)}
              </span>
            </span>
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.5} />
          </button>
          {openDate === 'to' && (
            <div className="absolute top-full left-0 mt-2 z-[70]">
              <SingleDatePicker
                value={toDate || '2026-11-30'}
                onChange={(d) => {
                  setToDate(d);
                  setOpenDate(null);
                }}
                onClose={() => setOpenDate(null)}
              />
            </div>
          )}
        </div>
      </div>

      {/* 6 KPIs compactos arriba con exactamente la misma altura */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-stretch">
        {reportKpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-heading font-medium text-slate-500 truncate">
                  {kpi.label}
                </span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${kpi.tone}`}>
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </div>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
                  {kpi.value}
                </p>
                <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">
                  {kpi.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráfica principal: Costo vs ingreso (minimalista, solo borde) */}
      <div className="rounded-2xl border border-slate-200 bg-transparent p-5 text-left space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-heading font-bold text-slate-900">Costo vs ingreso</h2>
            <p className="text-[11px] text-slate-500">Evolución mensual (MXN)</p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Ingreso
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Costo
            </span>
          </div>
        </div>

        <div className="h-44 flex items-end justify-between gap-4 px-2 sm:px-6 pt-4 border-b border-slate-200/70">
          {COST_VS_INCOME_MONTHLY.map((m) => (
            <div key={m.month} className="flex-1 flex items-end justify-center gap-1.5 h-full">
              <div
                className="w-4 sm:w-6 bg-emerald-500 rounded-t-md transition-all"
                style={{ height: `${Math.max(3, m.incomePct)}%` }}
                title={`${m.month} Ingreso`}
              />
              <div
                className="w-4 sm:w-6 bg-red-500 rounded-t-md transition-all"
                style={{ height: `${Math.max(m.costPct > 0 ? 3 : 0, m.costPct)}%` }}
                title={`${m.month} Costo`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-400 px-2 sm:px-6">
          {COST_VS_INCOME_MONTHLY.map((m) => (
            <span key={m.month}>{m.month}</span>
          ))}
        </div>
      </div>

      {/* 2 Gráficas minimalistas: Ocupación de flota + Ingreso vs costo por ciudad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-transparent p-5 text-left space-y-4">
          <div>
            <h2 className="text-sm font-heading font-bold text-slate-900">Ocupación de flota</h2>
            <p className="text-[11px] text-slate-500">% ocupado por ciudad (actual)</p>
          </div>
          <div className="h-36 flex items-end justify-around gap-8 px-6 pt-4 border-b border-slate-200/70">
            <div className="flex flex-col items-center gap-1.5 h-full justify-end">
              <span className="text-[11px] font-mono font-semibold text-slate-700">100%</span>
              <div className="w-8 bg-sky-400 rounded-t-md h-[84%]" />
            </div>
            <div className="flex flex-col items-center gap-1.5 h-full justify-end">
              <span className="text-[11px] font-mono text-slate-400">0%</span>
              <div className="w-8 bg-slate-200 rounded-t-md h-1" />
            </div>
          </div>
          <div className="flex justify-around text-[11px] text-slate-500">
            <span>Ciudad de México</span>
            <span>Durango</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-transparent p-5 text-left space-y-4">
          <div>
            <h2 className="text-sm font-heading font-bold text-slate-900">Ingreso vs costo por ciudad</h2>
            <p className="text-[11px] text-slate-500">Costo operativo (MXN)</p>
          </div>
          <div className="h-36 flex items-end justify-around gap-8 px-6 pt-4 border-b border-slate-200/70">
            <div className="flex items-end gap-2 h-full">
              <div className="w-7 bg-emerald-500 rounded-t-md h-[84%]" />
              <div className="w-7 bg-red-500 rounded-t-md h-[22%]" />
            </div>
            <div className="flex items-end gap-2 h-full">
              <div className="w-7 bg-emerald-200 rounded-t-md h-1.5" />
              <div className="w-7 bg-slate-200 rounded-t-md h-0.5" />
            </div>
          </div>
          <div className="flex justify-around text-[11px] text-slate-500">
            <span>Sin asignar</span>
            <span>Durango</span>
          </div>
        </div>
      </div>

      {/* Tabla minimalista: Desempeño por línea de negocio */}
      <div className="rounded-2xl border border-slate-200 bg-transparent p-5 text-left space-y-4">
        <div>
          <h2 className="text-sm font-heading font-bold text-slate-900">Desempeño por línea de negocio</h2>
          <p className="text-[11px] text-slate-500">Ingreso, costo, resultado y reservas</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400">
                <th className="py-2.5 pr-4">Línea</th>
                <th className="py-2.5 px-3 text-right">Ingreso</th>
                <th className="py-2.5 px-3 text-right">Costo</th>
                <th className="py-2.5 px-3 text-right">Neto</th>
                <th className="py-2.5 px-3 text-right">Margen</th>
                <th className="py-2.5 pl-3 text-right">Reservas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {visibleLines.map((row) => (
                <tr key={row.name}>
                  <td className="py-3 pr-4 font-heading font-semibold text-slate-900 whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="py-3 px-3 text-right font-heading font-semibold text-emerald-700 tabular-nums whitespace-nowrap">
                    {row.income}
                  </td>
                  <td className="py-3 px-3 text-right font-heading font-semibold text-red-600 tabular-nums whitespace-nowrap">
                    {row.cost}
                  </td>
                  <td className="py-3 px-3 text-right font-heading font-bold text-emerald-700 tabular-nums whitespace-nowrap">
                    {row.net}
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-transparent text-xs font-heading font-semibold ${
                        row.marginPositive ? 'text-emerald-950' : 'text-amber-950'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          row.marginPositive ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      <span>{row.margin}</span>
                    </span>
                  </td>
                  <td className="py-3 pl-3 text-right font-heading font-semibold text-slate-700 tabular-nums">
                    {row.bookings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fila inferior: Costos por categoría + Rentabilidad por unidad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-transparent p-5 text-left space-y-4">
          <div>
            <h2 className="text-sm font-heading font-bold text-slate-900">Costos por categoría</h2>
            <p className="text-[11px] text-slate-500">Gastos registrados (MXN)</p>
          </div>
          <div className="space-y-3 pt-1">
            {COST_CATEGORIES.map((cat) => (
              <div key={cat.label} className="grid grid-cols-12 items-center gap-3">
                <span className="col-span-4 text-xs font-sans text-slate-500 text-right truncate">
                  {cat.label}
                </span>
                <div className="col-span-8 h-3.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-transparent p-5 text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-heading font-bold text-slate-900">Rentabilidad por unidad</h2>
              <p className="text-[11px] text-slate-500">Top vehículos por ingreso (MXN)</p>
            </div>
            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" strokeWidth={1.6} />
              <input
                type="text"
                value={unitSearch}
                onChange={(e) => setUnitSearch(e.target.value)}
                placeholder="Buscar por nombre..."
                className="w-full pl-8 pr-2.5 py-1.5 rounded-xl bg-transparent border border-slate-200 hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta text-xs font-sans text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2 pr-3">Vehículo</th>
                  <th className="py-2 px-3 text-right">Ingreso</th>
                  <th className="py-2 pl-3 text-right">Neto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {UNIT_PROFITABILITY.filter((u) =>
                  !unitSearch.trim() || u.name.toLowerCase().includes(unitSearch.toLowerCase())
                ).map((u) => (
                  <tr key={u.name}>
                    <td className="py-3 pr-3 font-heading font-semibold text-slate-900">
                      <span className="inline-flex items-center gap-2">
                        <Car className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.6} />
                        <span>{u.name}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-heading font-semibold text-emerald-700 tabular-nums whitespace-nowrap">
                      {u.income}
                    </td>
                    <td className="py-3 pl-3 text-right font-heading font-bold text-emerald-700 tabular-nums whitespace-nowrap">
                      {u.net}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
