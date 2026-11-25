import React, { useState, useMemo } from 'react';
import {
  Clock,
  Users,
  UserCheck,
  IdCard,
  Car,
  Search,
  Eye,
  Check,
  X,
  FileText,
  ChevronLeft,
  ChevronRight,
  Download,
  SlidersHorizontal,
} from 'lucide-react';
import { CustomDropdown, DropdownOption } from './CustomDropdown';

export type VerificationRole = 'Cliente' | 'Anfitrión' | 'Chofer' | 'Auto';
export type VerificationStatus = 'Pendiente' | 'Aprobado' | 'Rechazado';

export interface AdminVerification {
  id: string;
  initials: string;
  person: string;
  role: VerificationRole;
  documentName: string;
  fileName: string;
  hasAttachment: boolean;
  city: string;
  date: string;
  status: VerificationStatus;
  folio: string;
  validity: string;
}

const INITIAL_VERIFICATIONS: AdminVerification[] = [
  {
    id: 'ver-1',
    initials: 'GR',
    person: 'Gabriela Ríos',
    role: 'Anfitrión',
    documentName: 'Póliza de seguro',
    fileName: 'poliza_seguro_gabriela_rios.pdf',
    hasAttachment: false,
    city: 'Guadalajara',
    date: '14 feb 2024',
    status: 'Pendiente',
    folio: 'POL-2024-8812',
    validity: 'Sin archivo adjunto',
  },
  {
    id: 'ver-2',
    initials: 'CA',
    person: 'Cliente de la App',
    role: 'Cliente',
    documentName: 'Identificación oficial',
    fileName: 'ine_cliente_app.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '17 ago 2026',
    status: 'Pendiente',
    folio: 'INE-2026-4410',
    validity: 'Vigente hasta 2031',
  },
  {
    id: 'ver-3',
    initials: 'CA',
    person: 'Cliente de la App',
    role: 'Cliente',
    documentName: 'Licencia de conducir',
    fileName: 'licencia_conducir_cdmx.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '17 ago 2026',
    status: 'Pendiente',
    folio: 'LIC-CDMX-9921',
    validity: 'Vigente hasta 2029',
  },
  {
    id: 'ver-4',
    initials: 'AM',
    person: 'Adriana Martínez',
    role: 'Cliente',
    documentName: 'Identificación oficial',
    fileName: 'identificacion_adriana_martinez.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '29 ago 2026',
    status: 'Pendiente',
    folio: 'INE-2026-5104',
    validity: 'Vigente hasta 2030',
  },
  {
    id: 'ver-5',
    initials: 'AM',
    person: 'Adriana Martínez',
    role: 'Cliente',
    documentName: 'Licencia de conducir',
    fileName: 'licencia_adriana_martinez.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '29 ago 2026',
    status: 'Pendiente',
    folio: 'LIC-2026-5105',
    validity: 'Vigente hasta 2028',
  },
  {
    id: 'ver-6',
    initials: 'HG',
    person: 'Hector Gonzales García',
    role: 'Chofer',
    documentName: 'Antecedentes no penales',
    fileName: 'antecedentes_hector_gonzales.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '07 sep 2026',
    status: 'Pendiente',
    folio: 'ANP-2026-3021',
    validity: 'Expedido Sep 2026',
  },
  {
    id: 'ver-7',
    initials: 'HG',
    person: 'Hector Gonzales García',
    role: 'Chofer',
    documentName: 'Comprobante de domicilio',
    fileName: 'comprobante_domicilio_hector.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '07 sep 2026',
    status: 'Pendiente',
    folio: 'DOM-2026-3022',
    validity: 'Recibo CFE · Ago 2026',
  },
  {
    id: 'ver-8',
    initials: 'HG',
    person: 'Hector Gonzales García',
    role: 'Chofer',
    documentName: 'Contrato de renta firmado',
    fileName: 'contrato_renta_hector_galsa.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '07 sep 2026',
    status: 'Pendiente',
    folio: 'CTR-2026-3023',
    validity: 'Firmado digitalmente',
  },
  {
    id: 'ver-9',
    initials: 'HG',
    person: 'Hector Gonzales García',
    role: 'Chofer',
    documentName: 'Credencial / INE',
    fileName: 'credencial_ine_hector.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '07 sep 2026',
    status: 'Pendiente',
    folio: 'INE-2026-3024',
    validity: 'Vigente hasta 2032',
  },
  {
    id: 'ver-10',
    initials: 'HG',
    person: 'Hector Gonzales García',
    role: 'Chofer',
    documentName: 'Licencia de conducir',
    fileName: 'licencia_hector_gonzales.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '07 sep 2026',
    status: 'Pendiente',
    folio: 'LIC-2026-3025',
    validity: 'Vigente hasta 2029',
  },
  {
    id: 'ver-11',
    initials: 'HG',
    person: 'Hector Gonzales García',
    role: 'Chofer',
    documentName: 'Pagaré firmado',
    fileName: 'pagare_firmado_hector.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '07 sep 2026',
    status: 'Pendiente',
    folio: 'PAG-2026-3026',
    validity: 'Validado · Sep 2026',
  },
  {
    id: 'ver-12',
    initials: 'AS',
    person: 'Ana Sofía Cárdenas',
    role: 'Cliente',
    documentName: 'Comprobante de domicilio',
    fileName: 'comprobante_ana_sofia.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '16 sep 2026',
    status: 'Pendiente',
    folio: 'DOM-2026-7712',
    validity: 'Recibo Telmex · Sep 2026',
  },
  {
    id: 'ver-13',
    initials: 'AS',
    person: 'Ana Sofía Cárdenas',
    role: 'Cliente',
    documentName: 'Licencia de conducir',
    fileName: 'licencia_ana_sofia.pdf',
    hasAttachment: true,
    city: 'Ciudad de México',
    date: '16 sep 2026',
    status: 'Pendiente',
    folio: 'LIC-2026-7713',
    validity: 'Vigente hasta 2030',
  },
  {
    id: 'ver-14',
    initials: 'MR',
    person: 'Mazda CX-30 2023',
    role: 'Auto',
    documentName: 'Tarjeta de circulación',
    fileName: 'tarjeta_circulacion_cx30.pdf',
    hasAttachment: true,
    city: 'Durango',
    date: '18 sep 2026',
    status: 'Pendiente',
    folio: 'AUTO-2026-0192',
    validity: 'Refrendo 2026 al corriente',
  },
];

