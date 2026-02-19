"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Contact information
const CONTACT_INFO = {
  mobile: "03330202415",
  whatsapp: "923330202415", // International format for WhatsApp
  email: "Kashif.techdev@gmail.com",
  address: "Village Dallan, Tehsil Thall, Dist Hangu, KP, Pakistan",
};

// Rule-based chatbot responses (100% frontend - no backend needed!)
function getChatbotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase().trim();

  // Contact information queries
  if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("phone") ||
    lowerMessage.includes("mobile") ||
    lowerMessage.includes("number") ||
    lowerMessage.includes("email") ||
    lowerMessage.includes("address") ||
    lowerMessage.includes("reach") ||
    lowerMessage.includes("where")
  ) {
    return `📞 **Mobile:** ${CONTACT_INFO.mobile}\n📧 **Email:** ${CONTACT_INFO.email}\n📍 **Address:** ${CONTACT_INFO.address}\n💬 **WhatsApp:** [Chat with us](https://wa.me/${CONTACT_INFO.whatsapp})\n\nFeel free to reach out to us anytime!`;
  }

  // Donation queries
  if (
    lowerMessage.includes("donate") ||
    lowerMessage.includes("donation") ||
    lowerMessage.includes("support") ||
    lowerMessage.includes("contribute") ||
    lowerMessage.includes("help") ||
    lowerMessage.includes("give") ||
    lowerMessage.includes("money")
  ) {
    return `Thank you for your interest in supporting Z-Foundation! 🙏\n\nYou can donate by:\n📧 **Email:** ${CONTACT_INFO.email}\n📞 **Mobile:** ${CONTACT_INFO.mobile}\n💬 **WhatsApp:** [Click to chat](https://wa.me/${CONTACT_INFO.whatsapp})\n\nYour support helps us provide:\n• Healthcare services\n• Education support\n• Food distribution\n• Clothing\n• Shelter\n• Scholarships\n\nEvery contribution makes a difference! 💙`;
  }

  // Services queries
  if (
    lowerMessage.includes("service") ||
    lowerMessage.includes("what do you do") ||
    lowerMessage.includes("what does") ||
    lowerMessage.includes("help with") ||
    lowerMessage.includes("provide")
  ) {
    return `Z-Foundation provides the following services:\n\n🏥 **Health** - Medical aid and healthcare support\n📚 **Education** - Quality education and learning resources\n🍽️ **Food** - Food supplies and meals\n👕 **Clothes** - Clothing for those in need\n🎓 **Scholarships** - Financial aid for education\n🏠 **Shelter** - Safe housing for the homeless\n\nWe're currently active in Darbhanga, Bihar, and expanding to help more communities!`;
  }

  // About queries
  if (
    lowerMessage.includes("about") ||
    lowerMessage.includes("who are you") ||
    lowerMessage.includes("what is") ||
    lowerMessage.includes("foundation") ||
    lowerMessage.includes("ngo")
  ) {
    return `Z-Foundation is a private non-profit organization (NGO) dedicated to helping flood-affected communities, providing healthcare, and supporting education.\n\nDuring the COVID-19 pandemic, we saw many challenges - pain, deaths, hunger, and education setbacks. We stand together to solve these problems and provide support to everyone in need.\n\nCurrently, we're active in **Darbhanga, Bihar**, and we need your help to grow and reach more communities! 🌱`;
  }

  // Location queries
  if (
    lowerMessage.includes("location") ||
    lowerMessage.includes("where are you") ||
    lowerMessage.includes("based") ||
    lowerMessage.includes("darbhanga") ||
    lowerMessage.includes("bihar")
  ) {
    return `📍 Z-Foundation is currently active in:\n\n**Darbhanga, Bihar, India**\n\nWe're working to expand our reach to help more communities. If you're in the area and need assistance, or want to volunteer, please contact us!\n\n📞 ${CONTACT_INFO.mobile}\n📧 ${CONTACT_INFO.email}`;
  }

  // Volunteer queries
  if (
    lowerMessage.includes("volunteer") ||
    lowerMessage.includes("join") ||
    lowerMessage.includes("work with") ||
    lowerMessage.includes("participate")
  ) {
    return `We'd love to have you join our mission! 🙌\n\nTo volunteer with Z-Foundation:\n📧 Email us at: ${CONTACT_INFO.email}\n📞 Call us at: ${CONTACT_INFO.mobile}\n\nWe need help with:\n• Community outreach\n• Distribution activities\n• Education programs\n• Healthcare initiatives\n• Fundraising\n\nTogether, we can make a bigger impact! 💪`;
  }

  // Greeting queries
  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey") ||
    lowerMessage === "hii" ||
    lowerMessage === "hi"
  ) {
    return `Hello! 👋 Welcome to Z-Foundation!\n\nI'm here to help you learn about:\n• Our services\n• How to donate\n• Contact information\n• Volunteering opportunities\n\nWhat would you like to know?`;
  }

  // Thank you queries
  if (
    lowerMessage.includes("thank") ||
    lowerMessage.includes("thanks")
  ) {
    return `You're very welcome! 😊\n\nIf you have any more questions about Z-Foundation, donations, or how to get involved, feel free to ask!\n\nTogether, we can make a difference! 💙`;
  }

  // Default response - helpful and friendly
  return `I understand you're asking about "${userMessage}".\n\nZ-Foundation helps communities with:\n• Healthcare\n• Education\n• Food distribution\n• Clothing\n• Shelter\n• Scholarships\n\nFor specific information:\n📞 **Contact:** ${CONTACT_INFO.mobile}\n📧 **Email:** ${CONTACT_INFO.email}\n\nOr ask me about:\n• Donations\n• Our services\n• Contact information\n• Volunteering\n• Our location`;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatboxRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = text;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage, timestamp: new Date() },
    ]);
    setLoading(true);

    // Simulate typing delay for better UX (rule-based, instant response)
    setTimeout(() => {
      const reply = getChatbotResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply, timestamp: new Date() },
      ]);
      setLoading(false);
    }, 500); // Small delay for natural feel
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      <div id="chatbot-container">
        <button
          id="chatbot-btn"
          type="button"
          aria-label="Open chat"
          onClick={() => setOpen(true)}
        >
          <i className="fas fa-comment" />
        </button>
        {open && (
          <div
            id="chat-popup"
            role="dialog"
            aria-label="Chat with Z-Foundation assistant"
          >
            <div id="chat-header">
              <span>Z-Foundation assistant</span>
              <div style={{ display: "flex", gap: "8px" }}>
                {messages.length > 0 && (
                  <button
                    type="button"
                    aria-label="Clear chat"
                    onClick={clearChat}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "14px",
                      padding: "4px 8px",
                    }}
                  >
                    Clear
                  </button>
                )}
                <button
                  id="close-chat"
                  type="button"
                  aria-label="Close chat"
                  onClick={() => setOpen(false)}
                >
                  &times;
                </button>
              </div>
            </div>
            <div id="chatbox" ref={chatboxRef}>
              {messages.length === 0 && (
                <div
                  style={{
                    color: "#ddd",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <p>👋 Hello! How can I help you today?</p>
                  <p style={{ fontSize: "12px", marginTop: "8px" }}>
                    Ask about donations, contact info, services, or volunteering.
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`message ${
                    m.role === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  <strong>{m.role === "user" ? "You" : "Bot"}:</strong>{" "}
                  <span style={{ whiteSpace: "pre-line" }}>{m.text}</span>
                </div>
              ))}
              {loading && (
                <div className="bot-message">
                  <strong>Bot:</strong>{" "}
                  <span className="typing-indicator">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </div>
              )}
            </div>
            <div className="chat-input-row">
              <input
                ref={inputRef}
                type="text"
                id="userMessage"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                aria-label="Message input"
                maxLength={500}
              />
              <button
                id="sendMessage"
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .message {
          margin: 8px 0;
          padding: 8px 12px;
          border-radius: 8px;
          word-break: break-word;
        }
        .user-message {
          background: rgba(255, 255, 255, 0.2);
          text-align: right;
        }
        .bot-message {
          background: rgba(0, 0, 0, 0.2);
        }
        .typing-indicator span {
          animation: blink 1.4s infinite;
          margin: 0 2px;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0%,
          60%,
          100% {
            opacity: 0.3;
          }
          30% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
