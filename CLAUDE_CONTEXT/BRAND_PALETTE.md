# SafeDeck Maritime - Official Brand Palette

**Last Updated:** 2025-01-27 (SafeDeck rebrand)

---

## 🎨 Product Color Strategy

SafeDeck uses **color-coded product identities** to differentiate modules while maintaining brand consistency:

### Platform Brand (SafeDeckOS)
- **Primary Blue**: #3B7FA5 - Main platform brand color
- **Dark Navy**: #0E2A47 - Headers, logo elements
- **Light Cyan**: #5BA3C5 - Accents, highlights

### Product Module Colors

#### SafeDeckOS | Audit (Green Theme)
- **Audit Green**: #4A7C59 - Primary module color
- **Audit Dark**: #3A6247 - Hover states
- **Audit Light**: #5FA070 - Accents

#### SafeDeckOS | Pilot (Purple Theme)
- **Pilot Purple**: #6B4E8C - Primary module color
- **Pilot Dark**: #563E70 - Hover states
- **Pilot Light**: #8565A8 - Accents

#### SafeDeckOS | Port (Orange/Rust Theme)
- **Port Orange**: #B8653A - Primary module color
- **Port Dark**: #9A5430 - Hover states
- **Port Light**: #CF7C50 - Accents

---

## Primary Colors (General Site)
- **Brand Blue**: #3B7FA5 - Main brand color (replaces old cyan)
- **Navy**: #0E2A47 - Headers, dark accents
- **Cyan**: #3BA5BC - Maritime accent (from company logo)

**Legacy (keep for compatibility):**
- **Cyan (Tailwind)**: #0891B2 - Close enough to new brand, can keep if needed
- **Cyan Dark**: #0e7490 - Hover states (Tailwind cyan-700)

---

## Action Colors
- **Primary CTA**: #3B7FA5 - Main CTAs (brand blue)
- **CTA Hover**: #2F6583 - Darker on hover
- **Success/Go (Teal)**: #14b8a6 - Checkmarks, positive actions
- **Alert (Coral)**: #fb7185 - Warnings, important notices

---

## Neutral Colors
- **White**: #ffffff - Primary background
- **Off-white**: #f9fafb - Subtle backgrounds
- **Light Gray**: #f3f4f6 - Borders, dividers
- **Medium Gray**: #6b7280 - Secondary text
- **Dark Gray**: #374151 - Body text
- **Charcoal**: #111827 - Headings
- **Dark Blue Charcoal**: #0E1A2B - Alternative heading color (from old brand - keep)

---

## Semantic Colors
- **Success Green**: #10b981 - Completed, valid
- **Warning Amber**: #f59e0b - Caution, expiring
- **Error Red**: #ef4444 - Critical, overdue
- **Info Blue**: #3b82f6 - Information, links

---

## Usage Guidelines

### General Site (Homepage, Navigation, Footer)
1. **Brand Blue (#3B7FA5)** - Primary CTAs, section eyebrows, main accents
2. **Navy (#0E2A47)** - Headers, logo, dark sections
3. **Cyan (#3BA5BC)** - Maritime accents, highlights
4. **Grays** - Text hierarchy and UI elements

### Product Pages
Use the **color-coded module identity** on each product page:

- **Audit Page:** Green theme (#4A7C59)
- **Pilot Page:** Purple theme (#6B4E8C)
- **Port Page:** Orange theme (#B8653A)
- **Ops Page:** Blue theme (#3B7FA5) - main brand

### Color Combinations
- White text on brand blue backgrounds
- Dark charcoal (#0E1A2B) text on white backgrounds
- White text on product-colored buttons (green/purple/orange)
- Medium gray (#6b7280) for body text
- Ensure WCAG AA contrast ratios (4.5:1 minimum)

---

## Color Philosophy

**Why Color-Coded Products?**
- **Clear differentiation** - Each module has visual identity
- **Professional** - Enterprise software standard (think Microsoft Office suite)
- **Memorable** - Users associate colors with functions
- **Scalable** - Easy to add new modules with new colors

**Why Blue for Platform?**
- Maritime association (ocean/water color)
- Professional and trustworthy
- Modern and energetic
- Excellent contrast on white backgrounds

---

## Logo Assets

All logo files located in `/public/logos/`:

### Main Platform
- `safedeck-os.png` (blue) / `safedeck-os-white.png`

### Product Modules
- `safedeck-audit.png` (green) / `safedeck-audit-white.png`
- `safedeck-pilot.png` (purple) / `safedeck-pilot-white.png`
- `safedeck-port.png` (orange) / `safedeck-port-white.png`

### Company
- `safedeck-maritime.png` (navy + cyan) / `safedeck-maritime-white.png`

---

## Tailwind CSS Classes

### General Site
```tsx
// Primary brand blue
className="text-[#3B7FA5]" or "bg-[#3B7FA5]"

// Navy headers
className="text-[#0E2A47]"

// Legacy cyan (if keeping)
className="text-cyan-600" or "bg-cyan-600"
```

### Product Pages
```tsx
// Audit (green)
className="text-[#4A7C59]" or "bg-[#4A7C59]"

// Pilot (purple)
className="text-[#6B4E8C]" or "bg-[#6B4E8C]"

// Port (orange)
className="text-[#B8653A]" or "bg-[#B8653A]"
```

### Standard Classes (unchanged)
```tsx
// Body text
className="text-gray-600"

// Headings
className="text-gray-900"

// Borders
className="border-gray-200"
```

---

## Migration Notes

**From SeaReady to SafeDeck:**
- Old primary cyan (#0891B2) → New brand blue (#3B7FA5)
- Can keep old cyan as fallback/accent if needed
- Added color-coded product identities (green/purple/orange)
- Navy (#0E2A47) now primary dark color

**Compatibility:**
- Keep old Tailwind cyan classes where they work visually
- Gradually migrate to new brand blue on key pages
- Product pages get their unique color theme

---

## Quick Reference

| **Use Case** | **Color** | **Hex** |
|-------------|----------|---------|
| Main CTAs | Brand Blue | #3B7FA5 |
| Headers/Logo | Navy | #0E2A47 |
| Maritime Accent | Cyan | #3BA5BC |
| Audit Module | Green | #4A7C59 |
| Pilot Module | Purple | #6B4E8C |
| Port Module | Orange | #B8653A |
| Success | Teal | #14b8a6 |
| Body Text | Medium Gray | #6b7280 |
| Headings | Dark Charcoal | #0E1A2B |

---

**END OF BRAND PALETTE**
