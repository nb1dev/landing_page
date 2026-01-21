import React from 'react'

export function ComparisonTableComponent({
  title,
  columns,
  rows,
}: {
  title?: string
  columns: Array<{ key: string; label: string }>
  rows: Array<{ productName: string; productUrl?: string; cells?: Record<string, any> }>
}) {
  if (!columns?.length || !rows?.length) return null

  return (
    <section className="my-10">
      <h2 className="text-xl font-semibold mb-4">{title || 'Comparison'}</h2>

      <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-[720px] w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Product</th>
              {columns.map((c) => (
                <th key={c.key} className="p-3">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b last:border-b-0">
                <td className="p-3 font-semibold">
                  {r.productUrl ? (
                    <a className="underline" href={r.productUrl}>
                      {r.productName}
                    </a>
                  ) : (
                    r.productName
                  )}
                </td>
                {columns.map((c) => (
                  <td key={c.key} className="p-3">
                    {String(r.cells?.[c.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
