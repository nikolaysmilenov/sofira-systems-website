import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/contact-mail";
import { rateLimit } from "@/lib/rate-limit";
import {
  isContactDeliveryConfigured,
  validateContactInput,
} from "@/lib/validation/contact";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT = 8;
const RATE_WINDOW_MS = 60_000;

const jsonHeaders = {
  "Cache-Control": "no-store",
};

function sendFailure() {
  return NextResponse.json(
    {
      status: "error",
      message: "Възникна проблем при изпращането. Моля, опитайте отново.",
    },
    { status: 500, headers: jsonHeaders },
  );
}

export function GET() {
  return NextResponse.json(
    { status: "invalid", message: "Методът не е позволен." },
    { status: 405, headers: { ...jsonHeaders, Allow: "POST" } },
  );
}

export async function POST(request: Request) {
  try {
    const clientKey = getClientKey(request);
    const limit = rateLimit(clientKey, RATE_LIMIT, RATE_WINDOW_MS);

    if (limit.limited) {
      return NextResponse.json(
        {
          status: "error",
          message: "Твърде много опити. Моля, изчакайте малко и опитайте отново.",
        },
        {
          status: 429,
          headers: {
            ...jsonHeaders,
            "Retry-After": String(limit.retryAfterSeconds),
          },
        },
      );
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { status: "invalid", message: "Невалидно съдържание на заявката." },
        { status: 415, headers: jsonHeaders },
      );
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { status: "invalid", message: "Заявката е твърде голяма." },
        { status: 413, headers: jsonHeaders },
      );
    }

    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { status: "invalid", message: "Заявката е твърде голяма." },
        { status: 413, headers: jsonHeaders },
      );
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody) as unknown;
    } catch {
      return NextResponse.json(
        { status: "invalid", message: "Невалидно съдържание на заявката." },
        { status: 400, headers: jsonHeaders },
      );
    }

    const result = validateContactInput(payload);

    if (!result.ok) {
      return NextResponse.json(
        { status: "invalid", errors: result.errors },
        { status: 400, headers: jsonHeaders },
      );
    }

    if (result.isSpam) {
      return NextResponse.json({ status: "sent" }, { status: 200, headers: jsonHeaders });
    }

    if (!isContactDeliveryConfigured()) {
      return sendFailure();
    }

    const delivered = await sendContactEmail(result.data);
    if (!delivered.ok) {
      return sendFailure();
    }

    return NextResponse.json({ status: "sent" }, { status: 200, headers: jsonHeaders });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Възникна проблем при изпращането. Моля, опитайте отново.",
      },
      { status: 500, headers: jsonHeaders },
    );
  }
}

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "unknown";
}
