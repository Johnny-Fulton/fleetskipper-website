import { Container } from '@/components/container'
import { SectionHeader, Button } from '@/components/primitives'

const steps = [
  {
    number: '1',
    title: 'Tell us about your vessels',
    description: 'Setup wizard asks for vessel type, where you operate, and crew size. Takes 5 minutes.',
    features: ['Works for any vessel type', 'Multiple vessels supported', 'Choose WBC3 or IWC'],
  },
  {
    number: '2',
    title: 'We build your SMS',
    description: 'The right procedures, maintenance checks, and drill plans for your vessel. No generic templates.',
    features: ['100+ preloaded maintenance checks', 'Drill schedules included', 'All documents prepared'],
  },
  {
    number: '3',
    title: 'Add your crew',
    description: 'Send email invites. Each person gets their own login and sees only what they need.',
    features: ['Simple invites', 'Roles and permissions set', 'Works on any device'],
  },
  {
    number: '4',
    title: 'Start using it',
    description: 'Begin logging drills, defects, and maintenance right away. Everything syncs when you\'re back online.',
    features: ['Start immediately', 'Automatic reminders', 'Ready for inspections'],
  },
]

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="bg-gradient-to-br from-slate-50 to-white py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          title="Ready-to-use Safety Management System in 30 minutes"
          subtitle="No consultants. No waiting. Just answer a few questions and your SMS is ready to use."
        />

        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
          <div className="relative">
            {/* Progress line for desktop */}
            <div className="absolute left-[10%] right-[10%] top-10 hidden h-0.5 bg-gray-300 lg:block -z-10" aria-hidden="true" />
            
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
              {steps.map((step) => (
                <div key={step.number} className="relative lg:text-center">
                  <div className="flex flex-col items-center">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg z-10" style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0891B2 100%)' }}>
                      <span className="text-3xl font-bold">{step.number}</span>
                    </div>
                    
                    <h3 className="mt-6 text-lg font-bold leading-7 text-ink">
                      {step.title}
                    </h3>
                    
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {step.description}
                    </p>
                    
                    <div className="mt-4 space-y-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center text-xs text-gray-500">
                          <svg className="mr-1.5 h-3 w-3" fill="#0891B2" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <Button href="/demo">
            See it in action
          </Button>
          <p className="text-sm text-gray-500">
            Join hundreds of UK vessels already using SeaReady
          </p>
        </div>
      </Container>
    </div>
  )
}