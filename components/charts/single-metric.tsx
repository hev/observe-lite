"use client"

import { formatValue } from "@/lib/utils"

interface SingleMetricProps {
  data: any
}

export function SingleMetric({ data }: SingleMetricProps) {
  if (!data || !data.data || !data.data.result || data.data.result.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="text-sm text-muted-foreground">No data available</p>
      </div>
    )
  }

  // Get the first series
  const series = data.data.result[0]

  // Get the latest value
  const values = series.values
  const latestValue = values.length > 0 ? Number.parseFloat(values[values.length - 1][1]) : 0

  // Calculate change from previous value if available
  let change = 0
  let changePercent = 0

  if (values.length > 1) {
    const previousValue = Number.parseFloat(values[values.length - 2][1])
    change = latestValue - previousValue
    changePercent = previousValue !== 0 ? (change / previousValue) * 100 : 0
  }

  // Format the metric name
  const metricName = series.metric.__name__ || "Metric"

  // Get additional labels to display
  const labels = Object.entries(series.metric)
    .filter(([key]) => key !== "__name__")
    .map(([key, value]) => `${key}="${value}"`)
    .join(", ")

  return (
    <div className="flex flex-col items-center justify-center h-[200px] p-4">
      <div className="text-sm text-muted-foreground mb-2">{metricName}</div>
      <div className="text-4xl font-bold">{formatValue(latestValue)}</div>

      {change !== 0 && (
        <div className={`text-sm mt-2 ${change > 0 ? "text-green-500" : "text-red-500"}`}>
          {change > 0 ? "↑" : "↓"} {formatValue(Math.abs(change))} ({changePercent.toFixed(2)}%)
        </div>
      )}

      {labels && <div className="text-xs text-muted-foreground mt-4 truncate max-w-full">{labels}</div>}
    </div>
  )
}

