import { getTransporter } from "./transporter";

/**
 * @param {object} opts
 * @param {string|string[]} opts.to
 * @param {string} opts.subject
 * @param {string} opts.html
 * @param {string} [opts.text]
 * @param {string} [opts.replyTo]
 * @param {import('nodemailer').SendMailOptions['attachments']} [opts.attachments]
 */
export async function sendEmail(opts) {
  const transporter = getTransporter();
  if (!transporter) {
    const err = new Error("SMTP is not configured. Set SMTP_USER and SMTP_PASS.");
    err.code = "SMTP_NOT_CONFIGURED";
    throw err;
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"${process.env.MAIL_SITE_NAME || "Z-Foundation"}" <${from}>`,
    to: Array.isArray(opts.to) ? opts.to.join(", ") : opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo,
    attachments: opts.attachments,
  });
}
