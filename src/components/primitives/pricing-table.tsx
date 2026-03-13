import { CheckIcon } from '@heroicons/react/20/solid'

interface PricingPlan {
  name: string
  description: string
  price: string
  period: string
  features?: string[]
  featured?: boolean
}

interface PricingTableProps {
  eyebrow?: string
  title: string
  subtitle?: string
  plans: PricingPlan[]
  vatNote?: string
}

export function PricingTable({ 
  eyebrow, 
  title, 
  subtitle, 
  plans, 
  vatNote = "Prices exclude VAT. Billed in GBP."
}: PricingTableProps) {
  return (
    <div className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow && (
            <h2 className="text-base font-semibold leading-7 text-brand-orange">{eyebrow}</h2>
          )}
          <p className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </p>
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-gray-600">{subtitle}</p>
          )}
        </div>
        
        <div className="mx-auto mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ${
                plan.featured
                  ? 'ring-brand-orange shadow-md'
                  : 'ring-gray-200'
              } hover:shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-ink">
                    {plan.name}
                  </h3>
                  {plan.featured && (
                    <p className="rounded-full bg-brand-orange/10 px-2.5 py-1 text-xs font-semibold leading-5 text-brand-orange">
                      Most popular
                    </p>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{plan.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl md:text-5xl font-display font-bold tracking-tight text-ink">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm font-semibold leading-6 text-ink/70">
                      {plan.period}
                    </span>
                  )}
                </p>
                {plan.features && (
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-ink/80">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-sea-teal" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-8">
                <a 
                  className={`w-full inline-flex items-center justify-center rounded-full px-6 py-3 ${
                    plan.featured 
                      ? 'bg-brand-orange text-white' 
                      : 'bg-white text-ink ring-1 ring-gray-300 hover:bg-gray-50'
                  }`}
                  href={plan.price === 'Talk to us' ? '/contact' : '/pricing'}
                >
                  {plan.price === 'Talk to us' ? 'Contact sales' : 'Get started'}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {vatNote && (
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600">{vatNote}</p>
          </div>
        )}
      </div>
    </div>
  )
}