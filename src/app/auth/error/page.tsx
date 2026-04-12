import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">FleetSkipper</h1>
          <p className="text-gray-600">Authentication Error</p>
        </div>

        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-red-600" size={32} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Authentication Failed
            </h2>

            <p className="text-gray-600 mb-8">
              We encountered an error while trying to sign you in. This could be due to an invalid or expired link.
            </p>

            <div className="w-full space-y-3">
              <Link
                href="/auth/sign-in"
                className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-center"
              >
                Try Again
              </Link>

              <Link
                href="/"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg transition-colors text-center"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Still having issues?{' '}
          <Link href="/contact" className="text-cyan-600 hover:text-cyan-700 underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}
