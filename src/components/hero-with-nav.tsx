import { Button } from '@/components/primitives'
import { CheckCircleIcon } from '@heroicons/react/16/solid'
import NavbarTransparent from '@/components/navbar-transparent'
import { copy } from '@/content/strings'

export default function HeroWithNav() {
  return (
    <div
      className="relative isolate min-h-[700px] bg-navy bg-cover bg-center bg-no-repeat after:absolute after:inset-0 after:bg-gradient-to-t after:from-navy/80 after:to-navy/20 after:content-['']"
      style={{ backgroundImage: 'url(/hero-workboat.jpg)' }}
      role="img"
      aria-label="Tugboat workboat operating in UK coastal waters"
    >

      {/* Navigation */}
      <NavbarTransparent />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8 lg:pt-48 lg:pb-48">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            {copy.hero.h1}
          </h1>
          <p className="mt-6 text-xl text-white/80 leading-relaxed">
            {copy.hero.sub}
          </p>
          <p className="mt-4 text-base text-white/70">
            {copy.hero.credibility}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button href="#get-started">
              {copy.hero.ctaPrimary}
            </Button>
            <Button variant="secondary" href="#pricing">
              {copy.hero.ctaSecondary}
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4 text-sm text-white/80">
            {copy.hero.badges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-x-2">
                <CheckCircleIcon className="h-5 w-5" style={{ color: '#0891B2' }} />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}