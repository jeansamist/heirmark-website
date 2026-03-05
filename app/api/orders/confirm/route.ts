import { sendCollectionOrderEmailForSession } from "@/lib/collection-order";
import { getStripeClient } from "@/lib/stripe";
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

  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json({
      status: "skipped",
      reason: "Stripe is not configured.",
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const status = await sendCollectionOrderEmailForSession(stripe, session);
    return NextResponse.json({ status });
  } catch (error) {
    console.error("Failed to confirm collection order email:", error);
    return NextResponse.json(
      { error: "Unable to confirm order at this time." },
      { status: 500 }
    );
  }
}
