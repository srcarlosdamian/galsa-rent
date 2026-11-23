import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  summary: React.ReactNode;
  className?: string;
}

/**
 * Paginador minimalista adaptable:
 * - Mobile (< sm): resumen centrado + barra limpia [Anterior] [1 / N] [Siguiente] sin saltos de línea.
 * - Desktop (sm+): resumen a la izquierda + controles numéricos con flechas a la derecha.
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  summary,
  className = 'mt-8',
}) => {
  if (totalPages <= 1) return null;

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav
      aria-label="Paginación"
      className={`${className} pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5`}
    >
      <p className="text-xs text-slate-500 font-heading text-center sm:text-left">
        {summary}
      </p>

      {/* Mobile (< sm): Anterior · X / Y · Siguiente alineado sin cortes */}
      <div className="flex sm:hidden items-center justify-between gap-2 w-full">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
          className="inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-heading font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed transition-all whitespace-nowrap shrink-0 cursor-pointer"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
          <span>Anterior</span>
        </button>

        <span className="text-xs font-heading font-semibold text-slate-700 tabular-nums whitespace-nowrap px-2">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          disabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
          className="inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-heading font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed transition-all whitespace-nowrap shrink-0 cursor-pointer"
          aria-label="Página siguiente"
        >
          <span>Siguiente</span>
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>

      {/* Tablet / Desktop (sm+): flechas + páginas numeradas */}
      <div className="hidden sm:flex items-center justify-end gap-1.5">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={1.8} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`w-9 h-9 rounded-xl text-xs font-heading font-bold tabular-nums transition-colors cursor-pointer ${
              currentPage === page
                ? 'bg-cta text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Página siguiente"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </div>
    </nav>
  );
};
