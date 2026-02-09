import { JsonLd } from "@/components/JsonLd";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HeirMark",
  url: "https://heirmark.com",
  logo: "https://heirmark.com/HEIRMARK-logo.png",
  description:
    "A Caribbean-rooted healing framework helping families and communities strengthen identity, restore connection, and preserve generational wisdom.",
  sameAs: [
    "https://www.instagram.com/HEIRMARK",
    "https://www.linkedin.com/company/HEIRMARK",
    "https://www.youtube.com/@HEIRMARK",
    "https://www.facebook.com/HEIRMARK",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@heirmark.com",
      availableLanguage: ["en"],
    },
  ],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HeirMark",
  url: "https://heirmark.com",
  publisher: {
    "@type": "Organization",
    name: "HeirMark",
    url: "https://heirmark.com",
  },
};

export default function Head() {
  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
    </>
  );
}
