# WEB ANCHOR MODE (v1.3)

**Why**  
Prevent drift. Keep styles, copy, I/O, and billing consistent so we can add features without refactors.

## Hard Guardrails

1. **Tokens only**: Colors, sizes, fonts live in `tailwind.config.ts`. No raw hex/classes in components.
   - ❌ `bg-[#0E1A2B]` 
   - ✅ `bg-navy`

2. **One pattern per component**:
   - `<Button variant="primary|secondary|ghost|outline" size="sm|md|lg" />`
   - `<FeatureCard dark={true} eyebrow title description />`
   - `<SectionHeader eyebrow title subtitle dark centered />`

3. **Single write per submit**: Forms call `lib/actions/*`, which call `lib/services/*`.
   - Forms → Server Actions → Service Layer → External APIs
   - One database write per user action
   - Idempotent operations (safe to retry)

4. **Copy centralized**: All strings in `content/strings.ts`.
   - No hardcoded strings in components
   - Easy A/B testing and internationalization

5. **App Router**: Pages under `app/(group)/*`.
   - Marketing pages: `app/(marketing)/features/page.tsx`
   - Auth pages: `app/(auth)/login/page.tsx`
   - Account pages: `app/(account)/billing/page.tsx`

6. **File size ceilings**: 
   - Components ≤ 200 lines
   - Pages ≤ 300 lines
   - Extract when approaching limits

7. **Feature flags**: `lib/flags.ts`
   - Test features safely: `if (featureFlags.billing())`
   - Rollback without code changes

8. **Accessibility**: 
   - Focus-visible rings on all interactive elements
   - Proper ARIA labels/roles
   - 4.5:1 contrast minimum
   - Lighthouse A11y ≥ 95

## Billing Architecture

