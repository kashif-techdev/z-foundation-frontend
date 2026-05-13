import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/schemas";
import { getMailboxes } from "@/lib/email/mailboxes";
import { sendEmail } from "@/lib/email/sendEmail";
import { contactAutoReplyToSender, contactStaffEmail } from "@/lib/email/templates";
import { isSmtpConfigured } from "@/lib/email/transporter";

export const runtime = "nodejs";

export async function POST(request) {
  if (!isSmtpConfigured()) {
    return NextResponse.json(
      { error: "Email is not configured on this server. Please try again later." },
      { status: 503 }
    );
  }

  let json;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const { info } = getMailboxes();

  try {
    const staff = contactStaffEmail(data);
    await sendEmail({
      to: info,
      subject: staff.subject,
      html: staff.html,
      text: staff.text,
      replyTo: data.email,
    });

    try {
      const auto = contactAutoReplyToSender(data);
      await sendEmail({
        to: data.email,
        subject: auto.subject,
        html: auto.html,
        text: auto.text,
      });
    } catch (autoErr) {
      console.error("[api/contact] auto-reply failed", autoErr);
    }
  } catch (e) {
    console.error("[api/contact]", e);
    return NextResponse.json({ error: "Could not send email. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
