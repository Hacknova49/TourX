
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function OtpActions({
  complete,
  loading,
  expired,
  resendCount,
  onVerify,
  onResend,
}) {
  return (
    <>
      {/* Primary verify button */}
      <button
        className="pl-btn"
        onClick={onVerify}
        disabled={!complete || loading || expired}
      >
        <div className="pl-btn-inner">
          {loading ? (
            <>
              <div className="pl-spinner" />
              Verifying…
            </>
          ) : (
            <>
              Verify &amp; Login
              <ArrowRight />
            </>
          )}
        </div>
      </button>

      {/* Resend Code link */}
      <div className="pv-forgot-row">
        <button
          className="pv-resend-btn"
          onClick={onResend}
          disabled={!expired}
        >
          Resend Code{resendCount > 0 ? ` (${resendCount})` : ""}
        </button>
      </div>

      {/* Back to Login link */}
      <div className="pv-back-row">
        <a className="pv-back-link" href="#">
          ← Back to Login
        </a>
      </div>
    </>
  );
}