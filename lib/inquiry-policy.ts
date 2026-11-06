// Shared client/server policy: all inquiry submissions require Turnstile verification.
// SMTP readiness, server validation, honeypot and client duplicate locks also remain required.
export const INQUIRY_TURNSTILE_REQUIRED = true;
