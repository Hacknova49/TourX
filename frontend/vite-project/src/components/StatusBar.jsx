const ITEMS = [
  { label:"System",     value:"Operational",  dot:"#4ade80" },
  { label:"Blockchain", value:"Synced",        dot:"#4ade80" },
  { label:"AI Engine",  value:"v4.2 Active",  dot:"#4ade80" },
  { label:"IoT Nodes",  value:"342 / 350",    dot:"#fbbf24" },
];

export default function StatusBar() {
  return (
    <footer style={{
      height:34, flexShrink:0,
      background:"rgba(6,9,17,0.97)",
      borderTop:"1px solid rgba(255,255,255,0.05)",
      display:"flex", alignItems:"center",
      padding:"0 20px", gap:6,
    }}>
      {ITEMS.map((item, i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
          {i > 0 && <div style={{ width:1, height:12, background:"rgba(255,255,255,0.07)", margin:"0 8px" }}/>}
          <span style={{ width:6, height:6, borderRadius:"50%", background:item.dot, display:"inline-block", boxShadow:`0 0 5px ${item.dot}80` }}/>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.28)" }}>{item.label}:</span>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{item.value}</span>
        </div>
      ))}
      <div style={{ marginLeft:"auto", fontSize:11, color:"rgba(255,255,255,0.18)" }}>
        National Tourist Safety Command · AES-256 Encrypted
      </div>
    </footer>
  );
}