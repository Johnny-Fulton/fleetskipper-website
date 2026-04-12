'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface WBC3TableA51Props {
  category?: string // Highlight specific category (e.g., 'cat3')
  showMasterOnly?: boolean // Only show master qualifications section
  showAdditionalCrewOnly?: boolean // Only show additional crew section
}

export default function WBC3TableA51({ category, showMasterOnly, showAdditionalCrewOnly }: WBC3TableA51Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Determine which sections to show
  const showMaster = !showAdditionalCrewOnly
  const showAdditionalCrew = !showMasterOnly

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
      >
        <span className="text-base">📋</span>
        {isExpanded ? (
          <>
            <ChevronUpIcon className="w-3 h-3" />
            Hide WBC3 Table A5.1
          </>
        ) : (
          <>
            <ChevronDownIcon className="w-3 h-3" />
            View WBC3 Table A5.1 (Proof)
          </>
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-blue-900 uppercase mb-2">
                WBC3 Table A5.1 — Master Qualifications & Deck Manning Requirements
              </p>
            </div>

            {/* Master Qualifications Section */}
            {showMaster && (
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Master Qualifications by Area Category</h4>
                <div className="space-y-3 text-sm">
                  <div className={`p-3 rounded ${category === 'cat0' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-50'}`}>
                    <p className="font-bold text-gray-900 mb-1">Category 0 — Unrestricted</p>
                    <ul className="text-gray-700 space-y-1 ml-4 list-disc">
                      <li>Boatmaster T0</li>
                      <li>MCA/RYA Yachtmaster Ocean</li>
                      <li>STCW Master &lt;3000GT</li>
                      <li>STCW OOW &lt;3000GT Unlimited</li>
                    </ul>
                  </div>

                  <div className={`p-3 rounded ${category === 'cat1' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-50'}`}>
                    <p className="font-bold text-gray-900 mb-1">Category 1 — Up to 150nm</p>
                    <ul className="text-gray-700 space-y-1 ml-4 list-disc">
                      <li>Boatmaster T1</li>
                      <li>MCA/RYA Yachtmaster Offshore</li>
                      <li>Higher levels accepted</li>
                    </ul>
                  </div>

                  <div className={`p-3 rounded ${category === 'cat2' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-50'}`}>
                    <p className="font-bold text-gray-900 mb-1">Category 2 — Up to 60nm</p>
                    <ul className="text-gray-700 space-y-1 ml-4 list-disc">
                      <li>Boatmaster T2</li>
                      <li>MCA/RYA Yachtmaster Coastal</li>
                      <li>Higher levels accepted</li>
                    </ul>
                  </div>

                  <div className={`p-3 rounded ${category === 'cat3' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-50'}`}>
                    <p className="font-bold text-gray-900 mb-1">Category 3 — Up to 20nm</p>
                    <ul className="text-gray-700 space-y-1 ml-4 list-disc">
                      <li>Boatmaster T3</li>
                      <li>MCA/RYA Yachtmaster Coastal</li>
                      <li>Higher levels accepted</li>
                    </ul>
                  </div>

                  <div className={`p-3 rounded ${category === 'cat4' || category === 'cat5' || category === 'cat6' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-50'}`}>
                    <p className="font-bold text-gray-900 mb-1">Category 4, 5, 6 — Limited Operations</p>
                    <ul className="text-gray-700 space-y-1 ml-4 list-disc">
                      <li>Boatmaster T4</li>
                      <li>RYA Powerboat Level 2</li>
                      <li>RYA Day Skipper</li>
                      <li>Higher levels accepted</li>
                    </ul>
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r">
                    <p className="text-xs font-bold text-amber-900 mb-1">Note 1:</p>
                    <p className="text-xs text-amber-800">
                      Higher-level certificates are valid at lower categories (e.g., Boatmaster T2 is valid for T3 operations).
                    </p>
                  </div>

                  <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                    <p className="text-xs font-bold text-blue-900 mb-1">Note 2:</p>
                    <p className="text-xs text-blue-800">
                      See WBC3 Appendix 5 for full details and alternative qualifications.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Manning Section */}
            {showAdditionalCrew && (
              <div className="bg-white rounded-lg p-4 border border-blue-200 mt-4">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Additional Manning Requirements (Second Person)</h4>
                <div className="space-y-3 text-sm">
                  <div className={`p-3 rounded ${category === 'cat0' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-50'}`}>
                    <p className="font-bold text-gray-900 mb-1">Category 0</p>
                    <p className="text-gray-700">Another person holding at least Yachtmaster Offshore or STCW OOW</p>
                  </div>

                  <div className={`p-3 rounded ${category === 'cat1' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-50'}`}>
                    <p className="font-bold text-gray-900 mb-1">Category 1</p>
                    <p className="text-gray-700">Second person holding at least RYA/MCA Yachtmaster Coastal</p>
                  </div>

                  <div className={`p-3 rounded ${category === 'cat2' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-50'}`}>
                    <p className="font-bold text-gray-900 mb-1">Category 2</p>
                    <p className="text-gray-700">Second person deemed competent by master</p>
                  </div>

                  <div className={`p-3 rounded ${category === 'cat3' || category === 'cat4' || category === 'cat5' || category === 'cat6' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-50'}`}>
                    <p className="font-bold text-gray-900 mb-1">Category 3, 4, 5, 6</p>
                    <p className="text-gray-700">Second person that vessel owner/operator considers experienced and competent</p>
                    <p className="text-xs text-gray-600 mt-1 italic">No certificate required</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 p-3 bg-gray-100 rounded border border-gray-300">
              <p className="text-xs text-gray-700">
                <strong>WBC3 Source:</strong> UK Workboat Code Edition 3, Appendix 5, Table A5.1 — Master and Deck Manning Requirements
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
