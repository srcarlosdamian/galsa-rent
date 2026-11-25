import React, { useState, useMemo } from 'react';
import {
  Wallet,
  Landmark,
  TrendingUp,
  ShieldCheck,
  Building2,
  PiggyBank,
  Search,
  MapPin,
  SlidersHorizontal,
} from 'lucide-react';
import { CustomDropdown, DropdownOption } from './CustomDropdown';

interface FleetCapitalUnit {
  id: string;
  name: string;
  plate: string;
  city: string;
  remaining: number;
  initialInvestment: number;
  residualValue: number;
  generated: number;
  cost: number;
  recoveryPct: number;
  roiPct: number;
}

const FLEET_CAPITAL_UNITS: FleetCapitalUnit[] = [
  {
    id: 'cap-1',
    name: 'Geely EX2 2026',
    plate: '80H024',
    city: 'Ciudad de México',
    remaining: 150000,
    initialInvestment: 150000,
    residualValue: 250000,
    generated: 0,
    cost: 0,
    recoveryPct: 0,
    roiPct: 0,
  },
  {
    id: 'cap-2',
    name: 'Jeep Wrangler 2011',
    plate: 'FXN834D',
    city: 'Durango',
    remaining: 0,
    initialInvestment: 0,
    residualValue: 0,
    generated: 0,
    cost: 0,
    recoveryPct: 0,
    roiPct: 0,
  },
  {
    id: 'cap-3',
    name: 'Nissan Sentra Sense 2026',
    plate: 'GEC193C',
    city: 'Durango',
    remaining: 0,
    initialInvestment: 0,
    residualValue: 0,
    generated: 0,
    cost: 0,
    recoveryPct: 0,
    roiPct: 0,
  },
  {
    id: 'cap-4',
    name: 'Jeep Wrangler Rubicon 2018',
    plate: 'FYV492C',
    city: 'Durango',
    remaining: 0,
    initialInvestment: 0,
    residualValue: 0,
    generated: 0,
    cost: 0,
    recoveryPct: 0,
    roiPct: 0,
  },
  {
    id: 'cap-5',
    name: 'Volkswagen Virtus Trendline 2026',
    plate: 'GEJ955E',
    city: 'Durango',
    remaining: 0,
    initialInvestment: 0,
    residualValue: 0,
    generated: 6552,
    cost: 0,
    recoveryPct: 0,
    roiPct: 0,
  },
  {
    id: 'cap-6',
    name: 'Audi Q5 2019',
    plate: 'FYV',
    city: 'Durango',
    remaining: 0,
    initialInvestment: 0,
    residualValue: 0,
    generated: 0,
    cost: 0,
    recoveryPct: 0,
    roiPct: 0,
  },
  {
    id: 'cap-7',
    name: 'BYD Dolphin Mini Plus 2026',
    plate: '79H652',
    city: 'Durango',
    remaining: 0,
    initialInvestment: 0,
    residualValue: 0,
    generated: 0,
    cost: 0,
    recoveryPct: 0,
    roiPct: 0,
  },
];

const CAPITAL_SOURCES = [
  { label: 'Externo (inversionistas)', amount: '$4,200,000', pct: 50, color: 'bg-cta' },
  { label: 'Propio (socios)', amount: '$2,800,000', pct: 34, color: 'bg-sky-400' },
  { label: 'Generado por operación', amount: '$1,360,000', pct: 16, color: 'bg-emerald-500' },
];

const RECOVERY_BARS = [
  { label: 'Geely EX2', pct: 100 },
  { label: 'Jeep Wrangler', pct: 100 },
  { label: 'Nissan Sentra', pct: 100 },
  { label: 'Wrangler Rubicon', pct: 100 },
  { label: 'VW Virtus', pct: 100 },
  { label: 'Audi Q5', pct: 100 },
  { label: 'VW Vento', pct: 100 },
  { label: 'Honda Civic', pct: 100 },
  { label: 'BYD Dolphin', pct: 100 },
];

const CITY_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todas las ciudades', subtitle: 'Flota propia', icon: MapPin },
  { value: 'Ciudad de México', label: 'Ciudad de México', subtitle: 'CDMX', icon: MapPin },
  { value: 'Durango', label: 'Durango', subtitle: 'Durango', icon: MapPin },
];

