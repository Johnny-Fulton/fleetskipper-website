'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import {
  CheckCircle,
  Ship,
  Anchor,
  Wrench
} from 'lucide-react'
import {
  InformationCircleIcon,
  XMarkIcon,
  UserGroupIcon,
  AcademicCapIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline'

interface CrewRequirement {
  id: string
  name: string
  category: string
  subcategory: string
  appliesTo: 'all_crew' | 'new_entrant' | 'experienced_crew' | 'skipper' | 'engineer'
  mandatory: boolean
  alternativeGroup?: string
  notes?: string
  reference?: string
  description?: string
}

interface VesselSummary {
  registeredLength: number
  lengthOverall: number
  enginePowerKW: number
}

interface ResultsMeta {
  msnLabel: string
  msnTier: string
  vesselSummary: VesselSummary
}

interface CheckResults {
  crewRequirements: CrewRequirement[]
  _meta: ResultsMeta
}

// Deleted getMSNQuote() - now using engine data directly (reference, description, notes fields)

export default function FVCrewCheckerResults() {
  const router = useRouter()
  const [results, setResults] = useState<CheckResults | null>(null)
  const [selectedInfo, setSelectedInfo] = useState<CrewRequirement | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('fv-crew-check-results')
    if (stored) {
      try {
        setResults(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to parse results:', error)
        router.push('/tools/fv-crew-checker')
      }
    } else {
      router.push('/tools/fv-crew-checker')
    }
  }, [router])

  if (!results) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading results...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Group requirements by appliesTo
  const groupedRequirements = {
    all_crew: results.crewRequirements.filter(r => r.appliesTo === 'all_crew'),
    new_entrant: results.crewRequirements.filter(r => r.appliesTo === 'new_entrant'),
    experienced_crew: results.crewRequirements.filter(r => r.appliesTo === 'experienced_crew'),
    skipper: results.crewRequirements.filter(r => r.appliesTo === 'skipper'),
    engineer: results.crewRequirements.filter(r => r.appliesTo === 'engineer')
  }

  // Group alternatives (medical certificates)
  const groupAlternatives = (reqs: CrewRequirement[]) => {
    const grouped: Record<string, CrewRequirement[]> = {}
    const ungrouped: CrewRequirement[] = []

    reqs.forEach(req => {
      if (req.alternativeGroup) {
        if (!grouped[req.alternativeGroup]) {
          grouped[req.alternativeGroup] = []
        }
        grouped[req.alternativeGroup].push(req)
      } else {
        ungrouped.push(req)
      }
    })

    return { grouped, ungrouped }
  }

  const InfoButton = ({ requirement }: { requirement: CrewRequirement }) => {
    // Only show info button if there's reference or description data
    if (!requirement.reference && !requirement.description && !requirement.notes) {
      return null
    }

    return (
      <button
        onClick={() => setSelectedInfo(requirement)}
        className="inline-flex items-center justify-center w-5 h-5 ml-2 text-cyan-600 hover:text-cyan-700 transition-colors"
        title="View regulatory reference"
      >
        <InformationCircleIcon className="w-5 h-5" />
      </button>
    )
  }

  const renderRequirement = (req: CrewRequirement) => (
    <div key={req.id} className="flex items-start gap-3">
      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" strokeWidth={2} />
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-lg inline-flex items-center">
          {req.name}
          <InfoButton requirement={req} />
          {!req.mandatory && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
              Voluntary
            </span>
          )}
        </h3>
        {req.notes && (
          <p className="text-gray-700 mt-1">{req.notes}</p>
        )}
      </div>
    </div>
  )

  const renderAlternativeGroup = (reqs: CrewRequirement[], groupName: string) => {
    // If only one item in group, render as standalone
    if (reqs.length === 1) {
      return renderRequirement(reqs[0])
    }

    return (
      <div key={groupName} className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
        <div className="flex items-start gap-2 mb-3">
          <InformationCircleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="font-semibold text-amber-900">Choose ONE of the following:</p>
        </div>
        <div className="space-y-3 ml-7">
          {reqs.map(req => (
            <div key={req.id} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 inline-flex items-center">
                  {req.name}
                  <InfoButton requirement={req} />
                  {!req.mandatory && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      Voluntary
                    </span>
                  )}
                </h4>
                {req.notes && (
                  <p className="text-sm text-gray-700 mt-1">{req.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderRoleSection = (
    title: string,
    description: string,
    icon: React.ReactNode,
    requirements: CrewRequirement[]
  ) => {
    if (requirements.length === 0) return null

    const { grouped, ungrouped } = groupAlternatives(requirements)

    return (
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
        {/* Dark gradient header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <h2 className="text-lg font-black text-white">{title}</h2>
              <p className="text-white/90 text-sm">{description}</p>
            </div>
          </div>
        </div>

        {/* White body content */}
        <div className="p-8">
          <div className="space-y-4">
            {ungrouped.map(renderRequirement)}
            {Object.entries(grouped).map(([groupName, reqs]) =>
              renderAlternativeGroup(reqs, groupName)
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />

      <main className="overflow-hidden pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Link
                  href="/tools/fv-crew-checker"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-semibold"
                >
                  ← Back to Crew Checker
                </Link>
              </div>
              <h1 className="text-2xl font-black text-white mb-4">
                Fishing Vessel Crew Requirements
              </h1>
              <p className="text-xl text-white/90">
                Based on {results._meta.msnLabel}. Requirements organized by role.
              </p>
            </div>
          </div>
        </section>

        {/* Requirements Cards */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

              {/* Sidebar - Vessel Details */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-card border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Ship className="text-cyan-600" size={20} strokeWidth={2} />
                    Vessel Details
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold text-gray-900">MSN Category</dt>
                      <dd className="text-gray-700">{results._meta.msnLabel}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">Registered Length</dt>
                      <dd className="text-gray-700">{results._meta.vesselSummary.registeredLength}m</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">Length Overall</dt>
                      <dd className="text-gray-700">{results._meta.vesselSummary.lengthOverall}m</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">Engine Power</dt>
                      <dd className="text-gray-700">{results._meta.vesselSummary.enginePowerKW} kW</dd>
                    </div>
                  </dl>

                  {/* Edit Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link
                      href="/tools/fv-crew-checker"
                      className="block w-full text-center px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition-colors text-sm"
                    >
                      ✏️ Check Another Vessel
                    </Link>
                  </div>
                </div>
              </div>

              {/* Main content area */}
              <div className="lg:col-span-3 space-y-6">
                {renderRoleSection(
                  'ALL CREW - Universal Requirements',
                  'Requirements that apply to EVERY crew member on board',
                  <UserGroupIcon className="text-white flex-shrink-0 w-8 h-8" />,
                  groupedRequirements.all_crew
                )}

                {renderRoleSection(
                  'NEW ENTRANTS - Post-2005 Requirements',
                  'Additional requirements for fishermen who entered the industry after 2005',
                  <AcademicCapIcon className="text-white flex-shrink-0 w-8 h-8" />,
                  groupedRequirements.new_entrant
                )}

                {renderRoleSection(
                  'EXPERIENCED CREW - Pre-2005 Fishermen',
                  'Requirements for crew who entered the industry before 2005',
                  <DocumentCheckIcon className="text-white flex-shrink-0 w-8 h-8" />,
                  groupedRequirements.experienced_crew
                )}

                {renderRoleSection(
                  'SKIPPER/MASTER - Certificate of Competency',
                  'Additional qualifications required for the vessel master',
                  <Anchor className="text-white flex-shrink-0 w-8 h-8" strokeWidth={2.5} />,
                  groupedRequirements.skipper
                )}

                {renderRoleSection(
                  'ENGINEER OFFICER - Machinery Qualifications',
                  'Qualifications required for vessels with 750kW+ propulsive power',
                  <Wrench className="text-white flex-shrink-0 w-8 h-8" strokeWidth={2.5} />,
                  groupedRequirements.engineer
                )}
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Info Modal */}
      {selectedInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedInfo(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-6 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedInfo.name}</h3>
                {selectedInfo.reference && (
                  <p className="text-cyan-100 text-sm font-semibold">{selectedInfo.reference}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedInfo(null)}
                className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Description */}
              {selectedInfo.description && (
                <div className="bg-gray-50 border-l-4 border-cyan-500 p-4 rounded-r">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Requirement Details:</p>
                  <p className="text-gray-800 leading-relaxed">{selectedInfo.description}</p>
                </div>
              )}

              {/* Notes */}
              {selectedInfo.notes && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Additional Information:</p>
                  <p className="text-gray-700 leading-relaxed">{selectedInfo.notes}</p>
                </div>
              )}

              {/* If no data available */}
              {!selectedInfo.reference && !selectedInfo.description && !selectedInfo.notes && (
                <div className="text-center py-8">
                  <InformationCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">
                    No additional regulatory information available for this requirement.
                  </p>
                </div>
              )}

              {/* Close Button */}
              <div className="pt-4 border-t">
                <button
                  onClick={() => setSelectedInfo(null)}
                  className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
