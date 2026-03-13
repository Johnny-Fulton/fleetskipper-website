# Icon Migration Plan - SeaReady Marketing Website

**Date:** 2026-01-25
**Objective:** Replace all emoji icons with Lucide React icons and migrate all Heroicons to Lucide React equivalents for a consistent, professional maritime aesthetic.

**Status:** Lucide React v0.560.0 is already installed

---

## Executive Summary

This migration will:
1. Replace 20+ emoji instances with professional Lucide icons
2. Migrate 30+ files from Heroicons to Lucide React
3. Standardize icon sizing and styling across the entire website
4. Maintain the maritime professional aesthetic with clean, simple icons

---

## Part 1: Emoji to Lucide Icon Mapping

### Contact Page (`/app/contact/page.tsx`)
| Current Emoji | Context | Lucide Icon | Import | Size Class |
|--------------|---------|-------------|--------|-----------|
| 📋 | SMS Consultancy card | `ClipboardCheck` | `lucide-react` | `h-8 w-8` |
| 📱 | Join App Waitlist card | `Smartphone` | `lucide-react` | `h-8 w-8` |

**Implementation:**
```tsx
import { ClipboardCheck, Smartphone } from 'lucide-react'

// Replace:
<div className="text-3xl mb-3">📋</div>
// With:
<div className="mb-3">
  <ClipboardCheck className="h-8 w-8 text-sea-teal" />
</div>
```

---

### Waitlist Page (`/app/waitlist/page.tsx`)
| Current Emoji | Context | Lucide Icon | Import | Size Class | Color |
|--------------|---------|-------------|--------|-----------|-------|
| 📡 | Works Offline at Sea | `Radio` | `lucide-react` | `h-6 w-6` | `text-sea-teal` |
| ⚙️ | Pre-Configured for Your Vessel | `Settings` | `lucide-react` | `h-6 w-6` | `text-sea-teal` |
| 📱 | Mobile-Optimized for Crew | `Smartphone` | `lucide-react` | `h-6 w-6` | `text-sea-teal` |
| ✓ | Automatic Compliance Tracking | `CheckCircle` | `lucide-react` | `h-6 w-6` | `text-sea-teal` |
| 📊 | One-Click Reports | `BarChart3` | `lucide-react` | `h-6 w-6` | `text-sea-teal` |
| 🇬🇧 | Built for UK Workboats | `Flag` | `lucide-react` | `h-6 w-6` | `text-sea-teal` |
| ✓ (text) | Launch special benefits (line 174) | `CheckCircle` | `lucide-react` | `h-4 w-4 inline` | `text-green-600` |
| ✓ (text) | Early access (lines 278-281) | `Check` | `lucide-react` | `h-4 w-4 inline` | `text-green-600` |

**Implementation:**
```tsx
import { Radio, Settings, Smartphone, CheckCircle, BarChart3, Flag, Check } from 'lucide-react'

// Replace value prop icons (lines 78-149):
<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sea-teal/10">
  <Radio className="h-6 w-6 text-sea-teal" />
</div>

// Replace text checkmarks (lines 278-281):
<p><Check className="h-4 w-4 inline mr-1 text-green-600" /> Early access when we launch</p>
```

---

### Side-by-Side Component (`/components/primitives/side-by-side.tsx`)
| Current Emoji | Context | Lucide Icon | Import | Size Class |
|--------------|---------|-------------|--------|-----------|
| 📝 | Hours of Paperwork | `FileText` | `lucide-react` | `text-4xl` → `h-10 w-10` |
| 😰 | Inspection Stress | `AlertTriangle` | `lucide-react` | `text-4xl` → `h-10 w-10` |
| 📋 | Generic Templates | `ClipboardList` | `lucide-react` | `text-4xl` → `h-10 w-10` |
| ⚡ | Pre-configured | `Zap` | `lucide-react` | `text-4xl` → `h-10 w-10` |
| 🌊 | Works Offline | `Waves` | `lucide-react` | `text-4xl` → `h-10 w-10` |
| ✅ | Inspection Ready | `CheckCircle` | `lucide-react` | `text-4xl` → `h-10 w-10` |

