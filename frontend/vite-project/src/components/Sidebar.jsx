const NAV = [
  { id:"dashboard",  label:"Dashboard",        icon:"dashboard"  },
  { id:"alerts",     label:"Active Alerts",     icon:"alert",  badge:7 },
  { id:"tracking",   label:"Live Tracking",     icon:"tracking"   },
  { id:"tourists",   label:"Tourist Database",  icon:"users"      },
  { id:"efir",       label:"E-FIR Records",     icon:"file"       },
  { id:"ai",         label:"AI Flags",          icon:"ai"         },
  { id:"blockchain", label:"Blockchain ID",     icon:"chain"      },
  { id:"iot",        label:"IoT Monitoring",    icon:"wifi"       },
  { id:"reports",    label:"Reports",           icon:"chart"      },
  { id:"settings",   label:"Settings",          icon:"settings"   },
];

const ICONS = {
  dashboard: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  alert:     <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  tracking:  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>,
  users:     <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  file:      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>,
  ai:        <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 6v6l4 2"/></svg>,
  chain:     <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  wifi:      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/></svg>,
  chart:     <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  settings:  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
};

export default function Sidebar({ open, activeNav, onNavChange }) {
  return (
    <>
      {/* Overlay on mobile */}
      {open && (
        <div
          onClick={() => onNavChange(activeNav)}
          style={{
            display: "none",
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 49, backdropFilter: "blur(2px)",
          }}
          className="sidebar-overlay"
        />
      )}

      <aside style={{
        width: 220,
        flexShrink: 0,
        background: "rgba(10,14,25,0.97)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        padding: "12px 10px 16px",
        overflowY: "auto",
        overflowX: "hidden",
        transition: "transform .28s cubic-bezier(.4,0,.2,1)",
      }}>

        {/* Section label */}
        <div style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.25)", letterSpacing:1.2, padding:"4px 8px 8px", textTransform:"uppercase" }}>
          Navigation
        </div>

        {/* Nav items */}
        <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
          {NAV.map(item => {
            const active = activeNav === item.id;
            return (
              <div
                key={item.id}
                className="nav-item"
                onClick={() => onNavChange(item.id)}
                style={{
                  display:"flex", alignItems:"center", gap:10,
                  padding:"9px 10px", borderRadius:10,
                  background: active ? "rgba(99,102,241,0.15)" : "transparent",
                  position:"relative",
                }}
              >
                {/* Active left bar */}
                {active && (
                  <div style={{
                    position:"absolute", left:0, top:"15%", bottom:"15%",
                    width:3, borderRadius:"0 3px 3px 0",
                    background:"linear-gradient(180deg,#a5b4fc,#6366f1)",
                  }}/>
                )}

                <span style={{ color: active ? "#a5b4fc" : "rgba(255,255,255,0.38)", flexShrink:0 }}>
                  {ICONS[item.icon]}
                </span>

                <span style={{
                  fontSize:13.5, fontWeight: active ? 600 : 400,
                  color: active ? "#c7d2fe" : "rgba(255,255,255,0.5)",
                  flex:1, whiteSpace:"nowrap",
                }}>
                  {item.label}
                </span>

                {item.badge && (
                  <span style={{
                    background:"#ef4444", color:"#fff",
                    borderRadius:99, fontSize:10, fontWeight:700,
                    padding:"1px 6px", minWidth:18, textAlign:"center",
                  }}>{item.badge}</span>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ flex:1 }} />

        {/* Footer */}
        <div style={{
          borderTop:"1px solid rgba(255,255,255,0.06)",
          paddingTop:12, marginTop:8,
          fontSize:11, color:"rgba(255,255,255,0.2)", lineHeight:1.6,
          padding:"12px 10px 0",
        }}>
          <div style={{ fontWeight:600, color:"rgba(255,255,255,0.3)" }}>SafeTrack v2.4.1</div>
          <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:3 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", display:"inline-block" }}/>
            All systems operational
          </div>
        </div>
      </aside>
    </>
  );
}