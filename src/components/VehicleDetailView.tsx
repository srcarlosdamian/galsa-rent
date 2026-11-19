import React, { useState, useEffect, useRef } from 'react';
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
import { CustomDropdown, TIME_DROPDOWN_OPTIONS } from './CustomDropdown';

interface VehicleDetailViewProps {
  vehicle: Vehicle;
  onNavigate?: (path: string) => void;
  onStartCheckout?: () => void;
}

export const VehicleDetailView: React.FC<VehicleDetailViewProps> = ({
  vehicle,
  onNavigate,
  onStartCheckout,
}) => {
  const [startDate, setStartDate] = useState('2026-11-04');
  const [endDate, setEndDate] = useState('2026-11-07');
  const [pickupTime, setPickupTime] = useState('08:00');
  const [returnTime, setReturnTime] = useState('18:00');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [rentalDays, setRentalDays] = useState(3);
  const [copied, setCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const [mobileCalendarOpen, setMobileCalendarOpen] = useState(false);
  const mobileCalendarRef = useRef<HTMLDivElement>(null);

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

  const cardHomeImage = 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793239505248-1-car.webp';
  const images = [cardHomeImage, cardHomeImage, cardHomeImage];

  const mainPhoto = images[0];
  const sidePhoto1 = images[1] || images[0];
  const sidePhoto2 = images[2] || images[0];

  // Cerrar calendario al hacer clic fuera
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    if (calendarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [calendarOpen]);

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
    if (!dateStr) return 'Seleccionar';
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const d = new Date(dateStr + 'T00:00:00');
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const formatRangeSummary = (s: string, e: string) => {
    if (!s || !e) return '4 nov — 7 nov';
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const sDate = new Date(s + 'T00:00:00');
    const eDate = new Date(e + 'T00:00:00');
    return `${sDate.getDate()} ${months[sDate.getMonth()]} — ${eDate.getDate()} ${months[eDate.getMonth()]}`;
  };

  // Cálculo de precios
  const baseSubtotal = vehicle.pricePerDay * rentalDays;
  const serviceFee = Math.round(baseSubtotal * 0.33);
  const total = baseSubtotal + serviceFee;

  // Al dar click en Continuar, AVANZAR AL CARRITO / CHECKOUT ("COMPLETA TU RESERVA")
  const handleProceedToCheckout = () => {
    if (onStartCheckout) {
      onStartCheckout();
    } else if (onNavigate) {
      onNavigate(`/reservar/${vehicle.slug}`);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://galsarent.com.mx/vehiculos/${vehicle.slug}`;
  const handleShare = () => {
    setShareModalOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const similarVehicles = VEHICLES.filter((v) => v.id !== vehicle.id).slice(0, 4);
  const ratingScore = vehicle.rating ? vehicle.rating.toFixed(2) : '4.96';
  const reviewCount = vehicle.reviewCount || 28;

  const mockReviews = [
    {
      id: 1,
      name: 'Sofía Valenzuela',
      date: 'Octubre 2026',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'El auto impecable, entrega rápida en Plaza 450 sin filas. El proceso 100% digital me ahorró más de una hora comparado con las agencias tradicionales.',
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      date: 'Septiembre 2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'Excelente camioneta para recorrer la sierra. El contrato digital y la verificación fue muy rápida desde el celular. Todo transparente.',
    },
  ];

  return (
    <div className="w-full pt-4 sm:pt-6 md:pt-8 pb-24 lg:pb-8 bg-white text-slate-900 text-left">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* ========================================================
            BARRA DE BREADCRUMBS Y ACCIONES
           ======================================================== */}
        <div className="pb-3 flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="text-xs font-heading font-medium text-slate-500 flex items-center gap-1.5 flex-wrap">
            <a
              href="/catalogo"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/catalogo');
                }
              }}
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-black font-semibold transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Volver al catálogo</span>
            </a>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">{vehicle.category}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px]">{vehicle.make} {vehicle.model}</span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-heading font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartir</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TÍTULO Y ENCABEZADO DEL VEHÍCULO
           ======================================================== */}
        <div className="pb-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {vehicle.make} {vehicle.model} {vehicle.year}
          </h1>
          <div className="flex items-center gap-2 mt-1.5 text-xs sm:text-sm font-sans text-slate-600 flex-wrap">
            <div className="flex items-center gap-1 text-slate-900 font-semibold">
              <Star className="w-4 h-4 fill-cta-300 text-cta-300" />
              <span>{ratingScore}</span>
            </div>
            <span>·</span>
            <span className="underline cursor-pointer">{reviewCount} evaluaciones</span>
            <span>·</span>
            <span>{vehicle.category}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-500">
              <MapPin className="w-3.5 h-3.5" />
              Durango, México (Sucursal Plaza 450)
            </span>
          </div>
        </div>

        {/* ========================================================
            GALERÍA DE FOTOS (1 principal izquierda + 2 apiladas derecha)
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-8 sm:mb-10">
          {/* Foto principal grande (izquierda) */}
          <div
            className="md:col-span-8 relative rounded-[20px] overflow-hidden bg-slate-100 h-[260px] sm:h-[340px] md:h-[400px] lg:h-[420px] cursor-pointer group"
            onClick={() => setGalleryModalOpen(true)}
          >
            <img
              src={mainPhoto}
              alt={`${vehicle.make} ${vehicle.model} principal`}
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
            />

            {/* Botón de favorito (corazón) en esquina superior derecha */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFav(!isFav);
              }}
              aria-label={isFav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-xs cursor-pointer z-10 ${
                isFav
                  ? 'bg-white text-red-500'
                  : 'bg-white/90 hover:bg-white text-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.8} />
            </button>

            {/* Pill móvil "Ver 3 fotos" */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setGalleryModalOpen(true);
              }}
              className="md:hidden absolute bottom-3.5 right-3.5 bg-white/95 hover:bg-white text-slate-900 rounded-full px-4 py-1.5 text-xs font-heading font-semibold transition-all cursor-pointer z-10"
            >
              Ver {images.length} fotos
            </button>
          </div>

          {/* Columna derecha: 2 fotos apiladas verticalmente */}
          <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-3 md:h-[400px] lg:h-[420px]">
            {/* Foto secundaria superior */}
            <div
              className="relative rounded-[20px] overflow-hidden bg-slate-100 cursor-pointer group"
              onClick={() => setGalleryModalOpen(true)}
            >
              <img
                src={sidePhoto1}
                alt={`${vehicle.make} ${vehicle.model} lateral`}
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            {/* Foto secundaria inferior con pill "Ver 3 fotos" */}
            <div
              className="relative rounded-[20px] overflow-hidden bg-slate-100 cursor-pointer group"
              onClick={() => setGalleryModalOpen(true)}
            >
              <img
                src={sidePhoto2}
                alt={`${vehicle.make} ${vehicle.model} detalle`}
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setGalleryModalOpen(true);
                }}
                className="absolute bottom-3.5 right-3.5 bg-white/95 hover:bg-white text-slate-900 rounded-full px-4 py-1.5 text-xs font-heading font-semibold transition-all cursor-pointer z-10"
              >
                Ver {images.length} fotos
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            GRID PRINCIPAL: DETALLES A LA IZQUIERDA Y STICKY CARD A LA DERECHA
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LADO IZQUIERDO: DETALLES DEL AUTO, ESPECIFICACIONES, REGLAS Y RESEÑAS */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Host info */}
            <div className="pb-6 border-b border-slate-100 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-heading font-bold text-slate-900">
                    Unidad verificada por GALSA Rent
                  </h2>
                  <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                    Inspección mecánica, seguro de cobertura amplia y sanitizado antes de cada entrega.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-cta-50 text-cta flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm font-sans text-slate-600 leading-relaxed">
                {vehicle.make} {vehicle.model} {vehicle.year} verificado para entrega inmediata sin filas en México. Kilometraje libre, contrato digital firmado desde tu celular y depósito reembolsable.
              </p>
            </div>

            {/* Lo que ofrece este vehículo */}
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-bold text-slate-900">
                Lo que ofrece este vehículo
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50">
                  <Users className="w-5 h-5 text-slate-700 shrink-0" />
                  <span className="text-sm font-heading font-medium text-slate-800">{vehicle.seats} asientos</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50">
                  <Fuel className="w-5 h-5 text-slate-700 shrink-0" />
                  <span className="text-sm font-heading font-medium text-slate-800">Combustible {vehicle.fuel.toLowerCase()}</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50">
                  <Calendar className="w-5 h-5 text-slate-700 shrink-0" />
                  <span className="text-sm font-heading font-medium text-slate-800">Año modelo {vehicle.year}</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50">
                  <Gauge className="w-5 h-5 text-slate-700 shrink-0" />
                  <span className="text-sm font-heading font-medium text-slate-800">Transmisión {vehicle.transmission.toLowerCase()}</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50">
                  <Car className="w-5 h-5 text-slate-700 shrink-0" />
                  <span className="text-sm font-heading font-medium text-slate-800">Carrocería {vehicle.category.split('/')[0].trim()}</span>
                </div>
              </div>
            </div>

            {/* Características y condiciones de uso */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xl font-heading font-bold text-slate-900">
                Características y condiciones de uso
              </h3>
              <ul className="space-y-3 text-sm font-sans text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Kilometraje libre.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Combustible: se entrega y devuelve con el mismo nivel.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Edad mínima del conductor: 21 años con licencia vigente.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Depósito en garantía reembolsable al cierre sin incidencias.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Prohibido fumar dentro de la unidad.</span>
                </li>
              </ul>
            </div>

            {/* Reglas y condiciones */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xl font-heading font-bold text-slate-900">
                Reglas y condiciones
              </h3>
              <ul className="space-y-3 text-sm font-sans text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Documentación verificada antes de la entrega (licencia, identificación y comprobante).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Contrato digital firmado por ambas partes con validez legal.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Cancelaciones: Las cancelaciones realizadas con más de 48 horas de anticipación reciben reembolso completo. Cancelaciones posteriores están sujetas a cargos parciales según el tiempo restante para el inicio de la renta.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Multas y peajes durante la renta corren por cuenta del cliente.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Cualquier daño se documenta con evidencia fotográfica en la devolución.</span>
                </li>
              </ul>

              <div className="bg-slate-50 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans text-slate-600">
                Consulta los{' '}
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('/terminos');
                  }}
                  className="font-heading font-bold text-slate-900 hover:text-cta underline-offset-2 hover:underline cursor-pointer"
                >
                  términos y condiciones
                </button>{' '}
                completos.
              </div>
            </div>

            {/* Checklist controlado */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xl font-heading font-bold text-slate-900">
                Checklist controlado
              </h3>
              <ul className="space-y-3 text-sm font-sans text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Fotos de estado exterior e interior.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Registro de kilometraje de salida y entrada.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Nivel de combustible verificado.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Firma digital de entrega y devolución.</span>
                </li>
              </ul>
            </div>

            {/* Calificaciones y opiniones */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-cta-300 text-cta-300" />
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  {ratingScore} · {reviewCount} evaluaciones
                </h3>
              </div>

              <div className="space-y-4">
                {mockReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-slate-900 text-sm">{rev.name}</span>
                      <span className="text-xs text-slate-400 font-sans">{rev.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ========================================================
              COLUMNA DERECHA: STICKY CARD DE PRECIO Y BOTÓN CONTINUAR
             ======================================================== */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-[24px] border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-6 text-left">
              
              {/* Tarifa total */}
              <div>
                <span className="text-3xl font-heading font-extrabold text-slate-900">
                  ${total.toLocaleString('es-MX')}
                </span>
                <span className="text-base font-heading font-medium text-slate-600 ml-1.5">
                  total
                </span>
              </div>

              {/* Ubicación y Sucursal */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div className="p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-sans text-slate-400 block">Ciudad</span>
                  <span className="text-xs font-heading font-bold text-slate-900 block mt-0.5">Durango</span>
                  <span className="text-[10px] font-sans text-slate-400 block mt-0.5">Ubicación del vehículo</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-sans text-slate-400 block">Sucursal</span>
                  <span className="text-xs font-heading font-bold text-slate-900 block mt-0.5">Plaza 450</span>
                  <span className="text-[10px] font-sans text-slate-400 block mt-0.5">Recogida y devolución</span>
                </div>
              </div>

              {/* Selector de Fechas y Horarios */}
              <div ref={calendarRef} className="relative space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-sans text-slate-500 mb-1">Fecha de recogida</label>
                    <button
                      type="button"
                      onClick={() => setCalendarOpen((prev) => !prev)}
                      className={`w-full px-3 py-2 rounded-xl border bg-white text-xs font-heading font-semibold flex items-center justify-between gap-1.5 text-left transition-all cursor-pointer ${
                        calendarOpen
                          ? 'border-cta ring-2 ring-cta/15 text-slate-900'
                          : 'border-slate-300 hover:border-slate-400 text-slate-900'
                      }`}
                    >
                      <span className="truncate">{formatDisplayDate(startDate)}</span>
                      <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans text-slate-500 mb-1">Hora de entrega</label>
                    <CustomDropdown
                      options={TIME_DROPDOWN_OPTIONS}
                      value={pickupTime}
                      onChange={setPickupTime}
                      displayValue={pickupTime}
                      size="sm"
                      align="right"
                      triggerIcon={Clock}
                      menuWidthClass="w-[240px]"
                      footer="Horario de sucursal: 08:00 a 20:00 hrs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-sans text-slate-500 mb-1">Fecha de devolución</label>
                    <button
                      type="button"
                      onClick={() => setCalendarOpen((prev) => !prev)}
                      className={`w-full px-3 py-2 rounded-xl border bg-white text-xs font-heading font-semibold flex items-center justify-between gap-1.5 text-left transition-all cursor-pointer ${
                        calendarOpen
                          ? 'border-cta ring-2 ring-cta/15 text-slate-900'
                          : 'border-slate-300 hover:border-slate-400 text-slate-900'
                      }`}
                    >
                      <span className="truncate">{formatDisplayDate(endDate)}</span>
                      <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans text-slate-500 mb-1">Hora de devolución</label>
                    <CustomDropdown
                      options={TIME_DROPDOWN_OPTIONS}
                      value={returnTime}
                      onChange={setReturnTime}
                      displayValue={returnTime}
                      size="sm"
                      align="right"
                      triggerIcon={Clock}
                      menuWidthClass="w-[240px]"
                      footer="Horario de sucursal: 08:00 a 20:00 hrs"
                    />
                  </div>
                </div>

                {calendarOpen && (
                  <div className="absolute top-full right-0 mt-2 z-[70]">
                    <DateRangePicker
                      startDate={startDate}
                      endDate={endDate}
                      onChange={handleDateRangeChange}
                      onClose={() => setCalendarOpen(false)}
                    />
                  </div>
                )}
              </div>

              {/* Desglose de precios exacto al diseño */}
              <div className="rounded-2xl bg-transparent p-4 border border-slate-200/80 space-y-2 text-xs font-sans text-slate-600">
                <div className="flex justify-between">
                  <span>${vehicle.pricePerDay.toLocaleString('es-MX')} × {rentalDays} días</span>
                  <span className="font-semibold text-slate-900">${baseSubtotal.toLocaleString('es-MX')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tarifa de servicio GALSA</span>
                  <span className="font-semibold text-slate-900">${serviceFee.toLocaleString('es-MX')}</span>
                </div>
                <div className="pt-2 border-t border-slate-200/80 flex justify-between text-sm font-heading font-bold text-slate-900">
                  <span>Total de la renta</span>
                  <span>${total.toLocaleString('es-MX')}</span>
                </div>
              </div>

              {/* Depósito en garantía */}
              <div className="flex justify-between items-center p-3 rounded-xl border border-slate-200/80 bg-transparent text-xs font-sans">
                <span className="text-slate-600">Depósito en garantía (reembolsable)</span>
                <span className="font-heading font-bold text-slate-900">${(vehicle.deposit || 15000).toLocaleString('es-MX')}</span>
              </div>

              {/* BOTÓN CONTINUAR -> AVANZA AL CHECKOUT / COMPLETA TU RESERVA */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-cta hover:bg-cta-600 text-white font-heading font-bold text-sm transition-all active:scale-[0.98] cursor-pointer text-center"
              >
                Continuar
              </button>

              <p className="text-[11px] text-center font-sans text-slate-400">
                Cancelación gratuita hasta 48 horas antes de la entrega
              </p>

            </div>
          </div>

        </div>

        {/* ========================================================
            AUTOS SIMILARES PARA TUS FECHAS (ANCHO COMPLETO DEL CONTENEDOR)
           ======================================================== */}
        <div className="mt-12 pt-10 border-t border-slate-100 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                Autos similares para tus fechas
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-500 mt-0.5">
                Opciones alternativas con entrega inmediata en México
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate('/catalogo');
              }}
              className="text-xs sm:text-sm font-heading font-bold text-slate-900 hover:text-cta transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Ver catálogo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similarVehicles.map((sim) => (
              <VehicleCard
                key={sim.id}
                vehicle={sim}
                onSelect={(selected) => {
                  if (onNavigate) onNavigate(`/vehiculos/${selected.slug}`);
                }}
              />
            ))}
          </div>
        </div>

        {/* ========================================================
            BANNER: ¿TIENES DUDAS SOBRE TU RENTA? (ANCHO COMPLETO DEL CONTENEDOR, ÚLTIMO BLOQUE)
           ======================================================== */}
        <div className="mt-12 sm:mt-14">
          <div className="w-full bg-gray-50 rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 lg:p-14 border-0 shadow-none">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-4 sm:space-y-5">
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                  ¿Tienes dudas sobre tu renta?
                </h2>
                <p className="text-sm sm:text-[15px] font-sans text-slate-600 leading-relaxed max-w-lg">
                  Atención local directa y personalizada en México. Resolvemos tus preguntas sobre modelos, requisitos, depósitos en garantía y entregas oficiales.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/526181234567?text=Hola%20GALSA%20Rent%2C%20tengo%20dudas%20sobre%20la%20renta%20de%20un%20auto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cta hover:bg-cta-600 inline-flex items-center justify-center text-white hover:brightness-110 active:scale-95 font-heading font-semibold text-sm px-7 py-3.5 rounded-xl transition-all shadow-none"
                  >
                    <span>Hablar por WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-[16/10] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-transparent border-0 shadow-none">
                  <img
                    src="https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793602180349-0-gemini_generated_image_jh5gb1jh5gb1jh5g-2.webp"
                    alt="Atención y renta de autos en México con GALSA Rent"
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BACKDROP MÓVIL PARA COTIZADOR FLOTANTE */}
      {mobileSheetOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30"
          onClick={() => {
            setMobileCalendarOpen(false);
            setMobileSheetOpen(false);
          }}
        />
      )}

      {/* BARRA MÓVIL INFERIOR FLOTANTE CON CHEVRON PARA ABRIR/CERRAR COTIZADOR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40">
        {mobileSheetOpen && (
          <div className="bg-surface border-t border-edge rounded-t-[24px] max-h-[80vh] overflow-y-auto px-4 sm:px-5 pt-4 pb-5 space-y-4">
            {/* Cabecera del panel desplegable */}
            <div className="flex items-center justify-between pb-3 border-b border-edge-light">
              <div>
                <h3 className="text-base font-heading font-extrabold text-ink-900">
                  Cotiza tu renta
                </h3>
                <p className="text-xs font-sans text-ink-500">
                  {vehicle.make} {vehicle.model} {vehicle.year}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileCalendarOpen(false);
                  setMobileSheetOpen(false);
                }}
                aria-label="Cerrar cotizador"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-ink-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Ciudad y Sucursal */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl border border-edge">
                <span className="text-[10px] font-sans text-ink-400 block">Ciudad</span>
                <span className="text-xs font-heading font-bold text-ink-900 block mt-0.5">Durango</span>
                <span className="text-[10px] font-sans text-ink-400 block mt-0.5">Ubicación del vehículo</span>
              </div>
              <div className="p-3 rounded-xl border border-edge">
                <span className="text-[10px] font-sans text-ink-400 block">Sucursal</span>
                <span className="text-xs font-heading font-bold text-ink-900 block mt-0.5">Plaza 450</span>
                <span className="text-[10px] font-sans text-ink-400 block mt-0.5">Recogida y devolución</span>
              </div>
            </div>

            {/* Fechas y Horarios */}
            <div ref={mobileCalendarRef} className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-sans text-ink-500 mb-1">Fecha de recogida</label>
                  <button
                    type="button"
                    onClick={() => setMobileCalendarOpen((prev) => !prev)}
                    className={`w-full px-3 py-2 rounded-xl border bg-surface text-xs font-heading font-semibold flex items-center justify-between gap-1.5 text-left transition-all cursor-pointer ${
                      mobileCalendarOpen
                        ? 'border-cta ring-2 ring-cta/15 text-ink-900'
                        : 'border-slate-300 text-ink-900'
                    }`}
                  >
                    <span className="truncate">{formatDisplayDate(startDate)}</span>
                    <Calendar className="w-3.5 h-3.5 text-ink-500 shrink-0" strokeWidth={1.5} />
                  </button>
                </div>
                <div>
                  <label className="block text-[11px] font-sans text-ink-500 mb-1">Hora de entrega</label>
                  <CustomDropdown
                    options={TIME_DROPDOWN_OPTIONS}
                    value={pickupTime}
                    onChange={setPickupTime}
                    displayValue={pickupTime}
                    size="sm"
                    align="right"
                    triggerIcon={Clock}
                    menuWidthClass="w-[220px]"
                    footer="Horario: 08:00 a 20:00 hrs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-sans text-ink-500 mb-1">Fecha de devolución</label>
                  <button
                    type="button"
                    onClick={() => setMobileCalendarOpen((prev) => !prev)}
                    className={`w-full px-3 py-2 rounded-xl border bg-surface text-xs font-heading font-semibold flex items-center justify-between gap-1.5 text-left transition-all cursor-pointer ${
                      mobileCalendarOpen
                        ? 'border-cta ring-2 ring-cta/15 text-ink-900'
                        : 'border-slate-300 text-ink-900'
                    }`}
                  >
                    <span className="truncate">{formatDisplayDate(endDate)}</span>
                    <Calendar className="w-3.5 h-3.5 text-ink-500 shrink-0" strokeWidth={1.5} />
                  </button>
                </div>
                <div>
                  <label className="block text-[11px] font-sans text-ink-500 mb-1">Hora de devolución</label>
                  <CustomDropdown
                    options={TIME_DROPDOWN_OPTIONS}
                    value={returnTime}
                    onChange={setReturnTime}
                    displayValue={returnTime}
                    size="sm"
                    align="right"
                    triggerIcon={Clock}
                    menuWidthClass="w-[220px]"
                    footer="Horario: 08:00 a 20:00 hrs"
                  />
                </div>
              </div>

              {mobileCalendarOpen && (
                <div className="pt-1 flex justify-center">
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDateRangeChange}
                    onClose={() => setMobileCalendarOpen(false)}
                  />
                </div>
              )}
            </div>

            {/* Desglose y Depósito */}
            <div className="rounded-2xl bg-transparent p-3.5 border border-edge space-y-2 text-xs font-sans text-ink-600">
              <div className="flex justify-between">
                <span>${vehicle.pricePerDay.toLocaleString('es-MX')} × {rentalDays} {rentalDays === 1 ? 'día' : 'días'}</span>
                <span className="font-semibold text-ink-900 tabular-nums">${baseSubtotal.toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between">
                <span>Tarifa de servicio GALSA</span>
                <span className="font-semibold text-ink-900 tabular-nums">${serviceFee.toLocaleString('es-MX')}</span>
              </div>
              <div className="pt-2 border-t border-edge-light flex justify-between text-sm font-heading font-bold text-ink-900">
                <span>Total de la renta</span>
                <span className="tabular-nums">${total.toLocaleString('es-MX')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl border border-edge bg-transparent text-xs font-sans">
              <span className="text-ink-600">Depósito en garantía (reembolsable)</span>
              <span className="font-heading font-bold text-ink-900 tabular-nums">${(vehicle.deposit || 15000).toLocaleString('es-MX')}</span>
            </div>

            <p className="text-[11px] text-center font-sans text-ink-400">
              Cancelación gratuita hasta 48 horas antes de la entrega
            </p>
          </div>
        )}

        {/* Barra flotante siempre visible con botón de chevron + CTA Continuar */}
        <div className="bg-surface border-t border-edge px-4 py-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileSheetOpen((prev) => !prev)}
            aria-expanded={mobileSheetOpen}
            aria-label={mobileSheetOpen ? 'Cerrar detalles de cotización' : 'Abrir detalles de cotización'}
            className="flex items-center gap-2.5 text-left min-w-0 cursor-pointer"
          >
            <div className="min-w-0">
              <span className="text-lg font-heading font-extrabold text-ink-900 block leading-tight tabular-nums">
                ${total.toLocaleString('es-MX')} MXN
              </span>
              <span className="text-xs font-sans text-ink-500 block truncate">
                {rentalDays} {rentalDays === 1 ? 'día' : 'días'} · Plaza 450
              </span>
            </div>
            <span className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-ink-700 flex items-center justify-center shrink-0 transition-colors">
              {mobileSheetOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </span>
          </button>

          <button
            type="button"
            onClick={handleProceedToCheckout}
            className="px-6 py-2.5 rounded-xl bg-cta hover:bg-cta-600 text-white font-heading font-semibold text-sm active:scale-95 cursor-pointer shrink-0 transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>

      {/* MODAL DE GALERÍA COMPLETA */}
      {galleryModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setGalleryModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${vehicle.make} ${vehicle.model} ${vehicle.year}`}
        >
          <div
            className="bg-white rounded-[24px] max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header centrado con botón X circular a la derecha */}
            <div className="relative flex items-center justify-center px-6 py-4 sm:py-5 shrink-0">
              <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 text-center pr-10 pl-10">
                {vehicle.make} {vehicle.model} {vehicle.year}
              </h3>
              <button
                type="button"
                onClick={() => setGalleryModalOpen(false)}
                aria-label="Cerrar galería"
                className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cta-400 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grid de todas las fotos: primera a ancho completo + resto en 2 columnas */}
            <div className="px-5 sm:px-6 pb-6 pt-1 overflow-y-auto space-y-3.5">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={images[0]}
                  alt={`${vehicle.make} ${vehicle.model} ${vehicle.year} - Foto 1`}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {images.slice(1).map((img, i) => (
                    <div
                      key={i}
                      className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100"
                    >
                      <img
                        src={img}
                        alt={`${vehicle.make} ${vehicle.model} ${vehicle.year} - Foto ${i + 2}`}
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

      {/* MODAL DE COMPARTIR */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-heading font-bold text-slate-900">Compartir vehículo</h4>
              <button onClick={() => setShareModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-600 truncate mr-2">{shareUrl}</span>
              <button
                onClick={handleCopyLink}
                className="text-xs font-bold text-cta shrink-0"
              >
                {linkCopied ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
