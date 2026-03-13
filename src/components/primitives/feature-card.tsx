import { clsx } from 'clsx'
import React from 'react'

interface FeatureCardProps {
  eyebrow?: string
  title: string
  description: string
  icon?: React.ReactNode
  dark?: boolean
  className?: string
  children?: React.ReactNode
}

export function FeatureCard({ 
  eyebrow, 
  title, 
  description,
  icon,
  dark = false,
  className,
  children
}: FeatureCardProps) {
  return (
    <div className={clsx(
      'rounded-2xl p-6',
      dark 
        ? 'bg-white/5 backdrop-blur border border-white/10' 
        : 'bg-white shadow-[0_6px_18px_rgba(2,6,23,0.05)] border border-slate-100',
      className
    )}>
      {(eyebrow || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon}
          {eyebrow && (
            <span className={clsx(
              'text-xs uppercase tracking-wider font-semibold',
              dark ? 'text-cyan-300' : 'text-cyan-700'
            )}>
              {eyebrow}
            </span>
          )}
        </div>
      )}
      <h3 className={clsx(
        'text-lg font-semibold',
        dark ? 'text-white' : 'text-slate-900'
      )}>
        {title}
      </h3>
      <p className={clsx(
        'mt-2 text-sm',
        dark ? 'text-slate-300' : 'text-slate-600'
      )}>
        {description}
      </p>
      {children}
    </div>
  )
}