**Implementation:**
```tsx
import { FileText, AlertTriangle, ClipboardList, Zap, Waves, CheckCircle } from 'lucide-react'

// Replace problem icons:
const problemIcons = {
  paperwork: <FileText className="h-10 w-10 text-red-500" />,
  stress: <AlertTriangle className="h-10 w-10 text-red-500" />,
  templates: <ClipboardList className="h-10 w-10 text-red-500" />
}

// Replace solution icons:
const solutionIcons = {
  preconfigured: <Zap className="h-10 w-10 text-sea-teal" />,
  offline: <Waves className="h-10 w-10 text-sea-teal" />,
  ready: <CheckCircle className="h-10 w-10 text-sea-teal" />
}
```

---

### Pricing Page (`/app/pricing/page.tsx`)
| Current Emoji | Context | Lucide Icon | Import | Size Class |
|--------------|---------|-------------|--------|-----------|
| 🎁 | Beta waitlist benefits (line 139) | `Gift` | `lucide-react` | `h-4 w-4 inline` |

**Implementation:**
```tsx
import { Gift } from 'lucide-react'

// Replace:
<p className="mt-4 text-center text-xs" style={{ color: '#0891B2' }}>
  🎁 Beta waitlist members get 50% off first year
</p>
// With:
<p className="mt-4 text-center text-xs flex items-center justify-center gap-1" style={{ color: '#0891B2' }}>
  <Gift className="h-4 w-4" /> Beta waitlist members get 50% off first year
</p>
```

---

### Other Files with Check Mark Emojis
| File | Lines | Context | Lucide Icon | Implementation |
|------|-------|---------|-------------|----------------|
| `/app/products/master-pilot-exchange/page.tsx` | Multiple | Feature list checkmarks | `CheckCircle` | Replace `✅` with icon component |
| `/app/training/page.tsx` | Multiple | Course feature lists | `Check` | Inline checkmarks |
| `/app/terms/page.tsx` | Multiple | Usage terms bullets | `Check` | List item bullets |
| `/components/primitives/resource-cards.tsx` | Line 118 | Type indicator | `Sparkles` for "Instant download" | Replace `✨` |

---

## Part 2: Heroicons to Lucide Icon Mapping

### Homepage Icons (`/app/page.tsx`)
| Heroicon | Lucide Equivalent | Usage Context | Size |
|----------|------------------|---------------|------|
| `CheckCircleIcon` (24/outline) | `CheckCircle` | "Who We Work With" section & "Why Choose SeaReady" | `h-6 w-6` or `h-7 w-7` |
| `DocumentTextIcon` (24/outline) | `FileText` | SMS Documentation Service card | `h-20 w-20` |
| `ServerIcon` (24/outline) | `Server` | Digital SMS Management card | `h-20 w-20` |
| `WrenchScrewdriverIcon` (24/outline) | `Wrench` | Bespoke Solutions card | `h-20 w-20` |

**Import change:**
```tsx
// OLD:
import {
  CheckCircleIcon,
  DocumentTextIcon,
  ServerIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'

// NEW:
import { CheckCircle, FileText, Server, Wrench } from 'lucide-react'
```

---

### Navigation Components
| File | Heroicon | Lucide Equivalent | Usage |
|------|----------|------------------|-------|
| `navbar-transparent.tsx` | `Bars3Icon`, `XMarkIcon`, `ChevronDownIcon` | `Menu`, `X`, `ChevronDown` | Mobile menu toggle, dropdown |
| `navbar-solid.tsx` | `Bars3Icon`, `XMarkIcon`, `ChevronDownIcon` | `Menu`, `X`, `ChevronDown` | Mobile menu toggle, dropdown |
| `navbar-light.tsx` | `Bars3Icon`, `XMarkIcon`, `ChevronDownIcon` | `Menu`, `X`, `ChevronDown` | Mobile menu toggle, dropdown |
| `navbar-new.tsx` | `Bars3Icon`, `XMarkIcon` | `Menu`, `X` | Mobile menu toggle |
| `navbar.tsx` | `Bars2Icon` (24/solid) | `Menu` | Mobile menu toggle |

**Standard navbar import:**
```tsx
// OLD:
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

// NEW:
import { Menu, X, ChevronDown } from 'lucide-react'
```

