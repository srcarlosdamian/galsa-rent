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
    date: '28 Oct 2026',
    readTime: '4 min de lectura',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
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
    date: '24 Oct 2026',
    readTime: '5 min de lectura',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
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
    date: '18 Oct 2026',
    readTime: '6 min de lectura',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    author: 'Editorial GALSA',
    content: [
      'Viajar por carretera en México ofrece paisajes de contrastes asombrosos que solo se aprecian a tu propio ritmo. La autopista Durango-Mazatlán es una de las obras de ingeniería más impresionantes del continente, atravesando la majestuosa Sierra Madre Occidental con puentes colgantes como el Baluarte Bicentenario.',
      'Si prefieres el ecoturismo de montaña, la región de Mexiquillo y los parques de cabañas serranas son ideales para recorrer en un vehículo con buena altura como un Jeep Wrangler o SUV equipada.',
      'Para quienes visitan la ciudad de Durango por placer o negocios, el centro histórico colonial —declarado Patrimonio de la Humanidad por la UNESCO como parte del Camino Real de Tierra Adentro— se explora cómodamente combinando traslados ágiles y paseos peatonales por sus templos y museos de cinematografía.',
      'Con el kilometraje libre incluido en todas las rentas de GALSA, tienes la certeza de que ningún cargo por kilómetro extra limitará tu curiosidad en el camino.'
    ]
  }
];
