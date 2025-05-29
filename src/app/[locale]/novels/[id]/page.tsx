"use client";

import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import ProseReader from '@/components/ProseReader';
import ChapterReader from '@/components/ChapterReader';
import BookDetails from '@/components/BookDetails';
import AudiobookPlayer from '@/components/AudiobookPlayer';
import { allNovels } from '@/data/novels/authors';
import { isAudiobook } from '@/utils/imageUtils';

export default function NovelPage() {
  const params = useParams();
  const t = useTranslations();
  const locale = useLocale();
  const novelId = params?.id as string;

  if (!params || !novelId) {
    notFound();
  }

  // Find the novel
  const novel = allNovels.find(n => n.id === novelId);

  if (!novel) {
    notFound();
  }

  // Check if novel has chapters or content
  const hasChapters = novel.chapters && novel.chapters.length > 0;

  // Get novel content (for novels without chapters)
  const getNovelContent = () => {
    if (!novel.content) return [];
    if (Array.isArray(novel.content)) return novel.content;
    // For bilingual content, prefer current locale
    if (locale === 'ur' && novel.content.ur) return novel.content.ur;
    if (locale === 'en' && novel.content.en) return novel.content.en;
    // Fallback to available content
    return novel.content.en || novel.content.ur || [];
  };

  const novelContent = getNovelContent();

  // Check if we have full content to display
  const hasFullContent = hasChapters || novelContent.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Novel Details */}
      <div className="mb-8">
        <BookDetails
          book={novel}
        />
      </div>

      {/* Audiobook Player (if this is an audiobook) */}
      {isAudiobook(novel) && (
        <div className="mb-8">
          <AudiobookPlayer
            book={novel}
            language={novel.language === 'both' ? 'en' : novel.language}
            showChapterList={true}
          />
        </div>
      )}

      {/* Full Novel Content */}
      {hasFullContent && (
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              {t('novels.readFull')}
            </h2>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {hasChapters
                  ? t('novels.fullContentChapters')
                  : t('novels.fullContentAvailable')
                }
              </p>
            </div>
          </div>

          {hasChapters ? (
            <ChapterReader
              title={novel.title}
              author={novel.author}
              chapters={novel.chapters!}
              language={novel.language === 'both' ? 'en' : novel.language}
              audioUrl={novel.audioUrl ?
                (typeof novel.audioUrl === 'string' ?
                  novel.audioUrl :
                  novel.language === 'ur' ? novel.audioUrl?.ur : novel.audioUrl?.en) :
                null}
              hasAudio={novel.hasAudio || !!novel.audioUrl}
              book={novel} // Pass the full book object for enhanced audiobook integration
              audioChapters={novel.audioChapters} // Pass audioChapters for chapter-specific audio
            />
          ) : (
            <ProseReader
              title={novel.title}
              author={novel.author}
              content={novelContent}
              language={novel.language === 'both' ? 'en' : novel.language}
              showPageNumbers={true}
              audioUrl={novel.audioUrl ?
                (typeof novel.audioUrl === 'string' ?
                  novel.audioUrl :
                  novel.language === 'ur' ? novel.audioUrl?.ur : novel.audioUrl?.en) :
                null}
              hasAudio={novel.hasAudio || !!novel.audioUrl}
              isNovel={true}
              defaultFullContent={true}
            />
          )}
        </div>
      )}

      {/* No Content Available Message */}
      {!hasFullContent && (
        <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            {t('novels.noContentAvailable')}
          </p>
        </div>
      )}

      {/* Related Novels */}
      <div className="mt-12">
        <h2 className="text-2xl mb-6 font-semibold">{t('novels.relatedNovels')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNovels
            .filter(n => n.id !== novel.id && n.author === novel.author)
            .slice(0, 3)
            .map(relatedNovel => (
              <div key={relatedNovel.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-2">{relatedNovel.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{relatedNovel.author}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {relatedNovel.description}
                </p>
                <a
                  href={`/${locale}/novels/${relatedNovel.id}`}
                  className="inline-block mt-3 text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  {t('novels.readFull')} →
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
