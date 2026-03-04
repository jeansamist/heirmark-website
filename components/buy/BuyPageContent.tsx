"use client";

import { ArrowRight, X } from "lucide-react";
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

  return (
    <>
      <section className="pt-28 pb-18 md:pt-36 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl rounded-[32px] border border-border bg-white/85 p-8 md:p-12 shadow-sm">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Purchase Collection
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-serif">
              The HeirMark 3-Book Collection
            </h1>
            <p className="mt-6 text-xl text-foreground leading-relaxed">
              Turn healing into heritage.
            </p>
            <p className="mt-2 text-lg text-muted-foreground leading-relaxed">
              Strengthen your family&apos;s connection and protect the stories,
              wisdom, and legacy that deserve to live on.
            </p>

            {wasCanceled && (
              <div className="mt-6 rounded-2xl border border-secondary/40 bg-secondary/15 p-4 text-sm text-foreground">
                Your Stripe checkout was canceled. You can continue from here
                whenever you are ready.
              </div>
            )}

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {books.map((book) => (
                <article
                  key={book.title}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold">
                      {book.subtitle}
                    </p>
                  </div>
                  <div className="mt-4 rounded-xl bg-white p-4">
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={260}
                      height={260}
                      className="mx-auto h-56 w-auto object-contain"
                    />
                  </div>
                  <h2 className="mt-4 text-lg font-serif text-foreground">
                    {book.title}
                  </h2>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition"
              >
                Secure My Collection Today $75
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/collection"
                className="inline-flex h-14 items-center rounded-full border border-primary/35 px-8 text-primary font-semibold hover:bg-primary/5 transition"
              >
                View Collection Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/65 px-4 py-8 sm:px-6"
          onClick={closeModal}
        >
          <div className="mx-auto flex h-full max-w-2xl items-center justify-center">
            <div
              className="w-full rounded-[30px] border border-border bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Secure Checkout
                  </p>
                  <h2 className="mt-1 text-xl sm:text-2xl font-serif">
                    Secure My Collection Today $75
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted/40 transition"
                  aria-label="Close purchase form"
                >
                  <X className="h-5 w-5" />
                </button>
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
                    Address
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
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 transition"
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
