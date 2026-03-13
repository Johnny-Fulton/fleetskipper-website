'use client'

import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
]

const solutions = [
  { name: 'Ports & Harbours', href: '/solutions/pilot-organizations', description: 'Digital solutions for harbour authorities and pilots' },
  { name: 'UK Workboats', href: '/solutions/workboats', description: 'Compliance software for UK workboat operators' },
  { name: 'Small Merchant Vessels', href: '/solutions/merchant-vessels', description: 'ISM Code solutions for small merchant ships' },
]

const products = [
  { name: 'SafeDeckOS | Pilot', href: '/products/empx', description: 'Digital pilot exchange systems' },
  { name: 'SafeDeckOS Suite', href: '/products/sms-suite', description: 'Complete SMS platform from deck to office' },
  { name: 'Consultancy', href: '/consultancy', description: 'WBC3 & ISM Code compliance guidance' },
]

export default function NavbarLight() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">SeaReady</span>
            <Image
              src="/logos/safedeck-maritime.png"
              alt="SafeDeck Maritime"
              width={240}
              height={72}
              className="h-14 w-auto"
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-700 hover:text-gray-900 transition-colors focus:outline-none">
              Industries
              <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute -left-8 top-full z-10 mt-3 w-56 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="py-2">
                  {solutions.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors ${
                            active ? 'bg-gray-100' : ''
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-700 hover:text-gray-900 transition-colors focus:outline-none">
              Products
              <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute -left-8 top-full z-10 mt-3 w-56 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="py-2">
                  {products.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors ${
                            active ? 'bg-gray-100' : ''
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Link
            href="/about"
            className="text-sm font-semibold leading-6 text-gray-700 hover:text-gray-900 transition-colors"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-semibold leading-6 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-orange/90 transition-colors"
            style={{ backgroundColor: '#c65d00' }}
          >
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">SeaReady</span>
                  <Image
                    src="/logos/safedeck-maritime.png"
                    alt="SafeDeck Maritime"
                    width={240}
                    height={72}
                    className="h-12 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Link
                      href="/"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>

                    <div className="py-2">
                      <p className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wide">Industries</p>
                      <div className="mt-2 space-y-2">
                        {solutions.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="py-2">
                      <p className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wide">Products</p>
                      <div className="mt-2 space-y-2">
                        {products.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/about"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About
                    </Link>

                    <Link
                      href="/contact"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>
                  <div className="py-6">
                    <Link
                      href="/contact"
                      className="block rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-orange/90"
                      style={{ backgroundColor: '#c65d00' }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </header>
  )
}