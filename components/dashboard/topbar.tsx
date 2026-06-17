"use client"

import { useEffect, useState } from "react"
import { Bell, Menu, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "./theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { alerts } from "@/lib/data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { statusDot } from "@/lib/status"

function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return now
}

export function Topbar({
  title,
  onOpenMobile,
}: {
  title: string
  onOpenMobile: () => void
}) {
  const now = useClock()
  const criticalCount = alerts.filter((a) => a.severity === "critical").length

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border glass px-4 lg:px-6">
      <button
        onClick={onOpenMobile}
        className="rounded-md p-1.5 text-muted-foreground hover:bg-accent lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      <div className="hidden min-w-0 md:block">
        <h1 className="truncate text-base font-semibold tracking-tight">
          {title}
        </h1>
        <p className="truncate text-xs text-muted-foreground">
          National Water Intelligence Platform
        </p>
      </div>

      <div className="relative ml-auto hidden max-w-xs flex-1 sm:block md:ml-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search sensors, assets, reports..."
          className="h-9 pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:ml-0">
        <div className="hidden items-center rounded-lg border border-border bg-card px-3 py-1.5 text-right lg:flex lg:flex-col">
          <span className="font-mono text-sm font-semibold leading-none tabular-nums">
            {now
              ? now.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "--:--:--"}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {now
              ? now.toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })
              : "Freetown, GMT"}
          </span>
        </div>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            className="relative flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" />
            {criticalCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {criticalCount}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Recent Alerts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {alerts.slice(0, 5).map((a) => (
              <DropdownMenuItem key={a.id} className="flex items-start gap-2.5 py-2">
                <span
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${statusDot[a.severity]}`}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{a.type}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {a.message}
                  </p>
                </div>
                <span className="ml-auto whitespace-nowrap text-[11px] text-muted-foreground">
                  {a.time}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-border bg-card py-1 pl-1 pr-2.5 transition-colors hover:bg-accent">
            <Avatar className="size-7">
              <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                EK
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-medium leading-tight">E. Kabba</p>
              <p className="text-[11px] leading-tight text-muted-foreground">
                Network Engineer
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
