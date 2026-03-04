import { sendCollectionOrderConfirmationEmail } from "@/lib/email";
import { getStripeClient } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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

function getBaseUrl(request: NextRequest) {
  const configuredBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/+$/, "");
  }

  const requestOrigin = request.headers.get("origin");
  if (requestOrigin) {
    return requestOrigin.replace(/\/+$/, "");
  }

  return request.nextUrl.origin.replace(/\/+$/, "");
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

  const baseUrl = getBaseUrl(request);
  const stripe = getStripeClient();

  if (!stripe) {
    await sendCollectionOrderConfirmationEmail({ fullName, email, quantity });

    const fallbackUrl = `${baseUrl}/payment-success?client_name=${encodeURIComponent(fullName)}&quantity=${quantity}&mock=1`;
    return NextResponse.json({ checkoutUrl: fallbackUrl });
  }

  try {
    const priceId = process.env.STRIPE_COLLECTION_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "required",
      customer_email: email,
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/buy?canceled=1`,
      line_items: priceId
        ? [
            {
              price: priceId,
              quantity,
            },
          ]
        : [
            {
              quantity,
              price_data: {
                currency: "usd",
                unit_amount: 7500,
                product_data: {
                  name: "The HeirMark 3-Book Collection",
                  description:
                    "Turn healing into heritage with the full HeirMark 3-book collection.",
                },
              },
            },
          ],
      metadata: {
        fullName,
        email,
        address,
        quantity: String(quantity),
        confirmationEmailSent: "false",
        orderType: "heirmark_collection",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Unable to create Stripe checkout URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("Stripe checkout session creation failed:", error);
    return NextResponse.json(
      {
        error:
          "Unable to start checkout right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
