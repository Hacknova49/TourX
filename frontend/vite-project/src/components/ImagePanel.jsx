// ImagePanel.jsx
// The right half of the split-screen layout.
// Displays a full-height scenic mountain image with a dark overlay,
// a "Restricted Access" pill badge, a tagline, and live-stats bar.

const MOUNTAIN_URL =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&auto=format&fit=crop&q=85";

const stats = [
  { value: "24/7",  label: "Live Monitoring" },
  { value: "480+",  label: "Tourist Zones"   },
  { value: "99.9%", label: "Uptime SLA"       },
];

export default function ImagePanel() {
  return (
    <div className="pl-right">
      {/* Background image */}
      <img
        className="pl-right-img"
        src={MOUNTAIN_URL}
        alt="Scenic mountain landscape with warm sunlight"
      />

      {/* Dark gradient overlay for text contrast */}
      <div className="pl-right-overlay" />

      {/* Content anchored to bottom-left */}
      <div className="pl-right-content">
        {/* Restricted access pill */}
        <div className="pl-right-pill">
          <div className="pl-right-pill-dot" />
          <span>Restricted Access</span>
        </div>

        {/* Tagline */}
        <div className="pl-right-title">
          Protecting Every Journey,<br />Every Tourist, Every Mile.
        </div>

        {/* Sub-text */}
        <p className="pl-right-sub">
          Authorized personnel only. This portal monitors tourist safety
          incidents across all designated zones in real-time.
        </p>

        {/* Stats row */}
        <div className="pl-right-stats">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <span className="pl-stat-val">{value}</span>
              <span className="pl-stat-lbl">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}