import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, Share2, ChevronRight, ChevronLeft,
  MapPin, Info, ArrowLeft
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
    // TODO: Reemplazar con el enlace directo al checkout o WhatsApp oficial de GALSA Rent
    const msg = encodeURIComponent(
      `Hola GALSA Rent! Me interesa rentar el ${vehicle.make} ${vehicle.model} ${vehicle.year} por ${rentalDays} días con entrega en Sucursal Plaza 450, Durango. ¿Está disponible?`
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
    <div className={`w-full ${isModal ? 'max-h-[90vh] overflow-y-auto' : 'py-6 md:py-8'}`}>
      
      {/* Top Header / Breadcrumbs Bar */}
      <div className="pb-4 border-b border-neutral-200 flex items-center justify-between gap-4">
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500 flex items-center gap-1.5 flex-wrap">
          <a
            href="/catalogo"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/catalogo');
              }
            }}
            className="inline-flex items-center gap-1 font-semibold text-neutral-700 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al catálogo</span>
          </a>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-900 font-medium truncate">
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
          {copied && (
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              Enlace copiado
            </span>
          )}

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

      {/* Main Container */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Gallery, Specs, Conditions, Rules, Delivery, Reviews */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Gallery with 1 / X counter like live site */}
          <div className="relative aspect-[16/10] bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200">
            <img
              src={vehicle.images[activePhotoIdx].url}
              alt={vehicle.images[activePhotoIdx].alt}
              width={vehicle.images[activePhotoIdx].width}
              height={vehicle.images[activePhotoIdx].height}
              loading="eager"
              className="w-full h-full object-cover"
            />

            {/* Live site 1 / 3 counter */}
            {vehicle.images.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/75 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm">
                {activePhotoIdx + 1} / {vehicle.images.length}
              </div>
            )}

            {/* Arrows if multiple */}
            {vehicle.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Siguiente foto"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Vehicle Identity */}
          <div className="border-b border-neutral-200 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {vehicle.make} {vehicle.model}
            </h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md">
                {vehicle.year}
              </span>
              <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md">
                {vehicle.category}
              </span>
              <span className="text-xs font-medium text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                <MapPin className="w-3 h-3 text-neutral-500" />
                <span>Durango · Plaza 450</span>
              </span>
            </div>
          </div>

          {/* Section: Especificaciones (Exact from live site) */}
          <div className="border-b border-neutral-200 pb-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">
              Especificaciones
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                <span className="text-[11px] text-neutral-500 block uppercase font-medium">Plazas</span>
                <p className="text-sm font-bold text-neutral-900 mt-1">{vehicle.seats} pasajeros</p>
              </div>
              <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                <span className="text-[11px] text-neutral-500 block uppercase font-medium">Transmisión</span>
                <p className="text-sm font-bold text-neutral-900 mt-1">{vehicle.transmission}</p>
              </div>
              <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                <span className="text-[11px] text-neutral-500 block uppercase font-medium">Combustible</span>
                <p className="text-sm font-bold text-neutral-900 mt-1">{vehicle.fuel}</p>
              </div>
              <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                <span className="text-[11px] text-neutral-500 block uppercase font-medium">Categoría</span>
                <p className="text-sm font-bold text-neutral-900 mt-1 truncate">{vehicle.category}</p>
              </div>
            </div>
          </div>

          {/* Section: Características y condiciones de uso (Exact from live site) */}
          <div className="border-b border-neutral-200 pb-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">
              Características y condiciones de uso
            </h2>
            <ul className="space-y-2.5 text-sm text-neutral-700">
              {vehicle.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Reglas y condiciones (Exact from live site) */}
          <div className="border-b border-neutral-200 pb-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">
              Reglas y condiciones
            </h2>
            <ul className="space-y-3 text-sm text-neutral-700">
              {vehicle.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-neutral-500">
              Consulta los{' '}
              <a
                href="/terminos"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/terminos');
                  }
                }}
                className="underline hover:text-black font-medium"
              >
                términos y condiciones
              </a>{' '}
              completos.
            </p>
          </div>

          {/* Section: Información de entrega y devolución (Exact from live site) */}
          <div className="border-b border-neutral-200 pb-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">
              Información de entrega y devolución
            </h2>
            <div className="space-y-4 text-sm text-neutral-700">
              <div>
                <p className="font-semibold text-neutral-900">Punto de entrega</p>
                <p className="text-neutral-600 mt-0.5">Sucursal Plaza 450, Durango.</p>
              </div>

              <div>
                <p className="font-semibold text-neutral-900">Checklist controlado</p>
                <ul className="mt-1.5 space-y-1.5 text-neutral-600 pl-2">
                  <li className="flex items-center gap-2">
                    <span className="text-neutral-400">·</span> Fotos de estado exterior e interior.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neutral-400">·</span> Registro de kilometraje de salida y entrada.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neutral-400">·</span> Nivel de combustible verificado.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neutral-400">·</span> Firma digital de entrega y devolución.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Reseñas de clientes (Exact from live site) */}
          <div>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Reseñas de clientes
            </h2>
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50">
              <p className="font-semibold text-sm text-neutral-900">Aún no hay reseñas</p>
              <p className="text-xs text-neutral-500 mt-1">
                Este vehículo todavía no tiene reseñas publicadas. Sé el primero en rentarlo y compartir tu experiencia.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Reservation Box (Exact copy & pricing from live site) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white rounded-3xl border border-neutral-200 p-6 shadow-dropdown">
            
            {/* Header price */}
            <div className="pb-4 border-b border-neutral-200">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-neutral-900">
                  ${vehicle.pricePerDay.toLocaleString('es-MX')}
                </span>
              </div>
              <span className="text-xs text-neutral-500 block mt-0.5">
                por día · estimado
              </span>
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
            </div>

            {/* Price breakdown matching live site */}
            <div className="mt-6 pt-5 border-t border-neutral-200 space-y-3 text-sm">
              <div className="flex justify-between text-neutral-700">
                <span>${vehicle.pricePerDay.toLocaleString('es-MX')} × {rentalDays} días</span>
                <span className="font-semibold text-neutral-900">${baseSubtotal.toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span className="flex items-center gap-1">
                  Tarifa de servicio GALSA
                  <Info className="w-3.5 h-3.5 text-neutral-400" />
                </span>
                <span className="font-semibold text-neutral-900">${serviceFee.toLocaleString('es-MX')}</span>
              </div>
              
              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                <span className="text-base font-bold text-neutral-900">Total de la renta</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-neutral-900">
                    ${total.toLocaleString('es-MX')}
                  </span>
                  <p className="text-[11px] text-neutral-500">IVA incluido · extras opcionales</p>
                </div>
              </div>

              <div className="pt-2 flex justify-between text-xs text-neutral-500 border-t border-neutral-100">
                <span>Depósito en garantía (reembolsable)</span>
                <span className="font-semibold text-neutral-900">${vehicle.deposit.toLocaleString('es-MX')}</span>
              </div>
            </div>

            {/* Booking / Checkout Button: CTA 500 (#316AB5) ONLY here */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleBooking}
                style={{ backgroundColor: '#316AB5' }}
                className="w-full py-3.5 px-5 rounded-2xl text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:brightness-105 active:scale-[0.98]"
              >
                Reservar vehículo
              </button>
              <p className="text-center text-[11px] text-neutral-400 mt-2.5">
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
                ${rel.pricePerDay.toLocaleString('es-MX')} por día · estimado
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
