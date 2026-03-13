import type { Metadata } from 'next'
import Link from 'next/link'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives/site-footer'
import { copy } from '@/content/strings'

export const metadata: Metadata = {
  title: 'Privacy Policy | SeaReady Ltd',
  description: 'How SeaReady collects, uses, and protects your personal information in compliance with GDPR and UK data protection laws. EU-based data storage.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#4a5f7a' }}>
            Privacy Policy
          </h1>
          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p><strong>Company:</strong> SeaReady Ltd</p>
            <p><strong>Registered Office:</strong> Office 1581, 92 Castle Street, Belfast, BT1 1HE</p>
            <p><strong>Contact:</strong> <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a></p>
            <p className="pt-4"><strong>Version:</strong> v1.0</p>
            <p><strong>Effective Date:</strong> [Date of incorporation]</p>
            <p><strong>Last Updated:</strong> 2026-01-29</p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-gray-50 border-y border-gray-200 py-8">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              {id: 'introduction', title: '1. Introduction'},
              {id: 'information', title: '2. Information We Collect'},
              {id: 'use', title: '3. How We Use Your Information'},
              {id: 'legal-basis', title: '4. Legal Basis for Processing'},
              {id: 'sharing', title: '5. Data Sharing & Disclosure'},
              {id: 'retention', title: '6. Data Retention'},
              {id: 'rights', title: '7. Your Rights (GDPR)'},
              {id: 'security', title: '8. Data Security'},
              {id: 'breaches', title: '9. Data Breaches'},
              {id: 'cookies', title: '10. Cookies & Tracking'},
              {id: 'transfers', title: '11. International Transfers'},
              {id: 'children', title: '12. Children\'s Privacy'},
              {id: 'changes', title: '13. Changes to This Policy'},
              {id: 'contact', title: '14. Contact Us'},
              {id: 'complaints', title: '15. Complaints & Regulatory Authority'},
              {id: 'maritime', title: '16. Maritime-Specific Considerations'},
            ].map(item => (
              <a key={item.id} href={`#${item.id}`} className="text-sea-teal hover:underline">{item.title}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-lg max-w-none">

          {/* Introduction */}
          <section id="introduction" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              SeaReady Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
              <li>Use our website (seaready.co.uk)</li>
              <li>Use our software applications (SeaReady SMS Pro, MPX, or other products)</li>
              <li>Engage our consultancy services</li>
              <li>Contact us for support or sales enquiries</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold">
              We are the data controller for the personal information we process, unless otherwise stated.
            </p>
          </section>

          {/* Information */}
          <section id="information" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>2. Information We Collect</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">2.1 Information You Provide to Us</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Account Registration:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Name, email address, phone number</li>
                      <li>Company name, job title</li>
                      <li>Billing address</li>
                      <li>Payment information (processed by our payment provider)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Using Our Services:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Safety Management System data (vessel details, crew information, documents, records)</li>
                      <li>Voyage information (if using MPX or similar products)</li>
                      <li>Communications with us (support tickets, emails, feedback)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Consultancy Services:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Information you provide during consultancy engagements</li>
                      <li>Documents you share for review or audit</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">2.2 Information We Collect Automatically</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Website Usage:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>IP address, browser type, device type</li>
                      <li>Pages visited, time spent on pages</li>
                      <li>Referring website</li>
                      <li>Cookies (see Section 10)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Application Usage:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Login timestamps</li>
                      <li>Feature usage (to improve our products)</li>
                      <li>Error logs (to fix bugs)</li>
                      <li>Performance data (to maintain service quality)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">2.3 Information from Third Parties</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Payment Providers:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Payment confirmation and transaction details (from Stripe or similar)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Authentication Providers:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>If you sign in using Google/Microsoft, we receive basic profile information (name, email)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use */}
          <section id="use" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-6">We use your personal information for the following purposes:</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.1 Service Delivery (Contractual Necessity)</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Provide access to our software</li>
                  <li>Process transactions and maintain accounts</li>
                  <li>Deliver consultancy services</li>
                  <li>Provide customer support</li>
                  <li>Send service-related notifications (e.g., system maintenance, security alerts)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.2 Business Operations (Legitimate Interest)</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Improve our products and services</li>
                  <li>Develop new features</li>
                  <li>Analyze usage patterns to optimize performance</li>
                  <li>Prevent fraud and abuse</li>
                  <li>Comply with legal obligations (accounting, tax, regulatory)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.3 Marketing (Consent or Legitimate Interest)</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Send product updates and newsletters (you can opt out anytime)</li>
                  <li>Inform you of new features or services</li>
                  <li>Conduct surveys and research</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-gray-700 font-semibold">
                    You can opt out of marketing communications at any time by clicking &quot;unsubscribe&quot; in emails or contacting us.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Basis */}
          <section id="legal-basis" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>4. Legal Basis for Processing (GDPR)</h2>
            <p className="text-gray-700 mb-4">We process your personal information under the following legal bases:</p>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Purpose</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Providing our services to you</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Contract performance</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Processing payments</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Contract performance</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Customer support</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Contract performance</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Product improvement</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Legitimate interest</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Security and fraud prevention</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Legitimate interest + Legal obligation</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Marketing (existing customers)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Legitimate interest</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Marketing (new contacts)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Consent</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Compliance with laws (tax, accounting)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Legal obligation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Sharing */}
          <section id="sharing" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>5. Data Sharing & Disclosure</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.1 We DO Share Data With:</h3>

                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-500 p-6">
                    <p className="font-semibold text-gray-900 mb-3">Service Providers (Data Processors):</p>
                    <p className="text-gray-700 mb-3">We use the following third-party service providers to deliver our services:</p>

                    <div className="space-y-3 mb-4">
                      <div className="bg-white rounded p-3">
                        <p className="font-semibold text-gray-900">Application Database & Hosting</p>
                        <p className="text-gray-700 text-sm"><strong>Provider:</strong> Supabase (via AWS Frankfurt, Germany)</p>
                        <p className="text-gray-700 text-sm"><strong>Purpose:</strong> Application data storage and hosting</p>
                        <p className="text-gray-700 text-sm"><strong>Location:</strong> Frankfurt, Germany (EU)</p>
                        <p className="text-gray-700 text-sm"><strong>Safeguards:</strong> GDPR compliant, DPA in place, EU-based data centers</p>
                      </div>

                      <div className="bg-white rounded p-3">
                        <p className="font-semibold text-gray-900">Business Communications</p>
                        <p className="text-gray-700 text-sm"><strong>Provider:</strong> Google Workspace</p>
                        <p className="text-gray-700 text-sm"><strong>Purpose:</strong> Email, document collaboration, business communications</p>
                        <p className="text-gray-700 text-sm"><strong>Location:</strong> European Union data centers</p>
                        <p className="text-gray-700 text-sm"><strong>Safeguards:</strong> GDPR compliant, DPA in place, EU-based storage</p>
                      </div>

                      <div className="bg-white rounded p-3">
                        <p className="font-semibold text-gray-900">Payment Processing</p>
                        <p className="text-gray-700 text-sm"><strong>Provider:</strong> Stripe</p>
                        <p className="text-gray-700 text-sm"><strong>Purpose:</strong> Secure payment processing and billing</p>
                        <p className="text-gray-700 text-sm"><strong>Location:</strong> European Union</p>
                        <p className="text-gray-700 text-sm"><strong>Safeguards:</strong> PCI-DSS Level 1 certified, GDPR compliant, DPA in place</p>
                      </div>

                      <div className="bg-white rounded p-3">
                        <p className="font-semibold text-gray-900">Analytics</p>
                        <p className="text-gray-700 text-sm"><strong>Provider:</strong> Google Analytics 4</p>
                        <p className="text-gray-700 text-sm"><strong>Purpose:</strong> Website analytics and performance monitoring</p>
                        <p className="text-gray-700 text-sm"><strong>Location:</strong> European Union</p>
                        <p className="text-gray-700 text-sm"><strong>Safeguards:</strong> Privacy-focused mode, IP anonymization enabled, GDPR compliant</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mt-4 font-semibold">All third-party processors:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Are GDPR compliant with appropriate technical and organizational measures</li>
                      <li>Have Data Processing Agreements (DPAs) in place</li>
                      <li>Store and process data exclusively within the UK/EU</li>
                      <li>Are regularly audited for compliance and security</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                    <p className="font-semibold text-gray-900 mb-3">Legal Requirements:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>If required by law (court orders, regulatory investigations)</li>
                      <li>To protect our rights or safety of others</li>
                      <li>In connection with business transfers (e.g., if we sell the company - you&apos;ll be notified)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.2 We DO NOT:</h3>
                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                  <ul className="space-y-2 text-gray-700">
                    <li>✗ Sell your personal data to third parties</li>
                    <li>✗ Share your data with advertisers</li>
                    <li>✗ Use your data for purposes unrelated to our services</li>
                    <li>✗ Store data outside UK/EU</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Retention */}
          <section id="retention" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>6. Data Retention</h2>
            <p className="text-gray-700 mb-4">We retain your personal information only as long as necessary:</p>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Data Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Retention Period</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Account data</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Duration of account + 30 days after closure</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Service delivery + transition period</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">SMS records</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Duration of contract + 7 years</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Maritime compliance (MCA requirements)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Financial records</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">7 years from transaction</td>
                    <td className="px-4 py-3 text-sm text-gray-700">UK tax law (HMRC)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Support communications</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">2 years</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Customer service quality</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Marketing data</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Until you unsubscribe + 30 days</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Legal compliance</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Logs (security, access)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">12 months</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Security and compliance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
              <p className="text-gray-700 font-semibold">
                After retention periods expire, we securely delete or anonymize your data.
              </p>
            </div>
          </section>

          {/* Rights */}
          <section id="rights" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>7. Your Rights (GDPR)</h2>
            <p className="text-gray-700 mb-6">You have the following rights regarding your personal information:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">7.1 Right of Access</p>
                <p className="text-gray-700 text-sm">Request a copy of your personal data we hold (free, within 30 days)</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">7.2 Right to Rectification</p>
                <p className="text-gray-700 text-sm">Correct inaccurate or incomplete data</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">7.3 Right to Erasure (&quot;Right to be Forgotten&quot;)</p>
                <p className="text-gray-700 text-sm">Request deletion of your data (subject to legal retention requirements)</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">7.4 Right to Restrict Processing</p>
                <p className="text-gray-700 text-sm">Limit how we use your data in certain circumstances</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">7.5 Right to Data Portability</p>
                <p className="text-gray-700 text-sm">Receive your data in machine-readable format (CSV, JSON)</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">7.6 Right to Object</p>
                <p className="text-gray-700 text-sm">Object to processing based on legitimate interest (e.g., marketing)</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">7.7 Right to Withdraw Consent</p>
                <p className="text-gray-700 text-sm">If we rely on consent, you can withdraw it anytime</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">7.8 Right to Complain</p>
                <p className="text-gray-700 text-sm">Lodge a complaint with the ICO (see Section 15)</p>
              </div>
            </div>

            <div className="bg-cyan-50 border-l-4 border-sea-teal p-6 mt-6">
              <p className="text-gray-700 font-semibold">
                To exercise your rights, contact: <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a>
              </p>
            </div>
          </section>

          {/* Security */}
          <section id="security" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>8. Data Security</h2>
            <p className="text-gray-700 mb-6">We implement appropriate technical and organizational measures to protect your data:</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Technical Measures:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Encryption in transit (TLS 1.2+)</li>
                  <li>Encryption at rest (AES-256)</li>
                  <li>Multi-factor authentication (MFA) for admin access</li>
                  <li>Regular security updates and patching</li>
                  <li>Automated backups (encrypted, UK/EU storage)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Organizational Measures:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Access controls (role-based, least privilege)</li>
                  <li>Staff training on data protection</li>
                  <li>Data Processing Agreements with all third parties</li>
                  <li>Regular security audits</li>
                  <li>Incident response procedures (Data Breach Response Plan)</li>
                </ul>
              </div>

              <p className="text-gray-700 mt-4 italic">
                For full details, see our Information Security Policy (available on request for enterprise clients).
              </p>
            </div>
          </section>

          {/* Breaches */}
          <section id="breaches" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>9. Data Breaches</h2>
            <p className="text-gray-700 mb-4">In the unlikely event of a data breach:</p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>We will notify the ICO within 72 hours (if required under GDPR)</li>
              <li>We will notify affected individuals within 24 hours (if high risk)</li>
              <li>We have Cyber Liability Insurance</li>
              <li>See our Data Breach Response Plan (internal document)</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <p className="text-gray-700 font-semibold">
                To report a suspected breach: <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a>
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section id="cookies" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>10. Cookies & Tracking</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">10.1 What Are Cookies?</h3>
                <p className="text-gray-700">
                  Small text files stored on your device to remember preferences and analyze usage.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">10.2 Cookies We Use</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Cookie Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Purpose</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Duration</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Your Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Essential</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Login, security, service functionality</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Session or 30 days</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Cannot be disabled (required for service)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Performance</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Analytics, error tracking</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">12 months</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Can opt out via cookie banner</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Functional</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Remember preferences (language, etc.)</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">12 months</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Can opt out via cookie banner</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">10.3 Third-Party Cookies</h3>
                <p className="text-gray-700 mb-3">We may use:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Google Analytics (privacy-focused mode, IP anonymization enabled)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">10.4 Your Cookie Choices</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Accept/reject via cookie banner (when you first visit)</li>
                  <li>Browser settings: Most browsers allow you to block cookies (may affect functionality)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Transfers */}
          <section id="transfers" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>11. International Transfers</h2>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-4">
              <p className="text-gray-700 font-semibold text-lg mb-3">
                We do NOT transfer your data outside the UK/EU.
              </p>
              <p className="text-gray-700">
                All data is stored exclusively in EU data centers (specifically AWS Frankfurt, Germany for application data).
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <p className="text-gray-700 mb-3">
                If we need to transfer data internationally in future (e.g., for support services), we will:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Notify you in advance</li>
                <li>Use approved transfer mechanisms (Standard Contractual Clauses, Adequacy Decisions)</li>
                <li>Obtain your consent if required</li>
              </ul>
            </div>
          </section>

          {/* Children */}
          <section id="children" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>12. Children&apos;s Privacy</h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
              <p className="text-gray-700 mb-3 font-semibold">
                Our services are NOT intended for children under 16.
              </p>
              <p className="text-gray-700">
                We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a child, contact us immediately: <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a>
              </p>
            </div>
          </section>

          {/* Changes */}
          <section id="changes" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>13. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">We may update this Privacy Policy from time to time to reflect:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-6">
              <li>Changes in our services</li>
              <li>Changes in data protection laws</li>
              <li>Feedback from users or regulators</li>
            </ul>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="font-semibold text-gray-900 mb-3">When we make changes:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We will update the &quot;Last Updated&quot; date at the top</li>
                <li>Material changes will be notified via email (30 days before taking effect)</li>
                <li>Continued use of our services after changes = acceptance</li>
              </ul>
            </div>

            <p className="text-gray-700 mt-4 italic">
              Previous versions available on request.
            </p>
          </section>

          {/* Contact */}
          <section id="contact" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>14. Contact Us</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
              <p className="font-semibold text-gray-900 mb-3">Data Protection Queries:</p>
              <ul className="space-y-2 text-gray-700">
                <li>Email: <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a></li>
                <li>Post: SeaReady Ltd, Office 1581, 92 Castle Street, Belfast, BT1 1HE</li>
                <li>Phone: [To be added]</li>
              </ul>
            </div>

            <p className="text-gray-700 font-semibold">
              Response time: We aim to respond within 5 business days.
            </p>
          </section>

          {/* Complaints */}
          <section id="complaints" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>15. Complaints & Regulatory Authority</h2>
            <p className="text-gray-700 mb-4">
              If you&apos;re unhappy with how we handle your data, you have the right to complain to:
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
              <p className="font-semibold text-gray-900 mb-3">Information Commissioner&apos;s Office (ICO)</p>
              <ul className="space-y-2 text-gray-700">
                <li>Website: <a href="https://ico.org.uk" className="text-sea-teal hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
                <li>Helpline: 0303 123 1113</li>
                <li>Post: Information Commissioner&apos;s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-gray-700 font-semibold">
                We encourage you to contact us first so we can try to resolve your concerns directly.
              </p>
            </div>
          </section>

          {/* Maritime */}
          <section id="maritime" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>16. Maritime-Specific Considerations</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">For SMS (Safety Management System) customers:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Your SMS data (vessel details, crew records, procedures) is YOUR data - we are a processor, you are the controller</li>
                  <li>You remain responsible for compliance with maritime regulations (MCA, WBC3, etc.)</li>
                  <li>We provide tools to help you meet regulatory requirements, but ultimate responsibility is yours</li>
                  <li>Data Processing Agreement (DPA) provided with your contract</li>
                  <li>7-year retention for SMS records aligns with MCA requirements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">For consultancy clients:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Information shared during consultancy is confidential and used only for the engagement</li>
                  <li>We may retain anonymized/aggregated data for quality improvement (no personal/company identifiers)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Summary */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-sea-teal rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Summary (Plain Language)</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>What we collect:</strong> Your name, email, company details, and data you input into our systems.</p>
              <p><strong>Why:</strong> To provide our services, improve our products, and comply with laws.</p>
              <p><strong>Who we share with:</strong> Only essential service providers (hosting, payments) - all GDPR compliant, UK/EU based.</p>
              <p><strong>How long:</strong> As long as you&apos;re a customer + 7 years for maritime records (legal requirement).</p>
              <p><strong>Your rights:</strong> Access, correct, delete, download, or object to use of your data anytime.</p>
              <p className="mt-6 font-semibold">
                <strong>Contact:</strong> <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a>
              </p>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-700 mb-3 font-semibold">Acknowledgment</p>
            <p className="text-gray-700">
              By using our services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
            <p className="text-gray-700 mt-2">
              If you do not agree, please do not use our services.
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
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Initial policy</td>
                    <td className="px-4 py-3 text-sm text-gray-700">J. Fulton, Director</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">v1.1</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">2026-01-29</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Updated data processors section with specific provider details (Supabase, Google Workspace, Stripe, GA4) and locations for GDPR Article 13 compliance</td>
                    <td className="px-4 py-3 text-sm text-gray-700">J. Fulton, Director</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              Latest version available at: <a href="https://seaready.co.uk/privacy" className="text-sea-teal hover:underline">https://seaready.co.uk/privacy</a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              This policy complies with UK GDPR and Data Protection Act 2018.
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
