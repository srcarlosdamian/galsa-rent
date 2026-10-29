import React, { useState } from 'react';
import { 
  MapPin, Calendar, Search, ChevronDown, 
  Navigation, Globe, Plane, Building2, Train, Hotel,
  CarFront, Compass, Briefcase, Zap, Sparkles
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
  {
    id: 'all',
    title: 'Todos los vehículos',
    subtitle: 'Ver toda la flota disponible',
    icon: Sparkles,
    value: '',
  },
  {
    id: 'suv',
    title: 'SUV / Aventura',
    subtitle: 'Camionetas y espacio para viajes',
    icon: Compass,
    value: 'SUV / Aventura',
  },
  {
    id: 'sedan',
    title: 'Sedán / Negocios',
    subtitle: 'Confort ejecutivo y traslados urbanos',
    icon: Briefcase,
    value: 'Sedán / Negocios',
  },
  {
    id: 'deportivo',
    title: 'Deportivo / Estilo',
    subtitle: 'Diseño prémium y alta gama',
    icon: Zap,
    value: 'Deportivo / Estilo',
  },
];

export const SearchContainer: React.FC<SearchContainerProps> = ({
  searchState,
  onSearchChange,
  onExecuteSearch,
}) => {
  const [locationOpen, setLocationOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  // Función para autodetectar la ubicación al hacer clic en "Ubicación actual"
  const handleDetectCurrentLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      onSearchChange({ ...searchState, location: 'Mi ubicación actual' });
      setLocationOpen(false);
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`
          );
          if (res.ok) {
            const data = await res.json();
            const city = data.city || data.locality || data.principalSubdivision || '';
            const state = data.principalSubdivision || '';
            const country = data.countryName || 'México';

            let detectedStr = '';
            if (city && state && city !== state) {
              detectedStr = `${city}, ${state}`;
            } else if (city || state) {
              detectedStr = `${city || state}, ${country}`;
            } else {
              detectedStr = country;
            }

            onSearchChange({ ...searchState, location: detectedStr || 'Mi ubicación actual' });
          } else {
            onSearchChange({ ...searchState, location: 'Mi ubicación actual' });
          }
        } catch (e) {
          onSearchChange({ ...searchState, location: 'Mi ubicación actual' });
        } finally {
          setDetectingLocation(false);
          setLocationOpen(false);
        }
      },
      (_err) => {
        setDetectingLocation(false);
        onSearchChange({ ...searchState, location: 'Mi ubicación actual' });
        setLocationOpen(false);
      },
      { timeout: 8000, maximumAge: 600000 }
    );
  };

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
                        if (loc.id === 'current') {
                          handleDetectCurrentLocation();
                        } else {
                          onSearchChange({ ...searchState, location: loc.value });
                          setLocationOpen(false);
                        }
                      }}
                      className="w-full text-left p-2.5 rounded-[12px] hover:bg-slate-50 transition-colors flex items-center gap-3.5 group"
                    >
                      {/* Icon Container: Cuadrado con el mismo border radius de los botones (rounded-[8px]) */}
                      <div className="w-10 h-10 rounded-[8px] bg-slate-100 flex items-center justify-center shrink-0 text-slate-800 group-hover:bg-slate-200 transition-colors">
                        <Icon className="w-[18px] h-[18px]" strokeWidth={1.4} />
                      </div>

                      {/* Text info */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-heading font-medium text-slate-900 truncate flex items-center gap-2">
                          <span>{loc.title}</span>
                          {loc.id === 'current' && detectingLocation && (
                            <span className="text-[11px] font-normal text-blue-600 animate-pulse">
                              (Detectando...)
                            </span>
                          )}
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
        <div className="relative w-full lg:w-[220px]">
          <button
            type="button"
            onClick={() => {
              setTypeOpen(!typeOpen);
              setLocationOpen(false);
              setCalendarOpen(false);
            }}
            className="w-full flex items-center justify-between gap-2.5 px-4 py-3.5 rounded-[8px] border border-slate-300 bg-white hover:border-slate-400 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <CarFront className="w-[18px] h-[18px] text-slate-700 shrink-0" strokeWidth={1.4} />
              <span className="font-heading text-[14px] text-slate-900 truncate">
                {searchState.category || 'Tipo de vehículo'}
              </span>
            </div>
            <ChevronDown className="w-[18px] h-[18px] text-slate-500 shrink-0" strokeWidth={1.4} />
          </button>

          {typeOpen && (
            <div 
              className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-[320px] bg-white rounded-[20px] border border-slate-200/80 shadow-2xl p-2.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1">
                {VEHICLE_TYPES.map((typeItem) => {
                  const Icon = typeItem.icon;
                  const isSelected = (!searchState.category && typeItem.value === '') || searchState.category === typeItem.value;
                  return (
                    <button
                      key={typeItem.id}
                      type="button"
                      onClick={() => {
                        onSearchChange({
                          ...searchState,
                          category: typeItem.value,
                        });
                        setTypeOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-[12px] hover:bg-slate-50 transition-colors flex items-center gap-3.5 group ${
                        isSelected ? 'bg-slate-50/80' : ''
                      }`}
                    >
                      {/* Icon Container: Cuadrado con el mismo border radius de los botones (rounded-[8px]) */}
                      <div className="w-10 h-10 rounded-[8px] bg-slate-100 flex items-center justify-center shrink-0 text-slate-800 group-hover:bg-slate-200 transition-colors">
                        <Icon className="w-[18px] h-[18px]" strokeWidth={1.4} />
                      </div>

                      {/* Text info */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-heading font-medium text-slate-900 truncate">
                          {typeItem.title}
                        </p>
                        {typeItem.subtitle && (
                          <p className="text-[12px] font-heading font-normal text-slate-500 truncate mt-0.5">
                            {typeItem.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
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
