import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  turbopack: {},
  experimental: {
    staticGenerationMaxConcurrency: 1,
  },
};

export default nextConfig;