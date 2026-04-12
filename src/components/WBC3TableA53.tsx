'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface WBC3TableA53Props {
  highlightUniversal?: boolean // Highlight universal requirements (all crew)
  highlightConditional?: boolean // Highlight conditional training
}

export default function WBC3TableA53({ highlightUniversal, highlightConditional }: WBC3TableA53Props) {
  const [isExpanded, setIsExpanded] = useState(false)

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
            Hide WBC3 Table A5.3
          </>
        ) : (
          <>
            <ChevronDownIcon className="w-3 h-3" />
            View WBC3 Table A5.3 (Proof)
          </>
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-blue-900 uppercase mb-2">
                WBC3 Table A5.3 — Mandatory Training Courses Requirements
              </p>
            </div>

            {/* Mandatory Training Table */}
            <div className="bg-white rounded-lg p-4 border border-blue-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-3 font-bold text-gray-900">Training Course</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-900">Applies To</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-900">WBC3 Ref</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Universal Requirements */}
                  <tr className={highlightUniversal ? 'bg-green-50 border-2 border-green-500' : 'hover:bg-gray-50'}>
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-900">Sea Survival</p>
                      <p className="text-xs text-gray-700 mt-1">• STCW Route: MCA Personal Survival Techniques</p>
                      <p className="text-xs text-gray-700">• Non-STCW: RYA Basic Sea Survival</p>
                    </td>
                    <td className="py-3 px-3 text-gray-800">
                      <strong>All operators</strong>
                    </td>
                    <td className="py-3 px-3 text-gray-600">28.1.4</td>
                  </tr>

                  <tr className={highlightUniversal ? 'bg-green-50 border-2 border-green-500' : 'hover:bg-gray-50'}>
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-900">First Aid</p>
                      <p className="text-xs text-gray-700 mt-1">• Cat 2-6: Elementary First Aid Certificate, RYA First Aid, or SeaFish Basic First Aid</p>
                      <p className="text-xs text-gray-700">• Cat 0-1: Master holds Proficiency in Medical Care OR another crew has medical qualification</p>
                    </td>
                    <td className="py-3 px-3 text-gray-800">
                      <strong>Minimum one person on board</strong>
                    </td>
                    <td className="py-3 px-3 text-gray-600">28.1.4</td>
                  </tr>

                  <tr className={highlightUniversal ? 'bg-green-50 border-2 border-green-500' : 'hover:bg-gray-50'}>
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-900">Fire Fighting</p>
                      <p className="text-xs text-gray-700 mt-1">• Vessels &lt;15m: Minimum one crew member</p>
                      <p className="text-xs text-gray-700">• Vessels 15m+: ALL crew members</p>
                    </td>
                    <td className="py-3 px-3 text-gray-800">
                      <strong>Size dependent</strong>
                    </td>
                    <td className="py-3 px-3 text-gray-600">28.1.4</td>
                  </tr>

                  {/* Conditional Training */}
                  <tr className={highlightConditional ? 'bg-yellow-50 border-2 border-yellow-400' : 'hover:bg-gray-50'}>
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-900">Radar Training</p>
                      <p className="text-xs text-gray-700 mt-1">• MCA Small Ships Navigation & Radar: Radar and Meteorology</p>
                    </td>
                    <td className="py-3 px-3 text-gray-800">
                      All Masters and crew likely to use radar<br/>
                      <span className="text-xs text-gray-600 italic">(if radar fitted)</span>
                    </td>
                    <td className="py-3 px-3 text-gray-600">28.1.4</td>
                  </tr>

                  <tr className={highlightConditional ? 'bg-yellow-50 border-2 border-yellow-400' : 'hover:bg-gray-50'}>
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-900">Stability Training</p>
                      <p className="text-xs text-gray-700 mt-1">• MCA 1 day stability course</p>
                    </td>
                    <td className="py-3 px-3 text-gray-800">
                      Master (minimum)<br/>
                      <span className="text-xs text-gray-600 italic">(if stability booklet required)</span>
                    </td>
                    <td className="py-3 px-3 text-gray-600">28.1.4</td>
                  </tr>

                  <tr className={highlightConditional ? 'bg-yellow-50 border-2 border-yellow-400' : 'hover:bg-gray-50'}>
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-900">Electronic Charts</p>
                      <p className="text-xs text-gray-700 mt-1">• MCA Small Ships Navigation & Radar: Electronic Chart Systems</p>
                    </td>
                    <td className="py-3 px-3 text-gray-800">
                      All Masters and crew on navigational watch<br/>
                      <span className="text-xs text-gray-600 italic">(if charts fitted)</span>
                    </td>
                    <td className="py-3 px-3 text-gray-600">28.1.4</td>
                  </tr>

                  <tr className={highlightConditional ? 'bg-yellow-50 border-2 border-yellow-400' : 'hover:bg-gray-50'}>
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-900">Catering Training</p>
                      <p className="text-xs text-gray-700 mt-1">• Basic Food Hygiene or Food Safety Level 2</p>
                    </td>
                    <td className="py-3 px-3 text-gray-800">
                      All crew engaged in food preparation<br/>
                      <span className="text-xs text-gray-600 italic">(if applicable)</span>
                    </td>
                    <td className="py-3 px-3 text-gray-600">28.1.4</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Important WBC3 Quotes */}
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                <p className="text-xs font-bold text-blue-900 mb-2">WBC3 Section 28.1.4:</p>
                <p className="text-sm text-blue-800 italic">
                  "Anyone employed or engaged in <strong>any capacity onboard a vessel</strong> shall complete the required Administration-approved mandatory training courses listed in Table A5.3."
                </p>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                <p className="text-xs font-bold text-blue-900 mb-2">WBC3 Section 28.1.5:</p>
                <p className="text-sm text-blue-800 italic">
                  "Anyone employed or engaged in <strong>any capacity onboard a vessel</strong> shall hold a valid medical fitness certificate."
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded border border-gray-300">
              <p className="text-xs text-gray-700">
                <strong>WBC3 Source:</strong> UK Workboat Code Edition 3, Section 28.1.4 & Table A5.3 — Mandatory Training Courses
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
