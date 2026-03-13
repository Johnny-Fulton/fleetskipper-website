import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from '../link'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-5 py-3',
    'rounded-xl bg-orange-500',
    'text-sm font-semibold whitespace-nowrap text-white',
    'transition-all duration-200',
    'data-disabled:bg-orange-500 data-disabled:opacity-50 data-hover:bg-orange-600 hover:bg-orange-600',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 focus-visible:ring-offset-2',
  ),
  secondary: clsx(
    'relative inline-flex items-center justify-center px-5 py-3',
    'rounded-xl border border-slate-300 bg-white',
    'text-sm font-medium whitespace-nowrap text-slate-800',
    'transition-all duration-200',
    'data-disabled:bg-white data-disabled:opacity-50 data-hover:bg-slate-50 hover:bg-white/60',
  ),
  ghost: clsx(
    'inline-flex items-center justify-center px-5 py-3',
    'rounded-xl',
    'text-sm font-medium whitespace-nowrap text-slate-800',
    'transition-all duration-200',
    'data-disabled:opacity-50 data-hover:bg-slate-100 hover:bg-slate-100',
  ),
  navy: clsx(
    'inline-flex items-center justify-center px-5 py-3',
    'rounded-xl bg-navy',
    'text-sm font-medium whitespace-nowrap text-white',
    'transition-all duration-200',
    'data-disabled:bg-navy data-disabled:opacity-50 data-hover:bg-navy-light hover:bg-navy-light',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-5 py-3',
    'rounded-xl border-2 border-white/50',
    'text-sm font-medium whitespace-nowrap text-white',
    'transition-all duration-200',
    'data-disabled:opacity-50 data-hover:bg-white/10 data-hover:border-white hover:bg-white/10 hover:border-white',
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (Headless.ButtonProps & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant])

  if (typeof props.href === 'undefined') {
    return <Headless.Button {...props} className={className} as="button" />
  }

  return <Link {...props} className={className} />
}
