"use client";

import { useTranslations } from 'next-intl';
import AuthorImage from '@/components/AuthorImage';
import BookCover from '@/components/BookCover';
import { authors } from '@/data/authors';

export default function DemoPage() {
  const t = useTranslations();

  // Get some sample authors for demonstration
  const sampleAuthors = authors.slice(0, 4);

  // Sample book for cover demonstration (fallback design)
  const sampleBook = {
    id: 'sample-book',
    title: 'Sample Book Title',
    author: 'Sample Author',
    authorId: 'sample-author',
    coverImage: '', // Empty to show fallback design
    language: 'en' as const,
    genre: ['Fiction', 'Romance'],
    description: 'A sample book for demonstration',
    excerpt: ['This is a sample excerpt...']
  };

  // Sample book with existing cover
  const bookWithCover = {
    id: 'book-with-cover',
    title: 'Book with Cover',
    author: 'Author Name',
    authorId: 'author-id',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Pride_and_Prejudice_Title_Page.jpg/256px-Pride_and_Prejudice_Title_Page.jpg',
    language: 'en' as const,
    genre: ['Classic', 'Romance'],
    description: 'A book with an actual cover image',
    excerpt: ['Sample content...']
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          New Features Demo
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center">
          Explore the new audiobook, author image, and book cover features
        </p>

        {/* Author Images Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Author Images</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Enhanced author profile images with responsive sizing and automatic fallbacks
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {sampleAuthors.map((author) => (
              <div key={author.id} className="text-center">
                <AuthorImage
                  author={author}
                  size="large"
                  className="mx-auto mb-3"
                  priority={true}
                />
                <h3 className="font-medium text-sm">{author.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {author.birthYear} - {author.deathYear || 'Present'}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Size Variations</h4>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <AuthorImage author={sampleAuthors[0]} size="small" className="mx-auto mb-2" />
                <span className="text-xs">Small</span>
              </div>
              <div className="text-center">
                <AuthorImage author={sampleAuthors[0]} size="medium" className="mx-auto mb-2" />
                <span className="text-xs">Medium</span>
              </div>
              <div className="text-center">
                <AuthorImage author={sampleAuthors[0]} size="large" className="mx-auto mb-2" />
                <span className="text-xs">Large</span>
              </div>
              <div className="text-center">
                <AuthorImage author={sampleAuthors[0]} size="xl" className="mx-auto mb-2" />
                <span className="text-xs">Extra Large</span>
              </div>
            </div>
          </div>
        </section>

        {/* Book Covers Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Book Covers</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Responsive book cover display with fallback designs and audio indicators
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <BookCover
                book={bookWithCover}
                size="large"
                className="mx-auto mb-3"
                priority={true}
              />
              <h3 className="font-medium text-sm">With Cover Image</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Existing Cover</p>
            </div>

            <div className="text-center">
              <BookCover
                book={sampleBook}
                size="large"
                className="mx-auto mb-3"
                showFallback={true}
              />
              <h3 className="font-medium text-sm">Fallback Design</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Generated Cover</p>
            </div>

            <div className="text-center">
              <BookCover
                book={bookWithCover}
                size="large"
                aspectRatio="square"
                className="mx-auto mb-3"
              />
              <h3 className="font-medium text-sm">Square Aspect</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">1:1 Ratio</p>
            </div>

            <div className="text-center">
              <BookCover
                book={{...sampleBook, hasAudio: true}}
                size="large"
                className="mx-auto mb-3"
                showFallback={true}
              />
              <h3 className="font-medium text-sm">With Audio</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Audio Indicator</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Size Variations</h4>
            <div className="flex items-end space-x-6">
              <div className="text-center">
                <BookCover book={bookWithCover} size="small" className="mx-auto mb-2" />
                <span className="text-xs">Small</span>
              </div>
              <div className="text-center">
                <BookCover book={bookWithCover} size="medium" className="mx-auto mb-2" />
                <span className="text-xs">Medium</span>
              </div>
              <div className="text-center">
                <BookCover book={bookWithCover} size="large" className="mx-auto mb-2" />
                <span className="text-xs">Large</span>
              </div>
              <div className="text-center">
                <BookCover book={bookWithCover} size="xl" className="mx-auto mb-2" />
                <span className="text-xs">Extra Large</span>
              </div>
            </div>
          </div>
        </section>

        {/* Audiobook Implementation Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Audiobook Implementation</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to add authentic audiobooks for your books and novels
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
              🎧 How to Add Real Audiobooks
            </h3>
            <div className="space-y-4 text-blue-700 dark:text-blue-300">
              <div>
                <h4 className="font-semibold mb-2">1. Prepare Audio Files</h4>
                <p className="text-sm">
                  • Obtain authentic audiobook recordings (MP3, WAV, or AAC format)<br/>
                  • Organize by language (English/Urdu) and chapters if available<br/>
                  • Ensure proper audio quality and consistent volume levels
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. File Organization</h4>
                <p className="text-sm">
                  • Place files in <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">/public/audio/books/{'{book-id}'}/</code><br/>
                  • Create language subdirectories: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">en/</code> and <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">ur/</code><br/>
                  • Use consistent naming: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">full.mp3</code> or <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">chapter-01.mp3</code>
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Update Book Data</h4>
                <p className="text-sm">
                  • Set <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">hasAudio: true</code> and <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">isAudiobook: true</code><br/>
                  • Add narrator information and audio duration<br/>
                  • Include chapter data if using chapter-based audio files
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Professional Features
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Chapter navigation, playback speed control, volume adjustment, and progress tracking
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                Quality Support
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Standard, High, and Premium quality indicators with narrator information display
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                Multilingual Ready
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Full support for English and Urdu audiobooks with automatic language detection
              </p>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Key Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-3">🎧</div>
              <h3 className="font-semibold mb-2">Audiobooks</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Chapter-based navigation</li>
                <li>• Professional playback controls</li>
                <li>• Narrator information</li>
                <li>• Quality indicators</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-3">👤</div>
              <h3 className="font-semibold mb-2">Author Images</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Responsive sizing</li>
                <li>• Automatic fallbacks</li>
                <li>• Optimized loading</li>
                <li>• Accessibility support</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-3">📚</div>
              <h3 className="font-semibold mb-2">Book Covers</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Multiple aspect ratios</li>
                <li>• Fallback designs</li>
                <li>• Audio indicators</li>
                <li>• Responsive display</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Implementation Notes</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              All new features are built with modern web standards and best practices:
            </p>
            <ul className="space-y-2">
              <li><strong>Responsive Design:</strong> Works seamlessly across all device sizes</li>
              <li><strong>Accessibility:</strong> Full screen reader and keyboard navigation support</li>
              <li><strong>Performance:</strong> Optimized loading with lazy loading and caching</li>
              <li><strong>Internationalization:</strong> Full support for English and Urdu languages</li>
              <li><strong>Dark Mode:</strong> Consistent theming across all components</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
