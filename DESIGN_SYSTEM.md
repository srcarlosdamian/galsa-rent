# GALSA Rent Design System

## Color Palette

### Primary Blue (CTA)
The primary blue palette used throughout the application for interactive elements, CTAs, and highlights.

| Level | Hex Code | RGB | Usage |
|-------|----------|-----|-------|
| 50 | `#EEF2FF` | 238, 242, 255 | Lightest backgrounds, hover states |
| 100 | `#D9E2FF` | 217, 226, 255 | Light backgrounds, subtle elements |
| 200 | `#BCCBDF` | 188, 203, 223 | Secondary backgrounds |
| 300 | `#8EAFF` | 142, 175, 255 | Section CTAs, hero underlines |
| 400 | `#5985FF` | 89, 149, 255 | Medium emphasis elements |
| 500 | `#3D63FF` | 61, 99, 255 | Primary CTA buttons, main actions |
| 600 | `#1B37F5` | 27, 55, 245 | Button hover states |
| 700 | `#1D3DD4` | 29, 61, 212 | Darker hover states |
| 800 | `#172FB0` | 23, 47, 176 | Strong emphasis |
| 900 | `#132488` | 19, 36, 136 | Darkest, text on light backgrounds |
| 950 | `#141757` | 20, 23, 87 | Ultra-dark, maximum contrast |

**Usage Guidelines:**
- **UI Interactions**: 50-200 for backgrounds, 500-600 for buttons
- **Text on Blue**: Use 900 or 950 for maximum readability
- **Hover States**: Progress from 500 → 600 → 700
- **Accents**: Use 300 for underlines and subtle highlights
- **Logo**: Should use 500 or 600 (primary blue)

### Neutral Colors
Used for text, backgrounds, borders, and disabled states.

| Level | Usage |
|-------|-------|
| 50 | Lightest backgrounds, disabled states |
| 100 | Light backgrounds |
| 200 | Borders, subtle dividers |
| 300 | Medium borders |
| 400 | Secondary text |
| 500 | Medium text |
| 600 | Strong text |
| 700 | Primary text |
| 800 | Headings, strong emphasis |
| 900 | Darkest text, maximum contrast |
| 950 | Ultra-dark, reserved for special cases |

## Component Colors

### Buttons
**NO ICONS on buttons** - All buttons display text only, no icons.

- **Primary CTA**: `cta-500` background, white text
- **Secondary/Outline**: `neutral-200` border, `neutral-900` text
- **Hover**: `cta-600` or `cta-700`
- **Disabled**: `neutral-200` background, `neutral-400` text
- **Structure**: Text only, no leading/trailing icons

### Forms
- **Input Background**: White (`neutral-0` or `white`)
- **Input Border**: `neutral-200`
- **Focus Border**: `cta-500`
- **Label Text**: `neutral-900`
- **Helper Text**: `neutral-600`
- **Error**: Use red accent (if available)

### Checkboxes & Selection
- **Background**: `cta-50` or `cta-200`
- **Border**: `cta-500`
- **Checkmark**: `cta-900`
- **Hover**: `cta-100`

### Sliders & Ranges
- **Track**: `neutral-200` (light gray)
- **Thumb/Circle**: White with subtle shadow
- **Fill**: `cta-500`

### Underlines & Accents
- **Hero Text Underlines**: `cta-300`
- **Section Dividers**: `neutral-200`
- **Emphasis Lines**: `cta-500`

### CTAs & Highlights
- **Section Background**: `cta-300` (lighter for full-width sections)
- **Primary CTA**: `cta-500` on white, or white on `cta-500`
- **Hero CTA**: Full-width `cta-300` background with white text

## Typography

All typography follows the system without custom sizes in component declarations. Use Tailwind's standard scale.

- **Headings**: Font weight `font-black` (900) or `font-bold` (700)
- **Body**: Font weight `font-normal` (400)
- **Labels**: Font weight `font-bold` (700), size `text-sm`

## Spacing & Layout

- **Max-width**: Container max-width is `max-w-[1200px]` across all sections
- **Padding**: Consistent `px-4 sm:px-6 lg:px-8`
- **Section Padding**: `py-16 md:py-24` for vertical rhythm
- **Gap**: Use `gap-4`, `gap-6`, `gap-8`, `gap-10`, `gap-12` consistently

## Logo & Brand Elements

- **Logo Color**: Should use `cta-500` (#3D63FF) or `cta-600` (#1B37F5)
- **Logo Size**: Maintain consistent sizing across pages
- **Brand Text**: Use `text-neutral-900` for primary brand text

## Component Consistency

### Across All Pages:
1. ✅ All blue elements use the `cta-*` palette (50-950)
2. ✅ No standalone Tailwind `blue-*` colors are used
3. ✅ No standalone `green-*` colors (all removed)
4. ✅ All borders use `neutral-*` palette
5. ✅ Max-width containers use `max-w-[1200px]`
6. ✅ Form inputs have consistent styling
7. ✅ Buttons follow the same CTA pattern

## Implementation Checklist

- [ ] Audit all components for non-palette colors
- [ ] Replace any `blue-*` classes with `cta-*`
- [ ] Replace any `green-*` classes with appropriate neutrals
- [ ] Verify logo uses `cta-500` or `cta-600`
- [ ] Ensure all checkboxes use `cta-50`/`cta-200`/`cta-900`
- [ ] Verify all sliders use `neutral-200` track and white circles
- [ ] Check underlines use `cta-300`
- [ ] Confirm all CTA sections use `cta-300` background
- [ ] Verify form inputs use `neutral-200` borders
- [ ] Test contrast ratios for accessibility
- [ ] Document any exceptions or deviations
