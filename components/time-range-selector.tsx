"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TimeRange } from "@/lib/types"
import { CalendarIcon } from "lucide-react"

interface TimeRangeSelectorProps {
  value: TimeRange
  onChange: (value: TimeRange) => void
}

const PRESETS = [
  { label: "Last 1m", value: "1m", seconds: 60 },
  { label: "Last 5m", value: "5m", seconds: 300 },
  { label: "Last 15m", value: "15m", seconds: 900 },
  { label: "Last 1h", value: "1h", seconds: 3600 },
  { label: "Last 6h", value: "6h", seconds: 21600 },
  { label: "Last 12h", value: "12h", seconds: 43200 },
  { label: "Last 24h", value: "24h", seconds: 86400 },
  { label: "Last 7d", value: "7d", seconds: 604800 },
  { label: "Custom Range", value: "custom", seconds: 0 },
]

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(value.start ? new Date(value.start * 1000) : undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(value.end ? new Date(value.end * 1000) : undefined)
  const [isCustomOpen, setIsCustomOpen] = useState(false)

  const handlePresetChange = (presetValue: string) => {
    const preset = PRESETS.find((p) => p.value === presetValue)

    if (preset) {
      if (preset.value === "custom") {
        setIsCustomOpen(true)
        return
      }

      const now = Math.floor(Date.now() / 1000)
      onChange({
        start: now - preset.seconds,
        end: now,
        step: value.step,
      })
    }
  }

  const handleCustomRangeApply = () => {
    if (startDate && endDate) {
      onChange({
        start: Math.floor(startDate.getTime() / 1000),
        end: Math.floor(endDate.getTime() / 1000),
        step: value.step,
      })
      setIsCustomOpen(false)
    }
  }

  // Find the current preset based on the time range
  const getCurrentPreset = () => {
    if (!value.start || !value.end) return PRESETS[3].value // Default to 1h

    const duration = value.end - value.start
    const preset = PRESETS.find((p) => p.seconds === duration && p.value !== "custom")

    return preset ? preset.value : "custom"
  }

  return (
    <div className="flex items-center gap-2">
      <Select defaultValue={getCurrentPreset()} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          {PRESETS.map((preset) => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover open={isCustomOpen} onOpenChange={setIsCustomOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setIsCustomOpen(true)}>
            <CalendarIcon className="h-4 w-4" />
            <span>Custom Range</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="flex flex-col sm:flex-row">
            <div className="border-r p-2">
              <div className="px-1 py-2 font-medium text-sm">Start</div>
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
            </div>
            <div className="p-2">
              <div className="px-1 py-2 font-medium text-sm">End</div>
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
            </div>
          </div>
          <div className="border-t p-2 flex justify-end">
            <Button size="sm" onClick={handleCustomRangeApply}>
              Apply Range
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

