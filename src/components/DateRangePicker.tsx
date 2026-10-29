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
      <div className="flex-1 min-w-[280px]">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-4 h-9">
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

          <h3 className="font-heading font-bold text-[18px] text-slate-900 tracking-tight">
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
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {DAYS_HEADER.map((day) => (
            <span key={day} className="text-[12px] font-heading font-medium text-slate-400 py-1">
              {day}
            </span>
          ))}
        </div>

        {/* Day Grid */}
        <div className="grid grid-cols-7 gap-y-1 text-center">
          {blanks.map((_, i) => (
            <div key={`blank-${i}`} className="h-9 w-9" />
          ))}

          {days.map((day) => {
            const dateStr = formatIso(year, month, day);
            const isPast = isBeforeToday(dateStr);
            const isStart = startDate === dateStr;
            const isEnd = endDate === dateStr;
            const inRange = startDate && endDate && dateStr > startDate && dateStr < endDate;

            let buttonClass = 'h-9 w-9 mx-auto rounded-full text-[14px] font-heading flex items-center justify-center transition-colors ';
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
      className="bg-white rounded-[24px] p-6 shadow-2xl border border-slate-200/80 animate-in fade-in-50 zoom-in-95 duration-150 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {renderMonth(currentYear, currentMonth, true, false)}
        {renderMonth(nextMonthYear, nextMonth, false, true)}
      </div>

      {/* Footer info & acciones */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="font-heading font-medium">Selección:</span>
          <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-900 font-semibold">
            {startDate ? startDate : 'Fecha de inicio'}
          </span>
          <span>→</span>
          <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-900 font-semibold">
            {endDate ? endDate : 'Fecha de devolución'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {(startDate || endDate) && (
            <button
              type="button"
              onClick={() => onChange('', '')}
              className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 font-heading font-medium hover:bg-slate-100 transition-colors"
            >
              Borrar fechas
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-black text-white font-heading font-semibold hover:bg-slate-800 transition-colors"
            >
              Aplicar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