### Core Principles
- **Website owns billing**: All Stripe integration lives here
- **App is dumb consumer**: App only reads entitlements via API
- **One-write pattern**: Webhook → Database in single atomic operation
- **Idempotency**: All operations safe to retry (use Stripe's idempotency keys)

### Billing Flow
```
User → Pricing Page → Checkout (Server Action) → Stripe
         ↓
Stripe Webhook → Verify Signature → ONE WRITE to DB
         ↓
App → GET /api/entitlements → Read subscription state
```

### Key Files
```
lib/
  entitlements.ts       # Plan definitions, feature gates
  services/
    billing.ts          # Stripe wrapper (no SDK in components)
  actions/
    createCheckout.ts   # Server action for checkout
    createPortal.ts     # Server action for customer portal
app/
  api/
    webhooks/stripe/    # Webhook handler (ONE WRITE)
    entitlements/       # API for app to check access
  (account)/
    billing/page.tsx    # Customer billing page
```

### Environment Variables
```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER_MONTHLY=price_...
STRIPE_PRICE_FLEET_MONTHLY=price_...

# Feature Flags  
ENABLE_BILLING=true
```

### Security Checklist
- ✅ Webhook signature verification
- ✅ Idempotency keys on Stripe operations
- ✅ Auth required for billing pages
- ✅ VAT/tax collection enabled
- ✅ Feature flag for rollback

## Folder Map

```
src/
  app/
    (marketing)/
      layout.tsx          # Marketing layout
      page.tsx            # Homepage
      features/page.tsx
      pricing/page.tsx
      compliance/page.tsx
    (account)/
      layout.tsx          # Account layout (auth required)
      account/
        billing/page.tsx  # Subscription management
    api/
      webhooks/
        stripe/route.ts   # Stripe webhook handler
      entitlements/route.ts # App entitlements API
  components/
    primitives/           # Core reusable components
      Button.tsx
      Card.tsx
      SectionHeader.tsx
      FeatureCard.tsx
    layout/              # Layout components
      Header.tsx
      Footer.tsx
  content/
    strings.ts           # All copy constants
    faq.ts              # FAQ content
  lib/
    entitlements.ts     # Plan definitions & limits
    actions/            # Server actions (one-write pattern)
      createCheckout.ts
      createPortal.ts
    services/           # External service wrappers
      billing.ts        # Stripe abstraction
      email.ts          # Email provider abstraction
      db.ts             # Database abstraction
    flags.ts            # Feature flags
    analytics.ts        # Analytics abstraction
  styles/
    tailwind.css        # Global styles
```

## Color Tokens

| Raw Hex   | Token Name      | Usage                |
|-----------|----------------|----------------------|
| #0E1A2B   | `navy`         | Primary dark bg      |
| #13263F   | `navy-light`   | Secondary dark bg    |
| #0891B2   | `sea-teal`     | Primary accent       |
| #F97316   | `brand-orange` | CTA buttons          |
| #0B132B   | `ink`          | Dark text            |

### Token Usage Complete ✅
- All primary UI colors converted to tokens
- Decorative gradients isolated in `src/styles/gradients.css` (v1.3 exception)
- Gradient tokens available in `tailwind.config.ts` as `bg-gradient-*`
- Pre-commit check prevents new hex colors outside gradients file

## Component Patterns

### Buttons
```tsx
<Button variant="primary" size="md">Request demo</Button>
```
- Variants: `primary | secondary | ghost | outline`
- Sizes: `sm | md | lg`

### Cards
```tsx
<FeatureCard 
  dark 
  eyebrow="Drills & Training" 
  title="Log all safety drills"
  description="Fire, MOB, abandon ship..."
/>
```

### Section Headers
```tsx
<SectionHeader
  eyebrow="How it works"
  title="Your complete SMS in 30 minutes"
  subtitle="No consultants. No waiting."
  dark={false}
  centered={true}
/>
```

## Copy Management

All copy lives in `content/strings.ts`:
```ts
import { copy } from '@/content/strings';

// In component:
<h1>{copy.hero.h1}</h1>
<p>{copy.hero.sub}</p>
```

## Form Pattern

```tsx
// Component
import { submitContact } from '@/lib/actions/submitContact';

<form action={submitContact}>
  {/* fields */}
</form>

// Action (one-write rule)
export async function submitContact(formData: FormData) {
  const dto = validate(formData);           // Zod validation
  const result = await saveLead(dto);       // ONE database write
  await sendEmail(dto);                     // Async notifications
  return { success: true };
}
```

## Database Schema (Minimum Viable)

```sql
-- Users & Organizations
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orgs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  org_id UUID REFERENCES orgs(id),
  role TEXT CHECK (role IN ('owner', 'admin', 'member')),
  UNIQUE(user_id, org_id)
);

-- Billing
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES orgs(id),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status TEXT CHECK (status IN ('trialing','active','past_due','canceled','incomplete','incomplete_expired','unpaid','paused')),
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  trial_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_org_id ON subscriptions(org_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

## Quality Gates

### ESLint Rules
- No console.log in production
- Max file sizes enforced
- Unused imports removed
- No raw hex colors

### CI Checks
```bash
npm run ci:quality
npm run check:hex     # Prevent hex colors
```
- TypeScript strict mode
- ESLint pass required
- Lighthouse scores:
  - Performance ≥ 90
  - Accessibility ≥ 95
  - SEO ≥ 95

## Testing Checklist

### Billing Tests
1. **Happy path**: Checkout → Payment → Active subscription
2. **Card failure**: Checkout → Failed payment → past_due status
3. **Cancel**: Portal → Cancel → subscription ends at period_end
4. **Upgrade/Downgrade**: Portal → Change plan → new entitlements
5. **Idempotency**: Replay webhook → no duplicate writes

### App Integration Test
```bash
# From app, call website API
curl http://localhost:3001/api/entitlements?orgId=test
# Should return: { status, planKey, limits, features }
```

## Migration Path

When adding new features:
1. Check if pattern exists in primitives
2. Use centralized copy from strings.ts
3. Follow one-write pattern for forms
4. Add feature flag if experimental
5. Keep files under size limits
6. Run quality checks before commit

## Governance

**All changes must pass `scripts/check-anchors.mjs` before commit.**

The anchor linter enforces:
- UI changes require updates to `content/strings.ts` and barrel exports
- Billing changes require updates to `lib/entitlements.ts` and this document
- Token changes require updates to this document
- No raw hex colors (except in `src/styles/gradients.css`)
- No console.logs in any files
- No files over size limits
- GitHub Actions CI runs on every PR

See `ops/ANCHORS.yml` for the complete rule manifest. This is the single source of truth for what must be checked/updated on any change.

### v1.3 Changes
- Decorative gradients exception: hex allowed only in `src/styles/gradients.css`
- Added gradient tokens to `tailwind.config.ts` (`bg-gradient-hero`, etc.)
- GitHub Actions CI workflow enforces all checks on PRs
- Lighthouse budget enforces performance standards

### Quick Commands
```bash
# Run all anchor checks
npm run check:anchors

# Check for hex colors
npm run check:hex

# Run everything
npm run check:all
```

### Before Any Work
1. Read `.github/CLAUDE_GATE.md` for the complete checklist
2. Check `ops/ANCHORS.yml` for current rules
3. Run `npm run check:anchors` to verify compliance

## Team Agreement

By working on this codebase, you agree to:
- ✅ Use tokens, never raw values
- ✅ Centralize all copy
- ✅ Follow component patterns
- ✅ One write per user action
- ✅ Test with feature flags
- ✅ Maintain accessibility standards
- ✅ Verify webhook signatures
- ✅ Use idempotency keys
- ✅ Pass anchor linter checks
- ❌ No console.logs in production
- ❌ No files over size limits
- ❌ No inline styles or colors
- ❌ No Stripe SDK in components
- ❌ No commits without passing `check:anchors`