'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HtmlAttributes() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return; // Early return if pathname is null

    // Extract locale from pathname
    const pathnameHasLocale = ['en', 'ur'].some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
      const locale = pathname.split('/')[1];
      const isRtl = locale === 'ur';

      // Set HTML attributes
      document.documentElement.lang = locale;
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    } else {
      // Default to English
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    }

    // Ensure the n8n style property is set to match server rendering
    document.documentElement.style.setProperty('--n8n-chat-display', 'none');
  }, [pathname]);

  return null; // This component doesn't render anything
}
