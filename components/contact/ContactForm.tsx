"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  return (
    <div className="rounded-[28px] border border-border bg-white/90 p-8 md:p-10">
      <div className="space-y-3">
        <h3 className="text-2xl md:text-3xl font-serif">Send Us a Message</h3>
        <p className="text-muted-foreground">
          Every message is received with care.
        </p>
      </div>

      <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          Full Name
          <input
            required
            name="fullName"
            className="h-12 rounded-2xl border border-border bg-white px-4 text-base font-normal text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="Your full name"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-foreground">
          Email Address
          <input
            required
            type="email"
            name="email"
            className="h-12 rounded-2xl border border-border bg-white px-4 text-base font-normal text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="you@email.com"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-foreground">
          Your Message
          <textarea
            required
            name="message"
            className="min-h-35 rounded-2xl border border-border bg-white px-4 py-3 text-base font-normal text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="Tell us what's on your mind."
          />
        </label>

        {status === "error" && (
          <p className="text-sm font-medium text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
      </form>

      {status === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-8 text-center border border-border">
            <h4 className="text-2xl font-serif text-foreground">
              Thank you for reaching out.
            </h4>
            <p className="mt-3 text-muted-foreground">
              A member of the HeirMark team will respond shortly.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 h-11 rounded-full border border-border px-6 text-sm font-semibold text-foreground hover:bg-muted/40 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
