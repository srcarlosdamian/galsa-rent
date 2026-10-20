import React, { useState } from 'react';
import { 
  X, Star, ShieldCheck, MapPin, Users, Gauge, Fuel, Check, 
  Calendar, Clock, Heart, Share2, Info, ChevronRight, Award, 
  MessageSquare, Car, Sparkles, CheckCircle2, AlertCircle, ArrowLeft
} from 'lucide-react';
import { Vehicle } from '../types/vehicle';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  const [rentalDays, setRentalDays] = useState(3);
  const [selectedPickup, setSelectedPickup] = useState(vehicle.pickupLocations[0]?.name || '');
  const [copied, setCopied] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Calculations
  const subtotal = vehicle.pricePerDay * rentalDays;
  const serviceFee = Math.round((subtotal * vehicle.serviceFeePercent) / 100);
  const pickupFee = vehicle.pickupLocations.find(l => l.name === selectedPickup)?.fee || 0;
  const total = subtotal + serviceFee + pickupFee;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.make} ${vehicle.model} ${vehicle.year} en GALSA RENT`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookingClick = () => {
    const text = encodeURIComponent(
      `Hola GALSA! Me interesa rentar el ${vehicle.make} ${vehicle.model} ${vehicle.year} por ${rentalDays} días con entrega en: ${selectedPickup}. ¿Está disponible?`
    );
    window.open(`https://wa.me/526181234567?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="min-h-screen px-2 sm:px-4 py-6 md:py-10 flex items-center justify-center">
        
        {/* Main modal card */}
        <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-float overflow-hidden border border-neutral-200 text-neutral-900 animate-in zoom-in-95 duration-200">
          
          {/* Top Sticky Bar inside modal */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-black hover:bg-neutral-100 px-3 py-1.5 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al catálogo</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors"
                title="Compartir vehículo"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10 max-h-[85vh] overflow-y-auto">
            
            {/* Breadcrumbs for SEO & UX */}
            <nav className="text-xs text-neutral-500 mb-3 flex items-center gap-1.5 flex-wrap">
              <span>Inicio</span>
              <ChevronRight className="w-3 h-3" />
              <span>México</span>
              <ChevronRight className="w-3 h-3" />
              <span>Durango</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-semibold">{vehicle.make} {vehicle.model}</span>
            </nav>

            {/* Vehicle Title & Key Metrics Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white px-2.5 py-1 rounded-md">
                    {vehicle.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Entrega rápida y sin filas
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
                  {vehicle.make} {vehicle.model} {vehicle.year}
                </h1>
                <p className="text-sm text-neutral-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <span>{vehicle.location}</span>
                </p>
              </div>

              {/* Rating summary */}
              <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-2xl">
                <Star className="w-5 h-5 fill-black text-black" />
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-extrabold text-neutral-900">{vehicle.rating.toFixed(2)}</span>
                    <span className="text-xs text-neutral-500">/ 5.0</span>
                  </div>
                  <span className="text-xs font-medium text-neutral-600 underline">
                    {vehicle.tripsCount} viajes completados
                  </span>
                </div>
              </div>
            </div>

            {/* Photo Gallery Grid (Turo / Airbnb Mosaic) */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden">
              <div className="md:col-span-3 aspect-[16/10] bg-neutral-100 overflow-hidden relative">
                <img
                  src={vehicle.images[activePhotoIdx]}
                  alt={`${vehicle.make} ${vehicle.model} vista principal`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
                {vehicle.images.slice(0, 3).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`aspect-[16/10] bg-neutral-100 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      activePhotoIdx === idx ? 'border-black' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Content & Sticky Sidebar Grid */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column (Details, Specs, Host, Reviews) */}
              <div className="lg:col-span-7 space-y-10">
                
                {/* Host profile card */}
                <div className="flex items-center justify-between p-5 rounded-2xl border border-neutral-200 bg-white">
                  <div className="flex items-center gap-4">
                    <img
                      src={vehicle.host.avatar}
                      alt={vehicle.host.name}
                      className="w-14 h-14 rounded-full object-cover border border-neutral-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-neutral-900">{vehicle.host.name}</h4>
                        <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded-full">
                          Verificado
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {vehicle.host.role} · {vehicle.host.trips} viajes organizados
                      </p>
                      <p className="text-xs font-semibold text-emerald-600 mt-1">
                        ● {vehicle.host.responseTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">
                    Acerca de este vehículo
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-700">
                    {vehicle.description}
                  </p>
                </div>

                {/* Key Technical Specs Grid */}
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-4">
                    Especificaciones técnicas
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl border border-neutral-200 bg-white">
                      <span className="text-xs text-neutral-500 block">Capacidad</span>
                      <p className="text-sm font-bold text-neutral-900 mt-0.5">{vehicle.seats} Pasajeros</p>
                    </div>
                    <div className="p-3.5 rounded-xl border border-neutral-200 bg-white">
                      <span className="text-xs text-neutral-500 block">Transmisión</span>
                      <p className="text-sm font-bold text-neutral-900 mt-0.5">{vehicle.transmission}</p>
                    </div>
                    <div className="p-3.5 rounded-xl border border-neutral-200 bg-white">
                      <span className="text-xs text-neutral-500 block">Combustible</span>
                      <p className="text-sm font-bold text-neutral-900 mt-0.5">{vehicle.fuel}</p>
                    </div>
                    <div className="p-3.5 rounded-xl border border-neutral-200 bg-white">
                      <span className="text-xs text-neutral-500 block">Motorización</span>
                      <p className="text-sm font-bold text-neutral-900 mt-0.5">{vehicle.specs.engine}</p>
                    </div>
                    <div className="p-3.5 rounded-xl border border-neutral-200 bg-white">
                      <span className="text-xs text-neutral-500 block">Tracción</span>
                      <p className="text-sm font-bold text-neutral-900 mt-0.5">{vehicle.specs.drivetrain}</p>
                    </div>
                    <div className="p-3.5 rounded-xl border border-neutral-200 bg-white">
                      <span className="text-xs text-neutral-500 block">Rendimiento</span>
                      <p className="text-sm font-bold text-neutral-900 mt-0.5">{vehicle.specs.mpgOrFuelEconomy}</p>
                    </div>
                  </div>
                </div>

                {/* Features & Amenities */}
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-4">
                    Equipamiento y características
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {vehicle.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-neutral-800">
                        <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pickup Locations */}
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">
                    Puntos de entrega disponibles
                  </h3>
                  <div className="space-y-2.5">
                    {vehicle.pickupLocations.map((loc) => (
                      <div
                        key={loc.name}
                        onClick={() => setSelectedPickup(loc.name)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          selectedPickup === loc.name
                            ? 'border-black bg-neutral-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-neutral-700 mt-1 shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-neutral-900">{loc.name}</p>
                            <p className="text-xs text-neutral-500">{loc.address}</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-neutral-900">
                          {loc.fee === 0 ? 'Sin cargo' : `+$${loc.fee} MXN`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rental Rules & Policies */}
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">
                    Reglas y condiciones claras
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-700 list-disc list-inside">
                    {vehicle.rules.map((rule, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Customer Reviews Section */}
                <div className="pt-6 border-t border-neutral-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-neutral-900">
                      Reseñas de clientes ({vehicle.reviews.length})
                    </h3>
                    <div className="flex items-center gap-1 text-sm font-bold">
                      <Star className="w-4 h-4 fill-black text-black" />
                      <span>{vehicle.rating.toFixed(2)} de 5</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {vehicle.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl border border-neutral-200 bg-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={rev.avatar}
                              alt={rev.author}
                              className="w-9 h-9 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-bold text-neutral-900">{rev.author}</p>
                              <p className="text-[11px] text-neutral-400">{rev.location} · {rev.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Sticky Reservation Box */}
              <div className="lg:col-span-5">
                <div className="sticky top-24 bg-white rounded-3xl border border-neutral-200 p-6 shadow-dropdown">
                  
                  {/* Price per day */}
                  <div className="flex items-baseline justify-between pb-4 border-b border-neutral-200">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                          ${vehicle.pricePerDay.toLocaleString('es-MX')}
                        </span>
                        <span className="text-xs font-semibold text-neutral-600">MXN</span>
                        <span className="text-sm text-neutral-500">/ día</span>
                      </div>
                      <span className="text-[11px] text-neutral-400">Tarifa fija garantizada</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-neutral-800">
                      <Star className="w-4 h-4 fill-black text-black" />
                      <span>{vehicle.rating.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Trip Duration Selector */}
                  <div className="mt-5 space-y-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                        Días de renta
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 7].map((days) => (
                          <button
                            key={days}
                            type="button"
                            onClick={() => setRentalDays(days)}
                            className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
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

                    {/* Delivery Location selected */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                        Lugar de entrega
                      </label>
                      <select
                        value={selectedPickup}
                        onChange={(e) => setSelectedPickup(e.target.value)}
                        className="w-full text-xs font-semibold p-3 rounded-xl border border-neutral-200 bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      >
                        {vehicle.pickupLocations.map((loc) => (
                          <option key={loc.name} value={loc.name}>
                            {loc.name} {loc.fee === 0 ? '(Gratis)' : `(+$${loc.fee} MXN)`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price breakdown table */}
                  <div className="mt-6 pt-5 border-t border-neutral-200 space-y-2.5 text-sm">
                    <div className="flex justify-between text-neutral-600">
                      <span>${vehicle.pricePerDay.toLocaleString('es-MX')} × {rentalDays} días</span>
                      <span className="font-semibold text-neutral-900">${subtotal.toLocaleString('es-MX')} MXN</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span className="flex items-center gap-1">
                        Tarifa de servicio GALSA
                        <Info className="w-3.5 h-3.5 text-neutral-400" />
                      </span>
                      <span className="font-semibold text-neutral-900">${serviceFee.toLocaleString('es-MX')} MXN</span>
                    </div>
                    {pickupFee > 0 && (
                      <div className="flex justify-between text-neutral-600">
                        <span>Servicio de entrega</span>
                        <span className="font-semibold text-neutral-900">+${pickupFee.toLocaleString('es-MX')} MXN</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs text-neutral-500 pt-1">
                      <span>Depósito en garantía (100% reembolsable)</span>
                      <span>${vehicle.deposit.toLocaleString('es-MX')} MXN</span>
                    </div>

                    <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                      <span className="text-base font-extrabold text-neutral-900">Total de la renta</span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-neutral-900">
                          ${total.toLocaleString('es-MX')}
                        </span>
                        <span className="text-xs font-bold text-neutral-600 ml-1">MXN</span>
                        <p className="text-[10px] text-neutral-400">IVA incluido</p>
                      </div>
                    </div>
                  </div>

                  {/* Direct Booking Button */}
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleBookingClick}
                      className="w-full py-4 px-6 rounded-2xl bg-neutral-900 hover:bg-black text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Iniciar reserva digital</span>
                    </button>
                    <p className="text-center text-[11px] text-neutral-400 mt-2">
                      Sin cargos previos hasta confirmar documentación y contrato
                    </p>
                  </div>

                  {/* Trust guarantees */}
                  <div className="mt-6 pt-5 border-t border-neutral-200 space-y-2 text-xs text-neutral-600">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Inspección mecánica y sanitizado antes de cada entrega</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Contrato digital validado con firma móvil</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Depósito devuelto automáticamente tras check-in</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
