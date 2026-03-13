import type { Metadata } from 'next'
import Link from 'next/link'
import NavbarTransparent from '@/components/navbar-transparent'
import { SiteFooter } from '@/components/primitives/site-footer'
import { copy } from '@/content/strings'

export const metadata: Metadata = {
  title: 'Support Policy | SeaReady Ltd',
  description: 'How to get help with SeaReady maritime compliance software. Support channels, response times, and service levels.',
}

export default function SupportPolicyPage() {
  return (
    <div className="bg-white">
      <NavbarTransparent />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#4a5f7a' }}>
            Support Policy
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
              {id: 'introduction', title: '1. Introduction'},
              {id: 'channels', title: '2. Support Channels'},
              {id: 'contact', title: '3. Contact Details'},
              {id: 'priorities', title: '4. Priority Levels & Response Times'},
              {id: 'how-to', title: '5. How to Get Support'},
              {id: 'included', title: '6. What&apos;s Included in Support'},
              {id: 'escalation', title: '7. Escalation Process'},
              {id: 'out-of-hours', title: '8. Out-of-Hours Support'},
              {id: 'limitations', title: '9. Known Limitations'},
              {id: 'migration', title: '10. Support During Migration'},
              {id: 'maintenance', title: '11. Planned Maintenance'},
              {id: 'responsibilities', title: '12. Customer Responsibilities'},
              {id: 'feedback', title: '13. Feedback & Complaints'},
              {id: 'product-types', title: '14. Support for Different Product Types'},
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
              This Support Policy explains how to get help with SeaReady services and what level of support you can expect.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              This policy applies to all paying customers. Free trials receive best-effort support only.
            </p>
          </section>

          {/* Support Channels */}
          <section id="channels" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>2. Support Channels</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Channel</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Availability</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Email</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">24/7 submission, monitored business hours</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Non-urgent queries, detailed issues</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Knowledge Base</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">24/7 self-service</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Common questions, how-to guides</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Phone</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Business hours (09:00-17:00 Mon-Fri)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Urgent issues, quick questions</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Live Chat</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Business hours (if implemented)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Quick questions, initial triage</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              <strong>Business Hours:</strong> Monday - Friday, 09:00-17:00 GMT/BST (excluding UK public holidays)
            </p>
          </section>

          {/* Contact Details */}
          <section id="contact" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>3. Contact Details</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <ul className="space-y-2 text-gray-700">
                <li><strong>Email Support:</strong> <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a></li>
                <li><strong>Phone Support:</strong> [To be added after incorporation]</li>
                <li><strong>Knowledge Base:</strong> help.seaready.co.uk [To be implemented]</li>
                <li><strong>Status Page:</strong> status.seaready.co.uk [To be implemented]</li>
              </ul>
            </div>
          </section>

          {/* Priority Levels & Response Times */}
          <section id="priorities" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>4. Priority Levels &amp; Response Times</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">4.1 Priority Definitions</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Priority</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Definition</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Examples</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="bg-red-50">
                        <td className="px-4 py-3 text-sm font-bold text-red-900 border-r border-gray-300">P1 - Critical</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Service completely down, major data loss, no workaround</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <ul className="list-disc pl-4 space-y-1 text-xs">
                            <li>App totally inaccessible</li>
                            <li>Database corruption</li>
                            <li>Security breach</li>
                          </ul>
                        </td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="px-4 py-3 text-sm font-bold text-orange-900 border-r border-gray-300">P2 - High</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Major function broken, significant impact, workaround may exist</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <ul className="list-disc pl-4 space-y-1 text-xs">
                            <li>Key feature not working</li>
                            <li>Severe performance issues</li>
                            <li>Login problems affecting multiple users</li>
                          </ul>
                        </td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-4 py-3 text-sm font-bold text-yellow-900 border-r border-gray-300">P3 - Medium</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Minor function issue, limited impact, workaround available</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <ul className="list-disc pl-4 space-y-1 text-xs">
                            <li>Non-critical bug</li>
                            <li>Feature not working as expected</li>
                            <li>Cosmetic issues affecting usability</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r border-gray-300">P4 - Low</td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Questions, minor issues, feature requests</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <ul className="list-disc pl-4 space-y-1 text-xs">
                            <li>How-to questions</li>
                            <li>Typos or minor cosmetic issues</li>
                            <li>Feature enhancement requests</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">4.2 Response Time Commitments</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Priority</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">First Response</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Resolution Target</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Updates</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="bg-red-50">
                        <td className="px-4 py-3 text-sm font-bold text-red-900 border-r border-gray-300">P1</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">1 hour</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">4 hours</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Every 2 hours</td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="px-4 py-3 text-sm font-bold text-orange-900 border-r border-gray-300">P2</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">4 hours</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">24 hours</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Daily</td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-4 py-3 text-sm font-bold text-yellow-900 border-r border-gray-300">P3</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">1 business day</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">5 business days</td>
                        <td className="px-4 py-3 text-sm text-gray-700">As needed</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r border-gray-300">P4</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">1 business day</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Best effort</td>
                        <td className="px-4 py-3 text-sm text-gray-700">As needed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="font-semibold text-gray-900 mb-2">Notes:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                    <li><strong>First Response</strong> = Acknowledgment and initial assessment</li>
                    <li><strong>Resolution Target</strong> = Issue fixed OR workaround provided OR escalated</li>
                    <li>Times calculated during <strong>business hours only</strong> for P3/P4</li>
                    <li>Times calculated <strong>24/7</strong> for P1/P2 (though human response may be delayed out-of-hours for P2)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">4.3 What We Can&apos;t Guarantee</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Instant resolution (complex issues take time)</li>
                  <li>24/7 phone support (email monitored out-of-hours for critical issues)</li>
                  <li>Support in languages other than English</li>
                  <li>Training on your internal processes (consultancy available separately)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Get Support */}
          <section id="how-to" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>5. How to Get Support</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.1 Before You Contact Us</h3>
                <p className="text-gray-700 mb-3">Try these first:</p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li><strong>Check Knowledge Base</strong> - help.seaready.co.uk (common issues solved there)</li>
                  <li><strong>Check Status Page</strong> - status.seaready.co.uk (is there a known outage?)</li>
                  <li><strong>Try basic troubleshooting:</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                      <li>Refresh the page</li>
                      <li>Clear browser cache</li>
                      <li>Try a different browser</li>
                      <li>Check your internet connection</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.2 When You Contact Us</h3>
                <p className="text-gray-700 mb-3 font-semibold">Provide this information for faster resolution:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Account details:</strong> Your email address, company name</li>
                  <li><strong>Issue description:</strong> What happened? What did you expect?</li>
                  <li><strong>Steps to reproduce:</strong> How can we recreate the problem?</li>
                  <li><strong>Screenshots/videos:</strong> If applicable (very helpful!)</li>
                  <li><strong>Browser/device:</strong> Chrome/Safari/Firefox? Desktop/mobile?</li>
                  <li><strong>Urgency:</strong> Which priority level? (see Section 4.1)</li>
                  <li><strong>Impact:</strong> How many users affected? Is work blocked?</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Good Example vs Bad Example</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="font-semibold text-green-900 mb-3">Good Example:</p>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p><strong>Subject:</strong> P2 - Cannot upload documents in SMS Pro</p>
                      <p><strong>Account:</strong> john@example.com (Vessel: MV Example)</p>
                      <p><strong>Issue:</strong> When I click &quot;Upload Document&quot; in the Procedures section, nothing happens. Expected: File picker to open.</p>
                      <p><strong>Steps:</strong> Login → SMS Pro → Procedures → Upload Document button</p>
                      <p><strong>Browser:</strong> Chrome 120 on Windows 11</p>
                      <p><strong>Impact:</strong> 3 users blocked from uploading today&apos;s logs</p>
                      <p><strong>Screenshot:</strong> [attached]</p>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="font-semibold text-red-900 mb-3">Bad Example:</p>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p><strong>Subject:</strong> Help</p>
                      <p>It&apos;s not working.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">5.3 Automatic Acknowledgment</h3>
                <p className="text-gray-700 mb-2">You&apos;ll receive:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Automated email confirmation (within 5 minutes)</li>
                  <li>Ticket number for tracking (e.g., #12345)</li>
                  <li>Estimated response time based on priority</li>
                </ul>
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section id="included" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>6. What&apos;s Included in Support</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">6.1 Included (Free)</h3>
                <div className="bg-green-50 border-l-4 border-green-500 p-6">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Bug fixes</strong> - Software defects corrected at no charge</li>
                    <li><strong>How-to guidance</strong> - Help using existing features</li>
                    <li><strong>Performance issues</strong> - If our systems are slow</li>
                    <li><strong>Account issues</strong> - Login problems, password resets, user management</li>
                    <li><strong>Basic troubleshooting</strong> - Investigating reported issues</li>
                    <li><strong>Service notifications</strong> - Planned maintenance, outages</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">6.2 Not Included (Chargeable or Separate Service)</h3>
                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Training</strong> - Onboarding new staff, comprehensive training sessions (consultancy rates apply)</li>
                    <li><strong>Custom development</strong> - New features specific to you (quoted separately)</li>
                    <li><strong>Data migration</strong> - Importing large volumes of legacy data (consultancy)</li>
                    <li><strong>Integration with your systems</strong> - Connecting to your ERP/PMIS (quoted project)</li>
                    <li><strong>MCA compliance advice</strong> - Professional maritime consultancy (separate service)</li>
                    <li><strong>On-site support</strong> - Visiting your premises (consultancy + travel costs)</li>
                  </ul>
                </div>
                <p className="text-gray-700 mt-4 italic">
                  If unsure, ask - we&apos;ll clarify before any charges.
                </p>
              </div>
            </div>
          </section>

          {/* Escalation Process */}
          <section id="escalation" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>7. Escalation Process</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">7.1 When to Escalate</h3>
                <p className="text-gray-700 mb-2">If you&apos;re not satisfied with:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Response time (exceeded SLA)</li>
                  <li>Quality of support</li>
                  <li>Resolution provided</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">7.2 How to Escalate</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Level 1: Support Team</p>
                    <p className="text-gray-700">Email: <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a> (most issues resolved here)</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Level 2: Escalation Team</p>
                    <p className="text-gray-700">
                      Email: <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a><br/>
                      (Mark subject: &quot;ESCALATION - [Ticket #12345]&quot;)
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Level 3: Director</p>
                    <p className="text-gray-700">
                      Email: <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a><br/>
                      (For unresolved or serious issues only)
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="font-semibold text-gray-900 mb-2">Escalation Response:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Level 2: Acknowledged within 4 business hours</li>
                    <li>Level 3: Acknowledged within 24 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Out-of-Hours Support */}
          <section id="out-of-hours" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>8. Out-of-Hours Support</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">8.1 Standard Support (Included)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Email monitored out-of-hours for <strong>P1 critical issues only</strong></li>
                  <li>Automated monitoring alerts us to system failures 24/7</li>
                  <li>Best-effort response out-of-hours (typically within 2-4 hours for P1)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">8.2 24/7 Premium Support (Optional)</h3>
                <p className="text-gray-700 mb-3">For customers requiring guaranteed 24/7 support:</p>
                <div className="bg-cyan-50 border-l-4 border-sea-teal p-6">
                  <p className="font-semibold text-gray-900 mb-2">Cost: £[X]/month or £[Y]/year (to be defined)</p>
                  <p className="font-semibold text-gray-900 mb-3 mt-4">Includes:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Dedicated phone line (24/7)</li>
                    <li>Guaranteed 1-hour response for P1/P2 issues (24/7)</li>
                    <li>Priority handling of all tickets</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    <strong>Contact us for quote:</strong> <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Known Limitations */}
          <section id="limitations" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>9. Known Limitations</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">9.1 What We Can&apos;t Support</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Third-party software</strong> - Your ERP, other apps (though we&apos;ll try to help with integrations)</li>
                  <li><strong>Your IT infrastructure</strong> - Your internet, network, firewalls</li>
                  <li><strong>Older browsers</strong> - We support latest 2 versions of Chrome, Firefox, Safari, Edge only</li>
                  <li><strong>Customized code</strong> - If you&apos;ve modified our templates (consultancy can help)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">9.2 User Error vs. Software Bug</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Software bug</strong> (our fault) → Fixed free</li>
                  <li><strong>User error</strong> (misunderstanding how it works) → We&apos;ll explain, but repeated training requests may be chargeable</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Support During Migration */}
          <section id="migration" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>10. Support During Migration</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">10.1 Onboarding Support (First 30 Days)</h3>
                <p className="text-gray-700 mb-3">New customers receive enhanced support:</p>
                <div className="bg-green-50 border-l-4 border-green-500 p-6">
                  <ul className="space-y-2 text-gray-700">
                    <li>Extended response times (P3 treated as P2)</li>
                    <li>Dedicated onboarding assistance</li>
                    <li>Setup guidance and best practices</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">10.2 Data Migration Assistance</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Self-service import tools</strong> - Included (CSV upload)</li>
                  <li><strong>Assisted migration</strong> - We help map your data (chargeable if greater than 4 hours)</li>
                  <li><strong>Full migration service</strong> - We do it all (quoted project)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Planned Maintenance */}
          <section id="maintenance" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>11. Planned Maintenance</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">11.1 Scheduled Maintenance</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Window:</strong> Sundays 02:00-06:00 GMT</li>
                    <li><strong>Frequency:</strong> Up to once per month</li>
                    <li><strong>Notification:</strong> 48 hours advance notice via email</li>
                    <li><strong>Impact:</strong> Service may be unavailable or read-only</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">11.2 Emergency Maintenance</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Performed outside maintenance window if critical (security patches, etc.)</li>
                  <li>Notification as soon as reasonably possible</li>
                  <li>Minimized impact where feasible</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">11.3 Status Updates</h3>
                <p className="text-gray-700 mb-2">During outages or maintenance:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Status page updated: status.seaready.co.uk</li>
                  <li>Email notification to affected customers</li>
                  <li>Estimated restoration time provided</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Customer Responsibilities */}
          <section id="responsibilities" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>12. Customer Responsibilities</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">You should:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>✓ Report issues promptly (the sooner we know, the faster we fix)</li>
                      <li>✓ Provide requested information (screenshots, steps to reproduce)</li>
                      <li>✓ Keep software up-to-date (use latest browser versions)</li>
                      <li>✓ Follow our guidance (if we provide a workaround, try it)</li>
                      <li>✓ Maintain adequate internet connection</li>
                      <li>✓ Back up critical data (we provide backups, but you should keep copies too)</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">We appreciate:</p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>Patience during complex investigations</li>
                      <li>Detailed bug reports (easier to reproduce = faster fix)</li>
                      <li>Feedback on our support (helps us improve)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feedback & Complaints */}
          <section id="feedback" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>13. Feedback & Complaints</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">13.1 Feedback</h3>
                <p className="text-gray-700 mb-3">We welcome feedback on our support:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>After ticket resolution: Rate our service (1-5 stars)</li>
                  <li>Email anytime: <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a></li>
                  <li>Annual survey: Help us improve</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">13.2 Formal Complaints</h3>
                <p className="text-gray-700 mb-3">If you&apos;re unhappy with our support:</p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Email: <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a></li>
                  <li>We&apos;ll investigate and respond within 5 business days</li>
                  <li>If unresolved: Escalate to Director (<a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a>)</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Support for Different Product Types */}
          <section id="product-types" className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0891B2' }}>14. Support for Different Product Types</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">14.1 SaaS Products (SMS Pro, MPX)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Full support as per this policy</li>
                  <li>Ongoing updates and bug fixes included</li>
                  <li>Feature requests considered for roadmap</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">14.2 Digital Products (SMS Templates)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>14-day support after purchase (setup help, how-to questions)</li>
                  <li>Updates provided if regulatory changes require (first 12 months)</li>
                  <li>Extended support available (consultancy rates)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">14.3 Consultancy Projects</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Support during project delivery (included)</li>
                  <li>Post-project support: [Specify in project agreement - typically 30-90 days warranty]</li>
                  <li>Ongoing maintenance: Retainer or ad-hoc rates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Summary */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-sea-teal rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Summary (Quick Reference)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                <thead className="bg-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Need</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300">Channel</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Expected Response</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Emergency (service down)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Email support@ (mark P1)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1 hour</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Urgent (major issue)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Email or phone</td>
                    <td className="px-4 py-3 text-sm text-gray-700">4 hours</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">General help</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Email or Knowledge Base</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1 business day</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">How-to question</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Knowledge Base first, then email</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1 business day</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Feature request</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">Email support@ (mark P4)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Acknowledged, added to roadmap</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-300">Unhappy with support</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300">escalation@ or jonathan@</td>
                    <td className="px-4 py-3 text-sm text-gray-700">4 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-2 text-gray-700">
              <p><strong>Business Hours:</strong> Mon-Fri 09:00-17:00 GMT</p>
              <p><strong>Out-of-hours:</strong> P1 critical issues only (best effort)</p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Email:</strong> <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a></li>
              <li><strong>Escalation:</strong> <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a></li>
              <li><strong>Director:</strong> <a href="mailto:support@seaready.co.uk" className="text-sea-teal hover:underline">support@seaready.co.uk</a></li>
              <li><strong>Phone:</strong> [To be added]</li>
              <li><strong>Office:</strong> SeaReady Ltd, Office 1581, 92 Castle Street, Belfast, BT1 1HE</li>
            </ul>
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
              This policy is incorporated into our <Link href="/sla" className="text-sea-teal hover:underline">Service Level Agreement (SLA)</Link>.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Latest version: <a href="https://seaready.co.uk/support-policy" className="text-sea-teal hover:underline">https://seaready.co.uk/support-policy</a>
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
