"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { volunteerFormClientSchema } from "@/lib/validation/schemas";

const MAX_CV = 3 * 1024 * 1024;

export default function VolunteerApplicationForm() {
  const [formKey, setFormKey] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(volunteerFormClientSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      skills: "",
      availability: "",
      motivation: "",
      company: "",
    },
  });

  const cvFile = watch("cv");

  const onSubmit = async (values) => {
    const fd = new FormData();
    fd.append("fullName", values.fullName);
    fd.append("email", values.email);
    fd.append("phone", values.phone);
    fd.append("city", values.city);
    fd.append("skills", values.skills);
    fd.append("availability", values.availability);
    fd.append("motivation", values.motivation);
    fd.append("company", values.company || "");

    const fileList = values.cv;
    const file = fileList && fileList[0];
    if (file && file.size > 0) {
      if (file.size > MAX_CV) {
        toast.error("CV must be 3MB or smaller.");
        return;
      }
      const name = file.name.toLowerCase();
      if (!name.endsWith(".pdf") && !name.endsWith(".doc") && !name.endsWith(".docx")) {
        toast.error("CV must be PDF, DOC, or DOCX.");
        return;
      }
      fd.append("cv", file);
    }

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.fieldErrors && typeof data.fieldErrors === "object") {
          Object.entries(data.fieldErrors).forEach(([key, msgs]) => {
            const msg = Array.isArray(msgs) ? msgs[0] : msgs;
            if (msg && key !== "cv") setError(key, { type: "server", message: msg });
          });
        }
        toast.error(data.error || "Could not submit application.");
        return;
      }

      toast.success("Application sent! Check your inbox for a confirmation.");
      reset();
      setFormKey((k) => k + 1);
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <motion.section
      className="volunteer-apply pf-apply"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      aria-labelledby="volunteer-apply-title"
    >
      <h2 id="volunteer-apply-title" className="volunteer-section__title">
        Apply to volunteer
      </h2>
      <p className="volunteer-section__intro pf-apply__intro">
        Tell us about yourself. Fields marked with * are required. Optional CV: PDF or Word, up to 3MB.
      </p>
      <form key={formKey} onSubmit={handleSubmit(onSubmit)} className="pf-form pf-form--boxed" noValidate>
        <input type="text" className="pf-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("company")} />
        <div className="pf-grid pf-grid--2">
          <div className="pf-field">
            <label htmlFor="vol-fullName" className="pf-label">
              Full name <span className="pf-req">*</span>
            </label>
            <input id="vol-fullName" type="text" className={errors.fullName ? "pf-input pf-input--error" : "pf-input"} {...register("fullName")} />
            {errors.fullName && (
              <span className="pf-error" role="alert">
                {errors.fullName.message}
              </span>
            )}
          </div>
          <div className="pf-field">
            <label htmlFor="vol-email" className="pf-label">
              Email <span className="pf-req">*</span>
            </label>
            <input id="vol-email" type="email" className={errors.email ? "pf-input pf-input--error" : "pf-input"} {...register("email")} />
            {errors.email && (
              <span className="pf-error" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="pf-field">
            <label htmlFor="vol-phone" className="pf-label">
              Phone <span className="pf-req">*</span>
            </label>
            <input id="vol-phone" type="tel" className={errors.phone ? "pf-input pf-input--error" : "pf-input"} {...register("phone")} />
            {errors.phone && (
              <span className="pf-error" role="alert">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className="pf-field">
            <label htmlFor="vol-city" className="pf-label">
              City / region <span className="pf-req">*</span>
            </label>
            <input id="vol-city" type="text" className={errors.city ? "pf-input pf-input--error" : "pf-input"} {...register("city")} />
            {errors.city && (
              <span className="pf-error" role="alert">
                {errors.city.message}
              </span>
            )}
          </div>
        </div>
        <div className="pf-field">
          <label htmlFor="vol-skills" className="pf-label">
            Skills &amp; experience <span className="pf-req">*</span>
          </label>
          <textarea id="vol-skills" rows={3} className={errors.skills ? "pf-input pf-textarea pf-input--error" : "pf-input pf-textarea"} {...register("skills")} />
          {errors.skills && (
            <span className="pf-error" role="alert">
              {errors.skills.message}
            </span>
          )}
        </div>
        <div className="pf-field">
          <label htmlFor="vol-availability" className="pf-label">
            Availability <span className="pf-req">*</span>
          </label>
          <textarea
            id="vol-availability"
            rows={3}
            placeholder="e.g. Weekends, weekday evenings, one week in July…"
            className={errors.availability ? "pf-input pf-textarea pf-input--error" : "pf-input pf-textarea"}
            {...register("availability")}
          />
          {errors.availability && (
            <span className="pf-error" role="alert">
              {errors.availability.message}
            </span>
          )}
        </div>
        <div className="pf-field">
          <label htmlFor="vol-motivation" className="pf-label">
            Why do you want to volunteer? <span className="pf-req">*</span>
          </label>
          <textarea
            id="vol-motivation"
            rows={5}
            className={errors.motivation ? "pf-input pf-textarea pf-input--error" : "pf-input pf-textarea"}
            {...register("motivation")}
          />
          {errors.motivation && (
            <span className="pf-error" role="alert">
              {errors.motivation.message}
            </span>
          )}
        </div>
        <div className="pf-field">
          <label htmlFor="vol-cv" className="pf-label">
            CV (optional)
          </label>
          <input id="vol-cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="pf-file" {...register("cv")} />
          <p className="pf-hint">PDF, DOC, or DOCX · max 3MB</p>
          {cvFile && cvFile[0] && (
            <p className="pf-file-name">
              <i className="fas fa-paperclip" aria-hidden="true" /> {cvFile[0].name}
            </p>
          )}
        </div>
        <div className="pf-actions">
          <button type="submit" className="pf-submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : "Submit application"}
          </button>
        </div>
      </form>
    </motion.section>
  );
}
