---
name: GALSA Rent Design System
description: Minimalist, clean, premium digital mobility platform inspired by Virtuo and Airbnb
colors:
  primary: "#316AB5"
  primary-hover: "#2558A4"
  neutral-bg: "#FFFFFF"
  neutral-surface: "#FFFFFF"
  neutral-subtle: "#FAFAFA"
  neutral-border: "#EBEBEB"
  neutral-dark: "#111827"
  text-primary: "#111827"
  text-secondary: "#4B5563"
  text-muted: "#6B7280"
typography:
  display:
    fontFamily: '"Google Sans", system-ui, sans-serif'
    fontSize: "3.75rem"
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  heading:
    fontFamily: '"Google Sans", system-ui, sans-serif'
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: '"Google Sans", system-ui, sans-serif'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System & Guidelines

## 1. Design Principles
- **Clarity over Clutter**: Extreme minimalism inspired by Airbnb and Virtuo. Generous white space, clear contrast, flat design without heavy muddy gray backgrounds or stacked drop shadows.
- **Sparing Color Usage**: Primary 500 (`#316AB5`) is strictly reserved for primary call-to-actions (hero action, checkout/pay button). Everything else is pristine black, white, and subtle edge borders.
- **Micro-Delight & Finish**: Browser custom scrollbars, cohesive selection highlight, interactive carousels with smooth easing, and tabular numerals.
- **Typography**: Google Sans / Plus Jakarta Sans with crisp hierarchy and tight tracking for headings.
