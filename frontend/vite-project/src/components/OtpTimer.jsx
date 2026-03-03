// components/OtpTimer.jsx
// Live countdown display: "Code expires in 02:30"
// Turns red with expiry message when timer hits zero.

const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function OtpTimer({ timeLeft }) {
  const expired = timeLeft <= 0;

  return (
    <div className="pv-timer-row">
      {expired ? (
        <span className="pv-timer-expired">Code expired — please resend</span>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#8a9ab0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="pv-timer-label">Code expires in</span>
          <span className="pv-timer-val">{fmt(timeLeft)}</span>
        </>
      )}
    </div>
  );
}