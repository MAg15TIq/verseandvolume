import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return path === '/' ? `/${locale}` : `/${locale}${path}`;
  };

  return (
    <footer className="w-full border-t border-paper-400 dark:border-paper-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl mb-4" style={{ fontWeight: 600 }}>{t('site.title')}</h3>
            <p className="text-paper-700 dark:text-paper-400">{t('site.description')}</p>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4" style={{ fontWeight: 600 }}>Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href={localizedPath('/')} className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/poetry')} className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                  {t('navigation.poetry')}
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/ghazals')} className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                  {t('navigation.ghazals')}
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/prose')} className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                  {t('navigation.prose')}
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/about')} className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                  {t('navigation.about')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4" style={{ fontWeight: 600 }}>Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href={localizedPath('/newsletter')} className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/contact')} className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4" style={{ fontWeight: 600 }}>Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href={localizedPath('/terms')} className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/privacy')} className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/cookies')} className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/disclaimer')} className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4" style={{ fontWeight: 600 }}>Connect</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                Twitter
              </a>
              <a href="#" className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                Instagram
              </a>
              <a href="mailto:contact@verseandvolume.com" className="text-paper-700 dark:text-paper-400 hover:text-paper-900 dark:hover:text-paper-200">
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-paper-300 dark:border-paper-800 text-center text-paper-600 dark:text-paper-500">
          <p>&copy; {year} {t('site.title')}. {t('footer.rights')}.</p>
          <div className="mt-2 flex justify-center flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href={localizedPath('/terms')} className="text-paper-600 dark:text-paper-500 hover:text-paper-800 dark:hover:text-paper-300">
              Terms
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href={localizedPath('/privacy')} className="text-paper-600 dark:text-paper-500 hover:text-paper-800 dark:hover:text-paper-300">
              Privacy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href={localizedPath('/cookies')} className="text-paper-600 dark:text-paper-500 hover:text-paper-800 dark:hover:text-paper-300">
              Cookies
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href={localizedPath('/disclaimer')} className="text-paper-600 dark:text-paper-500 hover:text-paper-800 dark:hover:text-paper-300">
              Disclaimer
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href={localizedPath('/contact')} className="text-paper-600 dark:text-paper-500 hover:text-paper-800 dark:hover:text-paper-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
