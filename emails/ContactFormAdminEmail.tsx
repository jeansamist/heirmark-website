import { Section, Text } from "@react-email/components";
import { EmailLayout, InfoRow, styles } from "./shared";

export type ContactFormAdminEmailProps = {
  fullName: string;
  email: string;
  message: string;
  submittedAt: string;
};

export function ContactFormAdminEmail({
  fullName,
  email,
  message,
  submittedAt,
}: ContactFormAdminEmailProps) {
  return (
    <EmailLayout
      previewText={`New message from ${fullName} via the HeirMark contact form`}
      eyebrow="Contact Form"
      title="You've received a new message"
    >
      <InfoRow label="Full Name" value={fullName} />
      <InfoRow
        label="Email Address"
        value={
          <a href={`mailto:${email}`} style={{ color: "#2d5f6e" }}>
            {email}
          </a>
        }
      />
      <InfoRow label="Submitted" value={submittedAt} />

      <Section style={{ marginTop: "18px" }}>
        <Text style={styles.infoLabel}>Message</Text>
        <Text style={styles.messageBlock}>{message}</Text>
      </Section>

      <Section style={styles.buttonWrap}>
        <a
          href={`mailto:${email}?subject=${encodeURIComponent(
            "Re: Your message to HeirMark"
          )}`}
          style={styles.button}
        >
          Reply to {fullName.split(" ")[0]}
        </a>
      </Section>
    </EmailLayout>
  );
}

export default ContactFormAdminEmail;
