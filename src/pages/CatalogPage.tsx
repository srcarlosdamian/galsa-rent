import React, { useState, useMemo } from 'react';
import { VEHICLES } from '../data/vehicles';
import { VehicleCard } from '../components/VehicleCard';
import { Vehicle, SearchState } from '../types/vehicle';
import { 
  Check, ChevronDown, SlidersHorizontal, RotateCcw, 
  ArrowLeft, ArrowRight, ShieldCheck, Tag, Info
} from 'lucide-react';

interface CatalogPageProps {
  onSelectVehicle: (v: Vehicle) => void;
  onNavigate?: (path: string) => void;
  searchState?: SearchState;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ 
  onSelectVehicle, 
  onNavigate,
  searchState 
}) => {
  // Normalizar filtro inicial si viene de searchState (ej: 'SUV / Aventura' -> 'SUV', 'Sedán / Negocios' -> 'Sedán')
  const getInitialTypeFilter = (cat?: string) => {
    if (!cat) return 'Todos';
    if (cat.includes('SUV')) return 'SUV';
    if (cat.includes('Sedán')) return 'Sedán';
    if (cat.includes('Deportivo')) return 'Deportivo';
    if (cat.includes('Económico')) return 'Económicos';
    if (['SUV', 'Sedán', 'Deportivo', 'Económicos'].includes(cat)) return cat;
    return 'Todos';
  };

  // Filtros interactivos de barra superior
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>(() => getInitialTypeFilter(searchState?.category));
  const [seatsFilter, setSeatsFilter] = useState<string>('Todos');
  const [transmissionFilter, setTransmissionFilter] = useState<string>('Todos');
  const [priceMaxFilter, setPriceMaxFilter] = useState<number>(3500);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'year-desc'>('recommended');

  // Mantener sincronizado si searchState.category cambia
  React.useEffect(() => {
    if (searchState?.category) {
      setVehicleTypeFilter(getInitialTypeFilter(searchState.category));
    }
  }, [searchState?.category]);

  // Paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Dropdowns abiertos
  const [openDropdown, setOpenDropdown] = useState<'type' | 'seats' | 'trans' | 'price' | 'sort' | null>(null);

  // Toggle dropdown
  const toggleDropdown = (name: 'type' | 'seats' | 'trans' | 'price' | 'sort') => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  // Reset all
  const resetFilters = () => {
    setVehicleTypeFilter('Todos');
    setSeatsFilter('Todos');
    setTransmissionFilter('Todos');
    setPriceMaxFilter(3500);
    setSortBy('recommended');
    setCurrentPage(1);
    setOpenDropdown(null);
  };

  // Filtrado reactivo
  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((v) => {
      // Tipo de vehículo
      if (vehicleTypeFilter !== 'Todos') {
        if (vehicleTypeFilter === 'SUV' && !v.category.includes('SUV')) return false;
        if (vehicleTypeFilter === 'Sedán' && !v.category.includes('Sedán')) return false;
        if (vehicleTypeFilter === 'Deportivo' && !v.category.includes('Deportivo')) return false;
        if (vehicleTypeFilter === 'Económicos' && !v.category.includes('Económico') && !v.category.includes('Urbano')) return false;
      }

      // Asientos
      if (seatsFilter !== 'Todos') {
        const requiredSeats = parseInt(seatsFilter, 10);
        if (v.seats < requiredSeats) return false;
      }

      // Transmisión
      if (transmissionFilter !== 'Todos') {
        if (v.transmission !== transmissionFilter) return false;
      }

      // Precio máximo
      if (v.pricePerDay > priceMaxFilter) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'year-desc') return b.year - a.year;
      return 0; // recomendado (orden original)
    });
  }, [vehicleTypeFilter, seatsFilter, transmissionFilter, priceMaxFilter, sortBy]);

  // Paginación cálculos
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage) || 1;
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVehicles.slice(start, start + itemsPerPage);
  }, [filteredVehicles, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="py-6 sm:py-10 bg-white" onClick={() => setOpenDropdown(null)}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Título y Conteo de Resultados */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h1 className="text-[26px] sm:text-[30px] font-heading font-extrabold tracking-tight text-slate-900 leading-tight">
              AUTOS DISPONIBLES ({filteredVehicles.length})
            </h1>
            <p className="text-xs text-slate-500 font-heading mt-0.5">
              {searchState?.location ? `Ubicación: ${searchState.location} · ` : ''}
              {searchState?.startDate && searchState?.endDate ? `Fechas: ${searchState.startDate} al ${searchState.endDate} · ` : ''}
              Tarifas finales por día con kilometraje libre e impuestos incluidos
            </p>
          </div>

          {/* Selector de ordenamiento */}
          <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-heading text-slate-500">Ordenar por:</span>
              <button
                type="button"
                onClick={() => toggleDropdown('sort')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border border-slate-200 bg-white text-[13px] font-heading font-semibold text-slate-900 hover:border-slate-300 transition-colors"
              >
                <span>
                  {sortBy === 'recommended' && 'Recomendados'}
                  {sortBy === 'price-asc' && 'Precio: menor a mayor'}
                  {sortBy === 'price-desc' && 'Precio: mayor a menor'}
                  {sortBy === 'year-desc' && 'Año más reciente'}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" strokeWidth={1.4} />
              </button>
            </div>

            {openDropdown === 'sort' && (
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-[12px] border border-slate-200 shadow-xl p-1.5 z-50">
                {[
                  { id: 'recommended', label: 'Recomendados' },
                  { id: 'price-asc', label: 'Precio: menor a mayor' },
                  { id: 'price-desc', label: 'Precio: mayor a menor' },
                  { id: 'year-desc', label: 'Año más reciente' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSortBy(opt.id as any);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-heading font-medium transition-colors ${
                      sortBy === opt.id ? 'bg-slate-100 text-black font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Barra de Filtros interactivos horizontales (Formato exacto de la referencia) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-2 border-b border-slate-100 mb-6" onClick={(e) => e.stopPropagation()}>
          
          {/* 1. Tipo de Vehículo */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('type')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-[13px] font-heading font-medium transition-colors ${
                vehicleTypeFilter !== 'Todos'
                  ? 'border-black bg-black text-white'
                  : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
              }`}
            >
              <span>Tipo: {vehicleTypeFilter}</span>
              <ChevronDown className="w-4 h-4" strokeWidth={1.4} />
            </button>

            {openDropdown === 'type' && (
              <div className="absolute left-0 top-full mt-1.5 w-48 bg-white rounded-[12px] border border-slate-200 shadow-xl p-1.5 z-50">
                {['Todos', 'SUV', 'Sedán', 'Deportivo', 'Económicos'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setVehicleTypeFilter(type);
                      setCurrentPage(1);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-heading font-medium transition-colors ${
                      vehicleTypeFilter === type ? 'bg-slate-100 text-black font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {type === 'Todos' ? 'Todos los tipos' : type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Asientos */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('seats')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-[13px] font-heading font-medium transition-colors ${
                seatsFilter !== 'Todos'
                  ? 'border-black bg-black text-white'
                  : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
              }`}
            >
              <span>Asientos: {seatsFilter !== 'Todos' ? `${seatsFilter}+` : 'Todos'}</span>
              <ChevronDown className="w-4 h-4" strokeWidth={1.4} />
            </button>

            {openDropdown === 'seats' && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-[12px] border border-slate-200 shadow-xl p-1.5 z-50">
                {['Todos', '4', '5', '7'].map((seats) => (
                  <button
                    key={seats}
                    type="button"
                    onClick={() => {
                      setSeatsFilter(seats);
                      setCurrentPage(1);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-heading font-medium transition-colors ${
                      seatsFilter === seats ? 'bg-slate-100 text-black font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {seats === 'Todos' ? 'Cualquier capacidad' : `${seats}+ plazas`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Transmisión */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('trans')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-[13px] font-heading font-medium transition-colors ${
                transmissionFilter !== 'Todos'
                  ? 'border-black bg-black text-white'
                  : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
              }`}
            >
              <span>Transmisión: {transmissionFilter}</span>
              <ChevronDown className="w-4 h-4" strokeWidth={1.4} />
            </button>

            {openDropdown === 'trans' && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-[12px] border border-slate-200 shadow-xl p-1.5 z-50">
                {['Todos', 'Automática', 'Estándar'].map((trans) => (
                  <button
                    key={trans}
                    type="button"
                    onClick={() => {
                      setTransmissionFilter(trans);
                      setCurrentPage(1);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-heading font-medium transition-colors ${
                      transmissionFilter === trans ? 'bg-slate-100 text-black font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {trans === 'Todos' ? 'Cualquiera' : trans}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Precio */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('price')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-[13px] font-heading font-medium transition-colors ${
                priceMaxFilter < 3500
                  ? 'border-black bg-black text-white'
                  : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
              }`}
            >
              <span>Hasta ${priceMaxFilter.toLocaleString('es-MX')} MXN</span>
              <ChevronDown className="w-4 h-4" strokeWidth={1.4} />
            </button>

            {openDropdown === 'price' && (
              <div className="absolute left-0 top-full mt-1.5 w-60 bg-white rounded-[16px] border border-slate-200 shadow-xl p-4 z-50">
                <p className="text-xs font-heading font-bold text-slate-800 mb-2">
                  Precio máximo por día:
                </p>
                <div className="text-lg font-heading font-extrabold text-blue-600 mb-3">
                  ${priceMaxFilter.toLocaleString('es-MX')} MXN
                </div>
                <input
                  type="range"
                  min="850"
                  max="3500"
                  step="100"
                  value={priceMaxFilter}
                  onChange={(e) => {
                    setPriceMaxFilter(parseInt(e.target.value, 10));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-heading mt-1">
                  <span>$850</span>
                  <span>$3,500</span>
                </div>
              </div>
            )}
          </div>

          {/* Botón Reset */}
          {(vehicleTypeFilter !== 'Todos' || seatsFilter !== 'Todos' || transmissionFilter !== 'Todos' || priceMaxFilter < 3500) && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-heading font-medium text-slate-500 hover:text-black hover:bg-slate-100 rounded-lg transition-colors ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.4} />
              <span>Limpiar filtros</span>
            </button>
          )}

        </div>

        {/* Grid de Autos (Exacto al estilo GALSA / Figma, 3 columnas) */}
        {paginatedVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedVehicles.map((vehicle, idx) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={onSelectVehicle}
                priority={idx === 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-base font-heading font-bold text-slate-800">
              No encontramos vehículos con estos filtros
            </p>
            <p className="text-xs font-heading text-slate-500 mt-1 max-w-sm mx-auto">
              Prueba cambiando la capacidad de asientos o aumentando el rango de precio máximo.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-lg bg-black text-white text-xs font-heading font-semibold hover:bg-slate-800 transition-colors"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}

        {/* Paginador (Estilo GALSA limpio y en español) */}
        {totalPages > 1 && (
          <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-heading">
              Mostrando página <strong className="text-slate-900">{currentPage}</strong> de <strong className="text-slate-900">{totalPages}</strong> ({filteredVehicles.length} autos en total)
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Página anterior"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.4} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-lg text-xs font-heading font-bold transition-colors ${
                    currentPage === page
                      ? 'bg-black text-white'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Página siguiente"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.4} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
