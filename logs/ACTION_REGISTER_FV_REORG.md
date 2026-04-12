# FV Tools Reorganization - 2026-03-23

## Summary

Reorganized Fishing Vessel tools to new URL structure and removed hardcoded vessel size filtering workaround. The regulations engine now handles all vessel size logic via proper gate expressions.

## Files Created

- `/src/app/tools/fv-crew-checker/page.tsx` - New location for FV crew checker form
- `/src/app/tools/fv-crew-checker/results/page.tsx` - New location for results page
- `/src/app/api/fv-crew-check/route.ts` - New API route without hardcoded filtering

## Files Modified

- `/src/app/tools/page.tsx` - Updated tool card to point to `/tools/fv-crew-checker`
- `/src/app/tools/fv-crew-checker/results/page.tsx` - Added engineer role support

## Files To Remove (Old Structure)

- `/src/app/tools/fishing-vessel/crew-checker/` - Replaced by `/tools/fv-crew-checker/`
- `/src/app/api/fishing-vessel/crew-check/` - Replaced by `/api/fv-crew-check/`

## Key Changes

### 1. Removed Hardcoded Vessel Size Filtering

**Before:**
```typescript
// BUGFIX: Exclude "Under 16.5m Skipper Certificate" items for vessels ≥16.5m
const loa = vesselInput.lengthOverall || 0;
if (loa >= 16.5) {
  crewItems = crewItems.filter((item: any) => {
    if (item.subcategory === 'skipper_certificate' &&
        (item.id === 'fv.crew.doc.skipper.20mile' || item.id === 'fv.crew.doc.skipper.beyond20')) {
      return false;
    }
    return true;
  });
}
```

**After:**
```typescript
// NOTE: Vessel size filtering is now handled by gate expressions in the engine
// The engine automatically includes/excludes skipper certs based on vessel size:
// - Under 16.5m RL: Shows voluntary "Under 16.5m Skipper Certificate" items
// - 16.5m-24m RL: Shows mandatory "Class 2 Deck Officer CoC"
// - 24m+ RL: Shows mandatory "Class 1 Deck Officer CoC"
// No additional filtering needed here.
```

The engine data was updated with proper gate expressions:
- Old: `"gate": "isFishing"`
- New: `"gate": "isFishing & loaLT:16.5"` for voluntary skipper certs
- New: `"gate": "isFishing & rlGTE:16.5 & rlLT:24"` for Class 2 CoC
- New: `"gate": "isFishing & rlGTE:24"` for Class 1 CoC

### 2. Added Engineer Role Support

Added filtering for `engineer` role in API route:
```typescript
const crewItems = allClassified.filter((item: any) =>
  ['all_crew', 'new_entrant', 'experienced_crew', 'skipper', 'engineer'].includes(item.appliesTo)
);
```

Added engineer section in results page:
```typescript
{renderRoleSection(
  'engineer',
  'Engineer Officer Requirements',
  'Qualifications required for vessels with 750kW+ propulsive power',
  DocumentCheckIcon
)}
```

Engineer CoCs automatically appear only for vessels with 750kW+ engines (gate: `isFishing & enginePowerGTE:750kW`).

### 3. Reorganized URL Structure

**Old Structure:**
- `/tools/fishing-vessel/crew-checker/`
- `/tools/fishing-vessel/crew-checker/results`
- `/api/fishing-vessel/crew-check`

**New Structure:**
- `/tools/fv-crew-checker/`
- `/tools/fv-crew-checker/results`
- `/api/fv-crew-check`

Cleaner, shorter URLs following the pattern suggested in WEB-ORCHESTRATOR-HANDOFF.md.

### 4. Updated Tool Card

Changed from:
- Name: "Fishing Vessel Crew Requirements"
- Badge: "Free Tool - NEW!"

To:
- Name: "FV Crew Requirements Checker"
- Badge: "Free Tool"
- Features updated to mention "Skipper/Master & Engineer CoCs"

## Testing Results

All vessel sizes now return correct requirements:

### Small Vessel (<16.5m RL)
```json
{
  "size": "<16.5m",
  "skipperItems": [
    {"name": "Under 16.5m Skipper Certificate (up to 20 miles)", "mandatory": false},
    {"name": "Under 16.5m Skipper Certificate (beyond 20 miles)", "mandatory": false}
  ]
}
```

### Medium Vessel (16.5-24m RL)
```json
{
  "size": "16.5-24m",
  "skipperItems": [
    {"name": "Deck Officer Class 2 (Fishing Vessel) Certificate of Competency", "mandatory": true}
  ]
}
```

### Large Vessel (24m+ RL)
```json
{
  "size": "24m+",
  "skipperItems": [
    {"name": "Deck Officer Class 1 (Fishing Vessel) Certificate of Competency", "mandatory": true}
  ]
}
```

### High Power Vessel (750kW+)
```json
{
  "power": "800kW",
  "engineerItems": [
    {"name": "Engineer Officer Class 1 (Fishing Vessel) Certificate of Competency", "mandatory": true},
    {"name": "Engineer Officer Class 2 (Fishing Vessel) Certificate of Competency", "mandatory": true}
  ]
}
```

## Architecture Decision

**Why remove the workaround?**

The original API filtering was a **temporary workaround** for incorrect gate expressions in the engine data. Now that the engine data has been corrected with proper vessel size checks in the gate expressions, the workaround is no longer needed and should be removed to:

1. **Trust the engine** - Let the regulations engine do what it's designed to do
2. **Reduce maintenance** - No need to maintain filtering logic in multiple places
3. **Enable future tools** - Equipment checker, maintenance planner, etc. will all benefit from correct gates
4. **Simplify code** - Cleaner API route without special-case logic

## Next Steps

Optional cleanup:
- Delete old `/tools/fishing-vessel/` directory
- Delete old `/api/fishing-vessel/` directory

These can be removed once confirmed the new structure is working correctly.
