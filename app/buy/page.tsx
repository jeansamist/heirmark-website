import BuyPageContent from "@/components/buy/BuyPageContent";
import Footer from "@/components/home/Footer";
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

type SearchParams = Record<string, string | string[] | undefined>;

function isCanceledValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value.includes("1");
  }
  return value === "1";
}

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <main className="bg-background text-foreground">
      <BuyPageContent wasCanceled={isCanceledValue(params.canceled)} />
      <Footer />
    </main>
  );
}
