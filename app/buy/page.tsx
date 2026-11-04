import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy The HeirMark 3-Book Collection",
  description:
    "Secure the HeirMark 3-Book Collection for $75 and begin your family legacy journey.",
  alternates: {
    canonical: "/buy",
  },
  openGraph: {
    title: "Buy The HeirMark 3-Book Collection",
    description:
      "Secure the HeirMark 3-Book Collection for $75 and begin your family legacy journey.",
    url: "/buy",
    images: [
      {
        url: "/books.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy The HeirMark 3-Book Collection",
    description:
      "Secure the HeirMark 3-Book Collection for $75 and begin your family legacy journey.",
    images: ["/books.png"],
  },
};

export default function BuyPage() {
  permanentRedirect("/collection");
}
