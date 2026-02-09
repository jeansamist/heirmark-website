"use client";

import Reveal from "@/components/Reveal";
import { events } from "@/data/events";
import { ArrowRight, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const iconMap = {
  workshop: Users,
};

export default function Events() {
  const [activeEventTitle, setActiveEventTitle] = useState<string | null>(null);
  const activeEvent = useMemo(
    () => events.find((event) => event.title === activeEventTitle) ?? null,
    [activeEventTitle]
  );

  useEffect(() => {
    if (!activeEvent) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveEventTitle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeEvent]);

  return (
    <section
      id="events"
      className="py-24 bg-primary text-primary-foreground relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <Reveal className="space-y-4 max-w-xl">
            <h2 className="text-4xl font-serif text-white">
              HeirMark Upcoming Events
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join a Gathering. Begin the Journey.
            </p>
            <p className="text-primary-foreground/60">
              Workshops, storytelling circles, healing sessions, and community
              activations.
            </p>
          </Reveal>
          <Link
            href="/events"
            className="inline-flex items-center rounded-full justify-center gap-2 text-sm font-semibold border border-white/30 min-h-10 px-4 py-2 text-white hover:bg-white/10 transition"
          >
            View All Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => {
            const Icon = iconMap[event.label.toLowerCase()] ?? Users;
            return (
              <Reveal
                key={event.title}
                delay={index * 0.1}
                className="bg-white/10 backdrop-blur-md border relative border-white/15 rounded-2xl transition-colors"
              >
                <Image
                  src={event.photo}
                  alt={event.title}
                  fill
                  className="object-cover absolute inset-0 z-0 rounded-2xl "
                />
                <div className="relative z-10 flex flex-col items-start bg-linear-to-l via-primary/80 from-primary/10 to-primary p-8  rounded-2xl h-full">
                  <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 block">
                    {event.location}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-white/60 text-sm">{event.date}</p>
                  <button
                    type="button"
                    onClick={() => setActiveEventTitle(event.title)}
                    className="font-semibold text-primary-foreground underline mt-4 cursor-pointer"
                  >
                    View more details
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
      {activeEvent ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-details-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close event details"
            onClick={() => setActiveEventTitle(null)}
          />
          <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-primary text-primary-foreground shadow-2xl">
            <div className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  {activeEvent.label}
                </span>
                <h3
                  id="event-details-title"
                  className="mt-2 text-2xl font-serif text-white"
                >
                  {activeEvent.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveEventTitle(null)}
                className="rounded-full border border-white/20 p-2 text-white/70 transition hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-8 px-6 py-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10">
                  <div className="relative aspect-[16/4] w-full">
                    <Image
                      src={activeEvent.photo}
                      alt={activeEvent.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <p className="text-base text-white/75">
                  {activeEvent.description}
                </p>
                <div className="grid gap-4 text-sm text-white/70 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Location
                    </p>
                    <p className="mt-1 text-base text-white">
                      {activeEvent.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Date
                    </p>
                    <p className="mt-1 text-base text-white">
                      {activeEvent.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Time
                    </p>
                    <p className="mt-1 text-base text-white">
                      {activeEvent.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Price
                    </p>
                    <p className="mt-1 text-base text-white">
                      ${activeEvent.bookingPrice}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Booking Process
                  </p>
                  <p className="text-sm text-white/70">
                    {activeEvent.bookingProcess}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
                >
                  Book your ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
