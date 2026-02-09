import Reveal from "@/components/Reveal";
import { ArrowRight, BookOpen, Heart, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    title: "Identity",
    description: "Knowing yourself while honoring your roots",
    icon: Leaf,
    tone: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Connection",
    description: "Restoring the language of healing",
    icon: Heart,
    tone: "text-secondary",
    bg: "bg-secondary/15",
  },
  {
    title: "Legacy",
    description: "Turning conversations into keepsakes",
    icon: BookOpen,
    tone: "text-foreground",
    bg: "bg-foreground/10",
  },
];

export default function Framework() {
  return (
    <section id="framework" className="py-24 md:py-32 relative bg-background">
      <Image
        src="/leefs.png"
        alt="HeirMark heritage pattern"
        width={1920}
        height={1080 / 2}
        className="pointer-events-none absolute right-0 z-0 w-full bottom-0 hidden object-contain md:block"
      />
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif text-foreground">
                What Is <span className="text-primary">HeirMark</span>?
              </h2>
              <p className="text-xl text-primary font-medium">
                A Healing Framework for Identity, Connection, and Legacy
              </p>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                HeirMark is a culturally grounded healing ecosystem designed to
                strengthen belonging, restore emotional connection, and preserve
                generational wisdom.
              </p>
              <p>
                Rooted in Caribbean traditions of storytelling, communal care,
                faith, and cultural memory, HeirMark brings ancestral principles
                into a modern, scalable framework for families and communities
                everywhere.
              </p>
              <p>
                As elders transition, families migrate, and younger generations
                grow disconnected from their roots, invaluable stories and
                wisdom risk being lost. HeirMark creates intentional space to
                reflect, heal, document memory, and ensure that what we carry is
                not forgotten — but protected and passed forward.
              </p>
            </div>
            <Link
              href="/framework"
              className="inline-flex items-center gap-2 text-primary text-lg font-medium hover:underline underline-offset-4"
            >
              Learn More About The Framework
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal
                  key={pillar.title}
                  delay={index * 0.1}
                  className="p-6 rounded-2xl border border-border bg-white/80 flex items-start gap-4"
                >
                  <div className={`p-3 rounded-xl ${pillar.bg} ${pillar.tone}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
