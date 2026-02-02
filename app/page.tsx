import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen flex items-center justify-center py-24 md:py-44">
        <div className="container px-6 flex flex-col gap-6">
          <p className="text-center text-base md:text-xl font-serif">
            The HeirMark Framework
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif text-center leading-normal">
            Transforming <span className="text-primary">Family Stories</span> &
            <span className="text-secondary"> Experiences</span> Into Legacy
          </h1>
          <p className="text-center max-w-2xl mx-auto leading-loose text-base md:text-xl">
            A Caribbean-rooted healing framework helping families and
            communities strengthen identity, restore connection, and preserve
            generational wisdom.
          </p>
          <p className="text-center mx-auto text-muted-foreground leading-loose text-sm md:text-base">
            Families • Elders • Youth • Educators • Faith Communities • Veterans
            • Universities • Cultural Organizations
          </p>
          <div className="flex items-center flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/heirmark-framework"
              className="h-14 px-6 py-4 flex items-center text-base justify-center font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
            >
              Explore the Framework
            </Link>
            <Link
              href="/events"
              className="text-muted-foreground underline hover:text-primary transition"
            >
              View Upcoming Events
            </Link>
          </div>
          <Image
            src={"/hero-image.png"}
            alt="Hero illustration"
            width={1524}
            height={762}
            className="w-full scale-150 opacity-25 sm:scale-100 md:-translate-y-40 -z-10 relative md:-mb-60"
          />
        </div>
      </div>
      <div className="container px-6 mx-auto space-y-6 pb-24 md:pb-44">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-serif leading-normal">
            What Is <span className="text-primary">HeirMark</span> ?
          </h1>
          <h3 className="text-xl md:text-2xl lg:text-4xl font-bold leading-normal">
            A Healing Framework for Identity, Connection, and Legacy
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="space-y-4 max-w-2xl w-full">
            <p className="text-muted-foreground leading-normal text-base md:text-xl">
              HeirMark is a culturally grounded healing ecosystem designed to
              strengthen belonging, restore emotional connection, and preserve
              generational wisdom.
            </p>
            <p className="text-muted-foreground leading-normal text-base md:text-xl">
              Rooted in Caribbean traditions of storytelling, communal care,
              faith, and cultural memory, HeirMark brings ancestral principles
              into a modern, scalable framework for families and communities
              everywhere.
            </p>
            <p className="text-muted-foreground leading-normal text-base md:text-xl">
              As elders transition, families migrate, and younger generations
              grow disconnected from their roots, invaluable stories and wisdom
              risk being lost. HeirMark creates intentional space to reflect,
              heal, document memory, and ensure that what we carry is not
              forgotten — but protected and passed forward.
            </p>
            <div>
              <Link
                href="/heirmark-framework"
                className="h-14 px-6 py-4 inline-flex items-center text-base justify-center font-semibold rounded-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition"
              >
                Learn More About The Framework
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <Image
              src="/nda-tree.webp"
              alt="NDA illustration"
              width={600}
              height={600}
              className="w-full h-full filter object-contain absolute top-0 -z-10 opacity-25 left-1/2 -translate-x-1/2  scale-150"
            />
          </div>
        </div>
      </div>
      <div className="pb-24 md:pb-44 space-y-12">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <div className="">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif text-center leading-normal">
              The HeirMark Book Collection
            </h1>
            <p className="text-center max-w-2xl mx-auto font-bold leading-loose text-base md:text-xl">
              A Three-Part Legacy Framework in Print
            </p>
            <p className="text-center  max-w-2xl mx-auto text-muted-foreground leading-loose text-sm md:text-base">
              The HeirMark Collection brings the full healing framework to life
              through three companion books, designed to be used together as one
              complete system. Each book represents a pillar of healing,
              connection, and legacy preservation, guiding families through
              storytelling, emotional restoration, and generational continuity.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-6 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-serif leading-normal">
              <span className="text-primary">HeirMark</span> — Where Healing
              Becomes Heritage
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="space-y-4 max-w-2xl w-full">
              <h3 className="text-xl md:text-2xl lg:text-4xl font-bold leading-normal">
                A foundational guide to understanding how identity, memory,
                culture, and relationships shape who we become.
              </h3>
              <p className="text-muted-foreground leading-normal text-base md:text-xl">
                You will learn to:
              </p>
              <ul className="text-muted-foreground leading-loose text-base md:text-xl list-disc list-inside">
                <li>Understand generational patterns</li>
                <li>Heal emotional and cultural wounds</li>
                <li>Build a meaningful legacy</li>
                <li>Turn survival into restoration and continuity</li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <Image
                src="/book1.png"
                alt="book 1"
                width={600}
                height={600}
                className="w-full h-full object-contain absolute top-1/2 -z-10  left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
              />
            </div>
          </div>
        </div>
        <hr className="container mx-auto" />
        <div className="container mx-auto px-6 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-serif leading-normal">
              <span className="text-primary">HeirMark</span> — The Language of
              Healing (Parent–Child Edition)
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="space-y-4 max-w-2xl w-full">
              <h3 className="text-xl md:text-2xl lg:text-4xl font-bold leading-normal">
                A heart-centred guide to helping families build emotionally
                safe, respectful, and connected relationships.
              </h3>
              <p className="text-muted-foreground leading-normal text-base md:text-xl">
                You will learn to:
              </p>
              <ul className="text-muted-foreground leading-loose text-base md:text-xl list-disc list-inside">
                <li>Communicate with care and intention</li>
                <li>Reduce conflict and strengthen trust</li>
                <li>Support children emotional resilience</li>
                <li>Turn everyday conversations into healing moments</li>
              </ul>
            </div>
            <div className="w-full md:flex-1 relative">
              <Image
                src="/book2.png"
                alt="book 2"
                width={600}
                height={600}
                className="w-full h-full object-contain absolute top-1/2 -z-10  left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
              />
            </div>
          </div>
        </div>
        <hr className="container mx-auto" />
        <div className="container mx-auto px-6 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-serif leading-normal">
              <span className="text-primary">HeirMark</span> — Where
              Conversations Become Keepsakes
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="space-y-4 max-w-2xl w-full">
              <h3 className="text-xl md:text-2xl lg:text-4xl font-bold leading-normal">
                A reflective keepsake guide to preserving family stories,
                wisdom, values, and cultural heritage.
              </h3>
              <p className="text-muted-foreground leading-normal text-base md:text-xl">
                You will learn to:
              </p>
              <ul className="text-muted-foreground leading-loose text-base md:text-xl list-disc list-inside">
                <li>Record meaningful family stories</li>
                <li>Honour elders and preserve heritage</li>
                <li>Save memories, traditions, and lessons</li>
                <li>Turn moments into a living legacy</li>
              </ul>
            </div>
            <div className="w-full md:flex-1 relative">
              <Image
                src="/book3.png"
                alt="book 3"
                width={600}
                height={600}
                className="w-full h-full object-contain absolute top-1/2 -z-10  left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <div className="max-w-xl w-full md:-mb-10">
            <Image
              src={"/books.png"}
              alt="Illustration"
              width={1524}
              height={762}
              className="max-w-xl w-full"
            />
          </div>
          <div className="">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold font-serif text-center leading-normal">
              Available exclusively as a <br />
              full 3-book bundle.
            </h1>
            <p className="text-center max-w-2xl mx-auto font-bold leading-loose text-base md:text-xl">
              To preserve the integrity of the framework, individual books are
              not sold separately.
            </p>
          </div>
          <div className="flex items-center flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/heirmark-framework"
              className="h-14 px-6 py-4 flex items-center text-base justify-center font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
            >
              Pre-order the complete HeirMark Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="pb-24 md:pb-44">
        <div className="relative h-100 md:h-125 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069"
            alt="Community gathering"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif text-center leading-normal mb-4">
              HeirMark Upcoming Events
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-2">
              Join a Gathering. Begin the Journey.
            </p>
            <p className="text-base md:text-lg text-center max-w-3xl mb-6">
              Workshops, storytelling circles, healing sessions, and community
              activations.
            </p>
            <Link
              href="/events"
              className="text-white underline text-lg hover:text-primary transition"
            >
              View All Events →
            </Link>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="pb-24 md:pb-44">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-serif leading-normal mb-2">
              Meet Our Founder
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold text-primary">
              Dr. Muria Nisbett
            </h3>
          </div>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-square w-full max-w-md mx-auto">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988"
                  alt="Dr. Muria Nisbett"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <p className="text-muted-foreground leading-loose text-base md:text-xl">
                Dr Muria Nisbett is a therapist, author, and founder of
                HeirMark, a legacy-centred healing framework designed to help
                individuals and families transform lived experience into
                generational impact. Based in the U.S. Virgin Islands, her work
                blends mental health, trauma-informed care, storytelling, and
                cultural preservation to strengthen identity, relationships, and
                emotional resilience across generations.
              </p>
              <p className="text-muted-foreground leading-loose text-base md:text-xl">
                Through HeirMark books, trainings, and community programs, Dr
                Nisbett empowers people to preserve their stories, wisdom, and
                values in meaningful, lasting ways. Her leadership bridges
                healing, culture, and community innovation, positioning legacy
                as a powerful tool for personal transformation and collective
                growth.
              </p>
              <div className="flex items-center flex-col sm:flex-row gap-6 pt-4">
                <Link
                  href="/book-dr-nisbett"
                  className="h-14 px-6 py-4 flex items-center text-base justify-center font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
                >
                  Book Dr Nisbett →
                </Link>
                <Link
                  href="/about"
                  className="text-muted-foreground underline hover:text-primary transition"
                >
                  Learn More About Dr Nisbett →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="pb-24 md:pb-44 bg-primary/5">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-serif leading-normal">
              Turn Healing into Heritage, <br />
              Conversations into Keepsakes, <br />
              and Stories into Legacy.
            </h2>
            <div className="flex items-center justify-center">
              <Link
                href="/pre-order"
                className="h-16 px-8 py-4 flex items-center text-lg justify-center font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
              >
                Grab My HeirMark Collection →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-tertiary text-tertiary-foreground">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Logo and Tagline */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold font-serif mb-2">HEIRMARK</h3>
              <p className="text-sm opacity-80">
                Transforming lived experiences into Legacy
              </p>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link
                    href="/heirmark-framework"
                    className="hover:opacity-100 transition"
                  >
                    The HeirMark Framework
                  </Link>
                </li>
                <li>
                  <Link
                    href="/three-pillars"
                    className="hover:opacity-100 transition"
                  >
                    The Three Pillars
                  </Link>
                </li>
                <li>
                  <Link
                    href="/book-collection"
                    className="hover:opacity-100 transition"
                  >
                    The Book Collection
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:opacity-100 transition">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:opacity-100 transition">
                    About HeirMark
                  </Link>
                </li>
              </ul>
            </div>

            {/* Work With Us */}
            <div>
              <h4 className="font-bold mb-4">Work With Us</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link
                    href="/partnerships"
                    className="hover:opacity-100 transition"
                  >
                    Partnerships
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="hover:opacity-100 transition"
                  >
                    Bring HeirMark to Your Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="/schools"
                    className="hover:opacity-100 transition"
                  >
                    Schools & Organizations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/blog" className="hover:opacity-100 transition">
                    Blog / Insights
                  </Link>
                </li>
                <li>
                  <Link href="/media" className="hover:opacity-100 transition">
                    Media & Press
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:opacity-100 transition">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:opacity-100 transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Stay Connected */}
            <div>
              <h4 className="font-bold mb-4">Stay Connected</h4>
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-6 py-4 h-14 rounded-full text-primary bg-primary/10 border border-primary/20 focus:outline-none focus:border-primary mb-2"
                  />
                  <button className="inline-block px-6 py-4 h-14 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">
                    HeirMark Community →
                  </button>
                </div>
                <div className="flex gap-4 text-sm">
                  <Link href="#" className="hover:text-primary transition">
                    Instagram
                  </Link>
                  <Link href="#" className="hover:text-primary transition">
                    LinkedIn
                  </Link>
                  <Link href="#" className="hover:text-primary transition">
                    YouTube
                  </Link>
                  <Link href="#" className="hover:text-primary transition">
                    Facebook
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA Highlight */}
          <div className="border-t border-secondary-foreground/20 pt-12 mb-12">
            <div className="text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold font-serif">
                Invite Dr Muria Nisbett to Speak
              </h3>
              <p className="text-sm opacity-80">
                Keynotes • Community Talks • Special Engagements
              </p>
              <Link
                href="/booking"
                className="inline-flex h-12 px-6 py-3 items-center text-base justify-center font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
              >
                Request a Booking →
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm opacity-80">
            <p className="mb-2">© HeirMark — All Rights Reserved</p>
            <div className="flex justify-center gap-4">
              <Link href="/privacy" className="hover:opacity-100 transition">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:opacity-100 transition">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
