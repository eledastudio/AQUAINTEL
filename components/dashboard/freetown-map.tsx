"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { mapMarkers, type MapMarker } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { statusBadge, statusLabel } from "@/lib/status"
import { MapPin, X } from "lucide-react"
import { cn } from "@/lib/utils"

const MapCanvas = dynamic(() => import("./map-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <span className="text-sm text-muted-foreground">Loading map...</span>
    </div>
  ),
})

const legend = [
  { label: "Healthy", color: "bg-success" },
  { label: "Warning", color: "bg-warning" },
  { label: "Critical", color: "bg-destructive" },
  { label: "Reservoir", color: "bg-info" },
]

const typeLabel: Record<MapMarker["type"], string> = {
  plant: "Treatment Plant",
  reservoir: "Reservoir",
  pump: "Pump Station",
  sensor: "IoT Sensor Cluster",
  leak: "Leak Location",
  team: "Maintenance Team",
}

export function FreetownMap() {
  const [selected, setSelected] = useState<MapMarker | null>(mapMarkers[0])

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="size-4 text-primary" />
            Freetown Distribution Network
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Live infrastructure & incident map
          </p>
        </div>
        <div className="hidden flex-wrap items-center gap-3 sm:flex">
          {legend.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className={cn("size-2.5 rounded-full", l.color)} />
              {l.label}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative grid lg:grid-cols-[1fr_300px]">
          <div className="relative h-[340px] lg:h-[440px]">
            <MapCanvas
              markers={mapMarkers}
              selectedId={selected?.id ?? null}
              onSelect={setSelected}
            />
          </div>

          {/* Detail panel */}
          <div className="border-t border-border p-4 lg:border-l lg:border-t-0">
            {selected ? (
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {typeLabel[selected.type]}
                    </p>
                    <h3 className="mt-0.5 text-sm font-semibold leading-tight">
                      {selected.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-md p-1 text-muted-foreground hover:bg-accent"
                    aria-label="Close detail"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <Badge
                  variant="outline"
                  className={cn("mt-2 w-fit", statusBadge[selected.status])}
                >
                  {statusLabel[selected.status]}
                </Badge>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {selected.detail}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-2">
                  {selected.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2"
                    >
                      <span className="text-xs text-muted-foreground">
                        {m.label}
                      </span>
                      <span className="text-sm font-semibold tabular-nums">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-auto pt-4 font-mono text-[11px] text-muted-foreground">
                  {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
                </p>
              </div>
            ) : (
              <div className="flex h-full min-h-32 items-center justify-center text-center">
                <p className="text-xs text-muted-foreground">
                  Select a marker to view asset details
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
