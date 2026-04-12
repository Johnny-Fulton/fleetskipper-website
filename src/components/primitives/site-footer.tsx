'use client'

import Link from 'next/link'
import Image from 'next/image'
import { showCookieSettings } from '@/components/CookieConsent'

interface FooterSection {
  heading: string
  links: string[]
  urls?: string[]
}

interface SiteFooterProps {
  product: FooterSection
  company: FooterSection
  resources: FooterSection
  legal: FooterSection
  copyright: string
}

export function SiteFooter({ product, company, resources, legal, copyright }: SiteFooterProps) {
  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/safedeck-maritime/', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { name: 'Twitter', href: 'https://twitter.com/safedeckmaritime', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
  ]

  return (
    <footer className="bg-navy text-white" style={{ backgroundColor: '#121C27' }} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">

          {/* Brand Section - Full width on mobile, 4 columns on desktop */}
          <div className="lg:col-span-4 pb-8 lg:pb-0 border-b lg:border-b-0" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logos/safedeck-maritime-white.png"
                alt="SafeDeck Maritime"
                width={240}
                height={80}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-base font-medium mb-6" style={{ color: '#3BA5BC' }}>
              Maritime Safety Solutions
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <p className="text-sm" style={{ color: '#C4C4C4' }}>
                <span className="font-semibold text-white">Email:</span>{' '}
                <a href="mailto:info@fleetskipper.com" className="hover:text-sea-teal transition">
                  info@fleetskipper.com
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-sea-teal"
                  style={{ backgroundColor: '#353E47' }}
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid - 2x2 on mobile, horizontal on desktop */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-4">
            {/* Product Links */}
            <div className="lg:pl-8 lg:border-l" style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}>
              <h3 className="text-sm font-semibold leading-6 mb-4 lg:mb-6" style={{ color: '#0891B2' }}>
                {product.heading}
              </h3>
              <ul role="list" className="space-y-2 lg:space-y-3">
                {product.links.map((item, itemIdx) => (
                  <li key={item}>
                    <Link
                      href={product.urls?.[itemIdx] || `/${item.toLowerCase()}`}
                      className="text-sm leading-6 hover:text-white transition"
                      style={{ color: '#C4C4C4' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="lg:pl-8 lg:border-l" style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}>
              <h3 className="text-sm font-semibold leading-6 mb-4 lg:mb-6" style={{ color: '#0891B2' }}>
                {resources.heading}
              </h3>
              <ul role="list" className="space-y-2 lg:space-y-3">
                {resources.links.map((item, itemIdx) => (
                  <li key={item}>
                    <Link
                      href={resources.urls?.[itemIdx] || `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm leading-6 hover:text-white transition"
                      style={{ color: '#C4C4C4' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="lg:pl-8 lg:border-l" style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}>
              <h3 className="text-sm font-semibold leading-6 mb-4 lg:mb-6" style={{ color: '#0891B2' }}>
                {company.heading}
              </h3>
              <ul role="list" className="space-y-2 lg:space-y-3">
                {company.links.map((item, itemIdx) => (
                  <li key={item}>
                    <Link
                      href={company.urls?.[itemIdx] || `/${item.toLowerCase()}`}
                      className="text-sm leading-6 hover:text-white transition"
                      style={{ color: '#C4C4C4' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="lg:pl-8 lg:border-l" style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}>
              <h3 className="text-sm font-semibold leading-6 mb-4 lg:mb-6" style={{ color: '#0891B2' }}>
                {legal.heading}
              </h3>
              <ul role="list" className="space-y-2 lg:space-y-3">
                {legal.links.map((item, itemIdx) => (
                  <li key={item}>
                    <Link
                      href={legal.urls?.[itemIdx] || `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm leading-6 hover:text-white transition"
                      style={{ color: '#C4C4C4' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          {/* Copyright and Company Info */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                &copy; {new Date().getFullYear()} SafeDeck Maritime. All Rights Reserved.
              </p>
              <button
                onClick={showCookieSettings}
                className="text-xs hover:text-white transition underline"
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                aria-label="Manage cookie preferences"
              >
                Cookie Settings
              </button>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              UK Company
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
