"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema } from "@/lib/validation/schemas";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
      company: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.fieldErrors && typeof data.fieldErrors === "object") {
          Object.entries(data.fieldErrors).forEach(([key, msgs]) => {
            const msg = Array.isArray(msgs) ? msgs[0] : msgs;
            if (msg) setError(key, { type: "server", message: msg });
          });
        }
        toast.error(data.error || "Something went wrong. Please try again.");
        return;
      }

      toast.success("Thank you! Your message has been sent.");
      reset();
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      <section className="contact" id="contact">
        <div className="max-width">
          <h2 className="title">Contact Us</h2>
          <p className="contact-subtitle">
            Reach out for support, partnership, or volunteer opportunities.
          </p>
          <div className="contact-content">
            <div className="column left contact-panel">
              <div className="text">Let&apos;s Connect</div>
              <p className="contact-intro">
                We would love to hear from you. Connect with us directly or send a message using the form.
              </p>
              <div className="contact-info-list">
              
                <div className="contact-row">
                  <span className="contact-icon-box" aria-hidden>
                    <i className="fas fa-map-marker-alt contact-icon" />
                  </span>
                  <div className="contact-info">
                    <div className="contact-value">
                      Village Dallan, Tehsil Thall
                      <br />
                      Dist Hangu, KP, Pakistan
                    </div>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="contact-icon-box" aria-hidden>
                    <i className="fas fa-phone contact-icon" />
                  </span>
                  <div className="contact-info">
                    <div className="contact-label">Mobile</div>
                    <a className="contact-value contact-link" href="tel:03330202415">
                      03330202415
                    </a>
                  </div>
                </div>
                
                <div className="contact-row">
                  <span className="contact-icon-box" aria-hidden>
                    <i className="fas fa-envelope contact-icon" />
                  </span>
                  <div className="contact-info">
                    <div className="contact-label">Email</div>
                    <a className="contact-value contact-link" href="mailto:info@zifoundation.com">
                      info@zifoundation.com
                    </a>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="contact-icon-box" aria-hidden>
                    <i className="fas fa-hand-holding-heart contact-icon" />
                  </span>
                  <div className="contact-info">
                    <div className="contact-label">Volunteer</div>
                    <a className="contact-value contact-link" href="mailto:volunteer@zifoundation.com">
                      volunteer@zifoundation.com
                    </a>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="contact-icon-box" aria-hidden>
                    <i className="fas fa-gift contact-icon" />
                  </span>
                  <div className="contact-info">
                    <div className="contact-label">Donations</div>
                    <a className="contact-value contact-link" href="mailto:donate@zifoundation.com">
                      donate@zifoundation.com
                    </a>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="contact-icon-box" aria-hidden>
                    <i className="fas fa-life-ring contact-icon" />
                  </span>
                  <div className="contact-info">
                    <div className="contact-label">Support</div>
                    <a className="contact-value contact-link" href="mailto:support@zifoundation.com">
                      support@zifoundation.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column right contact-panel">
              <div className="text">Send a Message</div>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="contact-form pf-form">
                <input type="text" className="pf-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("company")} />
                <div className="fields contact-grid">
                  <div className="field name contact-field pf-field">
                    <label htmlFor="contact-fullName" className="pf-label">
                      Full name
                    </label>
                    <input
                      id="contact-fullName"
                      type="text"
                      placeholder="Your full name"
                      className={errors.fullName ? "error" : ""}
                      aria-invalid={errors.fullName ? "true" : "false"}
                      aria-describedby={errors.fullName ? "contact-fullName-err" : undefined}
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <span id="contact-fullName-err" className="error-message" role="alert">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>
                  <div className="field email contact-field pf-field">
                    <label htmlFor="contact-email" className="pf-label">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      className={errors.email ? "error" : ""}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "contact-email-err" : undefined}
                      {...register("email")}
                    />
                    {errors.email && (
                      <span id="contact-email-err" className="error-message" role="alert">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="field contact-field pf-field">
                  <label htmlFor="contact-subject" className="pf-label">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="What is this about?"
                    className={errors.subject ? "error" : ""}
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={errors.subject ? "contact-subject-err" : undefined}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <span id="contact-subject-err" className="error-message" role="alert">
                      {errors.subject.message}
                    </span>
                  )}
                </div>
                <div className="field textarea contact-field contact-message pf-field">
                  <label htmlFor="contact-message" className="pf-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    cols={30}
                    rows={10}
                    placeholder="Your message…"
                    className={errors.message ? "error" : ""}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "contact-message-err" : undefined}
                    {...register("message")}
                  />
                  {errors.message && (
                    <span id="contact-message-err" className="error-message" role="alert">
                      {errors.message.message}
                    </span>
                  )}
                </div>
                <div className="button contact-submit-wrap">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="spinner" />
                        Sending…
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
    </>
  );
}
