"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { purificationStages } from "@/lib/data"
import { statusBadge, statusDot } from "@/lib/status"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"

const stageIcons: Record<string, string> = {
  raw: "waves",
  sed: "layers",
  filt: "filter",
  carbon: "box",
  uv: "zap",
  chlor: "flask",
  safe: "check-circle",
}

export function PurificationFlow() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon name="filter" className="size-4 text-primary" />
          Purification Process Flow
        </CardTitle>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-success animate-pulse" />
          Live
        </span>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1 lg:flex-row lg:items-stretch">
          {purificationStages.map((stage, i) => (
            <div key={stage.id} className="flex flex-1 items-center gap-1 lg:flex-col">
              <div
                className={cn(
                  "relative flex w-full flex-1 flex-col items-center gap-2 rounded-lg border p-3 text-center",
                  statusBadge[stage.status],
                )}
              >
                <span
                  className={cn(
                    "absolute right-2 top-2 size-2 rounded-full",
                    statusDot[stage.status],
                    stage.status === "critical" && "animate-critical",
                  )}
                />
                <Icon name={stageIcons[stage.id]} className="size-6" />
                <div>
                  <p className="text-xs font-medium leading-tight text-foreground">{stage.name}</p>
                  <p className="mt-0.5 font-mono text-xs">{stage.value}</p>
                </div>
              </div>
              {i < purificationStages.length - 1 && (
                <Connector />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function Connector() {
  return (
    <>
      <svg className="hidden h-3 w-full lg:block" viewBox="0 0 100 12" preserveAspectRatio="none">
        <line x1="0" y1="6" x2="100" y2="6" stroke="var(--primary)" strokeWidth="2" className="animate-flow" />
      </svg>
      <svg className="h-6 w-3 shrink-0 lg:hidden" viewBox="0 0 12 100" preserveAspectRatio="none">
        <line x1="6" y1="0" x2="6" y2="100" stroke="var(--primary)" strokeWidth="2" className="animate-flow" />
      </svg>
    </>
  )
}
