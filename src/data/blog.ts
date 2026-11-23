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
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'guia-renta-autos-mexico-requisitos',
    title: 'Guía completa: requisitos para rentar un auto en México sin sorpresas',
    excerpt: 'Conoce qué documentos necesitas, cómo funciona la verificación digital y cómo evitar cargos ocultos o depósitos excesivos.',
    category: 'Consejos de Viaje',
    date: '18 Nov 2026',
    readTime: '4 min de lectura',
    image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1794389847378-0-349394.webp',
    author: 'Equipo GALSA Rent',
    content: [
      'Rentar un auto en México ha evolucionado radicalmente gracias a la digitalización. Anteriormente, los mostradores en aeropuertos implicaban largas filas, contratos con letras diminutas y cargos sorpresa que podían duplicar la tarifa inicial cotizada.',
      'En GALSA Rent eliminamos las fricciones mediante una validación 100% digital previa a tu viaje. Para rentar un vehículo con nosotros solo requieres: identificación oficial vigente (INE o pasaporte), licencia de conducir con al menos 2 años de experiencia, comprobante de domicilio reciente y contar con 21 años cumplidos.',
      'Al realizar tu proceso de reserva anticipada, el contrato mercantil digital se firma con plena validez jurídica desde tu teléfono. Esto garantiza que al acudir a la entrega física en nuestra sucursal de Plaza 450, únicamente realizas una breve inspección fotográfica de 3 minutos y recibes las llaves para comenzar tu trayecto sin demora.',
      'Recomendamos siempre verificar que tu proveedor incluya cobertura de seguro y kilometraje libre especificado por escrito, garantizando total tranquilidad en carreteras federales y estatales.'
    ]
  },
  {
    slug: 'como-ganar-dinero-rentando-tu-auto-anfitrion',
    title: 'Cómo poner a trabajar tu auto en GALSA y generar ingresos mensuales',
    excerpt: 'Aprende cómo funciona el marketplace de anfitriones, qué modelos son los más rentables y cómo protegemos tu vehículo.',
    category: 'Anfitriones',
    date: '14 Nov 2026',
    readTime: '5 min de lectura',
    image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793603910333-0-348390.webp',
    author: 'Carlos Damián · Operaciones GALSA',
    content: [
      'Un automóvil particular pasa en promedio más del 85% del tiempo estacionado, depreciándose y generando gastos fijos de tenencia, mantenimiento y seguro. El modelo de anfitrión en GALSA Rent transforma ese activo inactivo en un flujo de efectivo constante.',
      'A diferencia de las plataformas tradicionales que retienen hasta el 30% de la tarifa del propietario, en GALSA el anfitrión recibe el 100% de la tarifa por día que decida fijar. Nuestro modelo de negocio se basa en una tarifa de servicio transparente pagada directamente por el cliente que renta.',
      'La seguridad de tu unidad es nuestra prioridad número uno. Antes de que cualquier conductor tome el volante de tu vehículo, nuestro sistema valida biométricamente su identidad, antecedentes, vigencia de licencia y domicilio. Además, cada renta cuenta con contrato digital formal con firma electrónica y depósito en garantía.',
      'Los sedanes de bajo consumo (como Virtus, Sentra o Aveo) y las SUVs de aventura (como Jeep Wrangler y RAV4) encabezan la lista de mayor demanda y rentabilidad durante fines de semana y periodos vacacionales.'
    ]
  },
  {
    slug: 'rutas-imperdibles-por-carretera-en-durango-y-mexico',
    title: 'Rutas imperdibles por carretera: de la Sierra de Durango al Pacífico',
    excerpt: 'Los mejores miradores, pueblos coloniales y recomendaciones para disfrutar al volante con total libertad.',
    category: 'Destinos',
    date: '09 Nov 2026',
    readTime: '6 min de lectura',
    image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1794388656934-2-gemini_generated_image_s8fcyrs8fcyrs8fc.webp',
    author: 'Editorial GALSA',
    content: [
      'Viajar por carretera en México ofrece paisajes de contrastes asombrosos que solo se aprecian a tu propio ritmo. La autopista Durango-Mazatlán es una de las obras de ingeniería más impresionantes del continente, atravesando la majestuosa Sierra Madre Occidental con puentes colgantes como el Baluarte Bicentenario.',
      'Si prefieres el ecoturismo de montaña, la región de Mexiquillo y los parques de cabañas serranas son ideales para recorrer en un vehículo con buena altura como un Jeep Wrangler o SUV equipada.',
      'Para quienes visitan la ciudad de Durango por placer o negocios, el centro histórico colonial —declarado Patrimonio de la Humanidad por la UNESCO como parte del Camino Real de Tierra Adentro— se explora cómodamente combinando traslados ágiles y paseos peatonales por sus templos y museos de cinematografía.',
      'Con el kilometraje libre incluido en todas las rentas de GALSA, tienes la certeza de que ningún cargo por kilómetro extra limitará tu curiosidad en el camino.'
    ]
  },
  {
    slug: 'contrato-mercantil-digital-como-protege-tu-renta',
    title: 'Contrato mercantil digital: cómo protege tanto al conductor como al anfitrión',
    excerpt: 'Descubre cómo funciona la firma electrónica con validez legal y por qué elimina ambigüedades antes de entregar las llaves.',
    category: 'Seguridad & Legal',
    date: '04 Nov 2026',
    readTime: '4 min de lectura',
    image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1794388656485-1-gemini_generated_image_jmm2n3jmm2n3jmm2.webp',
    author: 'Legal & Cumplimiento GALSA',
    content: [
      'Uno de los mayores temores al rentar o compartir un auto es no tener reglas claras por escrito. En GALSA Rent cada reserva genera automáticamente un contrato mercantil digital con los datos validados de ambas partes, fechas exactas, cobertura y monto de depósito reembolsable.',
      'La firma electrónica se completa desde tu celular antes de llegar al punto de entrega, evitando papeleo improvisado o cláusulas ambiguas de último minuto.',
      'Además, el contrato se vincula directamente al checklist fotográfico de entrega y devolución en sucursal, dejando evidencia clara del estado físico y nivel de combustible de la unidad.'
    ]
  },
  {
    slug: 'entrega-express-plaza-450-durango-sin-filas',
    title: 'Entrega express en Plaza 450 Durango: recoge tu auto en menos de 5 minutos',
    excerpt: 'Así preparamos tu unidad con validación previa y checklist fotográfico para que salgas manejando sin esperas.',
    category: 'Experiencia GALSA',
    date: '29 Oct 2026',
    readTime: '3 min de lectura',
    image: 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1794388655725-0-gemini_generated_image_6uloc56uloc56ulo.webp',
    author: 'Equipo GALSA Rent',
    content: [
      'Cuando llegas a Durango por trabajo o vacaciones, lo último que quieres es perder una hora en mostradores llenando formularios a mano. Por eso diseñamos nuestro punto físico controlado en Blvd. Guadiana, Plaza 450.',
      'Como tu licencia, INE y firma digital ya quedaron validados en línea al confirmar tu reserva, nuestro equipo te espera con el vehículo limpio, sanitizado y con inspección previa lista.',
      'En menos de cinco minutos realizamos juntos la verificación visual rápida, confirmamos tu horario de devolución y te entregamos las llaves para que disfrutes tu viaje desde el primer kilómetro.'
    ]
  },
  {
    slug: 'que-auto-elegir-para-viaje-familiar-o-negocios',
    title: '¿Sedán ejecutivo, SUV o 4x4? Cómo elegir el auto ideal para tu viaje',
    excerpt: 'Compara rendimiento, espacio de cajuela y comodidad según tu ruta por ciudad, carretera o sierra.',
    category: 'Guías de Flota',
    date: '21 Oct 2026',
    readTime: '5 min de lectura',
    image: '/galsa-rent/images/anfitriones/cta-familia-anfitrion.png',
    author: 'Editorial GALSA',
    content: [
      'Elegir la categoría correcta hace toda la diferencia en tu presupuesto y comodidad. Para traslados urbanos o viajes ejecutivos entre ciudades, un sedán moderno como Volkswagen Virtus, Nissan Sentra o Audi A4 ofrece gran rendimiento de combustible y manejo silencioso.',
      'Si viajas en familia con maletas grandes, una SUV como Toyota RAV4 o Audi Q5 te brinda mayor altura al piso, espacio en segunda fila y estabilidad en autopista.',
      'Y si tu plan incluye cabañas en la sierra, caminos de terracería o escapadas de fin de semana con estilo, un Jeep Wrangler Rubicon te da la tracción y versatilidad necesarias sin sacrificar seguridad.'
    ]
  }
];
