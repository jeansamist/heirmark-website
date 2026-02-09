import BookingForm from "@/components/about/BookingForm";
import Footer from "@/components/home/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Dr. Muria Nisbett",
  description:
    "Invite Dr. Muria Nisbett for keynotes, workshops, trainings, and community healing sessions focused on intergenerational legacy.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Book Dr. Muria Nisbett",
    description:
      "Invite Dr. Muria Nisbett for keynotes, workshops, trainings, and community healing sessions focused on intergenerational legacy.",
    url: "/book",
    images: [
      {
        url: "/founder.jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Dr. Muria Nisbett",
    description:
      "Invite Dr. Muria Nisbett for keynotes, workshops, trainings, and community healing sessions focused on intergenerational legacy.",
    images: ["/founder.jpeg"],
  },
};

export default function BookPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container mx-auto px-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="space-y-4">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Book Dr. Muria Nisbett
            </p>
            <h1 className="text-4xl md:text-6xl font-serif">
              Bring HeirMark to Your Community
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dr. Muria Nisbett offers keynote talks, workshops, trainings, and
              community healing sessions centered on identity, connection, and
              legacy.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Keynotes and conference talks</li>
              <li>Faith and community gatherings</li>
              <li>Workshops and trainings</li>
              <li>Educational and cultural events</li>
            </ul>
          </div>
          <div className="rounded-[28px] border border-border bg-white/80 p-6">
            <BookingForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
