import { SELECTED_TOURIST } from "./constants.js";

const VITALS = [
  { label:"Heart Rate", value:"72 bpm", icon:"❤️", color:"#f87171", bg:"rgba(248,113,113,0.1)" },
  { label:"GPS",        value:"Active",  icon:"📍", color:"#60a5fa", bg:"rgba(96,165,250,0.1)"  },
  { label:"Battery",    value:"68%",     icon:"🔋", color:"#fbbf24", bg:"rgba(251,191,36,0.1)"  },
];

const ACTIONS = [
  { label:"View Digital ID", color:"#818cf8", bg:"rgba(99,102,241,0.12)", border:"rgba(99,102,241,0.25)" },
  { label:"Generate E-FIR",  color:"#fbbf24", bg:"rgba(245,158,11,0.1)",  border:"rgba(245,158,11,0.25)"  },
  { label:"Dispatch Unit",   color:"#f87171", bg:"rgba(239,68,68,0.1)",   border:"rgba(239,68,68,0.22)"   },
  { label:"Mark Resolved",   color:"#4ade80", bg:"rgba(34,197,94,0.1)",   border:"rgba(34,197,94,0.22)"   },
];

export default function IncidentDetail() {
  const t = SELECTED_TOURIST;
  return (
    <div style={{
      background:"rgba(255,255,255,0.04)",
      border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:16,
      display:"flex",
      flexDirection:"column",
      overflow:"hidden",
    }}>
      {/* Header */}
      <div style={{
        padding:"14px 18px 12px",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexShrink:0,
      }}>
        <span style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.7)" }}>Incident Detail</span>
        <span style={{
          fontSize:10, fontWeight:600, color:"#f87171",
          background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.2)",
          borderRadius:99, padding:"2px 8px",
        }}>● Active</span>
      </div>

      {/* Scrollable content */}
      <div style={{ padding:"16px 18px", display:"flex", flexDirection:"column", gap:14, overflowY:"auto" }}>

        {/* Profile */}
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{
            width:44, height:44, borderRadius:12, flexShrink:0,
            background:"linear-gradient(135deg,#7c3aed,#4f46e5)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:21,
            boxShadow:"0 4px 14px rgba(99,102,241,0.35)",
          }}>👩</div>
          <div>
            <div style={{ fontSize:15, fontWeight:700, fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#f0f6ff" }}>
              {t.name}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:4, flexWrap:"wrap" }}>
              <span style={{ fontSize:10.5, color:"rgba(255,255,255,0.3)", fontFamily:"'DM Mono',monospace" }}>{t.id}</span>
              <span style={{
                fontSize:9.5, color:"#4ade80", fontWeight:600,
                background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.2)",
                borderRadius:99, padding:"1px 8px",
              }}>🔗 Blockchain Verified</span>
            </div>
          </div>
        </div>

        {/* Info rows */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            ["📍","Last Location", t.location],
            ["🗺","Itinerary", t.itinerary],
            ["📞","Emergency", t.contacts.join("  ·  ")],
          ].map(([icon,label,val]) => (
            <div key={label} style={{ display:"flex", gap:10 }}>
              <span style={{ fontSize:14, opacity:.5, flexShrink:0, marginTop:1 }}>{icon}</span>
              <div>
                <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.32)", marginBottom:2 }}>{label}</div>
                <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.78)", lineHeight:1.5 }}>{val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Safety score */}
        <div style={{
          background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)",
          borderRadius:10, padding:"12px 14px",
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.45)" }}>🛡 Safety Score</span>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:14, fontWeight:700, color:"#fbbf24" }}>{t.score}<span style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontWeight:400 }}>/100</span></span>
              <span style={{ fontSize:10, color:"#f87171", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:99, padding:"1px 7px" }}>High Risk</span>
            </div>
          </div>
          <div style={{ height:5, background:"rgba(255,255,255,0.08)", borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${t.score}%`, background:"linear-gradient(90deg,#ef4444,#fbbf24)", borderRadius:99, transition:"width .6s" }}/>
          </div>
        </div>

        {/* IoT Vitals */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {VITALS.map(v => (
            <div key={v.label} style={{
              background:v.bg, borderRadius:10, padding:"10px 8px", textAlign:"center",
              border:`1px solid ${v.color}22`,
            }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{v.icon}</div>
              <div style={{ fontSize:13, fontWeight:600, color:v.color }}>{v.value}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:2 }}>{v.label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
          {ACTIONS.map(a => (
            <button key={a.label} className="action-btn" style={{
              background:a.bg, color:a.color, border:`1px solid ${a.border}`,
              borderRadius:9, padding:"9px 10px", fontSize:12, fontWeight:500,
            }}>{a.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}