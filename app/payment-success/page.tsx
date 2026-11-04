import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Success",
  description:
    "Thank you for securing the HeirMark 3-Book Collection. Your legacy journey has begun.",
  alternates: {
    canonical: "/payment-success",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentSuccessPage() {
  redirect("/collection");
}
