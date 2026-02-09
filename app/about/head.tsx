import { JsonLd } from "@/components/JsonLd";

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
  return <JsonLd data={person} />;
}
