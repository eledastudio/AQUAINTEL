export type Status = "healthy" | "warning" | "critical"

export type Trend = "up" | "down"

export interface Kpi {
  id: string
  label: string
  value: string
  unit?: string
  change: number
  trend: Trend
  positive: boolean
  icon: string
  spark: number[]
}

export const kpis: Kpi[] = [
  {
    id: "reservoirs",
    label: "Total Reservoirs",
    value: "18",
    change: 2,
    trend: "up",
    positive: true,
    icon: "database",
    spark: [12, 13, 14, 14, 15, 16, 16, 17, 18],
  },
  {
    id: "sensors",
    label: "Active Sensors",
    value: "2,840",
    change: 1.4,
    trend: "up",
    positive: true,
    icon: "radio",
    spark: [2600, 2680, 2700, 2740, 2760, 2790, 2810, 2825, 2840],
  },
  {
    id: "quality",
    label: "Water Quality Score",
    value: "96.4",
    unit: "%",
    change: 0.8,
    trend: "up",
    positive: true,
    icon: "droplets",
    spark: [93, 94, 94, 95, 95, 95.5, 96, 96.2, 96.4],
  },
  {
    id: "pumps",
    label: "Active Pumps",
    value: "112",
    unit: "/124",
    change: 3.1,
    trend: "down",
    positive: false,
    icon: "fan",
    spark: [120, 119, 118, 117, 116, 115, 114, 113, 112],
  },
  {
    id: "output",
    label: "Daily Water Output",
    value: "184.2",
    unit: "ML",
    change: 4.6,
    trend: "up",
    positive: true,
    icon: "waves",
    spark: [160, 165, 168, 172, 174, 178, 180, 182, 184],
  },
  {
    id: "leaks",
    label: "Leak Incidents",
    value: "7",
    change: 12.5,
    trend: "up",
    positive: false,
    icon: "alert-triangle",
    spark: [3, 4, 4, 5, 5, 6, 6, 7, 7],
  },
  {
    id: "maintenance",
    label: "Maintenance Tasks",
    value: "23",
    change: 6.2,
    trend: "down",
    positive: true,
    icon: "wrench",
    spark: [31, 30, 29, 28, 27, 26, 25, 24, 23],
  },
  {
    id: "ai",
    label: "AI Health Score",
    value: "91.7",
    unit: "%",
    change: 1.1,
    trend: "up",
    positive: true,
    icon: "brain",
    spark: [88, 88.5, 89, 89.5, 90, 90.4, 91, 91.4, 91.7],
  },
]

export type MarkerType = "plant" | "reservoir" | "pump" | "sensor" | "leak" | "team"

export interface MapMarker {
  id: string
  name: string
  type: MarkerType
  status: Status
  lat: number
  lng: number
  detail: string
  metrics: { label: string; value: string }[]
}

