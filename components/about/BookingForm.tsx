"use client";

import { useState } from "react";

export default function BookingForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-2xl md:text-3xl font-serif">
          Book Dr Muria Nisbett
        </h3>
        <p className="text-muted-foreground">
          Invite Dr Muria Nisbett to speak, facilitate, or lead a healing
          experience for your community or organization.
        </p>
      </div>
      <form
        className="grid gap-5"
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
          Organization / Institution
          <input
            required
            className="h-12 rounded-2xl border border-border bg-white px-4 text-base font-normal text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="Organization name"
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
          Phone Number
          <input
            type="tel"
            className="h-12 rounded-2xl border border-border bg-white px-4 text-base font-normal text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="Optional"
          />
        </label>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-semibold text-foreground">
            Type of Engagement (Select one)
          </legend>
          <div className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
            {[
              "Keynote",
              "Workshop / Training",
              "Community Healing Session",
              "Faith-Based Gathering",
              "Educational Event",
              "Other",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 rounded-2xl border border-border bg-white/70 px-4 py-3"
              >
                <input
                  required
                  type="radio"
                  name="engagement"
                  className="h-4 w-4 accent-primary"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="grid gap-2 text-sm font-semibold text-foreground">
          Event Location (City & Country)
          <input
            className="h-12 rounded-2xl border border-border bg-white px-4 text-base font-normal text-foreground shadow-sm outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="City, Country"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-foreground">
          Tell Us Briefly About Your Event (1–2 sentences)
          <textarea
            className="min-h-[120px] rounded-2xl border border-border bg-white px-4 py-3 text-base font-normal text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="What is the intention or audience?"
          />
        </label>

        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            required
            type="checkbox"
            className="mt-1 h-4 w-4 accent-primary"
          />
          <span>
            I understand this is a booking request and that the HeirMark team
            will follow up to discuss availability and next steps.
          </span>
        </label>

        <button
          type="submit"
          className="h-12 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition"
        >
          Request Booking
        </button>
      </form>

      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-8 text-center border border-border">
            <h4 className="text-2xl font-serif text-foreground">
              Your request has been received.
            </h4>
            <p className="mt-3 text-muted-foreground">
              The HeirMark team will follow up shortly to discuss next steps.
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
