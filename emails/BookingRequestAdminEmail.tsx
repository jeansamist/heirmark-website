import { Section, Text } from "@react-email/components";
import { EmailLayout, InfoRow, styles } from "./shared";

export type BookingRequestAdminEmailProps = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  engagementType: string;
  location: string;
  details: string;
  submittedAt: string;
};

export function BookingRequestAdminEmail({
  fullName,
  organization,
  email,
  phone,
  engagementType,
  location,
  details,
  submittedAt,
}: BookingRequestAdminEmailProps) {
  return (
    <EmailLayout
      previewText={`New booking request from ${fullName} (${organization})`}
      eyebrow="Booking Request"
      title="A new speaking request has arrived"
    >
      <InfoRow label="Full Name" value={fullName} />
      <InfoRow label="Organization / Institution" value={organization} />
      <InfoRow
        label="Email Address"
        value={
          <a href={`mailto:${email}`} style={{ color: "#2d5f6e" }}>
            {email}
          </a>
        }
      />
      {phone && <InfoRow label="Phone Number" value={phone} />}
      <InfoRow label="Type of Engagement" value={engagementType} />
      {location && <InfoRow label="Event Location" value={location} />}
      <InfoRow label="Submitted" value={submittedAt} />

      {details && (
        <Section style={{ marginTop: "18px" }}>
          <Text style={styles.infoLabel}>Event Details</Text>
          <Text style={styles.messageBlock}>{details}</Text>
        </Section>
      )}

      <Section style={styles.buttonWrap}>
        <a
          href={`mailto:${email}?subject=${encodeURIComponent(
            "Re: Your booking request with HeirMark"
          )}`}
          style={styles.button}
        >
          Reply to {fullName.split(" ")[0]}
        </a>
      </Section>
    </EmailLayout>
  );
}

export default BookingRequestAdminEmail;
