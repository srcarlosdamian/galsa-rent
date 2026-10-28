import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Users, Gauge, Shield, Sparkles } from 'lucide-react';
import { Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  priority?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect, priority = false }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const currentImg = vehicle.images[currentImageIdx];

  return (
    <article
      onClick={() => onSelect(vehicle)}
      className="group cursor-pointer bg-white rounded-2xl border border-neutral-200/90 overflow-hidden transition-all duration-300 hover:border-neutral-400 hover:shadow-sm flex flex-col"
    >
      {/* Photo carousel container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <img
          src={currentImg.url}
          alt={currentImg.alt}
          width={currentImg.width}
          height={currentImg.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top category badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="inline-flex items-center text-[11px] font-semibold bg-white/95 text-neutral-900 px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
            {vehicle.category}
          </span>
        </div>

        {/* Favorite heart button */}
        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-800 backdrop-blur-sm transition-all z-10 shadow-sm"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-neutral-700'
            }`}
          />
        </button>

        {/* Arrow navigators */}
        {vehicle.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white text-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Siguiente foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white text-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Carousel indicator dots */}
        {vehicle.images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {vehicle.images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIdx ? 'w-3.5 bg-white' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Body & Info strictly matching live site */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Header row: title and model year */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-neutral-900 tracking-tight leading-snug">
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                Modelo {vehicle.year}
              </p>
            </div>

            <span className="text-[11px] font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md shrink-0">
              {vehicle.category}
            </span>
          </div>

          {/* Quick specs pills matching live site specifications */}
          <div className="mt-3 flex items-center gap-2 text-xs text-neutral-600">
            <span className="inline-flex items-center gap-1 bg-neutral-100/80 px-2 py-0.5 rounded-md">
              <Users className="w-3 h-3 text-neutral-500" />
              <span>{vehicle.seats} plazas</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-neutral-100/80 px-2 py-0.5 rounded-md">
              <Gauge className="w-3 h-3 text-neutral-500" />
              <span>{vehicle.transmission}</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-neutral-100/80 px-2 py-0.5 rounded-md">
              <Shield className="w-3 h-3 text-neutral-500" />
              <span>Libre km</span>
            </span>
          </div>

          <p className="mt-2 text-xs text-neutral-500">
            Durango · Plaza 450
          </p>
        </div>

        {/* Pricing footer row strictly matching live site */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-neutral-900">
                ${vehicle.pricePerDay.toLocaleString('es-MX')}
              </span>
              <span className="text-xs text-neutral-500">por día · estimado</span>
            </div>
            <p className="text-[10px] text-neutral-400">
              Tarifa de servicio GALSA (33%) calculada al reservar
            </p>
          </div>

          <a
            href={`/vehiculos/${vehicle.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(vehicle);
            }}
            className="text-xs font-bold text-neutral-900 underline group-hover:no-underline"
          >
            Ver ficha
          </a>
        </div>
      </div>
    </article>
  );
};