---

### Carousel Components
| File | Heroicon | Lucide Equivalent | Size |
|------|----------|------------------|------|
| `ThreeImageCarousel.tsx` | `ChevronLeftIcon`, `ChevronRightIcon` | `ChevronLeft`, `ChevronRight` | `h-8 w-8` |
| `SmoothCarousel.tsx` | `ChevronLeftIcon`, `ChevronRightIcon` | `ChevronLeft`, `ChevronRight` | `h-8 w-8` |
| `ImageCarousel.tsx` | `ChevronLeftIcon`, `ChevronRightIcon` | `ChevronLeft`, `ChevronRight` | `h-8 w-8` |

**Standard carousel import:**
```tsx
// OLD:
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// NEW:
import { ChevronLeft, ChevronRight } from 'lucide-react'
```

---

### Primitive Components

#### `feature-grid.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `CheckCircleIcon` | `CheckCircle` | Default icon |
| `ShieldCheckIcon` | `ShieldCheck` | Crew/Safety features |
| `ClockIcon` | `Clock` | Maintenance features |
| `DocumentTextIcon` | `FileText` | Documentation features |
| `UserGroupIcon` | `Users` | Operations features |
| `DocumentDuplicateIcon` | `Copy` | Reporting features |
| `WifiIcon` | `Wifi` | Offline features |
| `RocketLaunchIcon` | `Rocket` | Setup features |

**Icon map update:**
```tsx
import {
  CheckCircle,
  ShieldCheck,
  Clock,
  FileText,
  Users,
  Copy,
  Wifi,
  Rocket
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Compliance': CheckCircle,
  'Crew': ShieldCheck,
  'Maintenance': Clock,
  'Safety': FileText,
  'Operations': Users,
  'Reporting': Copy,
  'Offline': Wifi,
  'Setup': Rocket,
}
```

#### `resource-cards.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `DocumentTextIcon` | `FileText` | Default document icon |
| `CloudArrowDownIcon` | `CloudDownload` | Download button |
| `ClipboardDocumentCheckIcon` | `ClipboardCheck` | Checklist resources |
| `DocumentDuplicateIcon` | `Copy` | Template resources |
| `BookOpenIcon` | `BookOpen` | Guide resources |

**Icon map update:**
```tsx
import {
  FileText,
  CloudDownload,
  ClipboardCheck,
  Copy,
  BookOpen
} from 'lucide-react'

const getResourceIcon = (icon?: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'checklist': ClipboardCheck,
    'template': Copy,
    'guide': BookOpen,
  }
  return iconMap[icon || ''] || FileText
}
```

#### `pricing-table.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `CheckIcon` (20/solid) | `Check` | Feature checkmarks |

```tsx
// OLD:
import { CheckIcon } from '@heroicons/react/20/solid'

// NEW:
import { Check } from 'lucide-react'
```

#### `side-by-side.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `CheckCircleIcon` (16/solid) | `CheckCircle` | List item checkmarks |

```tsx
// OLD:
import { CheckCircleIcon } from '@heroicons/react/16/solid'

// NEW:
import { CheckCircle } from 'lucide-react'
```

---

### Other Component Files

#### `bento-grid.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `CloudArrowUpIcon` | `CloudUpload` | Cloud features |
| `SignalSlashIcon` | `WifiOff` | Offline features |
| `CheckCircleIcon` (24/solid) | `CheckCircle` | Compliance features |

```tsx
// OLD:
import { CloudArrowUpIcon, SignalSlashIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

// NEW:
import { CloudUpload, WifiOff, CheckCircle } from 'lucide-react'
```

#### `hero-with-nav.tsx`, `hero-full.tsx`, `hero.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `CheckCircleIcon` (16/solid) | `CheckCircle` | Feature list checkmarks |

```tsx
// OLD:
import { CheckCircleIcon } from '@heroicons/react/16/solid'

// NEW:
import { CheckCircle } from 'lucide-react'
```

#### `testimonials.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `ArrowLongRightIcon` (20/solid) | `ArrowRight` | Navigation arrows |

