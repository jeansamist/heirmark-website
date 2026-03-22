import { BookingModalTrigger } from "@/components/booking/BookingModal";
import Footer from "@/components/home/Footer";
import Reveal from "@/components/Reveal";
import { events } from "@/data/events";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HeirMark",
  description:
    "A Caribbean-rooted healing framework transforming family stories, cultural memory, and generational wisdom into lasting legacy before it's too late.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HeirMark",
    description:
      "A Caribbean-rooted healing framework transforming family stories, cultural memory, and generational wisdom into lasting legacy before it's too late.",
    url: "/",
    images: [
      {
        url: "/framework-hero.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HeirMark",
    description:
      "A Caribbean-rooted healing framework transforming family stories, cultural memory, and generational wisdom into lasting legacy before it's too late.",
    images: ["/framework-hero.jpg"],
  },
};

const whoItsFor = [
  {
    icon: "01",
    title: "Families",
    pain: "Healing across generations",
    description:
      "Families navigating migration, grief, or disconnection who want to rebuild identity and emotional safety across generations.",
  },
  {
    icon: "02",
    title: "Elders",
    pain: "Stories worth preserving",
    description:
      "Elders whose lived wisdom, cultural knowledge, and family memory deserve to be documented and passed forward intentionally.",
  },
  {
    icon: "03",
    title: "Youth",
    pain: "Searching for roots",
    description:
      "Young people disconnected from their cultural heritage, seeking identity, belonging, and a clearer sense of where they come from.",
  },
  {
    icon: "04",
    title: "Educators",
    pain: "Building cultural curricula",
    description:
      "Educators, pastors, and community leaders who want frameworks for teaching cultural preservation and intergenerational healing.",
  },
];

const pillars = [
  {
    number: "01",
    title: "Identity",
    subtitle: "Know yourself, honor your roots",
    description:
      "Rediscover who you are through the lens of where you came from. Heal the disconnection between your present self and your ancestral story.",
  },
  {
    number: "02",
    title: "Connection",
    subtitle: "Restore the language of healing",
    description:
      "Rebuild the emotional bridges between family members. Create safe space for honest, restorative conversation across generations.",
  },
  {
    number: "03",
    title: "Legacy",
    subtitle: "Turn conversations into keepsakes",
    description:
      "Document, preserve, and pass forward the wisdom that lives in your family. Transform lived experience into lasting generational impact.",
  },
];

const books = [
  {
    badge: "Book I",
    subtitle: "Foundational guide",
    title: "Where Healing Becomes Heritage",
    description:
      "Understand the generational patterns that shaped your family. Begin the journey of healing emotional and cultural wounds.",
    image: "/book1.png",
    bg: "from-primary to-[color:var(--primary-soft)]",
  },
  {
    badge: "Book II",
    subtitle: "Parent-Child Edition",
    title: "The Language of Healing",
    description:
      "Build emotionally safe, respectful relationships. Communicate with care, reduce conflict, and strengthen family trust.",
    image: "/book2.png",
    bg: "from-secondary to-[color:var(--secondary-soft)]",
  },
  {
    badge: "Book III",
    subtitle: "Reflective keepsake guide",
    title: "Where Conversations Become Keepsakes",
    description:
      "Preserve family stories, wisdom, and cultural heritage. Save the memories, traditions, and lessons that define who you are.",
    image: "/book3.png",
    bg: "from-[color:var(--primary-deep)] to-primary",
  },
];

const galleryImages = [
  {
    src: "/gallery/ACQ00309.jpg",
    alt: "HeirMark community gathering",
  },
  {
    src: "/gallery/ACQ00298.jpg",
    alt: "HeirMark gallery image one",
  },
  {
    src: "/gallery/ACQ00296.jpg",
    alt: "HeirMark gallery image two",
  },
  {
    src: "/gallery/ACQ00304.jpg",
    alt: "HeirMark gallery image three",
  },
  {
    src: "/gallery/ACQ00297.jpg",
    alt: "HeirMark gallery image four",
  },
  {
    src: "/gallery/ACQ00303.jpg",
    alt: "HeirMark gallery image five",
  },
];

const testimonials = [
  {
    quote:
      "HeirMark gave our family a language we did not know we needed. We have always loved each other, but this framework taught us how to actually talk to each other.",
    name: "Simone R.",
    role: "Mother of three, workshop participant",
  },
];

