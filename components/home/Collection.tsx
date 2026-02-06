import Reveal from "@/components/Reveal";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

const bookDetails = [
  {
    label: "Book 1",
    title: "Where Healing Becomes Heritage",
    description:
      "A foundational guide to understanding how identity, memory, culture, and relationships shape who we become.",
    points: [
      "Understand generational patterns",
      "Heal emotional and cultural wounds",
      "Build a meaningful legacy",
    ],
    image: "/book1.png",
  },
  {
    label: "Book 2 (Parent–Child Edition)",
    title: "The Language of Healing",
    description:
      "A heart-centred guide to helping families build emotionally safe, respectful, and connected relationships.",
    points: [
      "Communicate with care and intention",
      "Reduce conflict and strengthen trust",
      "Support children’s emotional resilience",
    ],
    image: "/book2.png",
  },
  {
    label: "Book 3",
    title: "Where Conversations Become Keepsakes",
    description:
      "A reflective keepsake guide to preserving family stories, wisdom, values, and cultural heritage.",
    points: [
      "Record meaningful family stories",
      "Honour elders and preserve heritage",
      "Save memories, traditions, and lessons",
    ],
    image: "/book3.png",
  },
];

export default function Collection() {
  return (
    <section id="collection" className="py-24 bg-primary/5 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-6">
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">
            The HeirMark Book Collection
          </h2>
          <p className="text-xl text-muted-foreground">
            A Three-Part Legacy Framework in Print
          </p>
          <p className="text-foreground/80 leading-relaxed">
            The HeirMark Collection brings the full healing framework to life
            through three companion books, designed to be used together as one
            complete system.
          </p>
        </Reveal>

        <div className="space-y-12 mb-16">
          {/* <Reveal className="relative">
            <div className="absolute inset-0 bottom-1/4 bg-background rounded-4xl translate-y-1/4" />
            <Image
              alt="HeirMark Book Collection"
              src="/books.png"
              width={900}
              height={700}
              className="relative w-fullobject-contain rounded-4xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white/80 backdrop-blur-md p-4 rounded-xl max-w-xs hidden md:block border border-border">
              <p className="text-sm font-medium text-foreground">
                “To preserve the integrity of the framework, individual books
                are not sold separately.”
              </p>
            </div>
          </Reveal> */}
          <div className="space-y-6">
            {bookDetails.map((book, index) => (
              <Reveal
                key={book.title}
                delay={index * 0.1}
                className="bg-white p-6 rounded-xl border border-border/60 flex flex-col md:flex-row items-center max-w-4xl mx-auto w-full gap-6"
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  width={200}
                  height={200}
                  className="w-full max-w-50 object-contain rounded-lg"
                />
                <div className="md:flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                      {book.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">
                    {book.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {book.description}
                  </p>
                  <ul className="space-y-2">
                    {book.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <Star className="h-3 w-3 text-secondary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="text-center space-y-12">
          <Reveal className="relative max-w-lg mx-auto">
            <div className="absolute inset-0 bottom-1/4 bg-background rounded-4xl translate-y-1/4" />
            <Image
              alt="HeirMark Book Collection"
              src="/books.png"
              width={900}
              height={700}
              className="relative w-full object-contain rounded-4xl"
            />
            <div className="absolute -bottom-6 right-1/2 translate-x-1/2 bg-secondary/80 backdrop-blur-md p-4 rounded-xl max-w-xs hidden md:block border border-border">
              <p className="text-sm font-bold text-secondary-foreground">
                “To preserve the integrity of the framework, individual books
                are not sold separately.”
              </p>
            </div>
          </Reveal>
          <div>
            <button className="inline-flex items-center justify-center gap-2 font-semibold border border-secondary/40 min-h-12 rounded-full px-10 h-14 text-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground transition">
              Pre-order the complete HeirMark Collection
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-4 font-semibold text-secondary">
              Available exclusively as a full 3-book bundle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
