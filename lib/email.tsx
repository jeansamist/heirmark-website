import CollectionOrderConfirmationEmail from "@/emails/CollectionOrderConfirmationEmail";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

export const COLLECTION_ORDER_EMAIL_SUBJECT =
  "Your HeirMark Collection Order Is Confirmed";

type CollectionOrderEmailPayload = {
  fullName: string;
  email: string;
  quantity: number;
};

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

export async function sendCollectionOrderConfirmationEmail(
  payload: CollectionOrderEmailPayload
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

  try {
    const html = await render(
      CollectionOrderConfirmationEmail({
        clientName: payload.fullName,
        quantity: payload.quantity,
      })
    );
    const text = await render(
      CollectionOrderConfirmationEmail({
        clientName: payload.fullName,
        quantity: payload.quantity,
      }),
      { plainText: true }
    );

    const transporter = nodemailer.createTransport({
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

    await transporter.sendMail({
      from: smtpConfig.from,
      to: payload.email,
      subject: COLLECTION_ORDER_EMAIL_SUBJECT,
      html,
      text,
    });

    return { sent: true, skipped: false };
  } catch (error) {
    console.error("Failed to send collection confirmation email:", error);
    return {
      sent: false,
      skipped: false,
      error,
    };
  }
}
