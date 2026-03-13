# Icon Migration Quick Start Guide

Start migrating icons immediately with this step-by-step guide.

---

## Prerequisites

✓ lucide-react v0.560.0 is already installed
✓ No additional dependencies needed

---

## Step 1: Start with Waitlist Page (Highest Impact)

### File: `/app/waitlist/page.tsx`

**1a. Add imports at the top:**
```tsx
import { Radio, Settings, Smartphone, CheckCircle, BarChart3, Flag, Check } from 'lucide-react'
```

**1b. Replace the 6 value prop icons (lines 78-158):**

Find and replace each emoji span with the icon component:

```tsx
// OLD (line 78):
<span className="text-2xl">📡</span>

// NEW:
<Radio className="h-6 w-6 text-sea-teal" />
```

```tsx
// OLD (line 93):
<span className="text-2xl">⚙️</span>

// NEW:
<Settings className="h-6 w-6 text-sea-teal" />
```

```tsx
// OLD (line 107):
<span className="text-2xl">📱</span>

// NEW:
<Smartphone className="h-6 w-6 text-sea-teal" />
```

```tsx
// OLD (line 121):
<span className="text-2xl">✓</span>

// NEW:
<CheckCircle className="h-6 w-6 text-sea-teal" />
```

```tsx
// OLD (line 135):
<span className="text-2xl">📊</span>

// NEW:
<BarChart3 className="h-6 w-6 text-sea-teal" />
```

```tsx
// OLD (line 149):
<span className="text-2xl">🇬🇧</span>

// NEW:
<Flag className="h-6 w-6 text-sea-teal" />
```

**1c. Replace the pricing badge checkmark (line 174):**

```tsx
// OLD:
<div className="mt-8 inline-flex items-center rounded-full bg-green-50 px-6 py-3 text-sm font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
  ✓ Launch special benefits for waitlist members
</div>

// NEW:
<div className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-50 px-6 py-3 text-sm font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
  <CheckCircle className="h-4 w-4" />
  Launch special benefits for waitlist members
</div>
```

**1d. Replace the benefits list checkmarks (lines 277-282):**

```tsx
// OLD:
<div className="text-center text-sm text-gray-600 space-y-1">
  <p>✓ Early access when we launch</p>
  <p>✓ Special launch pricing</p>
  <p>✓ Free migration from current system</p>
  <p>✓ Priority onboarding</p>
</div>

// NEW:
<div className="text-center text-sm text-gray-600 space-y-2">
  <p className="flex items-center justify-center gap-2">
    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
    Early access when we launch
  </p>
  <p className="flex items-center justify-center gap-2">
    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
    Special launch pricing
  </p>
  <p className="flex items-center justify-center gap-2">
    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
    Free migration from current system
  </p>
  <p className="flex items-center justify-center gap-2">
    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
    Priority onboarding
  </p>
</div>
```

**1e. Test:**
```bash
cd "/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website"
npm run dev
# Visit http://localhost:3000/waitlist
```

**1f. Commit:**
```bash
git add src/app/waitlist/page.tsx
git commit -m "Replace emojis with Lucide icons on waitlist page"
```

---

## Step 2: Contact Page (Quick Win)

### File: `/app/contact/page.tsx`

**2a. Add imports:**
```tsx
import { ClipboardCheck, Smartphone } from 'lucide-react'
```

**2b. Replace clipboard emoji (line 45):**
```tsx
// OLD:
<div className="text-3xl mb-3">📋</div>

// NEW:
<div className="mb-3">
  <ClipboardCheck className="h-8 w-8 text-sea-teal" />
</div>
```

**2c. Replace phone emoji (line 59):**
```tsx
// OLD:
<div className="text-3xl mb-3">📱</div>

// NEW:
<div className="mb-3">
  <Smartphone className="h-8 w-8 text-sea-teal" />
</div>
```

**2d. Test and commit:**
```bash
# Test at http://localhost:3000/contact
git add src/app/contact/page.tsx
git commit -m "Replace emojis with Lucide icons on contact page"
```

---

## Step 3: Side-by-Side Component

### File: `/components/primitives/side-by-side.tsx`

**3a. Update imports:**
```tsx
// OLD:
import { CheckCircleIcon } from '@heroicons/react/16/solid'

// NEW:
import { CheckCircle, FileText, AlertTriangle, ClipboardList, Zap, Waves } from 'lucide-react'
```

**3b. Replace problem/solution emojis (lines 74-144):**

The component has hardcoded emoji arrays. Replace them:

