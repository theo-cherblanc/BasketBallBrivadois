import type { NextConfig } from "next";

function getStrapiHostname(): string | null {
  const raw = process.env.NEXT_PUBLIC_STRAPI_URL?.trim();
  if (!raw) return null;

  try {
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    return new URL(withProtocol).hostname;
  } catch {
    console.warn(
      `Invalid NEXT_PUBLIC_STRAPI_URL: "${raw}". Expected e.g. https://your-cms.up.railway.app`
    );
    return null;
  }
}

const strapiHostname = getStrapiHostname();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: strapiHostname
      ? [
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
        ]
      : [],
  },
};

export default nextConfig;
