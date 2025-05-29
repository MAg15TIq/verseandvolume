"use client";

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

interface Work {
  title: string;
  author: string;
  type: 'poetry' | 'prose' | 'essay' | 'ghazal' | 'nazm' | 'sonnet';
  id: string;
  excerpt?: string;
  language?: 'en' | 'ur';
  category?: 'poetry' | 'ghazals' | 'psychological-poetry';
}

interface LatestWorksItemProps {
  works?: Work[];
}

export default function LatestWorksItem({ works }: LatestWorksItemProps) {
  const t = useTranslations();
  const locale = useLocale();

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // Helper function to get the correct path based on work category
  const getWorkPath = (work: Work) => {
    if (work.category === 'ghazals') {
      // For ghazals, link to the ghazals page with a scroll-to anchor
      return localizedPath(`/ghazals#${work.id}`);
    } else if (work.category === 'psychological-poetry') {
      return localizedPath(`/psychological-poetry/${work.id}`);
    } else if (work.category === 'poetry') {
      return localizedPath(`/poetry/${work.id}`);
    } else {
      // Fallback for legacy works
      return localizedPath(`/works/${work.id}`);
    }
  };

  const defaultWorks: Work[] = [
    {
      title: locale === 'ur' ? 'خاموش راستے' : 'Silent Trajectories',
      author: 'M. Richardson',
      type: 'poetry',
      id: 'silent-trajectories'
    },
    {
      title: locale === 'ur' ? 'غیر موجودگی کا وزن' : 'The Weight of Absence',
      author: 'L. Chen',
      type: 'prose',
      id: 'weight-of-absence'
    },
    {
      title: locale === 'ur' ? 'جدید ملال پر' : 'On Modern Melancholy',
      author: 'K. Torres',
      type: 'essay',
      id: 'modern-melancholy'
    }
  ];

  const displayWorks = works || defaultWorks;

  return (
    <div>
      <div className="section-title font-sans text-sm font-semibold text-paper-700 dark:text-paper-500 uppercase tracking-wider mb-6">
        {t('home.featured.title')}
      </div>

      {displayWorks.map((work, index) => (
        <div
          key={work.id}
          className="work-item mb-6 pb-5 border-b border-paper-200 dark:border-paper-700 last:border-0 animate-fade-in"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <Link
            href={getWorkPath(work)}
            className="block group p-2 -mx-2 rounded-md transition-all duration-300 hover:bg-paper-200/50 dark:hover:bg-paper-800/50 cursor-literature"
          >
            <div className="work-title font-serif text-lg md:text-xl text-paper-900 dark:text-paper-100 mb-1 group-hover:text-paper-700 dark:group-hover:text-paper-300 transition-all duration-300 transform group-hover:translate-x-1">
              {work.title}
            </div>
            <div className="work-meta text-sm text-paper-600 dark:text-paper-400 font-light transition-all duration-300 group-hover:text-paper-800 dark:group-hover:text-paper-300">
              <span className="inline-block mr-2 w-2 h-2 rounded-full bg-paper-400 dark:bg-paper-600"></span>
              {work.type === 'poetry' ? t('navigation.poetry') :
               work.type === 'prose' ? t('navigation.prose') :
               work.type === 'ghazal' ? t('navigation.ghazals') :
               work.type === 'nazm' ? 'Nazm' :
               work.type === 'sonnet' ? 'Sonnet' : 'Essay'} • {work.author}
            </div>
            {work.excerpt && (
              <div className="work-excerpt text-xs text-paper-500 dark:text-paper-500 mt-2 line-clamp-2 group-hover:text-paper-600 dark:group-hover:text-paper-400 transition-all duration-300">
                {work.excerpt}
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
