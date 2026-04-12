import type { Metadata } from 'next'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives/site-footer'
import { copy } from '@/content/strings'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy | SeaReady Ltd',
  description: 'Guidelines for permitted and prohibited use of SeaReady maritime compliance services.',
}

export default function AcceptableUsePolicyPage() {
  return (
    <div className="bg-white">
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#4a5f7a' }}>
            Acceptable Use Policy
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
              {id: 'purpose', title: '1. Purpose'},
              {id: 'permitted', title: '2. Permitted Use'},
              {id: 'prohibited', title: '3. Prohibited Use'},
              {id: 'maritime', title: '4. Maritime-Specific Prohibited Uses'},
              {id: 'resources', title: '5. Resource Usage & Fair Use'},
              {id: 'responsibilities', title: '6. User Responsibilities'},
              {id: 'monitoring', title: '7. Monitoring & Enforcement'},
              {id: 'third-party', title: '8. Third-Party Services'},
              {id: 'changes', title: '9. Changes to This Policy'},
              {id: 'reporting', title: '10. Reporting & Contact'},
              {id: 'legal', title: '11. Legal Consequences'},
            ].map(item => (
              <a key={item.id} href={`#${item.id}`} className="text-sea-teal hover:underline">{item.title}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-lg max-w-none">

          {/* Purpose */}
          <section id="purpose" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>1. Purpose</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Acceptable Use Policy (&quot;AUP&quot;) defines what you can and cannot do when using SeaReady services. It&apos;s part of our Terms of Service.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              By using our services, you agree to this policy.
            </p>
          </section>

          {/* Permitted Use */}
          <section id="permitted" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>2. Permitted Use</h2>
            <p className="text-gray-700 mb-4">You may use SeaReady services to:</p>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Operate your business:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Manage safety management systems (SMS)</li>
                  <li>Track vessels and operational data</li>
                  <li>Store maritime compliance documents</li>
                  <li>Communicate with your team</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Access from multiple locations:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Office, vessels, remote locations</li>
                  <li>Multiple devices (desktop, tablet, mobile)</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Collaborate:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Share data with authorized users within your organization</li>
                  <li>Work with auditors/surveyors (read-only access)</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Integrate:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Connect our services with your other business systems (via API, where available)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Prohibited Use */}
          <section id="prohibited" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>3. Prohibited Use</h2>
            <p className="text-gray-700 mb-6 font-semibold">You must NOT use SeaReady services for:</p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.1 Illegal Activities</h3>
                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Any illegal purpose or activity</li>
                    <li>Violating any UK or international laws</li>
                    <li>Infringing intellectual property rights</li>
                    <li>Fraud, theft, or identity theft</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.2 Security &amp; System Abuse</h3>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Hacking or unauthorized access:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Attempting to breach security measures</li>
                      <li>Accessing other customers&apos; data</li>
                      <li>Scanning or probing for vulnerabilities</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">System disruption:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Overloading our infrastructure (DoS/DDoS attacks)</li>
                      <li>Excessive API calls beyond reasonable use</li>
                      <li>Introducing viruses, malware, or malicious code</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Credential sharing:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Sharing login credentials with unauthorized persons</li>
                      <li>Creating accounts with false information</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.3 Data Misuse</h3>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Illegal or harmful content:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Uploading illegal content (child exploitation material, terrorist content, etc.)</li>
                      <li>Defamatory, obscene, or offensive material</li>
                      <li>Personal data you don&apos;t have the right to process</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Spam or harassment:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Sending unsolicited communications via our systems</li>
                      <li>Harassing other users or our staff</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.4 Commercial Abuse</h3>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Reselling or sublicensing:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Reselling our services without authorization</li>
                      <li>Operating a service bureau using our platform (unless agreed in writing)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Reverse engineering:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Attempting to copy, decompile, or reverse-engineer our software</li>
                      <li>Extracting source code</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Competitive intelligence:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Using our services to build a competing product</li>
                      <li>Benchmarking for competitive purposes (without permission)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.5 Misrepresentation</h3>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Impersonation:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Pretending to be SeaReady staff</li>
                      <li>Impersonating another user or organization</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">False information:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Providing fraudulent data during registration</li>
                      <li>Falsifying compliance records (this could endanger lives!)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Maritime-Specific */}
          <section id="maritime" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>4. Maritime-Specific Prohibited Uses</h2>
            <p className="text-gray-700 mb-6">Given the safety-critical nature of maritime operations:</p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">DO NOT:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Falsify SMS records</strong> - This could lead to accidents, regulatory violations, and legal consequences</li>
                <li><strong>Bypass safety procedures</strong> documented in your SMS</li>
                <li><strong>Share MCA inspection documents with competitors</strong> (your data, but consider confidentiality)</li>
                <li><strong>Use our consultancy advice without implementation</strong> - Advice is only as good as its execution</li>
              </ul>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">IMPORTANT:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>SeaReady tools assist with compliance, but YOU remain responsible for safety and regulatory adherence</li>
                <li>Do not rely solely on software - use professional judgment</li>
                <li>When in doubt, consult MCA or your surveyor</li>
              </ul>
            </div>
          </section>

          {/* Resource Usage */}
          <section id="resources" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>5. Resource Usage & Fair Use</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.1 Fair Use</h3>
                <p className="text-gray-700 mb-4">Our subscriptions assume &quot;reasonable commercial use&quot;. This means:</p>

                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Acceptable:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Daily use by your team</li>
                      <li>Storing vessel records, procedures, documents</li>
                      <li>Normal API usage for integrations</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Excessive (we&apos;ll contact you):</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Running automated scripts that hammer our servers</li>
                      <li>Storing huge files unrelated to maritime operations (e.g., using us as general file storage)</li>
                      <li>Creating thousands of unnecessary records</li>
                    </ul>
                  </div>
                </div>

                <p className="text-gray-700 mt-4">
                  <strong>If your use is excessive:</strong> We&apos;ll discuss options (upgrade to higher tier, optimize usage, etc.). We won&apos;t cut you off without warning.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.2 Storage Limits</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Standard plans include [X GB] per vessel (to be defined based on pricing tier)</li>
                  <li>Overage: £[X] per additional GB per month</li>
                  <li>We&apos;ll warn you before charges apply</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.3 API Rate Limits</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Standard: [X] requests per minute (to be defined based on technical implementation)</li>
                  <li>Enterprise: Higher limits available</li>
                  <li>Exceeded limits = temporary throttling (not account suspension)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section id="responsibilities" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>6. User Responsibilities</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">6.1 Account Security</h3>
                <p className="text-gray-700 mb-3">You must:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="font-semibold text-green-900 mb-2">DO:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>✓ Use strong, unique passwords</li>
                      <li>✓ Enable multi-factor authentication (MFA)</li>
                      <li>✓ Notify us immediately of suspected unauthorized access</li>
                      <li>✓ Log out from shared devices</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="font-semibold text-red-900 mb-2">DON&apos;T:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>✗ Share credentials</li>
                      <li>✗ Leave accounts logged in on public computers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">6.2 Data Accuracy</h3>
                <p className="text-gray-700 mb-3">You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Accuracy of data you input</li>
                  <li>Ensuring you have the right to process personal data (crew records, etc.)</li>
                  <li>Compliance with GDPR for data you control</li>
                </ul>
                <p className="text-gray-700 mt-3 italic">
                  We are not responsible for errors in YOUR data.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">6.3 User Management</h3>
                <p className="text-gray-700 mb-3">If you&apos;re an admin:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="font-semibold text-green-900 mb-2">DO:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>✓ Grant access only to authorized users</li>
                      <li>✓ Remove access for departed employees promptly</li>
                      <li>✓ Review user permissions regularly</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="font-semibold text-red-900 mb-2">DON&apos;T:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>✗ Allow unauthorized users (e.g., competitors, casual friends)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Monitoring & Enforcement */}
          <section id="monitoring" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>7. Monitoring & Enforcement</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">7.1 We May Monitor</h3>
                <p className="text-gray-700 mb-3">To ensure compliance and security, we may:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Monitor system usage (automated)</li>
                  <li>Review logs for suspicious activity</li>
                  <li>Investigate reports of abuse</li>
                  <li>Scan uploaded files for malware</li>
                </ul>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="font-semibold text-gray-900 mb-2">We DO NOT:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Read your data for marketing purposes</li>
                    <li>Share your data with third parties (except as per Privacy Policy)</li>
                    <li>Monitor content unless we have reason to suspect abuse</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">7.2 Reporting Abuse</h3>
                <p className="text-gray-700 mb-3">If you suspect another user is violating this AUP:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Email: <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                  <li>Provide: Details of the violation, evidence if available</li>
                  <li>We&apos;ll investigate confidentially</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">7.3 Our Response to Violations</h3>
                <p className="text-gray-700 mb-4">If you violate this AUP, we may:</p>

                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">First offense (minor):</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Warning via email</li>
                      <li>Request to cease the activity</li>
                      <li>Opportunity to remedy (usually 14 days)</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Serious or repeated violations:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Temporary account suspension</li>
                      <li>Permanent account termination</li>
                      <li>Report to authorities (if illegal activity)</li>
                      <li>Pursue legal action (if damages occurred)</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Immediate suspension (no warning) if:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Illegal activity (hacking, fraud, illegal content)</li>
                      <li>Poses risk to other customers or our systems</li>
                      <li>Required by law</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">7.4 No Refunds for Violations</h3>
                <p className="text-gray-700 mb-2">If your account is terminated for AUP violations:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>No refund for prepaid subscriptions</li>
                  <li>Outstanding fees remain due</li>
                  <li>You have 7 days to export your data (vs. 30 days for regular cancellation)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section id="third-party" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>8. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              If you integrate SeaReady with third-party services (e.g., your ERP, other maritime software):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>You&apos;re responsible for compliance with their terms of service</li>
              <li>We&apos;re not liable for issues with third-party services</li>
              <li>Ensure data sharing is secure and authorized</li>
            </ul>
          </section>

          {/* Changes */}
          <section id="changes" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>9. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">We may update this AUP from time to time:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Material changes notified 30 days in advance</li>
              <li>Posted on our website with &quot;Last Updated&quot; date</li>
              <li>Continued use = acceptance</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>If you don&apos;t agree with changes:</strong> Cancel your subscription before effective date (no penalty)
            </p>
          </section>

          {/* Reporting & Contact */}
          <section id="reporting" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>10. Reporting & Contact</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <ul className="space-y-2 text-gray-700">
                <li><strong>Report AUP violations:</strong> <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                <li><strong>Security concerns:</strong> <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                <li><strong>General questions:</strong> <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                <li><strong>Office:</strong> SeaReady Ltd, Office 1581, 92 Castle Street, Belfast, BT1 1HE</li>
              </ul>
            </div>
          </section>

          {/* Legal Consequences */}
          <section id="legal" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>11. Legal Consequences</h2>
            <p className="text-gray-700 mb-4">Violating this AUP may result in:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Civil liability (damages, costs)</li>
              <li>Criminal prosecution (if illegal activity)</li>
              <li>Regulatory penalties (if maritime safety compromised)</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <p className="font-semibold text-gray-900 mb-3">Examples:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Falsifying SMS records →</strong> MCA penalties, vessel detention, criminal charges</li>
                <li><strong>Hacking →</strong> Computer Misuse Act 1990 violations (up to 10 years imprisonment)</li>
                <li><strong>Data breaches →</strong> GDPR fines (up to 4% of turnover or £17.5 million)</li>
              </ul>
            </div>

            <p className="text-gray-700 mt-6 font-semibold text-lg">
              We take compliance seriously. Please do the same.
            </p>
          </section>

          {/* Summary */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-sea-teal rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Summary (Plain Language)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-gray-900 mb-3">DO:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Use our services for legitimate maritime business</li>
                  <li>✓ Keep your account secure</li>
                  <li>✓ Be honest and accurate with your data</li>
                  <li>✓ Treat our systems and other users with respect</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-3">DON&apos;T:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✗ Do anything illegal</li>
                  <li>✗ Try to hack or abuse our systems</li>
                  <li>✗ Falsify safety records (this could kill people)</li>
                  <li>✗ Spam, harass, or misuse the platform</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 mt-6">
              <strong>If you&apos;re unsure whether something is allowed, ask us first:</strong> <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a>
            </p>
            <p className="text-gray-700 mt-4 italic">
              Common sense applies: If it feels wrong, it probably is.
            </p>
          </div>

          {/* Acknowledgment */}
          <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-700">
              By using SeaReady services, you agree to this Acceptable Use Policy.
            </p>
            <p className="text-gray-700 mt-2">
              Violations may result in account suspension or termination.
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
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              This policy is part of our Terms of Service and is enforceable as a contract term.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Latest version: <a href="https://seaready.co.uk/acceptable-use" className="text-sea-teal hover:underline">https://seaready.co.uk/acceptable-use</a>
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
