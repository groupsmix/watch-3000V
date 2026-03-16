import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    formats: ["image/webp", "image/avif"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
};

export default nextConfig;
