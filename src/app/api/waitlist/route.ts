import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

// Waitlist signup handler — every submission is durably captured in Supabase
// before any email notification is attempted.

// Create Supabase client with service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      vessel_count: formData.get('vessel_count') as string,
      excited_about: formData.get('excited_about') as string,
      submitted_at: new Date().toISOString(),
    }

    // Validate required fields (guards direct/scripted POSTs against NOT-NULL insert failure)
    if (!data.name || !data.email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400 }
      )
    }

    // --- 1. Durably capture the submission in Supabase ---
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        form_type: 'waitlist',
        name: data.name,
        email: data.email,
        company: data.company || null,
        message: data.excited_about || 'Waitlist signup',
        submitted_at: data.submitted_at,
        details: {
          vessel_count: data.vessel_count,
          excited_about: data.excited_about,
        },
      })

    // Helper: send the email notification
    const sendEmail = async () => {
      const emailBody = `
NEW APP WAITLIST SIGNUP

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Vessels: ${data.vessel_count}
Most excited about: ${data.excited_about}

Submitted: ${data.submitted_at}

ACTION: Add to waitlist email campaign
      `.trim()

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

      await transporter.sendMail({
        from: `"FleetSkipper" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_FROM,
        replyTo: data.email,
        subject: `Waitlist Signup - ${data.name} - ${data.vessel_count} vessels`,
        text: emailBody,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #0891B2;">New Waitlist Signup</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
            <p><strong>Vessels:</strong> ${data.vessel_count}</p>
            <p><strong>Most excited about:</strong> ${data.excited_about}</p>
            <hr>
            <p style="color: #c65d00; font-weight: bold;">ACTION: Add to waitlist email campaign</p>
          </div>
        `,
      })
    }

    if (dbError) {
      console.error('Failed to save waitlist submission to Supabase:', dbError)

      // --- 2. Attempt email as fallback ---
      try {
        await sendEmail()
        console.log('Fallback: waitlist email sent despite DB failure')
        // Email delivered — lead is not silently lost; return success
        return NextResponse.json(
          {
            success: true,
            message: "You're on the waitlist! We'll notify you when we launch.",
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
            'Sorry, we were unable to add you to the waitlist right now. Please email us directly at info@fleetskipper.com.',
        },
        { status: 500 }
      )
    }

    // Submission is safely in the database.

    // --- 3. Send email notification (best-effort; failure does NOT undo success) ---
    try {
      await sendEmail()
      console.log('Waitlist email sent successfully')
    } catch (emailError) {
      // Log but do not surface to the user — the lead is safe in Supabase
      console.error('Email notification failed (submission already saved):', emailError)
    }

    return NextResponse.json(
      {
        success: true,
        message: "You're on the waitlist! We'll notify you when we launch.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing waitlist signup:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
    })

    return NextResponse.json(
      {
        success: false,
        message:
          'Sorry, there was an error. Please email info@fleetskipper.com directly.',
      },
      { status: 500 }
    )
  }
}
