import { JsonLd } from "@/components/JsonLd";

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Speaking and Facilitation by Dr. Muria Nisbett",
  description:
    "Keynotes, workshops, trainings, and community healing sessions focused on intergenerational healing, storytelling, identity, and legacy preservation.",
  provider: {
    "@type": "Person",
    name: "Dr. Muria Nisbett",
    url: "https://heirmark.com/about",
  },
  areaServed: "Worldwide",
  url: "https://heirmark.com/book",
  serviceType: [
    "Keynote Speaker",
    "Workshop Facilitator",
    "Community Healing Session",
    "Educational Event Speaker",
  ],
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Muria Nisbett",
  jobTitle: ["Therapist", "Author", "Founder of HeirMark"],
  url: "https://heirmark.com/about",
  image: "https://heirmark.com/founder.jpeg",
  worksFor: {
    "@type": "Organization",
    name: "HeirMark",
    url: "https://heirmark.com",
  },
  founder: {
    "@type": "Organization",
    name: "HeirMark",
    url: "https://heirmark.com",
  },
  homeLocation: {
    "@type": "Place",
    name: "St. Thomas, U.S. Virgin Islands",
  },
  sameAs: [
    "https://www.instagram.com/DRMURIANISBETT",
    "https://www.linkedin.com/in/DRMURIANISBETT",
  ],
};

export default function Head() {
  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={person} />
    </>
  );
}
