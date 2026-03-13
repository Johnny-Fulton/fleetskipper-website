import { clsx } from 'clsx'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  dark?: boolean
  centered?: boolean
  className?: string
}

export function SectionHeader({ 
  eyebrow, 
  title, 
  subtitle, 
  dark = false,
  centered = true,
  className 
}: SectionHeaderProps) {
  return (
    <div className={clsx(
      centered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl',
      className
    )}>
      {eyebrow && (
        <div 
          className={clsx(
            'text-xs md:text-sm font-semibold uppercase tracking-widest',
            dark ? 'text-sea-teal' : 'text-sea-teal'
          )}
          style={{ color: dark ? '#0891B2' : '#0891B2' }}
        >
          {eyebrow}
        </div>
      )}
      <h2 className={clsx(
        'font-display text-3xl md:text-5xl font-bold tracking-tight mt-2',
        dark ? 'text-white' : 'text-ink'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={clsx(
          'text-base md:text-lg mt-4 leading-relaxed',
          dark ? 'text-slate-300' : 'text-slate-600'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}