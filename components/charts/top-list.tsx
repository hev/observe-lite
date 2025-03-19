"use client"

import { formatValue } from "@/lib/utils"

interface TopListProps {
  data: any
}

export function TopList({ data }: TopListProps) {
  if (!data || !data.data || !data.data.result) {
    return <div className="text-center p-4">No data available</div>
  }

  // Calculate the latest value for each series
  const seriesWithLatestValues = data.data.result.map((series: any) => {
    const values = series.values
    const latestValue = values.length > 0 ? Number.parseFloat(values[values.length - 1][1]) : 0

    return {
      metric: series.metric,
      value: latestValue,
    }
  })

  // Sort by value in descending order
  seriesWithLatestValues.sort((a: any, b: any) => b.value - a.value)

  return (
    <div className="w-full h-[200px] overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-right p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {seriesWithLatestValues.map((item: any, index: number) => {
            // Determine which label to show
            const name = item.metric.pod || item.metric.instance || item.metric.__name__ || `Series ${index + 1}`

            return (
              <tr key={index} className="border-b hover:bg-muted">
                <td className="p-2 truncate max-w-[200px]">{name}</td>
                <td className="p-2 text-right font-mono">{formatValue(item.value)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

