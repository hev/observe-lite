import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return format(date, "HH:mm")
}

export function formatValue(value: number): string {
  if (value === 0) return "0"

  // Handle large numbers
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2) + "G"
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + "M"
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(2) + "K"
  }

  // Handle small numbers
  if (value < 0.01) {
    return value.toExponential(2)
  }

  return value.toFixed(2)
}

