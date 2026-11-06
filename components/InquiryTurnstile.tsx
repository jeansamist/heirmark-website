"use client";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }
let loading: Promise<TurnstileApi> | undefined;
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (loading) return loading;
  loading = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    const timer = setTimeout(fail, 15000);
    function fail() { clearTimeout(timer); script.remove(); loading = undefined; reject(new Error("Verification unavailable")); }
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => { clearTimeout(timer); if (window.turnstile) resolve(window.turnstile); else fail(); };
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return loading;
}

export default function InquiryTurnstile({ action, resetKey, onToken }: {
  action: "contact" | "booking" | "partnership";
  resetKey: number;
  onToken: (token: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    if (!sitekey) return;
    let active = true;
    let widget: string | undefined;
    let api: TurnstileApi | undefined;
    const failed = () => { if (active) { onToken(""); setError(true); } };
    loadTurnstile().then(instance => {
      if (!active || !container.current) return;
      api = instance;
      widget = api.render(container.current, {
        sitekey, action, size: "compact", theme: "light", "response-field": false,
        callback: (token: string) => { if (active) { setError(false); onToken(token); } },
        "expired-callback": () => { if (active) onToken(""); },
        "error-callback": failed,
        "timeout-callback": failed,
        "refresh-expired": "auto",
      });
    }).catch(failed);
    return () => { active = false; if (widget !== undefined) api?.remove(widget); };
  }, [sitekey, action, resetKey, attempt, onToken]);
  return <div style={{ marginBlock: "16px", minHeight: sitekey ? 140 : undefined }}>
    <div ref={container} aria-label="Security verification" />
    {!sitekey && <p role="status">Security verification is temporarily unavailable. Please try again later.</p>}
    {error && <div role="alert"><p>Security verification could not complete. Your information has been kept.</p><button type="button" onClick={() => { onToken(""); setError(false); setAttempt(value => value + 1); }} style={{ minHeight: 44 }}>Retry verification</button></div>}
  </div>;
}
