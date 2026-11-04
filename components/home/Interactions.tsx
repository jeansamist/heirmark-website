"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
export type Announcement = {
  headline: string;
  mobileHeadline?: string;
  href?: string;
};

export function MotionEnhancement() {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("hm-reveal");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
function subscribeDesktop(callback: () => void) {
  const media = matchMedia("(min-width: 768px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function desktopSnapshot() { return matchMedia("(min-width: 768px)").matches; }
export function FAQ({ items }: { items: { question: string; answer: string; link?: boolean }[] }) {
  const desktop = useSyncExternalStore(subscribeDesktop, desktopSnapshot, () => false);
  const [overrides, setOverrides] = useState<Record<number, boolean>>({});
  return <div className="hm-faq-accordion">{items.map((item, i) => {
    const open = overrides[i] ?? (desktop && i === 0);
    return <div className="hm-faq-item" key={item.question}>
      <h3><button type="button" className="hm-faq-question" aria-expanded={open} aria-controls={`faq-answer-${i}`} onClick={() => setOverrides(v => ({ ...v, [i]: !open }))}>
        <span>{item.question}</span><span className="hm-faq-indicator" aria-hidden="true">{open ? "−" : "+"}</span>
      </button></h3>
      <div id={`faq-answer-${i}`} className="hm-expand" data-open={open} inert={!open} aria-hidden={!open}>
        <div className="hm-expand-inner"><div className="hm-faq-answer"><p>{item.answer}</p>{item.link && <Link className="hm-text-link" href="/partnerships">Explore Partnership Opportunities</Link>}</div></div>
      </div>
    </div>;
  })}</div>;
}
export function ReadMore({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return <div className="hm-read-more">
    <button type="button" className="hm-read-toggle" aria-expanded={open} aria-controls="publication-description-more" onClick={() => setOpen(v => !v)}>{open ? "Read less" : "Read more"}</button>
    <div id="publication-description-more" className="hm-expand" data-open={open} inert={!open} aria-hidden={!open}><div className="hm-expand-inner"><p>{text}</p></div></div>
  </div>;
}
export function Announcements({ stories }: { stories: Announcement[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [phase, setPhase] = useState("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const busy = useRef(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
      timers.current.forEach(clearTimeout);
    };
  }, []);
  function move(direction: number, manual = false) {
    if (manual) setPaused(true);
    if (busy.current || stories.length < 2) return;
    if (reduced) {
      setIndex((i) => (i + direction + stories.length) % stories.length);
      return;
    }
    busy.current = true;
    setPhase("out");
    timers.current = [
      setTimeout(() => {
        setIndex((i) => (i + direction + stories.length) % stories.length);
        setPhase("waiting");
      }, 180),
      setTimeout(() => setPhase("in"), 220),
      setTimeout(() => {
        setPhase("idle");
        busy.current = false;
      }, 520),
    ];
  }
  useEffect(() => {
    if (paused || hover || focus || reduced || stories.length < 2) return;
    const timer = setInterval(() => move(1), 7000);
    return () => clearInterval(timer);
    // move only uses functional state updates and these dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, hover, focus, reduced, stories.length]);
  if (!stories.length) return null;
  const story = stories[index];
  return (
    <aside
      className="hm-announcements"
      aria-label="Latest announcements"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false);
      }}
    >
      <div className="hm-container">
        <button
          aria-label="Previous announcement"
          onClick={() => move(-1, true)}
          disabled={stories.length < 2}
        >
          ←
        </button>
        <div
          aria-live={paused || reduced ? "polite" : "off"}
          aria-atomic="true"
          className={`hm-announcement-text hm-announcement-${phase}`}
        >
          <AnnouncementContent story={story} />
        </div>
        <button
          aria-label="Next announcement"
          onClick={() => move(1, true)}
          disabled={stories.length < 2}
        >
          →
        </button>
        {!reduced && stories.length > 1 && (
          <button
            aria-label={paused ? "Play announcements" : "Pause announcements"}
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? "▶" : "Ⅱ"}
          </button>
        )}
      </div>
    </aside>
  );
}

function AnnouncementContent({ story }: { story: Announcement }) {
  const text = (
    <>
      <span className="hm-announcement-desktop">{story.headline}</span>
      <span className="hm-announcement-mobile">
        {story.mobileHeadline || story.headline}
      </span>
    </>
  );
  return story.href ? (
    <Link href={story.href}>{text}</Link>
  ) : (
    <span>{text}</span>
  );
}
