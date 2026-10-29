import { RouteMetadata, Vehicle } from '../types/vehicle';
import { VEHICLES } from './vehicles';

export const SITE_URL = 'https://galsarent.com.mx';

export const DEFAULT_OG_IMAGE = {
  url: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793246469211-0-cover.webp',
  alt: 'GALSA Rent — Renta de autos en México y Durango',
  width: 1200,
  height: 630,
};

export const STATIC_ROUTES_METADATA: Record<string, RouteMetadata> = {
  '/': {
    title: 'Renta de Autos en México — Reserva en Línea | GALSA Rent',
    description:
      'Renta autos en México desde $1,100 al día: sedanes, SUVs y Jeep Wrangler. Reserva en línea, contrato digital y kilometraje libre. Entrega en Sucursal Plaza 450.',
    canonical: `${SITE_URL}/`,
    ogTitle: 'Renta de Autos en México — Reserva en Línea | GALSA Rent',
    ogDescription:
      'Renta autos en México desde $1,100 al día: sedanes, SUVs y Jeep Wrangler. Reserva en línea, contrato digital y kilometraje libre. Entrega en Sucursal Plaza 450.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/anfitriones': {
    title: 'Renta tu auto en Durango y gana dinero | GALSA Anfitriones',
    description:
      'Publica tu auto en GALSA y recibe el 100% de tu tarifa diaria. Tú apruebas cada reserva; clientes verificados, seguro durante la renta y pagos a tu cuenta.',
    canonical: `${SITE_URL}/anfitriones`,
    ogTitle: 'Renta tu auto en Durango y gana dinero | GALSA Anfitriones',
    ogDescription:
      'Publica tu auto en GALSA y recibe el 100% de tu tarifa diaria. Tú apruebas cada reserva; clientes verificados, seguro durante la renta y pagos a tu cuenta.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/catalogo': {
    title: 'Catálogo de autos en renta en Durango | GALSA Rent',
    description:
      'Explora autos verificados en Durango: sedanes económicos, SUVs y 4x4 de flota propia y anfitriones. Contrato digital y entrega en Plaza 450.',
    canonical: `${SITE_URL}/catalogo`,
    ogTitle: 'Catálogo de autos en renta en Durango | GALSA Rent',
    ogDescription:
      'Explora autos verificados en Durango: sedanes económicos, SUVs y 4x4 de flota propia y anfitriones. Contrato digital y entrega en Plaza 450.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/confianza': {
    title: 'Seguridad y Confianza en Renta de Autos | GALSA Durango',
    description:
      'Contrato digital con validez legal, seguro con cobertura amplia e inspección de cada vehículo antes de entregarse en Sucursal Plaza 450, Durango.',
    canonical: `${SITE_URL}/confianza`,
    ogTitle: 'Seguridad y Confianza en Renta de Autos | GALSA Durango',
    ogDescription:
      'Contrato digital con validez legal, seguro con cobertura amplia e inspección de cada vehículo antes de entregarse en Sucursal Plaza 450, Durango.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/faq': {
    title: 'Preguntas Frecuentes sobre Renta de Autos | GALSA Durango',
    description:
      'Resuelve tus dudas sobre requisitos, tarifas con 33% de servicio, depósitos reembolsables y cómo funciona la renta de autos 100% en línea en Durango.',
    canonical: `${SITE_URL}/faq`,
    ogTitle: 'Preguntas Frecuentes sobre Renta de Autos | GALSA Durango',
    ogDescription:
      'Resuelve tus dudas sobre requisitos, tarifas con 33% de servicio, depósitos reembolsables y cómo funciona la renta de autos 100% en línea en Durango.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/contacto': {
    title: 'Contacto y Sucursal Plaza 450 en Durango | GALSA Rent',
    description:
      'Visítanos en Sucursal Plaza 450 en Durango o contáctanos por WhatsApp. Horarios, ubicación y atención directa para renta de autos y anfitriones.',
    canonical: `${SITE_URL}/contacto`,
    ogTitle: 'Contacto y Sucursal Plaza 450 en Durango | GALSA Rent',
    ogDescription:
      'Visítanos en Sucursal Plaza 450 en Durango o contáctanos por WhatsApp. Horarios, ubicación y atención directa para renta de autos y anfitriones.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/terminos': {
    title: 'Términos y Condiciones del Contrato Digital | GALSA Rent',
    description:
      'Condiciones legales del servicio de renta de autos y marketplace de anfitriones de GALSA Rent en Durango, México. Transparencia y certeza jurídica.',
    canonical: `${SITE_URL}/terminos`,
    ogTitle: 'Términos y Condiciones del Contrato Digital | GALSA Rent',
    ogDescription:
      'Condiciones legales del servicio de renta de autos y marketplace de anfitriones de GALSA Rent en Durango, México. Transparencia y certeza jurídica.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/privacidad': {
    title: 'Aviso de Privacidad Integral | GALSA Rent Durango',
    description:
      'Conoce cómo GALSA protege tus datos personales, identificaciones y licencias de conducir para la renta de autos y validación de anfitriones en Durango.',
    canonical: `${SITE_URL}/privacidad`,
    ogTitle: 'Aviso de Privacidad Integral | GALSA Rent Durango',
    ogDescription:
      'Conoce cómo GALSA protege tus datos personales, identificaciones y licencias de conducir para la renta de autos y validación de anfitriones en Durango.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/como-funciona': {
    title: 'Cómo Funciona la Renta de Autos 100% en Línea | GALSA',
    description:
      'Aprende a rentar tu auto en 4 pasos: reserva en línea, sube tus documentos, firma tu contrato digital y recoge en Sucursal Plaza 450, Durango.',
    canonical: `${SITE_URL}/como-funciona`,
    ogTitle: 'Cómo Funciona la Renta de Autos 100% en Línea | GALSA',
    ogDescription:
      'Aprende a rentar tu auto en 4 pasos: reserva en línea, sube tus documentos, firma tu contrato digital y recoge en Sucursal Plaza 450, Durango.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/nosotros': {
    title: 'Sobre Nosotros — Movilidad Digital en Durango | GALSA Rent',
    description:
      'Conoce la historia, misión y estándares de GALSA Rent: renta de autos sin filas, tarifas transparentes y marketplace seguro en Durango y México.',
    canonical: `${SITE_URL}/nosotros`,
    ogTitle: 'Sobre Nosotros — Movilidad Digital en Durango | GALSA Rent',
    ogDescription:
      'Conoce la historia, misión y estándares de GALSA Rent: renta de autos sin filas, tarifas transparentes y marketplace seguro en Durango y México.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  // Private routes with noindex
  '/cuenta': {
    title: 'Mi Cuenta | GALSA Rent Durango',
    description: 'Gestión de reservas y contratos digitales de clientes GALSA Rent en Durango.',
    canonical: `${SITE_URL}/cuenta`,
    ogTitle: 'Mi Cuenta | GALSA Rent Durango',
    ogDescription: 'Gestión de reservas y contratos digitales de clientes GALSA Rent en Durango.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
};

export function getVehicleMetadata(vehicle: Vehicle): RouteMetadata {
  let title = `Renta ${vehicle.make} ${vehicle.model} ${vehicle.version} ${vehicle.year} en Durango | GALSA`;
  if (title.length > 60) {
    title = `Renta ${vehicle.make} ${vehicle.model} ${vehicle.year} en Durango | GALSA`;
  }
  if (title.length > 60) {
    title = `${vehicle.make} ${vehicle.model} ${vehicle.year} en Durango | GALSA`;
  }

  let desc = `${vehicle.make} ${vehicle.model} ${vehicle.year} en Durango desde $${vehicle.pricePerDay.toLocaleString('es-MX')}/día. Unidad verificada, contrato digital y depósito reembolsable. Entrega en Plaza 450.`;
  if (desc.length > 155) {
    desc = desc.substring(0, 152) + '...';
  }

  const firstRealPhoto = vehicle.images[0] || DEFAULT_OG_IMAGE;

  return {
    title,
    description: desc,
    canonical: `${SITE_URL}/vehiculos/${vehicle.slug}`,
    ogTitle: title,
    ogDescription: desc,
    ogImage: {
      url: firstRealPhoto.url,
      alt: firstRealPhoto.alt,
      width: firstRealPhoto.width || 1200,
      height: firstRealPhoto.height || 750,
    },
  };
}

export function getRouteMetadata(path: string): RouteMetadata {
  // Normalize path
  const cleanPath = path.replace(/\/+$/, '') || '/';

  // Check noindex prefixes
  if (cleanPath.startsWith('/admin') || cleanPath.startsWith('/reservar') || cleanPath === '/cuenta') {
    return {
      title: 'Área Privada | GALSA Rent',
      description: 'Acceso privado para gestión de reservas y contratos digitales en Durango.',
      canonical: `${SITE_URL}${cleanPath}`,
      ogTitle: 'Área Privada | GALSA Rent',
      ogDescription: 'Acceso privado para gestión de reservas y contratos digitales en Durango.',
      ogImage: DEFAULT_OG_IMAGE,
      noIndex: true,
    };
  }

  // Check static routes
  if (STATIC_ROUTES_METADATA[cleanPath]) {
    return STATIC_ROUTES_METADATA[cleanPath];
  }

  // Check vehicle routes: /vehiculos/{slug} or /vehiculos/{uuid}
  if (cleanPath.startsWith('/vehiculos/')) {
    const slugOrUuid = cleanPath.replace('/vehiculos/', '');
    const vehicle = VEHICLES.find(
      (v) => v.slug === slugOrUuid || v.uuid === slugOrUuid
    );
    if (vehicle) {
      return getVehicleMetadata(vehicle);
    }
  }

  // Default fallback 404
  return {
    title: 'Página no encontrada | GALSA Rent Durango',
    description: 'La página que buscas no existe. Explora nuestro catálogo de autos disponibles en Durango.',
    canonical: `${SITE_URL}/404`,
    ogTitle: 'Página no encontrada | GALSA Rent Durango',
    ogDescription: 'Explora nuestro catálogo de autos disponibles en renta en Durango.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  };
}
