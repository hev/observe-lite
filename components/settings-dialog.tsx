"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Settings } from "lucide-react"
import { useSettings } from "@/lib/settings-context"

export function SettingsDialog() {
  const { dataSource, apiUrl, setDataSource, setApiUrl } = useSettings()
  const [localDataSource, setLocalDataSource] = useState(dataSource)
  const [localApiUrl, setLocalApiUrl] = useState(apiUrl)
  const [open, setOpen] = useState(false)

  const handleSave = () => {
    setDataSource(localDataSource)
    setApiUrl(localApiUrl)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Settings">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dashboard Settings</DialogTitle>
          <DialogDescription>Configure data source settings for your dashboard.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="data-source">Data Source</Label>
            <RadioGroup
              id="data-source"
              value={localDataSource}
              onValueChange={(value) => setLocalDataSource(value as "mock" | "api")}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mock" id="mock" />
                <Label htmlFor="mock" className="font-normal">
                  Mock Data (for development)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="api" id="api" />
                <Label htmlFor="api" className="font-normal">
                  Prometheus API
                </Label>
              </div>
            </RadioGroup>
          </div>

          {localDataSource === "api" && (
            <div className="grid gap-2">
              <Label htmlFor="api-url">Prometheus API URL</Label>
              <Input
                id="api-url"
                value={localApiUrl}
                onChange={(e) => setLocalApiUrl(e.target.value)}
                placeholder="http://localhost:9090"
              />
              <p className="text-xs text-muted-foreground">
                Enter the base URL of your Prometheus API (e.g., http://localhost:9090)
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

