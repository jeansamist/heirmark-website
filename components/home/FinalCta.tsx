import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="bg-primary/5 py-24 md:py-32 motifs relative">
      <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/90 to-primary z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <Reveal className="text-center space-y-8">
          <h2 className="text-3xl text-primary-foreground md:text-4xl lg:text-6xl font-bold font-serif leading-normal">
            Turn Healing into Heritage,
            <br />
            Conversations into Keepsakes,
            <br />
            and Stories into Legacy.
          </h2>
          <div className="flex items-center justify-center">
            <Link
              href="/pre-order"
              className="inline-flex items-center gap-2 border border-primary/30 min-h-14 px-8 py-4 text-lg font-semibold rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition"
            >
              Grab My HeirMark Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
