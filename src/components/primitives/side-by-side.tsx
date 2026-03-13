import { CheckCircleIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import { FileText, AlertTriangle, ClipboardList, Zap, Waves, CheckCircle } from 'lucide-react'

interface SideBySideProps {
  variant: 'textLeft' | 'imageLeft'
  title: string
  subtitle?: string
  content: string | string[]
  imageSrc?: string
  imageAlt?: string
}

export function SideBySide({ 
  variant, 
  title, 
  subtitle, 
  content, 
  imageSrc = '/dashboard-preview.png', 
  imageAlt = 'Dashboard preview' 
}: SideBySideProps) {
  // Check if this is the problem/solution section
  const isProblemSolution = variant === 'textLeft' && title && (title.includes('Maritime compliance') || title.includes('shouldn'));
  const contentSection = (
    <div className="lg:pr-8 lg:pt-4">
      <div className="lg:max-w-lg">
        {subtitle && (
          <p className="text-base font-semibold leading-7 text-brand-orange">{subtitle}</p>
        )}
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
        <div className="mt-6">
          {Array.isArray(content) ? (
            <ul className="space-y-3">
              {content.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-sea-teal flex-shrink-0 mt-0.5" />
                  <span className="ml-3 text-lg leading-8 text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg leading-8 text-gray-600">{content}</p>
          )}
        </div>
      </div>
    </div>
  )

  const imageSection = (
    <div className="flex items-start justify-end lg:order-first">
      <div className="relative">
        <Image 
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={400}
          className="rounded-xl shadow-xl ring-1 ring-gray-400/10"
        />
      </div>
    </div>
  )

  const problemSolutionContent = (
    <>
      {/* Section Header */}
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange mb-3">TRANSFORM YOUR WORKFLOW</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-ink">From compliance chaos to complete control</h2>
      </div>

      {/* Problem Cards */}
      <div className="mb-8">
        <h3 className="text-center text-xl font-semibold text-red-600 mb-8">Without SeaReady</h3>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: <FileText className="h-8 w-8" style={{ color: '#dc2626' }} />,
              title: "Hours of Paperwork",
              desc: "Time spent on paperwork instead of operations"
            },
            {
              icon: <AlertTriangle className="h-8 w-8" style={{ color: '#dc2626' }} />,
              title: "Inspection Stress",
              desc: "Scrambling for documents during inspections"
            },
            {
              icon: <ClipboardList className="h-8 w-8" style={{ color: '#dc2626' }} />,
              title: "Generic Templates",
              desc: "One-size-fits-all that doesn't fit your vessel"
            }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative rounded-2xl border-2 border-red-100 bg-white p-6 hover:border-red-200 transition-colors">
                <div className="mb-3">{item.icon}</div>
                <h4 className="font-semibold text-ink mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transform Arrow */}
      <div className="flex justify-center my-12">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-orange to-sea-teal flex items-center justify-center text-white shadow-lg">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Solution Cards */}
      <div>
        <h3 className="text-center text-xl font-semibold text-sea-teal mb-8">With SeaReady</h3>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: <Zap className="h-8 w-8" style={{ color: '#0891B2' }} />,
              title: "Pre-configured",
              desc: "Defaults for your vessel type ready to use"
            },
            {
              icon: <Waves className="h-8 w-8" style={{ color: '#0891B2' }} />,
              title: "Works Offline",
              desc: "Complete functionality when at sea"
            },
            {
              icon: <CheckCircle className="h-8 w-8" style={{ color: '#0891B2' }} />,
              title: "Inspection Ready",
              desc: "Everything inspectors need, instantly available"
            }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-sea-teal to-green-500 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative rounded-2xl border-2 border-teal-100 bg-white p-6 hover:border-teal-200 transition-colors">
                <div className="mb-3">{item.icon}</div>
                <h4 className="font-semibold text-ink mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )

  // Special handling for problem/solution layout
  if (isProblemSolution) {
    return (
      <div className="overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {problemSolutionContent}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {variant === 'textLeft' ? (
            <>
              {contentSection}
              {imageSection}
            </>
          ) : (
            <>
              {imageSection}
              {contentSection}
            </>
          )}
        </div>
      </div>
    </div>
  )
}