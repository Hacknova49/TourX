import { useEffect, useRef, useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────
const MARKERS = [
  { id: 1,  lat: 26.9124, lng: 75.7873, type: "tourist", name: "Maria Santos",  detail: "Last seen: Hawa Mahal" },
  { id: 2,  lat: 26.9239, lng: 75.8267, type: "tourist", name: "James Liu",     detail: "Last seen: Amber Fort" },
  { id: 3,  lat: 26.8988, lng: 75.8069, type: "alert",   name: "Priya Nair",    detail: "Panic button activated" },
  { id: 4,  lat: 26.9055, lng: 75.7718, type: "tourist", name: "Carlos Mendez", detail: "Last seen: City Palace" },
  { id: 5,  lat: 26.9315, lng: 75.8012, type: "tourist", name: "Aiko Tanaka",   detail: "Route deviation flagged" },
  { id: 6,  lat: 26.9180, lng: 75.7950, type: "police",  name: "Unit-7",        detail: "On patrol – Sector 5" },
  { id: 7,  lat: 26.8920, lng: 75.7830, type: "police",  name: "Unit-3",        detail: "Responding to INC-0889" },
  { id: 8,  lat: 26.9410, lng: 75.8150, type: "tourist", name: "David Okafor",  detail: "Last seen: Jantar Mantar" },
  { id: 9,  lat: 26.8870, lng: 75.8200, type: "alert",   name: "Missing: T-09", detail: "No signal for 18 min" },
  { id: 10, lat: 26.9260, lng: 75.7650, type: "tourist", name: "Sara Kim",      detail: "Last seen: Nahargarh" },
  { id: 11, lat: 26.9000, lng: 75.7600, type: "police",  name: "Unit-5",        detail: "Standby – Base Camp" },
];

const DANGER_ZONES = [
  { lat: 26.8988, lng: 75.8069, radius: 600, label: "High-Risk Zone A", color: "#ef4444" },
  { lat: 26.8870, lng: 75.8200, radius: 420, label: "High-Risk Zone B", color: "#f97316" },
];

const CFG = {
  tourist: { pin: "#22c55e", pinDark: "#15803d", label: "TOURIST",  emoji: "👤" },
  alert:   { pin: "#ef4444", pinDark: "#b91c1c", label: "⚠ ALERT",  emoji: "🆘" },
  police:  { pin: "#1d4ed8", pinDark: "#1e3a8a", label: "POLICE",   emoji: "🚔" },
};

// Google Maps standard roadmap tiles (no API key needed for these)
const TILE_URL  = "https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
const TILE_ATTR = '&copy; <a href="https://maps.google.com">Google Maps</a>';

const LEAFLET_CSS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
const LEAFLET_JS  = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";

// ── Helpers ───────────────────────────────────────────────────────────────────
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}
function loadCSS(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const l = document.createElement("link"); l.rel = "stylesheet"; l.href = href;
  document.head.appendChild(l);
}

function injectGlobalStyles() {
  if (document.getElementById("lm-gmap-styles")) return;
  const st = document.createElement("style");
  st.id = "lm-gmap-styles";
  st.textContent = `
    @keyframes lm-ripple {
      0%   { transform:translate(-50%,-50%) scale(0.8); opacity:1; }
      100% { transform:translate(-50%,-50%) scale(2.8); opacity:0; }
    }
    @keyframes lm-pulse {
      0%,100% { box-shadow:0 2px 8px rgba(0,0,0,0.35), 0 0 0 0 rgba(239,68,68,0.6); }
      50%     { box-shadow:0 2px 8px rgba(0,0,0,0.35), 0 0 0 8px rgba(239,68,68,0); }
    }
    @keyframes lm-bounce {
      0%,100% { transform:translateY(0); }
      50%     { transform:translateY(-6px); }
    }
    @keyframes lm-spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }

    /* Leaflet overrides for Google Maps feel */
    .leaflet-container { font-family: 'Google Sans', Roboto, Arial, sans-serif !important; }

    /* Zoom controls — Google Maps style */
    .leaflet-control-zoom {
      border: none !important;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3) !important;
      border-radius: 2px !important;
    }
    .leaflet-control-zoom a {
      background: #fff !important;
      color: #666 !important;
      font-size: 18px !important;
      line-height: 28px !important;
      width: 28px !important;
      height: 28px !important;
      border-bottom: 1px solid #e0e0e0 !important;
      font-family: Arial, sans-serif !important;
    }
    .leaflet-control-zoom a:hover { background: #f5f5f5 !important; color: #333 !important; }
    .leaflet-control-zoom-in  { border-radius: 2px 2px 0 0 !important; }
    .leaflet-control-zoom-out { border-radius: 0 0 2px 2px !important; }

    /* Popups — Google Maps info window style */
    .leaflet-popup-content-wrapper {
      background: #fff !important;
      border-radius: 8px !important;
      box-shadow: 0 2px 7px 1px rgba(0,0,0,0.3) !important;
      padding: 0 !important;
      overflow: hidden;
      border: none !important;
    }
    .leaflet-popup-content { margin: 0 !important; }
    .leaflet-popup-tip-container { display:none !important; }
    .leaflet-popup-close-button {
      color: #999 !important;
      font-size: 20px !important;
      top: 6px !important; right: 8px !important;
      z-index: 1 !important;
    }
    .leaflet-popup-close-button:hover { color: #333 !important; }
    .leaflet-control-attribution {
      background: rgba(255,255,255,0.85) !important;
      color: #666 !important; font-size: 10px !important;
    }
    .leaflet-control-attribution a { color: #4285f4 !important; }

    /* Google Maps-style scale bar */
    .leaflet-control-scale-line {
      background: rgba(255,255,255,0.8) !important;
      border: 1px solid #999 !important;
      border-top: none !important;
      font-size: 10px !important;
    }
  `;
  document.head.appendChild(st);
}

