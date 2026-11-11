import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string; // 'YYYY-MM-DD'
  endDate: string;   // 'YYYY-MM-DD'
  onChange: (start: string, end: string) => void;
  onClose?: () => void;
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const DAYS_HEADER = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SÁ'];

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  onClose,
}) => {
  // Inicializamos en la fecha actual o la fecha seleccionada
  const initialBaseDate = startDate ? new Date(startDate + 'T00:00:00') : new Date();
  const [currentYear, setCurrentYear] = useState(initialBaseDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialBaseDate.getMonth()); // 0-indexed

  // Segundo mes consecutivo
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatIso = (year: number, month: number, day: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const todayStr = () => {
    const d = new Date();
    return formatIso(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const isBeforeToday = (dateStr: string) => {
    return dateStr < todayStr();
  };

  const handleDateClick = (dateStr: string) => {
    if (isBeforeToday(dateStr)) return;

    if (!startDate || (startDate && endDate)) {
      // Comenzar nuevo rango
      onChange(dateStr, '');
    } else if (startDate && !endDate) {
      if (dateStr < startDate) {
        // Si selecciona una fecha previa a la de inicio, se vuelve la nueva fecha de inicio
        onChange(dateStr, '');
      } else if (dateStr === startDate) {
        // Mismo día (no auto-cerrar, el usuario debe pulsar "Aplicar")
        onChange(dateStr, dateStr);
      } else {
        // Cierra el rango seleccionando ambas fechas (no auto-cerrar, el usuario debe pulsar "Aplicar")
        onChange(startDate, dateStr);
      }
    }
  };

  const renderMonth = (year: number, month: number, showLeftArrow = false, showRightArrow = false) => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Domingo
    const totalDays = new Date(year, month + 1, 0).getDate();

    const blanks = Array.from({ length: firstDayIndex });
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);

    return (
      <div className="flex-1 min-w-[280px] sm:min-w-[300px]">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          {showLeftArrow ? (
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
              aria-label="Mes anterior"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
          ) : (
            <div className="w-10" />
          )}

          <h3 className="font-heading font-bold text-lg sm:text-xl text-neutral-900 tracking-tight">
            {MONTH_NAMES[month]} <span className="font-semibold text-neutral-500">{year}</span>
          </h3>

          {showRightArrow ? (
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
              aria-label="Mes siguiente"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1.5 text-center mb-2 sm:mb-3">
          {DAYS_HEADER.map((day) => (
            <span key={day} className="text-xs sm:text-sm font-heading font-semibold text-neutral-400 py-1 sm:py-2 uppercase tracking-wide">
              {day}
            </span>
          ))}
        </div>

        {/* Day Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {blanks.map((_, i) => (
            <div key={`blank-${i}`} className="h-9 sm:h-10 w-9 sm:w-10" />
          ))}

          {days.map((day) => {
            const dateStr = formatIso(year, month, day);
            const isPast = isBeforeToday(dateStr);
            const isStart = startDate === dateStr;
            const isEnd = endDate === dateStr;
            const inRange = startDate && endDate && dateStr > startDate && dateStr < endDate;

            let buttonClass = 'h-9 sm:h-10 w-9 sm:w-10 mx-auto rounded-lg text-sm sm:text-base font-heading flex items-center justify-center transition-all ';
            let containerClass = 'relative flex items-center justify-center ';

            if (isPast) {
              buttonClass += 'text-neutral-300 cursor-not-allowed';
            } else if (isStart || isEnd) {
              buttonClass += 'bg-blue-500 text-white font-bold shadow-md';
            } else if (inRange) {
              buttonClass += 'text-neutral-900 font-medium hover:bg-blue-100 bg-blue-50';
              containerClass += '';
            } else {
              buttonClass += 'text-neutral-700 font-medium hover:bg-neutral-100 cursor-pointer';
            }

            return (
              <div key={day} className={containerClass}>
                <button
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDateClick(dateStr)}
                  className={buttonClass}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral-100 animate-in fade-in-50 zoom-in-95 duration-150 select-none max-w-[calc(100vw-32px)] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Selected dates summary */}
      {(startDate || endDate) && (
        <div className="mb-6 pb-6 border-b border-neutral-100">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Fechas seleccionadas</p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-neutral-600 mb-1">Recogida</p>
              <p className="text-lg font-bold text-neutral-900">{startDate || '—'}</p>
            </div>
            <div className="flex-1">
              <p className="text-xs text-neutral-600 mb-1">Devolución</p>
              <p className="text-lg font-bold text-neutral-900">{endDate || '—'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Calendars */}
      <div className="flex flex-col lg:flex-row gap-8">
        {renderMonth(currentYear, currentMonth, true, false)}
        <div className="hidden lg:block">
          {renderMonth(nextMonthYear, nextMonth, false, true)}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onChange('', '')}
          className="px-4 py-2.5 rounded-lg text-neutral-600 hover:text-neutral-900 font-heading font-medium hover:bg-neutral-50 transition-colors text-sm"
        >
          Limpiar
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={!startDate || !endDate}
            className="px-6 py-2.5 rounded-lg bg-blue-500 text-white font-heading font-semibold hover:bg-blue-600 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors text-sm"
          >
            Aplicar
          </button>
        )}
      </div>
    </div>
  );
};
