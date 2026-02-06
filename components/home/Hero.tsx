import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const audiences = [
  "Families",
  "Elders",
  "Youth",
  "Educators",
  "Faith Communities",
  "Veterans",
  "Universities",
  "Cultural Organizations",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-24 overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/family-legacy.png"
          alt="HeirMark legacy"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-primary/90 to-primary" />
      </div>
      <div className="container relative z-10 px-6 py-16 md:py-24 flex flex-col mx-auto items-center text-center text-primary-foreground">
        <Reveal className="space-y-6 max-w-4xl">
          <span className="inline-block font-semibold text-secondary-foreground bg-secondary/50 backdrop-blur-md px-3 py-1 rounded-full border border-secondary text-sm ">
            The HeirMark Framework
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-primary-foreground leading-[1.1]">
            Transforming Family Stories & Experiences Into Legacy
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            A Caribbean-rooted healing framework helping families and
            communities strengthen identity, restore connection, and preserve
            generational wisdom.
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto py-4 text-sm">
            {audiences.map((item, i) => (
              <span
                key={item}
                className="text-sm font-medium text-primary-foreground/70 flex items-center gap-2"
              >
                {i !== 0 && (
                  <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
                )}
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/heirmark-framework"
              className="inline-flex items-center justify-center gap-2 font-semibold min-h-12 rounded-full px-6 h-14 text-base bg-primary-foreground hover:bg-primary-foreground/90 text-primary transition"
            >
              Explore the Framework
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/events"
              className="inline-flex underline px-6 font-semibold"
            >
              View Upcoming Events
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
