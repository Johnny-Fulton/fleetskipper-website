// Kitchen Sink - Internal design system preview
// NO INDEXING - This is for internal use only

import { Button, FeatureCard, SectionHeader } from '@/components/primitives'
import { copy } from '@/content/strings'
import { CheckCircleIcon, ShieldCheckIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Design System - SeaReady',
  robots: 'noindex, nofollow',
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-navy text-white">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold">SeaReady Design System</h1>
          <p className="mt-2 text-white/80">Internal component preview (not indexed)</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-16">
        
        {/* Color Tokens */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Color Tokens</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-24 bg-ink rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Ink</p>
              <p className="text-xs text-gray-500">text-ink / bg-ink</p>
            </div>
            <div>
              <div className="h-24 bg-navy rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Navy</p>
              <p className="text-xs text-gray-500">text-navy / bg-navy</p>
            </div>
            <div>
              <div className="h-24 bg-navy2 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Navy2</p>
              <p className="text-xs text-gray-500">text-navy2 / bg-navy2</p>
            </div>
            <div>
              <div className="h-24 bg-sea-teal rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Sea Teal</p>
              <p className="text-xs text-gray-500">text-sea-teal / bg-sea-teal</p>
            </div>
            <div>
              <div className="h-24 bg-brand-orange rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Brand Orange</p>
              <p className="text-xs text-gray-500">text-brand-orange / bg-brand-orange</p>
            </div>
            <div>
              <div className="h-24 bg-gray-50 border rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Gray 50</p>
              <p className="text-xs text-gray-500">bg-gray-50</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Typography</h2>
          <div className="space-y-4">
            <div>
              <h1 className="font-display text-5xl font-bold text-ink">Display Heading</h1>
              <p className="text-xs text-gray-500 mt-1">font-display text-5xl font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-ink">Page Heading</h2>
              <p className="text-xs text-gray-500 mt-1">text-3xl font-bold</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ink">Section Heading</h3>
              <p className="text-xs text-gray-500 mt-1">text-xl font-semibold</p>
            </div>
            <div>
              <p className="text-base text-gray-600">Body text for main content areas. This is how regular paragraphs appear.</p>
              <p className="text-xs text-gray-500 mt-1">text-base text-gray-600</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Small text for captions and metadata</p>
              <p className="text-xs text-gray-500 mt-1">text-sm text-gray-500</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="navy">Navy Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button href="/pricing">Primary Link</Button>
            <Button variant="secondary" href="/about">Secondary Link</Button>
          </div>
        </section>

        {/* Section Header */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Section Headers</h2>
          <SectionHeader 
            eyebrow="Component Preview"
            title="This is a Section Header"
            subtitle="Used to introduce major content sections with consistent styling and spacing"
          />
        </section>

        {/* Feature Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Feature Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<CheckCircleIcon className="h-6 w-6" />}
              eyebrow="Compliance"
              title="Smart Compliance Engine"
              description="Pre-configured for UK Workboat Code with automatic updates when regulations change"
            />
            <FeatureCard
              icon={<ShieldCheckIcon className="h-6 w-6" />}
              eyebrow="Safety"
              title="Crew & Certificates"
              description="Track qualifications, medical certificates, and training with automatic expiry alerts"
            />
            <FeatureCard
              icon={<ClockIcon className="h-6 w-6" />}
              eyebrow="Maintenance"
              title="Planned Maintenance"
              description="Schedule and track maintenance tasks with manufacturer recommendations built-in"
            />
          </div>
        </section>

        {/* Status Alerts */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Status Alerts</h2>
          <div className="space-y-4 max-w-2xl">
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <div className="flex">
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Success</h3>
                  <p className="mt-1 text-sm text-green-700">Your subscription is active and all features are enabled.</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
              <div className="flex">
                <ClockIcon className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Trial Ending</h3>
                  <p className="mt-1 text-sm text-yellow-700">Your trial ends in 7 days. Add payment method to continue.</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
              <div className="flex">
                <DocumentTextIcon className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Payment Required</h3>
                  <p className="mt-1 text-sm text-red-700">Your subscription is past due. Update payment method to restore access.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Status Badges */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Status Badges</h2>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
              Active
            </span>
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800">
              Trialing
            </span>
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
              Past Due
            </span>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800">
              Canceled
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
              Incomplete
            </span>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Cards</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="rounded-2xl bg-white p-6 shadow-card border border-gray-100">
              <h3 className="text-lg font-semibold text-ink">Basic Card</h3>
              <p className="mt-2 text-gray-600">This is a basic card with shadow and border. Used for grouping related content.</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-ink">Gray Card</h3>
              <p className="mt-2 text-gray-600">Alternative card style with gray background for secondary content.</p>
            </div>
          </div>
        </section>

        {/* Empty States */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Empty States</h2>
          <div className="max-w-lg">
            <div className="text-center py-12 px-6 border-2 border-dashed border-gray-300 rounded-lg">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No documents</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by uploading your first document.</p>
              <div className="mt-6">
                <Button variant="secondary">Upload Document</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing Rhythm */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Spacing Rhythm</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 w-20">space-y-2</span>
              <div className="flex-1 space-y-2">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm text-gray-500 w-20">space-y-4</span>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm text-gray-500 w-20">space-y-8</span>
              <div className="flex-1 space-y-8">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}