"use client";

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return path === '/' ? `/${locale}` : `/${locale}${path}`;
  };

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (!pathname) return [];
    const pathSegments = pathname.replace(`/${locale}`, '').split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: t('navigation.home'),
        href: localizedPath('/'),
        isActive: pathSegments.length === 0
      }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      // Map path segments to readable labels
      let label = segment;
      switch (segment) {
        case 'poetry':
          label = t('navigation.poetry');
          break;
        case 'psychological-poetry':
          label = t('navigation.psychologicalPoetry');
          break;
        case 'novels':
          label = t('navigation.novels');
          break;
        case 'ghazals':
          label = t('navigation.ghazals');
          break;
        case 'prose':
          label = t('navigation.prose');
          break;
        case 'quotes':
          label = t('navigation.quotes');
          break;
        case 'stories':
          label = t('navigation.stories');
          break;
        case 'authors':
          label = t('navigation.authors');
          break;
        case 'search':
          label = t('navigation.search');
          break;
        case 'about':
          label = t('navigation.about');
          break;
        case 'contact':
          label = t('navigation.contact');
          break;
        default:
          // For dynamic segments like IDs, try to get a more readable name
          label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }

      breadcrumbs.push({
        label,
        href: localizedPath(currentPath),
        isActive: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon
                className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-600"
                aria-hidden="true"
              />
            )}

            {item.isActive ? (
              <span
                className="font-medium text-gray-900 dark:text-gray-100"
                aria-current="page"
              >
                {index === 0 && (
                  <HomeIcon className="w-4 h-4 inline mr-1" aria-hidden="true" />
                )}
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
              >
                {index === 0 && (
                  <HomeIcon className="w-4 h-4 inline mr-1" aria-hidden="true" />
                )}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
