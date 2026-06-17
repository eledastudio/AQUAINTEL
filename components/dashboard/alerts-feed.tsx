"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { alerts } from "@/lib/data"
import { statusBadge, statusText } from "@/lib/status"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"

const alertIcon: Record<string, string> = {
  critical: "circle-alert",
  warning: "alert-triangle",
  healthy: "check-circle",
}

export function AlertsFeed() {
  const active = alerts.filter((a) => a.severity !== "healthy").length
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon name="bell" className="size-4 text-primary" />
          Live Alerts
        </CardTitle>
        <span className="rounded-full bg-destructive/15 px-2.5 py-1 text-xs font-medium text-destructive">
          {active} active
        </span>
      </CardHeader>
      <CardContent className="flex-1 px-0">
        <ScrollArea className="h-[320px] px-6">
          <ul className="flex flex-col gap-2">
            {alerts.map((a) => (
              <li
                key={a.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3",
                  statusBadge[a.severity],
                )}
              >
                <Icon name={alertIcon[a.severity]} className={cn("mt-0.5 size-4 shrink-0", statusText[a.severity])} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{a.type}</p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{a.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{a.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
