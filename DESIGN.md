---
name: GALSA Rent Design System
description: Minimalist, clean, flat digital mobility platform inspired by Virtuo and Airbnb (v2.3.1)
colors:
  cta-50: "#F3F6FC"
  cta-100: "#E5ECF9"
  cta-200: "#C6D7F1"
  cta-300: "#93B6E6"
  cta-400: "#5A90D6"
  cta-500: "#3D63FF"
  cta-600: "#2A4EEB"
  cta-700: "#1F3DD4"
  cta-800: "#172FB0"
  cta-900: "#132488"
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

# GALSA Rent Design System & Guidelines (`v2.3.1`)

## 1. Variables Oficiales (`tailwind.config.js` + `src/index.css :root`)
- **Brand Azul (`cta-50`..`cta-900`):** desde `bg-cta-50` (`#F3F6FC`, usado en el banner de Anfitriones con texto `text-ink-900`) hasta `bg-cta` / `bg-cta-500` (`#3D63FF`, CTA principal) y `bg-cta-600` (`#2A4EEB`, hover).
- **Superficies y textos (`surface`, `subtle`, `edge`, `edge-light`, `ink-900`..`ink-400`):** expuestos como clases Tailwind y variables CSS `--color-*`.
- **Elevación plana (Cero sombras en botones/CTAs):** ningún `<button>` ni `<a>` de llamado a la acción utiliza clases `shadow-*`.
- **Popovers flotantes elevados:** `shadow-search`, `shadow-dropdown`, `shadow-float` y `shadow-2xl` se reservan exclusivamente para menús emergentes (`CustomDropdown`, `DateRangePicker`) dentro de padres `overflow-visible`.

## 2. Colores Extra Monitoreados (`/design-system`)
- **`#D8E8FF`** (`HostSection` subrayado y `HostBanner`), **`#94BDC9/25`** (`BlogPage` caja CTA) y **`#2563EB` / `#BFDBFE`** (`DocumentUploadCard` SVG) quedan documentados en la sección de variables extra del Sistema de Diseño para decisión de unificación. `#8EB5FF` ya fue migrado en `v2.3.1` a `bg-cta-50` + `text-ink-900` + `bg-cta`.

## 3. Arquitectura Atómica y Componentes Consolidados
- **Datos compartidos:** `src/data/dropdownOptions.ts`.
- **Átomos & Moléculas clave:** `GalsaLogo`, `CustomDropdown`, `DateRangePicker`, `DocumentUploadCard`, `StepFeatureCard`.
- **Layouts & Organismos:** `AuthCardLayout`, `SearchContainer`, `VehicleCard`, `VehicleDetailView`, `ReservationCheckoutView`, `HostRegistrationPage`, `SeoPage` y `DesignSystemPage`.
