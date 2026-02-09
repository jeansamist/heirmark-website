import { BookingModalTrigger } from "@/components/booking/BookingModal";
import Footer from "@/components/home/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Muria Nisbett",
  description:
    "Meet Dr. Muria Nisbett - therapist, author, and founder of HeirMark - sharing a Caribbean-rooted vision for legacy-centered healing.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Dr. Muria Nisbett",
    description:
      "Meet Dr. Muria Nisbett - therapist, author, and founder of HeirMark - sharing a Caribbean-rooted vision for legacy-centered healing.",
    url: "/about",
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
    title: "About Dr. Muria Nisbett",
    description:
      "Meet Dr. Muria Nisbett - therapist, author, and founder of HeirMark - sharing a Caribbean-rooted vision for legacy-centered healing.",
    images: ["/founder.jpeg"],
  },
};

const philosophyLines = [
  "Healing should not end with one person.",
  "It should ripple forward.",
];

const backgroundAreas = [
  "Mental health",
  "Trauma-informed care",
  "Community wellness",
];

const supportsGroups = ["Veterans", "Youth", "Families", "Emerging leaders"];

const beyondFocus = [
  "Veteran advocacy",
  "Creative youth development",
  "Intergenerational healing",
  "Community innovation and leadership",
];

const groundedIn = ["Cultural integrity", "Accessibility", "Collective uplift"];

const engagements = [
  {
    title: "Keynote Talks",
    items: [
      "Healing as Heritage",
      "Identity, Memory & Generational Legacy",
      "Cultural Wisdom in Modern Healing Spaces",
    ],
  },
  {
    title: "Workshops & Trainings",
    items: [
      "Intergenerational Communication",
      "Trauma-Informed Community Care",
      "Storytelling as a Healing Practice",
    ],
  },
  {
    title: "Community & Faith Gatherings",
    items: [
      "Healing Circles",
      "Storytelling & Reflection Sessions",
      "Legacy Preservation Activations",
    ],
  },
  {
    title: "Educational & Organizational Events",
    items: [
      "Universities & Schools",
      "Cultural Institutions",
      "Nonprofits & Community Organizations",
    ],
  },
];

const whoBooks = [
  "Universities & Educational Institutions",
  "Faith Communities",
  "Cultural Organizations",
  "Community Groups",
  "Nonprofits",
  "Leadership & Wellness Programs",
];

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <section
        id="top"
        className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(45,95,110,0.08),rgba(244,219,169,0.25))]" />
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.0),rgba(255,255,255,0.6))]" />
        </div>
        <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <Reveal className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              About Dr Muria Nisbett
            </div>
            <h1 className="text-4xl md:text-6xl font-serif">
              Therapist. Author. Community Visionary.
            </h1>
            <div className="grid gap-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
              <p>
                Dr Muria Nisbett is a therapist, author, and visionary community
                leader based in St. Thomas, U.S. Virgin Islands. She is the
                founder of HeirMark, a legacy-centred healing framework that
                helps individuals, families, and communities transform healing
                into heritage, conversations into keepsakes, and lived wisdom
                into generational impact.
              </p>
              <p>
                Her work sits at the intersection of mental health, cultural
                preservation, storytelling, and community healing, grounded in
                Caribbean wisdom and designed for global application.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <BookingModalTrigger className="h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:bg-primary/90 transition">
                Book Dr Muria Nisbett
                <ArrowRight className="h-4 w-4" />
              </BookingModalTrigger>
              <Link
                href="/framework"
                className="h-12 px-6 rounded-full border border-primary/30 text-primary font-semibold flex items-center hover:bg-primary/5 transition"
              >
                Explore the HeirMark Framework
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="grid gap-6">
            <div className="rounded-[28px] border border-primary/15 bg-white/80 p-3">
              <Image
                src="/founder.jpeg"
                alt="Dr. Muria Nisbett"
                width={920}
                height={1080}
                className=" aspect-150/200 w-full rounded-[22px] object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              {[
                "Legacy-centred healing",
                "Caribbean wisdom",
                "Cultural preservation",
                "Community storytelling",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-white/80 px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white/80">
        <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <Reveal className="space-y-6">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Her Philosophy
            </p>
            <h2 className="text-3xl md:text-5xl font-serif">
              Healing becomes most powerful when it is shared.
            </h2>
            <div className="grid gap-2 text-lg font-semibold text-foreground">
              {philosophyLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dr Nisbett believes that healing becomes most powerful when it is
              shared, documented, and passed across generations. Her approach
              honours lived experience, cultural memory, and emotional truth,
              helping people not only heal but leave something meaningful
              behind. Through HeirMark, she invites communities to slow down,
              reflect, speak truth, and preserve what matters most.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="grid gap-6">
            <div className="rounded-[28px] border border-border bg-background/90 p-6">
              <h3 className="text-2xl font-serif font-bold">
                Professional Background
              </h3>
              <div className="mt-4 grid gap-3 text-foreground">
                {backgroundAreas.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl  bg-white/70 px-4 py-3"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-lg font-semibold text-foreground">
                Dr Nisbett has spent her career supporting:
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {supportsGroups.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/70 px-4 py-3 text-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-tertiary/20">
        <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <Reveal className="space-y-6">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Beyond HeirMark
            </p>
            <h2 className="text-3xl md:text-5xl font-serif">
              Leadership that bridges healing, culture, and community.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In addition to leading HeirMark, Dr Nisbett actively supports and
              develops initiatives focused on veteran advocacy, creative youth
              development, intergenerational healing, and community innovation
              and leadership. Her leadership bridges mental health, cultural
              preservation, entrepreneurship, and public service, positioning
              legacy as a tool for both personal transformation and collective
              growth.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-muted-foreground">
              {beyondFocus.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-secondary/70 px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-border bg-white/80 p-6">
              <h3 className="text-xl font-serif font-bold text-foreground">
                Her work is grounded in:
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {groundedIn.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-secondary/80 px-4 py-3 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Ensuring healing resources meet communities where they are.
              </p>
            </div>
          </Reveal>
          {/* <Reveal delay={0.1} className="relative"></Reveal> */}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <Reveal className="space-y-6">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Book Dr Muria Nisbett
            </p>
            <h2 className="text-3xl md:text-5xl font-serif">
              Speaking • Facilitation • Community Engagement
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dr Nisbett is available for keynotes, workshops, trainings, and
              facilitated experiences for organizations seeking meaningful,
              culturally grounded healing and connection.
            </p>
            <div className="grid gap-4">
              {engagements.map((group) => (
                <div
                  key={group.title}
                  className="rounded-[28px] border border-border bg-white/80 p-6"
                >
                  <h3 className="text-xl font-serif font-bold text-foreground">
                    {group.title}
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-border bg-secondary text-foreground px-4 py-3"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6">
            <div className="rounded-[28px] border border-border bg-white/90 p-8">
              <h3 className="text-2xl font-serif font-bold">
                Who Books Dr Nisbett
              </h3>
              <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                {whoBooks.map((item) => (
                  <div key={item} className="">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-primary/20 bg-primary/10 p-8">
              <p className="text-lg font-semibold text-foreground">
                Invite Dr Muria Nisbett to guide your audience through healing,
                connection, and legacy-building rooted in cultural wisdom and
                lived experience.
              </p>
              <BookingModalTrigger className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition">
                Book Dr Muria Nisbett
                <ArrowRight className="ml-2 h-4 w-4" />
              </BookingModalTrigger>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
