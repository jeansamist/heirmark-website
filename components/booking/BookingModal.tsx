"use client";

import BookingForm from "@/components/about/BookingForm";
import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type BookingModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(
  null
);

export function BookingModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
  }, [isOpen]);

  const value = useMemo(
    () => ({
      open,
      close,
      isOpen,
    }),
    [close, isOpen, open]
  );

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4 py-6 sm:px-6"
          onClick={close}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="rounded-[32px] border border-border bg-white/95 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border px-6 py-4 sm:px-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Booking Request
                  </p>
                  <h3 className="text-xl sm:text-2xl font-serif">
                    Book Dr Muria Nisbett
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-muted/40"
                  aria-label="Close booking form"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="max-h-[75vh] overflow-y-auto px-6 py-6 sm:px-8">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return context;
}

export function BookingModalTrigger({
  className,
  children,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open } = useBookingModal();

  return (
    <button
      type="button"
      className={className}
      onClick={(event) => {
        onClick?.(event);
        open();
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
