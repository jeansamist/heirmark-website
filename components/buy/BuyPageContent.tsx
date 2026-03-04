"use client";

import Reveal from "@/components/Reveal";
import { ArrowRight, Check, ShieldCheck, Truck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

type BuyPageContentProps = {
  wasCanceled: boolean;
};

type CheckoutFormData = {
  fullName: string;
  email: string;
  quantity: string;
  address: string;
};

const books = [
  {
    title: "Where Healing Becomes Heritage",
    subtitle: "Book 1",
    image: "/book1.png",
  },
  {
    title: "The Language of Healing",
    subtitle: "Book 2 (Parent–Child Edition)",
    image: "/book2.png",
  },
  {
    title: "Where Conversations Become Keepsakes",
    subtitle: "Book 3",
    image: "/book3.png",
  },
];

const collectionPrice = 75;

const trustPoints = [
  {
    title: "Secure payment",
    description: "Checkout is processed through Stripe.",
    icon: ShieldCheck,
  },
  {
    title: "Single bundle only",
    description: "All three books arrive as one complete system.",
    icon: Check,
  },
  {
    title: "Order support",
    description: "Shipping and confirmation details are sent by email.",
    icon: Truck,
  },
];

const initialFormData: CheckoutFormData = {
  fullName: "",
  email: "",
  quantity: "1",
  address: "",
};

type FormErrors = Partial<Record<keyof CheckoutFormData, string>>;

function validateForm(formData: CheckoutFormData) {
  const errors: FormErrors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  const quantity = Number.parseInt(formData.quantity, 10);
  if (!Number.isInteger(quantity) || quantity < 1) {
    errors.quantity = "Enter a valid quantity (minimum 1).";
  }

  if (!formData.address.trim()) {
    errors.address = "Address is required.";
  }

  return errors;
}

export default function BuyPageContent({ wasCanceled }: BuyPageContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitError("");
    setFormErrors({});
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSubmitError("");
  };

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setSubmitError("");
        setFormErrors({});
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  const onFieldChange =
    (field: keyof CheckoutFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormData((previous) => ({ ...previous, [field]: value }));
      setFormErrors((previous) => ({ ...previous, [field]: undefined }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          quantity: Number.parseInt(formData.quantity, 10),
          address: formData.address.trim(),
        }),
      });

      const payload = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.error ?? "Unable to start checkout.");
      }

      window.location.assign(payload.checkoutUrl);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to start checkout. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quantity = Number.parseInt(formData.quantity, 10);
  const safeQuantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
  const checkoutTotal = collectionPrice * safeQuantity;

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(233,180,76,0.18),transparent_58%)]" />
          <div className="absolute -right-20 top-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        </div>
        <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal className="space-y-7">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Buy The Collection
            </p>
            <h1 className="text-4xl md:text-6xl font-serif">
              The Complete HeirMark 3-Book Legacy Framework
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              One intentional bundle to help families heal, connect, and
              preserve wisdom that can be carried forward for generations.
            </p>
            <div className="inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary">
              ${collectionPrice} per full collection
            </div>
            {wasCanceled && (
              <div className="max-w-2xl rounded-2xl border border-secondary/40 bg-secondary/15 px-4 py-3 text-sm text-foreground">
                Your Stripe checkout was canceled. You can continue from here
                whenever you are ready.
              </div>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Secure My Collection
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/collection"
                className="inline-flex h-14 items-center rounded-full border border-primary/35 px-8 text-primary font-semibold transition hover:bg-primary/5"
              >
                View Collection Details
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="absolute -inset-3 rounded-[32px] border border-primary/10 bg-white/70" />
            <div className="relative rounded-[32px] border border-border bg-white/90 p-6 shadow-sm md:p-8">
              <Image
                src="/books.png"
                alt="HeirMark 3-book collection"
                width={920}
                height={700}
                className="w-full object-contain"
                priority
              />
              <div className="mt-6 rounded-2xl bg-muted/40 p-5 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">
                  Bundle integrity promise
                </p>
                <p className="mt-1">
                  To preserve the framework, individual books are not sold
                  separately.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-22 md:pb-28">
        <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[1fr_0.42fr] lg:items-start">
          <Reveal className="rounded-[30px] border border-border bg-white/85 p-6 md:p-10">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              What&apos;s Included
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-serif">
              Three companion books designed as one system.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
              Each book supports a different stage of your healing and legacy
              journey. Together, they help you move from reflection to
              relationship to record.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {books.map((book, index) => (
                <Reveal
                  key={book.title}
                  delay={index * 0.08}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold">
                    {book.subtitle}
                  </p>
                  <div className="mt-4 rounded-xl bg-white p-4">
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={260}
                      height={260}
                      className="mx-auto h-56 w-auto object-contain"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-serif text-foreground">
                    {book.title}
                  </h3>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="rounded-[30px] border border-border bg-white/90 p-6 shadow-sm lg:sticky lg:top-26"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Order Summary
            </p>
            <h2 className="mt-3 text-2xl font-serif">HeirMark 3-Book Bundle</h2>
            <div className="mt-6 rounded-2xl bg-primary/5 p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="text-3xl font-semibold text-primary">
                  ${collectionPrice}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Per complete 3-book collection.
              </p>
            </div>
            <div className="mt-6 space-y-4">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="flex gap-3">
                    <span className="mt-0.5 rounded-xl bg-muted p-2 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {point.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={openModal}
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Continue to Checkout
              <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/65 px-4 py-8 sm:px-6"
          onClick={closeModal}
          role="presentation"
        >
          <div className="mx-auto flex h-full max-w-2xl items-center justify-center">
            <div
              className="w-full rounded-[30px] border border-border bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-modal-title"
            >
              <div className="border-b border-border px-6 py-5 sm:px-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      Secure Checkout
                    </p>
                    <h2
                      id="checkout-modal-title"
                      className="mt-1 text-xl sm:text-2xl font-serif"
                    >
                      Complete Your HeirMark Order
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-muted/40"
                    aria-label="Close purchase form"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 rounded-2xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Bundle price</span>
                    <span className="font-semibold text-foreground">
                      ${collectionPrice} each
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span>Current total</span>
                    <span className="font-semibold text-foreground">
                      ${checkoutTotal}
                    </span>
                  </div>
                </div>
              </div>

              <form
                className="space-y-5 p-6 sm:p-8"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="space-y-2">
                  <label htmlFor="full-name" className="text-sm font-semibold">
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={onFieldChange("fullName")}
                    className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-base text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
                  />
                  {formErrors.fullName && (
                    <p className="text-sm text-red-600">{formErrors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold">
                    Valid Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={onFieldChange("email")}
                    className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-base text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-semibold">
                    Number of Collections to Purchase
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min={1}
                    required
                    value={formData.quantity}
                    onChange={onFieldChange("quantity")}
                    className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-base text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
                  />
                  {formErrors.quantity && (
                    <p className="text-sm text-red-600">{formErrors.quantity}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-semibold">
                    Shipping Address
                  </label>
                  <textarea
                    id="address"
                    required
                    rows={4}
                    value={formData.address}
                    onChange={onFieldChange("address")}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
                  />
                  {formErrors.address && (
                    <p className="text-sm text-red-600">{formErrors.address}</p>
                  )}
                </div>

                {submitError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Redirecting to secure payment..."
                    : "Continue to Stripe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