```tsx
// OLD:
import { ArrowLongRightIcon } from '@heroicons/react/20/solid'

// NEW:
import { ArrowRight } from 'lucide-react'
```

#### `linked-avatars.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `CheckIcon` (16/solid) | `Check` | Verification badges |

```tsx
// OLD:
import { CheckIcon } from '@heroicons/react/16/solid'

// NEW:
import { Check } from 'lucide-react'
```

---

### Page Files

#### `/app/design/page.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `CheckCircleIcon` | `CheckCircle` | Feature indicators |
| `ShieldCheckIcon` | `ShieldCheck` | Security features |
| `ClockIcon` | `Clock` | Time-based features |
| `DocumentTextIcon` | `FileText` | Documentation |

```tsx
// OLD:
import { CheckCircleIcon, ShieldCheckIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

// NEW:
import { CheckCircle, ShieldCheck, Clock, FileText } from 'lucide-react'
```

#### `/app/training/page.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| Various training-related icons | TBD based on specific usage | Course features |

#### `/app/login/page.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `CheckIcon` (16/solid) | `Check` | Feature checkmarks |

```tsx
// OLD:
import { CheckIcon } from '@heroicons/react/16/solid'

// NEW:
import { Check } from 'lucide-react'
```

#### Solution Pages (workboats, merchant-vessels, pilot-organizations)
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `CheckCircleIcon` (24/outline) | `CheckCircle` | Feature lists |

```tsx
// OLD:
import { CheckCircleIcon } from '@heroicons/react/24/outline'

// NEW:
import { CheckCircle } from 'lucide-react'
```

#### Product Pages (sms-portal, sms-pro-app, custom-solutions, master-pilot-exchange)
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `CheckCircleIcon` (24/outline) | `CheckCircle` | Feature lists |
| Various product-specific icons | TBD based on context | Product features |

```tsx
// OLD:
import { CheckCircleIcon } from '@heroicons/react/24/outline'

// NEW:
import { CheckCircle } from 'lucide-react'
```

#### `/app/color-demo/page.tsx`
| Heroicon | Lucide Equivalent | Context |
|----------|------------------|---------|
| `CheckCircleIcon` | `CheckCircle` | Demo checkmarks |
| `ShieldCheckIcon` | `ShieldCheck` | Demo security |
| `BoltIcon` | `Zap` | Demo performance |

```tsx
// OLD:
import { CheckCircleIcon, ShieldCheckIcon, BoltIcon } from '@heroicons/react/24/outline'

// NEW:
import { CheckCircle, ShieldCheck, Zap } from 'lucide-react'
```

---

## Part 3: Sizing Guidelines

### Icon Size Standards
| Context | Emoji Size | Lucide Size Class | Actual Size |
|---------|-----------|------------------|-------------|
| Large feature cards | `text-3xl` (1.875rem) | `h-8 w-8` or `h-10 w-10` | 32-40px |
| Medium feature icons | `text-2xl` (1.5rem) | `h-6 w-6` | 24px |
| Hero section icons | Varies | `h-20 w-20` | 80px |
| List item checkmarks | N/A | `h-5 w-5` or `h-6 w-6` | 20-24px |
| Inline text icons | N/A | `h-4 w-4 inline` | 16px |
| Navigation icons | N/A | `h-6 w-6` or `h-8 w-8` | 24-32px |
| Button icons | N/A | `h-5 w-5` | 20px |

### Stroke Width Standards
- **Default:** Use Lucide's default `strokeWidth` (no prop needed)
- **Emphasized:** `strokeWidth={2}` for bolder icons (pricing checkmarks, important CTAs)
- **Subtle:** `strokeWidth={1.5}` for lighter icons (secondary features)

### Color Standards
| Context | Color Value | Tailwind Class |
|---------|------------|---------------|
| Primary brand (teal) | `#0891B2` | `text-sea-teal` or inline style |
| Secondary brand (orange) | `#c65d00` | `text-brand-orange` |
| Navy | `#0E1A2B` | `text-navy` |
| Success/positive | Green variants | `text-green-600` |
| Warning/alert | Red variants | `text-red-500` |
| Neutral | Gray variants | `text-gray-600` |

---

## Part 4: Migration Checklist

