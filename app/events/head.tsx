import { JsonLd } from "@/components/JsonLd";
import { events } from "@/data/events";

export default function Head() {
  return (
    <>
      {events.map((event) => (
        <JsonLd
          key={event.id}
          data={{
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: event.location,
              address: {
                "@type": "PostalAddress",
                addressLocality: event.address.addressLocality,
                addressRegion: event.address.addressRegion,
                addressCountry: event.address.addressCountry,
              },
            },
            organizer: {
              "@type": "Organization",
              name: "HeirMark",
              url: "https://heirmark.com",
            },
            performer: {
              "@type": "Person",
              name: "Dr. Muria Nisbett",
            },
            url: "https://heirmark.com/events",
            offers: {
              "@type": "Offer",
              url: "https://heirmark.com/events",
              price: event.bookingPrice.toFixed(2),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }}
        />
      ))}
    </>
  );
}
