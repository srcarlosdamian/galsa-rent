import React, { useState, useMemo } from 'react';
import {
  Users,
  Shield,
  Building2,
  Search,
  SlidersHorizontal,
  UserPlus,
  Pencil,
  Trash2,
  Copy,
  Check,
  Lock,
  X,
} from 'lucide-react';
import { CustomDropdown, DropdownOption } from './CustomDropdown';

export type InternalRole =
  | 'Super Admin'
  | 'Administrador'
  | 'Ejecutivo de sucursal'
  | 'Finanzas'
  | 'Operaciones'
  | 'Soporte';

export type UserAccountStatus = 'Activo' | 'Pausado';

export interface InternalUser {
  id: string;
  initials: string;
  name: string;
  email: string;
  role: InternalRole;
  branch: string;
  status: UserAccountStatus;
  lastActivity: string;
}

const INITIAL_USERS: InternalUser[] = [
  {
    id: 'usr-1',
    initials: 'AG',
    name: 'Administrador GALSA',
    email: 'admin@galsa.mx',
    role: 'Administrador',
    branch: 'Todas',
    status: 'Activo',
    lastActivity: '16/9/2026',
  },
  {
    id: 'usr-2',
    initials: 'AT',
    name: 'Ana Torres',
    email: 'ana.t@galsa.mx',
    role: 'Administrador',
    branch: 'MTY — San Pedro',
    status: 'Activo',
    lastActivity: '21/7/2026',
  },
  {
    id: 'usr-3',
    initials: 'DC',
    name: 'Daniela Cruz',
    email: 'daniela.c@galsa.mx',
    role: 'Finanzas',
    branch: 'Todas',
    status: 'Activo',
    lastActivity: '21/7/2026',
  },
  {
    id: 'usr-4',
    initials: 'ES',
    name: 'Edgar Sierra',
    email: 'edgar07210@gmail.com',
    role: 'Super Admin',
    branch: 'Todas',
    status: 'Activo',
    lastActivity: '8/10/2026',
  },
  {
    id: 'usr-5',
    initials: 'EG',
    name: 'Ejecutivo GALSA',
    email: 'ejecutivo@galsa.mx',
    role: 'Ejecutivo de sucursal',
    branch: 'Todas',
    status: 'Activo',
    lastActivity: '3/11/2026',
  },
  {
    id: 'usr-6',
    initials: 'FG',
    name: 'Finanzas GALSA',
    email: 'finanzas@galsa.mx',
    role: 'Finanzas',
    branch: 'Todas',
    status: 'Activo',
    lastActivity: '3/11/2026',
  },
  {
    id: 'usr-7',
    initials: 'HP',
    name: 'Hugo Pausado',
    email: 'admin.pausado@galsa.mx',
    role: 'Administrador',
    branch: 'Todas',
    status: 'Pausado',
    lastActivity: 'Sin actividad',
  },
  {
    id: 'usr-8',
    initials: 'LH',
    name: 'Luis Hernández',
    email: 'luis.h@galsa.mx',
    role: 'Operaciones',
    branch: 'CDMX — Polanco',
    status: 'Activo',
    lastActivity: '20/7/2026',
  },
  {
    id: 'usr-9',
    initials: 'MD',
    name: 'Marco Díaz',
    email: 'marco.d@galsa.mx',
    role: 'Soporte',
    branch: 'CDMX — AICM',
    status: 'Activo',
    lastActivity: '20/7/2026',
  },
  {
    id: 'usr-10',
    initials: 'OG',
    name: 'Operaciones GALSA',
    email: 'operaciones@galsa.mx',
    role: 'Operaciones',
    branch: 'Todas',
    status: 'Activo',
    lastActivity: '11/8/2026',
  },
  {
    id: 'usr-11',
    initials: 'OG',
    name: 'Óscar Galván',
    email: 'oscar@galsa.mx',
    role: 'Super Admin',
    branch: 'Todas',
    status: 'Activo',
    lastActivity: '19/11/2026',
  },
  {
    id: 'usr-12',
    initials: 'SP',
    name: 'Syrox Prueba',
    email: 'syroxprueba@gmail.com',
    role: 'Administrador',
    branch: 'Todas',
    status: 'Activo',
    lastActivity: '24/7/2026',
  },
];

const ROLES_LIST: InternalRole[] = [
  'Super Admin',
  'Administrador',
  'Ejecutivo de sucursal',
  'Finanzas',
  'Operaciones',
  'Soporte',
];

interface MatrixModule {
  id: string;
  label: string;
  locked?: boolean;
  permissions: Record<InternalRole, boolean>;
}

