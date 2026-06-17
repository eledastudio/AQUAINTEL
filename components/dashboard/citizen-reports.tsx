"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { citizenReports } from "@/lib/data"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"

const statusStyle: Record<string, string> = {
  New: "bg-info/15 text-info",
  Verified: "bg-warning/15 text-warning",
  Assigned: "bg-primary/15 text-primary",
  Resolved: "bg-success/15 text-success",
}

export function CitizenReports() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon name="users" className="size-4 text-primary" />
          Citizen Reports
        </CardTitle>
        <span className="text-xs text-muted-foreground">
          {citizenReports.filter((r) => r.status !== "Resolved").length} open
        </span>
      </CardHeader>
      <CardContent className="grid gap-2">
        {citizenReports.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
              {r.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-foreground">{r.issue}</p>
              </div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="map-pin" className="size-3" />
                {r.location} · {r.name}
              </p>
            </div>
            <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", statusStyle[r.status])}>
              {r.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
