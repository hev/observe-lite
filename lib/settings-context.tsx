"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type DataSourceType = "mock" | "api"

interface SettingsContextType {
  dataSource: DataSourceType
  apiUrl: string
  setDataSource: (source: DataSourceType) => void
  setApiUrl: (url: string) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Initialize with default values or from localStorage if available
  const [dataSource, setDataSource] = useState<DataSourceType>("mock")
  const [apiUrl, setApiUrl] = useState<string>("http://localhost:9090")

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("dashboardSettings")
    if (savedSettings) {
      const { dataSource: savedDataSource, apiUrl: savedApiUrl } = JSON.parse(savedSettings)
      if (savedDataSource) setDataSource(savedDataSource)
      if (savedApiUrl) setApiUrl(savedApiUrl)
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem(
      "dashboardSettings",
      JSON.stringify({
        dataSource,
        apiUrl,
      }),
    )
  }, [dataSource, apiUrl])

  return (
    <SettingsContext.Provider
      value={{
        dataSource,
        apiUrl,
        setDataSource,
        setApiUrl,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

