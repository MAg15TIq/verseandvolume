import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // Remove i18n config as it's not needed with App Router
  // We're using middleware.ts for internationalization instead

  // Configure allowed image domains
  images: {
    domains: ['upload.wikimedia.org'],
  },
};

export default withNextIntl(nextConfig);
