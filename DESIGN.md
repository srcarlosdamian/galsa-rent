---
name: GALSA Rent Design System
description: Minimalist, clean, flat digital mobility platform (v2.8.78)
colors:
  cta-50: "#E9F2FF"
  cta-100: "#D8E8FF"
  cta-200: "#B8D3FF"
  cta-300: "#8EB5FF"
  cta-400: "#618BFF"
  cta-500: "#3D63FF"
  cta-600: "#1B36FF"
  cta-700: "#1F34F2"
  cta-800: "#1125C2"
  cta-900: "#182A97"
  cta-950: "#0E1658"
  surface: "#FFFFFF"
  subtle: "#FAFAFA"
  edge: "#EBEBEB"
  edge-light: "#F0F0F0"
  ink-900: "#111827"
  ink-800: "#1F2937"
  ink-700: "#374151"
  ink-600: "#4B5563"
  ink-500: "#6B7280"
  ink-400: "#9CA3AF"
typography:
  display:
    fontFamily: '"Google Sans", "Google Sans Display", "Inter", system-ui, sans-serif'
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  heading:
    fontFamily: '"Google Sans", "Google Sans Display", "Inter", system-ui, sans-serif'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: '"Inter", system-ui, sans-serif'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    numericVariant: "tabular-nums"
rounded:
  input: "8px (rounded-[8px])"
  button: "12px (rounded-xl)"
  card: "16px (rounded-2xl)"
  popover: "20px (rounded-[20px])"
  summary-card: "24px (rounded-[24px])"
  banner: "36px (rounded-[36px])"
  pill: "9999px (rounded-full)"
---

# GALSA Rent Design System & Guidelines (`v2.8.78`)

## 1. Variables Oficiales (`tailwind.config.js` + `src/index.css :root`)
- **Contenedor Global Estandarizado (`max-w-[1200px] mx-auto px-4 sm:px-6`):** Todas las páginas y cabeceras respetan el mismo ancho máximo y márgenes laterales del Home (`1200px`).
- **Brand Azul Completo (`cta-50`..`cta-950`):** 11 tonos desde `bg-cta-50` (`#E9F2FF`) hasta `bg-cta` / `bg-cta-500` (`#3D63FF`), `bg-cta-600` (`#1B36FF`) y `bg-cta-950` (`#0E1658`).
- **Superficies y textos (`surface`, `subtle`, `edge`, `edge-light`, `ink-900`..`ink-400`):** expuestos como clases Tailwind y variables CSS `--color-*`.
- **Elevación plana (Cero sombras en botones/CTAs):** ningún `<button>` ni `<a>` de llamado a la acción utiliza clases `shadow-*`.
- **Popovers flotantes elevados:** `shadow-search`, `shadow-dropdown`, `shadow-float` y `shadow-2xl` se reservan exclusivamente para menús emergentes (`CustomDropdown`, `DateRangePicker`) dentro de padres `overflow-visible`.

## 2. Unificación de Colores Extra (`v2.3.2`)
- Todos los colores extra (`#D8E8FF`, `#94BDC9/25`, `#2563EB`, `#BFDBFE`, `#8EB5FF`, `blue-50..900` y grises paralelos `neutral-*`) fueron reemplazados por la gama oficial `cta-50..950` y los grises de superficie `surface`, `subtle`, `edge`, `edge-light` e `ink-900..400`.

## 3. Arquitectura Atómica y Componentes Consolidados
- **Datos compartidos:** `src/data/dropdownOptions.ts`.
- **Átomos & Moléculas clave:** `GalsaLogo`, `CustomDropdown`, `DateRangePicker`, `DocumentUploadCard` (compacto y minimalista con icono Lucide neutral), `StepFeatureCard`.
- **Layouts & Organismos:** `AuthCardLayout`, `SearchContainer`, `VehicleCard`, `VehicleDetailView`, `ReservationCheckoutView`, `HostRegistrationPage`, `AccountPage`, `SeoPage` y `DesignSystemPage`.

