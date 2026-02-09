import Collection from "@/components/home/Collection";
import Footer from "@/components/home/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HeirMark Book Collection",
  description:
    "Explore the three-part HeirMark collection - a legacy framework in print designed to be used together.",
  alternates: {
    canonical: "/collection",
  },
  openGraph: {
    title: "HeirMark Book Collection",
    description:
      "Explore the three-part HeirMark collection - a legacy framework in print designed to be used together.",
    url: "/collection",
    images: [
      {
        url: "/books.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HeirMark Book Collection",
    description:
      "Explore the three-part HeirMark collection - a legacy framework in print designed to be used together.",
    images: ["/books.png"],
  },
};

export default function CollectionPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="pt-28 pb-8 md:pt-36 md:pb-12">
        <div className="container mx-auto px-6">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
            The HeirMark Collection
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-serif">
            The Three-Book Legacy Framework
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            The full HeirMark system in print - designed to be used together to
            preserve stories, strengthen connection, and protect generational
            wisdom.
          </p>
        </div>
      </section>
      <Collection />
      <Footer />
    </main>
  );
}
