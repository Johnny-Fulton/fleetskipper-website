import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ClipboardDocumentListIcon, WrenchScrewdriverIcon, UserGroupIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Free Maritime Compliance Tools',
  description: 'Free compliance tools for UK vessel operators. Check vessel requirements for WBC3 workboats and MSN fishing vessels.',
}

const tools = [
  {
    name: 'WBC3 Equipment Checker',
    href: '/tools/wbc3-checker',
    description: 'Get a complete list of safety equipment, firefighting gear, and navigation equipment required for your workboat.',
    icon: ClipboardDocumentListIcon,
    badge: 'Free Tool',
    features: [
      'Life-saving appliances (LSA)',
      'Fire-fighting equipment (FFE)',
      'Navigation & radio equipment',
      'Filter by category',
    ],
    comingSoon: false,
  },
  {
    name: 'WBC3 Crew Certificate Checker',
    href: '/tools/crew-checker',
    description: 'Find out what certificates and training your crew need for WBC3 compliance based on your vessel specifications.',
    icon: AcademicCapIcon,
    badge: 'Free Tool',
    features: [
      'Master qualifications required',
      'Engineering certificates',
      'Mandatory training courses',
      'Medical fitness requirements',
    ],
    comingSoon: false,
  },
  {
    name: 'FV Crew Requirements Checker',
    href: '/tools/fv-crew-checker',
    description: 'Find out what certificates and training your fishing vessel crew need for MSN 1871/1872/1873 (F) compliance.',
    icon: UserGroupIcon,
    badge: 'Free Tool',
    features: [
      'All crew requirements by role',
      'New entrant vs experienced crew',
      'Skipper/Master & Engineer CoCs',
      'Medical fitness & safety training',
    ],
    comingSoon: false,
  },
]

export default function ToolsPage() {
  return (
    <>
      <Navigation />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative mt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-20 md:pt-24 md:pb-24 lg:pt-28 lg:pb-28">
          <div className="absolute inset-0 bg-[url('/images/hero-workboat.jpg')] opacity-5 bg-cover bg-center" />

          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <WrenchScrewdriverIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold text-sm">Free Compliance Tools</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
                Free Maritime Compliance Tools
              </h1>

              <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                For workboats (WBC3) and fishing vessels (MSN 1871/1872/1873). Built by mariners for mariners.
              </p>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="group relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-cyan-500 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Badge */}
                    <div className="absolute top-6 right-6">
                      <span className="inline-flex items-center px-3 py-1 bg-cyan-50 text-cyan-700 text-sm font-semibold rounded-full border border-cyan-200">
                        {tool.badge}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center group-hover:bg-cyan-500 group-hover:scale-110 transition-all duration-300">
                        <tool.icon className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">
                      {tool.name}
                    </h2>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    {tool.comingSoon ? (
                      <div className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-bold cursor-not-allowed">
                        Coming Soon
                      </div>
                    ) : (
                      <Link
                        href={tool.href}
                        className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      >
                        Launch Tool →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-cyan-600 to-cyan-700">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Need More Than Free Tools?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Get a complete, custom-built SMS tailored to your vessel operations. Expert guidance from a Master Mariner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-cyan-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Book Free Consultation
                </Link>
                <Link
                  href="#app-demo"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                >
                  See the FleetSkipper App →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
