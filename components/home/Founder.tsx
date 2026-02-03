import Reveal from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";

export default function Founder() {
  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5 relative">
            <div className="aspect-3/4 rounded-2xl overflow-hidden relative border border-border">
              <Image
                alt="Dr. Muria Nisbett"
                src="/founder.jpeg"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 -z-10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary/10 -z-10 rounded-full blur-3xl" />
          </Reveal>
          <Reveal className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                Meet Our Founder
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground mt-2 mb-4">
                Dr. Muria Nisbett
              </h2>
              <div className="h-1 w-20 bg-secondary rounded-full" />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dr Muria Nisbett is a therapist, author, and founder of HeirMark,
              a legacy-centred healing framework designed to help individuals
              and families transform lived experience into generational impact.
              Based in the U.S. Virgin Islands, her work blends mental health,
              trauma-informed care, storytelling, and cultural preservation to
              strengthen identity, relationships, and emotional resilience
              across generations.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Through HeirMark’s books, trainings, and community programs, Dr
              Nisbett empowers people to preserve their stories, wisdom, and
              values in meaningful, lasting ways. Her leadership bridges
              healing, culture, and community innovation, positioning legacy as
              a powerful tool for personal transformation and collective growth.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/book-dr-nisbett"
                className="inline-flex items-center justify-center border border-primary/30 min-h-10 px-5 py-2 bg-primary text-white hover:bg-primary/90 rounded-full transition"
              >
                Book Dr Nisbett
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-primary/30 min-h-10 px-5 py-2 text-primary hover:bg-primary/5 rounded-full transition"
              >
                Learn More About Dr Nisbett
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
