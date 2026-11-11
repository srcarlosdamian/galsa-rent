import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Vehicle } from '../types/vehicle';
import { Search, Plus, Minus } from 'lucide-react';

interface CatalogMapProps {
  vehicles: Vehicle[];
  selectedVehicleId?: string | null;
  hoveredVehicleId?: string | null;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onHoverVehicle?: (vehicleId: string | null) => void;
}

// Coordenadas base de Durango, México
const DURANGO_CENTER: [number, number] = [24.0277, -104.6532];

// Coordenadas de referencia para sucursales y puntos clave de Durango
const KNOWN_COORDS: Record<string, [number, number]> = {
  'jeep-wrangler-rubicon-2018-durango': [24.0225, -104.6750], // Plaza 450
  'jeep-wrangler-2011-durango': [24.0250, -104.6780],
  'toyota-rav4-xle-2024-durango': [24.0195, -104.6720],
  'audi-a4-sline-2024-durango': [24.0245, -104.6705], // Centro Histórico
  'nissan-sentra-sense-2026-durango': [24.0260, -104.6680],
  'volkswagen-virtus-trendline-2026-durango': [24.0280, -104.6640],
  'audi-q5-quattro-2025-durango': [24.0335, -104.6430], // Paseo Durango
  'honda-civic-coupe-2019-durango': [24.0380, -104.6390],
  'audi-a3-sedan-2023-durango': [24.0310, -104.6480],
  'ford-mustang-gt-2021-durango': [24.0450, -104.6250],
  'chevrolet-aveo-ls-2023-durango': [24.0410, -104.6320],
  'nissan-march-active-2022-durango': [24.0290, -104.6550],
};

function getVehicleCoords(v: Vehicle, index: number): [number, number] {
  if (KNOWN_COORDS[v.slug]) {
    return KNOWN_COORDS[v.slug];
  }
  // Generar dispersión determinista realista alrededor de Durango Plaza 450 / Centro
  const angle = (index * 47) % 360;
  const radius = 0.012 + ((index % 5) * 0.007);
  const latOffset = Math.sin(angle * (Math.PI / 180)) * radius;
  const lngOffset = Math.cos(angle * (Math.PI / 180)) * radius * 1.2;
  return [DURANGO_CENTER[0] + latOffset, DURANGO_CENTER[1] + lngOffset];
}

export const CatalogMap: React.FC<CatalogMapProps> = ({
  vehicles,
  selectedVehicleId,
  hoveredVehicleId,
  onSelectVehicle,
  onHoverVehicle,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: DURANGO_CENTER,
      zoom: 13,
      zoomControl: false,
    });

    // OpenStreetMap standard tiles (100% libre, sin requerir API key ni marca de agua)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Actualizar marcadores cuando cambian los vehículos o el estado de hover/selección
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Limpiar marcadores existentes
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    const bounds = L.latLngBounds([]);

    vehicles.forEach((vehicle, idx) => {
      const coords = getVehicleCoords(vehicle, idx);
      bounds.extend(coords);

      const isHovered = hoveredVehicleId === vehicle.id;
      const isSelected = selectedVehicleId === vehicle.id;
      const isActive = isHovered || isSelected;

      const html = `
        <div class="px-2.5 py-1 rounded-full text-xs font-heading font-extrabold whitespace-nowrap shadow-md cursor-pointer transition-all duration-150 flex items-center gap-1 ${
          isActive
            ? 'bg-slate-900 text-white scale-110 shadow-xl ring-2 ring-blue-500 z-50'
            : 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-900 hover:text-white hover:scale-105'
        }">
          <span>$${vehicle.pricePerDay.toLocaleString('es-MX')}</span>
        </div>
      `;

      const icon = L.divIcon({
        className: 'custom-map-pill',
        html,
        iconSize: [64, 28],
        iconAnchor: [32, 14],
      });

      const marker = L.marker(coords, { icon, zIndexOffset: isActive ? 1000 : 100 })
        .addTo(map)
        .on('click', () => onSelectVehicle(vehicle))
        .on('mouseover', () => {
          if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover)').matches) {
            if (onHoverVehicle) onHoverVehicle(vehicle.id);
          }
        })
        .on('mouseout', () => {
          if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover)').matches) {
            if (onHoverVehicle) onHoverVehicle(null);
          }
        });

      markersRef.current.set(vehicle.id, marker);
    });

    // Ajustar vista a los límites si hay autos
    if (vehicles.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [vehicles, hoveredVehicleId, selectedVehicleId, onSelectVehicle, onHoverVehicle]);

  // Manejadores de zoom
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };
  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };
  const handleResetArea = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(DURANGO_CENTER, 13);
    }
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[calc(100vh-140px)] rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100">
      {/* Contenedor Leaflet */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Botón flotante 'Buscar en esta área' estilo Google / Airbnb */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <button
          type="button"
          onClick={handleResetArea}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cta-600 hover:bg-cta-700 text-white text-xs font-heading font-semibold shadow-md transition-all active:scale-95"
        >
          <Search className="w-3.5 h-3.5" strokeWidth={2} />
          <span>Buscar en esta área</span>
        </button>
      </div>

      {/* Controles de Zoom en esquina superior derecha */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-2 hover:bg-slate-50 text-slate-700 transition-colors flex items-center justify-center border-b border-slate-100"
          title="Acercar"
          aria-label="Acercar mapa"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="p-2 hover:bg-slate-50 text-slate-700 transition-colors flex items-center justify-center"
          title="Alejar"
          aria-label="Alejar mapa"
        >
          <Minus className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* Badge inferior de punto oficial Plaza 450 */}
      <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-xs text-[11px] font-heading font-medium text-slate-700">
        📍 Sucursal Plaza 450, Durango
      </div>
    </div>
  );
};
