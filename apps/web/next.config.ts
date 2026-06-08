import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - allowedDevOrigins is required for cross-origin HMR
  allowedDevOrigins: ['192.168.20.5', 'localhost:3000'],
};

export default nextConfig;
