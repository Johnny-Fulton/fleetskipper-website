'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import {
  UserGroupIcon,
  AcademicCapIcon,
  DocumentCheckIcon,
  ArrowLeftIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface CrewRequirement {
  id: string
  name: string
  regulation?: string
  reference?: string
  appliesTo: string
  appliesToLabel: string
  subcategory: string
  subcategoryLabel: string
  alternativeGroup?: string
  notes?: string
  description?: string
  mandatory?: boolean
  classification?: string
}

interface ResultsData {
  crewRequirements: CrewRequirement[]
  _meta: {
    engineVersion: string
    msnTier: string
    msnLabel: string
    msnDescription: string
    determinedMSN?: string
    vesselSummary: {
      name: string
      registeredLength: number
      lengthOverall: number
      crewCount: number
      distanceFromSafeHaven: number
      structure: string
      enginePowerKW: number
    }
  }
  summary: {
    totalCrewRequirements: number
    byAppliesTo: Record<string, { label: string; count: number }>
    bySubcategory: Record<string, { label: string; count: number }>
  }
}

export default function FVCrewCheckerResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<ResultsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    const stored = localStorage.getItem('fv-crew-check-results')
    if (!stored) {
      router.push('/tools/fishing-vessel/crew-checker')
      return
    }

    try {
      const data = JSON.parse(stored) as ResultsData
      setResults(data)
    } catch (err) {
      console.error('Failed to parse results:', err)
      router.push('/tools/fishing-vessel/crew-checker')
    } finally {
      setLoading(false)
    }
  }, [router])

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  if (loading || !results) {
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
  const groupedByRole = {
    all_crew: results.crewRequirements.filter(r => r.appliesTo === 'all_crew'),
    new_entrant: results.crewRequirements.filter(r => r.appliesTo === 'new_entrant'),
    experienced_crew: results.crewRequirements.filter(r => r.appliesTo === 'experienced_crew'),
    skipper: results.crewRequirements.filter(r => r.appliesTo === 'skipper'),
  }

  // Helper: Group by subcategory within a role
  const groupBySubcategory = (items: CrewRequirement[]) => {
    const grouped: Record<string, CrewRequirement[]> = {}
    items.forEach(item => {
      if (!grouped[item.subcategory]) {
        grouped[item.subcategory] = []
      }
      grouped[item.subcategory].push(item)
    })
    return grouped
  }

  // Helper: Group alternatives
  const groupAlternatives = (items: CrewRequirement[]) => {
    const alternatives: Record<string, CrewRequirement[]> = {}
    const standalone: CrewRequirement[] = []

    items.forEach(item => {
      if (item.alternativeGroup) {
        if (!alternatives[item.alternativeGroup]) {
          alternatives[item.alternativeGroup] = []
        }
        alternatives[item.alternativeGroup].push(item)
      } else {
        standalone.push(item)
      }
    })

    return { alternatives, standalone }
  }

  const renderRequirementsList = (items: CrewRequirement[]) => {
    const { alternatives, standalone } = groupAlternatives(items)

    return (
      <div className="space-y-3">
        {/* Standalone items */}
        {standalone.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
            <div className="flex items-center gap-3 p-4">
              <DocumentCheckIcon className="w-5 h-5 text-cyan-500 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  {item.mandatory === false && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      Voluntary
                    </span>
                  )}
                </div>
              </div>
              {(item.reference || item.notes) && (
                <button
                  onClick={() => toggleItem(item.id)}
                  className="text-cyan-600 hover:text-cyan-700 text-sm font-medium flex items-center gap-1 flex-shrink-0"
                >
                  {expandedItems.has(item.id) ? '− Less info' : '+ More info'}
                </button>
              )}
            </div>
            {expandedItems.has(item.id) && (item.reference || item.notes) && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
                {item.reference && (
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Reference:</span> {item.reference}
                  </p>
                )}
                {item.notes && (
                  <p className="text-sm text-gray-600 leading-relaxed">{item.notes}</p>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Alternative groups */}
        {Object.entries(alternatives).map(([groupKey, groupItems]) => (
          <div key={groupKey} className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
            <div className="flex items-start gap-2 mb-3">
              <InformationCircleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="font-semibold text-amber-900">Choose ONE of the following:</p>
            </div>
            <div className="space-y-2 ml-7">
              {groupItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg border border-amber-200 overflow-hidden">
                  <div className="flex items-center gap-3 p-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        {item.mandatory === false && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                            Voluntary
                          </span>
                        )}
                      </div>
                    </div>
                    {(item.reference || item.notes) && (
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="text-cyan-600 hover:text-cyan-700 text-sm font-medium flex items-center gap-1 flex-shrink-0"
                      >
                        {expandedItems.has(item.id) ? '− Less' : '+ More'}
                      </button>
                    )}
                  </div>
                  {expandedItems.has(item.id) && (item.reference || item.notes) && (
                    <div className="px-3 pb-3 pt-2 border-t border-amber-100 bg-white">
                      {item.reference && (
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Reference:</span> {item.reference}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-sm text-gray-600 leading-relaxed">{item.notes}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderRoleSection = (
    roleKey: keyof typeof groupedByRole,
    title: string,
    description: string,
    icon: React.ComponentType<{ className?: string }>
  ) => {
    const items = groupedByRole[roleKey]
    if (items.length === 0) return null

    const bySubcategory = groupBySubcategory(items)
    const Icon = icon

    return (
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <p className="text-cyan-50 text-sm">{items.length} requirement{items.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <p className="text-white/90 text-sm">{description}</p>
        </div>

        {/* Content grouped by subcategory */}
        <div className="p-6 space-y-6">
          {Object.entries(bySubcategory).map(([subcatKey, subcatItems]) => {
            const subcatLabel = subcatItems[0]?.subcategoryLabel || subcatKey
            return (
              <div key={subcatKey}>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <AcademicCapIcon className="w-5 h-5 text-gray-400" />
                  {subcatLabel}
                </h3>
                {renderRequirementsList(subcatItems)}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />

      <main className="overflow-hidden">
        {/* Header */}
        <section className="relative mt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16 pb-16">
          <div className="absolute inset-0 bg-[url('/images/hero-workboat.jpg')] opacity-5 bg-cover bg-center" />

          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/tools/fishing-vessel/crew-checker"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Back to Crew Checker
              </Link>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <UserGroupIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold text-sm">Crew Requirements</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white leading-tight">
                Your Crew Requirements
              </h1>

              {/* Vessel Summary */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Regulation</p>
                    <p className="font-bold text-lg">{results._meta.msnLabel}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Length Overall</p>
                    <p className="font-bold text-lg">{results._meta.vesselSummary.lengthOverall}m</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Registered Length</p>
                    <p className="font-bold text-lg">{results._meta.vesselSummary.registeredLength}m</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-white/80 text-sm">
                    <span className="font-semibold">{results.summary.totalCrewRequirements}</span> crew requirements found for your vessel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Sections */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* All Crew Requirements */}
              {renderRoleSection(
                'all_crew',
                'All Crew Must Have',
                'Requirements that apply to every crew member on board',
                UserGroupIcon
              )}

              {/* New Entrants */}
              {renderRoleSection(
                'new_entrant',
                'New Entrants (Post-2005)',
                'Additional requirements for fishermen who entered the industry after 2005',
                AcademicCapIcon
              )}

              {/* Experienced Crew */}
              {renderRoleSection(
                'experienced_crew',
                'Experienced Fishermen',
                'Requirements for crew members who entered the industry before 2005',
                DocumentCheckIcon
              )}

              {/* Skipper/Master */}
              {renderRoleSection(
                'skipper',
                'Skipper / Master Requirements',
                'Additional qualifications required for the vessel master',
                AcademicCapIcon
              )}

              {/* No Results Message */}
              {results.summary.totalCrewRequirements === 0 && (
                <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 text-center">
                  <InformationCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">No Crew Requirements Found</h2>
                  <p className="text-gray-600">
                    No specific crew certification requirements were found for your vessel configuration.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link
                  href="/tools/fishing-vessel/crew-checker"
                  className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Check Another Vessel
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 rounded-xl font-bold text-lg transition-all"
                >
                  Need Help? Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-cyan-600 to-cyan-700">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Want Complete Compliance Management?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                FleetSkipper tracks all certifications, training, and expiry dates for your entire crew across multiple vessels.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-cyan-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
