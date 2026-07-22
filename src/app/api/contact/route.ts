import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form endpoint. Validates the submission, then emails it via Resend.
 * Requires RESEND_API_KEY (see .env.example).
 *
 * Delivers to CONTACT_TO_EMAIL, which is temporarily the Resend account
 * owner's address — Resend's sandbox mode only allows sending to that
 * address until basilconsulting.net is verified at resend.com/domains.
 * Once verified, switch CONTACT_TO_EMAIL to info@basilconsulting.net.
 */

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  interest?: unknown;
  message?: unknown;
  /** Honeypot — real users never fill this */
  website?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asString(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmailHtml({
  name,
  email,
  company,
  interest,
  message,
}: {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:4px 12px 4px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
          <td style="padding:4px 0;color:#111827;font-size:14px;vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`
      : "";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="height:4px;background-color:#065f46;line-height:0;font-size:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#065f46;font-weight:600;">
                  New enquiry
                </p>
                <h1 style="margin:6px 0 0;font-size:20px;color:#111827;">
                  ${escapeHtml(company || name)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 4px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">
                  ${row("Name", name)}
                  ${row("Email", email)}
                  ${row("Company", company)}
                  ${row("Interest", interest)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 32px;">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;font-weight:600;">
                  Message
                </p>
                <p style="margin:0;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap;">${escapeHtml(message)}</p>
              </td>
            </tr>
          </table>
          <p style="max-width:560px;margin:16px auto 0;font-size:12px;color:#9ca3af;">
            Sent from the Basil Consulting contact form. Reply-to is set to ${escapeHtml(email)}.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  // Bots fill every field they find; humans never see this one.
  if (asString(body.website, 200) !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name, 120);
  const email = asString(body.email, 200);
  const company = asString(body.company, 160);
  const interest = asString(body.interest, 80);
  const message = asString(body.message, 4000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "A valid work email is required.";
  if (message.length < 20) errors.message = "A little more detail helps us route this well.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — enquiry dropped", {
      name,
      email,
      company,
      interest,
    });
    return NextResponse.json(
      { error: "Email delivery is not configured. Please try again later." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Basil Consulting <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "basiljilani@gmail.com",
      replyTo: email,
      subject: `Enquiry — ${company || name}`,
      text: `${name} (${email})\n${company}\nInterest: ${interest}\n\n${message}`,
      html: renderEmailHtml({ name, email, company, interest, message }),
    });

    if (error) {
      console.error("[contact] Resend rejected the enquiry", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again later." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] failed to send enquiry", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
