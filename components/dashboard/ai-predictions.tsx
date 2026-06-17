"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { aiPredictions } from "@/lib/data"
import { statusText } from "@/lib/status"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"

export function AiPredictions() {
  return (
    <Card className="bg-gradient-to-b from-accent/40 to-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon name="brain" className="size-4 text-primary" />
          AI Predictive Insights
        </CardTitle>
        <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
          <Icon name="cpu" className="size-3" />
          Model v4.2
        </span>
      </CardHeader>
      <CardContent className="grid gap-3">
        {aiPredictions.map((p) => (
          <div
            key={p.label}
            className="rounded-lg border border-border bg-card/60 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{p.label}</p>
                <p className={cn("text-sm font-medium", statusText[p.status])}>{p.value}</p>
              </div>
              <span className="shrink-0 font-mono text-sm font-semibold text-foreground">
                {p.confidence}%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  p.status === "critical"
                    ? "bg-destructive"
                    : p.status === "warning"
                      ? "bg-warning"
                      : "bg-success",
                )}
                style={{ width: `${p.confidence}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
