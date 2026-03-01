import { useState } from "react";
import { CASES } from "./constants.js";

const RISK = {
  Critical:{ color:"#f87171", bg:"rgba(239,68,68,0.12)", border:"rgba(239,68,68,0.25)" },
  High:    { color:"#fbbf24", bg:"rgba(245,158,11,0.12)", border:"rgba(245,158,11,0.25)" },
  Medium:  { color:"#a5b4fc", bg:"rgba(99,102,241,0.12)", border:"rgba(99,102,241,0.25)" },
  Low:     { color:"#4ade80", bg:"rgba(34,197,94,0.1)",   border:"rgba(34,197,94,0.22)" },
};

const STATUS = {
  Active:        "#f87171",
  Dispatched:    "#fb923c",
  Investigating: "#fbbf24",
  Monitoring:    "#60a5fa",
  Resolved:      "#4ade80",
};

export default function CaseTable() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? CASES : CASES.filter(c => c.risk === filter || c.status === filter);

  return (
    <div style={{
      background:"rgba(255,255,255,0.04)",
      border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:16,
      display:"flex", flexDirection:"column",
      overflow:"hidden",
    }}>
      {/* Header */}
      <div style={{
        padding:"14px 20px 12px",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        display:"flex", alignItems:"center", gap:10,
        flexShrink:0, flexWrap:"wrap",
      }}>
        <span style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.7)" }}>Active Cases</span>
        <span style={{
          fontSize:11, fontWeight:600, color:"#818cf8",
          background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.25)",
          borderRadius:99, padding:"1px 8px",
        }}>{filtered.length}</span>

        <div style={{ marginLeft:"auto", display:"flex", gap:5, flexWrap:"wrap" }}>
          {["All","Critical","Active","Resolved"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontSize:11, fontWeight:500, padding:"4px 11px", borderRadius:99, cursor:"pointer",
              background: filter===f ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
              color: filter===f ? "#a5b4fc" : "rgba(255,255,255,0.4)",
              border: filter===f ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.08)",
              transition:"all .15s", fontFamily:"inherit",
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX:"auto", overflowY:"auto", flex:1 }}>
        <table style={{ width:"100%", borderCollapse:"collapse", minWidth:600 }}>
          <thead>
            <tr style={{ borderBottom:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.02)" }}>
              {["Case ID","Tourist","Risk","Unit","Status","AI","Action"].map(h => (
                <th key={h} style={{
                  padding:"9px 14px", textAlign:"left",
                  fontSize:11, color:"rgba(255,255,255,0.3)", fontWeight:600,
                  letterSpacing:.5, whiteSpace:"nowrap",
                  position:"sticky", top:0, background:"rgba(10,14,25,0.95)", zIndex:1,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const rs = RISK[c.risk] || RISK.Low;
              const sc = STATUS[c.status] || "#888";
              return (
                <tr key={i} className="row-item" style={{
                  borderBottom:"1px solid rgba(255,255,255,0.04)",
                }}>
                  <td style={{ padding:"11px 14px", fontFamily:"'DM Mono',monospace", fontSize:11.5, color:"#818cf8" }}>{c.id}</td>
                  <td style={{ padding:"11px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{
                        width:28, height:28, borderRadius:8, flexShrink:0,
                        background:"linear-gradient(135deg,rgba(79,70,229,0.5),rgba(124,58,237,0.5))",
                        display:"flex", alignItems:"center", justifyContent:"center", fontSize:13,
                      }}>👤</div>
                      <span style={{ fontSize:13, color:"rgba(255,255,255,0.82)", fontWeight:500 }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:"11px 14px" }}>
                    <span style={{
                      background:rs.bg, border:`1px solid ${rs.border}`,
                      color:rs.color, borderRadius:99,
                      padding:"3px 10px", fontSize:11.5, fontWeight:600,
                    }}>{c.risk}</span>
                  </td>
                  <td style={{ padding:"11px 14px", fontSize:12.5, color:"rgba(255,255,255,0.4)" }}>{c.unit}</td>
                  <td style={{ padding:"11px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:sc, display:"inline-block", flexShrink:0 }}/>
                      <span style={{ fontSize:12.5, color:sc }}>{c.status}</span>
                    </div>
                  </td>
                  <td style={{ padding:"11px 14px" }}>
                    {c.ai
                      ? <span style={{ fontSize:11, color:"#c4b5fd", background:"rgba(139,92,246,0.15)", border:"1px solid rgba(139,92,246,0.3)", borderRadius:99, padding:"2px 8px" }}>AI ✦</span>
                      : <span style={{ color:"rgba(255,255,255,0.15)", fontSize:13 }}>—</span>
                    }
                  </td>
                  <td style={{ padding:"11px 14px" }}>
                    <div style={{ display:"flex", gap:5 }}>
                      <button className="action-btn" style={{
                        background:"rgba(99,102,241,0.14)", color:"#a5b4fc",
                        border:"1px solid rgba(99,102,241,0.25)", borderRadius:7,
                        padding:"4px 11px", fontSize:11.5, fontWeight:500,
                      }}>View</button>
                      <button className="action-btn" style={{
                        background:"rgba(239,68,68,0.1)", color:"#f87171",
                        border:"1px solid rgba(239,68,68,0.22)", borderRadius:7,
                        padding:"4px 11px", fontSize:11.5, fontWeight:500,
                      }}>E-FIR</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        padding:"9px 20px", borderTop:"1px solid rgba(255,255,255,0.06)",
        display:"flex", gap:16, alignItems:"center", flexShrink:0, flexWrap:"wrap",
      }}>
        {[["Critical","#f87171"],["High","#fbbf24"],["Medium","#a5b4fc"],["Low","#4ade80"]].map(([l,c]) => (
          <span key={l} style={{ fontSize:11, color:"rgba(255,255,255,0.3)", display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:c, display:"inline-block" }}/>
            {l}: <b style={{ color:"rgba(255,255,255,0.55)" }}>{CASES.filter(x=>x.risk===l).length}</b>
          </span>
        ))}
        <span style={{ marginLeft:"auto", fontSize:11, color:"rgba(255,255,255,0.22)" }}>
          Synced {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}