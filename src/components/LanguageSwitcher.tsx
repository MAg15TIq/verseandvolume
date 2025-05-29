"use client";

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const pathname = usePathname();

  // Remove the locale prefix from the pathname
  const pathnameWithoutLocale = pathname?.replace(`/${locale}`, '') || '/';

  // In the app router, we need to use the full path with the locale prefix
  const enPath = `/en${pathnameWithoutLocale}`;
  const urPath = `/ur${pathnameWithoutLocale}`;

  return (
    <div className="flex items-center">
      <div className="flex space-x-2">
        <Link
          href={enPath}
          className={`px-2 py-1 text-sm rounded ${locale === 'en' ? 'bg-paper-200 text-paper-900 dark:bg-paper-700 dark:text-paper-100' : 'text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800'}`}
        >
          EN
        </Link>
        <Link
          href={urPath}
          className={`px-2 py-1 text-sm rounded ${locale === 'ur' ? 'bg-paper-200 text-paper-900 dark:bg-paper-700 dark:text-paper-100' : 'text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800'}`}
        >
          UR
        </Link>
      </div>
    </div>
  );
}
