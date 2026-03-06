"use client";

type PaymentSuccessEmailTriggerProps = {
  sessionId: string | null;
};

export default function PaymentSuccessEmailTrigger({
  sessionId,
}: PaymentSuccessEmailTriggerProps) {
  void sessionId;
  return null;
}
