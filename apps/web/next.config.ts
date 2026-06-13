import type { NextConfig } from "next";

const nextConfig: any = {
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    // In production: NEXT_PUBLIC_API_URL = https://your-api.railway.app/api
    // In development: http://localhost:4000/api
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;