const ROLE_TABS: Array<{ id: 'Todos' | VerificationRole; label: string }> = [
  { id: 'Todos', label: 'Todos' },
  { id: 'Cliente', label: 'Clientes' },
  { id: 'Anfitrión', label: 'Anfitriones' },
  { id: 'Chofer', label: 'Choferes' },
  { id: 'Auto', label: 'Autos' },
];

const STATUS_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todos los estados', subtitle: 'Cola completa', icon: SlidersHorizontal },
  { value: 'Pendiente', label: 'Pendiente', subtitle: 'Por revisar', icon: Clock },
  { value: 'Aprobado', label: 'Aprobado', subtitle: 'Validados', icon: Check },
  { value: 'Rechazado', label: 'Rechazado', subtitle: 'Con motivo', icon: X },
];

const STATUS_CHIP: Record<VerificationStatus, { pill: string; dot: string }> = {
  Pendiente: { pill: 'border border-slate-200 bg-transparent text-amber-950', dot: 'bg-amber-500' },
  Aprobado: { pill: 'border border-slate-200 bg-transparent text-emerald-950', dot: 'bg-emerald-500' },
  Rechazado: { pill: 'border border-slate-200 bg-transparent text-red-950', dot: 'bg-red-500' },
};

export const AdminVerificationsView: React.FC = () => {
  const [items, setItems] = useState<AdminVerification[]>(INITIAL_VERIFICATIONS);
  const [roleFilter, setRoleFilter] = useState<'Todos' | VerificationRole>('Todos');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (roleFilter !== 'Todos' && item.role !== roleFilter) return false;
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (!q) return true;
      return (
        item.person.toLowerCase().includes(q) ||
        item.documentName.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.folio.toLowerCase().includes(q)
      );
    });
  }, [items, roleFilter, statusFilter, search]);

  const pendingItems = useMemo(() => items.filter((i) => i.status === 'Pendiente'), [items]);
  const clientsCount = useMemo(
    () => pendingItems.filter((i) => i.role === 'Cliente').length,
    [pendingItems]
  );
  const hostsCount = useMemo(
    () => pendingItems.filter((i) => i.role === 'Anfitrión').length,
    [pendingItems]
  );
  const driversCount = useMemo(
    () => pendingItems.filter((i) => i.role === 'Chofer').length,
    [pendingItems]
  );
  const carsCount = useMemo(
    () => pendingItems.filter((i) => i.role === 'Auto').length,
    [pendingItems]
  );

  const updateStatus = (id: string, status: VerificationStatus) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const selectedIndex = useMemo(
    () => filteredItems.findIndex((i) => i.id === selectedId),
    [filteredItems, selectedId]
  );
  const selectedItem = selectedIndex >= 0 ? filteredItems[selectedIndex] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
          Verificaciones
        </h1>
        <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
          Cola de revisión de documentos de clientes, anfitriones y choferes. Aprobar habilita a la persona; rechazar exige un motivo.
        </p>
      </div>

      {/* 5 KPIs compactos (mismo formato que Reportes) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-stretch">
        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Total pendientes</span>
            <span
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                pendingItems.length > 0 ? 'bg-amber-50 text-amber-800' : 'bg-white text-slate-500'
              }`}
            >
              <Clock className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {pendingItems.length}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">en cola</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Clientes</span>
            <span className="w-7 h-7 rounded-lg bg-white text-slate-500 flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {clientsCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">por validar</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Anfitriones</span>
            <span className="w-7 h-7 rounded-lg bg-white text-slate-500 flex items-center justify-center shrink-0">
              <UserCheck className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {hostsCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">por validar</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Choferes</span>
            <span className="w-7 h-7 rounded-lg bg-white text-slate-500 flex items-center justify-center shrink-0">
              <IdCard className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {driversCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">por validar</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Autos de anfitrión</span>
            <span className="w-7 h-7 rounded-lg bg-white text-slate-500 flex items-center justify-center shrink-0">
              <Car className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {carsCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">por aprobar</p>
          </div>
        </div>
      </div>

      {/* Filtros a la izquierda + Buscador por nombre a la derecha */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {ROLE_TABS.map((tab) => {
            const active = roleFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRoleFilter(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-cta-50 text-cta'
                    : 'bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          <CustomDropdown
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
            triggerIcon={SlidersHorizontal}
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
              <th className="py-2.5 pr-4">Persona / Unidad</th>
              <th className="py-2.5 px-3">Tipo</th>
              <th className="py-2.5 px-3">Documento</th>
              <th className="py-2.5 px-3">Ciudad</th>
              <th className="py-2.5 px-3">Estatus</th>
              <th className="py-2.5 px-3">Validación</th>
              <th className="py-2.5 pl-3 text-right">Documento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-xs text-slate-400">
                  No hay documentos que coincidan con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const chip = STATUS_CHIP[item.status];
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    {/* Persona / Unidad */}
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-cta-50 text-cta text-[11px] font-heading font-bold flex items-center justify-center shrink-0">
                          {item.initials}
                        </span>
                        <div className="leading-tight">
                          <p className="font-heading font-semibold text-slate-900 text-xs sm:text-sm">
                            {item.person}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{item.date}</p>
                        </div>
                      </div>
                    </td>

                    {/* Tipo (texto neutral) */}
                    <td className="py-3 px-3 text-xs text-slate-600 whitespace-nowrap">
                      {item.role}
                    </td>

                    {/* Documento */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-800">
                        <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.7} />
                        <span>{item.documentName}</span>
                        {!item.hasAttachment && (
                          <span className="text-[11px] text-slate-400 font-normal">(sin adjunto)</span>
                        )}
                      </div>
                    </td>

                    {/* Ciudad */}
                    <td className="py-3 px-3 text-xs text-slate-600 whitespace-nowrap">
                      {item.city}
                    </td>

                    {/* Estatus (chip lineal gris + puntito color + texto 950) */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold ${chip.pill}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${chip.dot}`} />
                        {item.status}
                      </span>
                    </td>

                    {/* Botones prudentes de Validación */}
                    <td
                      className="py-3 px-3 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateStatus(item.id, 'Aprobado')}
                          disabled={item.status === 'Aprobado'}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-heading font-semibold transition-colors cursor-pointer ${
                            item.status === 'Aprobado'
                              ? 'bg-emerald-50 text-emerald-700 opacity-50 cursor-default'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          <Check className="w-3 h-3" strokeWidth={2.2} />
                          <span>Aprobar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStatus(item.id, 'Rechazado')}
                          disabled={item.status === 'Rechazado'}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-heading font-semibold transition-colors cursor-pointer ${
                            item.status === 'Rechazado'
                              ? 'bg-slate-100 text-slate-400 opacity-50 cursor-default'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <X className="w-3 h-3" strokeWidth={2.2} />
                          <span>Rechazar</span>
                        </button>
                      </div>
                    </td>

                    {/* Ver documento (icono neutral) */}
                    <td
                      className="py-3 pl-3 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        aria-label="Ver documento"
                        title="Ver documento PDF"
                        className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 inline-flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" strokeWidth={1.7} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
          Mostrando {filteredItems.length} de {items.length} documentos
        </div>
      </div>

      {/* Modal con vista previa de PDF (Patrón estándar del Sistema de Diseño) */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedId(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="verification-modal-title"
        >
          <div
            className="w-full max-w-[640px] bg-white rounded-[24px] p-6 sm:p-7 border border-slate-200 relative text-left space-y-5"
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

            {/* Header del modal */}
            <div className="flex items-start justify-between gap-3 pr-8">
              <div>
                <h2
                  id="verification-modal-title"
                  className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-tight"
                >
                  {selectedItem.documentName}
                </h2>
                <p className="text-xs font-sans text-slate-500 mt-0.5">
                  {selectedItem.person} · {selectedItem.role} · {selectedItem.city} · {selectedItem.date}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold ${STATUS_CHIP[selectedItem.status].pill}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CHIP[selectedItem.status].dot}`} />
                {selectedItem.status}
              </span>
            </div>

            {/* Visor de PDF simulado */}
            <div className="rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden">
              {/* Barra superior del visor PDF */}
              <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-[11px] truncate">{selectedItem.fileName}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-[11px] text-slate-500">
                  <span>Página 1 / 1</span>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              {/* Hoja PDF simulada */}
              <div className="p-4 sm:p-6">
                {selectedItem.hasAttachment ? (
                  <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          GALSA Rent · Expediente Digital
                        </p>
                        <p className="text-sm font-heading font-bold text-slate-900 mt-0.5">
                          {selectedItem.documentName}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-[11px] font-mono text-slate-600">
                        {selectedItem.folio}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-slate-400">Titular</p>
                        <p className="font-heading font-semibold text-slate-900 mt-0.5">
                          {selectedItem.person}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400">Perfil</p>
                        <p className="font-medium text-slate-800 mt-0.5">{selectedItem.role}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Ciudad</p>
                        <p className="font-medium text-slate-800 mt-0.5">{selectedItem.city}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Vigencia / Detalle</p>
                        <p className="font-medium text-slate-800 mt-0.5">{selectedItem.validity}</p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3.5 text-[11px] text-slate-500 leading-relaxed">
                      Documento cargado desde la plataforma GALSA para validación administrativa. Verifica que los datos del titular y la vigencia coincidan con el expediente.
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-1.5">
                    <FileText className="w-6 h-6 text-slate-300 mx-auto" />
                    <p className="text-xs font-heading font-semibold text-slate-700">
                      Sin documento adjunto
                    </p>
                    <p className="text-[11px] text-slate-400">
                      El usuario aún no ha cargado el archivo PDF correspondiente.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer del modal: Anterior / Siguiente + Aprobar / Rechazar */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={selectedIndex <= 0}
                  onClick={() =>
                    selectedIndex > 0 && setSelectedId(filteredItems[selectedIndex - 1].id)
                  }
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-heading font-semibold disabled:opacity-40 disabled:cursor-default transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  disabled={selectedIndex < 0 || selectedIndex >= filteredItems.length - 1}
                  onClick={() =>
                    selectedIndex < filteredItems.length - 1 &&
                    setSelectedId(filteredItems[selectedIndex + 1].id)
                  }
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-heading font-semibold disabled:opacity-40 disabled:cursor-default transition-colors cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-400 tabular-nums ml-1">
                  {selectedIndex + 1} de {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => updateStatus(selectedItem.id, 'Rechazado')}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-heading font-semibold transition-colors cursor-pointer"
                >
                  Rechazar
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(selectedItem.id, 'Aprobado')}
                  className="px-4 py-2 rounded-xl bg-cta hover:bg-cta-600 text-white text-xs font-heading font-semibold transition-colors cursor-pointer"
                >
                  Aprobar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
