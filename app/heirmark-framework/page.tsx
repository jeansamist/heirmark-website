import Reveal from "@/components/Reveal";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/home/Footer";
import { ArrowRight, BookOpen, Heart, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    title: "Identity",
    subtitle: "Knowing Yourself While Honouring Your Roots",
    icon: Leaf,
    tone: "text-primary",
    bg: "bg-primary/10",
    points: [
      "Personal and family history",
      "Inherited patterns and beliefs",
      "Emotional language and self-awareness",
      "Cultural experiences that shape identity",
    ],
    book: "HEIRMARK — Where Healing Becomes Heritage",
  },
  {
    title: "Connection",
    subtitle: "Restoring the Language of Healing",
    icon: Heart,
    tone: "text-secondary",
    bg: "bg-secondary/15",
    points: [
      "Intergenerational communication",
      "Emotional safety in relationships",
      "Trust, respect, and conflict repair",
      "Listening deeply and asking meaningful questions",
    ],
    book: "HEIRMARK — The Language of Healing (Parent–Child Edition)",
  },
  {
    title: "Legacy",
    subtitle: "Turning Conversations Into Keepsakes",
    icon: BookOpen,
    tone: "text-foreground",
    bg: "bg-foreground/10",
    points: [
      "Written reflections and recorded stories",
      "Family timelines and migration narratives",
      "Recipes, traditions, prayers, and testimonies",
      "Living archives that protect cultural wisdom",
    ],
    book: "HEIRMARK — Where Conversations Become Keepsakes",
  },
];

const legacyLines = [
  "Healing becomes heritage.",
  "Conversations become keepsakes.",
  "Stories become an ancestral legacy.",
];

const whoHeirmarkServes = [
  "Multigenerational families",
  "Elders and youth",
  "Faith communities",
  "Educators and cultural leaders",
  "Veterans",
  "Diaspora families",
  "Community organizations",
];

