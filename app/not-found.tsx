import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
          Page not found
        </p>
        <h1 className="text-4xl md:text-6xl font-serif">
          We couldn’t find that page.
        </h1>
        <p className="text-lg text-muted-foreground">
          The link may have moved or the page no longer exists. Return to
          HeirMark to continue exploring the framework.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 h-12 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