// ── Google Maps-style drop pin SVG ────────────────────────────────────────────
function makePinIcon(L, type) {
  const c = CFG[type];
  const isAlert = type === "alert";

  // Classic Google Maps teardrop pin shape
  const pin = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
      <defs>
        <filter id="shadow-${type}" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
      </defs>
      <!-- Pin body -->
      <path d="M16 0 C7.163 0 0 7.163 0 16 C0 24.837 16 42 16 42 C16 42 32 24.837 32 16 C32 7.163 24.837 0 16 0 Z"
        fill="${c.pin}" filter="url(#shadow-${type})"/>
      <!-- Inner highlight -->
      <circle cx="16" cy="15" r="8" fill="rgba(255,255,255,0.2)"/>
      <!-- White circle center -->
      <circle cx="16" cy="15" r="6" fill="white"/>
      <!-- Inner dot -->
      <circle cx="16" cy="15" r="3.5" fill="${c.pin}"/>
    </svg>`;

  // For alert, add a pulsing ring
  const rippleHtml = isAlert ? `
    <div style="position:absolute;top:0;left:50%;
      width:44px;height:44px;border-radius:50%;
      border:2.5px solid ${c.pin};
      animation:lm-ripple 1.5s ease-out infinite;
      pointer-events:none;"></div>
    <div style="position:absolute;top:0;left:50%;
      width:44px;height:44px;border-radius:50%;
      border:2.5px solid ${c.pin};
      animation:lm-ripple 1.5s ease-out 0.6s infinite;
      pointer-events:none;"></div>` : "";

  const bounce = isAlert ? "animation:lm-bounce 1.8s ease-in-out infinite;" : "";

  const html = `
    <div style="position:relative;width:52px;height:52px;display:flex;align-items:flex-start;justify-content:center;">
      ${rippleHtml}
      <div style="position:relative;z-index:1;margin-top:4px;${bounce}">${pin}</div>
    </div>`;

  return L.divIcon({
    html,
    className:  "",
    iconSize:   [52, 52],
    iconAnchor: [26, 46],
    popupAnchor:[0, -48],
  });
}

