"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sensors } from "@/lib/data"
import { statusDot } from "@/lib/status"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"

function batteryIcon(b: number) {
  if (b === 0) return "battery-warning"
  if (b < 25) return "battery-low"
  return "battery-full"
}

export function IotSensors() {
  const online = sensors.filter((s) => s.online).length
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon name="radio" className="size-4 text-primary" />
          IoT Sensor Network
        </CardTitle>
        <span className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{online}</span>/{sensors.length} online
        </span>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {sensors.map((s) => (
          <div
            key={s.id}
            className={cn(
              "flex items-center gap-3 rounded-lg border border-border p-2.5",
              !s.online && "opacity-70",
            )}
          >
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-md",
                s.online ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
              )}
            >
              <Icon name={s.online ? "wifi" : "wifi-off"} className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className={cn("size-2 rounded-full", statusDot[s.status])} />
                <p className="font-mono text-xs font-medium text-foreground">{s.id}</p>
              </div>
              <p className="text-[10px] text-muted-foreground">
                {s.gps} · {s.lastUpdate}
              </p>
            </div>
            <div className="flex flex-col items-end gap-0.5 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name={batteryIcon(s.battery)} className="size-3" />
                {s.battery}%
              </span>
              <span className="flex items-center gap-1">
                <Icon name={s.signal > 50 ? "signal" : "signal-low"} className="size-3" />
                {s.signal}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
