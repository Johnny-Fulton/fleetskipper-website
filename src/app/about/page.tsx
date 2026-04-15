import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { CheckCircle, Award, Ship, Anchor, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - FleetSkipper | Built by a Master Mariner',
  description: 'FleetSkipper is built by an active Master Mariner and harbour pilot with 20+ years maritime experience. Real maritime expertise meets practical compliance solutions.',
};

export default function AboutPage() {
  return (
    <>
      <Navigation />

      {/* Hero - Option 3: With Animated Credential Badges */}
      <section className="relative mt-28 min-h-[550px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-vessel.jpg"
            alt="Maritime vessel operations"
            className="w-full h-full object-cover"
          />
          {/* Lighter overlay to show more detail */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20 pb-20 md:pt-24 md:pb-24 lg:pt-28 lg:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Built by Mariners, For Mariners
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-10">
              WBC3 compliance from an active Master Mariner, not a consultant
            </p>

            {/* Credential Badges - Animated on scroll/load */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 animate-fade-in-up">
              {/* Master Mariner Badge */}
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <Anchor className="w-6 h-6 text-cyan-400" />
                  <div className="text-left">
                    <div className="text-white font-bold text-sm">Master Mariner</div>
                    <div className="text-white/70 text-xs">Unlimited</div>
                  </div>
                </div>
              </div>

              {/* Active Pilot Badge */}
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 animation-delay-100">
                <div className="flex items-center gap-3">
                  <Ship className="w-6 h-6 text-cyan-400" />
                  <div className="text-left">
                    <div className="text-white font-bold text-sm">Active Pilot</div>
                    <div className="text-white/70 text-xs">UK Harbour</div>
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 animation-delay-200">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-cyan-400" />
                  <div className="text-left">
                    <div className="text-white font-bold text-sm">20+ Years</div>
                    <div className="text-white/70 text-xs">Maritime Ops</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* About Our Founder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Workboat Maritime Experience Image */}
              <div className="order-2 lg:order-1">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/hero-workboat1.jpg"
                    alt="Workboat operations - professional maritime experience"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <h2 className="text-base font-semibold tracking-wide uppercase mb-3" style={{ color: '#00a8cc' }}>
                  Our Expertise
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                  Built by Working Mariners
                </h3>

                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  FleetSkipper was founded by an active Master Mariner and harbour pilot
                  with over 20 years of maritime experience. Unlike traditional consultants, we are working
                  mariners who understand the real-world challenges of vessel operations and compliance.
                </p>

                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <CheckCircle size={28} className="text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg font-semibold text-slate-900">20+ Years Maritime Operations</p>
                      <p className="text-slate-600">Extensive seagoing and harbour operations experience</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle size={28} className="text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg font-semibold text-slate-900">Active UK Harbour Pilot</p>
                      <p className="text-slate-600">Currently practicing marine pilot in one of the UK&apos;s busiest ports</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle size={28} className="text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg font-semibold text-slate-900">WBC3 Compliance Specialist</p>
                      <p className="text-slate-600">Deep practical knowledge of maritime safety management systems</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle size={28} className="text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg font-semibold text-slate-900">Real Operators, Not Just Consultants</p>
                      <p className="text-slate-600">Solutions built from hands-on experience, not just theory</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-slate-900 rounded-2xl p-10 md:p-16 text-white mb-20">
              <div className="max-w-3xl mx-auto text-center">
                <Ship className="w-16 h-16 mx-auto mb-8 text-cyan-400" />
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Mission
                </h2>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  To make WBC3 compliance simple and accessible for workboat operators.
                  Safety management shouldn&apos;t take you away from what you do best - operating your vessel.
                </p>
                <blockquote className="border-l-4 border-cyan-400 pl-6 py-4 text-left italic">
                  <p className="text-lg mb-4 leading-relaxed">
                    &quot;We&apos;ve lived the challenges that workboat operators face every day. Complex regulations,
                    limited time, and the pressure to keep vessels operational while staying compliant.
                    FleetSkipper exists to handle the paperwork so you can focus on safe operations.&quot;
                  </p>
                  <footer className="text-cyan-400 font-semibold not-italic">
                    - FleetSkipper Team
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* Why Choose FleetSkipper */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-base font-semibold tracking-wide uppercase mb-3" style={{ color: '#00a8cc' }}>
                  Our Approach
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Why Operators Choose FleetSkipper
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="bg-cyan-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Ship className="text-cyan-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Maritime Expertise</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Built by an active mariner who understands vessel operations, not just regulations.
                    Our solutions work in the real world.
                  </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="bg-cyan-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Award className="text-cyan-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Practical Compliance</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Documentation that meets MCA requirements while being practical for your crew to actually use.
                    No unnecessary complexity.
                  </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="bg-cyan-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Users className="text-cyan-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Direct Support</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Work directly with our expert team - no junior consultants or offshore teams.
                    You get expert guidance every step of the way.
                  </p>
                </div>
              </div>
            </div>

            {/* Qualifications & Experience */}
            <div className="bg-gray-50 rounded-2xl p-10 md:p-12 border border-gray-100">
              <h2 className="text-base font-semibold tracking-wide uppercase mb-3 text-center" style={{ color: '#00a8cc' }}>
                Credentials
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center">
                Qualifications & Experience
              </h3>

              <div className="max-w-3xl mx-auto">
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 bg-white p-5 rounded-lg border border-gray-200">
                    <span className="text-cyan-600 font-bold text-2xl">•</span>
                    <div>
                      <p className="font-semibold text-slate-900 text-lg">Master Mariner Unlimited (UK)</p>
                      <p className="text-slate-600 text-sm">Qualified to command vessels of any size, worldwide</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 bg-white p-5 rounded-lg border border-gray-200">
                    <span className="text-cyan-600 font-bold text-2xl">•</span>
                    <div>
                      <p className="font-semibold text-slate-900 text-lg">Licensed Marine Pilot - Active Duty</p>
                      <p className="text-slate-600 text-sm">Currently practicing at one of the UK&apos;s busiest ports</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 bg-white p-5 rounded-lg border border-gray-200">
                    <span className="text-cyan-600 font-bold text-2xl">•</span>
                    <div>
                      <p className="font-semibold text-slate-900 text-lg">20+ Years Maritime Operations</p>
                      <p className="text-slate-600 text-sm">Extensive seagoing and harbour operations experience</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 bg-white p-5 rounded-lg border border-gray-200">
                    <span className="text-cyan-600 font-bold text-2xl">•</span>
                    <div>
                      <p className="font-semibold text-slate-900 text-lg">WBC3 Compliance Specialist</p>
                      <p className="text-slate-600 text-sm">Practical expertise in Workboat Code compliance and SMS implementation</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 bg-white p-5 rounded-lg border border-gray-200">
                    <span className="text-cyan-600 font-bold text-2xl">•</span>
                    <div>
                      <p className="font-semibold text-slate-900 text-lg">Safety Management Systems Expert</p>
                      <p className="text-slate-600 text-sm">Development, implementation, and maintenance of ISM-compliant SMS</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 bg-white p-5 rounded-lg border border-gray-200">
                    <span className="text-cyan-600 font-bold text-2xl">•</span>
                    <div>
                      <p className="font-semibold text-slate-900 text-lg">MCA Inspection Preparation</p>
                      <p className="text-slate-600 text-sm">Preparing operators for successful MCA inspections and surveys</p>
                    </div>
                  </li>
                </ul>
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
              Ready to Work Together?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Book a free consultation to discuss your compliance needs
            </p>
            <Link
              href="/contact#book-consultation"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
