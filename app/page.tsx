"use client"

import { useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { TimeRangeSelector } from "@/components/time-range-selector"
import { Button } from "@/components/ui/button"
import type { PanelType } from "@/lib/types"
import { PlusCircle } from "lucide-react"
import { SettingsDialog } from "@/components/settings-dialog"
import { DataSourceIndicator } from "@/components/data-source-indicator"

export default function Home() {
  const [timeRange, setTimeRange] = useState({
    start: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    end: Math.floor(Date.now() / 1000),
    step: 14,
  })

  const [panels, setPanels] = useState<
    {
      id: string
      type: PanelType
      title: string
      query: string
    }[]
  >([
    {
      id: "panel-1",
      type: "line",
      title: "JVM Uptime",
      query: "aerospike_vector_search_jvm_attribute_uptime{cluster_name='avs-db-1'}",
    },
  ])

  const addPanel = (type: PanelType) => {
    setPanels([
      ...panels,
      {
        id: `panel-${panels.length + 1}`,
        type,
        title: `New ${type} Panel`,
        query: "aerospike_vector_search_jvm_attribute_uptime{cluster_name='avs-db-1'}",
      },
    ])
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Time Series Dashboard</h1>
            <DataSourceIndicator />
          </div>
          <div className="flex items-center gap-2">
            <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
            <SettingsDialog />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => addPanel("line")} variant="outline" size="sm" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Line
          </Button>
          <Button onClick={() => addPanel("area")} variant="outline" size="sm" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Area
          </Button>
          <Button onClick={() => addPanel("bar")} variant="outline" size="sm" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Bar
          </Button>
          <Button onClick={() => addPanel("toplist")} variant="outline" size="sm" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Top List
          </Button>
          <Button
            onClick={() => addPanel("singlemetric")}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" /> Single Metric
          </Button>
        </div>

        <Dashboard
          panels={panels}
          timeRange={timeRange}
          onPanelUpdate={(updatedPanel) => {
            setPanels(panels.map((panel) => (panel.id === updatedPanel.id ? updatedPanel : panel)))
          }}
          onPanelRemove={(panelId) => {
            setPanels(panels.filter((panel) => panel.id !== panelId))
          }}
        />
      </div>
    </div>
  )
}

