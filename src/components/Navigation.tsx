'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-navy hover:text-navy-light transition-colors">
            FleetSkipper
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-body-text hover:text-navy transition-colors font-medium">
              Services
            </Link>
            <Link href="/about" className="text-body-text hover:text-navy transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-body-text hover:text-navy transition-colors font-medium">
              Contact
            </Link>
            <Link
              href="/contact#book-consultation"
              className="bg-orange hover:bg-orange-dark text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-navy"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/services"
                className="text-body-text hover:text-navy transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-body-text hover:text-navy transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-body-text hover:text-navy transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/contact#book-consultation"
                className="bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
