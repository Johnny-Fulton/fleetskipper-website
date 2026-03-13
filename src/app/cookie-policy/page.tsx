import NavbarLight from '@/components/navbar-light'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | SeaReady Ltd',
  description: 'Information about how SeaReady uses cookies and similar technologies on our website.',
}

export default function CookiePolicyPage() {
  return (
    <div className="bg-white">
      <NavbarLight />

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold mb-8" style={{ color: '#0E1A2B' }}>
          Cookie Policy
        </h1>

        <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
          <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
              1. What Are Cookies?
            </h2>
            <p style={{ color: '#4B535D' }}>
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They help websites remember your preferences, understand how you use the site, and improve your experience.
            </p>
            <p style={{ color: '#4B535D' }}>
              This Cookie Policy explains what cookies we use, why we use them, and how you can control them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
              2. Cookies We Use
            </h2>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#0891B2' }}>
                  2.1 Strictly Necessary Cookies
                </h3>
                <p style={{ color: '#4B535D' }} className="mb-3">
                  These cookies are essential for our website to function properly. You cannot opt out of these cookies.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left border-r border-gray-300">Cookie Name</th>
                        <th className="px-4 py-2 text-left border-r border-gray-300">Purpose</th>
                        <th className="px-4 py-2 text-left">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-300">
                        <td className="px-4 py-2 border-r border-gray-300">cc_cookie</td>
                        <td className="px-4 py-2 border-r border-gray-300">Stores your cookie consent preferences</td>
                        <td className="px-4 py-2">6 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#0891B2' }}>
                  2.2 Analytics Cookies (Optional - Requires Your Consent)
                </h3>
                <p style={{ color: '#4B535D' }} className="mb-3">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We only use these cookies if you give us permission.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left border-r border-gray-300">Cookie Name</th>
                        <th className="px-4 py-2 text-left border-r border-gray-300">Provider</th>
                        <th className="px-4 py-2 text-left border-r border-gray-300">Purpose</th>
                        <th className="px-4 py-2 text-left">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-300">
                        <td className="px-4 py-2 border-r border-gray-300">_ga</td>
                        <td className="px-4 py-2 border-r border-gray-300">Google Analytics</td>
                        <td className="px-4 py-2 border-r border-gray-300">Distinguishes unique users</td>
                        <td className="px-4 py-2">2 years</td>
                      </tr>
                      <tr className="border-t border-gray-300">
                        <td className="px-4 py-2 border-r border-gray-300">_gid</td>
                        <td className="px-4 py-2 border-r border-gray-300">Google Analytics</td>
                        <td className="px-4 py-2 border-r border-gray-300">Distinguishes unique users</td>
                        <td className="px-4 py-2">24 hours</td>
                      </tr>
                      <tr className="border-t border-gray-300">
                        <td className="px-4 py-2 border-r border-gray-300">_gat</td>
                        <td className="px-4 py-2 border-r border-gray-300">Google Analytics</td>
                        <td className="px-4 py-2 border-r border-gray-300">Throttles request rate</td>
                        <td className="px-4 py-2">1 minute</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ color: '#4B535D' }} className="mt-3 text-sm">
                  <strong>Note:</strong> Google Analytics is configured with IP anonymization enabled, meaning your IP address is anonymized before being processed.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
              3. Why We Use Cookies
            </h2>
            <ul className="list-disc pl-6 space-y-2" style={{ color: '#4B535D' }}>
              <li><strong>To remember your consent preferences:</strong> So we don&apos;t ask you about cookies every time you visit</li>
              <li><strong>To understand how you use our website:</strong> Analytics help us improve the site and make it more useful</li>
              <li><strong>To measure website performance:</strong> Understand which pages are most visited and how long visitors spend on them</li>
              <li><strong>To identify technical issues:</strong> Detect errors and fix problems before they affect many users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
              4. Your Cookie Choices
            </h2>
            <p style={{ color: '#4B535D' }} className="mb-4">
              You have full control over which cookies we use. Here&apos;s how to manage them:
            </p>

            <div className="space-y-4">
              <div className="bg-cyan-50 border-l-4 p-6" style={{ borderColor: '#0891B2' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#0E1A2B' }}>
                  Option 1: Cookie Consent Banner
                </h3>
                <p style={{ color: '#4B535D' }}>
                  When you first visit our website, you&apos;ll see a cookie consent banner. You can:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1" style={{ color: '#4B535D' }}>
                  <li><strong>Accept all:</strong> Allow all cookies</li>
                  <li><strong>Reject all:</strong> Only use strictly necessary cookies</li>
                  <li><strong>Manage preferences:</strong> Choose which categories of cookies to allow</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border-l-4 p-6" style={{ borderColor: '#0891B2' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#0E1A2B' }}>
                  Option 2: Change Settings Anytime
                </h3>
                <p style={{ color: '#4B535D' }}>
                  You can change your cookie preferences at any time by clicking the &quot;Cookie Settings&quot; link in the footer of this website.
                </p>
              </div>

              <div className="bg-cyan-50 border-l-4 p-6" style={{ borderColor: '#0891B2' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#0E1A2B' }}>
                  Option 3: Browser Settings
                </h3>
                <p style={{ color: '#4B535D' }} className="mb-2">
                  Most browsers allow you to block or delete cookies through their settings. Here&apos;s how:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm" style={{ color: '#4B535D' }}>
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
                </ul>
                <p style={{ color: '#4B535D' }} className="mt-2 text-sm italic">
                  <strong>Note:</strong> Blocking all cookies may affect website functionality.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
              5. Third-Party Cookies
            </h2>
            <p style={{ color: '#4B535D' }} className="mb-4">
              Some cookies are set by third-party services that appear on our pages. We have no control over these cookies, but they will only be set if you consent to analytics cookies.
            </p>

            <h3 className="text-xl font-semibold mb-3" style={{ color: '#0891B2' }}>
              Google Analytics
            </h3>
            <p style={{ color: '#4B535D' }} className="mb-3">
              We use Google Analytics to help us understand how visitors use our site. Google Analytics uses cookies to collect information about your visit, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4" style={{ color: '#4B535D' }}>
              <li>Pages you visit</li>
              <li>How long you spend on each page</li>
              <li>How you got to our site</li>
              <li>What you click on while visiting</li>
            </ul>
            <p style={{ color: '#4B535D' }} className="mb-3">
              This information is anonymized and cannot be used to identify you personally. Your IP address is anonymized before being processed.
            </p>
            <p style={{ color: '#4B535D' }}>
              Learn more about how Google uses data: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Google Privacy Policy</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
              6. Google Consent Mode V2
            </h2>
            <p style={{ color: '#4B535D' }} className="mb-4">
              We use Google Consent Mode V2, which allows Google Analytics to respect your cookie choices. If you reject analytics cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2" style={{ color: '#4B535D' }}>
              <li>Google Analytics will not set any cookies</li>
              <li>No personal data will be collected</li>
              <li>Google may still collect anonymized, cookieless &quot;pings&quot; for aggregate statistics (fully anonymous, no tracking)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
              7. How Long Do Cookies Last?
            </h2>
            <p style={{ color: '#4B535D' }} className="mb-4">
              Cookies have different lifespans:
            </p>
            <ul className="list-disc pl-6 space-y-2" style={{ color: '#4B535D' }}>
              <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent cookies:</strong> Stay on your device for a set period (see table above) or until you delete them</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
              8. Updates to This Policy
            </h2>
            <p style={{ color: '#4B535D' }} className="mb-4">
              We may update this Cookie Policy from time to time to reflect changes in:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4" style={{ color: '#4B535D' }}>
              <li>The cookies we use</li>
              <li>Cookie regulations (UK PECR, GDPR)</li>
              <li>Our website functionality</li>
            </ul>
            <p style={{ color: '#4B535D' }}>
              The &quot;Last updated&quot; date at the top of this page shows when the policy was last changed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
              9. More Information
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3" style={{ color: '#0E1A2B' }}>
                  About Cookies in General
                </h3>
                <p style={{ color: '#4B535D' }} className="mb-2">
                  To learn more about cookies and how to manage them, visit:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm" style={{ color: '#4B535D' }}>
                  <li><a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">aboutcookies.org</a></li>
                  <li><a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">allaboutcookies.org</a></li>
                  <li><a href="https://ico.org.uk/your-data-matters/online/cookies/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">ICO: Cookies</a></li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3" style={{ color: '#0E1A2B' }}>
                  Our Privacy Policy
                </h3>
                <p style={{ color: '#4B535D' }}>
                  For information about how we collect, use, and protect your personal data, please read our <a href="/privacy-policy" className="text-cyan-600 hover:underline">Privacy Policy</a>.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3" style={{ color: '#0E1A2B' }}>
                  Contact Us
                </h3>
                <p style={{ color: '#4B535D' }} className="mb-2">
                  If you have questions about our use of cookies, contact us at:
                </p>
                <p style={{ color: '#4B535D' }}>
                  <a href="mailto:support@seaready.co.uk" className="text-cyan-600 hover:underline">support@seaready.co.uk</a>
                </p>
              </div>
            </div>
          </section>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 rounded-lg p-8 mt-12" style={{ borderColor: '#0891B2' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E1A2B' }}>
              Summary
            </h2>
            <div className="space-y-3" style={{ color: '#4B535D' }}>
              <p><strong>Essential cookies:</strong> We only use one essential cookie to remember your cookie preferences. This cannot be disabled.</p>
              <p><strong>Analytics cookies:</strong> We use Google Analytics (with IP anonymization) to understand how visitors use our site. These are optional and require your consent.</p>
              <p><strong>Your choice:</strong> You can accept, reject, or customize cookies at any time via the banner or the &quot;Cookie Settings&quot; link in the footer.</p>
              <p><strong>No tracking without consent:</strong> We will not track you with analytics cookies unless you explicitly agree.</p>
            </div>
          </div>
        </div>
      </div>

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
