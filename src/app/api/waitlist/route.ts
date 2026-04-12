import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Waitlist signup handler with email delivery

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      vessel_count: formData.get('vessel_count'),
      excited_about: formData.get('excited_about'),
      submitted_at: new Date().toISOString(),
    }

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

      await transporter.sendMail({
        from: `"SeaReady Waitlist" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_FROM,
        replyTo: data.email as string,
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
      console.log('Waitlist email sent successfully')
    } catch (emailError) {
      console.error('Failed to send waitlist email:', emailError)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'You\'re on the waitlist! We\'ll notify you when we launch.',
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing waitlist signup:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Sorry, there was an error. Please email info@fleetskipper.com',
      },
      { status: 500 }
    )
  }
}
