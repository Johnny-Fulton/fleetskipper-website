# Icon Migration Quick Reference

Quick lookup tables for the SeaReady icon migration from emojis and Heroicons to Lucide React.

---

## Emoji → Lucide Mapping

| Emoji | Lucide Icon | Import | Typical Size | Typical Color |
|-------|-------------|--------|--------------|---------------|
| 📋 | `ClipboardCheck` or `ClipboardList` | `lucide-react` | `h-6 w-6` or `h-8 w-8` | `text-sea-teal` |
| 📱 | `Smartphone` | `lucide-react` | `h-6 w-6` or `h-8 w-8` | `text-sea-teal` |
| 📡 | `Radio` | `lucide-react` | `h-6 w-6` | `text-sea-teal` |
| ⚙️ | `Settings` | `lucide-react` | `h-6 w-6` | `text-sea-teal` |
| ✓ | `Check` or `CheckCircle` | `lucide-react` | `h-4 w-4` or `h-5 w-5` | `text-green-600` |
| ✅ | `CheckCircle` | `lucide-react` | `h-6 w-6` | `text-green-600` |
| 📊 | `BarChart3` | `lucide-react` | `h-6 w-6` | `text-sea-teal` |
| 🇬🇧 | `Flag` | `lucide-react` | `h-6 w-6` | `text-sea-teal` |
| 📝 | `FileText` or `PenSquare` | `lucide-react` | `h-10 w-10` | `text-red-500` (problem) |
| 😰 | `AlertTriangle` | `lucide-react` | `h-10 w-10` | `text-red-500` |
| ⚡ | `Zap` | `lucide-react` | `h-10 w-10` | `text-sea-teal` |
| 🌊 | `Waves` | `lucide-react` | `h-10 w-10` | `text-sea-teal` |
| 🎁 | `Gift` | `lucide-react` | `h-4 w-4` | `text-sea-teal` |
| ✨ | `Sparkles` | `lucide-react` | `h-4 w-4` | Context-dependent |

---

## Heroicons → Lucide Mapping

| Heroicon | Lucide | Context |
|----------|--------|---------|
| `ArrowLongRightIcon` | `ArrowRight` | Navigation arrows |
| `Bars2Icon` | `Menu` | Mobile menu |
| `Bars3Icon` | `Menu` | Mobile menu |
| `BoltIcon` | `Zap` | Performance features |
| `BookOpenIcon` | `BookOpen` | Guide resources |
| `CheckCircleIcon` | `CheckCircle` | Feature lists, confirmations |
| `CheckIcon` | `Check` | Simple checkmarks |
| `ChevronDownIcon` | `ChevronDown` | Dropdowns |
| `ChevronLeftIcon` | `ChevronLeft` | Carousel navigation |
| `ChevronRightIcon` | `ChevronRight` | Carousel navigation |
| `ClipboardDocumentCheckIcon` | `ClipboardCheck` | Checklist resources |
| `CloudArrowDownIcon` | `CloudDownload` | Download actions |
| `CloudArrowUpIcon` | `CloudUpload` | Upload actions |
| `ClockIcon` | `Clock` | Time/maintenance features |
| `DocumentDuplicateIcon` | `Copy` | Template/copy features |
| `DocumentTextIcon` | `FileText` | Documentation |
| `RocketLaunchIcon` | `Rocket` | Setup/launch features |
| `ServerIcon` | `Server` | Platform/infrastructure |
| `ShieldCheckIcon` | `ShieldCheck` | Security/compliance |
| `SignalSlashIcon` | `WifiOff` | Offline indicators |
| `UserGroupIcon` | `Users` | Team/crew features |
| `WifiIcon` | `Wifi` | Connectivity features |
| `WrenchScrewdriverIcon` | `Wrench` | Tools/customization |
| `XMarkIcon` | `X` | Close buttons |

---

## Standard Import Patterns

### Homepage Icons
```tsx
import { CheckCircle, FileText, Server, Wrench } from 'lucide-react'
```

### Navigation Icons
```tsx
import { Menu, X, ChevronDown } from 'lucide-react'
```

### Carousel Icons
```tsx
import { ChevronLeft, ChevronRight } from 'lucide-react'
```

