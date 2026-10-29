import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, Share2, ChevronRight, ChevronLeft,
  MapPin, Info, ArrowLeft, Calendar, Sparkles, CarFront
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { VEHICLES } from '../data/vehicles';
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

  const baseUrl = ((import.meta as any).env?.BASE_URL || '/');
  // Usar la imagen WebP optimizada del sistema si es compatible o la imagen del vehículo
  const rawImage = vehicle.images && vehicle.images.length > 0 
    ? vehicle.images[activePhotoIdx] 
    : null;
  const displayImage = rawImage 
    ? (typeof rawImage === 'string' ? rawImage : rawImage.url)
    : `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}images/figma-car.webp`;

  // Calcula días entre fechas seleccionadas
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
    return `${d} ${months[parseInt(m, 10) - 1]}`;
  };

  // Exact 33% service fee strictly paid by customer
  const baseSubtotal = vehicle.pricePerDay * rentalDays;
  const serviceFee = Math.round(baseSubtotal * 0.33);
  const total = baseSubtotal + serviceFee;

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

  const relatedVehicles = VEHICLES.filter((v) => v.id !== vehicle.id).slice(0, 3);

  const prevImage = () => {
    setActivePhotoIdx((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const nextImage = () => {
    setActivePhotoIdx((prev) => (prev + 1) % vehicle.images.length);
  };

  return (
    <div className="w-full py-6 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header / Breadcrumbs Bar */}
        <div className="pb-5 mb-8 flex items-center justify-between gap-4">
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
            className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-slate-700 hover:text-black px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Columna Izquierda: Galería e Información Detallada */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Contenedor Principal de Imagen con esquinas redondeadas exactas de Figma */}
            <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-[28px] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm group">
              <img
                src={displayImage}
                alt={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Indicador de fotos */}
              {vehicle.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-heading font-medium tracking-wide">
                  {activePhotoIdx + 1} / {vehicle.images.length}
                </div>
              )}

              {/* Controles de navegación de fotos */}
              {vehicle.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Foto anterior"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={1.4} />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Siguiente foto"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" strokeWidth={1.4} />
                  </button>
                </>
              )}
            </div>

            {/* Identidad del vehículo */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight">
                {vehicle.make} {vehicle.model}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-heading font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                  Modelo {vehicle.year}
                </span>
                <span className="text-xs font-heading font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                  {vehicle.category}
                </span>
                <span className="text-xs font-heading font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.4} />
                  <span>Entrega en sucursal o aeropuerto</span>
                </span>
              </div>
            </div>

            {/* Especificaciones en tarjetas cuadradas con border radius homologado */}
            <div className="space-y-3.5 pt-2">
              <h2 className="text-lg font-heading font-semibold text-slate-900">
                Especificaciones
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-[16px] border border-slate-200 bg-slate-50/60">
                  <span className="text-[11px] text-slate-500 block uppercase font-heading font-semibold tracking-wider">Plazas</span>
                  <p className="text-sm font-heading font-bold text-slate-900 mt-1">{vehicle.seats} pasajeros</p>
                </div>
                <div className="p-4 rounded-[16px] border border-slate-200 bg-slate-50/60">
                  <span className="text-[11px] text-slate-500 block uppercase font-heading font-semibold tracking-wider">Transmisión</span>
                  <p className="text-sm font-heading font-bold text-slate-900 mt-1">{vehicle.transmission}</p>
                </div>
                <div className="p-4 rounded-[16px] border border-slate-200 bg-slate-50/60">
                  <span className="text-[11px] text-slate-500 block uppercase font-heading font-semibold tracking-wider">Combustible</span>
                  <p className="text-sm font-heading font-bold text-slate-900 mt-1">{vehicle.fuel}</p>
                </div>
                <div className="p-4 rounded-[16px] border border-slate-200 bg-slate-50/60">
                  <span className="text-[11px] text-slate-500 block uppercase font-heading font-semibold tracking-wider">Categoría</span>
                  <p className="text-sm font-heading font-bold text-slate-900 mt-1 truncate">{vehicle.category}</p>
                </div>
              </div>
            </div>

            {/* Características y equipamiento */}
            <div className="space-y-3.5 pt-2">
              <h2 className="text-lg font-heading font-semibold text-slate-900">
                Equipamiento y características
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {vehicle.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm font-sans text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reglas y condiciones claras */}
            <div className="space-y-3.5 pt-2">
              <h2 className="text-lg font-heading font-semibold text-slate-900">
                Reglas y condiciones de renta
              </h2>
              <div className="space-y-2 text-sm font-sans text-slate-600 leading-relaxed">
                {vehicle.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspección de entrega estilo GALSA */}
            <div className="p-5 sm:p-6 rounded-[24px] bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5 text-slate-900 font-heading font-semibold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" strokeWidth={1.4} />
                <span>Protocolo de entrega digital transparente</span>
              </div>
              <p className="text-xs font-sans text-slate-600 leading-relaxed">
                Cada entrega incluye un checklist fotográfico en tiempo real de carrocería, kilometraje y combustible directamente en tu celular, protegiendo tu depósito en garantía al 100%.
              </p>
            </div>

          </div>

          {/* Columna Derecha: Sticky Checkout / Reserva Estilo Home */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-[28px] border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Encabezado de precio */}
              <div className="pb-5 border-b border-slate-100 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
                      ${vehicle.pricePerDay.toLocaleString('es-MX')}
                    </span>
                    <span className="text-sm font-heading font-normal text-slate-500">MXN / día</span>
                  </div>
                  <span className="text-xs font-sans text-slate-400 block mt-1">
                    Tarifa transparente con kilometraje libre
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-heading font-semibold border border-emerald-200/60">
                  Disponible
                </span>
              </div>

              {/* Selector interactivo de Fechas */}
              <div className="space-y-2 relative">
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-slate-700">
                  Fechas de viaje
                </label>
                
                <button
                  type="button"
                  onClick={() => setCalendarOpen(!calendarOpen)}
                  className="w-full flex items-center justify-between p-3.5 rounded-[12px] border border-slate-300 hover:border-slate-400 transition-colors text-left bg-white"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Calendar className="w-4 h-4 text-slate-700 shrink-0" strokeWidth={1.4} />
                    <span className="text-xs sm:text-sm font-heading font-medium text-slate-900 truncate">
                      {startDate && endDate 
                        ? `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)} (${rentalDays} ${rentalDays === 1 ? 'día' : 'días'})`
                        : 'Seleccionar fechas de inicio y fin'}
                    </span>
                  </div>
                  <span className="text-xs font-heading font-semibold text-[#3D63FF] shrink-0">
                    {calendarOpen ? 'Cerrar' : 'Elegir'}
                  </span>
                </button>

                {calendarOpen && (
                  <div className="absolute right-0 top-full mt-2 z-50 shadow-2xl max-w-[95vw]">
                    <DateRangePicker
                      startDate={startDate}
                      endDate={endDate}
                      onChange={handleDateRangeChange}
                      onClose={() => setCalendarOpen(false)}
                    />
                  </div>
                )}
              </div>

              {/* Duración rápida */}
              <div className="space-y-2">
                <span className="block text-xs font-heading font-medium text-slate-500">
                  O selecciona días rápidos:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 7, 15].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setRentalDays(days)}
                      className={`py-2 px-3 rounded-lg text-xs font-heading font-semibold transition-all ${
                        rentalDays === days
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {days} {days === 1 ? 'día' : 'días'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desglose de Precios Limpio y Transparente */}
              <div className="p-4 rounded-[16px] bg-slate-50/80 border border-slate-100 space-y-2 text-xs font-heading">
                <div className="flex justify-between text-slate-600">
                  <span>${vehicle.pricePerDay.toLocaleString('es-MX')} MXN × {rentalDays} días</span>
                  <span>${baseSubtotal.toLocaleString('es-MX')} MXN</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tarifa de servicio y seguro (33%)</span>
                  <span>${serviceFee.toLocaleString('es-MX')} MXN</span>
                </div>
                <div className="pt-2 border-t border-slate-200/80 flex justify-between text-sm font-bold text-slate-900">
                  <span>Total estimado</span>
                  <span>${total.toLocaleString('es-MX')} MXN</span>
                </div>
              </div>

              {/* Botón CTA institucional */}
              <button
                type="button"
                onClick={handleBooking}
                style={{ backgroundColor: '#3D63FF' }}
                className="w-full py-4 rounded-[12px] text-white font-heading font-semibold text-sm hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <CarFront className="w-4 h-4" strokeWidth={1.4} />
                <span>Continuar reserva en línea</span>
              </button>

              <p className="text-[11px] text-center font-heading text-slate-400">
                Cancelación gratuita hasta 24 horas antes de la entrega
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