## 4. Chevrones (Indicadores de Dirección y Despliegue)
1. **Chevron Circular para Barras Flotantes Móviles (`ChevronUp` / `ChevronDown`, `w-8 h-8 rounded-full bg-slate-100`):** barra inferior fija (`lg:hidden fixed bottom-0 inset-x-0 z-40`) con chevron a la **izquierda** del total y panel desplegable (`rounded-t-[24px] max-h-[82vh]`) usada en el cotizador móvil (`VehicleDetailView.tsx`) y en el resumen móvil de compra (`ReservationCheckoutView.tsx`).
2. **Chevron Circular de Acordeón (`ChevronDown` con `rotate-180`):** en los 5 pasos plegables del Checkout (`ReservationCheckoutView.tsx`).
3. **Chevron de Select / Dropdown / Menú (`ChevronDown`):** en `CustomDropdown.tsx`, filtros y ordenamiento de `CatalogPage.tsx`, selectores de `SearchContainer.tsx` y submenú de `Header.tsx`.
4. **Chevron de Enlace y Breadcrumb (`ChevronRight`):** en el enlace "Ver catálogo" (`VehicleDetailView.tsx`), migas de pan (`AboutPage.tsx`, `HowItWorksPage.tsx`) y enlaces de navegación (`App.tsx`).

## 5. Catálogo de Inputs y Controles (`DesignSystemPage.tsx`)
1. **Input Estándar (`text` / `email` / `tel`):** `rounded-xl border border-slate-200 focus:border-cta focus:ring-1 focus:ring-cta` (`ReservationCheckoutView.tsx`, `HostRegistrationPage.tsx`, `AccountPage.tsx`).
2. **Textarea (`Información adicional` / Notas):** `rounded-xl px-4 py-3 border border-slate-200 resize-y` (`ReservationCheckoutView.tsx`, `AccountPage.tsx`).
3. **Input Búsqueda (`Search`):** con icono izquierdo `pl-9` (`CatalogPage.tsx`, `DesignSystemPage.tsx`).
4. **Input Auth (`password`):** en `LoginPage.tsx`, `RegisterPage.tsx`, `ForgotPasswordPage.tsx`, `ResetPasswordPage.tsx`.
5. **Input Numérico / Tarifa (`number`):** con prefijo `$` y sufijo `MXN` (`HostSection.tsx`, `HostRegistrationPage.tsx`).
6. **Input Solo Lectura (`readOnly`):** fondo `bg-slate-50` (`ReservationCheckoutView.tsx`).
7. **Selector de Fecha (`SingleDatePicker` trigger):** botón con borde e icono `Calendar` (`VehicleDetailView.tsx`).
8. **Range Slider y Checkbox:** en `CatalogPage.tsx`, `HostSection.tsx` y `ReservationCheckoutView.tsx`.

## 6. Catálogo de Chips y Badges (`DesignSystemPage.tsx`)
- **Regla Unificada de Chips de Color:** todos los chips de color son **sin línea (sin `border`)**, comparten exactamente el mismo tamaño de texto y peso (`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-semibold`) y admiten icono opcional (`w-3.5 h-3.5`).
1. **Chip Gris Neutral (`bg-slate-100 text-slate-700`):** pasos, categorías y estado neutro (`ReservationCheckoutView.tsx`, `SeoPage.tsx`).
2. **Chip de Especificación (`border border-slate-200 bg-white text-slate-700 rounded-lg px-2 py-0.5 text-[11px]`):** plazas, transmisión y combustible en `VehicleCard.tsx`.
3. **Chip Azul (`bg-cta-50 text-cta`):** marca/verificado, folios, códigos de reserva y frase clave (`ReservationCheckoutView.tsx`, `HostRegistrationPage.tsx`, `AccountPage.tsx`, `SeoPage.tsx`).
4. **Chip Verde Positivo (`bg-emerald-50 text-emerald-700`):** indexación SEO (`index, follow`), pagos y firma digital (`SeoPage.tsx`, `ReservationCheckoutView.tsx`, `AccountPage.tsx`).
5. **Chip Amarillo Pendiente (`bg-amber-50 text-amber-800`):** pendiente de confirmación, revisión o `noindex` (`ReservationCheckoutView.tsx`, `HostRegistrationPage.tsx`, `SeoPage.tsx`, `AccountPage.tsx`).
6. **Chip Rojo Alerta (`bg-red-50 text-red-700`):** estados cancelados o errores (`AccountPage.tsx`).
7. **Chip de Versión QA (`bg-neutral-800 text-emerald-400 font-mono`):** versión en `Footer.tsx` y `DesignSystemPage.tsx`. (Las rutas como `/anfitriones/registro` se muestran como texto monoespaciado sin chip).

