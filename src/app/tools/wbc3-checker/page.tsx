'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailGate } from '@/components/EmailGate'

export default function WBC3CheckerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasAccess, setHasAccess] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    // ===================================================================
    // SECTION 1: Vessel Identity (REQUIRED)
    // ===================================================================
    vesselName: '',
    vesselType: 'workboat',

    // ===================================================================
    // SECTION 2: Vessel Dimensions (REQUIRED)
    // ===================================================================
    lengthOverall: '',
    grossTonnage: '',
    maxPersons: '',
    carriesChildren: false,

    // ===================================================================
    // SECTION 3: Area of Operation (REQUIRED)
    // ===================================================================
    category: 'cat6',
    gmdssSeaArea: 'A1',
    internationalVoyages: false,

    // ===================================================================
    // SECTION 4: Propulsion & Machinery (REQUIRED if not non_self_propelled)
    // ===================================================================
    propulsionConfiguration: 'diesel_inboard_below',
    enginePowerKW: '',
    driveType: 'shaft',

    // ===================================================================
    // SECTION 5: Vessel Structure (REQUIRED if not non_self_propelled)
    // ===================================================================
    isOpenBoat: true,
    hasWheelhouse: false,
    hasAccommodation: false,
    hasSleeping: false,

    // ===================================================================
    // SECTION 6: Galley & Fire Risk (REQUIRED if not non_self_propelled)
    // ===================================================================
    hasGalley: false,
    galleyHeatSource: 'electric', // only used if hasGalley = true
    hasHeating: false,
    hasLithiumBattery: false,

    // ===================================================================
    // SECTION 7: Life Saving Appliances (REQUIRED if not non_self_propelled)
    // ===================================================================
    lifejacketType: 'foam',
    waterTemperature: 'above_10c',

    // ===================================================================
    // SECTION 8: GMDSS Conditionals (optional/conditional)
    // ===================================================================
    voyageDuration: 'under_12h',
    operatesUKWaters: true,
    visualAlertingEffective: 'yes',
    alternativeWeatherInfo: 'available',

    // ===================================================================
    // SECTION 9: Operations (optional)
    // ===================================================================
    operations: [], // multi_enum - array of strings
    operatesAtNight: false,

    // ===================================================================
    // SECTION 10: Engine & Galley Protection (conditional objects)
    // ===================================================================
    engineBoxProtection: {
      firePort: false,
      fixedSystem: false,
    },
    openFlameProtection: {
      blanket: false,
      extraExtinguisher: false,
      fixedSystem: false,
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Convert form data to match API expectations
      const vesselInput = {
        ...formData,
        lengthOverall: parseFloat(formData.lengthOverall),
        grossTonnage: parseFloat(formData.grossTonnage),
        maxPersons: parseInt(formData.maxPersons),
        enginePowerKW: formData.enginePowerKW ? parseFloat(formData.enginePowerKW) : undefined,
      }

      const response = await fetch('/api/wbc3/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vesselInput),
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.errors?.[0]?.message || 'Failed to check requirements')
        setLoading(false)
        return
      }

      // Store results and navigate to results page
      localStorage.setItem('wbc3Results', JSON.stringify(result.data))
      router.push('/tools/wbc3-checker/results')
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  // Handle email submission
  const handleEmailSubmitted = (email: string) => {
    setHasAccess(true)
    setUserEmail(email)
  }

  return (
    <>
      <Navigation />

      {/* Email Gate - shows modal if user hasn't provided email */}
      {!hasAccess && (
        <EmailGate
          onEmailSubmitted={handleEmailSubmitted}
          title="Access WBC3 Equipment Checker"
          description="Enter your email to use our free WBC3 compliance tools. No password required."
        />
      )}

      <main className="overflow-hidden pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 md:py-20">
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-white leading-tight">
                WBC3 Vessel Requirements Checker
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Get your complete list of equipment, documentation, and training requirements in under 5 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Vessel Identity */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Vessel Identity</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Vessel Name
                      </label>
                      <input
                        type="text"
                        name="vesselName"
                        value={formData.vesselName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Enter vessel name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Vessel Type / Certificate Type
                      </label>
                      <select
                        name="vesselType"
                        value={formData.vesselType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        <option value="workboat">Workboat - Standard Workboat Certificate</option>
                        <option value="tug">Tug - Tug vessel</option>
                        <option value="pilot">Pilot Boat - Dedicated pilot boat (WBC3 Section 27)</option>
                        <option value="police">Police / Patrol Vessel (WBC3 Annex 3)</option>
                        <option value="safety_standby">Safety / Standby Vessel</option>
                        <option value="ctv">Crew Transfer Vessel - Wind farm CTV</option>
                        <option value="survey">Survey Vessel - Survey or research vessel</option>
                        <option value="rib">RIB - Rigid inflatable boat</option>
                        <option value="non_self_propelled">Non-Self-Propelled Platform (WBC3 26.5.1.1)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        WBC3 Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        <option value="cat0">Category 0 — Unlimited (Unrestricted service)</option>
                        <option value="cat1">Category 1 — up to 150 miles from safe haven</option>
                        <option value="cat2">Category 2 — up to 60 miles from safe haven</option>
                        <option value="cat3">Category 3 — up to 20 miles from safe haven</option>
                        <option value="cat4">Category 4 — up to 20 miles, favourable weather</option>
                        <option value="cat5">Category 5 — up to 3 miles from safe haven</option>
                        <option value="cat6">Category 6 — sheltered waters / estuarial</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Vessel Dimensions */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Vessel Dimensions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Length Overall (m)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="lengthOverall"
                        value={formData.lengthOverall}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 12.5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Gross Tonnage (GT)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="grossTonnage"
                        value={formData.grossTonnage}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 15"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Max Persons on Board
                      </label>
                      <input
                        type="number"
                        name="maxPersons"
                        value={formData.maxPersons}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 12"
                      />
                    </div>
                  </div>
                </div>

                {/* Engine Details */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Engine & Propulsion</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Propulsion Configuration
                      </label>
                      <select
                        name="propulsionConfiguration"
                        value={formData.propulsionConfiguration}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        <option value="diesel_inboard_below">Diesel Inboard (Below Deck)</option>
                        <option value="diesel_inboard_above">Diesel Inboard (Above Deck)</option>
                        <option value="diesel_outboard">Diesel Outboard</option>
                        <option value="petrol_outboard">Petrol Outboard</option>
                        <option value="battery_inboard">Battery Electric Inboard</option>
                        <option value="battery_outboard">Battery Electric Outboard</option>
                        <option value="hybrid_inboard_below">Hybrid Inboard (Below Deck)</option>
                        <option value="hybrid_inboard_above">Hybrid Inboard (Above Deck)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Drive Type
                      </label>
                      <select
                        name="driveType"
                        value={formData.driveType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        <option value="shaft">Shaft Drive</option>
                        <option value="water_jet">Water Jet</option>
                        <option value="pod_drive">Pod Drive</option>
                        <option value="outboard_motor">Outboard Motor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Total Engine Power (kW)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="enginePowerKW"
                        value={formData.enginePowerKW}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 150"
                      />
                    </div>
                  </div>
                </div>

                {/* Vessel Structure */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Vessel Structure</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isOpenBoat"
                        name="isOpenBoat"
                        checked={formData.isOpenBoat}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label htmlFor="isOpenBoat" className="text-sm font-semibold text-gray-700">
                        Open Boat (no substantial superstructure or enclosure)
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="hasWheelhouse"
                        name="hasWheelhouse"
                        checked={formData.hasWheelhouse}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label htmlFor="hasWheelhouse" className="text-sm font-semibold text-gray-700">
                        Has Wheelhouse
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="hasAccommodation"
                        name="hasAccommodation"
                        checked={formData.hasAccommodation}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label htmlFor="hasAccommodation" className="text-sm font-semibold text-gray-700">
                        Has Accommodation Spaces
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="hasSleeping"
                        name="hasSleeping"
                        checked={formData.hasSleeping}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label htmlFor="hasSleeping" className="text-sm font-semibold text-gray-700">
                        Has Sleeping Berths
                      </label>
                    </div>
                  </div>
                </div>

                {/* Galley & Fire Risk */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Galley & Fire Risk</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="hasGalley"
                        name="hasGalley"
                        checked={formData.hasGalley}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label htmlFor="hasGalley" className="text-sm font-semibold text-gray-700">
                        Has Galley (Cooking Facilities)
                      </label>
                    </div>

                    {formData.hasGalley && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Galley Heat Source
                        </label>
                        <select
                          name="galleyHeatSource"
                          value={formData.galleyHeatSource}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        >
                          <option value="electric">Electric</option>
                          <option value="gas">Gas (LPG/CNG)</option>
                          <option value="liquid_fuel">Liquid Fuel (Diesel/Paraffin)</option>
                        </select>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="hasHeating"
                        name="hasHeating"
                        checked={formData.hasHeating}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label htmlFor="hasHeating" className="text-sm font-semibold text-gray-700">
                        Has Heating System
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="hasLithiumBattery"
                        name="hasLithiumBattery"
                        checked={formData.hasLithiumBattery}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label htmlFor="hasLithiumBattery" className="text-sm font-semibold text-gray-700">
                        Has Lithium Battery System
                      </label>
                    </div>
                  </div>
                </div>

                {/* Life Saving */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Life Saving Equipment</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Lifejacket Type
                      </label>
                      <select
                        name="lifejacketType"
                        value={formData.lifejacketType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        <option value="foam">Foam Lifejackets</option>
                        <option value="inflatable">Inflatable Lifejackets</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Water Temperature
                      </label>
                      <select
                        name="waterTemperature"
                        value={formData.waterTemperature}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        <option value="above_10c">Above 10°C (Most UK waters)</option>
                        <option value="at_or_below_10c">At or Below 10°C (Requires immersion suits)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center px-12 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Checking Requirements...' : 'Check Requirements →'}
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
