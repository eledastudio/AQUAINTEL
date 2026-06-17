"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { maintenanceTasks } from "@/lib/data"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"

const priorityStyle: Record<string, string> = {
  High: "bg-destructive/15 text-destructive border-destructive/25",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Low: "bg-success/15 text-success border-success/25",
}

const stateStyle: Record<string, string> = {
  "In Progress": "text-primary",
  "Awaiting Parts": "text-warning",
  Scheduled: "text-muted-foreground",
  Completed: "text-success",
}

export function MaintenanceSchedule() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon name="wrench" className="size-4 text-primary" />
          Maintenance & Work Orders
        </CardTitle>
        <span className="text-xs text-muted-foreground">
          {maintenanceTasks.filter((t) => t.status === "In Progress").length} in progress
        </span>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Equipment</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead className="pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceTasks.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="pl-6">
                    <p className="font-medium text-foreground">{t.equipment}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t.issue}</TableCell>
                  <TableCell>
                    <span className={cn("rounded border px-2 py-0.5 text-[10px] font-medium", priorityStyle[t.priority])}>
                      {t.priority}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t.team}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{t.eta}</TableCell>
                  <TableCell className={cn("pr-6 text-xs font-medium", stateStyle[t.status])}>
                    {t.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
