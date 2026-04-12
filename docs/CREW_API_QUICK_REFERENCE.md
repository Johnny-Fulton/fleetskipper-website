# Crew API Quick Reference

## Endpoint
```
POST http://localhost:3002/api/crew/check
```

## Minimal Request
```json
{
  "vesselName": "MV Test",
  "vesselType": "workboat",
  "category": "cat3",
  "lengthOverall": 12,
  "grossTonnage": 15,
  "maxPersons": 8,
  "propulsionConfiguration": "diesel_inboard_below",
  "enginePowerKW": 250,
  "crewCount": 2
}
```

## Full Request Example
```json
{
  "vesselName": "MV Sea Worker",
  "vesselType": "workboat",
  "category": "cat3",
  "lengthOverall": 15.5,
  "grossTonnage": 25,
  "maxPersons": 12,
  "propulsionConfiguration": "diesel_inboard_below",
  "enginePowerKW": 400,
  "crewCount": 3,
  "internationalVoyages": false,
  "operations": ["towing_operations", "lifting_operations"],
  "hasRadar": true,
  "hasElectronicCharts": true,
  "hasStabilityBooklet": true,
  "crewPreparesFood": false,
  "isOpenBoat": false,
  "operatesAtNight": true
}
```

## Response Structure
```json
{
  "success": true,
  "data": {
    "masterQualifications": { ... },
    "secondPerson": { ... },
    "engineeringQualifications": { ... },
    "mandatoryTraining": [ ... ],
    "medicalFitness": { ... },
    "summary": {
      "totalRequirements": 12,
      "mandatoryCount": 10,
      "recommendedCount": 2
    }
  },
  "warnings": []
}
```

## Test
```bash
npm run dev
node test-crew-api.js
```

## Files
- **Route**: `/src/app/api/crew/check/route.ts`
- **Test**: `/test-crew-api.js`
- **Docs**: `/docs/API_CREW_CHECK.md`
- **Package**: `/Users/jonathanfulton/REGULATION APP/SeaReady/products/wbc3-crew-checker/`
