import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { CheckCircle, FileText, ClipboardCheck, Users, Download, Phone, Mail } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Navigation />

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              WBC3 Compliance Made Simple for Workboat Operators
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              Expert SMS documentation and digital tools
            </p>
            <p className="text-lg md:text-xl text-cyan-400 mb-10">
              Built by a Master Mariner for working skippers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact#book-consultation"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                Book Free Consultation
              </Link>
              <Link
                href="#lead-magnet"
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Download Free WBC3 Checklist
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={20} className="text-cyan-400" />
                <span>Fast Turnaround</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={20} className="text-cyan-400" />
                <span>MCA-Ready Documentation</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={20} className="text-cyan-400" />
                <span>Built by Active Master Mariner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM (Empathy) */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              WBC3 Compliance Doesn't Have to Be a Headache
            </h2>
            <p className="text-lg text-body-text">
              We've helped workboat operators just like you get compliant - fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-orange-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Drowning in Paperwork?</h3>
              <p className="text-body-text">
                SMS documentation feels overwhelming and takes time away from operations
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck className="text-orange-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Not Sure Where to Start?</h3>
              <p className="text-body-text">
                MGN 280 requirements are confusing and complex for small operators
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-orange-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Worried About MCA Inspections?</h3>
              <p className="text-body-text">
                Don't know if your SMS will pass inspection when it counts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW WE HELP */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              How We Help
            </h2>
            <p className="text-lg text-body-text">
              Two ways to get and stay WBC3 compliant
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* SMS Consultancy Services */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white p-8 md:p-10 rounded-2xl shadow-lg">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FileText className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">SMS Consultancy Services</h3>
              <p className="text-xl text-cyan-400 mb-6">Get Compliant Fast</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Complete SMS Documentation</p>
                    <p className="text-white/80 text-sm">Tailored to your vessels, WBC3-compliant, MCA-ready</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">SMS Audits & Gap Analysis</p>
                    <p className="text-white/80 text-sm">Review existing SMS, identify gaps, prepare for inspections</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Ongoing SMS Support</p>
                    <p className="text-white/80 text-sm">Updates, training, phone/email support</p>
                  </div>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/services"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Get Quote
                </Link>
                <Link
                  href="/services"
                  className="bg-white/10 hover:bg-white/20 text-white border-2 border-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* FleetSkipper App */}
            <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 text-white p-8 md:p-10 rounded-2xl shadow-lg">
              <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <ClipboardCheck className="text-white" size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">FleetSkipper App</h3>
              <p className="text-xl text-slate-900 mb-6">Go Digital, Stay Compliant</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-white flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Digital Logbooks & Checklists</p>
                    <p className="text-white/80 text-sm">Crew can log on phones/tablets</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-white flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Maintenance Tracking</p>
                    <p className="text-white/80 text-sm">Never miss a service, stay on top of repairs</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-white flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Equipment Management</p>
                    <p className="text-white/80 text-sm">Track inspections, certifications, inventory</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-white flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Document Control</p>
                    <p className="text-white/80 text-sm">Your SMS accessible anywhere</p>
                  </div>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-white hover:bg-gray-100 text-cyan-600 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Book Demo
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 hover:bg-white/20 text-white border-2 border-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  See Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CREDIBILITY */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
              Why Workboat Operators Trust FleetSkipper
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Photo placeholder */}
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 aspect-square flex items-center justify-center">
                  <p className="text-white text-center text-lg">
                    [Photo: Jonathan in pilot uniform or on vessel]
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                  Built by Jonathan Fulton, Master Mariner
                </h3>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={24} className="text-cyan-500 flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">20+ years maritime operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={24} className="text-cyan-500 flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">Active Belfast Harbour pilot</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={24} className="text-cyan-500 flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">Real-world operator, not just a consultant</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={24} className="text-cyan-500 flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">WBC3 & MGN 280 compliance expert</span>
                  </li>
                </ul>

                <blockquote className="border-l-4 border-cyan-500 pl-6 py-4 bg-white rounded-r-lg shadow-sm">
                  <p className="text-lg text-gray-700 italic mb-4">
                    "I built FleetSkipper because I've lived the challenges you face. WBC3 compliance shouldn't
                    take you away from what you do best - operating your vessel. Let me handle the paperwork."
                  </p>
                  <footer className="text-slate-800 font-semibold">
                    - Jonathan Fulton, Master Mariner
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Get WBC3 Compliant in 3 Simple Steps
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-cyan-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Book Free Consultation</h3>
                <p className="text-gray-700 mb-6">
                  15-minute call to understand your vessels and compliance needs
                </p>
                <Link
                  href="/contact#book-consultation"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Now
                </Link>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-cyan-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">We Build Your SMS</h3>
                <p className="text-gray-700">
                  Tailored documentation for your operations. Fast turnaround with regular updates on progress.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-cyan-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">You're MCA-Ready</h3>
                <p className="text-gray-700">
                  Complete SMS documentation delivered with training on how to use it. Ongoing support available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF (Testimonials) */}
      <section className="py-16 md:py-20 bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Workboat Operators Say
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/20">
              <p className="text-lg md:text-xl text-white/90 italic mb-6">
                "[Testimonial from Ryan and other clients will be added here after delivery]"
              </p>
              <footer className="text-cyan-400 font-semibold">
                - Ryan, Mid & East Antrim Council
              </footer>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEAD MAGNET */}
      <section id="lead-magnet" className="py-16 md:py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Download size={40} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Free WBC3 Compliance Checklist
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Download our free checklist to see if your vessel operations are WBC3 compliant
            </p>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-8 max-w-lg mx-auto">
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="flex-shrink-0 mt-1" />
                  <span>Complete MGN 280 requirements breakdown</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="flex-shrink-0 mt-1" />
                  <span>Self-assessment worksheet</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="flex-shrink-0 mt-1" />
                  <span>Common inspection failures to avoid</span>
                </li>
              </ul>
            </div>

            <Link
              href="/contact"
              className="inline-block bg-white hover:bg-gray-100 text-orange-500 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              Download Free Checklist
            </Link>
            <p className="text-sm text-white/70 mt-4">(Email required)</p>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Ready to Get WBC3 Compliant?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Book a free 15-minute consultation to discuss your vessel and compliance needs
            </p>

            <Link
              href="/contact#book-consultation"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg mb-8"
            >
              Book Free Consultation
            </Link>

            <div className="border-t border-gray-300 pt-8">
              <p className="text-gray-700 mb-4">Or contact directly:</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="mailto:jonathan@fleetskipper.com" className="flex items-center gap-2 text-slate-800 hover:text-cyan-500 transition-colors">
                  <Mail size={20} />
                  <span>jonathan@fleetskipper.com</span>
                </a>
                <a href="tel:+447446858414" className="flex items-center gap-2 text-slate-800 hover:text-cyan-500 transition-colors">
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
