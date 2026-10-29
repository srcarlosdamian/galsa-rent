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
import { FinalCtaSection } from './components/FinalCtaSection';
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
import { BlogPage } from './pages/BlogPage';

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
    location: '',
    startDate: '',
    startTime: '10:00',
    endDate: '',
    endTime: '10:00',
    category: '',
  });

  // Autodetección de ubicación inteligente (Geolocalización del navegador + Reverse Geocoding)
  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      // Fallback por defecto si no hay soporte de geolocalización
      setSearchState((prev) => prev.location ? prev : { ...prev, location: 'México (Detectando...)' });
      return;
    }

    // Intentar obtener la ubicación con timeout suave para no bloquear
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          // Reverse geocode gratuito con BigDataCloud o Nominatim
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

            setSearchState((prev) => ({
              ...prev,
              location: detectedStr || 'Mi ubicación actual',
            }));
          } else {
            setSearchState((prev) => ({
              ...prev,
              location: 'Mi ubicación actual',
            }));
          }
        } catch (e) {
          setSearchState((prev) => ({
            ...prev,
            location: 'Mi ubicación actual',
          }));
        }
      },
      (_err) => {
        // Si el usuario rechaza los permisos o falla, usar punto oficial o sugerencia general
        setSearchState((prev) => ({
          ...prev,
          location: prev.location || 'Sucursal Plaza 450, Durango',
        }));
      },
      { timeout: 8000, maximumAge: 600000 }
    );
  }, []);

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

      const twImg = document.querySelector('meta[name="twitter:image"]');
      if (twImg) twImg.setAttribute('content', meta.ogImage.url);

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

  // Filtered vehicles for Home (2 filas de 4 columnas = 8 autos por página)
  const [homePage, setHomePage] = useState(1);
  const homeItemsPerPage = 8;

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((v) => {
      if (activeCategory === 'Todos los vehículos' || activeCategory === 'Destacados') {
        return true;
      }
      if (activeCategory === 'Nuevos') {
        return v.year >= 2024;
      }
      if (activeCategory === 'Económicos') {
        return v.pricePerDay <= 1500;
      }
      if (activeCategory === 'Aventura') {
        return v.category.includes('SUV') || v.category.includes('Aventura');
      }
      if (activeCategory === 'Negocios') {
        return v.category.includes('Negocios') || v.category.includes('Sedán');
      }
      if (activeCategory === 'Movilidad' || activeCategory === 'Cerca de ti') {
        return true;
      }
      return v.category.includes(activeCategory);
    });
  }, [activeCategory]);

  const homeTotalPages = Math.ceil(filteredVehicles.length / homeItemsPerPage) || 1;
  const paginatedHomeVehicles = useMemo(() => {
    const start = (homePage - 1) * homeItemsPerPage;
    return filteredVehicles.slice(start, start + homeItemsPerPage);
  }, [filteredVehicles, homePage]);

  const handleExecuteSearch = () => {
    navigateTo('/catalogo');
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
            searchState={searchState}
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

        {/* ROUTE 6.5: BLOG PAGE & ARTICULOS */}
        {(currentPath === '/blog' || currentPath.startsWith('/blog/')) && (
          <BlogPage
            onNavigate={navigateTo}
            selectedSlug={currentPath.startsWith('/blog/') ? currentPath.replace('/blog/', '') : undefined}
          />
        )}

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
            {/* HERO SECTION EXACTO DE FIGMA */}
            <section className="pt-4 pb-10 md:pb-14 bg-white">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                
                {/* Hero Card Container alineado a la izquierda con 40px de separación vertical */}
                <div className="relative rounded-[24px] border border-white/20 min-h-[440px] md:min-h-[500px] flex flex-col justify-center items-start py-10 md:py-[48px] px-6 sm:px-12 md:px-[64px] bg-slate-900 gap-[40px] text-left">
                  
                  {/* Background Image & Overlay */}
                  <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none z-0">
                    <img
                      src={`${((import.meta as any).env?.BASE_URL || '/').replace(/\/$/, '')}/images/figma-hero.webp`}
                      alt="Viaje familiar por carretera en México — GALSA Rent"
                      className="w-full h-full object-cover object-center"
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>

                  {/* Hero Title alineado a la izquierda con el padding del contenedor */}
                  <div className="w-full relative z-10 flex flex-col items-start text-left">
                    <h1 className="text-[30px] sm:text-5xl lg:text-[48px] font-heading font-extrabold tracking-[-0.576px] text-white leading-[1.12] sm:leading-[1.1] max-w-[800px]">
                      Renta de autos en México, 100% en línea
                    </h1>
                  </div>

                  {/* Search Bar Embedded in Hero */}
                  <div className="w-full relative z-20 flex justify-start">
                    <SearchContainer
                      searchState={searchState}
                      onSearchChange={setSearchState}
                      onExecuteSearch={handleExecuteSearch}
                      totalResultsCount={VEHICLES.length}
                    />
                  </div>

                  {/* Hero Description Footer alineado a la izquierda */}
                  <div className="w-full relative z-10 flex flex-col items-start text-left">
                    <p className="font-heading font-normal text-white text-[13px] sm:text-[16px] leading-[1.4] max-w-[760px]">
                      Renta tu auto en línea, elige tu modelo y firma tu contrato digital. Unidades inspeccionadas y listas para entrega en nuestras sucursales. Desde $1,100 MXN al día, sin cargos ocultos.
                    </p>
                  </div>

                </div>

              </div>
            </section>

            {/* AVAILABLE CARS SECTION EXACTO DE FIGMA */}
            <section id="catalogo-home" className="py-10 md:py-14 bg-white">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
                  <div>
                    <h2 className="text-[28px] sm:text-[32px] font-heading font-semibold tracking-[-0.192px] text-black leading-[1.1]">
                      Autos disponibles hoy en México
                    </h2>
                    <p className="mt-2 text-[15px] sm:text-[16px] font-heading font-normal text-black leading-[1.3]">
                      Contrato firmado digitalmente y depósito en garantía 100% reembolsable
                    </p>
                  </div>

                  {/* Button 'Ver más' (Figma: rounded-[6px], border slate-200, px-4 py-2, text 14px medium) */}
                  <a
                    href="/catalogo"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/catalogo');
                    }}
                    className="self-start md:self-auto inline-flex items-center justify-center px-4 py-2 rounded-[6px] border border-slate-200 bg-white text-slate-900 text-[14px] font-heading font-medium hover:bg-slate-50 transition-colors"
                  >
                    Ver más
                  </a>
                </div>

                {/* Filter Pills (Figma exact tags: Destacados, Nuevos, Económicos, Cerca de ti, Negocios, Aventura, Movilidad) */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                  {[
                    'Destacados',
                    'Nuevos',
                    'Económicos',
                    'Cerca de ti',
                    'Negocios',
                    'Aventura',
                    'Movilidad',
                  ].map((filterName) => {
                    const isSelected = activeCategory === filterName || (activeCategory === 'Todos los vehículos' && filterName === 'Destacados');
                    return (
                      <button
                        key={filterName}
                        type="button"
                        onClick={() => {
                          setActiveCategory(filterName);
                          setHomePage(1);
                        }}
                        className={`text-[14px] font-heading font-medium px-3 py-1.5 rounded-[6px] transition-colors whitespace-nowrap ${
                          isSelected
                            ? 'bg-slate-100 text-slate-900 font-semibold'
                            : 'bg-white text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        {filterName}
                      </button>
                    );
                  })}
                </div>

                {/* Vehicle Grid (Figma: 4 columnas en desktop, gap-4) */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {paginatedHomeVehicles.map((vehicle, idx) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onSelect={(v) => navigateTo(`/vehiculos/${v.slug}`)}
                      priority={idx === 0}
                    />
                  ))}
                </div>

                {/* Paginador Home (Limpio y sutil) */}
                {homeTotalPages > 1 && (
                  <div className="mt-8 flex items-center justify-between text-xs text-slate-500 font-heading pt-4 border-t border-slate-100">
                    <span>
                      Mostrando {paginatedHomeVehicles.length} de {filteredVehicles.length} autos disponibles
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={homePage === 1}
                        onClick={() => setHomePage(homePage - 1)}
                        className="px-3 py-1.5 rounded-[6px] border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Anterior
                      </button>
                      <span className="font-semibold text-slate-900">
                        {homePage} / {homeTotalPages}
                      </span>
                      <button
                        type="button"
                        disabled={homePage === homeTotalPages}
                        onClick={() => setHomePage(homePage + 1)}
                        className="px-3 py-1.5 rounded-[6px] border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </section>

            {/* H2 ORDER 2: Rentar con GALSA es así de simple */}
            <VirtuoExperienceSection />

            {/* H2 ORDER 3: Cómo rentar un auto en 4 pasos */}
            <FourStepProcess />

            {/* H2 ORDER 4: Un auto para cada necesidad */}
            <UseCasesSection onFilterCategory={(cat) => {
              setSearchState((prev) => ({
                ...prev,
                category: cat,
              }));
              navigateTo('/catalogo');
            }} />

            {/* H2 ORDER 5: Cada renta, respaldada de principio a fin */}
            <TrustSafetySection />

            {/* Banner Anuncio Programa de Anfitriones (Sin cotizador en Home) */}
            <HostBanner onNavigate={navigateTo} />

            {/* H2 ORDER 6: Preguntas frecuentes sobre renta de autos */}
            <FaqSection />

            {/* SECCIÓN FINAL TIPO TESLA: Título, descripción, CTA principal y segundo CTA con imagen a la derecha */}
            <FinalCtaSection onNavigate={navigateTo} />

          </>
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
