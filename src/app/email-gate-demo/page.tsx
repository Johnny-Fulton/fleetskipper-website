'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailGate, useEmailGate } from '@/components/EmailGate'
import { CheckCircle, Mail } from 'lucide-react'

export default function EmailGateDemoPage() {
  const [hasAccess, setHasAccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)
  const { hasEmail, userEmail, clearEmail } = useEmailGate()

  const handleEmailSubmitted = (email: string) => {
    setHasAccess(true)
    setSubmittedEmail(email)
  }

  return (
    <>
      <Navigation />

      {/* Email Gate Modal */}
      {!hasAccess && !hasEmail && (
        <EmailGate
          onEmailSubmitted={handleEmailSubmitted}
          title="Email Gate Demo"
          description="This is a demo of the email capture system. Enter your email to see the protected content."
        />
      )}

      <main className="pt-28 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Email Gate Demo
              </h1>
              <p className="text-lg text-slate-600">
                Testing the email capture system for FleetSkipper tools
              </p>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Mail className="text-teal" />
                Access Status
              </h2>

              {(hasAccess || hasEmail) ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">Access Granted!</p>
                      <p className="text-sm text-green-700 mt-1">
                        Email: <span className="font-mono">{submittedEmail || userEmail}</span>
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        Your email has been stored in localStorage. You won't see the modal again until you clear it.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      clearEmail()
                      setHasAccess(false)
                      setSubmittedEmail(null)
                      window.location.reload()
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Clear Email & Reload (Test Again)
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600">
                    The email modal should be showing now...
                  </p>
                </div>
              )}
            </div>

            {/* Protected Content */}
            {(hasAccess || hasEmail) && (
              <div className="bg-gradient-to-br from-teal to-teal-dark rounded-2xl shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">
                  🎉 Protected Content
                </h2>
                <p className="text-white/90 leading-relaxed">
                  This content is only visible after the user has submitted their email.
                  You can use this pattern on any tool page to gate access while still
                  providing a frictionless experience (no passwords needed).
                </p>
                <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold mb-2">How it works:</h3>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• Email is stored in browser localStorage</li>
                    <li>• User won't see modal again on subsequent visits</li>
                    <li>• Simple email validation built in</li>
                    <li>• Can optionally send to backend/database</li>
                    <li>• Privacy-friendly approach</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Usage Instructions */}
            <div className="mt-12 bg-slate-900 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Usage Instructions</h2>
              <div className="space-y-4 text-sm font-mono bg-slate-800 p-4 rounded-lg overflow-x-auto">
                <p className="text-cyan-400">// Import the component</p>
                <p>import {'{ EmailGate }'} from '@/components/EmailGate'</p>
                <p className="text-cyan-400 mt-4">// Add to your page</p>
                <p>{'<EmailGate'}</p>
                <p className="pl-4">onEmailSubmitted={(email) => setHasAccess(true)}</p>
                <p className="pl-4">title="Access Free Tools"</p>
                <p className="pl-4">description="Enter email to continue"</p>
                <p>{'/>'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
