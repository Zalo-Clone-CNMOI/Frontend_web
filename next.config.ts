import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.59"],

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
      {
        protocol: "https",
        hostname: "chat.zalo.me",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
