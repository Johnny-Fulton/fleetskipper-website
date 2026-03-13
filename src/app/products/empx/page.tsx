import SmoothCarousel from '@/components/SmoothCarousel'
import NavbarLight from '@/components/navbar-light'
import { SiteFooter } from '@/components/primitives'
import { copy } from '@/content/strings'
import {
  CheckCircleIcon,
  ClockIcon,
  FolderIcon,
  XCircleIcon,
  ChartBarIcon,
  FolderOpenIcon,
  MagnifyingGlassIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'
import { Users, CheckCircle, ClipboardCheck, Flag, Shield, Search, Download, Lock, Zap, Target, Wifi, FileCheck, Fingerprint } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SafeDeckOS | Pilot - Electronic Master/Pilot Exchange Systems | SafeDeck Maritime',
  description:
    'SeaReady eMPX digital pilot exchange systems for modern ports. Eliminate paper forms, reduce errors, and gain real-time oversight of pilot operations.',
}

export default function eMPXPage() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <NavbarLight />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-50 pt-8 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-16 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                style={{ color: '#0E1A2B' }}
              >
                SafeDeckOS | Pilot
              </h1>
              <p
                className="mt-4 text-2xl font-semibold"
                style={{ color: '#0891B2' }}
              >
                Digital Master/Pilot Exchange for Modern Ports
              </p>
              <p
                className="mt-6 text-xl leading-8"
                style={{ color: '#6B7280' }}
              >
                Eliminate paper forms, reduce errors, and gain real-time
                oversight of pilot operations
              </p>

              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#c65d00' }}
                >
                  Request Demo
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-all hover:opacity-90"
                  style={{ color: '#0891B2', border: '2px solid #0891B2' }}
                >
                  See How It Works ↓
                </a>
              </div>

              <div
                className="mt-8 flex items-center justify-center gap-x-6 text-sm lg:justify-start"
                style={{ color: '#6B7280' }}
              >
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="h-4 w-4" style={{ color: '#14b8a6' }} />
                  GDPR Compliant
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="h-4 w-4" style={{ color: '#14b8a6' }} />
                  Encrypted & Secure
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="h-4 w-4" style={{ color: '#14b8a6' }} />
                  UK Company
                </span>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-start min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
              {/* Back phone - UKC calculation (slightly behind and to the left) */}
              <div
                className="absolute"
                style={{
                  transform: 'rotate(-7deg) translateX(-15%)',
                  zIndex: 1
                }}
              >
                <img
                  src="/images/empx/phone-hero-angled.png"
                  alt="eMPX showing UKC calculation with SAFE status"
                  className="w-56 sm:w-72 lg:w-80 opacity-90"
                  style={{
                    filter: 'drop-shadow(0 20px 20px rgba(0, 0, 0, 0.2))'
                  }}
                />
              </div>

              {/* Front phone - Jobs dashboard (main focus) */}
              <div
                className="relative"
                style={{
                  transform: 'rotate(-3deg) translateX(10%)',
                  zIndex: 2
                }}
              >
                <img
                  src="/images/empx/phone-hero-jobs.png"
                  alt="eMPX jobs dashboard showing active pilot operations"
                  className="w-64 sm:w-80 lg:w-96"
                  style={{
                    filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.3))'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem Section - Dark Background */}
      <section className="bg-gray-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The Challenge with Paper-Based MPX
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-8 text-center shadow-lg border border-gray-700">
              <ClockIcon className="mx-auto mb-4 h-12 w-12 text-cyan-400" />
              <h3 className="mb-3 text-xl font-semibold text-white">
                Time-Consuming
              </h3>
              <p className="text-sm text-gray-400">
                Pilots spend 10-15 minutes per job manually copying vessel data
                from screens to paper forms. Time that could be spent on
                safety-critical tasks.
              </p>
            </div>

            <div className="rounded-lg bg-gray-800 p-8 text-center shadow-lg border border-gray-700">
              <XCircleIcon className="mx-auto mb-4 h-12 w-12 text-red-400" />
              <h3 className="mb-3 text-xl font-semibold text-white">
                Error-Prone
              </h3>
              <p className="text-sm text-gray-400">
                Manual transcription of critical safety data (draft, UKC, tidal
                information) introduces risk. A single digit wrong could have
                serious consequences.
              </p>
            </div>

            <div className="rounded-lg bg-gray-800 p-8 text-center shadow-lg border border-gray-700">
              <FolderIcon className="mx-auto mb-4 h-12 w-12 text-amber-400" />
              <h3 className="mb-3 text-xl font-semibold text-white">
                No Oversight
              </h3>
              <p className="text-sm text-gray-400">
                Paper forms filed away mean harbour management has no real-time
                visibility of pilot operations. Compliance records are hard to
                search and audit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Device Showcase Section */}
      <section className="bg-gradient-to-br from-gray-50 to-cyan-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: '#0E1A2B' }}
            >
              Works Across All Your Devices
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              From pilot&apos;s tablet to shore-side operations center - SeaReady eMPX adapts to your workflow
            </p>
          </div>

          {/* Three Devices Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-12">
            {/* Desktop */}
            <div className="text-center">
              <img
                src="/images/empx/Desktop_Jobs.png"
                alt="SeaReady eMPX desktop dashboard with job assignments"
                className="w-full mx-auto"
                style={{
                  filter: 'drop-shadow(0 20px 20px rgba(0, 0, 0, 0.15))'
                }}
              />
              <div className="mt-6">
                <p className="text-sm font-semibold" style={{ color: '#0891B2' }}>
                  Desktop
                </p>
                <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
                  Shore-side operations dashboard
                </p>
              </div>
            </div>

            {/* Tablet */}
            <div className="text-center">
              <img
                src="/images/empx/tablet-mockup.png"
                alt="SeaReady eMPX on tablet"
                className="w-full mx-auto"
                style={{
                  filter: 'drop-shadow(0 20px 20px rgba(0, 0, 0, 0.15))'
                }}
              />
              <div className="mt-6">
                <p className="text-sm font-semibold" style={{ color: '#0891B2' }}>
                  Tablet
                </p>
                <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
                  Master/Pilot Exchange with signatures
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="text-center">
              <img
                src="/images/empx/phone-mockup.png"
                alt="SeaReady eMPX on phone"
                className="w-2/3 mx-auto"
                style={{
                  filter: 'drop-shadow(0 20px 20px rgba(0, 0, 0, 0.15))'
                }}
              />
              <div className="mt-6">
                <p className="text-sm font-semibold" style={{ color: '#0891B2' }}>
                  Mobile
                </p>
                <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
                  Quick UKC checks on the go
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: '#c65d00' }}
            >
              See SeaReady eMPX in Action - Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: '#0E1A2B' }}
            >
              Introducing SeaReady eMPX
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Electronic Master/Pilot Exchange - purpose-built for modern port
              operations
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-1 gap-8">
              <div className="flex gap-x-4">
                <CheckCircleIcon
                  className="mt-1 h-6 w-6 flex-none"
                  style={{ color: '#14b8a6' }}
                />
                <div>
                  <dt
                    className="mb-2 font-semibold"
                    style={{ color: '#0E1A2B' }}
                  >
                    Auto-Populate Vessel Data
                  </dt>
                  <dd style={{ color: '#6B7280' }}>
                    Connects to your port management systems to automatically
                    populate vessel details. No more copying data from screens.
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon
                  className="mt-1 h-6 w-6 flex-none"
                  style={{ color: '#14b8a6' }}
                />
                <div>
                  <dt
                    className="mb-2 font-semibold"
                    style={{ color: '#0E1A2B' }}
                  >
                    Under Keel Clearance Calculation
                  </dt>
                  <dd style={{ color: '#6B7280' }}>
                    Calculate UKC with full audit trail showing tidal data,
                    vessel draft, and safety margins. Every calculation
                    documented.
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon
                  className="mt-1 h-6 w-6 flex-none"
                  style={{ color: '#14b8a6' }}
                />
                <div>
                  <dt
                    className="mb-2 font-semibold"
                    style={{ color: '#0E1A2B' }}
                  >
                    Digital Signatures
                  </dt>
                  <dd style={{ color: '#6B7280' }}>
                    Capture Pilot and Master signatures on any device. Legally
                    compliant, instantly timestamped.
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon
                  className="mt-1 h-6 w-6 flex-none"
                  style={{ color: '#14b8a6' }}
                />
                <div>
                  <dt
                    className="mb-2 font-semibold"
                    style={{ color: '#0E1A2B' }}
                  >
                    Instant PDF Generation
                  </dt>
                  <dd style={{ color: '#6B7280' }}>
                    Professional MPX forms generated immediately. Email, print,
                    or store digitally.
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon
                  className="mt-1 h-6 w-6 flex-none"
                  style={{ color: '#14b8a6' }}
                />
                <div>
                  <dt
                    className="mb-2 font-semibold"
                    style={{ color: '#0E1A2B' }}
                  >
                    Works Offline
                  </dt>
                  <dd style={{ color: '#6B7280' }}>
                    Pilots can complete forms without internet connection. Data
                    syncs when back online.
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon
                  className="mt-1 h-6 w-6 flex-none"
                  style={{ color: '#14b8a6' }}
                />
                <div>
                  <dt
                    className="mb-2 font-semibold"
                    style={{ color: '#0E1A2B' }}
                  >
                    Central Archive
                  </dt>
                  <dd style={{ color: '#6B7280' }}>
                    Every form automatically stored and searchable. No more
                    filing cabinets or lost records.
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon
                  className="mt-1 h-6 w-6 flex-none"
                  style={{ color: '#14b8a6' }}
                />
                <div>
                  <dt
                    className="mb-2 font-semibold"
                    style={{ color: '#0E1A2B' }}
                  >
                    Interactive Tug Configuration
                  </dt>
                  <dd style={{ color: '#6B7280' }}>
                    Visual tug placement interface for precise positioning.
                    Document tug arrangements with interactive vessel diagrams.
                  </dd>
                </div>
              </div>

              <div className="flex gap-x-4">
                <CheckCircleIcon
                  className="mt-1 h-6 w-6 flex-none"
                  style={{ color: '#14b8a6' }}
                />
                <div>
                  <dt
                    className="mb-2 font-semibold"
                    style={{ color: '#0E1A2B' }}
                  >
                    Captain&apos;s Portal - Pre-Arrival Briefings
                  </dt>
                  <dd style={{ color: '#6B7280' }}>
                    Share passage plan details with vessels before arrival.
                    Captains can review pilotage information, berth details, and local regulations in advance.
                  </dd>
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-2xl">
              <SmoothCarousel
                images={[
                  {
                    src: '/images/empx/carousel-1.png',
                    alt: 'Quick mooring arrangement selection',
                  },
                  {
                    src: '/images/empx/carousel-2.png',
                    alt: 'Night mode',
                  },
                  {
                    src: '/images/empx/carousel-3.png',
                    alt: 'Create personal notes and view stats',
                  },
                  {
                    src: '/images/empx/mpx-pilots-18.png',
                    alt: 'Weather conditions interface',
                  },
                  {
                    src: '/images/empx/mpx-pilots-19.png',
                    alt: 'Vessel details auto populate',
                  },
                  {
                    src: '/images/empx/mpx-pilots-20.png',
                    alt: 'Easily input vessel manoeuvring equipment',
                  },
                  {
                    src: '/images/empx/mpx-pilots-21.png',
                    alt: 'eMPX Towage configuration interface with tug assignments',
                  },
                  {
                    src: '/images/empx/mpx-pilots-22.png',
                    alt: 'Master Pilot Exchange checklist',
                  },
                  {
                    src: '/images/empx/mpx-pilots-23.png',
                    alt: 'eMPX Digital signature capture for pilot and master confirmation',
                  },
                  {
                    src: '/images/empx/mpx-report-pdf.jpg',
                    alt: 'eMPX generated PDF report showing complete Master/Pilot Exchange document',
                  },
                ]}
                width={300}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Pilots Section */}
      <section
        className="py-16 sm:py-20"
        style={{ backgroundColor: '#f9fafb' }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Designed for Real-World Use
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              SeaReady eMPX is built to work in the real conditions pilots face every day -
              fast-paced operations, variable connectivity, and tight schedules.
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <div
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-6 w-6" style={{ color: '#0891B2' }} />
                <h3 className="text-lg font-semibold text-gray-900">
                  Speed
                </h3>
              </div>
              <p
                className="mb-3 text-xl font-bold"
                style={{ color: '#0891B2' }}
              >
                3 minutes
                <br />
                not 15
              </p>
              <p className="text-sm text-gray-600">
                Complete an MPX form in the time it takes to walk from gangway to
                bridge.
              </p>
            </div>

            <div
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-6 w-6" style={{ color: '#0891B2' }} />
                <h3 className="text-lg font-semibold text-gray-900">
                  Accuracy
                </h3>
              </div>
              <p
                className="mb-3 text-xl font-bold"
                style={{ color: '#0891B2' }}
              >
                Zero
                <br />
                errors
              </p>
              <p className="text-sm text-gray-600">
                Vessel data populated directly from port systems. You verify,
                not transcribe.
              </p>
            </div>

            <div
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                <Wifi className="h-6 w-6" style={{ color: '#0891B2' }} />
                <h3 className="text-lg font-semibold text-gray-900">
                  Reliability
                </h3>
              </div>
              <p
                className="mb-3 text-xl font-bold"
                style={{ color: '#0891B2' }}
              >
                Works
                <br />
                anywhere
              </p>
              <p className="text-sm text-gray-600">
                Offline capability means you&apos;re never blocked. No wifi on
                the bridge? No problem.
              </p>
            </div>

            <div
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                <FileCheck className="h-6 w-6" style={{ color: '#0891B2' }} />
                <h3 className="text-lg font-semibold text-gray-900">
                  Professional
                </h3>
              </div>
              <p
                className="mb-3 text-xl font-bold"
                style={{ color: '#0891B2' }}
              >
                Instant
                <br />
                access
              </p>
              <p className="text-sm text-gray-600">
                Reports instantly accessible by all users. PDF immediately available for download.
              </p>
            </div>

            <div
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                <Fingerprint className="h-6 w-6" style={{ color: '#0891B2' }} />
                <h3 className="text-lg font-semibold text-gray-900">
                  Secure Login
                </h3>
              </div>
              <p
                className="mb-3 text-xl font-bold"
                style={{ color: '#0891B2' }}
              >
                Face ID
                <br />
                Touch ID
              </p>
              <p className="text-sm text-gray-600">
                Biometric authentication with Face ID, Touch ID, Windows Hello, or fingerprint. No passwords to remember or share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Section - Dark Background */}
      <section className="bg-gray-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Analytics Layout - Desktop Image on Left, Cards on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Desktop Analytics Image */}
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="/images/empx/Analytics.jpg"
                  alt="Full analytics dashboard showing vessel types, harbour operations, berth usage, and operational trends"
                  width={700}
                  height={525}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right side - Title and 3 Cards */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              {/* Title above cards */}
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-3">
                  Powerful Analytics Dashboard
                </h2>
                <p className="text-lg text-gray-300">
                  Transform your port data into actionable insights
                </p>
              </div>

              {/* 3 Cards */}
              <div className="space-y-4">
                <div className="rounded-lg bg-white/10 backdrop-blur p-5 border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 flex-shrink-0">
                      <CheckCircleIcon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 text-lg">Busiest Periods</h3>
                      <p className="text-sm text-gray-300">
                        Identify peak 3-4 hour windows for optimal resource planning and staffing
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-white/10 backdrop-blur p-5 border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 flex-shrink-0">
                      <CheckCircleIcon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 text-lg">Vessel/Harbour Analytics</h3>
                      <p className="text-sm text-gray-300">
                        Clear vessel type distribution and traffic patterns with detailed breakdowns
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-white/10 backdrop-blur p-5 border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 flex-shrink-0">
                      <CheckCircleIcon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 text-lg">Operational Trends & Insights</h3>
                      <p className="text-sm text-gray-300">
                        Track UKC margins, berth usage patterns, vessel types, and port traffic trends
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Harbour Management Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: '#0E1A2B' }}
            >
              Complete Oversight for Harbour Management
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Everything you need to manage pilot operations efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <ChartBarIcon className="h-5 w-5" style={{ color: '#0891B2' }} />
                <h3
                  className="text-lg font-semibold"
                  style={{ color: '#0E1A2B' }}
                >
                  Live Operations
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                See all active pilot jobs in real-time. Know which pilots are
                on which vessels, job status, and completion times.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <FolderOpenIcon className="h-5 w-5" style={{ color: '#0891B2' }} />
                <h3
                  className="text-lg font-semibold"
                  style={{ color: '#0E1A2B' }}
                >
                  Searchable Archive
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Every MPX form instantly accessible. Search by vessel name,
                IMO, pilot, date range, or berth. Export for audits.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <ChartBarIcon className="h-5 w-5" style={{ color: '#0891B2' }} />
                <h3
                  className="text-lg font-semibold"
                  style={{ color: '#0E1A2B' }}
                >
                  Analytics Button
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                One-click access to comprehensive analytics dashboard showing
                trends, patterns, and operational insights.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <MagnifyingGlassIcon className="h-5 w-5" style={{ color: '#0891B2' }} />
                <h3
                  className="text-lg font-semibold"
                  style={{ color: '#0E1A2B' }}
                >
                  Audit Trail
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Every form submission, edit, and access logged with timestamp
                and user. Ready for MCA and harbour authority audits.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <CheckBadgeIcon className="h-5 w-5" style={{ color: '#0891B2' }} />
                <h3
                  className="text-lg font-semibold"
                  style={{ color: '#0E1A2B' }}
                >
                  Compliance
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Demonstrate compliance with SOLAS MPX requirements for MCA inspections and harbour authority audits. All
                records organized and exportable.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow">
              <h3
                className="mb-3 text-lg font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                <Users className="inline-block h-5 w-5 mr-2" style={{ color: '#0891B2' }} />
                Role-Based Access
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Give harbour management read-only access to oversee operations
                without interfering with pilot workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Dashboard Showcase - Full Width */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: '#0E1A2B' }}
            >
              Complete Port Operations Dashboard
            </h2>
            <p
              className="mt-4 text-lg"
              style={{ color: '#6B7280' }}
            >
              Full visibility of all pilot operations in real-time
            </p>
          </div>

          {/* Full width desktop view showcase */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <Image
                src="/images/empx/Dash_Desktop_MPX.jpg"
                alt="SeaReady eMPX Complete Port Operations Dashboard showing live vessel movements, pilot assignments, and berth operations"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Feature callouts */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full mb-3"
                  style={{ backgroundColor: '#e0f2fe' }}
                >
                  <CheckCircleIcon
                    className="h-6 w-6"
                    style={{ color: '#0891B2' }}
                  />
                </div>
                <h3 className="font-semibold" style={{ color: '#0E1A2B' }}>
                  Job Management
                </h3>
                <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
                  Live status of all pilot assignments
                </p>
              </div>

              <div className="text-center">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full mb-3"
                  style={{ backgroundColor: '#e0f2fe' }}
                >
                  <CheckCircleIcon
                    className="h-6 w-6"
                    style={{ color: '#0891B2' }}
                  />
                </div>
                <h3 className="font-semibold" style={{ color: '#0E1A2B' }}>
                  Tide Data
                </h3>
                <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
                  Integrated tide information
                </p>
              </div>

              <div className="text-center">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full mb-3"
                  style={{ backgroundColor: '#e0f2fe' }}
                >
                  <CheckCircleIcon
                    className="h-6 w-6"
                    style={{ color: '#0891B2' }}
                  />
                </div>
                <h3 className="font-semibold" style={{ color: '#0E1A2B' }}>
                  Analytics Dashboard
                </h3>
                <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
                  Busiest periods, vessel types, berth usage, UKC trends, port traffic patterns
                </p>
              </div>

              <div className="text-center">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full mb-3"
                  style={{ backgroundColor: '#e0f2fe' }}
                >
                  <CheckCircleIcon
                    className="h-6 w-6"
                    style={{ color: '#0891B2' }}
                  />
                </div>
                <h3 className="font-semibold" style={{ color: '#0E1A2B' }}>
                  Document Archive
                </h3>
                <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
                  Instant access to all MPX records
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Archive Showcase Section - Dark Background */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: '#0E1A2B' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Archive Layout - Desktop Image on Left, Cards on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Archive Image */}
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="/images/empx/MPX_Archive.png"
                  alt="eMPX Archive interface showing searchable database of all Master/Pilot Exchange records"
                  width={700}
                  height={525}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right side - Title and 3 Cards */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              {/* Title above cards */}
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-3">
                  Search & Archive
                </h2>
                <p className="text-lg text-gray-300">
                  Every MPX form instantly searchable. Find any record in seconds.
                </p>
              </div>

              {/* 3 Feature Cards stacked */}
              <div className="space-y-4">
                {/* Instant Search */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all">
                  <div className="flex items-start">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0"
                      style={{ backgroundColor: 'rgba(8, 145, 178, 0.2)' }}
                    >
                      <Search className="h-6 w-6" style={{ color: '#06b6d4' }} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">
                        Instant Search
                      </h3>
                      <p className="mt-1 text-sm text-gray-300">
                        Find any MPX by vessel, pilot, IMO, or date in milliseconds
                      </p>
                    </div>
                  </div>
                </div>

                {/* Export Ready */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all">
                  <div className="flex items-start">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0"
                      style={{ backgroundColor: 'rgba(8, 145, 178, 0.2)' }}
                    >
                      <Download className="h-6 w-6" style={{ color: '#06b6d4' }} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">
                        Export Ready
                      </h3>
                      <p className="mt-1 text-sm text-gray-300">
                        Download records for audits, compliance checks, or analysis
                      </p>
                    </div>
                  </div>
                </div>

                {/* Secure Storage */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all">
                  <div className="flex items-start">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0"
                      style={{ backgroundColor: 'rgba(8, 145, 178, 0.2)' }}
                    >
                      <Lock className="h-6 w-6" style={{ color: '#06b6d4' }} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">
                        Secure Storage
                      </h3>
                      <p className="mt-1 text-sm text-gray-300">
                        All records encrypted and backed up with unlimited retention
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-16 sm:py-20"
        style={{
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: '#0E1A2B' }}
            >
              Simple to Deploy, Risk-Free to Trial
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div
                className="mb-4 text-4xl font-bold"
                style={{ color: '#0891B2' }}
              >
                1
              </div>
              <h3
                className="mb-3 text-xl font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                Connect to Your Systems
              </h3>
              <p className="mb-4 text-sm" style={{ color: '#6B7280' }}>
                We integrate with your existing port management systems in
                read-only mode. No disruption to your current operations.
                Compatibility assessment included.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div
                className="mb-4 text-4xl font-bold"
                style={{ color: '#0891B2' }}
              >
                2
              </div>
              <h3
                className="mb-3 text-xl font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                Trial with 1-3 Pilots
              </h3>
              <p className="mb-4 text-sm" style={{ color: '#6B7280' }}>
                4-8 week pilot programme. Your pilots test SeaReady eMPX on real jobs
                while paper forms continue as backup. No commitment required.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div
                className="mb-4 text-4xl font-bold"
                style={{ color: '#0891B2' }}
              >
                3
              </div>
              <h3
                className="mb-3 text-xl font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                Roll Out to All Pilots
              </h3>
              <p className="mb-4 text-sm" style={{ color: '#6B7280' }}>
                Based on pilot success, roll out to your full pilot team.
                Training, support, and harbour dashboard included.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg font-semibold" style={{ color: '#0E1A2B' }}>
              No upfront commitment. See it working with your systems before you
              decide.
            </p>
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section
        className="py-16 sm:py-20"
        style={{
          backgroundColor: '#fafafa',
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: '#0E1A2B' }}
            >
              Secure, Compliant, Auditable
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#6B7280' }}>
              Built with enterprise-grade security from day one
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            <details className="rounded-lg bg-gray-50 p-6">
              <summary
                className="cursor-pointer text-lg font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                How does biometric login work?
              </summary>
              <div className="mt-4 space-y-3" style={{ color: '#6B7280' }}>
                <p>
                  SeaReady eMPX supports biometric authentication across all major platforms - Face ID and Touch ID on iOS/macOS, Windows Hello on Windows devices, and fingerprint authentication on Android.
                </p>
                <p>
                  This means pilots can log in instantly without typing passwords, which is especially useful on the bridge when wearing gloves or in challenging conditions. Your biometric data never leaves your device - it&apos;s used only for local authentication.
                </p>
              </div>
            </details>

            <details className="rounded-lg bg-gray-50 p-6">
              <summary
                className="cursor-pointer text-lg font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                Is our data secure?
              </summary>
              <div className="mt-4 space-y-3" style={{ color: '#6B7280' }}>
                <p>
                  Yes. SeaReady eMPX uses enterprise-grade encryption (TLS 1.3 in
                  transit, AES-256 at rest), with enterprise hosting options available on request.
                  Multi-factor authentication is available for enterprise deployments. All data hosted in UK/EU data
                  centers.
                </p>
                <p>
                  Full security documentation available for your IT team to
                  review.
                </p>
              </div>
            </details>

            <details className="rounded-lg bg-gray-50 p-6">
              <summary
                className="cursor-pointer text-lg font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                Can this disrupt our port systems?
              </summary>
              <div className="mt-4 space-y-3" style={{ color: '#6B7280' }}>
                <p>
                  No. SeaReady eMPX integrates in read-only mode only - it cannot modify,
                  delete, or write any data to your port management systems. It
                  retrieves data the same way a pilot viewing a screen would.
                </p>
                <p>
                  eMPX can be switched off instantly without any impact on your
                  existing systems.
                </p>
              </div>
            </details>

            <details className="rounded-lg bg-gray-50 p-6">
              <summary
                className="cursor-pointer text-lg font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                Is this GDPR compliant?
              </summary>
              <div className="mt-4 space-y-3" style={{ color: '#6B7280' }}>
                <p>
                  Yes, fully compliant. We collect only operationally necessary
                  data, provide clear privacy controls, and store data
                  exclusively in UK/EU regions. Data Processing Agreements
                  provided with every contract.
                </p>
              </div>
            </details>

            <details className="rounded-lg bg-gray-50 p-6">
              <summary
                className="cursor-pointer text-lg font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                Will this work with our port systems?
              </summary>
              <div className="mt-4 space-y-3" style={{ color: '#6B7280' }}>
                <p>
                  SeaReady eMPX is designed to integrate with modern port management
                  systems. During our discovery phase, we assess compatibility
                  with your specific setup at no obligation.
                </p>
                <p>
                  Most ports use systems we can integrate with. If yours is
                  unique, we&apos;ll discuss options.
                </p>
              </div>
            </details>

            <details className="rounded-lg bg-gray-50 p-6">
              <summary
                className="cursor-pointer text-lg font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                Who owns the data?
              </summary>
              <div className="mt-4 space-y-3" style={{ color: '#6B7280' }}>
                <p>
                  You do. All MPX records created at your port belong to you.
                  Export your data anytime in standard formats (PDF, CSV, JSON).
                  No lock-in.
                </p>
              </div>
            </details>

            <details className="rounded-lg bg-gray-50 p-6">
              <summary
                className="cursor-pointer text-lg font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                What if we need an independent security audit?
              </summary>
              <div className="mt-4 space-y-3" style={{ color: '#6B7280' }}>
                <p>
                  We welcome third-party security reviews. Source code available
                  for review under NDA. We can also commission an independent
                  audit if required for your procurement process.
                </p>
              </div>
            </details>

            <details className="rounded-lg bg-gray-50 p-6">
              <summary
                className="cursor-pointer text-lg font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                Where is the platform hosted?
              </summary>
              <div className="mt-4 space-y-3" style={{ color: '#6B7280' }}>
                <p>
                  SeaReady eMPX runs on Microsoft Azure — the same cloud infrastructure trusted by major banks, government agencies, and maritime organisations worldwide. All data is stored in Azure&apos;s European data centres, ensuring full GDPR compliance.
                </p>
              </div>
            </details>

            <details className="rounded-lg bg-gray-50 p-6">
              <summary
                className="cursor-pointer text-lg font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                What certifications does the hosting have?
              </summary>
              <div className="mt-4 space-y-3" style={{ color: '#6B7280' }}>
                <p>
                  Our Azure infrastructure holds ISO 27001, SOC 2 Type II, and Cyber Essentials Plus certifications. Azure is also listed on the UK Government&apos;s G-Cloud framework for approved cloud suppliers.
                </p>
              </div>
            </details>

            <details className="rounded-lg bg-gray-50 p-6">
              <summary
                className="cursor-pointer text-lg font-semibold"
                style={{ color: '#0E1A2B' }}
              >
                What about backups and disaster recovery?
              </summary>
              <div className="mt-4 space-y-3" style={{ color: '#6B7280' }}>
                <p>
                  Azure Database for PostgreSQL provides automated daily backups with 35-day retention and point-in-time recovery. Your operational data is protected against both accidental deletion and system failures.
                </p>
              </div>
            </details>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-lg bg-gray-50 p-8">
            <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-3">
              <div>
                <Shield className="mb-2 h-8 w-8 mx-auto" style={{ color: '#0891B2' }} />
                <div
                  className="text-sm font-semibold"
                  style={{ color: '#0E1A2B' }}
                >
                  ISO 27001
                </div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  Certified infrastructure
                </div>
              </div>
              <div>
                <Flag className="mb-2 h-8 w-8 mx-auto" style={{ color: '#0891B2' }} />
                <div
                  className="text-sm font-semibold"
                  style={{ color: '#0E1A2B' }}
                >
                  EU Data Centres
                </div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  Azure European region
                </div>
              </div>
              <div>
                <CheckCircle className="mb-2 h-8 w-8 mx-auto" style={{ color: '#0891B2' }} />
                <div
                  className="text-sm font-semibold"
                  style={{ color: '#0E1A2B' }}
                >
                  SOC 2 Type II
                </div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  Audited security controls
                </div>
              </div>
              <div>
                <Shield className="mb-2 h-8 w-8 mx-auto" style={{ color: '#0891B2' }} />
                <div
                  className="text-sm font-semibold"
                  style={{ color: '#0E1A2B' }}
                >
                  GDPR Compliant
                </div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  Full DPA included
                </div>
              </div>
              <div>
                <ClipboardCheck className="mb-2 h-8 w-8 mx-auto" style={{ color: '#0891B2' }} />
                <div
                  className="text-sm font-semibold"
                  style={{ color: '#0E1A2B' }}
                >
                  Full Audit Trail
                </div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  Every action logged
                </div>
              </div>
              <div>
                <CheckCircle className="mb-2 h-8 w-8 mx-auto" style={{ color: '#0891B2' }} />
                <div
                  className="text-sm font-semibold"
                  style={{ color: '#0E1A2B' }}
                >
                  99.95% SLA
                </div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  Enterprise availability
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
            Ready to Transform Your Pilot Operations?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            See SeaReady eMPX in action at your port. No commitment, no pressure - just a clear demonstration of how we can save your pilots time and give harbour management complete oversight.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: '#c65d00' }}
            >
              Request a Demo
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-semibold bg-white transition-all hover:bg-gray-100 shadow-lg"
              style={{ color: '#0891B2' }}
            >
              Contact for Pricing
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
              <div className="text-cyan-400 font-bold text-lg mb-2">No Risk</div>
              <p className="text-gray-300 text-sm">
                Trial with 1-3 pilots before committing. Paper backup continues during trial.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
              <div className="text-cyan-400 font-bold text-lg mb-2">UK Company</div>
              <p className="text-gray-300 text-sm">
                Built by a serving marine pilot. Fully insured and GDPR compliant.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
              <div className="text-cyan-400 font-bold text-lg mb-2">Full Support</div>
              <p className="text-gray-300 text-sm">
                Pilot training, harbour dashboard, and ongoing support included.
              </p>
            </div>
          </div>

          <p className="mt-10 text-gray-400">
            Questions? Email{' '}
            <a
              href="mailto:support@seaready.co.uk"
              className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              support@seaready.co.uk
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter
        product={copy.footer.product}
        company={copy.footer.company}
        resources={copy.footer.resources}
        legal={copy.footer.legal}
        copyright={copy.footer.copyright}
      />
    </div>
  )
}
