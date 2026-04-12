'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ReferenceModal } from '@/components/ReferenceModal'
import { Ship, Anchor, Package, AlertCircle, CheckCircle } from 'lucide-react'
import { getReferenceData, hasReferenceData, type RegulationReference } from '@/lib/wbc3-checker/references/wbc3-references'

export default function WBC3ResultsPage() {
  const [results, setResults] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all') // 'all', 'mandatory', 'recommended'
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedReference, setSelectedReference] = useState<RegulationReference | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('wbc3Results')
    if (stored) {
      setResults(JSON.parse(stored))
    }
  }, [])

  const handleReferenceClick = (reference: string) => {
    const refData = getReferenceData(reference)
    if (refData) {
      setSelectedReference(refData)
      setModalOpen(true)
    }
  }

  if (!results) {
    return (
      <>
        <Navigation />
        <main className="py-20 pt-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">No Results Found</h1>
            <Link href="/tools/wbc3-checker" className="text-cyan-500 hover:underline">
              Go back to the checker
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const { summary, equipment = [], documentation = [], training = [], certificates = [], _meta } = results

  // Calculate equipment-specific counts
  const equipmentMandatoryCount = equipment.filter((item: any) => item.mandatory).length
  const equipmentRecommendedCount = equipment.filter((item: any) => !item.mandatory).length

  // Get unique categories from equipment
  const categories = Array.from(new Set(equipment.map((item: any) => item.category).filter(Boolean)))

  // Filter equipment based on selections
  const filteredEquipment = equipment.filter((item: any) => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    const typeMatch = selectedType === 'all' ||
                      (selectedType === 'mandatory' && item.mandatory) ||
                      (selectedType === 'recommended' && !item.mandatory)
    return categoryMatch && typeMatch
  })

  // Group equipment by category
  const groupedEquipment = filteredEquipment.reduce((acc: any, item: any) => {
    const cat = item.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  return (
    <>
      <Navigation />

      <main className="overflow-hidden pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <Package className="text-cyan-500" size={32} strokeWidth={2.5} />
                <h1 className="text-2xl font-black text-white">
                  WBC3 Equipment Requirements
                </h1>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                  <Ship className="text-cyan-400" size={16} />
                  <span className="text-white/90">{_meta?.vesselSummary?.name || 'Vessel'}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-white">{equipmentMandatoryCount}</span>
                  <span className="text-white/70">Mandatory Equipment</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                  <AlertCircle className="text-blue-400" size={16} />
                  <span className="text-white">{equipmentRecommendedCount}</span>
                  <span className="text-white/70">Recommended Equipment</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                  <Package className="text-cyan-400" size={16} />
                  <span className="text-white">{equipment.length || 0}</span>
                  <span className="text-white/70">Total Equipment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Sidebar */}
                <aside className="lg:col-span-4">
                  <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-card border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                      <Ship className="text-cyan-600" size={20} strokeWidth={2} />
                      Vessel Details
                    </h3>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="text-gray-600 font-medium">Vessel Name</dt>
                        <dd className="text-gray-900 font-semibold">{_meta?.vesselSummary?.name || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-600 font-medium">Certificate Type</dt>
                        <dd className="text-gray-900 font-semibold">{_meta?.vesselSummary?.type || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-600 font-medium">Area Category</dt>
                        <dd className="text-gray-900 font-semibold">{_meta?.vesselSummary?.category || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-600 font-medium">Length Overall</dt>
                        <dd className="text-gray-900 font-semibold">{_meta?.vesselSummary?.length || 'N/A'} m</dd>
                      </div>
                      <div>
                        <dt className="text-gray-600 font-medium">Gross Tonnage</dt>
                        <dd className="text-gray-900 font-semibold">{_meta?.vesselSummary?.tonnage || 'N/A'} GT</dd>
                      </div>
                      <div>
                        <dt className="text-gray-600 font-medium">Max Persons</dt>
                        <dd className="text-gray-900 font-semibold">{_meta?.vesselSummary?.maxPersons || 'N/A'}</dd>
                      </div>
                    </dl>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Link
                        href="/tools/wbc3-checker"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors text-sm"
                      >
                        ✏️ Edit Vessel Details
                      </Link>
                    </div>
                  </div>
                </aside>

                {/* Main Content */}
                <div className="lg:col-span-8">

                  {/* Filter Bar */}
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Category Filter */}
                      <div className="flex-1">
                        <label htmlFor="category-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                          Equipment Category
                        </label>
                        <select
                          id="category-filter"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-sm"
                        >
                          <option value="all">All Categories ({equipment.length})</option>
                          {categories.map((cat: string) => (
                            <option key={cat} value={cat}>
                              {cat} ({equipment.filter((item: any) => item.category === cat).length})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Type Filter */}
                      <div className="flex-1">
                        <label htmlFor="type-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                          Requirement Type
                        </label>
                        <select
                          id="type-filter"
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-sm"
                        >
                          <option value="all">All ({equipment.length})</option>
                          <option value="mandatory">Mandatory Only ({equipmentMandatoryCount})</option>
                          <option value="recommended">Recommended Only ({equipmentRecommendedCount})</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                      Showing <span className="font-bold text-cyan-600">{filteredEquipment.length}</span> of <span className="font-bold">{equipment.length}</span> items
                    </div>
                  </div>

                  {/* Equipment List - Grouped by Category */}
                  {filteredEquipment.length > 0 ? (
                    <div className="space-y-6">
                      {Object.keys(groupedEquipment).sort().map((category) => (
                        <div key={category} className="bg-white rounded-xl shadow-sm overflow-hidden">
                          {/* Category Header */}
                          <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-3">
                            <h3 className="text-white font-bold text-lg flex items-center gap-2">
                              <Anchor size={18} />
                              {category}
                              <span className="ml-auto text-sm font-normal text-white/80">
                                {groupedEquipment[category].length} item{groupedEquipment[category].length !== 1 ? 's' : ''}
                              </span>
                            </h3>
                          </div>

                          {/* Items */}
                          <div className="divide-y divide-gray-100">
                            {groupedEquipment[category].map((item: any, i: number) => (
                              <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start gap-3">
                                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${item.mandatory ? 'bg-red-500' : 'bg-blue-500'}`} />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                      <h4 className="font-semibold text-gray-900">{item.item || item.name}</h4>
                                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                                        item.mandatory
                                          ? 'bg-red-50 text-red-700 border border-red-200'
                                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                                      }`}>
                                        {item.mandatory ? 'MANDATORY' : 'RECOMMENDED'}
                                      </span>
                                    </div>

                                    {item.description && (
                                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                    )}

                                    {item.reference && (
                                      <div className="flex items-center gap-2">
                                        {hasReferenceData(item.reference) ? (
                                          <button
                                            onClick={() => handleReferenceClick(item.reference)}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 hover:text-cyan-800 text-xs font-mono rounded border border-cyan-200 hover:border-cyan-300 transition-colors cursor-pointer"
                                            title="Click to view regulation details"
                                          >
                                            📘 {item.reference}
                                          </button>
                                        ) : (
                                          <span className="inline-block px-2 py-0.5 bg-cyan-50 text-cyan-700 text-xs font-mono rounded border border-cyan-200">
                                            📘 {item.reference}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                      <Package className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-gray-600 text-lg mb-4">No items match your current filters</p>
                      <button
                        onClick={() => {
                          setSelectedCategory('all')
                          setSelectedType('all')
                        }}
                        className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help Getting Compliant?</h3>
                <p className="text-lg text-gray-700 mb-6">
                  These are just the equipment requirements. You also need documentation, procedures, training, and more.
                  Let us build a complete, custom SMS for your vessel.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Book Free Consultation →
                  </Link>
                  <Link
                    href="/tools/wbc3-checker"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-cyan-600 border-2 border-cyan-500 rounded-xl font-bold text-lg transition-all"
                  >
                    Check Another Vessel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Reference Modal */}
      <ReferenceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        reference={selectedReference}
      />
    </>
  )
}
