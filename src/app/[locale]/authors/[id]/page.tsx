import { useTranslations } from 'next-intl';
import AuthorProfile from '@/components/AuthorProfile';
import QuoteDisplay from '@/components/QuoteDisplay';
import AuthorTimeline from '@/components/AuthorTimeline';
import WorksList from '@/components/WorksList';
import { authors } from '@/data/authors';
import { poems } from '@/data/poems';
import { books } from '@/data/books';

interface AuthorPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const t = useTranslations();
  const { id } = params;

  // Find the author from our data file
  const author = authors.find(author => author.id === id);

  if (!author) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Author Not Found</h1>
        <p>The author you&rsquo;re looking for doesn&rsquo;t exist in our database.</p>
      </div>
    );
  }

  // Find all works by this author from poems and books
  const authorPoems = poems.filter(poem => poem.authorId === id);
  const authorBooks = books.filter(book => book.authorId === id);

  // Combine all works
  const allWorks = [
    ...authorPoems.map(poem => ({
      id: poem.id,
      title: poem.title,
      year: poem.year,
      type: 'poetry' as const
    })),
    ...authorBooks.map(book => ({
      id: book.id,
      title: book.title,
      year: book.publishYear,
      type: 'prose' as const
    }))
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Author Profile */}
      <AuthorProfile
        author={author}
        works={allWorks}
        language={author.language === 'both' ? 'en' : author.language}
      />

      {/* Author Timeline */}
      {author.timeline && author.timeline.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Timeline</h2>
          <AuthorTimeline
            timeline={author.timeline}
            language={author.language === 'both' ? 'en' : author.language}
          />
        </div>
      )}

      {/* Author Works */}
      {allWorks.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Works</h2>
          <WorksList
            works={allWorks}
            language={author.language === 'both' ? 'en' : author.language}
          />
        </div>
      )}

      {/* Notable Quote */}
      {author.quote && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Notable Quote</h2>
          <QuoteDisplay
            quote={author.quote}
            author={author.name}
            language={author.language === 'both' ? 'en' : author.language}
          />
        </div>
      )}

      {/* Influences and Achievements */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {author.influences && author.influences.length > 0 && (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Influences</h2>
            <ul className="list-disc list-inside space-y-2">
              {author.influences.map((influence, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">{influence}</li>
              ))}
            </ul>
          </div>
        )}

        {author.achievements && author.achievements.length > 0 && (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
            <ul className="list-disc list-inside space-y-2">
              {author.achievements.map((achievement, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
