import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Muria Nisbett",
  description:
    "Meet Dr. Muria Nisbett - therapist, author, and founder of HeirMark - sharing a Caribbean-rooted vision for legacy-centered healing.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Dr. Muria Nisbett",
    description:
      "Meet Dr. Muria Nisbett - therapist, author, and founder of HeirMark - sharing a Caribbean-rooted vision for legacy-centered healing.",
    url: "/about",
    images: [
      {
        url: "/dr-muria-nisbett-professional-headshot.jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dr. Muria Nisbett",
    description:
      "Meet Dr. Muria Nisbett - therapist, author, and founder of HeirMark - sharing a Caribbean-rooted vision for legacy-centered healing.",
    images: ["/dr-muria-nisbett-professional-headshot.jpeg"],
  },
};

export default function AboutPage() {
  permanentRedirect("/#about-heirmark");
}
