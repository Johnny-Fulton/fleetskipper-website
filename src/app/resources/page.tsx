// app/resources/page.tsx
"use client";

import { copy } from "@/content/strings";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import NavbarTransparent from "@/components/navbar-transparent";

function ResourcesContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");
  const asset = searchParams.get("asset");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <NavbarTransparent />

      {/* Header */}
      <div className="relative bg-navy border-b overflow-hidden py-20 sm:py-28 lg:py-36">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/workboats/workboat-35-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {copy.resources.h1}
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/90">
              {copy.resources.sub}
            </p>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="max-w-5xl mx-auto rounded-lg bg-green-50 p-4 border border-green-200">
            <div className="flex">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Success! Check your email for the download link.
                  {asset === 'wbc3-checklist' && " We'll send the full version when it's ready."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="max-w-5xl mx-auto rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  Something went wrong. Please try again or contact support.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resources Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* WBC3 Checklist */}
          <article className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {copy.resources.wbc3.title}
                </h2>
                <p className="mt-2 text-gray-600">
                  {copy.resources.wbc3.description}
                </p>
                
                {/* Download Form */}
                <form action="/api/downloads" method="POST" className="mt-6 space-y-3">
                  <input type="hidden" name="asset" value="wbc3-checklist" />
                  <div className="space-y-3">
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder={copy.resources.form.name}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#14b8a6] focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20"
                    />
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder={copy.resources.form.email}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#14b8a6] focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#c65d00] px-6 py-2.5 text-white font-semibold hover:bg-[#c65d00]/90 transition-colors"
                  >
                    {copy.resources.wbc3.cta}
                  </button>
                </form>
                
                <p className="mt-3 text-xs text-gray-500">
                  {copy.resources.wbc3.note}
                </p>
              </div>
            </div>
          </article>

          {/* Drill Log Template */}
          <article className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v8m5-2h2" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {copy.resources.drillLog.title}
                </h2>
                <p className="mt-2 text-gray-600">
                  {copy.resources.drillLog.description}
                </p>
                
                <a
                  href="/downloads/drill-log-template.csv"
                  download
                  className="mt-6 inline-flex items-center rounded-lg bg-gray-900 px-6 py-2.5 text-white font-semibold hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  {copy.resources.drillLog.cta}
                </a>
              </div>
            </div>
          </article>

          {/* Coming Soon - More Resources */}
          <article className="rounded-2xl bg-white/50 border-2 border-dashed border-gray-200 p-8 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="font-semibold text-gray-600">More resources coming soon</h3>
              <p className="mt-2 text-sm text-gray-500">
                Maintenance schedules, crew checklists, and more
              </p>
            </div>
          </article>

        </div>
      </div>

      {/* Back to Home */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResourcesContent />
    </Suspense>
  );
}