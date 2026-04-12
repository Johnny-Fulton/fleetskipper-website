import { NextResponse } from 'next/server';

// Import the WBC3 checker engine
// @ts-ignore - JavaScript module
import { checkVesselRequirements } from '@/lib/wbc3-checker/index.js';

/**
 * POST /api/wbc3/check
 *
 * Check vessel requirements against WBC3.
 *
 * Request body: Vessel input object (see inputSchema.js for field definitions)
 * Response: { success: boolean, data?: Object, warnings?: Array, errors?: Array }
 */
export async function POST(request: Request) {
  try {
    const vesselInput = await request.json();

    // Run the WBC3 requirements checker
    const result = checkVesselRequirements(vesselInput);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('WBC3 Check Error:', error);
    return NextResponse.json(
      {
        success: false,
        errors: [{ message: 'Internal server error processing vessel requirements' }]
      },
      { status: 500 }
    );
  }
}
