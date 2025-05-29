"use client";

import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import ProseReader from '@/components/ProseReader';
import BookDetails from '@/components/BookDetails';
import { allLoveStories } from '@/data/stories/love-stories';

export default function StoryPage() {
  const params = useParams();
  const t = useTranslations();
  const locale = useLocale();
  const storyId = params?.id as string;

  if (!params || !storyId) {
    notFound();
  }

  // Find the story
  const story = allLoveStories.find(s => s.id === storyId);

  if (!story) {
    notFound();
  }

  // Get story content
  const getStoryContent = () => {
    if (!story.content) return [];
    if (Array.isArray(story.content)) return story.content;
    // For bilingual content, prefer current locale
    if (locale === 'ur' && story.content.ur) return story.content.ur;
    if (locale === 'en' && story.content.en) return story.content.en;
    // Fallback to available content
    return story.content.en || story.content.ur || [];
  };

  const storyContent = getStoryContent();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Story Details */}
      <div className="mb-8">
        <BookDetails
          book={story}
        />
      </div>

      {/* Story Content */}
      {storyContent.length > 0 && (
        <div className="mb-8">
          <ProseReader
            title={story.title}
            author={story.author}
            content={storyContent}
            language={story.language === 'both' ? 'en' : story.language}
            showPageNumbers={false}
            audioUrl={story.audioUrl ?
              (typeof story.audioUrl === 'string' ?
                story.audioUrl :
                story.language === 'ur' ? story.audioUrl?.ur : story.audioUrl?.en) :
              null}
            hasAudio={story.hasAudio || !!story.audioUrl}
          />
        </div>
      )}

      {/* Related Stories */}
      <div className="mt-12">
        <h2 className="text-2xl mb-6 font-semibold">{t('stories.relatedStories')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allLoveStories
            .filter(s => s.id !== story.id && s.author === story.author)
            .slice(0, 3)
            .map(relatedStory => (
              <div key={relatedStory.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-2">{relatedStory.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{relatedStory.author}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {relatedStory.description}
                </p>
                <a
                  href={`/${locale}/stories/${relatedStory.id}`}
                  className="inline-block mt-3 text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  {t('stories.readFull')} →
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
