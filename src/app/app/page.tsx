import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The FleetSkipper App | WBC3 SMS for Workboat Operators',
  description: 'The WBC3 Safety Management System your crew will actually use. Regulation-mapped. Offline-first. Built by a Master Mariner.',
  openGraph: {
    title: 'The FleetSkipper App | WBC3 SMS for Workboat Operators',
    description: 'The WBC3 Safety Management System your crew will actually use. Regulation-mapped. Offline-first. Built by a Master Mariner.',
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
            <div>
              <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <span className="text-cyan-400 font-semibold text-sm">The FleetSkipper App</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
                The WBC3 Safety Management System your crew will actually use.
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Regulation-mapped. Offline-first. Built by a Master Mariner. Every answer in the app traces back to a specific clause of the Workboat Code Edition 3 — so when an MCA inspector asks where it came from, you can show them.
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

            {/* Right column - Hero screenshot placeholder */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <p className="text-white/50 text-sm">Screenshot 1: Active Voyage Screen</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70 italic text-center">
                A voyage in progress. Crew log position, weather, fuel and operations with a single tap. Everything is timestamped, attributed, and written to the logbook automatically.
              </p>
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
              Built by a Master Mariner & active UK harbour pilot
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
            <span className="hidden md:inline text-white/30">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-cyan-400" />
              Already in use with UK workboat operators
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* INTRO SECTION */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-cyan-600 font-bold text-sm uppercase tracking-wide mb-4">What FleetSkipper is for</h2>

            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>
                FleetSkipper is a Safety Management System for UK workboat operators, built specifically for MCA Workboat Code Edition 3. It replaces the paper forms, spreadsheets, and scattered folders that most small operators rely on — and it does it without asking you to change how you already run your vessels.
              </p>
              <p>
                Everything in the app is editable. Your operations, your checklists, your familiarisation, your templates — all bend to how <em>you</em> work, not how the software thinks you should. The app matches your SMS, not the other way round.
              </p>
            </div>
          </div>
        </section>

        {/* CAPABILITY SECTIONS */}

        {/* Section 1 - Run your fleet (copy-only) */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              1. Run your fleet from one place
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Every vessel you operate, every piece of equipment on board, every certificate that's approaching expiry, every planned maintenance job that's coming due — visible at a glance, per vessel and across the fleet.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The per-vessel dashboard isn't just a wall of green ticks. It's split by module, so you can see <em>which</em> area is slipping — crew certificates, equipment servicing, drill compliance, open defects — and drill straight into the thing that needs attention.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Multi-vessel fleet management — switch between vessels from the top of the app, with shared crew, shared templates, and organisation-level settings</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Per-vessel dashboard with voyage status, daily check status, and per-module compliance score</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Forward-looking calendar of jobs and scheduled events</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Fleet-wide aggregated dashboard — coming soon; for now the per-vessel view plus fast vessel switching gives you the same operational visibility with one extra click</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Copy on LEFT */}
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  2. Keep your crew compliant — before they sail
                </h2>

                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  This is probably the most important thing FleetSkipper does differently from every other SMS tool: <strong>it stops a voyage from starting if the crew isn't compliant.</strong>
                </p>

                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  When a skipper goes to start a voyage, FleetSkipper runs the Workboat Code Edition 3 requirements against the crew manifest and the vessel configuration. Missing certificate? Expired training? Not enough hands on deck? The voyage is blocked. The skipper can override, but only by filling out a formal override form — which creates an auditable record of the exception.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  It's not about being restrictive. It's about catching the thing that would otherwise become an incident.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Crew register shared across vessels, with per-vessel on-duty / off-duty status</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Vessel-aware, rank-specific certificate requirements (knows what each person needs on each vessel)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Separate handling of individual vs. vessel-level requirements (e.g. "every crew member needs STCW" vs. "at least one person on board needs firefighting cert")</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Hours-of-rest tracking with the classic merchant-navy grid, signable and printable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Editable familiarisation templates with mandatory sign-off</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Drills and training kept distinct — regulatory events separate from operational skill-building</span>
                  </li>
                </ul>
              </div>

              {/* Screenshot on RIGHT */}
              <div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Screenshot 2: Crew Profile</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600 italic">
                  A crew member's profile showing cross-module compliance. The drill module flags overdue drills on the crew profile, because compliance isn't siloed — it's relational.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Logbook (with screenshot LEFT) */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Screenshot on LEFT */}
              <div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Screenshot 3: Voyage Log</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600 italic">
                  A single logbook entry for pre-departure checks, expandable to show every individual check, by whom, with timestamps. This is what auditable looks like.
                </p>
              </div>

              {/* Copy on RIGHT */}
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  3. Replace the paperwork, keep the paper trail
                </h2>

                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Every operational event your crew would normally fill in on paper — pre-departure checks, position logs, weather reports, fuel updates, operations, arrivals — happens with a single tap in the app. Then it writes itself into the logbook automatically, with a full audit trail of who did what and when.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Your crew don't fill in a logbook. They do their job, and the logbook fills itself in. Every entry is expandable, every change is attributed, every daily page requires Master or Admin sign-off.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Auto-populating logbook — writes itself from voyages, checks, checklists and operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">One-tap logging of position, weather, fuel, compass error, and notes during voyages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Editable pre-departure and pre-arrival checklists</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Editable operation types (pilot transfer, crew transfer, diving ops, lifting ops — customise per company)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Full-text search across every voyage, every logbook entry, every checklist, forever</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Every record printable, signable, exportable — forward a signed PDF to an inspector's email from your phone</span>
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
              4. Equipment, maintenance, and defects — properly tracked
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Every piece of equipment on every vessel, with its service history, its planned maintenance schedule, and its linked certificates. One-click defect logging from any equipment item. Colour-coded maintenance cards so anyone walking past the screen can see what needs attention — not just the person who set it up.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Equipment register with category grouping (FFE, LSA, Nav, Comms, etc.), location, serial, service history, linked certs</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Planned maintenance with green / yellow / red status cards</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Maintenance history per item — one service entry updates the register, the history, and the PMS job status</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">One-click defect logging from any equipment item, with structured close-out (root cause, corrective action, testing, parts used)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Defect history filterable by equipment, severity, and date — so patterns on specific kit become visible</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5 - Risk/Drills/Incidents (with screenshot RIGHT) */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Copy on LEFT */}
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  5. Handle the moments that matter
                </h2>

                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Risk assessments, drills, and incidents — the three places where a Safety Management System actually earns its name.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Risk Assessments</strong> use a proper 5×5 matrix with separate initial and residual scoring, controls, risk reduction %, and ALARP status. Build from scratch or use templates keyed to workboat tasks (launching small boats, working at height, crane operations, etc.). Apply a single RA across multiple vessels in your fleet. The app builds and maintains a review schedule automatically — with the WBC3 clause driving each review cited in the schedule.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Drills</strong> are pre-configured with the three WBC3 essentials (Fire, Abandon Ship, MOB) plus unlimited custom drills matching your SMS. Frequencies configurable per drill type. Missing drills block voyages.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong>Incidents</strong> follow the full ISM-Code corrective action lifecycle — report, investigate, root cause, corrective action, effectiveness verification, close-out. Contributing factors captured as structured data (human error, equipment failure, fatigue, communication failure and more). SLA compliance tracked so your DPA knows exactly where every incident stands.
                </p>
              </div>

              {/* Screenshot on RIGHT */}
              <div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Screenshot 4: Risk Assessment</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600 italic">
                  A finished risk assessment, ready to print and hand to an auditor. Initial and residual scores, risk reduction percentage, ALARP status — the output that an MCA inspector actually wants to see.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 - Documents (copy-only) */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              6. Your documents, where they already live
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              FleetSkipper is a compliance engine, not a document warehouse. Link your existing cloud storage — SharePoint, Google Drive, OneDrive, Dropbox, iCloud, or any other cloud — and FleetSkipper tracks your certificates and SMS documents against their expiry and review dates while the actual files stay where they already are.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">One-click setup: link the folder where your SMS already lives</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Per-item linking: individual certs and documents can point to their own specific URLs if you prefer</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Computed compliance status: Valid / Expiring / Overdue / Not Set — derived from the dates, not something you have to maintain</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Responsible Person tagged per document — every compliance item has a named owner</span>
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
                Why FleetSkipper uses a regulation-mapped compliance engine
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg text-white/90 leading-relaxed">
                <p>
                  When an MCA inspector asks <em>"where did this requirement come from?"</em>, the answer has to be a specific clause of the Workboat Code. Not "the system said so." Not "the AI suggested it." A clause number.
                </p>

                <p>
                  FleetSkipper's compliance logic is mapped directly to the text of the Workboat Code Edition 3. Every required certificate, every crew qualification threshold, every risk assessment review interval, every reporting requirement — traces back to a specific, named clause. When the app tells you a crew member needs STCW Master Workboat under 500GT, it's because the code says so, and we can show you where.
                </p>

                <p>
                  We deliberately don't use generative AI to answer compliance questions. In a regulated industry, a tool that produces confident-sounding answers that <em>might</em> be right is a liability — one wrong citation during a Port State Control inspection is the kind of problem that ends careers. Deterministic rules, mapped to the code, don't hallucinate.
                </p>
              </div>

              <div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <p className="text-white/50 text-sm">Screenshot 5: Review Schedule</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/70 italic">
                  A review schedule with the driving WBC3 clause cited in plain English. Every rule the app applies traces back to a clause you can read.
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
                FleetSkipper isn't built by a software company with a maritime consultant on retainer. It's built by a Master Mariner Unlimited and active UK harbour pilot with 20+ years at sea.
              </p>

              <p>
                That matters because every feature in the app was designed by someone who's stood a watch, filled in a logbook at 3am, and faced an MCA inspection the next morning. The crew compliance gate that blocks a voyage if certs are missing? That's someone who has personally watched a vessel sail with an issue nobody caught. The auto-populating logbook? That's someone who has filled in the paper one. The regulation-mapped engine? That's someone who reads the Workboat Code for a living.
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

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-8">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                <strong className="text-slate-900">Glasgow City Boats</strong> use FleetSkipper for their workboat operations in Scotland.
              </p>
              <blockquote className="text-lg text-slate-600 italic border-l-4 border-cyan-500 pl-6">
                "FleetSkipper helped us get our SMS documentation sorted quickly and professionally. The tailored approach meant everything was specific to our operations."
              </blockquote>
              <p className="text-sm text-slate-500 mt-2">— Glasgow City Boats</p>
            </div>

            <p className="text-lg text-slate-700 leading-relaxed">
              FleetSkipper is currently in pilot with a UK local authority marina, with further operators joining the trial in the coming weeks.
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
                  Yes. FleetSkipper is offline-first by design. Crew enter data at sea with no signal; everything syncs automatically when connectivity returns. The sync status is visible in the app so you always know where you stand.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">"What about MARPOL oil records and garbage records?"</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Under MARPOL, electronic record books require formal IMO or flag state approval (MEPC.312(74)). We haven't pursued that approval yet, so we don't claim to offer an approved electronic ORB or GRB. You can log MARPOL-relevant events in the daily logbook for operational reference, but your statutory record books still need to be kept in the approved format. We'll add formally approved electronic record books when we've earned the approval — not before.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">"What if I already have an SMS in place?"</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Most operators do. FleetSkipper is designed to match your existing SMS, not replace it. Our consultancy arm can run a gap analysis against your current documentation, or we can configure the app against the SMS you already have. Everything in the app is editable so your operations can be reflected exactly. <Link href="/services" className="text-cyan-600 hover:text-cyan-700 font-semibold">Learn more about our consultancy services →</Link>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">"Where is my data stored? Is it secure?"</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  FleetSkipper runs entirely on Microsoft Azure, with UK data residency. All data is encrypted in transit and at rest, backed up automatically, and accessible only to authorised users within your organisation. Your cloud document links (SharePoint, Google Drive, Dropbox, etc.) stay under your own organisation's control — we track them, we don't copy or mirror them.
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
              A 15-minute demo is the fastest way to understand whether FleetSkipper fits your operation. We'll walk through the app with your vessel types and operating area in mind, answer specific questions from your DPA or safety officer, and show you the compliance logic running against a real example.
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
              (Pricing available on request during the demo call.)
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
