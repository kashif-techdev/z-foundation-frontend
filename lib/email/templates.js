import { escapeHtml } from "./escapeHtml";
import { getPublicSiteUrl, getSiteName } from "./mailboxes";

function shell(title, bodyHtml) {
  const site = escapeHtml(getSiteName());
  const url = escapeHtml(getPublicSiteUrl());
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;background:#f1f5f9;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background:linear-gradient(120deg,#1e3a8a,#0f766e);padding:20px 24px;color:#ffffff;">
              <div style="font-size:18px;font-weight:700;">${site}</div>
              <div style="font-size:12px;opacity:0.9;margin-top:4px;"><a href="${url}" style="color:#e0f2fe;text-decoration:none;">${url}</a></div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 24px 32px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background:#f8fafc;font-size:11px;color:#64748b;border-top:1px solid #e2e8f0;">
              This message was sent via the ${site} website. Please do not share passwords or sensitive bank details by email.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function textBlock(label, value) {
  return `<p style="margin:0 0 14px;font-size:14px;line-height:1.55;"><strong style="color:#334155;">${escapeHtml(label)}</strong><br/><span style="color:#0f172a;">${escapeHtml(value)}</span></p>`;
}

export function contactStaffEmail(payload) {
  const { fullName, email, subject, message } = payload;
  const title = `New contact: ${subject}`;
  const body = `
    <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">General inquiry</h1>
    ${textBlock("Full name", fullName)}
    ${textBlock("Email", email)}
    ${textBlock("Subject", subject)}
    <p style="margin:0;font-size:14px;line-height:1.55;"><strong style="color:#334155;">Message</strong></p>
    <div style="margin-top:8px;padding:14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:14px;line-height:1.6;color:#0f172a;white-space:pre-wrap;">${escapeHtml(message)}</div>
  `;
  return {
    subject: `[Contact] ${subject}`,
    html: shell(title, body),
    text: `Contact form\nName: ${fullName}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
  };
}

export function contactAutoReplyToSender(payload) {
  const { fullName, email } = payload;
  const site = getSiteName();
  const body = `
    <h1 style="margin:0 0 12px;font-size:20px;color:#0f172a;">Thank you, ${escapeHtml(fullName)}</h1>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#334155;">
      We have received your message and will get back to you as soon as we can.
    </p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#334155;">
      — ${escapeHtml(site)}
    </p>
  `;
  return {
    subject: `We received your message — ${site}`,
    html: shell("Message received", body),
    text: `Thank you ${fullName},\n\nWe have received your message sent from ${email}.\n\n— ${site}`,
  };
}

export function volunteerStaffEmail(payload, attachmentMeta) {
  const { fullName, email, phone, city, skills, availability, motivation } = payload;
  const att = attachmentMeta
    ? `<p style="font-size:14px;color:#334155;">CV attached: <strong>${escapeHtml(attachmentMeta.filename)}</strong> (${escapeHtml(attachmentMeta.sizeLabel)})</p>`
    : `<p style="font-size:14px;color:#334155;">No CV attached.</p>`;
  const body = `
    <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Volunteer application</h1>
    ${textBlock("Full name", fullName)}
    ${textBlock("Email", email)}
    ${textBlock("Phone", phone)}
    ${textBlock("City", city)}
    ${textBlock("Skills", skills)}
    ${textBlock("Availability", availability)}
    <p style="margin:0;font-size:14px;line-height:1.55;"><strong style="color:#334155;">Why volunteer</strong></p>
    <div style="margin-top:8px;padding:14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:14px;line-height:1.6;color:#0f172a;white-space:pre-wrap;">${escapeHtml(motivation)}</div>
    ${att}
  `;
  return {
    subject: `[Volunteer] Application from ${fullName}`,
    html: shell("Volunteer application", body),
    text: `Volunteer application\n${fullName}\n${email}\n${phone}\n${city}\nSkills: ${skills}\nAvailability: ${availability}\nWhy: ${motivation}\n`,
  };
}

export function volunteerAutoReplyToSender(payload) {
  const { fullName } = payload;
  const site = getSiteName();
  const body = `
    <h1 style="margin:0 0 12px;font-size:20px;color:#0f172a;">Thank you, ${escapeHtml(fullName)}</h1>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#334155;">
      We have received your volunteer application. Our team will review it and contact you when there is a suitable opportunity.
    </p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#334155;">— ${escapeHtml(site)}</p>
  `;
  return {
    subject: `Volunteer application received — ${site}`,
    html: shell("Application received", body),
    text: `Thank you ${fullName},\n\nWe received your volunteer application.\n\n— ${site}`,
  };
}

export function donateStaffEmail(payload) {
  const { name, email, donationInterest, message } = payload;
  const body = `
    <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Donation inquiry</h1>
    ${textBlock("Name", name)}
    ${textBlock("Email", email)}
    ${textBlock("Interest", donationInterest)}
    <p style="margin:0;font-size:14px;line-height:1.55;"><strong style="color:#334155;">Message</strong></p>
    <div style="margin-top:8px;padding:14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:14px;line-height:1.6;color:#0f172a;white-space:pre-wrap;">${escapeHtml(message)}</div>
  `;
  return {
    subject: `[Donate] Inquiry from ${name}`,
    html: shell("Donation inquiry", body),
    text: `Donation inquiry\n${name}\n${email}\nInterest: ${donationInterest}\n\n${message}`,
  };
}

export function donateAutoReplyToSender(payload) {
  const { name } = payload;
  const site = getSiteName();
  const body = `
    <h1 style="margin:0 0 12px;font-size:20px;color:#0f172a;">Thank you, ${escapeHtml(name)}</h1>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#334155;">
      We have received your donation inquiry. A team member will follow up with next steps.
    </p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#334155;">— ${escapeHtml(site)}</p>
  `;
  return {
    subject: `Donation inquiry received — ${site}`,
    html: shell("Thank you", body),
    text: `Thank you ${name},\n\nWe received your donation inquiry.\n\n— ${site}`,
  };
}

export function supportStaffEmail(payload) {
  const { name, email, issueType, message } = payload;
  const body = `
    <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Support request</h1>
    ${textBlock("Name", name)}
    ${textBlock("Email", email)}
    ${textBlock("Issue type", issueType)}
    <p style="margin:0;font-size:14px;line-height:1.55;"><strong style="color:#334155;">Message</strong></p>
    <div style="margin-top:8px;padding:14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:14px;line-height:1.6;color:#0f172a;white-space:pre-wrap;">${escapeHtml(message)}</div>
  `;
  return {
    subject: `[Support] ${issueType} — ${name}`,
    html: shell("Support request", body),
    text: `Support\n${name}\n${email}\nType: ${issueType}\n\n${message}`,
  };
}

export function supportAutoReplyToSender(payload) {
  const { name } = payload;
  const site = getSiteName();
  const body = `
    <h1 style="margin:0 0 12px;font-size:20px;color:#0f172a;">Thank you, ${escapeHtml(name)}</h1>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#334155;">
      We have received your support request and will respond as soon as possible.
    </p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#334155;">— ${escapeHtml(site)}</p>
  `;
  return {
    subject: `Support request received — ${site}`,
    html: shell("Request received", body),
    text: `Thank you ${name},\n\nWe received your support request.\n\n— ${site}`,
  };
}
