"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { QueryInput } from "@/components/query-input"
import { LineChartD3 } from "@/components/charts/line-chart-d3"
import { AreaChartD3 } from "@/components/charts/area-chart-d3"
import { BarChartD3 } from "@/components/charts/bar-chart-d3"
import { TopList } from "@/components/charts/top-list"
import { SingleMetric } from "@/components/charts/single-metric"
import type { PanelType, TimeRange } from "@/lib/types"
import { BarChart2, LineChartIcon, TrendingUp, List, Activity, X, Edit, Save, Trash2, RefreshCw } from "lucide-react"

interface PanelProps {
  id: string
  type: PanelType
  title: string
  query: string
  data: any
  error: string | null
  timeRange: TimeRange
  onUpdate: (panel: {
    id: string
    type: PanelType
    title: string
    query: string
  }) => void
  onRemove: (panelId: string) => void
  onRefresh: () => void
}

export function Panel({ id, type, title, query, data, error, timeRange, onUpdate, onRemove, onRefresh }: PanelProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editType, setEditType] = useState<PanelType>(type)
  const [editQuery, setEditQuery] = useState(query)

  const handleSave = () => {
    onUpdate({
      id,
      type: editType,
      title: editTitle,
      query: editQuery,
    })
    setIsEditing(false)
  }

  const renderChart = () => {
    if (error) {
      return (
        <div className="flex items-center justify-center h-[300px] text-destructive">
          <p className="text-sm">Error: {error}</p>
        </div>
      )
    }

    if (!data) {
      return (
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-sm text-muted-foreground">No data available</p>
        </div>
      )
    }

    switch (type) {
      case "line":
        return <LineChartD3 data={data} height={300} />
      case "area":
        return <AreaChartD3 data={data} height={300} />
      case "bar":
        return <BarChartD3 data={data} height={300} />
      case "toplist":
        return <TopList data={data} />
      case "singlemetric":
        return <SingleMetric data={data} />
      default:
        return <div>Unknown panel type</div>
    }
  }

  const getTypeIcon = (panelType: PanelType) => {
    switch (panelType) {
      case "line":
        return <LineChartIcon className="h-4 w-4" />
      case "area":
        return <TrendingUp className="h-4 w-4" />
      case "bar":
        return <BarChart2 className="h-4 w-4" />
      case "toplist":
        return <List className="h-4 w-4" />
      case "singlemetric":
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
        {isEditing ? (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="h-8"
                placeholder="Panel title"
              />
              <div className="flex gap-1">
                {(["line", "area", "bar", "toplist", "singlemetric"] as PanelType[]).map((t) => (
                  <Button
                    key={t}
                    size="sm"
                    variant={editType === t ? "default" : "outline"}
                    className="h-8 px-2"
                    onClick={() => setEditType(t)}
                  >
                    {getTypeIcon(t)}
                  </Button>
                ))}
              </div>
            </div>
            <QueryInput value={editQuery} onChange={setEditQuery} />
          </div>
        ) : (
          <CardTitle className="text-md flex items-center gap-2">
            {getTypeIcon(type)}
            {title}
          </CardTitle>
        )}
        <div className="flex gap-1">
          {isEditing ? (
            <>
              <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleSave}>
                <Save className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button size="icon" variant="ghost" onClick={onRefresh} title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)} title="Edit">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onRemove(id)} title="Remove">
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {renderChart()}
        {!isEditing && <div className="mt-2 text-xs text-muted-foreground truncate">{query}</div>}
      </CardContent>
    </Card>
  )
}