```tsx
// OLD problem icons (lines 74-90):
{
  icon: "📝",
  title: "Hours of Paperwork",
  desc: "Time spent on paperwork instead of operations"
},
{
  icon: "😰",
  title: "Inspection Stress",
  desc: "Scrambling for documents during inspections"
},
{
  icon: "📋",
  title: "Generic Templates",
  desc: "One-size-fits-all that doesn't fit your vessel"
}

// NEW - add this before the array:
const problemIcons: Record<string, JSX.Element> = {
  paperwork: <FileText className="h-10 w-10 text-red-500" />,
  stress: <AlertTriangle className="h-10 w-10 text-red-500" />,
  templates: <ClipboardList className="h-10 w-10 text-red-500" />
}

// Then update the array:
{
  icon: problemIcons.paperwork,
  title: "Hours of Paperwork",
  desc: "Time spent on paperwork instead of operations"
},
{
  icon: problemIcons.stress,
  title: "Inspection Stress",
  desc: "Scrambling for documents during inspections"
},
{
  icon: problemIcons.templates,
  title: "Generic Templates",
  desc: "One-size-fits-all that doesn't fit your vessel"
}
```

```tsx
// OLD solution icons (lines 118-134):
{
  icon: "⚡",
  title: "Pre-configured",
  desc: "Defaults for your vessel type ready to use"
},
{
  icon: "🌊",
  title: "Works Offline",
  desc: "Complete functionality when at sea"
},
{
  icon: "✅",
  title: "Inspection Ready",
  desc: "Everything inspectors need, instantly available"
}

// NEW - add this before the array:
const solutionIcons: Record<string, JSX.Element> = {
  preconfigured: <Zap className="h-10 w-10 text-sea-teal" />,
  offline: <Waves className="h-10 w-10 text-sea-teal" />,
  ready: <CheckCircle className="h-10 w-10 text-sea-teal" />
}

// Then update the array:
{
  icon: solutionIcons.preconfigured,
  title: "Pre-configured",
  desc: "Defaults for your vessel type ready to use"
},
{
  icon: solutionIcons.offline,
  title: "Works Offline",
  desc: "Complete functionality when at sea"
},
{
  icon: solutionIcons.ready,
  title: "Inspection Ready",
  desc: "Everything inspectors need, instantly available"
}
```

**3c. Update icon rendering (lines 94 and 138):**
```tsx
// OLD:
<div className="text-3xl mb-3">{item.icon}</div>

// NEW:
<div className="mb-3">{item.icon}</div>
```

**3d. Replace CheckCircleIcon for list items (line 35):**
```tsx
// OLD:
<CheckCircleIcon className="h-6 w-6 text-sea-teal flex-shrink-0 mt-0.5" />

// NEW:
<CheckCircle className="h-6 w-6 text-sea-teal flex-shrink-0 mt-0.5" />
```

**3e. Test and commit:**
```bash
# Test any page using the side-by-side component
git add src/components/primitives/side-by-side.tsx
git commit -m "Replace emojis and Heroicons with Lucide in side-by-side component"
```

---

## Step 4: Pricing Page

### File: `/app/pricing/page.tsx`

**4a. Update imports:**
```tsx
// Note: This file already imports CheckCircle from lucide-react (line 5)
// Just add Gift to the existing import:

// OLD:
import { CheckCircle } from 'lucide-react'

// NEW:
import { CheckCircle, Gift } from 'lucide-react'
```

**4b. Replace gift emoji (line 139):**
```tsx
// OLD:
<p className="mt-4 text-center text-xs" style={{ color: '#0891B2' }}>
  🎁 Beta waitlist members get 50% off first year
</p>

// NEW:
<p className="mt-4 text-center text-xs flex items-center justify-center gap-1" style={{ color: '#0891B2' }}>
  <Gift className="h-4 w-4" />
  Beta waitlist members get 50% off first year
</p>
```

**4c. Test and commit:**
```bash
# Test at http://localhost:3000/pricing
git add src/app/pricing/page.tsx
git commit -m "Replace gift emoji with Lucide icon on pricing page"
```

---

## Step 5: Homepage (High Traffic)

### File: `/app/page.tsx`

**5a. Update imports:**
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

**5b. Replace all icon instances:**

Find and replace (there are multiple instances):
- `CheckCircleIcon` → `CheckCircle`
- `DocumentTextIcon` → `FileText`
- `ServerIcon` → `Server`
- `WrenchScrewdriverIcon` → `Wrench`

**5c. Test and commit:**
```bash
# Test at http://localhost:3000
git add src/app/page.tsx
git commit -m "Migrate homepage from Heroicons to Lucide icons"
```

---

## Step 6: Navigation Components (Quick Wins)

All 5 navigation files use the same icons.

