"use client"

import { kpis } from "@/lib/data"
import { Icon } from "./icon"
import { Card } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const TrendIcon = kpi.trend === "up" ? ArrowUpRight : ArrowDownRight
        const data = kpi.spark.map((v, i) => ({ i, v }))
        return (
          <Card
            key={kpi.id}
            className="relative gap-0 overflow-hidden p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon name={kpi.icon} className="size-[18px]" />
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                  kpi.positive
                    ? "bg-success/15 text-success"
                    : "bg-destructive/15 text-destructive",
                )}
              >
                <TrendIcon className="size-3" />
                {kpi.change}%
              </span>
            </div>

            <p className="mt-3 text-xs font-medium text-muted-foreground">
              {kpi.label}
            </p>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-semibold tracking-tight tabular-nums">
                {kpi.value}
              </span>
              {kpi.unit && (
                <span className="mb-1 text-xs font-medium text-muted-foreground">
                  {kpi.unit}
                </span>
              )}
            </div>

            <div className="mt-2 h-9">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 2, bottom: 0, left: 0, right: 0 }}>
                  <defs>
                    <linearGradient id={`spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="var(--color-primary)"
                    strokeWidth={1.75}
                    fill={`url(#spark-${kpi.id})`}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
