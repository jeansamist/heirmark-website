"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/heirmark-framework", label: "Heirmark Framework" },
  { href: "/#collection", label: "Heirmark Collection" },
  { href: "/#events", label: "Events" },
  { href: "/contact", label: "Contact Us" },
];

export function Topbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

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

      setIsHidden(shouldHide);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    const heroSection = document.getElementById("top");
    // if (!heroSection || !isHomePage ) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPastHero(true);
    return;
    // }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPastHero(!entry.isIntersecting);
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );

    // observer.observe(heroSection);
    return () => observer.disconnect();
  }, [isHomePage]);

  return (
    <nav
      className={`h-20 fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isPastHero
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container h-full mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/HEIRMARK-logo.png"
            alt="heirmark logo"
            width={567.4}
            height={102.2}
            className="w-32 sm:w-40"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition font-semibold ${
                    isActiveLink(link.href)
                      ? "text-primary"
                      : isPastHero
                      ? "text-foreground/80 hover:text-foreground"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/about#booking"
                className="h-12 px-6 py-4 flex text-sm items-center justify-center font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition whitespace-nowrap"
              >
                Book DR. Nisbett
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className={`lg:hidden p-2 rounded-md transition ${
            isPastHero
              ? "text-foreground hover:bg-foreground/10"
              : "text-primary-foreground hover:bg-primary-foreground/10"
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 w-full bg-background/95 backdrop-blur-md border-t border-border shadow-lg">
          <ul className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 transition ${
                    isActiveLink(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/about#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full h-12 px-6 py-4 flex text-sm items-center justify-center font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
              >
                Book DR. Nisbett
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
