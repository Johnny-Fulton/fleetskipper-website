import { NextResponse } from 'next/server';

// Import the WBC3 checker engine
// @ts-ignore - JavaScript module
import { getQuestionnaireSchema } from '@/lib/wbc3-checker/index.js';

/**
 * GET /api/wbc3/schema
 *
 * Get the input schema definition for building the questionnaire UI.
 *
 * Response: Schema object with sections and fields
 */
export async function GET() {
  try {
    const schema = getQuestionnaireSchema();
    return NextResponse.json(schema);
  } catch (error) {
    console.error('WBC3 Schema Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve questionnaire schema'
      },
      { status: 500 }
    );
  }
}
