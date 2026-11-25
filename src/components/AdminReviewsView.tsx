import React, { useState, useMemo } from 'react';
import {
  Star,
  MessageSquare,
  Clock,
  CheckCircle2,
  Search,
  Eye,
  EyeOff,
  Trash2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { CustomDropdown, DropdownOption } from './CustomDropdown';

export type ReviewType = 'Vehículo' | 'Cliente' | 'Anfitrión';
export type ReviewStatus = 'Pendiente' | 'Publicada' | 'Oculta' | 'Rechazada';
export type ReviewChannel = 'Marketplace' | 'Renta tradicional';

export interface AdminReview {
  id: string;
  initials: string;
  author: string;
  date: string;
  rating: number;
  target: string;
  type: ReviewType;
  channel: ReviewChannel;
  comment: string;
  status: ReviewStatus;
}

const INITIAL_REVIEWS: AdminReview[] = [
  {
    id: 'rev-1',
    initials: 'FL',
    author: 'Fer López',
    date: '16 ago 2026',
    rating: 5.0,
    target: 'Toyota(Ejemplo) Corolla 2024',
    type: 'Vehículo',
    channel: 'Marketplace',
    comment: '⭐',
    status: 'Pendiente',
  },
  {
    id: 'rev-2',
    initials: 'RP',
    author: 'Reseña Pendiente',
    date: '12 jul 2026',
    rating: 1.0,
    target: 'Mazda CX-30 2023',
    type: 'Vehículo',
    channel: 'Marketplace',
    comment: 'Reseña que GALSA todavía no aprobó — no debe verse.',
    status: 'Pendiente',
  },
  {
    id: 'rev-3',
    initials: 'RG',
    author: 'Roberto Guzmán',
    date: '10 jul 2026',
    rating: 5.0,
    target: 'Mazda CX-30 2023',
    type: 'Vehículo',
    channel: 'Marketplace',
    comment: 'Auto impecable, la entrega fue puntual. Muy recomendable.',
    status: 'Publicada',
  },
  {
    id: 'rev-4',
    initials: 'AI',
    author: 'Ajeno Invisible',
    date: '08 jul 2026',
    rating: 5.0,
    target: 'Kia Rio 2022',
    type: 'Vehículo',
    channel: 'Marketplace',
    comment: 'Reseña de un auto de otro anfitrión — no debe verse.',
    status: 'Publicada',
  },
  {
    id: 'rev-5',
    initials: 'ME',
    author: 'María Elena Ortiz',
    date: '06 jul 2026',
    rating: 5.0,
    target: 'Toyota Avanza 2021',
    type: 'Vehículo',
    channel: 'Marketplace',
    comment: 'Excelente anfitrión, todo tal cual la publicación.',
    status: 'Publicada',
  },
  {
    id: 'rev-6',
    initials: 'CM',
    author: 'Carlos Medina',
    date: '05 jul 2026',
    rating: 5.0,
    target: 'Roberto Guzmán',
    type: 'Cliente',
    channel: 'Marketplace',
    comment: 'Cliente responsable, devolvió el auto impecable y a tiempo.',
    status: 'Publicada',
  },
  {
    id: 'rev-7',
    initials: 'RG',
    author: 'Roberto Guzmán',
    date: '05 jul 2026',
    rating: 5.0,
    target: 'Jeep Wrangler 2022',
    type: 'Vehículo',
    channel: 'Marketplace',
    comment: 'Excelente estado, entrega puntual y proceso muy profesional. Repetiré sin duda.',
    status: 'Publicada',
  },
  {
    id: 'rev-8',
    initials: 'PD',
    author: 'Pendiente Distribución',
    date: '02 jul 2026',
    rating: 1.0,
    target: 'Honda City 2022',
    type: 'Vehículo',
    channel: 'Marketplace',
    comment: 'No aprobada — no cuenta.',
    status: 'Pendiente',
  },
  {
    id: 'rev-9',
    initials: 'ME',
    author: 'María Elena Ortiz',
    date: '02 jul 2026',
    rating: 5.0,
    target: 'Chevrolet Onix 2023',
    type: 'Vehículo',
    channel: 'Renta tradicional',
    comment: 'Auto económico, limpio y rendidor. La sucursal de Providencia muy atenta.',
    status: 'Publicada',
  },
  {
    id: 'rev-10',
    initials: 'R1',
    author: 'Reseña 1★ #1',
    date: '01 jul 2026',
    rating: 1.0,
    target: 'Honda City 2022',
    type: 'Vehículo',
    channel: 'Marketplace',
    comment: 'Reseña de prueba de distribución.',
    status: 'Publicada',
  },
  {
    id: 'rev-11',
    initials: 'R2',
    author: 'Reseña 2★ #1',
    date: '01 jul 2026',
    rating: 2.0,
    target: 'Honda City 2022',
    type: 'Vehículo',
    channel: 'Marketplace',
    comment: 'Reseña de prueba de distribución.',
    status: 'Publicada',
  },
  {
    id: 'rev-12',
    initials: 'R3',
    author: 'Reseña 3★ #2',
    date: '01 jul 2026',
    rating: 3.0,
    target: 'Honda City 2022',
    type: 'Vehículo',
    channel: 'Marketplace',
    comment: 'Reseña de prueba de distribución.',
    status: 'Publicada',
  },
  {
    id: 'rev-13',
    initials: 'LS',
    author: 'Lucía Sánchez',
    date: '29 jun 2026',
    rating: 5.0,
    target: 'Andrés Morales',
    type: 'Anfitrión',
    channel: 'Marketplace',
    comment: 'Anfitrión súper atento, explicó todo sobre el vehículo y respondió rápido.',
    status: 'Publicada',
  },
  {
    id: 'rev-14',
    initials: 'JG',
    author: 'Javier Gómez',
    date: '27 jun 2026',
    rating: 4.0,
    target: 'Volkswagen Virtus 2024',
    type: 'Vehículo',
    channel: 'Renta tradicional',
    comment: 'Muy buen manejo en carretera, entrega ágil en aeropuerto.',
    status: 'Pendiente',
  },
];

const TYPE_TABS: Array<'Todas' | ReviewType> = ['Todas', 'Vehículo', 'Cliente', 'Anfitrión'];

const STATUS_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Todos los estados', subtitle: 'Mostrar todo el historial', icon: SlidersHorizontal },
  { value: 'Pendiente', label: 'Pendiente', subtitle: 'Por moderar', icon: Clock },
  { value: 'Publicada', label: 'Publicada', subtitle: 'Visibles en plataforma', icon: CheckCircle2 },
  { value: 'Oculta', label: 'Oculta', subtitle: 'Ocultadas por admin', icon: EyeOff },
  { value: 'Rechazada', label: 'Rechazada', subtitle: 'No aprobadas', icon: X },
];

