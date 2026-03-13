import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { CheckCircle, Award, Ship, Anchor } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - FleetSkipper',
  description: 'Learn about Jonathan Fulton, Master Mariner and founder of FleetSkipper',
};

export default function AboutPage() {
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Built by Mariners, For Mariners
            </h1>
            <p className="text-xl text-white/90">
              Real maritime experience, practical solutions
            </p>
          </div>
        </div>
      </section>

      {/* Jonathan's Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Photo placeholder */}
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-12 aspect-square flex flex-col items-center justify-center text-center">
                  <Ship size={80} className="text-teal mb-4" />
                  <p className="text-white text-lg">
                    [Professional photo of Jonathan in pilot uniform or maritime setting]
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                  Meet Jonathan Fulton
                </h2>
                <p className="text-lg text-body-text mb-4">
                  FleetSkipper was founded by Jonathan Fulton, a Master Mariner with over 20 years of 
                  maritime experience. Currently serving as an active pilot with Belfast Harbour, Jonathan 
                  brings real-world operational knowledge to every SMS project.
                </p>
                <p className="text-lg text-body-text mb-4">
                  Unlike many consultants who've never set foot on a workboat, Jonathan has lived the 
                  challenges you face every day. He understands the practicalities of vessel operations, 
                  the pressures of compliance, and the need for SMS documentation that actually works 
                  in the real world.
                </p>
                <p className="text-lg text-body-text">
                  FleetSkipper combines Jonathan's maritime expertise with practical technology solutions 
                  to help workboat operators navigate WBC3 compliance with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Experience */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
              Credentials & Experience
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Qualifications */}
              <div className="bg-white rounded-xl p-8 shadow-card">
                <div className="bg-teal/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Award size={32} className="text-teal" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-6">Qualifications</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                    <span className="text-body-text">Master Mariner (Unlimited)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                    <span className="text-body-text">Belfast Harbour Pilot</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                    <span className="text-body-text">WBC3 & MGN 280 Compliance Expert</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                    <span className="text-body-text">ISM Code Auditor</span>
                  </li>
                </ul>
              </div>

              {/* Experience */}
              <div className="bg-white rounded-xl p-8 shadow-card">
                <div className="bg-teal/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Anchor size={32} className="text-teal" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-6">Experience</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                    <span className="text-body-text">20+ years maritime operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                    <span className="text-body-text">Active pilot operations (Belfast Harbour)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                    <span className="text-body-text">SMS development & implementation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-teal flex-shrink-0 mt-1" />
                    <span className="text-body-text">Workboat & commercial vessel operations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why FleetSkipper Was Founded */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-8">
              Why FleetSkipper Was Founded
            </h2>

            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <blockquote className="text-lg md:text-xl text-body-text leading-relaxed space-y-4">
                <p>
                  "Throughout my maritime career, I've seen small workboat operators struggle with WBC3 
                  compliance. The regulations are complex, consultants are expensive, and many SMS solutions 
                  are built by people who've never actually operated a vessel."
                </p>
                <p>
                  "I founded FleetSkipper to bridge that gap. As a working mariner, I understand the 
                  day-to-day realities of vessel operations. I know what works at sea and what's just 
                  paperwork for the sake of paperwork."
                </p>
                <p>
                  "FleetSkipper provides practical, affordable WBC3 compliance solutions built by someone 
                  who's actually been there. SMS documentation that works in the real world, not just on paper."
                </p>
                <p>
                  "Whether you're running a single tug, a fleet of pilot boats, or crew transfer vessels, 
                  you deserve compliance support from someone who understands your operations."
                </p>
              </blockquote>

              <footer className="mt-8 pt-6 border-t border-gray-300">
                <p className="font-bold text-navy text-xl">Jonathan Fulton</p>
                <p className="text-body-text">Master Mariner, Founder of FleetSkipper</p>
              </footer>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-20 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Approach
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-teal">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Practical</h3>
                <p className="text-white/80">
                  Solutions designed for real operations, not theoretical compliance
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-teal">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Personal</h3>
                <p className="text-white/80">
                  Direct access to Jonathan - no account managers or ticketing systems
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-teal">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Professional</h3>
                <p className="text-white/80">
                  MCA-ready documentation backed by 20+ years maritime experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-body-text mb-8">
              Ready to tackle WBC3 compliance with someone who understands your operations?
            </p>

            <Link
              href="/contact#book-consultation"
              className="inline-block bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
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
