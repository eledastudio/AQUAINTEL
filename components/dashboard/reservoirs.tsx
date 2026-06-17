"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { reservoirs } from "@/lib/data"
import { statusBadge, statusLabel } from "@/lib/status"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"

function Tank({ level, status }: { level: number; status: string }) {
  const fill =
    status === "critical"
      ? "var(--destructive)"
      : status === "warning"
        ? "var(--warning)"
        : "var(--color-chart-1)"
  return (
    <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg border-2 border-border bg-secondary/50">
      <div
        className="absolute inset-x-0 bottom-0 transition-all duration-700"
        style={{ height: `${level}%`, background: fill, opacity: 0.85 }}
      >
        <div className="absolute inset-x-0 top-0 h-1.5 animate-pulse bg-white/30" />
      </div>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold text-foreground mix-blend-luminosity">
        {level}%
      </span>
    </div>
  )
}

export function Reservoirs() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon name="database" className="size-4 text-primary" />
          Reservoir & Tank Levels
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {reservoirs.map((r) => (
            <div
              key={r.id}
              className="flex gap-3 rounded-lg border border-border bg-secondary/30 p-3"
            >
              <Tank level={r.capacity} status={r.status} />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-medium text-foreground">{r.name}</p>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                      statusBadge[r.status],
                    )}
                  >
                    {statusLabel[r.status]}
                  </span>
                </div>
                <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="waves" className="size-3" /> Level
                    <span className="ml-auto font-mono text-foreground">{r.level}m</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="thermometer" className="size-3" /> Temp
                    <span className="ml-auto font-mono text-foreground">{r.temp}C</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="fan" className="size-3" /> Pump
                    <span
                      className={cn(
                        "ml-auto font-medium",
                        r.pump === "Fault" ? "text-destructive" : "text-foreground",
                      )}
                    >
                      {r.pump}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="circle-dot" className="size-3" /> Valve
                    <span className="ml-auto font-medium text-foreground">{r.valve}</span>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
