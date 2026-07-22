import type { NextConfig } from "next";

const strapiHost = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const strapiHostname = new URL(strapiHost).hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: strapiHostname,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: strapiHostname,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
