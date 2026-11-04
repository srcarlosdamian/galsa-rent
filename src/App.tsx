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
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { PasswordSentPage } from './pages/PasswordSentPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { SeoPage } from './pages/SeoPage';

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
      return;
    }

    // Solicitar permiso de ubicación para autorrellenar por defecto
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          // Reverse geocode gratuito con BigDataCloud
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
        // Si el usuario no otorga permiso, se mantiene sin autorrellenar para que seleccione manualmente
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
    const list = VEHICLES.filter((v) => {
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

    // En modo prototipo garantizamos que siempre haya vehículos disponibles
    if (list.length === 0) {
      return VEHICLES.slice(0, 4);
    }
    return list;
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
            onSearchChange={setSearchState}
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

        {/* ROUTE 7.5: INICIAR SESIÓN Y REGISTRO */}
        {currentPath === '/login' && <LoginPage onNavigate={navigateTo} />}
        {currentPath === '/registro' && <RegisterPage onNavigate={navigateTo} />}

        {/* ROUTE 7.6: RECUPERACIÓN DE CONTRASEÑA (3 PASOS CON URL INDEPENDIENTE) */}
        {currentPath === '/recuperar-password' && <ForgotPasswordPage onNavigate={navigateTo} />}
        {currentPath === '/recuperar-password/enviado' && <PasswordSentPage onNavigate={navigateTo} />}
        {currentPath === '/restablecer-password' && <ResetPasswordPage onNavigate={navigateTo} />}

        {/* ROUTE 7.7: VISOR Y AUDITOR SEO */}
        {currentPath === '/seo' && <SeoPage onNavigate={navigateTo} />}

        {/* ROUTE 8: PRIVATE ROUTES (CUENTA / RESERVAR) */}
        {currentPath === '/cuenta' && (
          <LoginPage onNavigate={navigateTo} />
        )}

        {/* ROUTE 9: HOME (TAREA 2 COPY & VIRTUO DESIGN) */}
        {currentPath === '/' && (
          <>
            {/* HERO SECTION REDISEÑADO CON LÍNEA AZUL Y BARRA DE BÚSQUEDA CENTRADA */}
            <section className="relative z-30 pt-12 pb-28 sm:pt-16 sm:pb-36 lg:pt-20 lg:pb-44 bg-white overflow-visible">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center gap-10">
                
                {/* Bloque de Título y Subtítulo centrado */}
                <div className="w-full max-w-[940px] relative flex flex-col items-center gap-5 sm:gap-6 text-center">
                  <h1 className="relative self-stretch text-neutral-900 text-[40px] sm:text-[54px] lg:text-[64px] font-bold font-heading leading-[1.12] sm:leading-[1.14] tracking-tight">
                    Renta de autos en México,<br className="hidden sm:inline" />{' '}
                    <span className="relative inline-block whitespace-nowrap">
                      <span className="relative z-10">100 % en línea</span>
                      <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-2.5 sm:h-3.5 bg-blue-300 rounded-sm -z-0" />
                    </span>{' '}
                    y al instante
                  </h1>

                  <p className="self-stretch text-neutral-600 text-base sm:text-lg font-normal font-heading leading-relaxed max-w-[760px] mx-auto">
                    Renta tu auto en línea, elige tu modelo y firma tu contrato digital. Unidades inspeccionadas y listas para entrega en nuestras sucursales.
                  </p>
                </div>

                {/* Card con Barra de Búsqueda sobre Fondo con exactamente 20px de padding */}
                <div className="w-full max-w-[944px] relative rounded-2xl border border-slate-200 overflow-visible p-[20px] bg-slate-100 flex flex-col justify-center items-center">
                  {/* Imagen de fondo / vehículo en la parte posterior contenida con bordes redondeados */}
                  <div className="absolute inset-0 pointer-events-none z-0 rounded-2xl overflow-hidden">
                    <picture>
                      <source
                        media="(max-width: 639px)"
                        srcSet="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793770120055-0-3434.webp"
                      />
                      <img
                        src={`${((import.meta as any).env?.BASE_URL || '/').replace(/\/$/, '')}/images/figma-hero.webp`}
                        alt="Renta de autos en México — GALSA Rent"
                        className="w-full h-full object-cover object-center"
                      />
                    </picture>
                  </div>

                  {/* Search Container interactivo superpuesto sin sombras */}
                  <div className="w-full relative z-20 flex justify-center overflow-visible">
                    <SearchContainer
                      searchState={searchState}
                      onSearchChange={setSearchState}
                      onExecuteSearch={handleExecuteSearch}
                      totalResultsCount={VEHICLES.length}
                      className="shadow-none border border-slate-200/80 overflow-visible"
                    />
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
                        className="px-3 py-1.5 rounded-[8px] border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
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
                        className="px-3 py-1.5 rounded-[8px] border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
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

      {/* Footer corporativo GALSA */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
