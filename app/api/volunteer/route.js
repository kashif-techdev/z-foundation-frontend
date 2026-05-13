import { NextResponse } from "next/server";
import { volunteerFormSchema, validateVolunteerCv, formatBytes } from "@/lib/validation/schemas";
import { getMailboxes } from "@/lib/email/mailboxes";
import { sendEmail } from "@/lib/email/sendEmail";
import { volunteerAutoReplyToSender, volunteerStaffEmail } from "@/lib/email/templates";
import { isSmtpConfigured } from "@/lib/email/transporter";

export const runtime = "nodejs";

export async function POST(request) {
  if (!isSmtpConfigured()) {
    return NextResponse.json({ error: "Email is not configured on this server." }, { status: 503 });
  }

  const ct = request.headers.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const payload = {
    fullName: String(formData.get("fullName") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    city: String(formData.get("city") || ""),
    skills: String(formData.get("skills") || ""),
    availability: String(formData.get("availability") || ""),
    motivation: String(formData.get("motivation") || ""),
    company: formData.get("company") ? String(formData.get("company")) : "",
  };

  const parsed = volunteerFormSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const rawFile = formData.get("cv");
  let attachment;
  let attachmentMeta = null;

  if (rawFile && typeof rawFile === "object" && "arrayBuffer" in rawFile && rawFile.size > 0) {
    const check = validateVolunteerCv(rawFile);
    if (!check.ok) {
      return NextResponse.json({ error: check.error }, { status: 400 });
    }
    const buffer = Buffer.from(await rawFile.arrayBuffer());
    attachment = {
      filename: rawFile.name || "cv.pdf",
      content: buffer,
      contentType: rawFile.type || "application/octet-stream",
    };
    attachmentMeta = {
      filename: rawFile.name || "cv",
      sizeLabel: formatBytes(rawFile.size),
    };
  }

  const { volunteer } = getMailboxes();

  try {
    const staff = volunteerStaffEmail(data, attachmentMeta);
    await sendEmail({
      to: volunteer,
      subject: staff.subject,
      html: staff.html,
      text: staff.text,
      replyTo: data.email,
      attachments: attachment ? [attachment] : undefined,
    });

    try {
      const auto = volunteerAutoReplyToSender(data);
      await sendEmail({
        to: data.email,
        subject: auto.subject,
        html: auto.html,
        text: auto.text,
      });
    } catch (autoErr) {
      console.error("[api/volunteer] auto-reply failed", autoErr);
    }
  } catch (e) {
    console.error("[api/volunteer]", e);
    return NextResponse.json({ error: "Could not send email. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