export default function HeirmarkFrameworkPage() {
  return (
    <main className="bg-background text-foreground">
      <section
        id="top"
        className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(233,180,76,0.18),transparent_60%)]" />
          <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <Reveal className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-semibold tracking-[0.2em] uppercase text-xs">
                The HeirMark Legacy Framework
              </p>
              <h1 className="text-4xl md:text-6xl font-serif">
                Honour the Past. Heal the Present. Shape the Future.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                HeirMark is a Caribbean-rooted healing framework that helps
                individuals, families, and communities transform lived
                experience into legacy.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/pre-order"
                className="h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:bg-primary/90 transition"
              >
                Pre-Order Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#pillars"
                className="h-12 px-6 rounded-full border border-primary/30 text-primary font-semibold flex items-center hover:bg-primary/5 transition"
              >
                Explore the Three Pillars
              </Link>
            </div>
            <div className="grid gap-3 text-foreground/80">
              {legacyLines.map((line) => (
                <p key={line} className="text-lg font-medium">
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div className="absolute -inset-4 rounded-3xl border border-primary/10 bg-white/70" />
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src="/framework-hero.jpg"
                alt="Caribbean family gathering"
                width={920}
                height={1080}
                className="h-120 w-full object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white/80">
        <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
          <Reveal className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif">
              Rooted in story, memory, prayer, laughter, and land.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In Caribbean culture, wisdom lives in story, memory, prayer,
              laughter, food, music, land, sea, and family. For generations, our
              ancestors passed knowledge through oral tradition, communal
              living, yard conversations, church gatherings, and shared care.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              HeirMark honours this heritage by creating intentional space to
              heal, reflect, document memory, and preserve wisdom, so what we
              carry is not lost, but protected and passed forward.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="relative grid gap-6">
            <Image
              src="/framework-heritage.jpg"
              alt="Hands preparing a shared meal"
              width={900}
              height={700}
              className="rounded-3xl object-cover h-72 w-full"
            />
            <div className="grid md:grid-cols-3 gap-4">
              {legacyLines.map((line) => (
                <div
                  key={line}
                  className="rounded-2xl border border-border bg-background/90 p-5 text-center font-semibold text-foreground"
                >
                  {line}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="pillars" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <Reveal className="max-w-3xl space-y-4">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              The Three Pillars of the HeirMark Framework
            </p>
            <h2 className="text-3xl md:text-5xl font-serif">
              Each pillar represents a stage of the healing and legacy journey.
            </h2>
            <p className="text-lg text-muted-foreground">
              Each pillar is brought to life through one book in the HeirMark
              Collection.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal
                  key={pillar.title}
                  delay={index * 0.1}
                  className="h-full rounded-3xl border border-border bg-white/80 p-8 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`p-3 rounded-2xl ${pillar.bg} ${pillar.tone}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Participants explore:
                  </p>
                  <ul className="space-y-3 text-muted-foreground flex-1">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-2xl bg-muted/40 p-4 text-sm text-foreground">
                    <span className="font-semibold">Associated Book:</span>
                    <p className="mt-1 text-muted-foreground">{pillar.book}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-tertiary/20">
        <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <Reveal className="space-y-6">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Why HeirMark Matters
            </p>
            <h2 className="text-3xl md:text-5xl font-serif">
              The Caribbean carries deep beauty and deep history.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Colonization, displacement, migration, economic pressure, natural
              disasters, and generational trauma exist alongside joy, faith,
              creativity, resistance, and community strength. When elders pass
              without their stories recorded, or families scatter without shared
              memory, pieces of identity are lost.
            </p>
            <div className="grid gap-4 text-muted-foreground">
              <p>HeirMark responds by:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Protecting stories",
                  "Strengthening emotional well-being",
                  "Preserving cultural memory",
                  "Anchoring future generations in identity and pride",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/70 border border-border px-4 py-3"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2 text-lg font-semibold text-foreground">
              <span>Healing becomes cultural preservation.</span>
              <span>Memory becomes power.</span>
              <span>Legacy becomes protection.</span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <Image
              src="/framework-community.webp"
              alt="Community gathering in a cultural space"
              width={900}
              height={1000}
              className="rounded-3xl object-cover h-130 w-full"
            />
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <Reveal className="relative">
            <Image
              src="/framework-voices.jpg"
              alt="Elder sharing stories with younger family"
              width={900}
              height={900}
              className="rounded-3xl object-cover h-115 w-full"
            />
          </Reveal>
          <Reveal delay={0.1} className="space-y-6">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Who HeirMark Serves
            </p>
            <h2 className="text-3xl md:text-5xl font-serif">
              The framework meets people where they are.
            </h2>
            <p className="text-lg text-muted-foreground">
              HeirMark supports multigenerational families, elders and youth,
              faith communities, educators and cultural leaders, veterans,
              diaspora families, and community organizations. The framework
              meets people where they are, in homes, schools, churches,
              community centers, and cultural spaces.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {whoHeirmarkServes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="pt-2 text-lg font-semibold text-foreground">
              <p>Every story matters.</p>
              <p>Every voice carries wisdom.</p>
              <p>Every generation deserves access to its roots.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-foreground text-white">
        <div className="container mx-auto px-6 grid gap-12">
          <Reveal className="max-w-3xl space-y-4">
            <p className="text-secondary font-semibold uppercase tracking-[0.2em] text-xs">
              The HeirMark Book Collection
            </p>
            <h2 className="text-3xl md:text-5xl font-serif">
              A Complete 3-Book Legacy Framework
            </h2>
            <p className="text-lg text-white/70">
              The HeirMark framework is brought to life through three companion
              books, each aligned with one pillar of the journey. The books are
              designed to be experienced together as one complete system,
              guiding readers from identity to connection to legacy
              preservation.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <Reveal
                key={pillar.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-2xl ${pillar.bg} ${pillar.tone}`}
                  >
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Pillar</p>
                    <h3 className="text-xl font-serif font-bold">
                      {pillar.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-white/70 text-sm leading-relaxed">
                  {pillar.book}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="rounded-3xl border border-white/10 bg-white/10 p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold">
                The HeirMark books are available exclusively as a full 3-book
                collection.
              </h3>
              <p className="text-white/70 mt-2">
                Individual books are not sold separately.
              </p>
            </div>
            <Link
              href="/pre-order"
              className="h-12 px-6 rounded-full bg-secondary text-foreground font-semibold flex items-center justify-center gap-2 hover:bg-secondary/90 transition"
            >
              Pre-Order
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