const RETURN_FILTER_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todas las unidades', subtitle: '11 unidades propias', icon: SlidersHorizontal },
  { value: 'with_return', label: 'Con ingresos', subtitle: 'Generó > $0', icon: TrendingUp },
];

export const AdminCapitalView: React.FC = () => {
  const [cityFilter, setCityFilter] = useState('all');
  const [returnFilter, setReturnFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredUnits = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FLEET_CAPITAL_UNITS.filter((u) => {
      if (cityFilter !== 'all' && u.city !== cityFilter) return false;
      if (returnFilter === 'with_return' && u.generated <= 0) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.plate.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q)
      );
    });
  }, [cityFilter, returnFilter, search]);

  const kpis = [
    {
      label: 'Capital externo',
      value: '$4,200,000',
      sub: 'Aportes de inversionistas',
      icon: Landmark,
      tone: 'bg-white text-slate-500',
    },
    {
      label: 'Capital propio',
      value: '$2,800,000',
      sub: 'Recursos de los socios GALSA',
      icon: Building2,
      tone: 'bg-white text-slate-500',
    },
    {
      label: 'Generado por operación',
      value: '$1,360,000',
      sub: 'Reinvertido del flujo operativo',
      icon: PiggyBank,
      tone: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Capital invertido',
      value: '$389,909',
      sub: '11 unidades propias',
      icon: Wallet,
      tone: 'bg-white text-slate-500',
    },
    {
      label: 'Inversión inicial',
      value: '$150,000',
      sub: 'desembolso de arranque',
      icon: Landmark,
      tone: 'bg-white text-slate-500',
    },
    {
      label: 'Valor residual',
      value: '$250,001',
      sub: 'al final de la vida útil',
      icon: ShieldCheck,
      tone: 'bg-white text-slate-500',
    },
    {
      label: 'ROI de la flota',
      value: '9.47%',
      sub: 'retorno neto / inversión',
      icon: TrendingUp,
      tone: 'bg-emerald-50 text-emerald-700',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
          Capital e inversiones
        </h1>
        <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
          Composición de capital, inversión inicial, valor residual y retorno de la flota propia.
        </p>
      </div>

      {/* KPIs compactos (formato unificado, colores solo en lo positivo/operación) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 items-stretch">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5"
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-xs font-heading font-medium text-slate-500 truncate">
                  {kpi.label}
                </span>
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${kpi.tone}`}>
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                </span>
              </div>
              <div>
                <p className="text-base sm:text-lg font-heading font-bold text-slate-900 tabular-nums leading-none">
                  {kpi.value}
                </p>
                <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráficos balanceados en fila: Composición de capital (pie integrado) + Recuperación por unidad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Pie / Donut bien aprovechado sin espacio vacío */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-transparent p-5 text-left flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-sm font-heading font-bold text-slate-900">Composición de capital</h2>
            <p className="text-[11px] text-slate-500">Fuentes de financiamiento ($8,360,000)</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Donut SVG */}
            <div className="relative w-32 h-32 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="4"
                />
                {/* Externo 50% */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="4"
                  strokeDasharray="44 88"
                  strokeDashoffset="0"
                />
                {/* Propio 34% */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  strokeDasharray="30 88"
                  strokeDashoffset="-44"
                />
                {/* Operación 16% */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray="14 88"
                  strokeDashoffset="-74"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400">Total</span>
                <span className="text-xs font-heading font-bold text-slate-900">$8.36 M</span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-2.5">
              {CAPITAL_SOURCES.map((src) => (
                <div key={src.label} className="flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center gap-2 text-slate-600 min-w-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${src.color}`} />
                    <span className="truncate">{src.label}</span>
                  </span>
                  <span className="font-heading font-semibold text-slate-900 tabular-nums shrink-0">
                    {src.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recuperación de inversión por unidad */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-transparent p-5 text-left flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-sm font-heading font-bold text-slate-900">
                Recuperación de inversión por unidad
              </h2>
              <p className="text-[11px] text-slate-500">Avance de recuperación de la flota propia (%)</p>
            </div>
            <span className="text-xs font-heading font-semibold text-slate-700 tabular-nums">
              Prom: 9%
            </span>
          </div>

          <div className="h-32 flex items-end justify-between gap-2.5 px-2 pt-3 border-b border-slate-200/70">
            {RECOVERY_BARS.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center h-full justify-end">
                <div
                  className="w-full max-w-[20px] bg-slate-900 rounded-t-md"
                  style={{ height: `${bar.pct}%` }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between text-[10px] font-sans text-slate-400 gap-1">
            {RECOVERY_BARS.map((bar) => (
              <span key={bar.label} className="truncate flex-1 text-center">
                {bar.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Filtros a la izquierda + Buscador por nombre a la derecha (fuera de la tabla) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <CustomDropdown
            options={CITY_OPTIONS}
            value={cityFilter}
            onChange={setCityFilter}
            triggerIcon={MapPin}
            buttonClassName="!w-auto"
            menuWidthClass="w-56"
          />
          <CustomDropdown
            options={RETURN_FILTER_OPTIONS}
            value={returnFilter}
            onChange={setReturnFilter}
            triggerIcon={SlidersHorizontal}
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

      {/* Tabla libre sin borde ni scroll interno: Retorno y valor residual por unidad */}
      <div className="text-left space-y-3">
        <div>
          <h2 className="text-sm font-heading font-bold text-slate-900">
            Retorno y valor residual por unidad
          </h2>
          <p className="text-[11px] text-slate-500">
            Solo flota propia de GALSA · Ingresos cobrados en Finanzas menos mantenimientos y costos acumulados.
          </p>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400">
              <th className="py-2.5 pr-4">Vehículo</th>
              <th className="py-2.5 px-3 text-right">Inversión inicial</th>
              <th className="py-2.5 px-3 text-right">Valor residual</th>
              <th className="py-2.5 px-3 text-right">Generó</th>
              <th className="py-2.5 px-3 text-right">Costo</th>
              <th className="py-2.5 px-3 text-right">Retorno neto</th>
              <th className="py-2.5 px-3 text-right">% Recuperación</th>
              <th className="py-2.5 pl-3 text-right">ROI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {filteredUnits.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-xs text-slate-400">
                  No hay unidades que coincidan con ese filtro.
                </td>
              </tr>
            ) : (
              filteredUnits.map((unit) => {
                const netReturn = unit.generated - unit.cost;
                return (
                  <tr key={unit.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 pr-4 leading-tight">
                      <p className="font-heading font-semibold text-slate-900 text-xs sm:text-sm">
                        {unit.name}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {unit.plate} · {unit.city}
                        {unit.remaining > 0 ? ` · faltan $${unit.remaining.toLocaleString('es-MX')}` : ''}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-right font-sans text-slate-700 tabular-nums whitespace-nowrap">
                      ${unit.initialInvestment.toLocaleString('es-MX')}
                    </td>
                    <td className="py-3 px-3 text-right font-sans text-slate-700 tabular-nums whitespace-nowrap">
                      ${unit.residualValue.toLocaleString('es-MX')}
                    </td>
                    <td className="py-3 px-3 text-right font-sans text-slate-700 tabular-nums whitespace-nowrap">
                      ${unit.generated.toLocaleString('es-MX')}
                    </td>
                    <td className="py-3 px-3 text-right font-sans text-slate-500 tabular-nums whitespace-nowrap">
                      ${unit.cost.toLocaleString('es-MX')}
                    </td>
                    <td className="py-3 px-3 text-right font-heading font-semibold tabular-nums whitespace-nowrap">
                      <span className={netReturn > 0 ? 'text-emerald-700' : 'text-slate-500'}>
                        ${netReturn.toLocaleString('es-MX')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${unit.recoveryPct}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-600 tabular-nums">{unit.recoveryPct}%</span>
                      </div>
                    </td>
                    <td className="py-3 pl-3 text-right text-xs font-heading font-semibold text-slate-700 tabular-nums whitespace-nowrap">
                      {unit.roiPct}%
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
