import { NextResponse } from 'next/server';

// Import the WBC3 Crew Certification Checker engine
// @ts-ignore - JavaScript module
import { checkCrewRequirements } from '@/lib/crew-checker/index.js';

/**
 * POST /api/crew/check
 *
 * Check crew certification requirements against WBC3.
 *
 * Request body: Vessel input object with the following fields:
 *
 * Required fields:
 * - vesselName (string)
 * - vesselType (string: 'workboat' | 'pilot' | 'tug' | 'police' | 'safety_standby' | 'non_self_propelled')
 * - category (string: 'cat0' | 'cat1' | 'cat2' | 'cat3' | 'cat4' | 'cat5' | 'cat6')
 * - lengthOverall (number: 1-100 metres)
 * - grossTonnage (number: 0-3000 GT)
 * - maxPersons (number: 0-500)
 * - propulsionConfiguration (string: 'diesel_inboard_below' | 'diesel_inboard_above' | 'diesel_outboard' | 'petrol_outboard' | 'battery_inboard' | 'hybrid_inboard_below')
 * - enginePowerKW (number: 1-10000 kW)
 * - crewCount (number: 1-100)
 *
 * Optional fields (defaults):
 * - internationalVoyages (boolean, default: false)
 * - operations (array of strings, default: [])
 * - hasRadar (boolean, default: false)
 * - hasElectronicCharts (boolean, default: false)
 * - hasStabilityBooklet (boolean, default: false)
 * - crewPreparesFood (boolean, default: false)
 * - isOpenBoat (boolean, default: false)
 * - operatesAtNight (boolean, default: false)
 * - maxSpeed (number, optional - only if 'high_speed_ops' in operations)
 *
 * Response on success:
 * {
 *   success: true,
 *   data: {
 *     _meta: { engineVersion, wbc3Edition, generatedAt, vesselSummary },
 *     masterQualifications: { acceptableCertificates, reasoning },
 *     secondPerson: { required, reasoning },
 *     engineeringQualifications: { acceptableCertificates, generalRequirement, reasoning },
 *     mandatoryTraining: [ { name, description, mandatory, regulation } ],
 *     medicalFitness: { certificateType, mandatory, reasoning },
 *     specialOperations: [ { operation, requirements, mandatory } ],
 *     singleHanded: { allowed, mandatoryRequirements, reasoning },
 *     policeBoatManning: { alternatives, reasoning },
 *     manningDocuments: [ { document, mandatory, reasoning } ],
 *     summary: { totalRequirements, mandatoryCount, recommendedCount, byCategory }
 *   },
 *   warnings: []
 * }
 *
 * Response on validation error:
 * {
 *   success: false,
 *   errors: [ { field, message } ],
 *   warnings: []
 * }
 */
export async function POST(request: Request) {
  try {
    // Parse the request body
    const vesselInput = await request.json();

    // Validate that we have at least some input
    if (!vesselInput || typeof vesselInput !== 'object') {
      return NextResponse.json(
        {
          success: false,
          errors: [{ message: 'Request body must be a valid JSON object' }],
          warnings: [],
        },
        { status: 400 }
      );
    }

    // Run the WBC3 crew certification checker
    const result = checkCrewRequirements(vesselInput);

    // If validation failed, return 400 Bad Request
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    // Success - return 200 OK with the crew requirements
    return NextResponse.json(result);
  } catch (error) {
    // Log the error for debugging
    console.error('Crew Check Error:', error);

    // Return 500 Internal Server Error
    return NextResponse.json(
      {
        success: false,
        errors: [
          {
            message: 'Internal server error processing crew requirements',
            details: error instanceof Error ? error.message : 'Unknown error',
          },
        ],
        warnings: [],
      },
      { status: 500 }
    );
  }
}
