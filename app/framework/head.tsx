import { JsonLd } from "@/components/JsonLd";

const frameworkPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "The HeirMark Framework",
  url: "https://heirmark.com/framework",
  description:
    "A Caribbean-rooted healing framework built around Identity, Connection, and Legacy to preserve stories and strengthen intergenerational bonds.",
  about: [
    { "@type": "Thing", name: "Intergenerational healing" },
    { "@type": "Thing", name: "Family storytelling" },
    { "@type": "Thing", name: "Cultural preservation" },
    { "@type": "Thing", name: "Legacy building" },
  ],
  publisher: {
    "@type": "Organization",
    name: "HeirMark",
    url: "https://heirmark.com",
  },
};

const frameworkFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the HeirMark Framework?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HeirMark is a Caribbean-rooted healing framework that helps families and communities strengthen identity, restore emotional connection, and preserve generational wisdom through storytelling and legacy practices.",
      },
    },
    {
      "@type": "Question",
      name: "What are the three pillars of HeirMark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The three pillars are Identity, Connection, and Legacy. Together they guide families from self-understanding, to restored communication, to preserving stories and wisdom as keepsakes.",
      },
    },
    {
      "@type": "Question",
      name: "Who is HeirMark for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HeirMark serves multigenerational families, elders and youth, educators, faith communities, veterans, diaspora families, and cultural organizations.",
      },
    },
    {
      "@type": "Question",
      name: "Do the books need to be used together?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The HeirMark Collection is designed as a complete 3-book system aligned with the three pillars. To preserve the integrity of the framework, the books are sold only as a full bundle.",
      },
    },
  ],
};

export default function Head() {
  return (
    <>
      <JsonLd data={frameworkPage} />
      <JsonLd data={frameworkFaq} />
    </>
  );
}
