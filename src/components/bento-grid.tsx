import { CloudArrowUpIcon, SignalSlashIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Check, AlertCircle } from 'lucide-react'

export default function BentoGrid() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-sea-teal">A DAY AT SEA</h2>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Your complete workflow, anywhere
        </p>
        
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Left tall card - Morning checks on mobile */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-ink max-lg:text-center">
                  Start your day
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  5am: Review tasks and safety checks before leaving port. Everything you need in your pocket.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <div className="bg-white h-full">
                    <div className="bg-navy p-4 text-white text-center text-xs font-semibold">
                      SeaReady
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Today&apos;s Tasks</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                          <CheckCircleIcon className="h-5 w-5 text-green-600" />
                          <span className="text-sm">Safety equipment check</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                          <div className="h-5 w-5 rounded-full border-2 border-yellow-600"></div>
                          <span className="text-sm">Fire drill - 10:00</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <div className="h-5 w-5 rounded-full border-2 border-gray-400"></div>
                          <span className="text-sm">Engine room inspection</span>
                        </div>
                      </div>
                      <div className="mt-4 text-xs text-gray-500">
                        Last sync: 2 minutes ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>

          {/* Top right - Tablet on deck */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-ink max-lg:text-center">
                  Work anywhere
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Log drills, defects, and maintenance instantly - even on deck in rough weather.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                <div className="relative">
                  <div className="bg-gray-800 rounded-lg p-2 shadow-xl">
                    <div className="bg-white rounded p-3">
                      <div className="text-xs font-semibold text-gray-600 mb-2">FIRE DRILL LOG</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">10:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">12 mins</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Crew:</span>
                          <span className="font-medium">All present</span>
                        </div>
                      </div>
                      <button className="mt-3 w-full bg-sea-teal text-white rounded py-2 text-xs font-medium">
                        Save & Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>

          {/* Middle right - Offline mode */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-ink max-lg:text-center">
                  No signal? No problem
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Everything works at sea. Data syncs automatically when you&apos;re back in range.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    <SignalSlashIcon className="h-8 w-8 text-gray-400" />
                    <CheckCircleIcon className="h-10 w-10 text-green-500" />
                  </div>
                  <div className="mt-3 text-xs text-gray-500">Offline mode active</div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
          </div>

          {/* Right tall - Desktop dashboard */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-ink max-lg:text-center">
                  Complete picture
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Back in port: Review reports, plan maintenance, and prepare for inspections.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow">
                <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                  <div className="bg-white h-full">
                    <div className="bg-navy p-3 text-white">
                      <div className="text-xs">SeaReady Dashboard</div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 p-3 rounded">
                          <div className="text-2xl font-bold text-green-600">98%</div>
                          <div className="text-xs text-gray-600">Compliance</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="text-2xl font-bold text-blue-600">12</div>
                          <div className="text-xs text-gray-600">Tasks today</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-gray-600">Recent Activity</div>
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600">Fire drill completed</span>
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600">Defect logged - Engine room</span>
                            <AlertCircle className="h-3 w-3 text-yellow-600" />
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600">Weekly report generated</span>
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <CloudArrowUpIcon className="h-4 w-4" />
                        <span>All data synced</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}