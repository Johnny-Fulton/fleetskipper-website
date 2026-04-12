import { NextResponse } from 'next/server';

// Import the WBC3 checker engine
// @ts-ignore - JavaScript module
import { getNextQuestions } from '@/lib/wbc3-checker/index.js';

/**
 * POST /api/wbc3/next-questions
 *
 * Get the next questions to show based on partial answers (progressive disclosure).
 *
 * Request body: Partial vessel input object (answers provided so far)
 * Response: { nextQuestions: Array, completionPercentage: number, answeredCount: number, totalCount: number }
 */
export async function POST(request: Request) {
  try {
    const partialInput = await request.json();
    const result = getNextQuestions(partialInput);
    return NextResponse.json(result);
  } catch (error) {
    console.error('WBC3 Next Questions Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to determine next questions'
      },
      { status: 500 }
    );
  }
}
