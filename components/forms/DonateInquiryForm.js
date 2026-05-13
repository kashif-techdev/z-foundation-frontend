"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { donateFormSchema, DONATION_INTERESTS } from "@/lib/validation/schemas";

export default function DonateInquiryForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(donateFormSchema),
    defaultValues: {
      name: "",
      email: "",
      donationInterest: DONATION_INTERESTS[0],
      message: "",
      company: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fieldErrors) {
          Object.entries(data.fieldErrors).forEach(([key, msgs]) => {
            const msg = Array.isArray(msgs) ? msgs[0] : msgs;
            if (msg) setError(key, { type: "server", message: msg });
          });
        }
        toast.error(data.error || "Could not send your inquiry.");
        return;
      }
      toast.success("Thank you! We received your donation inquiry.");
      reset({ donationInterest: DONATION_INTERESTS[0], name: "", email: "", message: "", company: "" });
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pf-form pf-form--boxed" noValidate>
      <input type="text" className="pf-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("company")} />
      <div className="pf-field">
        <label htmlFor="don-name" className="pf-label">
          Name <span className="pf-req">*</span>
        </label>
        <input id="don-name" type="text" className={errors.name ? "pf-input pf-input--error" : "pf-input"} {...register("name")} />
        {errors.name && <span className="pf-error">{errors.name.message}</span>}
      </div>
      <div className="pf-field">
        <label htmlFor="don-email" className="pf-label">
          Email <span className="pf-req">*</span>
        </label>
        <input id="don-email" type="email" className={errors.email ? "pf-input pf-input--error" : "pf-input"} {...register("email")} />
        {errors.email && <span className="pf-error">{errors.email.message}</span>}
      </div>
      <div className="pf-field">
        <label htmlFor="don-interest" className="pf-label">
          Donation interest <span className="pf-req">*</span>
        </label>
        <select id="don-interest" className="pf-input pf-select" {...register("donationInterest")}>
          {DONATION_INTERESTS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.donationInterest && <span className="pf-error">{errors.donationInterest.message}</span>}
      </div>
      <div className="pf-field">
        <label htmlFor="don-message" className="pf-label">
          Message <span className="pf-req">*</span>
        </label>
        <textarea id="don-message" rows={5} className={errors.message ? "pf-input pf-textarea pf-input--error" : "pf-input pf-textarea"} {...register("message")} />
        {errors.message && <span className="pf-error">{errors.message.message}</span>}
      </div>
      <div className="pf-actions">
        <button type="submit" className="pf-submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send inquiry"}
        </button>
      </div>
    </form>
  );
}
