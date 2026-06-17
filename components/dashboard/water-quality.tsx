"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { qualityMetrics } from "@/lib/data"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"

function Gauge({ pct, status }: { pct: number; status: string }) {
  const r = 26
  const c = 2 * Math.PI * r
  const offset = c - (pct / 100) * c
  const color =
    status === "critical"
      ? "var(--destructive)"
      : status === "warning"
        ? "var(--warning)"
        : "var(--success)"
  return (
    <svg viewBox="0 0 64 64" className="size-16 -rotate-90">
      <circle cx="32" cy="32" r={r} fill="none" stroke="var(--muted)" strokeWidth="6" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        className="transition-all duration-700"
      />
    </svg>
  )
}

export function WaterQuality() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon name="droplets" className="size-4 text-primary" />
          Real-Time Water Quality
        </CardTitle>
        <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
          Score 96.4%
        </span>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {qualityMetrics.map((m) => {
            const range = m.max - m.min
            const pct = Math.min(100, Math.max(0, ((m.value - m.min) / range) * 100))
            return (
              <div
                key={m.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 p-3"
              >
                <div className="relative shrink-0">
                  <Gauge pct={pct} status={m.status} />
                  <Icon
                    name={m.trend === "up" ? "trending-up" : "trending-down"}
                    className={cn(
                      "absolute inset-0 m-auto size-4",
                      m.status === "critical"
                        ? "text-destructive"
                        : m.status === "warning"
                          ? "text-warning"
                          : "text-success",
                    )}
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs text-muted-foreground">{m.label}</p>
                  <p className="font-mono text-lg font-semibold leading-tight text-foreground">
                    {m.value}
                    <span className="ml-0.5 text-xs font-normal text-muted-foreground">{m.unit}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Optimal {m.optimalLow}–{m.optimalHigh}
                    {m.unit}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
