"use client";

import { useEffect, useRef } from "react";

type PaymentSuccessEmailTriggerProps = {
  sessionId: string | null;
};

export default function PaymentSuccessEmailTrigger({
  sessionId,
}: PaymentSuccessEmailTriggerProps) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!sessionId || hasTriggered.current) {
      return;
    }

    hasTriggered.current = true;
    void fetch("/api/orders/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });
  }, [sessionId]);

  return null;
}
