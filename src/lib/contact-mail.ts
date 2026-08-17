import { Resend } from "resend";
import { inquiryOptions } from "@/data/labels";
import type { ContactInput } from "@/lib/validation/contact";

type ContactPayload = Omit<ContactInput, "website">;

const SOURCE = "sofirasystems.com";

export function getContactMailConfig(): {
  apiKey: string;
  from: string;
  to: string;
} | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();

  if (!apiKey || !from || !to) {
    return null;
  }

  return { apiKey, from, to };
}

export function inquiryLabel(inquiry: string): string {
  return inquiryOptions.find((option) => option.id === inquiry)?.label ?? "";
}

export function buildContactSubject(inquiry: string): string {
  const topic = inquiryLabel(inquiry);
  if (topic) {
    return `Ново запитване от сайта — ${topic}`;
  }
  return "Ново запитване от сайта — SOFIRA SYSTEMS";
}

export function buildContactText(data: ContactPayload): string {
  const topic = inquiryLabel(data.inquiry) || "Не е избрана";

  return [
    "Ново запитване от sofirasystems.com",
    "",
    `Име: ${data.name}`,
    `Имейл: ${data.email}`,
    `Компания: ${data.company || "Не е посочена"}`,
    `Телефон: ${data.phone || "Не е посочен"}`,
    `Тема: ${topic}`,
    "",
    "Съобщение:",
    data.message,
    "",
    `Източник: ${SOURCE}`,
  ].join("\n");
}

export function buildContactHtml(data: ContactPayload): string {
  const topic = inquiryLabel(data.inquiry) || "Не е избрана";
  const rows = [
    ["Име", data.name],
    ["Имейл", data.email],
    ["Компания", data.company || "Не е посочена"],
    ["Телефон", data.phone || "Не е посочен"],
    ["Тема", topic],
  ];

  return `<!DOCTYPE html>
<html lang="bg">
  <body style="margin:0;padding:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#0c1730;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6fb;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #e2eaf6;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#0c1730;padding:24px 28px;">
                <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#9aabc4;">SOFIRA SYSTEMS</p>
                <h1 style="margin:10px 0 0;font-size:22px;line-height:1.3;color:#f4f7fb;font-weight:600;">Ново запитване от сайта</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4d5d78;">Получено е запитване чрез контактната форма на sofirasystems.com.</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${rows
                    .map(
                      ([label, value]) => `
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef3fa;width:140px;font-size:13px;color:#64748b;vertical-align:top;">${escapeHtml(label)}</td>
                    <td style="padding:10px 0;border-bottom:1px solid #eef3fa;font-size:15px;color:#0c1730;">${escapeHtml(value)}</td>
                  </tr>`,
                    )
                    .join("")}
                </table>
                <p style="margin:24px 0 8px;font-size:13px;color:#64748b;">Съобщение</p>
                <p style="margin:0;padding:16px 18px;background:#f3f6fb;border-radius:12px;font-size:15px;line-height:1.65;color:#0c1730;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
                <p style="margin:24px 0 0;font-size:12px;color:#64748b;">Източник: ${SOURCE}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendContactEmail(
  data: ContactPayload,
): Promise<{ ok: true } | { ok: false }> {
  const config = getContactMailConfig();
  if (!config) {
    return { ok: false };
  }

  try {
    const resend = new Resend(config.apiKey);
    const { data: sent, error } = await resend.emails.send({
      from: `SOFIRA SYSTEMS <${config.from}>`,
      to: config.to,
      replyTo: data.email,
      subject: buildContactSubject(data.inquiry),
      html: buildContactHtml(data),
      text: buildContactText(data),
    });

    if (error || !sent?.id) {
      return { ok: false };
    }

    return { ok: true };
  } catch {
    return { ok: false };
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
