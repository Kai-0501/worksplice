import type { NextConfig } from "next";

import { getSecurityHeaders } from "./lib/security-headers";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: getSecurityHeaders({
          isDev: process.env.NODE_ENV === "development",
          enableHttpsUpgrade: process.env.VERCEL_ENV === "production",
        }),
      },
    ];
  },
};

export default nextConfig;
