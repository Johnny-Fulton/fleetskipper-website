import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// SMS Consultancy quote request handler with email delivery

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      vessel_count: formData.get('vessel_count'),
      vessel_type: formData.get('vessel_type'),
      wbc3_category: formData.get('wbc3_category'),
      ops_diving: formData.get('ops_diving') === 'on',
      ops_lifting: formData.get('ops_lifting') === 'on',
      ops_towing: formData.get('ops_towing') === 'on',
      ops_passenger: formData.get('ops_passenger') === 'on',
      additional_details: formData.get('additional_details'),
      timeline: formData.get('timeline'),
      submitted_at: new Date().toISOString(),
    }

    // Build specialized operations list
    const specializedOps = []
    if (data.ops_diving) specializedOps.push('Diving')
    if (data.ops_lifting) specializedOps.push('Lifting')
    if (data.ops_towing) specializedOps.push('Towing')
    if (data.ops_passenger) specializedOps.push('Passenger Operations')

    // Format email body
    const emailBody = `
NEW SMS CONSULTANCY QUOTE REQUEST

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

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891B2; border-bottom: 3px solid #0891B2; padding-bottom: 10px;">
            New SMS Consultancy Quote Request
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
            <p>Via SeaReady Website - SMS Consultancy Form</p>
          </div>
        </div>
      `

      await transporter.sendMail({
        from: `"SeaReady SMS Consultancy" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_FROM,
        replyTo: data.email as string,
        subject: `SMS Quote Request - ${data.name} - ${data.vessel_count} vessel(s)`,
        text: emailBody,
        html: htmlBody,
      })

      console.log('Consultancy quote email sent successfully to', process.env.EMAIL_FROM)
    } catch (emailError) {
      console.error('Failed to send consultancy email notification:', emailError)
      // Continue anyway - submission still successful
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Quote request received! We\'ll respond within 24 hours.',
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing consultancy request:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Sorry, there was an error submitting your request. Please email info@fleetskipper.com directly.',
      },
      { status: 500 }
    )
  }
}
