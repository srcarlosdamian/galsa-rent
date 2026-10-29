import React, { useState } from 'react';
import { 
  ShieldCheck, Share2, ChevronRight, ChevronLeft,
  MapPin, ArrowLeft, Calendar, CarFront, Sparkles,
  Users, Fuel, Gauge, Award, CheckCircle2, Clock, 
  HelpCircle, ThumbsUp, CreditCard, Heart, ArrowRight
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
              href="/catalogo"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/catalogo');
                }
              }}
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-black font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.4} />
              <span>Volver al catálogo</span>
            </a>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">{vehicle.category}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px]">{vehicle.make} {vehicle.model}</span>
          </nav>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Compartir este vehículo"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-slate-700 hover:text-black px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
          </button>
        </div>

        {/* ========================================================
            1. GALERÍA DE FOTOS ESTILO TURO (GRID HERO: 1 Grande + 2 Pequeñas)
           ======================================================== */}
        <div className="relative rounded-[24px] overflow-hidden bg-slate-100 mb-8 sm:mb-12 border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-2">
            
            {/* Foto principal grande (2 columnas en desktop) */}
            <div className="lg:col-span-2 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-[18px] overflow-hidden bg-slate-900">
              <img
                src={mainPhoto}
                alt={`${vehicle.make} ${vehicle.model} ${vehicle.year} principal`}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />

              {/* Botón de favoritos flotante traslúcido */}
              <button
                type="button"
                onClick={() => setIsFav(!isFav)}
                aria-label="Favorito"
                className="absolute top-3.5 right-3.5 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/70 text-slate-900 backdrop-blur-md transition-all z-10"
              >
                <Heart
                  className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-800'}`}
                  strokeWidth={1.4}
                />
              </button>

              {/* Controles anterior / siguiente */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Foto anterior"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={1.4} />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Siguiente foto"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all"
                  >
                    <ChevronRight className="w-4 h-4" strokeWidth={1.4} />
                  </button>
                </>
              )}
            </div>

            {/* Dos fotos laterales en desktop */}
            <div className="hidden lg:grid grid-rows-2 gap-2">
              <div 
                className="relative rounded-[18px] overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => setActivePhotoIdx(1 % images.length)}
              >
                <img
                  src={sidePhoto1}
                  alt={`${vehicle.make} ${vehicle.model} vista lateral`}
                  className="w-full h-full object-cover object-center hover:opacity-90 transition-opacity"
                />
              </div>
              <div 
                className="relative rounded-[18px] overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => setActivePhotoIdx(2 % images.length)}
              >
                <img
                  src={sidePhoto2}
                  alt={`${vehicle.make} ${vehicle.model} vista interior`}
                  className="w-full h-full object-cover object-center hover:opacity-90 transition-opacity"
                />
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-heading font-semibold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                  <CarFront className="w-3.5 h-3.5" strokeWidth={1.4} />
                  <span>Ver fotos ({images.length})</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            2. GRID PRINCIPAL (Información Izquierda + Sticky Checkout Derecha)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COLUMNA IZQUIERDA: Ficha detallada idéntica a la referencia */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Título y Subtítulo con insignia Anfitrión */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                {vehicle.make} {vehicle.model}
              </h1>
              
              <div className="mt-2 flex items-center gap-2 flex-wrap text-sm text-slate-600 font-heading">
                <span>{vehicle.year} {vehicle.trim || vehicle.version}</span>
                <span>·</span>
                <div className="inline-flex items-center gap-1 text-slate-800 font-semibold">
                  <Award className="w-4 h-4 text-amber-500" strokeWidth={1.4} />
                  <span>{vehicle.host?.name ? `Anfitrión ${vehicle.host.name}` : 'Anfitrión Verificado GALSA'}</span>
                </div>
              </div>
            </div>

            {/* Badges de características superiores (Pills) */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-slate-100 text-slate-800 text-xs font-heading font-medium">
                <Users className="w-3.5 h-3.5 text-slate-600" strokeWidth={1.4} />
                {vehicle.seats} asientos
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-slate-100 text-slate-800 text-xs font-heading font-medium">
                <Fuel className="w-3.5 h-3.5 text-slate-600" strokeWidth={1.4} />
                {vehicle.fuel}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-slate-100 text-slate-800 text-xs font-heading font-medium">
                <Gauge className="w-3.5 h-3.5 text-slate-600" strokeWidth={1.4} />
                {vehicle.specs?.mpgOrFuelEconomy || 'Rendimiento eficiente'}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-slate-100 text-slate-800 text-xs font-heading font-medium">
                <CarFront className="w-3.5 h-3.5 text-slate-600" strokeWidth={1.4} />
                {vehicle.transmission}
              </span>
            </div>

            {/* Banner Verde: ¡Gran oferta! */}
            <div className="p-4 rounded-[12px] bg-emerald-50/80 border border-emerald-200/60 text-emerald-900 space-y-0.5">
              <p className="text-xs font-heading font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.4} />
                ¡Gran oferta para tu viaje en México!
              </p>
              <p className="text-xs font-sans text-emerald-700">
                Esta unidad cuenta con tarifa preferencial, kilometraje libre y depósito en garantía 100% reembolsable.
              </p>
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

            {/* Sección: Características del vehículo (2 columnas como en la referencia) */}
            <div className="pt-2 border-t border-slate-100 space-y-4">
              <h3 className="text-lg font-heading font-bold text-slate-900">
                Características del vehículo
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="space-y-2.5">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 block">
                    Seguridad y Confort
                  </span>
                  <div className="space-y-2 text-xs sm:text-sm font-sans text-slate-700">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Frenos ABS y control de estabilidad
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Bolsas de aire frontales y laterales
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Aire acondicionado de alta eficiencia
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Cámara de reversa y sensores
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900 block">
                    Conectividad y Equipo
                  </span>
                  <div className="space-y-2 text-xs sm:text-sm font-sans text-slate-700">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Apple CarPlay & Android Auto
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Bluetooth y puertos USB de carga rápida
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Controles de audio al volante
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Elevadores eléctricos y llave inteligente
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección: Incluido con tu viaje (Íconos + Textos como en la referencia) */}
            <div className="pt-2 border-t border-slate-100 space-y-4">
              <h3 className="text-lg font-heading font-bold text-slate-900">
                Incluido con tu viaje
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-800 mt-0.5">
                    <CarFront className="w-4 h-4" strokeWidth={1.4} />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-slate-900">
                      Olvídate del mostrador de renta tradicional
                    </h4>
                    <p className="text-xs font-sans text-slate-500 mt-0.5 leading-relaxed">
                      Firma tu contrato digital desde tu teléfono y realiza la entrega rápida en minutos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-800 mt-0.5">
                    <ShieldCheck className="w-4 h-4" strokeWidth={1.4} />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-slate-900">
                      Asistencia en el camino 24/7 en México
                    </h4>
                    <p className="text-xs font-sans text-slate-500 mt-0.5 leading-relaxed">
                      Soporte vial continuo ante cualquier eventualidad durante todo tu periodo de renta.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-800 mt-0.5">
                    <Clock className="w-4 h-4" strokeWidth={1.4} />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-slate-900">
                      Tolerancia de entrega flexible
                    </h4>
                    <p className="text-xs font-sans text-slate-500 mt-0.5 leading-relaxed">
                      Coordinación directa para entregas en sucursal o terminal aérea con hasta 2 horas de margen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección: Reglas del camino (Iconos tachados y de advertencia) */}
            <div className="pt-2 border-t border-slate-100 space-y-4">
              <h3 className="text-lg font-heading font-bold text-slate-900">
                Reglas del camino
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicle.rules && vehicle.rules.length > 0 ? (
                  vehicle.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" strokeWidth={1.4} />
                      <span className="text-xs font-sans text-slate-700 leading-relaxed">{rule}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-sans text-slate-700">
                      Prohibido fumar dentro del vehículo.
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-sans text-slate-700">
                      Devolver con el mismo nivel de combustible.
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: Sticky Card Checkout Exacto Mockup Turo */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-[24px] border border-slate-200/90 p-6 sm:p-7 shadow-lg space-y-6 text-left">
              
              {/* Precio y Comparativa */}
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-400 line-through text-base font-heading">
                    ${originalSubtotal.toLocaleString('es-MX')}
                  </span>
                  <span className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
                    ${total.toLocaleString('es-MX')} total
                  </span>
                </div>
                <p className="text-[11px] font-sans text-slate-400 mt-0.5">
                  Por {rentalDays} {rentalDays === 1 ? 'día' : 'días'} con kilometraje libre e impuestos incluidos
                </p>
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
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-white text-left flex items-center justify-between"
                  >
                    <div>
                      <span className="block text-[11px] font-heading font-medium text-slate-400">Inicio del viaje</span>
                      <span className="text-xs font-heading font-semibold text-slate-900">
                        {startDate ? formatDisplayDate(startDate) : 'Elegir fecha de inicio'} · 10:00 a.m.
                      </span>
                    </div>
                    <Calendar className="w-4 h-4 text-slate-500" strokeWidth={1.4} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalendarOpen(!calendarOpen)}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-white text-left flex items-center justify-between"
                  >
                    <div>
                      <span className="block text-[11px] font-heading font-medium text-slate-400">Fin del viaje</span>
                      <span className="text-xs font-heading font-semibold text-slate-900">
                        {endDate ? formatDisplayDate(endDate) : 'Elegir fecha de devolución'} · 10:00 a.m.
                      </span>
                    </div>
                    <Calendar className="w-4 h-4 text-slate-500" strokeWidth={1.4} />
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

              {/* Ahorros del viaje */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-heading">
                <span className="text-slate-600">Descuento de tarifa directa</span>
                <span className="font-bold text-emerald-600">-$250 MXN</span>
              </div>

              {/* Botón Morado/Azul de Reserva */}
              <button
                type="button"
                onClick={handleBooking}
                style={{ backgroundColor: '#4F46E5' }}
                className="w-full py-3.5 rounded-xl text-white font-heading font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Continuar</span>
              </button>

              {/* Política de cancelación */}
              <div className="pt-4 border-t border-slate-100 space-y-1">
                <div className="flex items-start gap-2.5">
                  <ThumbsUp className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" strokeWidth={1.4} />
                  <div>
                    <h5 className="text-xs font-heading font-bold text-slate-900">Cancelación gratis</h5>
                    <p className="text-[11px] font-sans text-slate-500 leading-snug">
                      Reembolso completo cancelando hasta 24 horas antes de la hora de inicio.
                    </p>
                  </div>
                </div>
              </div>

              {/* Opciones de pago */}
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <div className="flex items-start gap-2.5">
                  <CreditCard className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" strokeWidth={1.4} />
                  <div>
                    <h5 className="text-xs font-heading font-bold text-slate-900">Pago protegido</h5>
                    <p className="text-[11px] font-sans text-slate-500 leading-snug">
                      Firma tu contrato digital y asegura tu unidad con depósito reembolsable.
                    </p>
                  </div>
                </div>
              </div>

              {/* Distancia incluida */}
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <div className="flex items-start gap-2.5">
                  <Gauge className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" strokeWidth={1.4} />
                  <div>
                    <h5 className="text-xs font-heading font-bold text-slate-900">Kilometraje libre</h5>
                    <p className="text-[11px] font-sans text-slate-500 leading-snug">
                      Sin límites de kilometraje diario para viajar por cualquier carretera de México.
                    </p>
                  </div>
                </div>
              </div>

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
            4. BANNER FINAL TIPO HOME: INVITACIÓN A EMPEZAR CONVERSACIÓN
           ======================================================== */}
        <div className="mt-12 sm:mt-16">
          <div className="w-full bg-[#F9FAFB] border border-slate-200/60 rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              
              {/* Lado Izquierdo */}
              <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                    ¿Tienes dudas sobre esta unidad o requieres cotización especial?
                  </h3>
                  <p className="text-sm font-sans text-slate-600 leading-relaxed">
                    Inicia una conversación directa con nuestro equipo. Te asesoramos sobre requisitos, contratos para empresas y entregas personalizadas en terminales aéreas.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="https://wa.me/526180000000?text=Hola%20GALSA%20Rent%2C%20tengo%20preguntas%20sobre%20una%20unidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: '#4F46E5' }}
                    className="inline-flex items-center justify-center text-white hover:brightness-110 active:scale-95 font-heading font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-xs gap-2"
                  >
                    <span>Empezar conversación</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.4} />
                  </a>

                  <a
                    href="/faq"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/faq');
                      }
                    }}
                    className="text-sm font-heading font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors"
                  >
                    Ver preguntas frecuentes
                  </a>
                </div>
              </div>

              {/* Lado Derecho: Imagen del hero redondeada */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[460px] aspect-[16/10] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-200 shadow-sm border border-slate-200/80">
                  <img
                    src={heroCarImg}
                    alt="Atención personalizada GALSA Rent"
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
