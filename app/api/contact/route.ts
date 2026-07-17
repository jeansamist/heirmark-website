import { sendContactFormEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  fullName?: string;
  email?: string;
  message?: string;
};

function getStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as ContactPayload;

  const fullName = getStringValue(body.fullName);
  const email = getStringValue(body.email);
  const message = getStringValue(body.message);

  if (!fullName || !email || !message || !isValidEmail(email)) {
    return NextResponse.json(
      {
        error:
          "Please provide a valid full name, email address, and message.",
      },
      { status: 400 }
    );
  }

  const result = await sendContactFormEmail({ fullName, email, message });

  if (!result.sent) {
    if (result.skipped) {
      console.warn("Contact form email skipped:", result.reason);
      return NextResponse.json({ status: "skipped", reason: result.reason });
    }

    return NextResponse.json(
      { error: "We couldn't send your message. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ status: "sent" });
}
