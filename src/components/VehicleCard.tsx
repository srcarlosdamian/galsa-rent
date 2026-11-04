import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle?: Vehicle;
  onSelect?: (vehicle: Vehicle) => void;
  priority?: boolean;
  isLoading?: boolean;
  layout?: 'grid' | 'horizontal';
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ 
  vehicle, 
  onSelect, 
  priority = false,
  isLoading = false,
  layout = 'grid',
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Modo Skeleton explícito o si no viene el vehículo aún
  if (isLoading || !vehicle) {
    return <VehicleCardSkeleton />;
  }

  // Imagen asignada para tarjetas (thumb de vehículos)
  const displayImage = 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793239505248-1-car.webp';
  const fuelType = vehicle.fuel || 'Gasolina';

  // Modo Horizontal para vista Mapa (Imagen a la izquierda, resto a la derecha)
  if (layout === 'horizontal') {
    return (
      <article
        onClick={() => onSelect && onSelect(vehicle)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`group cursor-pointer bg-white rounded-[16px] p-3 flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-200 border ${
          isHovered
            ? 'border-slate-900 shadow-md ring-1 ring-slate-900'
            : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
        }`}
      >
        {/* Vehicle Image (a la izquierda) */}
        <div className="relative aspect-[16/10] sm:aspect-square w-full sm:w-[190px] md:w-[210px] shrink-0 rounded-[10px] overflow-hidden bg-slate-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
          )}

          <img
            src={displayImage}
            alt={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 md:group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <button
            type="button"
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
            className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 text-slate-800 backdrop-blur-md transition-all z-10 shadow-xs"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-800'
              }`}
              strokeWidth={1.4}
            />
          </button>
        </div>

        {/* Vehicle Details (a la derecha) */}
        <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
          <div className="flex flex-col gap-1 w-full">
            {/* Metadata Row: Type, Year, Category + Calificación */}
            <div className="flex items-center justify-between text-[12px] font-heading font-medium text-slate-500 leading-[20px]">
              <div className="flex items-center gap-[8px] whitespace-nowrap">
                <span>{vehicle.category.split('/')[0].trim() || 'SUV'}</span>
                <span>{vehicle.year}</span>
                <span>{vehicle.category.split('/')[1]?.trim() || 'Aventura'}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-900 font-semibold text-[12px]">
                <Star className="w-3.5 h-3.5 fill-purple-300 text-purple-300 shrink-0" />
                <span>{vehicle.rating || 4.9}</span>
              </div>
            </div>

            {/* Vehicle Name */}
            <div className="relative inline-block self-start">
              <h3 className="relative z-10 font-heading font-bold text-[18px] text-black leading-[26px] truncate">
                <a
                  href={`/vehiculos/${vehicle.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onSelect) onSelect(vehicle);
                  }}
                  className="text-black"
                >
                  {vehicle.make} {vehicle.model}
                </a>
              </h3>
              <span className="hidden md:block absolute left-0 bottom-0.5 w-0 h-2 bg-blue-300 rounded-sm -z-0 transition-all duration-200 md:group-hover:w-full" />
            </div>

            {/* Vehicle Features Pills */}
            <div className="flex flex-wrap items-center gap-[6px] pt-1">
              <span className="bg-slate-50 text-slate-700 text-[12px] font-heading font-normal px-[6px] py-[3px] rounded-[6px] leading-[18px]">
                {vehicle.seats} plazas
              </span>
              <span className="bg-slate-50 text-slate-700 text-[12px] font-heading font-normal px-[6px] py-[3px] rounded-[6px] leading-[18px]">
                {vehicle.transmission}
              </span>
              <span className="bg-slate-50 text-slate-700 text-[12px] font-heading font-normal px-[6px] py-[3px] rounded-[6px] leading-[18px]">
                {fuelType}
              </span>
            </div>

            {/* Pickup Location Row */}
            <div className="flex items-center gap-[6px] text-[12px] font-heading font-normal text-black leading-[20px] pt-1">
              <svg
                className="w-4 h-4 text-black shrink-0"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 6.66667C13.3333 9.99533 9.64067 13.462 8.40067 14.5327C8.28515 14.6195 8.14453 14.6665 8 14.6665C7.85547 14.6665 7.71485 14.6195 7.59933 14.5327C6.35933 13.462 2.66667 9.99533 2.66667 6.66667C2.66667 5.25218 3.22857 3.89562 4.22876 2.89543C5.22896 1.89524 6.58551 1.33333 8 1.33333C9.41449 1.33333 10.771 1.89524 11.7712 2.89543C12.7714 3.89562 13.3333 5.25218 13.3333 6.66667ZM10 6.66667C10 7.77124 9.10457 8.66667 8 8.66667C6.89543 8.66667 6 7.77124 6 6.66667C6 5.5621 6.89543 4.66667 8 4.66667C9.10457 4.66667 10 5.5621 10 6.66667Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="truncate">Durango</span>
              <span className="text-slate-500 truncate">Plaza 450</span>
            </div>
          </div>

          {/* Price Divider & Daily Rate */}
          <div className="pt-2">
            <div className="h-px bg-slate-100 w-full mb-2" />
            <div className="flex items-center justify-between w-full">
              <div className="flex items-baseline gap-[8px] whitespace-nowrap">
                <span className="font-heading font-bold text-[20px] text-black md:group-hover:text-blue-500 transition-colors leading-[28px]">
                  ${vehicle.pricePerDay.toLocaleString('es-MX')}
                </span>
                <span className="font-heading font-normal text-[12px] text-slate-500 leading-[20px]">
                  Por día, estimado
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelect && onSelect(vehicle)}
      className="group cursor-pointer bg-white rounded-[16px] p-[10px] flex flex-col gap-[8px] transition-all duration-200 md:hover:shadow-md border border-transparent md:hover:border-slate-200"
    >
      {/* Vehicle Image (aspect 1:1 rounded-[8px]) con Skeleton integrado mientras carga */}
      <div className="relative aspect-square w-full rounded-[8px] overflow-hidden bg-slate-100">
        
        {/* Skeleton Shimmer visible hasta que la imagen termine de cargar */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
        )}

        <img
          src={displayImage}
          alt={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 md:group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Favorite Heart Icon Button */}
        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
          className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-full bg-white/40 hover:bg-white/60 text-slate-800 backdrop-blur-md transition-all z-10 shadow-sm"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-800'
            }`}
            strokeWidth={1.4}
          />
        </button>
      </div>

      {/* Vehicle Details */}
      <div className="flex flex-col gap-[10px] w-full pt-1">
        {/* Information Group */}
        <div className="flex flex-col gap-[4px] w-full">
          {/* Metadata Row: Type, Year, Category + Calificación */}
          <div className="flex items-center justify-between text-[12px] font-heading font-medium text-slate-500 leading-[20px]">
            <div className="flex items-center gap-[8px] whitespace-nowrap">
              <span>{vehicle.category.split('/')[0].trim() || 'SUV'}</span>
              <span>{vehicle.year}</span>
              <span>{vehicle.category.split('/')[1]?.trim() || 'Aventura'}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-900 font-semibold text-[12px]">
              <Star className="w-3.5 h-3.5 fill-purple-300 text-purple-300 shrink-0" />
              <span>{vehicle.rating || 4.9}</span>
            </div>
          </div>

          {/* Vehicle Name: texto siempre negro, línea azul 300 solo en desktop hover */}
          <div className="relative inline-block self-start">
            <h3 className="relative z-10 font-heading font-bold text-[18px] text-black leading-[28px] truncate">
              <a
                href={`/vehiculos/${vehicle.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelect) onSelect(vehicle);
                }}
                className="text-black"
              >
                {vehicle.make} {vehicle.model}
              </a>
            </h3>
            <span className="hidden md:block absolute left-0 bottom-0.5 w-0 h-2 bg-blue-300 rounded-sm -z-0 transition-all duration-200 md:group-hover:w-full" />
          </div>

          {/* Vehicle Features Pills */}
          <div className="flex flex-wrap items-center gap-[8px] pt-1">
            <span className="bg-slate-50 text-slate-700 text-[12px] font-heading font-normal px-[6px] py-[4px] rounded-[6px] leading-[20px]">
              {vehicle.seats} plazas
            </span>
            <span className="bg-slate-50 text-slate-700 text-[12px] font-heading font-normal px-[6px] py-[4px] rounded-[6px] leading-[20px]">
              {vehicle.transmission}
            </span>
            <span className="bg-slate-50 text-slate-700 text-[12px] font-heading font-normal px-[6px] py-[4px] rounded-[6px] leading-[20px]">
              {fuelType}
            </span>
          </div>
        </div>

        {/* Pickup Location Row */}
        <div className="flex items-center gap-[6px] text-[12px] font-heading font-normal text-black leading-[20px]">
          <svg
            className="w-4 h-4 text-black shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3333 6.66667C13.3333 9.99533 9.64067 13.462 8.40067 14.5327C8.28515 14.6195 8.14453 14.6665 8 14.6665C7.85547 14.6665 7.71485 14.6195 7.59933 14.5327C6.35933 13.462 2.66667 9.99533 2.66667 6.66667C2.66667 5.25218 3.22857 3.89562 4.22876 2.89543C5.22896 1.89524 6.58551 1.33333 8 1.33333C9.41449 1.33333 10.771 1.89524 11.7712 2.89543C12.7714 3.89562 13.3333 5.25218 13.3333 6.66667ZM10 6.66667C10 7.77124 9.10457 8.66667 8 8.66667C6.89543 8.66667 6 7.77124 6 6.66667C6 5.5621 6.89543 4.66667 8 4.66667C9.10457 4.66667 10 5.5621 10 6.66667Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="truncate">Durango</span>
          <span className="text-slate-500 truncate">Plaza 450</span>
        </div>

        {/* Separator Line */}
        <div className="h-px bg-slate-100 w-full" />

        {/* Price Divider & Daily Rate con hover a blue-500 solo en desktop */}
        <div className="flex items-center justify-between w-full pt-0.5">
          <div className="flex items-baseline gap-[8px] whitespace-nowrap">
            <span className="font-heading font-bold text-[20px] text-black md:group-hover:text-blue-500 transition-colors leading-[28px]">
              ${vehicle.pricePerDay.toLocaleString('es-MX')}
            </span>
            <span className="font-heading font-normal text-[12px] text-slate-500 leading-[20px]">
              Por día, estimado
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

