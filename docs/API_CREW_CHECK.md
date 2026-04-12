# Crew Certification Checker API

## Endpoint

```
POST /api/crew/check
```

## Description

This endpoint wraps the WBC3 Crew Certification Checker engine to determine master qualifications, engineering requirements, mandatory training, and medical fitness certificates for UK workboat crew under Workboat Code Edition 3.

## Package Location

The checker engine is located at:
```
/Users/jonathanfulton/REGULATION APP/SeaReady/products/wbc3-crew-checker/
```

## Request

### Headers
```
Content-Type: application/json
```

### Body Schema

#### Required Fields

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| `vesselName` | string | - | Official name of the vessel |
| `vesselType` | enum | See below | Type of vessel |
| `category` | enum | `cat0` to `cat6` | Area category of operation |
| `lengthOverall` | number | 1-100 | Length overall in metres |
| `grossTonnage` | number | 0-3000 | Gross tonnage (GT) |
| `maxPersons` | number | 0-500 | Maximum persons on board |
| `propulsionConfiguration` | enum | See below | Propulsion type |
| `enginePowerKW` | number | 1-10000 | Total engine power in kW |
| `crewCount` | number | 1-100 | Number of crew members |

#### Vessel Types

- `workboat` - Workboat
- `pilot` - Pilot Boat
- `tug` - Tug
- `police` - Police Boat
- `safety_standby` - Safety/Standby Vessel
- `non_self_propelled` - Non-Self-Propelled Platform

#### Area Categories

- `cat0` - Category 0: Unrestricted
- `cat1` - Category 1: Up to 150nm from safe haven
- `cat2` - Category 2: Up to 60nm from safe haven
- `cat3` - Category 3: Up to 20nm from safe haven
- `cat4` - Category 4: Up to 20nm, daylight only
- `cat5` - Category 5: Up to 3nm, day and night
- `cat6` - Category 6: Up to 3nm, daylight only

#### Propulsion Configurations

- `diesel_inboard_below` - Diesel Inboard (below deck)
- `diesel_inboard_above` - Diesel Inboard (above deck)
- `diesel_outboard` - Diesel Outboard
- `petrol_outboard` - Petrol Outboard
- `battery_inboard` - Battery Electric
- `hybrid_inboard_below` - Hybrid (Diesel + Battery)

#### Optional Fields (Defaults)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `internationalVoyages` | boolean | `false` | Makes international voyages (affects medical certificate) |
| `operations` | string[] | `[]` | Array of operations (see below) |
| `hasRadar` | boolean | `false` | Radar equipment fitted |
| `hasElectronicCharts` | boolean | `false` | Electronic chart system fitted |
| `hasStabilityBooklet` | boolean | `false` | Stability information booklet required |
| `crewPreparesFood` | boolean | `false` | Crew prepares food on board |
| `isOpenBoat` | boolean | `false` | Open boat (no substantial enclosure) |
| `operatesAtNight` | boolean | `false` | Operates at night |
| `maxSpeed` | number | - | Maximum speed in knots (required if `high_speed_ops` in operations) |

#### Operations Array Values

- `towing_operations`
- `high_speed_ops` (>25 knots)
- `dangerous_goods`
- `mgo_supply`
- `pilot_transfer`
- `lifting_operations` (cargo >1000kg)
- `dive_support`
- `personnel_transfer`
- `patrol_operations`

### Example Request

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

## Response

### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "_meta": {
      "engineVersion": "1.0.0",
      "wbc3Edition": "3",
      "generatedAt": "2026-03-14T00:41:23.456Z",
      "vesselSummary": {
        "name": "MV Sea Worker",
        "type": "workboat",
        "category": "cat3",
        "lengthOverall": 15.5,
        "grossTonnage": 25,
        "enginePowerKW": 400,
        "crewCount": 3
      }
    },
    "masterQualifications": {
      "acceptableCertificates": [
        {
          "name": "Boatmaster's Licence (Workboat)",
          "level": "Category 3 or higher",
          "mandatory": true,
          "regulation": "Table 3.1"
        }
      ],
      "reasoning": "Cat 3 vessel requires Boatmaster's Licence appropriate to area category"
    },
    "secondPerson": {
      "required": true,
      "reasoning": "Second person required for vessels >12m with crew count >1"
    },
    "engineeringQualifications": {
      "acceptableCertificates": [
        {
          "name": "Engine Room Watchkeeper Certificate",
          "mandatory": true,
          "regulation": "Table 4.1"
        }
      ],
      "generalRequirement": "Power Vessel W classification: inboard engine with towing/lifting operations",
      "reasoning": "Inboard diesel engine below 1500kW requires designated engineering watch"
    },
    "mandatoryTraining": [
      {
        "name": "Elementary First Aid",
        "description": "MCA-approved elementary first aid course",
        "mandatory": true,
        "regulation": "4.5.1"
      },
      {
        "name": "Radar Observer Certificate",
        "description": "Required for vessels with radar - master and crew using radar",
        "mandatory": true,
        "regulation": "4.5.3"
      }
    ],
    "medicalFitness": {
      "certificateType": "ML5",
      "mandatory": true,
      "reasoning": "Domestic voyages: ML5 medical certificate required"
    },
    "specialOperations": [
      {
        "operation": "Towing Operations",
        "requirements": "Master must hold towing endorsement",
        "mandatory": true
      }
    ],
    "singleHanded": {
      "allowed": false,
      "mandatoryRequirements": [],
      "reasoning": "Vessel has crew count >1; single-handed operation not applicable"
    },
    "policeBoatManning": {
      "alternatives": [],
      "reasoning": "Not a police boat - Annex 3 alternatives not applicable"
    },
    "manningDocuments": [
      {
        "document": "Safe Manning Document",
        "mandatory": true,
        "reasoning": "Required for vessels >12m GT or carrying >12 passengers"
      }
    ],
    "summary": {
      "totalRequirements": 12,
      "mandatoryCount": 10,
      "recommendedCount": 2,
      "byCategory": {
        "masterQualifications": 1,
        "secondPerson": 1,
        "engineering": 2,
        "mandatoryTraining": 5,
        "medicalFitness": 1,
        "specialOperations": 1,
        "singleHanded": 0,
        "policeAlternatives": 0,
        "manningDocuments": 1
      }
    }
  },
  "warnings": []
}
```

### Validation Error Response (400 Bad Request)

```json
{
  "success": false,
  "errors": [
    {
      "field": "vesselType",
      "message": "Invalid vessel type. Must be one of: workboat, pilot, tug, police, safety_standby, non_self_propelled"
    },
    {
      "field": "lengthOverall",
      "message": "Length overall is required and must be between 1 and 100 metres"
    }
  ],
  "warnings": []
}
```

### Internal Server Error (500)

```json
{
  "success": false,
  "errors": [
    {
      "message": "Internal server error processing crew requirements",
      "details": "Detailed error message here"
    }
  ],
  "warnings": []
}
```

## Testing

### Using the Test Script

```bash
# Start the dev server
npm run dev

# In another terminal, run the test script
node test-crew-api.js
```

### Using cURL

```bash
curl -X POST http://localhost:3002/api/crew/check \
  -H "Content-Type: application/json" \
  -d '{
    "vesselName": "MV Test Boat",
    "vesselType": "workboat",
    "category": "cat3",
    "lengthOverall": 12,
    "grossTonnage": 15,
    "maxPersons": 8,
    "propulsionConfiguration": "diesel_inboard_below",
    "enginePowerKW": 250,
    "crewCount": 2,
    "hasRadar": true,
    "hasElectronicCharts": true
  }'
```

### Using Postman

1. Create a new POST request to `http://localhost:3002/api/crew/check`
2. Set header: `Content-Type: application/json`
3. Paste the example request body above
4. Click Send

## Error Handling

The API implements comprehensive error handling:

1. **Input Validation**: All required fields are validated according to the schema
2. **Type Checking**: Enums are validated against allowed values
3. **Range Validation**: Numeric fields are checked against min/max constraints
4. **Conditional Logic**: Fields like `maxSpeed` are validated based on other inputs
5. **Server Errors**: Caught and returned with appropriate status codes

## Integration Notes

1. The API route imports directly from the standalone crew-checker package
2. The crew-checker is a pure JavaScript module with no external dependencies
3. TypeScript interfaces can be generated from the input/output schemas
4. The route follows Next.js 15 App Router conventions
5. Responses are always JSON with appropriate HTTP status codes

## Related Endpoints

- `POST /api/wbc3/check` - Vessel requirements checker (equipment, documentation)
- `GET /api/wbc3/schema` - Get the vessel input schema
- `POST /api/wbc3/next-questions` - Progressive disclosure for questionnaires

## References

- WBC3 Crew Certification Checker: `/Users/jonathanfulton/REGULATION APP/SeaReady/products/wbc3-crew-checker/`
- Input Schema: `wbc3-crew-checker/src/schema/inputSchema.js`
- Crew Engine: `wbc3-crew-checker/src/engine/crewEngine.js`
