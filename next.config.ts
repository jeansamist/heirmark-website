import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
