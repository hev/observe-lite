"use client"

import { useState, useEffect } from "react"
import { Panel } from "@/components/panel"
import type { PanelType } from "@/lib/types"
import type { TimeRange } from "@/lib/types"
import { fetchTimeSeriesData } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { useSettings } from "@/lib/settings-context"

interface DashboardProps {
  panels: {
    id: string
    type: PanelType
    title: string
    query: string
  }[]
  timeRange: TimeRange
  onPanelUpdate: (panel: {
    id: string
    type: PanelType
    title: string
    query: string
  }) => void
  onPanelRemove: (panelId: string) => void
}

export function Dashboard({ panels, timeRange, onPanelUpdate, onPanelRemove }: DashboardProps) {
  const [data, setData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [error, setError] = useState<Record<string, string | null>>({})
  const { dataSource, apiUrl } = useSettings()

  // This effect will run when timeRange, dataSource, or apiUrl changes to refresh all panels
  useEffect(() => {
    const fetchDataForAllPanels = async () => {
      // Create a map of panel IDs to promises
      const promises = panels.map(async (panel) => {
        setLoading((prev) => ({ ...prev, [panel.id]: true }))

        try {
          const result = await fetchTimeSeriesData(panel.query, timeRange)
          return { id: panel.id, data: result }
        } catch (err) {
          const newError = err instanceof Error ? err.message : "Failed to fetch data"
          setError((prev) => ({ ...prev, [panel.id]: newError }))
          return { id: panel.id, data: null }
        } finally {
          setLoading((prev) => ({ ...prev, [panel.id]: false }))
        }
      })

      // Wait for all promises to resolve
      const results = await Promise.all(promises)

      // Update data state
      const newData: Record<string, any> = {}
      results.forEach((result) => {
        if (result.data) {
          newData[result.id] = result.data
        }
      })

      setData(newData)
    }

    fetchDataForAllPanels()
  }, [panels, timeRange, dataSource, apiUrl])

  // This function will be called when a panel's query changes
  const refreshPanel = async (panelId: string, query: string) => {
    setLoading((prev) => ({ ...prev, [panelId]: true }))
    setError((prev) => ({ ...prev, [panelId]: null }))

    try {
      const result = await fetchTimeSeriesData(query, timeRange)
      setData((prev) => ({ ...prev, [panelId]: result }))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch data"
      setError((prev) => ({ ...prev, [panelId]: errorMessage }))
    } finally {
      setLoading((prev) => ({ ...prev, [panelId]: false }))
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {panels.map((panel) => (
        <div key={panel.id} className="col-span-1">
          {loading[panel.id] ? (
            <div className="border rounded-lg p-4 h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Skeleton className="h-[300px] w-full" />
              </div>
            </div>
          ) : (
            <Panel
              id={panel.id}
              type={panel.type}
              title={panel.title}
              query={panel.query}
              data={data[panel.id]}
              error={error[panel.id]}
              timeRange={timeRange}
              onUpdate={(updatedPanel) => {
                onPanelUpdate(updatedPanel)
                if (updatedPanel.query !== panel.query) {
                  refreshPanel(updatedPanel.id, updatedPanel.query)
                }
              }}
              onRemove={onPanelRemove}
              onRefresh={() => refreshPanel(panel.id, panel.query)}
            />
          )}
        </div>
      ))}
    </div>
  )
}

