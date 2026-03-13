import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">FleetSkipper</h3>
            <p className="text-gray-300 mb-4">
              WBC3 Compliance Made Simple for Workboat Operators
            </p>
            <p className="text-sm text-gray-400">
              Based in Northern Ireland, serving UK operators
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Mail size={18} className="text-cyan-400" />
                <a href="mailto:jonathan@fleetskipper.com" className="hover:text-cyan-400 transition-colors">
                  jonathan@fleetskipper.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Phone size={18} className="text-cyan-400" />
                <a href="tel:+447446858414" className="hover:text-cyan-400 transition-colors">
                  +44 7446 858414
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} FleetSkipper Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
