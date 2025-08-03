import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from any domain (use with caution)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Accept all hostnames
      },
    ],
  }
};

export default nextConfig;
