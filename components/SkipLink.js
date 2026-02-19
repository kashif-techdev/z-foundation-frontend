"use client";

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: "absolute",
        top: "-40px",
        left: "0",
        background: "#000",
        color: "#fff",
        padding: "8px 16px",
        textDecoration: "none",
        zIndex: 10000,
        borderRadius: "0 0 4px 0",
      }}
      onFocus={(e) => {
        e.target.style.top = "0";
      }}
      onBlur={(e) => {
        e.target.style.top = "-40px";
      }}
    >
      Skip to main content
    </a>
  );
}
