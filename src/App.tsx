import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchContainer } from './components/SearchContainer';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetailView } from './components/VehicleDetailView';
import { VirtuoExperienceSection } from './components/VirtuoExperienceSection';
import { FourStepProcess } from './components/FourStepProcess';
import { UseCasesSection } from './components/UseCasesSection';
import { TrustSafetySection } from './components/TrustSafetySection';
import { HostBanner } from './components/HostBanner';
import { HostSection } from './components/HostSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

// Pages
import { CatalogPage } from './pages/CatalogPage';
import { ContactPage } from './pages/ContactPage';
import { TrustPage } from './pages/TrustPage';
import { FaqPage } from './pages/FaqPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';

import { VEHICLES, findVehicleBySlugOrUuid } from './data/vehicles';
import { Vehicle, SearchState } from './types/vehicle';
import { getRouteMetadata, SITE_URL } from './data/metadata';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, Sparkles, 
  CarFront, MapPin, Check, Info, ChevronRight 
} from 'lucide-react';

export const App: React.FC = () => {
  // Current route pathname
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.replace(/\/+$/, '') || '/';
      // Handle github pages subpath /galsa-rent if present
      return p.replace(/^\/galsa-rent/, '') || '/';
    }
    return '/';
  });

  // Search state
  const [searchState, setSearchState] = useState<SearchState>({
    location: 'Sucursal Plaza 450, Durango',
    startDate: '',
    startTime: '10:00',
    endDate: '',
    endTime: '10:00',
    category: '',
  });

  // Active filter tab on home
  const [activeCategory, setActiveCategory] = useState<string>('Todos los vehículos');

  // Navigation helper
  const navigateTo = (path: string) => {
    let target = path.replace(/\/+$/, '') || '/';
    
    // Check if navigating to a legacy UUID and redirect 301-style to the canonical slug
    if (target.startsWith('/vehiculos/')) {
      const param = target.replace('/vehiculos/', '');
      const matched = findVehicleBySlugOrUuid(param);
      if (matched && matched.slug !== param) {
        target = `/vehiculos/${matched.slug}`;
      }
    }

    const fullUrl = window.location.pathname.startsWith('/galsa-rent') 
      ? `/galsa-rent${target === '/' ? '' : target}` 
      : target;

    window.history.pushState({}, '', fullUrl);
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      let p = window.location.pathname.replace(/\/+$/, '') || '/';
      p = p.replace(/^\/galsa-rent/, '') || '/';
      setCurrentPath(p);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Sync document head metadata dynamically on client transitions
  useEffect(() => {
    const meta = getRouteMetadata(currentPath);
    if (meta) {
      document.title = meta.title;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', meta.description);

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', meta.canonical);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', meta.ogTitle);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', meta.ogDescription);

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', meta.canonical);

      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', meta.ogImage.url);

      const robots = document.querySelector('meta[name="robots"]');
      if (robots) {
        robots.setAttribute('content', meta.noIndex ? 'noindex,nofollow' : 'index,follow');
      }
    }
  }, [currentPath]);

  // Handle direct vehicle detail URLs e.g. /vehiculos/nissan-sentra-sense-2024-durango
  const currentVehicle = useMemo(() => {
    if (currentPath.startsWith('/vehiculos/')) {
      const slugOrUuid = currentPath.replace('/vehiculos/', '');
      return findVehicleBySlugOrUuid(slugOrUuid);
    }
    return null;
  }, [currentPath]);

  // Filtered vehicles for Home
  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((v) => {
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
    const el = document.getElementById('catalogo-home');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-black selection:text-white flex flex-col">
      {/* Header with concise menu */}
      <Header currentPath={currentPath} onNavigate={navigateTo} />

      <main className="flex-1">
        
        {/* ROUTE 1: VEHICLE DETAIL PAGE */}
        {currentPath.startsWith('/vehiculos/') && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentVehicle ? (
              <VehicleDetailView
                vehicle={currentVehicle}
                onNavigate={navigateTo}
              />
            ) : (
              <NotFoundPage onNavigate={navigateTo} />
            )}
          </div>
        )}

        {/* ROUTE 2: CATALOG PAGE */}
        {currentPath === '/catalogo' && (
          <CatalogPage
            onSelectVehicle={(v) => navigateTo(`/vehiculos/${v.slug}`)}
            onNavigate={navigateTo}
          />
        )}

        {/* ROUTE 3: ANFITRIONES PAGE */}
        {currentPath === '/anfitriones' && (
          <HostSection isFullPage={true} />
        )}

        {/* ROUTE 4: CONFIANZA PAGE */}
        {currentPath === '/confianza' && <TrustPage />}

        {/* ROUTE 5: FAQ PAGE */}
        {currentPath === '/faq' && <FaqPage />}

        {/* ROUTE 5.1: COMO FUNCIONA */}
        {currentPath === '/como-funciona' && <HowItWorksPage onNavigate={navigateTo} />}

        {/* ROUTE 5.2: NOSOTROS */}
        {currentPath === '/nosotros' && <AboutPage onNavigate={navigateTo} />}

        {/* ROUTE 6: CONTACTO PAGE */}
        {currentPath === '/contacto' && <ContactPage />}

        {/* ROUTE 7: TERMINOS & PRIVACIDAD */}
        {currentPath === '/terminos' && <TermsPage />}
        {currentPath === '/privacidad' && <PrivacyPage />}

        {/* ROUTE 8: PRIVATE ROUTES (CUENTA / RESERVAR) */}
        {currentPath === '/cuenta' && (
          <div className="py-20 text-center max-w-md mx-auto px-4">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Mi Cuenta</h1>
            <p className="text-xs text-neutral-500 mb-6">Accede a tus contratos digitales y comprobantes de renta en Durango.</p>
            <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50 text-left space-y-3">
              <label className="text-xs font-bold text-neutral-700 block">Número de teléfono registrado</label>
              <input type="tel" placeholder="+52 618..." className="w-full text-xs p-2.5 rounded-xl border border-neutral-300" />
              <button type="button" className="w-full py-2.5 rounded-xl bg-black text-white text-xs font-bold">Enviar código de acceso</button>
            </div>
          </div>
        )}

        {/* ROUTE 9: HOME (TAREA 2 COPY & VIRTUO DESIGN) */}
        {currentPath === '/' && (
          <>
            {/* HERO SECTION INSPIRED BY VIRTUO (Screenshot 1) */}
            <section className="pt-6 pb-16 md:pt-10 md:pb-24 bg-white border-b border-neutral-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Cinematic Rounded Container Card */}
                <div className="relative rounded-[32px] overflow-hidden bg-neutral-900 text-white min-h-[460px] md:min-h-[500px] flex flex-col justify-between p-6 sm:p-10 md:p-14 shadow-dropdown">
                  
                  {/* Background High-res Vehicle Image & Gradient Overlay */}
                  <div className="absolute inset-0 -z-10 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80"
                      alt="Carretera y auto en renta en Durango — GALSA Rent"
                      width={1800}
                      height={900}
                      className="w-full h-full object-cover object-center brightness-50"
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30"></div>
                  </div>

                  {/* Top Notification Badge */}
                  <div>
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white tracking-wide">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Renta de autos en México · Flota verificada con entrega en Durango</span>
                    </span>
                  </div>

                  {/* Main Copy (Enfocado a México y expansión nacional) */}
                  <div className="max-w-3xl space-y-4 my-auto py-8">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
                      Renta de autos en México, 100% en línea
                    </h1>
                    
                    <p className="text-sm sm:text-base md:text-lg text-neutral-200 font-normal leading-relaxed max-w-2xl">
                      Elige tu auto, sube tus documentos y firma el contrato digital desde tu celular con validez legal en todo México. Unidades revisadas una por una, con punto de entrega en Sucursal Plaza 450, Durango. Desde $1,100 al día + tarifa de servicio transparente.
                    </p>

                    {/* Chips as specified in Tarea 2 */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-neutral-200">
                      <span className="bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full">
                        Kilometraje libre
                      </span>
                      <span className="bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full">
                        Contrato digital
                      </span>
                      <span className="bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full">
                        Depósito reembolsable
                      </span>
                      <span className="bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full">
                        Sin cargos hasta confirmar
                      </span>
                    </div>

                    {/* CTA en el Hero enfocado 100% en rentar */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <a
                        href="#catalogo-home"
                        style={{ backgroundColor: '#3D63FF' }}
                        className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full transition-all shadow-sm hover:brightness-105 active:scale-[0.98]"
                      >
                        <span>Ver autos disponibles</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <a
                        href="/como-funciona"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('/como-funciona');
                        }}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full backdrop-blur-md transition-all"
                      >
                        <span>Cómo funciona</span>
                      </a>
                    </div>
                  </div>

                </div>

                {/* DOCKED HORIZONTAL SEARCH CONTAINER (Overlapping Virtuo Style) */}
                <div className="-mt-8 sm:-mt-10 relative z-20 px-2 sm:px-6">
                  <SearchContainer
                    searchState={searchState}
                    onSearchChange={setSearchState}
                    onExecuteSearch={handleExecuteSearch}
                    totalResultsCount={VEHICLES.length}
                  />
                </div>

              </div>
            </section>

            {/* H2 ORDER 1: Autos disponibles hoy en Durango */}
            <section id="catalogo-home" className="py-16 md:py-24 bg-white border-b border-neutral-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                      Autos disponibles hoy en México
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-xl">
                      {VEHICLES.length} unidades revisadas listas para entrega física en Sucursal Plaza 450, Durango. Contrato digital firmado desde tu celular y depósito en garantía 100% reembolsable.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    {['Todos los vehículos', 'SUV / Aventura', 'Sedán / Negocios', 'Deportivo / Estilo'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap border ${
                          activeCategory === cat
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Grid */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVehicles.map((vehicle, idx) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onSelect={(v) => navigateTo(`/vehiculos/${v.slug}`)}
                      priority={idx === 0}
                    />
                  ))}
                </div>

                {/* Transparent Total Pricing & Deposit Guarantee Example Box */}
                <div className="mt-12 p-5 sm:p-6 rounded-2xl border border-neutral-200 bg-neutral-50/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-700">
                  <div className="space-y-1 text-center md:text-left">
                    <p className="font-bold text-neutral-900 text-sm">
                      Ejemplo de total con tarifa de servicio transparente:
                    </p>
                    <p className="text-neutral-600">
                      Tarifa de $1,100 MXN/día + 33% de tarifa de servicio ($363 MXN) = <strong>$1,463 MXN total/día</strong> (IVA incluido) + depósito en garantía 100% reembolsable al devolver la unidad.
                    </p>
                  </div>
                  <a
                    href="/faq"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/faq');
                    }}
                    className="whitespace-nowrap font-bold text-neutral-900 underline hover:no-underline"
                  >
                    Ver detalles de tarifas →
                  </a>
                </div>

              </div>
            </section>

            {/* H2 ORDER 2: Rentar con GALSA es así de simple */}
            <VirtuoExperienceSection />

            {/* H2 ORDER 3: Cómo rentar un auto en 4 pasos */}
            <FourStepProcess />

            {/* H2 ORDER 4: Un auto para cada necesidad */}
            <UseCasesSection onFilterCategory={(cat) => {
              setActiveCategory(cat);
              const el = document.getElementById('catalogo-home');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />

            {/* H2 ORDER 5: Cada renta, respaldada de principio a fin */}
            <TrustSafetySection />

            {/* Banner Anuncio Programa de Anfitriones (Sin cotizador en Home) */}
            <HostBanner onNavigate={navigateTo} />

            {/* H2 ORDER 6: Preguntas frecuentes sobre renta de autos */}
            <FaqSection />

          </>
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
