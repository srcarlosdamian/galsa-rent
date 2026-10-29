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
        // Mismo día
        onChange(dateStr, dateStr);
        if (onClose) onClose();
      } else {
        // Cierra el rango
        onChange(startDate, dateStr);
        if (onClose) onClose();
      }
    }
  };

  const renderMonth = (year: number, month: number, showLeftArrow = false, showRightArrow = false) => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Domingo
    const totalDays = new Date(year, month + 1, 0).getDate();

    const blanks = Array.from({ length: firstDayIndex });
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);

    return (
      <div className="flex-1 min-w-[260px] sm:min-w-[280px]">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 h-9">
          {showLeftArrow ? (
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Mes anterior"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.4} />
            </button>
          ) : (
            <div className="w-7" />
          )}

          <h3 className="font-heading font-bold text-[16px] sm:text-[18px] text-slate-900 tracking-tight">
            {MONTH_NAMES[month]} {year}
          </h3>

          {showRightArrow ? (
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Mes siguiente"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1.4} />
            </button>
          ) : (
            <div className="w-7" />
          )}
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1 sm:mb-2">
          {DAYS_HEADER.map((day) => (
            <span key={day} className="text-[11px] sm:text-[12px] font-heading font-medium text-slate-400 py-0.5 sm:py-1">
              {day}
            </span>
          ))}
        </div>

        {/* Day Grid */}
        <div className="grid grid-cols-7 gap-y-1 text-center">
          {blanks.map((_, i) => (
            <div key={`blank-${i}`} className="h-8 w-8 sm:h-9 sm:w-9" />
          ))}

          {days.map((day) => {
            const dateStr = formatIso(year, month, day);
            const isPast = isBeforeToday(dateStr);
            const isStart = startDate === dateStr;
            const isEnd = endDate === dateStr;
            const inRange = startDate && endDate && dateStr > startDate && dateStr < endDate;

            let buttonClass = 'h-8 w-8 sm:h-9 sm:w-9 mx-auto rounded-full text-[13px] sm:text-[14px] font-heading flex items-center justify-center transition-colors ';
            let containerClass = 'relative flex items-center justify-center ';

            if (isPast) {
              buttonClass += 'text-slate-300 cursor-not-allowed';
            } else if (isStart || isEnd) {
              buttonClass += 'bg-black text-white font-bold';
            } else if (inRange) {
              buttonClass += 'text-slate-900 font-medium hover:bg-slate-100';
              containerClass += 'bg-slate-100';
            } else {
              buttonClass += 'text-slate-800 font-medium hover:bg-slate-100 cursor-pointer';
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
      className="bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 shadow-2xl border border-slate-200/80 animate-in fade-in-50 zoom-in-95 duration-150 select-none max-w-[calc(100vw-32px)] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
        {renderMonth(currentYear, currentMonth, true, false)}
        <div className="hidden md:block">
          {renderMonth(nextMonthYear, nextMonth, false, true)}
        </div>
      </div>

      {/* Footer info & acciones: Rango en 1 línea completa, y botones Borrar/Aplicar en otra línea */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex flex-col gap-3 text-xs">
        {/* Línea 1: Rango completo */}
        <div className="flex items-center gap-2 text-slate-600 whitespace-nowrap">
          <span className="font-heading font-medium text-slate-500">Rango:</span>
          <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-900 font-semibold text-xs font-mono">
            {startDate ? startDate : 'Fecha inicio'}
          </span>
          <span className="text-slate-400">→</span>
          <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-900 font-semibold text-xs font-mono">
            {endDate ? endDate : 'Fecha devolución'}
          </span>
        </div>

        {/* Línea 2: Botones Borrar y Aplicar alineados a la derecha */}
        <div className="flex items-center justify-end gap-3 pt-1">
          {(startDate || endDate) && (
            <button
              type="button"
              onClick={() => onChange('', '')}
              className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 font-heading font-medium hover:bg-slate-100 transition-colors text-xs"
            >
              Borrar
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-black text-white font-heading font-semibold hover:bg-slate-800 transition-colors text-xs"
            >
              Aplicar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
