import React, { useState } from 'react';
import { 
  MapPin, Calendar, Search, ChevronDown, 
  Navigation, Globe, Plane, Building2, Train, Hotel 
} from 'lucide-react';
import { SearchState } from '../types/vehicle';
import { DateRangePicker } from './DateRangePicker';

interface SearchContainerProps {
  searchState: SearchState;
  onSearchChange: (newSearch: SearchState) => void;
  onExecuteSearch: () => void;
  totalResultsCount: number;
}

const LOCATION_OPTIONS = [
  {
    id: 'current',
    title: 'Ubicación actual',
    subtitle: null,
    icon: Navigation,
    value: 'Mi ubicación actual',
  },
  {
    id: 'anywhere',
    title: 'Cualquier lugar',
    subtitle: 'Ver todos los autos',
    icon: Globe,
    value: '',
  },
  {
    id: 'durango-main',
    title: 'Sucursal Plaza 450, Durango',
    subtitle: 'Punto oficial de entrega · Blvd. Guadiana',
    icon: Building2,
    value: 'Sucursal Plaza 450, Durango',
  },
  {
    id: 'dgo-airport',
    title: 'DGO – Aeropuerto Internacional de Durango',
    subtitle: 'Entrega programada en terminal aérea',
    icon: Plane,
    value: 'Aeropuerto Internacional de Durango (DGO)',
  },
  {
    id: 'centro-durango',
    title: 'Centro Histórico, Durango',
    subtitle: 'Zona turística y comercial',
    icon: Hotel,
    value: 'Centro Histórico, Durango',
  },
  {
    id: 'central-camionera',
    title: 'Central de Autobuses de Durango',
    subtitle: 'Terminal terrestre Blvd. Francisco Villa',
    icon: Train,
    value: 'Central de Autobuses de Durango',
  },
];

const VEHICLE_TYPES = [
  'Todos los vehículos',
  'SUV / Aventura',
  'Sedán / Negocios',
  'Deportivo / Estilo',
];

