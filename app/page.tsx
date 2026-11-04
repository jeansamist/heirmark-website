import PageSeo from "@/components/seo/PageSeo";
import { withSocialMetadata } from "@/lib/seo-metadata";
import { publishedStories } from "@/data/journal";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeirMarkIcon, type IconName } from "@/components/home/HeirMarkIcon";
import { MotionEnhancement, FAQ, ReadMore } from "@/components/home/Interactions";
import {
  copy,
  collectionCovers,
  partnerLogos,
  publication,
} from "@/data/homepage";

export const metadata: Metadata = withSocialMetadata({
  title: "HeirMark",
  description: copy("The stories we inherit,"),
  alternates: { canonical: "/" },
}, "/");
const pillars = [
  ["Identity", "Know your roots."],
  ["Connection", "Strengthen relationships."],
  ["Legacy", "Preserve what matters."],
];
const paths = [
  [
    "Speaking & Educational Experiences",
    "Engaging talks and educational experiences",
    "/speaking",
    "speaking",
  ],
  ["Books & Publications", "Thoughtfully created resources", "/books", "books"],
  [
    "Institutional Partnerships",
    "Collaborations with organizations",
    "/partnerships",
    "partnerships",
  ],
];
const bookTitles = [
  "Where Healing Becomes Heritage",
  "The Language of Healing",
  "Where Conversations Become Keepsakes",
];
const gallery = [
  {
    src: "heirmark-table-conversation",
    alt: "Two women talking at a table during a HeirMark gathering.",
  },
  {
    src: "heirmark-framed-portrait-and-collection",
    alt: "A framed portrait displayed beside HeirMark collection boxes.",
  },
  {
    src: "heirmark-guests-greeting",
    alt: "Two women greeting one another at a HeirMark gathering.",
  },
  {
    src: "heirmark-guests-at-table",
    alt: "Two guests smiling at a table during a HeirMark gathering.",
  },
];
function ApprovedText({ prefix }: { prefix: string }) {
  return (
    <>
      {copy(prefix)
        .split(/\*([^*]+)\*/g)
        .map((s, i) => (i % 2 ? <em key={i}>{s}</em> : s))}
    </>
  );
}
function Action({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`hm-button ${secondary ? "hm-button-secondary" : ""}`}
      href={href}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ hero?: string }>;
}) {
  const fullBleed = (await searchParams).hero !== "split";
  const stories = publishedStories().slice(0, 3);

  return (
    <>
      <MotionEnhancement />
      <main tabIndex={-1} id="main-content" className="hm-home"><PageSeo path="/" name="HeirMark"/>
        <section
          className={`hm-hero ${fullBleed ? "hm-hero-full" : ""}`}
          aria-labelledby="hero-title"
        >
          <div className="hm-hero-image">
            <Image
              src="/gallery/heirmark-table-conversation.jpg"
              alt="Two women talking at a table during a HeirMark gathering."
              fill
              priority
              sizes={fullBleed ? "100vw" : "(max-width: 767px) 100vw, 52vw"}
            />
          </div>
          <div className="hm-hero-copy">
            <p className="hm-eyebrow">THE HEIRMARK FRAMEWORK</p>
            <h1 id="hero-title">Healing Generations. Strengthening Communities. Preserving Legacies.</h1>
            <p>HeirMark is a Caribbean-rooted healing framework transforming family stories, cultural memory, and generational wisdom into lasting legacy before it&apos;s too late.</p>
            <div className="hm-actions">
              <Action href="/partnerships">Partner With Us</Action>
              <Action href="/framework" secondary>
                Explore the HeirMark Framework
              </Action>
            </div>
          </div>
        </section>
        <section
          className="hm-partners hm-container"
          aria-labelledby="partners-title"
        >
          <h2 id="partners-title">Our Partners</h2>
          <div data-reveal>
            {partnerLogos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
              />
            ))}
          </div>
        </section>
        <section
          id="about-heirmark"
          className="hm-section hm-container hm-about"
          aria-labelledby="about-title"
        >
          <div data-reveal>
            <p className="hm-eyebrow">ABOUT HEIRMARK</p>
            <h2 id="about-title">{copy("Healing Rooted in")}</h2>
            <div className="hm-prose">
              {[
                "HeirMark is a legacy-centred",
                "Through a culturally grounded",
                "At the heart of this work",
              ].map((t) => (
                <p key={t}>{copy(t)}</p>
              ))}
            </div>
          </div>
          <div className="hm-photo hm-about-photo" data-reveal>
            <Image
              src="/gallery/heirmark-guests-greeting.jpg"
              alt="Two women greeting one another at a HeirMark gathering."
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
            />
          </div>
        </section>
        <section
          id="framework"
          className="hm-framework hm-section"
          aria-labelledby="framework-title"
        >
          <div className="hm-container">
            <h2 id="framework-title" data-reveal>
              {copy("The Three Pillars of")}
            </h2>
            <div className="hm-pillars" data-reveal>
              {pillars.map(([title, description], i) => (
                <article
                  data-reveal
                  key={title}
                  style={
                    { "--delay": `${180 + i * 220}ms` } as React.CSSProperties
                  }
                >
                  <div className="hm-pillar-mark">
                    <HeirMarkIcon name={title.toLowerCase() as IconName} />
                    <span aria-hidden="true">0{i + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{copy(description)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="hm-action hm-container" aria-labelledby="action-title" id="heirmark-in-action">
          <div className="hm-action-intro" data-reveal>
            <h2 id="action-title">{copy("Bringing Healing,")}</h2>
            <h3>Events &amp; Community Experiences</h3>
            <p>{copy("Shared experiences that")}</p>
            <Action href="/events">Explore Events</Action>
          </div>
          <div className="hm-photo hm-action-photo" data-reveal>
            <Image src="/gallery/heirmark-gathering-room.jpg" alt="Guests seated in a decorated room at a HeirMark gathering." fill sizes="(max-width: 767px) 100vw, 48vw" />
          </div>
          <div className="hm-supporting-paths">
            {paths.map(([title, description, href, icon]) => (
              <Link href={href} key={title} data-reveal>
                <HeirMarkIcon name={icon as IconName} />
                <div><h3>{title}</h3><p>{copy(description)}</p>
                  {href === "/speaking" && <span className="hm-text-link">Book Dr. Muria Nisbett</span>}
                </div>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="hm-books" aria-labelledby="books-title">
          <div className="hm-container">
            <h2 id="books-title" data-reveal>
              {copy("Stories That Heal.")}
            </h2>
          </div>
          <div className="hm-collection">
            <div className="hm-container hm-book-layout">
              <div className="hm-collection-artwork">
                <div className="hm-collection-badge"><strong>$75</strong><span>COMPLETE SET</span></div>
                <div className="hm-book-covers">
                {bookTitles.map((title, i) => (
                  <div key={title} data-reveal className="hm-cover">
                    <Image
                      src={collectionCovers[i].src}
                      alt={`Cover of ${i === 2 ? "Conversations Become Keepsakes" : title}`}
                      width={collectionCovers[i].width}
                      height={collectionCovers[i].height}
                      sizes="(max-width: 767px) 65vw, 21vw"
                    />
                  </div>
                ))}
              </div>
              </div>
              <div data-reveal className="hm-collection-copy">
                <p className="hm-eyebrow">THE HEIRMARK COLLECTION</p>
                <h3>One Complete System. Three Companion Books.</h3>
                <p>The HeirMark Collection brings the Framework into your hands through three companion books designed to be experienced together. Each builds on the last, guiding families from awareness to action to legacy.</p>
                <p className="hm-collection-emphasis">Sold exclusively as a collection, by design.</p>
                <div className="hm-actions">
                  <Action href="https://buy.stripe.com/4gM5kD0Rj8H20Hv4B07IY00">Buy the Collection</Action>
                  <Action href="/collection" secondary>Explore the Collection</Action>
                </div>
              </div>
            </div>
          </div>
          <div
            id="featured-publication"
            className={`hm-publication ${publication.cover ? "" : "hm-publication-text"}`}
          >
            <div className="hm-container hm-book-layout">
              {publication.cover && (
                <Image
                  src={publication.cover}
                  alt="Book mockup of Grieving a Parent Who Is Still Alive by Dr. Muria I. Nisbett"
                  width={1536}
                  height={1024}
                  className="hm-ebook-cover"
                  data-reveal
                  sizes="(max-width: 767px) 290px, (max-width: 1100px) 360px, 480px"
                />
              )}
              <div className="hm-launch-copy" data-reveal>
                <p className="hm-kindle-status">NOW AVAILABLE ON KINDLE</p>
                <h3>Grieving a Parent Who Is Still Alive</h3>
                <p>By Dr. Muria I. Nisbett</p>
                <p className="hm-lead">{copy("How do you grieve")}</p>
                <p><ApprovedText prefix="In *Grieving" /></p>
                <ReadMore text={copy("Through the lens of Caribbean")} />
                <p className="hm-kindle-price">Kindle eBook · $12.99</p>
                {publication.amazonUrl ? <Action href={publication.amazonUrl}>Buy Kindle eBook on Amazon</Action> : (
                  <button type="button" className="hm-button hm-purchase-unavailable" disabled aria-describedby={process.env.NODE_ENV === "development" ? "amazon-pending" : undefined}>Buy Kindle eBook on Amazon</button>
                )}
                {!publication.amazonUrl && process.env.NODE_ENV === "development" && <p id="amazon-pending" className="hm-pending">Amazon listing pending verification.</p>}
                <div className="hm-physical-launch" data-reveal>
                  <p>PAPERBACK &amp; HARDCOVER</p>
                  <p>Official Launch: <time dateTime="2026-11-17">November 17, 2026</time></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="hm-section hm-container hm-founder"
          aria-labelledby="founder-title"
        >
          <div className="hm-photo" data-reveal>
            <Image
              src="/dr-muria-nisbett-founder-with-book.jpg"
              alt="Dr. Muria I. Nisbett wearing an orange blazer and holding a copy of Grieving a Parent Who Is Still Alive."
              fill
              sizes="(max-width: 767px) 100vw, 48vw"
            />
          </div>
          <div data-reveal>
            <p className="hm-eyebrow">MEET THE FOUNDER</p>
            <h2 id="founder-title">Meet Dr. Muria I. Nisbett</h2>
            <p className="hm-lead">Therapist. Author. Founder of HeirMark.</p>
            {[
              "Dr. Muria I. Nisbett is a therapist,",
              "Rooted in Caribbean experiences",
              "Through writing, speaking,",
            ].map((t) => (
              <p key={t}>{copy(t)}</p>
            ))}
            <Action href="/speaking">Book Dr. Muria Nisbett</Action>
          </div>
        </section>
        <section
          className="hm-community hm-section"
          aria-labelledby="community-title"
        >
          <div className="hm-container">
            <h2 id="community-title" data-reveal>
              {copy("Real People.")}
            </h2>
            <div className="hm-gallery">
              {gallery.map(({ src, alt }, i) => (
                <div
                  className="hm-photo"
                  data-reveal
                  key={src}
                  style={{ "--delay": `${i * 100}ms` } as React.CSSProperties}
                >
                  <Image
                    src={`/gallery/${src}.jpg`}
                    alt={alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 55vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          className="hm-section hm-container hm-faq"
          aria-labelledby="faq-title"
        >
          <p className="hm-eyebrow">FAQ</p>
          <h2 id="faq-title" data-reveal>
            A Few Things You May Be Wondering
          </h2>
          <FAQ
            items={[
              {
                question: copy("Is the HeirMark Framework"),
                answer: copy("No. The HeirMark Framework"),
              },
              {
                question: copy("Can HeirMark's approach"),
                answer: copy("Yes. HeirMark recognizes"),
              },
              {
                question: copy("Can our organization"),
                answer: copy("Yes. HeirMark works"),
                link: true,
              },
            ]}
          />
        </section>
        <section
          className="hm-section hm-container hm-journal"
          aria-labelledby="journal-title"
        >
          <div className="hm-section-top">
            <h2 id="journal-title">Latest From HeirMark</h2>
            <Link className="hm-text-link" href="/journal">
              View All Stories <span aria-hidden="true">↗</span>
            </Link>
          </div>
          {!stories.length && process.env.NODE_ENV === "development" && (
            <div className="hm-journal-empty">
              <p>No published stories yet.</p>
              <p>Approved stories will appear here when published.</p>
            </div>
          )}
          <div className="hm-stories">
            {stories.map((story) => (
              <Link
                key={story.slug}
                href={`/journal/${story.slug}`}
                data-reveal
              >
                <div className="hm-photo">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                  />
                </div>
                <p>
                  {story.category} ·{" "}
                  <time dateTime={story.publishedAt}>
                    {new Date(story.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                </p>
                <h3>{story.title}</h3>
              </Link>
            ))}
          </div>
        </section>
        <section className="hm-invitation hm-section">
          <div className="hm-container" data-reveal>
            <p className="hm-eyebrow">CREATE IMPACT WITH HEIRMARK</p>
            <h2>{copy("Let's Create Meaningful")}</h2>
            <p>{copy("Explore opportunities to collaborate,")}</p>
            <div className="hm-actions">
              <Action href="/partnerships">Partner With Us</Action>
              <Action href="/events" secondary>
                Explore Events
              </Action>
            </div>
          </div>
        </section>
      </main>
      
    </>
  );
}

