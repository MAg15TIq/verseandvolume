"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BookOpenIcon,
  HeartIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  SpeakerWaveIcon,
  MagnifyingGlassIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavigationItem[];
}

export default function MobileNavigation() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return path === '/' ? `/${locale}` : `/${locale}${path}`;
  };

  // Check if a path is active
  const isActive = (path: string) => {
    if (!pathname) return false;
    const localizedPathValue = localizedPath(path);
    return pathname === localizedPathValue || pathname.startsWith(localizedPathValue + '/');
  };

  // Navigation structure
  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: t('navigation.home'),
      href: '/',
      icon: HomeIcon
    },
    {
      id: 'poetry',
      label: t('navigation.poetry'),
      href: '/poetry',
      icon: BookOpenIcon,
      children: [
        {
          id: 'all-poetry',
          label: t('navigation.allPoetry'),
          href: '/poetry',
          icon: BookOpenIcon
        },
        {
          id: 'psychological-poetry',
          label: t('navigation.psychologicalPoetry'),
          href: '/psychological-poetry',
          icon: BookOpenIcon
        },
        {
          id: 'english-poetry',
          label: t('navigation.englishPoetry'),
          href: '/poetry?filter=english',
          icon: BookOpenIcon
        },
        {
          id: 'urdu-poetry',
          label: t('navigation.urduPoetry'),
          href: '/poetry?filter=urdu',
          icon: BookOpenIcon
        }
      ]
    },
    {
      id: 'novels',
      label: t('navigation.novels'),
      href: '/novels',
      icon: DocumentTextIcon,
      children: [
        {
          id: 'all-novels',
          label: t('navigation.allNovels'),
          href: '/novels',
          icon: DocumentTextIcon
        },
        {
          id: 'love-novels',
          label: t('navigation.loveNovels'),
          href: '/novels?filter=love',
          icon: HeartIcon
        },
        {
          id: 'classic-novels',
          label: t('navigation.classicNovels'),
          href: '/novels?filter=classic',
          icon: DocumentTextIcon
        }
      ]
    },
    {
      id: 'ghazals',
      label: t('navigation.ghazals'),
      href: '/ghazals',
      icon: ChatBubbleLeftRightIcon
    },
    {
      id: 'prose',
      label: t('navigation.prose'),
      href: '/prose',
      icon: DocumentTextIcon
    },
    {
      id: 'quotes',
      label: t('navigation.quotes'),
      href: '/quotes',
      icon: ChatBubbleLeftRightIcon
    },
    {
      id: 'stories',
      label: t('navigation.stories'),
      href: '/stories',
      icon: BookOpenIcon
    },
    {
      id: 'audiobooks',
      label: 'Audiobooks',
      href: '/novels?filter=audiobook',
      icon: SpeakerWaveIcon,
      badge: 'New'
    }
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveSection(null);
  }, [pathname]);

  // Handle section toggle
  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  // Handle backdrop click
  const handleBackdropClick = () => {
    setIsOpen(false);
    setActiveSection(null);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleBackdropClick}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <nav
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {t('site.title')}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close menu"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Link
            href={localizedPath('/search')}
            className="flex items-center gap-3 w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              {t('navigation.search')}
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                {item.children ? (
                  // Section with children
                  <div>
                    <button
                      onClick={() => toggleSection(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeSection === item.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Children */}
                    {activeSection === item.id && (
                      <ul className="mt-2 ml-8 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={localizedPath(child.href)}
                              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                                isActive(child.href)
                                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              <child.icon className="w-4 h-4" />
                              <span>{child.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Simple link
                  <Link
                    href={localizedPath(item.href)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <Link
              href={localizedPath('/about')}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-30">
        <div className="flex items-center justify-around py-2">
          {navigationItems.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              href={localizedPath(item.href)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
