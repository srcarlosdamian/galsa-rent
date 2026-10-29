import React, { useState } from 'react';
import { MapPin, Calendar, Search, ChevronDown } from 'lucide-react';
import { SearchState } from '../types/vehicle';

interface SearchContainerProps {
  searchState: SearchState;
  onSearchChange: (newSearch: SearchState) => void;
  onExecuteSearch: () => void;
  totalResultsCount: number;
}

const DURANGO_LOCATION = {
  name: 'Sucursal Plaza 450, Durango',
  detail: 'Blvd. Guadiana, Plaza 450, Durango, Dgo.',
  tag: 'Punto oficial de entrega',
};

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

  return (
    <div className="w-full bg-white rounded-[16px] p-3 sm:p-5 shadow-lg border border-slate-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onExecuteSearch();
        }}
        className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4"
      >
        {/* Field 1: Selecciona un lugar */}
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
              <MapPin className="w-[18px] h-[18px] text-slate-700 shrink-0" />
              <span className="font-heading text-[14px] text-slate-900 truncate">
                {searchState.location || 'Selecciona un lugar'}
              </span>
            </div>
            <ChevronDown className="w-[18px] h-[18px] text-slate-500 shrink-0" />
          </button>

          {locationOpen && (
            <div className="absolute top-full left-0 mt-2 w-full sm:w-80 bg-white rounded-xl border border-slate-200 shadow-xl p-3 z-50">
              <p className="text-[11px] font-heading font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Punto de entrega oficial
              </p>
              <button
                type="button"
                onClick={() => {
                  onSearchChange({ ...searchState, location: DURANGO_LOCATION.name });
                  setLocationOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors flex items-start gap-2.5"
              >
                <MapPin className="w-4 h-4 text-slate-900 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-heading font-medium text-slate-900">
                    {DURANGO_LOCATION.name}
                  </p>
                  <p className="text-[11px] text-slate-500">{DURANGO_LOCATION.detail}</p>
                  <span className="inline-block mt-1.5 text-[10px] font-medium bg-slate-900 text-white px-2 py-0.5 rounded">
                    {DURANGO_LOCATION.tag}
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Field 2: Fecha de inicio */}
        <div className="relative w-full lg:w-[190px]">
          <div className="flex items-center justify-between gap-2 px-4 py-3.5 rounded-[8px] border border-slate-300 bg-white">
            <input
              type="text"
              placeholder="Fecha de inicio"
              value={searchState.startDate}
              onChange={(e) => onSearchChange({ ...searchState, startDate: e.target.value })}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = 'text';
              }}
              className="w-full font-heading text-[14px] text-slate-900 placeholder:text-slate-900 focus:outline-none bg-transparent"
            />
            <Calendar className="w-[18px] h-[18px] text-slate-700 shrink-0 pointer-events-none" />
          </div>
        </div>

        {/* Field 3: Fecha de devolución */}
        <div className="relative w-full lg:w-[190px]">
          <div className="flex items-center justify-between gap-2 px-4 py-3.5 rounded-[8px] border border-slate-300 bg-white">
            <input
              type="text"
              placeholder="Fecha de devolución"
              value={searchState.endDate}
              onChange={(e) => onSearchChange({ ...searchState, endDate: e.target.value })}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = 'text';
              }}
              className="w-full font-heading text-[14px] text-slate-900 placeholder:text-slate-900 focus:outline-none bg-transparent"
            />
            <Calendar className="w-[18px] h-[18px] text-slate-700 shrink-0 pointer-events-none" />
          </div>
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
            <ChevronDown className="w-[18px] h-[18px] text-slate-500 shrink-0" />
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

        {/* Search Submit Button (Figma: size-[48px] rounded-[8px] bg-[#3d63ff]) */}
        <button
          type="submit"
          style={{ backgroundColor: '#3D63FF' }}
          className="w-full lg:w-[48px] h-[48px] rounded-[8px] flex items-center justify-center text-white shrink-0 hover:brightness-105 active:scale-95 transition-all shadow-sm"
          aria-label="Buscar vehículos"
        >
          <Search className="w-[18px] h-[18px]" />
        </button>
      </form>
    </div>
  );
};
