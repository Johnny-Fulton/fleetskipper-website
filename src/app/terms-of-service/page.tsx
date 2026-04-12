import type { Metadata } from 'next'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives/site-footer'
import { copy } from '@/content/strings'

export const metadata: Metadata = {
  title: 'Terms of Service | SeaReady Ltd',
  description: 'Terms and conditions for using SeaReady maritime compliance services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="bg-white">
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#4a5f7a' }}>
            Terms of Service
          </h1>
          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p><strong>Company:</strong> SeaReady Ltd</p>
            <p><strong>Registered Office:</strong> Office 1581, 92 Castle Street, Belfast, BT1 1HE</p>
            <p className="pt-4"><strong>Version:</strong> v1.0</p>
            <p><strong>Effective Date:</strong> [Date of incorporation]</p>
            <p><strong>Last Updated:</strong> 2026-01-22</p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-gray-50 border-y border-gray-200 py-8">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              {id: 'acceptance', title: '1. Acceptance of Terms'},
              {id: 'services', title: '2. Services Provided'},
              {id: 'eligibility', title: '3. Eligibility'},
              {id: 'account', title: '4. Account Registration'},
              {id: 'subscription', title: '5. Subscription & Payment'},
              {id: 'use', title: '6. Use of Services'},
              {id: 'ip', title: '7. Intellectual Property'},
              {id: 'data', title: '8. Data Protection & Privacy'},
              {id: 'sla', title: '9. Service Level & Availability'},
              {id: 'term', title: '10. Term & Termination'},
              {id: 'warranties', title: '11. Warranties & Disclaimers'},
              {id: 'liability', title: '12. Limitation of Liability'},
              {id: 'indemnification', title: '13. Indemnification'},
              {id: 'modifications', title: '14. Modifications'},
              {id: 'general', title: '15. General Provisions'},
              {id: 'contact', title: '16. Contact'},
              {id: 'definitions', title: '17. Definitions'},
            ].map(item => (
              <a key={item.id} href={`#${item.id}`} className="text-sea-teal hover:underline">{item.title}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-lg max-w-none">

          {/* Section 1: Acceptance of Terms */}
          <section id="acceptance" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using SeaReady services (website, software applications, consultancy), you agree to be bound by these Terms of Service (&quot;Terms&quot;).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
              If you do not agree, do not use our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms constitute a legally binding agreement between you (&quot;Customer&quot;, &quot;you&quot;, &quot;your&quot;) and SeaReady Ltd (&quot;SeaReady&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
            </p>
          </section>

          {/* Section 2: Services Provided */}
          <section id="services" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>2. Services Provided</h2>
            <p className="text-gray-700 mb-4">SeaReady provides:</p>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">2.1 Software-as-a-Service (SaaS):</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>SeaReady SMS Pro (Safety Management System portal and mobile app)</li>
                  <li>MPX (Marine Pilot eXchange - if applicable)</li>
                  <li>Other applications as described on our website</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">2.2 Digital Products:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>SMS Templates (downloadable documents)</li>
                  <li>Other digital resources</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">2.3 Consultancy Services:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Maritime safety management consulting</li>
                  <li>MCA compliance support</li>
                  <li>Custom development projects</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 mt-4">
              <strong>Service descriptions and pricing available at:</strong> seaready.co.uk/pricing
            </p>
          </section>

          {/* Section 3: Eligibility */}
          <section id="eligibility" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>3. Eligibility</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.1 Business Use Only</h3>
                <p className="text-gray-700 mb-3">Our services are intended for businesses and professional use. You must be:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>At least 18 years old</li>
                  <li>Authorized to bind your organization to these Terms</li>
                  <li>Using the services for lawful business purposes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.2 Geographic Restrictions</h3>
                <p className="text-gray-700">
                  Services are provided primarily to customers in the UK. Access from other locations may be restricted.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Account Registration */}
          <section id="account" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>4. Account Registration</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">4.1 Account Creation</h3>
                <p className="text-gray-700 mb-3">To use our SaaS services, you must create an account:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide accurate, complete information</li>
                  <li>Maintain current contact details</li>
                  <li>Keep your password secure</li>
                  <li>You are responsible for all activity under your account</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">4.2 Account Security</h3>
                <p className="text-gray-700 mb-3">You must:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Use a strong, unique password</li>
                  <li>Enable multi-factor authentication (MFA) if available</li>
                  <li>Not share login credentials</li>
                  <li>Notify us immediately of unauthorized access: <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">4.3 Account Termination</h3>
                <p className="text-gray-700 mb-3">We may suspend or terminate your account if:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>You breach these Terms</li>
                  <li>Payment is overdue (&gt;30 days)</li>
                  <li>We suspect fraudulent activity</li>
                  <li>Required by law</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Subscription & Payment */}
          <section id="subscription" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>5. Subscription & Payment</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.1 Subscription Plans</h3>
                <p className="text-gray-700 mb-3">SaaS services are subscription-based:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Monthly plans:</strong> Billed monthly in advance</li>
                  <li><strong>Annual plans:</strong> Billed annually in advance (discounted rate)</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Current pricing: seaready.co.uk/pricing
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.2 Payment</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Payment via credit/debit card (Stripe) or invoice (for annual plans)</li>
                  <li>Invoices due within 30 days (Net 30 terms)</li>
                  <li>Late payment: 2% interest per month + reasonable collection costs</li>
                  <li>All prices exclude VAT (added if applicable)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.3 Auto-Renewal</h3>
                <p className="text-gray-700 mb-3">Subscriptions auto-renew unless cancelled:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Monthly: Renews each month on subscription anniversary</li>
                  <li>Annual: Renews each year on subscription anniversary</li>
                  <li>Cancel anytime with 30 days notice (see Section 10)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.4 Price Changes</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>We may change prices on 60 days notice</li>
                  <li>Price changes apply at next renewal (not mid-term)</li>
                  <li>Existing customers: Price locked for first 12 months</li>
                  <li>Maximum increase: 10% per year</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.5 Refunds</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>SaaS subscriptions:</strong> Pro-rata refund for unused months if cancelled (at our discretion)</li>
                  <li><strong>Annual plans:</strong> No refund for remaining months after cancellation (unless service failure)</li>
                  <li><strong>Digital products:</strong> 14-day money-back guarantee if product is defective</li>
                  <li><strong>Consultancy:</strong> Refund per project agreement (typically non-refundable after work commenced)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Use of Services */}
          <section id="use" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>6. Use of Services</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">6.1 License Grant</h3>
                <p className="text-gray-700 mb-3">We grant you a limited, non-exclusive, non-transferable, revocable license to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Access and use our software for your internal business purposes</li>
                  <li>Download and use digital products per license terms</li>
                  <li>Number of users/vessels as per your subscription plan</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">6.2 Restrictions</h3>
                <p className="text-gray-700 mb-3">You must NOT:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Copy, modify, or reverse-engineer our software</li>
                  <li>Resell, sublicense, or redistribute our services</li>
                  <li>Remove copyright or proprietary notices</li>
                  <li>Use our services for illegal purposes</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Overload or disrupt our infrastructure (e.g., excessive API calls)</li>
                  <li>Use our services to spam or harass others</li>
                  <li>Upload malware, viruses, or malicious code</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  See also: <a href="/acceptable-use" className="text-sea-teal hover:underline">Acceptable Use Policy</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">6.3 Your Responsibilities</h3>
                <p className="text-gray-700 mb-3">You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Your data:</strong> Accuracy, legality, backup (we provide backups, but you should keep copies)</li>
                  <li><strong>Your users:</strong> Actions of anyone using your account</li>
                  <li><strong>Your compliance:</strong> With maritime regulations (MCA, WBC3, etc.) - our tools assist, but ultimate responsibility is yours</li>
                  <li><strong>Your equipment:</strong> Internet connection, devices, browsers (see system requirements)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: Intellectual Property */}
          <section id="ip" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>7. Intellectual Property</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">7.1 Our IP</h3>
                <p className="text-gray-700 mb-3">SeaReady owns all rights to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Our software, website, and applications</li>
                  <li>Our branding (name, logo, trademarks)</li>
                  <li>Documentation, templates, and materials we provide</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">7.2 Your IP</h3>
                <p className="text-gray-700 mb-3">You own all rights to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Data you input into our systems (vessel details, procedures, records)</li>
                  <li>Your company branding and materials</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">7.3 Custom Development</h3>
                <p className="text-gray-700 mb-3">For bespoke projects:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Standard:</strong> We own the code, you get a perpetual license to use</li>
                  <li><strong>Work-for-hire:</strong> You own the code (if specified in project agreement and paid in full)</li>
                  <li><strong>Open source:</strong> Some components may be open-source (licensed under their respective terms)</li>
                </ul>
                <p className="text-gray-700 mt-3">Ownership clarified in project agreements.</p>
              </div>
            </div>
          </section>

          {/* Section 8: Data Protection & Privacy */}
          <section id="data" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>8. Data Protection & Privacy</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">8.1 Privacy Policy</h3>
                <p className="text-gray-700">
                  Our Privacy Policy (<a href="/privacy-policy" className="text-sea-teal hover:underline">seaready.co.uk/privacy-policy</a>) explains how we handle your data.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">8.2 Data Processing Agreement (DPA)</h3>
                <p className="text-gray-700">
                  For GDPR compliance, a DPA is incorporated into your contract (available on request or included in enterprise agreements).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">8.3 Your Data Rights</h3>
                <p className="text-gray-700 mb-3">You can:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Export your data anytime (CSV, JSON formats)</li>
                  <li>Request data deletion (subject to legal retention requirements - 7 years for maritime records)</li>
                  <li>See Privacy Policy for full rights</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">8.4 Data Storage</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Stored in UK/EU data centers only</li>
                  <li>Encrypted in transit (TLS) and at rest (AES-256)</li>
                  <li>Backups: Daily, retained 30 days + annual archives (7 years for SMS data)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 9: Service Level & Availability */}
          <section id="sla" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>9. Service Level & Availability</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">9.1 Uptime Target</h3>
                <p className="text-gray-700">
                  We target 99.5% uptime per month (see SLA: seaready.co.uk/sla)
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">9.2 Maintenance</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Scheduled maintenance: Sundays 02:00-06:00 GMT (up to monthly)</li>
                  <li>Notification: 48 hours advance notice</li>
                  <li>Emergency maintenance: May occur without notice (security issues)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">9.3 Support</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Email support: <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                  <li>Response times: See SLA</li>
                  <li>P1 (critical): 1-hour response, 4-hour resolution target</li>
                  <li>P4 (low): 24-hour response, best effort resolution</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">9.4 Service Credits</h3>
                <p className="text-gray-700">
                  If we fail to meet 99.5% uptime, you may be eligible for service credits (see SLA for details).
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: Term & Termination */}
          <section id="term" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>10. Term & Termination</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">10.1 Term</h3>
                <p className="text-gray-700">
                  These Terms remain in effect while you use our services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">10.2 Termination by You</h3>
                <p className="text-gray-700 mb-3">You may cancel your subscription anytime:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Notice:</strong> 30 days written notice to <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                  <li><strong>Effective:</strong> End of current billing period (or 30 days, whichever is later)</li>
                  <li><strong>Data:</strong> 30 days to export your data after cancellation, then securely deleted</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">10.3 Termination by Us</h3>
                <p className="text-gray-700 mb-3">We may terminate immediately if:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>You breach these Terms (and don&apos;t remedy within 14 days of notice)</li>
                  <li>Payment overdue &gt; 30 days</li>
                  <li>Fraudulent activity or illegal use</li>
                  <li>Required by law</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">10.4 Effect of Termination</h3>
                <p className="text-gray-700 mb-3">Upon termination:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Access to services ends</li>
                  <li>Outstanding fees remain due</li>
                  <li>You must export your data (30-day window)</li>
                  <li>Sections that should survive (payment obligations, liability, disputes) remain in effect</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 11: Warranties & Disclaimers */}
          <section id="warranties" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>11. Warranties & Disclaimers</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">11.1 Our Warranties</h3>
                <p className="text-gray-700 mb-3">We warrant that:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Services will substantially conform to documentation</li>
                  <li>We will use reasonable skill and care</li>
                  <li>We have the right to provide the services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">11.2 Disclaimer</h3>
                <p className="text-gray-700 mb-3 font-semibold">EXCEPT AS ABOVE, SERVICES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>No warranty of uninterrupted or error-free operation</li>
                  <li>No warranty that services meet all your requirements</li>
                  <li>No warranty regarding third-party services (hosting, payment processors)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">11.3 Maritime Compliance</h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                  <p className="text-gray-900 font-semibold mb-3">IMPORTANT: While our SMS tools are designed to assist with regulatory compliance (MCA, WBC3, etc.):</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>WE DO NOT GUARANTEE regulatory approval or compliance</li>
                    <li>YOU remain responsible for compliance with all maritime regulations</li>
                    <li>Our services are TOOLS, not professional advice (unless consultancy explicitly engaged)</li>
                    <li>Always verify with MCA or surveyor if unsure</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 12: Limitation of Liability */}
          <section id="liability" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>12. Limitation of Liability</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">12.1 Liability Cap</h3>
                <p className="text-gray-700">
                  Our total liability to you for any claim is limited to: The greater of: (a) Fees paid in the 12 months before the claim, OR (b) £500
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">12.2 Exclusions</h3>
                <p className="text-gray-700 mb-3 font-semibold">WE ARE NOT LIABLE FOR:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Indirect, incidental, consequential, or special damages</li>
                  <li>Lost profits, revenue, data, or business opportunities</li>
                  <li>Service interruptions beyond our control</li>
                  <li>Your failure to backup data</li>
                  <li>Third-party actions (e.g., hosting provider outages)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">12.3 Exceptions</h3>
                <p className="text-gray-700 mb-3">Liability limits DO NOT apply to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Death or personal injury caused by our negligence</li>
                  <li>Fraud or fraudulent misrepresentation</li>
                  <li>Matters that cannot be limited by law</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">12.4 Insurance</h3>
                <p className="text-gray-700 mb-3">We carry:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Professional Indemnity Insurance: [Amount to be confirmed]</li>
                  <li>Cyber Liability Insurance: [Amount to be confirmed]</li>
                  <li>Certificates available on request</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 13: Indemnification */}
          <section id="indemnification" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>13. Indemnification</h2>
            <p className="text-gray-700 mb-3"><strong>You agree to indemnify SeaReady</strong> against claims arising from:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Your breach of these Terms</li>
              <li>Your violation of laws or regulations</li>
              <li>Your data (if it infringes third-party rights or is illegal)</li>
              <li>Your users&apos; actions</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We will notify you of any claim and cooperate in defense (at your expense).
            </p>
          </section>

          {/* Section 14: Modifications */}
          <section id="modifications" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>14. Modifications to Services & Terms</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">14.1 Service Changes</h3>
                <p className="text-gray-700 mb-3">We may:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Add new features (usually free)</li>
                  <li>Modify existing features (30 days notice if significant change)</li>
                  <li>Deprecate features (90 days notice with migration path)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">14.2 Terms Changes</h3>
                <p className="text-gray-700 mb-3">We may update these Terms:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Notice: 30 days before material changes take effect</li>
                  <li>Posted on website with &quot;Last Updated&quot; date</li>
                  <li>Continued use = acceptance</li>
                  <li>If you don&apos;t accept: Cancel before changes take effect (no penalty)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 15: General Provisions */}
          <section id="general" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>15. General Provisions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">15.1 Entire Agreement</h3>
                <p className="text-gray-700">
                  These Terms (plus SLA, Privacy Policy, and any signed agreements) constitute the entire agreement. They supersede prior discussions or agreements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">15.2 Governing Law</h3>
                <p className="text-gray-700">
                  These Terms are governed by the laws of Northern Ireland (or England and Wales, as applicable).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">15.3 Dispute Resolution</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>First:</strong> Contact us to resolve informally (<a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a>)</li>
                  <li><strong>Second:</strong> Mediation (if both parties agree)</li>
                  <li><strong>Third:</strong> Courts of Northern Ireland (or England/Wales) have exclusive jurisdiction</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">15.4 Force Majeure</h3>
                <p className="text-gray-700">
                  We&apos;re not liable for delays/failures due to events beyond our reasonable control (natural disasters, war, pandemics, internet failures, etc.).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">15.5 Severability</h3>
                <p className="text-gray-700">
                  If any provision is invalid/unenforceable, the rest remains in effect.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">15.6 Waiver</h3>
                <p className="text-gray-700">
                  Failure to enforce any right doesn&apos;t waive that right.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">15.7 No Third-Party Rights</h3>
                <p className="text-gray-700">
                  Only you and SeaReady have rights under these Terms (no third-party beneficiaries).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">15.8 Assignment</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>You cannot assign these Terms without our consent</li>
                  <li>We may assign to a successor or affiliate (you&apos;ll be notified)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">15.9 Notices</h3>
                <p className="text-gray-700 mb-3">Legal notices to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>You:</strong> Email on file + registered address (if provided)</li>
                  <li><strong>Us:</strong> <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a> or SeaReady Ltd, Office 1581, 92 Castle Street, Belfast, BT1 1HE</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">15.10 Language</h3>
                <p className="text-gray-700">
                  These Terms are in English. Translations (if any) are for convenience only.
                </p>
              </div>
            </div>
          </section>

          {/* Section 16: Contact */}
          <section id="contact" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>16. Contact</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <ul className="space-y-2 text-gray-700">
                <li><strong>General Enquiries:</strong> <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                <li><strong>Support:</strong> <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                <li><strong>Billing:</strong> <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                <li><strong>Legal/Disputes:</strong> <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                <li><strong>Office:</strong> SeaReady Ltd, Office 1581, 92 Castle Street, Belfast, BT1 1HE</li>
              </ul>
            </div>
          </section>

          {/* Section 17: Definitions */}
          <section id="definitions" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>17. Definitions</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <ul className="space-y-3 text-gray-700">
                <li><strong>&quot;Services&quot;</strong> - Our SaaS applications, digital products, consultancy, and website</li>
                <li><strong>&quot;Customer&quot; / &quot;you&quot;</strong> - The person or organization using our services</li>
                <li><strong>&quot;Account&quot;</strong> - Your user account with login credentials</li>
                <li><strong>&quot;Subscription&quot;</strong> - Recurring payment arrangement for SaaS services</li>
                <li><strong>&quot;Data&quot;</strong> - Information you input, upload, or generate using our services</li>
                <li><strong>&quot;Business Day&quot;</strong> - Monday-Friday, 09:00-17:00 GMT, excluding UK public holidays</li>
              </ul>
            </div>
          </section>

          {/* Summary */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-sea-teal rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Summary (Plain Language)</h2>
            <div className="space-y-4 text-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-2">
                    <li>✓ Use our services for legitimate business purposes</li>
                    <li>✓ Keep your account secure, pay on time</li>
                    <li>✓ You own your data, we own our software</li>
                    <li>✓ Cancel anytime with 30 days notice</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li>✓ We target 99.5% uptime</li>
                    <li>✓ We&apos;re not liable for consequential damages (see Section 12)</li>
                    <li>✓ Contact us if problems arise - we&apos;ll work it out</li>
                    <li>✗ Don&apos;t expect us to guarantee MCA approval (compliance is your responsibility)</li>
                  </ul>
                </div>
              </div>
              <p className="mt-6">
                <strong>Questions?</strong> <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a>
              </p>
            </div>
          </div>

          {/* Acceptance */}
          <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Acceptance</h3>
            <p className="text-gray-700">
              By clicking &quot;I Accept&quot;, creating an account, or using our services, you acknowledge that you have read, understood, and agree to these Terms of Service.
            </p>
          </div>

          {/* Change Log */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Log</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Version</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Changes</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Approved By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">v1.0</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">[Incorporation date]</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Initial Terms of Service</td>
                    <td className="px-4 py-3 text-sm text-gray-700">J. Fulton, Director</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              These Terms comply with UK law and standard SaaS industry practice.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Latest version: <a href="https://seaready.co.uk/terms-of-service" className="text-sea-teal hover:underline">https://seaready.co.uk/terms-of-service</a>
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <SiteFooter
        product={copy.footer.product}
        company={copy.footer.company}
        resources={copy.footer.resources}
        legal={copy.footer.legal}
        copyright={copy.footer.copyright}
      />
    </div>
  )
}
