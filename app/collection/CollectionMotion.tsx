"use client";

import { useEffect } from "react";

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

/** One observer, no scroll handlers, and no persistent hidden CSS states. */
export default function CollectionMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".hc-page");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || reduced.matches || !("IntersectionObserver" in window) || !Element.prototype.animate) return;
    const mobile = matchMedia("(max-width: 768px)");
    const active = new Set<Animation>();
    let disabled = false;
    function animate(element: Element | null, duration: number, delay = 0, distance = 16) {
      if (!element || disabled) return;
      const animation = element.animate([
        { opacity: 0, transform: `translateY(${distance}px)` },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration, delay, easing: EASING, fill: "backwards" });
      active.add(animation);
      animation.onfinish = () => active.delete(animation);
      animation.oncancel = () => active.delete(animation);
    }
    function reveal(group: Element) {
      const m = mobile.matches;
      const q = (selector: string) => group.querySelector(selector);
      if (group.matches(".hc-hero")) {
        animate(q(".hc-eyebrow"), m ? 400 : 550, 0, m ? 10 : 16);
        animate(q("h1"), m ? 400 : 550, m ? 0 : 90, m ? 10 : 16);
        group.querySelectorAll(".hc-hero-copy p:not(.hc-eyebrow)").forEach(el => animate(el, m ? 400 : 550, m ? 60 : 180, m ? 10 : 16));
        animate(q(".hc-hero-image"), m ? 450 : 650, m ? 120 : 180, 12);
        animate(q(".hc-hero-purchase"), m ? 400 : 550, m ? 180 : 270, m ? 10 : 16);
      } else if (group.matches(".hc-pillars")) {
        group.querySelectorAll("article").forEach((el, i) => animate(el, m ? 400 : 450, i * (m ? 60 : 100), m ? 10 : 12));
        if (!m) group.classList.add("hc-line-reveal");
      } else if (group.matches(".hc-book")) {
        animate(q(".hc-cover"), m ? 400 : 550, 0, m ? 10 : 16);
        if (m) animate(q(".hc-book-copy"), 400, 60, 10);
        else {
          group.querySelectorAll(".hc-book-copy > h3,.hc-book-copy > .hc-edition,.hc-book-copy > .hc-strong").forEach(el => animate(el, 550, 100));
          // Identical timing makes the body one visual group without altering margin collapse or layout.
          group.querySelectorAll(".hc-book-copy > :not(h3):not(.hc-edition):not(.hc-strong)").forEach(el => animate(el, 500, 160));
        }
      } else {
        animate(q(".hc-split > :first-child"), m ? 400 : 600, 0, m ? 10 : 16);
        animate(q(".hc-split > :last-child"), m ? 400 : 550, m ? 60 : 120, m ? 10 : 16);
      }
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || disabled) return;
        observer.unobserve(entry.target);
        reveal(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    function stop() {
      disabled = true;
      observer.disconnect();
      active.forEach(animation => animation.cancel());
      active.clear();
      root?.querySelectorAll(".hc-line-reveal").forEach(el => el.classList.remove("hc-line-reveal"));
    }
    const onPreference = () => { if (reduced.matches) stop(); };
    const onRestore = (event: PageTransitionEvent) => { if (event.persisted) stop(); };
    // Keyboard navigation never waits for an entrance animation to finish.
    const onFocus = () => active.forEach(animation => animation.finish());
    try {
      const hero = root.querySelector(".hc-hero");
      if (hero) reveal(hero);
      root.querySelectorAll(".hc-pillars,.hc-book,.hc-life,.hc-purchase").forEach(el => observer.observe(el));
    } catch {
      stop();
    }
    reduced.addEventListener("change", onPreference);
    window.addEventListener("pageshow", onRestore);
    root.addEventListener("focusin", onFocus);
    return () => {
      stop();
      reduced.removeEventListener("change", onPreference);
      window.removeEventListener("pageshow", onRestore);
      root.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}
