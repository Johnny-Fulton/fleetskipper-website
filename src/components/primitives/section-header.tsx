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
            'text-xs md:text-sm font-semibold uppercase tracking-widest mb-3'
          )}
          style={{ color: dark ? '#33b8d6' : '#00a8cc' }}
        >
          {eyebrow}
        </div>
      )}
      <h2 className={clsx(
        'font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
        dark ? 'text-white' : 'text-ink'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={clsx(
          'text-base md:text-lg lg:text-xl mt-4 leading-relaxed',
          dark ? 'text-slate-300' : 'text-body-text'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
