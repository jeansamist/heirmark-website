import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/home/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact HeirMark",
  description:
    "Reach out to HeirMark with questions about the framework, events, or the book collection.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact HeirMark",
    description:
      "Reach out to HeirMark with questions about the framework, events, or the book collection.",
    url: "/contact",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact HeirMark",
    description:
      "Reach out to HeirMark with questions about the framework, events, or the book collection.",
    images: ["/hero-image.png"],
  },
};

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container mx-auto px-6">
          <h1 className="mt-4 text-4xl md:text-6xl font-serif">
            Reach Out to Our Team
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Share your questions about HeirMark, the collection, or upcoming
            events, and we will follow up shortly.
          </p>
        </div>
      </section>
      <ContactSection id="contact-form" />
      <Footer />
    </main>
  );
}
