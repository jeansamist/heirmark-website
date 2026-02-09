export type HeirMarkEvent = {
  id: string;
  label: string;
  kind: "workshop";
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  bookingProcess: string;
  bookingPrice: number;
  photo: string;
  startDate: string;
  endDate: string;
  address: {
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
};

export const events: HeirMarkEvent[] = [
  {
    id: "healing-through-story",
    label: "Workshop",
    kind: "workshop",
    title: "Healing Through Story",
    description:
      "A transformative workshop where participants explore personal and ancestral narratives to foster healing and connection.",
    location: "New York, NY",
    date: "October 15, 2026",
    time: "10:00 AM - 4:00 PM",
    bookingProcess: "Register online to secure your spot. Limited seats available.",
    bookingPrice: 100,
    photo: "/workshop.png",
    startDate: "2026-10-15T10:00:00-04:00",
    endDate: "2026-10-15T16:00:00-04:00",
    address: {
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
  },
];
