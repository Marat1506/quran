import type { NextConfig } from "next";

const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  reactStrictMode: true,
  turbopack: {},
  experimental: {
    staticGenerationMaxConcurrency: 1,
  },
};

export default nextConfig;