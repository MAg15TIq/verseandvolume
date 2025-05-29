import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Create the middleware for internationalization
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ur'],

  // English is the default locale - pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',

  // Always use locale prefix for consistency
  localePrefix: 'as-needed',

  // Domains can be used to configure different locales to be served from different domains
  // domains: [
  //   {
  //     domain: 'example.com',
  //     defaultLocale: 'en'
  //   },
  //   {
  //     domain: 'example.ur',
  //     defaultLocale: 'ur'
  //   }
  // ]
});

// Export a custom middleware function that wraps the intl middleware
export default async function middleware(request: NextRequest) {
  // Call the internationalization middleware
  const response = await intlMiddleware(request);

  // Get the locale from the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = ['en', 'ur'].some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Set HTML attributes based on locale
  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1];
    const isRtl = locale === 'ur';

    // Clone the response to modify headers
    const newResponse = NextResponse.next();
    newResponse.headers.set('x-locale', locale);
    newResponse.headers.set('x-direction', isRtl ? 'rtl' : 'ltr');

    // Add headers to the original response
    response.headers.set('x-locale', locale);
    response.headers.set('x-direction', isRtl ? 'rtl' : 'ltr');

    return response;
  }

  return response;
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