const INITIAL_MATRIX: MatrixModule[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    locked: true,
    permissions: {
      'Super Admin': true,
      Administrador: true,
      'Ejecutivo de sucursal': true,
      Finanzas: true,
      Operaciones: true,
      Soporte: true,
    },
  },
  {
    id: 'vehiculos',
    label: 'Vehículos',
    permissions: {
      'Super Admin': true,
      Administrador: true,
      'Ejecutivo de sucursal': true,
      Finanzas: true,
      Operaciones: true,
      Soporte: true,
    },
  },
  {
    id: 'reservas',
    label: 'Reservas',
    permissions: {
      'Super Admin': true,
      Administrador: true,
      'Ejecutivo de sucursal': true,
      Finanzas: true,
      Operaciones: true,
      Soporte: true,
    },
  },
  {
    id: 'clientes',
    label: 'Clientes',
    permissions: {
      'Super Admin': true,
      Administrador: true,
      'Ejecutivo de sucursal': true,
      Finanzas: false,
      Operaciones: false,
      Soporte: true,
    },
  },
  {
    id: 'anfitriones',
    label: 'Anfitriones',
    permissions: {
      'Super Admin': true,
      Administrador: true,
      'Ejecutivo de sucursal': true,
      Finanzas: false,
      Operaciones: true,
      Soporte: true,
    },
  },
  {
    id: 'verificaciones',
    label: 'Verificaciones',
    permissions: {
      'Super Admin': true,
      Administrador: true,
      'Ejecutivo de sucursal': true,
      Finanzas: true,
      Operaciones: true,
      Soporte: true,
    },
  },
  {
    id: 'entregas',
    label: 'Entregas',
    permissions: {
      'Super Admin': true,
      Administrador: true,
      'Ejecutivo de sucursal': true,
      Finanzas: false,
      Operaciones: true,
      Soporte: false,
    },
  },
  {
    id: 'mantenimientos',
    label: 'Mantenimientos',
    permissions: {
      'Super Admin': true,
      Administrador: true,
      'Ejecutivo de sucursal': true,
      Finanzas: true,
      Operaciones: true,
      Soporte: true,
    },
  },
  {
    id: 'incidencias',
    label: 'Incidencias',
    permissions: {
      'Super Admin': true,
      Administrador: true,
      'Ejecutivo de sucursal': true,
      Finanzas: false,
      Operaciones: true,
      Soporte: true,
    },
  },
  {
    id: 'finanzas',
    label: 'Finanzas',
    locked: true,
    permissions: {
      'Super Admin': true,
      Administrador: true,
      'Ejecutivo de sucursal': false,
      Finanzas: true,
      Operaciones: false,
      Soporte: false,
    },
  },
  {
    id: 'reportes',
    label: 'Reportes',
    locked: true,
    permissions: {
      'Super Admin': true,
      Administrador: true,
      'Ejecutivo de sucursal': false,
      Finanzas: true,
      Operaciones: false,
      Soporte: false,
    },
  },
  {
    id: 'usuarios',
    label: 'Usuarios y permisos',
    locked: true,
    permissions: {
      'Super Admin': true,
      Administrador: false,
      'Ejecutivo de sucursal': false,
      Finanzas: false,
      Operaciones: false,
      Soporte: false,
    },
  },
];

const ROLE_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todos los roles', subtitle: '6 perfiles RBAC', icon: Shield },
  ...ROLES_LIST.map((r) => ({ value: r, label: r, icon: Shield })),
];

const STATUS_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todos los estados', subtitle: 'Activos y pausados', icon: SlidersHorizontal },
  { value: 'Activo', label: 'Activo', subtitle: 'Con acceso', icon: Check },
  { value: 'Pausado', label: 'Pausado', subtitle: 'Acceso suspendido', icon: X },
];

const STATUS_CHIP: Record<UserAccountStatus, { pill: string; dot: string }> = {
  Activo: { pill: 'border border-slate-200 bg-transparent text-emerald-950', dot: 'bg-emerald-500' },
  Pausado: { pill: 'border border-slate-200 bg-transparent text-slate-950', dot: 'bg-slate-400' },
};

interface AdminUsersPermissionsViewProps {
  activeTab: 'usuarios' | 'permisos';
  onTabChange: (tab: 'usuarios' | 'permisos') => void;
}

