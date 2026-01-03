import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Включаем SSR для всех страниц
  output: undefined, // undefined = SSR по умолчанию
  
  // Оптимизация для SEO
  reactStrictMode: true,
  
  // Настройки для статических страниц
  experimental: {
    // Улучшенная поддержка SSR
  },
  
  // Включаем файлы переводов в сборку
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Копируем файлы переводов в сборку
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;