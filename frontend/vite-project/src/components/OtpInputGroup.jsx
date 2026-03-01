// components/OtpInputGroup.jsx
// Renders six individual digit input boxes for OTP entry.
// Supports keyboard navigation (arrow keys, backspace) and paste.

import { useRef } from "react";

const OTP_LEN = 6;

export default function OtpInputGroup({ otp, onChange }) {
  const refs = useRef([]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    onChange(i, val);
    if (val && i < OTP_LEN - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft"  && i > 0)            refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < OTP_LEN - 1)  refs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LEN);
    digits.split("").forEach((d, i) => onChange(i, d));
    refs.current[Math.min(digits.length, OTP_LEN - 1)]?.focus();
  };

  return (
    <div className="otp-boxes" onPaste={handlePaste}>
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className={`otp-box${digit ? " filled" : ""}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          placeholder="·"
          autoFocus={i === 0}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
        />
      ))}
    </div>
  );
}