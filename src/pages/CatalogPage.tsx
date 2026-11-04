import React, { useState, useMemo } from 'react';
import { VEHICLES } from '../data/vehicles';
import { VehicleCard } from '../components/VehicleCard';
import { CatalogMap } from '../components/CatalogMap';
import { Vehicle, SearchState } from '../types/vehicle';
import { DateRangePicker } from '../components/DateRangePicker';
import { 
  Check, ChevronDown, SlidersHorizontal, RotateCcw, 
  ArrowLeft, ArrowRight, Copy,
  MapPin, Calendar, Navigation, Globe, Building2, Plane, Hotel, Train, X, Search
} from 'lucide-react';

interface CatalogPageProps {
  onSelectVehicle: (v: Vehicle) => void;
  onNavigate?: (path: string) => void;
  searchState?: SearchState;
  onSearchChange?: (newSearch: SearchState) => void;
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

const TIME_OPTIONS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00', '22:00'
];

export const CatalogPage: React.FC<CatalogPageProps> = ({ 
  onSelectVehicle, 
  onNavigate,
  searchState,
  onSearchChange 
}) => {
  // Ubicación y fechas locales/sincronizadas
  const [selectedLocation, setSelectedLocation] = useState<string>(searchState?.location || '');
  const [startDate, setStartDate] = useState<string>(searchState?.startDate || '');
  const [endDate, setEndDate] = useState<string>(searchState?.endDate || '');
  const [detectingLocation, setDetectingLocation] = useState(false);

  // Sincronizar si cambia searchState externo
  React.useEffect(() => {
    if (searchState?.location !== undefined) setSelectedLocation(searchState.location);
    if (searchState?.startDate !== undefined) setStartDate(searchState.startDate);
    if (searchState?.endDate !== undefined) setEndDate(searchState.endDate);
  }, [searchState?.location, searchState?.startDate, searchState?.endDate]);

  // Manejador de cambio de ubicación
  const handleLocationSelect = (locVal: string) => {
    setSelectedLocation(locVal);
    if (onSearchChange && searchState) {
      onSearchChange({ ...searchState, location: locVal });
    }
    setOpenDropdown(null);
  };

  // Manejador de detección de ubicación actual
  const handleDetectCurrentLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      handleLocationSelect('Mi ubicación actual');
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
            let detectedStr = city && state && city !== state ? `${city}, ${state}` : (city || state ? `${city || state}, ${country}` : country);
            handleLocationSelect(detectedStr || 'Mi ubicación actual');
          } else {
            handleLocationSelect('Mi ubicación actual');
          }
        } catch {
          handleLocationSelect('Mi ubicación actual');
        } finally {
          setDetectingLocation(false);
        }
      },
      () => {
        setDetectingLocation(false);
        handleLocationSelect('Mi ubicación actual');
      },
      { timeout: 8000, maximumAge: 600000 }
    );
  };

  // Formato legible de fechas
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    if (!y || !m || !d) return dateStr;
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${d} ${months[parseInt(m, 10) - 1]}`;
  };

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
  // 8 autos por página en mobile/tableta (1-2 columnas), 6 en desktop (3 columnas)
  const [isCompact, setIsCompact] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
  React.useEffect(() => {
    const onResize = () => setIsCompact(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const itemsPerPage = isCompact ? 8 : 6;

  // Dropdowns abiertos
  const [openDropdown, setOpenDropdown] = useState<'location' | 'dates' | 'type' | 'seats' | 'trans' | 'price' | 'sort' | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Toggle dropdown
  const toggleDropdown = (name: 'location' | 'dates' | 'type' | 'seats' | 'trans' | 'price' | 'sort') => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  // Modo de visualización: Cuadrícula o Mapa (con tarjeta horizontal)
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [hoveredVehicleId, setHoveredVehicleId] = useState<string | null>(null);

  // Modal de filtros en vista móvil
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [pickupTime, setPickupTime] = useState<string>('08:00');
  const [returnTime, setReturnTime] = useState<string>('18:00');
  const [mobileLocationSearch, setMobileLocationSearch] = useState<string>('');

  // Histograma de distribución de precios para el filtro móvil estilo Airbnb
  const histogramBuckets = useMemo(() => {
    const numBuckets = 22;
    const minPrice = 850;
    const maxPrice = 3500;
    const step = (maxPrice - minPrice) / numBuckets;
    const buckets = Array.from({ length: numBuckets }, (_, i) => ({
      min: minPrice + i * step,
      max: minPrice + (i + 1) * step,
      count: 0,
    }));

    VEHICLES.forEach((v) => {
      const p = v.pricePerDay;
      const bucket = buckets.find((b) => p >= b.min && p <= b.max);
      if (bucket) {
        bucket.count += 1;
      }
    });

    const maxCount = Math.max(...buckets.map((b) => b.count), 1);
    return buckets.map((b) => ({
      ...b,
      heightPct: Math.max(16, Math.round((b.count / maxCount) * 100)),
    }));
  }, []);

  // Opciones de ubicación filtradas para el buscador móvil
  const filteredLocationOptions = useMemo(() => {
    if (!mobileLocationSearch.trim()) return LOCATION_OPTIONS;
    const q = mobileLocationSearch.toLowerCase();
    return LOCATION_OPTIONS.filter(
      (loc) => loc.title.toLowerCase().includes(q) || (loc.subtitle && loc.subtitle.toLowerCase().includes(q)) || loc.value.toLowerCase().includes(q)
    );
  }, [mobileLocationSearch]);

  // Lista de badges de filtros activos
  const activeFiltersList = useMemo(() => {
    const list: { id: string; label: string; onClear: () => void }[] = [];
    if (selectedLocation && selectedLocation !== 'Mi ubicación actual') {
      const shortLoc = selectedLocation.split(',')[0].replace('Sucursal ', '').trim();
      list.push({
        id: 'location',
        label: shortLoc,
        onClear: () => handleLocationSelect(''),
      });
    } else if (selectedLocation === 'Mi ubicación actual') {
      list.push({
        id: 'location',
        label: 'Mi ubicación',
        onClear: () => handleLocationSelect(''),
      });
    }

    if (startDate && endDate) {
      list.push({
        id: 'dates',
        label: `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`,
        onClear: () => {
          setStartDate('');
          setEndDate('');
          if (onSearchChange && searchState) {
            onSearchChange({ ...searchState, startDate: '', endDate: '' });
          }
        },
      });
    }

    if (vehicleTypeFilter !== 'Todos') {
      list.push({
        id: 'type',
        label: `Tipo: ${vehicleTypeFilter}`,
        onClear: () => {
          setVehicleTypeFilter('Todos');
          setCurrentPage(1);
        },
      });
    }

    if (seatsFilter !== 'Todos') {
      list.push({
        id: 'seats',
        label: `${seatsFilter}+ asientos`,
        onClear: () => {
          setSeatsFilter('Todos');
          setCurrentPage(1);
        },
      });
    }

    if (transmissionFilter !== 'Todos') {
      list.push({
        id: 'trans',
        label: transmissionFilter,
        onClear: () => {
          setTransmissionFilter('Todos');
          setCurrentPage(1);
        },
      });
    }

    if (priceMaxFilter < 3500) {
      list.push({
        id: 'price',
        label: `Hasta $${priceMaxFilter.toLocaleString('es-MX')}`,
        onClear: () => {
          setPriceMaxFilter(3500);
          setCurrentPage(1);
        },
      });
    }

    return list;
  }, [selectedLocation, startDate, endDate, vehicleTypeFilter, seatsFilter, transmissionFilter, priceMaxFilter, searchState, onSearchChange]);

  const activeFiltersCount = activeFiltersList.length;

  // Reset all
  const resetFilters = () => {
    handleLocationSelect('');
    setStartDate('');
    setEndDate('');
    if (onSearchChange && searchState) {
      onSearchChange({ ...searchState, location: '', startDate: '', endDate: '' });
    }
    setVehicleTypeFilter('Todos');
    setSeatsFilter('Todos');
    setTransmissionFilter('Todos');
    setPriceMaxFilter(3500);
    setSortBy('recommended');
    setCurrentPage(1);
    setOpenDropdown(null);
  };

  // Filtrado reactivo con garantía de prototipo (siempre debe salir al menos un automóvil)
  const filteredVehicles = useMemo(() => {
    let matches = VEHICLES.filter((v) => {
      // Ubicación
      if (selectedLocation && selectedLocation !== 'Mi ubicación actual' && selectedLocation !== '') {
        const normLoc = selectedLocation.toLowerCase().trim();
        const vLoc = (v.location + ' ' + v.city).toLowerCase();
        const directMatch = vLoc.includes(normLoc) || 
          normLoc.includes(v.location.toLowerCase()) || 
          (normLoc.includes('aeropuerto') && v.location.toLowerCase().includes('aeropuerto')) ||
          (normLoc.includes('centro') && v.location.toLowerCase().includes('centro')) ||
          (normLoc.includes('plaza 450') && v.location.toLowerCase().includes('plaza 450')) ||
          (normLoc.includes('central') && v.location.toLowerCase().includes('central'));
        if (!directMatch) {
          // Si no es una de las sucursales de Durango, pero es una ubicación geolocalizada o personalizada,
          // permitimos que los autos se muestren adaptados para que SIEMPRE haya disponibilidad en ese prototipo
          if (normLoc.includes('durango')) return false;
        }
      }

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
    });

    // REGLA DEL PROTOTIPO: Siempre debe salir al menos un automóvil, pase lo que pase
    if (matches.length === 0) {
      // Si la combinación de filtros fue muy estricta y dejó 0 autos, tomamos autos de la flota
      // y los adaptamos dinámicamente como prototipo fake para cumplir la regla
      matches = VEHICLES.slice(0, 4).map((car, idx) => ({
        ...car,
        id: `${car.id}-proto-${idx}`,
        location: (selectedLocation && selectedLocation !== 'Mi ubicación actual') ? selectedLocation : car.location,
        seats: seatsFilter !== 'Todos' ? parseInt(seatsFilter, 10) : car.seats,
        transmission: transmissionFilter !== 'Todos' ? (transmissionFilter as any) : car.transmission,
        pricePerDay: Math.min(car.pricePerDay, priceMaxFilter),
        category: vehicleTypeFilter !== 'Todos' ? vehicleTypeFilter : car.category,
      }));
    } else if (selectedLocation && selectedLocation !== 'Mi ubicación actual' && !selectedLocation.toLowerCase().includes('durango')) {
      // Si el usuario seleccionó una ubicación externa (ej. CDMX, Zapopan, etc.), reflejamos esa ubicación en los autos devueltos
      matches = matches.map(car => ({
        ...car,
        location: selectedLocation,
      }));
    }

    return matches.sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'year-desc') return b.year - a.year;
      return 0; // recomendado (orden original)
    });
  }, [selectedLocation, vehicleTypeFilter, seatsFilter, transmissionFilter, priceMaxFilter, sortBy]);

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

        {/* Título y Conteo de Resultados + Controles Desktop (Toggle + Recomendados en misma línea) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-[26px] sm:text-[30px] font-heading font-extrabold tracking-tight text-slate-900 leading-tight">
              Autos disponibles ({filteredVehicles.length})
            </h1>
          </div>

          {/* Controles Desktop: Toggle Cuadrícula/Mapa + Ordenar por Recomendados juntos con misma altura (h-[38px]) y bordes rounded-[10px] */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Toggle Cuadrícula / Mapa estilo Login sin borde y sin iconos */}
            <div className="bg-slate-100 p-1 rounded-[10px] inline-flex items-center h-[38px]">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center justify-center h-full px-4 rounded-[8px] text-xs font-heading transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <span>Cuadrícula</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`inline-flex items-center justify-center h-full px-4 rounded-[8px] text-xs font-heading transition-all ${
                  viewMode === 'map'
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <span>Mapa</span>
              </button>
            </div>

            {/* Selector de ordenamiento Recomendados pegado al toggle con misma altura y borde rounded-[10px] */}
            <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => toggleDropdown('sort')}
                className="inline-flex items-center gap-2 h-[38px] px-3.5 rounded-[10px] border border-slate-300 bg-white text-[13px] font-heading font-medium text-slate-800 hover:border-slate-400 transition-colors shadow-xs"
              >
                <span>
                  {sortBy === 'recommended' && 'Recomendados'}
                  {sortBy === 'price-asc' && 'Precio: menor a mayor'}
                  {sortBy === 'price-desc' && 'Precio: mayor a menor'}
                  {sortBy === 'year-desc' && 'Año más reciente'}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" strokeWidth={1.4} />
              </button>

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
        </div>

        {/* Barra de Controles en Mobile (md:hidden): Filtros + Pill Cuadrícula/Mapa + Recomendados en una MISMA línea */}
        <div className="md:hidden flex items-center justify-between gap-1.5 mb-3.5">
          {/* Botón Filtros con Badge */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMobileFiltersOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 h-[36px] rounded-[8px] border border-slate-300 bg-white text-xs font-heading font-semibold text-slate-800 shadow-xs hover:bg-slate-50 active:bg-slate-100 transition-colors shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-700" strokeWidth={1.8} />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Pill Toggle Cuadrícula | Mapa en mobile sin borde y sin iconos */}
          <div className="bg-slate-100 p-0.5 rounded-[8px] inline-flex items-center h-[36px] shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center justify-center h-full px-2.5 rounded-[6px] text-xs font-heading transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <span>Cuadrícula</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`inline-flex items-center justify-center h-full px-2.5 rounded-[6px] text-xs font-heading transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <span>Mapa</span>
            </button>
          </div>

          {/* Selector de ordenamiento Recomendados en mobile */}
          <div className="relative inline-block shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => toggleDropdown('sort')}
              className="inline-flex items-center gap-1 px-2.5 h-[36px] rounded-[8px] border border-slate-300 bg-white text-xs font-heading font-medium text-slate-800 transition-colors"
            >
              <span className="truncate max-w-[95px]">
                {sortBy === 'recommended' && 'Recomendados'}
                {sortBy === 'price-asc' && 'Precio: menor'}
                {sortBy === 'price-desc' && 'Precio: mayor'}
                {sortBy === 'year-desc' && 'Año reciente'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" strokeWidth={1.4} />
            </button>
            {openDropdown === 'sort' && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-[12px] border border-slate-200 shadow-xl p-1.5 z-50">
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
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-heading font-medium transition-colors ${
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

        {/* Barra de Filtros interactivos con Ubicación, Fechas y Filtros horizontales (Desktop) */}
        <div className="hidden md:flex flex-wrap items-center gap-2 sm:gap-3 py-2 border-b border-slate-100 mb-6" onClick={(e) => e.stopPropagation()}>
          
          {/* Input/Dropdown de Ubicación (Idéntico a Home) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('location')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-[13px] font-heading transition-colors ${
                selectedLocation
                  ? 'border-slate-800 text-slate-900 bg-white font-semibold'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 font-medium'
              }`}
            >
              <MapPin className={`w-4 h-4 shrink-0 ${selectedLocation ? 'text-slate-900' : 'text-slate-500'}`} strokeWidth={1.4} />
              <span className="max-w-[160px] sm:max-w-[200px] truncate">
                {selectedLocation || 'Ubicación'}
              </span>
              <ChevronDown className={`w-4 h-4 shrink-0 ${selectedLocation ? 'text-slate-900' : 'text-slate-400'}`} strokeWidth={1.4} />
            </button>

            {openDropdown === 'location' && (
              <div 
                className="absolute top-full left-0 mt-2 w-[320px] sm:w-[360px] bg-white rounded-[20px] border border-slate-200/80 shadow-2xl p-2.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
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
                            handleLocationSelect(loc.value);
                          }
                        }}
                        className="w-full text-left p-2 rounded-[12px] hover:bg-slate-50 transition-colors flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-[8px] bg-slate-100 flex items-center justify-center shrink-0 text-slate-800 group-hover:bg-slate-200 transition-colors">
                          <Icon className="w-4 h-4" strokeWidth={1.4} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-heading font-medium text-slate-900 truncate flex items-center gap-1.5">
                            <span>{loc.title}</span>
                            {loc.id === 'current' && detectingLocation && (
                              <span className="text-[10px] font-normal text-blue-600 animate-pulse">
                                (Detectando...)
                              </span>
                            )}
                          </p>
                          {loc.subtitle && (
                            <p className="text-[11px] font-heading font-normal text-slate-500 truncate">
                              {loc.subtitle}
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

          {/* Selector de Fechas (Rango con DateRangePicker idéntico a Home) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('dates')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-[13px] font-heading transition-colors ${
                startDate && endDate
                  ? 'border-slate-800 text-slate-900 bg-white font-semibold'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 font-medium'
              }`}
            >
              <Calendar className={`w-4 h-4 shrink-0 ${startDate && endDate ? 'text-slate-900' : 'text-slate-500'}`} strokeWidth={1.4} />
              <span>
                {startDate && endDate 
                  ? `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}` 
                  : 'Fechas'}
              </span>
              <ChevronDown className={`w-4 h-4 shrink-0 ${startDate && endDate ? 'text-slate-900' : 'text-slate-400'}`} strokeWidth={1.4} />
            </button>

            {openDropdown === 'dates' && (
              <div 
                className="absolute top-full left-0 sm:left-auto mt-2 z-50 max-w-[95vw] sm:max-w-none"
                onClick={(e) => e.stopPropagation()}
              >
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                    if (onSearchChange && searchState) {
                      onSearchChange({ ...searchState, startDate: start, endDate: end });
                    }
                  }}
                  onClose={() => setOpenDropdown(null)}
                />
              </div>
            )}
          </div>
          
          {/* 1. Tipo de Vehículo */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('type')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-[13px] font-heading transition-colors ${
                vehicleTypeFilter !== 'Todos'
                  ? 'border-slate-800 text-slate-900 bg-white font-semibold'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 font-medium'
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
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-[13px] font-heading transition-colors ${
                seatsFilter !== 'Todos'
                  ? 'border-slate-800 text-slate-900 bg-white font-semibold'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 font-medium'
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
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-[13px] font-heading transition-colors ${
                transmissionFilter !== 'Todos'
                  ? 'border-slate-800 text-slate-900 bg-white font-semibold'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 font-medium'
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
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-[13px] font-heading transition-colors ${
                priceMaxFilter < 3500
                  ? 'border-slate-800 text-slate-900 bg-white font-semibold'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 font-medium'
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

          {/* Zona derecha: Botón Limpiar filtros */}
          {(selectedLocation || (startDate && endDate) || vehicleTypeFilter !== 'Todos' || seatsFilter !== 'Todos' || transmissionFilter !== 'Todos' || priceMaxFilter < 3500) && (
            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-heading font-medium text-slate-500 hover:text-black hover:bg-slate-100 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.4} />
                <span>Limpiar filtros</span>
              </button>
            </div>
          )}

        </div>

        {/* Grid de Autos o Vista Mapa según modo seleccionado */}
        {paginatedVehicles.length > 0 ? (
          viewMode === 'map' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Columna izquierda: Lista de autos en tarjeta horizontal (40% de ancho) */}
              <div className="lg:col-span-5 flex flex-col gap-3.5 order-2 lg:order-1">
                {paginatedVehicles.map((vehicle, idx) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onSelect={onSelectVehicle}
                    priority={idx === 0}
                    layout="horizontal"
                    isHovered={hoveredVehicleId === vehicle.id}
                    onMouseEnter={() => setHoveredVehicleId(vehicle.id)}
                    onMouseLeave={() => setHoveredVehicleId(null)}
                  />
                ))}
              </div>

              {/* Columna derecha: Mapa interactivo (60% de ancho) */}
              <div className="lg:col-span-7 order-1 lg:order-2 lg:sticky lg:top-24">
                <CatalogMap
                  vehicles={filteredVehicles}
                  hoveredVehicleId={hoveredVehicleId}
                  onSelectVehicle={onSelectVehicle}
                  onHoverVehicle={setHoveredVehicleId}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedVehicles.map((vehicle, idx) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={onSelectVehicle}
                  priority={idx === 0}
                  layout="grid"
                />
              ))}
            </div>
          )
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

        {/* Contenedor Social / Compartir Catálogo (sin línea gris, solo bg-slate-50) */}
        <div className="mt-10 bg-slate-50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-heading font-semibold text-slate-800">
              Comparte estas opciones de autos
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://api.whatsapp.com/send?text=Checa%20las%20opciones%20de%20autos%20en%20renta%20en%20Durango%20con%20GALSA%20Rent%3A%20https%3A%2F%2Fgalsarent.com.mx%2Fcatalogo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Compartir en WhatsApp"
              className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-heading font-semibold text-slate-700 shadow-xs transition-colors"
            >
              <span>WhatsApp</span>
            </a>

            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgalsarent.com.mx%2Fcatalogo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Compartir en Facebook"
              className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-heading font-semibold text-slate-700 shadow-xs transition-colors"
            >
              <span>Facebook</span>
            </a>

            <a
              href="https://twitter.com/intent/tweet?text=Renta%20de%20autos%20en%20Durango%20100%25%20en%20l%C3%ADnea%20con%20GALSA%20Rent&url=https%3A%2F%2Fgalsarent.com.mx%2Fcatalogo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Compartir en X / Twitter"
              className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-heading font-semibold text-slate-700 shadow-xs transition-colors"
            >
              <span>X (Twitter)</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-heading font-semibold text-slate-700 shadow-xs transition-colors"
            >
              <span>{copied ? '¡Copiado!' : 'Copiar enlace'}</span>
            </button>
          </div>
        </div>

        {/* Sección 1: Guía de renta de autos en Durango (Contenedor propio) */}
        <section className="mt-10 bg-gray-50 rounded-[24px] p-6 sm:p-10 border-0">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight mb-4">
            Guía de renta de autos en Durango: consejos, requisitos y categorías
          </h2>
          
          <p className="text-sm font-sans text-slate-600 leading-relaxed mb-6">
            Rentar un auto en Durango con GALSA Rent es rápido, transparente y 100% digital. Ya sea que viajes por negocios a la capital duranguense, disfrutes de unas vacaciones familiares o asistas a un evento especial, en nuestro catálogo encontrarás el vehículo ideal con entrega en Sucursal Plaza 450 o en el Aeropuerto Internacional General Guadalupe Victoria (DGO).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border-0 shadow-none">
              <div className="w-12 h-12 rounded-xl overflow-hidden mb-4 bg-slate-50">
                <img
                  src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793600346395-4-background-border-shadow.webp"
                  alt="Sedanes, SUVs y 4x4"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-base font-heading font-bold text-slate-900 mb-2">
                Sedanes, SUVs y 4x4
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                Contamos con sedanes económicos (Nissan Sentra, Versa, Virtus) de gran rendimiento urbano, SUVs familiares (Toyota RAV4, Audi Q5) para confort en carretera y camionetas 4x4 todo terreno (Jeep Wrangler Rubicon) para la sierra y cabañas en Mexiquillo.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-0 shadow-none">
              <div className="w-12 h-12 rounded-xl overflow-hidden mb-4 bg-slate-50">
                <img
                  src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793600346030-3-background-border-shadow-1.webp"
                  alt="Requisitos claros y sin sorpresas"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-base font-heading font-bold text-slate-900 mb-2">
                Requisitos claros y sin sorpresas
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                Solo requieres ser mayor de 21 años, presentar identificación oficial vigente (INE o pasaporte), licencia de conducir vigente y tarjeta bancaria para depósito en garantía 100% reembolsable al entregar la unidad.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-0 shadow-none">
              <div className="w-12 h-12 rounded-xl overflow-hidden mb-4 bg-slate-50">
                <img
                  src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793600345607-2-background-border-shadow-2.webp"
                  alt="Entrega oficial y asistencia 24/7"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-base font-heading font-bold text-slate-900 mb-2">
                Entrega oficial y asistencia 24/7
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                Recoge tu vehículo inspeccionado y con tanque listo en Sucursal Plaza 450 (Boulevard Guadiana). Todas nuestras rentas incluyen seguro de cobertura y asistencia vial continua en Durango y carreteras de México.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 2: Enlaces útiles de navegación (Contenedor propio estilo FAQ) */}
        <section className="mt-8 bg-gray-50 rounded-[24px] p-6 sm:p-10 border-0">
          <div className="mb-6 sm:mb-8 text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
              Enlaces útiles de navegación
            </h3>
            <p className="text-sm font-sans text-slate-600 leading-relaxed mt-1">
              Accede rápidamente a información clave sobre el proceso de renta, garantías y servicios.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {[
              {
                title: 'Inicio y reservaciones',
                desc: 'Explora autos disponibles con tarifas en tiempo real y reserva en minutos.',
                href: '/',
              },
              {
                title: '¿Cómo funciona la renta digital?',
                desc: 'Conoce los 4 pasos para reservar, verificar identidad y recoger tu vehículo.',
                href: '/como-funciona',
              },
              {
                title: 'Gana dinero como anfitrión',
                desc: 'Publica tu automóvil con protección integral y genera ingresos recurrentes.',
                href: '/anfitriones',
              },
              {
                title: 'Garantía y seguridad digital',
                desc: 'Inspección con fotos en entrega, depósito seguro y seguro certificado.',
                href: '/confianza',
              },
              {
                title: 'Preguntas frecuentes',
                desc: 'Respuestas sobre depósitos, pólizas, límites de kilometraje y cancelaciones.',
                href: '/faq',
              },
              {
                title: 'Sucursal Plaza 450 y contacto',
                desc: 'Ubicación física en Blvd. Guadiana, teléfonos y canal de WhatsApp 24/7.',
                href: '/contacto',
              },
              {
                title: 'Blog de rutas y viajes',
                desc: 'Itinerarios, consejos de manejo en sierra duranguense y guías turísticas.',
                href: '/blog',
              },
              {
                title: 'Términos del servicio',
                desc: 'Políticas claras de uso, condiciones de arrendamiento y deberes legales.',
                href: '/terminos',
              },
              {
                title: 'Aviso de privacidad',
                desc: 'Protección absoluta y tratamiento seguro de tus datos personales.',
                href: '/privacidad',
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate(item.href);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 rounded-2xl border border-neutral-200/90 bg-white hover:bg-neutral-50/70 hover:border-slate-300 transition-all duration-200 group"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-base font-heading font-semibold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors block">
                    {item.title}
                  </span>
                  <p className="text-xs sm:text-sm font-sans text-slate-500 mt-1 line-clamp-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-500 group-hover:text-blue-600 group-hover:border-blue-400 group-hover:translate-x-0.5 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>

      {/* Modal / Bottom Sheet de Filtros para Mobile */}
      {mobileFiltersOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div 
            className="bg-white w-full rounded-t-[24px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-slate-800" strokeWidth={1.8} />
                <h2 className="text-lg font-heading font-extrabold text-slate-900">
                  Filtros
                </h2>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                    {activeFiltersCount} activo{activeFiltersCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-5 space-y-6 overflow-y-auto">
              {/* 1. Ubicación de entrega con buscador interactivo como Home */}
              <div>
                <label className="block text-xs font-heading font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Ubicación de entrega
                </label>

                {/* Input Buscador estilo Home */}
                <div className="relative mb-2.5">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.8} />
                  <input
                    type="text"
                    value={mobileLocationSearch}
                    onChange={(e) => setMobileLocationSearch(e.target.value)}
                    placeholder="Dirección, ciudad o aeropuerto..."
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-heading text-xs sm:text-sm outline-none transition-colors"
                  />
                  {mobileLocationSearch && (
                    <button
                      type="button"
                      onClick={() => setMobileLocationSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Lista de ubicaciones filtrables */}
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {filteredLocationOptions.map((loc) => {
                    const isSelected = (!selectedLocation && loc.value === '') || selectedLocation === loc.value;
                    const Icon = loc.icon;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => {
                          if (loc.id === 'current') {
                            handleDetectCurrentLocation();
                          } else {
                            handleLocationSelect(loc.value);
                          }
                          setMobileLocationSearch('');
                        }}
                        className={`w-full text-left p-2.5 rounded-[12px] border transition-colors flex items-center gap-3 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/60 text-blue-950 font-semibold'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-heading font-medium truncate">
                            {loc.title}
                          </p>
                          {loc.subtitle && (
                            <p className="text-[11px] font-heading text-slate-400 truncate">
                              {loc.subtitle}
                            </p>
                          )}
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" strokeWidth={2} />}
                      </button>
                    );
                  })}
                  {filteredLocationOptions.length === 0 && (
                    <div className="p-3 text-center text-xs text-slate-500">
                      No se encontraron resultados para "{mobileLocationSearch}".
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Fechas y Horas del viaje (Diseño idéntico a vista detalle) */}
              <div>
                <label className="block text-xs font-heading font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Fechas del viaje
                </label>
                <div className="space-y-3">
                  {/* Entrega */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-heading font-medium text-slate-600 mb-1">
                        Fecha de entrega
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          const val = e.target.value;
                          setStartDate(val);
                          if (onSearchChange && searchState) {
                            onSearchChange({ ...searchState, startDate: val });
                          }
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-heading font-semibold text-xs outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-heading font-medium text-slate-600 mb-1">
                        Hora de entrega
                      </label>
                      <div className="relative">
                        <select
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-heading font-semibold text-xs outline-none transition-colors appearance-none cursor-pointer"
                        >
                          {TIME_OPTIONS.map((t) => (
                            <option key={`pickup-${t}`} value={t}>{t}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Devolución */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-heading font-medium text-slate-600 mb-1">
                        Fecha de devolución
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEndDate(val);
                          if (onSearchChange && searchState) {
                            onSearchChange({ ...searchState, endDate: val });
                          }
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-heading font-semibold text-xs outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-heading font-medium text-slate-600 mb-1">
                        Hora de devolución
                      </label>
                      <div className="relative">
                        <select
                          value={returnTime}
                          onChange={(e) => setReturnTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-heading font-semibold text-xs outline-none transition-colors appearance-none cursor-pointer"
                        >
                          {TIME_OPTIONS.map((t) => (
                            <option key={`return-${t}`} value={t}>{t}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Tipo de vehículo (usando grises neutros sin fondos negros) */}
              <div>
                <label className="block text-xs font-heading font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Tipo de vehículo
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Todos', 'SUV', 'Sedán', 'Deportivo', 'Económicos'].map((type) => {
                    const isSelected = vehicleTypeFilter === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setVehicleTypeFilter(type);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 rounded-[10px] text-xs font-heading transition-colors border ${
                          isSelected
                            ? 'bg-slate-100 text-slate-900 border-slate-400 font-bold shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-medium'
                        }`}
                      >
                        {type === 'Todos' ? 'Todos los tipos' : type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Capacidad de asientos (usando grises neutros sin fondos negros) */}
              <div>
                <label className="block text-xs font-heading font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Capacidad de asientos
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Todos', '4', '5', '7'].map((s) => {
                    const isSelected = seatsFilter === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSeatsFilter(s);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 rounded-[10px] text-xs font-heading transition-colors border ${
                          isSelected
                            ? 'bg-slate-100 text-slate-900 border-slate-400 font-bold shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-medium'
                        }`}
                      >
                        {s === 'Todos' ? 'Cualquiera' : `${s}+ plazas`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Transmisión (usando grises neutros sin fondos negros) */}
              <div>
                <label className="block text-xs font-heading font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Transmisión
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Todos', 'Automática', 'Estándar'].map((t) => {
                    const isSelected = transmissionFilter === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setTransmissionFilter(t);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 rounded-[10px] text-xs font-heading transition-colors border ${
                          isSelected
                            ? 'bg-slate-100 text-slate-900 border-slate-400 font-bold shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-medium'
                        }`}
                      >
                        {t === 'Todos' ? 'Cualquiera' : t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Precio total antes de impuestos con Histograma de barras y Slider */}
              <div>
                <label className="block text-xs font-heading font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Precio total antes de impuestos
                </label>
                <p className="text-[11px] font-sans text-slate-500 mb-3">
                  Precio por día según los autos disponibles
                </p>

                {/* Cajas de Mínimo y Máximo */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-2.5 rounded-xl border border-slate-300 bg-white">
                    <span className="block text-[10px] font-heading font-medium text-slate-500 mb-0.5">Mínimo</span>
                    <span className="text-sm font-heading font-semibold text-slate-900">$ 850</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-300 bg-white">
                    <span className="block text-[10px] font-heading font-medium text-slate-500 mb-0.5">Máximo</span>
                    <span className="text-sm font-heading font-semibold text-slate-900">
                      $ {priceMaxFilter.toLocaleString('es-MX')}{priceMaxFilter >= 3500 ? '+' : ''}
                    </span>
                  </div>
                </div>

                {/* Histograma de frecuencia de precios con colores de marca */}
                <div className="h-16 flex items-end gap-1 px-1 mb-1">
                  {histogramBuckets.map((bucket, i) => {
                    const isFilled = bucket.min <= priceMaxFilter;
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm transition-colors duration-150 ${
                          isFilled ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                        style={{ height: `${bucket.heightPct}%` }}
                      />
                    );
                  })}
                </div>

                {/* Range Slider */}
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="850"
                    max="3500"
                    step="50"
                    value={priceMaxFilter}
                    onChange={(e) => {
                      setPriceMaxFilter(parseInt(e.target.value, 10));
                      setCurrentPage(1);
                    }}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-heading mt-1">
                    <span>$850</span>
                    <span>$3,500+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-xs font-heading font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Limpiar
                </button>
              )}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-heading font-bold transition-colors shadow-md text-center"
              >
                Mostrar {filteredVehicles.length} {filteredVehicles.length === 1 ? 'auto' : 'autos'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
