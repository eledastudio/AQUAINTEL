"use client"

import { navItems } from "@/lib/data"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"
import { Droplet, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Sidebar({
  active,
  onSelect,
  mobileOpen,
  onCloseMobile,
}: {
  active: string
  onSelect: (id: string) => void
  mobileOpen: boolean
  onCloseMobile: () => void
}) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Droplet className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold leading-tight">
              Smart Water
            </p>
            <p className="truncate text-xs text-sidebar-foreground/60">
              Sierra Leone
            </p>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-md p-1 text-sidebar-foreground/70 hover:bg-sidebar-accent lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelect(item.id)
                    onCloseMobile()
                  }}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon name={item.icon} className="size-[18px] shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent/60 px-3 py-2.5">
            <span className="relative flex size-2.5 text-success">
              <span className="animate-ping-soft" />
              <span className="size-2.5 rounded-full bg-success" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium">System Online</p>
              <p className="truncate text-[11px] text-sidebar-foreground/55">
                SCADA link stable
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