### Feature Grid Icons
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
```

### Resource Card Icons
```tsx
import {
  FileText,
  CloudDownload,
  ClipboardCheck,
  Copy,
  BookOpen
} from 'lucide-react'
```

### Side-by-Side Problem/Solution Icons
```tsx
import {
  FileText,
  AlertTriangle,
  ClipboardList,
  Zap,
  Waves,
  CheckCircle
} from 'lucide-react'
```

### Waitlist Page Icons
```tsx
import {
  Radio,
  Settings,
  Smartphone,
  CheckCircle,
  BarChart3,
  Flag,
  Check
} from 'lucide-react'
```

---

## Size Reference

| Context | Size Class | Pixel Size |
|---------|-----------|------------|
| Inline text icon | `h-4 w-4` | 16px |
| Small list icon | `h-5 w-5` | 20px |
| Standard list icon | `h-6 w-6` | 24px |
| Navigation icon | `h-6 w-6` or `h-8 w-8` | 24-32px |
| Medium feature card | `h-8 w-8` or `h-10 w-10` | 32-40px |
| Large hero icon | `h-20 w-20` | 80px |

---

## Color Reference

| Purpose | Tailwind Class | Hex Value |
|---------|---------------|-----------|
| Primary (teal) | `text-sea-teal` | `#0891B2` |
| Secondary (orange) | `text-brand-orange` | `#c65d00` |
| Navy | `text-navy` | `#0E1A2B` |
| Success | `text-green-600` | - |
| Warning | `text-red-500` | - |
| Neutral | `text-gray-600` | - |

---

## Common Replacement Patterns

### Replace emoji in div
```tsx
// BEFORE:
<div className="text-3xl mb-3">📋</div>

// AFTER:
<div className="mb-3">
  <ClipboardCheck className="h-8 w-8 text-sea-teal" />
</div>
```

### Replace emoji inline with text
```tsx
// BEFORE:
<p>✓ Early access when we launch</p>

// AFTER:
<p><Check className="h-4 w-4 inline mr-1 text-green-600" /> Early access when we launch</p>
```

### Replace Heroicon
```tsx
// BEFORE:
import { CheckCircleIcon } from '@heroicons/react/24/outline'
<CheckCircleIcon className="h-6 w-6 text-sea-teal" />

// AFTER:
import { CheckCircle } from 'lucide-react'
<CheckCircle className="h-6 w-6 text-sea-teal" />
```

### Replace Heroicon with inline style color
```tsx
// BEFORE:
import { DocumentTextIcon } from '@heroicons/react/24/outline'
<DocumentTextIcon className="h-20 w-20" style={{ color: '#0891B2' }} />

// AFTER:
import { FileText } from 'lucide-react'
<FileText className="h-20 w-20" style={{ color: '#0891B2' }} />
// OR with Tailwind:
<FileText className="h-20 w-20 text-sea-teal" />
```

---

## Files by Priority

### Phase 1: High-Impact Emoji Replacements
1. `/app/waitlist/page.tsx` - 10+ emojis
2. `/components/primitives/side-by-side.tsx` - 6 emojis
3. `/app/contact/page.tsx` - 2 emojis
4. `/app/pricing/page.tsx` - 1 emoji

### Phase 2: Navigation (Quick wins)
5. `/components/navbar-transparent.tsx`
6. `/components/navbar-solid.tsx`
7. `/components/navbar-light.tsx`
8. `/components/navbar-new.tsx`
9. `/components/navbar.tsx`

### Phase 3: Carousels (Quick wins)
10. `/components/ThreeImageCarousel.tsx`
11. `/components/SmoothCarousel.tsx`
12. `/components/ImageCarousel.tsx`

### Phase 4: Homepage (High traffic)
13. `/app/page.tsx`

### Phase 5: Primitive Components
14. `/components/primitives/feature-grid.tsx`
15. `/components/primitives/resource-cards.tsx`
16. `/components/primitives/pricing-table.tsx`
17. `/components/primitives/side-by-side.tsx` (Heroicons)
18. `/components/primitives/hero.tsx`

### Phase 6: Remaining Components & Pages
19-30. Other product/solution pages and components

---

## Testing Checklist per File

- [ ] Visual appearance matches original
- [ ] Icon size is appropriate for context
- [ ] Icon color matches brand guidelines
- [ ] Icon alignment is correct
- [ ] Mobile responsiveness maintained
- [ ] No console errors
- [ ] Import statement is correct
- [ ] No unused Heroicons imports remain
