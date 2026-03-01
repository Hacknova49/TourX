export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      html, body, #root {
        height: 100%;
        font-family: 'DM Sans', system-ui, sans-serif;
        background: #080c14;
        color: #e8edf5;
        -webkit-font-smoothing: antialiased;
      }

      * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
      *::-webkit-scrollbar { width: 5px; height: 5px; }
      *::-webkit-scrollbar-track { background: transparent; }
      *::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
      *::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

      @keyframes pulse-dot {
        0%, 100% { opacity:1; transform:scale(1); }
        50% { opacity:0.4; transform:scale(1.5); }
      }
      @keyframes fade-up {
        from { opacity:0; transform:translateY(8px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      @keyframes lm-spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      @keyframes lm-ripple {
        0%   { transform:translate(-50%,-50%) scale(0.6); opacity:0.9; }
        100% { transform:translate(-50%,-50%) scale(3.5); opacity:0; }
      }
      @keyframes lm-bounce {
        0%,100% { transform:translateY(0); }
        50% { transform:translateY(-6px); }
      }

      /* Leaflet */
      .leaflet-container { font-family:'DM Sans',sans-serif !important; }
      .leaflet-control-zoom {
        border:none !important; border-radius:8px !important; overflow:hidden;
        box-shadow:0 2px 10px rgba(0,0,0,0.3) !important;
      }
      .leaflet-control-zoom a {
        background:#fff !important; color:#444 !important;
        width:30px !important; height:30px !important; line-height:30px !important;
        font-size:16px !important; border-bottom:1px solid #e5e7eb !important;
      }
      .leaflet-control-zoom a:hover { background:#f3f4f6 !important; }
      .leaflet-popup-content-wrapper {
        border-radius:12px !important; padding:0 !important; overflow:hidden;
        box-shadow:0 10px 40px rgba(0,0,0,0.3) !important; border:none !important;
      }
      .leaflet-popup-content { margin:0 !important; }
      .leaflet-popup-tip-container { display:none !important; }
      .leaflet-popup-close-button { color:#9ca3af !important; font-size:18px !important; top:8px !important; right:10px !important; z-index:10 !important; }
      .leaflet-control-attribution { background:rgba(255,255,255,0.8) !important; font-size:10px !important; border-radius:4px 0 0 0 !important; }

      .nav-item { transition:background .15s; cursor:pointer; border-radius:10px; }
      .nav-item:hover { background:rgba(255,255,255,0.06) !important; }
      .row-item { transition:background .12s; cursor:pointer; }
      .row-item:hover { background:rgba(255,255,255,0.035) !important; }
      .action-btn { transition:all .15s; cursor:pointer; font-family:inherit; }
      .action-btn:hover { filter:brightness(1.2); transform:translateY(-1px); }
      .action-btn:active { transform:translateY(0); }
    `}</style>
  );
}