// Real-ish coordinates around Freetown, Sierra Leone
export const mapMarkers: MapMarker[] = [
  {
    id: "wtp-1",
    name: "Guma Valley Treatment Plant",
    type: "plant",
    status: "healthy",
    lat: 8.4106,
    lng: -13.2299,
    detail: "Primary treatment facility serving Western Freetown.",
    metrics: [
      { label: "Throughput", value: "92 ML/d" },
      { label: "Efficiency", value: "98.2%" },
      { label: "Chlorine", value: "0.6 mg/L" },
    ],
  },
  {
    id: "res-1",
    name: "Guma Dam Reservoir",
    type: "reservoir",
    status: "healthy",
    lat: 8.3897,
    lng: -13.1719,
    detail: "Main impounding reservoir, Western Area.",
    metrics: [
      { label: "Capacity", value: "84%" },
      { label: "Level", value: "21.4 m" },
      { label: "Temp", value: "24.1 C" },
    ],
  },
  {
    id: "res-2",
    name: "Tower Hill Reservoir",
    type: "reservoir",
    status: "warning",
    lat: 8.4847,
    lng: -13.2342,
    detail: "Distribution reservoir for central district.",
    metrics: [
      { label: "Capacity", value: "41%" },
      { label: "Level", value: "9.8 m" },
      { label: "Temp", value: "25.3 C" },
    ],
  },
  {
    id: "pump-1",
    name: "Congo Cross Pump Station",
    type: "pump",
    status: "healthy",
    lat: 8.4731,
    lng: -13.2611,
    detail: "Booster pumping toward west-end network.",
    metrics: [
      { label: "Pressure", value: "4.2 bar" },
      { label: "Flow", value: "38 L/s" },
      { label: "Power", value: "Nominal" },
    ],
  },
  {
    id: "pump-2",
    name: "Kissy Pump Station",
    type: "pump",
    status: "critical",
    lat: 8.4642,
    lng: -13.1894,
    detail: "Pump 3 reporting bearing over-temperature.",
    metrics: [
      { label: "Pressure", value: "2.1 bar" },
      { label: "Flow", value: "11 L/s" },
      { label: "Power", value: "Fault" },
    ],
  },
  {
    id: "leak-1",
    name: "Pipeline Leak L-2207",
    type: "leak",
    status: "critical",
    lat: 8.4555,
    lng: -13.2456,
    detail: "Major burst detected on 400mm trunk main.",
    metrics: [
      { label: "Est. Loss", value: "14 L/s" },
      { label: "Severity", value: "Critical" },
      { label: "Crew", value: "En route" },
    ],
  },
  {
    id: "leak-2",
    name: "Pipeline Leak L-2210",
    type: "leak",
    status: "warning",
    lat: 8.4419,
    lng: -13.2702,
    detail: "Pressure anomaly suggesting minor seepage.",
    metrics: [
      { label: "Est. Loss", value: "3 L/s" },
      { label: "Severity", value: "Moderate" },
      { label: "Crew", value: "Scheduled" },
    ],
  },
  {
    id: "sensor-1",
    name: "IoT Cluster Aberdeen",
    type: "sensor",
    status: "healthy",
    lat: 8.4781,
    lng: -13.2856,
    detail: "Coastal monitoring sensor array.",
    metrics: [
      { label: "Nodes", value: "42 online" },
      { label: "Battery", value: "88%" },
      { label: "Signal", value: "Strong" },
    ],
  },
  {
    id: "team-1",
    name: "Field Crew Bravo",
    type: "team",
    status: "warning",
    lat: 8.4512,
    lng: -13.2333,
    detail: "Maintenance team assigned to L-2207.",
    metrics: [
      { label: "ETA", value: "8 min" },
      { label: "Members", value: "4" },
      { label: "Job", value: "Burst repair" },
    ],
  },
]

export interface QualityMetric {
  id: string
  label: string
  value: number
  unit: string
  min: number
  max: number
  optimalLow: number
  optimalHigh: number
  status: Status
  trend: Trend
}

export const qualityMetrics: QualityMetric[] = [
  { id: "ph", label: "pH Level", value: 7.2, unit: "", min: 0, max: 14, optimalLow: 6.5, optimalHigh: 8.5, status: "healthy", trend: "up" },
  { id: "temp", label: "Temperature", value: 24.6, unit: "C", min: 0, max: 40, optimalLow: 15, optimalHigh: 28, status: "healthy", trend: "up" },
  { id: "turbidity", label: "Turbidity", value: 3.8, unit: "NTU", min: 0, max: 10, optimalLow: 0, optimalHigh: 5, status: "warning", trend: "up" },
  { id: "tds", label: "TDS", value: 312, unit: "ppm", min: 0, max: 1000, optimalLow: 50, optimalHigh: 500, status: "healthy", trend: "down" },
  { id: "conductivity", label: "Conductivity", value: 540, unit: "uS", min: 0, max: 2000, optimalLow: 200, optimalHigh: 800, status: "healthy", trend: "up" },
  { id: "chlorine", label: "Chlorine", value: 0.62, unit: "mg/L", min: 0, max: 4, optimalLow: 0.2, optimalHigh: 1, status: "healthy", trend: "down" },
  { id: "level", label: "Water Level", value: 78, unit: "%", min: 0, max: 100, optimalLow: 40, optimalHigh: 95, status: "healthy", trend: "up" },
  { id: "pressure", label: "Pressure", value: 4.1, unit: "bar", min: 0, max: 8, optimalLow: 3, optimalHigh: 6, status: "healthy", trend: "down" },
  { id: "flow", label: "Flow Rate", value: 38.4, unit: "L/s", min: 0, max: 80, optimalLow: 20, optimalHigh: 60, status: "healthy", trend: "up" },
]

