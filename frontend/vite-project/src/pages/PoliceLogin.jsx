// PoliceLogin.jsx
// Page-level component that composes the split-screen layout.
// Left side: Logo + LoginForm + SecurityBadge
// Right side: ImagePanel

import "../styles/policeLogin.css";

import Logo          from "../components/Logo";
import LoginForm     from "../components/LoginForm";
import SecurityBadge from "../components/SecurityBadge";
import ImagePanel    from "../components/ImagePanel";

export default function PoliceLogin() {
  return (
    <div className="pl-root">
      {/* ── LEFT: Form panel ── */}
      <div className="pl-left">
        <Logo />
        <LoginForm />
        <SecurityBadge />
      </div>

      {/* ── RIGHT: Scenic image panel ── */}
      <ImagePanel />
    </div>
  );
}