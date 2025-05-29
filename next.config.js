/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig = {
  // Remove i18n config as it's not needed with App Router
  // We're using middleware.ts for internationalization instead

  // Configure allowed image domains and optimization
  images: {
    domains: ['upload.wikimedia.org'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Configure audio file handling
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|aac)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]'
      },
    });
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
