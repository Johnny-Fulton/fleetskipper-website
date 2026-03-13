interface ClosingCtaProps {
  eyebrow?: string
  title: string
  subtitle?: string
  ctaText: string
  ctaHref: string
  tagline?: string
}

export function ClosingCta({ 
  eyebrow, 
  title, 
  subtitle, 
  ctaText, 
  ctaHref, 
  tagline 
}: ClosingCtaProps) {
  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl text-white" style={{ background: 'linear-gradient(135deg, #0C1A2A 0%, #1E3A5F 100%)' }}>
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
              {eyebrow && (
                <h2 className="text-base font-semibold leading-7 text-sea-teal" style={{ color: '#0891B2' }}>{eyebrow}</h2>
              )}
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl text-white" style={{ color: 'white' }}>
                {title}
              </h2>
              {subtitle && (
                <p className="mt-4 text-white/85" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {subtitle}
                </p>
              )}
              <div className="mt-8">
                <a className="inline-flex items-center rounded-full px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105" href={ctaHref} style={{ backgroundColor: '#F97316' }}>
                  {ctaText}
                </a>
              </div>
              {tagline && (
                <p className="mt-6 text-sm text-white/60" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {tagline}
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}