const STATUS_BADGE: Record<ReviewStatus, { pill: string; dot: string }> = {
  Pendiente: { pill: 'border border-slate-200 bg-transparent text-amber-950', dot: 'bg-amber-500' },
  Publicada: { pill: 'border border-slate-200 bg-transparent text-emerald-950', dot: 'bg-emerald-500' },
  Oculta: { pill: 'border border-slate-200 bg-transparent text-slate-950', dot: 'bg-slate-400' },
  Rechazada: { pill: 'border border-slate-200 bg-transparent text-red-950', dot: 'bg-red-500' },
};

const PAGE_SIZE = 10;

const StarRow: React.FC<{ rating: number }> = ({ rating }) => {
  const filled = Math.round(rating);
  return (
    <div className="inline-flex items-center gap-1">
      <div className="inline-flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= filled ? 'text-amber-500 fill-amber-500' : 'text-slate-200 fill-slate-200'
            }`}
            strokeWidth={1.6}
          />
        ))}
      </div>
      <span className="text-xs font-heading font-semibold text-slate-700 tabular-nums ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export const AdminReviewsView: React.FC = () => {
  const [reviews, setReviews] = useState<AdminReview[]>(INITIAL_REVIEWS);
  const [typeFilter, setTypeFilter] = useState<'Todas' | ReviewType>('Todas');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const filteredReviews = useMemo(() => {
    const q = search.trim().toLowerCase();
    return reviews.filter((r) => {
      if (typeFilter !== 'Todas' && r.type !== typeFilter) return false;
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (!q) return true;
      return (
        r.author.toLowerCase().includes(q) ||
        r.target.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q) ||
        r.channel.toLowerCase().includes(q)
      );
    });
  }, [reviews, typeFilter, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedReviews = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredReviews.slice(start, start + PAGE_SIZE);
  }, [filteredReviews, safePage]);

  const avgRating = useMemo(() => {
    if (!reviews.length) return '0.0';
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const pendingCount = useMemo(
    () => reviews.filter((r) => r.status === 'Pendiente').length,
    [reviews]
  );
  const publishedCount = useMemo(
    () => reviews.filter((r) => r.status === 'Publicada').length,
    [reviews]
  );

  const updateStatus = (id: string, status: ReviewStatus) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    if (selectedReviewId === id) {
      setSelectedReviewId(null);
    }
  };

  const selectedIndex = useMemo(
    () => filteredReviews.findIndex((r) => r.id === selectedReviewId),
    [filteredReviews, selectedReviewId]
  );
  const selectedReview = selectedIndex >= 0 ? filteredReviews[selectedIndex] : null;

  const goModalPrev = () => {
    if (selectedIndex > 0) {
      setSelectedReviewId(filteredReviews[selectedIndex - 1].id);
    }
  };

  const goModalNext = () => {
    if (selectedIndex >= 0 && selectedIndex < filteredReviews.length - 1) {
      setSelectedReviewId(filteredReviews[selectedIndex + 1].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
          Reseñas
        </h1>
        <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
          Moderación de reseñas de vehículos, clientes y anfitriones: aprobar, rechazar u ocultar.
        </p>
      </div>

      {/* 4 KPIs superiores compactos: neutrales salvo Pendientes > 0 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
        <div className="rounded-2xl bg-slate-50 p-4 h-full flex flex-col justify-between text-left">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-sans font-medium text-slate-500">Rating promedio</span>
            <span className="w-7 h-7 rounded-lg bg-white text-slate-500 flex items-center justify-center shrink-0">
              <Star className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight leading-none tabular-nums">
              {avgRating}
            </p>
            <StarRow rating={Number(avgRating)} />
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 h-full flex flex-col justify-between text-left">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-sans font-medium text-slate-500">Total reseñas</span>
            <span className="w-7 h-7 rounded-lg bg-white text-slate-500 flex items-center justify-center shrink-0">
              <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight leading-none tabular-nums">
              {reviews.length}
            </p>
            <p className="text-[11px] font-sans text-slate-400 mt-1.5">Historial registrado</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 h-full flex flex-col justify-between text-left">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-sans font-medium text-slate-500">Pendientes</span>
            <span
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                pendingCount > 0 ? 'bg-amber-50 text-amber-800' : 'bg-white text-slate-500'
              }`}
            >
              <Clock className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight leading-none tabular-nums">
              {pendingCount}
            </p>
            <p className="text-[11px] font-sans text-slate-400 mt-1.5">Por revisar</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 h-full flex flex-col justify-between text-left">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-sans font-medium text-slate-500">Publicadas</span>
            <span className="w-7 h-7 rounded-lg bg-white text-slate-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight leading-none tabular-nums">
              {publishedCount}
            </p>
            <p className="text-[11px] font-sans text-slate-400 mt-1.5">Visibles en el sitio</p>
          </div>
        </div>
      </div>

      {/* Filtros directos (sin contenedor de color) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {TYPE_TABS.map((tab) => {
            const active = typeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setTypeFilter(tab);
                  setPage(1);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-cta-50 text-cta'
                    : 'bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="w-48">
            <CustomDropdown
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={(val) => {
                setStatusFilter(val);
                setPage(1);
              }}
              triggerIcon={SlidersHorizontal}
              align="right"
              menuWidthClass="w-60"
            />
          </div>

          <div className="relative w-full sm:w-56">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              strokeWidth={1.6}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar reseñas..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-transparent border border-slate-200 hover:border-slate-300 focus:border-cta focus:ring-1 focus:ring-cta text-xs sm:text-sm font-sans text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Tabla minimalista solo con borde */}
      <div className="rounded-2xl border border-slate-200 bg-transparent p-4 sm:p-5 text-left space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400">
                <th className="py-2.5 pr-4">Usuario</th>
                <th className="py-2.5 px-3">Referencia</th>
                <th className="py-2.5 px-3">Estrellas</th>
                <th className="py-2.5 px-3">Mensaje</th>
                <th className="py-2.5 px-3">Estatus</th>
                <th className="py-2.5 px-3">Moderación</th>
                <th className="py-2.5 pl-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedReviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-xs text-slate-400">
                    No hay reseñas que coincidan con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                paginatedReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Usuario */}
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-cta-50 text-cta text-[11px] font-heading font-bold flex items-center justify-center shrink-0">
                          {review.initials}
                        </span>
                        <div className="leading-tight">
                          <p className="font-heading font-semibold text-slate-900 text-xs sm:text-sm">
                            {review.author}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{review.date}</p>
                        </div>
                      </div>
                    </td>

                    {/* Referencia + Tipo + Canal */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <p className="font-sans font-medium text-slate-800 text-xs">{review.target}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-cta-50 text-cta text-[10px] font-heading font-semibold">
                          {review.type}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-heading font-semibold">
                          {review.channel}
                        </span>
                      </div>
                    </td>

                    {/* Estrellas */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <StarRow rating={review.rating} />
                    </td>

                    {/* Mensaje */}
                    <td className="py-3 px-3 max-w-[260px]">
                      <p className="text-xs font-sans text-slate-600 truncate" title={review.comment}>
                        “{review.comment}”
                      </p>
                    </td>

                    {/* Estatus */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold ${STATUS_BADGE[review.status].pill}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_BADGE[review.status].dot}`} />
                        {review.status}
                      </span>
                    </td>

                    {/* Columna particular de Moderación: Aprobar / Rechazar */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateStatus(review.id, 'Publicada')}
                          disabled={review.status === 'Publicada'}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-heading font-semibold transition-colors cursor-pointer ${
                            review.status === 'Publicada'
                              ? 'bg-emerald-50 text-emerald-700 opacity-50 cursor-default'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          <Check className="w-3 h-3" strokeWidth={2.2} />
                          <span>Aprobar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStatus(review.id, 'Rechazada')}
                          disabled={review.status === 'Rechazada'}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-heading font-semibold transition-colors cursor-pointer ${
                            review.status === 'Rechazada'
                              ? 'bg-slate-100 text-slate-400 opacity-50 cursor-default'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <X className="w-3 h-3" strokeWidth={2.2} />
                          <span>Rechazar</span>
                        </button>
                      </div>
                    </td>

                    {/* Iconos neutrales a la derecha: Ver (modal), Ocultar/Mostrar, Eliminar */}
                    <td className="py-3 pl-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedReviewId(review.id)}
                          aria-label="Ver reseña"
                          title="Ver reseña"
                          className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" strokeWidth={1.7} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              review.id,
                              review.status === 'Oculta' ? 'Publicada' : 'Oculta'
                            )
                          }
                          aria-label={review.status === 'Oculta' ? 'Mostrar reseña' : 'Ocultar reseña'}
                          title={review.status === 'Oculta' ? 'Mostrar reseña' : 'Ocultar reseña'}
                          className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <EyeOff className="w-4 h-4" strokeWidth={1.7} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteReview(review.id)}
                          aria-label="Eliminar reseña"
                          title="Eliminar reseña"
                          className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.7} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>
            Mostrando{' '}
            {filteredReviews.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
            {Math.min(safePage * PAGE_SIZE, filteredReviews.length)} de {filteredReviews.length}{' '}
            reseñas
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-heading font-semibold disabled:opacity-40 disabled:cursor-default transition-colors cursor-pointer"
            >
              Anterior
            </button>
            <span className="font-sans text-slate-500 px-1 tabular-nums">
              Página {safePage} de {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-heading font-semibold disabled:opacity-40 disabled:cursor-default transition-colors cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Modal de detalle de reseña (Patrón estándar del Sistema de Diseño: bg-black/50 backdrop-blur-xs, rounded-[24px], botón circular de cierre) */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedReviewId(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
        >
          <div
            className="w-full max-w-[540px] bg-white rounded-[24px] p-6 sm:p-7 border border-slate-200 relative text-left space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedReviewId(null)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>

            {/* Autor + Estatus */}
            <div className="flex items-start justify-between gap-3 pr-8">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-cta-50 text-cta text-xs font-heading font-bold flex items-center justify-center shrink-0">
                  {selectedReview.initials}
                </span>
                <div>
                  <h2
                    id="review-modal-title"
                    className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-tight"
                  >
                    {selectedReview.author}
                  </h2>
                  <p className="text-xs font-sans text-slate-500 mt-0.5">{selectedReview.date}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold ${STATUS_BADGE[selectedReview.status].pill}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_BADGE[selectedReview.status].dot}`} />
                {selectedReview.status}
              </span>
            </div>

            {/* Rating + Referencia */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <StarRow rating={selectedReview.rating} />
              <span className="text-slate-300">·</span>
              <span className="font-heading font-semibold text-slate-800">
                {selectedReview.target}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-cta-50 text-cta text-[10px] font-heading font-semibold">
                {selectedReview.type}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-heading font-semibold">
                {selectedReview.channel}
              </span>
            </div>

            {/* Comentario completo */}
            <div className="rounded-2xl bg-slate-50 p-4 text-sm font-sans text-slate-700 leading-relaxed">
              “{selectedReview.comment}”
            </div>

            {/* Footer del modal: Navegación Anterior / Siguiente + Acciones */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={selectedIndex <= 0}
                  onClick={goModalPrev}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-heading font-semibold disabled:opacity-40 disabled:cursor-default transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  disabled={selectedIndex < 0 || selectedIndex >= filteredReviews.length - 1}
                  onClick={goModalNext}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-heading font-semibold disabled:opacity-40 disabled:cursor-default transition-colors cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-400 tabular-nums ml-1">
                  {selectedIndex + 1} de {filteredReviews.length}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => updateStatus(selectedReview.id, 'Rechazada')}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-heading font-semibold transition-colors cursor-pointer"
                >
                  Rechazar
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(selectedReview.id, 'Publicada')}
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