export const AdminUsersPermissionsView: React.FC<AdminUsersPermissionsViewProps> = ({
  activeTab,
  onTabChange,
}) => {
  const [users, setUsers] = useState<InternalUser[]>(INITIAL_USERS);
  const [matrix, setMatrix] = useState<MatrixModule[]>(INITIAL_MATRIX);
  const [search, setSearch] = useState('');
  const [matrixSearch, setMatrixSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedRole, setSavedRole] = useState<InternalRole | null>(null);
  const [editingUser, setEditingUser] = useState<InternalUser | null>(null);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (statusFilter !== 'all' && u.status !== statusFilter) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.branch.toLowerCase().includes(q)
      );
    });
  }, [users, search, roleFilter, statusFilter]);

  const filteredModules = useMemo(() => {
    const q = matrixSearch.trim().toLowerCase();
    if (!q) return matrix;
    return matrix.filter((m) => m.label.toLowerCase().includes(q));
  }, [matrix, matrixSearch]);

  const activeUsersCount = useMemo(
    () => users.filter((u) => u.status === 'Activo').length,
    [users]
  );

  const handleCopyEmail = (id: string, email: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 1500);
  };

  const togglePermission = (moduleId: string, role: InternalRole) => {
    if (role === 'Super Admin') return;
    setMatrix((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? { ...m, permissions: { ...m.permissions, [role]: !m.permissions[role] } }
          : m
      )
    );
  };

  const handleSaveRole = (role: InternalRole) => {
    setSavedRole(role);
    setTimeout(() => setSavedRole((prev) => (prev === role ? null : prev)), 1500);
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
            Usuarios y permisos
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
            Gestión de usuarios internos y control de acceso por rol (RBAC).
          </p>
        </div>

        <button
          type="button"
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cta hover:bg-cta-600 text-white text-xs sm:text-sm font-heading font-semibold transition-colors cursor-pointer"
        >
          <UserPlus className="w-4 h-4" strokeWidth={1.8} />
          <span>Invitar usuario</span>
        </button>
      </div>

      {/* 3 KPIs compactos (mismo formato que Reportes) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">
              Usuarios activos
            </span>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {activeUsersCount}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">
              de {users.length} totales
            </p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">Roles</span>
            <span className="w-7 h-7 rounded-lg bg-white text-slate-500 flex items-center justify-center shrink-0">
              <Shield className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              {ROLES_LIST.length}
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">perfiles RBAC</p>
          </div>
        </div>

        <div className="h-full rounded-2xl bg-slate-50 p-3.5 text-left flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-heading font-medium text-slate-500 truncate">
              Sucursales
            </span>
            <span className="w-7 h-7 rounded-lg bg-white text-slate-500 flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-slate-900 tabular-nums leading-none">
              10
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-1.5 leading-snug">cobertura</p>
          </div>
        </div>
      </div>

      {/* Tabs: Usuarios y permisos | Matriz de permisos */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <button
          type="button"
          onClick={() => onTabChange('usuarios')}
          className={`px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-colors cursor-pointer ${
            activeTab === 'usuarios'
              ? 'bg-cta-50 text-cta'
              : 'bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Usuarios y permisos
        </button>
        <button
          type="button"
          onClick={() => onTabChange('permisos')}
          className={`px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-colors cursor-pointer ${
            activeTab === 'permisos'
              ? 'bg-cta-50 text-cta'
              : 'bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Matriz de permisos
        </button>
      </div>

      {/* TAB 1: Usuarios */}
      {activeTab === 'usuarios' ? (
        <div className="space-y-4">
          {/* Filtros a la izquierda + Buscador por nombre a la derecha */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <CustomDropdown
                options={ROLE_OPTIONS}
                value={roleFilter}
                onChange={setRoleFilter}
                triggerIcon={Shield}
                buttonClassName="!w-auto"
                menuWidthClass="w-56"
              />
              <CustomDropdown
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={setStatusFilter}
                triggerIcon={SlidersHorizontal}
                buttonClassName="!w-auto"
                menuWidthClass="w-52"
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
                  <th className="py-2.5 pr-4">Usuario</th>
                  <th className="py-2.5 px-3">Rol</th>
                  <th className="py-2.5 px-3">Sucursal</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3">Última actividad</th>
                  <th className="py-2.5 pl-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-xs text-slate-400">
                      No se encontraron usuarios con ese criterio.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => {
                    const chip = STATUS_CHIP[user.status];
                    const isCopied = copiedId === user.id;
                    return (
                      <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Usuario + correo truncado copiable */}
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-full bg-cta-50 text-cta text-[11px] font-heading font-bold flex items-center justify-center shrink-0">
                              {user.initials}
                            </span>
                            <div className="min-w-0 max-w-[210px] leading-tight">
                              <p
                                className="font-heading font-semibold text-slate-900 text-xs sm:text-sm truncate"
                                title={user.name}
                              >
                                {user.name}
                              </p>
                              <div className="group/mail inline-flex items-center gap-1 max-w-full mt-0.5">
                                <span
                                  className="text-[11px] text-slate-400 truncate"
                                  title={user.email}
                                >
                                  {user.email}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyEmail(user.id, user.email)}
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
                            </div>
                          </div>
                        </td>

                        {/* Rol (texto limpio neutral, sin saturación de colores) */}
                        <td className="py-3 px-3 text-xs font-medium text-slate-700 whitespace-nowrap">
                          {user.role}
                        </td>

                        {/* Sucursal */}
                        <td className="py-3 px-3 text-xs text-slate-600 whitespace-nowrap">
                          {user.branch}
                        </td>

                        {/* Estado (chip lineal gris + puntito color + texto 950) */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold ${chip.pill}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${chip.dot}`} />
                            {user.status}
                          </span>
                        </td>

                        {/* Última actividad */}
                        <td className="py-3 px-3 text-xs text-slate-500 tabular-nums whitespace-nowrap">
                          {user.lastActivity}
                        </td>

                        {/* Acciones neutrales */}
                        <td className="py-3 pl-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setEditingUser(user)}
                              aria-label="Editar usuario"
                              title="Editar usuario"
                              className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <Pencil className="w-4 h-4" strokeWidth={1.7} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteUser(user.id)}
                              aria-label="Eliminar usuario"
                              title="Eliminar usuario"
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
              Mostrando {filteredUsers.length} de {users.length} usuarios
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: Matriz de permisos por módulo */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-slate-500 text-left">
              Define qué módulos ve cada rol. Los cambios se guardan y aplican en el panel al instante.
            </p>
            <div className="relative w-full sm:w-64">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                strokeWidth={1.6}
              />
              <input
                type="text"
                value={matrixSearch}
                onChange={(e) => setMatrixSearch(e.target.value)}
                placeholder="Buscar por nombre..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-transparent border border-slate-200 hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta text-xs sm:text-sm font-sans text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Tabla libre sin borde ni scroll interno */}
          <div className="text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 pr-4">Módulo</th>
                  {ROLES_LIST.map((role) => (
                    <th key={role} className="py-2.5 px-2 text-center">
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredModules.map((mod) => (
                  <tr key={mod.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 pr-4 font-heading font-semibold text-slate-900 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <span>{mod.label}</span>
                        {mod.locked && <Lock className="w-3 h-3 text-slate-400" strokeWidth={1.7} />}
                      </span>
                    </td>
                    {ROLES_LIST.map((role) => {
                      const enabled = mod.permissions[role];
                      const isLocked = role === 'Super Admin';
                      return (
                        <td key={role} className="py-3 px-2 text-center">
                          <button
                            type="button"
                            disabled={isLocked}
                            onClick={() => togglePermission(mod.id, role)}
                            aria-label={`${mod.label} - ${role}`}
                            className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-colors ${
                              enabled
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-slate-100 text-slate-400'
                            } ${isLocked ? 'cursor-default opacity-80' : 'hover:opacity-80 cursor-pointer'}`}
                          >
                            {enabled ? (
                              <Check className="w-3.5 h-3.5" strokeWidth={2.2} />
                            ) : (
                              <span className="text-xs leading-none">—</span>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Fila de Guardar cambios */}
                <tr className="border-t border-slate-200">
                  <td className="py-3 pr-4 text-xs text-slate-400">Guardar cambios</td>
                  {ROLES_LIST.map((role) => (
                    <td key={role} className="py-3 px-2 text-center">
                      {role === 'Super Admin' ? (
                        <span className="text-xs text-slate-300">—</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSaveRole(role)}
                          className="text-xs font-heading font-semibold text-cta hover:text-cta-700 transition-colors cursor-pointer"
                        >
                          {savedRole === role ? 'Guardado ✓' : 'Guardar'}
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de edición rápida de usuario */}
      {editingUser && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setEditingUser(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="user-modal-title"
        >
          <div
            className="w-full max-w-[440px] bg-white rounded-[24px] p-6 sm:p-7 border border-slate-200 relative text-left space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>

            <div className="pr-8">
              <h2
                id="user-modal-title"
                className="text-base sm:text-lg font-heading font-bold text-slate-900"
              >
                {editingUser.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{editingUser.email}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-heading font-semibold text-slate-700 mb-1.5">Rol asignado</p>
                <div className="flex flex-wrap gap-1.5">
                  {ROLES_LIST.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setUsers((prev) =>
                          prev.map((u) => (u.id === editingUser.id ? { ...u, role: r } : u))
                        );
                        setEditingUser((prev) => (prev ? { ...prev, role: r } : null));
                      }}
                      className={`px-3 py-1.5 rounded-xl font-heading font-semibold transition-colors cursor-pointer ${
                        editingUser.role === r
                          ? 'bg-cta-50 text-cta'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  const nextStatus: UserAccountStatus =
                    editingUser.status === 'Activo' ? 'Pausado' : 'Activo';
                  setUsers((prev) =>
                    prev.map((u) =>
                      u.id === editingUser.id ? { ...u, status: nextStatus } : u
                    )
                  );
                  setEditingUser(null);
                }}
                className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-heading font-semibold cursor-pointer"
              >
                {editingUser.status === 'Activo' ? 'Pausar usuario' : 'Reactivar usuario'}
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl bg-cta hover:bg-cta-600 text-white text-xs font-heading font-semibold cursor-pointer"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
