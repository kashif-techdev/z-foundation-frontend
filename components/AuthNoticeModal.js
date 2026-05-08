"use client";

export default function AuthNoticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="auth-notice-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-notice-title"
    >
      <div className="auth-notice-card">
        <h2 id="auth-notice-title">Feature Coming Soon</h2>
        <p>
          We are currently working on blockchain integration for transparency
          purposes. This feature will be available soon.
        </p>
        <button type="button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
