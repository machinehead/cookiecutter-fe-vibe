import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // https://github.com/nextauthjs/next-auth/discussions/9385#discussioncomment-8875108
  transpilePackages: ["next-auth"],
};

export default nextConfig;
