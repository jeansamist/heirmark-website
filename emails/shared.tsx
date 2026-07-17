import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

export const brand = {
  primary: "#2d5f6e",
  primaryDeep: "#183842",
  primarySoft: "#547f8a",
  secondary: "#e9b44c",
  foreground: "#0f1f24",
  mutedForeground: "#5c6b6f",
  surface: "#fcfaf6",
  surfaceMuted: "#f4efe6",
  border: "#e3ded2",
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://theheirmarkframework.com";
}

type EmailLayoutProps = {
  previewText: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function EmailLayout({
  previewText,
  eyebrow,
  title,
  children,
}: EmailLayoutProps) {
  const siteUrl = getSiteUrl();

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={styles.body}>
        <Container style={styles.outerContainer}>
          <Section style={styles.header}>
            <Img
              src={`${siteUrl}/HEIRMARK-logo.png`}
              width="132"
              alt="HeirMark"
              style={styles.logo}
            />
          </Section>

          <Container style={styles.card}>
            <Text style={styles.eyebrow}>{eyebrow}</Text>
            <Text style={styles.title}>{title}</Text>
            <Hr style={styles.divider} />

            {children}
          </Container>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              This notification was sent automatically from the contact
              forms on{" "}
              <a href={siteUrl} style={styles.footerLink}>
                theheirmarkframework.com
              </a>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

type InfoRowProps = {
  label: string;
  value: ReactNode;
};

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <Section style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </Section>
  );
}

export const styles = {
  body: {
    backgroundColor: brand.surfaceMuted,
    fontFamily:
      "'Helvetica Neue', Helvetica, Arial, sans-serif",
    margin: 0,
    padding: "32px 12px",
  },
  outerContainer: {
    margin: "0 auto",
    maxWidth: "600px",
  },
  header: {
    textAlign: "center" as const,
    padding: "4px 0 20px",
  },
  logo: {
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    border: `1px solid ${brand.border}`,
    borderRadius: "20px",
    padding: "36px 36px 28px",
  },
  eyebrow: {
    color: brand.secondary,
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    margin: "0 0 10px",
    textTransform: "uppercase" as const,
  },
  title: {
    color: brand.primaryDeep,
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "26px",
    lineHeight: "32px",
    margin: "0 0 4px",
  },
  divider: {
    borderColor: brand.border,
    margin: "22px 0",
  },
  infoRow: {
    borderBottom: `1px solid ${brand.border}`,
    padding: "12px 0",
  },
  infoLabel: {
    color: brand.mutedForeground,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    margin: "0 0 4px",
    textTransform: "uppercase" as const,
  },
  infoValue: {
    color: brand.foreground,
    fontSize: "16px",
    lineHeight: "24px",
    margin: 0,
    whiteSpace: "pre-wrap" as const,
  },
  messageBlock: {
    backgroundColor: brand.surface,
    borderLeft: `3px solid ${brand.secondary}`,
    borderRadius: "10px",
    color: brand.foreground,
    fontSize: "16px",
    lineHeight: "26px",
    margin: "8px 0 0",
    padding: "18px 20px",
    whiteSpace: "pre-wrap" as const,
  },
  button: {
    backgroundColor: brand.primary,
    borderRadius: "999px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: 600,
    padding: "14px 28px",
    textDecoration: "none",
  },
  buttonWrap: {
    margin: "28px 0 4px",
    textAlign: "center" as const,
  },
  footer: {
    padding: "22px 12px 0",
    textAlign: "center" as const,
  },
  footerText: {
    color: brand.mutedForeground,
    fontSize: "12px",
    lineHeight: "18px",
    margin: 0,
  },
  footerLink: {
    color: brand.primary,
    textDecoration: "underline",
  },
};