// Componente Skeleton independiente con animación pulse para precargas y estados de carga
export const VehicleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[16px] p-[10px] flex flex-col gap-[8px] border border-slate-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square w-full rounded-[8px] bg-slate-200" />

      {/* Details Skeleton */}
      <div className="flex flex-col gap-[10px] w-full pt-1">
        <div className="flex flex-col gap-[6px] w-full">
          {/* Metadata pill */}
          <div className="h-3.5 bg-slate-200 rounded w-28" />
          {/* Title */}
          <div className="h-5 bg-slate-200 rounded w-44" />
          {/* Features pills */}
          <div className="flex items-center gap-2 pt-1">
            <div className="h-6 bg-slate-100 rounded-[6px] w-16" />
            <div className="h-6 bg-slate-100 rounded-[6px] w-20" />
            <div className="h-6 bg-slate-100 rounded-[6px] w-16" />
          </div>
        </div>

        {/* Location row */}
        <div className="h-4 bg-slate-100 rounded w-36" />

        <div className="h-px bg-slate-100 w-full" />

        {/* Price row */}
        <div className="flex items-center gap-2">
          <div className="h-6 bg-slate-200 rounded w-20" />
          <div className="h-3.5 bg-slate-100 rounded w-24" />
        </div>
      </div>
    </div>
  );
};
