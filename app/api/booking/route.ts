import { sendBookingRequestEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type BookingPayload = {
  fullName?: string;
  organization?: string;
  email?: string;
  phone?: string;
  engagementType?: string;
  location?: string;
  details?: string;
  consent?: boolean;
};

function getStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as BookingPayload;

  const fullName = getStringValue(body.fullName);
  const organization = getStringValue(body.organization);
  const email = getStringValue(body.email);
  const phone = getStringValue(body.phone);
  const engagementType = getStringValue(body.engagementType);
  const location = getStringValue(body.location);
  const details = getStringValue(body.details);

  if (
    !fullName ||
    !organization ||
    !email ||
    !engagementType ||
    !body.consent ||
    !isValidEmail(email)
  ) {
    return NextResponse.json(
      {
        error:
          "Please provide a valid full name, organization, email address, engagement type, and consent.",
      },
      { status: 400 }
    );
  }

  const result = await sendBookingRequestEmail({
    fullName,
    organization,
    email,
    phone,
    engagementType,
    location,
    details,
  });

  if (!result.sent) {
    if (result.skipped) {
      console.warn("Booking request email skipped:", result.reason);
      return NextResponse.json({ status: "skipped", reason: result.reason });
    }

    return NextResponse.json(
      {
        error:
          "We couldn't send your booking request. Please try again shortly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ status: "sent" });
}
