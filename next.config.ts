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
      {
        protocol: "https",
        hostname: "stc-zlogin.zdn.vn",
        pathname: "/**",
      },
    ],
  },

  // ===== Proxy API để né CORS =====
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://175.41.136.189:5000/:path*",
      },
    ];
  },
};

export default nextConfig;
