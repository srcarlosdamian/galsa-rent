import React, { useState } from 'react';
import { 
  X, Check, Calendar, Users, Gauge, Shield, ShieldCheck, 
  Share2, ArrowLeft, ChevronRight, CheckCircle2, Sparkles, MapPin, Info
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { VEHICLES } from '../data/vehicles';

interface VehicleDetailViewProps {
  vehicle: Vehicle;
  onClose?: () => void;
  onNavigate?: (path: string) => void;
  isModal?: boolean;
}

export const VehicleDetailView: React.FC<VehicleDetailViewProps> = ({
  vehicle,
  onClose,
  onNavigate,
  isModal = false,
}) => {
  const [rentalDays, setRentalDays] = useState(3);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  // 33% service fee strictly paid by customer
  const baseSubtotal = vehicle.pricePerDay * rentalDays;
  const serviceFee = Math.round(baseSubtotal * 0.33);
  const total = baseSubtotal + serviceFee;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Renta ${vehicle.make} ${vehicle.model} ${vehicle.year} en Durango | GALSA`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBooking = () => {
    // TODO: Reemplazar con el enlace directo al checkout o WhatsApp oficial de GALSA Rent
    const msg = encodeURIComponent(
      `Hola GALSA Rent! Me interesa rentar el ${vehicle.make} ${vehicle.model} ${vehicle.year} por ${rentalDays} días con entrega en Sucursal Plaza 450, Durango. ¿Está disponible?`
    );
    window.open(`https://wa.me/526180000000?text=${msg}`, '_blank');
  };

  const relatedVehicles = VEHICLES.filter((v) => v.id !== vehicle.id).slice(0, 3);

  return (
    <div className={`w-full ${isModal ? 'max-h-[90vh] overflow-y-auto' : 'py-8'}`}>
      
      {/* Top Header / Breadcrumbs Bar */}
      <div className="pb-4 border-b border-neutral-200 flex items-center justify-between gap-4">
        {/* Breadcrumbs for SEO & UX */}
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500 flex items-center gap-1.5 flex-wrap">
          <a
            href="/"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/');
              }
            }}
            className="hover:text-black transition-colors"
          >
            Inicio
          </a>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <a
            href="/catalogo"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/catalogo');
              }
            }}
            className="hover:text-black transition-colors"
          >
            Catálogo
          </a>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-900 font-bold truncate">
            {vehicle.make} {vehicle.model} {vehicle.year}
          </span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors"
            title="Compartir ficha"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Vehicle Title & Verification Header */}
      <div className="mt-6 pb-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white px-2.5 py-0.5 rounded-md">
              {vehicle.category}
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Revisado y verificado antes de cada renta
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-neutral-900">
            {vehicle.make} {vehicle.model} {vehicle.version} {vehicle.year}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>Entrega física en {vehicle.location}</span>
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
            Tarifa base por día
          </span>
          <div className="flex items-baseline gap-1 justify-end">
            <span className="text-2xl font-black text-neutral-900">${vehicle.pricePerDay.toLocaleString('es-MX')}</span>
            <span className="text-xs font-semibold text-neutral-600">MXN</span>
          </div>
          <span className="text-[11px] text-neutral-500">+ 33% de tarifa de servicio (IVA inc.)</span>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden">
        <div className="md:col-span-3 aspect-[16/10] bg-neutral-100 overflow-hidden relative rounded-2xl">
          <img
            src={vehicle.images[activePhotoIdx].url}
            alt={vehicle.images[activePhotoIdx].alt}
            width={vehicle.images[activePhotoIdx].width}
            height={vehicle.images[activePhotoIdx].height}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-2.5">
          {vehicle.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhotoIdx(idx)}
              className={`aspect-[16/10] bg-neutral-100 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                activePhotoIdx === idx ? 'border-black' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Details + Sticky Reservation Box */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Specs, Features, Rules */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Verification Badge Block (En sustitución del bloque vacío de reseñas) */}
          <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900">
                Revisado y verificado antes de cada renta
              </h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Esta unidad pasa por una exhaustiva inspección mecánica, documental y fotográfica previa a su entrega en Sucursal Plaza 450, Durango.
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-base font-bold text-neutral-900 mb-2">
              Descripción del vehículo
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          {/* Technical Specs */}
          <div>
            <h2 className="text-base font-bold text-neutral-900 mb-3">
              Especificaciones técnicas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block font-semibold uppercase">Capacidad</span>
                <p className="text-xs font-bold text-neutral-900 mt-0.5">{vehicle.seats} Pasajeros</p>
              </div>
              <div className="p-3 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block font-semibold uppercase">Transmisión</span>
                <p className="text-xs font-bold text-neutral-900 mt-0.5">{vehicle.transmission}</p>
              </div>
              <div className="p-3 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block font-semibold uppercase">Combustible</span>
                <p className="text-xs font-bold text-neutral-900 mt-0.5">{vehicle.fuel}</p>
              </div>
              <div className="p-3 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block font-semibold uppercase">Motor</span>
                <p className="text-xs font-bold text-neutral-900 mt-0.5">{vehicle.specs.engine}</p>
              </div>
              <div className="p-3 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block font-semibold uppercase">Tracción</span>
                <p className="text-xs font-bold text-neutral-900 mt-0.5">{vehicle.specs.drivetrain}</p>
              </div>
              <div className="p-3 rounded-xl border border-neutral-200 bg-white">
                <span className="text-[10px] text-neutral-400 block font-semibold uppercase">Rendimiento</span>
                <p className="text-xs font-bold text-neutral-900 mt-0.5">{vehicle.specs.mpgOrFuelEconomy}</p>
              </div>
            </div>
          </div>

          {/* Features Checklist */}
          <div>
            <h2 className="text-base font-bold text-neutral-900 mb-3">
              Equipamiento incluido
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vehicle.features.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-neutral-800">
                  <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rental Rules */}
          <div>
            <h2 className="text-base font-bold text-neutral-900 mb-3">
              Requisitos y reglas de renta
            </h2>
            <ul className="space-y-1.5 text-xs text-neutral-700 list-disc list-inside">
              {vehicle.rules.map((rule, idx) => (
                <li key={idx} className="leading-relaxed">
                  {rule}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Column: Sticky Booking Box */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white rounded-3xl border border-neutral-200 p-6 shadow-dropdown">
            
            {/* Header price */}
            <div className="pb-4 border-b border-neutral-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Precio por día
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-3xl font-black text-neutral-900">
                  ${vehicle.pricePerDay.toLocaleString('es-MX')}
                </span>
                <span className="text-xs font-bold text-neutral-600">MXN</span>
                <span className="text-xs text-neutral-500">/ día</span>
              </div>
              <span className="text-[11px] text-neutral-500">Kilometraje libre en Durango</span>
            </div>

            {/* Days selector */}
            <div className="mt-5 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                Duración de la renta
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 7].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setRentalDays(days)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      rentalDays === days
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {days} {days === 1 ? 'día' : 'días'}
                  </button>
                ))}
              </div>

              {/* Delivery point */}
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Punto de entrega y devolución
                </span>
                <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs">
                  <p className="font-bold text-neutral-900">Sucursal Plaza 450</p>
                  <p className="text-[11px] text-neutral-500">Blvd. Guadiana, Durango, Dgo.</p>
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="mt-6 pt-5 border-t border-neutral-200 space-y-2.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>${vehicle.pricePerDay.toLocaleString('es-MX')} × {rentalDays} {rentalDays === 1 ? 'día' : 'días'}</span>
                <span className="font-bold text-neutral-900">${baseSubtotal.toLocaleString('es-MX')} MXN</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span className="flex items-center gap-1">
                  Tarifa de servicio GALSA (33%)
                  <Info className="w-3.5 h-3.5 text-neutral-400" />
                </span>
                <span className="font-bold text-neutral-900">${serviceFee.toLocaleString('es-MX')} MXN</span>
              </div>
              <div className="flex justify-between text-neutral-500 pt-1 border-t border-neutral-100">
                <span>Depósito en garantía (100% reembolsable)</span>
                <span className="font-semibold text-neutral-800">${vehicle.deposit.toLocaleString('es-MX')} MXN</span>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-neutral-900">Total a pagar</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-neutral-900">
                    ${total.toLocaleString('es-MX')}
                  </span>
                  <span className="text-xs font-bold text-neutral-600 ml-1">MXN</span>
                  <p className="text-[10px] text-neutral-400">IVA incluido</p>
                </div>
              </div>
            </div>

            {/* Booking / Checkout Button: CTA 500 (#316AB5) - Solo aquí donde se inicia la reserva/pago */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleBooking}
                style={{ backgroundColor: '#316AB5' }}
                className="w-full py-3.5 px-5 rounded-2xl text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:brightness-105 active:scale-[0.98]"
              >
                Reservar en línea
              </button>
              <p className="text-center text-[10px] text-neutral-400 mt-2">
                Sin cargos hasta confirmar tu documentación y contrato digital
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Related Vehicles Section */}
      <div className="mt-16 pt-12 border-t border-neutral-200">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Otros autos disponibles en Durango
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {relatedVehicles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => {
                if (onNavigate) {
                  onNavigate(`/vehiculos/${rel.slug}`);
                } else {
                  window.location.href = `/vehiculos/${rel.slug}`;
                }
              }}
              className="group cursor-pointer rounded-2xl border border-neutral-200 overflow-hidden bg-white hover:border-black transition-all p-3"
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 mb-3">
                <img
                  src={rel.images[0].url}
                  alt={rel.images[0].alt}
                  width={rel.images[0].width}
                  height={rel.images[0].height}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-xs font-bold text-neutral-900 truncate">
                {rel.make} {rel.model} {rel.year}
              </h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Desde ${rel.pricePerDay.toLocaleString('es-MX')} MXN/día
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
