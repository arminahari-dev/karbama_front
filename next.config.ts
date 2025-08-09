import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // your existing config options
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.karbama.westeastmonesterstickerifystore.com",
      },
    ],
  },
};

export default nextConfig;
