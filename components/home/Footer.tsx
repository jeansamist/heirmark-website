import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const footerLinks = {
  explore: [
    { href: "/heirmark-framework", label: "The HeirMark Framework" },
    { href: "/three-pillars", label: "The Three Pillars" },
    { href: "/book-collection", label: "The Book Collection" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About HeirMark" },
  ],
  work: [
    { href: "/partnerships", label: "Partnerships" },
    { href: "/schools", label: "Schools & Organizations" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ],
};

const socials = [
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "LinkedIn", icon: Linkedin },
  { href: "#", label: "YouTube", icon: Youtube },
  { href: "#", label: "Facebook", icon: Facebook },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-white pt-20 pb-8">
      <div className="container mx-auto px-6 mb-16">
        <Reveal className="bg-secondary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden border border-secondary/40">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              Turn Healing into Heritage, Conversations into Keepsakes, and
              Stories into Legacy.
            </h2>
            <div className="pt-4">
              <Link
                href="/pre-order"
                className="inline-flex items-center gap-2 border border-white/30 min-h-12 bg-white text-secondary text-lg px-8 h-14 rounded-full font-bold hover:bg-white/90 transition"
              >
                Grab My HeirMark Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
        <div className="space-y-6">
          <h3 className="font-serif text-2xl font-bold">HEIRMARK</h3>
          <p className="text-white/60 text-sm">
            Transforming lived experiences into Legacy.
          </p>
          <div className="flex gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold uppercase tracking-wider text-sm text-white/40">
            Explore
          </h4>
          <ul className="space-y-3 text-sm text-white/80">
            {footerLinks.explore.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-secondary transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold uppercase tracking-wider text-sm text-white/40">
            Work With Us
          </h4>
          <ul className="space-y-3 text-sm text-white/80">
            {footerLinks.work.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-secondary transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-white/10 mt-4">
            <p className="text-white/90 font-bold mb-2">
              Invite Dr Muria Nisbett to Speak
            </p>
            <p className="text-xs text-white/50 mb-2">
              Keynotes • Community Talks • Special Engagements
            </p>
            <Link
              href="/booking"
              className="text-secondary text-sm font-bold inline-flex items-center hover:underline"
            >
              Request a Booking
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold uppercase tracking-wider text-sm text-white/40">
            Stay Connected
          </h4>
          <p className="text-sm text-white/60">
            Join the HeirMark Community for updates.
          </p>
          <div className="flex gap-2">
            <input
              className="flex h-10 w-full rounded-full border px-3 py-2 text-sm bg-white/10 border-white/10 text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              placeholder="Email address"
            />
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold border border-white/30 min-h-10 px-4 py-2 bg-white text-foreground hover:bg-white/90 transition">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
        <p>© 2026 HeirMark — All Rights Reserved</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
