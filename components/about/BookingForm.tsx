"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          organization: formData.get("organization"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          engagementType: formData.get("engagement"),
          location: formData.get("location"),
          details: formData.get("details"),
          consent: formData.get("consent") === "on",
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
      <form className="grid gap-5" onSubmit={handleSubmit}>
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
          Organization / Institution
          <input
            required
            name="organization"
            className="h-12 rounded-2xl border border-border bg-white px-4 text-base font-normal text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="Organization name"
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
          Phone Number
          <input
            type="tel"
            name="phone"
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
                  value={option}
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
            name="location"
            className="h-12 rounded-2xl border border-border bg-white px-4 text-base font-normal text-foreground shadow-sm outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="City, Country"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-foreground">
          Tell Us Briefly About Your Event (1–2 sentences)
          <textarea
            name="details"
            className="min-h-[120px] rounded-2xl border border-border bg-white px-4 py-3 text-base font-normal text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
            placeholder="What is the intention or audience?"
          />
        </label>

        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            required
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4 accent-primary"
          />
          <span>
            I understand this is a booking request and that the HeirMark team
            will follow up to discuss availability and next steps.
          </span>
        </label>

        {status === "error" && (
          <p className="text-sm font-medium text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request Booking"}
        </button>
      </form>

      {status === "success" && (
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
