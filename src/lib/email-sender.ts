import nodemailer from 'nodemailer'

/**
 * Email sender using Google Workspace (info@fleetskipper.com)
 *
 * Requires environment variables:
 * - EMAIL_FROM: info@fleetskipper.com
 * - EMAIL_PASSWORD: Google App Password
 */

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
})

/**
 * Send contact form notification email
 */
export async function sendContactEmail(data: {
  name: string
  email: string
  phone?: string
  vesselType?: string
  servicesNeeded?: string
  message: string
  submitted_at: string
}) {
  const emailBody = `
NEW CONTACT REQUEST - FleetSkipper

===================================
CONTACT INFORMATION
===================================
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Vessel Type: ${data.vesselType || 'Not specified'}
Services Needed: ${data.servicesNeeded || 'Not specified'}

===================================
MESSAGE
===================================
${data.message}

===================================
NEXT STEPS
===================================
1. Review services needed: ${data.servicesNeeded || 'General inquiry'}
2. Respond to: ${data.email}
3. Response deadline: Within 24 hours

Submitted: ${data.submitted_at}
  `.trim()

  const mailOptions = {
    from: `"FleetSkipper Contact Form" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_FROM, // Send to yourself
    replyTo: data.email, // Allow easy reply to the person who submitted
    subject: `Contact Form: ${data.subject} - ${data.name}`,
    text: emailBody,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0891B2; border-bottom: 3px solid #0891B2; padding-bottom: 10px;">
          New Contact Request
        </h2>

        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p style="margin: 10px 0;"><strong>Subject:</strong> ${data.subject}</p>
        </div>

        <div style="background: #ffffff; padding: 20px; border-left: 4px solid #0891B2; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Message</h3>
          <p style="color: #6b7280; white-space: pre-wrap;">${data.message}</p>
        </div>

        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #065f46; margin-top: 0;">Next Steps</h3>
          <ol style="color: #047857;">
            <li>Review inquiry type: <strong>${data.subject}</strong></li>
            <li>Respond to: <strong><a href="mailto:${data.email}">${data.email}</a></strong></li>
            <li>Response deadline: <strong>Within 24 hours</strong></li>
          </ol>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
          <p>Submitted: ${new Date(data.submitted_at).toLocaleString('en-GB', {
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: 'Europe/London'
          })}</p>
          <p>Via FleetSkipper Website Contact Form</p>
        </div>
      </div>
    `,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

/**
 * Verify email configuration
 */
export async function verifyEmailConfig() {
  try {
    await transporter.verify()
    console.log('Email server is ready to send messages')
    return true
  } catch (error) {
    console.error('Email server verification failed:', error)
    return false
  }
}
