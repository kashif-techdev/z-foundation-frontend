"use client";

import { useState } from "react";
import Toast from "./Toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({
        message: "Please fix the errors in the form",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In production, replace with your API endpoint or email service
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setToast({
        message: "Thank you! Your message has been sent successfully.",
        type: "success",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setToast({
        message: "Failed to send message. Please try again or contact us directly.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="contact" id="contact">
        <div className="max-width">
          <h2 className="title">Contact us</h2>
          <div className="contact-content">
            <div className="column left">
              <div className="text">Volunteer us</div>
              <p className="contact-intro">Get in touch or volunteer with us.</p>
              <div className="contact-info-list">
                <div className="contact-row">
                  <i className="fas fa-user contact-icon" aria-hidden />
                  <div className="contact-info">
                    <div className="contact-label">NGO Name</div>
                    <div className="contact-value">Z-Foundation</div>
                  </div>
                </div>
                <div className="contact-row">
                  <i className="fas fa-map-marker-alt contact-icon" aria-hidden />
                  <div className="contact-info">
                    <div className="contact-label">Address</div>
                    <div className="contact-value">
                      Village Dallan, Tehsil Thall
                      <br />
                      Dist Hangu, KP, Pakistan
                    </div>
                  </div>
                </div>
                <div className="contact-row">
                  <i className="fas fa-phone contact-icon" aria-hidden />
                  <div className="contact-info">
                    <div className="contact-label">Mobile</div>
                    <a className="contact-value contact-link" href="tel:03330202415">
                      03330202415
                    </a>
                  </div>
                </div>
                <div className="contact-row">
                  <i className="fab fa-whatsapp contact-icon contact-icon-whatsapp" aria-hidden />
                  <div className="contact-info">
                    <div className="contact-label">WhatsApp</div>
                    <a
                      className="contact-value contact-link contact-link-whatsapp"
                      href="https://wa.me/923330202415"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>
                <div className="contact-row">
                  <i className="fas fa-envelope contact-icon" aria-hidden />
                  <div className="contact-info">
                    <div className="contact-label">Email</div>
                    <a
                      className="contact-value contact-link"
                      href="mailto:Kashif.techdev@gmail.com"
                    >
                      Kashif.techdev@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column right">
              <div className="text">Message me</div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="fields">
                  <div className="field name">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "error" : ""}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      required
                    />
                    {errors.name && (
                      <span id="name-error" className="error-message">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="field email">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      required
                    />
                    {errors.email && (
                      <span id="email-error" className="error-message">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className="field">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "error" : ""}
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    required
                  />
                  {errors.subject && (
                    <span id="subject-error" className="error-message">
                      {errors.subject}
                    </span>
                  )}
                </div>
                <div className="field textarea">
                  <textarea
                    name="message"
                    cols={30}
                    rows={10}
                    placeholder="Message.."
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "error" : ""}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    required
                  />
                  {errors.message && (
                    <span id="message-error" className="error-message">
                      {errors.message}
                    </span>
                  )}
                </div>
                <div className="button">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner"
                          style={{
                            display: "inline-block",
                            width: "14px",
                            height: "14px",
                            border: "2px solid #fff",
                            borderTopColor: "transparent",
                            borderRadius: "50%",
                            marginRight: "8px",
                            animation: "spin 0.8s linear infinite",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .error-message {
          display: block;
          color: #f44336;
          font-size: 12px;
          margin-top: 4px;
          font-family: 'Poppins', sans-serif;
        }
        .field input.error,
        .field textarea.error {
          border-color: #f44336;
        }
      `}</style>
    </>
  );
}
