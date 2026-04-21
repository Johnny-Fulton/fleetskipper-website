import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The FleetSkipper App | WBC3 SMS for Workboat Operators',
  description: 'WBC3 compliance your crew will actually use. A Safety Management System for UK workboat operators — regulation-mapped to Workboat Code Edition 3, offline-first, and built around how vessels actually run.',
  openGraph: {
    title: 'The FleetSkipper App | WBC3 SMS for Workboat Operators',
    description: 'WBC3 compliance your crew will actually use. A Safety Management System for UK workboat operators — regulation-mapped to Workboat Code Edition 3, offline-first, and built around how vessels actually run.',
    type: 'website',
  },
}

export default function AppPage() {
  return (
    <>
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative mt-28 pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/images/hero-workboat.jpg')] opacity-5 bg-cover bg-center" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Hero text */}
            <div className="order-1">
              {/* Logo + | + app treatment (matching homepage) */}
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/logos/Logo_FleetSkipper_White.png"
                  alt="FleetSkipper"
                  width={280}
                  height={80}
                  className="h-12 md:h-14 w-auto"
                />
                <span className="text-white/40 text-2xl md:text-3xl font-light">|</span>
                <span className="text-white text-2xl md:text-3xl font-bold">app</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
                WBC3 compliance your crew will actually use.
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                A Safety Management System for UK workboat operators — regulation-mapped to Workboat Code Edition 3, offline-first, and built around how vessels actually run.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact#book-consultation"
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-2xl hover:-translate-y-0.5 bg-[#ff6b35] hover:bg-[#e55a2b]"
                >
                  Book a demo
                </Link>
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 border-2 border-white/50"
                >
                  See the free WBC3 tools →
                </Link>
              </div>
            </div>

            {/* Right column - Hero screenshot */}
            <div className="relative max-w-lg mx-auto lg:max-w-none order-2">
              <div className="relative">
                <Image
                  src="/images/app-hero-ipad.png"
                  alt="FleetSkipper app on iPad showing active voyage screen"
                  width={1200}
                  height={900}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-slate-800 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-xs md:text-sm text-white/80 uppercase tracking-wider font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-cyan-400" />
              Regulation-mapped to WBC3
            </div>
            <span className="hidden md:inline text-white/30">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-cyan-400" />
              Offline-first — works at sea with no signal
            </div>
            <span className="hidden md:inline text-white/30">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-cyan-400" />
              UK-hosted on Microsoft Azure
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* INTRO SECTION */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-cyan-600 font-bold text-sm uppercase tracking-wide mb-4">What FleetSkipper is for</h2>

            <div className="text-lg text-slate-700 leading-relaxed">
              <p>
                A Safety Management System built for MCA Workboat Code Edition 3. Replaces paper forms, spreadsheets, and scattered folders — without asking you to change how you run your vessels.
              </p>
            </div>
          </div>
        </section>

        {/* CAPABILITY SECTIONS */}

        {/* Section 1 - Run your fleet (copy-only) */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              Run your fleet from one place
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Every vessel, every cert, every job — visible per vessel and across the fleet.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Multi-vessel management with fast vessel switching</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Per-vessel dashboard with live compliance scores</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Forward calendar of jobs and scheduled events</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Fleet-wide aggregated dashboard coming soon</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Works on any phone, tablet, or laptop</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2 - Crew compliance (with screenshot RIGHT) */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Title - always first on mobile */}
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 lg:hidden">
              Keep your crew compliant — before they sail
            </h2>

            {/* Intro paragraphs - shown on mobile BEFORE image */}
            <div className="lg:hidden mb-6">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                FleetSkipper stops a voyage from starting if the crew isn't compliant.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed">
                On voyage-start, the app runs Workboat Code Edition 3 requirements against the crew manifest and vessel configuration. Missing cert, expired training, insufficient manning — the voyage blocks. Overrides require a formal form, which creates an auditable record.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Text content on LEFT - desktop: title + paragraphs + bullets */}
              <div className="order-4 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 hidden lg:block">
                  Keep your crew compliant — before they sail
                </h2>

                <div className="hidden lg:block">
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    FleetSkipper stops a voyage from starting if the crew isn't compliant.
                  </p>

                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    On voyage-start, the app runs Workboat Code Edition 3 requirements against the crew manifest and vessel configuration. Missing cert, expired training, insufficient manning — the voyage blocks. Overrides require a formal form, which creates an auditable record.
                  </p>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Pre-voyage compliance gate with formal override</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Vessel-aware, rank-specific certificate requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Separate individual vs. vessel-level requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Hours-of-rest grid, signable and printable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Editable familiarisation templates with sign-off</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Drills and training tracked separately</span>
                  </li>
                </ul>
              </div>

              {/* Screenshot on RIGHT - order-3 to appear after paragraphs, before bullets on mobile */}
              <div className="flex items-start justify-center h-full order-3 lg:order-2">
                <div className="relative w-3/4">
                  <Image
                    src="/images/crew-compliance-ipad.png"
                    alt="FleetSkipper crew compliance gate on iPad"
                    width={1200}
                    height={900}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Logbook (with screenshot LEFT) */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Title - always first on mobile */}
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 lg:hidden">
              Replace the paperwork, keep the paper trail
            </h2>

            {/* Intro paragraph - shown on mobile BEFORE image */}
            <div className="lg:hidden mb-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                One-tap logging. The logbook fills itself in.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Screenshot on LEFT - order-3 on mobile (after title and intro, before bullets) */}
              <div className="order-3 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Screenshot 3: Voyage Log with Pre-Departure Checks</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600 italic">
                  A single logbook entry expanded to show every underlying check, by whom, with timestamps. This is what auditable looks like.
                </p>
              </div>

              {/* Copy on RIGHT - order-4 on mobile (after image) */}
              <div className="order-4 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 hidden lg:block">
                  Replace the paperwork, keep the paper trail
                </h2>

                <div className="hidden lg:block">
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    One-tap logging. The logbook fills itself in.
                  </p>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Auto-populating logbook across all voyage events</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">One-tap position, weather, fuel, compass error, notes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Editable pre-departure and pre-arrival checklists</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Editable operation types per company</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Full-text search across every voyage and checklist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Every record printable, signable, and forwardable</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 - Equipment (copy-only) */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              Equipment, maintenance, and defects — properly tracked
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Every piece of kit, every service, every defect — on every vessel.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Equipment register by category, with location and serial</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Planned maintenance with red/amber/green status</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Maintenance history per item, updated on every service</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">One-click defect logging from any equipment item</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Structured defect close-out (root cause, action, parts)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Filterable defect history by kit, severity, and date</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5 - Risk/Drills/Incidents (with screenshot RIGHT) */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Title - always first on mobile */}
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 lg:hidden">
              Handle the moments that matter
            </h2>

            {/* Intro paragraph - shown on mobile BEFORE image */}
            <div className="lg:hidden mb-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                Risk assessments, drills, and incidents — where an SMS earns its name.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Text content on LEFT - desktop: title + all paragraphs */}
              <div className="order-4 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 hidden lg:block">
                  Handle the moments that matter
                </h2>

                <div className="hidden lg:block">
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Risk assessments, drills, and incidents — where an SMS earns its name.
                  </p>
                </div>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Risk Assessments</strong> — proper 5×5 ALARP methodology, multi-vessel application, automated review schedule with WBC3 clause citations.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Drills</strong> — preconfigured WBC3 essentials (Fire, Abandon Ship, MOB) plus custom drills. Frequencies configurable. Missing drills block voyages.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong>Incidents</strong> — full ISM Code corrective action lifecycle. Structured contributing factors, mandatory root cause, effectiveness verification.
                </p>
              </div>

              {/* Screenshot on RIGHT - order-3 to appear after intro, before detail paragraphs on mobile */}
              <div className="flex items-start justify-center h-full order-3 lg:order-2">
                <div className="relative w-full">
                  <Image
                    src="/images/risk-assessment-desktop.png"
                    alt="FleetSkipper risk assessment with ALARP matrix"
                    width={1200}
                    height={900}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 - Documents (copy-only) */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              Your documents, where they already live
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              A compliance engine, not a document warehouse.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Link your existing SharePoint / Drive / OneDrive / Dropbox / iCloud</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Per-item document linking supported</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Computed status: Valid / Expiring / Overdue / Not Set</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Responsible Person tagged per document</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ARCHITECTURE STORY CALLOUT - Visually distinct */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.3),transparent_50%)]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Why a regulation-mapped compliance engine
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg text-white/90 leading-relaxed">
                <p>
                  When an MCA inspector asks <em>"where did this come from?"</em>, the answer has to be a clause of the Workboat Code. Not "the system said so." Not "the AI suggested it." A clause number.
                </p>

                <p>
                  We deliberately don't use generative AI for compliance answers. In a regulated industry, confident-sounding answers that <em>might</em> be right are a liability — one wrong citation during a Port State Control inspection is the kind of problem that ends careers. Deterministic rules, mapped to the code, don't hallucinate.
                </p>
              </div>

              <div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <p className="text-white/50 text-sm">Screenshot 5: Review Schedule with WBC3 Citation</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/70 italic">
                  A review schedule with its driving WBC3 clause cited in plain English. Every rule the app applies traces back to a clause you can read.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER SECTION */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              Built by a Master Mariner
            </h2>

            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>
                Every feature was designed by someone who's stood a watch, filled in a logbook at 3am, and faced an MCA inspection the next morning. Not a software company with a maritime consultant on retainer.
              </p>

              <p>
                <Link href="/about" className="text-cyan-600 hover:text-cyan-700 font-semibold">
                  → Read the full story on the About page
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* PILOT PROOF SECTION */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
              Who's already using it
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Glasgow City Boats use FleetSkipper for their workboat operations in Scotland.
            </p>

            <blockquote className="text-lg text-slate-600 italic border-l-4 border-cyan-500 pl-6 mb-6">
              "FleetSkipper helped us get our SMS documentation sorted quickly and professionally. The tailored approach meant everything was specific to our operations."
            </blockquote>
            <p className="text-sm text-slate-500 mb-8">— Glasgow City Boats</p>

            <p className="text-lg text-slate-700 leading-relaxed">
              Currently in pilot with a UK local authority marina, with further operators joining in the coming weeks.
            </p>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">"Does it work offline?"</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Yes. Offline-first by design. Crew log at sea with no signal; everything syncs on reconnection.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">"What about MARPOL oil records and garbage records?"</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Oil Record Books apply to vessels of 400GT and above; Garbage Record Books to 100GT and above. Most UK workboats fall below both thresholds. For operators who cross them, talk to us at the demo.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">"What if I already have an SMS in place?"</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Most operators do. FleetSkipper matches your existing SMS rather than replacing it — our consultancy arm can run a gap analysis, or we configure the app against what you already have. <Link href="/services" className="text-cyan-600 hover:text-cyan-700 font-semibold">(Learn more →)</Link>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">"Where is my data stored? Is it secure?"</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  UK data residency on Microsoft Azure. Encrypted in transit and at rest. Your cloud document links stay under your organisation's control — we track them, we don't mirror them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-cyan-600 to-cyan-700">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              See it on your own data.
            </h2>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              A 15-minute demo is the fastest way to tell if FleetSkipper fits your operation. We'll run through with your vessel types and operating area in mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/contact#book-consultation"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-cyan-600 bg-white shadow-lg transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                Book a demo
              </Link>
              <a
                href="mailto:info@fleetskipper.com"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 border-2 border-white/50"
              >
                Questions first? Email info@fleetskipper.com
              </a>
            </div>

            <p className="text-sm text-white/70 italic">
              (Pricing available at the demo call.)
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
