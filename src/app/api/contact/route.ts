import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email-sender'

// Contact form handler with Google Workspace email delivery

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields with explicit type casting
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      submitted_at: new Date().toISOString(),
    }

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        {
          success: false,
          message: 'All fields are required.',
        },
        { status: 400 }
      )
    }

    // Send email notification
    try {
      await sendContactEmail(data)
      console.log('Contact form email sent successfully to', process.env.EMAIL_FROM)
    } catch (emailError) {
      // Log email error but don't fail the request
      // (submission is still recorded in logs)
      console.error('Failed to send email notification:', emailError)
      // Continue anyway - user still gets success message
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message received! We\'ll respond within 24 hours.',
      },
      { status: 200 }
    )

  } catch (error) {
    // Log detailed error for debugging
    console.error('Error processing contact request:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
    })

    return NextResponse.json(
      {
        success: false,
        message: 'Sorry, there was an error sending your message. Please email support@seaready.co.uk directly.',
      },
      { status: 500 }
    )
  }
}
