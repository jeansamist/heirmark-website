import { SITE_ORIGIN, LEGACY_HOST } from "./lib/site-url";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { hostname: "tapback.co" },
      { hostname: "72.61.104.221" },
      { hostname: "localhost" },
      { hostname: "images.unsplash.com" },
    ],
    unoptimized: false,
  },
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: LEGACY_HOST }], destination: `${SITE_ORIGIN}/:path*`, permanent: true },
      {
        source: "/heirmark-framework",
        destination: "/framework",
        permanent: true,
      },
      {
        source: "/dr-nisbett",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/heirmark-collection",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/about-dr-nisbett",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
