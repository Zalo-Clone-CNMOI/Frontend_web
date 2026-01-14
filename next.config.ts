import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zalo-site.zadn.vn",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
