import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/home/Footer";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(45,95,110,0.1),rgba(244,219,169,0.35))]" />
          <div className="absolute left-0 top-0 h-24 w-full bg-[radial-gradient(circle_at_left,rgba(45,95,110,0.18),transparent_60%)]" />
        </div>
        <div className="container mx-auto px-6">
          <Reveal className="max-w-2xl space-y-4">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Contact HeirMark
            </p>
            <h1 className="text-4xl md:text-6xl font-serif">
              Let’s Begin the Conversation
            </h1>
          </Reveal>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
