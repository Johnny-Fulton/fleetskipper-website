import { 
  CheckCircleIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  DocumentTextIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
  WifiIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'
import { SectionHeader } from './section-header'

interface FeatureItem {
  eyebrow: string
  title: string
  description: string
}

interface FeatureGridProps {
  eyebrow?: string
  title: string
  items: FeatureItem[]
}

// Icon mapping for features
const getFeatureIcon = (eyebrow: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'Compliance': CheckCircleIcon,
    'Crew': ShieldCheckIcon, 
    'Maintenance': ClockIcon,
    'Safety': DocumentTextIcon,
    'Operations': UserGroupIcon,
    'Reporting': DocumentDuplicateIcon,
    'Offline': WifiIcon,
    'Setup': RocketLaunchIcon,
  }
  return iconMap[eyebrow] || CheckCircleIcon
}

export function FeatureGrid({ eyebrow, title, items }: FeatureGridProps) {
  return (
    <div className="bg-slate-900 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          dark={true}
        />
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {items.map((feature) => {
              return (
                <div key={feature.title} className="relative flex flex-col h-full rounded-xl bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
                  <dt className="mb-3">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#0891B2' }}>{feature.eyebrow}</p>
                    <p className="text-xl font-bold text-ink leading-tight min-h-[3.5rem]">{feature.title}</p>
                  </dt>
                  <dd className="text-sm leading-relaxed text-gray-600 flex-grow">
                    {feature.description}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </div>
  )
}