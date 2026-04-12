import type { Metadata } from 'next'
import Link from 'next/link'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives/site-footer'
import { copy } from '@/content/strings'

export const metadata: Metadata = {
  title: 'Service Level Agreement | SeaReady Ltd',
  description: 'SeaReady SLA commitments: 99.5% uptime, support response times, and service credits for maritime compliance software.',
}

export default function SLAPage() {
  return (
    <div className="bg-white">
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#4a5f7a' }}>
            Service Level Agreement
          </h1>
          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p><strong>Company:</strong> SeaReady Ltd</p>
            <p><strong>Registered Office:</strong> Office 1581, 92 Castle Street, Belfast, BT1 1HE</p>
            <p className="pt-4"><strong>Version:</strong> v0.1 (DRAFT)</p>
            <p><strong>Effective Date:</strong> [Date of incorporation]</p>
            <p><strong>Last Reviewed:</strong> 2026-01-22</p>
            <p><strong>Next Review:</strong> [6 months after effective date]</p>
            <p><strong>Owner:</strong> Jonathan Fulton, Director</p>
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
              {id: 'availability', title: '2. Service Availability'},
              {id: 'support', title: '3. Support Services'},
              {id: 'performance', title: '4. Performance Targets'},
              {id: 'data-protection', title: '5. Data Protection & Security'},
              {id: 'credits', title: '6. Service Credits'},
              {id: 'customer-responsibilities', title: '7. Customer Responsibilities'},
              {id: 'modifications', title: '8. Modifications to Service'},
              {id: 'termination', title: '9. Service Termination'},
              {id: 'contact', title: '10. Contact & Support'},
              {id: 'definitions', title: '11. Definitions'},
              {id: 'legal', title: '12. Legal'},
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
              This Service Level Agreement (&quot;SLA&quot;) describes the service levels that SeaReady Ltd commits to providing for its software products and services.
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">This SLA applies to:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>SeaReady SMS Pro (SaaS application)</li>
                  <li>MPX (if offered as standalone product)</li>
                  <li>SeaReady website and customer portal</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">This SLA does NOT apply to:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Consultancy services (covered by separate Master Service Agreement)</li>
                  <li>SMS Templates (one-off products with no ongoing SLA)</li>
                  <li>Free trials or beta versions (best-effort only)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Service Availability */}
          <section id="availability" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>2. Service Availability</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">2.1 Uptime Commitment</h3>
                <div className="bg-cyan-50 border-l-4 border-sea-teal p-6 mb-4">
                  <p className="text-2xl font-bold text-gray-900 mb-2">Target Uptime: 99.5% per calendar month</p>
                  <p className="text-gray-700 mb-2"><strong>What this means:</strong></p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Maximum downtime: ~3.6 hours per month</li>
                    <li>Equivalent to: ~43 hours per year</li>
                  </ul>
                </div>

                <p className="text-gray-700 mb-2"><strong>Measurement:</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Measured from SeaReady&apos;s monitoring systems</li>
                  <li>Calculated monthly: (Total minutes in month - Downtime minutes) / Total minutes × 100</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">2.2 Exclusions from Uptime Calculation</h3>
                <p className="text-gray-700 mb-3">Downtime does NOT count against SLA if caused by:</p>

                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">1. Scheduled Maintenance:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Performed during maintenance windows (see below)</li>
                      <li>Customer notified 48 hours in advance</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">2. Customer Actions:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Customer&apos;s misuse of the service</li>
                      <li>Customer&apos;s internet/network issues</li>
                      <li>Customer-initiated service suspension</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">3. Force Majeure:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Acts of God, war, terrorism</li>
                      <li>Government actions, pandemics</li>
                      <li>Internet backbone failures beyond our control</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">4. Third-Party Services:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Hosting provider outages (AWS, Azure, etc.)</li>
                      <li>DNS provider failures</li>
                      <li>Payment processor downtime</li>
                    </ul>
                    <p className="text-sm text-gray-600 italic mt-2">
                      Note: SeaReady will use best efforts to minimize impact and choose reliable providers
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">5. Beta Features:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Features marked as &quot;beta&quot; or &quot;experimental&quot;</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">2.3 Scheduled Maintenance Windows</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-4">
                  <p className="font-semibold text-gray-900 mb-3">Standard Maintenance Window:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Day:</strong> Sunday</li>
                    <li><strong>Time:</strong> 02:00 - 06:00 GMT/BST</li>
                    <li><strong>Frequency:</strong> Up to once per month</li>
                    <li><strong>Notification:</strong> 48 hours advance notice via email</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Emergency Maintenance:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>May be performed outside maintenance windows if critical security issue</li>
                      <li>Notification: As soon as reasonably possible</li>
                      <li>Duration: Minimized to extent possible</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Customer Impact During Maintenance:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Service may be unavailable</li>
                      <li>Read-only access may be available (if possible)</li>
                      <li>No data loss will occur</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Support Services */}
          <section id="support" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>3. Support Services</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.1 Support Channels</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Channel</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Availability</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Response Time Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Email (info@fleetskipper.com)</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">24/7 (monitored 09:00-17:00 Mon-Fri)</td>
                        <td className="px-4 py-3 text-sm text-gray-700">See Section 3.2</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Phone</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">[To be added] - Business hours only</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Immediate</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Help Center / Knowledge Base</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">24/7 self-service</td>
                        <td className="px-4 py-3 text-sm text-gray-700">N/A</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Live Chat (if implemented)</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Business hours only (09:00-17:00 Mon-Fri)</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Within 5 minutes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Business Hours:</strong> 09:00 - 17:00 GMT/BST, Monday - Friday (excluding UK public holidays)
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.2 Support Response Times</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Priority</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Definition</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Response Time</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Resolution Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="bg-red-50">
                        <td className="px-4 py-3 text-sm font-bold text-red-900 border-r border-gray-300">P1 - Critical</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                          Service down, no workaround, major impact on operations
                          <div className="text-xs mt-1 text-gray-600">e.g., App completely inaccessible, Data loss, Security breach</div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">1 hour</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">4 hours</td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="px-4 py-3 text-sm font-bold text-orange-900 border-r border-gray-300">P2 - High</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                          Major function broken, workaround available, significant impact
                          <div className="text-xs mt-1 text-gray-600">e.g., Key feature not working, Performance severely degraded</div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">4 hours</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">24 hours</td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-4 py-3 text-sm font-bold text-yellow-900 border-r border-gray-300">P3 - Medium</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                          Minor function issue, minimal impact
                          <div className="text-xs mt-1 text-gray-600">e.g., Non-critical bug, Feature request affecting one user</div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">8 hours (next business day)</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">5 business days</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r border-gray-300">P4 - Low</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">
                          Cosmetic issue, question, enhancement request
                          <div className="text-xs mt-1 text-gray-600">e.g., Typo, General question, Feature request</div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">24 hours (1 business day)</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">Best effort</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="font-semibold text-gray-900 mb-2">Notes:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                    <li><strong>Response time</strong> = Acknowledgment and initial assessment</li>
                    <li><strong>Resolution target</strong> = Issue resolved or workaround provided</li>
                    <li>Times measured during business hours only (P3/P4) or 24/7 (P1/P2)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3.3 Escalation</h3>
                <p className="text-gray-700 mb-3">If you are not satisfied with support response:</p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li><strong>First Escalation:</strong> Email <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                  <li><strong>Executive Escalation:</strong> Email Jonathan Fulton directly (<a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a>)</li>
                  <li><strong>Response:</strong> Escalations acknowledged within 2 hours during business hours</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Performance Targets */}
          <section id="performance" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>4. Performance Targets</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">4.1 Application Performance</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Page Load Times:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li><strong>Target:</strong> Less than 2 seconds for 95% of page loads</li>
                      <li><strong>Maximum acceptable:</strong> Less than 5 seconds</li>
                      <li><strong>Measurement:</strong> From SeaReady servers (excludes customer network latency)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">API Response Times:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li><strong>Target:</strong> Less than 500ms for 95% of API calls</li>
                      <li><strong>Maximum acceptable:</strong> Less than 2 seconds</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Mobile App:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li><strong>Target:</strong> Less than 3 seconds for content display after launch</li>
                      <li><strong>Real-time data updates:</strong> Less than 30 seconds latency (MPX vessel tracking)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">4.2 Performance Monitoring</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>SeaReady monitors performance 24/7</li>
                  <li>Customers can view status at: [status.seaready.co.uk - to be implemented]</li>
                  <li>Customers notified of performance degradation greater than 10 minutes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection & Security */}
          <section id="data-protection" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>5. Data Protection & Security</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.1 Data Security Commitments</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Encryption:</strong> All data encrypted in transit (TLS 1.2+) and at rest (AES-256)</li>
                  <li><strong>Access Controls:</strong> Multi-factor authentication, role-based access</li>
                  <li><strong>Backups:</strong> Daily automated backups, retained for 30 days minimum</li>
                  <li><strong>Compliance:</strong> GDPR, Data Protection Act 2018</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  See <strong>Information Security Policy</strong> for full details.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.2 Data Backup & Recovery</h3>
                <div className="bg-cyan-50 border-l-4 border-sea-teal p-6">
                  <p className="font-semibold text-gray-900 mb-3">Backup Frequency:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Customer data:</strong> Daily (automated, encrypted)</li>
                    <li><strong>System configuration:</strong> Continuous (version-controlled)</li>
                  </ul>

                  <p className="font-semibold text-gray-900 mb-3 mt-4">Recovery Targets:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Recovery Time Objective (RTO):</strong> 4 hours (time to restore service)</li>
                    <li><strong>Recovery Point Objective (RPO):</strong> 24 hours (maximum data loss)</li>
                  </ul>

                  <p className="font-semibold text-gray-900 mb-3 mt-4">Backup Testing:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>Quarterly restoration tests</li>
                    <li>Annual full disaster recovery drill</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.3 Data Breach Response</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>ICO notification within 72 hours (if required under GDPR)</li>
                  <li>Customer notification within 24 hours (if high risk)</li>
                  <li>Covered by Cyber Liability Insurance (£[X] million - to be added when policy obtained)</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  See <strong>Data Breach Response Plan</strong> for full details.
                </p>
              </div>
            </div>
          </section>

          {/* Service Credits */}
          <section id="credits" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>6. Service Credits (Compensation)</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">6.1 When Credits Apply</h3>
                <p className="text-gray-700 mb-4">
                  If SeaReady fails to meet the 99.5% uptime commitment in any calendar month, customers are eligible for service credits.
                </p>

                <p className="font-semibold text-gray-900 mb-3">Credit Calculation:</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Monthly Uptime</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Credit (% of monthly subscription fee)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="bg-green-50">
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-300">99.5% - 100%</td>
                        <td className="px-4 py-3 text-sm text-gray-900">0% (SLA met)</td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-300">99.0% - 99.49%</td>
                        <td className="px-4 py-3 text-sm text-gray-900">10% credit</td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-300">98.0% - 98.99%</td>
                        <td className="px-4 py-3 text-sm text-gray-900">25% credit</td>
                      </tr>
                      <tr className="bg-red-50">
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-300">Less than 98.0%</td>
                        <td className="px-4 py-3 text-sm text-gray-900">50% credit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="font-semibold text-gray-900 mb-2">Example:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Customer pays £100/month</li>
                    <li>Uptime in January: 98.5%</li>
                    <li>Customer receives £25 credit (applied to next month&apos;s invoice)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">6.2 How to Claim Credits</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Customer must request credit within 30 days of end of month</li>
                  <li>Email: <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a> with &quot;SLA Credit Request&quot; subject</li>
                  <li>Include: Month, account details, description of downtime experienced</li>
                  <li>SeaReady reviews monitoring logs and approves/denies within 10 business days</li>
                  <li>Credits applied to next invoice (or refunded if customer cancels)</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">6.3 Credit Limitations</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Credits are the SOLE remedy for SLA breaches (no other compensation)</li>
                  <li>Credits limited to 50% of one month&apos;s fee (maximum)</li>
                  <li>Credits do not apply to exclusions listed in Section 2.2</li>
                  <li>No credit for downtime less than 10 minutes (minor blips)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Customer Responsibilities */}
          <section id="customer-responsibilities" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>7. Customer Responsibilities</h2>
            <p className="text-gray-700 mb-4">For SeaReady to meet this SLA, customers must:</p>

            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">1. Use Supported Browsers/Devices:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Latest 2 versions of Chrome, Firefox, Safari, Edge</li>
                  <li>iOS 14+ or Android 10+ for mobile apps</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">2. Maintain Adequate Internet:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Minimum 2 Mbps connection</li>
                  <li>Customer responsible for own network reliability</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">3. Provide Accurate Information:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Valid contact details for support notifications</li>
                  <li>Clear description of issues when reporting</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">4. Follow Security Best Practices:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Strong passwords, enable MFA</li>
                  <li>Don&apos;t share login credentials</li>
                  <li>Report suspected security issues immediately</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">5. Reasonable Use:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Don&apos;t abuse the service (excessive API calls, etc.)</li>
                  <li>See <Link href="/acceptable-use" className="text-sea-teal hover:underline">Acceptable Use Policy</Link></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Modifications */}
          <section id="modifications" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>8. Modifications to Service</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">8.1 Feature Changes</h3>
                <p className="text-gray-700 mb-2">SeaReady may:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Add new features (usually at no extra cost)</li>
                  <li>Modify existing features (with 30 days notice if significant change)</li>
                  <li>Deprecate features (with 90 days notice and migration path)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">8.2 Pricing Changes</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Pricing changes notified 60 days in advance</li>
                  <li>Existing customers: Pricing locked for 12 months from signup (unless upgraded)</li>
                  <li>After 12 months: Subject to annual price adjustments (max 10% increase per year)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">8.3 SLA Changes</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>This SLA may be updated from time to time</li>
                  <li>Material changes notified 30 days in advance</li>
                  <li>Continued use of service constitutes acceptance</li>
                  <li>Customers may cancel if they do not accept changes (no penalty)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section id="termination" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>9. Service Termination</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">9.1 By Customer</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Cancel anytime with 30 days notice (monthly plans)</li>
                  <li>Annual plans: 30 days notice, no refund for remaining months</li>
                  <li>Data export provided upon request (CSV format, 30 days retention after cancellation)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">9.2 By SeaReady</h3>
                <p className="text-gray-700 mb-3">SeaReady may suspend or terminate service if:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Payment overdue greater than 30 days</li>
                  <li>Breach of <Link href="/acceptable-use" className="text-sea-teal hover:underline">Acceptable Use Policy</Link></li>
                  <li>Fraudulent activity detected</li>
                  <li>Required by law</li>
                </ul>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                  <p className="font-semibold text-gray-900 mb-2">Notice:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>14 days notice (except fraud/legal requirement)</li>
                    <li>Opportunity to remedy breach before termination</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact & Support */}
          <section id="contact" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>10. Contact & Support</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-gray-900 mb-3">General Support:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>Email: <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                    <li>Phone: [To be added]</li>
                    <li>Help Center: help.seaready.co.uk (to be implemented)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-3">Billing Queries:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>Email: <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-3">Security Issues:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>Email: <a href="mailto:info@fleetskipper.com" className="text-sea-teal hover:underline">info@fleetskipper.com</a></li>
                    <li>Emergency: [Phone - to be added]</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-3">Service Status:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>Status page: status.seaready.co.uk (to be implemented)</li>
                    <li>Subscribe to updates: [To be implemented]</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Definitions */}
          <section id="definitions" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>11. Definitions</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Business Hours:</strong> 09:00-17:00 GMT/BST, Monday-Friday (excluding UK public holidays)</li>
              <li><strong>Downtime:</strong> Service inaccessible or unable to perform core functions</li>
              <li><strong>Service:</strong> SeaReady SMS Pro, MPX, or other SaaS products as specified in customer agreement</li>
              <li><strong>Uptime:</strong> Service is accessible and performing core functions</li>
            </ul>
          </section>

          {/* Legal */}
          <section id="legal" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>12. Legal</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">12.1 Warranty Disclaimer</h3>
                <p className="text-gray-700">Service provided &quot;as is&quot; without warranties beyond those in this SLA.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">12.2 Limitation of Liability</h3>
                <p className="text-gray-700 mb-2">
                  SeaReady&apos;s total liability limited to service credits described in Section 6, except:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Fraud or willful misconduct</li>
                  <li>Death or personal injury caused by negligence</li>
                  <li>Matters that cannot be excluded by law</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">12.3 Governing Law</h3>
                <p className="text-gray-700">
                  This SLA is governed by the laws of England and Wales (or Northern Ireland, as applicable).
                </p>
              </div>
            </div>
          </section>

          {/* Acknowledgment */}
          <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-700">
              By using SeaReady services, you acknowledge that you have read and agree to this SLA.
            </p>
            <p className="text-gray-700 mt-2">
              This SLA is incorporated into your Master Service Agreement or <Link href="/terms" className="text-sea-teal hover:underline">Terms of Service</Link>.
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
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">v0.1</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">2026-01-22</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Initial draft SLA</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              Latest version available at: <a href="https://seaready.co.uk/sla" className="text-sea-teal hover:underline">https://seaready.co.uk/sla</a>
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
