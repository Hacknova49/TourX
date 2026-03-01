import { useState } from "react";
import { AI_ALERTS } from "./constants.js";

export default function TopNav({ sidebarOpen, onToggleSidebar }) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header style={{
      height: 58,
      background: "rgba(8,12,20,0.95)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(20px)",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      gap: 14,
      position: "sticky",
      top: 0,
      zIndex: 100,
      flexShrink: 0,
    }}>

      {/* Hamburger + Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
        <button
          onClick={onToggleSidebar}
          style={{
            width:36, height:36, borderRadius:9,
            background:"rgba(255,255,255,0.05)",
            border:"1px solid rgba(255,255,255,0.08)",
            cursor:"pointer", display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:5,
          }}
        >
          <span style={{ width:16, height:1.5, background:"rgba(255,255,255,0.6)", borderRadius:99, display:"block", transition:"all .25s", transform: sidebarOpen ? "rotate(45deg) translateY(3.5px)" : "none" }} />
          <span style={{ width:16, height:1.5, background:"rgba(255,255,255,0.6)", borderRadius:99, display:"block", opacity: sidebarOpen ? 0 : 1, transition:"opacity .2s" }} />
          <span style={{ width:16, height:1.5, background:"rgba(255,255,255,0.6)", borderRadius:99, display:"block", transition:"all .25s", transform: sidebarOpen ? "rotate(-45deg) translateY(-3.5px)" : "none" }} />
        </button>

        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{
            width:32, height:32, borderRadius:9,
            background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:16, boxShadow:"0 4px 12px rgba(99,102,241,0.4)",
          }}>🛡️</div>
          <div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:13.5, color:"#e8edf5", letterSpacing:-.2 }}>SafeTrack</div>
            <div style={{ fontSize:9.5, color:"rgba(255,255,255,0.3)", letterSpacing:.3 }}>National Tourist Safety</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ flex:1, maxWidth:380, position:"relative", marginLeft:8 }}>
        <svg style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", opacity:.35, pointerEvents:"none" }} width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          placeholder="Search tourists, incidents, zones…"
          style={{
            width:"100%", background:"rgba(255,255,255,0.05)",
            border:"1px solid rgba(255,255,255,0.08)", borderRadius:10,
            padding:"8px 12px 8px 33px", color:"rgba(255,255,255,0.85)",
            fontSize:13, transition:"border .2s, background .2s",
          }}
          onFocus={e => { e.target.style.borderColor="rgba(99,102,241,0.5)"; e.target.style.background="rgba(99,102,241,0.06)"; }}
          onBlur={e => { e.target.style.borderColor="rgba(255,255,255,0.08)"; e.target.style.background="rgba(255,255,255,0.05)"; }}
        />
      </div>

      <div style={{ flex:1 }} />

      {/* Live badge */}
      <div style={{
        display:"flex", alignItems:"center", gap:6,
        background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.2)",
        borderRadius:99, padding:"5px 12px", flexShrink:0,
      }}>
        <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", display:"inline-block", animation:"pulse-dot 2s ease-in-out infinite" }} />
        <span style={{ fontSize:11, fontWeight:600, color:"#4ade80" }}>Live</span>
      </div>

      {/* Language */}
      <select style={{
        background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:8, color:"rgba(255,255,255,0.65)", padding:"6px 10px",
        fontSize:12, flexShrink:0,
      }}>
        <option>EN</option><option>HI</option><option>TA</option><option>FR</option>
      </select>

      {/* Notifications */}
      <div style={{ position:"relative", flexShrink:0 }}>
        <button
          onClick={() => setNotifOpen(o => !o)}
          style={{
            width:36, height:36, borderRadius:9,
            background:"rgba(255,255,255,0.05)",
            border:"1px solid rgba(255,255,255,0.08)",
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", position:"relative",
          }}
        >
          <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span style={{
            position:"absolute", top:5, right:5, width:8, height:8,
            background:"#ef4444", borderRadius:"50%",
            border:"1.5px solid #080c14",
          }} />
        </button>

        {notifOpen && (
          <div style={{
            position:"absolute", right:0, top:44, width:288,
            background:"#111827", border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:14, zIndex:200, overflow:"hidden",
            boxShadow:"0 20px 50px rgba(0,0,0,0.5)",
            animation:"fade-up .18s ease",
          }}>
            <div style={{ padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontSize:13, fontWeight:600 }}>Notifications</span>
              <span style={{ fontSize:11, color:"#f87171", fontWeight:500 }}>7 unread</span>
            </div>
            {AI_ALERTS.map((a, i) => (
              <div key={i} className="row-item" style={{
                padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,0.05)",
                display:"flex", gap:11, alignItems:"flex-start",
              }}>
                <div style={{
                  width:32, height:32, borderRadius:8, flexShrink:0,
                  background: a.sev==="red" ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.15)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:14,
                }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize:12.5, fontWeight:500, color:"#e8edf5" }}>{a.type}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.38)", marginTop:2 }}>{a.tourist} · {a.time}</div>
                </div>
              </div>
            ))}
            <div style={{ padding:"10px 16px", textAlign:"center" }}>
              <span style={{ fontSize:12, color:"#818cf8", cursor:"pointer" }}>View all alerts →</span>
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", padding:"5px 8px", borderRadius:10, transition:"background .15s", flexShrink:0 }}
        onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.05)"}
        onMouseLeave={e => e.currentTarget.style.background="transparent"}
      >
        <div style={{
          width:32, height:32, borderRadius:9,
          background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:15,
        }}>👮</div>
        <div>
          <div style={{ fontSize:12.5, fontWeight:600 }}>Insp. Sharma</div>
          <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.35)" }}>Control Room A</div>
        </div>
      </div>
    </header>
  );
}