export default function Home() {
  const featuredEvent = events[0];

  return (
    <main className="bg-background text-foreground">
      <section
        id="top"
        className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-primary"
      >
        <div className="absolute inset-0">
          <Image
            src="/framework-hero.jpg"
            alt="HeirMark family heritage"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,31,36,0.84)_0%,rgba(45,95,110,0.72)_55%,rgba(45,95,110,0.34)_100%)]" />
        </div>
        <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 text-[9px] uppercase tracking-[0.28em] text-secondary/50 md:block">
          Heritage · Memory · Legacy
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-28 pt-36 md:px-10">
          <div className="max-w-[860px]">
            <Reveal className="mb-8 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
              <span className="h-1.5 w-1.5 bg-secondary" />
              The HeirMark Framework
            </Reveal>
            <div className="max-w-[780px]">
              <h1 className="font-serif text-[3.4rem] leading-none font-light tracking-[-0.02em] text-white sm:text-[4.8rem] lg:text-[7rem]">
                No Elder&apos;s Story Should Go Unspoken.
              </h1>
            </div>
            <Reveal
              delay={0.12}
              className="mt-7 max-w-[520px] text-[1.05rem] leading-8 font-light text-white/76"
            >
              A Caribbean-rooted healing framework transforming family stories,
              cultural memory, and generational wisdom into lasting legacy
              before it&apos;s too late.
            </Reveal>
            <Reveal
              delay={0.18}
              className="mt-10 flex flex-wrap items-center gap-8"
            >
              <Link
                href="/buy"
                className="inline-flex items-center gap-3 bg-primary px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-primary-foreground hover:bg-secondary hover:text-primary"
              >
                <span>Get the Full Collection - $75</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/framework"
                className="border-b border-white/30 pb-0.5 text-[12px] tracking-[0.08em] text-white/74 hover:border-secondary hover:text-secondary"
              >
                Explore the Framework
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="absolute bottom-24 left-6 z-10 hidden flex-col items-start gap-2 md:flex">
          <div className="h-12 w-px bg-[linear-gradient(to_bottom,var(--color-secondary),transparent)]" />
          <span className="text-[9px] uppercase tracking-[0.22em] text-white/40">
            Scroll
          </span>
        </div>
        <div className="relative z-10 flex flex-wrap justify-center border-t border-secondary/20 bg-primary/85 backdrop-blur-md">
          {[
            { value: "3", label: "Companion Books" },
            { value: "1", label: "Complete System" },
            { value: "∞", label: "Generations Reached" },
          ].map((stat, index) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex min-w-[180px] flex-col items-center px-10 py-5 text-center">
                <span className="font-serif text-[2rem] leading-none font-light text-secondary">
                  {stat.value}
                </span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/48">
                  {stat.label}
                </span>
              </div>
              {index < 2 && (
                <div className="hidden h-8 w-px bg-secondary/20 md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary px-6 py-20 text-center md:px-10">
        <div className="absolute left-8 top-[-3rem] font-serif text-[16rem] leading-none text-secondary/6">
          "
        </div>
        <Reveal className="mx-auto flex max-w-[980px] items-center gap-8">
          <div className="hidden h-px flex-1 bg-[linear-gradient(to_right,transparent,var(--color-secondary))] md:block" />
          <blockquote className="mx-auto max-w-[680px] font-serif text-[1.5rem] font-light italic leading-[1.55] text-white sm:text-[2.1rem]">
            We exist so that no elder&apos;s wisdom is forgotten, no family
            story is lost, no heritage goes unspoken.
          </blockquote>
          <div className="hidden h-px flex-1 bg-[linear-gradient(to_left,transparent,var(--color-secondary))] md:block" />
        </Reveal>
      </section>

      <section className="bg-[color:var(--surface)] px-6 py-28 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-16 max-w-[560px]">
            <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
              Who This Is For
            </span>
            <h2 className="mt-3 font-serif text-[2.6rem] leading-[1.02] font-light text-primary sm:text-[3.8rem]">
              Built for those carrying
              <br />
              <em className="text-secondary">stories that matter</em>
            </h2>
          </Reveal>
          <div className="grid gap-px border border-[color:var(--surface-strong)] bg-[color:var(--surface-strong)] md:grid-cols-2 xl:grid-cols-4">
            {whoItsFor.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 0.08}
                className="bg-[color:var(--surface)] p-8"
              >
                <div className="text-sm tracking-[0.14em] text-secondary">
                  {item.icon}
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-[1.6rem] text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-secondary">
                    {item.pain}
                  </p>
                </div>
                <p className="mt-4 text-[13.5px] leading-7 text-foreground/68">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--surface-muted)] px-6 py-28 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(233,180,76,0.1),transparent_45%),radial-gradient(circle_at_10%_80%,rgba(45,95,110,0.08),transparent_50%)]" />
        <div className="relative mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
              The Framework
            </span>
            <h2 className="mt-3 font-serif text-[2.5rem] leading-[1.03] font-light text-primary sm:text-[3.6rem]">
              Three pillars.
              <br />
              One complete
              <br />
              <em className="text-secondary">system.</em>
            </h2>
            <p className="mt-6 max-w-[420px] text-[15px] leading-8 text-foreground/72">
              Rooted in Caribbean traditions of storytelling, communal care, and
              cultural memory, HeirMark brings ancestral principles into a
              modern, scalable framework for families everywhere.
            </p>
            <Link
              href="/framework"
              className="mt-10 inline-flex border border-primary px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Explore the Framework
            </Link>
          </Reveal>
          <div>
            {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.title}
                delay={0.15 + index * 0.1}
                className="grid gap-6 border-b border-[color:var(--surface-strong)] py-10 md:grid-cols-[3.5rem_1fr]"
              >
                <div className="font-serif text-[2.8rem] leading-none font-light text-secondary/40">
                  {pillar.number}
                </div>
                <div>
                  <h3 className="font-serif text-[2rem] leading-none text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.15em] text-secondary">
                    {pillar.subtitle}
                  </p>
                  <p className="mt-4 max-w-[620px] text-[14px] leading-8 text-foreground/72">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--surface)] px-6 py-28 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-16 grid gap-10 lg:grid-cols-2">
            <div>
              <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
                The Collection
              </span>
              <h2 className="mt-3 font-serif text-[2.25rem] leading-[1.05] font-light text-primary sm:text-[3rem]">
                One complete system,
                <br />
                three companion books.
              </h2>
            </div>
            <div>
              <p className="text-[15px] leading-8 text-foreground/72">
                The HeirMark Collection is a complete healing system, three
                books designed to be used together. Each one builds on the last,
                taking your family from awareness to action to legacy.
              </p>
              <div className="mt-6 border-l-2 border-secondary pl-5 font-serif text-[1.1rem] leading-7 text-primary">
                Sold exclusively as a bundle, by design.
                <em className="mt-1 block text-secondary">
                  The system only works as a whole.
                </em>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-3">
            {books.map((book, index) => (
              <Reveal
                key={book.title}
                delay={index * 0.12}
                className="flex flex-col gap-5"
              >
                <div
                  className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br ${book.bg}`}
                >
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-contain p-6"
                  />
                  <div className="absolute left-4 top-4 bg-primary/70 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white">
                    {book.badge}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-secondary">
                    {book.subtitle}
                  </p>
                  <h3 className="mt-2 font-serif text-[1.4rem] leading-[1.25] text-primary">
                    {book.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-7 text-foreground/68">
                    {book.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-8 bg-primary px-8 py-10 text-primary-foreground">
            <div className="flex flex-wrap items-end gap-4">
              <span className="font-serif text-[3.1rem] leading-none font-light text-secondary">
                $75
              </span>
              <span className="pb-2 text-[13px] text-white/60">
                Complete 3-book collection · Ships worldwide
              </span>
            </div>
            <Link
              href="/buy"
              className="inline-flex items-center gap-3 border border-secondary bg-primary px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-primary-foreground hover:bg-secondary hover:text-primary"
            >
              <span>Secure My Collection</span>
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--surface-muted)] px-6 pb-0 pt-28 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-12 grid gap-10 lg:grid-cols-2">
            <div>
              <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
                Our First Gathering
              </span>
              <h2 className="mt-3 font-serif text-[2.35rem] leading-[1.05] font-light text-primary sm:text-[3.2rem]">
                The community
                <br />
                <em className="text-secondary">in motion.</em>
              </h2>
            </div>
            <div>
              <p className="text-[15px] leading-8 text-foreground/72">
                Families, elders, educators, and community leaders came together
                for our inaugural HeirMark gathering, sharing stories, beginning
                healing, and building legacy together.
              </p>
              <Link
                href="/events"
                className="mt-5 inline-flex border-b border-transparent pb-0.5 text-[12px] font-medium tracking-[0.08em] text-primary/75 hover:border-secondary hover:text-secondary"
              >
                View Upcoming Events
              </Link>
            </div>
          </Reveal>
          <div className="relative left-1/2 mt-4 w-screen -translate-x-1/2 overflow-hidden">
            <div className="animate-gallery-slider flex w-max gap-1">
              {[...galleryImages, ...galleryImages].map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="relative aspect-[4/3] w-[78vw] flex-none overflow-hidden bg-primary/10 sm:w-[44vw] lg:w-[28vw] xl:w-[24vw]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,31,36,0.22)_0%,transparent_60%)]" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-6 py-10">
            <p className="font-serif text-[1.45rem] font-light italic text-primary">
              Join us at the next HeirMark gathering.
            </p>
            <Link
              href={featuredEvent ? `/events#${featuredEvent.id}` : "/events"}
              className="inline-flex border border-primary px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Register for an Event
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary px-6 py-28 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(233,180,76,0.12),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_45%)]" />
        <Reveal className="relative mx-auto flex max-w-[760px] flex-col items-center text-center text-white">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
            Voices from the Community
          </span>
          <div className="relative mt-8">
            <div className="absolute -left-8 -top-14 font-serif text-[13rem] leading-none text-secondary/10">
              "
            </div>
            <blockquote className="font-serif text-[1.45rem] font-light italic leading-[1.6] sm:text-[1.95rem]">
              {testimonials[0].quote}
            </blockquote>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border border-secondary/40 bg-secondary/15 font-serif text-[1.1rem] text-secondary">
              {testimonials[0].name.charAt(0)}
            </div>
            <div className="text-left">
              <p className="text-[14px] font-medium text-white">
                {testimonials[0].name}
              </p>
              <p className="text-[12px] tracking-[0.04em] text-white/48">
                {testimonials[0].role}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-secondary/20 bg-secondary/20 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-2 xl:grid-cols-4">
          {[
            { value: "500+", label: "Families Reached" },
            { value: "12+", label: "Workshops & Events" },
            { value: "3", label: "Islands Represented" },
            { value: "1st", label: "Generation Healing Now" },
          ].map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 0.1}
              className="relative flex flex-col items-center justify-center px-4 py-4 text-center xl:after:absolute xl:after:right-0 xl:after:top-[20%] xl:after:bottom-[20%] xl:after:w-px xl:after:bg-secondary/25 last:xl:after:hidden"
            >
              <div className="font-serif text-[3rem] leading-none font-light text-primary">
                {item.value}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.12em] text-primary/70">
                {item.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[color:var(--surface)] px-6 py-28 md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[460px_1fr]">
          <Reveal className="flex flex-col gap-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--surface-muted)]">
              <Image
                src="/founder.jpeg"
                alt="Dr. Muria Nisbett"
                fill
                className="object-cover object-top"
              />
              {/* <div className="absolute -bottom-3 -right-3 h-[55%] w-[55%] border-2 border-secondary" /> */}
            </div>
            <div className="flex items-stretch border border-[color:var(--surface-strong)] bg-[color:var(--surface-muted)]">
              {[
                { label: "Role", value: "Therapist & Author" },
                { label: "Based", value: "U.S. Virgin Islands" },
                { label: "Focus", value: "Legacy & Healing" },
              ].map((item, index) => (
                <div key={item.label} className="flex flex-1 items-stretch">
                  <div className="flex flex-1 flex-col gap-1 px-5 py-4">
                    <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-secondary">
                      {item.label}
                    </span>
                    <span className="text-[13px] text-primary">
                      {item.value}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className="w-px bg-[color:var(--surface-strong)]" />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="pt-8">
            <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
              Meet the Founder
            </span>
            <h2 className="mt-2 font-serif text-[2.8rem] leading-[1.02] font-light text-primary sm:text-[3.8rem]">
              Dr. Muria Nisbett
            </h2>
            <div className="mb-8 mt-6 flex items-center gap-4">
              <div className="h-px w-12 bg-secondary/55" />
              <div className="h-2 w-2 rotate-45 bg-secondary" />
              <div className="h-px w-12 bg-secondary/55" />
            </div>
            <p className="mb-5 text-[15px] leading-8 text-foreground/72">
              Dr. Muria Nisbett is a therapist, author, and founder of HeirMark,
              a legacy-centred healing framework helping individuals and
              families transform lived experience into generational impact.
            </p>
            <p className="mb-5 text-[15px] leading-8 text-foreground/72">
              Based in the U.S. Virgin Islands, her work blends mental health,
              trauma-informed care, storytelling, and cultural preservation to
              strengthen identity, relationships, and emotional resilience
              across generations.
            </p>
            <p className="text-[15px] leading-8 text-foreground/72">
              Through HeirMark&apos;s books, trainings, and community programs,
              Dr. Nisbett bridges healing, culture, and community innovation,
              positioning legacy as a powerful tool for personal transformation.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <BookingModalTrigger className="inline-flex border border-primary bg-primary px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-primary-foreground hover:bg-secondary hover:text-primary">
                Book Dr. Nisbett
              </BookingModalTrigger>
              <Link
                href="/about"
                className="border-b border-primary/20 pb-0.5 text-[12px] tracking-[0.08em] text-primary/70 hover:border-secondary hover:text-secondary"
              >
                Read Her Story
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-primary px-6 py-28 text-white md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
              Join the Community
            </span>
            <h2 className="mt-3 font-serif text-[2.4rem] leading-[1.08] font-light sm:text-[3.2rem]">
              Healing, story, and legacy belong in community.
            </h2>
            <p className="mt-5 max-w-[520px] text-[15px] leading-8 text-white/68">
              Join the HeirMark mailing list for collection updates, community
              gatherings, and new resources designed to help families preserve
              wisdom and strengthen belonging.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <form className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
                  Name
                </span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="border border-secondary/25 bg-white/8 px-5 py-4 text-[15px] text-white outline-none placeholder:text-white/24"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="border border-secondary/25 bg-white/8 px-5 py-4 text-[15px] text-white outline-none placeholder:text-white/24"
                />
              </label>
              <button
                type="button"
                className="mt-2 inline-flex w-full items-center justify-center border border-primary-foreground/20 bg-secondary px-6 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-primary hover:bg-white hover:text-primary"
              >
                Join the Community
              </button>
              <p className="text-[10px] tracking-[0.03em] text-white/30">
                We will only use your information for HeirMark updates and
                community news.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--surface-muted)] px-6 py-28 md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
              Contact
            </span>
            <h2 className="mt-3 font-serif text-[2.4rem] leading-[1.06] font-light text-primary sm:text-[3.2rem]">
              Start the conversation.
            </h2>
            <p className="mt-5 max-w-[430px] text-[15px] leading-8 text-foreground/72">
              Reach out with questions about the framework, the collection,
              speaking engagements, or upcoming events.
            </p>
            <div className="mt-8 flex flex-col gap-5">
              <div>
                <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-secondary">
                  Email
                </span>
                <a
                  href="mailto:hello@heirmark.com"
                  className="mt-1 inline-block text-[14px] text-primary hover:text-secondary"
                >
                  hello@heirmark.com
                </a>
              </div>
              <div>
                <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-secondary">
                  Based
                </span>
                <span className="mt-1 inline-block text-[14px] text-primary">
                  U.S. Virgin Islands
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal
            delay={0.12}
            className="border border-[color:var(--surface-strong)] bg-[color:var(--surface)] p-8"
          >
            <form className="flex flex-col gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full name"
                  className="border border-[color:var(--surface-strong)] bg-[color:var(--surface-muted)] px-4 py-3 text-[14px] text-primary outline-none placeholder:text-foreground/40"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="border border-[color:var(--surface-strong)] bg-[color:var(--surface-muted)] px-4 py-3 text-[14px] text-primary outline-none placeholder:text-foreground/40"
                />
              </div>
              <textarea
                placeholder="How can we support you?"
                rows={7}
                className="border border-[color:var(--surface-strong)] bg-[color:var(--surface-muted)] px-4 py-3 text-[14px] text-primary outline-none placeholder:text-foreground/40"
              />
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center border border-primary bg-primary px-6 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-primary-foreground hover:bg-secondary hover:text-primary"
              >
                Continue to Contact Page
              </Link>
            </form>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
