import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Share2, ChevronRight, ChevronLeft,
  MapPin, Calendar, CarFront, Sparkles,
  Users, Fuel, Gauge, Award, CheckCircle2, Clock, 
  HelpCircle, ThumbsUp, CreditCard, Heart, ArrowRight,
  X, Briefcase, Wind, Smartphone, Camera, Car, Zap, Check
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { VEHICLES } from '../data/vehicles';
import { VehicleCard } from './VehicleCard';
import { DateRangePicker } from './DateRangePicker';

interface VehicleDetailViewProps {
  vehicle: Vehicle;
  onNavigate?: (path: string) => void;
}

export const VehicleDetailView: React.FC<VehicleDetailViewProps> = ({
  vehicle,
  onNavigate,
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [rentalDays, setRentalDays] = useState(3);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);

  // Bloquear scroll y permitir cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGalleryModalOpen(false);
    };
    if (galleryModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [galleryModalOpen]);

  const baseUrl = ((import.meta as any).env?.BASE_URL || '/');
  const heroCarImg = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}images/figma-hero.webp`;

  // Imágenes del vehículo
  const images = vehicle.images && vehicle.images.length > 0 
    ? vehicle.images.map(img => typeof img === 'string' ? img : img.url)
    : [heroCarImg];

  const mainPhoto = images[activePhotoIdx] || images[0];
  const sidePhoto1 = images[1] || images[0];
  const sidePhoto2 = images[2] || images[0];

  // Cálculo de fechas
  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 3;
    const s = new Date(start + 'T00:00:00');
    const e = new Date(end + 'T00:00:00');
    const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setRentalDays(calculateDays(start, end));
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    if (!y || !m || !d) return dateStr;
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${d}/${m}/${y}`;
  };

  // Cálculo de precios exactos
  const baseSubtotal = vehicle.pricePerDay * rentalDays;
  const serviceFee = Math.round(baseSubtotal * 0.33);
  const total = baseSubtotal + serviceFee;
  const originalSubtotal = Math.round(baseSubtotal * 1.12);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.make} ${vehicle.model} ${vehicle.year} | GALSA RENT`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBooking = () => {
    const msg = encodeURIComponent(
      `Hola GALSA Rent! Me interesa rentar el ${vehicle.make} ${vehicle.model} ${vehicle.year} por ${rentalDays} días con entrega en México. ¿Está disponible?`
    );
    window.open(`https://wa.me/526180000000?text=${msg}`, '_blank');
  };

  // Autos similares para la misma categoría o uso
  const similarVehicles = VEHICLES.filter((v) => v.id !== vehicle.id).slice(0, 3);

  const prevImage = () => {
    setActivePhotoIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setActivePhotoIdx((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="w-full py-4 sm:py-8 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb & Share */}
        <div className="pb-4 mb-4 flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="text-xs font-heading font-medium text-slate-500 flex items-center gap-1.5 flex-wrap">
            <a
              href="/"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/');
                }
              }}
              className="text-slate-600 hover:text-black transition-colors"
            >
              Inicio
            </a>
            <span className="text-slate-300">/</span>
            <a
              href="/catalogo"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/catalogo');
                }
              }}
              className="text-slate-600 hover:text-black transition-colors"
            >
              Vehículos
            </a>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[280px]">
              {vehicle.make} {vehicle.model}
            </span>
          </nav>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Compartir este vehículo"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-slate-700 hover:text-black px-2.5 py-1.5 rounded-[8px] hover:bg-slate-100 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
          </button>
        </div>

        {/* ========================================================
            1. GALERÍA DE FOTOS (1 Grande a la izquierda + 2 Pequeñas a la derecha)
           ======================================================== */}
        <div className="mb-8 sm:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[280px] sm:h-[380px] md:h-[420px] lg:h-[460px]">
            
            {/* Foto principal grande (izquierda, 8 columnas en desktop) */}
            <div 
              onClick={() => setGalleryModalOpen(true)}
              className="md:col-span-8 relative h-full rounded-[16px] sm:rounded-[20px] overflow-hidden bg-slate-100 cursor-pointer group"
            >
              <img
                src={images[0]}
                alt={`${vehicle.make} ${vehicle.model} vista principal`}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* Botón de favoritos flotante traslúcido */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFav(!isFav);
                }}
                aria-label="Favorito"
                className="absolute top-3.5 right-3.5 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-slate-900 backdrop-blur-md transition-all z-10 shadow-xs"
              >
                <Heart
                  className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-800'}`}
                  strokeWidth={1.4}
                />
              </button>

              {/* En mobile: botón "Ver X fotos" sobre la foto principal */}
              <div className="md:hidden absolute bottom-3 right-3 bg-white/95 text-slate-900 text-xs font-heading font-medium px-3.5 py-1.5 rounded-full shadow-md">
                Ver {images.length} fotos
              </div>
            </div>

            {/* Dos fotos laterales apiladas a la derecha (4 columnas en desktop) */}
            <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-3 h-full">
              {/* Foto lateral 1 (arriba) */}
              <div 
                onClick={() => setGalleryModalOpen(true)}
                className="relative h-full rounded-[16px] sm:rounded-[20px] overflow-hidden bg-slate-100 cursor-pointer group"
              >
                <img
                  src={images[1] || images[0]}
                  alt={`${vehicle.make} ${vehicle.model} vista lateral`}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              {/* Foto lateral 2 (abajo con botón "Ver X fotos") */}
              <div 
                onClick={() => setGalleryModalOpen(true)}
                className="relative h-full rounded-[16px] sm:rounded-[20px] overflow-hidden bg-slate-100 cursor-pointer group"
              >
                <img
                  src={images[2] || images[0]}
                  alt={`${vehicle.make} ${vehicle.model} vista interior`}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-3 right-3 bg-white/95 text-slate-900 text-xs font-heading font-medium px-3.5 py-1.5 rounded-full shadow-md transition-transform duration-200 group-hover:scale-105">
                  Ver {images.length} fotos
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal flotante de Galería completa (se cierra con X o dando clic afuera) */}
        {galleryModalOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150"
            onClick={() => setGalleryModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-4xl bg-white rounded-[24px] shadow-2xl p-4 sm:p-6 my-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barra superior del Modal */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 sticky top-0 bg-white z-10 -mt-1 pt-1">
                <div className="flex-1 text-center">
                  <h3 className="text-sm sm:text-base font-heading font-semibold text-slate-900">
                    {vehicle.make} {vehicle.model} {vehicle.year} · 5.0 ★
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0 ml-2"
                  aria-label="Cerrar modal"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Contenido de Fotos del Modal */}
              <div className="space-y-3">
                {/* Foto Principal grande */}
                {images.length > 0 && (
                  <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-[16px] overflow-hidden bg-slate-100">
                    <img
                      src={images[0]}
                      alt={`${vehicle.make} ${vehicle.model} foto 1`}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}

                {/* Grid de fotos secundarias en 2 columnas */}
                {images.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {images.slice(1).map((imgUrl, idx) => (
                      <div key={idx} className="w-full aspect-[16/10] rounded-[14px] overflow-hidden bg-slate-100">
                        <img
                          src={imgUrl}
                          alt={`${vehicle.make} ${vehicle.model} foto ${idx + 2}`}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            2. GRID PRINCIPAL (Información Izquierda + Sticky Checkout Derecha)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COLUMNA IZQUIERDA: Ficha detallada idéntica a la referencia */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Título y Subtítulo */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                {vehicle.make} {vehicle.model}
              </h1>
              
              <div className="mt-2 flex items-center gap-2 flex-wrap text-sm text-slate-600 font-heading">
                <span>{vehicle.year} {vehicle.trim || vehicle.version}</span>
                <span>·</span>
                <span className="text-slate-800 font-medium">{vehicle.category}</span>
                <span>·</span>
                <span className="text-slate-500">{vehicle.location || 'Durango, México'}</span>
              </div>
            </div>

            {/* Sección: Clase / Categoría del Vehículo */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <h3 className="text-lg font-heading font-bold text-slate-900">
                {vehicle.category}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                {vehicle.description || 'Unidad inspeccionada mecánicamente con contrato mercantil digital y entrega rápida en nuestras ubicaciones oficiales.'}
              </p>
            </div>

            {/* Sección: Lo que ofrece este vehículo (Estructura idéntica a Airbnb) */}
            <div className="pt-6 border-t border-slate-100 space-y-6">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                Lo que ofrece este vehículo
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 lg:gap-x-12">
                <div className="flex items-center gap-4 text-slate-800">
                  <Users className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm sm:text-base font-heading font-medium text-slate-800">{vehicle.seats} asientos</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Fuel className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm sm:text-base font-heading font-medium text-slate-800">Combustible {vehicle.fuel.toLowerCase()}</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Calendar className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm sm:text-base font-heading font-medium text-slate-800">Año modelo {vehicle.year}</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Gauge className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm sm:text-base font-heading font-medium text-slate-800">Transmisión {vehicle.transmission.toLowerCase()}</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Car className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm sm:text-base font-heading font-medium text-slate-800">{vehicle.specs?.doors || 4} puertas</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Briefcase className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm sm:text-base font-heading font-medium text-slate-800">Espacio para {vehicle.specs?.luggage || 2} maletas</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Wind className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm sm:text-base font-heading font-medium text-slate-800">Aire acondicionado A/C</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <ShieldCheck className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm sm:text-base font-heading font-medium text-slate-800">Frenos ABS y bolsas de aire</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Camera className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm sm:text-base font-heading font-medium text-slate-800">Cámara de reversa y sensores</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <CarFront className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-sm sm:text-base font-heading font-medium text-slate-800">Carrocería {vehicle.category.split('/')[0].trim()}</span>
                </div>
              </div>
            </div>

            {/* Sección: Características y condiciones de uso (Exacto de la 2da imagen) */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                Características y condiciones de uso
              </h3>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-sm sm:text-base font-sans font-normal text-slate-800 leading-relaxed">
                      Kilometraje libre.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-sm sm:text-base font-sans font-normal text-slate-800 leading-relaxed">
                      Combustible: se entrega y devuelve con el mismo nivel.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-sm sm:text-base font-sans font-normal text-slate-800 leading-relaxed">
                      Edad mínima del conductor: 21 años con licencia vigente.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-sm sm:text-base font-sans font-normal text-slate-800 leading-relaxed">
                      Depósito en garantía reembolsable al cierre sin incidencias.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-sm sm:text-base font-sans font-normal text-slate-800 leading-relaxed">
                      Prohibido fumar dentro de la unidad.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: Sticky Card Checkout Exacto Mockup Turo */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-[24px] border border-slate-200/90 p-6 sm:p-7 shadow-lg space-y-6 text-left">
              
              {/* Precio */}
              <div className="pb-4 border-b border-slate-100">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 block">
                  ${total.toLocaleString('es-MX')} total
                </span>
              </div>

              {/* Fechas de viaje (Inicio y Fin como en el mockup) */}
              <div className="space-y-3">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 block">
                  Tu viaje
                </span>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setCalendarOpen(!calendarOpen)}
                    className="w-full px-4 py-3 rounded-[8px] border border-slate-300 hover:border-slate-400 transition-colors bg-white text-left flex items-center justify-between"
                  >
                    <div>
                      <span className="block text-[11px] font-heading font-medium text-slate-500 mb-0.5">Inicio del viaje</span>
                      <span className="text-[14px] font-heading font-semibold text-slate-900">
                        {startDate ? formatDisplayDate(startDate) : 'Elegir fecha de inicio'} · 10:00 a.m.
                      </span>
                    </div>
                    <Calendar className="w-[18px] h-[18px] text-slate-700 shrink-0" strokeWidth={1.4} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalendarOpen(!calendarOpen)}
                    className="w-full px-4 py-3 rounded-[8px] border border-slate-300 hover:border-slate-400 transition-colors bg-white text-left flex items-center justify-between"
                  >
                    <div>
                      <span className="block text-[11px] font-heading font-medium text-slate-500 mb-0.5">Fin del viaje</span>
                      <span className="text-[14px] font-heading font-semibold text-slate-900">
                        {endDate ? formatDisplayDate(endDate) : 'Elegir fecha de devolución'} · 10:00 a.m.
                      </span>
                    </div>
                    <Calendar className="w-[18px] h-[18px] text-slate-700 shrink-0" strokeWidth={1.4} />
                  </button>

                  {calendarOpen && (
                    <div className="relative z-50">
                      <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onChange={handleDateRangeChange}
                        onClose={() => setCalendarOpen(false)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Ubicación de recogida y devolución */}
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <span className="text-xs font-heading font-bold text-slate-900 block">
                  Ubicación de recogida y devolución
                </span>
                <p className="text-xs font-sans text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" strokeWidth={1.4} />
                  <span className="font-medium text-slate-800">{vehicle.location || 'Sucursal Plaza 450, Durango'}</span>
                </p>
              </div>

              {/* Botón Morado/Azul de Reserva */}
              <button
                type="button"
                onClick={handleBooking}
                style={{ backgroundColor: '#4F46E5' }}
                className="w-full py-3.5 rounded-[8px] text-white font-heading font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Continuar</span>
              </button>

            </div>
          </div>

        </div>

        {/* ========================================================
            3. AUTOS SIMILARES PARA TUS FECHAS (Idéntico a la segunda imagen)
           ======================================================== */}
        <div className="mt-14 sm:mt-20 pt-10 border-t border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                Autos similares para tus fechas
              </h2>
              <p className="text-xs sm:text-sm font-heading text-slate-500 mt-0.5">
                Opciones alternativas con entrega inmediata en México
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/catalogo"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/catalogo');
                  }
                }}
                className="text-xs font-heading font-semibold text-slate-700 hover:text-black flex items-center gap-1 transition-colors"
              >
                <span>Ver catálogo</span>
                <ChevronRight className="w-4 h-4" strokeWidth={1.4} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarVehicles.map((simCar) => (
              <VehicleCard
                key={simCar.id}
                vehicle={simCar}
                onSelect={(v) => {
                  if (onNavigate) {
                    onNavigate(`/vehiculos/${v.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* ========================================================
            4. BANNER FINAL: ¿TIENES DUDAS? (Formato idéntico al Home: fondo 50, sin línea, imagen 3D)
           ======================================================== */}
        <div className="mt-12 sm:mt-16">
          <div className="w-full bg-gray-50 rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 lg:p-14 border-0 shadow-none">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              
              {/* Lado Izquierdo: Título, Descripción y CTA */}
              <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-4 sm:space-y-5">
                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                  ¿Tienes dudas sobre esta unidad?
                </h3>

                <p className="text-sm sm:text-[15px] font-sans text-slate-600 leading-relaxed max-w-lg">
                  Atención local directa y personalizada en México. Resolvemos tus preguntas sobre modelos, requisitos, depósitos en garantía y entregas oficiales.
                </p>

                {/* Botón CTA único: Hablar por WhatsApp sin icono */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/526181234567?text=Hola%20GALSA%20Rent%2C%20tengo%20dudas%20sobre%20el%20vehículo%20${encodeURIComponent(vehicle.make + ' ' + vehicle.model)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: '#3D63FF' }}
                    className="inline-flex items-center justify-center text-white hover:brightness-110 active:scale-95 font-heading font-semibold text-sm px-7 py-3.5 rounded-xl transition-all shadow-none"
                  >
                    <span>Hablar por WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Lado Derecho: Imagen de dudas con esquinas redondeadas igual al Home */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-[16/10] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-transparent border-0 shadow-none">
                  <img
                    src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793605036943-0-gemini_generated_image_udcky4udcky4udck.webp"
                    alt={`Atención y dudas sobre ${vehicle.make} ${vehicle.model} - GALSA Rent`}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
