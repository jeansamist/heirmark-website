import { sendCollectionOrderEmailForSession } from "@/lib/collection-order";
import { getStripeClient } from "@/lib/stripe";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export const runtime = "nodejs";

const EMAIL_PROCESS_TIMEOUT_MS = 12000;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  return new Promise<T | "timeout">((resolve, reject) => {
    const timer = setTimeout(() => resolve("timeout"), timeoutMs);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

export async function POST(request: Request) {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({
      received: true,
      skipped: true,
      reason:
        "Stripe webhook is disabled because STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET is missing.",
    });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature header." },
      { status: 400 }
    );
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    void withTimeout(
      sendCollectionOrderEmailForSession(stripe, session),
      EMAIL_PROCESS_TIMEOUT_MS
    )
      .then((status) => {
        if (status === "timeout") {
          console.warn(
            `Webhook email processing timed out after ${EMAIL_PROCESS_TIMEOUT_MS}ms for session ${session.id}.`
          );
        }
      })
      .catch((error) => {
        console.error("Webhook email processing failed:", error);
      });
  }

  return NextResponse.json({ received: true });
}
