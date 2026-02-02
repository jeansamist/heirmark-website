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
            className="w-full scale-150 sm:scale-100"
          />
        </div>
      </div>
    </main>
  );
}
