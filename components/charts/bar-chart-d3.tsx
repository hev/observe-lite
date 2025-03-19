"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { formatValue } from "@/lib/utils"

interface BarChartD3Props {
  data: any
  height: number
}

export function BarChartD3({ data, height = 300 }: BarChartD3Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data || !data.data || !data.data.result) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
    const margin = { top: 30, right: 50, bottom: 40, left: 60 }
    const width = svgRef.current.clientWidth
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    // Create chart container
    const chart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`)

    // Find min and max values
    let minValue = Number.POSITIVE_INFINITY
    let maxValue = Number.NEGATIVE_INFINITY
    let minTime = Number.POSITIVE_INFINITY
    let maxTime = Number.NEGATIVE_INFINITY

    // Collect all data points for bar chart
    const allPoints: { time: number; value: number; series: any; seriesIndex: number }[] = []

    data.data.result.forEach((series: any, seriesIndex: number) => {
      series.values.forEach((point: [number, string]) => {
        const time = point[0]
        const value = Number.parseFloat(point[1])

        allPoints.push({ time, value, series, seriesIndex })

        minValue = Math.min(minValue, value)
        maxValue = Math.max(maxValue, value)
        minTime = Math.min(minTime, time)
        maxTime = Math.max(maxTime, time)
      })
    })

    // Add some padding to the value range
    const valueRange = maxValue - minValue
    minValue = Math.max(0, minValue - valueRange * 0.1)
    maxValue = maxValue + valueRange * 0.1

    // Create scales
    const xScale = d3
      .scaleTime()
      .domain([new Date(minTime * 1000), new Date(maxTime * 1000)])
      .range([0, chartWidth])

    const yScale = d3.scaleLinear().domain([minValue, maxValue]).range([chartHeight, 0])

    // Create axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat((d) => d3.timeFormat("%H:%M")(d as Date))

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => formatValue(d as number))

    // Add axes to chart
    chart.append("g").attr("class", "x-axis").attr("transform", `translate(0, ${chartHeight})`).call(xAxis)

    chart.append("g").attr("class", "y-axis").call(yAxis)

    // Add grid lines
    chart
      .append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(yScale.ticks(5))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", chartWidth)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", "#e2e8f0")
      .attr("stroke-dasharray", "2,2")

    // Define colors
    const colors = [
      "#3b82f6", // blue
      "#ef4444", // red
      "#10b981", // green
      "#f59e0b", // amber
      "#8b5cf6", // purple
    ]

    // For bar charts, we need to sample the data to avoid overcrowding
    const maxBars = 50
    const step = Math.max(1, Math.floor(allPoints.length / maxBars))
    const sampledPoints = []

    for (let i = 0; i < allPoints.length; i += step) {
      sampledPoints.push(allPoints[i])
    }

    // Calculate bar width
    const barWidth = Math.min(10, (chartWidth / sampledPoints.length) * 0.8)

    // Add bars
    chart
      .selectAll(".bar")
      .data(sampledPoints)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(new Date(d.time * 1000)) - barWidth / 2)
      .attr("y", (d) => yScale(d.value))
      .attr("width", barWidth)
      .attr("height", (d) => chartHeight - yScale(d.value))
      .attr("fill", (d) => colors[d.seriesIndex % colors.length])
      .attr("stroke", "white")
      .attr("stroke-width", 0.5)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill-opacity", 0.8)

        tooltip
          .style("opacity", 1)
          .style("left", `${event.pageX + 15}px`)
          .style("top", `${event.pageY - 28}px`)
          .html(() => {
            const time = new Date(d.time * 1000)
            const label = d.series.metric.pod || d.series.metric.instance || "Series"
            const value = formatValue(d.value)

            return `
              <div style="font-weight: bold; margin-bottom: 4px;">${d3.timeFormat("%Y-%m-%d %H:%M:%S")(time)}</div>
              <div style="display: flex; align-items: center;">
                <div style="width: 10px; height: 10px; background: ${colors[d.seriesIndex % colors.length]}; margin-right: 5px;"></div>
                <div style="display: flex; justify-content: space-between; width: 100%;">
                  <span style="margin-right: 10px;">${label}:</span>
                  <span style="font-weight: bold;">${value}</span>
                </div>
              </div>
            `
          })
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill-opacity", 1)

        tooltip.style("opacity", 0)
      })

    // Add legend
    const legend = svg.append("g").attr("class", "legend").attr("transform", `translate(${margin.left}, 15)`)

    data.data.result.forEach((series: any, i: number) => {
      const color = colors[i % colors.length]
      const label = series.metric.pod || series.metric.instance || `Series ${i + 1}`

      const legendItem = legend.append("g").attr("transform", `translate(${i * 150}, 0)`)

      legendItem.append("rect").attr("width", 12).attr("height", 12).attr("fill", color)

      legendItem
        .append("text")
        .attr("x", 16)
        .attr("y", 10)
        .attr("font-size", "12px")
        .attr("fill", "#64748b")
        .text(label)
    })

    // Add tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 1000)

    // Clean up tooltip on unmount
    return () => {
      d3.select("body").selectAll(".tooltip").remove()
    }
  }, [data, height])

  return (
    <div className="w-full h-full">
      <svg ref={svgRef} width="100%" height={height} className="overflow-visible" />
    </div>
  )
}

