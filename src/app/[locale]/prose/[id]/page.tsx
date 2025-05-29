'use client';

import { useTranslations } from 'next-intl';
import { books } from '@/data/books';
import BookDetails from '@/components/BookDetails';
import ProseReader from '@/components/ProseReader';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useEffect } from 'react';

interface ProsePageProps {
  params: {
    id: string;
    locale: string;
  };
}

export default function ProsePage({ params }: ProsePageProps) {
  const t = useTranslations();
  const { id } = params;
  const { addToReadingHistory } = useUserPreferences();
  const locale = params.locale;

  // Add to reading history when component mounts
  useEffect(() => {
    addToReadingHistory('books', id);
  }, [id, addToReadingHistory]);

  // Find the book by ID
  const book = books.find(book => book.id === id);

  // Find related books (same author or genre)
  const relatedBooks = book
    ? books
        .filter(b =>
          b.id !== book.id &&
          (b.authorId === book.authorId ||
           b.genre.some(g => book.genre.includes(g)))
        )
        .slice(0, 4)
    : [];

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Book Not Found</h1>
        <p>The book you&rsquo;re looking for doesn&rsquo;t exist in our database.</p>
      </div>
    );
  }

  // Extract content for ProseReader - prioritize full content over excerpt
  let displayContent: string[] = [];
  let isFullContent = false;

  // Check if full content is available
  if (book.content) {
    isFullContent = true;
    if (Array.isArray(book.content)) {
      displayContent = book.content;
    } else {
      displayContent = book.language === 'ur' ? book.content.ur || [] : book.content.en || [];
    }
  } else if (book.excerpt) {
    // Fall back to excerpt if no full content
    if (Array.isArray(book.excerpt)) {
      displayContent = book.excerpt;
    } else {
      displayContent = book.language === 'ur' ? book.excerpt.ur || [] : book.excerpt.en || [];
    }
  }

  // Helper function to create localized paths
  const localizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <BookDetails book={book} relatedBooks={relatedBooks} />

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">
          {isFullContent ? t('prose.readFull') : t('prose.readExcerpt')}
        </h2>
        {isFullContent ? (
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              📚 Complete content available - {book.pages ? `${book.pages} pages` : 'full work'} ready to read.
            </p>
          </div>
        ) : (
          <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ {t('prose.excerptNotice')}
            </p>
          </div>
        )}
        <ProseReader
          title={book.title}
          author={book.author}
          content={displayContent}
          language={book.language === 'both' ? 'en' : book.language}
          showPageNumbers={true}
          audioUrl={book.audioUrl ?
            (typeof book.audioUrl === 'string' ?
              book.audioUrl :
              book.language === 'ur' ? book.audioUrl?.ur : book.audioUrl?.en) :
            null}
          hasAudio={book.hasAudio || !!book.audioUrl}
        />
      </div>
    </div>
  );
}
