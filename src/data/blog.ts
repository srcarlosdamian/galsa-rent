export interface BlogSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  content: string[];
  sections?: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'preguntas-frecuentes-renta-autos-galsa',
    title: 'Preguntas frecuentes sobre renta de autos, depósitos y entregas en GALSA',
    excerpt: 'Resolvemos tus dudas sobre requisitos, depósito reembolsable, kilometraje libre, cancelaciones y entrega en sucursal.',
    category: 'Guías de Ayuda',
    date: '22 Nov 2026',
    readTime: '5 min de lectura',
    image: '/galsa-rent/images/anfitriones/step-1-registrate.png',
    author: 'Equipo GALSA Rent',
    content: [
      'Antes de reservar tu vehículo en línea, es normal tener dudas sobre cómo funciona la validación digital, el depósito en garantía o los horarios de entrega. Aquí reunimos las respuestas más importantes para que viajes con total certeza.'
    ],
    sections: [
      {
        heading: '¿Qué necesito para rentar un auto?',
        bullets: [
          'Tener al menos 21 años cumplidos.',
          'Licencia de conducir vigente con mínimo 2 años de antigüedad.',
          'Identificación oficial vigente (INE o pasaporte).',
          'Comprobante de domicilio no mayor a 3 meses y método de pago a tu nombre.'
        ]
      },
      {
        heading: '¿Cómo funciona el depósito en garantía?',
        paragraphs: [
          'El depósito en garantía es 100% reembolsable al devolver el vehículo en las condiciones acordadas. El monto exacto se muestra con total transparencia en tu resumen antes de confirmar cualquier pago.'
        ]
      },
      {
        heading: '¿Puedo cancelar o modificar mi reserva?',
        paragraphs: [
          'Sí. Las cancelaciones realizadas con más de 48 horas de anticipación reciben reembolso del 100%. Para cambios de fecha u horario puedes escribirnos directamente desde la página de contacto.'
        ]
      }
    ]
  },
  {
    slug: 'guia-renta-autos-mexico-requisitos',
    title: 'Guía completa: requisitos para rentar un auto en México sin sorpresas',
    excerpt: 'Conoce qué documentos necesitas, cómo funciona la verificación digital y cómo evitar cargos ocultos o depósitos excesivos.',
    category: 'Consejos de Viaje',
    date: '18 Nov 2026',
    readTime: '4 min de lectura',
    image: '/galsa-rent/images/anfitriones/step-2-valida-identidad.png',
    author: 'Equipo GALSA Rent',
    content: [
      'Rentar un auto en México ha evolucionado radicalmente gracias a la digitalización. Anteriormente, los mostradores en aeropuertos implicaban largas filas, contratos con letras diminutas y cargos sorpresa que podían duplicar la tarifa inicial cotizada.'
    ],
    sections: [
      {
        heading: 'Validación 100% digital previa a tu viaje',
        paragraphs: [
          'En GALSA Rent eliminamos las fricciones mediante una validación digital previa. Al realizar tu reserva anticipada, el contrato mercantil digital se firma con plena validez jurídica desde tu teléfono.'
        ],
        bullets: [
          'Identificación oficial vigente (INE o pasaporte).',
          'Licencia de conducir vigente con al menos 2 años de experiencia.',
          'Comprobante de domicilio reciente y 21 años cumplidos.'
        ]
      },
      {
        heading: 'Entrega sin filas en sucursal',
        paragraphs: [
          'Al acudir a la entrega física en nuestra sucursal de Plaza 450, únicamente realizas una breve inspección fotográfica de 3 minutos y recibes las llaves para comenzar tu trayecto sin demora, siempre con seguro y kilometraje libre incluidos.'
        ]
      }
    ]
  },
  {
    slug: 'como-ganar-dinero-rentando-tu-auto-anfitrion',
    title: 'Cómo poner a trabajar tu auto en GALSA y generar ingresos mensuales',
    excerpt: 'Aprende cómo funciona el marketplace de anfitriones, qué modelos son los más rentables y cómo protegemos tu vehículo.',
    category: 'Anfitriones',
    date: '14 Nov 2026',
    readTime: '5 min de lectura',
    image: '/galsa-rent/images/anfitriones/step-6-cobra.png',
    author: 'Carlos Damián · Operaciones GALSA',
    content: [
      'Un automóvil particular pasa en promedio más del 85% del tiempo estacionado, generando gastos fijos de tenencia, mantenimiento y seguro. El modelo de anfitrión en GALSA Rent transforma ese activo inactivo en un flujo constante.'
    ],
    sections: [
      {
        heading: 'Recibes el 100% de tu tarifa diaria',
        paragraphs: [
          'A diferencia de las plataformas tradicionales que retienen hasta el 30% de la tarifa del propietario, en GALSA el anfitrión recibe el 100% de la tarifa por día que decida fijar. La tarifa de servicio la cubre el cliente.'
        ]
      },
      {
        heading: 'Protección en cada renta',
        bullets: [
          'Validación biométrica de identidad, licencia y domicilio de cada conductor.',
          'Contrato mercantil digital con firma electrónica y depósito en garantía.',
          'Entrega y devolución controlada con checklist fotográfico en sucursal.'
        ]
      }
    ]
  },
  {
    slug: 'contrato-mercantil-digital-como-protege-tu-renta',
    title: 'Contrato mercantil digital: cómo protege tanto al conductor como al anfitrión',
    excerpt: 'Descubre cómo funciona la firma electrónica con validez legal y por qué elimina ambigüedades antes de entregar las llaves.',
    category: 'Seguridad & Legal',
    date: '09 Nov 2026',
    readTime: '4 min de lectura',
    image: '/galsa-rent/images/anfitriones/step-4-recibe-aprobacion.png',
    author: 'Legal & Cumplimiento GALSA',
    content: [
      'Uno de los mayores temores al rentar o compartir un auto es no tener reglas claras por escrito. En GALSA Rent cada reserva genera automáticamente un contrato mercantil digital con los datos validados de ambas partes, fechas exactas, cobertura y monto de depósito reembolsable.'
    ],
    sections: [
      {
        heading: 'Certeza jurídica desde tu celular',
        paragraphs: [
          'La firma electrónica se completa desde tu teléfono antes de llegar al punto de entrega, evitando papeleo improvisado o cláusulas ambiguas de último minuto.'
        ]
      },
      {
        heading: 'Respaldo con evidencia fotográfica',
        paragraphs: [
          'El contrato se vincula directamente al checklist fotográfico de entrega y devolución en sucursal, dejando evidencia clara del estado físico y nivel de combustible de la unidad.'
        ]
      }
    ]
  },
  {
    slug: 'entrega-express-plaza-450-durango-sin-filas',
    title: 'Entrega express en Plaza 450 Durango: recoge tu auto en menos de 5 minutos',
    excerpt: 'Así preparamos tu unidad con validación previa y checklist fotográfico para que salgas manejando sin esperas.',
    category: 'Experiencia GALSA',
    date: '04 Nov 2026',
    readTime: '3 min de lectura',
    image: '/galsa-rent/images/anfitriones/step-5-recibe-reservas.png',
    author: 'Equipo GALSA Rent',
    content: [
      'Cuando llegas a Durango por trabajo o vacaciones, lo último que quieres es perder una hora en mostradores llenando formularios a mano. Por eso diseñamos nuestro punto físico controlado en Blvd. Guadiana, Plaza 450.'
    ],
    sections: [
      {
        heading: 'Todo listo antes de tu llegada',
        paragraphs: [
          'Como tu licencia, INE y firma digital ya quedaron validados en línea al confirmar tu reserva, nuestro equipo te espera con el vehículo limpio, sanitizado y con inspección previa lista.'
        ],
        bullets: [
          'Verificación visual rápida junto con nuestro equipo.',
          'Confirmación de horario y punto de devolución.',
          'Entrega inmediata de llaves para iniciar tu recorrido.'
        ]
      }
    ]
  },
  {
    slug: 'que-auto-elegir-para-viaje-familiar-o-negocios',
    title: '¿Sedán ejecutivo, SUV o 4x4? Cómo elegir el auto ideal para tu viaje',
    excerpt: 'Compara rendimiento, espacio de cajuela y comodidad según tu ruta por ciudad, carretera o sierra.',
    category: 'Guías de Flota',
    date: '28 Oct 2026',
    readTime: '5 min de lectura',
    image: '/galsa-rent/images/anfitriones/step-3-carga-vehiculo.png',
    author: 'Editorial GALSA',
    content: [
      'Elegir la categoría correcta hace toda la diferencia en tu presupuesto y comodidad. Con kilometraje libre incluido en todas las rentas de GALSA, puedes planear rutas por ciudad, autopista o sierra sin cargos extra por distancia.'
    ],
    sections: [
      {
        heading: 'Opciones recomendadas según tu plan',
        bullets: [
          'Sedán moderno (Virtus, Sentra, Audi A4): ideal para ciudad y viajes ejecutivos con gran rendimiento de combustible.',
          'SUV familiar (Toyota RAV4, Audi Q5): mayor altura al piso, espacio en segunda fila y comodidad para equipaje.',
          '4x4 de aventura (Jeep Wrangler Rubicon): perfecta para la sierra de Durango, Mexiquillo y caminos de terracería.'
        ]
      }
    ]
  }
];