### Phase 1: Emoji Replacement (Priority)
- [ ] Contact page (2 emojis)
- [ ] Waitlist page (10+ emoji instances)
- [ ] Side-by-side component (6 emojis)
- [ ] Pricing page (1 emoji)
- [ ] Resource cards component (2 emojis)
- [ ] Master Pilot Exchange page (3 emojis)
- [ ] Training page (multiple checkmarks)
- [ ] Terms page (multiple checkmarks)

### Phase 2: Heroicons Navigation Components
- [ ] navbar-transparent.tsx
- [ ] navbar-solid.tsx
- [ ] navbar-light.tsx
- [ ] navbar-new.tsx
- [ ] navbar.tsx

### Phase 3: Heroicons Carousels
- [ ] ThreeImageCarousel.tsx
- [ ] SmoothCarousel.tsx
- [ ] ImageCarousel.tsx

### Phase 4: Heroicons Primitive Components
- [ ] feature-grid.tsx (8 icons)
- [ ] resource-cards.tsx (5 icons)
- [ ] pricing-table.tsx
- [ ] side-by-side.tsx
- [ ] hero.tsx
- [ ] hero-with-nav.tsx
- [ ] hero-full.tsx

### Phase 5: Heroicons Other Components
- [ ] bento-grid.tsx
- [ ] testimonials.tsx
- [ ] linked-avatars.tsx

### Phase 6: Heroicons Page Files
- [ ] page.tsx (homepage)
- [ ] design/page.tsx
- [ ] training/page.tsx
- [ ] login/page.tsx
- [ ] color-demo/page.tsx
- [ ] solutions/workboats/page.tsx
- [ ] solutions/merchant-vessels/page.tsx
- [ ] solutions/pilot-organizations/page.tsx
- [ ] products/sms-portal/page.tsx
- [ ] products/sms-pro-app/page.tsx
- [ ] products/custom-solutions/page.tsx
- [ ] products/master-pilot-exchange/page.tsx

### Phase 7: Testing & Cleanup
- [ ] Visual regression testing on all pages
- [ ] Check icon alignment and spacing
- [ ] Verify color consistency
- [ ] Remove @heroicons/react dependency from package.json
- [ ] Update ACTION_REGISTER.md with migration notes

---

## Part 5: Implementation Notes

### Why Lucide React?
1. **Already installed** (v0.560.0)
2. **Consistent design language** - All icons share the same design system
3. **Tree-shakeable** - Only import icons you use
4. **TypeScript support** - Full type safety
5. **Active maintenance** - Regular updates and new icons
6. **Maritime-appropriate** - Clean, professional aesthetic

### Migration Best Practices
1. **Test one component at a time** - Don't migrate everything at once
2. **Start with high-traffic pages** - Homepage, pricing, waitlist
3. **Maintain visual consistency** - Use the sizing guidelines above
4. **Check mobile responsiveness** - Icons should scale properly
5. **Preserve accessibility** - Maintain `aria-label` where needed
6. **Document changes** - Update ACTION_REGISTER.md after each file

### Breaking Changes to Watch For
- Heroicons use `className` for all styling (same as Lucide) ✓
- Heroicons have size variants (16/20/24), Lucide uses `className` for sizing ✓
- Some Heroicons have "solid" and "outline" variants, Lucide has `fill` prop
- Icon names may differ slightly (e.g., `Bars3Icon` → `Menu`)

### Maritime Aesthetic Guidelines
- **Prefer outline icons** for most use cases (clean, professional)
- **Use filled icons sparingly** - Only for strong emphasis or CTAs
- **Consistent stroke widths** - Don't mix thin and bold on the same page
- **Color hierarchy** - Primary teal > Secondary orange > Neutral grays
- **Size hierarchy** - Larger icons for primary actions, smaller for secondary

---

## Part 6: Quick Reference

