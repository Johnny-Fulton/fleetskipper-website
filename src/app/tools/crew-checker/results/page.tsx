'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ChevronDownIcon, ChevronUpIcon, CheckIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Users, Anchor, UserPlus, AlertCircle, Wrench, Radio, CheckCircle, Ship } from 'lucide-react'
import WBC3TableA51 from '@/components/WBC3TableA51'
import WBC3TableA52 from '@/components/WBC3TableA52'
import WBC3TableA53 from '@/components/WBC3TableA53'

// WBC3 Regulatory quotes for each requirement type
const getWBC3Quote = (reqName: string, reqType: string) => {
  const quotes: Record<string, { quote: string; section: string; description?: string }> = {
    // Master Qualifications
    'Certificate of Competency (CoC)': {
      quote: '"28.1.1 A vessel shall be safely manned, as a minimum, in accordance with the manning and qualifications requirements indicated in Tables A5.1 and A5.2 of Appendix 5."',
      section: 'WBC3 Section 28.1.1',
      description: 'Table A5.1 lists all acceptable Master qualifications by Area Category. Higher-level certificates are valid at lower levels (e.g., Boatmaster T2 is valid for T3 requirements).'
    },
    // Medical Fitness
    'ENG1 Medical Certificate': {
      quote: '"28.1.2 All crew members shall hold a valid medical fitness certificate issued or accepted by the Administration."',
      section: 'WBC3 Section 28.1.2',
      description: 'ML5 medical certificates are also acceptable for vessels operating in Categories 5 and 6.'
    },
    'ML5 Medical Certificate': {
      quote: '"28.1.2 All crew members shall hold a valid medical fitness certificate issued or accepted by the Administration."',
      section: 'WBC3 Section 28.1.2',
      description: 'ML5 is the reduced medical standard for limited operations (Categories 5 and 6 only).'
    },
    // Engineering Qualifications
    'Engineering Certificate': {
      quote: '"Table A5.2 – Minimum Engine Room Manning Requirements. Note 5: In all cases, one of the crew shall be sufficiently familiar with the operation and maintenance of the vessel\'s machinery to ensure safe passage."',
      section: 'WBC3 Appendix 5, Table A5.2',
      description: 'Engineering requirements are determined by engine power (kW) and vessel type. The table specifies which certificates are acceptable for each power tier.'
    },
    // Mandatory Training - General
    'Sea Survival': {
      quote: '"28.1.4 Anyone employed or engaged in any capacity onboard a vessel shall complete the required Administration-approved mandatory training courses listed in Table A5.3."',
      section: 'WBC3 Section 28.1.4',
      description: 'STCW route: MCA approved Personal Survival Techniques. Non-STCW route: RYA Basic Sea Survival.'
    },
    'Basic Sea Survival': {
      quote: '"All operators not following this route shall complete a RYA Basic Sea Survival or may complete an MCA approved Personal Survival Techniques course as an alternative."',
      section: 'WBC3 Appendix 5, Table A5.3',
      description: 'Acceptable alternative to STCW Personal Survival Techniques for non-STCW Certificate holders.'
    },
    'First Aid': {
      quote: '"Minimum one person on board shall hold MCA approved Elementary First Aid Certificate (or the First Aid at Sea Certificate or Medical First Aid Certificate), or an RYA First Aid Certificate."',
      section: 'WBC3 Appendix 5, Table A5.3',
      description: 'Requirements vary by vessel category and MLC compliance status. Categories 0-1 may require higher medical care qualifications.'
    },
    'Fire Fighting': {
      quote: '"All crew members shall complete an MCA approved one day fire fighting course, or STCW Fire Fighting and Prevention, or the equivalent Royal Navy course."',
      section: 'WBC3 Appendix 5, Table A5.3 (for vessels 15m+)',
      description: 'Vessels under 15m require minimum one crew member trained. Vessels 15m and over require ALL crew members trained.'
    },
    'Radar Training': {
      quote: '"All Masters, and crew likely to use radar shall complete an MCA approved Small Ships Navigation and Radar: Radar and Meteorology course."',
      section: 'WBC3 Appendix 5, Table A5.3',
      description: 'Only required for vessels equipped with radar.'
    },
    'Stability Training': {
      quote: '"The Master shall have completed stability awareness training unless the vessel has a full stability book."',
      section: 'WBC3 Appendix 5, Table A5.3',
      description: 'Not required if vessel has a comprehensive stability booklet prepared by naval architect.'
    }
  }

  // Try exact match first
  if (quotes[reqName]) {
    return quotes[reqName]
  }

  // Try partial matches for training courses
  for (const key in quotes) {
    if (reqName.includes(key) || key.includes(reqName)) {
      return quotes[key]
    }
  }

  // Default fallback based on type
  if (reqType === 'certificate') {
    return {
      quote: '"28.1.1 A vessel shall be safely manned, as a minimum, in accordance with the manning and qualifications requirements indicated in Tables A5.1 and A5.2 of Appendix 5."',
      section: 'WBC3 Section 28.1.1',
      description: 'Specific qualifications are listed in Appendix 5 tables based on vessel type, area category, and operational requirements.'
    }
  } else if (reqType === 'training') {
    return {
      quote: '"28.1.4 Anyone employed or engaged in any capacity onboard a vessel shall complete the required Administration-approved mandatory training courses listed in Table A5.3. If completion of the relevant mandatory courses cannot be demonstrated to the satisfaction of the Administration, then the vessel may be detained."',
      section: 'WBC3 Section 28.1.4',
      description: 'All mandatory training must be completed and certificates kept valid.'
    }
  } else if (reqType === 'medical') {
    return {
      quote: '"28.1.2 All crew members shall hold a valid medical fitness certificate issued or accepted by the Administration."',
      section: 'WBC3 Section 28.1.2',
      description: 'Medical certificates must be in-date and appropriate for the area of operation.'
    }
  }

  return null
}

