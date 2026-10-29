import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Read source data directly from TS
import { VEHICLES } from '../src/data/vehicles';
import { STATIC_ROUTES_METADATA, getVehicleMetadata, SITE_URL } from '../src/data/metadata';
import { getHomeSchemaJson, getVehicleSchemaJson, getFaqSchemaJson, getHostSchemaJson } from '../src/data/schema';

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
  { loc: `${SITE_URL}/terminos`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${SITE_URL}/privacidad`, priority: '0.5', changefreq: 'monthly' },
];

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
  if (initialContentHtml) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${initialContentHtml}</div>`
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
      [ENTORNO DE PRUEBAS / QA — Este listón no va en el diseño final] Última actualización: 28 Oct 2026, 19:55 hrs | v1.1.4
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
  { route: '/catalogo', schema: null },
  { route: '/como-funciona', schema: null },
  { route: '/nosotros', schema: null },
  { route: '/anfitriones', schema: getHostSchemaJson() },
  { route: '/confianza', schema: null },
  { route: '/faq', schema: getFaqSchemaJson() },
  { route: '/contacto', schema: getHomeSchemaJson() },
  { route: '/terminos', schema: null },
  { route: '/privacidad', schema: null },
  { route: '/cuenta', schema: null },
  { route: '/404', schema: null },
];

staticPages.forEach(({ route, schema }) => {
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
    initialContentHtml: `
      <main>
        <h1>${meta.title}</h1>
        <p>${meta.description}</p>
        <p>GALSA Rent en Durango · Entrega en Sucursal Plaza 450.</p>
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

console.log('🎉 Prerendering complete! All static HTML pages, schemas, and sitemap generated successfully.');
