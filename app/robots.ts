import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/success/", "/thank-you/"],
      },
    ],
    sitemap: "https://theheirmarkframework.com/sitemap.xml",
  };
}
