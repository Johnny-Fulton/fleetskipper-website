'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, BookOpenIcon } from 'lucide-react'
import type { RegulationReference } from '@/lib/wbc3-checker/references/wbc3-references'

interface ReferenceModalProps {
  isOpen: boolean
  onClose: () => void
  reference: RegulationReference | null
}

export function ReferenceModal({ isOpen, onClose, reference }: ReferenceModalProps) {
  if (!reference) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpenIcon className="text-white flex-shrink-0" size={24} strokeWidth={2} />
                      <div>
                        <Dialog.Title className="text-lg font-bold text-white">
                          {reference.title}
                        </Dialog.Title>
                        <p className="text-sm text-cyan-100 mt-0.5">
                          {reference.sourceDocument}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="ml-4 rounded-lg p-1.5 text-cyan-100 hover:bg-white/20 hover:text-white transition-colors flex-shrink-0"
                      aria-label="Close"
                    >
                      <X size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-800 leading-relaxed text-base">
                      {reference.fullText}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
