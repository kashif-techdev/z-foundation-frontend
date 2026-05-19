import { z } from "zod";

const emptyHoneypot = z
  .string()
  .optional()
  .refine((v) => !v || v.trim() === "", { message: "Invalid submission" });

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Enter a valid email").max(254),
  subject: z.string().trim().min(2, "Subject is required").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(8000),
  company: emptyHoneypot,
});

export const DONATION_INTERESTS = [
  "EasyPaisa — payment sent",
  "One-time donation",
  "Monthly giving",
  "In-kind / supplies",
  "Corporate / CSR",
  "Zakat / religious giving",
  "Other",
];

export const donateFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  donationInterest: z.enum([
    DONATION_INTERESTS[0],
    DONATION_INTERESTS[1],
    DONATION_INTERESTS[2],
    DONATION_INTERESTS[3],
    DONATION_INTERESTS[4],
    DONATION_INTERESTS[5],
    DONATION_INTERESTS[6],
  ]),
  message: z.string().trim().min(5).max(8000),
  company: emptyHoneypot,
});

export const SUPPORT_ISSUES = [
  "Website or technical",
  "Donation question",
  "Volunteering",
  "Partnership / media",
  "General",
  "Other",
];

export const supportFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  issueType: z.enum(SUPPORT_ISSUES),
  message: z.string().trim().min(5).max(8000),
  company: emptyHoneypot,
});

const phoneRegex = /^[\d\s+().-]{7,32}$/;

export const volunteerFormSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(30)
    .refine((v) => phoneRegex.test(v), "Enter a valid phone number")
    .refine((v) => (v.match(/\d/g) || []).length >= 8, "Enter a valid phone number"),
  city: z.string().trim().min(2).max(120),
  skills: z.string().trim().min(2).max(2000),
  availability: z.string().trim().min(2).max(2000),
  motivation: z.string().trim().min(20, "Please write at least 20 characters").max(8000),
  company: emptyHoneypot,
});

const ALLOWED_CV_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_CV_BYTES = 3 * 1024 * 1024;

export function validateVolunteerCv(file) {
  if (!file || !(file instanceof Blob)) {
    return { ok: true, file: null };
  }
  if (file.size > MAX_CV_BYTES) {
    return { ok: false, error: "CV must be 3MB or smaller" };
  }
  const name = file.name || "";
  const lower = name.toLowerCase();
  if (!lower.endsWith(".pdf") && !lower.endsWith(".doc") && !lower.endsWith(".docx")) {
    return { ok: false, error: "CV must be PDF, DOC, or DOCX" };
  }
  const type = file.type || "";
  if (type && !ALLOWED_CV_MIME.has(type) && !/\.(pdf|doc|docx)$/i.test(lower)) {
    return { ok: false, error: "Invalid file type" };
  }
  return { ok: true, file };
}

export const volunteerFormClientSchema = volunteerFormSchema.extend({
  cv: z.any().optional(),
});

export function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
