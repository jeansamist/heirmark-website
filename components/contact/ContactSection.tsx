import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/Reveal";

type ContactSectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
};

const defaultDescription =
  "Have a question about HeirMark or want to learn more about the framework?";

export default function ContactSection({
  id = "contact",
  title = "Contact HeirMark",
  subtitle = "Let’s Begin the Conversation",
  description = defaultDescription,
}: ContactSectionProps) {
  return (
    <section id={id} className="py-20 md:py-28 bg-white/80">
      <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <Reveal className="space-y-6">
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
            {title}
          </p>
          <h2 className="text-3xl md:text-5xl font-serif">{subtitle}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
