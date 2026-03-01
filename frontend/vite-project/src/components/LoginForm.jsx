// LoginForm.jsx
// Contains all interactive form elements: Officer ID, Password, Remember device
// checkbox, submit button, forgot password link, and divider.

import { useState } from "react";

const EyeOpen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosed = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function LoginForm() {
  const [badgeId, setBadgeId]   = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = () => {
    if (!badgeId || !password) return;
    setLoading(true);
    // Replace with real auth logic / API call
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      {/* Page title */}
      <h1 className="pl-heading">
        Secure Officer<br />Login
      </h1>
      <p className="pl-subheading">Smart Tourist Safety Monitoring System</p>

      {/* Officer ID */}
      <div className="pl-field">
        <label className="pl-label" htmlFor="badge">
          Officer ID / Badge Number
        </label>
        <div className="pl-input-wrap">
          <input
            className="pl-input"
            id="badge"
            type="text"
            placeholder="e.g. POL-2024-OD-00412"
            value={badgeId}
            onChange={(e) => setBadgeId(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      {/* Password */}
      <div className="pl-field">
        <label className="pl-label" htmlFor="password">
          Password
        </label>
        <div className="pl-input-wrap">
          <input
            className="pl-input pl-input--password"
            id="password"
            type={showPwd ? "text" : "password"}
            placeholder="Enter your secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            className="pl-eye"
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? <EyeClosed /> : <EyeOpen />}
          </button>
        </div>
      </div>

      {/* Remember device */}
      <div className="pl-check-row">
        <input
          className="pl-checkbox"
          type="checkbox"
          id="remember"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <label className="pl-check-label" htmlFor="remember">
          Remember this secure device
        </label>
      </div>

      {/* Submit */}
      <button
        className="pl-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        <div className="pl-btn-inner">
          {loading ? (
            <>
              <div className="pl-spinner" />
              Verifying…
            </>
          ) : (
            <>
              Continue to Verification
              <ArrowRight />
            </>
          )}
        </div>
      </button>

      {/* Forgot password */}
      <div className="pl-forgot-row">
        <a className="pl-forgot" href="#">
          Forgot Password?
        </a>
      </div>

      {/* Divider */}
      <div className="pl-divider">
        <div className="pl-divider-line" />
        <span>Authorized Personnel Only</span>
        <div className="pl-divider-line" />
      </div>
    </>
  );
}