"use client"

import { useEffect, useRef } from "react"
import { formatTimestamp, formatValue } from "@/lib/utils"

interface BarChartProps {
  data: any
}

export function BarChart({ data }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !data || !data.data || !data.data.result) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = { top: 20, right: 20, bottom: 30, left: 50 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Find min and max values
    let minValue = Number.POSITIVE_INFINITY
    let maxValue = Number.NEGATIVE_INFINITY
    let minTime = Number.POSITIVE_INFINITY
    let maxTime = Number.NEGATIVE_INFINITY

    data.data.result.forEach((series: any) => {
      series.values.forEach((point: [number, string]) => {
        const value = Number.parseFloat(point[1])
        minValue = Math.min(minValue, value)
        maxValue = Math.max(maxValue, value)
        minTime = Math.min(minTime, point[0])
        maxTime = Math.max(maxTime, point[0])
      })
    })

    // Add some padding to the value range
    const valueRange = maxValue - minValue
    minValue = Math.max(0, minValue - valueRange * 0.1)
    maxValue = maxValue + valueRange * 0.1

    // Draw axes
    ctx.strokeStyle = "#e2e8f0"
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.stroke()

    // Draw y-axis labels
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"

    const yTickCount = 5
    for (let i = 0; i <= yTickCount; i++) {
      const y = padding.top + chartHeight - (i / yTickCount) * chartHeight
      const value = minValue + (i / yTickCount) * (maxValue - minValue)
      ctx.fillText(formatValue(value), padding.left - 5, y)

      // Draw grid line
      ctx.strokeStyle = "#e2e8f0"
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    const xTickCount = 5
    for (let i = 0; i <= xTickCount; i++) {
      const x = padding.left + (i / xTickCount) * chartWidth
      const time = minTime + (i / xTickCount) * (maxTime - minTime)
      ctx.fillText(formatTimestamp(time), x, height - padding.bottom + 5)
    }

    // Draw data series
    const colors = [
      "#3b82f6", // blue
      "#ef4444", // red
      "#10b981", // green
      "#f59e0b", // amber
      "#8b5cf6", // purple
    ]

    // For bar charts, we need to determine the bar width
    // We'll use a subset of points to avoid overcrowding
    const maxBars = 20
    const allPoints: [number, number, number][] = [] // [time, value, seriesIndex]

    data.data.result.forEach((series: any, seriesIndex: number) => {
      series.values.forEach((point: [number, string]) => {
        allPoints.push([point[0], Number.parseFloat(point[1]), seriesIndex])
      })
    })

    // Sort by time
    allPoints.sort((a, b) => a[0] - b[0])

    // Sample points if there are too many
    const step = Math.max(1, Math.floor(allPoints.length / maxBars))
    const sampledPoints = []

    for (let i = 0; i < allPoints.length; i += step) {
      sampledPoints.push(allPoints[i])
    }

    // Draw bars
    const barWidth = Math.min(10, (chartWidth / sampledPoints.length) * 0.8)

    sampledPoints.forEach((point) => {
      const [time, value, seriesIndex] = point
      const color = colors[seriesIndex % colors.length]

      const x = padding.left + ((time - minTime) / (maxTime - minTime)) * chartWidth
      const barHeight = ((value - minValue) / (maxValue - minValue)) * chartHeight
      const y = padding.top + chartHeight - barHeight

      ctx.fillStyle = color
      ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight)
    })

    // Draw legend
    if (data.data.result.length > 0) {
      const legendY = padding.top / 2
      let legendX = padding.left

      data.data.result.forEach((series: any, seriesIndex: number) => {
        const color = colors[seriesIndex % colors.length]
        const label = series.metric.pod || series.metric.instance || "Series " + (seriesIndex + 1)

        // Draw color box
        ctx.fillStyle = color
        ctx.fillRect(legendX, legendY - 5, 10, 10)

        // Draw label
        ctx.fillStyle = "#64748b"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(label, legendX + 15, legendY)

        // Move to next legend item
        const textWidth = ctx.measureText(label).width
        legendX += 25 + textWidth + 10
      })
    }
  }, [data])

  return (
    <div className="w-full h-[200px]">
      <canvas ref={canvasRef} width={500} height={200} className="w-full h-full" />
    </div>
  )
}

