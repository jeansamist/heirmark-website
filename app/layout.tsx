import { SITE_ORIGIN } from "@/lib/site-url";
import { JsonLd } from "@/components/JsonLd";
import { graph, siteEntities } from "@/lib/structured-data";
import { BookingModalProvider } from "@/components/booking/BookingModal";
import GlobalFooter from "@/components/home/GlobalFooter";
import { Topbar } from "@/components/topbar";
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Manrope } from "next/font/google";
import { Announcements } from "@/components/home/Interactions";
import { publishedStories } from "@/data/journal";
import { previewAnnouncements } from "@/data/homepage";
import Script from "next/script";
import "./globals.css";
import "./homepage.css";
import "./round-one.css";

const fontHeading = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const fontSans = DM_Sans({
  variable: "--font-dm-sans-sans",
  subsets: ["latin"],
});

const fontSerif = Cormorant_Garamond({
  variable: "--font-cormorant-garamond-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  // Only legacy/purchase views use this face. Let their CSS request it on demand
  // instead of competing with every page's hero and primary sans-serif fonts.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
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
        className={`${fontSans.variable} ${fontSerif.variable} ${fontHeading.variable} antialiased font-sans`}
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
        <JsonLd data={graph(siteEntities())}/>
        <BookingModalProvider>
          <Announcements
            stories={
              (() => {
                const approved = publishedStories().filter(story => story.announcement?.approved).sort((a,b)=>(a.announcement?.order??0)-(b.announcement?.order??0));
                const linked = approved.map(story=>({headline:story.announcement!.headline,mobileHeadline:story.announcement?.mobileHeadline,href:`/journal/${story.slug}`}));
                return [...previewAnnouncements.map(message=>linked.find(item=>item.headline===message.headline)??{headline:message.headline}),...linked.filter(item=>!previewAnnouncements.some(message=>message.headline===item.headline))];
              })()
            }
          />
          <Topbar />
          {children}
          <GlobalFooter />
        </BookingModalProvider>
      </body>
    </html>
  );
}

