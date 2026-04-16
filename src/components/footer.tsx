import Link from 'next/link'
import Image from 'next/image'
import { Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const services = {
    heading: 'Services',
    links: ['SMS Consultancy', 'SMS Audits', 'FleetSkipper App', 'WBC3 Support'],
    urls: ['/services#consultancy', '/services#audits', '/services#app', '/services'],
  }

  const company = {
    heading: 'Company',
    links: ['About', 'Contact', 'Book Consultation'],
    urls: ['/about', '/contact', '/contact#book-consultation'],
  }

  const legal = {
    heading: 'Legal',
    links: ['Privacy Policy', 'Terms of Service'],
    urls: ['/privacy', '/terms'],
  }

  return (
    <footer className="bg-slate-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
          <div className="lg:col-span-5 pb-8 lg:pb-0 border-b lg:border-b-0 border-white/10">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logos/Logo_FleetSkipper_White.png"
                alt="FleetSkipper"
                width={240}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-base font-medium mb-6 text-cyan-400">
              WBC3 Compliance Made Simple
            </p>
            <p className="text-sm text-gray-300 mb-6 max-w-md">
              Expert SMS documentation and digital tools for workboat operators. Built by a Master Mariner who understands your operations.
            </p>
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Email:</span>{' '}
                <a href="mailto:info@fleetskipper.com" className="hover:text-cyan-400 transition">
                  info@fleetskipper.com
                </a>
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/fleetskipper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 hover:bg-cyan-500 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-6">
            <div className="lg:pl-8 lg:border-l border-white/10">
              <h3 className="text-sm font-semibold leading-6 mb-4 lg:mb-6 text-cyan-400">
                {services.heading}
              </h3>
              <ul role="list" className="space-y-2 lg:space-y-3">
                {services.links.map((item, itemIdx) => (
                  <li key={item}>
                    <Link
                      href={services.urls?.[itemIdx] || ''}
                      className="text-sm leading-6 text-gray-300 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pl-8 lg:border-l border-white/10">
              <h3 className="text-sm font-semibold leading-6 mb-4 lg:mb-6 text-cyan-400">
                {company.heading}
              </h3>
              <ul role="list" className="space-y-2 lg:space-y-3">
                {company.links.map((item, itemIdx) => (
                  <li key={item}>
                    <Link
                      href={company.urls?.[itemIdx] || ''}
                      className="text-sm leading-6 text-gray-300 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pl-8 lg:border-l border-white/10 col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold leading-6 mb-4 lg:mb-6 text-cyan-400">
                {legal.heading}
              </h3>
              <ul role="list" className="space-y-2 lg:space-y-3">
                {legal.links.map((item, itemIdx) => (
                  <li key={item}>
                    <Link
                      href={legal.urls?.[itemIdx] || ''}
                      className="text-sm leading-6 text-gray-300 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p className="text-xs text-gray-400">
                &copy; {currentYear} FleetSkipper. All rights reserved.
              </p>
            </div>
            <p className="text-xs text-gray-400">
              Based in Northern Ireland, serving UK operators
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
