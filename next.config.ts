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
};

export default nextConfig;
