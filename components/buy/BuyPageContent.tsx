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
    subtitle: "Book I",
    image: "/book1.png",
    description: "Uncovering the stories that shaped who you are.",
  },
  {
    title: "The Language of Healing",
    subtitle: "Book II",
    image: "/book2.png",
    description: "Restoring trust and tenderness across generations.",
  },
  {
    title: "Where Conversations Become Keepsakes",
    subtitle: "Book III",
    image: "/book3.png",
    description: "Preserving wisdom your family can return to.",
  },
];

const collectionPrice = 75;
const trustItems = [
  "Ships worldwide",
  "Family-first design",
  "Secure checkout",
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
      <section className="relative overflow-hidden bg-[linear-gradient(150deg,#f8f4ea_0%,#f2ebdc_55%,#ebe3d3_100%)] pt-28 pb-18 md:pt-36 md:pb-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-[8%] -right-[6%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(196,168,130,0.16)_0%,transparent_72%)]" />
          <div className="absolute -bottom-[10%] -left-[4%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(45,95,110,0.12)_0%,transparent_72%)]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="mb-12 flex justify-center">
            <div
              className="inline-flex items-center justify-center rounded-full px-4 py-2.5 sm:px-5"
              style={{
                border: "1.5px solid rgba(184, 151, 42, 0.5)",
                background: "rgba(249, 248, 243, 0.9)",
              }}
            >
              <span className="text-center font-sans text-[11px] leading-tight font-medium tracking-[0.2px] text-[#2f3e36] sm:text-[12px]">
                Official Launch Price — ${collectionPrice} (Limited First
                Release)
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="mb-5 text-center">
            <h1 className="font-serif font-bold leading-[1.08] tracking-tight text-[#1f2f2a] text-[34px] sm:text-5xl md:text-[58px]">
              The HeirMark
              <br />
              <em className="italic text-primary">3-Book Collection</em>
            </h1>
          </Reveal>

          <Reveal delay={0.08} className="mb-6 flex justify-center">
            <div
              className="h-[1.5px] w-20"
              style={{
                background:
                  "linear-gradient(to right, transparent, #C4A882, transparent)",
              }}
            />
          </Reveal>

          <Reveal delay={0.1} className="mb-14">
            <p className="mx-auto max-w-2xl text-center font-sans text-base leading-[1.7] tracking-[0.1px] text-[#3d3a32] sm:text-lg sm:leading-[1.75] md:text-xl">
              Turn healing into heritage. Strengthen your family&apos;s
              connection and protect the stories, wisdom, and legacy that
              deserve to live on.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mb-18 flex justify-center">
            <div className="relative flex h-[220px] w-full max-w-[340px] items-end justify-center sm:h-[260px] sm:max-w-[380px]">
              <div className="absolute left-0 bottom-2 z-10 w-[104px] -rotate-8 rounded-[20px] border border-[#c4a882]/40 bg-white/90 p-2 sm:left-2 sm:w-[120px] sm:rounded-[24px]">
                <Image
                  src={books[0].image}
                  alt={books[0].title}
                  width={260}
                  height={260}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="absolute left-1/2 bottom-4 z-30 w-[116px] -translate-x-1/2 rounded-[20px] border border-[#c4a882]/40 bg-white p-2 sm:w-[132px] sm:rounded-[24px]">
                <Image
                  src={books[1].image}
                  alt={books[1].title}
                  width={260}
                  height={260}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="absolute right-0 bottom-2 z-20 w-[104px] rotate-8 rounded-[20px] border border-[#c4a882]/40 bg-white/90 p-2 sm:right-2 sm:w-[120px] sm:rounded-[24px]">
                <Image
                  src={books[2].image}
                  alt={books[2].title}
                  width={260}
                  height={260}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-2 left-1/2 h-5 w-64 -translate-x-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(28,36,32,0.2) 0%, transparent 70%)",
                  filter: "blur(6px)",
                }}
              />
            </div>
          </Reveal>

          <Reveal
            delay={0.15}
            className="mb-12 rounded-2xl border border-[#c4a882]/25 bg-white/55 px-4 py-5 backdrop-blur-sm sm:px-6 sm:py-6"
          >
            <div className="flex flex-col gap-3">
              {books.map((book, i) => (
                <div
                  key={book.title}
                  className="flex flex-wrap items-start gap-3 py-2.5 sm:flex-nowrap sm:items-center sm:gap-4"
                  style={{
                    borderBottom:
                      i < books.length - 1
                        ? "1px solid rgba(196, 168, 130, 0.18)"
                        : "none",
                  }}
                >
                  <div className="h-8 w-8 shrink-0 rounded-lg bg-[linear-gradient(135deg,#2d5f6e,#1f3d46)]" />
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-[17px] font-semibold leading-tight text-[#1f2f2a] sm:text-[18px]">
                      {book.title}
                    </p>
                    <p className="mt-0.5 text-xs tracking-[0.2px] text-[#6f6a5e]">
                      {book.description}
                    </p>
                  </div>
                  <span className="pl-11 text-[10px] font-medium uppercase tracking-[2px] text-[#b8972a] sm:pl-0 sm:whitespace-nowrap">
                    {book.subtitle}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mb-9 text-center">
            <div className="mb-3 flex flex-wrap justify-center gap-3 sm:gap-5">
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="text-xs tracking-[0.2px] text-[#4c4a43]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mb-2 flex justify-center gap-0.5 text-[#b8972a]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="font-serif text-[15px] italic text-[#4c4a43]">
              &ldquo;This collection changed how my family talks about the
              past.&rdquo; — Early reader
            </p>
          </Reveal>

          {wasCanceled && (
            <Reveal
              delay={0.22}
              className="mb-6 rounded-2xl border border-secondary/60 bg-secondary/20 px-4 py-3 text-sm text-foreground"
            >
              Your Stripe checkout was canceled. You can continue from here
              whenever you are ready.
            </Reveal>
          )}

          <Reveal delay={0.25} className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex w-full max-w-sm flex-wrap items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#2C3E35_0%,#1E3028_100%)] px-4 py-3 text-sm font-medium tracking-[0.2px] text-[#f8f4ea] transition hover:scale-[1.02] sm:gap-2 sm:px-7 sm:py-4 sm:text-base sm:tracking-[0.3px]"
            >
              Secure My Collection Today
              <span className="rounded-full bg-white/15 px-3 py-0.5 text-sm font-semibold">
                ${collectionPrice}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-xs leading-relaxed tracking-[0.3px] text-[#6f6a5e]">
              Launch pricing. Once early access closes, the price increases.
              <br />
              <span className="text-[#b8972a]">Secure your copy today.</span>
            </p>
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
