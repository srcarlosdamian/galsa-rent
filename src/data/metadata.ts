import { RouteMetadata, Vehicle } from '../types/vehicle';
import { VEHICLES } from './vehicles';
import { BLOG_POSTS, BlogPost } from './blog';

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
    focusKeyword: 'renta de autos en méxico',
    canonical: `${SITE_URL}/`,
    ogTitle: 'Renta de Autos en México — Reserva en Línea | GALSA Rent',
    ogDescription:
      'Renta autos en México desde $1,100 al día: sedanes, SUVs y Jeep Wrangler. Reserva en línea, contrato digital, kilometraje libre y entrega rápida sin filas.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/anfitriones': {
    title: 'Renta tu Auto y Gana Dinero en México | GALSA Anfitriones',
    description:
      'Publica tu auto en GALSA y recibe el 100% de tu tarifa diaria. Tú apruebas cada reserva; clientes verificados, seguro durante la renta y pagos a tu cuenta.',
    focusKeyword: 'rentar mi auto y ganar dinero en méxico',
    canonical: `${SITE_URL}/anfitriones`,
    ogTitle: 'Renta tu Auto y Gana Dinero en México | GALSA Anfitriones',
    ogDescription:
      'Publica tu auto en GALSA y recibe el 100% de tu tarifa diaria. Tú apruebas cada reserva; clientes verificados, seguro durante la renta y pagos a tu cuenta.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/anfitriones/registro': {
    title: 'Registro de Anfitriones — Publica tu Auto | GALSA Rent',
    description:
      'Regístrate como anfitrión y validamos tu auto en 24-48 horas. Genera ingresos extra con conductores verificados y recibe el 100% de tu tarifa diaria.',
    focusKeyword: 'publicar auto en renta méxico',
    canonical: `${SITE_URL}/anfitriones/registro`,
    ogTitle: 'Registro de Anfitriones — Publica tu Auto | GALSA Rent',
    ogDescription:
      'Regístrate como anfitrión y validamos tu auto en 24-48 horas. Genera ingresos extra con conductores verificados y recibe el 100% de tu tarifa diaria.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/catalogo': {
    title: 'Catálogo de Autos en Renta en Durango y México | GALSA',
    description:
      'Explora nuestro catálogo de autos en renta: sedanes, SUVs y 4x4 verificados. Contrato digital, seguro incluido y reserva 100% en línea sin filas.',
    focusKeyword: 'catálogo de autos en renta durango',
    canonical: `${SITE_URL}/catalogo`,
    ogTitle: 'Catálogo de Autos en Renta en Durango y México | GALSA',
    ogDescription:
      'Explora nuestro catálogo de autos en renta: sedanes, SUVs y 4x4 verificados. Contrato digital, seguro incluido y reserva 100% en línea sin filas.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/blog': {
    title: 'Blog de Renta de Autos, Rutas y Consejos | GALSA Rent',
    description:
      'Guías prácticas sobre requisitos de renta de autos en México, rutas por Durango, consejos de viaje y recomendaciones para anfitriones GALSA.',
    focusKeyword: 'consejos y rutas renta de autos méxico',
    canonical: `${SITE_URL}/blog`,
    ogTitle: 'Blog de Renta de Autos, Rutas y Consejos | GALSA Rent',
    ogDescription:
      'Guías prácticas sobre requisitos de renta de autos en México, rutas por Durango, consejos de viaje y recomendaciones para anfitriones GALSA.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/confianza': {
    title: 'Seguridad y Confianza en Renta de Autos | GALSA Rent',
    description:
      'Contrato digital con validez legal ante PROFECO, seguro de cobertura amplia, inspección fotográfica y entrega garantizada sin filas en México.',
    focusKeyword: 'renta de autos segura en méxico',
    canonical: `${SITE_URL}/confianza`,
    ogTitle: 'Seguridad y Confianza en Renta de Autos | GALSA Rent',
    ogDescription:
      'Contrato digital con validez legal ante PROFECO, seguro de cobertura amplia, inspección fotográfica y entrega garantizada sin filas en México.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/faq': {
    title: 'Preguntas Frecuentes de Renta de Autos | GALSA Rent',
    description:
      'Resuelve dudas sobre requisitos, depósito reembolsable, tarifas claras y cómo funciona la renta de autos 100% en línea en Durango y México.',
    focusKeyword: 'requisitos para rentar un auto en méxico',
    canonical: `${SITE_URL}/faq`,
    ogTitle: 'Preguntas Frecuentes de Renta de Autos | GALSA Rent',
    ogDescription:
      'Resuelve dudas sobre requisitos, depósito reembolsable, tarifas claras y cómo funciona la renta de autos 100% en línea en Durango y México.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/contacto': {
    title: 'Sucursal Plaza 450 Durango y Contacto | GALSA Rent',
    description:
      'Visítanos en Sucursal Plaza 450, Blvd. Guadiana, Durango o contáctanos por teléfono y correo. Atención diaria de 08:00 a 20:00 hrs.',
    focusKeyword: 'sucursal renta de autos durango plaza 450',
    canonical: `${SITE_URL}/contacto`,
    ogTitle: 'Sucursal Plaza 450 Durango y Contacto | GALSA Rent',
    ogDescription:
      'Visítanos en Sucursal Plaza 450, Blvd. Guadiana, Durango o contáctanos por teléfono y correo. Atención diaria de 08:00 a 20:00 hrs.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/terminos': {
    title: 'Términos y Condiciones del Contrato Digital | GALSA Rent',
    description:
      'Condiciones legales del servicio de renta de autos y marketplace de anfitriones de GALSA Rent en México. Transparencia y certeza jurídica.',
    focusKeyword: 'términos y condiciones contrato renta de autos',
    canonical: `${SITE_URL}/terminos`,
    ogTitle: 'Términos y Condiciones del Contrato Digital | GALSA Rent',
    ogDescription:
      'Condiciones legales del servicio de renta de autos y marketplace de anfitriones de GALSA Rent en México. Transparencia y certeza jurídica.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/privacidad': {
    title: 'Aviso de Privacidad Integral | GALSA Rent',
    description:
      'Conoce cómo GALSA protege tus datos personales, identificaciones y licencias de conducir para la renta de autos y validación de anfitriones en México.',
    focusKeyword: 'aviso de privacidad galsa rent',
    canonical: `${SITE_URL}/privacidad`,
    ogTitle: 'Aviso de Privacidad Integral | GALSA Rent',
    ogDescription:
      'Conoce cómo GALSA protege tus datos personales, identificaciones y licencias de conducir para la renta de autos y validación de anfitriones en México.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/como-funciona': {
    title: 'Cómo Funciona la Renta de Autos en Línea | GALSA Rent',
    description:
      'Renta tu auto en 4 pasos: reserva en línea, sube tus documentos, firma tu contrato digital y recoge tu auto en minutos sin filas en Durango.',
    focusKeyword: 'cómo rentar un auto en línea méxico',
    canonical: `${SITE_URL}/como-funciona`,
    ogTitle: 'Cómo Funciona la Renta de Autos en Línea | GALSA Rent',
    ogDescription:
      'Renta tu auto en 4 pasos: reserva en línea, sube tus documentos, firma tu contrato digital y recoge tu auto en minutos sin filas en Durango.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/nosotros': {
    title: 'Renta de Autos Digital en Durango y México | GALSA Rent',
    description:
      'Conoce la historia y estándares de GALSA Rent: movilidad digital sin filas, tarifas transparentes, contratos electrónicos y flota verificada.',
    focusKeyword: 'renta de autos digital durango méxico',
    canonical: `${SITE_URL}/nosotros`,
    ogTitle: 'Renta de Autos Digital en Durango y México | GALSA Rent',
    ogDescription:
      'Conoce la historia y estándares de GALSA Rent: movilidad digital sin filas, tarifas transparentes, contratos electrónicos y flota verificada.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  // Private routes with noindex
  '/cuenta': {
    title: 'Mi Cuenta y Reservaciones | GALSA Rent',
    description: 'Gestión de reservas, documentos y contratos digitales de clientes GALSA Rent en México.',
    focusKeyword: 'mi cuenta galsa rent',
    canonical: `${SITE_URL}/cuenta`,
    ogTitle: 'Mi Cuenta y Reservaciones | GALSA Rent',
    ogDescription: 'Gestión de reservas, documentos y contratos digitales de clientes GALSA Rent en México.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/cuenta/completar': {
    title: 'Completar Perfil de Conductor | GALSA Rent',
    description: 'Completa tus datos de conductor y documentación para activar tu cuenta de GALSA Rent.',
    focusKeyword: 'completar perfil conductor galsa',
    canonical: `${SITE_URL}/cuenta/completar`,
    ogTitle: 'Completar Perfil de Conductor | GALSA Rent',
    ogDescription: 'Completa tus datos de conductor y documentación para activar tu cuenta de GALSA Rent.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/completar-perfil': {
    title: 'Completar Perfil de Conductor | GALSA Rent',
    description: 'Completa tus datos de conductor y documentación para activar tu cuenta de GALSA Rent.',
    focusKeyword: 'completar perfil galsa rent',
    canonical: `${SITE_URL}/completar-perfil`,
    ogTitle: 'Completar Perfil de Conductor | GALSA Rent',
    ogDescription: 'Completa tus datos de conductor y documentación para activar tu cuenta de GALSA Rent.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/login': {
    title: 'Iniciar Sesión | GALSA Rent México',
    description: 'Accede a tu cuenta de GALSA Rent para gestionar tus rentas, documentos y firmar contratos digitales.',
    focusKeyword: 'iniciar sesión galsa rent',
    canonical: `${SITE_URL}/login`,
    ogTitle: 'Iniciar Sesión | GALSA Rent México',
    ogDescription: 'Accede a tu cuenta de GALSA Rent para gestionar tus rentas, documentos y firmar contratos digitales.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/registro': {
    title: 'Crear Cuenta para Rentar Auto | GALSA Rent México',
    description: 'Crea tu cuenta en GALSA Rent en menos de un minuto y reserva autos verificados 100% en línea.',
    focusKeyword: 'crear cuenta renta de autos galsa',
    canonical: `${SITE_URL}/registro`,
    ogTitle: 'Crear Cuenta para Rentar Auto | GALSA Rent México',
    ogDescription: 'Crea tu cuenta en GALSA Rent en menos de un minuto y reserva autos verificados 100% en línea.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/recuperar-password': {
    title: 'Recuperar Contraseña | GALSA Rent',
    description: 'Restablece el acceso a tu cuenta de GALSA Rent de forma rápida y segura.',
    focusKeyword: 'recuperar contraseña galsa rent',
    canonical: `${SITE_URL}/recuperar-password`,
    ogTitle: 'Recuperar Contraseña | GALSA Rent',
    ogDescription: 'Restablece el acceso a tu cuenta de GALSA Rent de forma rápida y segura.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/recuperar-password/enviado': {
    title: 'Correo de Recuperación Enviado | GALSA Rent',
    description: 'Instrucciones para restablecer tu contraseña enviadas por correo electrónico.',
    focusKeyword: 'correo recuperación contraseña galsa',
    canonical: `${SITE_URL}/recuperar-password/enviado`,
    ogTitle: 'Correo de Recuperación Enviado | GALSA Rent',
    ogDescription: 'Instrucciones para restablecer tu contraseña enviadas por correo electrónico.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/restablecer-password': {
    title: 'Restablecer Contraseña | GALSA Rent',
    description: 'Crea una nueva contraseña segura para tu cuenta de GALSA Rent.',
    focusKeyword: 'restablecer contraseña galsa rent',
    canonical: `${SITE_URL}/restablecer-password`,
    ogTitle: 'Restablecer Contraseña | GALSA Rent',
    ogDescription: 'Crea una nueva contraseña segura para tu cuenta de GALSA Rent.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/seo': {
    title: 'Visor y Auditor SEO | GALSA Rent',
    description: 'Previsualización en tiempo real de Google SERP, frases clave, Open Graph y auditoría SEO de GALSA Rent.',
    focusKeyword: 'auditor seo galsa rent',
    canonical: `${SITE_URL}/seo`,
    ogTitle: 'Visor y Auditor SEO | GALSA Rent',
    ogDescription: 'Previsualización en tiempo real de Google SERP, frases clave, Open Graph y auditoría SEO de GALSA Rent.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/design-system': {
    title: 'Sistema de Diseño (Atomic Design) | GALSA Rent',
    description: 'Guía interactiva de tokens, iconos, modales, átomos, moléculas y organismos de la plataforma GALSA Rent.',
    focusKeyword: 'sistema de diseño galsa rent',
    canonical: `${SITE_URL}/design-system`,
    ogTitle: 'Sistema de Diseño (Atomic Design) | GALSA Rent',
    ogDescription: 'Guía interactiva de tokens, iconos, modales, átomos, moléculas y organismos de la plataforma GALSA Rent.',
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
  '/404': {
    title: 'Página no encontrada | GALSA Rent',
    description: 'La página que buscas no existe. Explora nuestro catálogo de autos disponibles en renta en México.',
    focusKeyword: 'página no encontrada galsa rent',
    canonical: `${SITE_URL}/404`,
    ogTitle: 'Página no encontrada | GALSA Rent',
    ogDescription: 'Explora nuestro catálogo de autos disponibles en renta en México.',
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
    focusKeyword: `renta ${vehicle.make.toLowerCase()} ${vehicle.model.toLowerCase()} ${vehicle.year} durango`,
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

export function getBlogPostMetadata(post: BlogPost): RouteMetadata {
  const suffix = ' | Blog GALSA';
  const maxBaseLen = 60 - suffix.length;
  let baseTitle = post.title.trim();
  if (baseTitle.length > maxBaseLen) {
    const truncated = baseTitle.slice(0, maxBaseLen - 1);
    const lastSpace = truncated.lastIndexOf(' ');
    baseTitle = (lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated).trimEnd() + '…';
  }
  const title = `${baseTitle}${suffix}`;

  let desc = post.excerpt.trim();
  if (desc.length > 155) {
    desc = desc.slice(0, 152).trimEnd() + '...';
  }

  return {
    title,
    description: desc,
    focusKeyword: post.slug.replace(/-/g, ' '),
    canonical: `${SITE_URL}/blog/${post.slug}`,
    ogTitle: title,
    ogDescription: desc,
    ogImage: {
      url: post.image || DEFAULT_OG_IMAGE.url,
      alt: post.title,
      width: 1200,
      height: 630,
    },
  };
}

export function getCheckoutMetadata(vehicle: Vehicle): RouteMetadata {
  const title = `Completa tu reserva — ${vehicle.make} ${vehicle.model} ${vehicle.year} | GALSA`;
  let desc = `Reserva ${vehicle.make} ${vehicle.model} ${vehicle.year} desde $${vehicle.pricePerDay.toLocaleString('es-MX')}/día en GALSA Rent. Check-in en línea y contrato digital.`;
  if (desc.length > 155) {
    desc = desc.slice(0, 152).trimEnd() + '...';
  }

  const firstRealPhoto = vehicle.images[0] || DEFAULT_OG_IMAGE;

  return {
    title,
    description: desc,
    focusKeyword: `reservar ${vehicle.make.toLowerCase()} ${vehicle.model.toLowerCase()} en línea`,
    canonical: `${SITE_URL}/reservar/${vehicle.slug}`,
    ogTitle: title,
    ogDescription: desc,
    ogImage: {
      url: firstRealPhoto.url,
      alt: firstRealPhoto.alt,
      width: firstRealPhoto.width || 1200,
      height: firstRealPhoto.height || 750,
    },
    noIndex: true,
  };
}

export function getRouteMetadata(path: string): RouteMetadata {
  // Normalize path removing query strings, hashes and trailing slashes
  const cleanPath = path.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';

  // 1. Checkout routes: /reservar/{slug} or /reservar/{uuid}
  if (cleanPath.startsWith('/reservar/')) {
    const slugOrUuid = cleanPath.replace('/reservar/', '');
    const vehicle = VEHICLES.find(
      (v) => v.slug === slugOrUuid || v.uuid === slugOrUuid
    );
    if (vehicle) {
      return getCheckoutMetadata(vehicle);
    }
  }

  // 2. Blog article routes: /blog/{slug}
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (post) {
      return getBlogPostMetadata(post);
    }
  }

  // 3. Vehicle detail routes: /vehiculos/{slug} or /vehiculos/{uuid}
  if (cleanPath.startsWith('/vehiculos/')) {
    const slugOrUuid = cleanPath.replace('/vehiculos/', '');
    const vehicle = VEHICLES.find(
      (v) => v.slug === slugOrUuid || v.uuid === slugOrUuid
    );
    if (vehicle) {
      return getVehicleMetadata(vehicle);
    }
  }

  // 4. Static routes
  if (STATIC_ROUTES_METADATA[cleanPath]) {
    return STATIC_ROUTES_METADATA[cleanPath];
  }

  // 5. Private prefixes fallback with noindex
  if (cleanPath.startsWith('/admin') || cleanPath.startsWith('/cuenta') || cleanPath.startsWith('/reservar')) {
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

  // 6. Default fallback 404
  return STATIC_ROUTES_METADATA['/404'];
}
