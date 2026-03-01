import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/article",
        permanent: true,
      },
      {
        source: "/projects/tech",
        destination: "/article/tech",
        permanent: true,
      },
      {
        source: "/projects/art",
        destination: "/article/art",
        permanent: true,
      },
      {
        source: "/projects/:slug",
        destination: "/article/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
