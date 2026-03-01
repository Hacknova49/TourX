// SecurityBadge.jsx
// Shows the blockchain-secured authentication notice at the bottom of the form.

export default function SecurityBadge() {
  return (
    <div className="pl-security">
      <div className="pl-sec-dot" />

      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#40916c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>

      <span className="pl-sec-text">
        Blockchain-Secured · AES-256 Encrypted
      </span>
    </div>
  );
}