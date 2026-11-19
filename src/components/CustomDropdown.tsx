import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Clock } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: string | number }>;
}

const getTimeSubtitle = (time: string): string => {
  const hour = parseInt(time.split(':')[0], 10);
  if (hour === 7) return 'Mañana · Entrega temprana';
  if (hour >= 8 && hour <= 11) return 'Mañana · Horario de sucursal';
  if (hour >= 12 && hour <= 14) return 'Mediodía · Horario de sucursal';
  if (hour >= 15 && hour <= 18) return 'Tarde · Horario de sucursal';
  if (hour >= 19 && hour <= 20) return 'Tarde-noche · Últimas entregas';
  return 'Noche · Entrega programada';
};

export const TIME_DROPDOWN_OPTIONS: DropdownOption[] = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00',
].map((t) => ({
  value: t,
  label: `${t} hrs`,
  subtitle: getTimeSubtitle(t),
  icon: Clock,
}));

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  triggerIcon?: React.ComponentType<{ className?: string; strokeWidth?: string | number }>;
  size?: 'sm' | 'md';
  align?: 'left' | 'right';
  menuWidthClass?: string;
  footer?: React.ReactNode;
  buttonClassName?: string;
  displayValue?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar opción',
  triggerIcon: TriggerIcon,
  size = 'md',
  align = 'left',
  menuWidthClass = 'w-full min-w-[230px]',
  footer,
  buttonClassName = '',
  displayValue,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleOutside);
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  const selectedOption = options.find((opt) => opt.value === value);
  const shownText = displayValue ?? selectedOption?.label ?? '';

  const sizeClasses = size === 'sm' ? 'px-3 py-2 rounded-xl text-xs' : 'px-3.5 py-2.5 rounded-xl text-sm';

  return (
    <div ref={wrapperRef} className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2 border bg-white font-heading font-semibold text-left transition-all cursor-pointer ${sizeClasses} ${
          open
            ? 'border-blue-500 ring-2 ring-blue-500/15'
            : 'border-slate-300 hover:border-slate-400'
        } ${buttonClassName}`}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {TriggerIcon && <TriggerIcon className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={1.5} />}
          <span className={`truncate ${shownText ? 'text-slate-900 font-semibold' : 'text-slate-500 font-medium'}`}>
            {shownText || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180 text-blue-600' : 'text-slate-500'
          }`}
          strokeWidth={1.6}
        />
      </button>

      {open && (
        <div
          className={`absolute top-full ${
            align === 'right' ? 'right-0' : 'left-0'
          } mt-2 ${menuWidthClass} bg-white rounded-[20px] border border-slate-200/80 shadow-2xl p-2 z-[70] max-h-[280px] overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-150`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-1">
            {options.map((opt) => {
              const Icon = opt.icon;
              const isSelected = opt.value === value;
              return (
                <button
                  key={`${opt.value}-${opt.label}`}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-[12px] transition-colors flex items-center gap-3 group cursor-pointer ${
                    isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                  }`}
                >
                  {Icon && (
                    <div
                      className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-100/80 text-blue-700'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-heading font-semibold text-slate-900 truncate">
                      {opt.label}
                    </p>
                    {opt.subtitle && (
                      <p className="text-[11px] font-sans text-slate-500 truncate mt-0.5">
                        {opt.subtitle}
                      </p>
                    )}
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" strokeWidth={2.2} />}
                </button>
              );
            })}
          </div>

          {footer && (
            <div className="mt-2 pt-2 border-t border-slate-100 text-center text-[11px] font-heading text-slate-400">
              {footer}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
