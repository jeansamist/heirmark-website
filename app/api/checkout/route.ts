import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const STRIPE_PAYMENT_LINK_URL =
  "https://buy.stripe.com/4gM5kD0Rj8H20Hv4B07IY00";

type CheckoutPayload = {
  fullName?: string;
  email?: string;
  quantity?: number | string;
  address?: string;
};

function getStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseQuantity(value: unknown) {
  const raw = typeof value === "number" ? String(value) : String(value ?? "");
  const quantity = Number.parseInt(raw, 10);
  if (!Number.isInteger(quantity) || quantity < 1) {
    return null;
  }
  return quantity;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CheckoutPayload;

  const fullName = getStringValue(body.fullName);
  const email = getStringValue(body.email);
  const address = getStringValue(body.address);
  const quantity = parseQuantity(body.quantity);

  if (!fullName || !email || !address || !quantity || !isValidEmail(email)) {
    return NextResponse.json(
      {
        error:
          "Please provide a valid full name, email address, quantity, and shipping address.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ checkoutUrl: STRIPE_PAYMENT_LINK_URL });
}
