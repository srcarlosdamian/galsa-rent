import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, Check, ShieldCheck } from 'lucide-react';
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

const TIME_OPTIONS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export const SearchContainer: React.FC<SearchContainerProps> = ({
  searchState,
  onSearchChange,
  onExecuteSearch,
  totalResultsCount,
}) => {
  const [activeTab, setActiveTab] = useState<'location' | 'start' | 'end' | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Outer framing container styled like Virtuo & Sixt */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-search p-3 sm:p-4 text-neutral-900 transition-all">
        
        {/* Top Mini Category Pills */}
        <div className="flex items-center gap-2 mb-3 px-1 overflow-x-auto no-scrollbar border-b border-neutral-100 pb-2.5">
          {['Todos los vehículos', 'SUV / Aventura', 'Sedán / Negocios', 'Deportivo / Estilo'].map((cat) => {
            const isSelected = (cat === 'Todos los vehículos' && !searchState.category) || searchState.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSearchChange({ ...searchState, category: cat === 'Todos los vehículos' ? '' : cat })}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-neutral-900 text-white'
                    : 'bg-transparent text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* The Search Bar Grid inside the container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-0 bg-white rounded-2xl border border-neutral-200 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          
          {/* Where: Strictly Durango Sucursal Plaza 450 */}
          <div 
            className={`relative md:col-span-4 p-3.5 sm:p-4 cursor-pointer rounded-xl md:rounded-l-2xl md:rounded-r-none transition-colors ${
              activeTab === 'location' ? 'bg-neutral-50 ring-1 ring-neutral-300' : 'hover:bg-neutral-50/70'
            }`}
            onClick={() => setActiveTab(activeTab === 'location' ? null : 'location')}
          >
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400">
                  Lugar de entrega
                </span>
                <p className="text-sm font-bold text-neutral-900 truncate">
                  {DURANGO_LOCATION.name}
                </p>
                <span className="text-[11px] text-neutral-500 truncate block">Blvd. Guadiana, Durango</span>
              </div>
            </div>

            {/* Location Dropdown */}
            {activeTab === 'location' && (
              <div 
                className="absolute top-full left-0 mt-3 w-80 bg-white rounded-2xl border border-neutral-200 shadow-dropdown p-3 z-50 animate-in fade-in-50 zoom-in-95"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1">
                  Punto de entrega oficial en Durango
                </p>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-left">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-neutral-900 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-neutral-900">{DURANGO_LOCATION.name}</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{DURANGO_LOCATION.detail}</p>
                      <span className="inline-block mt-2 text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded-full">
                        {DURANGO_LOCATION.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Date & Time */}
          <div 
            className={`relative md:col-span-3 p-3.5 sm:p-4 cursor-pointer transition-colors ${
              activeTab === 'start' ? 'bg-neutral-50 ring-1 ring-neutral-300' : 'hover:bg-neutral-50/70'
            }`}
            onClick={() => setActiveTab(activeTab === 'start' ? null : 'start')}
          >
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400">
                  Entrega
                </span>
                <p className="text-sm font-bold text-neutral-900 truncate">
                  {searchState.startDate || 'Seleccionar fecha'}
                </p>
                <span className="text-[11px] text-neutral-500">{searchState.startTime} hrs</span>
              </div>
            </div>

            {/* Date / Time Picker Dropdown */}
            {activeTab === 'start' && (
              <div 
                className="absolute top-full left-0 mt-3 w-80 bg-white rounded-2xl border border-neutral-200 shadow-dropdown p-4 z-50 animate-in fade-in-50 zoom-in-95"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Fecha de entrega
                </p>
                <input
                  type="date"
                  value={searchState.startDate}
                  onChange={(e) => onSearchChange({ ...searchState, startDate: e.target.value })}
                  className="w-full text-sm font-medium border border-neutral-300 rounded-xl px-3 py-2 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />

                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mt-4 mb-2">
                  Hora de entrega
                </p>
                <div className="grid grid-cols-4 gap-1.5 max-h-36 overflow-y-auto">
                  {TIME_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        onSearchChange({ ...searchState, startTime: t });
                        setActiveTab('end');
                      }}
                      className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-colors ${
                        searchState.startTime === t
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Return Date & Time */}
          <div 
            className={`relative md:col-span-3 p-3.5 sm:p-4 cursor-pointer transition-colors ${
              activeTab === 'end' ? 'bg-neutral-50 ring-1 ring-neutral-300' : 'hover:bg-neutral-50/70'
            }`}
            onClick={() => setActiveTab(activeTab === 'end' ? null : 'end')}
          >
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400">
                  Devolución
                </span>
                <p className="text-sm font-bold text-neutral-900 truncate">
                  {searchState.endDate || 'Seleccionar fecha'}
                </p>
                <span className="text-[11px] text-neutral-500">{searchState.endTime} hrs</span>
              </div>
            </div>

            {/* End Date Dropdown */}
            {activeTab === 'end' && (
              <div 
                className="absolute top-full right-0 md:left-0 mt-3 w-80 bg-white rounded-2xl border border-neutral-200 shadow-dropdown p-4 z-50 animate-in fade-in-50 zoom-in-95"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Fecha de devolución
                </p>
                <input
                  type="date"
                  value={searchState.endDate}
                  onChange={(e) => onSearchChange({ ...searchState, endDate: e.target.value })}
                  className="w-full text-sm font-medium border border-neutral-300 rounded-xl px-3 py-2 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />

                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mt-4 mb-2">
                  Hora de devolución
                </p>
                <div className="grid grid-cols-4 gap-1.5 max-h-36 overflow-y-auto">
                  {TIME_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        onSearchChange({ ...searchState, endTime: t });
                        setActiveTab(null);
                      }}
                      className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-colors ${
                        searchState.endTime === t
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Button: Exact CTA Color 500 (#316AB5) as requested */}
          <div className="md:col-span-2 p-2 sm:p-2.5 flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setActiveTab(null);
                onExecuteSearch();
              }}
              style={{ backgroundColor: '#316AB5' }}
              className="w-full h-full min-h-[48px] text-white font-bold text-xs uppercase tracking-wider rounded-xl px-4 py-3 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
              aria-label="Buscar autos disponibles en GALSA"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Buscar</span>
            </button>
          </div>

        </div>

        {/* Micro-assurances below container search */}
        <div className="mt-3 px-2 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-2">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-neutral-900" />
            <span>{totalResultsCount} autos revisados en Durango</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-neutral-900" />
            <span>Firma de contrato digital</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-neutral-900" />
            <span>Entrega en Sucursal Plaza 450</span>
          </div>
        </div>

      </div>
    </div>
  );
};
