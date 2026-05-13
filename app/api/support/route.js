import { NextResponse } from "next/server";
import { supportFormSchema } from "@/lib/validation/schemas";
import { getMailboxes } from "@/lib/email/mailboxes";
import { sendEmail } from "@/lib/email/sendEmail";
import { supportAutoReplyToSender, supportStaffEmail } from "@/lib/email/templates";
import { isSmtpConfigured } from "@/lib/email/transporter";

export const runtime = "nodejs";

export async function POST(request) {
  if (!isSmtpConfigured()) {
    return NextResponse.json({ error: "Email is not configured on this server." }, { status: 503 });
  }

  let json;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = supportFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const { support } = getMailboxes();

  try {
    const staff = supportStaffEmail(data);
    await sendEmail({
      to: support,
      subject: staff.subject,
      html: staff.html,
      text: staff.text,
      replyTo: data.email,
    });

    try {
      const auto = supportAutoReplyToSender(data);
      await sendEmail({
        to: data.email,
        subject: auto.subject,
        html: auto.html,
        text: auto.text,
      });
    } catch (autoErr) {
      console.error("[api/support] auto-reply failed", autoErr);
    }
  } catch (e) {
    console.error("[api/support]", e);
    return NextResponse.json({ error: "Could not send email. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
