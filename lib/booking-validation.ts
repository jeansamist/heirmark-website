export const engagementTypes = ["Keynote", "Workshop / Training", "Community Healing Session", "Faith-Based Gathering", "Educational Event", "Other"] as const;
export const eventFormats = ["In person", "Virtual", "Hybrid"] as const;
export type BookingValues = { fullName: string; email: string; organization: string; phone: string; engagementType: string; eventFormat: string; eventDate: string; location: string; details: string; consent: boolean };
export type BookingErrors = Partial<Record<keyof BookingValues, string>>;
export function validateBooking(v: BookingValues, step?: 1 | 2): BookingErrors {
 const errors: BookingErrors = {};
 if (step !== 2) {
  if (!v.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = "Enter a valid email address.";
 }
 if (step !== 1) {
  if (!engagementTypes.some(type => type === v.engagementType)) errors.engagementType = "Choose an engagement type.";
  if (v.eventDate && (!/^\d{4}-\d{2}-\d{2}$/.test(v.eventDate) || !Number.isFinite(Date.parse(v.eventDate)) || new Date(v.eventDate).toISOString().slice(0,10) !== v.eventDate)) errors.eventDate = "Enter a valid event date.";
  if (!eventFormats.some(format => format === v.eventFormat)) errors.eventFormat = "Choose an event format.";
  if (v.eventFormat !== "Virtual" && !v.location.trim()) errors.location = "Enter the event city and country.";
  if (!v.details.trim()) errors.details = "Tell us briefly about your event.";
  if (v.consent !== true) errors.consent = "Please acknowledge the booking request terms.";
 }
 return errors;
}
