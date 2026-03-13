interface LogoRowProps {
  title?: string
  logos: string[]
}

export function LogoRow({ title, logos }: LogoRowProps) {
  return (
    <div className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {title && (
          <div className="mx-auto max-w-2xl text-center mb-8">
            <p className="text-sm font-semibold text-gray-600">{title}</p>
          </div>
        )}
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          {logos.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center rounded-xl bg-gradient-to-b from-white to-gray-50 px-4 py-3 shadow-sm ring-1 ring-gray-200">
              <span className="text-sm font-semibold text-ink">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}