'use client';

import { useTranslations } from 'next-intl';
import { poems } from '@/data/poems';
import { authors } from '@/data/authors';
import GhazalReader from '@/components/GhazalReader';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import BookmarkButton from '@/components/BookmarkButton';
import { useEffect } from 'react';

interface GhazalPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export default function GhazalPage({ params }: GhazalPageProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { id } = params;
  const { addToReadingHistory } = useUserPreferences();

  // Add to reading history when component mounts
  useEffect(() => {
    addToReadingHistory('poems', id);
  }, [id, addToReadingHistory]);

  // Find the ghazal by ID (ghazals are stored in the poems array with type 'ghazal')
  const ghazal = poems.find(poem => poem.id === id && poem.type === 'ghazal');

  // Find the author
  const author = ghazal ? authors.find(author => author.id === ghazal.authorId) : null;

  // Find related ghazals (same author or similar themes)
  const relatedGhazals = ghazal
    ? poems
        .filter(p =>
          p.id !== ghazal.id &&
          p.type === 'ghazal' &&
          (p.authorId === ghazal.authorId || 
           p.themes?.some(theme => ghazal.themes?.includes(theme)))
        )
        .slice(0, 3)
    : [];

  if (!ghazal) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Ghazal Not Found</h1>
        <p>The ghazal you&rsquo;re looking for doesn&rsquo;t exist in our database.</p>
        <Link
          href={`/${locale}/ghazals`}
          className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Ghazals
        </Link>
      </div>
    );
  }

  // Extract content based on language
  let ghazalContent: string[] = [];
  if (Array.isArray(ghazal.content)) {
    ghazalContent = ghazal.content;
  } else {
    ghazalContent = ghazal.language === 'ur' ? ghazal.content.ur : ghazal.content.en;
  }

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Ghazal Reader */}
      <div className="mb-16">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${ghazal.language === 'ur' ? 'font-urdu text-right' : ''}`}>
              {ghazal.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('poetry.ghazal')} by {ghazal.author}
            </p>
          </div>

          <BookmarkButton
            id={ghazal.id}
            type="poems"
            showLabel={true}
          />
        </div>

        <GhazalReader
          title={ghazal.title}
          author={ghazal.author}
          content={ghazalContent}
          translation={ghazal.translation}
          explanation={ghazal.explanation}
          language={ghazal.language === 'both' ? 'en' : ghazal.language}
          audioUrl={ghazal.audioUrl ?
            (typeof ghazal.audioUrl === 'string' ?
              ghazal.audioUrl :
              ghazal.language === 'ur' ? ghazal.audioUrl?.ur : ghazal.audioUrl?.en) :
            null}
          hasAudio={ghazal.hasAudio || !!ghazal.audioUrl}
        />
      </div>

      {/* Author Information */}
      {author && (
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">{t('poetry.aboutAuthor')}</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            {author.image && (
              <div className="w-32 h-32 relative rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold mb-2">{author.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {author.birthYear && author.deathYear
                  ? `${author.birthYear} - ${author.deathYear}`
                  : author.birthYear
                  ? `b. ${author.birthYear}`
                  : author.deathYear
                  ? `d. ${author.deathYear}`
                  : ''}
                {author.birthPlace && `, ${author.birthPlace}`}
              </p>
              <p className="mb-4 line-clamp-3">{author.bio}</p>
              <Link
                href={localizedPath(`/authors/${author.id}`)}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t('author.viewProfile')}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Related Ghazals */}
      {relatedGhazals.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Related Ghazals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedGhazals.map(relatedGhazal => (
              <div
                key={relatedGhazal.id}
                className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow relative group"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <BookmarkButton
                    id={relatedGhazal.id}
                    type="poems"
                  />
                </div>

                <Link
                  href={localizedPath(`/ghazals/${relatedGhazal.id}`)}
                  className="block"
                  onClick={() => addToReadingHistory('poems', relatedGhazal.id)}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${relatedGhazal.language === 'ur' ? 'text-right font-urdu' : ''}`}>
                    {relatedGhazal.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {relatedGhazal.author}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {t('poetry.ghazal')}
                    </span>
                    {relatedGhazal.year && (
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {relatedGhazal.year}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link
          href={localizedPath('/ghazals')}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to All Ghazals
        </Link>
      </div>
    </div>
  );
}
