import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  cacheComponents: true,
  cacheLife: {
    // overriding the default 'days' profile
    days: {
      stale: 60 * 60, // 1 hour
      revalidate: 60 * 15, // 15 minutes
      expire: 60 * 60 * 24, // 1 day
    },
  },
};

export default nextConfig;
