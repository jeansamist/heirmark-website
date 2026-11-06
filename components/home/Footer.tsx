import { Instagram, Linkedin, Youtube, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { copy, legalLinks, verifiedSocialLinks } from "@/data/homepage";
export default function Footer({ showInvitation = true }: { showInvitation?: boolean }) {
  return (
    <footer className="hm-footer">
      <div className="hm-container">
        {showInvitation && <div className="hm-footer-invitation">
          <div>
            <p className="hm-eyebrow">BRING HEIRMARK TO YOUR COMMUNITY</p>
            <h2>Meaningful Conversations. Lasting Impact.</h2>

          </div>
          <div>
            <Link className="hm-button" href="/speaking">
              Book Dr. Muria Nisbett <span aria-hidden="true">↗</span>
            </Link>
            <p className="hm-engagements">
              Keynotes · Community Talks · Special Engagements
            </p>
          </div>
          <div className="hm-footer-portrait"><Image className="hm-footer-headshot" src="/dr-muria-nisbett-teal-blazer-footer.webp" alt="Dr. Muria I. Nisbett" width={550} height={959} style={{ objectPosition: "center 22%" }} sizes="(max-width: 767px) 92px, 132px" /></div>
        </div>}
        <div className="hm-footer-grid">
          <div>
            <Image
              src="/heirmark-official-logo.png"
              alt="HeirMark"
              width={568}
              height={103}
              className="hm-logo"
              sizes="240px"
            />
            <p>{copy("Transforming lived experiences")}</p>
            <p>{copy("Rooted in identity, connection,")}</p>
            <div className="hm-social-links">
              {verifiedSocialLinks.map((s) => {
                const Icon = { Instagram, LinkedIn: Linkedin, YouTube: Youtube, Facebook }[s.label];
                return <a key={s.href} href={s.href} aria-label={`HeirMark on ${s.label}`}>{Icon && <Icon size={20} aria-hidden="true" />}</a>;
              })}
            </div>
          </div>
          <nav aria-label="Footer explore">
            <h3>Explore</h3>
            <Link href="/framework">The HeirMark Framework</Link>
            <Link href="/events">Events</Link>
            <Link href="/books">Our Books</Link>
            <Link href="/journal">Journal</Link>
          </nav>
          <nav aria-label="Footer connect">
            <h3>Connect</h3>
            <Link href="/partnerships">Partnerships</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
          <div>
            <h3>Stay Connected</h3>
            <p>{copy("Get updates on HeirMark")}</p>
          </div>
        </div>
        <div className="hm-legal">
          <span>© 2026 HeirMark</span>
          <div>
            {legalLinks.privacy ? (
              <Link href={legalLinks.privacy}>Privacy Policy</Link>
            ) : (
              <span>Privacy Policy</span>
            )}
            {legalLinks.terms ? (
              <Link href={legalLinks.terms}>Terms of Use</Link>
            ) : (
              <span>Terms of Use</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

