"use client"

import { useState } from "react"
import { navItems } from "@/lib/data"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { KpiCards } from "./kpi-cards"
import { FreetownMap } from "./freetown-map"
import { WaterQuality } from "./water-quality"
import { PurificationFlow } from "./purification-flow"
import { Reservoirs } from "./reservoirs"
import { AnalyticsCharts } from "./analytics-charts"
import { LeakDetection } from "./leak-detection"
import { IotSensors } from "./iot-sensors"
import { AiPredictions } from "./ai-predictions"
import { AlertsFeed } from "./alerts-feed"
import { MaintenanceSchedule } from "./maintenance-schedule"
import { CitizenReports } from "./citizen-reports"
import { Icon } from "./icon"

export function DashboardShell() {
  const [active, setActive] = useState("dashboard")
  const [mobileOpen, setMobileOpen] = useState(false)
  const title = navItems.find((n) => n.id === active)?.label ?? "Dashboard"

  return (
    <div className="flex min-h-svh bg-background">
      <Sidebar
        active={active}
        onSelect={setActive}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} onOpenMobile={() => setMobileOpen(true)} />

        <main className="flex-1 space-y-4 p-4 lg:p-6">
          <PageBanner />
          <KpiCards />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <FreetownMap />
            </div>
            <AiPredictions />
          </div>

          <PurificationFlow />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <WaterQuality />
            </div>
            <Reservoirs />
          </div>

          <AnalyticsCharts />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="space-y-4 xl:col-span-2">
              <LeakDetection />
              <IotSensors />
            </div>
            <AlertsFeed />
          </div>

          <MaintenanceSchedule />
          <CitizenReports />

          <footer className="flex flex-col items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row">
            <p>Smart Water Sierra Leone · National Water Intelligence Platform</p>
            <p className="flex items-center gap-1.5">
              <Icon name="shield-check" className="size-3.5 text-success" />
              Data encrypted · SCADA secure channel
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}

function PageBanner() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-gradient-to-r from-primary/10 via-card to-card p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Icon name="activity" className="size-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Freetown Water Operations Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            Live monitoring across 18 reservoirs and 2,840 sensors.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
          <Icon name="download" className="size-4" />
          Export Report
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Icon name="plus" className="size-4" />
          New Work Order
        </button>
      </div>
    </div>
  )
}
