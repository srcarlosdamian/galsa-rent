import { RouteMetadata, Vehicle } from '../types/vehicle';
import { VEHICLES } from './vehicles';

export const SITE_URL = 'https://galsarent.com.mx';

export const DEFAULT_OG_IMAGE = {
  url: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793821950338-0-2232323.webp',
  alt: 'GALSA Rent — Renta de autos en México',
  width: 1200,
  height: 630,
};

export const STATIC_ROUTES_METADATA: Record<string, RouteMetadata> = {
  '/': {
    title: 'Renta de Autos en México — Reserva en Línea | GALSA Rent',
    description:
      'Renta autos en México desde $1,100 al día: sedanes, SUVs y Jeep Wrangler. Reserva en línea, contrato digital, kilometraje libre y entrega rápida sin filas.',
    canonical: `${SITE_URL}/`,
    ogTitle: 'Renta de Autos en México — Reserva en Línea | GALSA Rent',
    ogDescription:
      'Renta autos en México desde $1,100 al día: sedanes, SUVs y Jeep Wrangler. Reserva en línea, contrato digital, kilometraje libre y entrega rápida sin filas.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/anfitriones': {
    title: 'Renta tu auto y gana dinero | GALSA Anfitriones',
    description:
      'Publica tu auto en GALSA y recibe el 100% de tu tarifa diaria. Tú apruebas cada reserva; clientes verificados, seguro durante la renta y pagos a tu cuenta.',
    canonical: `${SITE_URL}/anfitriones`,
    ogTitle: 'Renta tu auto y gana dinero | GALSA Anfitriones',
    ogDescription:
      'Publica tu auto en GALSA y recibe el 100% de tu tarifa diaria. Tú apruebas cada reserva; clientes verificados, seguro durante la renta y pagos a tu cuenta.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/catalogo': {
    title: 'Catálogo de autos en renta | GALSA Rent',
    description:
      'Explora autos verificados: sedanes económicos, SUVs familiares y camionetas 4x4 de flota propia y anfitriones. Contrato digital, seguro incluido y reserva 100% en línea.',
    canonical: `${SITE_URL}/catalogo`,
    ogTitle: 'Catálogo de autos en renta | GALSA Rent',
    ogDescription:
      'Explora autos verificados: sedanes económicos, SUVs familiares y camionetas 4x4 de flota propia y anfitriones. Contrato digital, seguro incluido y reserva 100% en línea.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/blog': {
    title: 'Blog de Movilidad, Consejos y Rutas | GALSA Rent',
    description:
      'Artículos, guías sobre requisitos de renta de autos, rutas en México y consejos para anfitriones en GALSA Rent.',
    canonical: `${SITE_URL}/blog`,
    ogTitle: 'Blog de Movilidad, Consejos y Rutas | GALSA Rent',
    ogDescription:
      'Artículos, guías sobre requisitos de renta de autos, rutas en México y consejos para anfitriones en GALSA Rent.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/confianza': {
    title: 'Seguridad y Confianza en Renta de Autos | GALSA Rent',
    description:
      'Contrato digital con validez legal, seguro de cobertura amplia, inspección fotográfica rigurosa y entrega garantizada sin filas en México.',
    canonical: `${SITE_URL}/confianza`,
    ogTitle: 'Seguridad y Confianza en Renta de Autos | GALSA Rent',
    ogDescription:
      'Contrato digital con validez legal, seguro de cobertura amplia, inspección fotográfica rigurosa y entrega garantizada sin filas en México.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/faq': {
    title: 'Preguntas Frecuentes sobre Renta de Autos | GALSA Rent',
    description:
      'Resuelve tus dudas sobre requisitos, tarifas transparentes, depósitos reembolsables y cómo funciona la renta de autos 100% en línea en México.',
    canonical: `${SITE_URL}/faq`,
    ogTitle: 'Preguntas Frecuentes sobre Renta de Autos | GALSA Rent',
    ogDescription:
      'Resuelve tus dudas sobre requisitos, tarifas transparentes, depósitos reembolsables y cómo funciona la renta de autos 100% en línea en México.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/contacto': {
    title: 'Contacto y Atención a Clientes | GALSA Rent',
    description:
      'Contáctanos directamente por WhatsApp o visítanos en sucursal. Horarios de atención, soporte y asesoría directa para renta de autos y anfitriones en México.',
    canonical: `${SITE_URL}/contacto`,
    ogTitle: 'Contacto y Atención a Clientes | GALSA Rent',
    ogDescription:
      'Contáctanos directamente por WhatsApp o visítanos en sucursal. Horarios de atención, soporte y asesoría directa para renta de autos y anfitriones en México.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/terminos': {
    title: 'Términos y Condiciones del Contrato Digital | GALSA Rent',
    description:
      'Condiciones legales del servicio de renta de autos y marketplace de anfitriones de GALSA Rent en México. Transparencia y certeza jurídica.',
    canonical: `${SITE_URL}/terminos`,
    ogTitle: 'Términos y Condiciones del Contrato Digital | GALSA Rent',
    ogDescription:
      'Condiciones legales del servicio de renta de autos y marketplace de anfitriones de GALSA Rent en México. Transparencia y certeza jurídica.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/privacidad': {
    title: 'Aviso de Privacidad Integral | GALSA Rent',
    description:
      'Conoce cómo GALSA protege tus datos personales, identificaciones y licencias de conducir para la renta de autos y validación de anfitriones en México.',
    canonical: `${SITE_URL}/privacidad`,
    ogTitle: 'Aviso de Privacidad Integral | GALSA Rent',
    ogDescription:
      'Conoce cómo GALSA protege tus datos personales, identificaciones y licencias de conducir para la renta de autos y validación de anfitriones en México.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/como-funciona': {
    title: 'Cómo Funciona la Renta de Autos 100% en Línea | GALSA',
    description:
      'Aprende a rentar tu auto en 4 pasos: reserva en línea, sube tus documentos, firma tu contrato digital y recoge tu auto al instante sin filas en México.',
    canonical: `${SITE_URL}/como-funciona`,
    ogTitle: 'Cómo Funciona la Renta de Autos 100% en Línea | GALSA',
    ogDescription:
      'Aprende a rentar tu auto en 4 pasos: reserva en línea, sube tus documentos, firma tu contrato digital y recoge tu auto al instante sin filas en México.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/nosotros': {
    title: 'Sobre Nosotros — Movilidad Digital | GALSA Rent',
    description:
      'Conoce la historia, misión y estándares de GALSA Rent: renta de autos sin filas, tarifas transparentes y marketplace seguro en todo México.',
    canonical: `${SITE_URL}/nosotros`,
    ogTitle: 'Sobre Nosotros — Movilidad Digital | GALSA Rent',
    ogDescription:
      'Conoce la historia, misión y estándares de GALSA Rent: renta de autos sin filas, tarifas transparentes y marketplace seguro en todo México.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  // Private routes with noindex
  '/cuenta': {
    title: 'Mi Cuenta | GALSA Rent',
    description: 'Gestión de reservas y contratos digitales de clientes GALSA Rent en México.',
    canonical: `${SITE_URL}/cuenta`,
    ogTitle: 'Mi Cuenta | GALSA Rent',
    ogDescription: 'Gestión de reservas y contratos digitales de clientes GALSA Rent en México.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/login': {
    title: 'Iniciar Sesión | GALSA Rent México',
    description: 'Accede a tu cuenta de GALSA Rent para gestionar tus rentas y firmar contratos digitales.',
    canonical: `${SITE_URL}/login`,
    ogTitle: 'Iniciar Sesión | GALSA Rent México',
    ogDescription: 'Accede a tu cuenta de GALSA Rent para gestionar tus rentas y firmar contratos digitales.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/registro': {
    title: 'Crear Cuenta | GALSA Rent México',
    description: 'Crea tu cuenta en GALSA Rent en un minuto y reserva autos 100% en línea.',
    canonical: `${SITE_URL}/registro`,
    ogTitle: 'Crear Cuenta | GALSA Rent México',
    ogDescription: 'Crea tu cuenta en GALSA Rent en un minuto y reserva autos 100% en línea.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/recuperar-password': {
    title: 'Recuperar Contraseña | GALSA Rent',
    description: 'Restablece el acceso a tu cuenta de GALSA Rent de forma rápida y segura.',
    canonical: `${SITE_URL}/recuperar-password`,
    ogTitle: 'Recuperar Contraseña | GALSA Rent',
    ogDescription: 'Restablece el acceso a tu cuenta de GALSA Rent de forma rápida y segura.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/recuperar-password/enviado': {
    title: 'Correo Enviado | GALSA Rent',
    description: 'Instrucciones para restablecer contraseña enviadas por correo electrónico.',
    canonical: `${SITE_URL}/recuperar-password/enviado`,
    ogTitle: 'Correo Enviado | GALSA Rent',
    ogDescription: 'Instrucciones para restablecer contraseña enviadas por correo electrónico.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/restablecer-password': {
    title: 'Restablecer Contraseña | GALSA Rent',
    description: 'Crea una nueva contraseña segura para tu cuenta de GALSA Rent.',
    canonical: `${SITE_URL}/restablecer-password`,
    ogTitle: 'Restablecer Contraseña | GALSA Rent',
    ogDescription: 'Crea una nueva contraseña segura para tu cuenta de GALSA Rent.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/seo': {
    title: 'Visor y Auditor SEO | GALSA Rent',
    description: 'Previsualización en tiempo real de resultados en Google SERP, Open Graph y compartidos sociales para todas las páginas de GALSA Rent.',
    canonical: `${SITE_URL}/seo`,
    ogTitle: 'Visor y Auditor SEO | GALSA Rent',
    ogDescription: 'Previsualización en tiempo real de resultados en Google SERP, Open Graph y compartidos sociales para todas las páginas de GALSA Rent.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/design-system': {
    title: 'Sistema de Diseño (Atomic Design) | GALSA Rent',
    description: 'Guía interactiva de componentes, tokens, átomos, moléculas y organismos de la plataforma GALSA Rent.',
    canonical: `${SITE_URL}/design-system`,
    ogTitle: 'Sistema de Diseño (Atomic Design) | GALSA Rent',
    ogDescription: 'Guía interactiva de componentes, tokens, átomos, moléculas y organismos de la plataforma GALSA Rent.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
};

export function getVehicleMetadata(vehicle: Vehicle): RouteMetadata {
  let title = `Renta ${vehicle.make} ${vehicle.model} ${vehicle.version} ${vehicle.year} | GALSA`;
  if (title.length > 60) {
    title = `Renta ${vehicle.make} ${vehicle.model} ${vehicle.year} | GALSA`;
  }
  if (title.length > 60) {
    title = `${vehicle.make} ${vehicle.model} ${vehicle.year} | GALSA`;
  }

  let desc = `${vehicle.make} ${vehicle.model} ${vehicle.year} desde $${vehicle.pricePerDay.toLocaleString('es-MX')}/día en México. Auto verificado, contrato digital, seguro incluido y entrega rápida sin filas.`;
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
  if (cleanPath.startsWith('/admin') || cleanPath.startsWith('/reservar') || cleanPath.startsWith('/cuenta') || cleanPath === '/completar-perfil') {
    return {
      title: 'Área Privada | GALSA Rent',
      description: 'Acceso privado para gestión de reservas y contratos digitales en México.',
      canonical: `${SITE_URL}${cleanPath}`,
      ogTitle: 'Área Privada | GALSA Rent',
      ogDescription: 'Acceso privado para gestión de reservas y contratos digitales en México.',
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
    title: 'Página no encontrada | GALSA Rent',
    description: 'La página que buscas no existe. Explora nuestro catálogo de autos disponibles en renta en México.',
    canonical: `${SITE_URL}/404`,
    ogTitle: 'Página no encontrada | GALSA Rent',
    ogDescription: 'Explora nuestro catálogo de autos disponibles en renta en México.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  };
}
