"use client";

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function NavigationItem() {
  const t = useTranslations('navigation');
  const locale = useLocale();

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return path === '/' ? `/${locale}` : `/${locale}${path}`;
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="nav-title font-sans text-sm text-paper-700 dark:text-paper-500 uppercase tracking-wider mb-6 animate-fade-in" style={{ fontWeight: 600 }}>
        Navigate
      </div>
      <ul className="nav-links list-none">
        <li className="mb-4 transform transition-transform duration-300 hover:translate-x-1">
          <Link
            href={localizedPath('/poetry')}
            className="font-serif text-lg text-paper-900 dark:text-paper-100 no-underline transition-all duration-300 hover:text-paper-700 dark:hover:text-white relative group cursor-literature"
          >
            <span className="relative z-10">{t('poetry')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-paper-400 dark:bg-paper-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
        <li className="mb-4 transform transition-transform duration-300 hover:translate-x-1">
          <Link
            href={localizedPath('/ghazals')}
            className="font-serif text-lg text-paper-900 dark:text-paper-100 no-underline transition-all duration-300 hover:text-paper-700 dark:hover:text-white relative group cursor-literature"
          >
            <span className="relative z-10">{t('ghazals')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-paper-400 dark:bg-paper-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
        <li className="mb-4 transform transition-transform duration-300 hover:translate-x-1">
          <Link
            href={localizedPath('/prose')}
            className="font-serif text-lg text-paper-900 dark:text-paper-100 no-underline transition-all duration-300 hover:text-paper-700 dark:hover:text-white relative group cursor-literature"
          >
            <span className="relative z-10">{t('prose')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-paper-400 dark:bg-paper-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
        <li className="mb-4 transform transition-transform duration-300 hover:translate-x-1">
          <Link
            href={localizedPath('/authors')}
            className="font-serif text-lg text-paper-900 dark:text-paper-100 no-underline transition-all duration-300 hover:text-paper-700 dark:hover:text-white relative group cursor-literature"
          >
            <span className="relative z-10">{t('authors')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-paper-400 dark:bg-paper-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
        <li className="mb-4 transform transition-transform duration-300 hover:translate-x-1">
          <Link
            href={localizedPath('/quotes')}
            className="font-serif text-lg text-paper-900 dark:text-paper-100 no-underline transition-all duration-300 hover:text-paper-700 dark:hover:text-white relative group cursor-literature"
          >
            <span className="relative z-10">{t('quotes')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-paper-400 dark:bg-paper-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
        <li className="mb-4 transform transition-transform duration-300 hover:translate-x-1">
          <Link
            href={localizedPath('/about')}
            className="font-serif text-lg text-paper-900 dark:text-paper-100 no-underline transition-all duration-300 hover:text-paper-700 dark:hover:text-white relative group cursor-literature"
          >
            <span className="relative z-10">{t('about')}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-paper-400 dark:bg-paper-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
