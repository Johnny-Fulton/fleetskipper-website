'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

export default function WBC3TableA52() {
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
            Hide WBC3 Table A5.2
          </>
        ) : (
          <>
            <ChevronDownIcon className="w-3 h-3" />
            View WBC3 Table A5.2 (Proof)
          </>
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-blue-900 uppercase mb-2">
                WBC3 Table A5.2 — Minimum Engineering Manning Requirements
              </p>
            </div>

            {/* Engineering Requirements Table */}
            <div className="bg-white rounded-lg p-4 border border-blue-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-3 font-bold text-gray-900">Engineering Qualification</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-900">Area Categories</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-900">Power/Vessel Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-800">
                      Approved Engine Course (Part 1)<br/>
                      <span className="text-xs text-gray-600">OR demonstrated competency</span>
                    </td>
                    <td className="py-3 px-3 text-gray-800">2, 1, 0</td>
                    <td className="py-3 px-3 text-gray-800">Power Vessel SL</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-800">
                      MEOL or STCW III/4 Engine Ratings<br/>
                      <span className="text-xs text-gray-600">or AEC (Part 1&2)</span>
                    </td>
                    <td className="py-3 px-3 text-gray-800">2, 1, 0</td>
                    <td className="py-3 px-3 text-gray-800">
                      Power Vessel W<br/>
                      &lt;1500 kW
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-800">
                      SMEOL, STCW C/Eng (Y4)
                    </td>
                    <td className="py-3 px-3 text-gray-800">2, 1, 0</td>
                    <td className="py-3 px-3 text-gray-800">
                      Power Vessel W<br/>
                      ≥1500 kW &lt; 3000 kW
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-800">
                      Small Vessel Second Engineer CoC
                    </td>
                    <td className="py-3 px-3 text-gray-800">2, 1, 0</td>
                    <td className="py-3 px-3 text-gray-800">
                      Power Vessel W<br/>
                      ≥1500 kW &lt; 3000 kW
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-800">
                      STCW III/2 Small Vessel<br/>
                      Chief Engineer &lt;9000KW &lt;3000GT
                    </td>
                    <td className="py-3 px-3 text-gray-800">0</td>
                    <td className="py-3 px-3 text-gray-800">&lt;3000GT</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Important Notes */}
            <div className="space-y-3">
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r">
                <p className="text-xs font-bold text-amber-900 mb-2">⚠️ Note 2 (DUAL ROLE):</p>
                <p className="text-sm text-amber-800 mb-2">
                  <strong>"The person holding the engineering requirement may be a crew member listed in Table A7.1."</strong>
                </p>
                <p className="text-xs text-amber-800 italic">
                  Translation: Engineering can be the same person as Master or Second Person!
                </p>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                <p className="text-xs font-bold text-blue-900 mb-2">Note 3 (EXPERIENCE EXEMPTION):</p>
                <p className="text-sm text-blue-800">
                  Persons who can demonstrate appropriate engineering experience and competency to MCA satisfaction may be granted exemption from Approved Engine Course.
                </p>
              </div>

              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r">
                <p className="text-xs font-bold text-green-900 mb-2">Note 5 (FAMILIARITY):</p>
                <p className="text-sm text-green-800">
                  In all cases, one of the crew shall be sufficiently familiar with the operation and maintenance of the vessel's machinery to ensure safe passage.
                </p>
              </div>

              <div className="p-4 bg-gray-100 rounded border border-gray-300">
                <p className="text-xs font-bold text-gray-900 mb-2">Vessel Type Definitions:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li><strong>Note 6 (Power Vessel W):</strong> Power Vessel employed in towing operations, lifting operations, or carriage of cargo greater than 1000 kg.</li>
                  <li><strong>Note 7 (Power Vessel SL):</strong> Power Vessel other than Power Vessel W (standard operations).</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded border border-gray-300">
              <p className="text-xs text-gray-700">
                <strong>WBC3 Source:</strong> UK Workboat Code Edition 3, Appendix 5, Table A5.2 — Engineering Manning Requirements
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
