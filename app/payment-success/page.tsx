import PaymentSuccessEmailTrigger from "@/components/buy/PaymentSuccessEmailTrigger";
import Footer from "@/components/home/Footer";
import { getStripeClient } from "@/lib/stripe";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Success",
  description:
    "Thank you for securing the HeirMark 3-Book Collection. Your legacy journey has begun.",
  alternates: {
    canonical: "/payment-success",
  },
  robots: {
    index: false,
    follow: false,
  },
};

type SearchParams = Record<string, string | string[] | undefined>;

function getSingleValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }
  return value ?? null;
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sessionId = getSingleValue(params.session_id);
  const fallbackClientName = getSingleValue(params.client_name);

  let clientName = fallbackClientName ?? "Friend";

  if (sessionId) {
    const stripe = getStripeClient();
    if (stripe) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        clientName =
          session.metadata?.fullName?.trim() ||
          session.customer_details?.name?.trim() ||
          clientName;
      } catch (error) {
        console.warn("Unable to load Stripe session for success page:", error);
      }
    }
  }

  return (
    <main className="bg-background text-foreground">
      <PaymentSuccessEmailTrigger sessionId={sessionId} />
      <section className="pt-30 pb-22 md:pt-38 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl rounded-[32px] border border-border bg-white/85 p-8 text-center shadow-sm md:p-12">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Payment Successful
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-serif">
              Your Legacy Journey Has Begun.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Thank you {clientName} for securing the HeirMark 3-Book
              Collection. Your order has been received, and a confirmation
              email is on its way.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/collection"
                className="inline-flex h-12 items-center justify-center rounded-full border border-primary/35 px-6 text-primary font-semibold hover:bg-primary/5 transition"
              >
                View Collection Details
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-primary-foreground font-semibold hover:bg-primary/90 transition"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
