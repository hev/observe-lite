"use client"

import { useSettings } from "@/lib/settings-context"
import { Badge } from "@/components/ui/badge"
import { Database, CloudOff } from "lucide-react"

export function DataSourceIndicator() {
  const { dataSource, apiUrl } = useSettings()

  return (
    <Badge variant={dataSource === "mock" ? "secondary" : "default"} className="gap-1">
      {dataSource === "mock" ? (
        <>
          <CloudOff className="h-3 w-3" />
          <span>Mock Data</span>
        </>
      ) : (
        <>
          <Database className="h-3 w-3" />
          <span title={apiUrl}>Prometheus API</span>
        </>
      )}
    </Badge>
  )
}

