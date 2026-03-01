// ─── Navigation Items ───────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: "dashboard",  icon: "⊞",  label: "Dashboard" },
  { id: "alerts",     icon: "⚠",  label: "Active Alerts", badge: 7 },
  { id: "tracking",   icon: "◉",  label: "Live Tracking" },
  { id: "tourists",   icon: "👤", label: "Tourist Database" },
  { id: "efir",       icon: "📋", label: "E-FIR Records" },
  { id: "ai",         icon: "🧠", label: "AI Flags" },
  { id: "blockchain", icon: "🔗", label: "Blockchain ID" },
  { id: "iot",        icon: "📡", label: "IoT Monitoring" },
  { id: "reports",    icon: "📊", label: "Reports" },
  { id: "settings",   icon: "⚙",  label: "Settings" },
];

// ─── Summary Card Data ───────────────────────────────────────────────────────
export const SUMMARY_CARDS = [
  {
    label:"Active Incidents", value:14, delta:"3 since last hour", deltaUp:false,
    icon:"🚨", iconBg:"rgba(239,68,68,0.18)", shadow:"rgba(239,68,68,0.3)",
    glow:"rgba(239,68,68,0.4)", strip:"#ef4444",
  },
  {
    label:"High-Risk Tourists", value:28, delta:"5 flagged today", deltaUp:false,
    icon:"⚠️", iconBg:"rgba(245,158,11,0.18)", shadow:"rgba(245,158,11,0.3)",
    glow:"rgba(245,158,11,0.35)", strip:"#f59e0b",
  },
  {
    label:"Safety Score Avg", value:"82.4", unit:"/100", delta:"1.2 pts", deltaUp:true,
    icon:"🛡️", iconBg:"rgba(34,197,94,0.18)", shadow:"rgba(34,197,94,0.3)",
    glow:"rgba(34,197,94,0.35)", strip:"#22c55e",
  },
  {
    label:"Pending E-FIR", value:6, delta:"2 critical pending", deltaUp:false,
    icon:"📋", iconBg:"rgba(99,102,241,0.18)", shadow:"rgba(99,102,241,0.3)",
    glow:"rgba(99,102,241,0.35)", strip:"#6366f1",
  },
];

// ─── AI Anomaly Alerts ───────────────────────────────────────────────────────
export const AI_ALERTS = [
  { type: "Sudden Inactivity", tourist: "Maria Santos",  time: "2 min ago",  sev: "red",    icon: "💤" },
  { type: "Route Deviation",   tourist: "James Liu",     time: "5 min ago",  sev: "yellow", icon: "↗"  },
  { type: "Panic Button",      tourist: "Priya Nair",    time: "Just now",   sev: "red",    icon: "🆘" },
  { type: "Missing Tourist",   tourist: "Carlos Mendez", time: "18 min ago", sev: "red",    icon: "🔍" },
  { type: "Route Deviation",   tourist: "Aiko Tanaka",   time: "11 min ago", sev: "yellow", icon: "↗"  },
];

// ─── Active Cases ────────────────────────────────────────────────────────────
export const CASES = [
  { id: "INC-2024-0891", name: "Maria Santos",  risk: "Critical", unit: "Unit-7", status: "Active",       ai: true,  iot: "❤️" },
  { id: "INC-2024-0890", name: "James Liu",     risk: "High",     unit: "Unit-3", status: "Investigating",ai: true,  iot: "📶" },
  { id: "INC-2024-0889", name: "Carlos Mendez", risk: "Critical", unit: "Unit-2", status: "Dispatched",   ai: true,  iot: "⚠️" },
  { id: "INC-2024-0888", name: "Priya Nair",    risk: "High",     unit: "Unit-5", status: "Active",       ai: false, iot: "❤️" },
  { id: "INC-2024-0887", name: "Aiko Tanaka",   risk: "Medium",   unit: "Unit-9", status: "Monitoring",   ai: true,  iot: "📶" },
  { id: "INC-2024-0886", name: "David Okafor",  risk: "Low",      unit: "Unit-1", status: "Resolved",     ai: false, iot: "❤️" },
];

// ─── Selected Tourist (Incident Detail) ─────────────────────────────────────
export const SELECTED_TOURIST = {
  name:      "Priya Nair",
  id:        "TID-BC-7823-IN",
  location:  "Sector 14-B, Old City Zone",
  score:     61,
  itinerary: "Arrival → Heritage Walk → Riverside Hotel → Temple Tour",
  contacts:  ["+91 98110 23456", "Embassy: +91 11 2419 8000"],
};

// ─── Live Map Dots ───────────────────────────────────────────────────────────
export const MAP_DOTS = [
  { x: 22, y: 35, type: "tourist", color: "#22c55e" },
  { x: 45, y: 28, type: "tourist", color: "#22c55e" },
  { x: 60, y: 55, type: "alert",   color: "#ef4444" },
  { x: 30, y: 65, type: "tourist", color: "#f59e0b" },
  { x: 75, y: 40, type: "tourist", color: "#22c55e" },
  { x: 50, y: 70, type: "police",  color: "#3b82f6" },
  { x: 15, y: 50, type: "police",  color: "#3b82f6" },
  { x: 85, y: 25, type: "tourist", color: "#22c55e" },
  { x: 65, y: 80, type: "alert",   color: "#ef4444" },
  { x: 38, y: 42, type: "tourist", color: "#f59e0b" },
];

// ─── Heatmap Danger Zones ────────────────────────────────────────────────────
export const HEATMAP_ZONES = [
  { x: 55, y: 50, r: 120 },
  { x: 62, y: 78, r: 80  },
];

// ─── Helper Color Functions ──────────────────────────────────────────────────
export const riskColor   = (r) =>
  r === "Critical" ? "#ef4444" : r === "High" ? "#f59e0b" : r === "Medium" ? "#3b82f6" : "#22c55e";

export const statusColor = (s) =>
  s === "Active" || s === "Dispatched" ? "#ef4444"
  : s === "Investigating" ? "#f59e0b"
  : s === "Monitoring"    ? "#3b82f6"
  : "#22c55e";