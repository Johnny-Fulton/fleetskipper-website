import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { FileText, Search, HeadphonesIcon, CheckCircle, Phone, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - FleetSkipper | WBC3 SMS Consultancy',
  description: 'Professional WBC3 SMS documentation, audits, and ongoing support for UK workboat operators. Expert guidance from an active Master Mariner.',
};

export default function ServicesPage() {
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="relative mt-28 min-h-[400px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              SMS Consultancy Services
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Professional WBC3 compliance services tailored to your workboat operations
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">

            {/* Service 1: SMS Documentation Builds */}
            <div id="consultancy" className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-cyan-100 w-16 h-16 rounded-xl flex items-center justify-center">
                      <FileText className="text-cyan-600" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">SMS Documentation Builds</h2>
                  </div>

                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Complete Safety Management System documentation tailored to your vessel operations.
                    WBC3-compliant, MCA-ready, and built for real-world use.
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mb-4">What&apos;s Included:</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Complete MGN 280 (M) compliant documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Vessel-specific risk assessments and procedures</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Operational checklists and logbook templates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Emergency response plans and drills</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Document control and record-keeping systems</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Regular updates on progress</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Training on how to implement and maintain your SMS</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <h3 className="font-bold text-slate-900 mb-4">Who It&apos;s For:</h3>
                    <ul className="space-y-2 mb-6 text-slate-600">
                      <li>• New workboat operations</li>
                      <li>• Vessels without existing SMS</li>
                      <li>• Operators expanding their fleet</li>
                      <li>• Operations changing classification</li>
                    </ul>

                    <div className="bg-cyan-50 rounded-lg p-4 mb-6 border border-cyan-100">
                      <p className="text-sm font-semibold text-slate-900 mb-2">Pricing:</p>
                      <p className="text-slate-600 text-sm">Contact us for a customized quote based on your vessel type and operations</p>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/contact"
                        className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-center"
                      >
                        Get Quote
                      </Link>
                      <Link
                        href="/contact#book-consultation"
                        className="block w-full bg-white hover:bg-gray-50 text-slate-900 border-2 border-slate-900 px-6 py-3 rounded-lg font-semibold transition-all text-center"
                      >
                        Book Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2: SMS Audits & Gap Analysis */}
            <div id="audits" className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-cyan-100 w-16 h-16 rounded-xl flex items-center justify-center">
                      <Search className="text-cyan-600" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">SMS Audits & Gap Analysis</h2>
                  </div>

                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Comprehensive review of your existing SMS to identify gaps and ensure MCA inspection readiness.
                    Get expert feedback on what&apos;s working and what needs improvement.
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mb-4">What&apos;s Included:</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Full review of existing SMS documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Gap analysis against MGN 280 requirements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Detailed report with prioritized recommendations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">MCA inspection preparation guidance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Practical advice on implementation improvements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Follow-up call to discuss findings</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <h3 className="font-bold text-slate-900 mb-4">Who It&apos;s For:</h3>
                    <ul className="space-y-2 mb-6 text-slate-600">
                      <li>• Existing SMS needing review</li>
                      <li>• Pre-inspection preparation</li>
                      <li>• Post-incident compliance check</li>
                      <li>• Annual SMS verification</li>
                    </ul>

                    <div className="bg-cyan-50 rounded-lg p-4 mb-6 border border-cyan-100">
                      <p className="text-sm font-semibold text-slate-900 mb-2">Pricing:</p>
                      <p className="text-slate-600 text-sm">Contact us for a customized quote</p>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/contact"
                        className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-center"
                      >
                        Get Quote
                      </Link>
                      <Link
                        href="/contact#book-consultation"
                        className="block w-full bg-white hover:bg-gray-50 text-slate-900 border-2 border-slate-900 px-6 py-3 rounded-lg font-semibold transition-all text-center"
                      >
                        Book Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3: Ongoing SMS Support */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-cyan-100 w-16 h-16 rounded-xl flex items-center justify-center">
                      <HeadphonesIcon className="text-cyan-600" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Ongoing SMS Support</h2>
                  </div>

                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Continuous support to keep your SMS current and compliant. Regular updates, advice,
                    and expert guidance whenever you need it.
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mb-4">What&apos;s Included:</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">SMS updates for regulation changes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Phone and email support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Document template updates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Guidance on operational changes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Annual compliance review</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={22} className="text-cyan-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">Priority response times</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <h3 className="font-bold text-slate-900 mb-4">Who It&apos;s For:</h3>
                    <ul className="space-y-2 mb-6 text-slate-600">
                      <li>• Operators wanting peace of mind</li>
                      <li>• Small teams without dedicated safety staff</li>
                      <li>• Growing operations</li>
                      <li>• Ongoing compliance assurance</li>
                    </ul>

                    <div className="bg-cyan-50 rounded-lg p-4 mb-6 border border-cyan-100">
                      <p className="text-sm font-semibold text-slate-900 mb-2">Pricing:</p>
                      <p className="text-slate-600 text-sm">Contact us for monthly or annual retainer options</p>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/contact"
                        className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-center"
                      >
                        Get Quote
                      </Link>
                      <Link
                        href="/contact#book-consultation"
                        className="block w-full bg-white hover:bg-gray-50 text-slate-900 border-2 border-slate-900 px-6 py-3 rounded-lg font-semibold transition-all text-center"
                      >
                        Book Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Book a free 15-minute consultation to discuss which service is right for your operation
            </p>

            <Link
              href="/contact#book-consultation"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mb-12"
            >
              Book Free Consultation
            </Link>

            <div className="border-t border-white/20 pt-10">
              <p className="text-white/80 mb-6 font-medium">Or contact directly:</p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <a href="mailto:info@fleetskipper.com" className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors group">
                  <div className="bg-white/10 group-hover:bg-white/20 p-3 rounded-lg transition-colors">
                    <Mail size={24} />
                  </div>
                  <span className="font-medium">info@fleetskipper.com</span>
                </a>
                <a href="tel:+447446858414" className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors group">
                  <div className="bg-white/10 group-hover:bg-white/20 p-3 rounded-lg transition-colors">
                    <Phone size={24} />
                  </div>
                  <span className="font-medium">+44 7446 858414</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
