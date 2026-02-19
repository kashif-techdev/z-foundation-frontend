"use client";

import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`toast toast-${type}`}
      role="alert"
      aria-live="polite"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "16px 24px",
        backgroundColor: type === "success" ? "#4CAF50" : "#f44336",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 10001,
        maxWidth: "400px",
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span>{message}</span>
        <button
          onClick={onClose}
          aria-label="Close notification"
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            padding: "0",
            marginLeft: "12px",
            lineHeight: "1",
          }}
        >
          ×
        </button>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
