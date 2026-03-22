"use client";

import {
  BookingModalTrigger,
  useBookingModal,
} from "@/components/booking/BookingModal";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/framework", label: "Heirmark Framework" },
  { href: "/collection", label: "Heirmark Collection" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact Us" },
];

export function Topbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const { open } = useBookingModal();

  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const shouldHide = isScrollingDown && currentScrollY > 120;

      // setIsHidden(shouldHide);
      setIsHidden(false);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const heroSection = document.getElementById("top");
    if (!heroSection || !isHomePage || isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPastHero(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPastHero(!entry.isIntersecting);
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, [isHomePage, isMobile]);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isPastHero
          ? "border-b border-secondary/20 bg-[color:var(--surface)]/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/HEIRMARK-logo.png"
            alt="HeirMark logo"
            width={567.4}
            height={102.2}
            priority
            className={`h-auto w-34 sm:w-40 ${
              isPastHero ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        <div className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`border-b pb-0.5 text-[11px] font-medium uppercase tracking-[0.18em] ${
                    isActiveLink(link.href)
                      ? "border-secondary text-primary"
                      : isPastHero
                      ? "border-transparent text-foreground/72 hover:border-secondary/60 hover:text-foreground"
                      : "border-transparent text-primary-foreground/74 hover:border-primary-foreground/45 hover:text-primary-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <BookingModalTrigger className="flex h-11 items-center justify-center border border-primary bg-primary px-5 text-[11px] font-medium uppercase tracking-[0.18em] whitespace-nowrap text-primary-foreground hover:bg-secondary hover:text-primary">
                Book DR. Nisbett
              </BookingModalTrigger>
            </li>
          </ul>
        </div>

        <button
          onClick={toggleMobileMenu}
          className={`border p-2 lg:hidden ${
            isPastHero
              ? "border-primary/20 text-foreground hover:bg-primary/10"
              : "border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed left-0 top-20 w-full border-t border-secondary/20 bg-[color:var(--surface)]/95 backdrop-blur-md lg:hidden">
          <ul className="container mx-auto space-y-4 px-4 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block border-b py-2 text-[11px] uppercase tracking-[0.18em] ${
                    isActiveLink(link.href)
                      ? "border-secondary text-primary"
                      : "border-transparent text-muted-foreground hover:border-secondary/60 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  open();
                }}
                className="flex h-12 w-full items-center justify-center border border-primary bg-primary px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground hover:bg-secondary hover:text-primary"
              >
                Book DR. Nisbett
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
