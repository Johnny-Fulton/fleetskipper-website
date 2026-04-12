// lib/services/email.ts
// Swap with Resend or your provider later.
// Keep one function per intent so callers don't bake in provider details.

export type Mail = {
  to: string;
  subject: string;
  html: string;
};

export async function sendMail(msg: Mail) {
  // placeholder implementation
  if (process.env.NODE_ENV !== "production") {
    console.warn("[dev] sendMail mock:", msg.subject, "→", msg.to);
  }
  // TODO: integrate Resend here
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'SeaReady <noreply@seaready.app>',
  //   to: msg.to,
  //   subject: msg.subject,
  //   html: msg.html,
  // });
  return { ok: true };
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  fleetSize?: string;
  message?: string;
}) {
  const html = `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
    ${data.fleetSize ? `<p><strong>Fleet Size:</strong> ${data.fleetSize}</p>` : ''}
    ${data.message ? `<p><strong>Message:</strong><br>${data.message}</p>` : ''}
  `;
  
  return sendMail({
    to: process.env.SUPPORT_EMAIL || "info@fleetskipper.com",
    subject: `New contact from ${data.name}`,
    html,
  });
}

export async function sendChecklist(to: string, downloadUrl: string) {
  const html = `
    <p>Thank you for your interest in SeaReady SMS!</p>
    <p>Here's your WBC3 compliance checklist:</p>
    <p><a href="${downloadUrl}" style="background: #F97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Download WBC3 Checklist</a></p>
    <p>This checklist covers all requirements for WBC3 compliance and will help you prepare for inspections.</p>
    <br>
    <p>Best regards,<br>The SeaReady Team</p>
  `;
  
  return sendMail({
    to,
    subject: "Your WBC3 compliance checklist from SeaReady",
    html,
  });
}