import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SectionHeader } from '@/components/primitives';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, FileText, ClipboardCheck, Users, Download, Phone, Mail, Wrench, AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FleetSkipper - WBC3 Compliance Made Simple for Workboat Operators',
  description: 'Expert SMS documentation and digital tools for workboat operators. Built by a Master Mariner. Get WBC3 compliant fast with professional SMS consultancy services.',
  openGraph: {
    title: 'FleetSkipper - WBC3 Compliance Made Simple',
    description: 'Professional SMS documentation for workboat operators. Built by a Master Mariner who understands your operations.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <Navigation />

      {/* HERO SECTION - Full-width Tugboat Background */}
      <section className="relative mt-28 pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 overflow-hidden min-h-[600px] md:min-h-[700px]">
        {/* Full-width background image */}
        <Image
          src="/images/workboats/tugboat-hero-clean.jpg"
          alt="Tugboat workboat"
          fill
          priority
          className="object-cover object-center"
          quality={90}
          sizes="100vw"
        />

        {/* Multi-layer gradient overlay - dark everywhere except tugboat area */}
        <div className="absolute inset-0">
          {/* Main left-to-right gradient (very dark on left for text) - extended coverage */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.70) 45%, rgba(0,0,0,0.35) 65%, transparent 80%)'
            }}
          />
          {/* Top-to-bottom gradient (darkens sky, leaves tugboat clear) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 45%, transparent 100%)'
            }}
          />
          {/* Bottom vignette (darkens water at bottom) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 30%)'
            }}
          />
        </div>

        {/* Content container */}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 h-full">
          <div className="max-w-2xl">
            {/* Title - Two color design */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
              <span className="text-white">WBC3 Compliance</span>
              <br />
              <span style={{ color: '#33b8d6' }}>Made Simple</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed font-medium">
              Stop wasting time on paperwork. Get back to running your operation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/contact#book-consultation"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-2xl hover:-translate-y-0.5"
                style={{ backgroundColor: '#ff6b35' }}
              >
                Book Free Consultation →
              </Link>
              <Link
                href="#app-demo"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 border-2 border-white/50 backdrop-blur-sm"
              >
                See the App →
              </Link>
            </div>

            {/* Benefits - single line */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-white flex-shrink-0" strokeWidth={2.5} />
                <p className="text-white font-medium">Custom-built SMS for your vessel operations</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-white flex-shrink-0" strokeWidth={2.5} />
                <p className="text-white font-medium">Pass MCA inspections with confidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* THE PROBLEM SECTION */}
        <section className="py-20 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionHeader
              eyebrow="The Challenge"
              title="WBC3 Compliance Doesn't Have to Be a Headache"
              subtitle="We've helped workboat operators just like you get compliant - fast."
              className="mb-16"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                <div className="mb-6">
                  <FileText className="text-orange" size={48} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-ink mb-3">Drowning in Paperwork?</h3>
                <p className="text-body-text leading-relaxed">
                  SMS documentation feels overwhelming and takes time away from operations
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                <div className="mb-6">
                  <ClipboardCheck className="text-orange" size={48} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-ink mb-3">Not Sure Where to Start?</h3>
                <p className="text-body-text leading-relaxed">
                  WBC3 requirements can be complex for small operators
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                <div className="mb-6">
                  <AlertCircle className="text-orange-500" size={48} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Worried About MCA Inspections?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Don&apos;t know if your SMS will pass inspection when it counts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE HELP SECTION - Enhanced with better spacing and design */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <SectionHeader
              eyebrow="Our Solutions"
              title="Two Ways to Get and Stay WBC3 Compliant"
              subtitle="Choose the solution that fits your operations"
              className="mb-16"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* SMS Consultancy Services */}
              <div
                className="relative overflow-hidden text-white p-10 md:p-12 rounded-3xl shadow-2xl flex flex-col"
                style={{ background: 'linear-gradient(to bottom right, #1e3a5f, #142a45)' }}
              >
                <div
                  className="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 rounded-full blur-3xl"
                  style={{ backgroundColor: 'rgba(0, 168, 204, 0.1)' }}
                />

                <div className="relative z-10 flex-grow flex flex-col">
                  {/* Icon */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(0, 168, 204, 0.2)' }}
                  >
                    <FileText style={{ color: '#33b8d6' }} size={40} strokeWidth={2} />
                  </div>

                  {/* Header */}
                  <h3 className="text-3xl md:text-4xl font-bold mb-3">SMS Consultancy</h3>
                  <p className="text-xl mb-8 font-semibold" style={{ color: '#33b8d6' }}>Get Compliant Fast</p>

                  {/* Features */}
                  <ul className="space-y-5 mb-12 flex-grow">
                    <li className="flex items-start gap-4">
                      <div
                        className="rounded-full p-1 flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'rgba(51, 184, 214, 0.2)' }}
                      >
                        <CheckCircle size={20} style={{ color: '#33b8d6' }} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white">Complete SMS Documentation</p>
                        <p className="text-white/70 text-sm mt-1">Tailored to your vessels, WBC3-compliant, MCA-ready</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div
                        className="rounded-full p-1 flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'rgba(51, 184, 214, 0.2)' }}
                      >
                        <CheckCircle size={20} style={{ color: '#33b8d6' }} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white">SMS Audits & Gap Analysis</p>
                        <p className="text-white/70 text-sm mt-1">Review existing SMS, identify gaps, prepare for inspections</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div
                        className="rounded-full p-1 flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'rgba(51, 184, 214, 0.2)' }}
                      >
                        <CheckCircle size={20} style={{ color: '#33b8d6' }} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white">Ongoing SMS Support</p>
                        <p className="text-white/70 text-sm mt-1">Updates, training, phone/email support</p>
                      </div>
                    </li>
                  </ul>

                  {/* CTAs - Always at bottom */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-2xl hover:-translate-y-0.5"
                      style={{ backgroundColor: '#ff6b35' }}
                    >
                      Get Quote →
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 border-2 border-white/50 backdrop-blur-sm"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>

              {/* FleetSkipper App */}
              <div
                className="relative overflow-hidden text-white p-10 md:p-12 rounded-3xl shadow-2xl flex flex-col"
                style={{ background: 'linear-gradient(to bottom right, #00a8cc, #008fb3)' }}
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex-grow flex flex-col">
                  {/* Icon */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <ClipboardCheck className="text-white" size={40} strokeWidth={2} />
                  </div>

                  {/* Header */}
                  <h3 className="text-3xl md:text-4xl font-bold mb-3">FleetSkipper App</h3>
                  <p className="text-xl mb-8 font-semibold" style={{ color: '#142a45' }}>Go Digital, Stay Compliant</p>

                  {/* Features */}
                  <ul className="space-y-5 mb-12 flex-grow">
                    <li className="flex items-start gap-4">
                      <div
                        className="rounded-full p-1 flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                      >
                        <CheckCircle size={20} className="text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white">Digital Logbooks & Checklists</p>
                        <p className="text-white/70 text-sm mt-1">Crew can log on phones/tablets</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div
                        className="rounded-full p-1 flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                      >
                        <CheckCircle size={20} className="text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white">Maintenance Tracking</p>
                        <p className="text-white/70 text-sm mt-1">Never miss a service, stay on top of repairs</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div
                        className="rounded-full p-1 flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                      >
                        <CheckCircle size={20} className="text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white">Equipment Management</p>
                        <p className="text-white/70 text-sm mt-1">Track inspections, certifications, inventory</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div
                        className="rounded-full p-1 flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                      >
                        <CheckCircle size={20} className="text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white">Document Control</p>
                        <p className="text-white/70 text-sm mt-1">Your SMS accessible anywhere</p>
                      </div>
                    </li>
                  </ul>

                  {/* CTAs - Always at bottom */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl bg-white hover:bg-gray-100 px-8 py-4 text-base font-bold transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
                      style={{ color: '#00a8cc' }}
                    >
                      Book Demo →
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 border-2 border-white/50 backdrop-blur-sm"
                    >
                      See Features
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APP SCREENSHOT SECTION - Single Feature */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left - Screenshot */}
                <div className="order-2 lg:order-1">
                  <div className="relative overflow-hidden rounded-xl shadow-2xl">
                    <Image
                      src="/images/app-dashboard.png"
                      alt="FleetSkipper Dashboard showing SMS compliance tracking on tablet"
                      width={800}
                      height={1000}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Right - Feature Points */}
                <div className="order-1 lg:order-2">
                  <p className="text-cyan-600 font-semibold text-sm uppercase tracking-wider mb-4">See It In Action</p>

                  {/* FleetSkipper App Title with Logo */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src="/logos/Logo_FleetSkipper_White.png"
                        alt="FleetSkipper"
                        width={280}
                        height={80}
                        className="h-16 md:h-20 w-auto"
                      />
                      <span className="text-white/40 text-3xl md:text-4xl font-light">|</span>
                      <span className="text-white text-3xl md:text-4xl font-bold">app</span>
                    </div>
                    <p className="text-white/60 text-lg font-semibold">Real Interface, Real Compliance</p>
                  </div>

                  <p className="text-white/80 text-lg mb-8 leading-relaxed">
                    Already being used daily by workboat operators across the UK. Here's what you get:
                  </p>

                  <ul className="space-y-4 mb-10">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-cyan-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <div>
                        <p className="text-white font-semibold text-lg">Real-Time Compliance Dashboard</p>
                        <p className="text-white/70">Track SMS compliance, drills, maintenance, and equipment status at a glance</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-cyan-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <div>
                        <p className="text-white font-semibold text-lg">Works on Phones & Tablets</p>
                        <p className="text-white/70">Optimized for marine environments - crew can log directly from the wheelhouse</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-cyan-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <div>
                        <p className="text-white font-semibold text-lg">Automatic Reminders</p>
                        <p className="text-white/70">Never miss a drill, inspection, or certificate renewal again</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-cyan-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <div>
                        <p className="text-white font-semibold text-lg">Digital Record Keeping</p>
                        <p className="text-white/70">All your compliance records in one place, ready for MCA inspections</p>
                      </div>
                    </li>
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Book a Live Demo →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION - Enhanced visual design */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <SectionHeader
              eyebrow="Simple Process"
              title="Get WBC3 Compliant in 3 Simple Steps"
              className="mb-16"
            />

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                {/* Step 1 */}
                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto text-3xl font-bold shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                      1
                    </div>
                    {/* Connector line (hidden on mobile, shown on md+) */}
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Book Free Consultation</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    15-minute call to understand your vessels and compliance needs
                  </p>
                  <Link
                    href="/contact#book-consultation"
                    className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Book Now
                  </Link>
                </div>

                {/* Step 2 */}
                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto text-3xl font-bold shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                      2
                    </div>
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">We Build Your SMS</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Tailored documentation for your operations. Fast turnaround with regular updates on progress.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto text-3xl font-bold shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">You&apos;re MCA-Ready</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Complete SMS documentation delivered with training on how to use it. Ongoing support available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF SECTION - Enhanced with Client Logo Banner */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4">
            <SectionHeader
              eyebrow="Testimonials"
              title="Trusted by UK Workboat Operators"
              className="mb-16"
              dark
            />

            {/* Testimonial Card */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative bg-white/10 backdrop-blur-sm p-10 md:p-12 rounded-2xl border border-white/20 shadow-2xl">
                <div className="absolute top-8 left-8 text-cyan-600 opacity-20">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl text-white/90 italic mb-8 leading-relaxed relative z-10">
                  &quot;FleetSkipper helped us get our SMS documentation sorted quickly and professionally. The tailored approach meant everything was specific to our operations.&quot;
                </p>
                <footer className="flex items-center gap-4 relative z-10">
                  <Image
                    src="/images/workboats/ribs-glasgow-thumb.jpg"
                    alt="Glasgow City Boats RIB"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-lg object-cover shadow-lg"
                  />
                  <div>
                    <p className="text-cyan-600 font-semibold text-lg">Glasgow City Boats</p>
                    <p className="text-white/70 text-sm">Workboat Operator, Scotland</p>
                  </div>
                </footer>
              </div>
            </div>

            {/* Client Logo Banner - Single Featured Client */}
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-white/60 text-sm uppercase tracking-wider mb-8 font-semibold">
                Trusted by Professional Operators
              </p>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-10 md:p-14">
                <div className="flex items-center justify-center">
                  {/* Glasgow City Boats Logo */}
                  <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-2xl">
                    <Image
                      src="/images/clients/glasgow-city-boats-logo.png"
                      alt="Glasgow City Boats"
                      width={240}
                      height={80}
                      className="h-16 w-auto object-contain grayscale-0 opacity-100"
                    />
                  </div>
                </div>

                <p className="text-center text-white/50 text-sm mt-8">
                  Join professional UK workboat operators who trust FleetSkipper for WBC3 compliance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FREE TOOLS SECTION - Enhanced design */}
        <section id="free-tools" className="py-20 md:py-24 bg-gradient-to-br from-cyan-600 to-cyan-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white/20 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm shadow-lg">
                <Wrench size={48} />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Free WBC3 Compliance Tools
              </h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Get instant access to our WBC3 compliance tools designed for workboat operators
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-xl shadow-xl text-left">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <ClipboardCheck size={28} className="flex-shrink-0" />
                    WBC3 Equipment Checker
                  </h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Enter your vessel details and instantly see exactly what equipment you need to be WBC3 compliant. Based on the UK Workboat Code Edition 3.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <span>Vessel-specific equipment requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <span>Clickable WBC3 regulation references</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <span>Instant compliance report</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-xl shadow-xl text-left">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Users size={28} className="flex-shrink-0" />
                    WBC3 Crew Requirements
                  </h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Find out exactly what qualifications and certificates your crew need for WBC3 compliance based on your vessel operations.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <span>Manning requirements by vessel type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <span>Required certificates & qualifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <span>Training requirements</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl mb-8 inline-flex items-center gap-4">
                <AlertCircle size={24} className="flex-shrink-0" />
                <p className="text-left">
                  <span className="font-bold">Sign up required:</span> Create a free account to access these tools and save your results
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-cyan-600 px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
                >
                  Try Free Tools →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 border-2 border-white/50 backdrop-blur-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION - Enhanced design */}
        <section className="py-20 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Ready to Get WBC3 Compliant?
              </h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Book a free 15-minute consultation to discuss your vessel and compliance needs
              </p>

              <Link
                href="/contact#book-consultation"
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mb-12"
              >
                Book Free Consultation
              </Link>

              <div className="border-t border-gray-300 pt-10">
                <p className="text-slate-700 mb-6 font-medium">Or contact directly:</p>
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                  <a href="mailto:info@fleetskipper.com" className="flex items-center gap-3 text-slate-800 hover:text-cyan-600 transition-colors group">
                    <div className="bg-cyan-100 group-hover:bg-cyan-200 p-3 rounded-lg transition-colors">
                      <Mail size={24} className="text-cyan-600" />
                    </div>
                    <span className="font-medium">info@fleetskipper.com</span>
                  </a>
                  <a href="tel:+447446858414" className="flex items-center gap-3 text-slate-800 hover:text-cyan-600 transition-colors group">
                    <div className="bg-cyan-100 group-hover:bg-cyan-200 p-3 rounded-lg transition-colors">
                      <Phone size={24} className="text-cyan-600" />
                    </div>
                    <span className="font-medium">+44 7446 858414</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
