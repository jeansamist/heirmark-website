"use client";

import Reveal from "@/components/Reveal";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
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
      <section className="relative overflow-hidden bg-[linear-gradient(165deg,#0f1f24_0%,#1c4250_55%,#2d5f6e_100%)] pt-28 pb-18 md:pt-36 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(233,180,76,0.2),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(244,219,169,0.16),transparent_40%)]" />
          <div className="absolute inset-0 motifs opacity-[0.04]" />
        </div>
        <div className="container mx-auto space-y-8 px-3 md:px-6">
          <Reveal className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-foreground/85 px-3 py-6 backdrop-blur-sm md:rounded-[34px] md:px-10 md:py-10">
            <div className="relative">
              <div className="absolute -top-1 right-0 h-18 w-18 md:-top-2 md:h-30 md:w-30">
                <div className="absolute inset-0 rounded-full bg-[repeating-conic-gradient(from_0deg,#e9b44c_0deg_22deg,#f4dba9_22deg_44deg,#2d5f6e_44deg_66deg)] animate-[spin_12s_linear_infinite]" />
                <div className="absolute inset-[6px] rounded-full border border-foreground/20 bg-secondary md:inset-[8px]" />
                <div className="absolute inset-[6px] flex items-center justify-center rounded-full md:inset-[8px]">
                  <div className="text-center text-foreground">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.14em] md:text-[9px] md:tracking-[0.16em]">
                      Launch
                    </p>
                    <p className="mt-0.5 text-xl font-serif leading-none md:mt-1 md:text-2xl">
                      ${collectionPrice}
                    </p>
                  </div>
                </div>
              </div>
              <p className="max-w-2xl text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Official Launch Price — ${collectionPrice}
              </p>
              <p className="mt-2 max-w-2xl text-sm font-semibold text-white/75">
                (Limited First Release)
              </p>
              <h1 className="mt-4 max-w-3xl text-3xl md:text-5xl font-serif text-white">
                The HeirMark 3-Book Collection
              </h1>
              <p className="mt-4 max-w-3xl text-lg md:mt-5 md:text-xl text-white/90">
                Turn healing into heritage.
              </p>
              <p className="mt-2 max-w-3xl text-sm md:text-lg text-white/75">
                Strengthen your family&apos;s connection and protect the
                stories, wisdom, and legacy that deserve to live on.
              </p>

              {wasCanceled && (
                <div className="mt-5 max-w-3xl rounded-2xl border border-secondary/60 bg-secondary/20 px-4 py-3 text-sm text-white">
                  Your Stripe checkout was canceled. You can continue from here
                  whenever you are ready.
                </div>
              )}

              <button
                type="button"
                onClick={openModal}
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-secondary/80 bg-secondary px-4 text-sm font-semibold text-foreground transition hover:bg-secondary/90 md:h-14 md:px-6 md:text-base"
              >
                Secure My Collection Today ${collectionPrice}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="mx-auto max-w-5xl rounded-2xl border border-white/20 bg-white/10 px-3 py-6 md:rounded-[34px] md:px-8 md:py-8"
          >
            <div className="grid gap-5 md:grid-cols-3">
              {books.map((book, index) => (
                <Reveal
                  key={book.title}
                  delay={index * 0.08}
                  className="rounded-2xl border border-white/20 bg-white/95 px-3 py-5 md:rounded-3xl md:px-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                    {book.subtitle}
                  </p>
                  <div className="mt-3 rounded-xl border border-border bg-background px-2 py-4 md:rounded-2xl md:px-4">
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={260}
                      height={260}
                      className="mx-auto h-56 w-auto object-contain"
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-foreground">
                    {book.title}
                  </p>
                </Reveal>
              ))}
            </div>
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
              className="w-full rounded-[30px] border border-border bg-background"
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
                      className="mt-1 text-xl sm:text-2xl font-serif text-foreground"
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
                <div className="mt-4 rounded-2xl border border-secondary/40 bg-secondary/15 px-4 py-3 text-sm text-foreground">
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
                  <label
                    htmlFor="full-name"
                    className="text-sm font-semibold text-foreground"
                  >
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
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-foreground"
                  >
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
                  <label
                    htmlFor="quantity"
                    className="text-sm font-semibold text-foreground"
                  >
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
                  <label
                    htmlFor="address"
                    className="text-sm font-semibold text-foreground"
                  >
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
