import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendContactEmail } from '@/lib/email-sender'

// Contact form handler — every submission is durably captured in Supabase
// before any email notification is attempted.

// Create Supabase client with service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields with explicit type casting
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      vesselType: formData.get('vesselType') as string,
      servicesNeeded: formData.get('servicesNeeded') as string,
      message: formData.get('message') as string,
      submitted_at: new Date().toISOString(),
    }

    // Validate required fields (only name, email, message required)
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, email, and message are required.',
        },
        { status: 400 }
      )
    }

    // --- 1. Durably capture the submission in Supabase ---
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        vessel_type: data.vesselType || null,
        services_needed: data.servicesNeeded || null,
        message: data.message,
        submitted_at: data.submitted_at,
      })

    if (dbError) {
      console.error('Failed to save contact submission to Supabase:', dbError)

      // --- 2. Attempt email as fallback ---
      try {
        await sendContactEmail(data)
        console.log('Fallback: contact form email sent despite DB failure')
        // Email delivered — lead is not silently lost; return success
        return NextResponse.json(
          {
            success: true,
            message: "Message received! We'll respond within 24 hours.",
          },
          { status: 200 }
        )
      } catch (emailError) {
        console.error('Fallback email also failed:', emailError)
      }

      // Both DB and email failed — nothing was captured; tell the user honestly
      return NextResponse.json(
        {
          success: false,
          message:
            'Sorry, we were unable to receive your message right now. Please email us directly at info@fleetskipper.com.',
        },
        { status: 500 }
      )
    }

    // Submission is safely in the database.

    // --- 3. Send email notification (best-effort; failure does NOT undo success) ---
    try {
      await sendContactEmail(data)
      console.log('Contact form email sent successfully to', process.env.EMAIL_FROM)
    } catch (emailError) {
      // Log but do not surface to the user — the lead is safe in Supabase
      console.error('Email notification failed (submission already saved):', emailError)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message received! We'll respond within 24 hours.",
      },
      { status: 200 }
    )
  } catch (error) {
    // Unexpected top-level error
    console.error('Error processing contact request:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
    })

    return NextResponse.json(
      {
        success: false,
        message:
          'Sorry, there was an error sending your message. Please email info@fleetskipper.com directly.',
      },
      { status: 500 }
    )
  }
}
