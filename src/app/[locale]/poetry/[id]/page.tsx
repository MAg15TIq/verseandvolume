'use client';

import { useTranslations } from 'next-intl';
import { poems } from '@/data/poems';
import { authors } from '@/data/authors';
import PoetryReader from '@/components/PoetryReader';
import GhazalReader from '@/components/GhazalReader';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import BookmarkButton from '@/components/BookmarkButton';
import { useEffect } from 'react';

interface PoetryPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export default function PoetryPage({ params }: PoetryPageProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { id } = params;
  const { addToReadingHistory } = useUserPreferences();

  // Add to reading history when component mounts
  useEffect(() => {
    addToReadingHistory('poems', id);
  }, [id, addToReadingHistory]);

  // Find the poem by ID
  const poem = poems.find(poem => poem.id === id);

  // Find the author
  const author = poem ? authors.find(author => author.id === poem.authorId) : null;

  // Find related poems (same author or type)
  const relatedPoems = poem
    ? poems
        .filter(p =>
          p.id !== poem.id &&
          (p.authorId === poem.authorId || p.type === poem.type)
        )
        .slice(0, 3)
    : [];

  if (!poem) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Poem Not Found</h1>
        <p>The poem you&rsquo;re looking for doesn&rsquo;t exist in our database.</p>
      </div>
    );
  }

  // Extract content based on language
  let poemContent: string[] = [];
  if (Array.isArray(poem.content)) {
    poemContent = poem.content;
  } else {
    poemContent = poem.language === 'ur' ? poem.content.ur : poem.content.en;
  }

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Poem Reader */}
      <div className="mb-16">
        <div className="flex justify-between items-start mb-8">
          <h1 className={`text-3xl font-bold ${poem.language === 'ur' ? 'font-urdu text-right' : ''}`}>
            {poem.title}
          </h1>

          <BookmarkButton
            id={poem.id}
            type="poems"
            showLabel={true}
          />
        </div>

        {poem.type === 'ghazal' ? (
          <GhazalReader
            title={poem.title}
            author={poem.author}
            content={poemContent}
            translation={poem.translation}
            explanation={poem.explanation}
            language={poem.language === 'both' ? 'en' : poem.language}
            audioUrl={poem.audioUrl ?
              (typeof poem.audioUrl === 'string' ?
                poem.audioUrl :
                poem.language === 'ur' ? poem.audioUrl?.ur : poem.audioUrl?.en) :
              null}
            hasAudio={poem.hasAudio || !!poem.audioUrl}
          />
        ) : (
          <PoetryReader
            title={poem.title}
            author={poem.author}
            content={poemContent}
            language={poem.language === 'both' ? 'en' : poem.language}
            showLineNumbers={true}
            audioUrl={poem.audioUrl ?
              (typeof poem.audioUrl === 'string' ?
                poem.audioUrl :
                poem.language === 'ur' ? poem.audioUrl?.ur : poem.audioUrl?.en) :
              null}
            hasAudio={poem.hasAudio || !!poem.audioUrl}
          />
        )}
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

      {/* Related Poems */}
      {relatedPoems.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">{t('poetry.relatedPoems')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPoems.map(relatedPoem => (
              <div
                key={relatedPoem.id}
                className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow relative group"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <BookmarkButton
                    id={relatedPoem.id}
                    type="poems"
                  />
                </div>

                <Link
                  href={localizedPath(`/poetry/${relatedPoem.id}`)}
                  className="block"
                  onClick={() => addToReadingHistory('poems', relatedPoem.id)}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${relatedPoem.language === 'ur' ? 'text-right font-urdu' : ''}`}>
                    {relatedPoem.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {relatedPoem.author}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {relatedPoem.type.charAt(0).toUpperCase() + relatedPoem.type.slice(1)}
                    </span>
                    {relatedPoem.year && (
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {relatedPoem.year}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
