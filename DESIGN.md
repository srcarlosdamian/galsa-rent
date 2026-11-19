---
name: GALSA Rent Design System
description: Minimalist, clean, flat digital mobility platform inspired by Virtuo and Airbnb (v2.2.99)
colors:
  primary: "#3D63FF"
  primary-hover: "#1D4ED8"
  highlight-blue: "#D8E8FF"
  host-sky: "#8EB5FF"
  neutral-bg: "#FFFFFF"
  neutral-surface: "#F8FAFC"
  neutral-border: "#E2E8F0"
  neutral-dark: "#0F172A"
  text-primary: "#0F172A"
  text-secondary: "#475569"
  text-muted: "#64748B"
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
  button: "12px (rounded-xl)"
  card: "16px (rounded-2xl)"
  summary-card: "24px (rounded-[24px])"
  popover: "20px (rounded-[20px])"
  pill: "9999px (rounded-full)"
---

# GALSA Rent Design System & Guidelines (`v2.2.99`)

## 1. Principios de Diseño
- **Elevación plana (Cero sombras en botones/CTAs):** ningún `<button>` ni `<a>` de llamado a la acción utiliza clases `shadow-*`. La retroalimentación visual se logra con cambio de tono, borde o escala táctil (`active:scale-[0.98]`).
- **Contenedores lineales:** formularios, pasos de checkout (`ReservationCheckoutView`), registro de anfitriones (`HostRegistrationPage`) y desgloses de precio (`VehicleDetailView`) usan contornos lineales `rounded-2xl border border-slate-200` y divisores `divide-y divide-slate-100` sobre blanco limpio (`bg-transparent` en desgloses de producto).
- **Popovers flotantes elevados:** la elevación (`shadow-2xl` con `rounded-[20px]`) se reserva exclusivamente para menús emergentes (`CustomDropdown`, `DateRangePicker`, buscador) dentro de padres con `overflow-visible`.
- **Cero `<select>` nativos:** todo selector usa `CustomDropdown` con cápsula gris cuadrada `w-9 h-9 rounded-[8px]` y estado activo `bg-blue-50/70`.
- **Modo prototipo:** los formularios y pasos secuenciales siempre permiten avanzar o enviar solicitudes para facilitar pruebas de flujo de extremo a extremo.

## 2. Arquitectura Atómica y Componentes Consolidados
- **Datos compartidos:** `src/data/dropdownOptions.ts` centraliza `SEARCH_LOCATION_OPTIONS`, `SEARCH_VEHICLE_TYPES`, `HOST_CITY_OPTIONS` y `CATALOG_SORT_OPTIONS`.
- **Átomos & Moléculas clave:** `GalsaLogo`, `CustomDropdown`, `DateRangePicker`, `DocumentUploadCard`, `StepFeatureCard` (compartido por `FourStepProcess` y `HostSection`).
- **Layouts & Organismos:** `AuthCardLayout` (compartido por `LoginPage`, `RegisterPage` y `ForgotPasswordPage`), `SearchContainer`, `VehicleCard`, `VehicleDetailView`, `ReservationCheckoutView`, `HostRegistrationPage`, `SeoPage` y `DesignSystemPage`.
