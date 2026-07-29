import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

// Consultancy quote request handler — every submission is durably captured in Supabase
// before any email notification is attempted.

// Create Supabase client with service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      vessel_count: formData.get('vessel_count') as string,
      vessel_type: formData.get('vessel_type') as string,
      wbc3_category: formData.get('wbc3_category') as string,
      ops_diving: formData.get('ops_diving') === 'on',
      ops_lifting: formData.get('ops_lifting') === 'on',
      ops_towing: formData.get('ops_towing') === 'on',
      ops_passenger: formData.get('ops_passenger') === 'on',
      additional_details: formData.get('additional_details') as string,
      timeline: formData.get('timeline') as string,
      submitted_at: new Date().toISOString(),
    }

    // Validate required fields (guards direct/scripted POSTs against NOT-NULL insert failure)
    if (!data.name || !data.email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400 }
      )
    }

    // Build specialized operations list (for email)
    const specializedOps = []
    if (data.ops_diving) specializedOps.push('Diving')
    if (data.ops_lifting) specializedOps.push('Lifting')
    if (data.ops_towing) specializedOps.push('Towing')
    if (data.ops_passenger) specializedOps.push('Passenger Operations')

    // --- 1. Durably capture the submission in Supabase ---
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        form_type: 'consultancy',
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        vessel_type: data.vessel_type || null,
        message: data.additional_details || 'Consultancy quote request',
        submitted_at: data.submitted_at,
        details: {
          vessel_count: data.vessel_count,
          wbc3_category: data.wbc3_category,
          ops_diving: data.ops_diving,
          ops_lifting: data.ops_lifting,
          ops_towing: data.ops_towing,
          ops_passenger: data.ops_passenger,
          timeline: data.timeline,
        },
      })

    // Helper: send the email notification
    const sendEmail = async () => {
      const emailBody = `
NEW CONSULTANCY QUOTE REQUEST

===================================
CONTACT INFORMATION
===================================
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}

===================================
VESSEL INFORMATION
===================================
Number of Vessels: ${data.vessel_count}
Vessel Type: ${data.vessel_type}
WBC3 Category: ${data.wbc3_category || 'Not specified'}

===================================
OPERATIONS
===================================
Specialized Operations: ${specializedOps.length > 0 ? specializedOps.join(', ') : 'None selected'}

Additional Details:
${data.additional_details || 'None provided'}

===================================
TIMELINE
===================================
${data.timeline}

===================================
NEXT STEPS
===================================
1. Review vessel requirements
2. Prepare custom quote
3. Send quote to: ${data.email}
4. Response deadline: Within 24 hours

Submitted: ${data.submitted_at}
      `.trim()

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891B2; border-bottom: 3px solid #0891B2; padding-bottom: 10px;">
            New Consultancy Quote Request
          </h2>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          </div>

          <div style="background: #ffffff; padding: 20px; border-left: 4px solid #0891B2; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Vessel Information</h3>
            <p style="margin: 10px 0;"><strong>Number of Vessels:</strong> ${data.vessel_count}</p>
            <p style="margin: 10px 0;"><strong>Vessel Type:</strong> ${data.vessel_type}</p>
            <p style="margin: 10px 0;"><strong>WBC3 Category:</strong> ${data.wbc3_category || 'Not specified'}</p>
          </div>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Operations</h3>
            <p style="margin: 10px 0;"><strong>Specialized Operations:</strong> ${specializedOps.length > 0 ? specializedOps.join(', ') : 'None selected'}</p>
            ${data.additional_details ? `<p style="margin: 10px 0;"><strong>Additional Details:</strong><br><span style="white-space: pre-wrap;">${data.additional_details}</span></p>` : ''}
          </div>

          <div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #c65d00; margin-top: 0;">Timeline</h3>
            <p style="margin: 10px 0; font-weight: bold;">${data.timeline}</p>
          </div>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #065f46; margin-top: 0;">Next Steps</h3>
            <ol style="color: #047857;">
              <li>Review vessel requirements</li>
              <li>Prepare custom quote</li>
              <li>Send quote to: <strong><a href="mailto:${data.email}">${data.email}</a></strong></li>
              <li>Response deadline: <strong>Within 24 hours</strong></li>
            </ol>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
            <p>Submitted: ${new Date(data.submitted_at).toLocaleString('en-GB', {
              dateStyle: 'full',
              timeStyle: 'short',
              timeZone: 'Europe/London'
            })}</p>
            <p>Via FleetSkipper Website - Consultancy Form</p>
          </div>
        </div>
      `

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
        subject: `Consultancy Quote Request - ${data.name} - ${data.vessel_count} vessel(s)`,
        text: emailBody,
        html: htmlBody,
      })
    }

    if (dbError) {
      console.error('Failed to save consultancy submission to Supabase:', dbError)

      // --- 2. Attempt email as fallback ---
      try {
        await sendEmail()
        console.log('Fallback: consultancy email sent despite DB failure')
        // Email delivered — lead is not silently lost; return success
        return NextResponse.json(
          {
            success: true,
            message: "Quote request received! We'll respond within 24 hours.",
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
            'Sorry, we were unable to receive your request right now. Please email us directly at info@fleetskipper.com.',
        },
        { status: 500 }
      )
    }

    // Submission is safely in the database.

    // --- 3. Send email notification (best-effort; failure does NOT undo success) ---
    try {
      await sendEmail()
      console.log('Consultancy quote email sent successfully to', process.env.EMAIL_FROM)
    } catch (emailError) {
      // Log but do not surface to the user — the lead is safe in Supabase
      console.error('Email notification failed (submission already saved):', emailError)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Quote request received! We'll respond within 24 hours.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing consultancy request:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
    })

    return NextResponse.json(
      {
        success: false,
        message:
          'Sorry, there was an error submitting your request. Please email info@fleetskipper.com directly.',
      },
      { status: 500 }
    )
  }
}
