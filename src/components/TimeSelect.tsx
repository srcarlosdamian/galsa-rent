import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Clock } from 'lucide-react';

interface TimeSelectProps {
  value: string;
  onChange: (time: string) => void;
  label: string;
  placeholder?: string;
  timeOptions?: string[];
}

const DEFAULT_TIME_OPTIONS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00'
];

export const TimeSelect: React.FC<TimeSelectProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Selecciona una hora',
  timeOptions = DEFAULT_TIME_OPTIONS,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block text-xs font-heading font-medium text-neutral-700 mb-2">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2.5 px-4 py-3 rounded-[12px] border border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <Clock className="w-[18px] h-[18px] text-neutral-700 shrink-0" strokeWidth={1.4} />
          <span className={`font-medium text-[14px] ${value ? 'text-neutral-900' : 'text-neutral-500'}`}>
            {value || placeholder}
          </span>
        </div>
        <ChevronDown 
          className={`w-[18px] h-[18px] text-neutral-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          strokeWidth={1.4} 
        />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-full bg-white rounded-[16px] border border-neutral-200/80 shadow-lg p-2 z-[50] max-h-[300px] overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-1">
            {timeOptions.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleSelect(time)}
                className={`w-full text-left px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
                  value === time
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
