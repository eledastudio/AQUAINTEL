"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  flowData,
  pressureData,
  consumptionData,
  distributionByDistrict,
  pumpUtilization,
  leakHistory,
} from "@/lib/data"
import { Icon } from "./icon"

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-medium text-popover-foreground">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-muted-foreground">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-medium text-popover-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

const axis = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
}

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon name="activity" className="size-4 text-primary" />
            Network Telemetry
          </CardTitle>
          <Tabs defaultValue="flow" className="w-auto">
            <TabsList className="h-8">
              <TabsTrigger value="flow" className="text-xs">Flow</TabsTrigger>
              <TabsTrigger value="pressure" className="text-xs">Pressure</TabsTrigger>
              <TabsTrigger value="consumption" className="text-xs">Consumption</TabsTrigger>
            </TabsList>
            <TabsContent value="flow">
              <TelemetryChart data={flowData} unit="L/s" />
            </TabsContent>
            <TabsContent value="pressure">
              <TelemetryChart data={pressureData} unit="bar" />
            </TabsContent>
            <TabsContent value="consumption">
              <TelemetryChart data={consumptionData} unit="ML" />
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent className="hidden" />
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon name="fan" className="size-4 text-primary" />
            Pump Utilization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pumpUtilization}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {pumpUtilization.map((d) => (
                    <Cell key={d.name} fill={d.fill} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {pumpUtilization.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.fill }} />
                {d.name} <span className="font-medium text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon name="alert-triangle" className="size-4 text-primary" />
            Leak Detection vs Resolution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leakHistory} barGap={4}>
                <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} width={28} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
                <Bar dataKey="detected" name="Detected" fill="var(--color-chart-5)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Resolved" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon name="share-2" className="size-4 text-primary" />
            Supply by District
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionByDistrict} layout="vertical" barSize={16}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="district" {...axis} width={70} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
                <Bar dataKey="value" name="ML/day" fill="var(--color-chart-1)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TelemetryChart({ data, unit }: { data: typeof flowData; unit: string }) {
  return (
    <div className="mt-3 h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -18, right: 6, top: 4 }}>
          <defs>
            <linearGradient id="fillA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-chart-3)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-chart-3)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis dataKey="t" {...axis} interval={5} />
          <YAxis {...axis} width={40} unit={` ${unit}`} />
          <Tooltip content={<ChartTooltip />} />
          <Area type="monotone" dataKey="a" name="Current" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#fillA)" />
          <Area type="monotone" dataKey="b" name="Baseline" stroke="var(--color-chart-3)" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#fillB)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
