import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { FileText, Search, HeadphonesIcon, CheckCircle, Phone, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - FleetSkipper',
  description: 'WBC3 SMS documentation, audits, and ongoing support for UK workboat operators',
};

export default function ServicesPage() {
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              SMS Consultancy Services
            </h1>
            <p className="text-xl text-white/90">
              Professional WBC3 compliance services tailored to your workboat operations
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">

            {/* Service 1: SMS Documentation Builds */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-card">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-teal/10 w-16 h-16 rounded-xl flex items-center justify-center">
                      <FileText className="text-teal" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-navy">SMS Documentation Builds</h2>
                  </div>

                  <p className="text-lg text-body-text mb-6">
                    Complete Safety Management System documentation tailored to your vessel operations. 
                    WBC3-compliant, MCA-ready, and built for real-world use.
                  </p>

                  <h3 className="text-xl font-bold text-navy mb-4">What's Included:</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Complete MGN 280 (M) compliant documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Vessel-specific risk assessments and procedures</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Operational checklists and logbook templates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Emergency response plans and drills</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Document control and record-keeping systems</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Regular updates on progress</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Training on how to implement and maintain your SMS</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-bold text-navy mb-4">Who It's For:</h3>
                    <ul className="space-y-2 mb-6 text-body-text">
                      <li>• New workboat operations</li>
                      <li>• Vessels without existing SMS</li>
                      <li>• Operators expanding their fleet</li>
                      <li>• Operations changing classification</li>
                    </ul>

                    <div className="bg-teal/5 rounded-lg p-4 mb-6">
                      <p className="text-sm font-semibold text-navy mb-2">Pricing:</p>
                      <p className="text-body-text text-sm">Contact us for a customized quote based on your vessel type and operations</p>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/contact"
                        className="block w-full bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                      >
                        Get Quote
                      </Link>
                      <Link
                        href="/contact#book-consultation"
                        className="block w-full bg-white hover:bg-gray-50 text-navy border-2 border-navy px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                      >
                        Book Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2: SMS Audits & Gap Analysis */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-card">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-teal/10 w-16 h-16 rounded-xl flex items-center justify-center">
                      <Search className="text-teal" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-navy">SMS Audits & Gap Analysis</h2>
                  </div>

                  <p className="text-lg text-body-text mb-6">
                    Comprehensive review of your existing SMS to identify gaps and ensure MCA inspection readiness. 
                    Get expert feedback on what's working and what needs improvement.
                  </p>

                  <h3 className="text-xl font-bold text-navy mb-4">What's Included:</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Full review of existing SMS documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Gap analysis against MGN 280 requirements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Detailed report with prioritized recommendations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">MCA inspection preparation guidance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Practical advice on implementation improvements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Follow-up call to discuss findings</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-bold text-navy mb-4">Who It's For:</h3>
                    <ul className="space-y-2 mb-6 text-body-text">
                      <li>• Existing SMS needing review</li>
                      <li>• Pre-inspection preparation</li>
                      <li>• Post-incident compliance check</li>
                      <li>• Annual SMS verification</li>
                    </ul>

                    <div className="bg-teal/5 rounded-lg p-4 mb-6">
                      <p className="text-sm font-semibold text-navy mb-2">Pricing:</p>
                      <p className="text-body-text text-sm">Contact us for a customized quote</p>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/contact"
                        className="block w-full bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                      >
                        Get Quote
                      </Link>
                      <Link
                        href="/contact#book-consultation"
                        className="block w-full bg-white hover:bg-gray-50 text-navy border-2 border-navy px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                      >
                        Book Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3: Ongoing SMS Support */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-card">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-teal/10 w-16 h-16 rounded-xl flex items-center justify-center">
                      <HeadphonesIcon className="text-teal" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-navy">Ongoing SMS Support</h2>
                  </div>

                  <p className="text-lg text-body-text mb-6">
                    Continuous support to keep your SMS current and compliant. Regular updates, advice, 
                    and expert guidance whenever you need it.
                  </p>

                  <h3 className="text-xl font-bold text-navy mb-4">What's Included:</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">SMS updates for regulation changes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Phone and email support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Document template updates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Guidance on operational changes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Annual compliance review</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                      <span className="text-body-text">Priority response times</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-bold text-navy mb-4">Who It's For:</h3>
                    <ul className="space-y-2 mb-6 text-body-text">
                      <li>• Operators wanting peace of mind</li>
                      <li>• Small teams without dedicated safety staff</li>
                      <li>• Growing operations</li>
                      <li>• Ongoing compliance assurance</li>
                    </ul>

                    <div className="bg-teal/5 rounded-lg p-4 mb-6">
                      <p className="text-sm font-semibold text-navy mb-2">Pricing:</p>
                      <p className="text-body-text text-sm">Contact us for monthly or annual retainer options</p>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/contact"
                        className="block w-full bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                      >
                        Get Quote
                      </Link>
                      <Link
                        href="/contact#book-consultation"
                        className="block w-full bg-white hover:bg-gray-50 text-navy border-2 border-navy px-6 py-3 rounded-lg font-semibold transition-colors text-center"
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-navy to-navy-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Book a free 15-minute consultation to discuss which service is right for your operation
            </p>

            <Link
              href="/contact#book-consultation"
              className="inline-block bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg mb-8"
            >
              Book Free Consultation
            </Link>

            <div className="border-t border-white/20 pt-8">
              <p className="text-white/80 mb-4">Or contact directly:</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="mailto:jonathan@fleetskipper.com" className="flex items-center gap-2 text-white hover:text-teal transition-colors">
                  <Mail size={20} />
                  <span>jonathan@fleetskipper.com</span>
                </a>
                <a href="tel:+447446858414" className="flex items-center gap-2 text-white hover:text-teal transition-colors">
                  <Phone size={20} />
                  <span>+44 7446 858414</span>
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