function series(base: number, variance: number, points = 24) {
  const out: { t: string; a: number; b: number }[] = []
  for (let i = 0; i < points; i++) {
    const hour = i.toString().padStart(2, "0") + ":00"
    const wave = Math.sin(i / 3) * variance
    const wave2 = Math.cos(i / 4) * variance * 0.7
    out.push({
      t: hour,
      a: Math.round((base + wave + (Math.random() - 0.5) * variance * 0.4) * 10) / 10,
      b: Math.round((base * 0.82 + wave2 + (Math.random() - 0.5) * variance * 0.4) * 10) / 10,
    })
  }
  return out
}

export const flowData = series(38, 8)
export const pressureData = series(4.2, 0.7)
export const consumptionData = series(150, 40)
export const reservoirTrend = series(72, 12)
export const qualityTrend = series(95, 3)

export const distributionByDistrict = [
  { district: "Central", value: 42 },
  { district: "West", value: 38 },
  { district: "East", value: 51 },
  { district: "Wellington", value: 29 },
  { district: "Aberdeen", value: 24 },
]

export const pumpUtilization = [
  { name: "Online", value: 112, fill: "var(--color-chart-1)" },
  { name: "Standby", value: 8, fill: "var(--color-chart-3)" },
  { name: "Fault", value: 4, fill: "var(--color-destructive)" },
]

export const leakHistory = [
  { month: "Jan", detected: 18, resolved: 16 },
  { month: "Feb", detected: 14, resolved: 13 },
  { month: "Mar", detected: 21, resolved: 19 },
  { month: "Apr", detected: 12, resolved: 12 },
  { month: "May", detected: 9, resolved: 8 },
  { month: "Jun", detected: 7, resolved: 4 },
]

export interface Leak {
  id: string
  location: string
  pipeline: string
  severity: Status
  loss: string
  detected: string
  engineer: string
  state: "Investigating" | "Crew Dispatched" | "Repairing" | "Monitoring"
}

export const leaks: Leak[] = [
  { id: "L-2207", location: "Brookfields, Central", pipeline: "Trunk Main 400mm", severity: "critical", loss: "14 L/s", detected: "12 min ago", engineer: "M. Kamara", state: "Crew Dispatched" },
  { id: "L-2210", location: "Wilberforce, West", pipeline: "Dist. 200mm", severity: "warning", loss: "3 L/s", detected: "48 min ago", engineer: "A. Sesay", state: "Investigating" },
  { id: "L-2198", location: "Kissy, East", pipeline: "Service 110mm", severity: "warning", loss: "1.8 L/s", detected: "2 h ago", engineer: "F. Conteh", state: "Repairing" },
  { id: "L-2185", location: "Aberdeen, West", pipeline: "Dist. 160mm", severity: "healthy", loss: "0.4 L/s", detected: "5 h ago", engineer: "I. Bangura", state: "Monitoring" },
]

export interface PurificationStage {
  id: string
  name: string
  status: Status
  value: string
}

