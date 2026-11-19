---
name: GALSA Rent Design System
description: Minimalist, clean, flat digital mobility platform (v2.5.7)
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

# GALSA Rent Design System & Guidelines (`v2.5.7`)

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
