"use client";

const WHATSAPP_NUMBER = "923330202415"; // Pakistan: 92 + 3330202415
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const DEFAULT_MESSAGE = "Hello! I'm interested in learning more about Z-Foundation.";

export default function WhatsAppButton({ message = DEFAULT_MESSAGE, className = "" }) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`${WHATSAPP_URL}?text=${encodedMessage}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className={`whatsapp-button ${className}`}
      aria-label="Chat with us on WhatsApp"
      type="button"
    >
      <i className="fab fa-whatsapp" />
    </button>
  );
}
