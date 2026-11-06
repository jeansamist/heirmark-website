import blocks from "./homepage-copy.json";

/** Exact approved paragraph, with Markdown emphasis handled by the renderer. */
export function copy(prefix: string) {
  const value = blocks.find((block) => block.startsWith(prefix));
  if (!value) throw new Error(`Approved copy missing: ${prefix}`);
  return value;
}

// Verification gates: do not infer availability from the release date.
export const publication: {
  cover: string | null;
  amazonUrl: string | null;
  availability: "unverified" | "preorder" | "available";
} = {
  cover: "/grieving-a-parent-who-is-still-alive-book-mockup.png",
  amazonUrl: "https://www.amazon.com/dp/B0HMQFVY1S",
  availability: "available",
};
export const partnerLogos: {
  name: "DRCVI" | "AARP";
  src: string;
  alt: string;
  width: number;
  height: number;
}[] = [
  {
    name: "DRCVI",
    src: "/disability-rights-center-virgin-islands-logo.png",
    alt: "Disability Rights Center of the Virgin Islands logo",
    width: 678,
    height: 353,
  },
  {
    name: "AARP",
    src: "/aarp-virgin-islands-logo.webp",
    alt: "AARP The Virgin Islands logo",
    width: 900,
    height: 351,
  },
];
// Official URLs restored from the repository's original Footer.tsx.
export const verifiedSocialLinks: { label: "Instagram" | "LinkedIn" | "YouTube" | "Facebook"; href: string }[] = [
 { label: "Instagram", href: "https://www.instagram.com/heirmarkframework" },
 { label: "LinkedIn", href: "https://www.linkedin.com/company/theheirmarkframework" },
 { label: "YouTube", href: "https://www.youtube.com/@TheHeirMarkFramework" },
 { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61587878037283" },
];
export const legalLinks: { privacy: string | null; terms: string | null } = {
  privacy: null,
  terms: null,
};

// Pending destinations are intentionally null until real articles are approved.
export const previewAnnouncements = [
  {
    headline:
      "HeirMark Collaborates with DRCVI on $750,000 Federal Grant Initiative",
    pendingDestination: null,
  },
  {
    headline: "Dr. Muria Nisbett to Speak at AARP-Organized Conference",
    pendingDestination: null,
  },
];
export const collectionCovers = [
  {
    src: "/where-healing-becomes-heritage-cover.png",
    width: 960,
    height: 1088,
  },
  { src: "/the-language-of-healing-cover.png", width: 864, height: 1184 },
  {
    src: "/where-conversations-become-keepsakes-cover.png",
    width: 864,
    height: 1232,
  },
];
