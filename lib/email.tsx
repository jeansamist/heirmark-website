import "server-only";
import { validEmail } from "./inquiry-validation";
import PartnershipInquiryEmail from "@/emails/PartnershipInquiryEmail";
import type { InquiryValues } from "./partnership-validation";
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

export function getInquirySmtpConfig() {
 const {SMTP_HOST:host,SMTP_PORT:portValue,SMTP_USER:user,SMTP_APP_PASSWORD:pass,CONTACT_RECIPIENT_EMAIL:recipient}=process.env;
 if(!host || !/^[a-zA-Z0-9.-]+$/.test(host) || !['465','587'].includes(portValue??'') || !user || !validEmail(user) || !pass || !recipient || !validEmail(recipient))return null;
 const port=Number(portValue);
 return {host,port,user,pass,from:user,secure:port===465,recipient};
}
// Short-lived health cache only; this is NOT a rate limiter.
let health: {until:number; pending:Promise<boolean>} | undefined;
export async function inquiryEmailReady():Promise<boolean> {
 const config=getInquirySmtpConfig();if(!config)return false;
 if(health && health.until>Date.now())return health.pending;
 const pending=(async()=>{const transport=createTransporter(config);try{await transport.verify();return true;}catch{return false;}finally{transport.close();}})();
 health={until:Date.now()+60000,pending};return pending;
}

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
    requireTLS: !smtpConfig.secure,
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    disableFileAccess: true,
    disableUrlAccess: true,
    logger: false,
    debug: false,
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

    const result = await transporter.sendMail({
      from,
      to,
      replyTo,
      subject,
      html,
      text,
    });

    if(!result.accepted?.some((address: string | {address:string}) => (typeof address === "string" ? address : address.address).toLowerCase() === to.toLowerCase())) return {sent:false,skipped:false};
    return { sent: true, skipped: false };
  } catch {
    return { sent: false, skipped: false };
  } finally { transporter.close(); }
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
  const smtpConfig = getInquirySmtpConfig();
  if (!smtpConfig) {
    return {
      sent: false,
      skipped: true,
      reason:
        "SMTP settings are incomplete. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_APP_PASSWORD, and CONTACT_RECIPIENT_EMAIL.",
    };
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return sendRenderedEmail({
    to: smtpConfig.recipient,
    from: smtpConfig.from,
    replyTo: payload.email.trim(),
    subject: "[HeirMark Contact] New Website Inquiry",
    element: ContactFormAdminEmail({ ...payload, submittedAt }),
    transporter: createTransporter(smtpConfig),
  });
}

export async function sendBookingRequestEmail(
  payload: BookingRequestEmailPayload,
): Promise<EmailResult> {
  const smtpConfig = getInquirySmtpConfig();
  if (!smtpConfig) {
    return {
      sent: false,
      skipped: true,
      reason:
        "SMTP settings are incomplete. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_APP_PASSWORD, and CONTACT_RECIPIENT_EMAIL.",
    };
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return sendRenderedEmail({
    to: smtpConfig.recipient,
    from: smtpConfig.from,
    replyTo: payload.email.trim(),
    subject: "[HeirMark Speaking] New Booking Request",
    element: BookingRequestAdminEmail({ ...payload, submittedAt }),
    transporter: createTransporter(smtpConfig),
  });
}

export async function sendPartnershipInquiryEmail(payload:InquiryValues):Promise<EmailResult> {
 const config=getInquirySmtpConfig();if(!config)return {sent:false,skipped:true};
 return sendRenderedEmail({to:config.recipient,from:config.user,replyTo:payload.email.trim(),subject:"[HeirMark Partnership] New Collaboration Inquiry",element:PartnershipInquiryEmail({...payload,submittedAt:new Date().toISOString()}),transporter:createTransporter(config)});
}
