/**
 * BlogTable Component
 *
 * Styled table component for blog posts with:
 * - Responsive design with horizontal scrolling on mobile
 * - Striped rows for better readability
 * - Header styling with SeaReady brand colors
 * - Hover effects
 */

export interface BlogTableProps {
  headers: string[]
  rows: (string | number)[][]
  caption?: string
  striped?: boolean
  compact?: boolean
  className?: string
}

export function BlogTable({
  headers,
  rows,
  caption,
  striped = true,
  compact = false,
  className = '',
}: BlogTableProps) {
  const cellPadding = compact ? 'px-4 py-2' : 'px-6 py-4'

  return (
    <div className={`my-8 overflow-x-auto ${className}`}>
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            {caption && (
              <caption className="bg-gray-50 px-6 py-3 text-left text-sm font-medium text-gray-700">
                {caption}
              </caption>
            )}
            <thead className="bg-primary-cyan">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`${cellPadding} text-left text-sm font-semibold text-white uppercase tracking-wider`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              className={`bg-white divide-y divide-gray-200 ${striped ? 'divide-y-0' : ''}`}
            >
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`
                    ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white'}
                    hover:bg-cyan-50 transition-colors
                  `}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`${cellPadding} text-sm text-body-text whitespace-nowrap`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/**
 * Comparison table variant - optimized for comparing features/products
 */
export function ComparisonTable({
  headers,
  rows,
  highlightColumn,
  className = '',
}: {
  headers: string[]
  rows: (string | number | boolean)[][]
  highlightColumn?: number
  className?: string
}) {
  return (
    <div className={`my-8 overflow-x-auto ${className}`}>
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-6 py-4 text-center text-sm font-bold uppercase tracking-wider ${
                      highlightColumn === index
                        ? 'bg-primary-cyan text-white'
                        : 'text-navy-900'
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                  {row.map((cell, cellIndex) => {
                    const isHighlighted = highlightColumn === cellIndex
                    const isBoolean = typeof cell === 'boolean'

                    return (
                      <td
                        key={cellIndex}
                        className={`px-6 py-4 text-sm text-center ${
                          isHighlighted ? 'bg-cyan-50 font-medium' : ''
                        } ${cellIndex === 0 ? 'text-left font-medium text-navy-900' : 'text-body-text'}`}
                      >
                        {isBoolean ? (
                          <span
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                              cell ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {cell ? '✓' : '—'}
                          </span>
                        ) : (
                          cell
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/**
 * Simple data table variant - minimal styling
 */
export function DataTable({
  headers,
  rows,
  className = '',
}: {
  headers: string[]
  rows: (string | number)[][]
  className?: string
}) {
  return (
    <div className={`my-8 overflow-x-auto ${className}`}>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-sm font-semibold text-navy-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-sm text-body-text"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
