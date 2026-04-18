'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Mail, X } from 'lucide-react'

interface EmailGateProps {
  onEmailSubmitted: (email: string) => void
  title?: string
  description?: string
}

export function EmailGate({
  onEmailSubmitted,
  title = "Access Free Tools",
  description = "Enter your email to access our free compliance tools. No password required."
}: EmailGateProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user has already provided email
    const storedEmail = localStorage.getItem('fleetskipper_user_email')
    if (storedEmail) {
      onEmailSubmitted(storedEmail)
    } else {
      setIsOpen(true)
    }
  }, [onEmailSubmitted])

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      // Store email in localStorage
      localStorage.setItem('fleetskipper_user_email', email)

      // Send to backend/database
      await fetch('/api/collect-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'wbc3-checker' })
      })

      // Close modal and notify parent
      setIsOpen(false)
      onEmailSubmitted(email)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header - Using inline styles for custom colors */}
          <div
            className="p-8 text-white relative"
            style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2a4a6f 50%, #00a8cc 100%)'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <Mail className="w-12 h-12" style={{ color: '#33b8d6' }} />
            </div>
            <Dialog.Title className="text-2xl font-bold mb-2 text-white">
              {title}
            </Dialog.Title>
            <Dialog.Description className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              {description}
            </Dialog.Description>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#0B132B' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{
                    focusRingColor: '#00a8cc'
                  }}
                  disabled={isLoading}
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-white"
                style={{
                  backgroundColor: isLoading ? '#008fb3' : '#00a8cc',
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#008fb3';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#00a8cc';
                  }
                }}
              >
                {isLoading ? 'Submitting...' : 'Access Tools'}
              </button>

              <p className="text-xs text-center" style={{ color: '#4B535D' }}>
                We respect your privacy. Your email is only used to provide you with tools and updates.
              </p>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

// Hook to check if user has provided email
export function useEmailGate() {
  const [hasEmail, setHasEmail] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const email = localStorage.getItem('fleetskipper_user_email')
    if (email) {
      setHasEmail(true)
      setUserEmail(email)
    }
  }, [])

  const clearEmail = () => {
    localStorage.removeItem('fleetskipper_user_email')
    setHasEmail(false)
    setUserEmail(null)
  }

  return { hasEmail, userEmail, clearEmail }
}
