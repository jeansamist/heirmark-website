"use client";

import { useState } from "react";

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-[28px] border border-border bg-white/90 p-8 md:p-10">
      <div className="space-y-3">
        <h3 className="text-2xl md:text-3xl font-serif">Send Us a Message</h3>
        <p className="text-muted-foreground">
          Every message is received with care.
        </p>
      </div>

      <form
        className="mt-8 grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
      >
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          Full Name
          <input
            required
            className="h-12 rounded-2xl border border-border bg-white px-4 text-base font-normal text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="Your full name"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-foreground">
          Email Address
          <input
            required
            type="email"
            className="h-12 rounded-2xl border border-border bg-white px-4 text-base font-normal text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="you@email.com"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-foreground">
          Your Message
          <textarea
            required
            className="min-h-[140px] rounded-2xl border border-border bg-white px-4 py-3 text-base font-normal text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="Tell us what's on your mind."
          />
        </label>

        <button
          type="submit"
          className="h-12 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition"
        >
          Send Message
        </button>
      </form>

      {isOpen && (
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
              onClick={() => setIsOpen(false)}
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
