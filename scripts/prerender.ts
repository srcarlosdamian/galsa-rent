import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Read source data directly from TS
import { VEHICLES } from '../src/data/vehicles';
import { BLOG_POSTS } from '../src/data/blog';
import { STATIC_ROUTES_METADATA, getVehicleMetadata, SITE_URL } from '../src/data/metadata';
import { getHomeSchemaJson, getVehicleSchemaJson, getFaqSchemaJson, getHostSchemaJson, getCatalogSchemaJson } from '../src/data/schema';

console.log('⚡ Starting Prerendering / SSG for GALSA Rent...');

const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Build sitemap entries
const sitemapUrls = [
  { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
  { loc: `${SITE_URL}/catalogo`, priority: '0.9', changefreq: 'daily' },
  { loc: `${SITE_URL}/como-funciona`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${SITE_URL}/nosotros`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${SITE_URL}/anfitriones`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${SITE_URL}/confianza`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${SITE_URL}/faq`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${SITE_URL}/contacto`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${SITE_URL}/login`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${SITE_URL}/registro`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${SITE_URL}/terminos`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${SITE_URL}/privacidad`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${SITE_URL}/blog`, priority: '0.8', changefreq: 'weekly' },
];

BLOG_POSTS.forEach((post) => {
  sitemapUrls.push({
    loc: `${SITE_URL}/blog/${post.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  });
});

VEHICLES.forEach((v) => {
  sitemapUrls.push({
    loc: `${SITE_URL}/vehiculos/${v.slug}`,
    priority: '0.9',
    changefreq: 'weekly',
  });
});

// Generate sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);
fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml);
console.log('✅ Generated sitemap.xml with', sitemapUrls.length, 'URLs');

// Function to generate prerendered HTML with SEO tags and initial markup
function renderPage({ routePath, metadata, schemaJson, initialContentHtml }: any) {
  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${metadata.title}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${metadata.description}" />`
  );

  // Remove keywords if present
  html = html.replace(/<meta name="keywords" content=".*?" \/>\n?/i, '');

  // Replace Canonical Link
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${metadata.canonical}" />`
  );

  // Replace Alternate / Hreflang links
  html = html.replace(
    /<link rel="alternate" hreflang="es-MX" href=".*?" \/>/i,
    `<link rel="alternate" hreflang="es-MX" href="${metadata.canonical}" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href=".*?" \/>/i,
    `<link rel="alternate" hreflang="x-default" href="${metadata.canonical}" />`
  );

  // Replace OpenGraph Title & Description
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${metadata.ogTitle}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${metadata.ogDescription}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${metadata.canonical}" />`
  );
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/i,
    `<meta property="og:image" content="${metadata.ogImage.url}" />
    <meta property="og:image:width" content="${metadata.ogImage.width || 1200}" />
    <meta property="og:image:height" content="${metadata.ogImage.height || 630}" />
    <meta property="og:image:alt" content="${metadata.ogImage.alt || metadata.title}" />`
  );

  // Twitter cards
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${metadata.ogTitle}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${metadata.ogDescription}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?" \/>/i,
    `<meta name="twitter:image" content="${metadata.ogImage.url}" />`
  );

  // Robots meta
  if (metadata.noIndex) {
    html = html.replace(
      /<meta name="robots" content=".*?" \/>/i,
      `<meta name="robots" content="noindex,nofollow" />`
    );
  }

  // Schema JSON-LD injection
  if (schemaJson) {
    const jsonLdString = JSON.stringify(schemaJson, null, 2);
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n${jsonLdString}\n    </script>`
    );
  }

  // Inject initial HTML into root so crawlers without JS have complete content!
  // Uses .prerender-fallback so it is visually hidden from human users before React hydration
  if (initialContentHtml) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"><div class="prerender-fallback" aria-hidden="true">${initialContentHtml}</div></div>`
    );
  }

  return html;
}

