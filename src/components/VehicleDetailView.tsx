import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Share2, ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  MapPin, Calendar, CarFront, Sparkles,
  Users, Fuel, Gauge, Award, CheckCircle2, Clock, 
  HelpCircle, ThumbsUp, CreditCard, Heart, ArrowRight,
  X, Briefcase, Wind, Smartphone, Camera, Car, Zap, Check,
  ClipboardCheck, Star, Copy, Mail
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { VEHICLES } from '../data/vehicles';
import { VehicleCard } from './VehicleCard';
import { DateRangePicker } from './DateRangePicker';
import { TimeSelect } from './TimeSelect';

interface VehicleDetailViewProps {
  vehicle: Vehicle;
  onNavigate?: (path: string) => void;
}

const TIME_OPTIONS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00'
];

export const VehicleDetailView: React.FC<VehicleDetailViewProps> = ({
  vehicle,
  onNavigate,
}) => {
  const [startDate, setStartDate] = useState('2026-11-04');
  const [endDate, setEndDate] = useState('2026-11-07');
  const [pickupTime, setPickupTime] = useState('08:00');
  const [returnTime, setReturnTime] = useState('18:00');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [rentalDays, setRentalDays] = useState(3);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Bloquear scroll y permitir cerrar modales con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGalleryModalOpen(false);
        setMobileSheetOpen(false);
        setShareModalOpen(false);
      }
    };
    if (galleryModalOpen || mobileSheetOpen || shareModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [galleryModalOpen, mobileSheetOpen, shareModalOpen]);

  const baseUrl = ((import.meta as any).env?.BASE_URL || '/');
  const heroCarImg = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}images/figma-hero.webp`;

  // Imagen de las tarjetas del home repetida 5 veces para evitar fotos genéricas
  const cardHomeImage = 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793239505248-1-car.webp';
  const images = [cardHomeImage, cardHomeImage, cardHomeImage, cardHomeImage, cardHomeImage];

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

  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    if (val && endDate) {
      setRentalDays(calculateDays(val, endDate));
    }
  };

  const handleEndDateChange = (val: string) => {
    setEndDate(val);
    if (startDate && val) {
      setRentalDays(calculateDays(startDate, val));
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    if (!y || !m || !d) return dateStr;
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${d}/${m}/${y}`;
  };

  const formatRangeSummary = (s: string, e: string) => {
    if (!s || !e) return '4 nov — 7 nov';
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const sDate = new Date(s + 'T00:00:00');
    const eDate = new Date(e + 'T00:00:00');
    return `${sDate.getDate()} ${months[sDate.getMonth()]} — ${eDate.getDate()} ${months[eDate.getMonth()]}`;
  };

  // Cálculo de precios exactos
  const baseSubtotal = vehicle.pricePerDay * rentalDays;
  const serviceFee = Math.round(baseSubtotal * 0.33);
  const total = baseSubtotal + serviceFee;
  const originalSubtotal = Math.round(baseSubtotal * 1.12);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://galsarent.com.mx/vehiculos/${vehicle.slug}`;
  const shareText = `Renta este ${vehicle.make} ${vehicle.model} ${vehicle.year} en Durango con GALSA Rent`;

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleBooking = () => {
    // Navega a la página de reserva con los datos actuales
    if (onNavigate) {
      // Guardar datos en sessionStorage para recuperarlos en la página de reserva
      sessionStorage.setItem('reservationData', JSON.stringify({
        vehicleId: vehicle.id,
        startDate,
        endDate,
        pickupTime,
        returnTime,
      }));
      onNavigate(`/reserva/${vehicle.id}`);
    }
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
      avatarColor: 'bg-slate-100 text-black',
      comment: `Excelente experiencia rentando el ${vehicle.make} ${vehicle.model}. El auto estaba impecable, con olor a nuevo, tanque lleno y entrega súper puntual en Plaza 450. El contrato digital se firmó en menos de 2 minutos sin filas ni burocracia.`,
    },
    {
      id: 'rev-2',
      author: 'Sofía Rodríguez',
      location: 'Ciudad de México',
      date: 'Octubre 2026',
      rating: 5,
      avatarColor: 'bg-slate-100 text-black',
      comment: `Viajé por trabajo y carretera en Durango. La unidad se comportó de maravilla, aire acondicionado al 100 y el kilometraje libre te da total tranquilidad para moverte sin preocupaciones. Muy recomendado.`,
    },
    {
      id: 'rev-3',
      author: 'Alejandro Garza',
      location: 'Monterrey, N.L.',
      date: 'Septiembre 2026',
      rating: 4,
      avatarColor: 'bg-slate-100 text-black',
      comment: `El mejor servicio de renta que he probado en México. Cero sorpresas con el precio, depósito en garantía devuelto íntegro y sin demoras a las 24 hrs de la entrega. La atención por WhatsApp fue de 10.`,
    },
    {
      id: 'rev-4',
      author: 'Mariana Treviño',
      location: 'Guadalajara, Jal.',
      date: 'Septiembre 2026',
      rating: 5,
      avatarColor: 'bg-slate-100 text-black',
      comment: `Súper fácil el proceso con el checklist digital al recibir y entregar el auto con fotos. Todo transparente y seguro. El ${vehicle.model} muy cómodo y espacioso para la familia. Definitivamente volveré a rentar aquí.`,
    },
    {
      id: 'rev-5',
      author: 'David Valenzuela',
      location: 'Mazatlán, Sin.',
      date: 'Agosto 2026',
      rating: 5,
      avatarColor: 'bg-slate-100 text-black',
      comment: `Renta rápida y confiable. El auto en óptimas condiciones mecánicas, suspensión perfecta para carretera y frenos impecables. La coordinación de entrega fue rápida y puntual en sucursal.`,
    },
    {
      id: 'rev-6',
      author: 'Valeria Morales',
      location: 'Torreón, Coah.',
      date: 'Agosto 2026',
      rating: 4,
      avatarColor: 'bg-slate-100 text-black',
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
    <div className="w-full py-4 sm:py-8 bg-white pb-28 lg:pb-8">
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
            <span>Compartir</span>
          </button>
        </div>

        {/* ========================================================
            1. GALERÍA DE FOTOS (1 Grande a la izquierda + 2 Pequeñas a la derecha)
           ======================================================== */}
        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[260px] sm:h-[340px] lg:h-[380px] min-h-0">
            
            {/* Foto principal grande (izquierda, 8 columnas en desktop) */}
            <div 
              onClick={() => setGalleryModalOpen(true)}
              className="md:col-span-8 relative h-full min-h-0 rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-100 cursor-pointer group"
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
                  className={`w-4 h-4 transition-colors ${isFav ? 'fill-blue-500 text-blue-500' : 'text-slate-800'}`}
                  strokeWidth={1.4}
                />
              </button>

              {/* En mobile: botón "Ver X fotos" sobre la foto principal */}
              <div className="md:hidden absolute bottom-3 right-3 bg-white/95 text-slate-900 text-xs font-heading font-medium px-3.5 py-1.5 rounded-full shadow-md">
                Ver {images.length} fotos
              </div>
            </div>

            {/* Dos fotos laterales apiladas a la derecha (4 columnas en desktop) */}
            <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-3 h-full min-h-0">
              {/* Foto lateral 1 (arriba) */}
              <div 
                onClick={() => setGalleryModalOpen(true)}
                className="relative h-full min-h-0 rounded-[16px] sm:rounded-[20px] overflow-hidden bg-slate-100 cursor-pointer group"
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
                className="relative h-full min-h-0 rounded-[16px] sm:rounded-[20px] overflow-hidden bg-slate-100 cursor-pointer group"
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
            MODAL MINIMALISTA Y NEUTRAL DE COMPARTIR
           ======================================================== */}
        {shareModalOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
            onClick={() => setShareModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-md bg-white rounded-[24px] shadow-2xl p-6 border border-slate-100 text-left animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barra superior */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-heading font-bold text-slate-900 leading-tight">
                    Compartir vehículo
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    Envía este modelo o cópialo para más tarde
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShareModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors shrink-0 ml-2"
                  aria-label="Cerrar modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Ficha previa compacta del vehículo sin fondo gris */}
              <div className="my-5 flex items-center gap-3.5">
                <img 
                  src={mainPhoto} 
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-16 h-14 rounded-xl object-cover bg-white border border-slate-200/80 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-heading font-bold text-slate-900 truncate">
                    {vehicle.make} {vehicle.model} {vehicle.year}
                  </h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {vehicle.location || 'Sucursal Plaza 450, Durango'}
                  </p>
                  <p className="text-xs font-heading font-semibold text-slate-800 mt-1">
                    ${vehicle.pricePerDay.toLocaleString('es-MX')} <span className="text-[11px] font-normal text-slate-500">/ día</span>
                  </p>
                </div>
              </div>

              {/* Botones de Redes Sociales en diseño neutro y minimalista */}
              <div className="mb-5">
                <span className="block text-xs font-heading font-medium text-slate-600 mb-2.5">
                  Compartir en redes
                </span>
                <div className="grid grid-cols-4 gap-2.5 text-center">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' - ' + shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-800 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </div>
                    <span className="text-[11px] font-heading font-medium text-slate-700">WhatsApp</span>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-800 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <span className="text-[11px] font-heading font-medium text-slate-700">X</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-800 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="text-[11px] font-heading font-medium text-slate-700">Facebook</span>
                  </a>

                  {/* Correo */}
                  <a
                    href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent('Hola, mira este auto en renta que encontré:\n\n' + shareUrl)}`}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-800 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors">
                      <Mail className="w-4 h-4 text-slate-800" />
                    </div>
                    <span className="text-[11px] font-heading font-medium text-slate-700">Correo</span>
                  </a>
                </div>
              </div>

              {/* Copiar enlace */}
              <div>
                <span className="block text-xs font-heading font-medium text-slate-600 mb-1.5">
                  Copiar enlace directo
                </span>
                <div className="flex items-center gap-2 p-1.5 pl-3 rounded-xl border border-slate-200 bg-slate-50">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="w-full bg-transparent text-xs text-slate-700 font-mono focus:outline-none select-all truncate"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                      linkCopied
                        ? 'bg-slate-900 text-white'
                        : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-700" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
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
                  <Star className="w-4 h-4 fill-blue-300 text-blue-300 shrink-0" />
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

              {/* Descripción del vehículo en fuente de 16px sin título repetido ni línea divisoria */}
              <p className="mt-4 text-[16px] font-sans font-normal text-black leading-relaxed">
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
                  <span className="text-[16px] font-heading font-normal text-slate-800">{vehicle.seats} asientos</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Fuel className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">Combustible {vehicle.fuel.toLowerCase()}</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Calendar className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">Año modelo {vehicle.year}</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Gauge className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">Transmisión {vehicle.transmission.toLowerCase()}</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Car className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">{vehicle.specs?.doors || 4} puertas</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Briefcase className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">Espacio para {vehicle.specs?.luggage || 2} maletas</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Wind className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">Aire acondicionado A/C</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <ShieldCheck className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">Frenos ABS y bolsas de aire</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <Camera className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">Cámara de reversa y sensores</span>
                </div>

                <div className="flex items-center gap-4 text-slate-800">
                  <CarFront className="w-6 h-6 text-slate-800 shrink-0" strokeWidth={1.5} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">Carrocería {vehicle.category.split('/')[0].trim()}</span>
                </div>
              </div>
            </div>

            {/* Sección: Características y condiciones de uso (Una sola columna, checks neutros, sin contenedor con línea) */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                Características y condiciones de uso
              </h3>

              <div className="space-y-3.5">
                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Kilometraje libre.
                  </span>
                </div>

                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Combustible: se entrega y devuelve con el mismo nivel.
                  </span>
                </div>

                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Edad mínima del conductor: 21 años con licencia vigente.
                  </span>
                </div>

                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Depósito en garantía reembolsable al cierre sin incidencias.
                  </span>
                </div>

                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Prohibido fumar dentro de la unidad.
                  </span>
                </div>
              </div>
            </div>

            {/* Sección: Reglas y condiciones (Una sola columna, checks neutros, sin contenedor con línea) */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                Reglas y condiciones
              </h3>

              <div className="space-y-3.5">
                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Documentación verificada antes de la entrega (licencia, identificación y comprobante).
                  </span>
                </div>

                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Contrato digital firmado por ambas partes con validez legal.
                  </span>
                </div>

                <div className="flex items-start gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800 leading-relaxed">
                    Cancelaciones: Las cancelaciones realizadas con más de 48 horas de anticipación reciben reembolso completo. Cancelaciones posteriores están sujetas a cargos parciales según el tiempo restante para el inicio de la renta.
                  </span>
                </div>

                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Multas y peajes durante la renta corren por cuenta del cliente.
                  </span>
                </div>

                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Cualquier daño se documenta con evidencia fotográfica en la devolución.
                  </span>
                </div>

                <div className="inline-block w-auto rounded-xl bg-slate-50 p-3.5 sm:p-4 mt-2">
                  <p className="text-xs sm:text-sm font-sans text-slate-600">
                    Consulta los{' '}
                    <a
                      href="/terminos"
                      onClick={(e) => {
                        if (onNavigate) {
                          e.preventDefault();
                          onNavigate('/terminos');
                        }
                      }}
                      className="text-black font-semibold hover:underline"
                    >
                      términos y condiciones
                    </a>{' '}
                    completos.
                  </p>
                </div>
              </div>
            </div>

            {/* Sección: Checklist controlado (Sin contenedor con línea, sin icono en el título, con check en cada ítem) */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                Checklist controlado
              </h3>

              <div className="space-y-3.5">
                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Fotos de estado exterior e interior.
                  </span>
                </div>

                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Registro de kilometraje de salida y entrada.
                  </span>
                </div>

                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Nivel de combustible verificado.
                  </span>
                </div>

                <div className="flex items-center gap-3.5 text-slate-800">
                  <Check className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span className="text-[16px] font-heading font-normal text-slate-800">
                    Firma digital de entrega y devolución.
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: Sticky Card Checkout (Sólo Desktop, en Mobile se usa barra flotante) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-7 space-y-6 text-left">
              
              {/* Precio (sin calificación repetida abajo) */}
              <div className="pb-4 border-b border-neutral-100">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 block">
                  ${total.toLocaleString('es-MX')} total
                </span>
              </div>

              {/* Inputs de Ciudad, Sucursal y Fechas (sin título 'Fechas y sucursal') */}
              <div className="space-y-4 pt-1">
                {/* Fila 1: Ciudad y Sucursal bloqueadas */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-heading font-medium text-neutral-700 mb-1">
                      Ciudad
                    </label>
                    <div className="w-full px-4 py-3 rounded-[12px] border border-neutral-200 bg-neutral-50 text-neutral-900 font-heading font-medium text-[14px] cursor-not-allowed select-none">
                      Durango
                    </div>
                    <span className="block text-[11px] font-sans text-neutral-500 mt-1">
                      Ubicación del vehículo
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-medium text-neutral-700 mb-1">
                      Sucursal
                    </label>
                    <div className="w-full px-4 py-3 rounded-[12px] border border-neutral-200 bg-neutral-50 text-neutral-900 font-heading font-medium text-[14px] cursor-not-allowed select-none truncate">
                      Plaza 450
                    </div>
                    <span className="block text-[11px] font-sans text-neutral-500 mt-1">
                      Recogida y devolución
                    </span>
                  </div>
                </div>

                {/* Fila 2: Fecha de recogida y Hora de entrega */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-heading font-medium text-neutral-700 mb-1">
                      Fecha de recogida
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] border border-neutral-200 hover:border-neutral-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-500 bg-white text-neutral-900 font-heading font-medium text-[14px] outline-none transition-colors"
                    />
                  </div>

                  <TimeSelect
                    value={pickupTime}
                    onChange={setPickupTime}
                    label="Hora de entrega"
                  />
                </div>

                {/* Fila 3: Fecha de devolución y Hora de devolución */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-heading font-medium text-neutral-700 mb-1">
                      Fecha de devolución
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleEndDateChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] border border-neutral-200 hover:border-neutral-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-500 bg-white text-neutral-900 font-heading font-medium text-[14px] outline-none transition-colors"
                    />
                  </div>

                  <TimeSelect
                    value={returnTime}
                    onChange={setReturnTime}
                    label="Hora de devolución"
                  />
                </div>
              </div>

              {/* Desglose y Resumen de Precios */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm font-sans text-neutral-600">
                  <span>${vehicle.pricePerDay.toLocaleString('es-MX')} × {rentalDays} días</span>
                  <span className="font-heading font-semibold text-neutral-900">${baseSubtotal.toLocaleString('es-MX')}</span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm font-sans text-neutral-600">
                  <span>Tarifa de servicio GALSA</span>
                  <span className="font-heading font-semibold text-neutral-900">${serviceFee.toLocaleString('es-MX')}</span>
                </div>

                <div className="pt-3 border-t border-neutral-100">
                  <div className="flex items-center justify-between text-sm sm:text-base font-heading font-bold text-neutral-900">
                    <span>Total de la renta</span>
                    <span className="text-base sm:text-lg font-extrabold text-neutral-900">${total.toLocaleString('es-MX')}</span>
                  </div>
                </div>
              </div>

              {/* Depósito en garantía con mismo tamaño de texto que tarifa de servicio y precio homologado */}
              <div className="rounded-xl border border-neutral-200 bg-transparent px-4 py-3">
                <div className="flex items-center justify-between text-xs sm:text-sm font-sans text-neutral-600">
                  <span>Depósito en garantía (reembolsable)</span>
                  <span className="font-heading font-semibold text-neutral-900">${(vehicle.deposit || 15000).toLocaleString('es-MX')}</span>
                </div>
              </div>

              {/* Botón CTA Oficial GALSA de Reserva */}
              <button
                type="button"
                onClick={handleBooking}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-semibold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
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
          {/* Header de Reseñas: Primero 22 evaluaciones verificadas, luego badge con estrella 4.92 sin fondo con borde neutro */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                  {reviewCount} evaluaciones verificadas
                </h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-transparent text-slate-900 text-sm font-heading font-bold">
                  <Star className="w-4 h-4 fill-blue-300 text-blue-300 shrink-0" />
                  <span>{ratingScore}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-sans text-slate-500 mt-2">
                Calificaciones reales de clientes que completaron su renta con GALSA Rent en Durango y México.
              </p>
            </div>
          </div>

          {/* Desglose de 6 métricas de calidad (gris 50 sin línea) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 p-5 sm:p-6 rounded-2xl bg-slate-50 border-0 mb-10">
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

          {/* Grid de Reseñas: Avatar gris oscuro, texto negro sin líneas, verificado neutro sin emoji */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockReviews.map((rev) => (
              <div 
                key={rev.id} 
                className="rounded-2xl border-0 bg-white p-5 sm:p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Autor y Avatar gris 100 con texto negro */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-black font-heading font-bold text-sm flex items-center justify-center shrink-0">
                      {rev.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-heading font-bold text-black">
                          {rev.author}
                        </h4>
                        <span className="inline-flex items-center text-[10px] font-heading font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          Verificado
                        </span>
                      </div>
                      <p className="text-xs font-sans text-slate-500">
                        {rev.location} · {rev.date}
                      </p>
                    </div>
                  </div>

                  {/* Estrellas: azul 300 para calificaciones, gris claro para vacías */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 shrink-0 ${
                          i < rev.rating 
                            ? 'fill-blue-300 text-blue-300' 
                            : 'fill-slate-200 text-slate-200'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Texto de la reseña */}
                  <p className="text-xs sm:text-sm font-sans font-normal text-black leading-relaxed">
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

        {/* ========================================================
            BARRA FLOTANTE STEPPER EN MODO MOBILE (Minimalista)
            Chevron + Total a la izquierda, Continuar a la derecha
           ======================================================== */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            {/* Lado izquierdo: Chevron + Total y resumen de fechas */}
            <div
              className="flex items-center gap-2.5 cursor-pointer select-none group min-w-0"
              onClick={() => setMobileSheetOpen(!mobileSheetOpen)}
            >
              <button
                type="button"
                aria-label="Levantar configuración de reserva"
                className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 transition-all"
              >
                {mobileSheetOpen ? (
                  <ChevronDown className="w-4 h-4 text-slate-800" strokeWidth={2.2} />
                ) : (
                  <ChevronUp className="w-4 h-4 text-slate-800" strokeWidth={2.2} />
                )}
              </button>

              <div className="min-w-0 text-left">
                <span className="text-base font-heading font-extrabold text-slate-900 block leading-tight truncate">
                  ${total.toLocaleString('es-MX')} total
                </span>
                <span className="text-[11px] font-sans text-slate-500 font-medium block truncate">
                  {formatRangeSummary(startDate, endDate)} · {rentalDays} día{rentalDays > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Lado derecho: Botón Continuar */}
            <button
              type="button"
              onClick={handleBooking}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-semibold text-sm active:scale-95 transition-all shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <span>Continuar</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            BOTTOM SHEET DRAWER EN MODO MOBILE (Se levanta con el chevron o al pulsar Continuar)
           ======================================================== */}
        {mobileSheetOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end lg:hidden animate-in fade-in duration-200"
            onClick={() => setMobileSheetOpen(false)}
          >
            <div 
              className="bg-white w-full rounded-t-[24px] max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-250 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barra / Handle superior */}
              <div className="pt-3 pb-1 flex justify-center cursor-pointer" onClick={() => setMobileSheetOpen(false)}>
                <div className="w-10 h-1 bg-slate-300 rounded-full" />
              </div>

              {/* Header del Bottom Sheet */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                <div>
                  <span className="text-xl font-heading font-extrabold text-slate-900 block leading-tight">
                    ${total.toLocaleString('es-MX')} total
                  </span>
                  <span className="text-xs font-sans text-slate-500">
                    {vehicle.make} {vehicle.model} · Plaza 450
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSheetOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Cerrar configuración"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Contenido con scroll */}
              <div className="p-5 overflow-y-auto space-y-4">
                {/* Fila 1: Ciudad y Sucursal */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-heading font-medium text-slate-600 mb-1">
                      Ciudad
                    </label>
                    <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-heading font-semibold text-sm cursor-not-allowed select-none">
                      Durango
                    </div>
                    <span className="block text-[11px] font-sans text-slate-400 mt-1">
                      Ubicación del vehículo
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-medium text-slate-600 mb-1">
                      Sucursal
                    </label>
                    <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-heading font-semibold text-sm cursor-not-allowed select-none truncate">
                      Plaza 450
                    </div>
                    <span className="block text-[11px] font-sans text-slate-400 mt-1">
                      Recogida y devolución
                    </span>
                  </div>
                </div>

                {/* Fila 2: Fecha de recogida y Hora de entrega */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-heading font-medium text-slate-600 mb-1">
                      Fecha de recogida
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-heading font-semibold text-sm outline-none transition-colors"
                    />
                  </div>

                  <TimeSelect
                    value={pickupTime}
                    onChange={setPickupTime}
                    label="Hora de entrega"
                  />
                </div>

                {/* Fila 3: Fecha de devolución y Hora de devolución */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-heading font-medium text-slate-600 mb-1">
                      Fecha de devolución
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleEndDateChange(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-900 font-heading font-semibold text-sm outline-none transition-colors"
                    />
                  </div>

                  <TimeSelect
                    value={returnTime}
                    onChange={setReturnTime}
                    label="Hora de devolución"
                  />
                </div>

                {/* Desglose y Resumen de Precios */}
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-sans text-slate-600">
                    <span>${vehicle.pricePerDay.toLocaleString('es-MX')} × {rentalDays} días</span>
                    <span className="font-heading font-semibold text-slate-800">${baseSubtotal.toLocaleString('es-MX')}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm font-sans text-slate-600">
                    <span>Tarifa de servicio GALSA</span>
                    <span className="font-heading font-semibold text-slate-800">${serviceFee.toLocaleString('es-MX')}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between text-sm sm:text-base font-heading font-bold text-slate-900">
                      <span>Total de la renta</span>
                      <span className="text-base sm:text-lg font-extrabold text-slate-900">${total.toLocaleString('es-MX')}</span>
                    </div>
                  </div>
                </div>

                {/* Depósito en garantía con mismo tamaño de texto que tarifa de servicio y precio homologado */}
                <div className="rounded-xl border border-slate-200 bg-transparent px-4 py-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-sans text-slate-600">
                    <span>Depósito en garantía (reembolsable)</span>
                    <span className="font-heading font-semibold text-slate-800">${(vehicle.deposit || 15000).toLocaleString('es-MX')}</span>
                  </div>
                </div>

                {/* Botón Final Continuar */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileSheetOpen(false);
                    handleBooking();
                  }}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-semibold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Continuar</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
