# FV Engine Update Verification - 2026-03-23

## Engine Updates Applied

The FV requirements checker engine data has been updated with critical medical certificate changes:

### 1. **ML5 Certificate Gating for 24m+ Vessels**

**Change:** ML5 certificate and ML5 renewal are now gated to vessels under 24m RL only.

**Before:**
- `fv.med.doc.ml5`: `"gate": "isFishing"` (appeared for all vessels)
- `fv.med.maint.ml5.renewal`: `"gate": "isFishing"` (appeared for all vessels)

**After:**
- `fv.med.doc.ml5`: `"gate": "isFishing & rlLT:24"` (only vessels <24m RL)
- `fv.med.maint.ml5.renewal`: `"gate": "isFishing & rlLT:24"` (only vessels <24m RL)

**Reason:** Per MSN 1883 3.1, ML5 is not valid for vessels 24m+ RL. Only ENG1 is accepted.

### 2. **Updated ENG1/ML5 Descriptions**

**Change:** Removed incorrect "For <15m vessels:" text and replaced with accurate regulatory triggers.

**ENG1 notes now state:**
> "Required for: >24m vessels, >72hrs at sea, >200nm from UK, foreign port inspection, or CoC holder >=16.5m. Alternative: ML5"

**ML5 notes now state:**
> "Alternative to ENG1 for: <24m vessels, <=72hrs at sea, <=200nm from UK, no foreign port inspection"

### 3. **UI Handling for Alternative Groups**

When only one item remains in an alternative group (e.g., ENG1 only for 24m+ vessels):
- The amber "Choose ONE of the following" box should NOT appear
- The single item displays as a standalone requirement
- This is automatically handled by the `groupAlternatives()` function in the results page

## Verification Testing

### Test 1: Vessel Under 24m RL (18m)

**Input:**
```json
{
  "registeredLength": 18,
  "lengthOverall": 19.5,
  "enginePowerKW": 400
}
```

**Result:**
```json
{
  "msnTier": "MSN_1872",
  "medicalItems": [
    {"name": "ENG1 Medical Fitness Certificate", "mandatory": true},
    {"name": "ML5 Medical Fitness Certificate", "mandatory": true},
    {"name": "Medical Condition Reporting", "mandatory": true},
    {"name": "ENG1 Medical Renewal", "mandatory": true},
    {"name": "ML5 Medical Renewal", "mandatory": true}
  ]
}
```

✅ **PASS** - Both ENG1 and ML5 appear (choose one), both renewals appear

### Test 2: Vessel 24m+ RL (30m)

**Input:**
```json
{
  "registeredLength": 30,
  "lengthOverall": 32,
  "enginePowerKW": 800
}
```

**Result:**
```json
{
  "msnTier": "MSN_1873",
  "totalCrew": 13,
  "medicalItems": [
    {"name": "ENG1 Medical Fitness Certificate", "mandatory": true},
    {"name": "Medical Condition Reporting", "mandatory": true},
    {"name": "ENG1 Medical Renewal", "mandatory": true}
  ]
}
```

✅ **PASS** - Only ENG1 appears (ML5 correctly excluded), only ENG1 Renewal appears

### Test 3: Complete Breakdown for 30m Vessel

**Crew Requirements (13 total):**
- ✅ 5 mandatory training (Sea Survival, Fire Fighting, First Aid, H&S, Safety Awareness)
- ✅ 1 skipper cert (Class 1 Deck Officer CoC - MANDATORY)
- ✅ 2 engineer certs (Class 1 & Class 2 Engineer CoCs - MANDATORY, 750kW+)
- ✅ 2 medical fitness (ENG1 + Condition Reporting, no ML5)
- ✅ 1 medical renewal (ENG1 Renewal only, no ML5)
- ✅ 2 ID cards (Seafish cards - RECOMMENDED)

## UI Impact

### Alternative Group Rendering

The `groupAlternatives()` function in the results page already handles this correctly:

**Vessels <24m RL:**
```
┌─────────────────────────────────────────────┐
│ ⚠️ Choose ONE of the following:            │
│                                             │
│  □ ENG1 Medical Fitness Certificate        │
│  □ ML5 Medical Fitness Certificate         │
└─────────────────────────────────────────────┘
```

**Vessels ≥24m RL:**
```
┌─────────────────────────────────────────────┐
│ ✓ ENG1 Medical Fitness Certificate         │
│   [+ More info]                             │
└─────────────────────────────────────────────┘
```

No "Choose ONE" box appears because there's only one item in the alternative group.

## Summary

All gate expression updates are working correctly:

| Vessel Size | Skipper Certs | Medical Certs | Engineer Certs |
|------------|---------------|---------------|----------------|
| <16.5m RL | 2 voluntary | ENG1 **or** ML5 | None |
| 16.5-24m RL, <750kW | Class 2 CoC (mandatory) | ENG1 **or** ML5 | None |
| 16.5-24m RL, ≥750kW | Class 2 CoC (mandatory) | ENG1 **or** ML5 | Class 1 & 2 CoCs (mandatory) |
| 24m+ RL, ≥750kW | Class 1 CoC (mandatory) | **ENG1 only** | Class 1 & 2 CoCs (mandatory) |

**Key Takeaway:** The engine now correctly handles all vessel size and power-based requirements via gate expressions. No hardcoded filtering is needed in the API or UI layers.