### Files:
- `/components/navbar-transparent.tsx`
- `/components/navbar-solid.tsx`
- `/components/navbar-light.tsx`
- `/components/navbar-new.tsx`
- `/components/navbar.tsx`

**6a. For each file, update imports:**
```tsx
// OLD (most files):
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

// NEW:
import { Menu, X, ChevronDown } from 'lucide-react'

// For navbar.tsx specifically:
// OLD:
import { Bars2Icon } from '@heroicons/react/24/solid'
// NEW:
import { Menu } from 'lucide-react'
```

**6b. Replace all instances:**
- `Bars3Icon` or `Bars2Icon` → `Menu`
- `XMarkIcon` → `X`
- `ChevronDownIcon` → `ChevronDown`

**6c. Test and commit:**
```bash
# Test navigation on multiple pages
git add src/components/navbar-*.tsx
git commit -m "Migrate navigation components from Heroicons to Lucide"
```

---

## Step 7: Carousel Components (Quick Wins)

All 3 carousel files use the same icons.

### Files:
- `/components/ThreeImageCarousel.tsx`
- `/components/SmoothCarousel.tsx`
- `/components/ImageCarousel.tsx`

**7a. For each file, update imports:**
```tsx
// OLD:
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// NEW:
import { ChevronLeft, ChevronRight } from 'lucide-react'
```

**7b. Replace all instances:**
- `ChevronLeftIcon` → `ChevronLeft`
- `ChevronRightIcon` → `ChevronRight`

**7c. Test and commit:**
```bash
# Test pages with carousels
git add src/components/*Carousel.tsx
git commit -m "Migrate carousel components from Heroicons to Lucide"
```

---

## Progress Tracking

After completing each step, mark it done:

- [ ] Step 1: Waitlist page emojis
- [ ] Step 2: Contact page emojis
- [ ] Step 3: Side-by-side component
- [ ] Step 4: Pricing page
- [ ] Step 5: Homepage
- [ ] Step 6: Navigation components (5 files)
- [ ] Step 7: Carousel components (3 files)

---

## After Quick Start (Days 2-3)

Continue with the remaining files following ICON_MIGRATION_QUICK_REFERENCE.md:

**Remaining Components:**
- feature-grid.tsx
- resource-cards.tsx
- pricing-table.tsx
- hero components (3 files)
- bento-grid.tsx
- testimonials.tsx
- linked-avatars.tsx

**Remaining Pages:**
- Solution pages (3 files)
- Product pages (4 files)
- Other pages (design, training, login, color-demo)

**Final Cleanup:**
- Remove @heroicons/react from package.json
- Run full test suite
- Update ACTION_REGISTER.md

---

## Common Issues

### Issue: Icon size looks wrong
**Solution:** Emojis used `text-2xl` or `text-3xl`. Lucide uses `h-X w-X`:
- `text-2xl` → `h-6 w-6` or `h-8 w-8`
- `text-3xl` → `h-8 w-8` or `h-10 w-10`

### Issue: Icon color not showing
**Solution:** Make sure to add color class or inline style:
```tsx
<Icon className="h-6 w-6 text-sea-teal" />
// or
<Icon className="h-6 w-6" style={{ color: '#0891B2' }} />
```

### Issue: Icon not centered in container
**Solution:** Remove text size classes from parent div:
```tsx
// OLD:
<div className="text-3xl mb-3">{emoji}</div>

// NEW:
<div className="mb-3">{<Icon className="h-8 w-8" />}</div>
```

### Issue: Inline text icons misaligned
**Solution:** Add `inline` class and vertical alignment:
```tsx
<Check className="h-4 w-4 inline align-text-bottom mr-1" />
```

---

## Testing Checklist Per File

Before committing each file:
- [ ] Visual appearance matches original
- [ ] Icons are the right size
- [ ] Icons have the right color
- [ ] Icons are properly aligned
- [ ] Mobile view looks correct
- [ ] No console errors
- [ ] Old imports removed

---

## Quick Commands

```bash
# Start dev server
cd "/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website"
npm run dev

# Check for remaining emojis
grep -r "📋\|📱\|📡\|⚙️\|✓\|✅\|📊\|🇬🇧\|📝\|😰\|⚡\|🌊\|🎁\|✨" src/

# Check for Heroicons imports
grep -r "@heroicons/react" src/ --include="*.tsx"

# Run type check
npm run type-check

# Run build
npm run build
```

---

## Need Help?

Reference these documents:
- **ICON_MIGRATION_QUICK_REFERENCE.md** - Icon mapping tables
- **ICON_MIGRATION_VISUAL_GUIDE.md** - Before/after examples
- **ICON_MIGRATION_PLAN.md** - Complete documentation

---

**Ready to start?** Begin with Step 1 (Waitlist Page) above!
