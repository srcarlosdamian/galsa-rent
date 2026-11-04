import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Share2, ChevronRight, ChevronLeft,
  MapPin, Calendar, CarFront, Sparkles,
  Users, Fuel, Gauge, Award, CheckCircle2, Clock, 
  HelpCircle, ThumbsUp, CreditCard, Heart, ArrowRight,
  X, Briefcase, Wind, Smartphone, Camera, Car, Zap, Check,
  ClipboardCheck, Star
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

  // Calificación y reseñas del vehículo
  const ratingScore = vehicle.rating ? vehicle.rating.toFixed(2) : '4.96';
  const reviewCount = vehicle.reviewCount || 28;

  const mockReviews = [
    {
      id: 'rev-1',
      author: 'Carlos Mendoza',
      location: 'Durango, Dgo.',
      date: 'Octubre 2026',
      rating: 5,
      avatarColor: 'bg-blue-600',
      comment: `Excelente experiencia rentando el ${vehicle.make} ${vehicle.model}. El auto estaba impecable, con olor a nuevo, tanque lleno y entrega súper puntual en Plaza 450. El contrato digital se firmó en menos de 2 minutos sin filas ni burocracia.`,
    },
    {
      id: 'rev-2',
      author: 'Sofía Rodríguez',
      location: 'Ciudad de México',
      date: 'Octubre 2026',
      rating: 5,
      avatarColor: 'bg-emerald-600',
      comment: `Viajé por trabajo y carretera en Durango. La unidad se comportó de maravilla, aire acondicionado al 100 y el kilometraje libre te da total tranquilidad para moverte sin preocupaciones. Muy recomendado.`,
    },
    {
      id: 'rev-3',
      author: 'Alejandro Garza',
      location: 'Monterrey, N.L.',
      date: 'Septiembre 2026',
      rating: 5,
      avatarColor: 'bg-indigo-600',
      comment: `El mejor servicio de renta que he probado en México. Cero sorpresas con el precio, depósito en garantía devuelto íntegro y sin demoras a las 24 hrs de la entrega. La atención por WhatsApp fue de 10.`,
    },
    {
      id: 'rev-4',
      author: 'Mariana Treviño',
      location: 'Guadalajara, Jal.',
      date: 'Septiembre 2026',
      rating: 5,
      avatarColor: 'bg-amber-600',
      comment: `Súper fácil el proceso con el checklist digital al recibir y entregar el auto con fotos. Todo transparente y seguro. El ${vehicle.model} muy cómodo y espacioso para la familia. Definitivamente volveré a rentar aquí.`,
    },
    {
      id: 'rev-5',
      author: 'David Valenzuela',
      location: 'Mazatlán, Sin.',
      date: 'Agosto 2026',
      rating: 5,
      avatarColor: 'bg-rose-600',
      comment: `Renta rápida y confiable. El auto en óptimas condiciones mecánicas, suspensión perfecta para carretera y frenos impecables. La coordinación de entrega fue rápida y puntual en sucursal.`,
    },
    {
      id: 'rev-6',
      author: 'Valeria Morales',
      location: 'Torreón, Coah.',
      date: 'Agosto 2026',
      rating: 5,
      avatarColor: 'bg-violet-600',
      comment: `Increíble servicio. Tenía dudas sobre los requisitos pero en WhatsApp me atendieron de inmediato. Auto muy limpio, seguro vigente y contrato con validez legal. 100% recomendable.`,
    },
  ];

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
                <a
                  href="#resenas"
                  className="inline-flex items-center gap-1 text-slate-900 font-bold hover:text-blue-600 transition-colors"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                  <span>{ratingScore}</span>
                  <span className="font-medium text-slate-500 underline ml-0.5">({reviewCount})</span>
                </a>
                <span>·</span>
                <span>{vehicle.year} {vehicle.trim || vehicle.version}</span>
                <span>·</span>
                <span className="text-slate-800 font-medium">{vehicle.category}</span>
                <span>·</span>
                <span className="text-slate-500">{vehicle.location || 'Sucursal Plaza 450, Durango'}</span>
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

            {/* Sección: Reglas y condiciones (Exacto de la captura) */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                Reglas y condiciones
              </h3>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs space-y-3.5">
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={1.8} />
                    <span className="text-sm sm:text-base font-sans font-normal text-slate-800 leading-relaxed">
                      Documentación verificada antes de la entrega (licencia, identificación y comprobante).
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={1.8} />
                    <span className="text-sm sm:text-base font-sans font-normal text-slate-800 leading-relaxed">
                      Contrato digital firmado por ambas partes con validez legal.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={1.8} />
                    <span className="text-sm sm:text-base font-sans font-normal text-slate-800 leading-relaxed">
                      Cancelaciones: Las cancelaciones realizadas con más de 48 horas de anticipación reciben reembolso completo. Cancelaciones posteriores están sujetas a cargos parciales según el tiempo restante para el inicio de la renta.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={1.8} />
                    <span className="text-sm sm:text-base font-sans font-normal text-slate-800 leading-relaxed">
                      Multas y peajes durante la renta corren por cuenta del cliente.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={1.8} />
                    <span className="text-sm sm:text-base font-sans font-normal text-slate-800 leading-relaxed">
                      Cualquier daño se documenta con evidencia fotográfica en la devolución.
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-sans text-slate-500 pt-3 border-t border-slate-100">
                  Consulta los{' '}
                  <a
                    href="/terminos"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/terminos');
                      }
                    }}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    términos y condiciones
                  </a>{' '}
                  completos.
                </p>
              </div>
            </div>

            {/* Sección: Checklist controlado (Exacto de la captura) */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0" strokeWidth={1.8} />
                  <h4 className="text-base sm:text-lg font-heading font-bold text-slate-900">
                    Checklist controlado
                  </h4>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2.5 text-sm sm:text-base font-sans font-normal text-slate-700 leading-relaxed">
                    <span className="text-slate-400 font-bold select-none">•</span>
                    <span>Fotos de estado exterior e interior.</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm sm:text-base font-sans font-normal text-slate-700 leading-relaxed">
                    <span className="text-slate-400 font-bold select-none">•</span>
                    <span>Registro de kilometraje de salida y entrada.</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm sm:text-base font-sans font-normal text-slate-700 leading-relaxed">
                    <span className="text-slate-400 font-bold select-none">•</span>
                    <span>Nivel de combustible verificado.</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm sm:text-base font-sans font-normal text-slate-700 leading-relaxed">
                    <span className="text-slate-400 font-bold select-none">•</span>
                    <span>Firma digital de entrega y devolución.</span>
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
                <div className="flex items-center gap-1.5 text-xs font-heading font-medium text-slate-600 mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                  <span className="font-bold text-slate-900">{ratingScore}</span>
                  <span className="text-slate-400">·</span>
                  <a href="#resenas" className="text-slate-500 hover:text-slate-900 underline">
                    {reviewCount} evaluaciones
                  </a>
                </div>
              </div>

              {/* Fechas de viaje (Inicio y Fin como en el mockup) */}
              <div className="space-y-3">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 block">
                  TU VIAJE
                </span>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setCalendarOpen(!calendarOpen)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 hover:border-slate-400 transition-colors bg-white text-left flex items-center justify-between"
                  >
                    <div>
                      <span className="block text-[11px] font-heading font-medium text-slate-500 mb-0.5">Inicio del viaje</span>
                      <span className="text-[14px] font-heading font-semibold text-slate-900">
                        {startDate ? formatDisplayDate(startDate) : 'Elegir fecha de inicio'} · 10:00 a.m.
                      </span>
                    </div>
                    <Calendar className="w-[18px] h-[18px] text-slate-600 shrink-0" strokeWidth={1.4} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalendarOpen(!calendarOpen)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 hover:border-slate-400 transition-colors bg-white text-left flex items-center justify-between"
                  >
                    <div>
                      <span className="block text-[11px] font-heading font-medium text-slate-500 mb-0.5">Fin del viaje</span>
                      <span className="text-[14px] font-heading font-semibold text-slate-900">
                        {endDate ? formatDisplayDate(endDate) : 'Elegir fecha de devolución'} · 10:00 a.m.
                      </span>
                    </div>
                    <Calendar className="w-[18px] h-[18px] text-slate-600 shrink-0" strokeWidth={1.4} />
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

              {/* Punto de entrega (Exacto de la captura) */}
              <div className="pt-4 border-t border-slate-100 space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" strokeWidth={2} />
                  <span className="text-sm font-heading font-bold text-slate-900">
                    Punto de entrega
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-sans font-normal text-slate-500">
                  {vehicle.location ? (vehicle.location.endsWith('.') ? vehicle.location : `${vehicle.location}.`) : 'Sucursal Plaza 450, Durango.'}
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
            RESEÑAS Y CALIFICACIONES (Estilo Airbnb / Turo)
           ======================================================== */}
        <section id="resenas" className="mt-14 sm:mt-20 pt-10 border-t border-slate-100 text-left">
          {/* Header de Reseñas */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/60 px-3 py-1.5 rounded-xl">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400 shrink-0" />
                  <span className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                    {ratingScore}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                  {reviewCount} evaluaciones verificadas
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-sans text-slate-500 mt-2">
                Calificaciones reales de clientes que completaron su renta con GALSA Rent en Durango y México.
              </p>
            </div>
          </div>

          {/* Desglose de 6 métricas de calidad */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 mb-10">
            <div>
              <span className="block text-[11px] font-heading uppercase tracking-wider text-slate-500">Limpieza</span>
              <span className="text-base sm:text-lg font-heading font-extrabold text-slate-900 mt-0.5 block">4.9 ★</span>
            </div>
            <div>
              <span className="block text-[11px] font-heading uppercase tracking-wider text-slate-500">Puntualidad</span>
              <span className="text-base sm:text-lg font-heading font-extrabold text-slate-900 mt-0.5 block">5.0 ★</span>
            </div>
            <div>
              <span className="block text-[11px] font-heading uppercase tracking-wider text-slate-500">Comunicación</span>
              <span className="text-base sm:text-lg font-heading font-extrabold text-slate-900 mt-0.5 block">5.0 ★</span>
            </div>
            <div>
              <span className="block text-[11px] font-heading uppercase tracking-wider text-slate-500">Mecánica</span>
              <span className="text-base sm:text-lg font-heading font-extrabold text-slate-900 mt-0.5 block">4.9 ★</span>
            </div>
            <div>
              <span className="block text-[11px] font-heading uppercase tracking-wider text-slate-500">Check-in</span>
              <span className="text-base sm:text-lg font-heading font-extrabold text-slate-900 mt-0.5 block">5.0 ★</span>
            </div>
            <div>
              <span className="block text-[11px] font-heading uppercase tracking-wider text-slate-500">Calidad-precio</span>
              <span className="text-base sm:text-lg font-heading font-extrabold text-slate-900 mt-0.5 block">4.9 ★</span>
            </div>
          </div>

          {/* Grid de 6 Reseñas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockReviews.map((rev) => (
              <div 
                key={rev.id} 
                className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div>
                  {/* Autor y Avatar */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full ${rev.avatarColor} text-white font-heading font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}>
                      {rev.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-heading font-bold text-slate-900">
                          {rev.author}
                        </h4>
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-heading font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
                          ✓ Verificado
                        </span>
                      </div>
                      <p className="text-xs font-sans text-slate-500">
                        {rev.location} · {rev.date}
                      </p>
                    </div>
                  </div>

                  {/* Estrellas */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                    ))}
                  </div>

                  {/* Texto de la reseña */}
                  <p className="text-xs sm:text-sm font-sans font-normal text-slate-700 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

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
