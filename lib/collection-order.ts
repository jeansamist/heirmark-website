import { sendCollectionOrderConfirmationEmail } from "@/lib/email";
import type Stripe from "stripe";

export type CollectionOrderEmailStatus =
  | "already_sent"
  | "sent"
  | "skipped"
  | "missing_data"
  | "not_paid";

type CollectionOrderData = {
  fullName: string;
  email: string;
  quantity: number;
};

function parseQuantity(value?: string | null) {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }
  return parsed;
}

function getOrderDataFromSession(
  session: Stripe.Checkout.Session
): CollectionOrderData | null {
  const fullName =
    session.metadata?.fullName?.trim() || session.customer_details?.name?.trim();
  const email =
    session.customer_details?.email?.trim() || session.customer_email?.trim();

  if (!fullName || !email) {
    return null;
  }

  return {
    fullName,
    email,
    quantity: parseQuantity(session.metadata?.quantity),
  };
}

function getUpdatedMetadata(session: Stripe.Checkout.Session) {
  const existingMetadata = session.metadata ?? {};
  return {
    ...existingMetadata,
    confirmationEmailSent: "true",
  };
}

export async function sendCollectionOrderEmailForSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session
): Promise<CollectionOrderEmailStatus> {
  if (session.payment_status !== "paid") {
    return "not_paid";
  }

  if (session.metadata?.confirmationEmailSent === "true") {
    return "already_sent";
  }

  const orderData = getOrderDataFromSession(session);
  if (!orderData) {
    return "missing_data";
  }

  const emailResult = await sendCollectionOrderConfirmationEmail(orderData);
  if (!emailResult.sent) {
    return "skipped";
  }

  try {
    await stripe.checkout.sessions.update(session.id, {
      metadata: getUpdatedMetadata(session),
    });
  } catch (error) {
    console.warn(
      `Confirmation email sent but metadata update failed for session ${session.id}:`,
      error
    );
  }

  return "sent";
}
