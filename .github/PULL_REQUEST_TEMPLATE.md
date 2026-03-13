## Summary
<!-- What changed and why? Keep it short. -->

## Web Anchor Mode Checklist

### Pre-flight checks
- [ ] Ran `pnpm check:anchors` - all anchor rules pass
- [ ] Ran `pnpm check:hex` - no raw hex colors found
- [ ] Ran `pnpm typecheck` - TypeScript passes
- [ ] Ran `pnpm lint` - ESLint passes

### Core principles
- [ ] No raw hex colors (tokens only from `tailwind.config.ts`)
- [ ] All copy from `src/content/strings.ts` (no inline long strings)
- [ ] One-write rule for any new forms (server action → services)
- [ ] Component files < 200 lines, Page files < 300 lines

### Required anchor updates
Check which anchors need updating based on your changes:

#### If you changed UI/Components:
- [ ] Updated `src/content/strings.ts` with new copy
- [ ] Exported new primitives in `src/components/primitives/index.ts`

#### If you added forms/IO:
- [ ] Created server action in `src/lib/actions/`
- [ ] Created service wrapper in `src/lib/services/`
- [ ] Exported in barrel files (`index.ts`)
- [ ] Updated `WEB_ANCHOR_MODE.md` with pattern

#### If you changed billing/pricing:
- [ ] Updated `src/lib/entitlements.ts` if plans changed
- [ ] Updated `WEB_ANCHOR_MODE.md` billing section
- [ ] Verified webhook signature handling

#### If you changed design tokens:
- [ ] Updated `tailwind.config.ts` 
- [ ] Updated token table in `WEB_ANCHOR_MODE.md`

## Testing
- [ ] Tested locally at http://localhost:3001
- [ ] Verified billing flow (if applicable)
- [ ] Lighthouse accessibility ≥ 95 on affected pages

## Security
- [ ] No secrets/keys in code
- [ ] Webhook signatures verified (if applicable)
- [ ] Auth checks in place (if applicable)

## Breaking Changes
<!-- List any breaking changes or migration steps needed -->

## Related Issues
<!-- Link to related GitHub issues -->
Closes #