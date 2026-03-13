import { 
  DocumentTextIcon, 
  CloudArrowDownIcon,
  ClipboardDocumentCheckIcon,
  DocumentDuplicateIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import { SectionHeader } from './section-header'

interface ResourceItem {
  title: string
  description: string
  type: 'gated' | 'free'
  icon?: string
  badge?: string
}

interface ResourceCardsProps {
  eyebrow?: string
  title: string
  subtitle?: string
  items: ResourceItem[]
  ctaText?: string
  ctaHref?: string
}

const getResourceIcon = (icon?: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'checklist': ClipboardDocumentCheckIcon,
    'template': DocumentDuplicateIcon,
    'guide': BookOpenIcon,
  }
  return iconMap[icon || ''] || DocumentTextIcon
}

const getBadgeColor = (badge?: string) => {
  const colorMap: Record<string, string> = {
    'Most Popular': 'bg-gradient-to-r from-brand-orange to-red-500 text-white',
    'Quick Start': 'bg-gradient-to-r from-sea-teal to-blue-500 text-white',
    'New': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
  }
  return colorMap[badge || ''] || 'bg-gray-100 text-gray-700'
}

export function ResourceCards({ 
  eyebrow, 
  title, 
  subtitle, 
  items, 
  ctaText = "View all resources",
  ctaHref = "/resources"
}: ResourceCardsProps) {
  return (
    <div className="relative py-24 sm:py-32 overflow-hidden" style={{ backgroundColor: '#0E1A2B' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full" style={{ backgroundColor: '#0891B2' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full" style={{ backgroundColor: '#c65d00' }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header - Dark Version */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          {eyebrow && (
            <h2 className="text-base font-semibold leading-7" style={{ color: '#0891B2' }}>
              {eyebrow}
            </h2>
          )}
          <p className="mt-2 text-4xl font-bold tracking-tight text-white">
            {title}
          </p>
          {subtitle && (
            <p className="mt-6 text-lg text-white/70">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="mx-auto mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {items.map((item, idx) => {
            const Icon = getResourceIcon(item.icon)
            return (
              <article 
                key={idx} 
                className="group relative flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:ring-gray-300"
              >
                {/* Badge */}
                {item.badge && (
                  <div className="absolute -top-3 right-6">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${getBadgeColor(item.badge)}`}>
                      {item.badge}
                    </span>
                  </div>
                )}
                
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-sea-teal/10 to-brand-orange/10 group-hover:from-sea-teal/20 group-hover:to-brand-orange/20 transition-colors">
                    <Icon className="h-8 w-8 text-sea-teal" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-ink mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                
                {/* Type indicator */}
                <div className="mt-6 mb-4">
                  <span className={`inline-flex items-center text-xs font-medium ${
                    item.type === 'gated' 
                      ? 'text-brand-orange' 
                      : 'text-sea-teal'
                  }`}>
                    {item.type === 'gated' ? '📧 Email required' : '✨ Instant download'}
                  </span>
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto">
                  <a 
                    className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-navy to-navy2 px-6 py-3 text-white font-semibold shadow-md transition-all hover:shadow-lg hover:from-navy2 hover:to-navy group-hover:scale-105" 
                    href={item.type === 'gated' ? '/resources' : '/downloads/drill-log-template.csv'}
                  >
                    <CloudArrowDownIcon className="h-5 w-5 mr-2" />
                    {item.type === 'gated' ? 'Get resource' : 'Download now'}
                  </a>
                </div>
              </article>
            )
          })}
        </div>
        
        <div className="mt-16 flex justify-center">
          <a
            href={ctaHref}
            className="inline-flex items-center font-semibold transition-colors group"
            style={{ color: '#0891B2' }}
          >
            {ctaText}
            <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}