// Helper function to safely render values that might be objects
const safeRender = (value: any): string => {
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null) {
    // If it has a 'name' property, use that
    if ('name' in value) return value.name
    // Otherwise convert to JSON string
    return JSON.stringify(value)
  }
  return String(value || '')
}

export default function CrewResultsPage() {
  const [results, setResults] = useState<any>(null)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})
  const [settingsExpanded, setSettingsExpanded] = useState(false)
  const [infoModal, setInfoModal] = useState<{ reqName: string; reqType: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('crewResults')
    if (stored) {
      const parsed = JSON.parse(stored)
      setResults(parsed.data || parsed)
    }
  }, [])

  // Helper function to display category names
  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      'cat0': 'Category 0 - Unrestricted',
      'cat1': 'Category 1 - Up to 150nm',
      'cat2': 'Category 2 - Up to 60nm',
      'cat3': 'Category 3 - Up to 20nm',
      'cat4': 'Category 4 - Up to 3nm',
      'cat5': 'Category 5 - Up to 1.5nm',
      'cat6': 'Category 6 - Limited',
      '0': 'Category 0 - Unrestricted',
      '1': 'Category 1 - Up to 150nm',
      '2': 'Category 2 - Up to 60nm',
      '3': 'Category 3 - Up to 20nm',
      '4': 'Category 4 - Up to 3nm',
      '5': 'Category 5 - Up to 1.5nm',
      '6': 'Category 6 - Limited'
    }
    return categories[category] || category
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // InfoButton component - small 'i' icon that opens info modal
  const InfoButton = ({ reqName, reqType }: { reqName: string; reqType: string }) => (
    <button
      onClick={() => setInfoModal({ reqName, reqType })}
      className="inline-flex items-center justify-center w-5 h-5 ml-2 text-cyan-600 hover:text-cyan-700 transition-colors"
      title="View regulatory reference"
    >
      <InformationCircleIcon className="w-5 h-5" />
    </button>
  )

  // Get current modal data
  const modalData = infoModal ? getWBC3Quote(infoModal.reqName, infoModal.reqType) : null

  if (!results) {
    return (
      <>
        <Navigation />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">No Results Found</h1>
            <Link href="/tools/crew-checker" className="text-cyan-500 hover:underline">
              Go back to the checker
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const {
    masterQualifications = {},
    secondPerson = {},
    engineeringQualifications = {},
    mandatoryTraining = [],
    medicalFitness = {},
    _meta = {}
  } = results

  const vesselLength = _meta?.vesselSummary?.lengthOverall || 0
  const category = _meta?.vesselSummary?.category || ''
  const vessel = _meta?.vesselSummary || {}

  // Determine category string for tables (e.g., 'cat3')
  const categoryStr = category ? `cat${category}` : undefined

  // Check if Cat 3-6 (no certificate required for second person)
  const isCat3to6 = ['3', '4', '5', '6'].includes(category)

  return (
    <>
      <Navigation />

      <main className="overflow-hidden pt-20">
        {/* Hero - Added pt-20 to account for fixed navigation */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Link
                  href="/tools/crew-checker"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-semibold"
                >
                  ← Back to Crew Checker
                </Link>
              </div>
              <h1 className="text-2xl font-black text-white mb-4">
                {_meta?.vesselSummary?.name || 'Your Vessel'} - Crew Requirements
              </h1>
              <p className="text-xl text-white/90">
                Based on your vessel configuration. Your requirements organized by role - no filtering needed, just scroll through.
              </p>
            </div>
          </div>
        </section>

        {/* Requirements Cards */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

              {/* Sidebar - Vessel Details (sticky on desktop) */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-card border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                    <Ship className="text-cyan-600" size={20} strokeWidth={2} />
                    Vessel Details
                  </h3>
                  <dl className="space-y-3 text-sm">
                    {vessel.name && (
                      <div>
                        <dt className="font-semibold text-gray-900">Vessel Name</dt>
                        <dd className="text-gray-700">{vessel.name}</dd>
                      </div>
                    )}
                    {vessel.vesselType && (
                      <div>
                        <dt className="font-semibold text-gray-900">Type</dt>
                        <dd className="text-gray-700 capitalize">{vessel.vesselType}</dd>
                      </div>
                    )}
                    {vessel.lengthOverall && (
                      <div>
                        <dt className="font-semibold text-gray-900">Length Overall</dt>
                        <dd className="text-gray-700">{vessel.lengthOverall}m</dd>
                      </div>
                    )}
                    {vessel.grossTonnage && (
                      <div>
                        <dt className="font-semibold text-gray-900">Gross Tonnage</dt>
                        <dd className="text-gray-700">{vessel.grossTonnage} GT</dd>
                      </div>
                    )}
                    {category && (
                      <div>
                        <dt className="font-semibold text-gray-900">Operating Area</dt>
                        <dd className="text-gray-700">{getCategoryName(category)}</dd>
                      </div>
                    )}
                    {vessel.propulsionType && (
                      <div>
                        <dt className="font-semibold text-gray-900">Propulsion Type</dt>
                        <dd className="text-gray-700 capitalize">{vessel.propulsionType}</dd>
                      </div>
                    )}
                    {vessel.enginePowerKw && (
                      <div>
                        <dt className="font-semibold text-gray-900">Engine Power</dt>
                        <dd className="text-gray-700">{vessel.enginePowerKw} kW</dd>
                      </div>
                    )}
                    {vessel.maxPersons && (
                      <div>
                        <dt className="font-semibold text-gray-900">Max Persons</dt>
                        <dd className="text-gray-700">{vessel.maxPersons}</dd>
                      </div>
                    )}

                    {/* Equipment Badges */}
                    {(_meta.hasRadar || _meta.hasElectronicCharts || vessel.hasStabilityBooklet || _meta.crewPreparesFood) && (
                      <div>
                        <dt className="font-semibold text-gray-900 mb-2">Equipment & Operations</dt>
                        <dd className="flex flex-wrap gap-2">
                          {_meta.hasRadar && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              Radar
                            </span>
                          )}
                          {_meta.hasElectronicCharts && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              E-Charts
                            </span>
                          )}
                          {vessel.hasStabilityBooklet && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              Stability Book
                            </span>
                          )}
                          {_meta.crewPreparesFood && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                              Food Prep
                            </span>
                          )}
                        </dd>
                      </div>
                    )}

                    {/* International Voyages */}
                    {_meta.internationalVoyages && (
                      <div>
                        <dt className="font-semibold text-gray-900">International Voyages</dt>
                        <dd className="text-gray-700">Yes</dd>
                      </div>
                    )}

                    {/* Crew Count */}
                    {vessel.crewCount && (
                      <div>
                        <dt className="font-semibold text-gray-900">Crew Count</dt>
                        <dd className="text-gray-700">{vessel.crewCount}</dd>
                      </div>
                    )}
                  </dl>

                  {/* Edit Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link
                      href="/tools/crew-checker"
                      className="block w-full text-center px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition-colors text-sm"
                    >
                      ✏️ Edit Vessel Details
                    </Link>
                  </div>
                </div>
              </div>

              {/* Main content area - All the cards */}
              <div className="lg:col-span-3 space-y-6">

              {/* CARD 1: ALL CREW - Universal Requirements */}
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                {/* Dark gradient header - compact horizontal layout */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
                  <div className="flex items-center gap-3">
                    <Users className="text-white flex-shrink-0" size={32} strokeWidth={2.5} />
                    <div>
                      <h2 className="text-lg font-black text-white">ALL CREW - Universal Requirements</h2>
                      <p className="text-white/90 text-sm">These requirements apply to EVERY person on board</p>
                    </div>
                  </div>
                </div>

                {/* White body content */}
                <div className="p-8">
                  <div className="space-y-4">
                    {/* Sea Survival */}
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" strokeWidth={2} />
                      <div className="flex-1">
                        <h3 className="font-bold text-ink text-lg inline-flex items-center">
                          Sea Survival Training
                          <InfoButton reqName="Sea Survival" reqType="training" />
                        </h3>
                        <p className="text-gray-700 mt-1">All crew members must complete:</p>
                        <ul className="list-disc list-inside ml-4 text-gray-700 mt-1">
                          <li>STCW Route: MCA approved Personal Survival Techniques</li>
                          <li>Non-STCW Route: RYA Basic Sea Survival</li>
                        </ul>
                      </div>
                    </div>

                    {/* Medical Fitness */}
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" strokeWidth={2} />
                      <div className="flex-1">
                        <h3 className="font-bold text-ink text-lg inline-flex items-center">
                          Medical Fitness Certificate
                          <InfoButton reqName="ENG1 Medical Certificate" reqType="medical" />
                        </h3>
                        <p className="text-gray-700 mt-1">
                          {safeRender(medicalFitness.certificateType) || 'ENG1 Medical Certificate'} required for all crew
                        </p>
                        {medicalFitness.reasoning && (
                          <p className="text-sm text-gray-600 mt-1 italic">{safeRender(medicalFitness.reasoning)}</p>
                        )}
                      </div>
                    </div>

                    {/* Fire Fighting (conditional on vessel length) */}
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" strokeWidth={2} />
                      <div className="flex-1">
                        <h3 className="font-bold text-ink text-lg inline-flex items-center">
                          Fire Fighting Training
                          <InfoButton reqName="Fire Fighting" reqType="training" />
                        </h3>
                        <p className="text-gray-700 mt-1">
                          {vesselLength >= 15
                            ? 'ALL crew members must complete fire fighting training (vessel 15m or over)'
                            : 'See "Minimum Coverage" card below - only 1 person required for vessels under 15m'
                          }
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          MCA approved one day fire fighting course, STCW Fire Fighting and Prevention, or equivalent Royal Navy course
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WBC3 Table A5.3 */}
                  <WBC3TableA53 highlightUniversal={true} />
                </div>
              </div>

              {/* CARD 2: MASTER - Certificate of Competency */}
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                {/* Dark gradient header - compact horizontal layout */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
                  <div className="flex items-center gap-3">
                    <Anchor className="text-white flex-shrink-0" size={32} strokeWidth={2.5} />
                    <div>
                      <h2 className="text-lg font-black text-white">MASTER - Certificate of Competency</h2>
                      <p className="text-white/90 text-sm">Required qualifications for the vessel's master</p>
                    </div>
                  </div>
                </div>

                {/* White body content */}
                <div className="p-8">
                  <div className="space-y-4">
                    {/* Master CoC */}
                    <div>
                      <h3 className="font-bold text-ink text-lg mb-2">Master must hold ONE of these certificates:</h3>
                      {masterQualifications.acceptableCertificates && masterQualifications.acceptableCertificates.length > 0 ? (
                        <>
                          <button
                            onClick={() => toggleSection('master-coc-list')}
                            className="flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors mb-2"
                          >
                            {expandedSections['master-coc-list'] ? (
                              <>
                                <ChevronUpIcon className="w-4 h-4" />
                                Hide acceptable certificates ({masterQualifications.acceptableCertificates.length})
                              </>
                            ) : (
                              <>
                                <ChevronDownIcon className="w-4 h-4" />
                                Show acceptable certificates ({masterQualifications.acceptableCertificates.length})
                              </>
                            )}
                          </button>

                          {expandedSections['master-coc-list'] && (
                            <div className="pl-4 border-l-4 border-orange/20 space-y-2">
                              {masterQualifications.acceptableCertificates.map((cert: any, idx: number) => (
                                <div key={idx} className="py-2 flex items-start gap-2">
                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                                  <p className="font-medium text-ink">{safeRender(cert)}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {masterQualifications.reasoning && (
                            <p className="text-sm text-gray-600 mt-2 italic">{safeRender(masterQualifications.reasoning)}</p>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-700">Certificate of Competency required (see WBC3 Table A5.1 below)</p>
                      )}
                    </div>

                    {/* Plus universal requirements */}
                    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                      <p className="text-sm font-semibold text-blue-900">
                        + All universal crew requirements listed in Card 1 above
                      </p>
                    </div>
                  </div>

                  {/* WBC3 Table A5.1 - Master Only */}
                  <WBC3TableA51 category={categoryStr} showMasterOnly={true} />
                </div>
              </div>

              {/* CARD 3: ADDITIONAL CREW - Second Person */}
              {secondPerson.required && (
                <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                  {/* Dark gradient header - compact horizontal layout */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
                    <div className="flex items-center gap-3">
                      <UserPlus className="text-white flex-shrink-0" size={32} strokeWidth={2.5} />
                      <div>
                        <h2 className="text-lg font-black text-white">ADDITIONAL CREW - Second Person / Deck Crew</h2>
                        <p className="text-white/90 text-sm">Requirements for additional crew members</p>
                      </div>
                    </div>
                  </div>

                  {/* White body content */}
                  <div className="p-8">
                    <div className="space-y-4">
                      {/* Second Person Requirements */}
                      <div>
                        <h3 className="font-bold text-ink text-lg mb-2">Second Person Requirements:</h3>

                        {isCat3to6 ? (
                          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r">
                            <p className="font-semibold text-green-900 mb-2">✓ Categories 3-6:</p>
                            <p className="text-green-800">
                              Second person that vessel owner/operator considers experienced and competent.
                            </p>
                            <p className="text-sm text-green-900 mt-2 font-bold">
                              NO certificate required for Categories 3-6.
                            </p>
                          </div>
                        ) : (
                          <>
                            {secondPerson.acceptableCertificates && secondPerson.acceptableCertificates.length > 0 && (
                              <>
                                <p className="text-gray-700 mb-2">Must hold ONE of these certificates:</p>
                                <button
                                  onClick={() => toggleSection('second-person-coc-list')}
                                  className="flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors mb-2"
                                >
                                  {expandedSections['second-person-coc-list'] ? (
                                    <>
                                      <ChevronUpIcon className="w-4 h-4" />
                                      Hide acceptable certificates ({secondPerson.acceptableCertificates.length})
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDownIcon className="w-4 h-4" />
                                      Show acceptable certificates ({secondPerson.acceptableCertificates.length})
                                    </>
                                  )}
                                </button>

                                {expandedSections['second-person-coc-list'] && (
                                  <div className="pl-4 border-l-4 border-orange/20 space-y-2">
                                    {secondPerson.acceptableCertificates.map((cert: any, idx: number) => (
                                      <div key={idx} className="py-2 flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                                        <p className="font-medium text-ink">{safeRender(cert)}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </>
                            )}

                            {secondPerson.reasoning && (
                              <p className="text-sm text-gray-600 mt-2 italic">{safeRender(secondPerson.reasoning)}</p>
                            )}
                          </>
                        )}
                      </div>

                      {/* Plus universal requirements */}
                      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                        <p className="text-sm font-semibold text-blue-900">
                          + All universal crew requirements listed in Card 1
                        </p>
                      </div>
                    </div>

                    {/* WBC3 Table A5.1 - Additional Crew Only */}
                    <WBC3TableA51 category={categoryStr} showAdditionalCrewOnly={true} />
                  </div>
                </div>
              )}

              {/* CARD 4: MINIMUM COVERAGE */}
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                {/* Dark gradient header - compact horizontal layout */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-white flex-shrink-0" size={32} strokeWidth={2.5} />
                    <div>
                      <h2 className="text-lg font-black text-white">MINIMUM COVERAGE</h2>
                      <p className="text-white/90 text-sm">At least one person on board must have...</p>
                    </div>
                  </div>
                </div>

                {/* White body content */}
                <div className="p-8">
                  <div className="space-y-4">
                    {/* First Aid */}
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" strokeWidth={2} />
                      <div className="flex-1">
                        <h3 className="font-bold text-ink text-lg inline-flex items-center">
                          First Aid Training
                          <InfoButton reqName="First Aid" reqType="training" />
                        </h3>
                        <p className="text-gray-700 mt-1">
                          Minimum <strong>one person</strong> on board must hold:
                        </p>
                        <ul className="list-disc list-inside ml-4 text-gray-700 mt-1">
                          <li>MCA approved Elementary First Aid Certificate</li>
                          <li>OR RYA First Aid Certificate</li>
                          <li>OR First Aid at Sea Certificate</li>
                          <li>OR Medical First Aid Certificate</li>
                        </ul>
                      </div>
                    </div>

                    {/* Fire Fighting (for vessels under 15m) */}
                    {vesselLength < 15 && (
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" strokeWidth={2} />
                        <div className="flex-1">
                          <h3 className="font-bold text-ink text-lg">Fire Fighting Training</h3>
                          <p className="text-gray-700 mt-1">
                            For vessels under 15m: Minimum <strong>one person</strong> must be trained
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            MCA approved one day fire fighting course, STCW Fire Fighting and Prevention, or equivalent
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Note about same person */}
                    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                      <p className="text-sm font-semibold text-blue-900 mb-1">
                        Note: Efficiency Allowed
                      </p>
                      <p className="text-sm text-blue-800">
                        These requirements can be met by the same person. For example, the Master can hold both First Aid and Fire Fighting qualifications, satisfying both minimum coverage requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 5: ENGINEERING (conditional) */}
              {(engineeringQualifications.acceptableCertificates?.length > 0 || engineeringQualifications.generalRequirement) && (
                <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                  {/* Dark gradient header - compact horizontal layout */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
                    <div className="flex items-center gap-3">
                      <Wrench className="text-white flex-shrink-0" size={32} strokeWidth={2.5} />
                      <div>
                        <h2 className="text-lg font-black text-white">ENGINEERING - Machinery Qualification</h2>
                        <p className="text-white/90 text-sm">Engineering qualification required for this vessel</p>
                      </div>
                    </div>
                  </div>

                  {/* White body content */}
                  <div className="p-8">
                    <div className="space-y-4">
                      {/* Engineering Qualifications */}
                      <div>
                        <h3 className="font-bold text-ink text-lg mb-2">
                          Engineering person must hold ONE of these certificates:
                        </h3>

                        {engineeringQualifications.acceptableCertificates && engineeringQualifications.acceptableCertificates.length > 0 ? (
                          <>
                            <button
                              onClick={() => toggleSection('engineering-coc-list')}
                              className="flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors mb-2"
                            >
                              {expandedSections['engineering-coc-list'] ? (
                                <>
                                  <ChevronUpIcon className="w-4 h-4" />
                                  Hide acceptable certificates ({engineeringQualifications.acceptableCertificates.length})
                                </>
                              ) : (
                                <>
                                  <ChevronDownIcon className="w-4 h-4" />
                                  Show acceptable certificates ({engineeringQualifications.acceptableCertificates.length})
                                </>
                              )}
                            </button>

                            {expandedSections['engineering-coc-list'] && (
                              <div className="pl-4 border-l-4 border-orange/20 space-y-2">
                                {engineeringQualifications.acceptableCertificates.map((cert: any, idx: number) => (
                                  <div key={idx} className="py-2 flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                                    <p className="font-medium text-ink">{safeRender(cert)}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {engineeringQualifications.powerTier && (
                              <p className="text-sm text-gray-600 mt-2">
                                Required for: {safeRender(engineeringQualifications.powerTier)}
                              </p>
                            )}

                            {engineeringQualifications.reasoning && (
                              <p className="text-sm text-gray-600 mt-2 italic">{safeRender(engineeringQualifications.reasoning)}</p>
                            )}
                          </>
                        ) : (
                          <p className="text-gray-700">Engineering certificate required (see WBC3 Table A5.2 below)</p>
                        )}
                      </div>

                      {/* Dual Role Allowed */}
                      <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r">
                        <p className="text-sm font-bold text-amber-900 mb-2">
                          ⚠️ IMPORTANT: Dual Role Allowed
                        </p>
                        <p className="text-sm text-amber-800">
                          The Master or Second Person can also hold this engineering qualification. You do NOT need a separate dedicated engineer - one person can fulfill multiple roles.
                        </p>
                        <p className="text-xs text-amber-800 mt-2 italic">
                          WBC3 Table A5.2, Note 2: "The person holding the engineering requirement may be a crew member listed in Table A5.1."
                        </p>
                      </div>

                      {/* Plus universal requirements */}
                      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                        <p className="text-sm font-semibold text-blue-900">
                          + All universal crew requirements listed in Card 1
                        </p>
                      </div>
                    </div>

                    {/* WBC3 Table A5.2 */}
                    <WBC3TableA52 />
                  </div>
                </div>
              )}

              {/* CARD 6: ADDITIONAL TRAINING (conditional) */}
              {(_meta.hasRadar || _meta.hasElectronicCharts || _meta.hasStabilityBooklet || _meta.crewPreparesFood) && (
                <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                  {/* Dark gradient header - compact horizontal layout */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
                    <div className="flex items-center gap-3">
                      <Radio className="text-white flex-shrink-0" size={32} strokeWidth={2.5} />
                      <div>
                        <h2 className="text-lg font-black text-white">ADDITIONAL TRAINING - Equipment Specific</h2>
                        <p className="text-white/90 text-sm">Based on your vessel's equipment and operations</p>
                      </div>
                    </div>
                  </div>

                  {/* White body content */}
                  <div className="p-8">
                    <div className="space-y-4">
                      {/* Radar Training */}
                      {_meta.hasRadar && (
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" strokeWidth={2} />
                          <div className="flex-1">
                            <h3 className="font-bold text-ink text-lg inline-flex items-center">
                              Radar Training
                              <InfoButton reqName="Radar Training" reqType="training" />
                            </h3>
                            <p className="text-gray-700 mt-1">
                              <strong>Who needs it:</strong> All Masters and crew likely to use radar
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              MCA approved Small Ships Navigation and Radar: Radar and Meteorology course
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Electronic Charts Training */}
                      {_meta.hasElectronicCharts && (
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" strokeWidth={2} />
                          <div className="flex-1">
                            <h3 className="font-bold text-ink text-lg">Electronic Chart Systems Training</h3>
                            <p className="text-gray-700 mt-1">
                              <strong>Who needs it:</strong> All Masters and crew on navigational watch
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              MCA approved Small Ships Navigation and Radar: Electronic Chart Systems course
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Stability Training */}
                      {_meta.hasStabilityBooklet && (
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" strokeWidth={2} />
                          <div className="flex-1">
                            <h3 className="font-bold text-ink text-lg inline-flex items-center">
                              Stability Training
                              <InfoButton reqName="Stability Training" reqType="training" />
                            </h3>
                            <p className="text-gray-700 mt-1">
                              <strong>Who needs it:</strong> Master (minimum)
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              MCA 1 day stability awareness course
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Catering Training */}
                      {_meta.crewPreparesFood && (
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" strokeWidth={2} />
                          <div className="flex-1">
                            <h3 className="font-bold text-ink text-lg">Catering / Food Hygiene Training</h3>
                            <p className="text-gray-700 mt-1">
                              <strong>Who needs it:</strong> All crew engaged in food preparation
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Basic Food Hygiene or Food Safety Level 2 certificate
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* WBC3 Table A5.3 - Conditional Highlighted */}
                    <WBC3TableA53 highlightConditional={true} />
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h4 className="font-bold text-ink mb-3">About Certificate Requirements</h4>
                <ul className="text-sm text-body-text space-y-2 leading-relaxed">
                  <li>• For Certificate of Competency (CoC), crew members need <strong>ANY ONE</strong> of the listed certificates</li>
                  <li>• Higher-level certificates are valid at lower levels (e.g., Boatmaster T2 is valid for T3 requirements)</li>
                  <li>• All mandatory training must be completed and in-date</li>
                  <li>• Medical certificates must be valid and appropriate for the role</li>
                  <li>• Multiple roles can be held by the same person (e.g., Master can also be the Engineering qualified person)</li>
                </ul>
              </div>

              </div> {/* End main content area */}

            </div> {/* End grid */}

            {/* CTA - Prominent call-to-action card with background image */}
            <div className="mt-16 text-center max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                {/* Background Image with Dark Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/workboat-cta-hero.jpg)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/85 to-gray-800/90"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-10">
                  <h3 className="text-3xl font-black text-white mb-4">Need Help Understanding Your Requirements?</h3>
                  <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed">
                    FleetSkipper tracks crew certificates, sends expiry alerts, and ensures ongoing WBC3 compliance for your entire fleet.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-bold text-white bg-orange hover:bg-orange-dark transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Get Expert Guidance →
                    </Link>
                    <Link
                      href="/tools/crew-checker"
                      className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-bold text-gray-900 bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      ← Start Over
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Info Modal */}
      {infoModal && modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setInfoModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-6 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{infoModal.reqName}</h3>
                <p className="text-cyan-100 text-sm font-semibold">{modalData.section}</p>
              </div>
              <button
                onClick={() => setInfoModal(null)}
                className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Quote */}
              <div className="bg-gray-50 border-l-4 border-cyan-500 p-4 rounded-r">
                <p className="text-sm font-semibold text-gray-600 mb-2">Regulatory Quote:</p>
                <p className="text-gray-800 italic leading-relaxed">{modalData.quote}</p>
              </div>

              {/* Description */}
              {modalData.description && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">What this means:</p>
                  <p className="text-gray-700 leading-relaxed">{modalData.description}</p>
                </div>
              )}

              {/* Close Button */}
              <div className="pt-4 border-t">
                <button
                  onClick={() => setInfoModal(null)}
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
