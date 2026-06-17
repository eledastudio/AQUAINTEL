"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { leaks } from "@/lib/data"
import { statusBadge, statusDot, statusLabel } from "@/lib/status"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"

const stateColor: Record<string, string> = {
  "Crew Dispatched": "text-info",
  Investigating: "text-warning",
  Repairing: "text-primary",
  Monitoring: "text-muted-foreground",
}

export function LeakDetection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon name="alert-triangle" className="size-4 text-primary" />
          Leak Detection
        </CardTitle>
        <span className="rounded-full bg-destructive/15 px-2.5 py-1 text-xs font-medium text-destructive">
          {leaks.filter((l) => l.severity === "critical").length} Critical
        </span>
      </CardHeader>
      <CardContent className="px-0">
        <ul className="divide-y divide-border">
          {leaks.map((l) => (
            <li key={l.id} className="flex items-center gap-3 px-6 py-3">
              <span
                className={cn(
                  "relative size-2.5 shrink-0 rounded-full",
                  statusDot[l.severity],
                  l.severity === "critical" && "animate-critical",
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm font-medium text-foreground">{l.id}</p>
                  <span className={cn("rounded border px-1.5 text-[10px] font-medium", statusBadge[l.severity])}>
                    {statusLabel[l.severity]}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {l.location} · {l.pipeline}
                </p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="font-mono text-sm text-foreground">{l.loss}</p>
                <p className="text-[10px] text-muted-foreground">{l.detected}</p>
              </div>
              <div className="text-right">
                <p className={cn("text-xs font-medium", stateColor[l.state])}>{l.state}</p>
                <p className="text-[10px] text-muted-foreground">{l.engineer}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
