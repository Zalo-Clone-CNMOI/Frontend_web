import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zalo-site.zadn.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "stc-zaloprofile.zdn.vn",   
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
