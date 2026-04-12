'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { UserGroupIcon } from '@heroicons/react/24/outline'

export default function FVCrewCheckerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [vesselData, setVesselData] = useState({
    vesselName: '',
    registeredLength: '',
    lengthOverall: '',
    vesselStructure: 'decked',
    crewCount: '',
    distanceFromSafeHaven: '',
    engineConfiguration: 'inboard',
    engineBelowDeck: true,
    enginePowerKW: '',
    steeringType: 'hydraulic',
    lifejacketType: 'foam',
    operatingArea: 'near_coastal',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Convert to correct format for regulations engine
      const vesselInput = {
        vesselName: vesselData.vesselName || 'Unnamed Vessel',
        registeredLength: parseFloat(vesselData.registeredLength),
        lengthOverall: parseFloat(vesselData.lengthOverall),
        vesselStructure: vesselData.vesselStructure,
        crewCount: parseInt(vesselData.crewCount, 10),
        distanceFromSafeHaven: parseFloat(vesselData.distanceFromSafeHaven),
        engineConfiguration: vesselData.engineConfiguration,
        engineBelowDeck: vesselData.engineBelowDeck,
        enginePowerKW: parseFloat(vesselData.enginePowerKW),
        steeringType: vesselData.steeringType,
        lifejacketType: vesselData.lifejacketType,
        operatingArea: vesselData.operatingArea,
      }

      const response = await fetch('/api/fv-crew-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vesselInput),
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.errors?.[0]?.message || 'Failed to check crew requirements')
        setLoading(false)
        return
      }

      // Store in localStorage and navigate
      localStorage.setItem('fv-crew-check-results', JSON.stringify(result.data))
      router.push('/tools/fv-crew-checker/results')
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to check crew requirements. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Navigation />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative mt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16 pb-16 md:pt-20 md:pb-20">
          <div className="absolute inset-0 bg-[url('/images/hero-workboat.jpg')] opacity-5 bg-cover bg-center" />

          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <UserGroupIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold text-sm">Fishing Vessel Crew Tool</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white leading-tight">
                Crew Requirements Checker
              </h1>

              <p className="text-xl text-white/80 mb-4 leading-relaxed">
                Find out what certificates and training your crew need for MSN 1871/1872/1873 (F) compliance.
              </p>

              <p className="text-sm text-white/60">
                Covers all crew requirements: mandatory training, medical fitness, qualifications by rank.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Vessel Info */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Vessel Information</h2>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="vesselName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Vessel Name (optional)
                      </label>
                      <input
                        type="text"
                        id="vesselName"
                        value={vesselData.vesselName}
                        onChange={(e) => setVesselData({ ...vesselData, vesselName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                        placeholder="e.g., FV Example"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="lengthOverall" className="block text-sm font-semibold text-gray-700 mb-2">
                          Length Overall (LOA) *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="lengthOverall"
                            step="0.01"
                            required
                            value={vesselData.lengthOverall}
                            onChange={(e) => setVesselData({ ...vesselData, lengthOverall: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                            placeholder="e.g., 14.5"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">m</span>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="registeredLength" className="block text-sm font-semibold text-gray-700 mb-2">
                          Registered Length (RL) *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="registeredLength"
                            step="0.01"
                            required
                            value={vesselData.registeredLength}
                            onChange={(e) => setVesselData({ ...vesselData, registeredLength: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                            placeholder="e.g., 13.2"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">m</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">
                      These determine which MSN regulation applies (1871: LOA &lt;15m, 1872: RL 15-24m, 1873: RL ≥24m)
                    </p>
                  </div>
                </div>

                {/* Crew & Operations */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Crew &amp; Operations</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="crewCount" className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Crew *
                      </label>
                      <input
                        type="number"
                        id="crewCount"
                        min="1"
                        required
                        value={vesselData.crewCount}
                        onChange={(e) => setVesselData({ ...vesselData, crewCount: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                        placeholder="e.g., 3"
                      />
                    </div>

                    <div>
                      <label htmlFor="distanceFromSafeHaven" className="block text-sm font-semibold text-gray-700 mb-2">
                        Max Distance from Safe Haven *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="distanceFromSafeHaven"
                          step="0.1"
                          required
                          value={vesselData.distanceFromSafeHaven}
                          onChange={(e) => setVesselData({ ...vesselData, distanceFromSafeHaven: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                          placeholder="e.g., 20"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">nm</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="operatingArea" className="block text-sm font-semibold text-gray-700 mb-2">
                      Operating Area *
                    </label>
                    <select
                      id="operatingArea"
                      required
                      value={vesselData.operatingArea}
                      onChange={(e) => setVesselData({ ...vesselData, operatingArea: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                    >
                      <option value="near_coastal">Near Coastal</option>
                      <option value="coastal">Coastal</option>
                      <option value="offshore">Offshore</option>
                    </select>
                  </div>
                </div>

                {/* Vessel Construction */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Vessel Construction</h2>

                  <div>
                    <label htmlFor="vesselStructure" className="block text-sm font-semibold text-gray-700 mb-2">
                      Vessel Structure *
                    </label>
                    <select
                      id="vesselStructure"
                      required
                      value={vesselData.vesselStructure}
                      onChange={(e) => setVesselData({ ...vesselData, vesselStructure: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                    >
                      <option value="decked">Decked</option>
                      <option value="open">Open</option>
                    </select>
                  </div>
                </div>

                {/* Engine & Machinery */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Engine &amp; Machinery</h2>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="enginePowerKW" className="block text-sm font-semibold text-gray-700 mb-2">
                        Total Engine Power *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="enginePowerKW"
                          step="0.1"
                          required
                          value={vesselData.enginePowerKW}
                          onChange={(e) => setVesselData({ ...vesselData, enginePowerKW: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                          placeholder="e.g., 250"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">kW</span>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="engineConfiguration" className="block text-sm font-semibold text-gray-700 mb-2">
                        Engine Configuration *
                      </label>
                      <select
                        id="engineConfiguration"
                        required
                        value={vesselData.engineConfiguration}
                        onChange={(e) => setVesselData({ ...vesselData, engineConfiguration: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                      >
                        <option value="inboard">Inboard</option>
                        <option value="outboard">Outboard</option>
                        <option value="none">No Engine / Unpowered</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Engine Below Deck? *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="engineBelowDeck"
                            value="yes"
                            checked={vesselData.engineBelowDeck === true}
                            onChange={() => setVesselData({ ...vesselData, engineBelowDeck: true })}
                            className="w-5 h-5 text-cyan-500 focus:ring-cyan-500"
                          />
                          <span className="text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="engineBelowDeck"
                            value="no"
                            checked={vesselData.engineBelowDeck === false}
                            onChange={() => setVesselData({ ...vesselData, engineBelowDeck: false })}
                            className="w-5 h-5 text-cyan-500 focus:ring-cyan-500"
                          />
                          <span className="text-gray-700">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Safety Equipment */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety Equipment</h2>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="steeringType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Steering System *
                      </label>
                      <select
                        id="steeringType"
                        required
                        value={vesselData.steeringType}
                        onChange={(e) => setVesselData({ ...vesselData, steeringType: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                      >
                        <option value="tiller">Tiller</option>
                        <option value="motorised">Motorised</option>
                        <option value="hydraulic">Hydraulic</option>
                        <option value="electrical">Electrical</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="lifejacketType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Primary Lifejacket Type *
                      </label>
                      <select
                        id="lifejacketType"
                        required
                        value={vesselData.lifejacketType}
                        onChange={(e) => setVesselData({ ...vesselData, lifejacketType: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                      >
                        <option value="foam">Foam</option>
                        <option value="inflatable">Inflatable</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <p className="text-red-800 font-semibold">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
