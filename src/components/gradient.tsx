import { clsx } from 'clsx'

export function Gradient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'bg-linear-115 from-[#f0f9ff] from-28% via-[#e0f2fe] via-70% to-[#bfdbfe] opacity-60 sm:bg-linear-145',
      )}
    />
  )
}

export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'absolute -top-44 -right-60 h-60 w-xl transform-gpu md:right-0',
          'bg-linear-115 from-[#f0f9ff] from-28% via-[#e0f2fe] via-70% to-[#dbeafe]',
          'rotate-[-10deg] rounded-full blur-3xl opacity-50',
        )}
      />
    </div>
  )
}
