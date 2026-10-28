export interface Vehicle {
  id: string;
  uuid: string; // Legacy UUID for 301 redirects
  slug: string; // /vehiculos/{marca}-{modelo}-{version}-{año}-durango
  make: string;
  model: string;
  version: string;
  year: number;
  trim: string;
  category: 'SUV / Aventura' | 'Sedán / Negocios' | 'Deportivo / Estilo' | 'Urbano / Eficiente' | 'Sedán / Movilidad' | 'Sedán Premium / Negocios' | string;
  useCase: 'Turismo' | 'Negocios' | 'Aventura' | 'Movilidad general' | 'Conductores de apps de movilidad';
  seats: number;
  transmission: 'Automática' | 'Estándar';
  fuel: 'Gasolina' | 'Híbrido' | 'Diesel';
  location: string;
  city: 'Durango';
  pricePerDay: number;
  deposit: number;
  serviceFeePercent: 33; // Exactly 33% paid by client, anfitrión gets 100%
  rating?: number; // Optional: Only if real reviews exist
  reviewCount?: number;
  images: {
    url: string;
    alt: string;
    width: number;
    height: number;
  }[];
  description: string;
  features: string[];
  specs: {
    doors: number;
    engine: string;
    drivetrain: string;
    mpgOrFuelEconomy: string;
    luggage: number;
    color: string;
  };
  rules: string[];
  pickupLocations: {
    name: string;
    address: string;
    type: 'Sucursal Oficial';
  }[];
  host: {
    name: string;
    role: string;
    verified: boolean;
  };
}

export interface SearchState {
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  category: string;
}

export interface RouteMetadata {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  noIndex?: boolean;
}
