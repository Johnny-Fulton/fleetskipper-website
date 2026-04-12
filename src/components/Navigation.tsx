'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Menu as MenuIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Consultancy', href: '/services' },
  { name: 'Tools', href: '/tools' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm shadow-sm'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">FleetSkipper</span>
            <Image
              src="/logos/Logo_FleetSkipper_Main.png"
              alt="FleetSkipper"
              width={320}
              height={97}
              className="h-16 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-teal transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact#book-consultation"
            className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-dark transition-colors"
          >
            Book Consultation
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-navy-dark px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10 transform transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">FleetSkipper</span>
              <Image
                src="/logos/Logo_FleetSkipper_White.png"
                alt="FleetSkipper"
                width={240}
                height={72}
                className="h-11 w-auto"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/contact#book-consultation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-full bg-orange px-6 py-3 text-center text-base font-semibold text-white shadow-lg hover:bg-orange-dark transition-all duration-200"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
