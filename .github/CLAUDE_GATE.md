# 🚦 STOP: Read This Before Coding (Web Anchor Mode v1.1)

## Required Reading Order
You MUST open and read these files BEFORE making any changes:

1. **`WEB_ANCHOR_MODE.md`** - The complete rulebook
   - Design tokens and colors (no hex!)
   - Component patterns
   - Billing architecture
   - One-write pattern for forms

2. **`ops/ANCHORS.yml`** - The enforcement manifest
   - Which files trigger which updates
   - What must exist
   - What patterns are forbidden

3. **`src/content/strings.ts`** - All UI copy lives here
   - Never hardcode strings in components
   - Always import from `copy` object

4. **`tailwind.config.ts`** - Design tokens only
   - Use `text-token-navy` not `text-[#0E1A2B]`
   - Use `bg-token-sea-teal` not `bg-[#0891B2]`

5. **Barrel exports** - Export everything properly
   - `src/components/primitives/index.ts`
   - `src/lib/actions/index.ts`
   - `src/lib/services/index.ts`

## Pre-Flight Checklist
Before starting ANY task:

```bash
# 1. Check current anchor compliance
pnpm check:anchors

# 2. Check for hex colors
pnpm check:hex

# 3. Run type checking
pnpm typecheck
```

## Golden Rules

### ✅ ALWAYS DO
- Use design tokens from tailwind.config.ts
- Put all copy in content/strings.ts
- Export new components in barrel files
- Follow one-write pattern for forms
- Update WEB_ANCHOR_MODE.md when adding patterns
- Keep components < 200 lines
- Keep pages < 300 lines

### ❌ NEVER DO
- Use raw hex colors (#0891B2)
- Hardcode strings in components
- Create forms without server actions
- Skip barrel exports
- Use console.log in production
- Access Stripe SDK in components
- Create files outside allowed directories

## If You're Adding...

### A New Component
1. Check if pattern exists in `src/components/primitives/`
2. Add copy to `src/content/strings.ts`
3. Export from `src/components/primitives/index.ts`
4. Use only design tokens

### A New Form
1. Create server action in `src/lib/actions/`
2. Create service wrapper in `src/lib/services/`
3. Export both in barrel files
4. Follow one-write pattern (single DB operation)
5. Update `WEB_ANCHOR_MODE.md` with pattern

### Billing/Pricing Changes
1. Update `src/lib/entitlements.ts` for plan changes
2. Verify webhook signature handling
3. Test with Stripe CLI
4. Update `WEB_ANCHOR_MODE.md` billing section

### New Pages
1. Use correct route group: `(marketing)`, `(account)`, `(auth)`
2. Import copy from `src/content/strings.ts`
3. Keep under 300 lines
4. Use existing components from primitives

## Testing Requirements

### Local Testing
```bash
# Run all checks
pnpm check:anchors && pnpm check:hex && pnpm typecheck && pnpm lint

# Test billing (if changed)
stripe listen --forward-to localhost:3001/api/webhooks/stripe

# Check accessibility
pnpm ci:quality
```

### Before Committing
1. Run `pnpm check:anchors` - MUST PASS
2. Complete PR template checklist
3. Verify no console.logs
4. Ensure all exports in barrel files

## Common Violations & Fixes

| Violation | Fix |
|-----------|-----|
| Raw hex color `#0891B2` | Use `text-token-sea-teal` |
| Hardcoded string in component | Move to `content/strings.ts` |
| Missing barrel export | Add to relevant `index.ts` |
| File too large (>200 lines) | Extract into smaller components |
| Form without server action | Create action in `lib/actions/` |
| Console.log in code | Remove or use proper logging service |

## Emergency Rollback

If billing breaks:
1. Set `ENABLE_BILLING=false` in `.env`
2. Deploy immediately
3. All billing UI will hide
4. Fix issue with Stripe CLI testing

## Questions?

- Architecture: See `WEB_ANCHOR_MODE.md`
- Rules: See `ops/ANCHORS.yml`
- Billing: See billing section in `WEB_ANCHOR_MODE.md`
- Testing: Run `pnpm check:anchors` for immediate feedback

---

**Remember**: The anchor linter will BLOCK your PR if you violate these rules.
Better to check early and often with `pnpm check:anchors`!