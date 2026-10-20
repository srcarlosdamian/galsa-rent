import React, { useState } from 'react';
import { VEHICLES } from '../data/vehicles';
import { VehicleCard } from '../components/VehicleCard';
import { Vehicle } from '../types/vehicle';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';

interface CatalogPageProps {
  onSelectVehicle: (v: Vehicle) => void;
  onNavigate?: (path: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onSelectVehicle, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos los vehículos');

  const filtered = activeCategory === 'Todos los vehículos'
    ? VEHICLES
    : VEHICLES.filter((v) => v.category === activeCategory);

  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Flota disponible en Durango
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
            Catálogo de autos en renta en Durango
          </h1>
          <p className="mt-3 text-base text-neutral-600">
            Explora autos verificados en Durango: sedanes económicos, SUVs y 4x4 de flota propia y anfitriones. Contrato digital y entrega en Sucursal Plaza 450.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-neutral-100 mb-8">
          {['Todos los vehículos', 'SUV / Aventura', 'Sedán / Negocios', 'Deportivo / Estilo'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((vehicle, idx) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
              priority={idx === 0}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
