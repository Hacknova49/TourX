import { SUMMARY_CARDS } from "./constants.js";

export default function SummaryCards() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 14,
    }}>
      {SUMMARY_CARDS.map((card, i) => <StatCard key={i} card={card} />)}
    </div>
  );
}

function StatCard({ card }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14,
      padding: "16px 18px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      position: "relative",
      overflow: "hidden",
      transition: "border-color .2s, box-shadow .2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.13)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(0,0,0,0.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow="none"; }}
    >
      {/* Glow */}
      <div style={{
        position:"absolute", top:-20, right:-20, width:80, height:80,
        borderRadius:"50%", background:card.glow,
        filter:"blur(30px)", opacity:.45, pointerEvents:"none",
      }}/>

      {/* Icon */}
      <div style={{
        width:42, height:42, borderRadius:12, flexShrink:0,
        background:card.iconBg, fontSize:19,
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:`0 4px 16px ${card.shadow}`,
      }}>{card.icon}</div>

      {/* Text */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontWeight:500, marginBottom:4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
          {card.label}
        </div>
        <div style={{ display:"flex", alignItems:"baseline", gap:3, marginBottom:6 }}>
          <span style={{ fontSize:28, fontWeight:700, color:"#f0f6ff", fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>
            {card.value}
          </span>
          {card.unit && <span style={{ fontSize:13, color:"rgba(255,255,255,0.28)", fontWeight:400 }}>{card.unit}</span>}
        </div>
        <span style={{
          display:"inline-flex", alignItems:"center", gap:3,
          fontSize:11, fontWeight:500,
          color: card.deltaUp ? "#4ade80" : "#f87171",
          background: card.deltaUp ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
          border: `1px solid ${card.deltaUp ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
          borderRadius:99, padding:"2px 8px",
        }}>
          {card.deltaUp ? "↑" : "↓"} {card.delta}
        </span>
      </div>

      {/* Bottom strip */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg,${card.strip}88,transparent)`,
      }}/>
    </div>
  );
}