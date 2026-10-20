export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  trim?: string;
  category: 'SUV / Aventura' | 'Sedán / Negocios' | 'Deportivo / Estilo' | 'Urbano / Eficiente';
  seats: number;
  transmission: 'Automática' | 'Estándar';
  fuel: 'Gasolina' | 'Híbrido' | 'Diesel';
  location: string;
  city: string;
  pricePerDay: number;
  deposit: number;
  serviceFeePercent: number;
  rating: number;
  tripsCount: number;
  images: string[];
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
    type: 'Sucursal Oficial' | 'Aeropuerto' | 'Entrega a Domicilio';
    fee?: number;
  }[];
  host: {
    name: string;
    avatar: string;
    role: string;
    rating: number;
    trips: number;
    joinedYear: number;
    isSuperHost: boolean;
    responseTime: string;
  };
  reviews: {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
    location: string;
  }[];
}

export interface SearchState {
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  category: string;
}
