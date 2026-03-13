import { Button } from './button'
import { CheckCircleIcon } from '@heroicons/react/16/solid'

interface HeroProps {
  title: string
  subtitle: string
  credibility?: string
  ctaPrimary: string
  ctaSecondary?: string
  ctaPrimaryHref: string
  ctaSecondaryHref?: string
  badges?: string[]
  variant?: 'default' | 'mediaLeft'
}

export function Hero({
  title,
  subtitle,
  credibility,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryHref,
  ctaSecondaryHref,
  badges = [],
  variant = 'default'
}: HeroProps) {
  if (variant === 'mediaLeft') {
    return (
      <div className="relative bg-navy min-h-[700px] bg-cover bg-center bg-no-repeat overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero-workboat.jpg)' }}
        />
        <div className="absolute inset-0 bg-navy/20" />
        
        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8 lg:pt-48 lg:pb-48">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-xl text-white/90 leading-relaxed">
              {subtitle}
            </p>
            {credibility && (
              <p className="mt-4 text-base text-white/75">
                {credibility}
              </p>
            )}
            <div className="mt-10 flex items-center gap-x-6">
              <Button href={ctaPrimaryHref}>
                {ctaPrimary}
              </Button>
              {ctaSecondary && ctaSecondaryHref && (
                <Button variant="outline" href={ctaSecondaryHref}>
                  {ctaSecondary}
                </Button>
              )}
            </div>
            {badges.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4 text-sm text-white/80">
                {badges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-sea-teal" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {subtitle}
          </p>
          {credibility && (
            <p className="mt-4 text-base text-gray-500">
              {credibility}
            </p>
          )}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button href={ctaPrimaryHref}>
              {ctaPrimary}
            </Button>
            {ctaSecondary && ctaSecondaryHref && (
              <Button variant="secondary" href={ctaSecondaryHref}>
                {ctaSecondary}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}