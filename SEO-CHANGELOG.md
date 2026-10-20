# SEO CHANGELOG & MANUAL DE ACTUALIZACIÓN — GALSA RENT

> **Sitio:** [https://galsarent.com.mx](https://galsarent.com.mx)  
> **Repositorio:** [srcarlosdamian/galsa-rent](https://github.com/srcarlosdamian/galsa-rent)  
> **Fecha:** Octubre 2026  
> **Ubicación:** Durango, Dgo., México  
> **Idioma oficial:** Español de México (`es-MX`)

---

## 1. Resumen de Cambios por Tarea

### Tarea 1 — Metadatos por Página
* **Qué cambió:**
  * Se implementó el módulo [`src/data/metadata.ts`](file:///Users/damian/Documents/antigravity/hopeful-kepler/src/data/metadata.ts) con títulos (`title`) estrictamente $\le 60$ caracteres y descripciones (`description`) $\le 155$ caracteres.
  * Se eliminó la etiqueta obsoleta `keywords`.
  * Se asignó un enlace canónico absoluto (`https://galsarent.com.mx/...`) por cada página.
  * Se añadieron etiquetas Open Graph (`og:title`, `og:description`, `og:url`, `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`) y Twitter Cards `summary_large_image`.
  * En rutas privadas (`/cuenta`, `/admin/*`, `/reservar/*`) se configuró `<meta name="robots" content="noindex,nofollow" />`.
* **Por qué:** Evita penalizaciones por títulos truncados en SERPs de Google, asegura la indexación canónica única y previene la indexación de páginas privadas o incompletas.

### Tarea 2 — Copy y Arquitectura del Home
* **Qué cambió:**
  * **H1 único:** `"Renta de autos en Durango, 100% en línea"`.
  * **Subtítulo:** `"Elige tu auto, sube tus documentos y firma el contrato desde tu celular. Unidades revisadas una por una, con entrega en Sucursal Plaza 450. Desde $1,100 al día + tarifa de servicio."`.
  * **Chips de confianza:** *Kilometraje libre · Contrato digital · Depósito reembolsable · Sin cargos hasta confirmar*.
  * **CTAs principales:** `"Ver autos disponibles"` (primario) y `"Gana dinero con tu auto"` (secundario).
  * **Estructura estricta de encabezados H2 en orden:**
    1. `Autos disponibles hoy en Durango`
    2. `Rentar con GALSA es así de simple`
    3. `Cómo rentar un auto en 4 pasos`
    4. `Un auto para cada necesidad`
    5. `Cada renta, respaldada de principio a fin`
    6. `Gana dinero con tu auto en Durango`
    7. `Preguntas frecuentes sobre renta de autos en Durango`
  * **Bloque de clientes (4 tarjetas):**
    1. *Elige por día, semana o mes*
    2. *Autos revisados uno por uno* (inspección física, documental y fotográfica)
    3. *Contrato digital con validez legal*
    4. *Ayuda cuando la necesitas*
  * **Líneas de movilidad:** Turismo, Negocios, Aventura, Movilidad general y Conductores de apps de movilidad con filtros directos al catálogo.
  * **Cálculo dinámico de flota:** El número de unidades mostradas se calcula en tiempo real desde el catálogo (`VEHICLES.length`), evitando valores estáticos.
  * **Ejemplo visible de total:** Desglose claro de tarifa base + 33% de tarifa de servicio (IVA incluido) + depósito reembolsable.
  * **FAQ con respuestas oficiales:** Respuestas específicas sobre operación en Durango (Sucursal Plaza 450), requisitos, desglose del 33% de tarifa de servicio, cancelación 48h y 100% de ingreso para el anfitrión.
  * **Footer depurado:** Se eliminó "Panel administrativo" y se añadió enlace a `/contacto`.
* **Por qué:** Resuelve directamente los problemas de la auditoría Seobility donde las palabras clave del título y H1 no coincidían con el cuerpo, corrige los encabezados duplicados y proyecta la propuesta de valor digital inspirada en Virtuo.

### Tarea 3 — Página de Anfitriones (`/anfitriones`)
* **Qué cambió:**
  * **H1:** `"Gana dinero rentando tu auto en Durango"`.
  * **Subtítulo:** `"Tú fijas precio y disponibilidad, y apruebas cada reserva. GALSA se encarga de verificar clientes, firmar contratos y cobrar. Recibes el 100% de tu tarifa."`.
  * **Simulador de ingresos:** Refleja con precisión que el anfitrión recibe el **100% de la tarifa por día que fija**, y que la tarifa de servicio del 33% la cubre el cliente.
  * Se eliminó cualquier mención de que GALSA "cobra comisión" al propietario.
* **Por qué:** Claridad total para los dueños de vehículos particulares en Durango y coherencia con el modelo de negocio del marketplace.

### Tarea 4 — Fichas de Vehículo y Catálogo
* **Qué cambió:**
  * **Slugs semánticos legibles:** Formato `/vehiculos/{marca}-{modelo}-{version}-{año}-durango`.
  * **Redirecciones desde UUIDs legacy:** Las URLs antiguas con UUID ahora redirigen automáticamente al slug canónico.
  * **Atributos ALT únicos y descriptivos:** Ninguna imagen usa textos genéricos como "Foto 1", sino descripciones precisas como `"Nissan Sentra Sense 2024 en renta en Durango frente angular"`.
  * **Bloque de reseñas:** Se eliminó el texto engañoso "Aún no hay reseñas" y se reemplazó por el distintivo oficial: `"Revisado y verificado antes de cada renta"`.
  * **Breadcrumbs visibles:** Enlaces de navegación estructurada `Inicio > Catálogo > {Vehículo}`.
  * **Vehículos relacionados:** Enlaces internos al final de cada ficha para mejorar el enlazado interno y el tiempo de permanencia.
  * **Dimensiones explícitas:** Atributos `width` y `height` definidos en todas las imágenes con `loading="lazy"`.
* **Por qué:** Maximiza la indexación en Google Imágenes, refuerza la relevancia semántica local en Durango y mejora los Core Web Vitals (CLS = 0).

### Tarea 5 — Datos Estructurados Schema.org (JSON-LD)
* **Qué cambió:**
  * Se implementó [`src/data/schema.ts`](file:///Users/damian/Documents/antigravity/hopeful-kepler/src/data/schema.ts) generando JSON-LD validado:
    * **Home:** `AutoRental` (LocalBusiness) + `WebSite`.
    * **Fichas:** `Car` / `Product` con esquema `Offer` (precio en MXN, disponibilidad InStock).
    * **Páginas de información:** `FAQPage` en `/faq` y `/anfitriones`.
    * **Navegación:** `BreadcrumbList` en catálogo y fichas.
  * Se omitieron esquemas de `AggregateRating` y `Review` falsos hasta contar con reseñas reales.
* **Por qué:** Permite a Google generar fragmentos enriquecidos (rich snippets), identificar a GALSA Rent como negocio local verificado en Durango y presentar preguntas frecuentes expandibles en resultados de búsqueda.

### Tarea 6 — SEO Técnico y SSG (Prerenderizado)
* **Qué cambió:**
  * **Prerenderizado estático (SSG):** Se desarrolló [`scripts/prerender.ts`](file:///Users/damian/Documents/antigravity/hopeful-kepler/scripts/prerender.ts) que compila y genera archivos `index.html` estáticos para cada ruta (`/`, `/catalogo`, `/anfitriones`, `/confianza`, `/faq`, `/contacto`, `/terminos`, `/privacidad`, `/404` y todas las fichas de vehículos). El HTML inicial contiene el 100% del texto y metadatos sin depender de JavaScript.
  * **Robots.txt:** Archivo generado permitiendo todo el rastreo excepto `/admin/`, `/cuenta` y `/reservar/`, enlazando a `https://galsarent.com.mx/sitemap.xml`.
  * **Sitemap.xml dinámico:** Mapa de sitio con 13 URLs canónicas y fechas de última modificación.
  * **Página 404:** Página de error útil con enlaces de retorno al catálogo.
  * **Optimización de rendimiento:** Precarga (`preload`) de la imagen LCP del hero con `fetchpriority="high"` y tipografía con `font-display: swap`.
* **Por qué:** Garantiza que los bots de Google, Bing y redes sociales lean el contenido completo al primer byte (Time to First Byte / FCP) sin esperar la ejecución de JavaScript en cliente.

### Tarea 7 — SEO Local y Datos NAP
* **Qué cambió:**
  * Creación de la página [`/contacto`](file:///Users/damian/Documents/antigravity/hopeful-kepler/src/pages/ContactPage.tsx) con dirección física completa, mapa interactivo embebido, horarios y botones directos.
  * Consistencia total del bloque NAP (Name, Address, Phone) en Footer, Página de Contacto y JSON-LD.
* **Por qué:** Fortalece la presencia en búsquedas locales "renta de autos Durango" y vincula la entidad geográfica de Plaza 450 con Google Maps.

---

## 2. Lista de TODOs (Datos requeridos del Cliente)

Para completar al 100% la ficha local y canales de contacto, por favor proporciona los siguientes datos:

| Campo | Placeholder actual en código | Ubicación en archivos | Acción requerida |
| :--- | :--- | :--- | :--- |
| **Teléfono Oficial** | `+52 618 000 0000` | `Footer.tsx`, `ContactPage.tsx`, `schema.ts`, `metadata.ts` | Confirmar número telefónico con lada de Durango. |
| **WhatsApp Oficial** | `526180000000` | `Header.tsx`, `Footer.tsx`, `ContactPage.tsx`, `FaqSection.tsx`, `VehicleDetailView.tsx` | Proporcionar número celular de atención para reservas. |
| **Correo de Atención** | `contacto@galsarent.com.mx` | `Footer.tsx`, `ContactPage.tsx`, `PrivacyPage.tsx` | Confirmar dirección de correo electrónico corporativo. |
| **Horario de Sucursal** | `Lunes a Domingo: 08:00 - 20:00 hrs` | `Footer.tsx`, `ContactPage.tsx`, `schema.ts` | Confirmar días y horas exactas de apertura/cierre de la sucursal. |
| **Código Postal** | `34138` | `Footer.tsx`, `ContactPage.tsx`, `schema.ts` | Validar código postal de Plaza 450 en Blvd. Guadiana. |
| **Google Business Profile** | `https://maps.google.com/?q=Plaza+450+Durango` | `ContactPage.tsx` | Proporcionar la URL del perfil de Google Maps verificado. |
| **Redes Sociales** | Enlaces comentados `// 'https://instagram.com/...'` | `schema.ts` | Compartir perfiles oficiales de Facebook, Instagram o LinkedIn para agregar al `sameAs` de Schema.org. |

---

## 3. Comandos de Mantenimiento

Para compilar y prerenderizar todas las páginas estáticas:
```bash
npm run build
```

Para desplegar automáticamente a GitHub Pages:
```bash
npm run deploy
```
