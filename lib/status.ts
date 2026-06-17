import type { Status } from "@/lib/data"

export const statusDot: Record<Status, string> = {
  healthy: "bg-success",
  warning: "bg-warning",
  critical: "bg-destructive",
}

export const statusText: Record<Status, string> = {
  healthy: "text-success",
  warning: "text-warning",
  critical: "text-destructive",
}

export const statusBadge: Record<Status, string> = {
  healthy: "bg-success/15 text-success border-success/25",
  warning: "bg-warning/15 text-warning border-warning/30",
  critical: "bg-destructive/15 text-destructive border-destructive/25",
}

export const statusLabel: Record<Status, string> = {
  healthy: "Healthy",
  warning: "Warning",
  critical: "Critical",
}
