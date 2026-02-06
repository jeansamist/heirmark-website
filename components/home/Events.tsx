import Reveal from "@/components/Reveal";
import { ArrowRight, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const events = [
  {
    label: "Workshop",
    title: "Healing Through Story",
    description:
      "A transformative workshop where participants explore personal and ancestral narratives to foster healing and connection.",
    location: "New York, NY",
    date: "October 15, 2026",
    time: "10:00 AM - 4:00 PM",
    bookingProcess:
      "Register online to secure your spot. Limited seats available.",
    bookingPrice: 100,
    photo: "/workshop.png",
    icon: Users,
  },
];

export default function Events() {
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
            const Icon = event.icon;
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
                  <button className="font-semibold text-primary-foreground underline mt-4 cursor-pointer">
                    View more details
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
