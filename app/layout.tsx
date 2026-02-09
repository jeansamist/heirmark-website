import { BookingModalProvider } from "@/components/booking/BookingModal";
import { Topbar } from "@/components/topbar";
import type { Metadata } from "next";
import { Abril_Fatface, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const fontSans = DM_Sans({
  variable: "--font-dm-sans-sans",
  subsets: ["latin"],
});

const fontSerif = Abril_Fatface({
  variable: "--font-abril-fatface-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heirmark.com"),
  title: {
    default: "HeirMark",
    template: "%s | HeirMark",
  },
  description:
    "A Caribbean-rooted healing framework helping families and communities strengthen identity, restore connection, and preserve generational wisdom.",
  openGraph: {
    type: "website",
    siteName: "HeirMark",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} antialiased font-sans`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TSGDN2K53H"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-TSGDN2K53H');`}
        </Script>
        <BookingModalProvider>
          <Topbar />
          {children}
        </BookingModalProvider>
      </body>
    </html>
  );
}
