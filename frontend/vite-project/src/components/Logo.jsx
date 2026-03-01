// Logo.jsx
// Displays the government emblem and department name at the top of the login form.

export default function Logo() {
  return (
    <div className="pl-logo-row">
      <div className="pl-badge-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5
            2.18V11c0 3.54-2.36 6.86-5 7.93C9.36 17.86 7 14.54 7 11V7.18L12 5zm0 2.5L9
            9.32V11c0 2.36 1.56 4.57 3 5.45 1.44-.88 3-3.09 3-5.45V9.32L12 7.5z" />
        </svg>
      </div>

      <div className="pl-logo-text">
        <span className="pl-logo-top">Govt. of India · Tourism Police</span>
        <span className="pl-logo-bottom">National Safety Command</span>
      </div>
    </div>
  );
}