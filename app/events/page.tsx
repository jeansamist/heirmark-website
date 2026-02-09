import Events from "@/components/home/Events";
import Footer from "@/components/home/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HeirMark Events",
  description:
    "Join HeirMark workshops, storytelling circles, and healing sessions designed to deepen identity, connection, and legacy.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "HeirMark Events",
    description:
      "Join HeirMark workshops, storytelling circles, and healing sessions designed to deepen identity, connection, and legacy.",
    url: "/events",
    images: [
      {
        url: "/workshop.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HeirMark Events",
    description:
      "Join HeirMark workshops, storytelling circles, and healing sessions designed to deepen identity, connection, and legacy.",
    images: ["/workshop.png"],
  },
};

export default function EventsPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="pt-28 pb-8 md:pt-36 md:pb-12">
        <div className="container mx-auto px-6">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
            HeirMark Events
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-serif">
            Gather, Reflect, and Heal Together
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Workshops, storytelling circles, and community healing sessions led
            by the HeirMark team.
          </p>
        </div>
      </section>
      <Events />
      <Footer />
    </main>
  );
}