// Write file helper
function writeRouteFile(route: string, content: string) {
  const cleanRoute = route.replace(/^\//, '');
  let targetFile;
  if (!cleanRoute || cleanRoute === '') {
    targetFile = path.join(distDir, 'index.html');
  } else {
    const targetDir = path.join(distDir, cleanRoute);
    fs.mkdirSync(targetDir, { recursive: true });
    targetFile = path.join(targetDir, 'index.html');
  }
  fs.writeFileSync(targetFile, content);
  console.log(`  📄 Prerendered: ${route} -> ${path.relative(distDir, targetFile)}`);
}

// 1. Render Home
const homeInitialHtml = `
<main>
  <header>
    <h1>Renta de autos en México, 100% en línea</h1>
    <p>Renta tu auto en línea, elige tu modelo y firma tu contrato digital. Unidades inspeccionadas y listas para entrega en nuestras sucursales. Desde $1,100 MXN al día, sin cargos ocultos.</p>
  </header>
  <section>
    <h2>Autos disponibles hoy en México</h2>
    <p>Contrato firmado digitalmente y depósito en garantía 100% reembolsable</p>
    <ul>
      ${VEHICLES.map(v => `<li><a href="/vehiculos/${v.slug}"><strong>${v.make} ${v.model} ${v.year}</strong> - $${v.pricePerDay} MXN/día (Depósito $${v.deposit} MXN)</a></li>`).join('\n      ')}
    </ul>
  </section>
  <footer>
    <div style="background:#000;color:#fff;padding:8px;font-size:11px;font-family:monospace;text-align:center;">
      [ENTORNO DE PRUEBAS / QA — Este listón no va en el diseño final] Última actualización: 28 Oct 2026, 20:45 hrs | v1.2.8
    </div>
  </footer>
</main>
`;

const homeHtml = renderPage({
  routePath: '/',
  metadata: STATIC_ROUTES_METADATA['/'],
  schemaJson: getHomeSchemaJson(),
  initialContentHtml: homeInitialHtml,
});
writeRouteFile('/', homeHtml);

// 2. Render Static Pages
const staticPages = [
  { route: '/catalogo', schema: getCatalogSchemaJson(VEHICLES), initialHtml: getCatalogInitialHtml() },
  { route: '/como-funciona', schema: null },
  { route: '/nosotros', schema: null },
  { route: '/anfitriones', schema: getHostSchemaJson() },
  { route: '/confianza', schema: null },
  { route: '/faq', schema: getFaqSchemaJson() },
  { route: '/contacto', schema: getHomeSchemaJson() },
  { route: '/login', schema: null },
  { route: '/registro', schema: null },
  { route: '/recuperar-password', schema: null },
  { route: '/recuperar-password/enviado', schema: null },
  { route: '/restablecer-password', schema: null },
  { route: '/seo', schema: null },
  { route: '/design-system', schema: null },
  { route: '/terminos', schema: null },
  { route: '/privacidad', schema: null },
  { route: '/cuenta', schema: null },
  { route: '/cuenta/completar', schema: null },
  { route: '/completar-perfil', schema: null },
  { route: '/blog', schema: null },
  { route: '/404', schema: null },
];

function getCatalogInitialHtml() {
  return `
  <main>
    <nav aria-label="Miga de pan" style="margin-bottom:1rem;font-size:14px;">
      <a href="/">Inicio</a> &gt; <span>Catálogo de autos en renta</span>
    </nav>
    <header style="margin-bottom:2rem;">
      <h1>Catálogo de autos en renta | GALSA Rent</h1>
      <p>Explora autos verificados: sedanes económicos, SUVs familiares y camionetas 4x4 todo terreno de flota propia y anfitriones. Reserva 100% en línea con contrato digital, kilometraje libre y seguro incluido.</p>
    </header>

    <section aria-label="Listado de autos disponibles">
      <h2>Autos disponibles (${VEHICLES.length} unidades verificadas)</h2>
      <ul style="list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;">
        ${VEHICLES.map((v) => `
          <li style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
            <a href="/vehiculos/${v.slug}" style="text-decoration:none;color:inherit;">
              <img src="${v.images[0]?.url || 'https://uurhxdxqtlistawucaqs.supabase.co/storage/v1/object/public/services/nocode-1793239505248-1-car.webp'}" alt="${v.make} ${v.model} ${v.year}" width="300" height="200" loading="lazy" style="border-radius:8px;width:100%;object-fit:cover;" />
              <h3 style="font-size:18px;margin:8px 0 4px 0;">${v.make} ${v.model} ${v.year}</h3>
              <p style="font-size:13px;color:#64748b;margin:0 0 8px 0;">${v.category} · ${v.transmission} · ${v.seats} plazas · ${v.fuel}</p>
              <p style="font-size:16px;font-weight:bold;color:#0f172a;margin:0;">$${v.pricePerDay.toLocaleString('es-MX')} MXN <span style="font-size:12px;font-weight:normal;color:#64748b;">/ día</span></p>
              <p style="font-size:12px;color:#64748b;margin:4px 0 0 0;">Depósito reembolsable: $${v.deposit.toLocaleString('es-MX')} MXN</p>
            </a>
          </li>
        `).join('\n        ')}
      </ul>
    </section>

    <section style="margin-top:3rem;padding-top:2rem;border-top:1px solid #e2e8f0;">
      <h2>Guía de renta de autos: consejos, requisitos y categorías</h2>
      <p>Rentar un auto con GALSA Rent es rápido, transparente y 100% digital. Ya sea que viajes por negocios, disfrutes de vacaciones familiares o asistas a un evento especial, en nuestro catálogo encontrarás el vehículo adecuado a tu presupuesto y necesidades con contrato digital y seguro amplio.</p>
      
      <h3>Variedad de modelos en nuestro catálogo de autos</h3>
      <p>Contamos con una amplia gama de vehículos para satisfacer todas las preferencias de manejo:</p>
      <ul>
        <li><strong>Sedanes económicos y compactos:</strong> Ideales para traslados urbanos diarios con bajo consumo de gasolina. Opciones como Nissan Sentra, Nissan Versa y Volkswagen Virtus cuentan con aire acondicionado, cajuela espaciosa y conectividad Bluetooth.</li>
        <li><strong>Camionetas SUV familiares:</strong> Diseñadas para grupos y viajes de fin de semana con amplio confort, como Toyota RAV4 y Audi Q5, equipadas con sistemas avanzados de seguridad y asistencia de manejo.</li>
        <li><strong>Camionetas 4x4 todoterreno:</strong> Modelos emblemáticos como el Jeep Wrangler Rubicon y Jeep Wrangler Sahara, listos para caminos empedrados, escapadas y aventuras off-road.</li>
      </ul>

      <h3>Requisitos claros para rentar un auto</h3>
      <p>Nuestro proceso de contratación es digital y libre de fricciones. Solo necesitas:</p>
      <ol>
        <li>Edad mínima de 21 años cumplidos.</li>
        <li>Identificación oficial vigente (INE para nacionales o pasaporte vigente para turistas internacionales).</li>
        <li>Licencia de conducir vigente (nacional o extranjera).</li>
        <li>Tarjeta bancaria para la retención del depósito en garantía (reembolsado íntegramente tras devolver la unidad).</li>
      </ol>

      <h3>Entrega oficial y asistencia 24/7</h3>
      <p>Todas nuestras unidades se entregan con inspección mecánica previa, limpieza profesional y tanque de combustible verificado. Recoge tu vehículo en nuestros puntos de entrega y viaja con respaldo de asistencia vial continua 24/7 en todas las carreteras de México.</p>

      <h3>Navegación y enlaces útiles</h3>
      <nav aria-label="Enlaces rápidos">
        <ul>
          <li><a href="/">Inicio y reservaciones en línea</a></li>
          <li><a href="/como-funciona">Cómo funciona el proceso de reserva digital</a></li>
          <li><a href="/anfitriones">Gana dinero rentando tu propio auto con GALSA</a></li>
          <li><a href="/confianza">Garantía, cobertura y protección a usuarios</a></li>
          <li><a href="/faq">Preguntas frecuentes sobre depósitos y pólizas</a></li>
          <li><a href="/contacto">Sucursales, ubicación y contacto</a></li>
          <li><a href="/blog">Blog con rutas en carretera y consejos de viaje</a></li>
        </ul>
      </nav>
    </section>
  </main>
  `;
}

staticPages.forEach(({ route, schema, initialHtml }: any) => {
  const meta = STATIC_ROUTES_METADATA[route] || {
    title: 'GALSA Rent Durango',
    description: 'Renta de autos 100% en línea en Durango.',
    canonical: `${SITE_URL}${route}`,
    ogTitle: 'GALSA Rent Durango',
    ogDescription: 'Renta de autos 100% en línea en Durango.',
    ogImage: STATIC_ROUTES_METADATA['/'].ogImage,
  };

  const html = renderPage({
    routePath: route,
    metadata: meta,
    schemaJson: schema,
    initialContentHtml: initialHtml || `
      <main>
        <h1>${meta.title}</h1>
        <p>${meta.description}</p>
        <p>GALSA Rent en Durango · Renta de autos con entrega rápida sin filas.</p>
      </main>
    `,
  });
  writeRouteFile(route, html);
});

// 3. Render Each Vehicle Page with Car/Product Schema & BreadcrumbList
VEHICLES.forEach((v) => {
  const meta = getVehicleMetadata(v);
  const schema = getVehicleSchemaJson(v);
  const vehicleHtml = renderPage({
    routePath: `/vehiculos/${v.slug}`,
    metadata: meta,
    schemaJson: schema,
    initialContentHtml: `
      <article>
        <nav aria-label="Breadcrumb">
          <a href="/">Inicio</a> &gt; <a href="/catalogo">Catálogo</a> &gt; <span>${v.make} ${v.model} ${v.year}</span>
        </nav>
        <h1>Renta ${v.make} ${v.model} ${v.version} ${v.year} en Durango | GALSA</h1>
        <p><strong>Revisado y verificado antes de cada renta</strong></p>
        <p>${v.description}</p>
        <p>Precio por día: $${v.pricePerDay} MXN + 33% de tarifa de servicio. Depósito reembolsable: $${v.deposit} MXN.</p>
        <p>Entrega y recepción en ${v.location}.</p>
        <h2>Especificaciones técnicas</h2>
        <ul>
          <li>Capacidad: ${v.seats} pasajeros</li>
          <li>Transmisión: ${v.transmission}</li>
          <li>Combustible: ${v.fuel}</li>
          <li>Motor: ${v.specs.engine}</li>
          <li>Tracción: ${v.specs.drivetrain}</li>
        </ul>
      </article>
    `,
  });

  writeRouteFile(`/vehiculos/${v.slug}`, vehicleHtml);

  // Also create 301 / Meta-Refresh redirect for legacy UUID route
  const redirectHtml = `<!DOCTYPE html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <title>Redireccionando... | GALSA Rent</title>
  <link rel="canonical" href="${SITE_URL}/vehiculos/${v.slug}">
  <meta http-equiv="refresh" content="0; url=${SITE_URL}/vehiculos/${v.slug}">
  <script>window.location.replace("${SITE_URL}/vehiculos/${v.slug}");</script>
</head>
<body>
  <p>Redireccionando a la ficha oficial: <a href="${SITE_URL}/vehiculos/${v.slug}">${v.make} ${v.model} ${v.year}</a></p>
</body>
</html>`;
  writeRouteFile(`/vehiculos/${v.uuid}`, redirectHtml);
});

// 4. Render Blog Articles
BLOG_POSTS.forEach((post) => {
  const meta = {
    title: `${post.title} | Blog GALSA Rent`,
    description: post.excerpt,
    canonical: `${SITE_URL}/blog/${post.slug}`,
    ogTitle: `${post.title} | Blog GALSA Rent`,
    ogDescription: post.excerpt,
    ogImage: {
      url: post.image,
      alt: post.title,
      width: 1200,
      height: 630,
    },
  };

  const articleHtml = renderPage({
    routePath: `/blog/${post.slug}`,
    metadata: meta,
    schemaJson: null,
    initialContentHtml: `
      <article>
        <h1>${post.title}</h1>
        <p>${post.excerpt}</p>
        <p>Publicado el ${post.date} por ${post.author}</p>
      </article>
    `,
  });

  writeRouteFile(`/blog/${post.slug}`, articleHtml);
});

// Ensure 404.html is present at root of dist for GitHub Pages routing fallback
if (fs.existsSync(path.join(distDir, '404', 'index.html'))) {
  const notFoundHtml = fs.readFileSync(path.join(distDir, '404', 'index.html'), 'utf8');
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);
  console.log('  📄 GitHub Pages fallback: created 404.html');
}

console.log('🎉 Prerendering complete! All static HTML pages, schemas, and sitemap generated successfully.');
