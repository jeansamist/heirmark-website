import BookingRequestAdminEmail, {
  type BookingRequestAdminEmailProps,
} from "@/emails/BookingRequestAdminEmail";
import CollectionOrderConfirmationEmail from "@/emails/CollectionOrderConfirmationEmail";
import ContactFormAdminEmail, {
  type ContactFormAdminEmailProps,
} from "@/emails/ContactFormAdminEmail";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import type { ReactElement } from "react";

export const COLLECTION_ORDER_EMAIL_SUBJECT =
  "Your HeirMark Collection Order Is Confirmed";

const ADMIN_NOTIFICATION_EMAIL = "victorilome@gmail.com";

type CollectionOrderEmailPayload = {
  fullName: string;
  email: string;
  quantity: number;
};

type ContactFormEmailPayload = Omit<ContactFormAdminEmailProps, "submittedAt">;

type BookingRequestEmailPayload = Omit<
  BookingRequestAdminEmailProps,
  "submittedAt"
>;

type EmailResult = {
  sent: boolean;
  skipped: boolean;
  reason?: string;
  error?: unknown;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number.parseInt(process.env.SMTP_PORT ?? "", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;
  const secure =
    process.env.SMTP_SECURE === "true" ||
    (Number.isFinite(port) ? port === 465 : false);

  if (!host || !Number.isFinite(port) || !user || !pass || !from) {
    return null;
  }

  return { host, port, user, pass, from, secure };
}

function createTransporter(
  smtpConfig: NonNullable<ReturnType<typeof getSmtpConfig>>,
) {
  return nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });
}

async function sendRenderedEmail({
  to,
  from,
  subject,
  element,
  replyTo,
  transporter,
}: {
  to: string;
  from: string;
  subject: string;
  element: ReactElement;
  replyTo?: string;
  transporter: nodemailer.Transporter;
}): Promise<EmailResult> {
  try {
    const html = await render(element);
    const text = await render(element, { plainText: true });

    await transporter.sendMail({
      from,
      to,
      replyTo,
      subject,
      html,
      text,
    });

    return { sent: true, skipped: false };
  } catch (error) {
    console.error(`Failed to send email "${subject}":`, error);
    return { sent: false, skipped: false, error };
  }
}

export async function sendCollectionOrderConfirmationEmail(
  payload: CollectionOrderEmailPayload,
): Promise<EmailResult> {
  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) {
    return {
      sent: false,
      skipped: true,
      reason:
        "SMTP settings are incomplete. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM.",
    };
  }

  return sendRenderedEmail({
    to: payload.email,
    from: smtpConfig.from,
    subject: COLLECTION_ORDER_EMAIL_SUBJECT,
    element: CollectionOrderConfirmationEmail({
      clientName: payload.fullName,
      quantity: payload.quantity,
    }),
    transporter: createTransporter(smtpConfig),
  });
}

export async function sendContactFormEmail(
  payload: ContactFormEmailPayload,
): Promise<EmailResult> {
  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) {
    return {
      sent: false,
      skipped: true,
      reason:
        "SMTP settings are incomplete. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM.",
    };
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return sendRenderedEmail({
    to: ADMIN_NOTIFICATION_EMAIL,
    from: smtpConfig.from,
    replyTo: payload.email,
    subject: `New Contact Form Message from ${payload.fullName}`,
    element: ContactFormAdminEmail({ ...payload, submittedAt }),
    transporter: createTransporter(smtpConfig),
  });
}

export async function sendBookingRequestEmail(
  payload: BookingRequestEmailPayload,
): Promise<EmailResult> {
  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) {
    return {
      sent: false,
      skipped: true,
      reason:
        "SMTP settings are incomplete. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM.",
    };
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return sendRenderedEmail({
    to: ADMIN_NOTIFICATION_EMAIL,
    from: smtpConfig.from,
    replyTo: payload.email,
    subject: `New Booking Request from ${payload.fullName}`,
    element: BookingRequestAdminEmail({ ...payload, submittedAt }),
    transporter: createTransporter(smtpConfig),
  });
}
