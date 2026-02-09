import Collection from "@/components/home/Collection";
import ContactSection from "@/components/contact/ContactSection";
import Events from "@/components/home/Events";
import FinalCta from "@/components/home/FinalCta";
import Footer from "@/components/home/Footer";
import Founder from "@/components/home/Founder";
import Framework from "@/components/home/Framework";
import Hero from "@/components/home/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HeirMark",
  description:
    "A Caribbean-rooted healing framework helping families preserve stories, restore connection, and protect generational wisdom.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HeirMark",
    description:
      "A Caribbean-rooted healing framework helping families preserve stories, restore connection, and protect generational wisdom.",
    url: "/",
    images: [
      {
        url: "/family-legacy.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HeirMark",
    description:
      "A Caribbean-rooted healing framework helping families preserve stories, restore connection, and protect generational wisdom.",
    images: ["/family-legacy.png"],
  },
};

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <Framework />
      <Collection />
      <Events />
      <Founder />
      <FinalCta />
      <ContactSection />
      <Footer />
    </main>
  );
}