## 7. Catálogo Oficial de Botones y Chips (Cero Botones/Chips Negros)
- **Regla Global:** los botones y chips negros (`bg-black` / `bg-slate-900`) quedan prohibidos en acciones interactivas y filtros activos; se reemplazan por **Azul CTA (`bg-cta`)**.
- **4 Variantes Oficiales con Estados (`Reposo`, `Hover`, `Presionado`, `Bloqueado`):**
  1. **CTA Azul (`bg-cta text-white`):** `hover:bg-cta-600`, `active:bg-cta-700 active:scale-[0.98]`, `disabled:bg-slate-200 disabled:text-slate-400`.
  2. **Soft Azul (`bg-cta-50 text-cta`):** `hover:bg-cta-100`, `active:bg-cta-200 active:scale-[0.98]`, `disabled:bg-slate-100 disabled:text-slate-400`.
  3. **Lineal Gris (`border border-slate-200 bg-transparent text-slate-900`):** `hover:border-slate-300 hover:bg-slate-50`, `active:bg-slate-100 active:scale-[0.98]`, `disabled:border-slate-200 disabled:text-slate-300`.
  4. **Bloqueado (`disabled`):** `cursor-not-allowed` con contraste neutro atenuado.

## 8. Bloques de Ilustración 3D Sin Borde (`HostSection.tsx`)
- En **Beneficios de ser anfitrión GALSA**, los iconos/ilustraciones 3D usan un contenedor cuadrado limpio (`aspect-square rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-none`) **sin línea de borde** (`border-0`), acompañados de título (`text-base font-heading font-bold`) y descripción (`text-xs sm:text-sm text-slate-500`).
- **Modales, Drawers & Sheets del Sistema (6 Variantes):** Confirmación (`AccountPage.tsx`, `max-w-[420px]`), Formulario (`AccountPage.tsx`, `max-w-[500px]`), Contrato Digital (`ReservationCheckoutView.tsx`, `max-w-2xl`), Galería/Compartir (`VehicleDetailView.tsx`), Drawer Lateral (`Header.tsx`, `max-w-md`) y Bottom Sheet Mobile (`CatalogPage.tsx`). Todos usan backdrop `bg-black/50 backdrop-blur-xs`, `rounded-[24px]` y botón circular de cierre `w-8 h-8 rounded-full bg-subtle`.
- **Vista de Cuenta (`/cuenta`):** Contenedor `max-w-[1200px]`, banner *Completa tu perfil* en `bg-cta-50/60 border-0` (sin borde) con ilustración 3D (`/galsa-rent/images/cuenta/completa-perfil-lapiz.png`) y botón lineal `Completar ahora`; menú lateral *Configuración de la cuenta* con iconos y badges en escala neutral (`text-ink-600` / `text-ink-900`, sin azul en hover ni activo/presionado); acciones `Editar` sin subrayado; `DocumentUploadCard` usa gris neutral oscuro (`bg-slate-600` / `text-slate-700`, sin azul) y oculta la barra de progreso al llegar al `100%` (`status === 'completed'`).
- **FAQs & Acordeones del Sistema (4 Variantes):**
  1. **FAQ Principal** (`FaqSection.tsx`, Home y `/faq`): `rounded-2xl border border-edge bg-white`, botón circular `w-8 h-8` con `Plus`/`Minus`.
  2. **FAQ Compacto** (`Header.tsx`, Drawer de Ayuda): `rounded-xl border border-slate-200`, `ChevronDown` con `rotate-180`.
  3. **Acordeón de Pasos** (`ReservationCheckoutView.tsx`, Pasos 1–5): badge numérico `w-7 h-7 rounded-full bg-blue-50 text-blue-600`, botón circular `w-8 h-8 bg-slate-100` con `ChevronDown`.
  4. **Sheet Resumen Mobile** (`VehicleDetailView.tsx` / `ReservationCheckoutView.tsx`): barra inferior fija `lg:hidden` desplegable con `ChevronUp`/`ChevronDown`.
- **Iconografía del Sistema (`src/data/designSystemIcons.ts`):** Catálogo completo documentado en `DesignSystemPage.tsx` con los **81 iconos `lucide-react`** nombrados por categoría (Navegación, Acciones, Vehículo, Documentos y Pagos, Seguridad y Confianza, Ubicación y Tiempo, UI y Sistema) y las **17 ilustraciones 3D** (`benefit-1..6`, `step-1..6`, `completa-perfil-lapiz`, `icon-step-1..4`).
