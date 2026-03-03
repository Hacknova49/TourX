
import { useState, useEffect } from "react";

import Logo          from "../components/Logo";
import SecurityBadge from "../components/SecurityBadge";
import ImagePanel    from "../components/ImagePanel";
import OtpHeading    from "../components/OtpHeading";
import OtpInputGroup from "../components/OtpInputGroup";
import OtpTimer      from "../components/OtpTimer";
import OtpActions    from "../components/OtpActions";

import "../styles/policeLogin.css";
import "../styles/policeVerification.css";

const OTP_LEN    = 6;
const TIMER_INIT = 150; // 2 min 30 sec

export default function PoliceVerification() {
  const [otp,     setOtp]     = useState(Array(OTP_LEN).fill(""));
  const [timer,   setTimer]   = useState(TIMER_INIT);
  const [loading, setLoading] = useState(false);
  const [resends, setResends] = useState(0);

  // Countdown tick
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleDigitChange = (index, value) => {
    const next = [...otp];
    next[index] = value;
    setOtp(next);
  };

  const handleVerify = () => {
    if (!otp.every(Boolean) || loading || timer <= 0) return;
    setLoading(true);
    // Replace with real OTP-verify API call
    setTimeout(() => setLoading(false), 1800);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setOtp(Array(OTP_LEN).fill(""));
    setTimer(TIMER_INIT);
    setResends((r) => r + 1);
  };

  const isComplete = otp.every(Boolean);
  const isExpired  = timer <= 0;

  return (
    <div className="pl-root">

      {/* ── LEFT FORM PANEL ── */}
      <div className="pl-left">

        <Logo />

        <OtpHeading />

        <label className="pl-label pv-label-center">Verification Code</label>

        <OtpInputGroup otp={otp} onChange={handleDigitChange} />

        <OtpTimer timeLeft={timer} />

        <OtpActions
          complete={isComplete}
          loading={loading}
          expired={isExpired}
          resendCount={resends}
          onVerify={handleVerify}
          onResend={handleResend}
        />

        {/* Divider */}
        <div className="pl-divider">
          <div className="pl-divider-line" />
          <span>Authorized Personnel Only</span>
          <div className="pl-divider-line" />
        </div>

        <SecurityBadge />

      </div>

      {/* ── RIGHT IMAGE PANEL ── */}
      <ImagePanel />

    </div>
  );
}