'use client'

import { useState } from 'react'
import { Dialog, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

const solutions = [
  { name: 'Ports & Harbours', href: '/solutions/pilot-organizations' },
  { name: 'Workboats', href: '/solutions/workboats' },
  { name: 'Merchant Vessels', href: '/solutions/merchant-vessels' },
]

const products = [
  { name: 'SeaReady eMPX', href: '/products/master-pilot-exchange' },
  { name: 'SMS Portal', href: '/products/sms-portal' },
  { name: 'SMS Pro App', href: '/products/sms-pro-app' },
  { name: 'Custom Solutions', href: '/products/custom-solutions' },
]

const navigation = [
  { name: 'Home', href: '/', hasDropdown: false },
  { name: 'Industries', href: '#', hasDropdown: true, dropdownItems: 'solutions' },
  { name: 'Products', href: '#', hasDropdown: true, dropdownItems: 'products' },
  { name: 'About', href: '/about', hasDropdown: false },
  { name: 'Contact', href: '/contact', hasDropdown: false },
]

export default function NavbarSolid() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[#1e3a5f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">SeaReady</span>
            <Image
              src="/logos/safedeck-maritime-white.png"
              alt="SafeDeck Maritime"
              width={240}
              height={72}
              className="h-14 w-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white/70"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            item.hasDropdown ? (
              <Menu as="div" key={item.name} className="relative">
                <Menu.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white/90 hover:text-white transition-colors">
                  {item.name}
                  <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
                </Menu.Button>
                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  {(item.dropdownItems === 'solutions' ? solutions : products).map((dropdownItem) => (
                    <Menu.Item key={dropdownItem.name}>
                      {({ active }) => (
                        <Link
                          href={dropdownItem.href}
                          className={`block px-4 py-2 text-sm ${
                            active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          {dropdownItem.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white/90 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
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
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-navy px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">SeaReady</span>
              <Image
                src="/logos/safedeck-maritime-white.png"
                alt="SafeDeck Maritime"
                width={200}
                height={60}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  item.hasDropdown ? (
                    <div key={item.name} className="space-y-1">
                      <div className="-mx-3 px-3 py-2 text-base font-semibold leading-7 text-white/60">
                        {item.name}
                      </div>
                      {(item.dropdownItems === 'solutions' ? solutions : products).map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="-mx-3 block rounded-lg px-6 py-2 text-sm leading-7 text-white hover:bg-white/10"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/10"
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-white/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