// ── Google Maps-style info window ─────────────────────────────────────────────
function makePopup(m) {
  const c   = CFG[m.type];
  const badgeStyle = `background:${c.pin};color:#fff;font-size:9px;font-weight:700;
    letter-spacing:1px;padding:2px 7px;border-radius:3px;`;

  const statusRow = m.type === "alert"
    ? `<div style="display:flex;align-items:center;gap:5px;margin-top:6px;padding:6px 8px;
        background:#fef2f2;border-radius:4px;border-left:3px solid #ef4444;">
        <span style="font-size:11px;color:#b91c1c;font-weight:600;">🆘 ${m.detail}</span>
       </div>`
    : `<div style="font-size:11px;color:#666;margin-top:4px;">ℹ️ ${m.detail}</div>`;

  return `
    <div style="font-family:'Google Sans',Roboto,Arial,sans-serif;min-width:200px;overflow:hidden;">
      <!-- Header strip -->
      <div style="background:${c.pin};padding:10px 14px;padding-right:30px;">
        <div style="font-size:12px;font-weight:700;color:white;margin-bottom:3px;">${m.name}</div>
        <span style="${badgeStyle}">${c.label}</span>
      </div>
      <!-- Body -->
      <div style="padding:10px 14px 12px;">
        <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:#555;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="${c.pin}">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
          </svg>
          ${m.lat.toFixed(5)}°N, ${m.lng.toFixed(5)}°E
        </div>
        ${statusRow}
        <div style="display:flex;gap:8px;margin-top:10px;">
          <button onclick="void(0)" style="flex:1;background:#4285f4;color:#fff;border:none;border-radius:4px;
            padding:5px 0;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;">
            View Profile
          </button>
          ${m.type !== "police" ? `<button onclick="void(0)" style="flex:1;background:#fff;color:#4285f4;
            border:1px solid #dadce0;border-radius:4px;padding:5px 0;font-size:11px;
            font-weight:600;cursor:pointer;font-family:inherit;">
            Dispatch
          </button>` : ""}
        </div>
      </div>
    </div>`;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function LiveMap() {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const pingRefs     = useRef([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadCSS(LEAFLET_CSS);
    injectGlobalStyles();

    loadScript(LEAFLET_JS).then(() => {
      if (mapRef.current || !containerRef.current) return;
      const L = window.L;

      const map = L.map(containerRef.current, {
        center:             [26.9124, 75.7873],
        zoom:               13,
        zoomControl:        true,
        attributionControl: true,
        scrollWheelZoom:    true,
      });
      mapRef.current = map;

      // Google Maps standard tiles
      L.tileLayer(TILE_URL, {
        attribution: TILE_ATTR,
        subdomains:  ["0", "1", "2", "3"],
        maxZoom:     20,
      }).addTo(map);

      // Scale bar
      L.control.scale({ position: "bottomright", imperial: false }).addTo(map);

      // ── Danger zones (semi-transparent fill, Google Maps polygon style) ──
      DANGER_ZONES.forEach(z => {
        // Outer glow
        L.circle([z.lat, z.lng], {
          radius:      z.radius * 1.5,
          color:       z.color,
          weight:      0,
          fillColor:   z.color,
          fillOpacity: 0.04,
        }).addTo(map);

        // Main zone circle
        L.circle([z.lat, z.lng], {
          radius:      z.radius,
          color:       z.color,
          weight:      2,
          opacity:     0.7,
          dashArray:   "6 4",
          fillColor:   z.color,
          fillOpacity: 0.1,
        }).addTo(map);

        // Zone label — Google Maps floating label style
        L.marker([z.lat, z.lng], {
          icon: L.divIcon({
            html: `
              <div style="
                background:rgba(255,255,255,0.95);
                border:1px solid ${z.color};
                border-radius:12px;
                padding:3px 10px;
                font-family:'Google Sans',Roboto,Arial,sans-serif;
                font-size:11px;
                font-weight:600;
                color:${z.color};
                white-space:nowrap;
                box-shadow:0 1px 4px rgba(0,0,0,0.2);
                display:flex;align-items:center;gap:4px;
              ">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="${z.color}">
                  <path d="M1 21L12 2l11 19H1zm11-3h2v-4h-2v4zm0-6h2v-2h-2v2z"/>
                </svg>
                ${z.label}
              </div>`,
            className: "",
            iconAnchor: [55, -4],
          }),
          interactive: false,
          zIndexOffset: 100,
        }).addTo(map);
      });

      // ── Animated ping circles for alerts ──
      MARKERS.filter(m => m.type === "alert").forEach(m => {
        let r = 60; let growing = true;
        const circle = L.circle([m.lat, m.lng], {
          radius: r, color: "#ef4444", weight: 1.5,
          opacity: 0.4, fillOpacity: 0,
        }).addTo(map);
        const t = setInterval(() => {
          r = growing ? r + 10 : r - 10;
          if (r >= 240) growing = false;
          if (r <= 60)  growing = true;
          circle.setRadius(r);
        }, 50);
        pingRefs.current.push(t);
      });

      // ── Markers ──
      MARKERS.forEach(m => {
        L.marker([m.lat, m.lng], { icon: makePinIcon(L, m.type), zIndexOffset: m.type === "alert" ? 1000 : 0 })
          .bindPopup(makePopup(m), { maxWidth: 260, minWidth: 220, className: "gmap-popup" })
          .addTo(map);
      });

      setLoading(false);
    });

    return () => {
      pingRefs.current.forEach(t => clearInterval(t));
      pingRefs.current = [];
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  const counts = {
    tourist: MARKERS.filter(m => m.type === "tourist").length,
    police:  MARKERS.filter(m => m.type === "police").length,
    alert:   MARKERS.filter(m => m.type === "alert").length,
  };

  return (
    <div className="glass" style={{
      background: "rgba(10,22,40,0.8)", border: "1px solid rgba(59,130,246,0.2)",
      borderRadius: 0, overflow: "hidden", display: "flex", flexDirection: "column",
      minHeight: 420,
    }}>
      {/* ── Header ── */}
      <div style={{
        padding: "10px 14px", borderBottom: "1px solid rgba(59,130,246,0.15)",
        display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
        background: "rgba(10,22,40,0.7)",
      }}>
        <span style={{ fontSize: 11, color: "#60a5fa", fontWeight: 600, letterSpacing: 1 }}>◉ LIVE TRACKING MAP</span>
        <span style={{ fontSize: 9, color: "#4a6fa5", letterSpacing: 1 }}>— JAIPUR, RAJASTHAN</span>

        {/* Google Maps badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          background: "rgba(255,255,255,0.08)", borderRadius: 4,
          padding: "2px 7px", border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <span style={{ fontSize: 9, color: "#aab" }}>via</span>
          <span style={{ fontSize: 10, fontWeight: 700, background: "linear-gradient(90deg,#4285f4,#ea4335,#fbbc05,#34a853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Google Maps</span>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 14, fontSize: 10 }}>
          <span style={{ color: "#22c55e" }}>● {counts.tourist} Tourists</span>
          <span style={{ color: "#3b82f6" }}>◆ {counts.police} Units</span>
          <span style={{ color: "#ef4444" }}>⚠ {counts.alert} Alerts</span>
        </div>
      </div>

      {/* ── Map ── */}
      <div style={{ position: "relative", minHeight: 360, flex: 1 }}>
        {/* Loading */}
        {loading && (
          <div style={{
            position: "absolute", inset: 0, background: "#e8eaed",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 20, flexDirection: "column", gap: 12,
          }}>
            <div style={{
              width: 32, height: 32,
              border: "3px solid #dadce0", borderTop: "3px solid #4285f4",
              borderRadius: "50%", animation: "lm-spin 0.8s linear infinite",
            }} />
            <span style={{ fontSize: 12, color: "#5f6368", fontFamily: "Roboto, Arial, sans-serif", letterSpacing: 0.5 }}>
              Loading map…
            </span>
          </div>
        )}

        {/* Leaflet mount */}
        <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />

        {/* Overlay: corner brackets */}
        {[
          { top: 8,    left: 8,    borderTop: "2px solid rgba(59,130,246,0.6)",    borderLeft:  "2px solid rgba(59,130,246,0.6)"    },
          { top: 8,    right: 8,   borderTop: "2px solid rgba(59,130,246,0.6)",    borderRight: "2px solid rgba(59,130,246,0.6)"   },
          { bottom: 8, left: 8,    borderBottom: "2px solid rgba(59,130,246,0.6)", borderLeft:  "2px solid rgba(59,130,246,0.6)"    },
          { bottom: 8, right: 8,   borderBottom: "2px solid rgba(59,130,246,0.6)", borderRight: "2px solid rgba(59,130,246,0.6)"   },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 18, height: 18, zIndex: 500, pointerEvents: "none", ...s }} />
        ))}

        {/* Legend */}
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(255,255,255,0.96)",
          border: "none",
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: 11,
          boxShadow: "0 1px 6px rgba(0,0,0,0.28)",
          zIndex: 500,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
          color: "#3c4043",
          minWidth: 140,
        }}>
          <div style={{ fontWeight: 700, fontSize: 10, color: "#1a73e8", letterSpacing: 0.5, marginBottom: 2 }}>
            LEGEND
          </div>
          {[
            ["#22c55e", "Tourist — Safe"],
            ["#f59e0b", "Tourist — Flagged"],
            ["#ef4444", "Alert / Incident"],
            ["#1d4ed8", "Police Unit"],
          ].map(([color, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <svg width="12" height="16" viewBox="0 0 32 42">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 26 16 26S32 24.837 32 16C32 7.163 24.837 0 16 0z" fill={color}/>
              </svg>
              <span style={{ fontSize: 10 }}>{label}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #e8eaed", marginTop: 3, paddingTop: 5, display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px dashed #ef4444", background: "rgba(239,68,68,0.1)" }} />
            <span style={{ fontSize: 10 }}>High-Risk Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
}