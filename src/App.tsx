import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchContainer } from './components/SearchContainer';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { VirtuoExperienceSection } from './components/VirtuoExperienceSection';
import { FourStepProcess } from './components/FourStepProcess';
import { UseCasesSection } from './components/UseCasesSection';
import { TrustSafetySection } from './components/TrustSafetySection';
import { HostSection } from './components/HostSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { VEHICLES } from './data/vehicles';
import { Vehicle, SearchState } from './types/vehicle';
import { SlidersHorizontal, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  // Search state
  const [searchState, setSearchState] = useState<SearchState>({
    location: 'Sucursal Oficial GALSA Plaza 450',
    startDate: '',
    startTime: '10:00',
    endDate: '',
    endTime: '10:00',
    category: '',
  });

  // Selected vehicle for detail modal
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Active filter tab
  const [activeCategory, setActiveCategory] = useState<string>('Todos los vehículos');

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((v) => {
      // Category filter
      if (activeCategory !== 'Todos los vehículos' && v.category !== activeCategory) {
        return false;
      }
      if (searchState.category && searchState.category !== 'Todos los vehículos' && v.category !== searchState.category) {
        return false;
      }
      return true;
    });
  }, [activeCategory, searchState.category]);

  const handleExecuteSearch = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenHost = () => {
    const el = document.getElementById('anfitriones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-black selection:text-white flex flex-col">
      {/* Header */}
      <Header onOpenHostModal={handleOpenHost} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Top Tagline Pill */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-800 bg-white">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Renta de autos en Durango · Flota 100% verificada</span>
              </span>
            </div>

            {/* Main SEO H1 Heading */}
            <div className="max-w-4xl mx-auto text-center space-y-5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 leading-[1.08]">
                Renta de autos sin filas ni complicaciones. <br className="hidden sm:inline" />
                <span className="text-neutral-900">Muévete con total confianza.</span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-neutral-600 font-normal leading-relaxed">
                Reserva 100% digital, entrega garantizada en sucursal Plaza 450 o en el Aeropuerto de Durango (DGO), contratos digitales con validez legal y kilometraje libre.
              </p>
            </div>

            {/* TURO-INSPIRED SEARCH CONTAINER WITH #1F34F2 CTA */}
            <div className="mt-10 md:mt-14">
              <SearchContainer
                searchState={searchState}
                onSearchChange={setSearchState}
                onExecuteSearch={handleExecuteSearch}
                totalResultsCount={VEHICLES.length}
              />
            </div>

            {/* Quick Guarantees Bar */}
            <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-xl border border-neutral-100 bg-white">
                <span className="block text-sm font-bold text-neutral-900">100% Digital</span>
                <span className="text-xs text-neutral-500">Sin filas ni mostrador</span>
              </div>
              <div className="p-3 rounded-xl border border-neutral-100 bg-white">
                <span className="block text-sm font-bold text-neutral-900">Entrega en DGO</span>
                <span className="text-xs text-neutral-500">Directo en aeropuerto</span>
              </div>
              <div className="p-3 rounded-xl border border-neutral-100 bg-white">
                <span className="block text-sm font-bold text-neutral-900">Sin Sorpresas</span>
                <span className="text-xs text-neutral-500">IVA y seguro incluido</span>
              </div>
              <div className="p-3 rounded-xl border border-neutral-100 bg-white">
                <span className="block text-sm font-bold text-neutral-900">Garantía Ágil</span>
                <span className="text-xs text-neutral-500">Liberación inmediata</span>
              </div>
            </div>

          </div>
        </section>

        {/* VEHICLE CATALOG SECTION */}
        <section id="catalogo" className="py-20 md:py-28 bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Catalog Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                  Flota disponible en Durango
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                  Vehículos inspeccionados y listos para tu viaje
                </h2>
                <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-xl">
                  Selecciona la unidad que mejor se adapte a tu trayecto: desde camionetas 4x4 para explorar la Sierra hasta sedanes ejecutivos de bajo consumo.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {['Todos los vehículos', 'SUV / Aventura', 'Sedán / Negocios', 'Deportivo / Estilo'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-semibold px-4 py-2 rounded-full transition-all whitespace-nowrap border ${
                      activeCategory === cat
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Grid (Turo-inspired cards) */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={(v) => setSelectedVehicle(v)}
                />
              ))}
            </div>

            {/* Fallback if no vehicle matches */}
            {filteredVehicles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-base font-semibold text-neutral-800">
                  No hay unidades con este filtro en este momento.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveCategory('Todos los vehículos')}
                  className="mt-3 text-xs font-bold underline"
                >
                  Ver todos los vehículos de la flota
                </button>
              </div>
            )}

            {/* Banner for Custom Fleet / Special Requests */}
            <div className="mt-16 p-6 sm:p-8 rounded-3xl border border-neutral-200 bg-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-neutral-900">
                  ¿Buscas una renta para flotilla corporativa o fechas especiales?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Brindamos atención personalizada para empresas, eventos, bodas y producción cinematográfica en Durango.
                </p>
              </div>

              <a
                href="https://wa.me/526181234567?text=Hola%20GALSA,%20deseo%20cotizar%20renta%20especial%20o%20corporativa"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap inline-flex items-center gap-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold px-6 py-3.5 rounded-full transition-all"
              >
                <span>Cotizar con un ejecutivo</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </section>

        {/* VIRTUO-INSPIRED EXPERIENCE SECTION */}
        <VirtuoExperienceSection />

        {/* 4-STEP PROCESS */}
        <FourStepProcess />

        {/* MOBILITY USE CASES */}
        <UseCasesSection onFilterCategory={(cat) => {
          setActiveCategory(cat);
          const el = document.getElementById('catalogo');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* TRUST & SAFETY SECTION */}
        <TrustSafetySection />

        {/* HOST MARKETPLACE SECTION */}
        <HostSection />

        {/* FAQ ACCORDION SECTION */}
        <FaqSection />

        {/* PRE-FOOTER CTA SECTION */}
        <section className="py-20 md:py-28 bg-white border-b border-neutral-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
              Tu viaje comienza aquí
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              ¿Listo para moverte con GALSA en Durango?
            </h2>
            <p className="max-w-xl mx-auto text-base sm:text-lg text-neutral-600">
              Reserva hoy tu vehículo o publica tu auto en nuestro marketplace. Simple, transparente, seguro y 100% digital.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#catalogo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black text-white text-sm font-bold px-8 py-4 rounded-full transition-all shadow-md"
              >
                <span>Explorar catálogo de autos</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#anfitriones"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-300 hover:border-black text-neutral-900 text-sm font-bold px-8 py-4 rounded-full transition-all"
              >
                <span>Quiero ser anfitrión</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

      {/* DETAIL VIEW MODAL (Turo reference inspired) */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </div>
  );
};

export default App;
