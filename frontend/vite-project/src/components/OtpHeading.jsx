// components/OtpHeading.jsx
// Page title, subtitle, and static masked email chip.

export default function OtpHeading() {
  return (
    <>
      <h1 className="pl-heading pv-heading-center">
        Email Verification<br />Required
      </h1>

      <p className="pl-subheading pv-subheading-center">
        Enter the 6-digit code sent to your registered police email
      </p>

      {/* Masked email chip */}
      <div className="pv-email-row">
        <div className="pv-email-badge">
          <div className="pv-email-dot" />
          raj****@police.gov.in
        </div>
      </div>
    </>
  );
}