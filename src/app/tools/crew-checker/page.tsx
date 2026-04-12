'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function CrewCheckerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any[]>([])

  const [formData, setFormData] = useState({
    vesselName: '',
    vesselType: '',
    category: '',
    lengthOverall: '',
    grossTonnage: '',
    maxPersons: '',
    propulsionConfiguration: '',
    enginePowerKW: '',
    crewCount: '',
    operations: [] as string[],
    isOpenBoat: false,
    internationalVoyages: false,
    hasRadar: false,
    hasElectronicCharts: false,
    hasStabilityBooklet: false,
    crewPreparesFood: false,
    maxSpeed: '',
    operatesAtNight: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors([])

    try {
      const response = await fetch('/api/crew/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lengthOverall: parseFloat(formData.lengthOverall),
          grossTonnage: parseFloat(formData.grossTonnage),
          maxPersons: parseInt(formData.maxPersons),
          enginePowerKW: parseFloat(formData.enginePowerKW),
          crewCount: parseInt(formData.crewCount),
          maxSpeed: formData.maxSpeed ? parseFloat(formData.maxSpeed) : undefined,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Save results WITH the vessel input data embedded so Edit Settings loads correct data
        const resultsWithInput = {
          ...result,
          vesselInput: formData // Embed the form data that created these results
        }
        localStorage.setItem('crewResults', JSON.stringify(resultsWithInput))
        router.push('/tools/crew-checker/results')
      } else {
        setErrors(result.errors || [])
      }
    } catch (error) {
      setErrors([{ field: 'server', message: 'Failed to check crew requirements' }])
    } finally {
      setLoading(false)
    }
  }

  const handleOperationToggle = (operation: string) => {
    setFormData(prev => ({
      ...prev,
      operations: prev.operations.includes(operation)
        ? prev.operations.filter(op => op !== operation)
        : [...prev.operations, operation]
    }))
  }

  // Load vessel input from CURRENT results when clicking Edit Settings
  useEffect(() => {
    const savedResults = localStorage.getItem('crewResults')
    if (savedResults) {
      try {
        const results = JSON.parse(savedResults)
        // If results contain vesselInput, load it into the form
        if (results.vesselInput) {
          setFormData(results.vesselInput)
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  return (
    <>
      <Navigation />

      <main className="overflow-hidden pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-cyan-600 to-cyan-700 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-black text-white mb-4">
                WBC3 Crew Certificate Checker
              </h1>
              <p className="text-xl text-white/90">
                Find out what certificates and training your crew need for UK Workboat Code compliance
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">

              {errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="font-bold text-red-900 mb-2">Please fix the following errors:</h3>
                  <ul className="list-disc list-inside text-red-700">
                    {errors.map((err, i) => (
                      <li key={i}>{err.message}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Vessel Identity */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">Vessel Identity</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Vessel Name *</label>
                      <input
                        type="text"
                        name="vesselName"
                        value={formData.vesselName}
                        onChange={(e) => setFormData({ ...formData, vesselName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Vessel Certificate Type *</label>
                      <select
                        name="vesselType"
                        value={formData.vesselType}
                        onChange={(e) => setFormData({ ...formData, vesselType: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        required
                      >
                        <option value="">Select certificate type...</option>
                        <option value="workboat">Standard Workboat Certificate</option>
                        <option value="tug">Tug Certificate</option>
                        <option value="pilot">Pilot Boat Certificate</option>
                        <option value="police">Police / Patrol Vessel Certificate</option>
                        <option value="safety_standby">Safety / Standby Vessel Certificate</option>
                        <option value="non_self_propelled">Non-Self-Propelled Platform</option>
                      </select>
                      <p className="mt-1 text-xs text-gray-600">
                        Select the type of MCA certificate your vessel holds
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vessel Dimensions */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">Vessel Dimensions</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Length Overall (m) *</label>
                      <input
                        type="number"
                        step="0.01"
                        name="lengthOverall"
                        value={formData.lengthOverall}
                        onChange={(e) => setFormData({ ...formData, lengthOverall: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Gross Tonnage (GT) *</label>
                      <input
                        type="number"
                        step="0.01"
                        name="grossTonnage"
                        value={formData.grossTonnage}
                        onChange={(e) => setFormData({ ...formData, grossTonnage: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Maximum Persons on Board *</label>
                      <input
                        type="number"
                        name="maxPersons"
                        value={formData.maxPersons}
                        onChange={(e) => setFormData({ ...formData, maxPersons: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Crew Count *</label>
                      <input
                        type="number"
                        name="crewCount"
                        value={formData.crewCount}
                        onChange={(e) => setFormData({ ...formData, crewCount: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Area of Operation */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">Area of Operation</h2>
                  <div>
                    <label className="block text-sm font-medium mb-2">WBC3 Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    >
                      <option value="">Select category...</option>
                      <option value="cat0">Category 0 — Unrestricted</option>
                      <option value="cat1">Category 1 — Up to 150nm from safe haven</option>
                      <option value="cat2">Category 2 — Up to 60nm from safe haven</option>
                      <option value="cat3">Category 3 — Up to 20nm from safe haven</option>
                      <option value="cat4">Category 4 — Up to 20nm, daylight only</option>
                      <option value="cat5">Category 5 — Up to 3nm, day and night</option>
                      <option value="cat6">Category 6 — Up to 3nm, daylight only</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        data-testid="internationalVoyages"
                        checked={formData.internationalVoyages}
                        onChange={(e) => setFormData({ ...formData, internationalVoyages: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">Operates on international voyages</span>
                    </label>
                  </div>
                </div>

                {/* Propulsion & Machinery */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">Propulsion & Machinery</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Propulsion Configuration *</label>
                      <select
                        name="propulsionConfiguration"
                        value={formData.propulsionConfiguration}
                        onChange={(e) => setFormData({ ...formData, propulsionConfiguration: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        required
                      >
                        <option value="">Select configuration...</option>
                        <option value="diesel_inboard_below">Diesel inboard (below deck)</option>
                        <option value="diesel_inboard_above">Diesel inboard (above deck)</option>
                        <option value="diesel_outboard">Diesel outboard</option>
                        <option value="petrol_outboard">Petrol outboard</option>
                        <option value="battery_inboard">Electric/Battery inboard</option>
                        <option value="hybrid_inboard_below">Hybrid inboard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Total Engine Power (kW) *</label>
                      <input
                        type="number"
                        step="0.1"
                        name="enginePowerKW"
                        value={formData.enginePowerKW}
                        onChange={(e) => setFormData({ ...formData, enginePowerKW: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Vessel Structure */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">Vessel Structure</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isOpenBoat}
                        onChange={(e) => setFormData({ ...formData, isOpenBoat: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">This is an open boat (no wheelhouse)</span>
                    </label>
                  </div>
                </div>

                {/* Operations & Equipment */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">Certificate Endorsements & Equipment</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Certificate Endorsements</label>
                      <p className="text-xs text-gray-600 mb-3">Select any endorsements listed on your vessel's MCA certificate</p>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.operations.includes('towing_operations')}
                            onChange={() => handleOperationToggle('towing_operations')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Towing Operations</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.operations.includes('high_speed_ops')}
                            onChange={() => handleOperationToggle('high_speed_ops')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">High Speed Operations (&gt;25 knots)</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.operations.includes('dangerous_goods')}
                            onChange={() => handleOperationToggle('dangerous_goods')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Dangerous Goods Carriage</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.operations.includes('mgo_supply')}
                            onChange={() => handleOperationToggle('mgo_supply')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Marine Gas Oil (MGO) Supply</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.operations.includes('pilot_transfer')}
                            onChange={() => handleOperationToggle('pilot_transfer')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Pilot Transfer</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.operations.includes('lifting_operations')}
                            onChange={() => handleOperationToggle('lifting_operations')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Lifting Operations (cargo &gt;1000kg)</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.operations.includes('dive_support')}
                            onChange={() => handleOperationToggle('dive_support')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Dive Support</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.operations.includes('personnel_transfer')}
                            onChange={() => handleOperationToggle('personnel_transfer')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Personnel Transfer at Sea</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.operations.includes('patrol_operations')}
                            onChange={() => handleOperationToggle('patrol_operations')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Patrol Operations</span>
                        </label>
                      </div>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        data-testid="hasRadar"
                        checked={formData.hasRadar}
                        onChange={(e) => setFormData({ ...formData, hasRadar: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">Has radar</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        data-testid="hasElectronicCharts"
                        checked={formData.hasElectronicCharts}
                        onChange={(e) => setFormData({ ...formData, hasElectronicCharts: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">Has electronic charts</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        data-testid="hasStabilityBooklet"
                        checked={formData.hasStabilityBooklet}
                        onChange={(e) => setFormData({ ...formData, hasStabilityBooklet: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">Has stability booklet</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        data-testid="crewPreparesFood"
                        checked={formData.crewPreparesFood}
                        onChange={(e) => setFormData({ ...formData, crewPreparesFood: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">Crew prepares food</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        data-testid="operatesAtNight"
                        checked={formData.operatesAtNight}
                        onChange={(e) => setFormData({ ...formData, operatesAtNight: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">Operates at night</span>
                    </label>
                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-2">Maximum Speed (knots, optional)</label>
                      <input
                        type="number"
                        step="0.1"
                        name="maxSpeed"
                        value={formData.maxSpeed}
                        onChange={(e) => setFormData({ ...formData, maxSpeed: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        placeholder="Leave blank if unknown"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Checking Requirements...' : 'Check Crew Requirements →'}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
