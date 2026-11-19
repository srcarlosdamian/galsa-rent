import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SingleDatePickerProps {
  value: string; // YYYY-MM-DD
  minDate?: string; // YYYY-MM-DD
  onChange: (date: string) => void;
  onClose?: () => void;
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const DAY_LABELS = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SÁ'];

function toIso(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export const SingleDatePicker: React.FC<SingleDatePickerProps> = ({
  value,
  minDate,
  onChange,
  onClose,
}) => {
  const initialDate = useMemo(() => {
    const parsed = value ? new Date(`${value}T12:00:00`) : new Date();
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [value]);

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  const todayIso = useMemo(() => {
    const now = new Date();
    return toIso(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const effectiveMin = minDate || todayIso;

  const days = useMemo(() => {
    const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
    const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: Array<{ day: number; iso: string } | null> = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      cells.push({ day: d, iso: toIso(viewYear, viewMonth, d) });
    }
    return cells;
  }, [viewYear, viewMonth]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <div className="w-[280px] bg-white rounded-2xl border border-slate-200/90 shadow-dropdown p-4 select-none">
      {/* Header mes y flechas */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-heading font-bold text-slate-900">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Mes siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-1.5 text-center">
        {DAY_LABELS.map((lbl) => (
          <span key={lbl} className="text-[10px] font-heading font-semibold text-slate-400 py-1">
            {lbl}
          </span>
        ))}
      </div>

      {/* Cuadrícula de días */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((cell, idx) => {
          if (!cell) {
            return <div key={`empty-${idx}`} className="h-8" />;
          }
          const isDisabled = cell.iso < effectiveMin;
          const isSelected = cell.iso === value;

          return (
            <button
              key={cell.iso}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                onChange(cell.iso);
                if (onClose) onClose();
              }}
              className={`h-8 w-8 mx-auto rounded-full text-xs font-heading font-semibold flex items-center justify-center transition-colors ${
                isSelected
                  ? 'bg-cta text-white'
                  : isDisabled
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-800 hover:bg-slate-100 cursor-pointer'
              }`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