### Complete Heroicons → Lucide Mapping
| Heroicon | Lucide | Notes |
|----------|--------|-------|
| `ArrowLongRightIcon` | `ArrowRight` | Use standard arrow |
| `Bars2Icon` | `Menu` | Both solid and outline variants |
| `Bars3Icon` | `Menu` | Both solid and outline variants |
| `BoltIcon` | `Zap` | Lightning bolt |
| `BookOpenIcon` | `BookOpen` | Same name |
| `CheckCircleIcon` | `CheckCircle` | Same name |
| `CheckIcon` | `Check` | Same name |
| `ChevronDownIcon` | `ChevronDown` | Same name |
| `ChevronLeftIcon` | `ChevronLeft` | Same name |
| `ChevronRightIcon` | `ChevronRight` | Same name |
| `ClipboardDocumentCheckIcon` | `ClipboardCheck` | Simplified name |
| `CloudArrowDownIcon` | `CloudDownload` | Simplified name |
| `CloudArrowUpIcon` | `CloudUpload` | Simplified name |
| `ClockIcon` | `Clock` | Same name |
| `DocumentDuplicateIcon` | `Copy` | Different conceptual name |
| `DocumentTextIcon` | `FileText` | Different name |
| `RocketLaunchIcon` | `Rocket` | Simplified name |
| `ServerIcon` | `Server` | Same name |
| `ShieldCheckIcon` | `ShieldCheck` | Same name |
| `SignalSlashIcon` | `WifiOff` | Different conceptual name |
| `UserGroupIcon` | `Users` | Simplified name |
| `WifiIcon` | `Wifi` | Same name |
| `WrenchScrewdriverIcon` | `Wrench` | Simplified name |
| `XMarkIcon` | `X` | Simplified name |

### Complete Emoji → Lucide Mapping
| Emoji | Context | Lucide | Color |
|-------|---------|--------|-------|
| 📋 | Clipboard/Forms | `ClipboardCheck` or `ClipboardList` | `text-sea-teal` |
| 📱 | Mobile/Phone | `Smartphone` | `text-sea-teal` |
| 📡 | Connectivity/Offline | `Radio` or `Wifi` | `text-sea-teal` |
| ⚙️ | Settings/Configuration | `Settings` | `text-sea-teal` |
| ✓ | Checkmark (standalone) | `Check` or `CheckCircle` | `text-green-600` or `text-sea-teal` |
| ✅ | Checkmark (emphasized) | `CheckCircle` | `text-green-600` |
| 📊 | Analytics/Reports | `BarChart3` or `BarChart` | `text-sea-teal` |
| 🇬🇧 | UK/British | `Flag` | `text-sea-teal` |
| 📝 | Writing/Forms | `FileText` or `PenSquare` | Context-dependent |
| 😰 | Warning/Stress | `AlertTriangle` | `text-red-500` |
| ⚡ | Speed/Performance | `Zap` | `text-sea-teal` |
| 🌊 | Maritime/Waves | `Waves` | `text-sea-teal` |
| 🎁 | Gift/Bonus | `Gift` | `text-sea-teal` |
| ✨ | Special/Sparkle | `Sparkles` | Context-dependent |

---

## Part 7: Estimated Impact

### Files to Modify: 30+ files
- 8 page components
- 12+ primitive/shared components
- 5 navigation components
- 3 carousel components
- 4+ solution/product pages

### Total Icons to Replace: 100+ instances
- ~20 emoji replacements
- ~80+ Heroicon replacements

### Estimated Development Time
- Phase 1 (Emojis): 2-3 hours
- Phase 2-3 (Navigation/Carousels): 1-2 hours
- Phase 4-5 (Components): 3-4 hours
- Phase 6 (Pages): 2-3 hours
- Phase 7 (Testing/Cleanup): 1-2 hours
- **Total: 9-14 hours**

### Testing Requirements
- Visual regression testing on all affected pages
- Mobile responsiveness testing
- Accessibility testing (screen reader compatibility)
- Performance testing (bundle size impact)
- Cross-browser testing

---

## Conclusion

This migration will create a consistent, professional icon system across the entire SeaReady marketing website. By standardizing on Lucide React, we:

1. Eliminate visual inconsistency from mixed emoji and icon usage
2. Improve maintainability with a single icon library
3. Enhance professional appearance with clean, scalable icons
4. Maintain the maritime aesthetic with appropriate icon choices
5. Future-proof the icon system with an actively maintained library

The migration should be done incrementally, with careful testing at each phase to ensure no visual regressions or accessibility issues.
