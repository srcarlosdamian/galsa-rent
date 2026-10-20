import { Vehicle } from '../types/vehicle';
import { FAQ_ITEMS } from '../components/FaqSection';
import { SITE_URL } from './metadata';

export function getHomeSchemaJson() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutoRental',
        '@id': `${SITE_URL}/#autorental`,
        name: 'GALSA Rent',
        legalName: 'GALSA Rent Durango',
        url: `${SITE_URL}/`,
        logo: 'https://res.cloudinary.com/dl43kwe5u/image/upload/c_fill,g_auto,ar_16:10,w_1200,f_auto,q_auto/v1791553254/galsa/vehiculos/rrn6ozhmnazoamesafxy.jpg',
        image: 'https://res.cloudinary.com/dl43kwe5u/image/upload/c_fill,g_auto,ar_16:10,w_1200,f_auto,q_auto/v1791553254/galsa/vehiculos/rrn6ozhmnazoamesafxy.jpg',
        description: 'Renta de autos 100% en línea en Durango con entrega en Sucursal Plaza 450 y marketplace de anfitriones.',
        priceRange: '$$',
        currenciesAccepted: 'MXN',
        paymentAccepted: 'Credit Card, Debit Card, Bank Transfer',
        areaServed: {
          '@type': 'City',
          name: 'Durango',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Blvd. Guadiana, Plaza 450',
          addressLocality: 'Durango',
          addressRegion: 'Durango',
          postalCode: '34138', // TODO: Confirmar código postal exacto de Plaza 450
          addressCountry: 'MX',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '24.02388', // Coordenadas aproximadas de Plaza 450 Durango
          longitude: '-104.68652',
        },
        telephone: '+526180000000', // TODO: Reemplazar con el teléfono oficial de GALSA Rent
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:00', // TODO: Confirmar horario oficial
            closes: '20:00',
          },
        ],
        sameAs: [
          // TODO: Agregar enlaces oficiales a redes sociales de GALSA Rent
          // 'https://www.facebook.com/galsarent',
          // 'https://www.instagram.com/galsarent',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'GALSA Rent',
        inLanguage: 'es-MX',
        description: 'Renta de autos en Durango, 100% en línea',
      },
    ],
  };
}

export function getVehicleSchemaJson(vehicle: Vehicle) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Car', 'Product'],
        '@id': `${SITE_URL}/vehiculos/${vehicle.slug}#car`,
        name: `${vehicle.make} ${vehicle.model} ${vehicle.version} ${vehicle.year}`,
        image: vehicle.images.map((img) => img.url),
        description: vehicle.description,
        brand: {
          '@type': 'Brand',
          name: vehicle.make,
        },
        model: vehicle.model,
        vehicleModelDate: vehicle.year.toString(),
        numberOfDoors: vehicle.specs.doors,
        seatingCapacity: vehicle.seats,
        vehicleTransmission: vehicle.transmission,
        fuelType: vehicle.fuel,
        offers: {
          '@type': 'Offer',
          price: vehicle.pricePerDay,
          priceCurrency: 'MXN',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/vehiculos/${vehicle.slug}`,
          priceValidUntil: '2026-12-31',
          seller: {
            '@type': 'AutoRental',
            name: 'GALSA Rent Durango',
            url: `${SITE_URL}/`,
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Catálogo',
            item: `${SITE_URL}/catalogo`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
            item: `${SITE_URL}/vehiculos/${vehicle.slug}`,
          },
        ],
      },
    ],
  };
}

export function getFaqSchemaJson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function getHostSchemaJson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto gano publicando mi auto en GALSA Rent Durango?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Recibes el 100% de la tarifa por día que fijas para tu vehículo. La tarifa de servicio del 33% la paga el cliente.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Quién valida a los clientes que rentan mi auto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GALSA valida la autenticidad de la licencia de conducir vigente, identificación oficial INE y comprobante de domicilio de cada cliente antes de firmar el contrato digital.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Dónde se entrega y recibe mi auto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Todas las entregas y devoluciones se coordinan en Sucursal Plaza 450 en Durango con checklist fotográfico de salida y entrada.',
        },
      },
    ],
  };
}
