"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { fetchMetrics } from "@/lib/api"

interface QueryInputProps {
  value: string
  onChange: (value: string) => void
}

export function QueryInput({ value, onChange }: QueryInputProps) {
  const [inputValue, setInputValue] = useState(value)
  const [isSearching, setIsSearching] = useState(false)
  const [metrics, setMetrics] = useState<string[]>([])
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [labels, setLabels] = useState<{ name: string; values: string[] }[]>([])
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Extract metric name from the query
    const metricMatch = value.match(/^([^{]+)/)
    if (metricMatch) {
      setSelectedMetric(metricMatch[1])
    }

    setInputValue(value)
  }, [value])

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchMetrics()
        setMetrics(data)
      } catch (error) {
        console.error("Failed to load metrics:", error)
      }
    }

    loadMetrics()
  }, [])

  useEffect(() => {
    if (selectedMetric) {
      const loadLabels = async () => {
        try {
          // This would normally fetch the available labels for the selected metric
          // For now, we'll use mock data based on the sample
          const mockLabels = [
            { name: "cluster_name", values: ["avs-db-1"] },
            { name: "instance", values: ["10.128.0.44:5040", "10.128.0.45:5040", "10.128.0.46:5040"] },
            {
              name: "pod",
              values: [
                "avs-app-aerospike-vector-search-0",
                "avs-app-aerospike-vector-search-1",
                "avs-app-aerospike-vector-search-2",
              ],
            },
            { name: "namespace", values: ["avs"] },
            { name: "job", values: ["avs-app-aerospike-vector-search-internal"] },
          ]
          setLabels(mockLabels)
        } catch (error) {
          console.error("Failed to load labels:", error)
        }
      }

      loadLabels()
    }
  }, [selectedMetric])

  const handleMetricSelect = (metric: string) => {
    setSelectedMetric(metric)
    setInputValue(metric + "{}")
    onChange(metric + "{}")
    setOpen(false)

    // Focus inside the curly braces
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.setSelectionRange(metric.length + 1, metric.length + 1)
      }
    }, 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange(inputValue)
    }
  }

  const handleSearch = () => {
    onChange(inputValue)
  }

  const handleClear = () => {
    setInputValue("")
    onChange("")
    setSelectedMetric(null)
  }

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Enter Prometheus query..."
                className="pr-16"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                {inputValue && (
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleClear}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setOpen(true)}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start" side="bottom">
            <Command>
              <CommandInput placeholder="Search metrics..." />
              <CommandList>
                <CommandEmpty>No metrics found</CommandEmpty>
                <CommandGroup heading="Metrics">
                  {metrics.map((metric) => (
                    <CommandItem key={metric} onSelect={() => handleMetricSelect(metric)}>
                      {metric}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}

