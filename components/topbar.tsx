"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/heirmark-framework", label: "Heirmark Framework" },
  { href: "/collection", label: "Heirmark Collection" },
  { href: "/events", label: "Events" },
  { href: "/#contact", label: "Contact Us" },
];

export function Topbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="h-20 bg-linear-to-b from-background via-background/70 to-transparent fixed top-0 left-0 w-full z-50">
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
                  className={`transition ${
                    isActiveLink(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/book"
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
          className="lg:hidden p-2 text-primary hover:bg-primary/10 rounded-md transition"
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
                href="/book"
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
