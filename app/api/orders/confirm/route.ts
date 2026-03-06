import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ConfirmPayload = {
  sessionId?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ConfirmPayload;
  const sessionId = body.sessionId?.trim();

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing sessionId." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: "skipped",
    reason: "Order email sending is disabled for this payment flow.",
  });
}
