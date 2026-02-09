import { JsonLd } from "@/components/JsonLd";

const collectionProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "The HeirMark Collection (3-Book Bundle)",
  description:
    "A three-part legacy framework in print guiding families through identity healing, parent-child connection, and preserving stories as keepsakes.",
  brand: {
    "@type": "Brand",
    name: "HeirMark",
  },
  url: "https://heirmark.com/collection",
  image: ["https://heirmark.com/books.png"],
  offers: {
    "@type": "Offer",
    url: "https://heirmark.com/collection",
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
    price: "0.00",
  },
};

const bookOne = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "HEIRMARK - Where Healing Becomes Heritage",
  author: {
    "@type": "Person",
    name: "Dr. Muria Nisbett",
  },
  publisher: {
    "@type": "Organization",
    name: "HeirMark",
  },
  inLanguage: "en",
  url: "https://heirmark.com/collection",
  about: ["Identity", "Memory", "Culture", "Relationships", "Legacy"],
};

const bookTwo = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "HEIRMARK - The Language of Healing (Parent-Child Edition)",
  author: {
    "@type": "Person",
    name: "Dr. Muria Nisbett",
  },
  publisher: {
    "@type": "Organization",
    name: "HeirMark",
  },
  inLanguage: "en",
  url: "https://heirmark.com/collection",
  about: [
    "Intergenerational communication",
    "Emotional safety",
    "Parent-child connection",
  ],
};

const bookThree = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "HEIRMARK - Where Conversations Become Keepsakes",
  author: {
    "@type": "Person",
    name: "Dr. Muria Nisbett",
  },
  publisher: {
    "@type": "Organization",
    name: "HeirMark",
  },
  inLanguage: "en",
  url: "https://heirmark.com/collection",
  about: [
    "Family stories",
    "Cultural heritage",
    "Legacy preservation",
    "Keepsakes",
  ],
};

export default function Head() {
  return (
    <>
      <JsonLd data={collectionProduct} />
      <JsonLd data={bookOne} />
      <JsonLd data={bookTwo} />
      <JsonLd data={bookThree} />
    </>
  );
}
