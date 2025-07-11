/** @type {import('next').NextConfig} */
const nextConfig = {
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
    level: "debug",
    fetches: {
      fullUrl: true,
    },
  },
  // https://github.com/nextauthjs/next-auth/discussions/9385#discussioncomment-8875108
  transpilePackages: ["next-auth"],
};

export default nextConfig;
