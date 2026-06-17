"use client"

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { MapMarker } from "@/lib/data"

const colorFor = (m: MapMarker) => {
  if (m.type === "reservoir") return "#2f7fe0"
  if (m.status === "critical") return "#e5484d"
  if (m.status === "warning") return "#e0a92f"
  return "#3bb273"
}

export default function MapCanvas({
  markers,
  selectedId,
  onSelect,
}: {
  markers: MapMarker[]
  selectedId: string | null
  onSelect: (m: MapMarker) => void
}) {
  return (
    <MapContainer
      center={[8.4657, -13.2317]}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {markers.map((m) => {
        const color = colorFor(m)
        const isSel = selectedId === m.id
        return (
          <CircleMarker
            key={m.id}
            center={[m.lat, m.lng]}
            radius={isSel ? 11 : m.type === "leak" || m.status === "critical" ? 9 : 7}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: color,
              fillOpacity: 0.95,
            }}
            eventHandlers={{ click: () => onSelect(m) }}
          >
            <Tooltip direction="top" offset={[0, -6]}>
              {m.name}
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
