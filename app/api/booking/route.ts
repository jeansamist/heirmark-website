import { sendBookingRequestEmail } from "@/lib/email";
import { validateBooking, type BookingValues } from "@/lib/booking-validation";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
 let body: Record<string, unknown>;
 try { body = await request.json(); if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error(); }
 catch { return NextResponse.json({ error: "Please provide a valid booking request." }, { status: 400 }); }
 const str = (key: string) => typeof body[key] === "string" ? (body[key] as string).trim() : "";
 const values: BookingValues = { fullName: str("fullName"), email: str("email"), organization: str("organization"), phone: str("phone"), engagementType: str("engagementType"), eventFormat: str("eventFormat"), eventDate: str("eventDate"), location: str("location"), details: str("details"), consent: body.consent === true };
 const errors = validateBooking(values);
 // Older clients omit the new key; preserve their location-required contract.
 if (!("eventFormat" in body)) delete errors.eventFormat;
 if (Object.keys(errors).length) return NextResponse.json({ error: "Please check the highlighted fields.", errors }, { status: 400 });
 const result = await sendBookingRequestEmail(values);
 if (!result.sent) return NextResponse.json({ error: "We couldn't send your booking request. Your information has been kept so you can try again shortly." }, { status: result.skipped ? 503 : 502 });
 return NextResponse.json({ status: "sent" });
}
