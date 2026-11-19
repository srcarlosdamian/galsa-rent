import React from 'react';
import {
  ArrowUpDown,
  Briefcase,
  Building2,
  Calendar,
  Compass,
  Globe,
  Hotel,
  MapPin,
  Navigation,
  Plane,
  Sparkles,
  Train,
  Zap,
} from 'lucide-react';
import { DropdownOption } from '../components/CustomDropdown';

export interface SearchOption {
  id: string;
  title: string;
  subtitle: string | null;
  icon: React.ComponentType<{ className?: string; strokeWidth?: string | number }>;
  value: string;
}

export const SEARCH_LOCATION_OPTIONS: SearchOption[] = [
  {
    id: 'current',
    title: 'Ubicación actual',
    subtitle: null,
    icon: Navigation,
    value: 'Mi ubicación actual',
  },
  {
    id: 'anywhere',
    title: 'Cualquier lugar',
    subtitle: 'Ver todos los autos',
    icon: Globe,
    value: '',
  },
  {
    id: 'durango-main',
    title: 'Sucursal Plaza 450, Durango',
    subtitle: 'Punto oficial de entrega · Blvd. Guadiana',
    icon: Building2,
    value: 'Sucursal Plaza 450, Durango',
  },
  {
    id: 'dgo-airport',
    title: 'DGO – Aeropuerto Internacional de Durango',
    subtitle: 'Entrega programada en terminal aérea',
    icon: Plane,
    value: 'Aeropuerto Internacional de Durango (DGO)',
  },
  {
    id: 'centro-durango',
    title: 'Centro Histórico, Durango',
    subtitle: 'Zona turística y comercial',
    icon: Hotel,
    value: 'Centro Histórico, Durango',
  },
  {
    id: 'central-camionera',
    title: 'Central de Autobuses de Durango',
    subtitle: 'Terminal terrestre Blvd. Francisco Villa',
    icon: Train,
    value: 'Central de Autobuses de Durango',
  },
];

export const SEARCH_VEHICLE_TYPES: SearchOption[] = [
  {
    id: 'all',
    title: 'Todos los vehículos',
    subtitle: 'Ver toda la flota disponible',
    icon: Sparkles,
    value: '',
  },
  {
    id: 'suv',
    title: 'SUV / Aventura',
    subtitle: 'Camionetas y espacio para viajes',
    icon: Compass,
    value: 'SUV / Aventura',
  },
  {
    id: 'sedan',
    title: 'Sedán / Negocios',
    subtitle: 'Confort ejecutivo y traslados urbanos',
    icon: Briefcase,
    value: 'Sedán / Negocios',
  },
  {
    id: 'deportivo',
    title: 'Deportivo / Estilo',
    subtitle: 'Diseño prémium y alta gama',
    icon: Zap,
    value: 'Deportivo / Estilo',
  },
];

export const LOCATION_DROPDOWN_OPTIONS: DropdownOption[] = SEARCH_LOCATION_OPTIONS.map((loc) => ({
  value: loc.value || loc.title,
  label: loc.title,
  subtitle: loc.subtitle ?? undefined,
  icon: loc.icon,
}));

export const VEHICLE_TYPE_DROPDOWN_OPTIONS: DropdownOption[] = SEARCH_VEHICLE_TYPES.map((typeItem) => ({
  value: typeItem.value,
  label: typeItem.title,
  subtitle: typeItem.subtitle ?? undefined,
  icon: typeItem.icon,
}));

export const HOST_CITY_OPTIONS: DropdownOption[] = [
  {
    value: 'Durango, Dgo.',
    label: 'Durango, Dgo.',
    subtitle: 'Durango · Sucursal Plaza 450',
    icon: MapPin,
  },
  {
    value: 'Ciudad de México',
    label: 'Ciudad de México',
    subtitle: 'CDMX · Zona Metropolitana',
    icon: MapPin,
  },
  {
    value: 'Guadalajara, Jal.',
    label: 'Guadalajara, Jal.',
    subtitle: 'Jalisco · Área Metropolitana',
    icon: MapPin,
  },
  {
    value: 'Monterrey, N.L.',
    label: 'Monterrey, N.L.',
    subtitle: 'Nuevo León · Área Metropolitana',
    icon: MapPin,
  },
  {
    value: 'Mazatlán, Sin.',
    label: 'Mazatlán, Sin.',
    subtitle: 'Sinaloa · Zona Turística',
    icon: MapPin,
  },
  {
    value: 'Torreón, Coah.',
    label: 'Torreón, Coah.',
    subtitle: 'Coahuila · Comarca Lagunera',
    icon: MapPin,
  },
  {
    value: 'Querétaro, Qro.',
    label: 'Querétaro, Qro.',
    subtitle: 'Querétaro · Centro',
    icon: MapPin,
  },
  {
    value: 'Puebla, Pue.',
    label: 'Puebla, Pue.',
    subtitle: 'Puebla · Área Metropolitana',
    icon: MapPin,
  },
  {
    value: 'Cancún, Q.R.',
    label: 'Cancún, Q.R.',
    subtitle: 'Quintana Roo · Riviera Maya',
    icon: MapPin,
  },
  {
    value: 'Otra ciudad',
    label: 'Otra ciudad en México',
    subtitle: 'Cobertura nacional en expansión',
    icon: MapPin,
  },
];

export const CATALOG_SORT_OPTIONS: DropdownOption[] = [
  {
    value: 'recommended',
    label: 'Recomendados',
    subtitle: 'Selección destacada GALSA',
    icon: Sparkles,
  },
  {
    value: 'price-asc',
    label: 'Precio: menor a mayor',
    subtitle: 'Desde la tarifa más accesible',
    icon: ArrowUpDown,
  },
  {
    value: 'price-desc',
    label: 'Precio: mayor a menor',
    subtitle: 'Gama alta y equipamiento completo',
    icon: ArrowUpDown,
  },
  {
    value: 'year-desc',
    label: 'Año más reciente',
    subtitle: 'Modelos 2025 y 2026 primero',
    icon: Calendar,
  },
];