export const SearchContainer: React.FC<SearchContainerProps> = ({
  searchState,
  onSearchChange,
  onExecuteSearch,
}) => {
  const [locationOpen, setLocationOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Formateador amigable de fechas en español
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    if (!y || !m || !d) return dateStr;
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${d} ${months[parseInt(m, 10) - 1]}`;
  };

  return (
    <div className="w-full bg-white rounded-[16px] p-3 sm:p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onExecuteSearch();
        }}
        className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4"
      >
        {/* Field 1: Selecciona un lugar (Con dropdown inspirado en Turo / Google Places) */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => {
              setLocationOpen(!locationOpen);
              setTypeOpen(false);
            }}
            className="w-full flex items-center justify-between gap-2.5 px-4 py-3.5 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <MapPin className="w-[18px] h-[18px] text-slate-700 shrink-0" strokeWidth={1.4} />
              <span className="font-heading text-[14px] text-slate-900 truncate">
                {searchState.location || 'Selecciona un lugar'}
              </span>
            </div>
            <ChevronDown className="w-[18px] h-[18px] text-slate-500 shrink-0" strokeWidth={1.4} />
          </button>

          {/* Dropdown flotante con iconos en cápsula gris y strokeWidth=1.4 */}
          {locationOpen && (
            <div 
              className="absolute top-full left-0 mt-2 w-full sm:w-[380px] bg-white rounded-[20px] border border-slate-200/80 shadow-2xl p-2.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1">
                {LOCATION_OPTIONS.map((loc) => {
                  const Icon = loc.icon;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => {
                        onSearchChange({ ...searchState, location: loc.value });
                        setLocationOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-[12px] hover:bg-slate-50 transition-colors flex items-center gap-3.5 group"
                    >
                      {/* Icon Container: Gray circle background */}
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-800 group-hover:bg-slate-200 transition-colors">
                        <Icon className="w-[18px] h-[18px]" strokeWidth={1.4} />
                      </div>

                      {/* Text info */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-heading font-medium text-slate-900 truncate">
                          {loc.title}
                        </p>
                        {loc.subtitle && (
                          <p className="text-[12px] font-heading font-normal text-slate-500 truncate mt-0.5">
                            {loc.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer Powered by Google sutil */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-heading">
                <span>powered by</span>
                <span className="font-semibold text-slate-600">Google</span>
              </div>
            </div>
          )}
        </div>

        {/* Field 2 & 3: Selector de Fechas (Rango con calendario Airbnb/Virtuo interactivo) */}
        <div className="relative flex flex-col sm:flex-row items-center gap-3 sm:gap-2">
          {/* Fecha de inicio button */}
          <button
            type="button"
            onClick={() => {
              setCalendarOpen(!calendarOpen);
              setLocationOpen(false);
              setTypeOpen(false);
            }}
            className="w-full sm:w-[170px] lg:w-[165px] flex items-center justify-between gap-2 px-4 py-3.5 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 transition-colors text-left"
          >
            <span className="font-heading text-[14px] text-slate-900 truncate">
              {searchState.startDate ? formatDisplayDate(searchState.startDate) : 'Fecha de inicio'}
            </span>
            <Calendar className="w-[18px] h-[18px] text-slate-700 shrink-0" strokeWidth={1.4} />
          </button>

          {/* Fecha de devolución button */}
          <button
            type="button"
            onClick={() => {
              setCalendarOpen(!calendarOpen);
              setLocationOpen(false);
              setTypeOpen(false);
            }}
            className="w-full sm:w-[170px] lg:w-[165px] flex items-center justify-between gap-2 px-4 py-3.5 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 transition-colors text-left"
          >
            <span className="font-heading text-[14px] text-slate-900 truncate">
              {searchState.endDate ? formatDisplayDate(searchState.endDate) : 'Fecha de devolución'}
            </span>
            <Calendar className="w-[18px] h-[18px] text-slate-700 shrink-0" strokeWidth={1.4} />
          </button>

          {/* Modal flotante de Calendario (Doble mes, estilo Airbnb/Virtuo en español) */}
          {calendarOpen && (
            <div className="absolute top-full left-0 sm:left-auto sm:right-0 lg:left-0 mt-3 z-50 max-w-[95vw] sm:max-w-none">
              <DateRangePicker
                startDate={searchState.startDate}
                endDate={searchState.endDate}
                onChange={(start, end) => {
                  onSearchChange({
                    ...searchState,
                    startDate: start,
                    endDate: end,
                  });
                }}
                onClose={() => setCalendarOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Field 4: Tipo de vehículo */}
        <div className="relative w-full lg:w-[190px]">
          <button
            type="button"
            onClick={() => {
              setTypeOpen(!typeOpen);
              setLocationOpen(false);
            }}
            className="w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 transition-colors text-left"
          >
            <span className="font-heading text-[14px] text-slate-900 truncate">
              {searchState.category || 'Tipo de vehículo'}
            </span>
            <ChevronDown className="w-[18px] h-[18px] text-slate-500 shrink-0" strokeWidth={1.4} />
          </button>

          {typeOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl border border-slate-200 shadow-xl p-2 z-50">
              {VEHICLE_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    onSearchChange({
                      ...searchState,
                      category: type === 'Todos los vehículos' ? '' : type,
                    });
                    setTypeOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-heading font-medium hover:bg-slate-100 transition-colors text-slate-900"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Submit Button (Figma: size-[48px] rounded-[8px] bg-[#3d63ff], sin sombra) */}
        <button
          type="submit"
          style={{ backgroundColor: '#3D63FF' }}
          className="w-full lg:w-[48px] h-[48px] rounded-[8px] flex items-center justify-center text-white shrink-0 hover:brightness-105 active:scale-95 transition-all"
          aria-label="Buscar vehículos"
        >
          <Search className="w-[18px] h-[18px]" strokeWidth={1.4} />
        </button>
      </form>
    </div>
  );
};
