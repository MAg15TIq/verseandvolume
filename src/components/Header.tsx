"use client";

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';
import CollapsibleSection from './CollapsibleSection';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [poetryMenuOpen, setPoetryMenuOpen] = useState(false);
  const [novelsMenuOpen, setNovelsMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const poetryMenuRef = useRef<HTMLLIElement>(null);
  const novelsMenuRef = useRef<HTMLLIElement>(null);
  const moreMenuRef = useRef<HTMLLIElement>(null);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setPoetryMenuOpen(false);
        setNovelsMenuOpen(false);
        setMoreMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (poetryMenuRef.current && !poetryMenuRef.current.contains(event.target as Node)) {
        setPoetryMenuOpen(false);
      }
      if (novelsMenuRef.current && !novelsMenuRef.current.contains(event.target as Node)) {
        setNovelsMenuOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query parameter
      router.push(localizedPath(`/search?q=${encodeURIComponent(searchQuery.trim())}`));
    }
  };

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return path === '/' ? `/${locale}` : `/${locale}${path}`;
  };

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === '/' && (pathname === '/' || pathname === `/${locale}`)) return true;
    if (path !== '/' && pathname.includes(path)) return true;
    return false;
  };

  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="navbar">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href={localizedPath('/')} className="navbar-brand">
            {t('site.title')}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className={`navbar-nav ${mobileMenuOpen ? 'hidden' : 'hidden md:flex'}`}>
          <li>
            <Link
              href={localizedPath('/')}
              className={isActive('/') ? 'active' : ''}
            >
              {t('navigation.home')}
            </Link>
          </li>

          {/* Poetry dropdown for desktop */}
          <li className="relative" ref={poetryMenuRef}>
            <button
              className={`flex items-center gap-1 font-sans text-sm md:text-base text-paper-900 dark:text-paper-100 no-underline font-normal transition-colors duration-300 relative hover:text-paper-800 dark:hover:text-white ${
                isActive('/poetry') || isActive('/psychological-poetry') ? 'active' : ''
              }`}
              onClick={() => setPoetryMenuOpen(!poetryMenuOpen)}
              aria-expanded={poetryMenuOpen}
              aria-haspopup="true"
            >
              {t('navigation.poetry')}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${poetryMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {poetryMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-700 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  <li>
                    <Link
                      href={localizedPath('/poetry')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setPoetryMenuOpen(false)}
                    >
                      {t('navigation.allPoetry')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizedPath('/poetry?featured=true')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setPoetryMenuOpen(false)}
                    >
                      Featured Poetry
                    </Link>
                  </li>
                  <li>
                    <hr className="my-1 border-paper-200 dark:border-paper-700" />
                  </li>
                  <li>
                    <Link
                      href={localizedPath('/poetry?filter=english')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setPoetryMenuOpen(false)}
                    >
                      {t('navigation.englishPoetry')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizedPath('/poetry?filter=urdu')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setPoetryMenuOpen(false)}
                    >
                      {t('navigation.urduPoetry')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizedPath('/poetry?filter=bilingual')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setPoetryMenuOpen(false)}
                    >
                      {t('navigation.bilingualPoetry')}
                    </Link>
                  </li>
                  <li>
                    <hr className="my-1 border-paper-200 dark:border-paper-700" />
                  </li>
                  <li>
                    <Link
                      href={localizedPath('/psychological-poetry')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setPoetryMenuOpen(false)}
                    >
                      {t('navigation.psychologicalPoetry')}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Novels dropdown for desktop */}
          <li className="relative" ref={novelsMenuRef}>
            <button
              className={`flex items-center gap-1 font-sans text-sm md:text-base text-paper-900 dark:text-paper-100 no-underline font-normal transition-colors duration-300 relative hover:text-paper-800 dark:hover:text-white ${
                isActive('/novels') || isActive('/stories') ? 'active' : ''
              }`}
              onClick={() => setNovelsMenuOpen(!novelsMenuOpen)}
              aria-expanded={novelsMenuOpen}
              aria-haspopup="true"
            >
              {t('navigation.novels')}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${novelsMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {novelsMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-700 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  <li>
                    <Link
                      href={localizedPath('/novels')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setNovelsMenuOpen(false)}
                    >
                      {t('navigation.allNovels')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizedPath('/novels?filter=love')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setNovelsMenuOpen(false)}
                    >
                      Love Stories
                    </Link>
                  </li>
                  <li>
                    <hr className="my-1 border-paper-200 dark:border-paper-700" />
                  </li>
                  <li>
                    <Link
                      href={localizedPath('/novels?filter=classic')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setNovelsMenuOpen(false)}
                    >
                      {t('navigation.classicNovels')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizedPath('/novels?filter=audiobook')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setNovelsMenuOpen(false)}
                    >
                      {t('navigation.audiobooks')}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* More Categories dropdown for desktop */}
          <li className="relative" ref={moreMenuRef}>
            <button
              className={`flex items-center gap-1 font-sans text-sm md:text-base text-paper-900 dark:text-paper-100 no-underline font-normal transition-colors duration-300 relative hover:text-paper-800 dark:hover:text-white ${
                isActive('/ghazals') || isActive('/prose') || isActive('/quotes') || isActive('/stories') ? 'active' : ''
              }`}
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              aria-expanded={moreMenuOpen}
              aria-haspopup="true"
            >
              {t('navigation.moreCategories')}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${moreMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {moreMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-paper-50 dark:bg-paper-900 border border-paper-200 dark:border-paper-700 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  <li>
                    <Link
                      href={localizedPath('/ghazals')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      {t('navigation.ghazals')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizedPath('/prose')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      {t('navigation.prose')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizedPath('/quotes')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      {t('navigation.quotes')}
                    </Link>
                  </li>
                  <li>
                    <hr className="my-1 border-paper-200 dark:border-paper-700" />
                  </li>
                  <li>
                    <Link
                      href={localizedPath('/stories')}
                      className="block px-4 py-2 text-paper-700 dark:text-paper-300 hover:bg-paper-100 dark:hover:bg-paper-800 transition-colors duration-200"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      {t('navigation.stories')}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link
              href={localizedPath('/about')}
              className={isActive('/about') ? 'active' : ''}
            >
              {t('navigation.about')}
            </Link>
          </li>
        </ul>

        {/* Mobile Navigation */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden w-full mt-4`}>
          <div className="space-y-2">
            <CollapsibleSection
              title={t('navigation.poetry')}
              defaultExpanded={false}
              className="w-full"
            >
              <div className="space-y-2 pl-4">
                <Link
                  href={localizedPath('/poetry')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.allPoetry')}
                </Link>
                <Link
                  href={localizedPath('/poetry?filter=english')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.englishPoetry')}
                </Link>
                <Link
                  href={localizedPath('/poetry?filter=urdu')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.urduPoetry')}
                </Link>
                <Link
                  href={localizedPath('/poetry?filter=bilingual')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.bilingualPoetry')}
                </Link>
                <Link
                  href={localizedPath('/psychological-poetry')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.psychologicalPoetry')}
                </Link>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title={t('navigation.novels')}
              defaultExpanded={false}
              className="w-full"
            >
              <div className="space-y-2 pl-4">
                <Link
                  href={localizedPath('/novels')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.allNovels')}
                </Link>
                <Link
                  href={localizedPath('/novels?filter=love')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.loveNovels')}
                </Link>
                <Link
                  href={localizedPath('/novels?filter=classic')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.classicNovels')}
                </Link>
                <Link
                  href={localizedPath('/novels?filter=audiobook')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.audiobooks')}
                </Link>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title={t('navigation.moreCategories')}
              defaultExpanded={false}
              className="w-full"
            >
              <div className="space-y-2 pl-4">
                <Link
                  href={localizedPath('/ghazals')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.ghazals')}
                </Link>
                <Link
                  href={localizedPath('/prose')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.prose')}
                </Link>
                <Link
                  href={localizedPath('/quotes')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.quotes')}
                </Link>
                <Link
                  href={localizedPath('/stories')}
                  className="block py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.stories')}
                </Link>
              </div>
            </CollapsibleSection>

            <Link
              href={localizedPath('/about')}
              className="block py-3 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navigation.about')}
            </Link>

            <div className="border-t border-paper-200 dark:border-paper-700 pt-4 mt-4">
              <Link
                href={localizedPath('/bookmarks')}
                className="flex items-center gap-2 py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
                Bookmarks
              </Link>
              <Link
                href={localizedPath('/reading-history')}
                className="flex items-center gap-2 py-2 text-paper-700 dark:text-paper-300 hover:text-paper-900 dark:hover:text-paper-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Reading History
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-controls flex items-center gap-4">
          <form onSubmit={handleSearch} className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={t('navigation.search') || "Search..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">🔍</button>
          </form>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href={localizedPath('/bookmarks')}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              title="Bookmarks"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
            </Link>

            <Link
              href={localizedPath('/reading-history')}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              title="Reading History"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </Link>
          </div>

          <DarkModeToggle />
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
