import Image from 'next/image'
import { Button } from '@/components/primitives'
import { CheckCircleIcon } from '@heroicons/react/16/solid'

export default function HeroFull() {
  return (
    <div className="relative bg-gray-900">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-vessel2.jpg"
          alt="Maritime workboat at sea"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-48">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Manage your fleet effortlessly with digital SMS
          </h1>
          <p className="mt-6 text-xl text-gray-100">
            Built by mariners for mariners. Compliant with WBC3 and IWC. 
            Works offline when you need it most.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button 
              href="/demo" 
              className="bg-orange-500 hover:bg-orange-600 border-transparent text-white px-6 py-3 text-base font-semibold"
            >
              Request Demo
            </Button>
            <Button 
              variant="secondary" 
              href="/pricing"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              View Pricing
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-gray-200">
            <div className="flex items-center gap-x-2">
              <CheckCircleIcon className="h-5 w-5 text-teal-400" />
              <span>WBC3 Compliant</span>
            </div>
            <div className="flex items-center gap-x-2">
              <CheckCircleIcon className="h-5 w-5 text-teal-400" />
              <span>IWC Compatible</span>
            </div>
            <div className="flex items-center gap-x-2">
              <CheckCircleIcon className="h-5 w-5 text-teal-400" />
              <span>Works Offline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}