export const purificationStages: PurificationStage[] = [
  { id: "raw", name: "Raw Water Intake", status: "healthy", value: "94 ML/d" },
  { id: "sed", name: "Sedimentation", status: "healthy", value: "Clarity 89%" },
  { id: "filt", name: "Filtration", status: "healthy", value: "0.4 NTU" },
  { id: "carbon", name: "Activated Carbon", status: "warning", value: "Cycle 82%" },
  { id: "uv", name: "UV Sterilization", status: "healthy", value: "99.99%" },
  { id: "chlor", name: "Chlorination", status: "healthy", value: "0.6 mg/L" },
  { id: "safe", name: "Safe Drinking Water", status: "healthy", value: "Compliant" },
]

export interface Reservoir {
  id: string
  name: string
  capacity: number
  level: number
  temp: number
  pump: "Running" | "Standby" | "Fault"
  valve: "Open" | "Throttled" | "Closed"
  status: Status
  history: number[]
}

export const reservoirs: Reservoir[] = [
  { id: "r1", name: "Guma Dam", capacity: 84, level: 21.4, temp: 24.1, pump: "Running", valve: "Open", status: "healthy", history: [70, 74, 78, 80, 82, 83, 84] },
  { id: "r2", name: "Tower Hill", capacity: 41, level: 9.8, temp: 25.3, pump: "Running", valve: "Throttled", status: "warning", history: [62, 58, 54, 50, 47, 44, 41] },
  { id: "r3", name: "Mortormeh", capacity: 67, level: 16.2, temp: 23.8, pump: "Standby", valve: "Open", status: "healthy", history: [60, 62, 63, 65, 66, 66, 67] },
  { id: "r4", name: "Spur Road", capacity: 22, level: 4.1, temp: 26.1, pump: "Fault", valve: "Closed", status: "critical", history: [48, 42, 36, 31, 27, 24, 22] },
]

export interface Sensor {
  id: string
  gps: string
  battery: number
  signal: number
  lastUpdate: string
  status: Status
  online: boolean
}

export const sensors: Sensor[] = [
  { id: "SN-0142", gps: "8.41, -13.23", battery: 88, signal: 92, lastUpdate: "8s ago", status: "healthy", online: true },
  { id: "SN-0231", gps: "8.48, -13.23", battery: 64, signal: 71, lastUpdate: "12s ago", status: "healthy", online: true },
  { id: "SN-0388", gps: "8.46, -13.18", battery: 19, signal: 44, lastUpdate: "3m ago", status: "warning", online: true },
  { id: "SN-0415", gps: "8.45, -13.24", battery: 0, signal: 0, lastUpdate: "27m ago", status: "critical", online: false },
  { id: "SN-0502", gps: "8.47, -13.28", battery: 95, signal: 88, lastUpdate: "5s ago", status: "healthy", online: true },
  { id: "SN-0617", gps: "8.44, -13.27", battery: 72, signal: 80, lastUpdate: "18s ago", status: "healthy", online: true },
]

export interface AiPrediction {
  label: string
  value: string
  confidence: number
  status: Status
}

export const aiPredictions: AiPrediction[] = [
  { label: "Predicted Pipe Failure", value: "Trunk Main 400mm in ~6 days", confidence: 87, status: "critical" },
  { label: "Filter Replacement", value: "Carbon bed in ~9 days", confidence: 92, status: "warning" },
  { label: "Water Demand Forecast", value: "+12% next 48h (heatwave)", confidence: 78, status: "warning" },
  { label: "Leak Probability", value: "Elevated in East District", confidence: 81, status: "warning" },
]

export interface Alert {
  id: string
  type: string
  message: string
  severity: Status
  time: string
}

export const alerts: Alert[] = [
  { id: "a1", type: "Critical Leak", message: "Burst main L-2207, Brookfields", severity: "critical", time: "12 min ago" },
  { id: "a2", type: "Pump Failure", message: "Kissy Pump 3 bearing fault", severity: "critical", time: "21 min ago" },
  { id: "a3", type: "High Turbidity", message: "Tower Hill inlet 5.4 NTU", severity: "warning", time: "38 min ago" },
  { id: "a4", type: "Offline Sensor", message: "SN-0415 no signal 27 min", severity: "warning", time: "27 min ago" },
  { id: "a5", type: "Maintenance Due", message: "Carbon filter cycle at 82%", severity: "warning", time: "1 h ago" },
  { id: "a6", type: "Reservoir Low", message: "Spur Road capacity at 22%", severity: "critical", time: "1 h ago" },
  { id: "a7", type: "Unsafe pH", message: "East zone pH dipped to 6.4", severity: "healthy", time: "3 h ago" },
]

export interface MaintenanceTask {
  equipment: string
  location: string
  issue: string
  priority: "High" | "Medium" | "Low"
  team: string
  eta: string
  status: "Scheduled" | "In Progress" | "Awaiting Parts" | "Completed"
}

export const maintenanceTasks: MaintenanceTask[] = [
  { equipment: "Pump Station 3", location: "Kissy, East", issue: "Bearing over-temperature", priority: "High", team: "Crew Alpha", eta: "Today 16:30", status: "In Progress" },
  { equipment: "Trunk Main 400mm", location: "Brookfields", issue: "Burst pipe repair", priority: "High", team: "Crew Bravo", eta: "Today 14:10", status: "In Progress" },
  { equipment: "Carbon Filter Bed", location: "Guma Plant", issue: "Media replacement", priority: "Medium", team: "Crew Delta", eta: "Jun 18", status: "Awaiting Parts" },
  { equipment: "Valve V-118", location: "Wilberforce", issue: "Actuator calibration", priority: "Low", team: "Crew Echo", eta: "Jun 19", status: "Scheduled" },
  { equipment: "Sensor SN-0415", location: "Brookfields", issue: "Battery & comms module", priority: "Medium", team: "Crew Alpha", eta: "Jun 17", status: "Scheduled" },
]

export interface CitizenReport {
  id: string
  name: string
  location: string
  issue: string
  status: "New" | "Verified" | "Assigned" | "Resolved"
  officer: string
}

export const citizenReports: CitizenReport[] = [
  { id: "CR-9012", name: "Aminata Bah", location: "Lumley, West", issue: "Low water pressure", status: "Assigned", officer: "A. Sesay" },
  { id: "CR-9008", name: "Mohamed Turay", location: "Kissy, East", issue: "Discolored water", status: "Verified", officer: "F. Conteh" },
  { id: "CR-9001", name: "Fatmata Koroma", location: "Aberdeen", issue: "Visible street leak", status: "Resolved", officer: "I. Bangura" },
  { id: "CR-8997", name: "Ibrahim Sankoh", location: "Wellington", issue: "No supply 2 days", status: "New", officer: "Unassigned" },
]

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { id: "quality", label: "Water Quality", icon: "droplets" },
  { id: "purification", label: "Purification", icon: "filter" },
  { id: "reservoirs", label: "Reservoirs", icon: "database" },
  { id: "distribution", label: "Distribution Network", icon: "share-2" },
  { id: "pipeline", label: "Pipeline Monitoring", icon: "git-branch" },
  { id: "leak", label: "Leak Detection", icon: "alert-triangle" },
  { id: "pressure", label: "Pressure Monitoring", icon: "gauge" },
  { id: "flow", label: "Flow Monitoring", icon: "waves" },
  { id: "iot", label: "IoT Sensors", icon: "radio" },
  { id: "gis", label: "GIS Map", icon: "map" },
  { id: "ai", label: "AI Predictions", icon: "brain" },
  { id: "maintenance", label: "Maintenance", icon: "wrench" },
  { id: "citizen", label: "Citizen Reports", icon: "users" },
  { id: "analytics", label: "Analytics", icon: "bar-chart-3" },
  { id: "alerts", label: "Alerts", icon: "bell" },
  { id: "reports", label: "Reports", icon: "file-text" },
  { id: "settings", label: "Settings", icon: "settings" },
]
